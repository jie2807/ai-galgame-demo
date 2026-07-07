# 角色详情页强制左右布局 Spec

## Why

当前角色详情页在 `max-width: 768px` 的媒体查询下会自动切换为上下堆叠布局。用户要求无论屏幕多小（包括移动端）都必须保持左右分栏，左侧信息、右侧立绘。

## What Changes

- **移除详情页移动端上下布局**：删除或覆盖 `@media (max-width: 768px)` 和 `@media (max-width: 480px)` 中针对 `.character-detail-page` 的 `flex-direction: column-reverse` 规则。
- **强制左右分栏**：在所有屏幕宽度下保持 `.chardetail-content` 为 `flex-direction: row`。
- **移动端适配**：左右两栏使用百分比宽度，信息区允许横向滚动或内部滚动；字号、间距、内边距适当缩小，确保 375px 下仍可阅读。
- **保持立绘完整**：右栏继续 `object-fit: contain`。
- **不改动桌面端样式**：除覆盖移动端 column 规则外，不修改现有桌面布局。

## Impact

- **受影响的功能**：角色详情页在 768px 及以下屏幕的布局。
- **受影响的文件**：`styles.css`（`.character-detail-page` 相关媒体查询）。
- **不受影响的文件**：`index.html`、角色数据、其他页面。

## ADDED Requirements

### Requirement: 移动端保持左右分栏

系统 SHALL 确保角色详情页在任意屏幕宽度下均为左右两栏布局。

#### Scenario: 在 375px 宽屏幕查看详情页
- **WHEN** 玩家使用手机查看角色详情页
- **THEN** 左侧信息区与右侧立绘区仍然左右排列
- **AND** 信息区内容可滚动或可阅读
- **AND** 右侧立绘完整可见

#### Scenario: 在 768px 宽平板查看详情页
- **WHEN** 玩家使用平板查看角色详情页
- **THEN** 仍然呈现左右分栏
- **AND** 不会切换为上下堆叠

## MODIFIED Requirements

### Requirement: 角色详情页响应式样式

**文件**: `styles.css`

**修改内容**：
- 在 `@media (max-width: 768px)` 中，将 `.character-detail-page .chardetail-content` 的 `flex-direction: column-reverse` 改为 `flex-direction: row`。
- 在 `@media (max-width: 768px)` 中，将 `.chardetail-info-area` 和 `.chardetail-portrait-area` 的高度规则改为宽度规则（信息区约 45%，立绘区约 55%）。
- 在 `@media (max-width: 480px)` 中同样强制 `flex-direction: row`。
- 适当缩小移动端内边距与字号，避免溢出。

## REMOVED Requirements

### Requirement: 角色详情页移动端上下堆叠布局

**Reason**: 用户明确要求移动端也保持左右分栏。
**Migration**: 用左右分栏响应式规则替换。
