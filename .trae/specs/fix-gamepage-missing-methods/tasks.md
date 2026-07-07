# Tasks

- [x] Task 1: 补回缺失的 Loading Overlay 辅助方法
  - [x] 1.1 实现 `_showLoadingOverlay(text)` 方法：创建或显示 loading overlay DOM 元素
  - [x] 1.2 实现 `_hideLoadingOverlay()` 方法：隐藏或移除 loading overlay
  - [x] 1.3 实现 `_updateLoadingText(text)` 方法：更新 loading overlay 中的提示文字
  - [x] 1.4 验证方法与 CSS 样式正确配合

- [x] Task 2: 补回 unmount() 方法
  - [x] 2.1 实现 `unmount()` 方法
  - [x] 2.2 确保调用 `_destroyLive2D()` 清理 Live2D 资源
  - [x] 2.3 确保调用 `_destroyTTSSettings()` 清理 TTS 面板
  - [x] 2.4 清空 container 内容

- [ ] Task 3: 验证修复后游戏能正常启动
  - [ ] 3.1 确认 mount() 不再抛出 TypeError
  - [ ] 3.2 确认 loading overlay 正确显示和隐藏
  - [ ] 3.3 确认游戏页面正常渲染

# Task Dependencies
- [Task 2] depends on [Task 1] - unmount 需要引用已定义的清理方法
- [Task 3] depends on [Task 1, Task 2] - 验证需要所有方法都已补回
