# Checklist

## Task 1: 缓存控制 + file:// 检测
- [ ] `<head>` 中存在 `<meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate">`
- [ ] `<head>` 中存在 `<meta http-equiv="Pragma" content="no-cache">`
- [ ] `<head>` 中存在 `<meta http-equiv="Expires" content="0">`
- [ ] 页面加载时检测 `window.location.protocol === 'file:'`
- [ ] file:// 时显示黄色警告横幅，含 `python -m http.server 8765` 与 `http://localhost:8765/index.html`
- [ ] 横幅有 × 关闭按钮，点击后隐藏
- [ ] HTTP/HTTPS 时不显示横幅

## Task 2: sendMessage 同步前缀 try/catch
- [ ] L12167-L12194 的同步代码被 try { ... } catch(e) { ... } 包裹
- [ ] catch 块设置 `self._isStreaming = false`
- [ ] catch 块清空 `self._abortController`
- [ ] catch 块调用 `self._messages.pop()` 回滚用户消息
- [ ] catch 块调用 `console.error('[sendMessage] sync error:', e)`
- [ ] catch 块调用 `showErrorToast(errMsg)`（若函数存在）
- [ ] catch 块调用 `onError(errMsg)` 并 `return`

## Task 3: sendUserMessage 调用方 try/catch
- [ ] L26415 的 `chatEngine.sendMessage(...)` 被 try/catch 包裹
- [ ] catch 块重置 `_isCancelling = false`
- [ ] catch 块调用 `_stopElapsedChip(true, '错误')`
- [ ] catch 块 800ms 后 `removeTypingIndicator()`
- [ ] catch 块调用 `addSystemMessage('发送失败，请重试：...')`
- [ ] catch 块恢复 `gameSendBtn` 为"发送"且 `disabled = false`
- [ ] catch 块恢复 `input.disabled = false` 并 `input.focus()`
- [ ] catch 块调用 `console.error('[sendUserMessage] sendMessage threw:', e)`

## Task 4: sendMessage catch 块错误分类
- [ ] catch 块开头有 `console.error('[AI Connection] error:', { url, protocol, errorName, errorMessage, timedOut })`
- [ ] AbortError + timedOut → 超时提示，含 URL 与诊断建议
- [ ] TypeError + file:// → file:// CORS 提示，含 HTTP 服务说明
- [ ] TypeError + 非 file:// → 网络/CORS 提示，含 URL
- [ ] 其他错误 → 通用错误，含 errMsg 与 URL
- [ ] `!response.ok` 分支按状态码（400/401/403/404/429/5xx）显示针对性建议
- [ ] 400 提示包含"官方 Agnes 模型可能不支持部分请求参数，已自动兼容"

## Task 5: Agnes 非流式降级
- [ ] catch 块中检测 `var isAgnes = /agnes-ai\.com/i.test(settings.apiBaseUrl);`
- [ ] 流式失败 + isAgnes + 未重试 → 调用 `_retryAgnesNonStream` 发起 `stream: false` 请求
- [ ] 重试成功 → 从 `data.choices[0].message.content` 取内容，调用 `onChunk` + `onComplete`
- [ ] 重试失败 → 按正常错误分类提示
- [ ] 重试用同一 AbortController 与剩余超时时间
- [ ] 非 Agnes 不触发降级

## Task 6: sendAction 死代码修复
- [ ] L12143 的 `return read();` 已删除（`read` 未定义）
- [ ] sendAction 方法签名保留（避免未来调用报 undefined）
- [ ] 方法开头添加 `console.warn('[sendAction] 此方法已废弃，请使用 sendMessage');`

## Task 7: 连接诊断按钮
- [ ] 游戏设置面板中存在 `id="connDiagBtn"` 按钮
- [ ] 按钮文本为"连接诊断"
- [ ] 点击按钮调用 `window.runConnectionDiagnostics()`
- [ ] 诊断显示 API 地址、模型、Key 掩码（前 8 位 + ...）
- [ ] 诊断显示当前协议（file:// 或 http:// 或 https://）
- [ ] 诊断显示连接状态（✅成功 HTTP 200 耗时 Xms / ❌失败 + 错误详情）
- [ ] 诊断有 15 秒超时
- [ ] console 输出 `[AI Diagnostics]` 完整日志

## 端到端验证
- [ ] Grep 确认 `response_format` 仍只在 CustomScriptGenerator 中且条件化（本次未动）
- [ ] Grep 确认 `queryLorebookWithPositions` 仍无残留引用（lorebook 修复未回归）
- [ ] Grep 确认 `return read()` 在 sendAction 中已移除
- [ ] Grep 确认 `[AI Connection]` 日志前缀存在
- [ ] Grep 确认 `[AI Diagnostics]` 日志前缀存在
- [ ] Grep 确认 `[sendMessage] sync error:` 日志前缀存在
- [ ] Grep 确认 `[sendUserMessage] sendMessage threw:` 日志前缀存在
- [ ] Grep 确认三个 cache-control meta 标签存在
- [ ] Grep 确认 `fileProtocolWarning` 元素逻辑存在
- [ ] Grep 确认 `connDiagBtn` 元素存在
- [ ] Grep 确认 `runConnectionDiagnostics` 函数定义存在
- [ ] Grep 确认 `_retryAgnesNonStream` 函数定义存在
