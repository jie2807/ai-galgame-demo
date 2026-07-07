# 修复 AI 连接诊断与错误可见性 Spec

## Why

用户反馈"连接不上对应的 AI"，但之前的代码层面修复（lorebook 未定义函数）已通过 Playwright 端到端验证完全正常：
- `_buildApiMessages()` 成功返回（不再抛出 ReferenceError）
- 官方 API `https://apihub.agnes-ai.com/v1/chat/completions` 返回 200 OK，流式响应 9 秒完成
- DeepSeek API `https://api.deepseek.com/v1/chat/completions` 从浏览器 fetch 可达（401 为假 key，CORS 正常）
- `sendMessage` 完整流程：110 个 chunks，完整 NPC 回复

**但用户仍报告"改半天都没有解决"**，说明用户环境与测试环境存在差异。最可能的原因：
1. **浏览器缓存** — 用户加载的是旧版缓存文件，lorebook 修复未生效
2. **file:// 协议** — 用户可能通过 `file:///` 打开，部分浏览器配置会拦截跨域请求
3. **存储了错误的自定义 API 配置** — 覆盖了官方 API

**核心问题**：当前代码在连接失败时缺乏清晰的错误反馈和诊断手段。用户看到的是"打字指示器转圈 → 120 秒后超时"，而非"连接失败：[具体原因]"。`sendMessage` 的 catch 块错误处理过于简陋，`modelTestBtn` 无超时机制，且无 file:// 协议检测。

## What Changes

- **在 `SCE.prototype.sendMessage` 的 catch 块中增强错误分类与提示**
  - 区分 CORS 错误（TypeError: Failed to fetch）、网络超时（AbortError）、HTTP 错误（4xx/5xx）、file:// 协议
  - 对每种错误类型提供针对性的中文提示和修复建议
  - 在 console 中输出完整的请求 URL、状态码、错误详情用于调试

- **在 `modelTestBtn` 测试连接逻辑中添加超时和详细错误反馈**
  - 添加 15 秒超时（AbortController）
  - 区分 CORS、网络、认证、HTTP 错误并显示具体原因
  - 显示响应耗时和状态码

- **添加 file:// 协议检测与显著警告**
  - 页面加载时检测 `window.location.protocol === 'file:'`
  - 显示显著的横幅警告："检测到通过 file:// 协议打开，浏览器可能拦截 AI 请求。请使用 HTTP 服务（如 `python -m http.server 8765`）访问。"
  - 在 API 错误提示中也包含 file:// 检测

- **添加缓存破坏机制**
  - 在 `<head>` 中添加 `<meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate">`
  - 添加 `<meta http-equiv="Pragma" content="no-cache">`
  - 添加 `<meta http-equiv="Expires" content="0">`
  - 确保用户始终加载最新代码

- **在游戏设置面板添加"连接诊断"按钮**
  - 点击后执行完整的连接诊断：
    1. 显示当前 API 配置（URL、model、key 掩码）
    2. 检测 file:// 协议
    3. 发送测试请求（max_tokens: 5, stream: false）
    4. 显示响应状态、耗时、错误详情
    5. 在 console 输出完整诊断日志
  - 诊断结果以模态框/Toast 形式展示，便于用户截图反馈

## Impact

- Affected specs: `fix-lorebook-undefined-call`（已修复但用户未感知，需诊断确认）、`fix-api-timeout-too-short`（超时是症状，连接失败是根因）
- Affected code: [index.html](file:///d:/BC/ai_resume/qmzz/index.html)
  - `<head>` 元数据区：添加缓存控制 meta 标签
  - `SCE.prototype.sendMessage` (L12042-L12124)：增强 catch 块错误处理
  - `modelTestBtn` 事件处理器 (L10301-L10334)：添加超时和详细错误
  - 游戏设置面板 UI：添加"连接诊断"按钮
  - 页面加载逻辑：添加 file:// 协议检测横幅

## ADDED Requirements

### Requirement: AI 请求错误分类与清晰反馈
当 `SCE.prototype.sendMessage` 的 fetch 请求失败时，系统 SHALL 根据错误类型显示针对性的错误提示，而非通用的"AI 请求失败"。

#### Scenario: CORS 错误（TypeError: Failed to fetch）
- **WHEN** fetch 抛出 TypeError，且 `window.location.protocol === 'file:'`
- **THEN** 显示错误："AI 连接失败：浏览器拦截了请求。检测到通过 file:// 协议打开，请使用 HTTP 服务访问（如 `python -m http.server 8765` 后访问 `http://localhost:8765/index.html`）"
- **AND** 在 console 输出 `[AI Connection] CORS/Network error: {url}, protocol: file://, error: {message}`

#### Scenario: CORS 错误（HTTP 协议但被拦截）
- **WHEN** fetch 抛出 TypeError，且 `window.location.protocol !== 'file:'`
- **THEN** 显示错误："AI 连接失败：网络请求被拦截。可能原因：API 地址不正确、网络不通、或浏览器扩展拦截。请检查 API 地址：{url}"
- **AND** 在 console 输出 `[AI Connection] CORS/Network error: {url}, protocol: {protocol}, error: {message}`

#### Scenario: HTTP 错误响应
- **WHEN** fetch 返回非 200 状态码
- **THEN** 显示错误："AI 返回错误（HTTP {status}）：{statusText}。{针对性建议}"
  - 401/403: "请检查 API Key 是否正确"
  - 404: "API 地址不正确，请检查 baseUrl"
  - 429: "请求过于频繁，请稍后重试"
  - 5xx: "AI 服务端错误，请稍后重试"
- **AND** 在 console 输出 `[AI Connection] HTTP error: {status} {statusText}, url: {url}`

#### Scenario: 超时
- **WHEN** AbortController 在 120 秒后触发 abort
- **THEN** 显示错误："AI 响应超时（120 秒）。可能原因：网络延迟高、API 服务慢、或请求被防火墙拦截。请尝试测试连接以诊断问题。"
- **AND** 在 console 输出 `[AI Connection] Timeout after 120s, url: {url}`

### Requirement: 模型测试连接超时与详细错误
当用户点击"测试连接"按钮时，系统 SHALL 在 15 秒内完成测试并显示详细结果，而非无限等待。

#### Scenario: 测试连接成功
- **WHEN** 用户点击测试连接，且 API 在 15 秒内返回 200
- **THEN** 显示："连接成功（{耗时}ms，HTTP 200）。配置已保存。"

#### Scenario: 测试连接超时
- **WHEN** 用户点击测试连接，且 15 秒内无响应
- **THEN** 显示："连接超时（15 秒）。请检查 API 地址是否正确、网络是否通畅。"
- **AND** 中止请求（AbortController.abort）

#### Scenario: 测试连接返回错误
- **WHEN** 用户点击测试连接，且 API 返回非 200
- **THEN** 显示："连接失败（HTTP {status}）。{针对性建议}"
- **AND** 显示响应体前 200 字符（如有）

#### Scenario: 测试连接网络错误
- **WHEN** 用户点击测试连接，且 fetch 抛出 TypeError
- **THEN** 显示："连接错误：{error.message}。可能原因：API 地址不正确、CORS 被拦截、网络不通。{file:// 提示}"

### Requirement: file:// 协议检测与警告
当页面通过 `file://` 协议加载时，系统 SHALL 在页面顶部显示显著的警告横幅。

#### Scenario: 通过 file:// 打开
- **WHEN** `window.location.protocol === 'file:'`
- **THEN** 在页面顶部显示黄色警告横幅："⚠ 检测到通过 file:// 协议打开。浏览器可能拦截 AI 请求，导致游戏无法正常对话。请使用 HTTP 服务访问：在项目目录运行 `python -m http.server 8765`，然后访问 `http://localhost:8765/index.html`"
- **AND** 横幅可关闭（点击 × 按钮）

#### Scenario: 通过 HTTP 打开
- **WHEN** `window.location.protocol` 为 `http:` 或 `https:`
- **THEN** 不显示警告横幅

### Requirement: 连接诊断工具
游戏设置面板 SHALL 提供"连接诊断"按钮，点击后执行完整的连接诊断并显示结果。

#### Scenario: 用户点击连接诊断
- **WHEN** 用户在游戏设置面板点击"连接诊断"按钮
- **THEN** 执行以下诊断步骤并显示结果：
  1. 当前 API 配置：`{apiBaseUrl}` / model: `{model}` / key: `{key 前 8 位}...`
  2. 协议检测：`{file:// 或 http:// 或 https://}`
  3. 发送测试请求到 `{apiBaseUrl}/v1/chat/completions`
  4. 显示结果：成功/失败、HTTP 状态码、耗时、错误详情
- **AND** 在 console 输出完整诊断日志（前缀 `[AI Diagnostics]`）
- **AND** 诊断结果以 Toast 或模态框形式展示，持续显示直到用户关闭

### Requirement: 缓存控制
HTML 文件 SHALL 包含缓存控制 meta 标签，防止浏览器加载旧版缓存。

#### Scenario: 浏览器加载页面
- **WHEN** 浏览器加载 index.html
- **THEN** 由于 `<meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate">` 标签，浏览器始终向服务器请求最新版本

## MODIFIED Requirements

### Requirement: SCE.prototype.sendMessage 错误处理
`sendMessage` 的 `.catch()` 块 SHALL 根据错误类型（TypeError/AbortError/HTTPError）显示针对性的错误提示，并在 console 输出调试信息。错误提示 SHALL 包含：
1. 错误类型分类（CORS/网络/超时/HTTP 错误）
2. 请求的 URL（便于用户核对配置）
3. 针对性的修复建议
4. file:// 协议检测（如适用）

### Requirement: modelTestBtn 测试连接
`modelTestBtn` 的点击事件处理器 SHALL：
1. 创建 15 秒超时的 AbortController
2. 在 catch 块中区分 TypeError（CORS/网络）、AbortError（超时）、HTTP 错误
3. 显示详细的错误信息和修复建议
4. 在 console 输出完整的诊断日志
