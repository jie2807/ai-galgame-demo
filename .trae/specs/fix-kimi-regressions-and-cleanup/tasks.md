# Tasks

- [x] Task 1: 恢复 `index.html` 中缺失的抽卡系统函数
  - [x] 1.1 从 `.trae/specs/deep-slim-project-resources-and-code/backups/index.html.bak` 提取 `updateGachaUI`、`pullGacha`、`executeGachaPull`、`showEnvelopeAnimation`、`setGachaButtonsDisabled` 5 个函数定义及其依赖的闭包变量（如 `_gachaPullQueue`、`_isGachaAnimating`、`_gachaCurrentIndex`）
  - [x] 1.2 将函数定义粘贴回当前 `index.html` 的对应作用域（确保与调用站点 L26689-26703、L26779、L26840、L26858、L26888 处于同一作用域或全局可访问）
  - [x] 1.3 验证：在浏览器中打开 `index.html`，点击单抽/十连按钮，确认不抛 `ReferenceError` 且抽卡动画正常

- [x] Task 2: 恢复 `index.html` 中缺失的消息编辑函数
  - [x] 2.1 从备份提取 `markMessagesDeprecated(fromSeq)` 函数定义
  - [x] 2.2 粘贴回当前 `index.html`，使其在 L19265、L19293 调用站点可见
  - [x] 2.3 验证：编辑消息保存、消息分叉保存时不再抛错，`saveGameState()` 正常执行

- [x] Task 3: 恢复 `index.html` 中缺失的 Creator Wars 函数
  - [x] 3.1 从 `.trae/specs/deep-slim-project-resources-and-code/backups/index.html.pre-split.bak` 提取 `renderManipulationHistory`、`updateMetricsPanel`、`updateBottomMetrics`、`updateManipulatePanel`、`generateHomeVideos`、`restoreStudioView`、`endAgentLive`、`generateInitialAgentContent` 8 个函数定义及其依赖的闭包变量（如 `cwEngine`、`manipulationHistory`）
  - [x] 3.2 注意 IIFE 边界：原函数定义在被 `cleanup-creator-wars-temp.js` 删除的 IIFE 内，需粘贴回与调用站点 L38026-L38071、L38527、L38736、L38985 同一作用域
  - [x] 3.3 验证：在 Creator Wars 面板执行"操控舆论/控屏/水军/对冲/删评"任一操作，确认回调链中 8 个函数全部可调用，不抛错

- [x] Task 4: 恢复 `index.html` 中缺失的通用工具函数
  - [x] 4.1 从备份提取 `showProgressBar(title, stages, onComplete)`、`showResult(status)`、`showExitConfirm()`、`importAllData(file)` 4 个函数定义
  - [x] 4.2 粘贴回当前 `index.html` 对应作用域
  - [x] 4.3 验证：AI 标题生成进度条显示、订单状态展示、退出确认弹窗、数据导入功能正常

- [x] Task 5: 调查并恢复 `renderHomePage` 与 `publishVideo`
  - [x] 5.1 在两个 `.bak` 备份中全文搜索 `renderHomePage`、`publishVideo` 的定义位置（可能为对象方法如 `cwEngine.renderHomePage = function(){}`）
  - [x] 5.2 若找到定义，提取并粘贴回；若未找到，分析 L38054、L38410、L38417、L38424、L38512、L38523、L38805、L38983 8 处 `renderHomePage()` 调用上下文，根据上下文重新实现最小可用版本
  - [x] 5.3 验证：Creator Wars 主页渲染、视频发布功能不再因未定义函数抛错

- [x] Task 6: 删除根目录 11 个废弃脚本文件
  - [x] 6.1 删除 `.analyze-inline.js`、`.analyze-top.js`、`.measure-objects.js`、`.perform-split.js`、`.scan-objects.js`、`.scan-objects.txt`、`.tmp_syntax_check.js`、`cleanup-creator-wars-temp.js`、`replace_gen.py`、`syntax-check-temp.js`、`temp-syntax-check.js`
  - [x] 6.2 验证：列出根目录文件，确认上述 11 个文件均已不存在

- [x] Task 7: 删除 `images/` 下 11 个 `.tmp` 文件
  - [x] 7.1 逐个确认每个 `.tmp` 同名正式文件存在后，删除 `starry-sky.jpg.tmp`、`evergarden-flowers.jpg.tmp`、`character-collection.jpg.tmp`、`portraits/noxasen/{albrecht,erich,friedrich,heinrich,klara,lena,margaret,weber}.png.tmp`
  - [x] 7.2 验证：递归列出 `images/` 下文件，确认无 `.tmp` 后缀文件

- [x] Task 8: 删除 `styles.css` 中重复的 NPC/Story 面板残片
  - [x] 8.1 读取 `styles.css` L6462-L6550 区间，确认与 L550-L760 区间重复且属性不完整
  - [x] 8.2 删除 L6462-L6550 区间的重复段落
  - [x] 8.3 验证：浏览器解析 `.npc-panel-overlay`、`.npc-panel-content`、`.npc-panel-title`、`.story-panel-overlay`、`.story-panel-content`、`.story-panel-title` 时仅应用完整定义，包含 `box-shadow`、`position: fixed` 等属性

- [x] Task 9: 修复 `styles/reset.css` 编码损坏注释
  - [x] 9.1 读取 `styles/reset.css` L58、L64 当前损坏内容
  - [x] 9.2 将 L58 注释重写为 `/* 视频保持原始比例，避免高度塌陷 */`
  - [x] 9.3 将 L64 注释重写为 `/* SVG 默认样式 - 不进行 fill 重置，避免覆盖自定义渐变和颜色 */`
  - [x] 9.4 验证：读取 L58、L64，确认为完整中文句子，不含 `?` 替换字符

- [x] Task 10: 删除 `.trae/specs/deep-slim-project-resources-and-code/backups/` 下重复备份
  - [x] 10.1 确认 Task 1-5 已完成且 `index.html` 通过浏览器冒烟测试
  - [x] 10.2 删除 `index.html.bak`、`index.html.pre-split.bak`
  - [x] 10.3 删除 `backups/images/`、`backups/models/`、`backups/videos/` 整套重复副本
  - [x] 10.4 验证：`backups/` 目录已清空或仅保留必要文件

# Task Dependencies
- [Task 1]、[Task 2]、[Task 3]、[Task 4] 可并行执行（均从同一备份提取不同函数）
- [Task 5] 依赖 [Task 3] 部分上下文（同属 Creator Wars 模块），但可独立调查
- [Task 6]、[Task 7]、[Task 8]、[Task 9] 相互独立，可并行执行
- [Task 10] 严格依赖 [Task 1]-[Task 5] 全部完成且 `index.html` 通过冒烟测试，**必须最后执行**
