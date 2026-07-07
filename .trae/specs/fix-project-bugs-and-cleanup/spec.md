# 项目 Bug 修复和废弃文件清理 Spec

## Why
项目中存在多个历史遗留 bug 和废弃文件，导致项目混乱且维护困难。需要系统性排查和清理。

## What Changes
- 全面扫描项目根目录，删除所有废弃/调试/备份文件
- 扫描所有 spec 文档，确认已完成的任务状态
- 修复已知游戏页面 bug
- 清理未使用的 CSS 和 JS 代码

## Impact
- Affected specs: cleanup-project-chaos, fix-game-page-ui-errors, remove-game-startup-loading
- Affected code: 项目根目录文件，所有已完成的 spec 文档

## ADDED Requirements

None.

## MODIFIED Requirements

None.

## REMOVED Requirements

### Requirement: 已完成的 spec 文档
**Reason**: 所有 spec 已完成，保留过多历史 spec 会造成混乱
**Migration**: 保留当前活跃的 spec，删除已完成的历史 spec 目录
