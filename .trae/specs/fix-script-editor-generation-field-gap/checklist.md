# Checklist

实施型 Spec 验收清单。每项需通过静态代码审计验证（Read/Grep）。

## P0-5 schema 扩展验收

- [x] [data/script-data-schema-v2.js](file:///d:/BC/qmzz/data/script-data-schema-v2.js) 顶层新增 `stateVars: []` 字段（L38）
- [x] stateVars 元素结构声明为 `{key: '', label: '', initialValue: 0, min: 0, max: 100}`（注释说明）
- [x] worldSettings 中新增 `worldContext: []` 字段（L21，字符串数组）
- [x] 顶层新增 `timelineEvents: []`（L39）、`thresholdEvents: []`（L40）、`randomEvents: []`（L41）、`endingEvents: []`（L42）四个字段
- [x] `characters.player.description` 字段旁有四段式结构注释（L24-L29，AI叙事指令/状态跟踪/事件系统/语言风格）
- [x] 既有字段（version/metadata/worldSettings.background/worldSettings.loreEntries/worldSettings.locations/worldSettings.events/characters/items/scriptConfig）保持不变
- [x] 文件无语法错误（用 Read 验证）

## P0-1 消除双 Prompt 冲突验收

- [x] [index.html](file:///d:/BC/qmzz/index.html) L23632-L23656 内联 `window.CUSTOM_SCRIPT_PROMPTS = {...}` 块已删除
- [x] [index.html](file:///d:/BC/qmzz/index.html) L9444 的 `<script src="data/custom-script-prompts.js">` 加载保留
- [x] [index.html](file:///d:/BC/qmzz/index.html) L23741 的 `PROMPTS: window.CUSTOM_SCRIPT_PROMPTS` 引用保留
- [x] [index.html](file:///d:/BC/qmzz/index.html) L23737 附近的 `var CustomScriptGenerator = {...}` 保留
- [x] 用 Grep 确认 index.html 中不再有 `window.CUSTOM_SCRIPT_PROMPTS =` 赋值（仅 data/custom-script-prompts.js 中的）
- [x] 删除后无残留空行过多或语法错误（L23731 迁移注释保留）

## P0-2 Prompt 模板重写验收

- [x] [data/custom-script-prompts.js](file:///d:/BC/qmzz/data/custom-script-prompts.js) basic 档 systemPrompt 含 `worldContext`（5-8个关键词）字段要求
- [x] basic 档含 `stateVars`（3-5个，含 key/label/initialValue/min/max）字段要求
- [x] basic 档含 `timelineEvents`（≤3个，含 trigger/eventName/description/choices[{text,impact}]）字段要求
- [x] basic 档 playerDesc 字数要求为 150-300 字（含简化 AI 叙事指令与状态跟踪）
- [x] medium 档含 `worldContext`（8-12个）、`stateVars`（5-8个）、`timelineEvents`（5-8个）、`thresholdEvents`（≤3个）、`endingEvents`（2-3个）字段要求
- [x] medium 档 playerDesc 字数要求为 500-1000 字
- [x] advanced 档含 `worldContext`（10-15个）、`stateVars`（8-10个）、`timelineEvents`（10-12个）、`thresholdEvents`（5-8个）、`randomEvents`（3-5个）、`endingEvents`（3-5个）字段要求
- [x] advanced 档 playerDesc 字数要求为 1500-2000 字，含完整四段式（基础描述/AI叙事指令/状态跟踪/事件系统/语言风格）
- [x] 三档 systemPrompt 均明确说明 `choices.impact` 字符串格式（如 `"foodDays-2, morale+5, unity-10"`）
- [x] 三档 systemPrompt 均提供完整 JSON 骨架（含新字段）
- [x] 三档 systemPrompt 仍使用 `{{maxLoreEntries}}`/`{{maxEvents}}`/`{{maxItems}}` 占位符
- [x] 三档 systemPrompt 不引入无法替换的新占位符
- [x] 既有字段（metadata/worldBg/loreEntries/locationEntries/events扁平数组/npcs/items/quickReplies/emotionMappings/npcRelationships/bgmMap/openingScene/novelReference）保留
- [x] 文件无语法错误（用 Read 验证）

## P0-3 normalizeGeneratedScript 扩展验收

- [x] [index.html](file:///d:/BC/qmzz/index.html) normalizeGeneratedScript 函数内新增 `normalizeStateVar` 辅助函数（L23468-L23477）
- [x] normalizeStateVar 规整字段：key（字符串，默认''）、label（字符串，默认''）、initialValue（数字，默认0）、min（数字，默认0）、max（数字，默认100）
- [x] 新增 `normalizeTimelineEvent` 辅助函数（L23487-L23495），规整 trigger（默认{}）/eventName（默认''）/description（默认''）/choices（每个元素 {text, impact}，默认[]）
- [x] 新增 `normalizeThresholdEvent` 辅助函数（L23496-L23498），规整 trigger/eventName/description/choices
- [x] 新增 `normalizeRandomEvent` 辅助函数（L23499-L23507），规整 eventName/description/choices/probability（默认0.5）
- [x] 新增 `normalizeEndingEvent` 辅助函数（L23508-L23517），规整 trigger/eventName/description/choices/condition（默认''）
- [x] return 对象 L23550 新增 `stateVars` 字段，使用 `(scriptData.stateVars || []).map(normalizeStateVar)`
- [x] return 对象 L23551 新增 `worldContext` 字段，使用 `Array.isArray(scriptData.worldContext) ? scriptData.worldContext.slice(0, 20) : []`
- [x] return 对象 L23552 新增 `timelineEvents` 字段，使用 `(scriptData.timelineEvents || []).slice(0, 15).map(normalizeTimelineEvent)`
- [x] return 对象 L23553 新增 `thresholdEvents` 字段，使用 `(scriptData.thresholdEvents || []).slice(0, 10).map(normalizeThresholdEvent)`
- [x] return 对象 L23554 新增 `randomEvents` 字段，使用 `(scriptData.randomEvents || []).slice(0, 8).map(normalizeRandomEvent)`
- [x] return 对象 L23555 新增 `endingEvents` 字段，使用 `(scriptData.endingEvents || []).slice(0, 5).map(normalizeEndingEvent)`
- [x] 保留既有 `worldSettings.events` 扁平数组（L23531）
- [x] 保留既有所有字段（metadata/worldSettings/characters/scriptConfig/items/quickReplies/emotionMappings/npcRelationships/bgmMap/achievements）
- [x] AI 返回不含新字段时返回对象使用空数组默认值，不抛异常（`|| []` 兜底）
- [x] 文件无语法错误（用 Read 验证 L23375-L23557）

## P0-4 validateScriptData 扩展验收

- [x] [index.html](file:///d:/BC/qmzz/index.html) L22643-L22647 新增硬错误校验：`data.stateVars` 存在且非数组时返回 `{valid: false, error: 'stateVars 必须是数组'}`
- [x] 新增硬错误校验：`data.stateVars` 是数组时每个元素必须有 `key` 字段（L22648-L22653）
- [x] 新增硬错误校验：`data.timelineEvents` 存在且非数组时返回错误（L22657-L22660）
- [x] 新增硬错误校验：`data.timelineEvents` 是数组时每个元素必须有 `eventName` 字段（L22661-L22666）
- [x] 新增软警告：`data.characters.player.description` 字数 < 200 时 push 警告（L22672-L22674）
- [x] 新增软警告：`data.stateVars` 不存在或长度为 0 时 push 警告（L22675-L22677）
- [x] 新增软警告：`data.timelineEvents` 不存在或长度为 0 时 push 警告（L22678-L22680）
- [x] 新增软警告：`data.worldContext` 不存在或长度为 0 时 push 警告（L22681-L22683）
- [x] 成功返回结构为 `{valid: true, warnings: warnings}`（L22685，warnings 可为空数组）
- [x] 失败返回结构仍为 `{valid: false, error: '...'}`（L22617/L22621/L22625/L22629/L22635/L22640/L22646/L22651/L22659/L22664）
- [x] 用 Grep 查找所有调用 validateScriptData 的位置（L23036/L23831），确认调用方仅检查 `result.valid`，不受 warnings 影响
- [x] 文件无语法错误（用 Read 验证 L22615-L22686）

## 全链路协同验收

- [x] Prompt 输出新字段（stateVars/worldContext/timelineEvents/thresholdEvents/randomEvents/endingEvents）能被 normalizeGeneratedScript 接收（L23550-L23555）
- [x] normalizeGeneratedScript 返回的新字段能被 validateScriptData 校验（L22643-L22683 硬错误 + 软警告）
- [x] validateScriptData 的 warnings 不阻断 loadImportedScript 流程（L23037/L23832 仅检查 valid）
- [x] loadImportedScript 接收新字段（即使 UI 不展示，数据也能写入 data 对象，不影响后续读取）
- [x] 既有 1.0 版本剧本导入路径（migrateScriptData L22688-L22798）不受影响（新字段 undefined 时 validate 跳过硬错误，仅触发软警告）
- [x] 既有 2.0 版本剧本（无新字段）导入不报错（新字段默认空数组/undefined，软警告非阻断）

## 实施质量验收

- [x] 每个改动有精确行号支撑（用 Read/Grep 验证）
- [x] 无残留调试代码（修改区域无新增 console.log/alert，既有 console.log 均为无关模块预存在）
- [x] 无语法错误（括号匹配、逗号、分号，用 Read 验证）
- [x] 改动遵循既有代码风格（4 空格缩进、单引号字符串、var 声明、function 表达式）
- [x] 不删除或修改与本 Spec 无关的代码
- [x] 向后兼容（既有 1.0/2.0 剧本导入不破坏，新字段缺失时使用默认值）
