# 修复官方剧本 AI 连接再次失效 Spec

## Why

用户报告：自定义剧本修复可用后，官方剧本游玩时"又连接不上 AI 了"。这是该症状的第三次复发——第一次是 `queryLorebookWithPositions` 被删后调用抛 ReferenceError（已用内联匹配修复），第二次是 `fix-api-connection-diagnostics` spec 写完但从未实施。

本次对 `SCE.prototype.sendMessage`（[index.html:12158-12255](file:///d:/BC/ai_resume/qmzz/index.html#L12158)）及其调用方 `sendUserMessage`（[index.html:26314-26511](file:///d:/BC/ai_resume/qmzz/index.html#L26314)）做了详尽静态审查，结论：**当前代码中找不到明显的语法/引用错误**。但存在三类隐患，任一触发都会让玩家看到"打字指示器永远转圈 → 连接不上 AI"的同一表象：

1. **`sendMessage` 同步前缀未被 try/catch 覆盖**。`fetch` 之前调用了 `calculateImportance`（L12168）、`extractPlayerDecisions`（L12170）、`this.getSettings()`（L12173）、`settings.apiBaseUrl.replace(...)`（L12175）。现有的 try/catch 仅包住 `_buildApiMessages()`（L12179-12192）。若上述任一调用在特定章节/数据下抛错，会直接向上抛到 `sendUserMessage`——而 `sendUserMessage` 在 `chatEngine.sendMessage(...)`（L26415）外层**没有 try/catch**，于是 typing indicator 永不清理、输入框永不恢复，玩家体感为"等待首字 → 永久卡死"。这与 lorebook 那次是**同一类 bug**，只是触发点不同。
2. **浏览器加载旧缓存**。`<head>` 中**没有任何 cache-control meta 标签**（已 Grep 确认）。玩家极可能在加载仍含 lorebook bug 的旧版 index.html，而代码本体其实已修。`fix-api-connection-diagnostics` spec 早就识别了这点但从未实施。
3. **错误不可见**。`sendMessage` 的 catch 块（L12240-12254）只输出 `errMsg + fileHint`，不分类型、不带 URL、不带状态码、不写 console 诊断日志。`sendUserMessage` 的 onError 回调（L26489-26504）也只是 `addSystemMessage('错误：' + error)`。玩家和开发者都看不到真正的失败原因（CORS？超时？400？ReferenceError？），只能凭"连不上"三个字反复猜测。

附加隐患：`SCE.prototype.sendAction`（[index.html:12094-12156](file:///d:/BC/ai_resume/qmzz/index.html#L12094)）L12143 调用 `return read();` 但 `read` 在该作用域未定义（`sendMessage` 中 L12210 才定义）。Grep 确认 `sendAction` 无任何调用方（死代码），但留着是定时炸弹。

### 调查已排除

- `response_format` 不兼容：仅 `CustomScriptGenerator.run`（L23780）使用且已条件化；`sendMessage` 不发送该字段
- 配置差异：官方与自定义共享 `getEffectiveTextModelConfig()`（L11457、L23745），自定义能用即配置有效
- 函数缺失回归：`calculateImportance`（L12595）、`extractPlayerDecisions`（L12505）、`_buildSystemPrompt`、`_buildApiMessages` 链路所有函数均已定义
- 流式代码本身：`sendMessage` 的 SSE 解析与 lorebook spec 的 Playwright 验证一致

## What Changes

- **在 `sendMessage` 同步前缀外加保护性 try/catch**：覆盖 `calculateImportance` → `extractPlayerDecisions` → `getSettings` → URL 构造 → `_buildApiMessages` 全段，任何同步抛错都清理 `_isStreaming`/`_abortController`、回滚 `_messages`、调用 `onError` 而非向上冒泡
- **在 `sendUserMessage` 的 `chatEngine.sendMessage(...)` 调用外加 try/catch**：作为第二道防线，确保 typing indicator/输入框/发送按钮在任意异常下都能恢复
- **在 `<head>` 添加缓存控制 meta 标签**：`Cache-Control: no-cache, no-store, must-revalidate` + `Pragma: no-cache` + `Expires: 0`，让玩家始终加载最新代码
- **在页面加载时检测 file:// 协议并显示警告横幅**：可关闭的黄色横幅，提示使用 `python -m http.server` 等 HTTP 服务访问
- **增强 `sendMessage` catch 块错误分类**：区分 AbortError(超时)/TypeError(CORS/网络)/HTTP 错误(401/403/404/429/5xx)/其他，每种显示针对性中文提示 + URL + console 诊断日志（`[AI Connection]` 前缀）
- **在游戏设置面板添加"连接诊断"按钮**：点击后发送 max_tokens=5 的测试请求，显示 API 地址/模型/Key 掩码/协议/状态码/耗时/错误详情，便于玩家截图反馈
- **修复 `sendAction` 死代码 bug**：删除 L12143 的 `return read();`（`read` 未定义），或将其改为正确实现。鉴于无调用方，直接删除该方法的死代码分支即可
- **为 Agnes 添加非流式降级**：当 `sendMessage` 的流式请求收到非 200 或在 5 秒内抛 TypeError 时，自动用 `stream: false` 重试一次，解析 `data.choices[0].message.content` 后回调

## Impact

- Affected specs: `fix-lorebook-undefined-call`（同类 bug 的防御性补强）、`fix-api-connection-diagnostics`（本次实施其全部诊断能力，合并入此 spec）、`fix-custom-script-agnes-and-mail-announcement`（确认不冲突，本次不动 CustomScriptGenerator）
- Affected code: [index.html](file:///d:/BC/ai_resume/qmzz/index.html)
  - `<head>`：新增 3 个 cache-control meta 标签
  - 页面加载逻辑：新增 file:// 检测与警告横幅 DOM/JS
  - `SCE.prototype.sendMessage` (L12158-L12255)：同步前缀 try/catch 包裹 + catch 块错误分类增强 + Agnes 非流式降级
  - `SCE.prototype.sendAction` (L12094-L12156)：删除 L12143 死代码 `return read();`
  - `sendUserMessage` (L26314-L26511)：`chatEngine.sendMessage(...)` 调用外加 try/catch
  - 游戏设置面板 HTML：新增"连接诊断"按钮
  - 新增 `runConnectionDiagnostics()` 函数

## ADDED Requirements

### Requirement: sendMessage 同步前缀保护
`SCE.prototype.sendMessage` 在调用 `fetch` 之前的所有同步代码（含 `calculateImportance`、`extractPlayerDecisions`、`getSettings`、URL 构造、`_buildApiMessages`）SHALL 被一个外层 try/catch 包裹。任何同步抛错时，系统 SHALL：清理 `_isStreaming`/`_abortController`、从 `_messages` 弹出刚推入的用户消息、通过 `showErrorToast` 显示错误、调用 `onError` 回调，且不向上冒泡到调用方。

#### Scenario: calculateImportance 抛错
- **WHEN** `calculateImportance(userMsg, this)` 因任何原因抛错
- **THEN** typing indicator 被移除、输入框恢复可用、发送按钮恢复为"发送"、显示 `showErrorToast('发送失败：' + 错误信息)`、`onError` 被调用
- **AND** 错误不向上冒泡到 `sendUserMessage`
- **AND** console 输出 `[sendMessage] sync error:` + 完整错误对象

#### Scenario: getSettings 返回异常配置
- **WHEN** `settings.apiBaseUrl` 为 null/undefined 导致 `.replace` 抛 TypeError
- **THEN** 同上清理逻辑，且 toast 提示包含"API 配置异常，请检查模型调配"

### Requirement: sendUserMessage 调用方防御
`sendUserMessage` 在调用 `chatEngine.sendMessage(...)` 时 SHALL 用 try/catch 包裹。若 `sendMessage` 同步抛出未被内部捕获的异常，系统 SHALL 清理 typing indicator、恢复输入框与发送按钮状态、显示错误 toast。

#### Scenario: sendMessage 漏网抛错
- **WHEN** `chatEngine.sendMessage(...)` 同步抛出未被 sendMessage 内部 try/catch 捕获的异常
- **THEN** `_isCancelling` 重置为 false、`_stopElapsedChip(true, '错误')` 被调用、typing indicator 800ms 后移除、`addSystemMessage('发送失败，请重试')`、发送按钮恢复"发送"、输入框恢复可用

### Requirement: 缓存控制 meta 标签
`index.html` 的 `<head>` SHALL 包含三个缓存控制 meta 标签，确保浏览器始终加载最新代码。

#### Scenario: 浏览器加载页面
- **WHEN** 浏览器加载 index.html
- **THEN** `<meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate">` 存在
- **AND** `<meta http-equiv="Pragma" content="no-cache">` 存在
- **AND** `<meta http-equiv="Expires" content="0">` 存在

### Requirement: file:// 协议检测与警告
当页面通过 `file://` 协议加载时，系统 SHALL 在页面顶部显示可关闭的黄色警告横幅，提示使用 HTTP 服务访问。

#### Scenario: 通过 file:// 打开
- **WHEN** `window.location.protocol === 'file:'`
- **THEN** 页面顶部显示黄色横幅："⚠ 检测到通过 file:// 协议打开。浏览器可能拦截 AI 请求，导致游戏无法对话。请在项目目录运行 `python -m http.server 8765`，然后访问 `http://localhost:8765/index.html`"
- **AND** 横幅右侧有 × 关闭按钮，点击后横幅消失
- **AND** 横幅不影响其他页面元素布局

#### Scenario: 通过 HTTP 打开
- **WHEN** 协议为 `http:` 或 `https:`
- **THEN** 不显示横幅

### Requirement: sendMessage 错误分类与诊断
`sendMessage` 的 `.catch()` 块 SHALL 根据错误类型显示针对性提示，并在 console 输出诊断日志。

#### Scenario: 超时（AbortError + timedOut）
- **WHEN** 错误为 AbortError 且 `timedOut === true`
- **THEN** 显示："AI 响应超时（120 秒）。可能原因：网络延迟高、API 服务慢、防火墙拦截。可点击设置中的"连接诊断"排查。URL: {url}"
- **AND** console 输出 `[AI Connection] Timeout after 120s, url: {url}`

#### Scenario: CORS/网络错误（TypeError）
- **WHEN** 错误为 TypeError 且 `protocol === 'file:'`
- **THEN** 显示："AI 连接失败：浏览器拦截请求。检测到 file:// 协议，请使用 HTTP 服务访问（见顶部横幅）。URL: {url}"
- **AND** console 输出 `[AI Connection] CORS/Network error: {url}, protocol: file:, error: {message}`

#### Scenario: CORS/网络错误（非 file://）
- **WHEN** 错误为 TypeError 且协议非 file://
- **THEN** 显示："AI 连接失败：网络请求被拦截。可能：API 地址错误、网络不通、浏览器扩展拦截。URL: {url}"
- **AND** console 输出 `[AI Connection] CORS/Network error: {url}, protocol: {protocol}, error: {message}`

#### Scenario: HTTP 错误响应
- **WHEN** `response.ok` 为 false
- **THEN** 显示："AI 返回错误（HTTP {status}）：{针对性建议}"
  - 400: "官方 Agnes 模型可能不支持部分请求参数，已自动兼容；若仍失败请稍后重试或切换自定义模型"
  - 401/403: "请检查 API Key 是否正确"
  - 404: "API 地址不正确，请检查 baseUrl"
  - 429: "请求过于频繁，请稍后重试"
  - 5xx: "AI 服务端错误，请稍后重试"
- **AND** console 输出 `[AI Connection] HTTP error: {status} {statusText}, url: {url}`

### Requirement: Agnes 非流式降级
当 `sendMessage` 检测到 baseUrl 为 Agnes（`/agnes-ai\.com/i`）且流式请求失败（非 200 或 TypeError）时，SHALL 自动用 `stream: false` 重试一次，从 `data.choices[0].message.content` 取完整内容后调用 `onChunk` + `onComplete`。

#### Scenario: Agnes 流式失败后非流式成功
- **WHEN** 流式 fetch 抛 TypeError 或返回非 200，且 baseUrl 匹配 agnes-ai.com
- **THEN** 自动发起 `stream: false` 的重试请求（共用同一 AbortController 与 120s 超时）
- **AND** 成功时将 `data.choices[0].message.content` 作为完整内容调用 `onChunk(content, content)` 和 `onComplete(content)`
- **AND** 失败时按正常错误分类提示

#### Scenario: 非 Agnes 不降级
- **WHEN** baseUrl 非 Agnes 且流式失败
- **THEN** 直接走错误分类提示，不重试

### Requirement: 连接诊断工具
游戏设置面板 SHALL 提供"连接诊断"按钮，点击后执行完整诊断并展示结果。

#### Scenario: 用户点击连接诊断
- **WHEN** 用户在游戏设置面板点击"连接诊断"按钮
- **THEN** 执行：读取 `getEffectiveTextModelConfig()` → 构建 URL → 检测协议 → 发送 `max_tokens: 5, stream: false` 测试请求（15 秒超时）→ 收集状态码/耗时/错误
- **AND** 以模态框或 Toast 展示：API 地址、模型、Key 掩码（前 8 位 + ...）、协议、状态（✅成功 HTTP 200 耗时 Xms / ❌失败 + 错误详情 + 建议）
- **AND** console 输出 `[AI Diagnostics]` 完整日志

## MODIFIED Requirements

### Requirement: SCE.prototype.sendMessage 错误处理
原实现：catch 块仅显示 `errMsg + fileHint`，不分类型。
修改后：按错误类型（AbortError/TypeError/HTTPError）分类显示针对性提示，包含 URL 和修复建议，console 输出 `[AI Connection]` 诊断日志。

### Requirement: SCE.prototype.sendAction
原实现：L12143 调用 `return read();` 但 `read` 未定义。
修改后：删除该死代码行（无调用方，整段 then 回调中无后续逻辑依赖 read 结果）。

## REMOVED Requirements

### Requirement: sendAction 中的 read() 调用
**Reason**: `read` 在 sendAction 作用域未定义，且 sendAction 无任何调用方（死代码），保留会引入潜在 ReferenceError。
**Migration**: 直接删除 L12143 的 `return read();`。若未来需要 sendAction 功能，应参照 sendMessage 的 read() 实现重新定义。
