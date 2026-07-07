# Tasks

调研型 Spec，任务以"产出调研材料"为目标，不写实现代码。

- [x] Task 1: 端到端管道审计——完成 AI 生成管道 7 个环节的逐环节字段集追踪
  - [x] SubTask 1.1: 审计 Prompt 模板字段要求（basic/medium/advanced 三档分别要求哪些字段、字段字数上限）
  - [x] SubTask 1.2: 审计 API 请求构造（请求体是否传 response_format、max_tokens、temperature）
  - [x] SubTask 1.3: 审计 JSON 提取（extractJSON 是否会丢失字段，仅做语法层处理还是字段层）
  - [x] SubTask 1.4: 审计 normalizeGeneratedScript 字段映射（L23333-L23458，逐字段标注：保留/转换/丢弃）
  - [x] SubTask 1.5: 审计 validateScriptData 校验规则（L22615-L22644，列出所有校验项与缺失校验项）
  - [x] SubTask 1.6: 审计 loadImportedScript 写入编辑器（L22758 起，哪些字段能写入、哪些写入但 UI 不消费）
  - [x] SubTask 1.7: 审计 SimpleChatEngine._buildSystemPrompt 消费（L11662 起，实际用哪些字段构建 system prompt）

- [x] Task 2: 双 Prompt 文件冲突定位——明确 data/custom-script-prompts.js 与 index.html L23634 内联版本的覆盖关系
  - [x] SubTask 2.1: 确认 `<script src="data/custom-script-prompts.js">` 在 index.html 中的加载顺序（L9444）
  - [x] SubTask 2.2: 确认内联 `window.CUSTOM_SCRIPT_PROMPTS` 的执行时机（L23634，IIFE 内）
  - [x] SubTask 2.3: 对比两份 Prompt 的字段要求差异（data 版要求 emotionMappings/bgmMap/playerName/playerTitle/playerDesc；内联版不要求这些）
  - [x] SubTask 2.4: 标注实际生效版本（内联版覆盖 data 版）
  - [x] SubTask 2.5: 评估移除其中一份的影响（推荐保留 data 版作为单一来源，删除内联版）

- [x] Task 3: 官方剧本字段深度剖析——量化 [game-chapters.js](file:///d:/BC/qmzz/data/game-chapters.js) 第三章（或第一章）所有字段的内容深度
  - [x] SubTask 3.1: 量化 playerDesc 字数（约 1500-2000 字）并提取四段式结构（AI叙事指令/状态跟踪/事件系统/语言风格）
  - [x] SubTask 3.2: 量化 stateVars 数量与字段结构（key/label/initialValue/min/max），约 10 个
  - [x] SubTask 3.3: 量化 events.timelineEvents 数量与结构（trigger/eventName/description/choices[{text, impact}]），约 12 个
  - [x] SubTask 3.4: 量化 events.thresholdEvents、events.randomEvents、events.endingEvents 数量与结构
  - [x] SubTask 3.5: 量化 loreEntries 数量与单条字数（[game-world-info.js](file:///d:/BC/qmzz/data/game-world-info.js) 20+ 条，每条 200-500 字）
  - [x] SubTask 3.6: 量化 npcs 数量与单条 description 字数（[characters.js](file:///d:/BC/qmzz/data/characters.js) 12-15 个，每个 description 80-150 字 + personality 50-100 字 + firstMessage 80-200 字）
  - [x] SubTask 3.7: 量化 openingScene 字数（约 200-500 字文学化叙事）
  - [x] SubTask 3.8: 量化 worldContext 关键词数（约 8-15 个）
  - [x] SubTask 3.9: 识别"剧本主控文档"模式——playerDesc 实际承载 AI 叙事指令而非角色描述

- [x] Task 4: 量化差距对比表——输出 11+ 维度的官方 vs AI 生成差距矩阵
  - [x] SubTask 4.1: 列出所有对比维度（playerDesc/stateVars/timelineEvents/thresholdEvents/randomEvents/endingEvents/loreEntries/npcs/openingScene/worldContext/NPC关系网/事件choices结构/状态变量impact）
  - [x] SubTask 4.2: 每个维度标注官方典型值（来自 Task 3）
  - [x] SubTask 4.3: 每个维度标注 AI 生成实际值（来自 Task 1 的 Prompt 模板字段要求 + normalize 实际保留字段）
  - [x] SubTask 4.4: 每个维度标注差距等级（缺失/严重/中等/轻微）
  - [x] SubTask 4.5: 每个维度标注根因分类（Prompt 未要求/normalize 丢弃/validate 不校验/schema 未定义）

- [x] Task 5: 根因分类与影响范围量化
  - [x] SubTask 5.1: 根因 A（Prompt 设计缺陷）——列出受影响字段、受影响剧本能力、修复成本量级
  - [x] SubTask 5.2: 根因 B（normalize 数据丢失）——列出被 normalize 丢弃的官方字段、受影响剧本能力、修复成本量级
  - [x] SubTask 5.3: 根因 C（validate 校验过松）——列出缺失的校验项、受影响剧本能力、修复成本量级
  - [x] SubTask 5.4: 识别根因间的依赖关系（如"修复根因 A 需先修复根因 B 以避免数据丢失"）

- [x] Task 6: 优先级改进清单——输出 P0/P1/P2 三级清单
  - [x] SubTask 6.1: P0 必须修复项（双 Prompt 冲突、Prompt 模板重写、normalize 扩展、validate 扩展、schema 扩展）
  - [x] SubTask 6.2: P1 重要增强项（剧情骨架拆分、NPC 描述深度模板、事件系统结构对齐、多结局系统）
  - [x] SubTask 6.3: P2 体验优化项（章节概念、NPC 关系网、语言风格、倒计时、世界设定深度）
  - [x] SubTask 6.4: 每项标注：改动文件、改动行数量级、依赖关系、预估人时成本、ROI 等级

- [x] Task 7: 高 ROI 改进项识别——选出 3-5 个 ROI 最高的改进项
  - [x] SubTask 7.1: 评估每项 P0/P1 改进的 ROI（效果/成本比）
  - [x] SubTask 7.2: 选出 3-5 个最高 ROI 项，每项说明：当前问题、官方做法、改造优先级、预估成本、预期效果
  - [x] SubTask 7.3: 标注改进项间的并行/串行关系

- [x] Task 8: 与现有 spec 关系分析
  - [x] SubTask 8.1: 对比 `fix-custom-script-ai-generation`——已修复 Prompt/JSON/进度，但未解决字段缺失
  - [x] SubTask 8.2: 对比 `upgrade-script-system-v2`——架构层面未落地，本次调研可作为该 spec 的字段层补充
  - [x] SubTask 8.3: 对比 `overhaul-script-system-omnimundia`——功能对标未落地
  - [x] SubTask 8.4: 对比 `audit-custom-script-ai-generation`——早期审计，未发现双 Prompt 冲突与 normalize 数据丢失
  - [x] SubTask 8.5: 明确本次调研的新发现（双 Prompt 冲突 + normalize 数据丢失 + 主控文档模式缺失）

- [x] Task 9: 撰写 `report.md`——结构化调研报告
  - [x] SubTask 9.1: 执行摘要（1 段，说清问题与核心结论）
  - [x] SubTask 9.2: 管道审计章节（来自 Task 1）
  - [x] SubTask 9.3: 双 Prompt 冲突章节（来自 Task 2）
  - [x] SubTask 9.4: 官方剧本字段深度剖析章节（来自 Task 3）
  - [x] SubTask 9.5: 量化差距对比表章节（来自 Task 4，引用 field-gap-matrix.md）
  - [x] SubTask 9.6: 根因分析章节（来自 Task 5）
  - [x] SubTask 9.7: 优先级改进清单章节（来自 Task 6）
  - [x] SubTask 9.8: 高 ROI 改进项章节（来自 Task 7）
  - [x] SubTask 9.9: 与现有 spec 关系章节（来自 Task 8）

- [x] Task 10: 撰写 `field-gap-matrix.md`——量化字段差距矩阵（独立 Markdown 表格文件）
  - [x] SubTask 10.1: 表头：维度 / 官方典型值 / AI 生成实际值 / 差距等级 / 根因分类 / 修复方向
  - [x] SubTask 10.2: 填入 11+ 行维度数据

- [x] Task 11: 撰写 `prompt-diff.md`——双 Prompt 文件差异对比
  - [x] SubTask 11.1: data/custom-script-prompts.js basic/medium/advanced 三档字段要求
  - [x] SubTask 11.2: index.html L23634-L23655 内联版 basic/medium/advanced 三档字段要求
  - [x] SubTask 11.3: 差异点逐项列出（emotionMappings/bgmMap/playerName/playerTitle/playerDesc/npcRelationships 等字段在两份中的有无）
  - [x] SubTask 11.4: 实际生效版本结论

- [x] Task 12: 整理 `assets/`——关键代码片段摘录
  - [x] SubTask 12.1: normalizeGeneratedScript 数据丢失点摘录（L23333-L23458 中未映射 stateVars/timelineEvents 的部分）
  - [x] SubTask 12.2: validateScriptData 校验规则摘录（L22615-L22644 完整代码）
  - [x] SubTask 12.3: 官方 playerDesc 主控文档示例摘录（game-chapters.js 第一章 playerDesc 完整内容）
  - [x] SubTask 12.4: 官方 timelineEvents 结构示例摘录（game-chapters.js 第一章 events.timelineEvents[0]）

# Task Dependencies

- Task 4 依赖 Task 1 + Task 3（需要管道审计与官方剖析数据才能填对比表）
- Task 5 依赖 Task 4（根因分类基于差距对比）
- Task 6 依赖 Task 5（改进清单基于根因）
- Task 7 依赖 Task 6（高 ROI 项从改进清单中选）
- Task 9 依赖 Task 1-8（报告汇总所有调研结果）
- Task 10 依赖 Task 4
- Task 11 依赖 Task 2
- Task 12 依赖 Task 1 + Task 3

并行机会：
- Task 1（管道审计）与 Task 3（官方剖析）可并行
- Task 2（双 Prompt 冲突）与 Task 1、Task 3 可并行
- Task 10、Task 11、Task 12 可在 Task 4/2/1 完成后并行
