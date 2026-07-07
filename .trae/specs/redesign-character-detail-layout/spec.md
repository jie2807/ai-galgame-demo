# 角色详情页左右布局重构 Spec

## Why

当前角色详情页采用上下分栏：上方为立绘区，下方为信息区。该布局导致页面纵向过长、信息堆叠拥挤，且立绘被卡片边框包裹，与背景割裂。用户希望改为更清爽的左右分栏，让角色立绘作为视觉主体，信息区简洁透明。

## What Changes

- **改为左右分栏**：`#characterDetailPage` 整体改为两栏布局，左侧为信息区，右侧为立绘区。
- **立绘移至右侧**：将 `.chardetail-portrait-area` 移到右侧，去除卡片边框，使其与背景自然融合。
- **信息区透明化**：左侧信息区背景改为透明，仅保留文字与必要分隔线。
- **两栏共用同一背景**：整页使用统一的 `.chardetail-bg` 背景，不再为立绘或信息区单独设置背景块。
- **移除互动回忆与专属信件**：删除 `#chardetailMemorySection` 与 `#chardetailMailSection` 的 DOM 及对应渲染调用 `renderCharacterMemory`、`renderCharacterMail`。
- **写信按钮放入左侧信息区**：将 `#chardetailChatBtn` 移至左侧信息区底部。
- **保留核心信息**：姓名、称号、稀有度、性别、年龄、性格、身世/简介、好感度等级与进度条、返回按钮均保留。
- **保留返回逻辑**：`chardetailBackBtn` 与返回首页/列表逻辑不变。

## Impact

- **受影响的功能**：角色详情页布局与展示。
- **受影响的文件**：`index.html`（`#characterDetailPage` DOM 与 `showCharacterDetail` 函数）、`styles.css`（`.chardetail-*` 相关样式）。
- **不受影响的文件**：`data/characters.js`、角色图鉴列表页、抽卡系统、角色聊天页、游戏主流程、AI 工作台、邮箱系统等。

## ADDED Requirements

### Requirement: 角色详情页左右分栏展示

系统 SHALL 将角色详情页重构为左右两栏布局。

#### Scenario: 进入角色详情页
- **WHEN** 玩家从图鉴列表点击角色卡片进入详情页
- **THEN** 页面左侧显示角色信息区
- **AND** 页面右侧显示角色立绘/Live2D
- **AND** 左右两栏共用同一张背景
- **AND** 信息区背景透明
- **AND** 立绘无卡片边框

### Requirement: 信息区内容布局

系统 SHALL 在左侧信息区集中展示核心信息，并将写信按钮置于信息区内。

#### Scenario: 查看信息区
- **WHEN** 玩家查看角色详情页左侧
- **THEN** 从上到下依次显示：返回按钮、姓名/称号/稀有度、基础字段（性别/年龄/性格）、身世/简介、好感度等级与进度条、写信按钮
- **AND** 不显示「互动回忆」与「专属信件」区块

### Requirement: 立绘区展示

系统 SHALL 在右侧完整展示角色立绘或 Live2D，不添加卡片边框。

#### Scenario: 查看立绘
- **WHEN** 玩家查看角色详情页右侧
- **THEN** 立绘/Live2D 完整显示，无裁剪
- **AND** 立绘区无额外卡片边框、阴影或背景色块
- **AND** 立绘底部可保留简单的角色名/称号装饰，但不应形成卡片感

## MODIFIED Requirements

### Requirement: 角色详情页 DOM 结构

**文件**: `index.html` `#characterDetailPage` 区域

**修改内容**：
- 将 `.chardetail-portrait-area` 从当前位置移到 `.chardetail-info-area` 之后，使其成为右栏。
- 调整 `.chardetail-info-area` 内部顺序：返回按钮、标题区、字段区、好感度、简介、写信按钮。
- 删除 `#chardetailMemorySection` 与 `#chardetailMailSection` 两个区块。
- 在 `showCharacterDetail` 中移除 `renderCharacterMemory(charId)` 与 `renderCharacterMail(charId)` 的调用。
- 将 `#chardetailChatBtn` 移动到 `.chardetail-info-area` 内。

### Requirement: 角色详情页样式

**文件**: `styles.css`

**修改内容**：
- 将 `#characterDetailPage` 改为 flex/grid 两栏布局（左侧约 45%，右侧约 55%）。
- `.chardetail-info-area` 背景改为透明，保留文字颜色与必要内边距。
- `.chardetail-portrait-area` 占满右栏，背景透明，边框、阴影、圆角设为 0。
- `.chardetail-portrait img/canvas` 使用 `object-fit: contain`，完整展示立绘/Live2D。
- 删除 `.chardetail-memory-section`、`.chardetail-mail-section` 相关样式（或保留但不使用）。
- 调整 `.chardetail-chat-btn` 位置与样式，使其在左侧信息区底部醒目。
- 添加移动端响应式规则：小屏幕下改为上下堆叠或保持左右但缩小信息区。

## REMOVED Requirements

### Requirement: 角色详情页上下分栏

**Reason**: 用户要求改为左右分栏。
**Migration**: 用新的左右布局 DOM 与样式替换。

### Requirement: 互动回忆区块

**Reason**: 用户明确要求不显示该区块。
**Migration**: 从 DOM 中删除 `#chardetailMemorySection`，并移除 `renderCharacterMemory` 调用。`getCharacterMemories` / `saveCharacterMemory` 函数保留供其他模块使用。

### Requirement: 专属信件区块

**Reason**: 用户明确要求不显示该区块。
**Migration**: 从 DOM 中删除 `#chardetailMailSection`，并移除 `renderCharacterMail` 调用。`getCharacterMails` 函数保留供其他模块使用。
