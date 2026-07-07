# 调研：剧本编辑器智能生成与官方剧本水平差距分析 Spec

## Why

用户反馈剧本编辑器的「智能生成」产出的剧本"根本达不到简单靠智能生成就达到官方剧本水平的地步，问题很大"。需要系统性调研当前 AI 生成管道与官方剧本（[data/game-chapters.js](file:///d:/BC/qmzz/data/game-chapters.js)、[data/characters.js](file:///d:/BC/qmzz/data/characters.js)、[data/game-world-info.js](file:///d:/BC/qmzz/data/game-world-info.js)）之间的具体差距，定位根因，并按优先级给出可落地的改进方向，为后续 Spec 提供依据。

本次为**调研型 Spec**，不直接写实现代码，输出物为结构化调研报告（report.md）+ 量化差距表 + 优先级改进清单。

## What Changes

- 对当前 AI 生成管道做端到端审计：Prompt 模板 → API 调用 → JSON 提取 → normalize → validate → loadImportedScript
- 对官方剧本做字段深度剖析：[game-chapters.js](file:///d:/BC/qmzz/data/game-chapters.js) 三章、12-15 NPC、20+ 世界设定词条
- 量化两者在 11+ 个关键维度上的差距，输出对比表
- 定位 3 类根因：Prompt 设计缺陷、normalize 阶段数据丢失、validate 校验过松
- 输出 P0/P1/P2 三级改进清单，明确每项的改动范围、预估成本、依赖关系
- 报告需结合项目现状，指出最值得优先修复的 3-5 个高 ROI 改进项

## Impact

- Affected specs: 后续剧本系统相关 spec（如 `fix-custom-script-ai-generation`、`upgrade-script-system-v2`、`overhaul-script-system-omnimundia`、`audit-custom-script-ai-generation`）的迭代方向
- Affected code:
  - [index.html](file:///d:/BC/qmzz/index.html) 内联 `window.CUSTOM_SCRIPT_PROMPTS`（L23634-L23655）
  - [data/custom-script-prompts.js](file:///d:/BC/qmzz/data/custom-script-prompts.js)（被覆盖、未生效）
  - [index.html](file:///d:/BC/qmzz/index.html) `normalizeGeneratedScript`（L23333-L23458）
  - [index.html](file:///d:/BC/qmzz/index.html) `validateScriptData`（L22615-L22644）
  - [index.html](file:///d:/BC/qmzz/index.html) `loadImportedScript`（L22758 起）
  - [index.html](file:///d:/BC/qmzz/index.html) `SimpleChatEngine._buildSystemPrompt`（L11662 起，消费 chapter.playerDesc 等字段）
  - [data/script-data-schema-v2.js](file:///d:/BC/qmzz/data/script-data-schema-v2.js)（schema 未涵盖官方剧本核心字段）

## 调研范围与方法

### 调研对象
1. **官方剧本基线**：[game-chapters.js](file:///d:/BC/qmzz/data/game-chapters.js) 的三章（废墟之弈/钢铁之弈/黎明之弈）、[characters.js](file:///d:/BC/qmzz/data/characters.js) 中 12 个末世 NPC + 15 个修仙 NPC、[game-world-info.js](file:///d:/BC/qmzz/data/game-world-info.js) 的 20+ 条世界设定
2. **AI 生成管道**：[index.html](file:///d:/BC/qmzz/index.html) L23658-L23933 的 `CustomScriptGenerator` 对象、L23333-L23458 的 `normalizeGeneratedScript`、L22615-L22644 的 `validateScriptData`
3. **Prompt 模板**：[data/custom-script-prompts.js](file:///d:/BC/qmzz/data/custom-script-prompts.js) 与 [index.html](file:///d:/BC/qmzz/index.html) L23634-L23655 内联 `CUSTOM_SCRIPT_PROMPTS`（两份冲突）

### 调研方法
- **静态代码审计**：逐行审计 Prompt 模板字段要求、normalize 字段映射、validate 校验规则
- **数据结构对比**：将官方剧本字段集与 AI 生成可产出字段集做矩阵对比
- **运行链路追踪**：从用户输入 → Prompt → API → JSON → normalize → validate → loadImportedScript → SimpleChatEngine 消费，定位每一步的数据丢失
- **不进行**实际 AI 生成测试（避免消耗 API 配额，且问题已通过静态审计清晰暴露）

## ADDED Requirements

### Requirement: 端到端管道审计

系统 SHALL 完成对当前 AI 剧本生成管道的端到端审计，定位数据丢失与字段缺失的具体位置。

#### Scenario: 审计覆盖完整链路

- **WHEN** 调研人员审计生成管道
- **THEN** 审计覆盖以下环节：Prompt 模板字段要求 → API 请求构造 → JSON 提取 → normalizeGeneratedScript 字段映射 → validateScriptData 校验规则 → loadImportedScript 写入编辑器 → SimpleChatEngine._buildSystemPrompt 消费
- **AND** 每个环节标注：输入字段集、输出字段集、丢失字段、丢失原因

#### Scenario: 双 Prompt 文件冲突定位

- **WHEN** 调研人员检查 Prompt 模板来源
- **THEN** 明确指出 [data/custom-script-prompts.js](file:///d:/BC/qmzz/data/custom-script-prompts.js) 与 [index.html](file:///d:/BC/qmzz/index.html) L23634 内联 `window.CUSTOM_SCRIPT_PROMPTS` 的覆盖关系
- **AND** 标注哪个版本实际生效（依据 `<script src="data/custom-script-prompts.js">` 在 L9444 加载、内联定义在 L23634 后执行，因此**内联版本覆盖 data 版本**）
- **AND** 对比两份 Prompt 的字段要求差异（data 版要求 emotionMappings/bgmMap/playerName/playerTitle/playerDesc，内联版不要这些字段）

### Requirement: 官方剧本字段深度剖析

系统 SHALL 对官方剧本做字段深度剖析，提取"剧本主控文档"模式。

#### Scenario: 字段深度量化

- **WHEN** 调研人员剖析官方剧本
- **THEN** 量化以下字段的内容深度：playerDesc 字数、stateVars 数量、timelineEvents 数量、thresholdEvents 数量、randomEvents 数量、endingEvents 数量、loreEntries 数量与单条字数、npcs 数量与单条 description 字数、openingScene 字数、worldContext 关键词数
- **AND** 识别官方 playerDesc 实际承载的"AI 叙事指令 + 状态跟踪 + 事件系统 + 语言风格"四段式结构

#### Scenario: 提取剧本主控文档模式

- **WHEN** 分析官方 playerDesc 内容结构
- **THEN** 识别出官方 playerDesc 是"剧本主控文档"而非"玩家角色描述"，包含：
  - 【AI叙事指令】路线核心目标、动态分支策略、NPC 称呼规则、信息呈现方式
  - 【AI需跟踪状态】10 个状态变量及其含义
  - 【事件系统】时间线事件清单（按倒计时触发）、阈值事件（变量越界触发）、随机事件、终局事件（多结局）
  - 【语言风格】基调、氛围、母题
- **AND** 明确当前 AI 生成的 playerDesc 仅有"角色描述"职能，缺失其余三段

### Requirement: 量化差距对比表

系统 SHALL 输出官方剧本与 AI 生成在 11+ 个维度上的量化差距对比表。

#### Scenario: 对比表维度

- **WHEN** 输出差距对比表
- **THEN** 至少覆盖以下维度：playerDesc 字数与结构、stateVars、timelineEvents、thresholdEvents、randomEvents、endingEvents、loreEntries（数量+单条字数）、npcs（数量+description 字数）、openingScene 字数、worldContext 关键词、NPC 关系网复杂度、事件 choices 结构、状态变量 impact 字符串
- **AND** 每个维度标注：官方典型值、AI 生成实际值、差距等级（缺失/严重/中等/轻微）、根因分类（Prompt 未要求/normalize 丢弃/validate 不校验/schema 未定义）

### Requirement: 根因分类

系统 SHALL 将所有差距归类到三类根因，并量化每类根因的影响范围。

#### Scenario: 三类根因

- **WHEN** 归类根因
- **THEN** 至少包含三类：
  - **根因 A：Prompt 设计缺陷**——Prompt 未要求官方剧本的核心字段（如 stateVars、timelineEvents、endingEvents），或字段要求过浅（如 playerDesc 仅要求 50-300 字而非 1500-2000 字的主控文档）
  - **根因 B：normalize 阶段数据丢失**——即使 AI 返回了某些官方字段，`normalizeGeneratedScript` 也没有处理（如 stateVars、timelineEvents、thresholdEvents、randomEvents、endingEvents 在 L23333-L23458 完全未被映射）
  - **根因 C：validate 校验过松**——`validateScriptData` 仅校验 title/npcs/openingScene 三个字段，不校验 playerDesc 长度、events 结构、stateVars 等，让"垃圾剧本"也能通过

#### Scenario: 影响范围量化

- **WHEN** 量化根因影响
- **THEN** 每类根因标注：受影响的字段数、受影响的剧本能力（如"无状态系统"导致末世剧本失去核心张力）、修复成本量级（低/中/高）

### Requirement: 优先级改进清单

系统 SHALL 输出 P0/P1/P2 三级改进清单，每项明确改动范围与成本。

#### Scenario: P0 必须修复

- **WHEN** 列出 P0 项
- **THEN** 至少包含：
  - 修复双 Prompt 文件冲突（统一为一份，删除其中一份）
  - 重写 Prompt 模板，对齐官方剧本字段要求（playerDesc 主控文档化、引入 stateVars/timelineEvents/endingEvents 字段要求）
  - 扩展 `normalizeGeneratedScript`，映射 stateVars、timelineEvents、thresholdEvents、randomEvents、endingEvents
  - 扩展 `validateScriptData`，校验关键字段（playerDesc 字数下限、events 结构、stateVars 数组）
  - 扩展 [data/script-data-schema-v2.js](file:///d:/BC/qmzz/data/script-data-schema-v2.js)，纳入官方剧本核心字段

#### Scenario: P1 重要增强

- **WHEN** 列出 P1 项
- **THEN** 至少包含：
  - 引入"剧情骨架"概念，将 playerDesc 拆分为 playerProfile + scriptDirective（AI 叙事指令）+ stateVars + events 四段
  - NPC 描述深度模板（外貌/衣着/性格/动机/暗线五要素）
  - 事件系统结构对齐官方（trigger + eventName + description + choices[{text, impact}]）
  - 多结局系统（endingEvents 按累计状态变量触发）

#### Scenario: P2 体验优化

- **WHEN** 列出 P2 项
- **THEN** 至少包含：章节概念（多章节生成）、NPC 关系网复杂化、语言风格指导、倒计时系统、世界设定词条深度提升

#### Scenario: 改进项成本与依赖

- **WHEN** 列出每项改进
- **THEN** 标注：改动文件、改动行数量级、依赖关系（如"扩展 normalize"依赖"扩展 schema"）、预估实现成本（人时）、ROI 等级

### Requirement: 结合项目现状给出建议

系统 SHALL 将调研结果映射到当前项目的剧本系统改进上。

#### Scenario: 高 ROI 改进项识别

- **WHEN** 报告列出改进建议
- **THEN** 明确给出 3-5 个 ROI 最高的改进项，每项说明：当前问题、官方做法、改造优先级、预估实现成本、预期效果（如"修复后 AI 生成剧本可承载状态系统，末世剧本恢复核心张力"）
- **AND** 标注哪些改进可以并行、哪些必须串行

#### Scenario: 与现有 spec 的关系

- **WHEN** 给出改进方向
- **THEN** 明确本次调研结论与以下现有 spec 的关系：`fix-custom-script-ai-generation`（已部分修复 Prompt/JSON/进度，但未解决字段缺失）、`upgrade-script-system-v2`（架构层面未落地）、`overhaul-script-system-omnimundia`（功能对标未落地）、`audit-custom-script-ai-generation`（早期审计）
- **AND** 指出本次调研发现的"双 Prompt 冲突"与"normalize 数据丢失"是上述 spec 均未覆盖的新发现

## MODIFIED Requirements

无（本次为调研型 Spec，不修改既有需求）

## REMOVED Requirements

无

## 调研产出物清单

调研完成后将输出以下文件（在调研执行阶段创建，不在本 Spec 阶段创建）：

1. `report.md`——结构化调研报告，包含：执行摘要、管道审计、字段对比表、根因分析、优先级改进清单、高 ROI 改进项、与现有 spec 关系
2. `field-gap-matrix.md`——量化字段差距矩阵（Markdown 表格）
3. `prompt-diff.md`——双 Prompt 文件差异对比
4. `assets/`——关键代码片段截图或文本摘录（如 normalizeGeneratedScript 数据丢失点、validateScriptData 校验规则）
