# 统一页面生命周期并移除咖啡色遮罩 Spec

## Why

当前项目包含多个全屏子页面（首页、抽卡、图鉴、详情、聊天、游戏、书架、阅读器等），存在两个问题：

1. **页面状态管理不统一**：各入口自行维护 `.active` 类与 `home-hidden` 类，可能残留不必要的页面处于激活状态，导致层级混乱、资源占用和意外交互。
2. **咖啡色遮罩覆盖所有页面**：几乎每个页面都有一层基于 `rgba(26, 14, 8, ...)` / `rgba(42, 24, 16, ...)` 的深棕色渐变遮罩，使背景显得浑浊、压抑，用户希望去除这层咖啡色。

本次改造在**不影响各页面核心功能**的前提下，统一页面打开/关闭行为，并清理咖啡色背景遮罩。

## What Changes

- **新增页面管理器 `PageManager`**：提供 `PageManager.activate(pageId)` 方法，激活指定页面并关闭其他所有子页面；提供 `PageManager.deactivateAll()` 关闭所有子页面（用于返回首页）。
- **统一子页面隐藏逻辑**：所有子页面在被关闭时统一移除 `.active` 类；首页使用 `.home-hidden` 控制。
- **移除咖啡色遮罩**：将所有 `*-bg-gradient` 中咖啡色（`rgba(26, 14, 8, ...)`, `rgba(42, 24, 16, ...)`, `rgba(61, 36, 21, ...)` 等）替换为透明或深色但不偏棕的遮罩，保留背景图/视频可见。
- **保留功能性渐变**：仅移除视觉上的咖啡色染色层，不影响对话框、面板、按钮等 UI 组件。
- **保留过渡动画**：`PageTransition` 相关逻辑不受影响。

## Impact

- **受影响的功能**：所有全屏页面之间的切换、页面背景视觉效果。
- **受影响的文件**：`index.html`（新增 `PageManager` 并替换主要页面切换点）、`styles.css`（修改各页面 `*-bg-gradient`）。
- **不受影响的文件**：`data/characters.js`、各页面内部业务逻辑、AI 工作台、邮箱系统、游戏脚本逻辑等。

## ADDED Requirements

### Requirement: 页面管理器统一控制页面显隐

系统 SHALL 提供统一的 `PageManager` 工具，用于激活和关闭子页面。

#### Scenario: 进入任意子页面
- **WHEN** 玩家点击入口进入某个子页面
- **THEN** 目标子页面获得 `.active` 类并显示
- **AND** 其他所有子页面的 `.active` 类被移除
- **AND** 首页获得 `.home-hidden`（如果当前不是返回首页）

#### Scenario: 返回首页
- **WHEN** 玩家从子页面点击返回或触发返回首页
- **THEN** 所有子页面的 `.active` 类被移除
- **AND** 首页移除 `.home-hidden` 并恢复显示

### Requirement: 移除咖啡色背景遮罩

系统 SHALL 移除各页面背景中的咖啡色/棕色染色层。

#### Scenario: 查看任意子页面背景
- **WHEN** 玩家进入任意子页面
- **THEN** 背景不再出现咖啡色/棕色调
- **AND** 背景图、视频或底图清晰可见
- **AND** 文字和 UI 仍然可读

## MODIFIED Requirements

### Requirement: 页面切换代码

**文件**: `index.html`

**修改内容**：
- 在 `NavigationHistory` 附近新增 `PageManager` 对象。
- 将首页入口（文明的枝节、纪念收藏、养成学院、开始游戏等）、返回按钮、内部跳转的主要 `classList.add('active')` / `classList.remove('active')` 调用替换为 `PageManager.activate(pageId)` 或 `PageManager.deactivateAll()`。
- 保留 `NavigationHistory.push/pop` 逻辑，仅将页面显隐操作集中到 `PageManager`。

### Requirement: 页面背景样式

**文件**: `styles.css`

**修改内容**：
- 修改 `.gacha-bg-gradient`、`.charlist-bg-gradient`、`.chardetail-bg-gradient`、`.charchat-bg-gradient`、`.game-bg-gradient`、`.book-shelf-page` 背景、`.book-reader-page` 背景、`.model-test-bg-gradient` 等，将咖啡色替换为透明或中性深色。
- 保留 `pointer-events: none`、定位层级等属性。
- 不修改各页面内容区、按钮、面板等前景样式。

## REMOVED Requirements

### Requirement: 分散的页面显隐控制

**Reason**: 各入口自行添加/移除 `.active` 容易导致页面状态不一致。
**Migration**: 统一使用 `PageManager.activate` 与 `PageManager.deactivateAll`。

### Requirement: 咖啡色背景遮罩

**Reason**: 用户认为咖啡色遮罩使页面显得浑浊。
**Migration**: 替换为透明或中性深色遮罩；若背景本身过亮，可轻微加深但不偏色。
