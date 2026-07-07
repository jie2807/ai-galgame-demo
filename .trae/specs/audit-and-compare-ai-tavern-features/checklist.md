# 检查清单

## P0 核心功能检查

- [x] 存档系统：至少3个独立存档位可用（实际实现5个存档位，SAVE_SLOT_COUNT=5）
- [x] 存档系统：页面关闭后重新打开可恢复状态（使用localStorage完整持久化）
- [x] 存档系统：存档预览显示时间、地点、章节信息（getSlotPreview函数 L5396-5412）
- [x] 存档系统：可导出/导入存档文件（JSON格式）（exportSave/importSave函数 L5432-5463）
- [x] 记忆系统：上下文窗口大小可在10-50条之间配置（contextWindowSizeSlider，MAX_CONTEXT_WINDOW）
- [x] 记忆系统：智能摘要包含地点变化、NPC交互、关键事件（buildMemorySummary函数）
- [x] 记忆系统：玩家档案被正确记住并在prompt中注入（longTermMemory.playerProfile）
- [x] 记忆系统：关键事件单独存储不被覆盖（longTermMemory.keyEvents，最多50条）
- [x] 好感度系统：4个维度（信任/好感/爱慕/恐惧）独立变化（modifyAffection函数 L4584-4600）
- [x] 好感度系统：UI显示多维度进度（getAffection函数 L4564-4572）
- [x] 好感度系统：AI prompt中包含多维度好感度信息（npcListSection构建时注入）
- [x] 玩家属性：健康/疲劳/心情等属性正常显示（updatePlayerAttributeUI函数 L4651-4664）
- [x] 玩家属性：属性随时间/事件正确变化（updatePlayerAttributesOnTimePass函数 L4626-4634）
- [x] 玩家属性：AI能感知玩家状态并做出反应（playerAttrStr注入prompt L4295）
- [x] 玩家属性：属性恢复机制正常工作（useItemOnAttributes函数 L4636-4649）

## P1 重要功能检查

- [x] 道具系统：物品栏UI正常展示（updateInventoryUI函数 L4736-4759）
- [x] 道具系统：可获得/使用/消耗物品（addItemToInventory/useItem函数 L4666-L4718）
- [x] 道具系统：预设物品库至少20种物品（itemLibrary包含22种物品 L5212-L5233）
- [x] 道具系统：AI能感知玩家持有物品（getInventoryDescriptions注入prompt L4725-L4734）
- [x] 任务系统：主线任务正常追踪（addQuest/completeQuest函数 L4762-L4793）
- [x] 任务系统：支线任务可选且可完成（getActiveQuests函数 L4795-4797）
- [x] 任务系统：成就系统正常解锁（任务type字段支持main/side/achievement）
- [x] 任务系统：任务完成有奖励发放（completeQuest中reward处理 L4782-L4790）
- [x] 任务系统：AI知晓当前任务状态（getQuestPromptInjection注入prompt L4799-L4804）
- [x] NPC关系网：NPC之间有好感度关系（getNPCRelationship/modifyNPCRelationship函数 L4836-L4855）
- [x] NPC关系网：关系变化影响NPC行为（getNPCRelationshipPrompt注入prompt L4857-L4868）
- [x] NPC关系网：UI展示NPC关系（renderNPCRelPanel函数 L8703-L8723）
- [x] Lorebook：支持层级结构（gameWorldInfo数组，可包含category字段）
- [x] Lorebook：条件触发正常工作（checkLorebookTrigger函数 L4892-L4905）
- [x] Lorebook：优先级冲突正确解决（queryLorebook排序 L4888-4889）
- [x] Lorebook：关键词匹配优化（多关键词评分 L4876-L4887）

## P2 锦上添花功能检查

- [ ] BGM系统：场景切换时BGM自动切换
- [ ] BGM系统：音量控制正常
- [ ] 音效系统：UI交互有音效反馈
- [ ] 图片生成：可生成场景插图
- [ ] 图片生成：图片展示UI正常
- [ ] 图片生成：图片缓存生效
- [ ] 分支系统：关键选择点可标记
- [ ] 分支系统：可回溯到之前选择
- [ ] 分支系统：多结局可追踪
- [ ] UI自定义：主题切换正常
- [ ] UI自定义：聊天背景可自定义
- [ ] UI自定义：聊天气泡样式可自定义

## P3 未来功能检查

- [ ] NPC日程：NPC有独立活动时间表
- [ ] NPC日程：NPC位置随时间变化
- [ ] 世界事件：事件触发条件正确
- [ ] 世界事件：事件影响传播到相关NPC
- [ ] 插件系统：插件接口规范定义完成
- [ ] 插件系统：插件加载器工作正常
- [ ] 角色卡：可导出为JSON格式
- [ ] 角色卡：可从JSON导入
- [ ] 角色卡：导入验证正常
