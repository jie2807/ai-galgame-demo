# Tasks

- [x] Task 1: 修复对话头像/名称与台词同步显示
  - [x] SubTask 1.1: 在 Galgame Dialogue System IIFE 顶部新增 `_currentDialogueSpeaker` 状态变量（初始 null）
  - [x] SubTask 1.2: 重构 `processDialogueQueue`（约 L40319）中的头像/名字/标题更新逻辑：移除 `if (!item.skipTypewriter || item.addToHistory)` 门控，改为按 `item.npcId` 与 `_currentDialogueSpeaker` 是否一致决定是否更新；发言者变化时先更新头像/名字/标题再写入文本
  - [x] SubTask 1.3: 在 `_galgameResetDialogue`（约 L40658）中重置 `_currentDialogueSpeaker = null`
  - [x] SubTask 1.4: 浏览器打开 `d:\BC\qmzz\index.html`，进入自定义剧本，验证角色切换时头像/名字/标题与台词同步出现，同一角色连续发言不闪烁（静态语法校验通过，需用户在浏览器实测）

- [x] Task 2: 修复玩家状态栏开局刷出多个状态
  - [x] SubTask 2.1: 在 `startGame`（约 L16502）与章节切换处新增 `_chapterFirstResponse = true` 标志位
  - [x] SubTask 2.2: 修改 `processAIResponse`（约 L16400）：若 `_chapterFirstResponse` 为 true，跳过 `detectPlayerStatus` 调用，并将标志位置 false
  - [x] SubTask 2.3: 重构 `detectPlayerStatus`（约 L16456）：检测到新状态时用 `gameState.playerStatus.conditions = [newCondition]` 替换数组，而非 push；保留 recoveryKeywords 清空逻辑
  - [x] SubTask 2.4: 收紧 `statusKeywords` 触发条件：要求状态关键词前后 10 字符内出现"你/我/玩家/自己"等指代词，否则不触发；旁白描述他人受伤不误判
  - [x] SubTask 2.5: 在 `loadGameState`/存档加载处新增兼容逻辑：若加载的 `conditions` 长度 > 1，截断保留最后一条
  - [x] SubTask 2.6: 浏览器测试官方剧本开局，确认状态栏为空；触发"你感到剧痛"类描述后状态栏出现单一"受伤"标签；触发恢复词后清空（静态语法校验通过，需用户在浏览器实测）

- [x] Task 3: 优化 AI 回复速度
  - [x] SubTask 3.1: 在 `SimpleChatEngine.sendMessage`（约 L12296）的 fetch 请求体中新增 `max_tokens: 800`、`temperature: 0.85` 字段（值可从 settings 读取，缺省用默认值）
  - [x] SubTask 3.2: 在 `_buildApiMessages`（约 L12230-L12294）末尾新增硬性截断逻辑：保留系统消息 + 章节设定 + 最近 12 条历史消息，其余丢弃
  - [x] SubTask 3.3: 检查 `getSettings`/设置面板，若已有 `max_tokens` 字段则复用，否则在 settings 默认值中补充（不在 UI 暴露滑块，保持最小改动）
  - [x] SubTask 3.4: 浏览器测试：触发 AI 回复，确认响应时长较修改前明显缩短，回复内容长度合理（不再冗长跑题），剧情连贯性未受影响（静态语法校验通过，需用户在浏览器实测）

# Task Dependencies

- Task 1、Task 2、Task 3 互相独立，已并行实施完成。
- Task 1 的 SubTask 1.4、Task 2 的 SubTask 2.6、Task 3 的 SubTask 3.4 均为浏览器实测验收点，需用户在所有代码改动完成后统一进行。
