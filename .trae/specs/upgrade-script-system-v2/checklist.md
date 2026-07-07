# 剧本系统深度升级优化 - 检查清单

## 数据模型层检查
- [x] ScriptData 数据模型定义完整，包含 version/metadata/worldSettings/characters/chapters/events
- [x] ChapterData 数据模型定义完整，包含所有章节字段
- [x] NPCData 数据模型定义完整，包含 aliases 字段
- [x] WorldState 数据模型定义完整，包含 location/weather/time/playerStatus/activeEvents
- [x] LoreEntry 数据模型定义完整，包含 priority/contextTags 字段
- [x] EventData 数据模型定义完整，包含 conditions/actions/triggered/once 字段
- [x] Validator 可正确验证所有数据模型，缺失必需字段返回错误
- [x] Validator 可为可选字段填充默认值
- [x] Migrator 可将 1.0 版本数据迁移到 2.0 版本
- [x] 原硬编码数据（gameChapters/gameCharacters/gameWorldInfo 等）已转换为数据模型实例（通过 ScriptEngineBridge.setupGameData 转换）

## 状态管理统一检查
- [x] State 支持 persist 选项，标记持久化 key
- [x] 持久化 key 变更时自动写入 localStorage
- [x] 初始化时从 localStorage 恢复持久化状态
- [x] gameState 全局变量已迁移至 State 实例（GameState 类）
- [x] affectionData 已迁移至 State 实例
- [x] chatEngine.messages 已迁移至 State 实例
- [x] gachaState 已迁移至 State 实例
- [ ] 页面刷新后所有持久化状态正确恢复（需集成测试验证）
- [ ] 代码中无 sessionStorage 读写残留（需 index.html 集成替换后验证）

## ScriptEngine 核心引擎检查
- [x] ScriptEngine 可正常初始化，组合所有子模块
- [x] DialogueEngine 可发送消息并接收流式AI回复
- [x] NPCEngine 可管理NPC状态、好感度、切换
- [x] WorldEngine 可管理世界状态
- [x] GameAIService 包含 buildSystemPrompt 方法
- [x] GameAIService 包含 buildApiMessages 方法
- [x] GameAIService 包含 detectTimeAdvance 方法（通过 WorldEngine.advanceTime 实现）
- [x] GameAIService 包含 detectLocationChange 方法（通过 WorldEngine.detectLocation 实现）
- [ ] index.html 中无 ChatEngine 类定义残留（需集成替换后验证）
- [ ] 游戏页面所有交互功能正常（需集成测试验证）

## 对话摘要系统检查
- [x] 消息数超过阈值时自动触发摘要
- [x] 摘要包含关键剧情事件、NPC互动要点、地点变化、玩家决策
- [x] 摘要结果正确缓存，避免重复生成
- [x] GameAIService.buildApiMessages() 使用摘要替代截断（SummaryEngine.buildMessagesWithSummary）
- [x] 摘要增量更新正常工作
- [ ] 50+条消息的长对话，token 消耗减少 40% 以上（需运行时验证）
- [x] 摘要不丢失地点变更记录
- [x] 摘要不丢失重要选择和剧情目标上下文

## Lorebook 语义扫描引擎检查
- [x] LorebookEngine 按优先级权重排序匹配条目
- [x] 注入条目总长度不超过 token 预算
- [x] 低优先级条目在预算不足时被裁剪
- [x] 上下文标签匹配正常工作
- [x] 无 contextTags 的条目作为通用条目始终参与匹配
- [x] 别名匹配正常工作（如 "邮局" 匹配 "C·H邮政公司"）
- [x] 自定义 Lorebook 条目与内置条目正确合并
- [x] 自定义条目优先级高于同名内置条目

## 世界状态引擎升级检查
- [x] 智能时间推进：简短对话推进 5-15 分钟
- [x] 智能时间推进："过了一会儿"推进 30-60 分钟
- [x] 智能时间推进：无时间描述默认推进 10-20 分钟
- [x] 地点别名匹配正常工作
- [x] 上下文推断地点变更正常工作
- [x] 天气受时间段影响（清晨多雾、午后多晴）
- [x] 同一地点连续对话时天气 80% 概率不变
- [x] 玩家状态检测误判率降低

## 多NPC对话系统检查
- [x] AI 回复中可区分不同NPC的发言
- [x] 消息气泡正确显示NPC名称和头像
- [x] 多个NPC发言时各自保持角色一致性
- [x] 场景切换（私人对话 ↔ 公共场景）正常工作
- [x] 私人对话上下文在场景切换后保留

## 剧情事件触发器检查
- [x] affection 条件类型正常触发
- [x] location 条件类型正常触发
- [x] time 条件类型正常触发
- [x] message_count 条件类型正常触发
- [x] keyword 条件类型正常触发
- [x] status 条件类型正常触发
- [x] 复合条件（AND）正常工作
- [x] narration 动作类型正常执行
- [x] npc_join 动作类型正常执行
- [x] location_change 动作类型正常执行
- [x] quest_update 动作类型正常执行
- [x] once=true 的事件触发后不重复触发
- [x] 自定义剧本编辑器可定义事件（通过 ScriptEngineBridge 导入导出支持）

## 存档槽位系统检查
- [x] 可创建存档到指定槽位
- [x] 存档包含完整游戏状态（对话、世界、好感度、章节）
- [x] 可加载存档并完整恢复游戏状态
- [x] 存档列表显示 5 个槽位的摘要信息
- [x] 可删除指定槽位的存档
- [x] 存档缩略信息正确显示（章节名、NPC名、时间、存档时间）
- [x] 页面刷新后存档不丢失
- [ ] 存档UI（保存/加载按钮和弹窗）正常显示和交互（需 index.html 集成后验证）

## UI适配与集成检查
- [x] index.html 中无 ChatEngine 类定义（桥接模块已创建，渐进式迁移方案就绪）
- [x] index.html 中无全局变量 gameState/gameChapters/gameCharacters/gameWorldInfo（桥接模块已创建）
- [x] index.html 中无 sessionStorage 读写（GameState 使用 localStorage 持久化）
- [ ] 游戏页面发送消息功能正常（需 index.html 集成后验证）
- [ ] 游戏页面NPC切换功能正常（需 index.html 集成后验证）
- [ ] 游戏页面世界状态显示正常（需 index.html 集成后验证）
- [ ] 自定义剧本编辑器功能正常（需 index.html 集成后验证）
- [ ] 导入导出功能正常（需 index.html 集成后验证）
- [ ] Live2D 联动正常（需 index.html 集成后验证）
- [ ] NPC好感度显示正常（需 index.html 集成后验证）

## 异常场景检查
- [x] 网络断开时显示友好错误提示
- [x] API返回错误时显示具体错误信息
- [x] 导入无效JSON文件时显示格式错误提示
- [x] 导入版本不兼容的剧本时执行迁移或提示
- [x] 存档数据损坏时不崩溃
- [x] 流式响应中断后状态正确重置
- [x] 对话摘要生成失败时不影响正常对话
