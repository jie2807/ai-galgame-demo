# 紧急修复：修仙剧本结构 + 滚动 + 智能生成 Spec

## Why
上一轮 spec `overhaul-scripts-tts-mail-avatar` 标记完成但实际未生效：`data/game-chapters.js` 仍含 id=5/6 两章（应为单章），且游戏页面无法上下滚动查看内容，自定义剧本智能生成仍有问题。用户要求 1 点前必须完成上线。

## What Changes
- **BREAKING** 删除 `data/game-chapters.js` 中 id=5（逆天仙途 · 霸业篇）和 id=6（逆天仙途 · 巅峰篇）两个章节对象，仅保留 id=4「修仙：乱编的 · 觉醒篇」
- 修复 id=4 章节中 line 1788 的「你不是林凡」为「你的道……不似人间之道」（spec 要求删除他人点破身份描述）
- 修复游戏页面/剧本内容无法上下滚动的问题（CSS overflow 或 touch-action 设置不当）
- 修复自定义剧本智能生成功能（需运行时调试确认具体根因）

## Impact
- Affected code: `data/game-chapters.js`（删除 ~400 行）、`index.html`（CSS 滚动修复 + 智能生成调试）

## MODIFIED Requirements
### Requirement: 修仙剧本单章结构
`data/game-chapters.js` 的 `gameChapters` 数组 SHALL 仅含 4 个章节对象：id=1/2/3（末日方舟）+ id=4（修仙：乱编的 · 觉醒篇），无 id=5/id=6。

### Requirement: 游戏页面可滚动
游戏页面（#gamePage）的内容区域 SHALL 支持上下滚动查看（桌面端鼠标滚轮 + 移动端触摸滑动），无 overflow:hidden 锁死。

### Requirement: 自定义剧本智能生成可用
点击「智能生成」按钮 SHALL 不抛出未捕获异常，进度条按阶段正常更新，生成成功/失败都有明确提示。

## REMOVED Requirements
### Requirement: 修仙文多章节结构
**Reason**: 用户明确要求修仙剧本只需要一章
**Migration**: id=5/6 的核心打脸场景已整合到 id=4 的 timelineEvents 中
