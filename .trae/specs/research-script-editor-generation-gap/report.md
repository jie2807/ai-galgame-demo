# 剧本生成系统端到端调研报告

> 调研对象：[d:\BC\qmzz](file:///d:/BC/qmzz/) 项目的"自定义剧本智能生成"功能
> 调研范围：从 Prompt 模板到运行时消费的完整数据流
> 调研方法：静态代码审计（未进行实际 AI 生成测试）
> 调研日期：2026-07-06

---

## 执行摘要

本项目剧本编辑器的"智能生成"功能产出的剧本质量远不及官方剧本（[data/game-chapters.js](file:///d:/BC/qmzz/data/game-chapters.js) 第一章 `废墟之弈`）。经端到端管道审计，确认存在三个独立的根因：（A）双 Prompt 文件冲突导致 [data/custom-script-prompts.js](file:///d:/BC/qmzz/data/custom-script-prompts.js) 被 [index.html](file:///d:/BC/qmzz/index.html) L23634-L23656 内联版覆盖，而内联版缺失 `playerDesc/playerName/playerTitle/emotionMappings/bgmMap` 等字段要求；（B）`normalizeGeneratedScript`（L23333-L23458）完全丢弃 `stateVars/worldContext/events.timelineEvents/thresholdEvents/randomEvents/endingEvents/choices.impact/probability` 等 9 类核心字段；（C）`validateScriptData`（L22615-L22644）仅校验 5 项最低门槛（version/title/npcs/openingScene 存在性），不校验字数与结构深度。更深层的设计错配是：官方剧本使用"剧本主控文档"模式——把剧情骨架（10 个状态变量、12 个时间线事件、8 个阈值事件、8 个随机事件、4 个终局事件、倒计时、多结局）编码进约 1900 字的 `playerDesc` 文本，通过 system prompt 注入给 AI；而 AI 生成管道把 `playerDesc` 当作 50-300 字的"角色描述"，完全缺失主控文档层。差距矩阵覆盖 23 个维度，其中 13 个为"缺失"、3 个为"严重"。修复需按 P0（消除冲突 + 扩展四层：Prompt/normalize/validate/schema）→ P1（剧情骨架对齐）→ P2（体验优化）推进，最高 ROI 项为"playerDesc 主控文档模板"。

---

## 一、管道审计

AI 生成剧本的完整数据流经 7 个环节，每个环节都可能丢失字段。下表标注每个环节的输入字段集、输出字段集、丢失字段与丢失原因。

| # | 环节 | 文件行号 | 输入 | 输出 | 丢失字段 | 丢失原因 |
|---|---|---|---|---|---|---|
| 1 | Prompt 模板字段要求 | [index.html](file:///d:/BC/qmzz/index.html) L23634-L23655（内联版，实际生效） | 用户主题描述 + mode | systemPrompt 文本 | `stateVars/worldContext/timelineEvents/thresholdEvents/randomEvents/endingEvents/playerDesc 四段式/countdownDays/多结局` | 内联 Prompt 模板未要求这些字段 |
| 2 | API 请求构造 | [index.html](file:///d:/BC/qmzz/index.html) L23870-L23900 | systemPrompt + userContent + maxTokens + temperature | OpenAI 兼容 chat/completions 请求体 | （无字段丢失） | 请求体含 model/messages/temperature/max_tokens；`response_format: {type:'json_object'}` 仅对非 agnes 域名启用（L23884），agnes 官方 API 不支持 JSON 模式 |
| 3 | JSON 提取 | [index.html](file:///d:/BC/qmzz/index.html) L23716-L23750 `extractJSON` | AI 返回的原始字符串 | 解析后的 JS 对象 | （无字段丢失，纯语法层处理） | 仅去除 markdown 围栏/注释/尾部文本，按嵌套深度定位最外层 `{}`，不丢字段 |
| 4 | normalize 字段映射 | [index.html](file:///d:/BC/qmzz/index.html) L23333-L23458 `normalizeGeneratedScript` | extractJSON 输出的扁平结构 | Schema 嵌套结构 | `stateVars/worldContext/timelineEvents/thresholdEvents/randomEvents/endingEvents/choices.impact/probability` | 返回对象无这些键；events 数组从四类嵌套降级为扁平 |
| 5 | validate 校验 | [index.html](file:///d:/BC/qmzz/index.html) L22615-L22644 `validateScriptData` | normalize 后的嵌套结构 | `{valid: bool, error: string}` | （不丢字段，但放过空字段） | 仅校验 5 项最低门槛，不校验字数/结构深度/字段间一致性 |
| 6 | loadImportedScript 写入编辑器 | [index.html](file:///d:/BC/qmzz/index.html) L22758-L22910 | normalize 后的嵌套结构 | 编辑器 UI 输入框 | `stateVars/worldContext/timelineEvents/thresholdEvents/randomEvents/endingEvents`（编辑器无对应 UI） | 写入 metadata/worldSettings/characters/scriptConfig/items/quickReplies/npcRelationships/emotionMappings/bgmMap，但无 stateVars/timelineEvents 等卡片 |
| 7 | SimpleChatEngine 消费 | [index.html](file:///d:/BC/qmzz/index.html) L11662-L11760 `_buildSystemPrompt` | chapter 对象（含 playerDesc/worldContext 等） | system prompt 字符串 | `stateVars`（未读取） | 仅拼接 `playerName/playerTitle/playerDesc/worldContext` 到 playerSection；worldContext 仅用于判断是否末世题材（L12061），不注入 prompt |

### 1.1 环节 1：Prompt 模板字段要求

实际生效的是 [index.html](file:///d:/BC/qmzz/index.html) L23634-L23655 内联版（详见第二章）。三档字段要求差异见 [prompt-diff.md](file:///d:/BC/qmzz/.trae/specs/research-script-editor-generation-gap/prompt-diff.md)。

| 档位 | maxTokens | maxLoreEntries | maxEvents | maxItems | temperature | NPC 数 |
|---|---|---|---|---|---|---|
| basic | 2048 | 5 | 3 | 3 | 0.8 | 2-4 |
| medium | 4096 | 10 | 8 | 8 | 0.8 | 3-6 |
| advanced | 8192 | 15 | 12 | 12 | 0.8 | 5-8 |

参数定义见 [index.html](file:///d:/BC/qmzz/index.html) L23660-L23662。三档均不要求 `stateVars/worldContext/timelineEvents/thresholdEvents/randomEvents/endingEvents/playerDesc 四段式`。

### 1.2 环节 2：API 请求构造

请求体（L23876-L23885）：
```javascript
var body = {
    model: model,
    messages: [
        { role: 'system', content: promptObj.systemPrompt },
        { role: 'user', content: promptObj.userContent }
    ],
    temperature: promptObj.temperature,
    max_tokens: promptObj.maxTokens,
    ...(!isAgnes ? { response_format: { type: 'json_object' } } : {})
};
```

- `temperature` 三档均为 0.8（偏高，适合创意生成但不利于结构稳定）
- `max_tokens` basic 2048 / medium 4096 / advanced 8192——advanced 档 8192 tokens 约 4000-6000 中文字，足以容纳 1900 字 playerDesc + 12 个 timelineEvents，但当前 Prompt 未要求这些字段，所以 token 预算未用满
- `response_format` 仅对非 agnes 域名启用，agnes 官方 API 不支持 JSON 模式时退化为纯文本提取
- 超时 45 秒（L23895）

### 1.3 环节 3：JSON 提取

`extractJSON`（L23716-L23750）做四步处理：
1. 去除 markdown 围栏 ` ```json ... ``` `
2. `stripJsonComments` 去除 `//` 与 `/* */` 注释
3. 截断最后一个 `}` 之后的尾部文本
4. 按嵌套深度计数定位最外层 `{}`，逐候选 JSON.parse

**结论**：纯语法层处理，不丢字段。即使 AI 输出多余文本/注释/代码块标记，也能稳健提取。

### 1.4 环节 4：normalize 字段映射

详见 [assets/normalize-data-loss.md](file:///d:/BC/qmzz/.trae/specs/research-script-editor-generation-gap/assets/normalize-data-loss.md)。逐字段标注：

| 字段 | 处理方式 | 行号 |
|---|---|---|
| `npcs` | 转换（含 gender 推断 + voiceId 分配），保留 name/title/description/personality/firstMessage | L23339-L23359 |
| `worldBg` | 保留，可选追加 novelReference 段落 | L23361-L23364 |
| `events`（扁平数组） | 降级转换（triggerCondition → keyword conditions，effects → effect action） | L23366-L23382 |
| `items` | 转换（effects → effect 对象） | L23384-L23402 |
| `quickReplies` | 转换（兼容 text/replies 两种格式） | L23404-L23409 |
| `npcRelationships` | 转换（fromNpc → sourceNpcId，intimacy → affection） | L23411-L23419 |
| `metadata` | 部分保留（title/author/tags），UI 状态注入（perspective/uncertainty/dice） | L23427-L23435 |
| `worldSettings.background` | 保留 worldBg | L23437 |
| `worldSettings.events` | 降级后的扁平 events | L23438 |
| `worldSettings.locations` | 保留 locationEntries 或 locations | L23439 |
| `worldSettings.loreEntries` | 保留 | L23440 |
| `characters.player` | 保留 playerName/playerTitle/playerDesc | L23443-L23447 |
| `scriptConfig.openingScene` | 保留，缺失时 fallback 到 npcs[0].firstMessage 或 worldBg | L23450 |
| `emotionMappings/bgmMap/achievements` | 直传（可能为空） | L23453-L23456 |
| **`stateVars`** | **完全丢弃** | 返回对象无此键 |
| **`worldContext`** | **完全丢弃** | 返回对象无此键 |
| **`events.timelineEvents`** | **完全丢弃** | L23366 仅遍历扁平 events |
| **`events.thresholdEvents`** | **完全丢弃** | 同上 |
| **`events.randomEvents`** | **完全丢弃** | 同上 |
| **`events.endingEvents`** | **完全丢弃** | 同上 |
| **`choices.impact`** | **完全丢弃** | L23366-L23382 未处理 choices |
| **`probability`** | **完全丢弃** | 同上 |

### 1.5 环节 5：validate 校验

详见 [assets/validate-rules.md](file:///d:/BC/qmzz/.trae/specs/research-script-editor-generation-gap/assets/validate-rules.md)。仅 5 项校验：version（永远通过，因 normalize 强制 '2.0'）/metadata.title 存在/characters.npcs 存在/npcs 非空数组/每个 npc.name 存在/scriptConfig.openingScene 存在。不校验字数、结构深度、字段间一致性。

### 1.6 环节 6：loadImportedScript 写入编辑器

| 字段 | UI 元素 | 是否消费 |
|---|---|---|
| `metadata.title/author/tags/coverImage/narrativePerspective/uncertaintyLevel/enableDice/defaultDice` | customScriptTitle/customScriptAuthor/cceTagsChips/cceCoverPreview/cce-perspective-btn/cce-uncertainty-btn/customEnableDice/customDefaultDice | 是 |
| `worldSettings.background` | customWorldBg | 是 |
| `worldSettings.events` | customEventList（L22880-L22891） | 是 |
| `worldSettings.locations` | locationEntriesList | 是 |
| `worldSettings.loreEntries` | loreEntriesList | 是 |
| `characters.player.name/title/description` | customPlayerName/customPlayerTitle/customPlayerDesc | 是 |
| `characters.npcs` | customNpcList | 是 |
| `scriptConfig.openingScene` | customOpeningScene | 是 |
| `items` | customItemList | 是 |
| `quickReplies` | customQuickReplyList | 是 |
| `npcRelationships` | customRelationList | 是 |
| `emotionMappings/bgmMap` | （L22915 之后，未完整读取） | 部分 |
| **`stateVars`** | **无 UI** | **不消费** |
| **`worldContext`** | **无 UI** | **不消费** |
| **`events.timelineEvents/thresholdEvents/randomEvents/endingEvents`** | **无 UI** | **不消费** |

### 1.7 环节 7：SimpleChatEngine 消费

`_buildSystemPrompt`（L11662-L11760）构建 system prompt 时：
- L11741/L11745：拼接 `playerName + playerTitle + playerDesc` 到 playerSection
- L12061-L12069：`worldContext` 仅用于判断是否末世题材（决定是否注入 doomsdayDeepRules），不直接注入 prompt
- L11718-L11720：自定义剧本无 gameWorldInfo 时，用 `chapter.desc` 作 worldSection
- **未读取 `stateVars`**：即使 normalize 保留了 stateVars，运行时也不会注入 system prompt

**关键观察**：官方剧本通过 `playerDesc` 文本中的"【AI需跟踪状态】"段落把状态变量清单塞给 AI（约 1900 字主控文档），绕过了代码层的 stateVars 字段读取。这是"主控文档模式"——状态机逻辑编码在 system prompt 文本中，由 AI 充当运行时引擎。

---

## 二、双 Prompt 文件冲突

### 2.1 加载与覆盖关系

| 步骤 | 文件 | 行号 | 操作 |
|---|---|---|---|
| 1 | [index.html](file:///d:/BC/qmzz/index.html) | L9444 | `<script src="data/custom-script-prompts.js">` 同步加载 data 版，执行 `window.CUSTOM_SCRIPT_PROMPTS = {...}` |
| 2 | [index.html](file:///d:/BC/qmzz/index.html) | L23634-L23656 | 内联 `<script>` 重新赋值 `window.CUSTOM_SCRIPT_PROMPTS = {...}`，**整体覆盖** data 版 |

**结论**：实际生效的是 [index.html](file:///d:/BC/qmzz/index.html) L23634-L23656 内联版本。

依据：L23665 `PROMPTS: window.CUSTOM_SCRIPT_PROMPTS` 在 CustomScriptGenerator 定义时读取覆盖后的内联版；L23671 `promptCfg = this.PROMPTS[mode] || this.PROMPTS.basic` 实际使用内联版三档。

### 2.2 三档字段差异

详见 [prompt-diff.md](file:///d:/BC/qmzz/.trae/specs/research-script-editor-generation-gap/prompt-diff.md)。核心差异：

| 类别 | data 版 | 内联版 |
|---|---|---|
| 结构化 metadata | 要求 {title, author, tags} | 不要求（仅顶层 title 字符串） |
| `playerName/playerTitle/playerDesc` | 要求（50-300 字分档） | **不要求** |
| `emotionMappings` | 要求（3-10 条） | **不要求** |
| `bgmMap` | 要求（7 键） | **不要求** |
| `locationEntries.weatherWeights` | 要求 | **不要求**（且字段名改为 locations） |
| JSON 骨架 | 提供 | 仅文字描述 |
| `npcs` 数量 | 1-3 个 | basic 2-4 / medium 3-6 / advanced 5-8 |
| `npcs.gender` | 不要求 | 要求 male/female |
| **`stateVars/worldContext/timelineEvents/thresholdEvents/randomEvents/endingEvents/playerDesc 四段式/countdownDays/多结局`** | **两版均不要求** | **两版均不要求** |

### 2.3 关键发现

1. **内联版缺失 7 个字段**：metadata 结构化、emotionMappings、bgmMap、playerName、playerTitle、playerDesc、locationEntries.weatherWeights
2. **两版共同缺失 8 个核心字段**：stateVars、worldContext、timelineEvents、thresholdEvents、randomEvents、endingEvents、playerDesc 四段式、countdownDays——这正是官方剧本的"剧情骨架"
3. **无论哪一版生效，AI 都不会输出剧情骨架字段**——双 Prompt 冲突只是表象，深层问题是 Prompt 模板设计未对齐官方剧本模式

---

## 三、官方剧本字段深度剖析

以 [data/game-chapters.js](file:///d:/BC/qmzz/data/game-chapters.js) 第一章 `废墟之弈`（id=1，L5-L388）为基准。

### 3.1 playerDesc：剧本主控文档（约 1900 字）

详见 [assets/official-playerdesc.md](file:///d:/BC/qmzz/.trae/specs/research-script-editor-generation-gap/assets/official-playerdesc.md)。四段式结构：

| 段落 | 起始标记 | 字数 | 内容作用 |
|---|---|---|---|
| 角色描述 | （开头） | 约 130 字 | 玩家身份、继承背景、核心目标、默认性格 |
| 【AI叙事指令】 | `【AI叙事指令】` | 约 230 字 | 路线核心目标、动态分支策略、NPC 称呼规则、信息呈现方式 |
| 【AI需跟踪状态】 | `【AI需跟踪状态】` | 约 60 字 | 10 个状态变量清单 |
| 【事件系统】 | `【事件系统】` | 约 1100 字 | 12 时间线 + 8 阈值 + 8 随机 + 4 终局事件清单 |
| 语言风格 | `语言风格需符合...` | 约 30 字 | 基调、氛围、母题 |

**本质**：playerDesc 不是"角色描述"，而是用自然语言写就的剧本主控文档，通过 system prompt 注入给 AI，让 AI 充当运行时引擎。AI 生成管道把 playerDesc 当 50-300 字角色描述，完全缺失主控文档层。

### 3.2 stateVars：10 个状态变量（L67-L78）

```javascript
stateVars: [
    { key: "population", label: "人口", initialValue: 321, min: 0, max: 1000 },
    { key: "foodDays", label: "食物库存（天）", initialValue: 22, min: 0, max: 90 },
    { key: "waterDays", label: "水库存（天）", initialValue: 18, min: 0, max: 90 },
    { key: "ammo", label: "弹药库存", initialValue: 240, min: 0, max: 2000 },
    { key: "infectionThreat", label: "感染者威胁度", initialValue: 45, min: 0, max: 100 },
    { key: "unity", label: "内部团结度", initialValue: 60, min: 0, max: 100 },
    { key: "externalRelation", label: "对外关系", initialValue: 40, min: 0, max: 100 },
    { key: "daysRemaining", label: "剩余天数（至凛冬）", initialValue: 30, min: 0, max: 30 },
    { key: "morale", label: "士气", initialValue: 55, min: 0, max: 100 },
    { key: "arkContact", label: "方舟接触度", initialValue: 0, min: 0, max: 100 }
]
```

字段结构：`{key, label, initialValue, min, max}`。10 个变量覆盖人口/食物/水/弹药/感染者威胁/团结度/对外关系/剩余天数/士气/方舟接触度。

### 3.3 events 四类嵌套结构

| 类别 | 数量 | 字段结构 | 行号 |
|---|---|---|---|
| `timelineEvents` | 12 个（D-28~D-0） | `{trigger:{daysRemaining}, eventName, description, choices:[{text, impact}]}` | L80-L200 |
| `thresholdEvents` | 8 个 | `{trigger:{varName: "<N" 或 ">N"}, eventName, description, choices}` | L201-L282 |
| `randomEvents` | 8 个 | `{eventName, description, choices, probability}` | L283-L364 |
| `endingEvents` | 4 个 | `{trigger:{组合条件}, eventName, description}` | L365-L386 |

timelineEvents 示例详见 [assets/official-timeline-events.md](file:///d:/BC/qmzz/.trae/specs/research-script-editor-generation-gap/assets/official-timeline-events.md)。

**choices.impact 字符串格式**：`<变量名><+/-><数值>`，如 `population-2, foodDays+3, suqing+15`。NPC 好感度用 NPC 名作变量名（如 `suqing+15`）。impact 由 AI 在叙事时解读（因 playerDesc 已声明状态变量清单），代码层不解析。

### 3.4 npcs：4 个 NPC，深度对齐

第一章 npcs 引用 [data/characters.js](file:///d:/BC/qmzz/data/characters.js) 的 4 个角色：

| NPC | title | gender | description 字数 | personality 字数 | firstMessage 字数 |
|---|---|---|---|---|---|
| 林深（linshen） | 军医 | male | 约 110 字 | 约 90 字 | 约 130 字 |
| 苏晴（suqing） | 搜索队长 | female | 约 100 字 | 约 90 字 | 约 130 字 |
| 老周（laozhou） | 老兵 | male | 约 90 字 | 约 80 字 | 约 130 字 |
| 小鹿（xiaolu） | 侦察兵 | female | 约 90 字 | 约 80 字 | 约 120 字 |

### 3.5 其他字段量化

| 字段 | 官方典型值 | 行号 |
|---|---|---|
| `openingScene` | 约 380 字（含环境描写+前情提要+第一个事件信号） | L15-L21 |
| `worldContext` | 8 个关键词 `["末世方舟","丧尸","避难所","啃食者","枯萎病","物资搜索","凛冬","焦土市"]` | L22 |
| `metadata.tags` | 4 个 `["末日","生存","策略","丧尸"]` | L23 |
| `loreEntries` | 全局 30 条（[data/game-world-info.js](file:///d:/BC/qmzz/data/game-world-info.js)），单条 200-500 字 | game-world-info.js L1-L34 |
| `npcs` 数量 | 4 个 | L12 |

---

## 四、量化差距对比表

详见 [field-gap-matrix.md](file:///d:/BC/qmzz/.trae/specs/research-script-editor-generation-gap/field-gap-matrix.md)。

23 个维度统计：

| 差距等级 | 数量 | 占比 |
|---|---|---|
| 缺失 | 13 | 57% |
| 严重 | 3 | 13% |
| 中等 | 6 | 26% |
| 轻微 | 3 | 13% |

根因分类（同一维度可能多个根因）：

| 根因 | 受影响维度数 |
|---|---|
| Prompt 未要求 | 16 |
| normalize 丢弃 | 9 |
| validate 不校验 | 14 |
| schema 未定义 | 8 |

---

## 五、根因分析

### 5.1 根因 A：Prompt 设计缺陷

**受影响字段数**：16 个维度

**受影响剧本能力**：
- 状态跟踪（stateVars 未要求）
- 剧情骨架（timelineEvents/thresholdEvents/randomEvents/endingEvents 未要求）
- 多结局（endingEvents 未要求）
- 倒计时（countdownDays 未要求）
- 主控文档（playerDesc 四段式未要求）
- 世界关键词（worldContext 未要求）
- NPC 描述深度（npcs.description/personality/firstMessage 字数未明确）
- NPC 称呼规则、信息呈现方式、语言风格（playerDesc 四段式中的子段未要求）

**修复成本量级**：中（需重写三档 Prompt 模板，但不需要改架构）

**细分**：
- A1：双 Prompt 冲突（内联版覆盖 data 版）——修复成本：低（删除内联版即可）
- A2：内联版缺失 7 个字段——修复成本：低（切换到 data 版即可）
- A3：两版共同缺失 8 个核心字段——修复成本：中（需重写 Prompt 模板，加入主控文档要求）

### 5.2 根因 B：normalize 数据丢失

**受影响字段数**：9 个维度

**受影响剧本能力**：
- 状态变量（stateVars 完全丢弃）
- 四类事件嵌套（timelineEvents/thresholdEvents/randomEvents/endingEvents 完全丢弃）
- 选项 impact（choices.impact 完全丢弃）
- 概率（probability 完全丢弃）
- 世界关键词（worldContext 完全丢弃）
- events 结构（四类嵌套降级为扁平）

**修复成本量级**：中（需扩展 normalizeGeneratedScript 返回对象，保留四类嵌套结构；不破坏现有 loadImportedScript 兼容性）

### 5.3 根因 C：validate 校验过松

**受影响字段数**：14 个维度

**受影响剧本能力**：
- 字段存在性底线（stateVars/events 嵌套/worldContext 等不校验）
- 字段内容深度（playerDesc/npcs.description/openingScene 字数不校验）
- 字段间一致性（impact 引用的变量是否在 stateVars 中定义不校验）

**修复成本量级**：低（在 validateScriptData 中添加校验分支即可）

### 5.4 根因 D：schema 未定义

**受影响字段数**：8 个维度

**受影响剧本能力**：同根因 B（schema 缺失导致 normalize/validate/UI 都没有参考标准）

**修复成本量级**：低（扩展 [data/script-data-schema-v2.js](file:///d:/BC/qmzz/data/script-data-schema-v2.js) 添加字段声明）

### 5.5 根因间依赖关系

```
A（Prompt 缺陷）──独立于──> B（normalize 丢失）
                              │
                              ▼
                       C（validate 过松）──依赖──> B（必须先扩展 normalize 保留字段，validate 才有字段可校验）
                              │
                              ▼
                       D（schema 未定义）──依赖──> B + C（schema 是 normalize/validate 的参考标准）
```

**修复顺序建议**：
1. **D 先行**：扩展 schema，定义字段标准（成本最低，影响最广）
2. **A1 + A2 并行**：消除双 Prompt 冲突，切换到 data 版（成本最低，立即见效）
3. **B 跟进**：扩展 normalize 保留四类嵌套字段（依赖 D 的字段定义）
4. **C 收尾**：扩展 validate 校验字数与结构（依赖 B 的字段保留）
5. **A3 长期**：重写 Prompt 模板加入主控文档要求（依赖 D + B + C 的字段流通）

---

## 六、优先级改进清单

### 6.1 P0 必须修复（5 条）

| # | 改进项 | 改动文件 | 改动行数量级 | 依赖关系 | 预估人时 | ROI 等级 |
|---|---|---|---|---|---|---|
| P0-1 | 消除双 Prompt 冲突：删除 [index.html](file:///d:/BC/qmzz/index.html) L23632-L23656 内联 `window.CUSTOM_SCRIPT_PROMPTS` 赋值，让 data 版生效 | index.html | 25 行删除 | 无 | 0.5h | 极高 |
| P0-2 | Prompt 模板重写：在 [data/custom-script-prompts.js](file:///d:/BC/qmzz/data/custom-script-prompts.js) 三档中加入 playerDesc 四段式（1500-2000 字）、stateVars、events 四类嵌套、worldContext、countdownDays 字段要求 | data/custom-script-prompts.js | 60 行重写 | 依赖 P0-1 | 4h | 极高 |
| P0-3 | normalize 扩展：在 [index.html](file:///d:/BC/qmzz/index.html) L23426-L23457 返回对象中添加 stateVars/worldContext/events.timelineEvents/thresholdEvents/randomEvents/endingEvents 字段保留逻辑 | index.html | 30 行新增 | 依赖 P0-2（Prompt 要求了字段才有数据可保留） | 3h | 高 |
| P0-4 | validate 扩展：在 [index.html](file:///d:/BC/qmzz/index.html) L22615-L22644 中添加 stateVars 存在性、playerDesc 字数 >= 800、timelineEvents >= 5、endingEvents >= 2、impact 引用变量合法性校验 | index.html | 40 行新增 | 依赖 P0-3（normalize 保留了字段才能校验） | 3h | 高 |
| P0-5 | schema 扩展：在 [data/script-data-schema-v2.js](file:///d:/BC/qmzz/data/script-data-schema-v2.js) 中添加 stateVars/worldContext/events 嵌套结构字段声明 | data/script-data-schema-v2.js | 30 行新增 | 无（可并行于 P0-1） | 1h | 高 |

### 6.2 P1 重要增强（4 条）

| # | 改进项 | 改动文件 | 改动行数量级 | 依赖关系 | 预估人时 | ROI 等级 |
|---|---|---|---|---|---|---|
| P1-1 | 剧情骨架拆分：在 [data/custom-script-prompts.js](file:///d:/BC/qmzz/data/custom-script-prompts.js) 中将 playerDesc 主控文档拆分为独立字段（stateVars/timelineEvents/endingEvents），不再编码进 playerDesc 文本 | data/custom-script-prompts.js + index.html normalize | 80 行 | 依赖 P0-2 | 6h | 中 |
| P1-2 | NPC 描述深度模板：在 Prompt 中明确 npcs.description >= 100 字、personality >= 60 字、firstMessage >= 80 字，提供四段式模板（外貌/性格/背景/动机） | data/custom-script-prompts.js | 20 行 | 依赖 P0-2 | 2h | 中 |
| P1-3 | 事件系统对齐：在 Prompt 中要求 events 用四类嵌套结构（timelineEvents/thresholdEvents/randomEvents/endingEvents），含 trigger/eventName/description/choices[{text, impact}] 字段 | data/custom-script-prompts.js + index.html normalize L23366 | 50 行 | 依赖 P0-2 + P0-3 | 4h | 中 |
| P1-4 | 多结局系统：在 Prompt 中要求 endingEvents >= 2 个，每个含组合触发条件（如 `unity>60 且 foodDays>30`）与结局描述（200-400 字） | data/custom-script-prompts.js | 15 行 | 依赖 P1-3 | 2h | 中 |

### 6.3 P2 体验优化（5 条）

| # | 改进项 | 改动文件 | 改动行数量级 | 依赖关系 | 预估人时 | ROI 等级 |
|---|---|---|---|---|---|---|
| P2-1 | 章节概念：在 schema 与 Prompt 中引入 chapter 概念，支持多章节剧本（官方 game-chapters.js 是 3 章结构） | data/script-data-schema-v2.js + data/custom-script-prompts.js | 40 行 | 依赖 P0-5 | 4h | 低 |
| P2-2 | NPC 关系网：在 Prompt 中要求 npcRelationships 用"通过 choices.impact 隐式表达好感度"模式（如 `suqing+15`），与官方对齐，而非显式 relation 字段 | data/custom-script-prompts.js | 10 行 | 依赖 P0-2 | 1h | 低 |
| P2-3 | 语言风格：在 playerDesc 四段式中嵌入"语言风格"段，要求声明基调/氛围/母题 | data/custom-script-prompts.js | 5 行 | 依赖 P0-2 | 0.5h | 低 |
| P2-4 | 倒计时：在 schema 与 Prompt 中引入 countdownDays 字段，要求 timelineEvents 按 D-N 锚点排列 | data/script-data-schema-v2.js + data/custom-script-prompts.js | 15 行 | 依赖 P0-5 + P1-3 | 2h | 低 |
| P2-5 | 世界设定深度：在 Prompt 中要求 loreEntries 单条 content >= 150 字，advanced 档 >= 20 条；要求 worldContext >= 8 个关键词 | data/custom-script-prompts.js | 10 行 | 依赖 P0-2 | 1h | 低 |

---

## 七、高 ROI 改进项

选出 4 个 ROI 最高项（按 ROI = 预期效果 / 预估成本 排序）。

### 7.1 ROI #1：消除双 Prompt 冲突（P0-1）

- **当前问题**：[index.html](file:///d:/BC/qmzz/index.html) L23634-L23656 内联版覆盖 data 版，导致 AI 不输出 playerDesc/playerName/playerTitle/emotionMappings/bgmMap 等字段
- **官方做法**：[data/custom-script-prompts.js](file:///d:/BC/qmzz/data/custom-script-prompts.js) 是单一来源，含完整字段要求
- **改造优先级**：P0
- **预估成本**：0.5 人时（删除 25 行内联赋值）
- **预期效果**：立即恢复 playerDesc/playerName/playerTitle/emotionMappings/bgmMap 字段输出，立绘表情切换与 BGM 切换恢复工作
- **并行/串行**：可与 P0-5（schema 扩展）并行

### 7.2 ROI #2：playerDesc 主控文档模板（P0-2 核心）

- **当前问题**：AI 输出 playerDesc 仅 50-300 字角色描述，无状态变量清单/事件清单/叙事指令/语言风格
- **官方做法**：[data/game-chapters.js](file:///d:/BC/qmzz/data/game-chapters.js) L26-L66 约 1900 字四段式主控文档，通过 system prompt 注入给 AI
- **改造优先级**：P0
- **预估成本**：4 人时（重写三档 Prompt 模板，嵌入四段式占位符）
- **预期效果**：AI 输出 playerDesc 升级为 1500-2000 字主控文档，运行时 SimpleChatEngine 拼接到 system prompt 后，AI 自动遵循状态跟踪/事件触发/多结局协议
- **并行/串行**：依赖 P0-1；可与 P0-3/P0-4/P0-5 并行启动设计

### 7.3 ROI #3：schema 扩展（P0-5）

- **当前问题**：[data/script-data-schema-v2.js](file:///d:/BC/qmzz/data/script-data-schema-v2.js) 仅定义 7 个顶层键，未声明 stateVars/worldContext/events 嵌套等字段，normalize/validate/UI 无参考标准
- **官方做法**：[data/game-chapters.js](file:///d:/BC/qmzz/data/game-chapters.js) 第一章实际使用 stateVars/worldContext/events.timelineEvents/thresholdEvents/randomEvents/endingEvents 字段
- **改造优先级**：P0
- **预估成本**：1 人时（添加字段声明）
- **预期效果**：为 P0-3（normalize 扩展）与 P0-4（validate 扩展）提供字段标准，避免字段名/结构歧义
- **并行/串行**：可与 P0-1 并行；P0-3/P0-4 依赖此项

### 7.4 ROI #4：normalize 保留四类事件嵌套（P0-3 核心）

- **当前问题**：[index.html](file:///d:/BC/qmzz/index.html) L23366-L23382 把 events 降级为扁平数组，丢失 timelineEvents/thresholdEvents/randomEvents/endingEvents 四类嵌套结构与 choices.impact
- **官方做法**：[data/game-chapters.js](file:///d:/BC/qmzz/data/game-chapters.js) L79-L387 使用四类嵌套结构，每类含 trigger/choices.impact
- **改造优先级**：P0
- **预估成本**：3 人时（扩展返回对象，保留四类子结构）
- **预期效果**：AI 输出的剧情骨架字段能流入编辑器与运行时，为后续 UI 扩展与运行时消费铺路
- **并行/串行**：依赖 P0-2（Prompt 要求了字段才有数据可保留）+ P0-5（schema 定义了字段结构）

### 7.5 改进项依赖图

```
P0-1（消除冲突）──────┐
                      ├──> P0-2（Prompt 重写）──> P0-3（normalize 扩展）──> P0-4（validate 扩展）
P0-5（schema 扩展）───┘                              │
                                                     ├──> P1-1（骨架拆分）
                                                     ├──> P1-3（事件系统对齐）
                                                     └──> P1-4（多结局）
```

- **并行组 1**：P0-1 + P0-5（无依赖，可同时启动）
- **串行链**：P0-2 → P0-3 → P0-4
- **并行组 2**：P1-1 + P1-3 + P1-4（依赖 P0-2 + P0-3 完成后可并行）

---

## 八、与现有 spec 关系

### 8.1 与 `fix-custom-script-ai-generation` 关系

**spec 路径**：[.trae/specs/fix-custom-script-ai-generation/spec.md](file:///d:/BC/qmzz/.trae/specs/fix-custom-script-ai-generation/spec.md)

**已修复问题**：
- 重构 `CustomScriptGenerator` 自包含生成管道（[index.html](file:///d:/BC/qmzz/index.html) L23658-L23933）
- Prompt 模板化与压缩（三档 maxTokens/maxLoreEntries/maxEvents/maxItems）
- JSON 提取增强（去 markdown 围栏/注释/尾部文本）
- 分级错误提示（APIError/JSONParseError/ValidationError）
- 真实进度反馈（四阶段）
- 图片生成解耦（Promise.allSettled）
- 自动降级策略（advanced → medium → basic）

**未解决问题（本次调研新发现）**：
1. **双 Prompt 冲突未发现**：spec 未提及 [data/custom-script-prompts.js](file:///d:/BC/qmzz/data/custom-script-prompts.js) 与 [index.html](file:///d:/BC/qmzz/index.html) L23634-L23656 内联版的覆盖关系
2. **字段缺失未解决**：spec 关注生成管道稳定性，未涉及 stateVars/worldContext/timelineEvents 等剧情骨架字段缺失
3. **主控文档模式未识别**：spec 把 playerDesc 当 50-300 字角色描述，未识别官方 1900 字主控文档模式
4. **normalize 数据丢失未发现**：spec 复用现有 normalizeGeneratedScript，未审计其字段丢失行为
5. **validate 校验过松未发现**：spec 复用现有 validateScriptData，未审计其校验项不足

**结论**：`fix-custom-script-ai-generation` 解决了"生成管道稳定性"问题，但未解决"生成内容深度"问题。本次调研是其字段层的补充。

### 8.2 与 `upgrade-script-system-v2` 关系

**spec 路径**：[.trae/specs/upgrade-script-system-v2/spec.md](file:///d:/BC/qmzz/.trae/specs/upgrade-script-system-v2/spec.md)

**spec 范围**：架构层面重构（ChatEngine 模块化、对话摘要、多 NPC 对话、剧情事件触发器、存档槽位、Lorebook 语义匹配、世界状态引擎升级、剧本数据模型层）

**落地状态**：未落地（spec 提到 `src/engine/ScriptEngine.js` 等模块化拆分，但项目仍是单文件 index.html）

**本次调研关系**：
- `upgrade-script-system-v2` 的"剧情事件触发器"（Requirement: 剧情事件触发器，spec L106-L135）与本次调研的 timelineEvents/thresholdEvents 字段对齐——本次调研可作为该 spec 的字段层补充，明确官方剧本的事件结构标准
- `upgrade-script-system-v2` 的"剧本数据模型层"（Requirement: 剧本数据模型层，spec L204-L228）提到 EventData 但未细化四类嵌套——本次调研明确了 timelineEvents/thresholdEvents/randomEvents/endingEvents 四类结构
- `upgrade-script-system-v2` 未涉及 AI 生成管道，本次调研填补了这一空白

**结论**：`upgrade-script-system-v2` 是架构层规划，本次调研是字段层实证。两者互补：本次调研可作为该 spec 落地时的字段标准参考。

### 8.3 与 `overhaul-script-system-omnimundia` 关系

**spec 路径**：[.trae/specs/overhaul-script-system-omnimundia/spec.md](file:///d:/BC/qmzz/.trae/specs/overhaul-script-system-omnimundia/spec.md)

**spec 范围**：对标 Omnimundia 平台（世界树存档分支、剧本发现与分类、剧本创作自由度提升、动态世界事件引擎、对话引擎智能化、不确定性系统）

**落地状态**：未落地（spec 提到的世界树、剧本发现、骰子系统等均未实现）

**本次调研关系**：
- `overhaul-script-system-omnimundia` 的"动态世界事件引擎"（Requirement: 动态世界事件引擎，spec L136-L173）与本次调研的 events 字段对齐——但 spec 设计的事件结构是 `{conditions, actions, once, priority, cooldown}` 扁平结构，与官方 [game-chapters.js](file:///d:/BC/qmzz/data/game-chapters.js) 的四类嵌套结构不一致。本次调研揭示了这一设计错配
- `overhaul-script-system-omnimundia` 的"剧本创作自由度提升"（spec L100-L134）提到 NPC 数量上限提升到 10、自定义物品库、事件触发器、叙事视角、骰子系统——这些是编辑器层增强，不涉及 AI 生成管道
- `overhaul-script-system-omnimundia` 的"剧本数据模型标准化"（spec L223-L270）定义了 v2.0 数据模型，但未包含 stateVars/worldContext/events 四类嵌套等字段——本次调研揭示了 schema 的字段缺失

**结论**：`overhaul-script-system-omnimundia` 是功能对标规划，本次调研揭示了其对标的官方剧本结构未被 schema/Prompt/normalize 完整支持。两者关系：本次调研可作为该 spec 落地前的字段层对齐依据。

### 8.4 与 `audit-custom-script-ai-generation` 关系

**spec 路径**：`.trae/specs/audit-custom-script-ai-generation/spec.md` —— **该 spec 不存在**（已通过 `Get-ChildItem` 确认目录不存在）

**结论**：本次调研是首次针对 AI 生成剧本的端到端审计，无前置审计可对比。本次调研的新发现：
1. **双 Prompt 冲突**：内联版覆盖 data 版，导致 playerDesc 等字段缺失
2. **normalize 数据丢失**：9 类核心字段被丢弃
3. **主控文档模式缺失**：AI 把 playerDesc 当角色描述，未识别官方 1900 字主控文档模式
4. **validate 校验过松**：仅 5 项最低门槛校验
5. **schema 字段缺失**：8 类核心字段未在 schema 中声明

---

## 附录：产出文件清单

| 文件 | 用途 |
|---|---|
| [report.md](file:///d:/BC/qmzz/.trae/specs/research-script-editor-generation-gap/report.md) | 本主报告 |
| [field-gap-matrix.md](file:///d:/BC/qmzz/.trae/specs/research-script-editor-generation-gap/field-gap-matrix.md) | 23 维度差距对比矩阵 |
| [prompt-diff.md](file:///d:/BC/qmzz/.trae/specs/research-script-editor-generation-gap/prompt-diff.md) | 双 Prompt 文件差异对比 |
| [assets/normalize-data-loss.md](file:///d:/BC/qmzz/.trae/specs/research-script-editor-generation-gap/assets/normalize-data-loss.md) | normalizeGeneratedScript 数据丢失点摘录 |
| [assets/validate-rules.md](file:///d:/BC/qmzz/.trae/specs/research-script-editor-generation-gap/assets/validate-rules.md) | validateScriptData 校验规则摘录 |
| [assets/official-playerdesc.md](file:///d:/BC/qmzz/.trae/specs/research-script-editor-generation-gap/assets/official-playerdesc.md) | 官方 playerDesc 主控文档示例摘录 |
| [assets/official-timeline-events.md](file:///d:/BC/qmzz/.trae/specs/research-script-editor-generation-gap/assets/official-timeline-events.md) | 官方 timelineEvents 结构示例摘录 |
