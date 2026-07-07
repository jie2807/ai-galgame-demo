# Checklist

- [x] 1.1 startGame() 非 file: 分支使用 try-catch-finally 模式
- [x] 1.2 startGame() 无论成功或失败都重置 _isStartingGame
- [x] 1.3 file: 协议分支 return 后 _isStartingGame 正确释放
- [x] 2.1 开场旁白被正确渲染
- [x] 2.2 NPC firstMessage 被正确渲染为 NPC 消息
- [x] 2.3 旧会话消息被正确恢复和渲染
- [x] 2.4 消息顺序正确
- [x] 3.1 npc.live2dModel 正确设置
- [x] 3.2 游戏启动时 NPC 肖像正确显示
- [x] 3.3 Live2D 模型在游戏中正确加载（如果配置）
- [x] 4.1 initChatBridge 各阶段有 console.log 输出
- [x] 4.2 startGame() / startCustomGameFromConfig() 有开始/结束日志
- [x] 5.1 切换游戏后视觉小说层不残留旧旁白
- [x] 5.2 _galgameResetDialogue() 取消 RAF 与安全定时器
- [x] 5.3 整个脚本块语法验证通过
