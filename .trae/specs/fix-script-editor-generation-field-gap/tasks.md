# Tasks

实施型 Spec，按"不求速度求质量"原则串行执行，每步完成后验证再进入下一步。

- [x] Task 1: P0-5 schema 扩展——扩展 [data/script-data-schema-v2.js](file:///d:/BC/qmzz/data/script-data-schema-v2.js) 声明官方剧本核心字段
  - [x] SubTask 1.1: 在 SCRIPT_DATA_SCHEMA_V2 顶层新增 `stateVars: []` 字段，元素结构 `{key: '', label: '', initialValue: 0, min: 0, max: 100}`
  - [x] SubTask 1.2: 在 `worldSettings` 中新增 `worldContext: []` 字段（字符串数组）
  - [x] SubTask 1.3: 在顶层新增 `timelineEvents: []`、`thresholdEvents: []`、`randomEvents: []`、`endingEvents: []` 四个字段
  - [x] SubTask 1.4: 在 `characters.player.description` 字段旁添加注释，说明四段式结构（AI叙事指令/状态跟踪/事件系统/语言风格）
  - [x] SubTask 1.5: 保留既有字段不变（version/metadata/worldSettings/characters/items/scriptConfig）
  - [x] SubTask 1.6: 用 Read 验证文件内容正确，无语法错误

- [x] Task 2: P0-1 消除双 Prompt 文件冲突——删除 [index.html](file:///d:/BC/qmzz/index.html) L23632-L23656 内联赋值块
  - [x] SubTask 2.1: 用 Read 确认 L23632-L23656 的精确内容（注释行 + window.CUSTOM_SCRIPT_PROMPTS 对象 + 结尾分号）
  - [x] SubTask 2.2: 用 Edit 删除 L23632-L23656 整块（保留 L23631 的空行与 L23657 的空行中的一个）
  - [x] SubTask 2.3: 用 Grep 确认 index.html 中不再有 `window.CUSTOM_SCRIPT_PROMPTS =` 赋值（应只剩 L9444 的 `<script src="data/custom-script-prompts.js">` 加载）
  - [x] SubTask 2.4: 用 Grep 确认 `CustomScriptGenerator.PROMPTS: window.CUSTOM_SCRIPT_PROMPTS` 引用仍存在（L23741）
  - [x] SubTask 2.5: 用 Read 确认 data/custom-script-prompts.js 仍定义了 basic/medium/advanced 三档
  - [x] SubTask 2.6: 静态验证——确认删除后 CustomScriptGenerator.PROMPTS.basic/medium/advanced 仍可访问（来自 data 版本）

- [x] Task 3: P0-2 Prompt 模板重写——重写 [data/custom-script-prompts.js](file:///d:/BC/qmzz/data/custom-script-prompts.js) 三档 systemPrompt
  - [x] SubTask 3.1: 重写 basic 档 systemPrompt，新增字段要求：worldContext（5-8个关键词）、stateVars（3-5个，含 key/label/initialValue/min/max）、timelineEvents（≤3个，含 trigger/eventName/description/choices[{text,impact}]）；playerDesc 字数下限从 50 提升至 150（150-300 字，含简化 AI 叙事指令与状态跟踪）；保留既有字段
  - [x] SubTask 3.2: 重写 medium 档 systemPrompt，新增字段要求：worldContext（8-12个）、stateVars（5-8个）、timelineEvents（5-8个）、thresholdEvents（≤3个）、endingEvents（2-3个）；playerDesc 字数下限从 100 提升至 500（500-1000 字）
  - [x] SubTask 3.3: 重写 advanced 档 systemPrompt，新增字段要求：worldContext（10-15个）、stateVars（8-10个）、timelineEvents（10-12个）、thresholdEvents（5-8个）、randomEvents（3-5个）、endingEvents（3-5个）；playerDesc 字数下限从 150 提升至 1500（1500-2000 字，完整四段式）
  - [x] SubTask 3.4: 在三档 systemPrompt 中明确说明 `choices.impact` 字符串格式并提供官方示例
  - [x] SubTask 3.5: 在三档 systemPrompt 中提供完整 JSON 骨架（含新字段）
  - [x] SubTask 3.6: 确保三档 systemPrompt 仍使用 `{{maxLoreEntries}}`/`{{maxEvents}}`/`{{maxItems}}` 占位符
  - [x] SubTask 3.7: 用 Read 验证文件无语法错误，三档 systemPrompt 字段要求完整
  - [x] SubTask 3.8: 参考 [data/game-chapters.js](file:///d:/BC/qmzz/data/game-chapters.js) 第一章 playerDesc 与 events 结构作为重写依据

- [x] Task 4: P0-3 normalizeGeneratedScript 扩展——在 [index.html](file:///d:/BC/qmzz/index.html) normalizeGeneratedScript 返回对象中新增六个字段映射
  - [x] SubTask 4.1: 新增辅助函数 `normalizeStateVar`，规整字段：key/label/initialValue/min/max
  - [x] SubTask 4.2: 新增辅助函数 `normalizeTimelineEvent`，规整字段：trigger/eventName/description/choices
  - [x] SubTask 4.3: 新增辅助函数 `normalizeThresholdEvent`（复用 normalizeTimelineEvent 逻辑）
  - [x] SubTask 4.4: 新增辅助函数 `normalizeRandomEvent`，规整 eventName/description/choices/probability
  - [x] SubTask 4.5: 新增辅助函数 `normalizeEndingEvent`，规整 trigger/eventName/description/choices/condition
  - [x] SubTask 4.6: 在 return 对象（L23519-L23556）新增六个字段：stateVars/worldContext/timelineEvents/thresholdEvents/randomEvents/endingEvents
  - [x] SubTask 4.7: 保留既有 `worldSettings.events` 扁平数组与其他所有字段不变
  - [x] SubTask 4.8: 用 Read 验证 L23375-L23557 改动正确，无语法错误
  - [x] SubTask 4.9: 静态验证——AI 返回不含新字段时返回对象使用空数组默认值，不抛异常（`(scriptData.x || [])` 兜底）

- [x] Task 5: P0-4 validateScriptData 扩展——在 [index.html](file:///d:/BC/qmzz/index.html) L22615-L22686 增加校验项
  - [x] SubTask 5.1: 新增硬错误校验：`data.stateVars` 存在且非数组时返回 `{valid: false, error: 'stateVars 必须是数组'}`
  - [x] SubTask 5.2: 新增硬错误校验：`data.stateVars` 是数组时每个元素必须有 `key` 字段
  - [x] SubTask 5.3: 新增硬错误校验：`data.timelineEvents` 存在且非数组时返回错误；是数组时每个元素必须有 `eventName` 字段
  - [x] SubTask 5.4: 在所有硬错误校验通过后，构造 `warnings` 数组
  - [x] SubTask 5.5: 新增软警告：`data.characters.player.description` 字数 < 200 时 push 警告
  - [x] SubTask 5.6: 新增软警告：`data.stateVars` 不存在或长度为 0 时 push 警告
  - [x] SubTask 5.7: 新增软警告：`data.timelineEvents` 不存在或长度为 0 时 push 警告
  - [x] SubTask 5.8: 新增软警告：`data.worldContext` 不存在或长度为 0 时 push 警告
  - [x] SubTask 5.9: 修改返回结构：成功时返回 `{valid: true, warnings: warnings}`；失败时仍返回 `{valid: false, error: '...'}`
  - [x] SubTask 5.10: 用 Grep 查找所有调用 validateScriptData 的位置（L23036/L23831），确认调用方仅检查 `result.valid`，不受 warnings 影响
  - [x] SubTask 5.11: 用 Read 验证 L22615-L22686 改动正确，无语法错误

- [x] Task 6: 全链路静态验证——确认 P0-1 至 P0-5 改动协同工作
  - [x] SubTask 6.1: 用 Grep 确认 index.html 中 `window.CUSTOM_SCRIPT_PROMPTS` 只剩 L23741 引用与 L9444 加载，无内联赋值
  - [x] SubTask 6.2: 用 Grep 确认 data/custom-script-prompts.js 三档（L3/L6/L9）均含 stateVars/worldContext/timelineEvents 字段要求
  - [x] SubTask 6.3: 用 Read 确认 normalizeGeneratedScript 返回对象 L23550-L23555 含六个新字段
  - [x] SubTask 6.4: 用 Read 确认 validateScriptData L22643-L22683 含硬错误校验（stateVars/timelineEvents 结构）与 4 项软警告
  - [x] SubTask 6.5: 用 Grep 确认 data/script-data-schema-v2.js L21/L38-L42 含新字段声明
  - [x] SubTask 6.6: 静态验证链路：Prompt 输出新字段 → normalize L23550-L23555 保留 → validate L22643-L22683 校验 → loadImportedScript 接收（调用方 L23036/L23831 仅检查 valid，warnings 不阻断）
  - [x] SubTask 6.7: 回归验证——migrateScriptData（L22688-L22798）1.0→2.0 迁移不输出新字段；validateScriptData 对 undefined 字段跳过硬错误（L22644/L22657 条件守卫），仅触发软警告，不阻断流程

# Task Dependencies

- Task 1（P0-5 schema）与 Task 2（P0-1 删除内联）可并行（无依赖）
- Task 3（P0-2 Prompt 重写）依赖 Task 1 + Task 2（需要 schema 字段定义 + data 版本生效）
- Task 4（P0-3 normalize 扩展）依赖 Task 3（需要 Prompt 输出新字段）
- Task 5（P0-4 validate 扩展）依赖 Task 4 + Task 1（需要 normalize 后字段 + schema 定义）
- Task 6（全链路验证）依赖 Task 1-5 全部完成

实施顺序（串行，"不求速度求质量"）：
1. Task 1（P0-5 schema）
2. Task 2（P0-1 删除内联）
3. Task 3（P0-2 Prompt 重写）
4. Task 4（P0-3 normalize 扩展）
5. Task 5（P0-4 validate 扩展）
6. Task 6（全链路验证）

每完成一个 Task 立即用 Read/Grep 验证，确认无语法错误后再进入下一个 Task。
