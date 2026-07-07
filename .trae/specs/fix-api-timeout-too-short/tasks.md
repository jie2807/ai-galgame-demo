# Tasks

- [x] Task 1: 剧本生成超时 45s → 120s
  - 修改 [index.html:23913](file:///d:/BC/ai_resume/qmzz/index.html#L23913) 的 `setTimeout` 从 `45000` 改为 `120000`
  - 理由：advanced 模式 API 实测需 60s，45s 必超时
  - 验证：Grep 确认该行已是 `120000` ✓

- [x] Task 2: 官方剧本游玩实现 onChunk 流式反馈
  - 修改 [index.html:26519-26533](file:///d:/BC/ai_resume/qmzz/index.html#L26519) 的空 onChunk 回调
  - 实现：在 typingIndicator 的 .msg-content 内追加 .typing-preview span，显示 AI 流式生成的尾部 150 字符
  - 保留 typing-dot 动画，预览元素用浅色区分
  - 验证：代码已实施，待 Playwright 实测

- [x] Task 3: 官方剧本游玩 chatEngine.sendMessage 添加 120s 超时
  - 修改 [index.html:12037-12038](file:///d:/BC/ai_resume/qmzz/index.html#L12037) 添加 `setTimeout(..., 120000)` + `timedOut` 标志
  - `clearTimeout(timeoutId)` 在成功路径（12058）和 catch（12087）
  - 用 `timedOut` 标志区分用户主动取消与超时（用户取消静默返回，超时显示提示）
  - 验证：读取修改后的代码，确认有 setTimeout + clearTimeout + timedOut 标志 ✓

- [x] Task 4: 剧本生成进度条改为真实状态显示
  - 修改 [index.html:23483-23503](file:///d:/BC/ai_resume/qmzz/index.html#L23483) 的 `showGenProgress` 函数
  - 移除 `setInterval` 随机增长动画，改为固定 30% 进度
  - 修改 `run` 方法中降级时的提示（[index.html:23934](file:///d:/BC/ai_resume/qmzz/index.html#L23934)），调用 `updateGenProgress` 显示"高级模式超时，正在尝试中级模式…"
  - 验证：读取修改后的代码，确认无 setInterval 随机动画 ✓

- [x] Task 5: 改进超时错误提示
  - 修改 [index.html:23724](file:///d:/BC/ai_resume/qmzz/index.html#L23724)：剧本生成超时错误信息改为 `'请求超时（已等待 120 秒）。API 响应较慢，请尝试降低生成模式或稍后重试'`
  - 修改 [index.html:12093-12094](file:///d:/BC/ai_resume/qmzz/index.html#L12093)：游玩错误信息增加超时识别（AbortError → "AI 响应超时（120 秒），请稍后重试"）
  - 验证：Grep 确认新错误信息已生效 ✓

# Task Dependencies

- 所有 5 个 Task 已完成实施
- 待验证：Playwright 端到端测试
