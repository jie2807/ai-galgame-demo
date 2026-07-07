# Tasks

- [x] Task 1: 修复核心 Bug - ScriptEngineBridge 使用错误的 AI 服务
  - [x] 1.1 将 `new AIService()` 改为 `new GameAIService()`
  - [x] 1.2 验证 `buildApiMessages()` 方法可用
  - [x] 1.3 验证 AI API 请求可以正常发送

- [x] Task 2: 清理 index.html 中的旧版游戏系统干扰

- [x] Task 3: 验证游戏完整流程
  - [x] 3.1 确认 GameAIService 提供 buildApiMessages() 方法
  - [x] 3.2 确认 DialogueEngine 可以正确发送 AI 请求

# Task Dependencies
- [Task 1] 是最高优先级，必须最先修复
- [Task 2] 可与 Task 1 并行
- [Task 3] 依赖 [Task 1] 和 [Task 2]
