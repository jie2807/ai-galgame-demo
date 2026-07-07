# 修复旁白与角色台词区分模糊问题 Spec

## Why
上一会话为「玩家名称注入」修改了 `_buildSystemPrompt` 的 `playerSection` 构造逻辑（index.html L11496），其中使用 `「」` 包裹玩家名称作为高亮（`请用「{玩家名称}」称呼玩家`）。但 `「」` 正是系统提示词中定义的 **对话专属分隔符**（规则第 3/4 条），导致 AI 在旁白中也用 `「」` 包裹玩家名称。`parseMessageContent` 的正则 `「([^」]*)」` 会把玩家名称误提取为对话片段，造成旁白被切碎、玩家名称被当作 NPC 台词显示，玩着玩着就出错。

同时规则示例仍用 "玩家角色" 占位（如 "玩家角色点了点头"），与玩家段「请用实际名称」的指令不一致，加剧了 AI 输出格式漂移。

## What Changes
- **修复玩家名称注入指令**：移除 `「」` 包裹，改用纯文本或 `『』` 书名号式高亮；明确「旁白中不要用 `「」` 包裹玩家名称」
- **统一规则示例占位符**：将规则段中的 "玩家角色" 占位符替换为 `{玩家名称}` 动态注入，使示例与玩家段指令一致
- **增强解析器鲁棒性**：
  - 在 `isClearlyNarration` / `classifyAsDialogue` 中注册玩家实际名称，使以玩家名称开头的旁白能被正确识别
  - 优化 `flushSegment` 无 `「」` 段落的判定：当段落同时含有强对话标志（第一人称/第二人称代词、疑问/感叹尾、对话起始词）时，不再一律按 `isClearlyNarration` 默认 true 吞为旁白，改为逐句分类
- **强化系统提示词**：在「旁白与对话区分规则」中追加一条明确禁令：「禁止在旁白中用 `「」` 包裹任何词语，`「」` 仅用于 NPC 台词」

## Impact
- Affected specs: 无（本次为独立 bug 修复）
- Affected code:
  - `index.html` L11481-11502（`_buildSystemPrompt` 的 `playerSection` 构造）
  - `index.html` L11594-11746（`rulesSection` 单/多 NPC 规则与示例文本）
  - `index.html` L17370-17456（`isClearlyNarration` 启发式）
  - `index.html` L17134-17221（`classifyAsDialogue` 启发式）
  - `index.html` L17470-17541（`flushSegment` 无引号段落判定）

## ADDED Requirements

### Requirement: 玩家名称注入不得污染对话分隔符
系统提示词中向 AI 传达玩家名称时，SHALL NOT 使用 `「」`（对话分隔符）包裹玩家名称，避免 AI 在旁白中误用 `「」` 导致解析器把玩家名称提取为对话。

#### Scenario: 玩家已设置名称
- **WHEN** 玩家在个人资料中设置了非空且非 "VIOLET" 的名称
- **THEN** 系统提示词的玩家段使用纯文本或 `『』` 高亮玩家名称，并明确指令「旁白中不得用 `「」` 包裹玩家名称」

#### Scenario: 玩家未设置名称
- **WHEN** 玩家未设置名称或名称为 "VIOLET"
- **THEN** 回退到原 `chapter.playerName` 格式，不注入额外指令

### Requirement: 规则示例与玩家段指令保持一致
规则段中的旁白示例 SHALL 使用动态注入的玩家名称占位（而非固定文案 "玩家角色"），使 AI 看到的示例与玩家段要求称呼一致。

#### Scenario: 第三人称视角
- **WHEN** `scriptNarrativePerspective === 'third_person'` 且玩家已设置名称
- **THEN** 规则示例文本如 "玩家角色点了点头" 替换为 "{玩家名称}点了点头"

### Requirement: 解析器识别玩家名称
`isClearlyNarration` 与 `classifyAsDialogue` SHALL 将玩家实际名称纳入旁白识别启发式，使以玩家名称开头的旁白段落能被正确分类。

#### Scenario: 旁白以玩家名称开头
- **WHEN** AI 回复的旁白段落以玩家名称开头（如 "李明点了点头"）且不含 `「」`
- **THEN** 该段落被识别为 narration，不会被误分类为 dialogue

### Requirement: 无引号段落的对话兜底
当 AI 未使用 `「」` 包裹台词时，解析器 SHALL 通过逐句分类尽量回收对话内容，而非一律按旁白处理。

#### Scenario: 段落含对话标志但无引号
- **WHEN** 一个段落不含 `「」` 但其中某些句子以第一/第二人称代词、疑问尾、对话起始词开头
- **THEN** 这些句子被分类为 dialogue，其余按 narration 处理

## MODIFIED Requirements

### Requirement: 旁白与对话区分规则（系统提示词）
在原有规则基础上，追加明确禁令：
- 禁止在旁白中用 `「」` 包裹任何词语
- `「」` 仅用于 NPC 台词
- 玩家名称在旁白中以纯文本出现，不加任何引号

## REMOVED Requirements
无
