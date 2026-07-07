# 活动系统全面重构 Spec

## Why
当前首页"活动"按钮点击后展开的系统存在以下核心问题：入口名称"活动"过于笼统，无法传达系统内涵；macOS桌面模拟器的多窗口交互方式虽然有趣，但窗口拖拽、层级管理等机制增加了不必要的操作复杂度，且移动端体验差；各App（微信/B站/抖音/邮箱/同花顺/设置）各自承载独立工作流（AI聊天、视频生成与浏览、短视频互动、邮件AI处理、实时股市查看与AI分析、系统配置），但当前以独立窗口形式存在，用户需要反复打开/关闭窗口切换，缺少流畅的跨App导航；已有3个改进spec部分完成但遗留大量未勾选项，需要统一收拢；已知严重bug（首页空白、模式互换、标题栏重复等）需要修复。

## What Changes
- **BREAKING**: 将"活动"按钮重命名为"AI工作台"，图标对齐更新
- **BREAKING**: 移除macOS桌面模拟器的窗口拖拽和层级管理机制，改为标签式导航切换各App，但保留每个App的独立工作流和完整功能
- **BREAKING**: 移除macOS菜单栏和Dock栏，改为顶部标签栏直接切换各App
- 收拢3个已有spec的未完成项，统一到本次重构中
- 修复已知严重bug
- 优化首次进入体验（不再强制弹出API配置框）

## Impact
- Affected specs: `align-creator-wars-with-bilibili`、`restructure-cw-ai-agent-social`、`upgrade-creator-wars-ui`
- Affected code:
  - `index.html`：`#creatorWarsPage` HTML结构重构（移除macOS桌面框架，改为标签导航+内容区）、macOS窗口管理代码移除、各App渲染函数保留但改为在统一内容区中渲染
  - `pages/creator-wars/creator-wars.css`：移除macOS桌面样式，新增标签导航样式
  - 左侧菜单"活动"按钮标签和图标更新

---

## ADDED Requirements

### Requirement: 入口名称与图标更新
首页左侧菜单的"活动"按钮 SHALL 重命名为"AI工作台"，图标从当前的搜索/分析图标改为能体现AI多功能工作台的图标。

#### Scenario: 入口名称一致性
- **WHEN** 用户看到左侧菜单按钮
- **THEN** 按钮显示"AI工作台"名称和对应图标
- **AND** 点击后展开包含微信/B站/抖音/邮箱/股市/设置的多功能工作台

---

### Requirement: 移除macOS桌面模拟器框架，保留各App独立工作流
系统 SHALL 移除macOS桌面模拟器的交互框架（菜单栏、Dock栏、可拖拽窗口、窗口层级管理），但保留每个App的完整独立工作流。改为顶部标签栏导航，点击标签直接在主内容区中切换显示对应App。

**移除内容**：
- macOS菜单栏（`macos-menubar`）— 替换为简洁的顶部栏（返回按钮+系统名称+标签导航）
- Dock栏（`macos-dock`）— 替换为顶部标签栏
- 可拖拽窗口系统（`macos-window`、`macosInitDrag`、`macosFocusWindow`）— 替换为统一内容区
- 窗口层级管理（`_macosWindowZIndex`、`_macosOpenApps`）— 不再需要
- `macosOpenApp`、`macosCloseApp`、`macosRenderAppContent` — 替换为标签切换逻辑

**保留内容**：
- 每个App的完整渲染函数（`renderWeChatContent`、`renderBilibiliContent`、`renderDouyinContent`、`renderMailContent`、`renderTonghuashunContent`、`renderSettingsContent`）— 改为在统一内容区中渲染
- 每个App的内部交互逻辑和AI功能 — 完全保留
- 每个App的视觉风格 — 保留各App自身的风格（微信绿、B站粉蓝、抖音暗色、邮箱白、同花顺深色金融风）

**新布局结构**：
```
┌──────────────────────────────────────────────────────────────┐
│  ← 返回    AI工作台       微信  B站  抖音  邮箱  股市  ⚙    │ ← 顶部栏+标签
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  [当前选中App的完整内容，全屏展示]                              │
│                                                              │
│                                                              │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

#### Scenario: 进入系统
- **WHEN** 用户点击左侧菜单按钮
- **THEN** 直接进入全屏界面，显示顶部标签栏和默认App内容
- **AND** 不出现macOS桌面、Dock栏或可拖拽窗口

#### Scenario: 切换App
- **WHEN** 用户点击顶部标签栏的不同App标签
- **THEN** 主内容区切换到对应App的完整界面
- **AND** 切换流畅，App内部状态保持（已渲染的内容不丢失）

#### Scenario: 返回首页
- **WHEN** 用户点击顶部栏的"返回"按钮
- **THEN** 系统界面关闭，返回主项目首页

---

### Requirement: 各App工作流保留与优化
每个App SHALL 保留其完整的独立工作流，不合并、不删减功能。

**各App工作流说明**：

| App | 核心工作流 | AI功能 |
|-----|-----------|--------|
| 微信 | 与AI Agent聊天（6个预设角色，各有性格和对话风格） | Agent根据人设AI回复消息 |
| B站 | 浏览视频信息流 + AI创作视频（输入主题+风格→AI生成视频方案） | AI生成视频标题/简介/关键帧/标签 |
| 抖音 | 短视频浏览互动（上下滑动切换、点赞/评论/收藏、TTS语音合成） | AI主播自动创作视频、TTS语音播放 |
| 邮箱 | 邮件管理（收发/回复/转发）+ AI摘要 + AI回复 | AI生成邮件摘要、按风格AI回复 |
| 同花顺 | 实时股市查看（自选股/板块/资讯）+ AI分析 + K线图 | AI分析个股、AI问答 |
| 设置 | API配置 + 数据管理 | 无 |

#### Scenario: 微信聊天
- **WHEN** 用户在微信App中选择一个联系人并发送消息
- **THEN** Agent根据其性格设定通过AI生成回复
- **AND** 聊天体验与真实微信一致

#### Scenario: B站AI创作视频
- **WHEN** 用户在B站App中点击AI创作，输入主题和风格
- **THEN** AI生成视频方案（标题/简介/关键帧/标签）
- **AND** 生成的视频出现在信息流中

#### Scenario: 抖音短视频互动
- **WHEN** 用户在抖音App中浏览短视频
- **THEN** 可以上下滑动切换视频，点赞/评论/收藏
- **AND** AI主播视频有TTS语音播放

#### Scenario: 邮箱AI功能
- **WHEN** 用户在邮箱App中查看邮件
- **THEN** 可以使用AI摘要快速了解邮件内容
- **AND** 可以选择AI回复风格（正式/简洁/友好）自动生成回复

#### Scenario: 同花顺AI分析
- **WHEN** 用户在同花顺App中查看个股详情
- **THEN** 可以点击"AI分析"获取AI生成的个股分析
- **AND** 搜索框支持AI问答

---

### Requirement: 优化首次进入体验
首次进入系统时 SHALL 不再强制弹出API配置对话框，改为直接显示默认App内容。未配置API时，AI功能显示提示信息引导用户前往设置配置，非AI功能（浏览、UI交互）正常使用。

#### Scenario: 首次进入（未配置API）
- **WHEN** 用户首次点击进入系统且未配置API
- **THEN** 直接显示默认App内容（如B站信息流）
- **AND** 预设的静态内容正常显示
- **AND** AI功能按钮显示"请先配置API"提示

#### Scenario: 首次进入（已配置API）
- **WHEN** 用户首次点击进入系统且已配置API
- **THEN** 直接显示默认App内容
- **AND** 所有AI功能正常可用

---

### Requirement: Agent系统完善
收拢`restructure-cw-ai-agent-social`spec的未完成项，完善Agent系统。

**未完成项**：
- Agent配置名称和形象的功能
- 标签筛选功能（推荐/热门/最新/关注）
- 添加Agent弹窗功能完整流程
- 直播结束后生成回放卡片
- 评论支持点赞/踩
- 旧流程移除（创作中心面板、publishVideo函数、抖加推广面板）

#### Scenario: Agent配置完善
- **WHEN** 用户在Agent管理界面添加Agent
- **THEN** 可以完整配置名称、类型、形象（从gachaPool选择）
- **AND** 可以使用AI一键生成完整人设

---

### Requirement: 修复已知严重Bug

**Bug列表**：
1. 发布内容后首页空白（`renderHomePage`中`allVideos`构建逻辑有误）
2. 高低消耗模式互换（已在Agent重构中部分解决，需验证）
3. 进入个人空间→创作中心后标题栏重复
4. JavaScript运行时错误
5. 事件绑定和视图切换问题
6. localStorage数据保存和加载问题

#### Scenario: 首页不空白
- **WHEN** 用户发布内容后返回首页
- **THEN** 首页正确显示所有内容，不出现空白

#### Scenario: 无运行时错误
- **WHEN** 用户在系统中进行任何操作
- **THEN** 浏览器控制台无JavaScript运行时错误

---

## MODIFIED Requirements

### Requirement: 入口按钮
原左侧菜单"活动"按钮（id=`creatorWarsBtn`，标签="活动"）。修改为：标签改为"AI工作台"，图标更新为AI工作台相关图标，保持id不变以兼容现有代码。

### Requirement: 页面结构
原`#creatorWarsPage`为macOS桌面模拟器（菜单栏+桌面区+Dock栏）。修改为：顶部标签栏+全屏内容区，移除macOS桌面框架但保留各App完整功能。

### Requirement: 视图切换
原通过Dock栏打开独立窗口切换App。修改为：通过顶部标签栏切换App，所有App在同一主内容区中渲染，App内部状态保持。

### Requirement: macOS菜单栏标题
原macOS菜单栏显示"舆论锻造所"。修改为：顶部栏显示"AI工作台"。

---

## REMOVED Requirements

### Requirement: macOS桌面模拟器框架
**Reason**: 桌面模拟器的窗口拖拽、层级管理增加了操作复杂度，移动端不支持拖拽，且多窗口同时打开时界面混乱。但各App的独立工作流和功能完全保留，仅改变导航方式。
**Migration**: Dock栏→顶部标签栏，可拖拽窗口→统一内容区，macOS菜单栏→简洁顶部栏。

### Requirement: API配置弹窗（首次进入时）
**Reason**: 首次进入时弹出API配置对话框打断体验，应允许用户先浏览再配置。
**Migration**: API配置移至设置App，未配置API时AI功能显示提示而非阻断。
