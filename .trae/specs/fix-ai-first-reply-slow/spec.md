# 修复 AI 第一轮回复变慢 Spec

## Why
之前为优化 AI 回复速度，在 `SimpleChatEngine.sendMessage` 的请求体中新增了 `max_tokens: 800` 和 `temperature: 0.85`。但 `getEffectiveTextModelConfig()` 返回的 settings 对象并不包含 `maxTokens`/`temperature` 字段，所以每次请求都使用硬编码默认值 `max_tokens: 800`。Agnes API 在收到 `max_tokens` 参数后流式响应行为改变（疑似先在服务端完整生成再流式返回），导致首字延迟从原来的 1-2 秒暴涨到 10+ 秒，用户感知"非常非常慢"。

## What Changes
- 移除 `SimpleChatEngine.sendMessage` 请求体中的 `max_tokens` 硬编码字段，不再向 API 发送此参数，让 API 使用其默认行为（最快流式响应）
- 移除 `temperature` 硬编码字段，避免对 API 行为产生非预期影响
- 保留 `_buildApiMessages` 中的历史消息硬性截断（最多 12 条），此优化不影响第一轮回复速度，且对后续轮次有正面效果
- 当 settings 显式提供 `maxTokens`/`temperature` 时（未来扩展），仍然使用 settings 值

## Impact
- Affected code: `d:\BC\qmzz\index.html` — `SimpleChatEngine.sendMessage`（L12322-L12328 请求体构造）
- 不影响剧本生成流程（剧本生成使用独立的 maxTokens 预算，见 `data/custom-script-prompts.js`）
- 不影响历史消息截断逻辑（L12206-L12212 保留）

## MODIFIED Requirements
### Requirement: SimpleChatEngine 请求体构造
`SimpleChatEngine.sendMessage` 构造 API 请求体时，**不应**主动添加 `max_tokens` 和 `temperature` 字段。请求体只包含 `model`、`messages`、`stream: true`。仅当 settings 对象显式提供 `maxTokens`（数值且 > 0）或 `temperature`（数值）时，才将对应字段加入请求体。

#### Scenario: 默认配置（无 maxTokens/temperature）
- **WHEN** settings 不包含 `maxTokens` 和 `temperature` 字段（当前默认情况）
- **THEN** 请求体为 `{ model, messages, stream: true }`，不发送 `max_tokens` 和 `temperature`
- **AND** Agnes API 以默认流式行为响应，首字延迟恢复正常

#### Scenario: 显式配置
- **WHEN** settings 显式提供 `maxTokens` 或 `temperature`
- **THEN** 请求体包含对应的 `max_tokens` 和/或 `temperature` 字段
