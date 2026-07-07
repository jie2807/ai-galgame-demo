# 养成学院图鉴页面优化 Spec

## Why

当前「养成学院」入口进入的人偶图鉴页面存在两个问题：

1. **筛选与排序条件分散**：排序栏（默认/好感度/获取时间/稀有度）、稀有度筛选、灵感筛选分别平铺在卡片网格上方，占用大量垂直空间，视觉杂乱。
2. **卡片好感度标识冗余**：角色卡片左上角的好感度等级徽章（含图标与等级名）与详情页重复展示，且用户认为其破坏了卡片整体美感。

本次改造在**不改变角色数据、不改动图鉴核心渲染逻辑**的前提下，将筛选/排序收拢到一个可展开的按钮中，并移除卡片上的好感度标识。

## What Changes

- **新增右上角筛选展开按钮**：在 `characterListPage` 标题栏右上角新增一个「筛选」扩展按钮，点击后展开/收起包含排序、稀有度筛选、灵感筛选的面板。
- **移除原有分散的筛选栏**：隐藏或删除原 `charlistSortBar`、`charlistRarityFilter`、`charlistAfflatusFilter` 的平铺展示。
- **移除卡片好感度徽章**：删除 `charlist-card-affection-badge` 的 DOM 渲染与相关样式。
- **保留排序与筛选逻辑**：`_charlistSortMode`、`_charlistRarityFilter`、`_charlistAfflatusFilter` 的状态变量与 `renderCharacterList()` 筛选逻辑不变。
- **保留顶部进度信息**：已获得数量 `charlistCount` 与收集进度 `charlistProgress` 继续显示在标题栏。
- **移动端适配**：展开面板在移动端以抽屉/下拉形式展示，按钮大小符合触控要求。

## Impact

- **受影响的功能**：养成学院人偶图鉴页面的筛选/排序交互、角色卡片展示。
- **受影响的文件**：`index.html`（`#characterListPage` DOM 与事件绑定）、`styles.css`（`.charlist-*` 相关样式）。
- **不受影响的文件**：`data/characters.js`、抽卡系统、角色详情页、游戏主流程、AI 工作台、邮箱系统等。

## ADDED Requirements

### Requirement: 筛选/排序条件收拢到扩展按钮

系统 SHALL 将图鉴页面的排序与筛选条件整合到一个位于标题栏右上角的扩展按钮内。

#### Scenario: 进入图鉴页面
- **WHEN** 玩家进入「养成学院」人偶图鉴页面
- **THEN** 标题栏右侧显示「筛选」按钮
- **AND** 原平铺的排序栏、稀有度筛选栏、灵感筛选栏不再直接显示

#### Scenario: 展开筛选面板
- **WHEN** 玩家点击标题栏「筛选」按钮
- **THEN** 在标题栏下方或按钮下方展开筛选面板
- **AND** 面板内包含排序选项（默认、好感度、获取时间、稀有度）
- **AND** 面板内包含稀有度筛选（全部、4星、3星、2星）
- **AND** 面板内包含灵感筛选（全部、岩、星、木、兽、灵、智）
- **AND** 当前选中的条件高亮显示

#### Scenario: 选择条件并关闭面板
- **WHEN** 玩家在展开面板中点击任意排序或筛选条件
- **THEN** 该条件被选中并高亮
- **AND** 卡片网格按新条件实时刷新
- **AND** 面板自动收起（或在点击面板外部/再次点击按钮时收起）

### Requirement: 移除角色卡片上的好感度标识

系统 SHALL 从图鉴角色卡片上移除好感度等级徽章。

#### Scenario: 查看角色卡片
- **WHEN** 玩家浏览图鉴中的角色卡片
- **THEN** 卡片上不再显示好感度图标与等级文字
- **AND** 角色立绘、姓名、称号、稀有度、灵感标识、锁定遮罩保持不变

## MODIFIED Requirements

### Requirement: 图鉴页面 DOM 结构

**文件**: `index.html` `#characterListPage` 区域

**修改内容**：
- 在 `.charlist-header` 中新增 `.charlist-filter-toggle` 按钮。
- 将原 `.charlist-main` 内的 `#charlistSortBar`、 `#charlistRarityFilter`、 `#charlistAfflatusFilter` 包裹到一个可折叠容器 `#charlistFilterPanel` 中，默认隐藏。
- 改写事件绑定，使展开按钮控制 `#charlistFilterPanel` 的显示/隐藏。
- 在 `renderCharacterList` 中移除 `affectionBadgeHtml` 的生成与插入。

### Requirement: 图鉴页面样式

**文件**: `styles.css`

**修改内容**：
- 新增 `.charlist-filter-toggle`、`.charlist-filter-panel`、`.charlist-filter-panel.active` 系列样式。
- 调整 `.charlist-header` 布局，为右上角筛选按钮预留空间。
- 保留 `.charlist-sort-btn`、`.charlist-rarity-btn`、`.charlist-afflatus-btn` 的按钮样式，但将其容器改为面板内垂直/网格排列。
- 删除或禁用 `.charlist-card-affection-badge` 相关样式（如不再需要）。
- 添加移动端响应式规则，确保展开面板在小屏幕上不溢出且可滚动。

## REMOVED Requirements

### Requirement: 角色卡片好感度徽章

**Reason**: 用户认为该元素影响卡片美观，且详情页已展示完整好感度信息。
**Migration**: 直接从卡片 DOM 与样式中移除，详情页的好感度展示不受影响。

### Requirement: 平铺式筛选/排序栏

**Reason**: 多个横向按钮栏占用空间且视觉杂乱，与养成学院整体风格不符。
**Migration**: 功能完整保留，交互改为右上角扩展面板。
