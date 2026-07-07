# 删除截图功能并重建招募系统 Spec

## Why
用户明确要求：1) 删除截图功能（不需要且配了垃圾加载动画）；2) 重新制作招募系统，确保玩家在剧本游玩界面能正常看到角色模型。当前招募系统（gacha）与游戏内角色模型显示是脱节的，玩家抽到的角色无法在剧本中直接使用。

## What Changes
- **删除截图功能**：删除截图按钮 HTML、`takeGameScreenshot()` 函数、`createGamePageSVG()` 函数、相关 CSS 样式、事件绑定
- **删除全局加载动画**：删除 `showLoading()`、`setLoadingText()`、`hideLoading()` 函数及 `#globalLoading` HTML 和 CSS，所有调用处改为静默处理或 toast 提示
- **重建招募系统**：改造抽卡（gacha）系统，使招募到的角色自动加入可用角色池，在自定义剧本编辑器的立绘选择器中可以直接选择，并在游戏页面中通过 Live2D 模型显示

## Impact
- 受影响模块：截图系统、加载动画系统、招募/抽卡系统、角色模型显示
- 受影响文件：`index.html`、`styles.css`、`pages/custom-chapter/custom-chapter.css`

## MODIFIED Requirements

### Requirement: 游戏页面 - 删除截图按钮
游戏页面顶部导航栏不再包含截图按钮。

#### Scenario: 游戏页面显示
- **WHEN** 用户进入游戏页面
- **THEN** 顶部导航栏只显示返回、设置、语音三个按钮，不显示截图按钮

### Requirement: 全局加载动画 - 删除
删除所有全局 loading 遮罩和加载动画，改为使用 toast 通知提示用户状态。

#### Scenario: 游戏启动
- **WHEN** 游戏启动时
- **THEN** 不再显示全屏加载遮罩和旋转动画
- **AND** 如有需要提示状态，使用 toast 通知

### Requirement: 招募系统 - 重建
玩家通过招募系统获取的角色应能在自定义剧本编辑和剧本游玩中使用。

#### Scenario: 招募角色
- **WHEN** 玩家在招募页面进行抽卡
- **THEN** 获得的角色自动加入 `ownedCharacters` 池
- **AND** 这些角色可在自定义剧本编辑器的立绘选择器中看到并选择

#### Scenario: 游戏页面显示模型
- **WHEN** 用户在剧本中开始游戏
- **THEN** 当前 NPC 的 Live2D 模型在左侧正常加载显示
- **AND** 如 Live2D 加载失败，显示静态占位符而非空白

## REMOVED Requirements

### Requirement: 截图功能
**Reason**: 用户不需要截图功能，且截图功能使用了全局加载动画干扰游玩体验
**Migration**: 直接删除，无需迁移
