# Tasks

- [x] Task 1: 剧本数据模型标准化与版本迁移
  - [x] SubTask 1.1: 定义 v2.0 剧本数据模型 Schema（含 metadata、worldSettings、characters、items、scriptConfig、events）
  - [x] SubTask 1.2: 实现数据验证函数 `validateScriptData(data)`，检查必需字段和类型
  - [x] SubTask 1.3: 实现版本迁移函数 `migrateScriptData(data)`，支持 v1.0 → v2.0 自动迁移
  - [x] SubTask 1.4: 重构 `getCustomConfig()` 和 `saveCustomConfig()` 使用新数据模型
  - [x] SubTask 1.5: 重构 `buildExportScriptData()` 生成 v2.0 格式导出文件

- [x] Task 2: 世界树存档分支系统
  - [x] SubTask 2.1: 设计世界树数据结构（树节点含 parentId、children、saveData）
  - [x] SubTask 2.2: 实现世界树存储引擎 `WorldTreeStorage`，基于 localStorage
  - [x] SubTask 2.3: 实现分支创建：从任意存档节点复制完整状态创建新分支
  - [x] SubTask 2.4: 实现世界线切换：加载指定节点的完整状态
  - [x] SubTask 2.5: 实现自动存档：每 5 轮对话自动创建存档节点，保留最近 10 个
  - [x] SubTask 2.6: 实现世界树可视化 UI（树状结构，节点可点击，当前线高亮）
  - [x] SubTask 2.7: 替换现有 5 槽位存档系统为世界树系统

- [x] Task 3: 剧本发现与分类系统
  - [x] SubTask 3.1: 实现标签系统：预设标签列表 + 自定义标签，每个剧本最多 8 个
  - [x] SubTask 3.2: 升级剧本卡片 UI：增加封面图、标签、作者、简介
  - [x] SubTask 3.3: 实现剧本封面图功能：上传/选择封面图，默认封面生成
  - [x] SubTask 3.4: 实现标签筛选栏和排序选项（最近游玩/创建时间/名称）
  - [x] SubTask 3.5: 统一内置剧本和自定义剧本的展示格式
  - [x] SubTask 3.6: 为内置剧本添加标签和元数据

- [x] Task 4: 剧本创作自由度提升
  - [x] SubTask 4.1: NPC 数量上限从 3 提升到 10，编辑器支持滚动
  - [x] SubTask 4.2: 实现自定义物品库编辑器（名称/描述/类型/图标/效果）
  - [x] SubTask 4.3: 实现叙事视角选择（第一人称/第三人称），调整 System Prompt
  - [x] SubTask 4.4: 实现内置骰子系统（d4/d6/d8/d10/d12/d20/d100），UI 按钮和结果显示
  - [x] SubTask 4.5: 实现剧本编辑功能（创建后可修改），编辑器加载已有剧本配置
  - [x] SubTask 4.6: 实现不确定性等级设置（低/中/高），影响 System Prompt 中的行动结果指引

- [x] Task 5: 动态世界事件引擎
  - [x] SubTask 5.1: 定义事件数据结构（conditions、actions、once、priority、cooldown）
  - [x] SubTask 5.2: 实现事件条件检查器（affection/location/time_period/message_count/keyword/player_status/has_item/attribute）
  - [x] SubTask 5.3: 实现事件动作执行器（narration/npc_join/npc_leave/location_change/give_item/attribute_change/weather_change/custom）
  - [x] SubTask 5.4: 实现事件触发流程：AI 回复后检查条件 → 按优先级排序 → 最多触发 2 个
  - [x] SubTask 5.5: 实现事件编辑器 UI（条件组合、动作配置、一次性/冷却设置）
  - [x] SubTask 5.6: 集成事件引擎到 SimpleChatEngine 的回复处理流程

- [x] Task 6: 对话引擎智能化
  - [x] SubTask 6.1: 实现对话摘要系统：超过 30 条消息自动摘要，保留关键信息
  - [x] SubTask 6.2: 实现语义 Lorebook 匹配：contextTags 上下文感知，优先级权重排序，token 预算控制
  - [x] SubTask 6.3: 实现智能时间推进：解析 AI 回复中的时间描述，语义化推进时间
  - [x] SubTask 6.4: 实现增强地点检测：别名匹配、上下文推断、地点变更时天气更新
  - [x] SubTask 6.5: 重构 `_buildSystemPrompt()` 使用模块化构建（世界设定 + 角色 + 事件 + 规则）

- [x] Task 7: 剧本导入导出增强
  - [x] SubTask 7.1: 导出支持 v2.0 完整数据模型（含封面图 base64、物品库、事件）
  - [x] SubTask 7.2: 导入支持 v1.0 和 v2.0 格式自动识别和迁移
  - [x] SubTask 7.3: 实现导入预览卡片（封面图、标题、作者、简介、标签、NPC 数量）
  - [x] SubTask 7.4: 更新 `validateScriptFormat()` 支持 v2.0 验证规则

- [x] Task 8: 自定义剧本 UI 升级
  - [x] SubTask 8.1: 剧本编辑器增加物品库编辑区
  - [x] SubTask 8.2: 剧本编辑器增加事件编辑区
  - [x] SubTask 8.3: 剧本编辑器增加叙事视角选择、骰子开关、不确定性等级
  - [x] SubTask 8.4: 剧本编辑器增加封面图上传
  - [x] SubTask 8.5: 剧本列表增加标签筛选栏和排序选项
  - [x] SubTask 8.6: 世界树存档可视化 UI
  - [x] SubTask 8.7: 骰子 UI（输入框旁骰子按钮、结果展示）

# Task Dependencies
- [Task 2] depends on [Task 1] (世界树需要新的数据模型)
- [Task 3] depends on [Task 1] (剧本发现需要新的数据模型中的标签/封面)
- [Task 4] depends on [Task 1] (创作自由度提升需要新的数据模型)
- [Task 5] depends on [Task 1] (事件引擎需要新的数据模型中的 events)
- [Task 5] depends on [Task 4.2] (事件条件 has_item 依赖自定义物品库)
- [Task 6] depends on [Task 5] (对话引擎智能化需要事件引擎集成)
- [Task 7] depends on [Task 1] (导入导出增强需要新的数据模型)
- [Task 8] depends on [Task 1] (UI 升级需要新的数据模型)
- [Task 8] depends on [Task 2] (世界树 UI 依赖世界树存储引擎)
- [Task 8] depends on [Task 4] (编辑器 UI 依赖创作自由度功能)
- [Task 8] depends on [Task 5] (事件编辑器 UI 依赖事件引擎)

# Parallelizable Work
- Task 1 完成后，Task 2/3/4/5/7 可并行开发
- Task 6 和 Task 8 需要等待依赖完成后开发
- SubTask 4.1（NPC 上限提升）和 SubTask 4.3（叙事视角）可独立并行
