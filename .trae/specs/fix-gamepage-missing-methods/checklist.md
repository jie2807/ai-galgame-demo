# Checklist

- [x] 1.1 `_showLoadingOverlay(text)` 方法存在且功能正确
- [x] 1.2 `_hideLoadingOverlay()` 方法存在且功能正确，重复调用不报错
- [x] 1.3 `_updateLoadingText(text)` 方法存在且功能正确
- [x] 1.4 loading overlay DOM 结构与 game.css 中的样式匹配
- [x] 2.1 `unmount()` 方法存在
- [x] 2.2 `unmount()` 调用 `_destroyLive2D()` 清理 Live2D
- [x] 2.3 `unmount()` 调用 `_destroyTTSSettings()` 清理 TTS 面板
- [x] 2.4 `unmount()` 清空 container.innerHTML
- [ ] 3.1 mount() 不再抛出 TypeError: this._showLoadingOverlay is not a function
- [ ] 3.2 点击开始游戏后 loading overlay 显示然后正确隐藏
- [ ] 3.3 游戏页面正常渲染，能看到对话区域和输入框
