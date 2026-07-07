# Checklist

## 对话头像同步
- [x] `processDialogueQueue` 中头像/名字/标题更新不再被 `if (!item.skipTypewriter || item.addToHistory)` 门控
- [x] 新增的 `_currentDialogueSpeaker` 状态变量能正确追踪当前对话栏显示的发言者
- [x] 发言者切换时，头像/名字/标题与台词在同一渲染帧内出现
- [x] 同一发言者的连续中间帧不触发头像重复更新（无闪烁）
- [x] 旁白项（`isNarrator: true`）仍正确隐藏头像与名字
- [x] `_galgameResetDialogue` 正确重置 `_currentDialogueSpeaker`

## 玩家状态显示
- [x] `startGame` 与章节切换处正确设置 `_chapterFirstResponse = true`
- [x] 章节首条 AI 回复跳过 `detectPlayerStatus`，状态栏保持为空
- [x] `detectPlayerStatus` 检测到新状态时使用替换语义（`conditions = [newCondition]`），而非 push
- [x] `gameState.playerStatus.conditions` 至多包含 1 条状态
- [x] 状态关键词触发条件要求附近出现"你/我/玩家/自己"指代词
- [x] 旁白描述 NPC 受伤、环境毒气等不再误触发玩家状态
- [x] `recoveryKeywords` 命中时正确清空 `conditions`
- [x] 加载旧存档时，多状态被自动截断为最后一条
- [x] `updateGameStateUI` 正确渲染单一状态标签（沿用原渲染逻辑，0/1 条均兼容）

## AI 回复速度
- [x] `SimpleChatEngine.sendMessage` 请求体包含 `max_tokens: 800`
- [x] `SimpleChatEngine.sendMessage` 请求体包含 `temperature: 0.85`
- [x] `_buildApiMessages` 末尾对历史消息进行硬性截断（保留最近 12 条 + 系统消息 + 章节设定）
- [x] 截断逻辑不影响系统消息与章节设定的完整性
- [x] `getSettings` 默认值中包含 `max_tokens` 与 `temperature`（通过 settings.maxTokens/temperature 读取，缺省回退到 800/0.85）
- [ ] 浏览器实测：AI 回复首字延迟与总时长较修改前明显缩短（需用户实测）
- [ ] 回复内容长度合理，剧情连贯性未受影响（需用户实测）

## 兼容性与回归
- [ ] 自定义剧本视觉模式对话栏显示正常（需用户实测）
- [ ] 官方剧本文本/视觉模式对话栏显示正常（需用户实测）
- [ ] 现有存档加载不报错（需用户实测）
- [ ] 章节切换、游戏重启后状态栏行为符合预期（需用户实测）
- [ ] 无新增 console 报错（静态语法校验通过；需用户实测确认运行时无报错）
