# Tasks

- [x] Task 1: 添加缓存控制 meta 标签与 file:// 协议检测横幅
  - 在 `<head>` 中（紧邻 `<meta charset>` 与 `<meta name="viewport">` 之后）添加三个 meta 标签：`<meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate">`、`<meta http-equiv="Pragma" content="no-cache">`、`<meta http-equiv="Expires" content="0">`
  - 在页面加载早期（DOMContentLoaded 或 IIFE 入口）检测 `window.location.protocol === 'file:'`
  - 若为 file://，在 `<body>` 顶部插入黄色警告横幅：全宽、`background: #fef3cd`、`color: #856404`、`padding: 10px 16px`、`position: relative`，文本含 `python -m http.server 8765` 与 `http://localhost:8765/index.html`，右侧 × 关闭按钮（点击 `banner.style.display = 'none'`）
  - 横幅 id 设为 `fileProtocolWarning`，关闭按钮 id 设为 `fileProtocolWarningClose`
  - 验证：Grep 确认三个 meta 标签存在；Grep 确认 `fileProtocolWarning` 元素创建逻辑存在

- [x] Task 2: 为 sendMessage 同步前缀添加保护性 try/catch
  - 修改 [index.html:12158-12195](file:///d:/BC/ai_resume/qmzz/index.html#L12158) 的 `SCE.prototype.sendMessage`
  - 将 L12167-L12194（从 `var userMsg` 到 `var timeoutId = setTimeout(...)` 之前）整体包入 try/catch
  - catch 块：`self._isStreaming = false; if (self._abortController) { self._abortController = null; } self._messages.pop(); console.error('[sendMessage] sync error:', e); var errMsg = '发送失败：' + (e.message || String(e)); if (typeof showErrorToast === 'function') showErrorToast(errMsg); if (onError) onError(errMsg); return;`
  - 注意：`_buildApiMessages` 内层已有 try/catch，外层 try/catch 不会干扰它；外层捕获的是 `calculateImportance`/`extractPlayerDecisions`/`getSettings`/URL 构造等同步调用
  - 验证：Read 确认 L12167-L12194 已被 try { ... } catch(e) { ... } 包裹；外层 catch 调用 onError 并 return

- [x] Task 3: 在 sendUserMessage 调用方添加 try/catch 防御
  - 修改 [index.html:26415-26505](file:///d:/BC/ai_resume/qmzz/index.html#L26415) 的 `chatEngine.sendMessage(...)` 调用
  - 用 try { chatEngine.sendMessage(...); } catch(e) { ... } 包裹整个调用
  - catch 块：`_isCancelling = false; _stopElapsedChip(true, '错误'); setTimeout(function() { removeTypingIndicator(); }, 800); addSystemMessage('发送失败，请重试：' + (e.message || e)); console.error('[sendUserMessage] sendMessage threw:', e); if (gameSendBtn) { gameSendBtn.disabled = false; gameSendBtn.textContent = '发送'; } if (input) { input.disabled = false; input.focus(); }`
  - 验证：Read 确认 L26415 的 `chatEngine.sendMessage(...)` 被 try/catch 包裹；catch 块恢复 UI 状态

- [x] Task 4: 增强 sendMessage catch 块错误分类与诊断日志
  - 修改 [index.html:12240-12254](file:///d:/BC/ai_resume/qmzz/index.html#L12240) 的 `.catch()` 块
  - 在 catch 块开头添加：`console.error('[AI Connection] error:', { url: url, protocol: window.location.protocol, errorName: error.name, errorMessage: error.message, timedOut: timedOut });`
  - 根据 `error.name` 与 `timedOut` 分类：
    - `AbortError` + `timedOut === true` → `'AI 响应超时（120 秒）。可能原因：网络延迟高、API 服务慢、防火墙拦截。可点击设置中的"连接诊断"排查。URL: ' + url`
    - `TypeError` + `window.location.protocol === 'file:'` → `'AI 连接失败：浏览器拦截请求。检测到 file:// 协议，请使用 HTTP 服务访问（见顶部横幅）。URL: ' + url`
    - `TypeError` + 非 file:// → `'AI 连接失败：网络请求被拦截。可能：API 地址错误、网络不通、浏览器扩展拦截。URL: ' + url`
    - 其他 → `'AI 请求失败：' + (error.message || String(error)) + '。URL: ' + url`
  - 同时增强 L12205 的 `if (!response.ok)` 错误：读取 `response.status`，按 400/401/403/404/429/5xx 给针对性建议（参考 spec 中的 HTTP 错误响应场景）
  - 验证：Read 确认 catch 块含 `console.error('[AI Connection]`；含四类分支；L12205 含状态码分类

- [x] Task 5: 为 Agnes 添加非流式降级重试
  - 修改 [index.html:12195-12254](file:///d:/BC/ai_resume/qmzz/index.html#L12195) 的 fetch 链
  - 在 `.then(function(response){...})` 外层或 catch 中检测：`var isAgnes = /agnes-ai\.com/i.test(settings.apiBaseUrl);`
  - 当流式请求失败（`!response.ok` 或 catch 到 TypeError）且 `isAgnes` 且未重试过时：
    - 设置 `self._retryNonStream = true` 标志
    - 发起 `fetch(url, { method: 'POST', headers: headers, body: JSON.stringify({ model: settings.model, messages: apiMessages, stream: false }), signal: self._abortController.signal })`
    - 成功：`res.json()` → `var content = data.choices[0].message.content; if (onChunk) onChunk(content, content); var assistantMsg = {...}; self._messages.push(assistantMsg); if (onComplete) onComplete(content);`
    - 失败：按 Task 4 的错误分类提示
  - 重试逻辑用独立函数 `self._retryAgnesNonStream(url, headers, settings, apiMessages, onChunk, onComplete, onError, timeoutId)` 封装，避免嵌套过深
  - 验证：Grep 确认 `_retryAgnesNonStream` 函数定义存在；Read 确认 catch 中有 `isAgnes` 判断与重试调用

- [x] Task 6: 修复 sendAction 死代码 bug
  - 修改 [index.html:12094-12156](file:///d:/BC/ai_resume/qmzz/index.html#L12094) 的 `SCE.prototype.sendAction`
  - 删除 L12143 的 `return read();`（`read` 未定义，且无调用方）
  - 保留 L12136-L12142 的 response 处理骨架，但移除对未定义 `read` 的调用
  - 鉴于 sendAction 整体无调用方，可考虑在方法开头添加 `console.warn('[sendAction] 此方法已废弃，请使用 sendMessage');` 但不删除方法签名（避免未来调用时报 undefined）
  - 验证：Grep `return read()` 在 sendAction 范围内不再出现；Read 确认 L12143 已删除或替换

- [x] Task 7: 在游戏设置面板添加"连接诊断"按钮
  - 在模型配置面板（modelConfigPanel）中，紧邻"测试连接"按钮（modelTestBtn）后添加新按钮：`<button id="connDiagBtn" class="...">连接诊断</button>`
  - 新增函数 `window.runConnectionDiagnostics = function() { ... }`：
    1. 读取 `var cfg = window.getEffectiveTextModelConfig();`
    2. `var url = cfg.apiBaseUrl.replace(/\/+$/, '') + '/v1/chat/completions';`
    3. `var protocol = window.location.protocol;`
    4. `var keyMasked = cfg.apiKey ? (cfg.apiKey.substring(0, 8) + '...') : '(空)';`
    5. `console.log('[AI Diagnostics] Start:', { url: url, model: cfg.model, protocol: protocol, keyMasked: keyMasked });`
    6. 15 秒超时 AbortController
    7. `fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + cfg.apiKey }, body: JSON.stringify({ model: cfg.model, messages: [{ role: 'user', content: 'ping' }], max_tokens: 5, stream: false }), signal: controller.signal })`
    8. 记录开始时间，计算耗时
    9. 成功：`'[AI Diagnostics] Success: HTTP 200, elapsed: ' + elapsed + 'ms'` + 显示成功结果
    10. 失败：按错误类型分类，显示失败结果 + 建议
    11. 结果以模态框或 Toast 展示（含 API 地址/模型/Key 掩码/协议/状态/耗时/错误）
  - 绑定点击事件：`document.getElementById('connDiagBtn').addEventListener('click', window.runConnectionDiagnostics);`
  - 验证：Grep 确认 `connDiagBtn` 元素存在；Grep 确认 `runConnectionDiagnostics` 函数定义存在；Grep 确认 `[AI Diagnostics]` 日志前缀存在

# Task Dependencies

- Task 1（缓存控制 + file:// 检测）独立，可先执行
- Task 2（sendMessage 同步前缀 try/catch）独立，可与 Task 1 并行
- Task 3（sendUserMessage 调用方 try/catch）独立，可与 Task 1/2 并行
- Task 4（sendMessage catch 块增强）依赖 Task 2 完成后的代码结构，应在 Task 2 后执行
- Task 5（Agnes 非流式降级）依赖 Task 4 的错误分类逻辑，应在 Task 4 后执行
- Task 6（sendAction 死代码修复）独立，可任意时间执行
- Task 7（连接诊断按钮）独立，可与 Task 1-6 并行
- 建议执行顺序：Task 1 → Task 2 → Task 3 → Task 4 → Task 5 → Task 6 → Task 7
