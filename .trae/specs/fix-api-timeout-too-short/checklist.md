# Checklist

- [ ] 剧本生成 API 超时从 45 秒改为 120 秒（[index.html:23919](file:///d:/BC/ai_resume/qmzz/index.html#L23919)）
- [ ] 官方剧本游玩 onChunk 回调已实现，流式内容实时显示（[index.html:26522](file:///d:/BC/ai_resume/qmzz/index.html#L26522)）
- [ ] 官方剧本游玩 chatEngine.sendMessage 添加了 120 秒超时（[index.html:12037](file:///d:/BC/ai_resume/qmzz/index.html#L12037)）
- [ ] 剧本生成进度条移除假动画，改为真实状态显示（[index.html:23483](file:///d:/BC/ai_resume/qmzz/index.html#L23483)）
- [ ] 剧本生成降级时进度条显示"高级模式超时，正在尝试中级模式…"（[index.html:23940](file:///d:/BC/ai_resume/qmzz/index.html#L23940)）
- [ ] 剧本生成超时错误信息已改进（[index.html:23730](file:///d:/BC/ai_resume/qmzz/index.html#L23730)）
- [ ] 游玩 AI 请求失败错误信息增加超时识别（[index.html:12089](file:///d:/BC/ai_resume/qmzz/index.html#L12089)）
- [ ] Playwright 验证：剧本生成 advanced 模式能在 120s 内成功完成（不再超时降级）
- [ ] Playwright 验证：官方剧本游玩发送消息后能看到 AI 内容逐字出现（onChunk 生效）
- [ ] Playwright 验证：进度条显示真实状态文本，无随机增长动画
