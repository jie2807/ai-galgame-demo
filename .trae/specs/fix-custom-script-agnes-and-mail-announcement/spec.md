# 修复自定义剧本 Agnes 连接 & 补充公告邮件 Spec

## Why

自定义剧本「智能生成」始终连不上官方 Agnes（用户口中的 "agents"）模型，而其它 OpenAI 兼容模型（DeepSeek、通义、GLM 等）均正常。排查后发现：`CustomScriptGenerator.run` 在请求体中强制附加了 `response_format: { type: 'json_object' }`，这是 OpenAI 专有字段，Agnes 网关会以 400 拒绝；而游戏主对话 `sendAction`、模型测试按钮均未发送该字段，因此它们在 Agnes 上正常。同时，发给玩家的测试公告邮件需要补充关于官方模型排队、自定义模型与 Agnes 全球免费政策的提示。

## What Changes

- **MODIFIED** `CustomScriptGenerator.run` 中构建请求体时，不再无条件附加 `response_format: { type: 'json_object' }`；改为仅在 baseUrl 不属于 Agnes（`agnes-ai.com`）时附加，Agnes 路径下完全省略该字段，依赖现有健壮的 `extractJSON` 解析。
- **MODIFIED** 调整 `callAPI` 的 400 错误提示文案，新增「若使用官方 Agnes 模型报 400，通常是不支持 JSON 模式参数，已自动兼容」类提示，便于排查。
- **MODIFIED** 公告邮件 `announcement_beta_202506_v2` 的 body 追加一段润色后的提示：说明官方模型免费但可能因玩家多而排队，诚挚邀请玩家尝试自定义大模型游玩；并提醒 Agnes 模型对全球所有人免费开放，鼓励玩家用自有 Agnes Key 通过自定义模型接入游玩以避开排队。

## Impact

- 受影响能力：自定义剧本智能生成（Agnes 连通性）、邮件系统公告内容。
- 受影响代码：
  - `index.html` 中 `CustomScriptGenerator` 对象（约 L23554-L23828），重点 L23769-L23788 请求体构建。
  - `index.html` 中公告邮件发送块（约 L27697-L27709）。

## ADDED Requirements

### Requirement: Agnes 模型 JSON 模式兼容

系统 SHALL 在调用 Agnes（`agnes-ai.com`）模型生成自定义剧本时，不发送 `response_format` 字段，避免被网关以 400 拒绝。

#### Scenario: 使用官方 Agnes 模型生成

- **WHEN** `getEffectiveTextModelConfig().apiBaseUrl` 包含 `agnes-ai.com`
- **AND** 用户点击「智能生成」
- **THEN** 请求体中不包含 `response_format` 字段
- **THEN** 请求正常返回，`extractJSON` 从模型自然输出的 JSON 文本中提取数据
- **THEN** 生成结果成功填入编辑器并提示「AI 剧本生成完成」

#### Scenario: 使用其它 OpenAI 兼容模型生成

- **WHEN** `apiBaseUrl` 不属于 Agnes（如 `api.deepseek.com`、`api.openai.com`）
- **THEN** 请求体保留 `response_format: { type: 'json_object' }`，行为不变
- **THEN** 生成流程与原先一致

#### Scenario: Agnes 高级模式降级

- **WHEN** Agnes 下 advanced 模式因 `max_tokens` 过大或超时失败
- **THEN** 自动降级到 medium 再到 basic（已有逻辑，保持不变）

## MODIFIED Requirements

### Requirement: 公告邮件内容补充

原 `announcement_beta_202506_v2` 邮件 body 末尾追加关于模型排队与自定义模型/Agnes 自助接入的提示。

#### Scenario: 邮件正文新增段落

- **WHEN** 玩家打开邮件面板查看「测试开启公告」
- **THEN** 在原隐私保护段落之后、结尾祝语之前，看到新增段落，包含以下要点：
  1. 官方免费模型因玩家集中可能排队
  2. 诚挚邀请玩家尝试自定义大模型游玩
  3. Agnes 模型对全球所有人免费开放，鼓励玩家用自有 Agnes Key 通过自定义模型接入游玩以避开排队
- **THEN** 文案经过润色，语气与原公告一致（温暖、诚恳）

### Requirement: 400 错误提示增强

`callAPI` 在收到 400 时，提示文案补充「官方 Agnes 模型不支持 JSON 模式参数」的说明（兼容修复后理论上不再出现，但保留兜底提示）。

#### Scenario: Agnes 仍返回 400

- **WHEN** Agnes 路径下请求返回 400
- **THEN** 错误提示包含「官方 Agnes 模型可能不支持部分请求参数，请稍后重试或切换自定义模型」
