# 修复自定义剧本智能生成功能 - 任务列表

## 任务依赖关系

- Task 1 是后续所有任务的基础。
- Task 2 与 Task 3 可并行开始。
- Task 4 依赖 Task 3 完成 JSON 提取后。
- Task 5 依赖 Task 1 + Task 2 + Task 3 + Task 4。
- Task 6 依赖 Task 5。
- Task 7 依赖 Task 6。
- Task 8 依赖 Task 7。

## 任务列表

- [x] Task 1: 在 `index.html` 中新建 `CustomScriptGenerator` 生成管道对象
  - **目标**: 搭建统一生成管道，避免后续逻辑散落在原 `generateCustomScript` 函数中。
  - **步骤**:
    - [x] 1.1 在 `index.html` 自定义剧本编辑器脚本区（`normalizeGeneratedScript` 附近）新增 `var CustomScriptGenerator = { ... };`
    - [x] 1.2 定义 `MODES` 常量：包含 `basic` / `medium` / `advanced` 三档的 `maxTokens`、`maxLoreEntries`、`maxEvents`、`maxItems`、`temperature` 等参数。
    - [x] 1.3 定义 `PROMPTS` 模板：每个模式仅含字段说明和最小 JSON 骨架，不含完整示例数据。
    - [x] 1.4 实现 `buildPrompt(mode, desc, options)`：按模式拼接 system prompt 与 user prompt。
    - [x] 1.5 实现 `callAPI(payload, signal)`：统一 fetch，支持 `AbortController` 超时与 HTTP 错误透传。
    - [x] 1.6 实现 `run(desc, mode, options)` 主编排方法，定义各阶段调用顺序与错误传播。
    - [x] 1.7 验证：在浏览器控制台可访问 `CustomScriptGenerator`，且 `MODES` / `PROMPTS` / `buildPrompt` / `callAPI` 存在并可调用。
  - **验证**: `CustomScriptGenerator` 对象存在，结构符合设计，调用无报错。

- [x] Task 2: 实现健壮的 JSON 提取与自动降级策略
  - **目标**: 解决 JSON 解析脆弱问题，避免高级模式 fallback 中重复提示词。
  - **步骤**:
    - [x] 2.1 实现 `extractJSON(raw)`：去除 markdown 围栏、删除注释、截断尾部文本、使用嵌套深度匹配最外层 `{}`。
    - [x] 2.2 失败时在 console 输出原始内容片段并抛出 `JSONParseError`。
    - [x] 2.3 在 `run()` 中实现 advanced → medium → basic 的自动降级重试，降级时复用同一套提示词模板。
    - [x] 2.4 删除原高级模式 fallback 中内联复制的 medium prompt。
    - [x] 2.5 验证：用控制台测试标准 JSON、markdown 围栏 JSON、带注释 JSON、带尾部文本 JSON、截断 JSON 的提取行为。
  - **验证**: 各种合法包裹都能正确提取 JSON；非法输入给出明确错误；降级策略生效。

- [x] Task 3: 实现校验、填入编辑器与真实进度反馈
  - **目标**: 让生成结果能正确填入编辑器，并按真实阶段更新进度。
  - **步骤**:
    - [x] 3.1 实现 `validate(normalized)`：调用现有 `validateScriptData` 做字段级校验，返回可读的缺失字段信息。
    - [x] 3.2 实现 `apply(normalized)`：调用 `normalizeGeneratedScript`、`loadImportedScript`，并触发 `expandEditorSectionsWithContent`、`updateAllEmptyStates`、`highlightGeneratedContent`。
    - [x] 3.3 改造 `showGenProgress` / `updateGenProgress` / `completeGenProgress` / `hideGenProgress`：按四阶段更新文案。
    - [x] 3.4 失败时进度条变红并显示「生成失败」。
    - [x] 3.5 删除原 `setInterval` 假进度逻辑。
    - [x] 3.6 验证：调用 `CustomScriptGenerator.apply` 能将测试数据填入编辑器；进度函数按阶段切换文案。
  - **验证**: 生成结果成功填入编辑器；进度文案与实际阶段一致；失败后进度条变红。

- [x] Task 4: 实现分级错误提示
  - **目标**: 让用户能区分 API 配置错误、HTTP 错误、网络超时、JSON 解析失败、字段校验失败。
  - **步骤**:
    - [x] 4.1 定义错误类型：`APIError`、`JSONParseError`、`ValidationError`、`GenerationError`。
    - [x] 4.2 在 `callAPI` 中根据 HTTP 状态码和异常类型抛出对应错误。
    - [x] 4.3 在 `run()` 的 `catch` 中按错误类型显示不同提示文案。
    - [x] 4.4 API 地址未配置时提示「请先在模型调配中配置 API 地址」。
    - [x] 4.5 校验失败时提示具体缺失字段。
    - [x] 4.6 验证：分别模拟未配置 API、错误 Key、网络断开、非 JSON 返回、缺少 NPC 字段，观察提示文案。
  - **验证**: 每种错误路径都显示对应的具体提示，不再统一显示「生成失败」。

- [x] Task 5: 重构 `generateCustomScript` 入口与清理旧代码
  - **目标**: 保留入口函数，将内部逻辑替换为管道调用，并移除旧实现。
  - **步骤**:
    - [x] 5.1 删除原 `generateCustomScript` 庞大函数体。
    - [x] 5.2 保留函数签名，新实现为：
      ```js
      async function generateCustomScript() {
        var input = document.getElementById('aiGenerateInput');
        var btn = document.getElementById('aiGenerateBtn');
        var desc = input ? input.value.trim() : '';
        var mode = document.querySelector('.cce-gen-mode-btn.active')?.dataset.mode || 'basic';
        await CustomScriptGenerator.run(desc, mode, { btn, input });
      }
      ```
    - [x] 5.3 保留 `aiGenerateBtn.addEventListener('click', generateCustomScript)` 事件绑定。
    - [x] 5.4 验证：点击「智能生成」按钮能触发 `CustomScriptGenerator.run`，原函数体无残留。
  - **验证**: 入口函数精简，原复杂逻辑已移除，按钮点击正常。

- [x] Task 6: 图片生成解耦与容错增强
  - **目标**: 让图片生成不阻塞文本结果，并对失败给出局部反馈。
  - **步骤**:
    - [x] 6.1 在 `apply()` 阶段触发 `_generateSceneBackgrounds` 与 `_generateCharacterPortraits` 时，改用 `Promise.allSettled` 并行执行。
    - [x] 6.2 未配置图片 API 时自动跳过，并提示一次「未配置生图 API，已跳过图片生成」。
    - [x] 6.3 单张场景背景图失败时，在对应 location 卡片内显示「背景图生成失败」占位。
    - [x] 6.4 单个角色立绘失败时，在对应 NPC 卡片内显示「立绘生成失败」占位。
    - [x] 6.5 移除图片 API 失败时的空 catch 或全局 toast。
    - [x] 6.6 验证：未配置图片 API 时文本生成成功且不报错；配置错误图片 API 时卡片显示失败占位。
  - **验证**: 图片生成不影响文本生成结果；失败有局部占位提示，无全局错误弹窗。

- [x] Task 7: 控制台与端到端验证
  - **目标**: 验证管道各环节在真实浏览器环境中正常工作。
  - **步骤**:
    - [x] 7.1 测试 `extractJSON` 的 5 种样本。
    - [x] 7.2 通过 `CustomScriptGenerator.apply` 模拟生成结果填入编辑器，确认标题、世界背景、NPC、地点、Lore、事件、快捷回复、开场场景均已正确回填。
    - [x] 7.3 确认 `validateScriptData` 通过，无控制台报错。
    - [x] 7.4 模拟缺少 NPC 返回，确认「NPC列表为空」校验提示。
    - [x] 7.5 验证已有导入、导出、保存、加载功能未被破坏。
  - **验证**: 模拟生成结果可填入编辑器；错误路径提示准确；周边功能无 regression。

- [x] Task 8: 回归测试与修复收尾
  - **目标**: 确保改造不破坏自定义剧本编辑器其他功能。
  - **步骤**:
    - [x] 8.1 测试编辑器手动添加/删除 NPC、地点、Lore、事件、快捷回复。
    - [x] 8.2 测试剧本保存、加载、复制、删除。
    - [x] 8.3 测试剧本导入/导出 JSON。
    - [x] 8.4 测试从编辑器「开始游玩」自定义剧本（游玩模式/纯文本模式入口未被破坏）。
    - [x] 8.5 修复上述测试中发现的 regression。
  - **验证**: 编辑器全部手动操作与生成流程共存，无功能回退。

# Task Dependencies

- Task 1 是基础
- Task 2 依赖 Task 1
- Task 3 依赖 Task 1
- Task 4 依赖 Task 1
- Task 5 依赖 Task 2 + Task 3 + Task 4
- Task 6 依赖 Task 3
- Task 7 依赖 Task 5 + Task 6
- Task 8 依赖 Task 7

# Parallelizable Work

- Task 2、Task 3、Task 4 在 Task 1 完成后可并行开发。

# 备注

- 所有任务已通过代码实现、静态检查与浏览器运行时验证。
- 真实 API 的 basic/medium/advanced 三档端到端生成未在测试环境中执行（缺少稳定可用的文本生成 API），但生成管道、JSON 解析、校验、填入编辑器、错误提示等核心环节均已通过模拟数据和代码审查验证。
