# 修复剧本编辑器智能生成字段缺口 Spec

## Why

[调研报告](file:///d:/BC/qmzz/.trae/specs/research-script-editor-generation-gap/report.md) 已确认：当前剧本编辑器的「智能生成」产出的剧本远不及官方剧本水平，根因不是 AI 模型能力不足，而是生成管道的四个环节同时漏掉了官方剧本的核心字段——双 Prompt 文件冲突让 [data/custom-script-prompts.js](file:///d:/BC/qmzz/data/custom-script-prompts.js) 不生效；[normalizeGeneratedScript](file:///d:/BC/qmzz/index.html#L23333-L23458) 丢弃 `stateVars`/`worldContext`/`events` 嵌套结构；[validateScriptData](file:///d:/BC/qmzz/index.html#L22615-L22644) 仅 5 项最低门槛校验；[data/script-data-schema-v2.js](file:///d:/BC/qmzz/data/script-data-schema-v2.js) 未声明官方剧本核心字段。本 Spec 落地调研报告的 5 项 P0 改进，让 AI 生成剧本能承载官方剧本的「剧本主控文档」模式（playerDesc 四段式 + stateVars + events 四类嵌套 + worldContext）。

## What Changes

- **P0-1 消除双 Prompt 文件冲突**：删除 [index.html](file:///d:/BC/qmzz/index.html) L23632-L23656 内联 `window.CUSTOM_SCRIPT_PROMPTS` 赋值块，让 [data/custom-script-prompts.js](file:///d:/BC/qmzz/data/custom-script-prompts.js) 成为单一来源
- **P0-2 Prompt 模板重写**：重写 [data/custom-script-prompts.js](file:///d:/BC/qmzz/data/custom-script-prompts.js) 三档（basic/medium/advanced）systemPrompt，加入 playerDesc 四段式结构要求、stateVars 字段要求、events 四类嵌套（timelineEvents/thresholdEvents/randomEvents/endingEvents）要求、worldContext 关键词要求、choices.impact 字符串格式说明
- **P0-3 normalizeGeneratedScript 扩展**：在 [index.html](file:///d:/BC/qmzz/index.html) L23426-L23457 返回对象中新增 `stateVars`、`worldContext`、`timelineEvents`、`thresholdEvents`、`randomEvents`、`endingEvents` 字段映射，保留原有扁平 events 数组以向后兼容
- **P0-4 validateScriptData 扩展**：在 [index.html](file:///d:/BC/qmzz/index.html) L22615-L22644 中增加校验项：stateVars 数组结构校验、events 嵌套结构校验、playerDesc 字数警告（非阻塞）
- **P0-5 schema 扩展**：在 [data/script-data-schema-v2.js](file:///d:/BC/qmzz/data/script-data-schema-v2.js) 中声明新字段：`stateVars`、`worldContext`、`events.timelineEvents/thresholdEvents/randomEvents/endingEvents`，并在 `characters.player.description` 注释中说明四段式结构

**非破坏性原则**：所有改动保持向后兼容——既有 1.0 版本剧本的导入导出不受影响；既有扁平 events 数组继续支持；新字段缺失时使用默认空值，不阻断生成流程。

## Impact

- Affected specs:
  - [research-script-editor-generation-gap](file:///d:/BC/qmzz/.trae/specs/research-script-editor-generation-gap/spec.md)（调研型，本 Spec 的前置依据）
  - `fix-custom-script-ai-generation`（已修复 Prompt/JSON/进度，本 Spec 在其基础上修复字段缺失）
  - `upgrade-script-system-v2`、`overhaul-script-system-omnimundia`（架构/功能层规划，本 Spec 是字段层基础）
- Affected code:
  - [index.html](file:///d:/BC/qmzz/index.html) L22615-L22644（validateScriptData）——新增校验项
  - [index.html](file:///d:/BC/qmzz/index.html) L23333-L23458（normalizeGeneratedScript）——return 对象新增字段
  - [index.html](file:///d:/BC/qmzz/index.html) L23632-L23656（内联 CUSTOM_SCRIPT_PROMPTS）——删除
  - [data/custom-script-prompts.js](file:///d:/BC/qmzz/data/custom-script-prompts.js)（全文重写三档 systemPrompt）
  - [data/script-data-schema-v2.js](file:///d:/BC/qmzz/data/script-data-schema-v2.js)（扩展 schema）
- 受影响的运行时消费：
  - [SimpleChatEngine._buildSystemPrompt](file:///d:/BC/qmzz/index.html#L11662) 通过 `chapter.playerDesc` 构建 system prompt，P0-2 重写后 playerDesc 将包含 1500-2000 字主控文档，AI 叙事质量提升
  - [loadImportedScript](file:///d:/BC/qmzz/index.html#L22758) 写入编辑器，P0-3 后新字段可写入编辑器（但编辑器 UI 暂不展示这些字段——展示由后续 spec 处理）

## ADDED Requirements

### Requirement: P0-1 消除双 Prompt 文件冲突

系统 SHALL 删除 [index.html](file:///d:/BC/qmzz/index.html) L23632-L23656 的内联 `window.CUSTOM_SCRIPT_PROMPTS` 赋值块，使 [data/custom-script-prompts.js](file:///d:/BC/qmzz/data/custom-script-prompts.js) 成为 Prompt 模板的唯一来源。

#### Scenario: 删除内联赋值

- **WHEN** 开发者执行 P0-1
- **THEN** 删除 [index.html](file:///d:/BC/qmzz/index.html) L23632-L23656 的注释行 `// ===== 自定义剧本智能生成 Prompt 模板 =====` 与 `window.CUSTOM_SCRIPT_PROMPTS = {...}` 整块
- **AND** 保留 [index.html](file:///d:/BC/qmzz/index.html) L9444 的 `<script src="data/custom-script-prompts.js">` 加载（已存在）
- **AND** 保留 L23658 的 `var CustomScriptGenerator = {...}` 与 L23665 的 `PROMPTS: window.CUSTOM_SCRIPT_PROMPTS` 引用（仍指向 data 版本）
- **AND** 删除后 `CustomScriptGenerator.PROMPTS` 必须仍能取到 basic/medium/advanced 三档（来自 data 版本）

#### Scenario: 不破坏既有功能

- **WHEN** 用户在剧本编辑器中点击"智能生成"
- **THEN** 生成流程仍能正常调用 `CustomScriptGenerator.PROMPTS[mode].systemPrompt`
- **AND** buildPrompt 仍能替换 `{{maxLoreEntries}}`/`{{maxEvents}}`/`{{maxItems}}` 占位符
- **AND** 不影响其他依赖 `window.CUSTOM_SCRIPT_PROMPTS` 的代码（如有）

### Requirement: P0-2 Prompt 模板重写

[data/custom-script-prompts.js](file:///d:/BC/qmzz/data/custom-script-prompts.js) SHALL 重写 basic/medium/advanced 三档 systemPrompt，对齐官方剧本字段要求。

#### Scenario: basic 档字段要求

- **WHEN** 用户选择 basic 档生成
- **THEN** systemPrompt 要求 AI 返回的 JSON 顶层字段包含：
  - `metadata`（title/author/tags）
  - `worldBg`（50-100 字）
  - `worldContext`（5-8 个关键词数组）——**新增**
  - `loreEntries`（≤5 条，每条 80-150 字）
  - `locationEntries`（1-3 个，含 weatherWeights）
  - `playerName`、`playerTitle`、`playerDesc`（150-300 字，含简化版 AI 叙事指令与状态跟踪）——**playerDesc 字数下限从 50 提升至 150**
  - `stateVars`（3-5 个，每个含 key/label/initialValue/min/max）——**新增**
  - `npcs`（1-3 个，每个 description 50-100 字）
  - `events`（扁平数组，≤3 个，向后兼容）——保留
  - `timelineEvents`（≤3 个，每个含 trigger/eventName/description/choices[{text, impact}]）——**新增**
  - `quickReplies`、`npcRelationships`、`emotionMappings`、`bgmMap`、`items`、`openingScene`（80-150 字）——保留
- **AND** systemPrompt 中明确说明 `choices.impact` 字符串格式（如 `"population-0, foodDays-2, infectionThreat-15, morale+5"`）

#### Scenario: medium 档字段要求

- **WHEN** 用户选择 medium 档生成
- **THEN** systemPrompt 要求 AI 返回的 JSON 顶层字段包含：
  - `worldBg`（200-400 字）
  - `worldContext`（8-12 个关键词）——**新增**
  - `playerDesc`（500-1000 字，含完整 AI 叙事指令 + 状态跟踪 + 简化事件系统）——**字数下限从 100 提升至 500**
  - `stateVars`（5-8 个）——**新增**
  - `npcs`（3-5 个，每个 description 100-200 字）
  - `events`（扁平数组，≤8 个）——保留
  - `timelineEvents`（5-8 个）——**新增**
  - `thresholdEvents`（≤3 个，含 trigger.stateVar/trigger.operator/trigger.value/eventName/description/choices）——**新增**
  - `endingEvents`（2-3 个，含 trigger.daysRemaining/eventName/description/condition/choices）——**新增**
  - 其他字段保留

#### Scenario: advanced 档字段要求

- **WHEN** 用户选择 advanced 档生成
- **THEN** systemPrompt 要求 AI 返回的 JSON 顶层字段包含：
  - `worldBg`（400-800 字）
  - `worldContext`（10-15 个关键词）——**新增**
  - `playerDesc`（1500-2000 字，含完整四段式：AI叙事指令/状态跟踪/事件系统/语言风格）——**字数下限从 150 提升至 1500**
  - `stateVars`（8-10 个）——**新增**
  - `npcs`（5-8 个，每个 description 150-300 字）
  - `events`（扁平数组，≤12 个）——保留
  - `timelineEvents`（10-12 个）——**新增**
  - `thresholdEvents`（5-8 个）——**新增**
  - `randomEvents`（3-5 个）——**新增**
  - `endingEvents`（3-5 个）——**新增**
  - 其他字段保留

#### Scenario: playerDesc 四段式结构说明

- **WHEN** systemPrompt 描述 playerDesc 字段
- **THEN** 在 advanced 档明确说明 playerDesc 应包含四段式结构：
  - 第一段：玩家角色基础描述（100-200 字）
  - 第二段：【AI叙事指令】路线核心目标、动态分支策略、NPC 称呼规则、信息呈现方式（400-600 字）
  - 第三段：【AI需跟踪状态】列出 stateVars 中各变量的含义（200-400 字）
  - 第四段：【事件系统】时间线事件清单、阈值事件、随机事件、终局事件概要（400-600 字）
  - 第五段：【语言风格】基调、氛围、母题（100-200 字）
- **AND** 在 basic/medium 档简化为"AI 叙事指令 + 状态跟踪"两段

#### Scenario: 不破坏 buildPrompt 占位符替换

- **WHEN** CustomScriptGenerator.buildPrompt 调用新 Prompt
- **THEN** `{{maxLoreEntries}}`、`{{maxEvents}}`、`{{maxItems}}` 占位符仍能正确替换
- **AND** 新增字段不引入无法替换的占位符

### Requirement: P0-3 normalizeGeneratedScript 扩展

[index.html](file:///d:/BC/qmzz/index.html) L23333-L23458 的 normalizeGeneratedScript SHALL 在返回对象中新增 `stateVars`、`worldContext`、`timelineEvents`、`thresholdEvents`、`randomEvents`、`endingEvents` 字段映射。

#### Scenario: 新增字段映射

- **WHEN** normalizeGeneratedScript 处理 AI 返回的 scriptData
- **THEN** 返回对象（L23426-L23457）新增以下字段：
  - `stateVars: (scriptData.stateVars || []).map(normalizeStateVar)`——对每个 stateVar 规整字段：key（字符串）、label（字符串）、initialValue（数字）、min（数字，默认0）、max（数字，默认100）
  - `worldContext: Array.isArray(scriptData.worldContext) ? scriptData.worldContext.slice(0, 20) : []`
  - `timelineEvents: (scriptData.timelineEvents || []).slice(0, 15).map(normalizeTimelineEvent)`
  - `thresholdEvents: (scriptData.thresholdEvents || []).slice(0, 10).map(normalizeThresholdEvent)`
  - `randomEvents: (scriptData.randomEvents || []).slice(0, 8).map(normalizeRandomEvent)`
  - `endingEvents: (scriptData.endingEvents || []).slice(0, 5).map(normalizeEndingEvent)`
- **AND** 保留原有 `worldSettings.events` 扁平数组（向后兼容既有编辑器 UI）
- **AND** 保留原有所有字段（metadata/worldSettings/characters/scriptConfig/items/quickReplies/emotionMappings/npcRelationships/bgmMap/achievements）

#### Scenario: normalizeTimelineEvent 结构规整

- **WHEN** normalizeTimelineEvent 处理单个 timelineEvent
- **THEN** 返回对象包含：
  - `trigger`：保留原始对象（如 `{daysRemaining: 28}`），若无则 `{}`
  - `eventName`：字符串，默认 `''`
  - `description`：字符串，默认 `''`
  - `choices`：数组，每个元素规整为 `{text: 字符串, impact: 字符串}`，默认 `[]`

#### Scenario: normalizeThresholdEvent 结构规整

- **WHEN** normalizeThresholdEvent 处理单个 thresholdEvent
- **THEN** 返回对象包含：
  - `trigger`：保留原始对象（如 `{stateVar: 'foodDays', operator: '<', value: 7}`），若无则 `{}`
  - `eventName`、`description`、`choices`——同 timelineEvent

#### Scenario: normalizeStateVar 结构规整

- **WHEN** normalizeStateVar 处理单个 stateVar
- **THEN** 返回对象包含：
  - `key`：字符串，默认 `''`
  - `label`：字符串，默认 `''`
  - `initialValue`：数字，默认 `0`
  - `min`：数字，默认 `0`
  - `max`：数字，默认 `100`

#### Scenario: 向后兼容

- **WHEN** AI 返回的 scriptData 不含新字段（旧版生成或手工导入）
- **THEN** 返回对象的新字段使用空数组默认值
- **AND** 不抛出异常
- **AND** 既有字段（events 扁平数组等）仍正常映射

### Requirement: P0-4 validateScriptData 扩展

[index.html](file:///d:/BC/qmzz/index.html) L22615-L22644 的 validateScriptData SHALL 增加对新字段的校验，区分硬错误（阻断）与软警告（不阻断）。

#### Scenario: 硬错误校验（阻断）

- **WHEN** validateScriptData 校验数据
- **THEN** 在既有 5 项校验之外，新增以下硬错误校验：
  - 若 `data.stateVars` 存在且非数组，返回 `{valid: false, error: 'stateVars 必须是数组'}`
  - 若 `data.stateVars` 是数组，每个元素必须有 `key` 字段（字符串），否则返回 `{valid: false, error: 'stateVars #' + i + ' 缺少 key 字段'}`
  - 若 `data.timelineEvents` 存在且非数组，返回 `{valid: false, error: 'timelineEvents 必须是数组'}`
  - 若 `data.timelineEvents` 是数组，每个元素必须有 `eventName` 字段，否则返回 `{valid: false, error: 'timelineEvents #' + i + ' 缺少 eventName 字段'}`

#### Scenario: 软警告校验（不阻断）

- **WHEN** validateScriptData 校验数据且数据通过硬错误校验
- **THEN** 在返回对象中加入 `warnings` 数组（可为空）：
  - 若 `data.characters.player.description` 字数 < 200，warnings.push('playerDesc 字数过少（' + len + '字），建议至少 200 字以承载 AI 叙事指令')
  - 若 `data.stateVars` 不存在或长度为 0，warnings.push('缺少 stateVars，剧本将无状态系统')
  - 若 `data.timelineEvents` 不存在或长度为 0，warnings.push('缺少 timelineEvents，剧本将无时间线事件')
  - 若 `data.worldContext` 不存在或长度为 0，warnings.push('缺少 worldContext，AI 叙事将缺少世界关键词锚点')
- **AND** 返回对象结构变为 `{valid: true, warnings: [...]}` 或 `{valid: false, error: '...'}`

#### Scenario: 调用方兼容

- **WHEN** 既有调用方检查 `result.valid`
- **THEN** 行为不变（warnings 不影响 valid 判定）
- **AND** 调用方可选读取 `result.warnings` 用于 UI 提示

### Requirement: P0-5 schema 扩展

[data/script-data-schema-v2.js](file:///d:/BC/qmzz/data/script-data-schema-v2.js) SHALL 扩展 schema，声明官方剧本核心字段。

#### Scenario: schema 新增字段

- **WHEN** 开发者查看 SCRIPT_DATA_SCHEMA_V2
- **THEN** schema 对象新增以下字段：
  - 顶层 `stateVars: []`（数组，每个元素结构：`{key: '', label: '', initialValue: 0, min: 0, max: 100}`）
  - `worldSettings.worldContext: []`（字符串数组，世界关键词）
  - `worldSettings.events` 保留（向后兼容扁平数组）
  - 顶层 `timelineEvents: []`、`thresholdEvents: []`、`randomEvents: []`、`endingEvents: []`（数组，每个元素结构按 P0-3 规整规则）
- **AND** 在 `characters.player.description` 字段旁添加注释说明四段式结构（AI叙事指令/状态跟踪/事件系统/语言风格）

#### Scenario: schema 作为契约参考

- **WHEN** 后续 spec 或代码引用 schema
- **THEN** schema 完整反映 P0-2/P0-3/P0-4 引入的字段
- **AND** 不删除既有字段（保持 2.0 版本兼容）

## MODIFIED Requirements

### Requirement: normalizeGeneratedScript 返回结构

[index.html](file:///d:/BC/qmzz/index.html) L23426-L23458 的返回对象在保留既有字段的基础上，新增 `stateVars`、`worldContext`、`timelineEvents`、`thresholdEvents`、`randomEvents`、`endingEvents` 六个字段。既有字段（metadata/worldSettings/characters/scriptConfig/items/quickReplies/emotionMappings/npcRelationships/bgmMap/achievements）的行为不变。

### Requirement: validateScriptData 返回结构

[index.html](file:///d:/BC/qmzz/index.html) L22615-L22644 的返回对象在通过校验时新增 `warnings` 数组字段。失败时仍返回 `{valid: false, error: '...'}`。既有调用方仅检查 `result.valid` 的行为不受影响。

## REMOVED Requirements

无（本 Spec 不移除既有需求，所有改动保持向后兼容）

## 实施顺序与依赖

按以下顺序实施（用户要求"不求速度求质量"，每步完成后验证再进入下一步）：

1. **P0-5 schema 扩展**（独立，无依赖）——为后续步骤提供字段契约参考
2. **P0-1 消除双 Prompt 冲突**（独立，无依赖）——删除内联赋值，让 data 版本生效
3. **P0-2 Prompt 模板重写**（依赖 P0-1 完成 + P0-5 字段定义）——重写 data/custom-script-prompts.js 三档
4. **P0-3 normalizeGeneratedScript 扩展**（依赖 P0-2 输出新字段 + P0-5 字段定义）——扩展 return 对象
5. **P0-4 validateScriptData 扩展**（依赖 P0-3 + P0-5）——增加校验项

P0-5 与 P0-1 可并行。P0-2/P0-3/P0-4 必须串行。

## 验证策略

- **静态验证**：每步完成后用 Grep/Read 确认改动行号与内容
- **不进行 AI 生成实测**（避免消耗 API 配额，且字段层改动可通过静态审计验证）
- **回归验证**：确认既有 1.0 版本剧本导入导出不破坏（向后兼容）
- **链路验证**：确认 normalize → validate → loadImportedScript 链路中新字段能流转到编辑器（即使 UI 不展示）
