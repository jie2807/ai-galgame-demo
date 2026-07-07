# Tasks

- [x] Task 1: 修复 Loading Overlay DOM 层级问题
  - [x] 1.1 修改 `_showLoadingOverlay(text)` 将 overlay 添加到 document.body 而非 this.container
  - [x] 1.2 修改 `_hideLoadingOverlay()` 从 document.body 查找并隐藏 overlay
  - [x] 1.3 修改 `_updateLoadingText(text)` 从 document.body 查找 text 元素
  - [x] 1.4 确保 overlay 有唯一 ID 避免冲突
  - [x] 1.5 验证 overlay 覆盖整个视口且能正确隐藏

- [x] Task 2: 修复 Live2D 选择器角色点击事件
  - [x] 2.1 将 `generateCharOptions()` 改为从 `gachaPool` 读取所有可用角色
  - [x] 2.2 实现点击后更新 NPC 卡片的头像按钮和信息
  - [x] 2.3 实现点击后关闭 modal
  - [x] 2.4 验证自定义 NPC 添加模型功能正常

- [x] Task 3: 优化游戏初始化消息渲染时序
  - [x] 3.1 修改 `_renderInitialMessagesFromEngine()` 从 gameCharacters 直接读取 firstMessage
  - [x] 3.2 处理 ScriptEngine 中 setTimeout 延迟 800ms 添加 firstMessage 的情况
  - [x] 3.3 验证游戏启动后能看到开场旁白和 NPC 欢迎消息

# Task Dependencies
- [Task 1] is independent - Loading overlay 可独立修复
- [Task 2] is independent - Live2D 选择器可独立修复
- [Task 3] depends on [Task 1] - 消息渲染在 loading 隐藏后执行
