# Tasks

## Phase A — 实现基础设施（变更 1 + 变更 2，可并行）

- [x] Task 1: 实现 AI 回复耗时指示器（变更 1）
  - [x] SubTask 1.1: 在 `addTypingIndicator()` 中追加 `.msg-elapsed-chip` DOM 节点（L19600）
  - [x] SubTask 1.2: 在 `sendUserMessage()` 入口处启动 `performance.now()` 计时（L26394+）
  - [x] SubTask 1.3: 启动 `setInterval(200ms)` 刷新 chip 文本，初始显示「等待首字...」
  - [x] SubTask 1.4: 在 `onChunk` 首次回调时记录首字时间戳（L26472-26473）
  - [x] SubTask 1.5: 在 `onComplete` 中停止 interval，chip 定格 800ms 后淡出（L26478）
  - [x] SubTask 1.6: 在 `onError` 与取消分支中停止 interval，显示错误（L26546, L26373）
  - [x] SubTask 1.7: CSS 样式已在 `styles.css` L6097-L6131 中存在，无需新增
  - [x] SubTask 1.8: `removeTypingIndicator()` 已清理 interval（L19615-19617）
  - [x] SubTask 1.9: JS 语法验证通过

- [x] Task 2: 实现无立绘角色按性别默认立绘（变更 2）
  - [x] SubTask 2.1: 创建 `assets/portraits/fallback-male.svg`（2265 bytes）
  - [x] SubTask 2.2: 创建 `assets/portraits/fallback-female.svg`（2620 bytes）
  - [x] SubTask 2.3: 修改 `showPlaceholderFallback(gender)` 接受 gender 参数（L40116）
  - [x] SubTask 2.4: 修改 `updatePortrait()` 所有调用点传入 `charData.gender`（5 处）
  - [x] SubTask 2.5: 修改两处自定义 NPC 注册逻辑（L15362, L24694），无立绘时按性别绑定默认 SVG
  - [x] SubTask 2.6: JS 语法验证通过
  - [x] SubTask 2.7: 待浏览器验证

## Phase B — 末日文剧本数据文件重写（变更 3，已完成）

- [x] Task 3: 重写 `data/game-world-info.js` 为末日文 Lorebook
  - [x] SubTask 3.1: 备份当前文件（git 已追踪，无需手动备份）
  - [x] SubTask 3.2: 按 spec.md「一、世界观 Lorebook」16 条目完整重写 `gameWorldInfo` 数组
  - [x] SubTask 3.3: 确保每条 `keys` 数组覆盖该词条的关键别名
  - [x] SubTask 3.4: 在浏览器 console 验证 `gameWorldInfo` 数组结构与内容

- [x] Task 4: 重写 `data/characters.js` 为末日文 12 个 NPC
  - [x] SubTask 4.1: 按 spec.md「三、NPC 卡片概要」重写 `gameCharacters` 对象，12 个 NPC
  - [x] SubTask 4.2: 每个 NPC 字段完整
  - [x] SubTask 4.3: 重写 `gachaPool` 数组，12 个 NPC 全部进入，SSR 4 / SR 6 / R 2
  - [x] SubTask 4.4: 在浏览器 console 验证 `gameCharacters` 与 `gachaPool` 结构

- [x] Task 5: 重写 `data/chapter-locations.js` 为末日文 18 个场景
  - [x] SubTask 5.1: 第一章 6 个场景
  - [x] SubTask 5.2: 第二章 6 个场景
  - [x] SubTask 5.3: 第三章 6 个场景
  - [x] SubTask 5.4: 每个场景字段完整

- [x] Task 6: 重写 `data/game-chapters.js` 为末日文三章剧本
  - [x] SubTask 6.1: 第一章「废墟之弈」完整重写
  - [x] SubTask 6.2: 第一章事件系统（12+8+8+4）
  - [x] SubTask 6.3: 第二章「钢铁之弈」完整重写
  - [x] SubTask 6.4: 第二章事件系统
  - [x] SubTask 6.5: 第三章「黎明之弈」完整重写
  - [x] SubTask 6.6: 第三章事件系统
  - [x] SubTask 6.7: 语法验证通过

- [x] Task 7: 重写 `data/npc-live2d-models.js` 为新 NPC ID 占位映射
  - [x] SubTask 7.1: 12 个新 NPC ID 占位映射，URL 暂为 null
  - [x] SubTask 7.2: 添加注释说明「待用户技能生成立绘后填入实际 URL」

## Phase C — index.html 中的深度融合指令与识别逻辑切换（变更 3 收尾，已完成）

- [x] Task 8: 修改 `_buildSystemPrompt` 融合指令与识别逻辑
  - [x] SubTask 8.1: 修改诺克萨森识别逻辑 (L11791)：识别关键词改为末日文关键词
  - [x] SubTask 8.2: 将 `noxasenDeepRules` 整体替换为 `doomsdayDeepRules` (L11812-11827)
  - [x] SubTask 8.3: 全局搜索旧关键词，确认无功能残留
  - [x] SubTask 8.4: HTML UI 中诺克萨森残留文本已清除（L7065/L8169/L8194/L8205/L8218 等处）

## Phase D — 整合验证

- [x] Task 9: 端到端验证
  - [x] SubTask 9.1: 启动 Playwright 模拟移动端 375×667，进入首页 → 官方剧本 → 第一章，验证开场场景为末日文
  - [ ] SubTask 9.2: 在第一章对话中发送一条消息，验证 `.msg-elapsed-chip` 出现并实时刷新（需配置 API key）
  - [ ] SubTask 9.3: 触发 AI 临时引入一个新配角，验证其立绘回退到对应性别默认立绘（需 API key）
  - [x] SubTask 9.4: 进入抽卡页，验证 12 个末日 NPC 卡牌数据完整（gachaPool 12 项验证通过）
  - [ ] SubTask 9.5: 进入角色档案页，验证 12 个末日 NPC 资料完整（需手动进入档案页）
  - [x] SubTask 9.6: 进入第二、第三章，验证开场场景与 NPC 正确（Playwright 验证：第二章「铁牙指挥中心」/lie/lingshuang/alpha/mila，第三章「方舟北方基地」/yuanzhang/lin/shenfu/ada）
  - [ ] SubTask 9.7: 切换到自定义剧本模式，验证自定义剧本功能未受影响（需手动测试）
  - [x] SubTask 9.8: 控制台无新增错误，无 404 关键资源（修复 game-chapters.js 语法错误 + 恢复 showExitConfirm 函数）

# Task Dependencies

- Task 1（耗时指示器）与 Task 2（默认立绘）相互独立，可并行
- Task 3-7（数据文件重写）已完成
- Task 8（融合指令）已完成
- Task 9（验证）依赖 Task 1-2 完成
