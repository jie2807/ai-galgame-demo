# Tasks

- [x] Task 1: 重构角色详情页 DOM 结构
  - [x] SubTask 1.1: 将 `.chardetail-portrait-area` 移到 `.chardetail-info-area` 之后，作为右栏
  - [x] SubTask 1.2: 调整 `.chardetail-info-area` 内部顺序：返回按钮、标题区、字段区、好感度、简介、写信按钮
  - [x] SubTask 1.3: 删除 `#chardetailMemorySection` 与 `#chardetailMailSection` 两个 DOM 区块
  - [x] SubTask 1.4: 在 `showCharacterDetail` 中移除 `renderCharacterMemory` 与 `renderCharacterMail` 调用
  - [x] SubTask 1.5: 将 `#chardetailChatBtn` 移入 `.chardetail-info-area` 底部

- [x] Task 2: 重写角色详情页样式
  - [x] SubTask 2.1: 将 `#characterDetailPage` 改为左右两栏布局（左约 45%，右约 55%）
  - [x] SubTask 2.2: 设置 `.chardetail-info-area` 背景透明，保留文字颜色与内边距
  - [x] SubTask 2.3: 设置 `.chardetail-portrait-area` 占满右栏，背景透明，无边框/阴影/圆角
  - [x] SubTask 2.4: 设置 `.chardetail-portrait img/canvas` 使用 `object-fit: contain` 完整展示
  - [x] SubTask 2.5: 删除 `.chardetail-memory-section`、`.chardetail-mail-section` 相关样式
  - [x] SubTask 2.6: 调整 `.chardetail-chat-btn` 在信息区底部的样式
  - [x] SubTask 2.7: 添加移动端响应式规则（≤768px、≤480px）

- [x] Task 3: 验证与回归测试
  - [x] SubTask 3.1: 浏览器验证角色详情页为左右分栏
  - [x] SubTask 3.2: 验证左侧信息区背景透明、右侧立绘无卡片边框
  - [x] SubTask 3.3: 验证不再显示「互动回忆」与「专属信件」
  - [x] SubTask 3.4: 验证「写信」按钮位于左侧信息区且可点击进入聊天页
  - [x] SubTask 3.5: 验证立绘完整显示、无裁剪
  - [x] SubTask 3.6: 验证移动端 375px~768px 下布局正常
  - [x] SubTask 3.7: 验证返回按钮、角色列表页、抽卡系统、游戏主流程未受影响

- [x] Task 4: 修复验证中发现的问题
  - [x] SubTask 4.1: 修改 `showCharacterDetail` 中立绘 img 的内联样式，从 `object-fit: cover` 改为 `object-fit: contain`
  - [x] SubTask 4.2: 调整信息区结构，将「角色简介」区块移到好感度之前，并避免与「身世」字段重复
  - [x] SubTask 4.3: 修复从聊天页返回详情页时 `NavigationHistory` 重复压入 `characterDetailPage` 的问题

# Task Dependencies

- [Task 2] 依赖 [Task 1]
- [Task 3] 依赖 [Task 2]
- [Task 4] 依赖 [Task 3]
