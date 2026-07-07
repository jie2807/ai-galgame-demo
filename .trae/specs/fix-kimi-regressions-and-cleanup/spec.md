# 修复 Kimi 瘦身回归与废弃文件清理 Spec

## Why
项目被另一个 AI 助手（"kimi"）执行过多次瘦身/拆分/清理操作，遗留下：
- 一次性脚本删除了 `index.html` 中仍在被调用的函数定义，导致抽卡系统、消息编辑、Creator Wars 等核心功能抛 `ReferenceError` 而失效。
- 根目录堆积 11 个调试/分析/一次性脚本与 1.6MB 临时语法检查转储文件。
- `images/` 下 11 个 `.tmp` 文件为图片替换中断遗留。
- `styles.css` 出现 NPC/Story 面板的重复残缺定义；`styles/reset.css` 注释编码损坏。
- `.trae/specs/deep-slim-project-resources-and-code/backups/` 下整套媒体与 `index.html.bak` 副本占用空间。

本次变更目标是恢复缺失函数、清除废弃文件、修复 CSS 回归，使游戏可正常运行。

## What Changes
- 从 `.trae/specs/deep-slim-project-resources-and-code/backups/index.html.bak` 提取并恢复以下函数到当前 `index.html`：
  - 抽卡链：`updateGachaUI`、`pullGacha`、`executeGachaPull`、`showEnvelopeAnimation`、`setGachaButtonsDisabled`
  - 消息编辑：`markMessagesDeprecated`
  - Creator Wars：`renderManipulationHistory`、`updateMetricsPanel`、`updateBottomMetrics`、`updateManipulatePanel`、`generateHomeVideos`、`restoreStudioView`、`endAgentLive`、`generateInitialAgentContent`
  - 通用工具：`showProgressBar`、`showResult`、`showExitConfirm`、`importAllData`
- 调查并恢复或重新实现 `renderHomePage`、`publishVideo`（两个备份中均缺失，可能曾定义在被删除的 IIFE 内）
- 删除根目录 11 个废弃脚本：`.analyze-inline.js`、`.analyze-top.js`、`.measure-objects.js`、`.perform-split.js`、`.scan-objects.js`、`.scan-objects.txt`、`.tmp_syntax_check.js`、`cleanup-creator-wars-temp.js`、`replace_gen.py`、`syntax-check-temp.js`、`temp-syntax-check.js`
- 删除 `images/` 下 11 个 `.tmp` 文件
- 删除 `styles.css` 中 L6462-L6550 区间的重复 NPC/Story 面板残片
- 修复 `styles/reset.css` L58、L64 的 UTF-8 编码损坏注释
- 在 `index.html` 修复并验证通过后，删除 `.trae/specs/deep-slim-project-resources-and-code/backups/` 下的 `index.html.bak`、`index.html.pre-split.bak` 及 `images/`、`models/`、`videos/` 重复副本

## Impact
- Affected specs: deep-slim-project-resources-and-code（瘦身操作造成本次回归的源头）、fix-post-slim-homepage-regressions（已识别但未修复的回归清单）、fix-project-bugs-and-cleanup（前一轮清理已完成但未覆盖本次问题）
- Affected code:
  - `index.html`（恢复 18 个缺失函数；调查 2 个长期缺失函数）
  - `styles.css`（删除重复段落）
  - `styles/reset.css`（修复编码损坏注释）
- Affected assets: 删除 11 个根目录废弃脚本、11 个 `.tmp` 图片临时文件、备份子树
- **BREAKING**: 无面向用户的破坏性变更；本次只修复回归与清理，不改变功能契约

## ADDED Requirements

None.

## MODIFIED Requirements

### Requirement: 游戏核心功能可运行
游戏 SHALL 在浏览器中通过 `index.html` 启动后，抽卡、消息编辑、Creator Wars、TTS、世界树等所有 UI 入口触发的函数均存在定义，不抛 `ReferenceError`。

#### Scenario: 抽卡按钮点击
- **WHEN** 用户点击"单抽"或"十连"按钮
- **THEN** `executeGachaPull(1)` / `executeGachaPull(10)` 被调用且函数已定义，触发 `pullGacha` → `showEnvelopeAnimation` → `setGachaButtonsDisabled` → `updateGachaUI` 完整链路，不抛错

#### Scenario: 消息编辑保存
- **WHEN** 用户保存编辑后的消息或执行消息分叉
- **THEN** `markMessagesDeprecated(fromSeq)` 被调用且函数已定义，标记后续消息为废弃并继续执行 `saveGameState()`，不抛错

#### Scenario: Creator Wars 操控操作
- **WHEN** 用户在 Creator Wars 面板执行"操控舆论/控屏/水军/对冲/删评"任意操作完成时
- **THEN** `cwEngine.executeOperation(...)` 回调中的 `renderManipulationHistory`、`updateMetricsPanel`、`updateBottomMetrics`、`updateManipulatePanel`、`generateHomeVideos`、`restoreStudioView`、`endAgentLive`、`generateInitialAgentContent` 8 个函数全部存在定义，回调链不抛错

#### Scenario: 退出确认与数据导入
- **WHEN** 用户触发退出确认弹窗或导入数据
- **THEN** `showExitConfirm()` / `importAllData(file)` 函数已定义并被正确调用

### Requirement: 项目根目录清洁
项目根目录 SHALL 仅保留运行时必需文件，不含一次性调试脚本、临时语法检查转储、Python 替换脚本或 `.tmp` 文件。

#### Scenario: 根目录文件清单
- **WHEN** 列出 `d:\BC\ai_resume\qmzz\` 根目录文件
- **THEN** 不存在 `.analyze-inline.js`、`.analyze-top.js`、`.measure-objects.js`、`.perform-split.js`、`.scan-objects.js`、`.scan-objects.txt`、`.tmp_syntax_check.js`、`cleanup-creator-wars-temp.js`、`replace_gen.py`、`syntax-check-temp.js`、`temp-syntax-check.js` 中的任何一个

#### Scenario: images 目录无临时文件
- **WHEN** 递归列出 `d:\BC\ai_resume\qmzz\images\` 下所有文件
- **THEN** 不存在任何 `.tmp` 后缀文件

### Requirement: CSS 无重复残片
`styles.css` SHALL 仅保留 NPC Panel / Story Panel 的完整定义版本，删除 L6462-L6550 区间的残缺重复段落，避免后定义覆盖前定义导致 `box-shadow` 等视觉细节丢失。

#### Scenario: NPC Panel 样式
- **WHEN** 浏览器解析 `.npc-panel-overlay`、`.npc-panel-content`、`.npc-panel-title` 选择器
- **THEN** 仅应用 L550-L760 区间的完整定义，包含 `box-shadow`、`position: fixed` 等全部属性

### Requirement: reset.css 注释完整可读
`styles/reset.css` 的注释 SHALL 为完整可读的中文，不出现 `?` 替换字符。

#### Scenario: 编码损坏修复
- **WHEN** 读取 `styles/reset.css` L58、L64
- **THEN** 注释内容为完整中文句子（"塌陷"、"不进行 fill 重置"、"颜色"），不含 `?` 替换字符

## REMOVED Requirements

### Requirement: 废弃备份文件
**Reason**: `index.html` 缺失函数恢复并验证通过后，`.trae/specs/deep-slim-project-resources-and-code/backups/` 下的 `index.html.bak`、`index.html.pre-split.bak` 及整套 `images/`、`models/`、`videos/` 副本已不再需要，与项目主目录重复。
**Migration**: 在 `index.html` 通过浏览器冒烟测试后再删除；若 `renderHomePage` / `publishVideo` 仍需从备份追溯，则在追溯完成后再删除对应 `.bak`。
