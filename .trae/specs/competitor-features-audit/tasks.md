# Tasks

- [x] Task 1: 消息交互增强（编辑/删除/重试/分支）
  - [x] SubTask 1.1: 为每条消息添加操作按钮（编辑/删除/重试），hover 或长按显示
  - [x] SubTask 1.2: 实现消息编辑功能：点击编辑后消息变为 textarea，确认后更新内容，后续消息标记为"已废弃"
  - [x] SubTask 1.3: 实现消息删除功能：从消息数组中移除，重新渲染对话
  - [x] SubTask 1.4: 实现 Swipe 重试功能：点击重试按钮重新调用 AI，保留最多 5 个版本，左右箭头切换版本
  - [x] SubTask 1.5: 实现消息分支：编辑消息时可选择"创建分支"，使用世界树存档系统保存分支点
  - [x] SubTask 1.6: 添加消息操作按钮 CSS（hover 显示，图标按钮，不干扰阅读）

- [x] Task 2: 玩家人设系统（Persona）
  - [x] SubTask 2.1: 设计人设数据结构：{ id, name, gender, age, appearance, personality, background, avatar }
  - [x] SubTask 2.2: 实现人设编辑面板 UI：侧边栏弹出，包含所有字段输入
  - [x] SubTask 2.3: 实现人设列表管理：创建/编辑/删除/切换人设
  - [x] SubTask 2.4: 将人设信息注入到 `_buildSystemPrompt()` 的玩家角色部分
  - [x] SubTask 2.5: 人设数据持久化到 localStorage，页面刷新后恢复

- [x] Task 3: 快速回复（Quick Replies）
  - [x] SubTask 3.1: 在 AI 回复下方添加快速回复按钮容器
  - [x] SubTask 3.2: 实现动态快速回复生成：基于 AI 回复内容提取 2-4 个可能的回复选项
  - [x] SubTask 3.3: 实现自定义快速回复模板：剧本编辑器中可定义快速回复模板和触发条件
  - [x] SubTask 3.4: 点击快速回复按钮发送对应文本，按钮消失
  - [x] SubTask 3.5: 快速回复按钮样式：药丸形按钮，半透明背景，hover 高亮

- [x] Task 4: 输入模式切换（Say/Do/Story/See）
  - [x] SubTask 4.1: 在游戏输入框左侧添加模式切换按钮组（4 个图标按钮）
  - [x] SubTask 4.2: 切换模式时更新输入框占位符文本和样式
  - [x] SubTask 4.3: 不同模式在用户消息前添加不同前缀指令到 prompt
  - [x] SubTask 4.4: 模式状态保存到游戏状态，存档/读档时恢复

- [x] Task 5: 作者备注（Author's Note）
  - [x] SubTask 5.1: 在游戏侧边栏添加作者备注输入区域
  - [x] SubTask 5.2: 实现插入频率设置（每 N 条消息插入一次）
  - [x] SubTask 5.3: 实现插入深度设置（0-999，0=最靠近 AI 回复）
  - [x] SubTask 5.4: 在 `_buildApiMessages()` 中按频率和深度注入作者备注
  - [x] SubTask 5.5: 作者备注内容保存到游戏状态

- [x] Task 6: 角色表情系统
  - [x] SubTask 6.1: 定义情绪类型枚举和关键词映射表（开心/悲伤/愤怒/惊讶/害羞/平静）
  - [x] SubTask 6.2: 实现 `detectEmotion(aiContent)` 函数：分析 AI 回复中的情绪关键词
  - [x] SubTask 6.3: 实现表情切换：检测到情绪变化时更新角色头像/立绘的 data-emotion 属性
  - [x] SubTask 6.4: 为 Live2D 模型添加表情切换支持（调用 motion/expression API）
  - [x] SubTask 6.5: 在剧本编辑器中添加自定义情绪关键词映射配置
  - [x] SubTask 6.6: 添加表情切换过渡动画 CSS

- [x] Task 7: Lorebook 高级功能
  - [x] SubTask 7.1: 升级关键词匹配支持正则表达式（检测 /pattern/flags 格式）
  - [x] SubTask 7.2: 添加深度插入位置选项（角色定义前/后、示例消息前/后、@D 指定深度、作者备注顶/底部）
  - [x] SubTask 7.3: 实现递归扫描：已激活条目的内容作为新扫描源，最多递归 5 层
  - [x] SubTask 7.4: 添加概率触发设置（0-100%），匹配后按概率决定是否注入
  - [x] SubTask 7.5: 添加包含组（Inclusion Group）：同组条目只注入权重最高的一个
  - [x] SubTask 7.6: 添加选择性逻辑：次要关键词 + AND ANY/AND ALL/NOT ANY/NOT ALL
  - [x] SubTask 7.7: 更新 Lorebook 编辑器 UI 支持新字段
  - [x] SubTask 7.8: 更新 `queryLorebook()` 函数整合所有高级匹配逻辑

- [x] Task 8: NPC 关系网
  - [x] SubTask 8.1: 设计 NPC 关系数据结构：{ sourceId, targetId, type, affection, description }
  - [x] SubTask 8.2: 在剧本编辑器 NPC 卡片中添加关系编辑区
  - [x] SubTask 8.3: 将 NPC 关系信息注入到 AI prompt 的 NPC 部分
  - [x] SubTask 8.4: 实现关系可视化：在 NPC 面板中显示关系连线图
  - [x] SubTask 8.5: NPC 互动时根据关系类型调整好感度变化幅度

- [x] Task 9: 场景 BGM 系统
  - [x] SubTask 9.1: 使用 Web Audio API 创建 BGM 播放器引擎
  - [x] SubTask 9.2: 内置一组免费 BGM 资源（按场景分类：城镇/森林/战斗/夜晚/悲伤/欢快）
  - [x] SubTask 9.3: 实现地点/时间到 BGM 的自动映射和切换
  - [x] SubTask 9.4: 添加 BGM 控制栏（播放/暂停/音量/曲目名）
  - [x] SubTask 9.5: 在剧本编辑器中添加自定义 BGM 配置（上传/URL + 场景映射）
  - [x] SubTask 9.6: BGM 切换时淡入淡出效果

- [x] Task 10: UI 主题自定义
  - [x] SubTask 10.1: 创建 7 个预设主题（暗金/深蓝/暗紫/暗红/暗绿/明亮/羊皮纸）
  - [x] SubTask 10.2: 实现主题切换面板 UI（色块选择器）
  - [x] SubTask 10.3: 实现自定义主色调选择器（5 个颜色选择器）
  - [x] SubTask 10.4: 实现 applyTheme 函数 + CSS 自定义属性
  - [x] SubTask 10.5: 实现字体大小调节
  - [x] SubTask 10.6: 关键 CSS 规则改用 CSS 自定义属性
  - [x] SubTask 10.7: 主题设置保存到 localStorage

- [x] Task 11: 日记/编年史系统
  - [x] SubTask 11.1: 设计编年史数据结构：{ timestamp, type, description, metadata }
  - [x] SubTask 11.2: 实现自动记录：地点变更/NPC 加入离开/物品获得/好感度变化/战斗结果时自动添加条目
  - [x] SubTask 11.3: 实现编年史面板 UI：时间线展示，按类型筛选，关键词搜索
  - [x] SubTask 11.4: 编年史数据保存到游戏状态和存档中

- [x] Task 12: 成就系统
  - [x] SubTask 12.1: 设计成就数据结构
  - [x] SubTask 12.2: 预设一组通用成就
  - [x] SubTask 12.3: 实现成就检测引擎
  - [x] SubTask 12.4: 实现成就解锁通知
  - [x] SubTask 12.5: 实现成就面板 UI
  - [x] SubTask 12.6: 在剧本编辑器中添加自定义成就配置
  - [x] SubTask 12.7: 成就数据保存到 localStorage

- [x] Task 13: 提示管理器（Prompt Manager）
  - [x] SubTask 13.1: 实现 prompt 模板数据结构和内置模板
  - [x] SubTask 13.2: 实现提示管理器面板 UI
  - [x] SubTask 13.3: 实现模板 CRUD 操作
  - [x] SubTask 13.4: 集成到 _buildSystemPrompt 注入风格指引
  - [x] SubTask 13.5: 实现导入/导出功能
  - [x] SubTask 13.6: 启动时恢复保存的模板
  - [x] SubTask 13.7: 添加提示管理器触发按钮

# Task Dependencies
- Task 1 (消息交互) 无依赖，可立即开始
- Task 2 (Persona) 无依赖，可立即开始
- Task 3 (快速回复) 依赖 Task 1（消息渲染机制）
- Task 4 (输入模式) 无依赖，可立即开始
- Task 5 (Author's Note) 无依赖，可立即开始
- Task 6 (角色表情) 依赖现有 Live2D 系统
- Task 7 (Lorebook 高级) 无依赖，可立即开始
- Task 8 (NPC 关系网) 无依赖，可立即开始
- Task 9 (BGM) 无依赖，可立即开始
- Task 10 (UI 主题) 无依赖，可立即开始
- Task 11 (编年史) 依赖现有事件引擎
- Task 12 (成就) 依赖 Task 11（编年史事件检测）
- Task 13 (Prompt Manager) 依赖 Task 5（Author's Note 注入逻辑）

# 优先级分组
## P0（核心交互体验，必须实现）
- Task 1: 消息交互增强
- Task 2: 玩家人设系统
- Task 3: 快速回复
- Task 4: 输入模式切换
- Task 5: 作者备注

## P1（沉浸感提升，重要实现）
- Task 6: 角色表情系统
- Task 7: Lorebook 高级功能
- Task 8: NPC 关系网
- Task 9: 场景 BGM 系统
- Task 11: 日记/编年史系统

## P2（丰富体验，择优实现）
- Task 10: UI 主题自定义
- Task 12: 成就系统
- Task 13: 提示管理器
