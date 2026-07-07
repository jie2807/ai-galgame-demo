# 修复官方 AI API 响应慢导致的"无反馈/无法生成"问题 Spec

## Why

用户反馈两个核心问题：
1. **官方剧本游玩**：输入内容后等待很久都没有反馈
2. **自定义剧本智能生成**：进度条在动，但还是没有办法进行剧本的生成

经深入实测确认根因（非单纯超时，而是**超时阈值 + 流式反馈缺失 + 假进度条**三者叠加）：

### 根因 1：剧本生成超时 45 秒远不够（advanced 模式需 60 秒）

实测 API 响应时间（官方 key `sk-e8WSdcxmVROHDn2JQZ84hAoa7NbWqy9WiY9FapnhaLujV7JF`，模型 `agnes-2.0-flash`）：
- basic 模式（max_tokens 2048，短 prompt）：**14.8 秒** ✓ 在 45s 内成功
- advanced 模式（max_tokens 8192，长 prompt，400-800 字 worldBg）：**60.4 秒** ✗ 超过 45s 超时

`CustomScriptGenerator.run` 的降级逻辑（[index.html:23881-23883](file:///d:/BC/ai_resume/qmzz/index.html#L23881)）：
```javascript
var modesToTry = [mode];
if (mode === 'advanced') modesToTry.push('medium', 'basic');
else if (mode === 'medium') modesToTry.push('basic');
```
每个模式各有独立 45 秒超时（[index.html:23919](file:///d:/BC/ai_resume/qmzz/index.html#L23919)）。advanced 模式实测：advanced 超时(45s) → medium 超时(45s) → basic 成功(30s) = **总耗时 121.7 秒**。用户看到进度条动了 2 分钟，认为"无法生成"而放弃。

### 根因 2：官方剧本游玩 onChunk 回调为空，流式内容完全不显示

`sendUserMessage`（[index.html:26522-26524](file:///d:/BC/ai_resume/qmzz/index.html#L26522)）调用 `chatEngine.sendMessage` 时，onChunk 回调是**空的**：
```javascript
chatEngine.sendMessage(apiContent, currentGameChapter,
    (chunk, full) => {        // ← 空实现！流式 chunk 完全不显示
    },
    (fullContent) => { ... }, // onComplete：流结束后才一次性显示
    (error) => { ... }        // onError
);
```
`chatEngine.sendMessage`（[index.html:12037-12092](file:///d:/BC/ai_resume/qmzz/index.html#L12037)）使用 `stream: true`，系统 prompt 超过 3000 字（含大量规则），API 生成需 20-30 秒。由于 onChunk 为空，用户在 20-30 秒内只看到"输入中"指示器，**看不到任何 AI 生成的内容**，体感为"没有反馈"。

### 根因 3：假进度条误导用户

`showGenProgress`（[index.html:23483-23509](file:///d:/BC/ai_resume/qmzz/index.html#L23483)）启动 `setInterval`（每 400ms 随机增长到 90%），这是**纯装饰性动画**，与 API 实际进度完全无关。用户看到"进度条在动"以为在工作，实际 API 可能已超时正在降级重试。

## What Changes

### 修改 1：剧本生成超时 45s → 120s
- [index.html:23919](file:///d:/BC/ai_resume/qmzz/index.html#L23919)：`45000` → `120000`
- 理由：advanced 模式实测需 60s，留 2 倍裕量应对 API 波动

### 修改 2：官方剧本游玩实现 onChunk 流式反馈
- [index.html:26522-26524](file:///d:/BC/ai_resume/qmzz/index.html#L26522)：实现 onChunk 回调，流式显示 AI 生成内容
- 在 onChunk 中实时更新打字指示器内容，让用户看到 AI 正在逐字生成

### 修改 3：官方剧本游玩添加 120s 超时
- [index.html:12037](file:///d:/BC/ai_resume/qmzz/index.html#L12037)：为 `chatEngine.sendMessage` 的 fetch 添加 120s 超时
- 理由：当前无任何超时，API 卡死时用户无限等待

### 修改 4：剧本生成进度条显示真实状态
- [index.html:23494-23508](file:///d:/BC/ai_resume/qmzz/index.html#L23494)：假动画改为显示真实阶段文本（"正在生成 [模式] 剧本… 已用时 Xs"）
- 降级时显示"高级模式超时，正在尝试中级模式…"

### 修改 5：改进超时错误提示
- [index.html:23730](file:///d:/BC/ai_resume/qmzz/index.html#L23730)：剧本生成超时错误信息
- [index.html:12089](file:///d:/BC/ai_resume/qmzz/index.html#L12089)：游玩 AI 请求失败错误信息

## Impact

- Affected specs: 无（首次创建）
- Affected code:
  - [index.html:23919](file:///d:/BC/ai_resume/qmzz/index.html#L23919) — 剧本生成超时
  - [index.html:26522-26524](file:///d:/BC/ai_resume/qmzz/index.html#L26522) — 游玩 onChunk 回调
  - [index.html:12037-12092](file:///d:/BC/ai_resume/qmzz/index.html#L12037) — chatEngine.sendMessage（添加超时）
  - [index.html:23483-23509](file:///d:/BC/ai_resume/qmzz/index.html#L23483) — showGenProgress（真实状态）
  - [index.html:23730](file:///d:/BC/ai_resume/qmzz/index.html#L23730) — 剧本超时错误信息
  - [index.html:12089](file:///d:/BC/ai_resume/qmzz/index.html#L12089) — 游玩错误信息

## ADDED Requirements

### Requirement: 流式响应实时反馈

The system SHALL 在官方剧本游玩中，将 AI 流式响应的 chunk 实时显示给用户，而非等到全部完成才一次性显示。

#### Scenario: AI 正在生成回复
- **WHEN** 用户在官方剧本游玩中输入内容并发送
- **THEN** 打字指示器应显示 AI 正在生成的部分内容（逐字更新）
- **AND** 用户能直观看到 AI 正在工作，而非只看到"输入中"无内容

#### Scenario: AI 生成完成
- **WHEN** 流式响应完成
- **THEN** 完整内容通过 `processAIResponse` 正常处理和显示
- **AND** 打字指示器移除

### Requirement: 官方剧本游玩超时保护

The system SHALL 为官方剧本游玩的 AI 请求设置 120 秒超时，避免 API 卡死时用户无限等待。

#### Scenario: API 响应正常（20-60 秒）
- **WHEN** 用户发送消息
- **AND** API 在 120 秒内响应
- **THEN** 请求正常完成，内容显示

#### Scenario: API 超时
- **WHEN** API 在 120 秒内未响应
- **THEN** 请求中止，显示"AI 响应超时，请稍后重试"
- **AND** 输入框重新启用

### Requirement: 剧本生成进度条真实反馈

The system SHALL 在剧本生成过程中显示真实状态信息，而非纯装饰性动画。

#### Scenario: 正在生成剧本
- **WHEN** 用户点击智能生成
- **THEN** 进度条显示当前模式（"正在生成高级剧本…"）和已用时间
- **AND** 不使用随机增长的假动画

#### Scenario: 降级重试
- **WHEN** 高级模式超时，降级到中级模式
- **THEN** 进度条显示"高级模式超时，正在尝试中级模式…"

## MODIFIED Requirements

### Requirement: 剧本生成 API 超时

剧本生成（`CustomScriptGenerator.run`）的 API 超时从 45 秒调整为 120 秒。

修改位置：[index.html:23919](file:///d:/BC/ai_resume/qmzz/index.html#L23919)
```javascript
// 当前
var timeoutId = setTimeout(function() { controller.abort(); }, 45000);
// 改为
var timeoutId = setTimeout(function() { controller.abort(); }, 120000);
```

### Requirement: 剧本生成超时错误提示

修改位置：[index.html:23730](file:///d:/BC/ai_resume/qmzz/index.html#L23730)
```javascript
// 当前
throw new APIError('请求超时，请检查网络或 API 是否可达', 0);
// 改为
throw new APIError('请求超时（已等待 120 秒）。API 响应较慢，请尝试降低生成模式或稍后重试', 0);
```

### Requirement: 游玩 AI 请求失败错误提示

修改位置：[index.html:12089](file:///d:/BC/ai_resume/qmzz/index.html#L12089)
```javascript
// 当前
showErrorToast('AI 请求失败：' + errMsg + '，请检查 API 配置' + fileHint);
// 改为（增加超时识别）
var isTimeout = error.name === 'AbortError';
showErrorToast(isTimeout ? 'AI 响应超时（120 秒），请稍后重试' : 'AI 请求失败：' + errMsg + '，请检查 API 配置' + fileHint);
```
