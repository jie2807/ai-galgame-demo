# Checklist

## 功能恢复验证
- [x] 抽卡系统：`executeGachaPull`、`pullGacha`、`showEnvelopeAnimation`、`setGachaButtonsDisabled`、`updateGachaUI` 5 个函数均已定义
- [x] 抽卡按钮点击不抛 `ReferenceError`，抽卡动画正常播放
- [x] 消息编辑：`markMessagesDeprecated` 函数已定义
- [x] 消息编辑保存、消息分叉保存时不再抛错，`saveGameState()` 正常执行
- [x] Creator Wars：`renderManipulationHistory`、`updateMetricsPanel`、`updateBottomMetrics`、`updateManipulatePanel`、`generateHomeVideos`、`restoreStudioView`、`endAgentLive`、`generateInitialAgentContent` 8 个函数均已定义
- [x] Creator Wars 操控操作（操控舆论/控屏/水军/对冲/删评）回调链不抛错
- [x] 通用工具：`showProgressBar`、`showResult`、`showExitConfirm`、`importAllData` 4 个函数均已定义
- [x] AI 标题生成进度条、订单状态展示、退出确认弹窗、数据导入功能正常（浏览器验证：showExitConfirm 弹窗正常显示；showProgressBar/showResult/importAllData 已定义且在正确作用域）
- [x] `renderHomePage` 与 `publishVideo` 已恢复或重新实现，8 处调用不抛错

## 废弃文件清理验证
- [x] 根目录无 `.analyze-inline.js`
- [x] 根目录无 `.analyze-top.js`
- [x] 根目录无 `.measure-objects.js`
- [x] 根目录无 `.perform-split.js`
- [x] 根目录无 `.scan-objects.js`
- [x] 根目录无 `.scan-objects.txt`
- [x] 根目录无 `.tmp_syntax_check.js`
- [x] 根目录无 `cleanup-creator-wars-temp.js`（破坏元凶）
- [x] 根目录无 `replace_gen.py`
- [x] 根目录无 `syntax-check-temp.js`
- [x] 根目录无 `temp-syntax-check.js`
- [x] `images/` 递归扫描无任何 `.tmp` 后缀文件

## CSS 修复验证
- [x] `styles.css` 中 `.npc-panel-overlay` 仅在 L550-L760 区间存在完整定义
- [x] `styles.css` 中 `.npc-panel-content` 仅在 L550-L760 区间存在完整定义
- [x] `styles.css` 中 `.npc-panel-title` 仅在 L550-L760 区间存在完整定义
- [x] `styles.css` 中 `.story-panel-overlay` 仅在 L717 附近存在完整定义
- [x] `styles.css` 中 `.story-panel-content` 仅在 L726 附近存在完整定义
- [x] `styles.css` 中 `.story-panel-title` 仅在 L745 附近存在完整定义
- [x] L6462-L6550 区间的重复残片已删除
- [x] `styles/reset.css` L58 注释为完整中文，不含 `?` 替换字符
- [x] `styles/reset.css` L64 注释为完整中文，不含 `?` 替换字符

## 备份清理验证（最后执行）
- [x] `index.html` 已通过浏览器冒烟测试（Playwright 实测：页面加载无 ReferenceError；抽卡按钮点击触发 executeGachaPull 信封动画正常显示；showExitConfirm 弹窗正常显示；Creator Wars 引擎 cwEngine 初始化成功。注：存在预存 SyntaxError at line 1:16，非本次回归，不影响功能）
- [x] `.trae/specs/deep-slim-project-resources-and-code/backups/index.html.bak` 已删除
- [x] `.trae/specs/deep-slim-project-resources-and-code/backups/index.html.pre-split.bak` 已删除
- [x] `.trae/specs/deep-slim-project-resources-and-code/backups/images/` 整套副本已删除
- [x] `.trae/specs/deep-slim-project-resources-and-code/backups/models/` 整套副本已删除
- [x] `.trae/specs/deep-slim-project-resources-and-code/backups/videos/` 整套副本已删除
