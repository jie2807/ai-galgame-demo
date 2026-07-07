# Checklist

## Task 1: 缓存控制 + file:// 检测
- [ ] `<head>` 中存在 `<meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate">` 标签
- [ ] `<head>` 中存在 `<meta http-equiv="Pragma" content="no-cache">` 标签
- [ ] `<head>` 中存在 `<meta http-equiv="Expires" content="0">` 标签
- [ ] 页面加载时检测 `window.location.protocol === 'file:'`
- [ ] file:// 协议时显示黄色警告横幅，包含 HTTP 服务使用说明
- [ ] 横幅有关闭按钮（×），点击后可关闭
- [ ] HTTP 协议时不显示横幅

## Task 2: sendMessage 错误处理
- [ ] catch 块开头有 `console.error('[AI Connection] error:', ...)` 输出完整调试信息
- [ ] AbortError + timedOut → 显示超时提示，包含 URL 和诊断建议
- [ ] TypeError + file:// → 显示 file:// CORS 提示，包含 HTTP 服务使用说明
- [ ] TypeError + 非 file:// → 显示网络/CORS 提示，包含 URL
- [ ] 其他错误 → 显示通用错误，包含 errMsg 和 URL
- [ ] `response.ok` 为 false 时，根据状态码（401/403/404/429/5xx）显示针对性建议
- [ ] 错误提示通过 `showErrorToast` 显示，持续 5 秒以上

## Task 3: modelTestBtn 增强
- [ ] 测试连接有 15 秒超时（AbortController）
- [ ] 超时后显示"连接超时（15 秒）"提示
- [ ] 成功时显示耗时："连接成功（{耗时}ms，HTTP 200）"
- [ ] HTTP 错误时显示状态码和针对性建议
- [ ] TypeError 时显示 CORS/网络错误提示，包含 file:// 检测
- [ ] console 输出 `[AI Test Connection]` 日志，包含 url、status、elapsed、error

## Task 4: 连接诊断按钮
- [ ] 游戏设置面板中存在"连接诊断"按钮
- [ ] 点击按钮后执行 `runConnectionDiagnostics()` 函数
- [ ] 诊断结果显示 API 地址、模型、Key 掩码（前 8 位 + ...）
- [ ] 诊断结果显示当前协议（file:// 或 http:// 或 https://）
- [ ] 诊断结果显示连接状态（成功/失败）、HTTP 状态码、耗时
- [ ] 失败时显示错误详情和建议
- [ ] console 输出 `[AI Diagnostics]` 完整日志
- [ ] 诊断结果以可读格式展示，便于用户截图反馈

## Task 5: sendAction 同步增强
- [ ] sendAction 有 120 秒超时（与 sendMessage 一致）
- [ ] sendAction 的 catch 块结构与 sendMessage 一致
- [ ] sendAction 的 `response.ok` 错误处理与 sendMessage 一致
- [ ] sendAction 在超时时显示与 sendMessage 一致的提示

## 端到端验证
- [ ] Playwright 通过 HTTP 加载页面，发送消息，确认正常收到 AI 回复
- [ ] Playwright 通过 HTTP 加载页面，设置错误 API URL，发送消息，确认显示针对性错误（而非通用超时）
- [ ] Playwright 点击"测试连接"按钮，确认显示详细结果（状态码、耗时）
- [ ] Playwright 点击"连接诊断"按钮，确认显示完整诊断结果
- [ ] Playwright 检查 console 日志，确认 `[AI Connection]` 和 `[AI Diagnostics]` 日志存在
- [ ] Grep 确认无遗漏的 fetch 调用缺乏错误处理
