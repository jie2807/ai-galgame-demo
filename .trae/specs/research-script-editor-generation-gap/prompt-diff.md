# 双 Prompt 文件差异对比

## 一、双 Prompt 文件加载与覆盖关系

### 1.1 加载顺序

| 步骤 | 文件 | 行号 | 操作 |
|---|---|---|---|
| 1 | [index.html](file:///d:/BC/qmzz/index.html) | L9444 | `<script src="data/custom-script-prompts.js"></script>` 加载 data 版，赋值 `window.CUSTOM_SCRIPT_PROMPTS = {...}` |
| 2 | [index.html](file:///d:/BC/qmzz/index.html) | L23634-L23656 | 内联 `<script>` 重新赋值 `window.CUSTOM_SCRIPT_PROMPTS = {...}`，**覆盖** data 版 |

### 1.2 覆盖关系结论

**实际生效的是 [index.html](file:///d:/BC/qmzz/index.html) L23634-L23656 内联版本**。

依据：
1. [data/custom-script-prompts.js](file:///d:/BC/qmzz/data/custom-script-prompts.js) L1 在浏览器加载时执行 `window.CUSTOM_SCRIPT_PROMPTS = {...}`，写入 data 版。
2. [index.html](file:///d:/BC/qmzz/index.html) L9444 通过 `<script src>` 同步加载 data 版（HTML 解析阻塞，确保 data 版先执行）。
3. [index.html](file:///d:/BC/qmzz/index.html) L23634 在后续内联 `<script>` 中再次执行 `window.CUSTOM_SCRIPT_PROMPTS = {...}`，整个对象被重新赋值（不是深合并），data 版完全被覆盖。
4. [index.html](file:///d:/BC/qmzz/index.html) L23665 `PROMPTS: window.CUSTOM_SCRIPT_PROMPTS` 在 `CustomScriptGenerator` 定义时读取覆盖后的内联版。
5. [index.html](file:///d:/BC/qmzz/index.html) L23671 `promptCfg = this.PROMPTS[mode] || this.PROMPTS.basic` 实际使用的是内联版的 `basic/medium/advanced` 三档。

## 二、data 版三档字段要求

> 源文件：[data/custom-script-prompts.js](file:///d:/BC/qmzz/data/custom-script-prompts.js) L1-L11

### 2.1 data 版 basic 档（L2-L4）

**顶层字段**（JSON 骨架明确要求）：
- `metadata`: { title, author, tags[2-3] }
- `worldBg`: 50-100 字
- `loreEntries`: [{keys[2-5], content(80-150 字)}]，≤5 条
- `locationEntries`: [{name, description(30-60 字), weatherWeights{sunny,cloudy,rainy,foggy}}]，1-3 个
- `events`: [{id, name, triggerCondition, description, effects:{}}]，≤3 个
- `items`: [{id, name, description, type(关键道具/消耗品/礼物/材料), effects:{}}]，≤3 个
- `quickReplies`: [{text, mode(say/act/think)}]，3-5 个
- **`emotionMappings`**: [{emotion(happy/sad/angry/surprised/shy/calm), keywords}]，3-5 条
- **`npcRelationships`**: [{fromNpc, toNpc, relation(friend/enemy/lover/mentor/stranger), intimacy(0-100)}]，1-3 条
- **`bgmMap`**: {default, town, forest, battle, night, sad, happy}
- **`playerName`**, **`playerTitle`**, **`playerDesc`**: 50-100 字
- `npcs`: [{name, title, description(50-100 字), personality, firstMessage}]，1-3 个
- `openingScene`: 80-150 字
- `novelReference`: 原作名或空字符串

### 2.2 data 版 medium 档（L5-L7）

字段同 basic 档，深度提升：
- `worldBg`: 200-400 字，含历史/势力/核心冲突
- `loreEntries`: content 100-200 字，≤10 条
- `locationEntries`: description 50-100 字，2-4 个
- `quickReplies`: 5-7 个
- `emotionMappings`: 5-7 条
- `npcRelationships`: 2-4 条
- `playerDesc`: 100-200 字
- `npcs`: description 100-200 字，1-3 个
- `openingScene`: 150-300 字

### 2.3 data 版 advanced 档（L8-L10）

字段同 basic 档，深度进一步提升：
- `worldBg`: 400-800 字，含历史/势力/文化/经济体系
- `loreEntries`: content 150-300 字，≤15 条
- `locationEntries`: description 60-120 字，3-5 个
- `quickReplies`: 6-10 个
- `emotionMappings`: 6-10 条
- `npcRelationships`: 3-5 条
- `playerDesc`: 150-300 字
- `npcs`: description 150-300 字，1-3 个
- `openingScene`: 250-500 字

## 三、内联版三档字段要求

> 源文件：[index.html](file:///d:/BC/qmzz/index.html) L23634-L23655

### 3.1 内联版 basic 档（L23635-L23641）

**顶层字段**（systemPrompt 文字描述，无 JSON 骨架）：
- `title`（剧本标题）
- `worldBg`（世界观背景描述）
- `openingScene`（开场旁白，1-3 句话）
- `novelReference`（可选）
- `npcs`: 2-4 个，含 name/title/description/personality/gender(male/female)/firstMessage
- `locations`: 1-3 个，含 name/description
- `events`: 可选少量
- `items`: 可选少量
- `quickReplies`: 可选少量
- `npcRelationships`: 可选少量

约束：loreEntries ≤5，events ≤3，items ≤3（L23660）

### 3.2 内联版 medium 档（L23642-L23648）

字段同 basic 档，深度提升：
- `npcs`: 3-6 个，"详尽"的 name/title/description/personality/gender/firstMessage，性格鲜明
- `worldBg`: 丰富，含核心设定与氛围
- `locations`: 3-5 个，含 name/description/氛围描写
- `events`: 多个，含触发条件 conditions 与动作 actions
- `items`: 含 effect
- `quickReplies`
- `npcRelationships`
- "角色之间有明确的关系与冲突"

约束：loreEntries ≤10，events ≤8，items ≤8（L23661）

### 3.3 内联版 advanced 档（L23649-L23655）

字段同 basic 档，深度进一步提升：
- `npcs`: 5-8 个，"详尽"的 name/title/description/personality/gender/firstMessage 与独特对话风格，"角色之间构成复杂关系网"
- `worldBg`: 深度，含历史/势力/规则与氛围
- `locations`: 5-8 个，含 name/description 与细致氛围
- `events`: "完整的 events 系统"，含 conditions/actions/once/priority
- `items`: 含 effect 与 type
- `quickReplies`
- `npcRelationships`
- "多条剧情线与潜在冲突，支持分支发展"

约束：loreEntries ≤15，events ≤12，items ≤12（L23662）

## 四、两份 Prompt 字段差异逐项对比

| 字段 | data 版要求 | 内联版要求 | 差异 |
|---|---|---|---|
| `metadata` | 要求 {title, author, tags} | 不要求（仅要求顶层 `title` 字符串） | data 版结构化，内联版扁平 |
| `title` | 在 metadata.title 中 | 顶层独立字段 | 字段位置不同 |
| `author` | 要求 | 不要求 | 内联版缺失 |
| `tags` | 要求 [2-5 个] | 不要求 | 内联版缺失 |
| `worldBg` | 要求，明确字数（50-800 字分档） | 要求，未明确字数 | 内联版无字数约束 |
| `loreEntries` | 要求 [{keys, content}]，明确字数 | 仅在约束中提"世界观/设定条目"上限，未明确要求该字段名 | 内联版字段名模糊 |
| `locationEntries` vs `locations` | `locationEntries` 含 weatherWeights | `locations` 不含 weatherWeights | 字段名不同，weatherWeights 缺失 |
| `events` | 扁平 [{id, name, triggerCondition, description, effects}] | 扁平 [{name, conditions, actions, once, priority}] | 字段子结构不同 |
| `items` | 含 type 枚举（关键道具/消耗品/礼物/材料） | 含 type 与 effect | 基本一致 |
| `quickReplies` | [{text, mode(say/act/think)}] | 数组，字段未明确 | 内联版字段模糊 |
| **`emotionMappings`** | 要求 [{emotion, keywords}]，3-10 条 | **不要求** | 内联版完全缺失 |
| **`npcRelationships`** | 要求 [{fromNpc, toNpc, relation, intimacy}]，1-5 条 | 要求但字段未明确 | 内联版字段模糊 |
| **`bgmMap`** | 要求 {default, town, forest, battle, night, sad, happy} | **不要求** | 内联版完全缺失 |
| **`playerName`** | 要求 | **不要求** | 内联版缺失 |
| **`playerTitle`** | 要求 | **不要求** | 内联版缺失 |
| **`playerDesc`** | 要求 50-300 字 | **不要求** | 内联版缺失（最严重差距） |
| `npcs` 数量 | 1-3 个 | basic 2-4 / medium 3-6 / advanced 5-8 | 内联版要求更多 |
| `npcs.gender` | 不要求 | 要求 male/female | 内联版多要求 |
| `npcs.firstMessage` | 要求 | 要求 | 一致 |
| `openingScene` 字数 | 80-500 字分档 | basic "1-3 句话"，medium/advanced 未明确 | 内联版字数模糊 |
| `novelReference` | 要求（可空） | 要求（可选） | 一致 |
| **`stateVars`** | **不要求** | **不要求** | **两版均缺失（核心差距）** |
| **`events.timelineEvents`** | **不要求** | **不要求** | **两版均缺失（核心差距）** |
| **`events.thresholdEvents`** | **不要求** | **不要求** | **两版均缺失** |
| **`events.randomEvents`** | **不要求** | **不要求** | **两版均缺失** |
| **`events.endingEvents`** | **不要求** | **不要求** | **两版均缺失（多结局）** |
| **`worldContext`** | **不要求** | **不要求** | **两版均缺失** |
| **倒计时机制** | **不要求** | **不要求** | **两版均缺失** |
| **`playerDesc` 四段式结构** | **不要求** | **不要求** | **两版均缺失（主控文档模式）** |
| JSON 输出格式 | 提供 JSON 骨架 | 仅文字描述"顶层字段包括" | data 版更严格 |
| markdown 代码块 | 禁止 | 禁止 | 一致 |

## 五、关键差异点

### 5.1 内联版缺失的字段（共 7 个）

1. `metadata`（结构化元数据，含 title/author/tags）
2. `emotionMappings`（情绪映射，影响立绘表情切换）
3. `bgmMap`（BGM 映射，影响音乐切换）
4. `playerName`（玩家角色名）
5. `playerTitle`（玩家身份头衔）
6. `playerDesc`（玩家角色描述，**最严重**——官方用作剧本主控文档）
7. `locationEntries.weatherWeights`（地点天气权重）

### 5.2 内联版字段模糊化（共 4 个）

1. `loreEntries`：data 版明确要求 `{keys, content}` 结构，内联版仅说"世界观/设定条目"
2. `quickReplies`：data 版明确要求 `{text, mode}`，内联版未明确字段
3. `npcRelationships`：data 版明确要求 `{fromNpc, toNpc, relation, intimacy}`，内联版未明确字段
4. `events` 子结构：data 版要求 `{id, name, triggerCondition, description, effects}`，内联版要求 `{name, conditions, actions, once, priority}`（结构不同）

### 5.3 两版共同缺失的字段（核心差距）

1. `stateVars`（状态变量数组）
2. `events.timelineEvents`（时间线事件）
3. `events.thresholdEvents`（阈值事件）
4. `events.randomEvents`（随机事件）
5. `events.endingEvents`（终局事件/多结局）
6. `worldContext`（世界关键词数组）
7. `playerDesc` 四段式结构（AI叙事指令/状态跟踪/事件系统/语言风格）
8. 倒计时机制（daysRemaining）

**这 8 个字段正是官方剧本 [data/game-chapters.js](file:///d:/BC/qmzz/data/game-chapters.js) 第一章的核心"剧情骨架"字段**。两版 Prompt 都不要求，所以无论哪一版生效，AI 生成的剧本都不会有剧情骨架。

### 5.4 内联版多要求的字段

1. `npcs.gender`（要求 male/female）
2. `npcs` 数量上限更高（advanced 5-8 个 vs data 版 1-3 个）

## 六、normalize 与两版 Prompt 的兼容性

normalizeGeneratedScript（[index.html](file:///d:/BC/qmzz/index.html) L23333-L23458）同时兼容两版字段：

| normalize 字段读取 | 兼容 data 版 | 兼容内联版 |
|---|---|---|
| `scriptData.title` (L23428) | 否（data 版用 metadata.title） | 是 |
| `scriptData.metadata.title` (L23428) | 是 | 否（内联版不要求 metadata） |
| `scriptData.worldBg` (L23361) | 是 | 是 |
| `scriptData.npcs` (L23339) | 是 | 是 |
| `scriptData.events` (L23366) | 是 | 是 |
| `scriptData.items` (L23384) | 是 | 是 |
| `scriptData.quickReplies` (L23404) | 是（含 text/mode） | 部分（兼容 replies 数组） |
| `scriptData.npcRelationships` (L23411) | 是（含 fromNpc/toNpc/relation/intimacy） | 是（兼容 sourceNpcId/targetNpcId/type/affection） |
| `scriptData.emotionMappings` (L23453) | 是 | 否（内联版不要求，直传空数组） |
| `scriptData.bgmMap` (L23455) | 是 | 否（内联版不要求，直传空对象） |
| `scriptData.playerName` (L23444) | 是 | 否（内联版不要求，留空） |
| `scriptData.playerTitle` (L23445) | 是 | 否（内联版不要求，留空） |
| `scriptData.playerDesc` (L23446) | 是 | 否（内联版不要求，留空） |
| `scriptData.locationEntries` (L23439) | 是 | 否（内联版用 locations） |
| `scriptData.locations` (L23439) | 否（data 版用 locationEntries） | 是 |
| `scriptData.loreEntries` (L23440) | 是 | 是（但内联版字段名模糊） |
| `scriptData.openingScene` (L23450) | 是 | 是 |
| `scriptData.novelReference` (L23362) | 是 | 是 |

**关键观察**：normalize 在字段读取层做了双版兼容，但因为内联版生效且不要求 `playerName/playerTitle/playerDesc/emotionMappings/bgmMap`，所以这些字段在 AI 输出中实际为空，normalize 直传空值，最终写入编辑器的剧本缺失这些字段。

## 七、修复建议

### 7.1 短期（P0）：消除双 Prompt 冲突

1. **删除 [index.html](file:///d:/BC/qmzz/index.html) L23632-L23656 的内联 `window.CUSTOM_SCRIPT_PROMPTS` 赋值**，让 data 版生效。
2. **保留 [data/custom-script-prompts.js](file:///d:/BC/qmzz/data/custom-script-prompts.js) 作为单一来源**。
3. 在 [index.html](file:///d:/BC/qmzz/index.html) L23665 `PROMPTS: window.CUSTOM_SCRIPT_PROMPTS` 处添加 console.assert 验证加载成功。

### 7.2 中期（P1）：Prompt 模板重写

data 版与内联版都需要重写，加入官方剧本的核心字段要求：

1. `playerDesc` 改为 1500-2000 字四段式结构（含【AI叙事指令】【AI需跟踪状态】【事件系统】【语言风格】）
2. 新增 `stateVars` 数组字段（含 key/label/initialValue/min/max）
3. 新增 `events.timelineEvents/thresholdEvents/randomEvents/endingEvents` 四类嵌套结构
4. 新增 `worldContext` 关键词数组
5. 新增 `countdownDays` 倒计天天数字段

### 7.3 长期（P2）：Prompt 模板模块化

将 Prompt 模板拆分为可组合的"段落模板"（角色段/世界段/事件段/状态段/风格段），按 mode 组合不同深度，避免三档模板内容重复。
