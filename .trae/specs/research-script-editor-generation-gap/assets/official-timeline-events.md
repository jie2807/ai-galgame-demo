# 官方 timelineEvents 结构示例摘录

> 源文件：[data/game-chapters.js](file:///d:/BC/qmzz/data/game-chapters.js) L80-L200
> 章节：第一章 `废墟之弈`（id=1）
> 字段：`events.timelineEvents`
> 数量：12 个（D-28 ~ D-0）

## 一、字段结构概览

每个 timelineEvent 的字段结构：

| 字段 | 类型 | 说明 |
|---|---|---|
| `trigger` | Object | 触发条件对象，含 `daysRemaining` 数值键 |
| `trigger.daysRemaining` | number | 距凛冬剩余天数（D-28 即 daysRemaining=28） |
| `eventName` | string | 事件名称（如"西围墙加固"） |
| `description` | string | 事件描述（150-300 字，含 NPC 对话与环境描写） |
| `choices` | Array<{text, impact}> | 玩家可选项数组（通常 3-4 个） |
| `choices[i].text` | string | 选项文案 |
| `choices[i].impact` | string | 状态变量增减指令字符串（如 `population-0, foodDays-2, infectionThreat-15, morale+5`） |

## 二、timelineEvents[0] 完整结构（L81-L90，D-28 西围墙加固）

```javascript
{
    trigger: { daysRemaining: 28 },
    eventName: "西围墙加固",
    description: "小鹿从西围墙侦察哨跑回来，气喘吁吁：啃食者聚集规模从四十只涨到七十只，且开始有了「试探性冲撞」。西围墙由废弃集装箱和水泥块堆成，扛不住持续冲击。林深说：「加固围墙至少要十二人干两天。」苏晴反驳：「出去搜索也缺人。」老周在角落擦枪，没说话。",
    choices: [
        { text: "调派人力全力加固围墙", impact: "population-0, foodDays-2, infectionThreat-15, morale+5" },
        { text: "主动出击驱散啃食者群", impact: "ammo-40, infectionThreat-20, population-3, morale+10" },
        { text: "撤离西部居民，收缩防线", impact: "unity-10, infectionThreat-5, morale-10" }
    ]
}
```

## 三、timelineEvents[1] 完整结构（L91-L100，D-24 老陈的账簿）

```javascript
{
    trigger: { daysRemaining: 24 },
    eventName: "老陈的账簿",
    description: "苏晴深夜敲开你的门，递上一张地图：「老陈出事那天，他带着半本账簿——上面记着军火库的暗道、神罚派的水井位置、还有一笔」南边港口有船「的备注。我想带人回去取。」她眼圈发红，「我知道那条路危险，但账簿不能丢。」林深反对：「为了一本账赔上人命不值。」老周沉默。",
    choices: [
        { text: "同意并亲自陪同前往", impact: "suqing+15, unity+10, infectionThreat+5, population-1(风险)" },
        { text: "派苏晴带队前往，你留守", impact: "suqing+5, foodDays+3, population-2(风险)" },
        { text: "拒绝，保全活人优先", impact: "suqing-15, unity-5, morale+5(安全)" }
    ]
}
```

## 四、timelineEvents[2] 完整结构（L101-L110，D-21 神罚派传教士）

```javascript
{
    trigger: { daysRemaining: 21 },
    eventName: "神罚派传教士",
    description: "三个穿黑袍的人出现在避难区东街，为首的是个喉结上有刀疤的中年男人，自称「神罚派兄弟」。他递上一袋玉米面：「我们神父说，信仰可以换粮食。让你们的人来圣殿听一次布道，每户五斤玉米面。」小鹿偷偷告诉你，她看见黑袍下露出十字架形状的刺青。林深皱眉：「这是趁火打劫。」老周冷笑：「信仰比子弹便宜。」",
    choices: [
        { text: "接受传教士入驻，换取物资", impact: "foodDays+5, morale-5, externalRelation+10, unity-5" },
        { text: "礼貌谢绝，保持独立", impact: "externalRelation+5, unity+5, foodDays+0" },
        { text: "驱逐并没收其物资", impact: "foodDays+3, externalRelation-20, unity+10, morale+5" }
    ]
}
```

## 五、12 个时间线事件清单（D-28 ~ D-0）

| # | daysRemaining | eventName | 选项数 | impact 引用的状态变量 |
|---|---|---|---|---|
| 1 | 28 | 西围墙加固 | 3 | population/foodDays/infectionThreat/morale/ammo/unity |
| 2 | 24 | 老陈的账簿 | 3 | suqing/unity/infectionThreat/population/foodDays/morale |
| 3 | 21 | 神罚派传教士 | 3 | foodDays/morale/externalRelation/unity |
| 4 | 18 | 医疗站库存告急 | 3 | population/foodDays/ammo/externalRelation/morale/unity |
| 5 | 14 | 鸽派与鹰派 | 3 | population/foodDays/unity/morale |
| 6 | 10 | 老周的撤离提议 | 3 | laozhou/unity/morale（含"开启逃亡分支"叙事标记） |
| 7 | 7 | 神秘信号 | 3 | arkContact/externalRelation/infectionThreat/morale |
| 8 | 5 | 军火库商队 | 3 | ammo/foodDays/externalRelation/population/unity |
| 9 | 3 | 大规模围攻预警 | 4 | arkContact/externalRelation/foodDays/ammo/population/morale/unity（含"开启XX分支"叙事标记） |
| 10 | 2 | 苏晴的告白 | 3 | suqing/unity/morale |
| 11 | 1 | 凛冬前夜 | 3 | foodDays/morale/unity/population/ammo |
| 12 | 0 | 凛冬降临 | 1 | 终局判定（根据累计状态变量触发 endingEvents） |

## 六、impact 字符串格式规范

impact 字符串是逗号分隔的"状态变量增减指令"，格式为 `<变量名><+/-><数值>`，例如：

- `population-0`：人口不变
- `foodDays-2`：食物库存减 2 天
- `infectionThreat-15`：感染者威胁度减 15
- `morale+5`：士气加 5
- `suqing+15`：苏晴好感度加 15（NPC 好感度用 NPC 名作变量名）
- `population-1(风险)`：人口减 1，但有风险（括号内为风险说明，非数值）
- `开启逃亡分支`：纯叙事标记，无数值影响

**运行时消费**：impact 字符串由 AI 在叙事时解读（因为 playerDesc 中的"【AI需跟踪状态】"段落已告知 AI 需跟踪这些变量），代码层并未解析 impact 字符串。这是"主控文档模式"的体现——状态机逻辑编码在 system prompt 文本中，由 AI 充当运行时引擎。

## 七、与 AI 生成 events 的对比

| 维度 | 官方 timelineEvents | AI 生成 events（按内联 Prompt） | 差距 |
|---|---|---|---|
| 数量 | 12 个 | basic ≤3 / medium ≤8 / advanced ≤12 | 数量接近（advanced 档） |
| 结构 | `trigger.daysRemaining`/`eventName`/`description`/`choices[{text, impact}]` | `name`/`conditions`/`actions`/`once`/`priority`/`cooldown` | 结构完全不兼容 |
| 触发条件 | 数值触发器（如 `daysRemaining: 28`） | 关键词触发器（`conditions: [{type:'keyword', value:...}]`） | 倒计时机制丢失 |
| 选项 impact | 状态变量增减指令字符串（如 `population-2, foodDays+3`） | 无（normalize L23366-L23382 未处理 choices 字段） | 状态变量增减逻辑丢失 |
| description 字数 | 150-300 字（含 NPC 对话） | 内联 Prompt 未明确字数要求 | 通常 50-100 字 |
| choices 数量 | 3-4 个 | 内联 Prompt 未明确 | 通常 2-3 个 |
| 倒计时锚点 | D-28/D-24/.../D-0 共 12 个固定锚点 | 无 | 剧情节奏感缺失 |
| 多结局触发 | timelineEvents[11]（D-0）的 choices[0].impact="终局判定"，触发 endingEvents | 无 endingEvents 字段 | 多结局能力缺失 |

## 八、改进方向

1. **Prompt 模板重写**：要求 AI 输出 `events.timelineEvents` 嵌套结构，含 `trigger.daysRemaining`/`eventName`/`description`/`choices[{text, impact}]` 字段
2. **normalize 扩展**：保留 `events.timelineEvents/thresholdEvents/randomEvents/endingEvents` 四类嵌套结构，不降级为扁平数组
3. **validate 扩展**：校验 `timelineEvents[i].choices[j].impact` 引用的状态变量在 `stateVars` 中定义（或在 NPC 名字范围内）
4. **运行时消费**：SimpleChatEngine 在 system prompt 中注入"当前 daysRemaining=X，已触发/未触发的 timelineEvents 清单"，让 AI 按 daysRemaining 推进剧情
5. **UI 扩展**：编辑器增加 timelineEvents 编辑卡片，支持可视化添加/编辑事件
