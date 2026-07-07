# Tasks

- [ ] Task 1: 添加缓存控制 meta 标签和 file:// 协议检测横幅
  - 在 `<head>` 中添加三个缓存控制 meta 标签：`Cache-Control: no-cache, no-store, must-revalidate`、`Pragma: no-cache`、`Expires: 0`
  - 在页面加载时检测 `window.location.protocol === 'file:'`
  - 若为 file://，在页面顶部插入可关闭的黄色警告横幅，提示用户使用 HTTP 服务访问
  - 横幅样式：全宽、黄色背景、深色文字、右侧 × 关闭按钮
  - 验证：用 Playwright 分别通过 `file://` 和 `http://` 打开页面，确认横幅仅在 file:// 时显示

- [ ] Task 2: 增强 `SCE.prototype.sendMessage` 的 catch 块错误处理
  - 修改 [index.html:12110-12123](file:///d:/BC/ai_resume/qmzz/index.html#L12110) 的 `.catch()` 块
  - 在 catch 块开头添加 `console.error('[AI Connection] error:', { url: url, protocol: window.location.protocol, errorName: error.name, errorMessage: error.message, timedOut: timedOut });`
  - 根据 `error.name` 分类错误：
    - `AbortError` + `timedOut === true` → 超时提示："AI 响应超时（120 秒）。可能原因：网络延迟高、API 服务慢、或请求被防火墙拦截。请尝试测试连接以诊断问题。URL: {url}"
    - `TypeError`（Failed to fetch）+ `protocol === 'file:'` → file:// CORS 提示："AI 连接失败：浏览器拦截了请求。检测到通过 file:// 协议打开，请使用 HTTP 服务访问（如 `python -m http.server 8765` 后访问 `http://localhost:8765/index.html`）"
    - `TypeError`（Failed to fetch）+ 非 file:// → 网络/CORS 提示："AI 连接失败：网络请求被拦截。可能原因：API 地址不正确、网络不通、或浏览器扩展拦截。请检查 API 地址：{url}"
    - 其他 → 通用错误："AI 请求失败：{errMsg}。URL: {url}"
  - 同时增强 `response.ok` 为 false 时的错误（L12075）：根据状态码（401/403/404/429/5xx）添加针对性建议
  - 验证：用 Playwright 修改 API URL 为错误地址，发送消息，确认显示针对性错误而非通用超时

- [ ] Task 3: 增强 `modelTestBtn` 测试连接逻辑
  - 修改 [index.html:10301-10334](file:///d:/BC/ai_resume/qmzz/index.html#L10301) 的 `modelTestBtn` 点击处理器
  - 添加 15 秒超时的 AbortController：`var controller = new AbortController(); var timeoutId = setTimeout(function() { controller.abort(); }, 15000);`
  - 在 fetch 选项中添加 `signal: controller.signal`
  - 在 finally 中 `clearTimeout(timeoutId)`
  - 记录开始时间，在成功/失败时显示耗时
  - 增强 catch 块：区分 AbortError（超时）、TypeError（CORS/网络）、其他错误，显示针对性提示
  - 在 console 输出 `[AI Test Connection] url: {url}, status: {status}, elapsed: {ms}ms, error: {message}`
  - 成功时显示："连接成功（{耗时}ms，HTTP 200）。配置已保存。"
  - 验证：用 Playwright 点击测试连接按钮，分别测试正确/错误的 API 地址，确认显示详细结果

- [ ] Task 4: 在游戏设置面板添加"连接诊断"按钮
  - 在模型配置面板（modelConfigPanel）中找到合适位置，添加"连接诊断"按钮
  - 按钮点击后执行 `runConnectionDiagnostics()` 函数
  - `runConnectionDiagnostics()` 函数逻辑：
    1. 读取 `window.getEffectiveTextModelConfig()` 获取当前配置
    2. 构建 URL：`config.apiBaseUrl.replace(/\/+$/, '') + '/v1/chat/completions'`
    3. console 输出 `[AI Diagnostics] Start: url={url}, model={model}, protocol={window.location.protocol}`
    4. 发送测试请求（max_tokens: 5, stream: false, 15 秒超时）
    5. 收集结果：成功/失败、HTTP 状态码、耗时、错误详情、响应体前 200 字符
    6. console 输出 `[AI Diagnostics] Result: {result}`
    7. 以 Toast 或模态框形式展示诊断结果（包含配置信息、协议、状态码、耗时、错误详情）
  - 诊断结果格式示例：
    ```
    AI 连接诊断结果
    ────────────────
    API 地址: https://apihub.agnes-ai.com
    模型: agnes-2.0-flash
    API Key: sk-e8WSdc...
    协议: http://
    状态: ✅ 连接成功（HTTP 200，6247ms）
    ```
    或：
    ```
    AI 连接诊断结果
    ────────────────
    API 地址: https://api.deepseek.com
    模型: deepseek-chat
    API Key: sk-abc123...
    协议: file://
    状态: ❌ 连接失败
    错误: TypeError: Failed to fetch
    建议: 检测到通过 file:// 协议打开，请使用 HTTP 服务访问
    ```
  - 验证：用 Playwright 点击诊断按钮，确认显示完整诊断结果

- [ ] Task 5: 同步增强 `SCE.prototype.sendAction` 的错误处理
  - 修改 [index.html:11992-12040](file:///d:/BC/ai_resume/qmzz/index.html#L11992) 的 `sendAction` 方法
  - 添加 120 秒超时（与 sendMessage 一致）
  - 增强 catch 块错误处理（与 Task 2 一致）
  - 增强 `response.ok` 为 false 时的错误（与 Task 2 一致）
  - 验证：Grep 确认 sendAction 的 catch 块结构与 sendMessage 一致

# Task Dependencies

- Task 1（缓存控制 + file:// 检测）独立，可先执行
- Task 2（sendMessage 错误处理）独立，可与 Task 1 并行
- Task 3（modelTestBtn 增强）独立，可与 Task 1/2 并行
- Task 4（连接诊断按钮）依赖 Task 1/2/3 的错误分类逻辑，但可独立实现 UI 和诊断函数
- Task 5（sendAction 同步增强）依赖 Task 2 的错误分类模式，应最后执行以保持一致性
- 建议执行顺序：Task 1 → Task 2 → Task 3 → Task 4 → Task 5
