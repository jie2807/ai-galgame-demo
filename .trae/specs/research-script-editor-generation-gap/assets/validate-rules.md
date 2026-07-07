# validateScriptData 校验规则摘录

> 源文件：[index.html](file:///d:/BC/qmzz/index.html) L22615-L22644
> 函数签名：`function validateScriptData(data)`
> 作用：在 `CustomScriptGenerator.validate`（L23753-L23757）中被调用，对 normalize 后的剧本数据进行最低门槛校验；任一项失败则抛 `ValidationError`，整个生成流程终止。

## 一、完整代码（L22615-L22644）

```javascript
function validateScriptData(data) {
    if (!data.version || (data.version !== '1.0' && data.version !== '2.0')) {
        return { valid: false, error: '剧本版本不兼容，当前支持版本 1.0 和 2.0' };
    }

    if (!data.metadata || !data.metadata.title) {
        return { valid: false, error: '缺少必需字段：metadata.title' };
    }

    if (!data.characters || !data.characters.npcs) {
        return { valid: false, error: '缺少必需字段：characters.npcs' };
    }

    if (!Array.isArray(data.characters.npcs) || data.characters.npcs.length === 0) {
        return { valid: false, error: 'NPC列表为空，至少需要一个NPC' };
    }

    for (var i = 0; i < data.characters.npcs.length; i++) {
        var npc = data.characters.npcs[i];
        if (!npc.name) {
            return { valid: false, error: 'NPC #' + (i+1) + ' 缺少 name 字段' };
        }
    }

    if (!data.scriptConfig || !data.scriptConfig.openingScene) {
        return { valid: false, error: '缺少必需字段：scriptConfig.openingScene' };
    }

    return { valid: true };
}
```

## 二、实际校验项清单（共 5 项）

| # | 校验项 | 失败错误信息 | 备注 |
|---|---|---|---|
| 1 | `data.version` 必须是 `'1.0'` 或 `'2.0'` | 剧本版本不兼容，当前支持版本 1.0 和 2.0 | normalize 在 L23754 强制赋值 `normalized.version = '2.0'`，所以此项实际永远不会失败 |
| 2 | `data.metadata.title` 必须存在 | 缺少必需字段：metadata.title | 仅校验存在性，不校验长度/字符 |
| 3 | `data.characters.npcs` 必须存在 | 缺少必需字段：characters.npcs | 仅校验键存在 |
| 4 | `data.characters.npcs` 必须是非空数组 | NPC列表为空，至少需要一个NPC | 至少 1 个 NPC 即可，无上限校验 |
| 5 | 每个 NPC 必须有 `name` 字段 | NPC #N 缺少 name 字段 | 不校验 `title/description/personality/firstMessage/gender` |
| 6 | `data.scriptConfig.openingScene` 必须存在 | 缺少必需字段：scriptConfig.openingScene | 仅校验存在性，不校验字数 |

## 三、未校验项清单（缺失校验）

### 3.1 字段存在性未校验

| 字段 | 官方典型值 | 不校验的影响 |
|---|---|---|
| `stateVars` | 10 个状态变量数组 | AI 完全可以不输出，生成的剧本无任何状态跟踪能力 |
| `events.timelineEvents` | 12 个时间线事件 | AI 输出空数组即可通过校验，剧本无剧情骨架 |
| `events.thresholdEvents` | 8 个阈值事件 | 同上 |
| `events.randomEvents` | 8 个随机事件 | 同上 |
| `events.endingEvents` | 4 个终局事件 | 多结局能力完全缺失 |
| `worldContext` | 8 个关键词数组 | worldContext 退化为 `[worldBg]` 单元素数组（L24623） |
| `loreEntries` | 30 条 | 即使为空也通过校验，世界设定单薄 |
| `items` | 数个道具 | 即使为空也通过校验 |
| `quickReplies` | 数个快捷回复 | 即使为空也通过校验 |
| `npcRelationships` | 关系网 | 即使为空也通过校验，NPC 间无冲突张力 |
| `emotionMappings` | 6-10 条 | 即使为空也通过校验，立绘表情无切换 |
| `bgmMap` | 7 个键 | 即使为空也通过校验，BGM 不切换 |
| `metadata.author` | 作者名 | 即使缺失也通过校验 |
| `metadata.tags` | 2-5 个标签 | 即使为空也通过校验 |
| `metadata.narrativePerspective` | `'third_person'` 或 `'first_person'` | normalize 默认 `'third_person'`，但 validate 未校验值合法性 |
| `metadata.uncertaintyLevel` | `'low'`/`'medium'`/`'high'` | 同上 |
| `scriptConfig.initialLocation` | 初始地点 ID | 未校验，但官方 [data/script-data-schema-v2.js](file:///d:/BC/qmzz/data/script-data-schema-v2.js) L29 已定义 |

### 3.2 字段内容深度未校验

| 字段 | 官方典型深度 | validate 未做的事 |
|---|---|---|
| `playerDesc` | 1500-2000 字（含 AI 叙事指令/状态跟踪/事件系统/语言风格四段） | 不校验字数、不校验四段式结构、不校验是否含状态变量清单 |
| `npcs[i].description` | 80-120 字 | 不校验字数 |
| `npcs[i].personality` | 60-100 字 | 不校验字数 |
| `npcs[i].firstMessage` | 80-150 字 | 不校验字数 |
| `npcs[i].gender` | `'male'`/`'female'` | 不校验枚举值（normalize L23340 用 `inferNpcGender` 兜底推断） |
| `openingScene` | 350-400 字 | 不校验字数，1 个字也能通过 |
| `worldBg` | 200-800 字 | 不校验字数 |
| `loreEntries[i].content` | 100-300 字 | 不校验字数 |
| `events[i].choices[j].impact` | 状态变量增减指令字符串（如 `population-2, foodDays+3`） | 不校验 impact 字段，不校验状态变量名是否在 `stateVars` 中定义 |
| `events[i].probability` | 0-1 之间的浮点数 | 不校验数值范围 |

### 3.3 字段间一致性未校验

| 一致性约束 | 官方做法 | validate 未做的事 |
|---|---|---|
| `events.timelineEvents[i].choices[j].impact` 引用的状态变量必须在 `stateVars` 中定义 | 第一章 impact 引用 `population/foodDays/waterDays/ammo/infectionThreat/unity/externalRelation/daysRemaining/morale/arkContact/suqing/laozhou`，全部在 stateVars 或 NPC 好感度范围内 | 不校验 |
| `events.endingEvents[i].trigger` 引用的状态变量必须在 `stateVars` 中定义 | 第一章 endingEvents 触发条件 `unity>60/foodDays>30/unity<30/infectionThreat>80/externalRelation>50/warlordAlly/arkContact>50` 全部对齐 | 不校验 |
| `npcs` 数组中 `name` 不能重复 | 第一章 4 个 NPC 名字唯一 | 不校验 |
| `npcs[i].id` 必须唯一 | normalize L23349 自动生成 `custom_npc_` + idx，所以此项隐式满足 | 隐式满足 |
| `quickReplies[i].condition` 必须是合法枚举 | 应为 `'always'`/`'affection'`/`'location'` 等 | 不校验 |
| `metadata.narrativePerspective` 与 `scriptConfig.openingScene` 人称一致 | 第一人称章节开场白应为第一人称 | 不校验 |

## 四、校验过松的连锁后果

1. **AI 生成 1 个 NPC + 1 句开场白即可通过校验**：validate 不校验字数，AI 输出 `{title:"x", npcs:[{name:"a"}], openingScene:"b"}` 即可通过，但这样的剧本实际无法游玩。
2. **stateVars 缺失 → 运行时无法跟踪状态**：SimpleChatEngine 在 [index.html](file:///d:/BC/qmzz/index.html) L11662-L11760 构建 system prompt 时，未引用 `stateVars`，所以即使 normalize 保留了 stateVars，运行时也不会消费。但官方 [game-chapters.js](file:///d:/BC/qmzz/data/game-chapters.js) 第一章通过 `playerDesc` 文本中的"【AI需跟踪状态】"段落把状态变量清单塞给 AI，绕过了 stateVars 字段。这是官方的"主控文档"模式。
3. **events 缺失 → 剧情无骨架**：AI 输出空 `events` 数组即可通过校验，但这样的剧本只是"角色扮演聊天"，没有任何剧情推进力。
4. **impact 字段不校验 → 状态变量增减逻辑断裂**：AI 输出的 impact 字符串可能引用未定义的状态变量（如 `health-10` 但 stateVars 中无 `health`），运行时静默失败。

## 五、与 normalize 的依赖关系

validate 在 normalize 之后调用（见 [index.html](file:///d:/BC/qmzz/index.html) L23753-L23757 `CustomScriptGenerator.validate`）：

```javascript
validate: function(normalized) {
    normalized.version = '2.0';
    var result = validateScriptData(normalized);
    if (!result.valid) throw new ValidationError(result.error);
}
```

这意味着 validate 校验的是 normalize 后的嵌套结构，而 normalize 已经丢弃了 `stateVars/worldContext/timelineEvents/thresholdEvents/randomEvents/endingEvents`，所以即使 validate 想校验这些字段也无字段可校验。**根因 B（normalize 丢失）与根因 C（validate 过松）存在依赖：必须先扩展 normalize 保留字段，才能扩展 validate 校验字段**。
