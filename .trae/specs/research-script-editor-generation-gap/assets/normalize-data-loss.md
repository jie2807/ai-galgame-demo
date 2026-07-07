# normalizeGeneratedScript 数据丢失点摘录

> 源文件：[index.html](file:///d:/BC/qmzz/index.html) L23333-L23458
> 函数签名：`function normalizeGeneratedScript(scriptData)`
> 作用：把 `extractJSON` 解析出的原始 AI 输出（扁平结构）转换为编辑器/Schema 期望的 `worldSettings/characters/scriptConfig` 嵌套结构，写入 `loadImportedScript`。

## 一、函数完整返回结构（L23426-L23457）

```javascript
return {
    metadata: {
        title: (scriptData.metadata && scriptData.metadata.title) || scriptData.title || '生成的剧本',
        author: (scriptData.metadata && scriptData.metadata.author) || scriptData.author || 'AI 生成',
        tags: (scriptData.metadata && Array.isArray(scriptData.metadata.tags)) ? scriptData.metadata.tags.slice(0, 8) : (Array.isArray(scriptData.tags) ? scriptData.tags.slice(0, 8) : []),
        narrativePerspective: perspectiveBtn ? perspectiveBtn.getAttribute('data-perspective') : 'third_person',
        uncertaintyLevel: uncertaintyBtn ? uncertaintyBtn.getAttribute('data-level') : 'medium',
        enableDice: diceCheckbox ? diceCheckbox.checked : false,
        defaultDice: diceSelect ? diceSelect.value : '20'
    },
    worldSettings: {
        background: worldBg,
        events: events,
        locations: scriptData.locationEntries || scriptData.locations || [],
        loreEntries: scriptData.loreEntries || []
    },
    characters: {
        player: {
            name: scriptData.playerName || (scriptData.player && scriptData.player.name) || '',
            title: scriptData.playerTitle || (scriptData.player && scriptData.player.title) || '',
            description: scriptData.playerDesc || (scriptData.player && scriptData.player.description) || ''
        },
        npcs: npcs
    },
    scriptConfig: { openingScene: scriptData.openingScene || (npcs[0] && npcs[0].firstMessage) || worldBg || '故事即将展开...' },
    items: items,
    quickReplies: quickReplies,
    emotionMappings: scriptData.emotionMappings || [],
    npcRelationships: relations,
    bgmMap: scriptData.bgmMap || {},
    achievements: scriptData.achievements || []
};
```

## 二、未映射（直接丢弃）的官方剧本核心字段

下表逐字段标注：官方 [data/game-chapters.js](file:///d:/BC/qmzz/data/game-chapters.js) 第一章（id=1）使用了哪些字段，normalizeGeneratedScript 是否处理。

| 官方字段 | 官方典型值 | normalize 是否处理 | 丢失原因 |
|---|---|---|---|
| `stateVars` | 10 个状态变量数组（population/foodDays/waterDays/ammo/infectionThreat/unity/externalRelation/daysRemaining/morale/arkContact） | **完全丢弃** | 返回对象中无 `stateVars` 键；内联 Prompt 也未要求 |
| `events.timelineEvents` | 12 个时间线事件（D-28 ~ D-0），含 `trigger.daysRemaining`/`eventName`/`description`/`choices[{text, impact}]` | **完全丢弃** | L23366 仅遍历 `scriptData.events` 数组，未识别 `timelineEvents` 子键 |
| `events.thresholdEvents` | 8 个阈值事件（食物<7/水<5/弹药<10/感染>80/团结<30/士气<20/对外<20/人口>500） | **完全丢弃** | 同上 |
| `events.randomEvents` | 8 个随机事件，含 `probability` 字段 | **完全丢弃** | 同上 |
| `events.endingEvents` | 4 个终局事件（凛冬之灯/陷落之夜/铁笼之约/方舟之外） | **完全丢弃** | 同上 |
| `worldContext` | 8 个关键词数组 `["末世方舟","丧尸","避难所","啃食者","枯萎病","物资搜索","凛冬","焦土市"]` | **完全丢弃** | 返回对象中无 `worldContext` 键；后续 `buildCustomChapterConfig` L24623 用 `worldBg ? [worldBg] : []` 伪造单元素数组 |
| `npcs` 单条 `firstMessage` 字数 | 80-150 字（见 [data/characters.js](file:///d:/BC/qmzz/data/characters.js) linshen/suqing/laozhou/xiaolu） | 保留但无字数校验 | L23356 `firstMessage: npc.firstMessage \|\| ''` |
| `npcs` 单条 `description` 字数 | 80-120 字 | 保留但无字数校验 | L23353 |
| `npcs` 单条 `personality` 字数 | 60-100 字 | 保留但无字数校验 | L23354 |
| `playerDesc` 字数 | 1500-2000 字（剧本主控文档） | 保留为 `characters.player.description`，但 UI 输入框 `customPlayerDesc` rows=2，且无字数校验 | L23446；UI 限制见 [index.html](file:///d:/BC/qmzz/index.html) L8699 |
| `openingScene` 字数 | 350-400 字 | 保留但无字数校验 | L23450 |

## 三、events 数组的"语义降级"问题（L23366-L23382）

normalize 对 `scriptData.events` 的处理逻辑：

```javascript
var events = (scriptData.events || []).map(function(evt) {
    var actions = evt.actions || [];
    if (!actions.length && evt.description) {
        actions.push({ type: 'narration', content: evt.description });
    }
    if (evt.effects && typeof evt.effects === 'object' && Object.keys(evt.effects).length > 0) {
        actions.push({ type: 'effect', content: JSON.stringify(evt.effects) });
    }
    return {
        name: evt.name || '',
        conditions: evt.conditions || (evt.triggerCondition ? [{ type: 'keyword', value: evt.triggerCondition }] : []),
        actions: actions,
        once: evt.once || false,
        priority: evt.priority || 1,
        cooldown: evt.cooldown || 0
    };
});
```

**问题点**：
1. **结构错配**：内联 Prompt（[index.html](file:///d:/BC/qmzz/index.html) L23638-L23652）让 AI 输出扁平 `events` 数组（含 `name/conditions/actions/once/priority` 字段），但官方剧本 [game-chapters.js](file:///d:/BC/qmzz/data/game-chapters.js) L79-L387 使用 `events.timelineEvents/thresholdEvents/randomEvents/endingEvents` 四类嵌套结构。两套结构完全不兼容。
2. **触发条件退化**：官方 `timelineEvents[i].trigger = { daysRemaining: 28 }`（数值触发器）被降级为 `conditions: [{ type: 'keyword', value: ... }]`（关键词触发器），倒计时机制丢失。
3. **选项 impact 丢失**：官方 `choices[i].impact = "population-0, foodDays-2, infectionThreat-15, morale+5"` 是状态变量增减指令字符串，normalize 完全未处理 choices 字段。
4. **probability 丢失**：官方 `randomEvents[i].probability = 0.25`，normalize 未保留。

## 四、quickReplies 字段重命名导致的弱化（L23404-L23409）

```javascript
var quickReplies = (scriptData.quickReplies || []).map(function(qr) {
    if (qr.replies) {
        return { replies: qr.replies, condition: qr.condition || 'always', conditionValue: qr.conditionValue || '' };
    }
    return { replies: qr.text ? [qr.text] : [], condition: qr.condition || 'always', conditionValue: qr.conditionValue || '', mode: qr.mode || 'say' };
});
```

**问题点**：data 版 Prompt 要求 `quickReplies: [{text, mode}]`，内联版要求 `quickReplies` 数组但未明确字段。normalize 同时兼容 `qr.replies` 与 `qr.text` 两种格式，但官方 [game-chapters.js](file:///d:/BC/qmzz/data/game-chapters.js) 并未使用 `quickReplies` 字段（用 `events.timelineEvents[i].choices` 替代），所以这条仅是格式兼容层，不构成主控文档能力。

## 五、npcRelationships 字段重命名（L23411-L23419）

```javascript
var relations = (scriptData.npcRelationships || []).map(function(rel) {
    return {
        sourceNpcId: npcNameToId[rel.fromNpc] || rel.sourceNpcId || '',
        targetNpcId: npcNameToId[rel.toNpc] || rel.targetNpcId || '',
        type: rel.relation || rel.type || 'friend',
        affection: rel.intimacy !== undefined ? rel.intimacy : (rel.affection !== undefined ? rel.affection : 50),
        description: rel.description || ''
    };
});
```

**问题点**：data 版 Prompt 要求 `fromNpc/toNpc/relation/intimacy`，normalize 转换为 `sourceNpcId/targetNpcId/type/affection`。这是字段映射层，能力保留，但官方 [game-chapters.js](file:///d:/BC/qmzz/data/game-chapters.js) 第一章未定义 `npcRelationships`（关系通过 `playerDesc` 自然语言描述 + `choices.impact` 中的 `suqing+15/laozhou+5` 隐式表达），所以 AI 输出的关系网与官方"通过选项 impact 隐式表达好感度"模式不一致。

## 六、保留但 UI 不消费的字段

| 字段 | normalize 是否保留 | UI/运行时是否消费 | 备注 |
|---|---|---|---|
| `emotionMappings` | 保留（L23453 直传） | 部分（聊天时按关键词映射 BGM/立绘表情） | AI 可能不输出（内联 Prompt 未要求） |
| `bgmMap` | 保留（L23455 直传） | 部分（按地点/情绪切歌） | 同上 |
| `achievements` | 保留（L23456 直传） | 未消费 | 编辑器无 UI |

## 七、结论

normalizeGeneratedScript 的设计假设是"AI 输出扁平结构 → 转换为 Schema 嵌套结构"，但该假设与官方剧本的"主控文档 + 四类事件嵌套 + 状态变量"模式完全错位。即使 AI 完美按 Prompt 输出，normalize 也会丢弃 `stateVars`、`worldContext`、四类 `events` 子结构、`choices.impact`、`probability` 等所有"剧情骨架"字段，仅保留 NPC/物品/快捷回复等"角色皮肤"字段。这是 AI 生成剧本质量远低于官方的核心数据流根因。
