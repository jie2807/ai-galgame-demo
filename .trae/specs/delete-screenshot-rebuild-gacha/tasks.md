# Tasks

- [x] Task 1: 删除截图功能
  - [x] SubTask 1.1: 删除 `#gameScreenshotBtn` HTML 按钮（第 1629-1635 行）
  - [x] SubTask 1.2: 删除 `takeGameScreenshot()` 函数（约第 4861-4928 行）
  - [x] SubTask 1.3: 删除 `createGamePageSVG()` 函数（约第 4930 行起）
  - [x] SubTask 1.4: 删除截图事件绑定（约第 6668-6673 行）
  - [x] SubTask 1.5: 删除 `.game-screenshot-btn` 相关 CSS 样式

- [x] Task 2: 删除全局加载动画
  - [x] SubTask 2.1: 删除 `showLoading()`、`hideLoading()`、`setLoadingText()` 函数
  - [x] SubTask 2.2: 删除 `#globalLoading` HTML 元素及 CSS 样式
  - [x] SubTask 2.3: 将所有 `showLoading()`/`hideLoading()`/`setLoadingText()` 调用替换为 `showToast()` 或静默处理

- [x] Task 3: 重建招募系统 - 确保角色可在剧本中使用
  - [x] SubTask 3.1: 确保 `gachaPool` 中的角色数据包含 `live2dModel` 字段，与 `npcLive2DModels` 打通
  - [x] SubTask 3.2: 确保自定义剧本编辑器的立绘选择器优先使用 `gachaPool` 数据
  - [x] SubTask 3.3: 确保游戏页面 `startGame()` 中正确调用 `loadNPCModel()` 显示 Live2D 模型
  - [x] SubTask 3.4: 在 `file://` 协议下的 `startGame()` 降级流程中也调用模型加载
  - [x] SubTask 3.5: 在 `file://` 协议下的 `startCustomGameFromConfig()` 中注册自定义 NPC 到 `gameCharacters` 和 `npcLive2DModels`

# Task Dependencies
- [Task 1] 独立
- [Task 2] 独立
- [Task 3] 独立，可与 Task 1、Task 2 并行
