# 舆论锻造所核心玩法重构：AI Agent社交平台 Spec

## Why
当前舆论锻造所玩法存在大量严重bug（发布内容后首页空白、高低消耗模式互换、标题栏重复），且核心玩法缺乏吸引力——玩家扮演"UP主发布视频"的机制过于简单，缺少持续互动的动力。需要彻底重构为：玩家扮演普通用户浏览一个AI驱动的社交平台，所有UP主都是具有性格、人设、身世背景的AI Agent，它们自主发布内容、直播，玩家可以与它们聊天、对线、参与讨论，形成真正的社交沉浸体验。

## What Changes
- **BREAKING**: 移除旧的"创作中心→发布视频→审核→首页"流程，替换为"浏览AI Agent内容→互动→社交"流程
- **BREAKING**: 重构 `CWE` 引擎，将 `AGENT_DEFS` 从2个固定Agent扩展为可配置的Agent系统，每个Agent拥有完整的性格、人设、身世背景
- **BREAKING**: 移除高低消耗模式选择对话框（`showCwModeDialog`），改为Agent数量配置界面
- **BREAKING**: 重构首页为B站风格的信息流，展示所有Agent发布的内容
- 新增Agent管理界面：玩家可添加/删除Agent，从角色池（gachaPool）中选择形象
- 新增Agent直播功能：Agent可以"直播"，玩家进入直播间与Agent实时互动
- 新增Agent聊天功能：玩家可与Agent进行一对一聊天（复用现有charchat系统）
- 新增评论区互动：玩家可在Agent发布的内容下评论，Agent会回复
- 新增键盘侠对线：Agent中包含"键盘侠"类型，玩家可以与它们对线
- 修复标题栏重复bug（进入个人空间→创作中心后出现两栏）
- 修复发布内容后首页空白bug
- 修复高低消耗模式互换bug

## Impact
- Affected specs: `fix-cw-comprehensive-bugs`（部分bug在此重构中一并修复）
- Affected code:
  - `index.html`：CWE引擎重构、3个视图HTML大幅修改、新增Agent管理/直播/聊天界面
  - `pages/creator-wars/creator-wars.css`：新增Agent管理、直播、聊天相关样式
  - 复用现有 `gachaPool` 角色池和 `charchat` 聊天系统

---

## ADDED Requirements

### Requirement: Agent角色系统
系统 SHALL 提供可配置的AI Agent角色系统，每个Agent拥有完整的性格、人设和身世背景。

**Agent数据结构**：
```javascript
{
    id: 'agent_xxx',
    name: '真相调查员',
    avatar: '🔍',          // 默认emoji头像
    portraitId: 'violet',   // 关联gachaPool角色ID（可选）
    level: 5,
    fans: 23000,
    personality: '认真、执着、追求真相，不轻易相信官方说法',
    background: '前调查记者，因揭露某企业丑闻被辞退后转型为自媒体人...',
    viewpoint: 'investigative',  // investigative/emotional/rational/troll/neutral
    contentStyle: '深度分析',     // 内容风格标签
    liveStreamTopics: ['社会热点', '深度调查'],  // 直播话题
    publishedVideos: [],
    isLive: false,
    liveViewers: 0
}
```

**Agent类型**：
1. **调查型**（investigative）：深度分析、追求真相
2. **情感型**（emotional）：热点追踪、情绪化表达
3. **理性型**（rational）：数据驱动、客观分析
4. **键盘侠**（troll）：故意引战、极端观点、阴阳怪气
5. **中立型**（neutral）：平衡报道、多角度呈现

**Agent行为**：
- 定时发布视频/文章（基于 `EVENT_TEMPLATES` 生成事件，Agent响应事件发布内容）
- 在评论区回复玩家评论
- 开启直播与玩家互动
- 与其他Agent产生互动（互评、对线、联动）

#### Scenario: Agent自主发布内容
- **WHEN** 系统触发一个事件（如"某明星翻车"）
- **THEN** 各Agent根据自身性格和viewpoint，生成不同角度的视频/文章
- **AND** 内容自动出现在首页信息流中

#### Scenario: Agent在评论区互动
- **WHEN** 玩家在Agent发布的内容下评论
- **THEN** Agent根据自身性格回复评论
- **AND** 键盘侠类型Agent可能对玩家发起攻击性回复

---

### Requirement: Agent管理界面
玩家 SHALL 能够管理Agent角色，包括添加、删除、配置形象。

**界面设计**：
- 入口：导航栏右侧用户头像下拉菜单中的"Agent管理"
- 布局：卡片式列表，每个Agent一张卡片，显示头像、名称、类型、粉丝数
- 添加Agent：点击"添加Agent"按钮，弹出配置面板
  - 选择Agent类型（调查型/情感型/理性型/键盘侠/中立型）
  - 输入Agent名称（或AI生成）
  - 输入/生成性格描述
  - 输入/生成身世背景
  - 从gachaPool中选择形象（仅显示已拥有的角色）
  - AI一键生成：点击按钮，AI自动生成完整的Agent人设
- 删除Agent：卡片上的删除按钮
- Agent数量：最少1个，最多8个

#### Scenario: 添加Agent
- **WHEN** 玩家点击"添加Agent"按钮
- **THEN** 弹出Agent配置面板
- **AND** 玩家可以选择类型、输入名称、配置形象
- **AND** 玩家可以点击"AI生成"一键创建完整Agent

#### Scenario: 为Agent配置形象
- **WHEN** 玩家在Agent配置面板中点击"选择形象"
- **THEN** 显示已拥有的gachaPool角色列表
- **AND** 选择后Agent的头像和形象更新为该角色的portrait

#### Scenario: 删除Agent
- **WHEN** 玩家点击Agent卡片上的删除按钮
- **THEN** 确认后该Agent被移除
- **AND** 该Agent发布的内容保留在首页但标记为"已注销"

---

### Requirement: 重构首页为信息流
首页 SHALL 展示所有Agent发布的内容，按时间线排列，类似B站首页。

**重构方案**：
- 移除旧的"创作中心→发布视频"入口
- 首页（平台视图）展示Agent发布的内容信息流
- 内容类型：视频、文章、动态
- 每条内容显示：Agent头像/名称、标题、简介、发布时间、播放量、评论数
- 支持按标签筛选（推荐/热门/最新/关注）
- 点击内容进入详情页，可查看完整内容和评论区

**修复首页空白bug**：
- 当前 `renderHomePage` 中 `allVideos` 数组构建逻辑有误
- 修复：确保 `rankingList` 和 `publishedVideos` 正确合并，去重逻辑使用标题而非引用

#### Scenario: 首页信息流展示
- **WHEN** 玩家进入舆论锻造所首页
- **THEN** 首页显示所有Agent发布的内容信息流
- **AND** 内容按时间倒序排列
- **AND** 每条内容显示Agent头像、名称、标题、播放量

#### Scenario: 点击内容查看详情
- **WHEN** 玩家点击某条内容
- **THEN** 进入详情页，显示完整内容
- **AND** 下方显示评论区，玩家可以发表评论

---

### Requirement: Agent直播功能
Agent SHALL 能够开启直播，玩家可以进入直播间与Agent实时互动。

**直播界面设计**：
- 入口：首页信息流中带有"🔴直播中"标识的Agent内容卡片
- 直播间布局：
  - 左侧/上方：Agent形象展示区（Live2D模型或portrait图片）
  - 右侧/下方：弹幕区和聊天区
  - 底部：弹幕输入框
- 直播互动：
  - 玩家发送弹幕，Agent通过AI实时回复
  - Agent会根据直播话题自主发言
  - 其他Agent可能"串门"出现在弹幕中

**直播触发机制**：
- Agent随机开启直播（基于事件触发或定时）
- 首页显示"直播中"标识
- 直播持续时间：3-5分钟后自动结束

#### Scenario: Agent开启直播
- **WHEN** 某个Agent开启直播
- **THEN** 首页该Agent的内容卡片显示"🔴直播中"标识
- **AND** 玩家可以点击进入直播间

#### Scenario: 直播间互动
- **WHEN** 玩家在直播间发送弹幕
- **THEN** Agent通过AI实时回复弹幕
- **AND** 弹幕以滚动方式显示在直播画面上

---

### Requirement: Agent聊天功能
玩家 SHALL 能够与Agent进行一对一聊天。

**复用现有charchat系统**：
- 当前项目已有完整的角色聊天系统（`charchat`）
- 点击Agent头像或名称，弹出聊天窗口
- 聊天使用AI流式响应（复用现有 `_callAI` 和流式读取逻辑）
- Agent的聊天风格由其性格和人设决定

#### Scenario: 与Agent聊天
- **WHEN** 玩家点击Agent头像或名称
- **THEN** 弹出聊天窗口
- **AND** Agent根据自身性格和背景回复消息

#### Scenario: 与键盘侠对线
- **WHEN** 玩家与键盘侠类型Agent聊天
- **THEN** Agent使用攻击性、阴阳怪气的语言风格
- **AND** 玩家可以与Agent"对线"

---

### Requirement: 修复已知严重Bug

#### Bug 1: 发布内容后首页空白
- **原因**：`renderHomePage` 中 `allVideos` 构建逻辑有误，`publishedVideos` 未正确合并
- **修复**：确保数据正确合并，使用标题去重

#### Bug 2: 高低消耗模式互换
- **原因**：`showCwModeDialog` 中 `data-mode="low"` 和 `data-mode="high"` 的卡片内容与实际逻辑不一致
- **修复**：在重构中移除高低消耗模式选择，替换为Agent数量配置

#### Bug 3: 标题栏重复
- **原因**：进入个人空间→创作中心时，`cwMainSubheader` 和工作室面板的标题同时显示
- **修复**：在 `showStudioArea` 中隐藏 `cwMainSubheader`，或移除 `cwMainSubheader`（重构后不再需要）

---

### Requirement: 移除旧的创作中心流程
旧的"创作中心→选择框架→选择素材→发布视频"流程 SHALL 被移除，替换为新的Agent驱动内容流。

**移除内容**：
- 创作中心面板（`cwStudioArea` 中的工作室内容）
- 框架选择、素材选择界面
- 发布视频流程（`publishVideo` 函数）
- 审核进度条
- 抖加推广面板

**保留内容**：
- 个人空间（`cwProfilePage`）— 简化为玩家信息展示
- 数据中心（`cwDataCenter`）— 改为展示Agent活动数据
- 消息通知系统
- 用户面板（等级、影响力、金币）

#### Scenario: 新的主视图布局
- **WHEN** 玩家进入舆论锻造所
- **THEN** 主视图显示：导航栏 + Agent管理入口 + 当前订单/事件信息
- **AND** 不再显示创作中心面板

---

## MODIFIED Requirements

### Requirement: CWE引擎
原CWE引擎管理玩家发布视频的完整流程。修改为：管理Agent系统、事件生成、内容发布、直播调度。

### Requirement: 首页视图
原首页展示玩家发布的视频和AI生成的推荐视频。修改为：展示所有Agent发布的内容信息流。

### Requirement: 游戏模式选择
原高低消耗模式选择对话框。修改为：Agent数量和类型配置界面。

---

## REMOVED Requirements

### Requirement: 创作中心面板
**Reason**: 核心玩法从"玩家发布内容"改为"浏览AI Agent内容"，创作中心不再需要
**Migration**: 工作室区域改为Agent管理界面

### Requirement: 发布视频流程
**Reason**: 玩家不再扮演UP主发布视频，内容由Agent自动生成
**Migration**: 保留Agent发布内容的逻辑，但由系统自动触发而非玩家手动操作

### Requirement: 抖加推广
**Reason**: 玩家不再发布视频，无需推广功能
**Migration**: 无需迁移

### Requirement: 高低消耗模式
**Reason**: 改为Agent数量配置，消耗由Agent数量决定
**Migration**: 旧模式的API调用频率控制逻辑保留，根据Agent数量自动调整
