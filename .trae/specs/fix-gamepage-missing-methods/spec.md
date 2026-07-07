# 修复 GamePage 缺失方法和初始化崩溃问题 Spec

## Why
游戏启动时总是卡在"正在启动游戏"界面，深入调查发现：
1. `GamePage.js` 中调用了 `_showLoadingOverlay()`、`_hideLoadingOverlay()`、`_updateLoadingText()` 等方法，但这些方法**根本没有定义**
2. 缺少 `unmount()` 方法，导致页面切换时资源无法正确清理
3. 当 `mount()` 执行到 `this._showLoadingOverlay()` 时抛出 `TypeError`，整个初始化流程崩溃
4. 之前的修改意外删除了这些辅助方法，导致游戏完全无法启动

## What Changes
- 补回 `_showLoadingOverlay(text)` 方法：显示并更新加载覆盖层
- 补回 `_hideLoadingOverlay()` 方法：隐藏加载覆盖层
- 补回 `_updateLoadingText(text)` 方法：更新加载提示文字
- 补回 `unmount()` 方法：清理资源（TTS设置、Live2D、事件监听器等）
- 确保这些方法的实现与 CSS 中的 loading overlay 样式匹配

## Impact
- Affected specs: 游戏启动流程、页面生命周期管理
- Affected code: pages/game/GamePage.js

## ADDED Requirements

### Requirement: Loading Overlay Helper Methods
GamePage SHALL 提供完整的 loading overlay 管理方法。

#### Scenario: 显示加载覆盖层
- **WHEN** `_showLoadingOverlay(text)` 被调用
- **THEN** 检查 DOM 中是否存在 `#gp-loading-overlay` 元素
- **THEN** 如果不存在则创建并添加到页面
- **THEN** 显示 loading spinner 和指定的提示文字

#### Scenario: 隐藏加载覆盖层
- **WHEN** `_hideLoadingOverlay()` 被调用
- **THEN** 隐藏或移除 loading overlay 元素
- **AND** 不会因重复调用而报错

#### Scenario: 更新加载文字
- **WHEN** `_updateLoadingText(text)` 被调用
- **THEN** 更新 loading overlay 中的提示文字

### Requirement: Page Lifecycle Cleanup
GamePage SHALL 提供 `unmount()` 方法用于清理资源。

#### Scenario: 页面卸载
- **WHEN** `unmount()` 被调用
- **THEN** 销毁 Live2D 模型和渲染器
- **THEN** 销毁 TTS 设置面板
- **THEN** 断开 ResizeObserver
- **AND** 清空 container 内容

## MODIFIED Requirements

### Requirement: GamePage.mount() Error Handling
mount() 方法 SHALL 捕获所有异常并确保 loading overlay 被正确隐藏。

**Before**: try-finally 块中没有定义被调用的辅助方法，导致 TypeError
**After**: 辅助方法全部存在，try-finally 能正确工作

## REMOVED Requirements

None.
