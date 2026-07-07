# 剧本系统深度改造 Spec（对标 Omnimundia 平台）

## Why
对标 Omnimundia（全民世界）AI 互动文字游戏平台的核心能力，发现我们项目的剧本系统在「世界树存档分支」「剧本发现与分享」「剧本创作自由度」「动态世界事件」「对话引擎智能化」五个维度存在显著差距。需要系统性改造，使剧本系统从"单线硬编码"进化为"多线可扩展的互动叙事平台"。

## What Changes
- **ADDED** 世界树存档分支系统：支持从任意存档点分叉新世界线，可视化世界树结构
- **ADDED** 剧本发现与分类系统：剧本标签、分类筛选、排序（热门/最新/推荐）、封面图、作者信息
- **ADDED** 剧本创作自由度提升：NPC 数量上限从 3 提升到 10、自定义物品库、自定义事件触发器、叙事视角选择、内置骰子系统
- **ADDED** 动态世界事件引擎：基于条件的自动事件触发系统（好感度/地点/时间/关键词/状态）
- **MODIFIED** 对话引擎智能化：对话摘要、语义 Lorebook 匹配、智能时间推进、增强地点检测
- **MODIFIED** 剧本数据模型：标准化数据结构、版本迁移、剧本编辑（创建后可修改）
- **MODIFIED** 剧本导入导出：增强格式规范、缩略图、预览信息
- **MODIFIED** 自定义剧本 UI：剧本卡片视觉升级、剧本编辑器增强

## Impact
- 受影响能力：剧本创建/编辑、剧本游玩引擎、存档系统、Lorebook、世界状态、NPC 系统、导入导出
- 受影响代码：
  - `index.html` 内嵌 `SimpleChatEngine`、`gameState`、`gameChapters`、`gameCharacters`、`gameWorldInfo` 等（约 6000 行）
  - `index.html` 自定义剧本编辑器 HTML 结构（约 200 行）
  - `index.html` 导入导出逻辑（约 200 行）
  - `index.html` 存档系统（约 200 行）
  - `styles.css` / `pages/custom-chapter/custom-chapter.css` 剧本相关样式

## 对标分析：Omnimundia vs 我们

### Omnimundia 核心特性

| 特性 | Omnimundia | 我们当前 | 差距 |
|------|-----------|---------|------|
| 世界树存档 | ✅ 多世界线分支，从任意存档继续推演 | ❌ 仅 5 个独立存档槽，无分支 | 严重 |
| 剧本发现 | ✅ 54+ 页剧本列表，标签/分类/排序 | ❌ 仅本地自定义剧本列表 | 严重 |
| 剧本封面 | ✅ 每个剧本有封面图 | ❌ 无封面图 | 中等 |
| 作者系统 | ✅ 作者名、作品集 | ❌ 无作者信息 | 中等 |
| 动态世界 | ✅ 数值/关系/成败影响后续故事 | ⚠️ 有好感度/物品/状态，但无事件触发 | 中等 |
| 自由决策 | ✅ 可描述自己想法，非选项式 | ✅ 自由输入 | 持平 |
| 不确定性 | ✅ 决策不一定成功 | ❌ AI 倾向于满足玩家 | 轻微 |
| NPC 数量 | ✅ 无明显上限 | ❌ 最多 3 个 | 严重 |
| 内置骰子 | ✅ 部分剧本支持 | ❌ 无 | 中等 |
| 叙事视角 | ✅ 第一/第三人称可选 | ❌ 固定第三人称 | 轻微 |
| 物品系统 | ✅ 剧本自定义物品 | ❌ 物品库硬编码 | 严重 |
| 事件触发 | ✅ 条件触发剧情事件 | ❌ 无条件事件系统 | 严重 |
| 对话摘要 | ✅ 长期游玩支持 | ❌ 硬截断 20 条 | 中等 |
| 剧本编辑 | ✅ 随时修改 | ❌ 创建后不可编辑 | 中等 |
| 剧本标签 | ✅ 标签分类系统 | ❌ 无标签 | 中等 |

## ADDED Requirements

### Requirement: 世界树存档分支系统
系统 SHALL 提供世界树存档分支能力，使玩家可以从任意存档点分叉出新的世界线，形成树状存档结构。

#### Scenario: 创建世界线分支
- **WHEN** 玩家在某个存档点选择"从此处分叉"
- **THEN** 系统复制该存档点的完整状态（对话历史、世界状态、NPC 好感度、物品、属性）创建新分支
- **THEN** 新分支与原存档独立，互不影响
- **THEN** 原存档保持不变

#### Scenario: 世界树可视化
- **WHEN** 玩家打开存档管理界面
- **THEN** 显示树状存档结构，每个节点显示：存档名、时间、当前章节/NPC
- **THEN** 当前世界线高亮显示
- **THEN** 玩家可以点击任意节点加载该存档
- **THEN** 玩家可以从任意节点创建新分支

#### Scenario: 世界线切换
- **WHEN** 玩家选择切换到另一条世界线
- **THEN** 系统加载该世界线的完整状态
- **THEN** 对话历史正确恢复
- **THEN** 世界状态（地点/天气/时间/健康/物品/属性）正确恢复
- **THEN** NPC 好感度正确恢复

#### Scenario: 自动存档
- **WHEN** 每完成 5 轮对话
- **THEN** 系统自动在当前世界线创建自动存档节点
- **THEN** 自动存档节点标记为"自动"
- **THEN** 同一世界线保留最近 10 个自动存档

### Requirement: 剧本发现与分类系统
系统 SHALL 提供剧本发现与分类能力，使玩家可以按标签、分类、排序方式浏览和筛选剧本。

#### Scenario: 剧本标签系统
- **WHEN** 创建或编辑剧本时
- **THEN** 可以为剧本添加标签（如：奇幻、科幻、恋爱、冒险、末日等）
- **THEN** 标签从预设标签列表中选择，也支持自定义标签
- **THEN** 每个剧本最多 8 个标签

#### Scenario: 剧本列表展示
- **WHEN** 玩家打开剧本列表
- **THEN** 每个剧本卡片显示：封面图、标题、作者、简介（截断 80 字）、标签、NPC 数量
- **THEN** 支持按标签筛选
- **THEN** 支持排序：最近游玩、创建时间、名称
- **THEN** 内置剧本和自定义剧本统一展示

#### Scenario: 剧本封面图
- **WHEN** 创建或编辑剧本时
- **THEN** 可以上传或选择剧本封面图
- **THEN** 封面图显示在剧本卡片上
- **THEN** 未设置封面图时显示默认封面（基于标签生成）

### Requirement: 剧本创作自由度提升
系统 SHALL 大幅提升剧本创作的自由度，包括 NPC 数量、自定义物品库、事件触发器、叙事视角和骰子系统。

#### Scenario: NPC 数量提升
- **WHEN** 在剧本编辑器中添加 NPC
- **THEN** NPC 数量上限从 3 提升到 10
- **THEN** NPC 列表支持拖拽排序
- **THEN** 超过 3 个 NPC 时编辑器显示滚动区域

#### Scenario: 自定义物品库
- **WHEN** 创建或编辑剧本时
- **THEN** 可以定义剧本专属物品库
- **THEN** 每个物品包含：名称、描述、类型（关键/消耗/礼物/材料）、图标、效果
- **THEN** 物品效果支持：属性变化（生命/疲劳/心情/饱食）、好感度变化、状态变化
- **THEN** 自定义物品库替换默认硬编码的 `itemLibrary`

#### Scenario: 叙事视角选择
- **WHEN** 创建或编辑剧本时
- **THEN** 可以选择叙事视角：第一人称 / 第三人称
- **THEN** 选择第一人称时，System Prompt 中的旁白规则调整为第一人称
- **THEN** 选择第三人称时，保持现有旁白规则

#### Scenario: 内置骰子系统
- **WHEN** 剧本启用了骰子选项
- **THEN** 玩家可以在输入框旁点击骰子按钮投掷骰子
- **THEN** 支持标准骰子：d4/d6/d8/d10/d12/d20/d100
- **THEN** 骰子结果显示在对话中，格式如：🎲 [d20] → 15
- **THEN** AI 根据骰子结果调整叙事（高成功/成功/失败/大失败）

#### Scenario: 剧本编辑（创建后可修改）
- **WHEN** 玩家在剧本列表中点击"编辑"
- **THEN** 打开剧本编辑器，加载该剧本的所有配置
- **THEN** 可以修改世界背景、Lorebook、地点、NPC、开场场景等
- **THEN** 保存后更新剧本配置
- **THEN** 已进行的游戏存档不受影响（使用旧配置继续）

### Requirement: 动态世界事件引擎
系统 SHALL 提供基于条件的自动事件触发系统，使剧本世界能够根据玩家行为和状态动态响应。

#### Scenario: 事件定义
- **WHEN** 在剧本编辑器中定义事件
- **THEN** 事件包含：名称、触发条件（可组合）、触发动作、是否一次性、优先级
- **THEN** 触发条件类型：
  - `affection`：指定 NPC 好感度达到阈值
  - `location`：当前地点匹配
  - `time_period`：时间段匹配
  - `message_count`：对话轮数达到
  - `keyword`：对话中出现关键词
  - `player_status`：玩家状态匹配
  - `has_item`：玩家拥有指定物品
  - `attribute`：玩家属性达到阈值
- **THEN** 触发动作类型：
  - `narration`：插入旁白文本
  - `npc_join`：NPC 加入场景
  - `npc_leave`：NPC 离开场景
  - `location_change`：强制地点变更
  - `give_item`：给予玩家物品
  - `attribute_change`：修改玩家属性
  - `weather_change`：变更天气
  - `custom`：自定义提示注入

#### Scenario: 条件事件触发
- **WHEN** 定义了事件：好感度 >= 50 AND 当前地点 = "酒馆" AND 时间段 = "夜晚"
- **AND** 所有条件满足
- **THEN** 自动触发关联的剧情事件
- **THEN** 事件以旁白消息或事件卡片形式呈现
- **THEN** 一次性事件触发后标记为已触发，不重复触发
- **THEN** 可重复事件按冷却时间控制触发频率

#### Scenario: 事件检查时机
- **WHEN** 每次收到 AI 回复后
- **THEN** 系统检查所有未触发的事件条件
- **THEN** 按优先级排序触发满足条件的事件
- **THEN** 同一轮最多触发 2 个事件，避免事件轰炸

### Requirement: 对话引擎智能化
系统 SHALL 升级对话引擎，增加对话摘要、语义 Lorebook 匹配、智能时间推进和增强地点检测。

#### Scenario: 对话摘要
- **WHEN** 对话消息超过 30 条
- **THEN** 系统将最早的 20 条消息压缩为摘要（约 200 字）
- **THEN** 摘要保留：关键剧情事件、NPC 互动要点、地点变化、玩家决策、物品获取/使用
- **THEN** 后续 API 请求使用：system prompt + 摘要 + 最近 10 条消息
- **WHEN** 对话消息超过 60 条
- **THEN** 系统生成第二层摘要，将早期摘要进一步压缩

#### Scenario: 语义 Lorebook 匹配
- **WHEN** Lorebook 条目定义了 `contextTags`（如 ["战斗", "危机"]）
- **THEN** 系统根据最近 3 条消息的内容判断当前上下文标签
- **THEN** 仅注入与当前上下文标签匹配的条目
- **WHEN** 多个 Lorebook 条目匹配
- **THEN** 按优先级权重排序，高优先级条目优先注入
- **THEN** 注入条目总长度不超过 token 预算（默认 1000 token）

#### Scenario: 智能时间推进
- **WHEN** AI 回复中包含时间相关描述
- **THEN** 系统根据描述语义调整时间推进量：
  - 简短对话：推进 5-15 分钟
  - "过了一会儿"：推进 30-60 分钟
  - "天色渐暗"：推进到下一个时间段
  - 无时间描述：默认推进 10-20 分钟
- **THEN** 替代当前的随机 30-90 分钟推进

#### Scenario: 增强地点检测
- **WHEN** AI 回复描述了地点变更
- **THEN** 系统使用多种策略检测：
  - 精确名称匹配
  - 别名匹配（支持定义地点别名）
  - 上下文推断（"离开了X" + "来到了Y"）
- **THEN** 检测到地点变更时更新世界状态
- **THEN** 地点变更时根据新地点重新生成天气

### Requirement: 不确定性系统
系统 SHALL 在剧本中引入不确定性，使 AI 不总是满足玩家意图，增加游戏真实感。

#### Scenario: 行动结果不确定性
- **WHEN** 玩家描述的行动存在风险或难度
- **THEN** System Prompt 中指示 AI 根据行动合理性决定成功/部分成功/失败
- **THEN** 高风险行动（战斗、说服敌对 NPC 等）有更高失败概率
- **THEN** 日常行动（走路、买东西等）几乎总是成功
- **THEN** 剧本作者可以在编辑器中设置"不确定性等级"（低/中/高）

## MODIFIED Requirements

### Requirement: 剧本数据模型标准化
当前剧本数据分散在多个全局变量中，需要统一为标准化的数据模型。

**修改后设计**：
```javascript
{
  version: "2.0",
  metadata: {
    id: "script_xxx",
    title: "剧本标题",
    author: "作者名称",
    description: "剧本简介",
    coverImage: "封面图URL或base64",
    tags: ["奇幻", "冒险"],
    createdAt: "2026-05-30T00:00:00Z",
    updatedAt: "2026-05-30T00:00:00Z",
    uncertaintyLevel: "medium",
    narrativePerspective: "third_person",
    enableDice: false
  },
  worldSettings: {
    background: "世界观背景描述",
    loreEntries: [
      { keys: ["关键词"], content: "设定描述", priority: 1, contextTags: [], trigger: {} }
    ],
    locations: [
      { name: "地点名", description: "描述", aliases: ["别名"], weatherWeights: {} }
    ],
    events: [
      { name: "事件名", conditions: [...], actions: [...], once: true, priority: 1, cooldown: 0 }
    ]
  },
  characters: {
    player: { name: "", title: "", description: "" },
    npcs: [
      { id: "", name: "", title: "", description: "", personality: "", firstMessage: "", live2dModel: "" }
    ]
  },
  items: [
    { id: "", name: "", description: "", type: "consumable", icon: "🧪", effect: {} }
  ],
  scriptConfig: {
    openingScene: "开场场景描写",
    initialLocation: "初始地点"
  }
}
```

#### Scenario: 数据版本迁移
- **WHEN** 导入的剧本版本为 "1.0" 而当前版本为 "2.0"
- **THEN** 系统执行 1.0 → 2.0 的迁移脚本
- **THEN** 迁移脚本为新增字段填充默认值（如 `enableDice: false`, `narrativePerspective: "third_person"`）
- **THEN** 迁移后数据通过 2.0 版本验证

#### Scenario: 数据验证
- **WHEN** 加载或导入剧本数据时
- **THEN** 检查必需字段：version、metadata.title、characters.npcs、scriptConfig.openingScene
- **THEN** 缺失可选字段时使用默认值填充
- **THEN** 缺失必需字段时返回验证错误

### Requirement: 剧本导入导出增强
当前导入导出功能基础，需要增强格式规范和预览信息。

**修改后设计**：
- 导出文件包含 v2.0 完整数据模型
- 导出文件包含封面图（base64 编码）
- 导出文件包含物品库和事件定义
- 导入时支持 v1.0 和 v2.0 格式自动识别和迁移
- 导入后显示剧本预览卡片

#### Scenario: 导出增强
- **WHEN** 玩家点击"导出剧本"
- **THEN** 生成包含完整 v2.0 数据模型的 JSON 文件
- **THEN** 封面图以 base64 编码嵌入
- **THEN** 文件名格式：`{剧本标题}_{日期}.json`

#### Scenario: 导入预览
- **WHEN** 玩家选择导入文件后
- **THEN** 显示剧本预览卡片：封面图、标题、作者、简介、标签、NPC 数量
- **THEN** 玩家确认后才加载到剧本列表

### Requirement: 自定义剧本 UI 升级
当前剧本卡片和编辑器 UI 需要视觉升级以匹配新功能。

**修改后设计**：
- 剧本卡片增加封面图、标签显示、作者信息
- 剧本编辑器增加：物品库编辑区、事件编辑区、叙事视角选择、骰子开关、不确定性等级、封面图上传
- 剧本列表增加标签筛选栏和排序选项
- 世界树存档界面采用树状可视化

## REMOVED Requirements

### Requirement: NPC 数量上限 3
**原因**：NPC 上限提升到 10，旧的限制不再适用
**迁移**：移除 `customNpcCount >= 3` 的限制检查，改为 `>= 10`

### Requirement: 硬编码 itemLibrary
**原因**：物品库改为剧本自定义，不再全局硬编码
**迁移**：默认剧本保留原有物品库作为默认值，自定义剧本使用自定义物品库

### Requirement: 随机时间推进（30-90 分钟）
**原因**：升级为语义感知的智能时间推进
**迁移**：`advanceTime()` 函数改为根据 AI 回复内容判断推进量
