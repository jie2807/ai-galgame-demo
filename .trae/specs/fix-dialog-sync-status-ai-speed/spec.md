# 修复对话头像同步/状态显示异常/AI回复速度 Spec

## Why

近期回归修复后，游玩界面出现三个影响体验的问题：
1. **对话头像/名称与台词不同步**：角色头像和名字出现时机晚于台词文本，视觉上像"先听到声音后看到人"，观感别扭。
2. **官方剧本开局刷出 4 个玩家状态**：刚进入章节时，状态栏立刻显示"中毒/疲惫/受伤/生病"等多个状态。这些状态本应反映玩家当前真实状况，开局不应被一次性堆叠。
3. **AI 回复速度慢**：`SimpleChatEngine.sendMessage` 发送请求时未设置 `max_tokens`、`temperature` 等参数，模型可能生成冗长回复；消息历史也未做硬性截断，导致每次请求 token 偏大、首字延迟高。

## What Changes

### 修复 1：对话头像/名称与台词同步显示
- 在 `processDialogueQueue` 中，将"头像/标题/名字"的更新逻辑从"仅完整消息更新"改为"发言者变化时立即更新"。
- 中间帧（`skipTypewriter: true` 且非 `addToHistory`）若检测到 `npcId` 变化，立即触发头像/标题/名字更新，使头像、名字、台词在同一帧出现。
- 同一发言者的中间帧不重复更新头像，避免闪烁。

### 修复 2：玩家状态显示改为"单一当前状态"
- 重构 `detectPlayerStatus`：将 `gameState.playerStatus.conditions` 由"多状态堆叠列表"改为"单一当前状态"语义。
- 新状态出现时**替换**而非**追加**旧状态，确保状态栏至多显示 1 个状态。
- 提高触发阈值：仅在内容中明确出现"你+状态词"或第一人称表述时才切换状态，避免剧情旁白（描述 NPC 受伤、环境毒气等）误判为玩家状态。
- 章节开局首条 AI 回复跳过状态检测，防止开场旁白一次性刷出多个状态。

### 修复 3：AI 回复速度优化
- 在 `SimpleChatEngine.sendMessage` 的请求体中新增 `max_tokens`（默认 800）和 `temperature`（默认 0.85），减少冗长回复与采样开销。
- 在 `_buildApiMessages` 中新增硬性截断：保留最近 N 条（默认 12 条）消息 + 系统消息 + 当前章节设定，超出部分丢弃，降低单次请求 token 量。
- 流式输出保留，但首字到达前的等待通过更短的渲染间隔缓解感知延迟。
- 在设置面板暴露 `max_tokens` 滑块（可选，默认隐藏高级选项）。

## Impact

- **Affected specs**:
  - `fix-post-recovery-regressions`（前一阶段回归修复，本次在其基础上继续完善）
  - `implement-cinematic-visual-mode-ui`（视觉模式 UI，头像同步属其下游）
  - `add-world-status-system`（世界状态系统，玩家状态属其子能力）
- **Affected code**:
  - `d:\BC\qmzz\index.html`
    - Galgame Dialogue System IIFE（约 L40180-L40670）：`processDialogueQueue`、`updateDialogueAvatar`、`updateDialogueTitle`
    - 玩家状态系统（约 L16290-L16500）：`statusKeywords`、`detectPlayerStatus`、`processAIResponse`、`updateGameStateUI`
    - `SimpleChatEngine.sendMessage`（约 L12296）、`_buildApiMessages`（约 L12230-L12294）
    - 初始 `gameState.playerStatus` 定义（约 L14458-L14465）
    - 设置面板（如有需要新增 `max_tokens` 配置项）

## ADDED Requirements

### Requirement: 对话头像与台词同步显示

系统 SHALL 在台词文本写入对话栏的同一帧内完成头像、名字、标题的更新，使三者同步出现。

#### Scenario: 发言者切换时的中间帧
- **WHEN** 聊天引擎推送一个中间帧（`skipTypewriter: true`，`addToHistory: false`），且该帧的 `npcId` 与当前对话栏显示的发言者不同
- **THEN** 系统立即调用 `updateDialogueAvatar`、`updateDialogueTitle`、更新 `dialogueName`，然后再写入 `dialogueText`
- **AND** 头像/名字/标题/文本在同一渲染帧内对用户可见

#### Scenario: 同一发言者的连续中间帧
- **WHEN** 推送的中间帧 `npcId` 与当前对话栏显示的发言者相同
- **THEN** 系统不重复更新头像/名字/标题，仅更新 `dialogueText`，避免头像闪烁

### Requirement: 玩家状态栏仅显示单一当前状态

系统 SHALL 保证 `gameState.playerStatus.conditions` 至多包含 1 个状态条目，新状态替换旧状态而非追加。

#### Scenario: 章节开局首条 AI 回复
- **WHEN** 章节刚刚启动，AI 返回第一条消息（开场旁白/世界观介绍）
- **THEN** 系统跳过 `detectPlayerStatus` 调用，不修改 `playerStatus.conditions`
- **AND** 状态栏保持为空（初始状态）

#### Scenario: 后续剧情触发状态切换
- **WHEN** AI 回复中明确描述玩家自身进入某状态（如"你感到一阵剧痛，伤口裂开"）
- **THEN** 系统将 `playerStatus.conditions` 替换为 `[{ type: 'injured', ... }]` 单一条目
- **AND** 状态栏显示唯一的"受伤"标签

#### Scenario: 旁白描述他人受伤
- **WHEN** AI 回复中描述 NPC 受伤（如"老张倒在地上，伤口流血"），但未明确指向玩家
- **THEN** 系统不修改 `playerStatus.conditions`，状态栏保持原状

### Requirement: AI 请求参数优化

系统 SHALL 在 `SimpleChatEngine.sendMessage` 的请求体中包含 `max_tokens` 与 `temperature` 参数。

#### Scenario: 发送聊天请求
- **WHEN** 玩家在游玩中发送一条消息触发 AI 回复
- **THEN** 请求体包含 `max_tokens: 800`（默认）、`temperature: 0.85`（默认）、`stream: true`
- **AND** 服务端按截断长度返回更短回复，首字延迟与总时长显著降低

### Requirement: 消息历史硬性截断

系统 SHALL 在 `_buildApiMessages` 中对历史消息进行硬性截断，仅保留最近 N 条 + 系统消息 + 章节设定。

#### Scenario: 历史消息超过阈值
- **WHEN** `this._messages` 长度超过 12 条（不含系统消息与章节设定）
- **THEN** 系统仅保留最近 12 条消息拼入请求
- **AND** 超出部分被丢弃，不发送给 API

## MODIFIED Requirements

### Requirement: 玩家状态检测（原 `detectPlayerStatus`）

原实现：扫描 AI 内容中所有状态关键词，命中即追加到 `conditions` 列表，可同时显示多个状态。

修改后：
1. `gameState.playerStatus.conditions` 语义由"状态堆叠列表"改为"当前单一状态容器"（至多 1 条）。
2. `detectPlayerStatus` 检测到新状态时，**替换** `conditions` 数组内容（保留至多 1 条最新状态），而非 push。
3. 触发条件收紧：要求状态关键词附近出现"你/我/玩家"指代词，或第一人称动作描述，否则不触发。
4. 章节首条 AI 回复跳过检测（通过 `_chapterFirstResponse` 标志位实现）。
5. `recoveryKeywords` 命中时清空 `conditions`（恢复健康），保留原逻辑。

### Requirement: `processDialogueQueue` 头像/标题更新逻辑（原 Galgame Dialogue System）

原实现：`if (!item.skipTypewriter || item.addToHistory)` 才更新头像/标题，导致中间帧不更新。

修改后：
1. 提取当前对话栏显示的发言者 `_currentDialogueSpeaker`。
2. 处理队列项时，先比较 `item.npcId` 与 `_currentDialogueSpeaker`：
   - 不同 → 立即更新头像/名字/标题，并刷新 `_currentDialogueSpeaker`。
   - 相同 → 跳过头像/名字/标题更新。
3. 旁白项（`isNarrator`）维持隐藏头像/名字逻辑。
4. 移除原 `if (!item.skipTypewriter || item.addToHistory)` 对头像/标题更新的门控，改由"发言者是否变化"决定。

## REMOVED Requirements

### Requirement: 多状态堆叠显示

**Reason**: 用户明确要求状态栏只显示一个反映玩家当前状态的标签，多状态堆叠既不符合直觉也容易被开场旁白误触发。
**Migration**: `playerStatus.conditions` 数组语义改为至多 1 条；现有存档中已存在的多状态在加载时自动截断为最后一条。
