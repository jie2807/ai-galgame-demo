# 修复游戏启动加载和自定义NPC添加模型问题 Spec

## Why
用户反馈两个问题：
1. 游戏启动后一直卡在加载页面，无法正常游玩
2. 在自定义剧本编辑器中点击"添加角色模型"按钮后没有任何反应

## What Changes
- 修复 loading overlay 的 DOM 层级和 z-index 冲突问题
- 修复 `openLive2dSelector()` 中角色选择点击事件未绑定的问题
- 优化 ScriptEngine 中 NPC firstMessage 的初始化时序
- 确保游戏加载完成后 UI 正确渲染初始消息

## Impact
- Affected specs: 游戏启动流程、自定义NPC系统、Live2D选择器
- Affected code: pages/game/GamePage.js, index.html, engine/ScriptEngine.js

## ADDED Requirements

### Requirement: Live2D Selector Click Binding
openLive2dSelector() SHALL 为每个角色选项绑定点击事件。

#### Scenario: 用户点击某个角色
- **WHEN** 用户在 Live2D 选择器中点击一个角色
- **THEN** 该角色被选中，modal 关闭
- **THEN** NPC 卡片的头像按钮更新为选中角色的立绘
- **THEN** NPC 卡片的状态信息更新显示已选角色名称和稀有度

### Requirement: Loading Overlay DOM Placement
Loading Overlay SHALL 正确添加到 body 而非 container 内，避免 stacking context 冲突。

#### Scenario: 游戏启动
- **WHEN** mount() 显示 loading overlay
- **THEN** overlay 使用 `position: fixed` 覆盖整个视口
- **THEN** overlay 在 body 层级，不被 `.gp-page` 的 stacking context 限制
- **THEN** overlay 在游戏就绪后正确隐藏

## MODIFIED Requirements

### Requirement: GamePage Loading Overlay Methods
GamePage._showLoadingOverlay() SHALL 将 overlay 添加到 document.body 而非 this.container。

**Before**: overlay 被 `this.container.appendChild(overlay)` 添加到 `.gp-page` 内部
**After**: overlay 被 `document.body.appendChild(overlay)` 添加到 body

### Requirement: openLive2dSelector Event Binding
openLive2dSelector() SHALL 为生成的角色卡片绑定点击选择事件。

**Before**: modal 创建后没有绑定角色点击事件，用户点击角色无响应
**After**: 每个角色卡片绑定 `onclick` 事件，点击后更新 NPC 卡片并关闭 modal

## REMOVED Requirements

None.
