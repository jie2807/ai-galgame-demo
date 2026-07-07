# 抽卡结果简历化展示 Spec

## Why

当前抽卡结果以「信封卡片」形式展示角色，存在两个问题：

1. **立绘显示不完整**：结果卡片左侧立绘区使用 `object-fit: cover` 或固定比例裁剪，导致角色头像/半身像经常被截断，无法展示角色完整形象。
2. **视觉风格与信息层级不够清晰**：现有卡片把性别、年龄、性格、身世平铺为表格行，缺乏 Galgame/书信主题的沉浸感，也不够像一份「角色档案」。

本次改造在**不改变抽卡概率、保底、消耗、状态存储**的前提下，把单抽与十连抽结果改成「简历/档案」形式呈现，让立绘完整露出，同时用文档排版提升质感。

## What Changes

- **改造单抽结果弹窗**：将 `#gachaEnvelopeResult` 内的卡片从左右分栏信封卡片改为 A4 简历式档案页；左侧或顶部完整展示角色立绘/Live2D，右侧/下方以简历字段展示信息。
- **确保立绘完整显示**：结果页立绘容器使用 `object-fit: contain` 或等比缩放，避免裁剪；Live2D 模型也按完整比例适配。
- **新增简历字段区**：包含姓名、称号、稀有度徽章、灵感徽章、性别、年龄、性格、角色简介、初遇台词等区块。
- **保留重复提示**：抽到重复角色时，以「档案印章」形式在简历右上角显示「重复 +X 回忆碎片」。
- **改造十连总览**：`#gachaTenSummaryOverlay` 中每张卡片改成简历缩略图，保留完整头像与关键信息。
- **统一视觉主题**：继续使用 `#d4a574` 金色、`#2a1810` 深棕、`#f5e6d3` 暖白配色，纸张纹理、火漆印章、手写体标题。
- **不改动抽卡核心逻辑**：`executeGachaPull`、`rollRarity`、`drawCharacter`、`gachaState`、localStorage 等保持不变。
- **不干扰其他模块**：只修改 `index.html` 中结果弹窗 DOM 与展示函数、`styles.css` 中结果弹窗样式。

## Impact

- **受影响的功能**：抽卡结果展示、十连总览展示。
- **受影响的文件**：`index.html`（`#gachaEnvelopeResult`、`_gachaPullQueue` 展示函数）、`styles.css`（`.gacha-envelope-*`、`.gacha-ten-summary-*` 相关样式）。
- **不受影响的文件**：`data/characters.js`、抽卡概率与状态逻辑、角色列表/详情页、游戏主流程、AI 工作台、邮箱系统、自定义剧本编辑器等。

## ADDED Requirements

### Requirement: 单抽结果以简历形式展示

系统 SHALL 把单抽结果弹窗设计成一份角色简历/档案页。

#### Scenario: 单抽成功
- **WHEN** 玩家完成一次单抽
- **THEN** 弹出全屏结果遮罩
- **AND** 页面主体呈现为一张 A4 大小的简历卡片，背景为暖色纸张纹理
- **AND** 角色立绘/Live2D 完整显示，不被裁剪
- **AND** 简历上清晰展示：姓名、称号、稀有度徽章、灵感徽章、性别、年龄、性格、角色简介、初遇台词
- **AND** 若为重复角色，右上角出现火漆/印章样式的「重复 +X 回忆碎片」标记
- **AND** 底部显示「确认」按钮，点击后关闭弹窗

### Requirement: 十连总览以简历缩略图展示

系统 SHALL 把十连结果总览中的 10 张卡片改为简历缩略图。

#### Scenario: 十连成功
- **WHEN** 玩家完成一次十连
- **THEN** 弹出十连总览面板
- **AND** 面板展示 10 份简历缩略图
- **AND** 每张缩略图包含完整角色头像、姓名、稀有度徽章
- **AND** 重复角色缩略图显示重复标记
- **AND** 点击任意缩略图可查看该角色的完整简历弹窗

### Requirement: 立绘完整显示

系统 SHALL 确保结果弹窗中的角色立绘按原始比例完整展示。

#### Scenario: 立绘比例各异
- **WHEN** 角色立绘为竖版、横版或方形
- **THEN** 结果页容器自适应缩放，使角色完整可见
- **AND** 不出现头部或身体被裁剪的情况

## MODIFIED Requirements

### Requirement: 单抽结果 DOM 结构

**文件**: `index.html` `#gachaEnvelopeResult` 区域

**修改内容**：
- 将 `.gacha-envelope-card` 内部结构改为简历式布局。
- 保留 `.envelope-portrait` 立绘区，但改为完整比例展示。
- 新增/重命名信息字段容器：`.resume-rarity`、`.resume-afflatus`、`.resume-name`、`.resume-title`、`.resume-basic-info`、`.resume-section-profile`、`.resume-section-personality`、`.resume-section-first-message`、`.resume-duplicate-stamp`、`.resume-counter`。
- 改写 `showEnvelopeResult(index)`，按新 DOM 填充字段，包含 `firstMessage` 内容。

### Requirement: 十连总览卡片样式

**文件**: `index.html` `showTenPullSummary()` 函数

**修改内容**：
- 将总览列表中卡片 DOM 改为简历缩略图结构。
- 缩略图内头像完整显示，姓名与稀有度徽章置于下方。
- 重复角色显示小印章标记。

### Requirement: 结果弹窗样式

**文件**: `styles.css`

**修改内容**：
- 覆盖 `.gacha-envelope-result`、`.gacha-envelope-card`、`.envelope-portrait` 样式，改为简历/档案风格。
- 新增 `.resume-*` 系列样式：纸张背景、标题字体、分栏布局、稀有度徽章色、印章效果。
- 覆盖 `.gacha-ten-summary-card`、`.gacha-ten-summary-portrait` 为简历缩略图样式。
- 添加移动端适配，确保 375px~768px 宽度下简历卡片仍可读。

## REMOVED Requirements

### Requirement: 原信封卡片左右分栏布局

**Reason**: 与新的简历式展示冲突，且原布局导致立绘被裁剪。
**Migration**: 用新的简历 DOM 与样式替换，保留 `gacha-envelope-result` 等外层容器 id/class 以便事件绑定不受影响。