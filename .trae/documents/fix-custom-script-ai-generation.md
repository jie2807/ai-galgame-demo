# 自定义剧本智能生成系统重构计划

## Summary

当前 `index.html` 内的自定义剧本「智能生成」几乎无法稳定产出可用剧本：提示词过大、JSON 解析脆弱、错误反馈模糊、进度条是假的、高级模式失败后还内联复制了一份中级提示词。本计划将这一部分重构成一个可维护、可调试的生成管道（`CustomScriptGenerator`），核心目标是**让三种模式都能稳定生成、解析、校验并填入编辑器**，同时给用户清晰的错误提示。

涉及文件：
- `d:\BC\ai_resume\qmzz\index.html`（主要改造对象）
- 复用现有 `normalizeGeneratedScript`（L23496）、`loadImportedScript`（L22806）、`validateScriptData`（L22669）

---

## Current State Analysis

1. **巨型内联提示词**（L23844–L23861）
   - basic / medium / advanced 三档全部把完整 JSON 示例和要求塞在一条 system prompt 里。
   - max_tokens 分别达到 4000 / 8000 / 16000，后端容易截断或返回不完整 JSON。

2. **JSON 解析极其脆弱**（L23897–L23940）
   - 使用贪婪正则 `/\{[\s\S]*\}/` 提取，遇到嵌套对象或 markdown 围栏会出错。
   - 失败后用简单的括号计数补齐，很容易拼出非法 JSON。
   - 没有去除 markdown 代码块、注释、尾部说明文字。

3. **错误反馈模糊**
   - 所有失败统一显示 `生成失败：请检查API配置或网络连接` 或 `套用生成结果失败`。
   - 用户无法区分：API 不通、模型未返回 JSON、JSON 解析失败、生成结果缺少必要字段。

4. **高级模式 fallback 难维护**（L23917–L23935）
   - advanced 模式解析失败后，函数内又硬编码了一份完整 medium prompt，后续改提示词需要改两处。

5. **进度 UI 是假的**（`showGenProgress` L23666）
   - 用 `setInterval` 每 2 秒切换一句文案，和实际请求进度无关。

6. **图片生成失败静默**（`_generateSceneBackgrounds` L24019、`_generateCharacterPortraits` L24108）
   - 文本生成成功后才会触发图片生成，但图片 API 失败时只是 `catch` 里空处理，卡片上没有反馈。

---

## Proposed Changes

### 1. 新建 `CustomScriptGenerator` 生成管道

在 `index.html` 的自定义剧本编辑器脚本区（建议在 `normalizeGeneratedScript` 附近，L23450 前后）新增一个自包含对象：

```js
var CustomScriptGenerator = {
  MODES: { basic: {...}, medium: {...}, advanced: {...} },
  buildPrompt(mode, desc, options) {...},
  async callAPI(payload, signal) {...},
  extractJSON(raw) {...},
  validate(normalized) {...},
  async apply(normalized) {...},
  async run(desc, mode, options) {...}
};
```

**what/why/how**
- `buildPrompt`：把提示词模板化，避免在业务函数里拼大字符串。
- `callAPI`：统一 fetch，带 `AbortController` 超时处理，避免请求卡死。
- `extractJSON`：多层清洗（去 markdown 围栏、去注释、去尾部文本、用嵌套深度匹配最外层 `{}`）。
- `validate`：生成并 normalize 后，调用现有 `validateScriptData` 做字段级校验。
- `apply`：调用 `loadImportedScript` 填入编辑器，并触发 `expandEditorSectionsWithContent`、`updateAllEmptyStates`、`highlightGeneratedContent`。
- `run`：编排整个流程，失败时自动降级（advanced → medium → basic），避免复制提示词。

### 2. 提示词模板化与压缩

把三个模式的 system prompt 抽出为 `CustomScriptGenerator.PROMPTS`：
- 每个模式只保留**字段说明**和**一个最小 JSON 骨架**，不再塞完整示例数据。
- 明确数组长度上限，例如 advanced 限制 loreEntries ≤15、events ≤12、items ≤12，避免输出过大。
- max_tokens 降低为 2048 / 4096 / 8192（根据模式），减少截断概率。
- 请求体中附加 `response_format: { type: 'json_object' }`（对已知支持的结构化输出模型启用；若后端不支持，通常会被忽略，但实现时可按模型名做白名单）。

### 3. JSON 提取增强

实现 `CustomScriptGenerator.extractJSON(raw)`：
1. 去除前后空白与 markdown 代码块标记（```json ... ```）。
2. 删除 `//...` 和 `/*...*/` 注释。
3. 删除尾部非 JSON 文本（从最后一个 `}` 之后截断）。
4. 使用嵌套深度计数定位最外层 `{}`，而非贪婪正则。
5. 若仍失败，记录原始内容到 console 并抛出包含片段的错误。

### 4. 分级错误提示

按失败类型给用户不同提示：

| 失败阶段 | 提示示例 |
| --- | --- |
| API 请求失败 | `API 请求失败（401）：请检查 API 地址、Key 或模型名。` |
| 网络/超时 | `请求超时，请检查网络或稍后再试。` |
| JSON 解析失败 | `AI 返回的内容无法解析为剧本数据，已尝试降级重试，仍失败。` |
| 字段校验失败 | `生成结果不完整：NPC列表为空。请补充后保存，或降低模式重试。` |

实现时把 `generateCustomScript` 的 `catch` 拆成：
- `APIError`
- `JSONParseError`
- `ValidationError`
- 通用 `GenerationError`

### 5. 真实进度反馈

改造 `showGenProgress` / `updateGenProgress` / `completeGenProgress` / `hideGenProgress`：
- 阶段 1：`正在发送请求...`（发起 fetch 时）
- 阶段 2：`正在接收剧本数据...`（收到 HTTP 响应后）
- 阶段 3：`正在解析并校验...`（提取 JSON 后）
- 阶段 4：`正在填入编辑器...`（normalize + loadImportedScript）
- 失败：进度条变红并显示 `生成失败`。

### 6. 图片生成解耦与容错

- `_generateSceneBackgrounds` 与 `_generateCharacterPortraits` 仍由 `apply` 阶段触发，但用 `Promise.allSettled` 并行执行，不阻塞文本生成结果展示。
- 单张图失败时，在该 location/NPC 卡片内显示 `背景图生成失败` / `立绘生成失败` 占位，不弹全局错误 toast。
- 若未配置图片 API，自动跳过并提示一次：`未配置生图 API，已跳过图片生成。`

### 7. 清理旧代码

- 删除原 `generateCustomScript` 的庞大函数体，保留函数名作为入口：
  ```js
  async function generateCustomScript() {
    var input = document.getElementById('aiGenerateInput');
    var btn = document.getElementById('aiGenerateBtn');
    var desc = input ? input.value.trim() : '';
    var mode = document.querySelector('.cce-gen-mode-btn.active')?.dataset.mode || 'basic';
    await CustomScriptGenerator.run(desc, mode, { btn, input });
  }
  ```
- 删除 advanced fallback 中重复内联的 medium prompt（L23920 附近）。
- 保留事件绑定 `aiGenerateBtn.addEventListener('click', generateCustomScript)`（L26195）。

---

## Assumptions & Decisions

1. **继续使用 OpenAI 兼容接口**：不改 `/v1/chat/completions` 的 endpoint 和请求结构。
2. **保留 basic/medium/advanced 三档**：但压缩输出规模和 token 上限，以换取稳定性。
3. **保留 v2 数据模型**：复用 `normalizeGeneratedScript`、`loadImportedScript`、`validateScriptData`，不改动编辑器字段。
4. **不新增独立 JS 文件**：全部在 `index.html` 内完成，匹配当前项目结构。
5. **图片生成非核心阻塞点**：只做容错增强，不重构 `ImageGenAPI` 本身。
6. **response_format 策略**：默认附带，若项目后续发现某后端拒绝该字段，可改为按 `model` 白名单启用。

---

## Verification

1. **解析单元测试（控制台手动）**
   - 在浏览器控制台调用 `CustomScriptGenerator.extractJSON` 处理以下样本：
     - 标准 JSON
     - markdown 围栏包裹的 JSON
     - 带尾部说明文字的 JSON
     - 带注释的 JSON
     - 截断 JSON（应抛错）
   - 确认能正确提取或给出明确错误。

2. **正常生成测试**
   - 配置有效 API → 分别用 basic/medium/advanced 生成 → 检查编辑器已填入：标题、世界背景、NPC、地点、Lore、事件、快捷回复、开场场景。
   - 确认 `validateScriptData` 通过，无控制台报错。

3. **错误路径测试**
   - 清空 API 地址 → 点击生成 → 应提示「请先在模型调配中配置 API 地址」。
   - 填写错误 API Key → 应提示 401/403 具体状态码。
   - 网络断开/超时 → 应提示超时或网络错误。
   - 模拟模型返回非 JSON → 应提示解析失败并触发降级重试。
   - 模拟返回缺少 NPC → 应提示「NPC列表为空」。

4. **图片生成容错测试**
   - 开启「自动生成场景背景图」与「自动生成角色立绘」，但不配置生图 API → 文本生成成功，图片被跳过，不弹全局错误。
   - 配置错误图片 API → 文本成功，卡片内显示失败占位。

5. **回归测试**
   - 验证已有的剧本导入、导出、保存、加载功能未被破坏。
   - 验证编辑器手动添加/删除 NPC、地点、Lore、事件等行为正常。
