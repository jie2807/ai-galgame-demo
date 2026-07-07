# 修复自定义剧本智能生成功能 Spec

## Why

当前 `index.html` 内的自定义剧本「智能生成」几乎无法稳定产出可用剧本：提示词过大、JSON 解析脆弱、错误反馈模糊、进度条与实际请求无关、高级模式失败后还内联复制了一份中级提示词。需要将这一部分重构成一个可维护、可调试的生成管道，让 basic/medium/advanced 三档都能稳定生成、解析、校验并填入编辑器，同时给用户清晰的错误提示。

## What Changes

- **ADDED** 新建 `CustomScriptGenerator` 自包含生成管道对象，统一提示词模板、API 调用、JSON 提取、校验与填入逻辑。
- **MODIFIED** 提示词模板化与压缩：每个模式只保留字段说明和最小 JSON 骨架，明确数组长度上限，降低 max_tokens。
- **MODIFIED** JSON 提取增强：去除 markdown 围栏、注释、尾部文本，使用嵌套深度匹配最外层 `{}`。
- **MODIFIED** 分级错误提示：区分 API 请求失败、网络/超时、JSON 解析失败、字段校验失败。
- **MODIFIED** 真实进度反馈：按「发送请求 → 接收数据 → 解析校验 → 填入编辑器」四阶段更新进度文案。
- **MODIFIED** 图片生成解耦与容错：使用 `Promise.allSettled` 并行执行，单张图失败仅在卡片内显示占位，不阻塞文本结果。
- **REMOVED** 删除原 `generateCustomScript` 庞大函数体及高级模式 fallback 中重复内联的 medium prompt。

## Impact

- 受影响能力：自定义剧本编辑器的 AI 智能生成、图片自动生成、生成进度提示、错误提示。
- 受影响代码：
  - `index.html`（自定义剧本编辑器脚本区，主要改造对象）
  - 复用现有 `normalizeGeneratedScript`、`loadImportedScript`、`validateScriptData`

## ADDED Requirements

### Requirement: 统一的 `CustomScriptGenerator` 生成管道

系统 SHALL 提供一个自包含的 `CustomScriptGenerator` 对象，编排自定义剧本 AI 生成的完整流程。

#### Scenario: 管道接口

- **WHEN** 调用 `CustomScriptGenerator.run(desc, mode, options)`
- **THEN** 管道依次执行：构建提示词 → 调用 API → 提取 JSON → normalize → 校验 → 填入编辑器 → 触发图片生成
- **THEN** 任意阶段失败时停止并返回明确错误类型

#### Scenario: 提示词模板化

- **WHEN** `buildPrompt(mode, desc, options)` 被调用
- **THEN** 从 `CustomScriptGenerator.MODES` 和 `CustomScriptGenerator.PROMPTS` 模板组合 system prompt
- **THEN** basic / medium / advanced 三档分别要求不同的字段完整度与数组上限
- **THEN** 请求体附加 `response_format: { type: 'json_object' }`

#### Scenario: 统一 API 调用

- **WHEN** `callAPI(payload, signal)` 被调用
- **THEN** 统一使用 fetch 发送 OpenAI 兼容 `/v1/chat/completions` 请求
- **THEN** 支持 `AbortController` 超时处理，避免请求卡死
- **THEN** 将 HTTP 状态码和错误信息透传给上层

#### Scenario: 健壮 JSON 提取

- **WHEN** `extractJSON(raw)` 被调用
- **THEN** 去除前后空白与 markdown 代码块标记
- **THEN** 删除 `//...` 和 `/*...*/` 注释
- **THEN** 删除最后一个 `}` 之后的尾部文本
- **THEN** 使用嵌套深度计数定位最外层 `{}`
- **THEN** 失败时记录原始内容到 console 并抛出包含片段的错误

#### Scenario: 自动降级策略

- **WHEN** advanced 模式生成失败
- **THEN** 自动降级到 medium 模式重试
- **THEN** medium 失败后再降级到 basic 模式重试
- **THEN** 不再在高级模式内联复制一份 medium prompt

### Requirement: 分级错误提示

系统 SHALL 在生成失败时按失败阶段给用户具体可操作的提示。

#### Scenario: API 配置错误

- **WHEN** API 地址未配置
- **THEN** 提示「请先在模型调配中配置 API 地址」

#### Scenario: HTTP 错误

- **WHEN** API 返回 401 / 403 / 429 / 500 等状态码
- **THEN** 提示包含具体状态码和简要建议，例如「API 请求失败（401）：请检查 API 地址、Key 或模型名」

#### Scenario: 网络或超时

- **WHEN** 请求超时或网络断开
- **THEN** 提示「请求超时，请检查网络或稍后再试」

#### Scenario: JSON 解析失败

- **WHEN** AI 返回内容无法提取合法 JSON
- **THEN** 提示「AI 返回的内容无法解析为剧本数据，已尝试降级重试，仍失败」

#### Scenario: 字段校验失败

- **WHEN** 生成结果通过 `validateScriptData` 发现缺少必要字段
- **THEN** 提示具体缺失项，例如「生成结果不完整：NPC列表为空。请补充后保存，或降低模式重试」

### Requirement: 真实进度反馈

系统 SHALL 在生成过程中按实际阶段更新进度提示。

#### Scenario: 四阶段进度

- **WHEN** 发起 fetch 时
- **THEN** 显示「正在发送请求...」
- **WHEN** 收到 HTTP 响应后
- **THEN** 显示「正在接收剧本数据...」
- **WHEN** 提取 JSON 后
- **THEN** 显示「正在解析并校验...」
- **WHEN** normalize 并调用 `loadImportedScript` 时
- **THEN** 显示「正在填入编辑器...」
- **WHEN** 失败时
- **THEN** 进度条变红并显示「生成失败」

### Requirement: 图片生成容错

系统 SHALL 让图片生成不阻塞文本生成结果，并对单张图失败给出局部反馈。

#### Scenario: 未配置图片 API

- **WHEN** 文本生成成功但用户未配置图片 API
- **THEN** 自动跳过图片生成并提示一次「未配置生图 API，已跳过图片生成」

#### Scenario: 单张图片失败

- **WHEN** 场景背景图或角色立绘生成失败
- **THEN** 在对应 location/NPC 卡片内显示「背景图生成失败」或「立绘生成失败」占位
- **THEN** 不弹全局错误 toast

## MODIFIED Requirements

### Requirement: 自定义剧本生成入口

原 `generateCustomScript()` 函数保留为入口，但内部逻辑迁移至 `CustomScriptGenerator.run()`。

#### Scenario: 入口兼容

- **WHEN** 用户点击「智能生成」按钮
- **THEN** 调用 `generateCustomScript()`
- **THEN** 从输入框获取描述、从模式按钮获取当前模式
- **THEN** 调用 `CustomScriptGenerator.run(desc, mode, { btn, input })`

### Requirement: 提示词规模控制

各模式提示词和输出规模需要压缩，降低截断概率。

#### Scenario: 压缩后参数

- **WHEN** basic 模式生成时
- **THEN** max_tokens 不超过 2048， loreEntries ≤ 5， events ≤ 3， items ≤ 3
- **WHEN** medium 模式生成时
- **THEN** max_tokens 不超过 4096， loreEntries ≤ 10， events ≤ 8， items ≤ 8
- **WHEN** advanced 模式生成时
- **THEN** max_tokens 不超过 8192， loreEntries ≤ 15， events ≤ 12， items ≤ 12

## REMOVED Requirements

### Requirement: 原 `generateCustomScript` 庞大函数体

**原因**：所有生成逻辑已迁移至 `CustomScriptGenerator` 管道。
**迁移**：保留 `generateCustomScript()` 函数名作为入口，删除其内部原实现。

### Requirement: 高级模式 fallback 中重复内联的 medium prompt

**原因**：`CustomScriptGenerator.run()` 已统一实现 advanced → medium → basic 的自动降级，无需在高级模式函数内复制提示词。
**迁移**：删除 L23920 附近重复内联的 medium prompt。

### Requirement: 基于 `setInterval` 的假进度条

**原因**：进度文案应与实际请求阶段绑定，而非定时切换。
**迁移**：按真实阶段更新进度，失败时变红显示「生成失败」。
