# Tasks

- [x] Task 1: 修复 startGame() 启动锁生命周期
  - [x] 1.1 使用 try-finally 模式包裹非 file: 协议分支
  - [x] 1.2 确保无论成功或失败都重置 _isStartingGame
  - [x] 1.3 修复 file: 协议分支 return 后 _isStartingGame 未释放导致的启动锁死

- [x] Task 2: 渲染初始消息到游戏页面
  - [x] 2.1 确保 startGame() / startCustomGameFromConfig() 渲染 openingScene 旁白
  - [x] 2.2 确保 firstMessage 正确渲染为 NPC 消息
  - [x] 2.3 确保消息按正确顺序显示
  - [x] 2.4 测试首次启动和退出后再次启动场景

- [x] Task 3: 修复 NPCData 与 Live2D 模型 URL 的关联
  - [x] 3.1 验证 startGame() / startCustomGameFromConfig() 正确设置 npcLive2DModels
  - [x] 3.2 验证 loadNPCModel() 正确加载 NPC Live2D 模型
  - [x] 3.3 测试 NPC 肖像和 Live2D 在游戏中正确显示

- [x] Task 4: 添加调试日志
  - [x] 4.1 在 initChatBridge 各阶段添加 console.log
  - [x] 4.2 在 startGame() / startCustomGameFromConfig() 中添加开始/结束日志
  - [x] 4.3 验证日志输出帮助排查问题

- [x] Task 5: 修复视觉小说层旧消息残留
  - [x] 5.1 在 startCustomGameFromConfig() 中调用 _galgameResetDialogue()
  - [x] 5.2 完善 _galgameResetDialogue() 取消 RAF、安全定时器并重置打字状态
  - [x] 5.3 验证切换游戏后视觉小说层不残留旧旁白

# Task Dependencies
- [Task 2] depends on [Task 1] - 消息渲染需要在启动锁正确释放后进行
- [Task 3] is independent - Live2D 关联独立于消息渲染
- [Task 4] can be done in parallel - 调试日志可独立添加
- [Task 5] depends on [Task 2] - 重置对话层需在消息渲染完成后生效
