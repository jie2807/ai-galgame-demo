# Tasks

- [x] Task 1: 设计简历式结果弹窗 DOM 结构
  - [x] SubTask 1.1: 重构 `#gachaEnvelopeResult` 内部 HTML，改为 A4 简历式档案页结构
  - [x] SubTask 1.2: 保留立绘区 `.envelope-portrait` 并改为完整比例展示
  - [x] SubTask 1.3: 新增简历字段容器：姓名、称号、稀有度、灵感、性别、年龄、性格、简介、初遇台词、重复印章、计数器

- [x] Task 2: 改写单抽结果展示逻辑
  - [x] SubTask 2.1: 改写 `showEnvelopeResult(index)`，按新 DOM 填充字段
  - [x] SubTask 2.2: 确保角色 portrait/Live2D 完整显示，不被裁剪
  - [x] SubTask 2.3: 显示 `firstMessage` 作为「初遇台词」
  - [x] SubTask 2.4: 重复角色以印章形式展示「重复 +X 回忆碎片」
  - [x] SubTask 2.5: 保留「确认」按钮翻页/关闭逻辑

- [x] Task 3: 改写十连总览卡片
  - [x] SubTask 3.1: 改写 `showTenPullSummary()` 中卡片 DOM 为简历缩略图
  - [x] SubTask 3.2: 缩略图内头像完整显示，下方显示姓名与稀有度徽章
  - [x] SubTask 3.3: 重复角色缩略图显示小印章
  - [x] SubTask 3.4: 点击缩略图可打开对应角色的完整简历弹窗

- [x] Task 4: 编写简历式结果样式
  - [x] SubTask 4.1: 覆盖 `.gacha-envelope-result`、`.gacha-envelope-card` 为纸张/档案风格
  - [x] SubTask 4.2: 设计 `.resume-*` 系列样式：标题、徽章、分栏、印章、按钮
  - [x] SubTask 4.3: 确保立绘容器完整显示（`object-fit: contain` 或等比缩放）
  - [x] SubTask 4.4: 覆盖 `.gacha-ten-summary-card` 为简历缩略图样式
  - [x] SubTask 4.5: 添加移动端响应式规则（≤768px 与 ≤480px）

- [x] Task 5: 验证与回归测试
  - [x] SubTask 5.1: 浏览器验证单抽结果以简历形式完整展示立绘与信息
  - [x] SubTask 5.2: 浏览器验证十连总览简历缩略图正常显示与点击
  - [x] SubTask 5.3: 验证重复角色印章提示正常
  - [x] SubTask 5.4: 验证关闭弹窗后不影响抽卡页面其他功能
  - [x] SubTask 5.5: 验证移动端 375px~768px 下简历卡片可读

- [x] Task 6: 修复移动端简历卡片可读性
  - [x] SubTask 6.1: 调整 ≤768px 媒体查询中简历卡片的字体大小，使正文不小于 12px、标题不小于 16px
  - [x] SubTask 6.2: 调整 ≤480px 媒体查询中简历卡片的字体大小与按钮点击区域，使确认按钮高度不小于 44px
  - [x] SubTask 6.3: 确保十连总览缩略图在移动端姓名、稀有度徽章清晰可读
  - [x] SubTask 6.4: 重新进行浏览器移动端验证

# Task Dependencies

- [Task 1] 必须先完成，[Task 2] 依赖 [Task 1]
- [Task 3] 可与 [Task 2] 并行开始，但需复用部分 DOM/样式定义
- [Task 4] 依赖 [Task 1] 与 [Task 3]
- [Task 5] 依赖所有前置任务完成