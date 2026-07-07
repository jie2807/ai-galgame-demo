# 剧本系统深度升级优化 Spec

## Why
当前剧本系统存在严重的架构问题：核心游戏逻辑全部内嵌在 `index.html` 的 `<script>` 标签中（约 6000+ 行），与 `src/` 目录下的模块化代码完全脱节；ChatEngine 与 AIService 是两套独立的对话引擎；游戏状态管理混乱（sessionStorage/localStorage/全局变量混用）；缺少对话摘要、多NPC交互、剧情事件触发等核心能力。需要从架构层面重构剧本引擎，使其具备可扩展性和可维护性。

## What Changes
- **BREAKING** 重构 ChatEngine 为模块化剧本引擎（ScriptEngine），替代 index.html 内嵌的 ChatEngine 类
- **MODIFIED** 统一 AI 服务层：将内嵌 ChatEngine 的 API 调用逻辑迁移至 `src/services/ai.js` 的 GameAIService
- **MODIFIED** 游戏状态管理：从 sessionStorage + 全局变量迁移至 State 响应式状态系统
- **ADDED** 对话摘要系统：长对话自动摘要，减少 token 消耗
- **ADDED** 多NPC对话系统：支持NPC间对话和场景切换
- **ADDED** 剧情事件触发器：基于条件的自动事件系统
- **ADDED** 存档槽位系统：多存档支持，持久化到 localStorage
- **MODIFIED** Lorebook 扫描引擎：从简单关键词匹配升级为语义匹配 + 优先级权重
- **MODIFIED** 世界状态引擎：时间推进逻辑、地点检测、天气系统升级
- **ADDED** 剧本数据模型层：标准化的数据结构和验证

## Impact
- 受影响能力：对话引擎、AI服务、游戏状态管理、NPC系统、世界状态、自定义剧本编辑器、导入导出
- 受影响代码：
  - `index.html` 内嵌 `<script>` 中的 ChatEngine 类、gameState、gameChapters、gameCharacters、gameWorldInfo 等（约 6000 行）
  - `src/services/ai.js`（GameAIService 需扩展）
  - `src/services/storage.js`（需扩展存档功能）
  - `src/core/state.js`（需扩展游戏状态管理）
  - `src/components/chat/ChatManager.js`（需适配新引擎）
  - `src/components/chat/ChatView.js`（需适配新引擎）
  - `src/data/characters.js`（需重构为统一数据模型）

## 现状问题分析

### 架构层面
1. **双引擎问题**：`src/services/ai.js` 有 `AIService` + `GameAIService`，`index.html` 内嵌了独立的 `ChatEngine` 类，两套系统完全独立，功能重复
2. **单体文件**：所有游戏逻辑内嵌在 `index.html` 的 `<script>` 中，无法进行模块化开发、测试或复用
3. **状态混乱**：`gameState` 用 sessionStorage + 全局变量，`affectionData` 用 localStorage，`chatEngine.messages` 用 sessionStorage，`gachaState` 用 localStorage，无统一状态管理
4. **数据硬编码**：`gameChapters`、`gameCharacters`、`gameWorldInfo`、`chapterLocations`、`weatherTypes`、`statusKeywords` 等全部硬编码在脚本中

### 对话引擎层面
5. **无对话摘要**：`maxContextMessages = 20` 硬编码，长对话直接截断，丢失早期上下文
6. **System Prompt 冗长**：每次请求重建完整 system prompt（约 2000+ 字），消耗大量 token
7. **Lorebook 扫描简陋**：仅做 `text.includes(key)` 精确匹配，无法识别同义词或上下文相关设定
8. **无多NPC交互**：同一时刻只能与一个NPC对话，NPC之间无交互

### 世界状态层面
9. **时间推进随机**：每条消息随机推进 30-90 分钟，不符合剧情逻辑
10. **地点检测脆弱**：依赖 AI 回复中的关键词匹配，容易漏检或误检
11. **天气系统简陋**：仅按地点权重随机生成，不考虑时间/季节/剧情
12. **玩家状态检测粗糙**：关键词匹配，容易误判

### 存档与持久化
13. **无多存档**：只有当前会话的 sessionStorage，关闭标签页即丢失
14. **自定义剧本配置丢失**：编辑器内容未持久化，刷新即清空
15. **导入导出格式简单**：无版本迁移、无缩略图、无预览

## ADDED Requirements

### Requirement: 模块化剧本引擎（ScriptEngine）
系统 SHALL 提供模块化的剧本引擎，替代当前内嵌在 index.html 中的 ChatEngine 类，将核心逻辑拆分为独立模块。

#### Scenario: 引擎模块化拆分
- **WHEN** 系统初始化时
- **THEN** ScriptEngine 从 `src/engine/ScriptEngine.js` 加载
- **THEN** ScriptEngine 组合以下子模块：
  - `DialogueEngine`：对话管理、消息收发、流式处理
  - `WorldEngine`：世界状态、时间、天气、地点管理
  - `NPCEngine`：NPC状态、好感度、切换、Live2D联动
  - `LorebookEngine`：知识库扫描与注入
  - `EventEngine`：剧情事件触发与执行
- **THEN** 所有子模块通过 State 响应式系统通信

#### Scenario: 与现有UI兼容
- **WHEN** ScriptEngine 替换 ChatEngine 后
- **THEN** 游戏页面的所有UI交互正常工作
- **THEN** 发送消息、NPC切换、世界状态显示等功能不受影响

### Requirement: 对话摘要系统
系统 SHALL 在对话历史过长时自动生成摘要，减少 token 消耗同时保留关键上下文。

#### Scenario: 自动摘要触发
- **WHEN** 对话消息超过 30 条时
- **THEN** 系统将最早的 20 条消息压缩为一段摘要（约 200 字）
- **THEN** 摘要包含：关键剧情事件、NPC互动要点、地点变化、玩家决策
- **THEN** 后续 API 请求使用：system prompt + 摘要 + 最近 10 条消息

#### Scenario: 摘要质量保证
- **WHEN** 生成摘要时
- **THEN** 摘要保留所有地点变更记录
- **THEN** 摘要保留NPC好感度变化关键节点
- **THEN** 摘要保留玩家做出的重要选择
- **THEN** 摘要不丢失当前剧情目标相关上下文

### Requirement: 多NPC对话系统
系统 SHALL 支持多NPC场景对话，NPC之间可以交互，玩家可以参与多人对话。

#### Scenario: NPC间对话
- **WHEN** 剧情场景中存在多个NPC
- **THEN** AI 可以控制多个NPC依次发言
- **THEN** 每个NPC的发言保持各自的角色一致性
- **THEN** 消息气泡显示对应NPC的名称和头像

#### Scenario: 场景切换
- **WHEN** 玩家从一个NPC的私人对话切换到公共场景
- **THEN** 系统保留私人对话的上下文
- **THEN** 公共场景中可见多个NPC
- **THEN** 玩家可以选择与场景中的任一NPC对话

### Requirement: 剧情事件触发器
系统 SHALL 提供基于条件的自动事件触发系统，支持剧本作者定义条件事件。

#### Scenario: 条件事件触发
- **WHEN** 定义了事件条件：`{ type: "affection", npcId: "hodgins", threshold: 50, operator: ">=" }`
- **AND** 霍金斯的好感度达到 50
- **THEN** 自动触发关联的剧情事件
- **THEN** 事件以旁白消息形式呈现
- **THEN** 事件触发后标记为已触发，不重复触发

#### Scenario: 复合条件事件
- **WHEN** 定义了复合条件：好感度 >= 40 AND 当前地点 = "C·H邮政公司" AND 时间段 = "夜晚"
- **THEN** 所有条件满足时触发事件
- **THEN** 任一条件不满足时不触发

#### Scenario: 事件类型
- **WHEN** 定义事件时
- **THEN** 支持以下触发条件类型：
  - `affection`：好感度阈值
  - `location`：当前地点
  - `time`：时间段
  - `message_count`：对话轮数
  - `keyword`：对话中出现关键词
  - `status`：玩家状态
- **THEN** 支持以下事件动作类型：
  - `narration`：插入旁白文本
  - `npc_join`：NPC加入对话
  - `location_change`：强制地点变更
  - `quest_update`：更新剧情目标

### Requirement: 存档槽位系统
系统 SHALL 提供多存档槽位，支持玩家保存和加载不同进度。

#### Scenario: 创建存档
- **WHEN** 玩家点击"保存进度"
- **THEN** 系统将当前游戏状态保存到选定的存档槽位
- **THEN** 存档内容包含：对话历史、世界状态、NPC好感度、当前章节、时间戳
- **THEN** 存档显示缩略信息：章节名、NPC名、时间、存档时间

#### Scenario: 加载存档
- **WHEN** 玩家选择一个存档槽位点击"加载"
- **THEN** 系统恢复该存档的所有状态
- **THEN** 对话历史正确恢复
- **THEN** 世界状态（地点/天气/时间/健康）正确恢复
- **THEN** NPC好感度正确恢复

#### Scenario: 存档数量
- **WHEN** 玩家查看存档列表
- **THEN** 最多显示 5 个存档槽位
- **THEN** 空槽位显示"空"状态
- **THEN** 已占用槽位显示存档摘要信息

### Requirement: Lorebook 语义扫描引擎
系统 SHALL 升级 Lorebook 扫描引擎，从简单关键词匹配升级为带优先级权重的语义匹配。

#### Scenario: 优先级权重匹配
- **WHEN** 多个 Lorebook 条目匹配当前上下文
- **THEN** 按优先级权重排序，高优先级条目优先注入
- **THEN** 注入的条目总长度不超过 token 预算（默认 1000 token）
- **THEN** 低优先级条目在预算不足时被裁剪

#### Scenario: 上下文感知匹配
- **WHEN** Lorebook 条目定义了 `contextTags`（如 ["战斗", "危机"]）
- **THEN** 系统根据最近 3 条消息的内容判断当前上下文标签
- **THEN** 仅注入与当前上下文标签匹配的条目
- **THEN** 无 `contextTags` 的条目视为通用条目，始终参与匹配

#### Scenario: 自定义剧本 Lorebook
- **WHEN** 自定义剧本定义了 Lorebook 条目
- **THEN** 自定义条目与内置条目合并扫描
- **THEN** 自定义条目优先级高于同名内置条目

### Requirement: 世界状态引擎升级
系统 SHALL 升级世界状态引擎，使时间推进、地点检测、天气系统更智能。

#### Scenario: 智能时间推进
- **WHEN** AI 回复中包含时间相关描述（如"过了一会儿"、"天色渐暗"）
- **THEN** 系统根据描述语义调整时间推进量
- **THEN** 简短对话推进 5-15 分钟
- **THEN** "过了一会儿"推进 30-60 分钟
- **THEN** "天色渐暗"推进到下一个时间段
- **THEN** 无时间描述时默认推进 10-20 分钟

#### Scenario: 增强地点检测
- **WHEN** AI 回复描述了地点变更
- **THEN** 系统使用多种策略检测：
  - 精确名称匹配
  - 别名匹配（支持定义地点别名）
  - 上下文推断（"离开了X" + "来到了Y"）
- **THEN** 检测到地点变更时更新世界状态
- **THEN** 地点变更时根据新地点重新生成天气

#### Scenario: 天气系统升级
- **WHEN** 天气状态需要更新时
- **THEN** 天气受以下因素影响：地点权重、时间段（清晨多雾、午后多晴）、剧情事件
- **THEN** 天气不会在短时间对话内频繁变化
- **THEN** 同一地点连续对话时天气保持一致（80%概率不变）

### Requirement: 剧本数据模型层
系统 SHALL 提供标准化的剧本数据模型和验证机制。

#### Scenario: 数据模型定义
- **WHEN** 系统处理剧本数据时
- **THEN** 使用以下标准模型：
  - `ScriptData`：剧本完整数据（含版本、元数据、世界设定、角色、章节配置）
  - `ChapterData`：章节数据（含NPC列表、开场场景、目标、世界上下文）
  - `NPCData`：NPC数据（含名称、身份、描述、性格、开场白、Live2D配置）
  - `WorldState`：世界状态（含地点、天气、时间、玩家状态）
  - `LoreEntry`：知识条目（含关键词、内容、优先级、上下文标签）
  - `EventData`：事件数据（含触发条件、动作、是否已触发）

#### Scenario: 数据验证
- **WHEN** 加载或导入剧本数据时
- **THEN** 使用 Schema 验证器检查数据完整性
- **THEN** 缺失可选字段时使用默认值填充
- **THEN** 缺失必需字段时返回验证错误
- **THEN** 数据版本不兼容时执行迁移

#### Scenario: 数据版本迁移
- **WHEN** 导入的剧本版本为 "1.0" 而当前版本为 "2.0"
- **THEN** 系统执行 1.0 → 2.0 的迁移脚本
- **THEN** 迁移脚本为新增的必需字段填充默认值
- **THEN** 迁移后的数据通过 2.0 版本验证

## MODIFIED Requirements

### Requirement: AI 服务统一
当前 `index.html` 内嵌的 ChatEngine 和 `src/services/ai.js` 的 GameAIService 是两套独立系统，需要统一。

**修改后设计**：
- 废弃内嵌 ChatEngine，所有 AI 交互通过 GameAIService 处理
- GameAIService 扩展以下能力：
  - 对话摘要生成
  - 智能时间推进检测
  - 增强地点检测
  - 多NPC对话编排
- System Prompt 构建逻辑从 ChatEngine 迁移至 GameAIService
- Lorebook 注入逻辑从 ChatEngine 迁移至 LorebookEngine

#### Scenario: 统一AI调用
- **WHEN** 玩家发送消息
- **THEN** 通过 GameAIService 发送请求
- **THEN** GameAIService 调用 LorebookEngine 获取匹配条目
- **THEN** GameAIService 调用 WorldEngine 获取当前世界状态
- **THEN** GameAIService 构建完整 system prompt 并发送 API 请求
- **THEN** 收到回复后，GameAIService 分发结果给 WorldEngine（状态检测）和 NPCEngine（好感度更新）

### Requirement: 游戏状态管理统一
当前游戏状态分散在 sessionStorage、localStorage 和全局变量中，需要统一到 State 响应式系统。

**修改后设计**：
- 所有游戏状态通过 State 实例管理
- 持久化状态自动同步到 localStorage
- 临时会话状态（如流式响应状态）保存在内存中
- 状态变更通过订阅机制通知 UI 更新

#### Scenario: 状态持久化
- **WHEN** 游戏状态发生变更
- **THEN** 标记为持久化的状态自动保存到 localStorage
- **THEN** 页面刷新后自动恢复持久化状态
- **THEN** 非持久化状态（如 isStreaming）不保存

#### Scenario: 状态订阅通知
- **WHEN** 世界状态中的地点发生变更
- **THEN** 订阅了 `game.world.location` 的 UI 组件自动更新
- **THEN** 订阅了 `game.world.*` 的组件也收到通知

## REMOVED Requirements

### Requirement: 内嵌 ChatEngine 类
**原因**：ChatEngine 的所有功能已迁移至模块化的 ScriptEngine 及其子模块
**迁移**：index.html 中的 ChatEngine 相关代码将被移除，替换为 ScriptEngine 模块的调用

### Requirement: 全局变量 gameState / gameChapters / gameCharacters / gameWorldInfo
**原因**：所有数据迁移至 State 响应式系统和数据模型层
**迁移**：全局变量替换为 State 实例的 get/set 调用
