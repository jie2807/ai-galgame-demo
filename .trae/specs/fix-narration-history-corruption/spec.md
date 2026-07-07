# 修复历史消息格式腐蚀导致旁白/对话区分失败 Spec

## Why
`_buildApiMessages`（index.html L11993-12006）在将历史对话回传给 AI 时，对 assistant 消息的**整段原始内容**（含旁白+对话混合）统一添加角色前缀：
- 单 NPC 模式：`charName + '：' + m.content` → 如 `林深：林深走了过来。\n\n「你来了。」`
- 多 NPC 模式：`'【' + charName + '】' + m.content` → 如 `【林深】林深走了过来。\n\n【林深】「你来了。」`

但系统提示词（`_buildSystemPrompt`）**明确禁止**这两种格式：
- 单 NPC 规则段 L11719 错误示例：`林深：你来了。（不要用冒号，要用【】标签）`
- 多 NPC 规则段 L11608 规则 3：`旁白描写不需要角色标签，直接书写`

这造成**自我矛盾的上下文**：系统提示词告诉 AI「不要用冒号、旁白不加标签」，但历史消息里 AI 看到自己上一轮的「输出」恰恰是 `林深：...` 或 `【林深】旁白...`。AI 从被腐蚀的历史中学习错误格式 → 逐渐放弃 `「」` 包裹对话 → 给旁白加标签 → 解析器 `parseNPCMessageContent` 误判 → 用户看到旁白和对话混淆。

**这是旁白/对话区分问题的真正根源**。之前的修复（`classifyAsDialogue` 启发式调整、玩家名称注入、`flushSegment` 逐句兜底等）只优化了解析器的容错性，但没有堵住历史消息腐蚀这个源头。只要 AI 持续从错误格式的历史中学习，解析器再聪明也无法彻底解决问题。

## What Changes
- **重构 `_buildApiMessages` 的 assistant 消息格式化逻辑**：不再对整段 `m.content` 加前缀，改为先用 `parseNPCMessageContent`（项目内已有的解析函数）将 assistant 消息拆分为 narration/dialogue parts，然后按系统提示词期望的格式分别重建：
  - narration parts → 纯文本段落（无标签、无前缀）
  - dialogue parts → 单 NPC 模式：`「content」`；多 NPC 模式：`【NPC名】「content」`
  - parts 之间用 `\n\n` 连接（符合规则「旁白和对话分段书写，中间空一行」）
- **参考已有正确实现**：`buildBookApiMessages`（L28970-28980）和 `buildBookContinueApiMessages`（L29026-29036）已经用 `parseNPCMessageContent` 拆分 assistant 消息后分别格式化，证明该方案在项目中可行。
- **保持 `type === 'narration'` 独立旁白消息的处理不变**（L11997-11998）：这些是系统生成的独立旁白（如事件触发旁白 L12178），用 `【旁白】` 前缀标记为 user 消息是合理的。

## Impact
- Affected specs: `fix-narration-dialogue-distinction`（之前的 spec 修复了解析器容错性，本次修复源头腐蚀，两者互补）
- Affected code:
  - `index.html` L11999-12005（`_buildApiMessages` 中 assistant 消息格式化分支）
- 不影响渲染路径、存档恢复路径、解析器逻辑——这些已经在之前的 spec 中优化过

## ADDED Requirements

### Requirement: 历史消息格式须与系统提示词一致
`_buildApiMessages` 在构建发送给 AI 的历史消息时，assistant 消息的格式 SHALL 与系统提示词中规定的输出格式保持一致，避免 AI 从自相矛盾的历史中学习错误格式。

#### Scenario: 单 NPC 模式下的 assistant 历史
- **WHEN** 单 NPC 模式下（`_allNpcIds.length <= 1` 或 `_manualNpcLock === true`），assistant 消息 `m.content` 为 `"林深走了过来。\n\n「你来了。"`
- **THEN** 发送给 AI 的 assistant 消息内容为 `"林深走了过来。\n\n「你来了。」"`（narration 纯文本 + dialogue 用「」包裹，无 `林深：` 前缀）

#### Scenario: 多 NPC 模式下的 assistant 历史
- **WHEN** 多 NPC 模式下（`_allNpcIds.length > 1` 且 `_manualNpcLock === false`），assistant 消息 `m.content` 为 `"林深走了过来。\n\n【林深】「你来了。"`
- **THEN** 发送给 AI 的 assistant 消息内容为 `"林深走了过来。\n\n【林深】「你来了。」"`（narration 纯文本无标签 + dialogue 用【NPC名】「」包裹）

#### Scenario: assistant 消息含多段旁白和对话
- **WHEN** assistant 消息 `m.content` 为 `"林深走了过来。\n\n「你来了。」\n\n林深叹了口气。\n\n「没什么。」"`
- **THEN** 重建后的内容保持多段结构，每段旁白为纯文本、每段对话用「」包裹（单 NPC）或【NPC名】「」包裹（多 NPC），段间以 `\n\n` 分隔

#### Scenario: assistant 消息解析为空时的兜底
- **WHEN** `parseNPCMessageContent(m.content, m.character)` 返回空数组（如 content 为空或解析失败）
- **THEN** 回退到发送原始 `m.content`（不加任何前缀），避免丢失历史信息

### Requirement: 不破坏对话节奏与角色交替
重建后的 assistant 消息 SHALL 保持为单条 `assistant` 角色消息（不拆分为多条 user/assistant），以维持 chat API 所需的 user/assistant 角色交替结构。

#### Scenario: 重建后保持单条 assistant 消息
- **WHEN** 对任意 assistant 消息执行格式重建
- **THEN** 结果仍为 `{ role: 'assistant', content: <重建后内容> }`，不产生额外的 user 或 assistant 消息

## MODIFIED Requirements

### Requirement: _buildApiMessages 中 assistant 消息格式化
**修改前**：对 `type !== 'narration'` 的 assistant 消息，取 `m.character` 对应的角色名，多 NPC 模式加 `【角色名】` 前缀，单 NPC 模式加 `角色名：` 前缀，整段 `m.content` 作为一个字符串。

**修改后**：对 `type !== 'narration'` 的 assistant 消息，先调用 `parseNPCMessageContent(m.content, m.character || this._npcId)` 拆分为 parts 数组。然后遍历 parts：
- 对 `type === 'narration'` 的 part：追加纯文本 `part.content`
- 对 `type === 'dialogue'` 的 part：
  - 多 NPC 模式：追加 `【角色名】「part.content」`（角色名取 `gameCharacters[part.npcId].name`，兜底用 `m.character` 对应名）
  - 单 NPC 模式：追加 `「part.content」`
- parts 之间以 `\n\n` 连接
- 若 parts 为空，回退为原始 `m.content`（不加前缀）

## REMOVED Requirements
无
