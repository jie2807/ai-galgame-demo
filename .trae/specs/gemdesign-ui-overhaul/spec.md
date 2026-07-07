# 紫罗兰永恒花园 - 全局UI改造方案

## Why
项目当前UI虽然已有暗金复古风格基础，但各页面视觉一致性不足、组件风格不统一、部分页面交互体验粗糙。需要通过GemDesign MCP引入专业UI设计，对全部页面进行系统性改造，提升整体视觉品质和交互体验。

## What Changes
- 统一全局设计系统（颜色、字体、间距、圆角、阴影、动画）
- 改造首页（homePage）视觉层次和布局
- 改造游戏游玩页（gamePage）对话区和控制面板
- 改造抽卡页（gachaPage）视觉动效和卡片展示
- 改造角色列表页（characterListPage）卡片布局
- 改造角色详情页（characterDetailPage）信息展示
- 改造角色聊天页（characterChatPage）对话界面
- 改造书架页（bookShelfPage）书籍展示
- 改造阅读器页（bookReaderPage）阅读体验
- 改造创世战争页（creatorWarsPage）B站风格界面
- 改造章节任务页（chapterMissionPage）任务展示
- 改造模型测试页（modelTestPage）控制面板
- 统一全局组件样式（弹窗、Toast、按钮、输入框等）

## Impact
- Affected specs: 全部页面样式系统
- Affected code: styles/variables.css, styles.css, pages/*/*.css, index.html 内联样式

---

## ADDED Requirements

### Requirement: 全局设计系统升级
系统 SHALL 提供统一的设计变量体系，确保所有页面视觉一致性。

#### Scenario: 设计变量统一
- **WHEN** 开发者使用CSS变量构建页面
- **THEN** 所有页面使用相同的颜色、字体、间距、圆角、阴影变量
- **AND** 变量命名规范一致，便于维护

#### Scenario: 组件库统一
- **WHEN** 不同页面使用相同类型的组件（按钮、卡片、弹窗等）
- **THEN** 组件外观和行为完全一致
- **AND** 不存在重复定义的组件样式

---

### Requirement: 首页（homePage）改造
首页 SHALL 提供沉浸式视觉体验，优化信息层次和交互引导。

#### Scenario: 首页视觉层次优化
- **WHEN** 用户进入首页
- **THEN** 背景层（视频/图片）→ 氛围层（粒子/光效）→ 内容层（角色信息、菜单）层次分明
- **AND** 角色信息区域不遮挡背景主视觉
- **AND** 菜单按钮有明确的视觉引导

#### Scenario: 首页布局响应式
- **WHEN** 在不同屏幕尺寸下查看首页
- **THEN** 所有元素自适应布局，无溢出或遮挡
- **AND** 关键操作区域在移动端可触达

---

### Requirement: 游戏游玩页（gamePage）改造
游戏页 SHALL 提供清晰的对话区域和便捷的操作面板。

#### Scenario: 对话区域优化
- **WHEN** 用户在游戏页进行对话
- **THEN** 对话气泡样式统一，旁白和对话有明显区分
- **AND** NPC头像和名称清晰可辨
- **AND** 输入区域不遮挡对话内容

#### Scenario: 游戏控制面板优化
- **WHEN** 用户操作游戏控制面板
- **THEN** 属性条、背包、NPC关系等面板切换流畅
- **AND** 面板内容排版整洁，信息密度适中

---

### Requirement: 抽卡页（gachaPage）改造
抽卡页 SHALL 提供华丽的视觉动效和清晰的卡片展示。

#### Scenario: 抽卡动效升级
- **WHEN** 用户进行抽卡操作
- **THEN** 抽卡动画流畅华丽，有明确的视觉反馈
- **AND** 卡片展示区域突出角色立绘

#### Scenario: 抽卡结果展示
- **WHEN** 抽卡结果展示
- **THEN** 不同稀有度的卡片有明显的视觉区分
- **AND** 卡片信息（名称、属性、描述）清晰可读

---

### Requirement: 角色列表页（characterListPage）改造
角色列表页 SHALL 提供美观的卡片网格布局和流畅的筛选交互。

#### Scenario: 卡片网格布局
- **WHEN** 用户浏览角色列表
- **THEN** 角色卡片以网格形式整齐排列
- **AND** 卡片包含角色立绘、名称、稀有度等关键信息
- **AND** 卡片hover/点击有明确的视觉反馈

---

### Requirement: 角色详情页（characterDetailPage）改造
角色详情页 SHALL 提供丰富的角色信息展示和沉浸式视觉体验。

#### Scenario: 角色信息展示
- **WHEN** 用户查看角色详情
- **THEN** 角色立绘占据主要视觉区域
- **AND** 角色属性、背景故事、好感度等信息分区展示
- **AND** 页面整体风格与角色气质匹配

---

### Requirement: 角色聊天页（characterChatPage）改造
角色聊天页 SHALL 提供自然的对话界面和良好的交互体验。

#### Scenario: 对话界面优化
- **WHEN** 用户与角色进行对话
- **THEN** 对话气泡样式与角色风格匹配
- **AND** 输入区域便捷，支持快捷回复
- **AND** 好感度变化有明确的视觉提示

---

### Requirement: 书架页（bookShelfPage）改造
书架页 SHALL 提供美观的书籍展示和便捷的管理功能。

#### Scenario: 书籍展示
- **WHEN** 用户浏览书架
- **THEN** 书籍封面清晰展示，排列整齐
- **AND** 书籍状态（已读/未读/在读）有明确标识

---

### Requirement: 阅读器页（bookReaderPage）改造
阅读器页 SHALL 提供舒适的阅读体验和便捷的翻页操作。

#### Scenario: 阅读体验优化
- **WHEN** 用户在阅读器中阅读
- **THEN** 文字排版舒适，行间距适中
- **AND** 翻页动画流畅自然
- **AND** 设置面板（字体大小、背景色等）易于使用

---

### Requirement: 创世战争页（creatorWarsPage）改造
创世战争页 SHALL 提供B站风格的视频平台界面。

#### Scenario: B站风格界面
- **WHEN** 用户进入创世战争页
- **THEN** 界面风格与B站一致（粉色+蓝色品牌色）
- **AND** 视频卡片、导航栏、侧边栏布局合理
- **AND** 深色/浅色模式切换流畅

---

### Requirement: 章节任务页（chapterMissionPage）改造
章节任务页 SHALL 提供沉浸式的章节选择和任务展示。

#### Scenario: 章节选择体验
- **WHEN** 用户浏览章节
- **THEN** 章节卡片有书本质感，选择交互自然
- **AND** 章节进度和状态清晰展示
- **AND** 背景氛围与章节主题匹配

---

### Requirement: 模型测试页（modelTestPage）改造
模型测试页 SHALL 提供清晰的模型展示和便捷的控制面板。

#### Scenario: 模型展示与控制
- **WHEN** 用户在模型测试页操作
- **THEN** 模型展示区域占据主要空间
- **AND** 控制面板（动画切换、表情切换等）布局整洁
- **AND** 操作反馈即时可见

---

## MODIFIED Requirements

### Requirement: 全局组件样式统一
所有弹窗、Toast、按钮、输入框、标签页等通用组件 SHALL 使用统一样式，消除各页面间的样式差异。

- 确认弹窗（confirm-modal）统一圆角、阴影、按钮样式
- Toast通知统一颜色、动画、位置
- 侧边面板统一背景、边框、关闭按钮样式
- 输入框统一边框、聚焦效果、占位符样式
- 标签页统一选中态、hover态样式

---

## 各页面改造优先级

| 优先级 | 页面 | 改造重点 |
|--------|------|----------|
| P0 | 全局设计系统 | 变量统一、组件库统一 |
| P0 | 首页 | 视觉层次、布局优化 |
| P1 | 游戏游玩页 | 对话区、控制面板 |
| P1 | 抽卡页 | 动效、卡片展示 |
| P1 | 角色列表/详情/聊天 | 卡片布局、信息展示 |
| P2 | 书架/阅读器 | 书籍展示、阅读体验 |
| P2 | 创世战争页 | B站风格一致性 |
| P2 | 章节任务页 | 沉浸感提升 |
| P3 | 模型测试页 | 控制面板优化 |

## GemDesign MCP 使用流程

1. 用户在GemDesign平台创建项目，获取appuuid
2. 为每个页面创建设计稿
3. 通过MCP获取各页面的HTML/CSS/资源
4. 将设计内容集成到项目代码中
5. 验证各页面视觉效果和交互功能
