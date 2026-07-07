# 完成 styles.css 重建 Spec

## Why
上次重建 `styles.css` 时写入超时，文件在 4613 行处截断（原始约 8267 行），`.reader-header` 规则被截断，缺少约 3654 行独有样式。

## What Changes
- 从 `index.html` 中提取所有当前 `styles.css` 缺失的独有样式规则
- 将缺失的独有样式追加到当前文件末尾
- 修复 `.reader-header` 截断问题
- 验证最终文件完整性

## Impact
- Affected code: `styles.css`

## ADDED Requirements

### Requirement: 独有样式完整性
系统 SHALL 确保 `styles.css` 包含所有 `index.html` 引用的独有样式，包括：Reader Page、Clock Modal (zio)、Chapter Mission (mission)、Memorial Collection (modal)、Chat sub-classes、Book Reader Page、Reader Panel、Book TOC、Bookmark、Mode Selector、Script List Panel、Custom Chapter Editor、Lore/Location/NPC Editor、TTS Panel、Live2D Selector Modal、Exit Confirm Modal、NPC Panel、Story Panel、Model Select、WS Location Item、以及其他缺失样式。

### Requirement: 截断修复
系统 SHALL 修复 `.reader-header` 规则被截断的问题，确保规则完整闭合。
