# Checklist

调研型 Spec 验收清单。每项需在 `report.md` 或对应产出文件中找到实证支撑。

## 管道审计验收

- [x] 报告包含"管道审计"章节，覆盖 7 个环节（Prompt 模板/API 请求/JSON 提取/normalize/validate/loadImportedScript/SimpleChatEngine 消费）
- [x] 每个环节标注输入字段集、输出字段集、丢失字段、丢失原因
- [x] 明确指出 normalizeGeneratedScript（L23333-L23458）丢弃了 stateVars、timelineEvents、thresholdEvents、randomEvents、endingEvents
- [x] 明确指出 validateScriptData（L22615-L22644）仅校验 title/npcs/openingScene 三项

## 双 Prompt 冲突验收

- [x] 报告包含"双 Prompt 文件冲突"章节
- [x] 明确指出 data/custom-script-prompts.js 在 index.html L9444 加载
- [x] 明确指出 index.html L23634 内联 `window.CUSTOM_SCRIPT_PROMPTS` 后执行覆盖 data 版本
- [x] 对比两份 Prompt 的字段要求差异（emotionMappings/bgmMap/playerName/playerTitle/playerDesc 等字段在两份中的有无）
- [x] 明确结论：实际生效的是内联版本
- [x] 给出修复建议（统一为一份，推荐保留 data 版作为单一来源）

## 官方剧本字段深度验收

- [x] 报告包含"官方剧本字段深度剖析"章节
- [x] 量化 playerDesc 字数（1500-2000 字范围）
- [x] 提取 playerDesc 四段式结构（AI叙事指令/状态跟踪/事件系统/语言风格）
- [x] 量化 stateVars 数量（约 10 个）与字段结构（key/label/initialValue/min/max）
- [x] 量化 timelineEvents 数量（约 12 个）与结构（trigger/eventName/description/choices[{text, impact}]）
- [x] 量化 thresholdEvents/randomEvents/endingEvents 数量
- [x] 量化 loreEntries 数量（20+）与单条字数（200-500 字）
- [x] 量化 npcs 数量（12-15）与单条 description 字数
- [x] 量化 openingScene 字数（200-500 字）
- [x] 量化 worldContext 关键词数（8-15 个）
- [x] 识别"剧本主控文档"模式（playerDesc 承载 AI 叙事指令而非角色描述）

## 量化差距对比表验收

- [x] 存在独立的 `field-gap-matrix.md` 文件
- [x] 表头包含：维度 / 官方典型值 / AI 生成实际值 / 差距等级 / 根因分类 / 修复方向
- [x] 至少覆盖 11 个维度（playerDesc/stateVars/timelineEvents/thresholdEvents/randomEvents/endingEvents/loreEntries/npcs/openingScene/worldContext/NPC关系网/事件choices结构/状态变量impact）
- [x] 每个维度的差距等级分类正确（缺失/严重/中等/轻微）
- [x] 每个维度的根因分类正确（Prompt 未要求/normalize 丢弃/validate 不校验/schema 未定义）

## 根因分类验收

- [x] 报告包含"根因分析"章节
- [x] 三类根因（Prompt 设计缺陷/normalize 数据丢失/validate 校验过松）分别有独立小节
- [x] 每类根因标注受影响字段数、受影响剧本能力、修复成本量级
- [x] 识别根因间的依赖关系

## 优先级改进清单验收

- [x] 报告包含"优先级改进清单"章节
- [x] P0 项至少 5 条（双 Prompt 冲突修复/Prompt 模板重写/normalize 扩展/validate 扩展/schema 扩展）
- [x] P1 项至少 4 条（剧情骨架拆分/NPC 描述深度模板/事件系统对齐/多结局系统）
- [x] P2 项至少 5 条（章节概念/NPC 关系网/语言风格/倒计时/世界设定深度）
- [x] 每项标注改动文件、改动行数量级、依赖关系、预估人时成本、ROI 等级

## 高 ROI 改进项验收

- [x] 报告包含"高 ROI 改进项"章节
- [x] 选出 3-5 个最高 ROI 项
- [x] 每项说明当前问题、官方做法、改造优先级、预估成本、预期效果
- [x] 标注改进项间的并行/串行关系

## 与现有 spec 关系验收

- [x] 报告包含"与现有 spec 关系"章节
- [x] 对比 `fix-custom-script-ai-generation` 并指出其未解决字段缺失
- [x] 对比 `upgrade-script-system-v2` 并指出本次调研可作为字段层补充
- [x] 对比 `overhaul-script-system-omnimundia` 并指出功能对标未落地
- [x] 对比 `audit-custom-script-ai-generation` 并指出未发现双 Prompt 冲突与 normalize 数据丢失
- [x] 明确本次调研的新发现（双 Prompt 冲突 + normalize 数据丢失 + 主控文档模式缺失）

## 产出文件完整性验收

- [x] `report.md` 存在且章节完整（执行摘要/管道审计/双Prompt冲突/官方剖析/差距对比/根因分析/改进清单/高ROI项/与现有spec关系）
- [x] `field-gap-matrix.md` 存在且表格完整
- [x] `prompt-diff.md` 存在且包含两份 Prompt 的差异对比
- [x] `assets/` 目录存在，包含至少 4 个关键代码片段摘录：
  - [x] normalizeGeneratedScript 数据丢失点摘录
  - [x] validateScriptData 校验规则摘录
  - [x] 官方 playerDesc 主控文档示例摘录
  - [x] 官方 timelineEvents 结构示例摘录

## 调研质量验收

- [x] 所有结论均有代码行号或文件路径支撑（可点击链接）
- [x] 不包含实际 AI 生成测试（按 Spec 要求仅做静态审计）
- [x] 报告语言为中文
- [x] 报告不含空章节或"TODO"占位
- [x] 改进建议可落地（每项明确改动文件与行号范围）
