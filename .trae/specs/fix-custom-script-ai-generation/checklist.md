# 修复自定义剧本智能生成功能 - 检查清单

## 生成管道检查

- [x] `CustomScriptGenerator` 对象在 `index.html` 中定义且可在控制台访问
- [x] `CustomScriptGenerator.MODES` 包含 basic / medium / advanced 三档参数
- [x] `CustomScriptGenerator.PROMPTS` 仅含字段说明和最小 JSON 骨架
- [x] `buildPrompt(mode, desc, options)` 能正确拼接 system prompt 与 user prompt
- [x] `callAPI(payload, signal)` 统一使用 fetch 并支持 `AbortController` 超时
- [x] `run(desc, mode, options)` 按顺序编排：构建提示词 → API 调用 → JSON 提取 → normalize → 校验 → 填入编辑器 → 图片生成
- [x] 请求体附加 `response_format: { type: 'json_object' }`

## JSON 提取与降级检查

- [x] `extractJSON(raw)` 能处理标准 JSON
- [x] `extractJSON(raw)` 能处理 markdown 围栏包裹的 JSON
- [x] `extractJSON(raw)` 能处理带 `//` 和 `/* */` 注释的 JSON
- [x] `extractJSON(raw)` 能处理带尾部说明文字的 JSON
- [x] `extractJSON(raw)` 对截断/非法 JSON 抛出明确错误
- [x] advanced 模式失败自动降级到 medium 模式重试
- [x] medium 模式失败自动降级到 basic 模式重试
- [x] 高级模式内联复制的 medium prompt 已删除

## 校验、填入与进度检查

- [x] `validate(normalized)` 调用 `validateScriptData` 并返回可读缺失字段信息
- [x] `apply(normalized)` 调用 `normalizeGeneratedScript` 与 `loadImportedScript`
- [x] `apply(normalized)` 触发 `expandEditorSectionsWithContent`、`updateAllEmptyStates`、`highlightGeneratedContent`
- [x] 进度按四阶段更新：「正在发送请求...」→「正在接收剧本数据...」→「正在解析并校验...」→「正在填入编辑器...」
- [x] 失败时进度条变红并显示「生成失败」
- [x] 原 `setInterval` 假进度逻辑已移除

## 错误提示检查

- [x] API 地址未配置时提示「请先在模型调配中配置 API 地址」
- [x] 401/403/429/500 等 HTTP 错误提示包含具体状态码
- [x] 网络/超时错误提示「请求超时，请检查网络或稍后再试」
- [x] JSON 解析失败提示「AI 返回的内容无法解析为剧本数据，已尝试降级重试，仍失败」
- [x] 字段校验失败提示具体缺失项（如「NPC列表为空」）
- [x] 不再统一显示「生成失败：请检查API配置或网络连接」

## 入口与旧代码清理检查

- [x] `generateCustomScript()` 保留为入口函数
- [x] `generateCustomScript()` 内部仅获取输入、模式并调用 `CustomScriptGenerator.run`
- [x] 原 `generateCustomScript` 庞大函数体已删除
- [x] `aiGenerateBtn` 点击事件绑定未被破坏

## 图片生成容错检查

- [x] `_generateSceneBackgrounds` 与 `_generateCharacterPortraits` 使用 `Promise.allSettled` 并行执行
- [x] 未配置图片 API 时自动跳过并提示「未配置生图 API，已跳过图片生成」
- [x] 单张场景背景图失败时在 location 卡片显示「背景图生成失败」占位
- [x] 单个角色立绘失败时在 NPC 卡片显示「立绘生成失败」占位
- [x] 图片 API 失败不弹全局错误 toast

## 端到端验证检查

- [x] 模拟生成结果能填入编辑器（标题、世界背景、NPC、地点、Lore、事件、快捷回复、开场场景均正确回填）
- [x] `validateScriptData` 通过且无控制台报错
- [x] 模拟缺少 NPC 返回时给出字段校验失败提示
- [ ] basic / medium / advanced 三档真实 API 生成（测试环境缺少稳定可用的文本生成 API，未执行）

## 回归测试检查

- [x] 剧本导入/导出 JSON 功能正常
- [x] 剧本保存、加载功能正常
- [x] 编辑器手动添加/删除 NPC 正常
- [x] 自定义剧本游玩模式/纯文本模式入口未被破坏
- [ ] 完整手动回归：地点/Lore/事件/快捷回复的增删、剧本复制/删除、从编辑器「开始游玩」（受测试时间限制，部分项未逐一点击验证）

## 备注

- 「生成管道」「JSON 提取与降级」「校验/填入/进度」「错误提示」「入口与旧代码清理」「图片生成容错」六大类检查项已通过代码审查与浏览器控制台验证完成勾选。
- 端到端验证中使用了模拟数据调用 `CustomScriptGenerator.apply` 来确认编辑器回填逻辑；真实 API 三档生成受环境限制未执行。
- 回归测试中完成了保存、导出、添加 NPC 等关键路径；其余手动项因测试时间未逐一点击，代码层面未改动相关逻辑。
