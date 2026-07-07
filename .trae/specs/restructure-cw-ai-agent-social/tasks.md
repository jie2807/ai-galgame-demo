# Tasks

- [x] Task 1: 修复3个严重Bug（首页空白、模式互换、标题栏重复）
  - [x] SubTask 1.1: 修复 `renderHomePage` 中 `allVideos` 构建逻辑，确保Agent发布的内容和玩家评论正确显示
  - [x] SubTask 1.2: 修复高低消耗模式互换问题（`showCwModeDialog` 中 `data-mode` 值与卡片内容不匹配）
  - [x] SubTask 1.3: 修复进入个人空间→创作中心后标题栏重复显示的问题

- [x] Task 2: 重构CWE引擎 — Agent角色系统
  - [x] SubTask 2.1: 扩展 `AGENT_DEFS` 为5种Agent类型（调查型/情感型/理性型/键盘侠/中立型），每种类型至少1个预设模板
  - [x] SubTask 2.2: 新增Agent数据结构（id, name, avatar, portraitId, personality, background, viewpoint, contentStyle, liveStreamTopics, publishedVideos, isLive, liveViewers）
  - [x] SubTask 2.3: 重构 `initAgents` 函数，支持动态添加/删除Agent
  - [x] SubTask 2.4: 新增 `addAgent(agentConfig)` 方法
  - [x] SubTask 2.5: 新增 `removeAgent(agentId)` 方法
  - [x] SubTask 2.6: 新增 `assignPortrait(agentId, portraitId)` 方法，从gachaPool关联角色形象
  - [x] SubTask 2.7: 新增 `generateAgentPersona(type, onComplete)` 方法，AI一键生成Agent人设

- [x] Task 3: 重构入口 — 移除模式选择，改为Agent配置
  - [x] SubTask 3.1: 重写 `showCwModeDialog` 为Agent配置对话框，显示Agent数量和类型配置界面
  - [x] SubTask 3.2: 配置界面包含：添加Agent按钮、Agent列表、每个Agent的类型/名称/形象配置
  - [x] SubTask 3.3: 点击"开始"后初始化Agent系统并进入首页

- [x] Task 4: 重构首页为Agent内容信息流
  - [x] SubTask 4.1: 修改 `renderHomePage` 函数，展示所有Agent发布的内容（视频/文章/动态）
  - [x] SubTask 4.2: 内容卡片显示Agent头像（优先portrait，fallback emoji）、名称、标题、播放量、评论数、发布时间
  - [x] SubTask 4.3: 支持标签筛选：推荐（按互动量排序）、热门（按播放量排序）、最新（按时间排序）、关注（仅关注Agent的内容）
  - [x] SubTask 4.4: Agent直播中的内容卡片显示"🔴直播中"标识

- [x] Task 5: 新增Agent管理界面
  - [x] SubTask 5.1: 在用户头像下拉菜单中添加"Agent管理"入口
  - [x] SubTask 5.2: 创建Agent管理面板HTML（卡片式列表 + 添加/删除按钮）
  - [x] SubTask 5.3: 实现添加Agent弹窗：选择类型→输入名称→配置形象→AI生成人设
  - [x] SubTask 5.4: 实现形象选择：显示已拥有的gachaPool角色，选择后关联到Agent
  - [x] SubTask 5.5: 实现删除Agent功能（确认弹窗 + 标记已注销）
  - [x] SubTask 5.6: 添加Agent管理面板CSS样式

- [x] Task 6: 新增Agent直播功能
  - [x] SubTask 6.1: 创建直播间HTML布局（Agent形象区 + 弹幕区 + 输入框）
  - [x] SubTask 6.2: 实现 `startAgentLive(agentId)` 方法，Agent开启直播
  - [x] SubTask 6.3: 实现直播间弹幕互动：玩家发送弹幕→AI实时回复
  - [x] SubTask 6.4: 实现Agent自主发言：直播期间Agent定时生成话题内容
  - [x] SubTask 6.5: 实现直播结束：3-5分钟后自动结束，生成直播回放卡片
  - [x] SubTask 6.6: 添加直播间CSS样式

- [x] Task 7: 新增Agent聊天功能（复用charchat系统）
  - [x] SubTask 7.1: 点击Agent头像/名称时，调用现有聊天系统打开聊天窗口
  - [x] SubTask 7.2: 将Agent的personality和background注入聊天system prompt
  - [x] SubTask 7.3: 键盘侠类型Agent使用特殊的攻击性system prompt
  - [x] SubTask 7.4: 聊天记录持久化到localStorage

- [x] Task 8: 新增评论区互动
  - [x] SubTask 8.1: 在视频详情页评论区添加玩家输入框
  - [x] SubTask 8.2: 玩家发表评论后，Agent根据性格AI生成回复
  - [x] SubTask 8.3: 键盘侠类型Agent对玩家评论可能产生攻击性回复
  - [x] SubTask 8.4: 评论支持点赞/踩

- [x] Task 9: 移除旧创作中心流程
  - [x] SubTask 9.1: 移除创作中心面板HTML（框架选择、素材选择、发布按钮）
  - [x] SubTask 9.2: 移除 `publishVideo` 函数及相关代码
  - [x] SubTask 9.3: 移除抖加推广面板
  - [x] SubTask 9.4: 将工作室区域改为Agent管理界面
  - [x] SubTask 9.5: 简化个人空间为玩家信息展示（移除投稿管理卡片）

# Task Dependencies
- [Task 1] 独立，可首先执行
- [Task 2] 是 [Task 3][Task 4][Task 5][Task 6][Task 7][Task 8] 的前置依赖
- [Task 3] 是 [Task 4] 的前置依赖（Agent配置完成后才能生成首页内容）
- [Task 4] 是 [Task 6][Task 7][Task 8] 的前置依赖（首页展示内容后才能进入详情/直播/聊天）
- [Task 5] 可与 [Task 4] 并行执行
- [Task 6][Task 7][Task 8] 可并行执行
- [Task 9] 应在 [Task 4][Task 5] 完成后执行（避免移除旧功能时新功能尚未就绪）
