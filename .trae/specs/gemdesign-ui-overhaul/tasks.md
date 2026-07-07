# Tasks - 紫罗兰永恒花园 全局UI改造

## 前置条件
- [ ] Task 0: 获取GemDesign项目appuuid，确认MCP可正常访问设计页面
  - [ ] 用户在GemDesign平台创建项目
  - [ ] 获取appuuid并通过MCP验证可访问
  - [ ] 确认各页面设计稿已就绪

## P0 - 全局基础

- [ ] Task 1: 升级全局设计系统变量（styles/variables.css）
  - [ ] 从GemDesign获取设计规范（颜色、字体、间距等）
  - [ ] 更新CSS变量定义，确保覆盖所有页面需求
  - [ ] 清理冗余变量，统一命名规范

- [ ] Task 2: 统一全局组件样式（styles.css）
  - [ ] 统一弹窗/模态框样式（confirm-modal, settings等）
  - [ ] 统一Toast通知样式
  - [ ] 统一按钮样式（主按钮、次按钮、危险按钮等）
  - [ ] 统一输入框样式
  - [ ] 统一标签页样式
  - [ ] 统一侧边面板样式
  - [ ] 清理index.html中的内联样式，迁移到CSS文件

- [ ] Task 3: 改造首页（homePage）
  - [ ] 从GemDesign获取首页设计内容
  - [ ] 重构首页HTML结构（如需要）
  - [ ] 更新首页CSS样式（pages/home/home.css）
  - [ ] 优化背景层、氛围层、内容层的视觉层次
  - [ ] 优化角色信息区域布局
  - [ ] 优化菜单按钮和导航交互
  - [ ] 验证响应式布局

## P1 - 核心游戏页面

- [ ] Task 4: 改造游戏游玩页（gamePage）
  - [ ] 从GemDesign获取游戏页设计内容
  - [ ] 优化对话区域样式（旁白vs对话区分）
  - [ ] 优化NPC头像和名称展示
  - [ ] 优化输入区域布局
  - [ ] 优化属性条、背包、NPC关系等面板
  - [ ] 优化游戏事件卡片样式

- [ ] Task 5: 改造抽卡页（gachaPage）
  - [ ] 从GemDesign获取抽卡页设计内容
  - [ ] 升级抽卡动画效果
  - [ ] 优化卡片展示区域
  - [ ] 优化不同稀有度的视觉区分
  - [ ] 优化抽卡结果展示

- [ ] Task 6: 改造角色相关页面（characterListPage + characterDetailPage + characterChatPage）
  - [ ] 从GemDesign获取角色页面设计内容
  - [ ] 优化角色列表卡片网格布局
  - [ ] 优化角色详情页信息展示
  - [ ] 优化角色聊天页对话界面
  - [ ] 统一三个页面间的导航和视觉风格

## P2 - 辅助功能页面

- [ ] Task 7: 改造书架和阅读器页面（bookShelfPage + bookReaderPage）
  - [ ] 从GemDesign获取书架/阅读器设计内容
  - [ ] 优化书籍封面展示和排列
  - [ ] 优化阅读器文字排版和翻页体验
  - [ ] 优化阅读器设置面板

- [ ] Task 8: 改造创世战争页（creatorWarsPage）
  - [ ] 从GemDesign获取创世战争页设计内容
  - [ ] 优化B站风格界面一致性
  - [ ] 优化视频卡片布局
  - [ ] 优化深色/浅色模式切换

- [ ] Task 9: 改造章节任务页（chapterMissionPage）
  - [ ] 从GemDesign获取章节任务页设计内容
  - [ ] 优化章节卡片书本质感
  - [ ] 优化章节选择交互
  - [ ] 优化背景氛围

## P3 - 工具页面

- [ ] Task 10: 改造模型测试页（modelTestPage）
  - [ ] 从GemDesign获取模型测试页设计内容
  - [ ] 优化模型展示区域
  - [ ] 优化控制面板布局

## P4 - 收尾验证

- [ ] Task 11: 全局验证和修复
  - [ ] 检查所有页面视觉一致性
  - [ ] 检查所有页面响应式布局
  - [ ] 检查所有交互功能正常
  - [ ] 修复发现的样式问题

# Task Dependencies
- Task 1, Task 2 是所有后续任务的前置条件
- Task 3（首页）优先级最高，应首先完成
- Task 4-6 可并行执行
- Task 7-9 可并行执行
- Task 10 依赖 Task 1, 2
- Task 11 依赖所有其他任务完成
