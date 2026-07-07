# Tasks

- [x] Task 1: 合并gameChapters为1个开放世界章节
  - [x] SubTask 1.1: 将3个短流程章节替换为1个SCP基金会开放世界章节（id=1, title="SCP基金会 - Site-19", npcs包含全部6个角色, 开放世界openingScene）
  - [x] SubTask 1.2: 更新chapterLocations为1个章节的完整Site-19地点体系（12地点）
  - [x] SubTask 1.3: 更新getBuiltInScripts中的默认标签逻辑

- [x] Task 2: 修复官方剧本入口流程
  - [x] SubTask 2.1: 重写modeOfficial点击事件，改为直接调用startGame(1)，不再打开chapterMissionModal

- [x] Task 3: 实现Galgame风格对话界面布局
  - [x] SubTask 3.1: 重构game-content-area HTML结构为三层（全屏背景图+立绘/信息面板+底部对话条）
  - [x] SubTask 3.2: 编写Galgame布局CSS样式（全屏背景、左侧立绘、底部对话条、右侧角色面板）
  - [x] SubTask 3.3: 修改对话消息渲染逻辑，适配底部对话条模式（角色名+对话内容横向显示，旁白区分样式）
  - [x] SubTask 3.4: 实现角色立绘切换动画（发言角色切换时平滑过渡）
  - [x] SubTask 3.5: 实现右侧角色信息面板（可折叠，显示当前场景其他角色小头像+名称+状态）
  - [x] SubTask 3.6: 保留聊天历史查看功能（通过按钮展开完整对话记录面板）

- [x] Task 4: 配置SCP基金会场景背景图
  - [x] SubTask 4.1: 为Site-19各区域配置背景图URL（使用trae-api图片生成API）
  - [x] SubTask 4.2: 将背景图URL配置到locationBgMap中，实现地点切换时背景图自动更换

- [ ] Task 5: 验证官方剧本完整性和Galgame界面
  - [ ] SubTask 5.1: 验证点击"官方劇本"能直接启动游戏
  - [ ] SubTask 5.2: 验证Galgame对话界面布局正确（背景+立绘+对话条+角色面板）
  - [ ] SubTask 5.3: 验证角色立绘切换和背景图切换正常工作
  - [ ] SubTask 5.4: 验证自定义剧本功能不受影响

# Task Dependencies
- Task 1 必须在 Task 2 之前完成（入口流程依赖章节数据）
- Task 3 独立于 Task 1-2，可并行开发
- Task 4 依赖 Task 3（背景图需要集成到界面中）
- Task 5 依赖 Task 1-4 全部完成
