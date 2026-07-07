# 字段差距对比矩阵

> 本表基于 [data/game-chapters.js](file:///d:/BC/qmzz/data/game-chapters.js) 第一章 `废墟之弈`（id=1，L5-L388）的官方字段深度，与 [index.html](file:///d:/BC/qmzz/index.html) 内联 `CUSTOM_SCRIPT_PROMPTS`（L23634-L23655）+ `normalizeGeneratedScript`（L23333-L23458）+ `validateScriptData`（L22615-L22644）共同决定的 AI 生成实际产出对比得出。
> 差距等级：**缺失**（AI 完全不产出）/ **严重**（AI 产出但深度差距 > 5 倍）/ **中等**（差距 2-5 倍）/ **轻微**（差距 < 2 倍）。
> 根因分类：**Prompt 未要求**（内联 Prompt 模板未要求该字段）/ **normalize 丢弃**（normalizeGeneratedScript 未保留该字段）/ **validate 不校验**（validateScriptData 未校验该字段深度或存在性）/ **schema 未定义**（[data/script-data-schema-v2.js](file:///d:/BC/qmzz/data/script-data-schema-v2.js) 未声明该字段）。

| # | 维度 | 官方典型值 | AI 生成实际值 | 差距等级 | 根因分类 | 修复方向 |
|---|---|---|---|---|---|---|
| 1 | `playerDesc` 字数 | 约 1900 字（L26-L66，含四段式主控文档） | basic 50-100 字 / medium 100-200 字 / advanced 150-300 字 | **严重** | Prompt 未要求 + validate 不校验 + schema 未定义 | Prompt 模板要求 1500-2000 字四段式结构；validate 校验字数 >= 800；UI `customPlayerDesc` rows 从 2 改为 20（[index.html](file:///d:/BC/qmzz/index.html) L8699） |
| 2 | `playerDesc` 四段式结构 | 含【AI叙事指令】【AI需跟踪状态】【事件系统】【语言风格】四段 | 1 段（角色描述） | **缺失** | Prompt 未要求 + validate 不校验 | Prompt 模板嵌入四段式占位符；validate 校验含 4 个标记子串 |
| 3 | `stateVars` 字段 | 10 个状态变量数组（L67-L78，每个含 key/label/initialValue/min/max） | 无（normalize L23426-L23457 返回对象无此键） | **缺失** | Prompt 未要求 + normalize 丢弃 + validate 不校验 + schema 未定义 | Prompt 要求 stateVars 数组；normalize 保留；validate 校验 >= 3 个；schema 添加字段 |
| 4 | `events.timelineEvents` | 12 个时间线事件（L80-L200，D-28~D-0，含 trigger.daysRemaining/eventName/description/choices[{text,impact}]） | 无（normalize L23366 仅遍历扁平 events 数组） | **缺失** | Prompt 未要求 + normalize 丢弃 + validate 不校验 + schema 未定义 | Prompt 要求 timelineEvents 嵌套；normalize 保留四类子结构；validate 校验 >= 5 个；schema 添加字段 |
| 5 | `events.thresholdEvents` | 8 个阈值事件（L201-L282，trigger 含 `<`/`>` 数值比较） | 无 | **缺失** | Prompt 未要求 + normalize 丢弃 + validate 不校验 + schema 未定义 | 同上 |
| 6 | `events.randomEvents` | 8 个随机事件（L283-L364，含 probability 字段） | 无 | **缺失** | Prompt 未要求 + normalize 丢弃 + validate 不校验 + schema 未定义 | 同上，且 normalize 保留 probability 字段 |
| 7 | `events.endingEvents` | 4 个终局事件（L365-L386，多结局，trigger 含组合条件如 `unity>60 且 foodDays>30`） | 无 | **缺失** | Prompt 未要求 + normalize 丢弃 + validate 不校验 + schema 未定义 | 同上，Prompt 要求 >= 2 个结局 |
| 8 | `choices.impact` 字段 | 状态变量增减指令字符串（如 `population-2, foodDays+3, suqing+15`） | 无（normalize L23366-L23382 未处理 choices 字段） | **缺失** | normalize 丢弃 + validate 不校验 | normalize 保留 choices 数组；validate 校验 impact 引用的变量在 stateVars 中定义 |
| 9 | `worldContext` 关键词数组 | 8 个关键词 `["末世方舟","丧尸","避难所","啃食者","枯萎病","物资搜索","凛冬","焦土市"]`（L22） | 退化为 `[worldBg]` 单元素数组（[index.html](file:///d:/BC/qmzz/index.html) L24623） | **严重** | normalize 丢弃 + schema 未定义 | Prompt 要求 worldContext 数组；normalize 保留；buildCustomChapterConfig L24623 改为读取 scriptData.worldContext |
| 10 | `loreEntries` 数量与字数 | gameWorldInfo 共 30 条（[data/game-world-info.js](file:///d:/BC/qmzz/data/game-world-info.js)），单条 200-500 字 | basic ≤5 / medium ≤10 / advanced ≤15（[index.html](file:///d:/BC/qmzz/index.html) L23660-L23662），单条 80-300 字 | **中等** | Prompt 部分要求 + validate 不校验字数 | advanced 档 loreEntries 上限提升至 20；validate 校验单条 content 字数 >= 100 |
| 11 | `npcs` 数量 | 第一章 4 个（linshen/suqing/laozhou/xiaolu） | basic 2-4 / medium 3-6 / advanced 5-8（L23638-L23652） | **轻微** | — | 数量基本对齐，无需调整 |
| 12 | `npcs[i].description` 字数 | 80-120 字（[data/characters.js](file:///d:/BC/qmzz/data/characters.js) L9/L19/L29/L39） | 内联 Prompt 未明确字数 | **中等** | Prompt 未明确字数 + validate 不校验 | Prompt 模板明确 advanced 档 >= 100 字；validate 校验 >= 50 字 |
| 13 | `npcs[i].personality` 字数 | 60-100 字 | 内联 Prompt 未明确字数 | **中等** | Prompt 未明确字数 + validate 不校验 | 同上 |
| 14 | `npcs[i].firstMessage` 字数 | 80-150 字 | 内联 Prompt 未明确字数 | **中等** | Prompt 未明确字数 + validate 不校验 | 同上 |
| 15 | `openingScene` 字数 | 350-400 字（L15-L21，含环境描写+前情提要+第一个事件信号） | basic 1-3 句 / medium 150-300 字 / advanced 250-500 字（L23638-L23652） | **轻微** | — | advanced 档基本对齐 |
| 16 | `npcRelationships` 关系网深度 | 官方第一章未用此字段（关系通过 `playerDesc` 自然语言 + `choices.impact` 中 `suqing+15/laozhou+5` 隐式表达） | basic 1-3 / medium 2-4 / advanced 3-5 条（按 data 版 Prompt） | **中等** | 设计模式不匹配 | Prompt 改为要求"通过 choices.impact 隐式表达好感度"模式，与官方对齐 |
| 17 | 倒计时机制（daysRemaining） | 30 天倒计时，12 个时间线事件按 D-28~D-0 锚定（L33-L45） | 无 | **缺失** | Prompt 未要求 + normalize 丢弃 + schema 未定义 | Prompt 要求声明 countdownDays 与 timelineEvents 锚点；normalize 保留；schema 添加字段 |
| 18 | 多结局触发逻辑 | 4 个终局事件，含组合条件（如 `unity>60 且 foodDays>30` 触发"凛冬之灯"） | 无 | **缺失** | Prompt 未要求 + normalize 丢弃 + schema 未定义 | Prompt 要求 endingEvents 数组，每个含 trigger 组合条件；normalize 保留 |
| 19 | `events` 结构（嵌套 vs 扁平） | `events.timelineEvents/thresholdEvents/randomEvents/endingEvents` 四类嵌套（L79-L387） | 扁平 `events` 数组（含 name/conditions/actions/once/priority/cooldown） | **严重** | Prompt 设计错配 + normalize 降级 | Prompt 模板重写为四类嵌套；normalize 保留四类子结构不降级 |
| 20 | `metadata.tags` 数量 | 4 个（`["末日","生存","策略","丧尸"]`，L23） | data 版 basic 2-3 / medium 2-4 / advanced 3-5；内联版未明确 | **轻微** | — | 基本对齐 |
| 21 | NPC 称呼规则 | playerDesc 明确"用玩家输入名，「队长」备用，禁用「管理者」"（L28） | 无 | **缺失** | Prompt 未要求 | Prompt 模板在 playerDesc 四段式中嵌入"NPC 称呼规则"段 |
| 22 | 信息呈现方式 | playerDesc 明确"以对讲机通讯、避难所账簿、巡逻日志、居民请愿书和旁白形式推进"（L28） | 无 | **缺失** | Prompt 未要求 | Prompt 模板在 playerDesc 四段式中嵌入"信息呈现方式"段 |
| 23 | 语言风格基调 | playerDesc 明确"物资压力、人性灰色、生存至上，但仍有微光"（L66） | 无 | **缺失** | Prompt 未要求 | Prompt 模板在 playerDesc 四段式中嵌入"语言风格"段 |

## 差距等级统计

| 等级 | 数量 | 占比 |
|---|---|---|
| 缺失 | 13 | 57% |
| 严重 | 3 | 13% |
| 中等 | 6 | 26% |
| 轻微 | 3 | 13% |
| **合计** | **23** | 100% |

## 根因分类统计（同一维度可能多个根因）

| 根因 | 受影响维度数 | 受影响字段 |
|---|---|---|
| Prompt 未要求 | 16 | playerDesc 字数/结构、stateVars、timelineEvents、thresholdEvents、randomEvents、endingEvents、worldContext、NPC 称呼规则、信息呈现方式、语言风格、countdownDays、多结局、NPC description 字数、NPC personality 字数、NPC firstMessage 字数 |
| normalize 丢弃 | 9 | stateVars、timelineEvents、thresholdEvents、randomEvents、endingEvents、choices.impact、worldContext、events 嵌套结构、countdownDays |
| validate 不校验 | 14 | playerDesc 字数/结构、stateVars、timelineEvents、thresholdEvents、randomEvents、endingEvents、choices.impact、loreEntries 字数、NPC description/personality/firstMessage 字数、openingScene 字数、metadata 字段合法性 |
| schema 未定义 | 8 | stateVars、timelineEvents、thresholdEvents、randomEvents、endingEvents、worldContext、countdownDays、多结局 |

## 关键发现

1. **23 个维度中 13 个为"缺失"**：AI 生成剧本缺少的不仅是字段，而是整个"剧情骨架"层——状态变量、四类事件嵌套、多结局、倒计时、主控文档式 playerDesc。
2. **根因 A（Prompt 未要求）影响最广**：16 个维度受影响，是首要修复目标。
3. **根因 B（normalize 丢弃）是数据流瓶颈**：即使 Prompt 要求了字段，normalize 也会丢弃 9 个核心字段，导致"AI 输出了但编辑器收不到"。
4. **根因 C（validate 不校验）是质量底线缺失**：14 个维度无校验，AI 输出空数组或 1 字符字段即可通过。
5. **根因 D（schema 未定义）是设计层缺失**：[data/script-data-schema-v2.js](file:///d:/BC/qmzz/data/script-data-schema-v2.js) 仅定义了 7 个顶层键，未声明 stateVars/worldContext/四类 events 等字段，导致 normalize/validate/UI 都没有参考标准。
