# Tasks

- [ ] Task 1: 修复 file:// 协议下点击「开启」返回首页的问题
  - [ ] SubTask 1.1: 在 `index.html` 中 `main.js` 模块加载失败时提供降级方案，使内联游戏系统可工作
  - [ ] SubTask 1.2: 确保 `startGame()` 函数在 `file://` 协议下能正确显示 `#gamePage`
  - [ ] SubTask 1.3: 确保 `startCustomGameFromConfig()` 在 `file://` 协议下能关闭编辑器并显示游戏页面

- [ ] Task 2: 修复自定义剧本编辑器立绘按钮不可见的问题
  - [ ] SubTask 2.1: 在 `custom-chapter.css` 中为 `.cce-npc-portrait-btn` 添加正确的显示样式
  - [ ] SubTask 2.2: 确保按钮在 NPC 卡片中正确布局

- [ ] Task 3: 修复立绘选择器无数据时显示空白的问题
  - [ ] SubTask 3.1: 为 `generateCharOptions()` 添加内置默认角色池（不依赖 `gachaPool`）
  - [ ] SubTask 3.2: 确保选择角色后能正确更新 NPC 卡片头像和信息

# Task Dependencies
- [Task 1] 是最高优先级，独立
- [Task 2] 独立，可与 Task 1 并行
- [Task 3] 可与 Task 2 并行
