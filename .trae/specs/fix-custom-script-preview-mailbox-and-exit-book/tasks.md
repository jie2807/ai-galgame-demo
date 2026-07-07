# Tasks

- [x] Task 1: 修复自定义剧本预览弹窗交互
  - [x] SubTask 1.1: 检查 `openScriptPreview` / `closeScriptPreview` 的实现与事件绑定
  - [x] SubTask 1.2: 确保关闭按钮、遮罩层点击、返回编辑、开始游玩均能正确关闭弹窗
  - [x] SubTask 1.3: 验证弹窗关闭后不会遮挡编辑器或游戏页面

- [x] Task 2: 自定义剧本游玩退出增加一键成书
  - [x] SubTask 2.1: 移除 `showExitConfirm` 中对自定义剧本隐藏 `exitBookBtn` 的限制
  - [x] SubTask 2.2: 验证自定义剧本游戏中点击退出时显示「一键成书」按钮
  - [x] SubTask 2.3: 验证点击「一键成书」正常调用 `generateBook()`

- [x] Task 3: 修正测试公告文案
  - [x] SubTask 3.1: 将发件人改为「官方」
  - [x] SubTask 3.2: 将称呼改为「亲爱的玩家」，游戏名称改为《随说》
  - [x] SubTask 3.3: 补充 AI 模型免费、仅文本模型、敏感词提示、一键成书所有权说明
  - [x] SubTask 3.4: 润色公告全文，确保通顺正式

- [x] Task 4: 优化邮箱面板视觉
  - [x] SubTask 4.1: 将邮箱面板标题改为「邮件」
  - [x] SubTask 4.2: 移除标题栏邮箱图标
  - [x] SubTask 4.3: 调细面板外边框与标题栏底边边框

- [x] Task 5: 回归验证
  - [x] SubTask 5.1: 验证自定义剧本预览打开/关闭/返回编辑/开始游玩
  - [x] SubTask 5.2: 验证自定义剧本退出弹窗按钮完整
  - [x] SubTask 5.3: 验证测试公告内容正确
  - [x] SubTask 5.4: 验证邮箱面板标题、图标、边框符合要求
  - [x] SubTask 5.5: 验证官方剧本退出成书功能未受影响

# Task Dependencies

- Task 2 不依赖 Task 1，可并行。
- Task 5 依赖 Task 1、Task 2、Task 3、Task 4。
