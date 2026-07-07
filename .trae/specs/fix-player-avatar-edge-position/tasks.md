# Tasks

- [x] Task 1: 调整消息头像靠边
  - [x] SubTask 1.1: 将 `.charchat-message-player` 改为 `flex-direction: row-reverse; justify-content: flex-start`
  - [x] SubTask 1.2: 将 `.charchat-message-character` 改为 `flex-direction: row; justify-content: flex-start`
  - [x] SubTask 1.3: 确保玩家头像在右侧边缘、角色头像在左侧边缘
  - [x] SubTask 1.4: 保持气泡与头像间距

- [x] Task 2: 简化写信页头部与左侧信息栏
  - [x] SubTask 2.1: 删除 `.charchat-right-panel` 中的 `.charchat-header`
  - [x] SubTask 2.2: 在 `.charchat-left-panel` 顶部添加方形透明返回按钮，并绑定 `charchatBackBtn` 事件
  - [x] SubTask 2.3: 将 `.charchat-char-info` 背景改为透明
  - [x] SubTask 2.4: 将「在线」提示移动到 `.charchat-char-info` 中角色名称右侧

- [x] Task 3: 样式微调
  - [x] SubTask 3.1: 设置 `.charchat-left-back-btn` 为方形、透明、毛玻璃效果
  - [x] SubTask 3.2: 调整 `.charchat-online-status` 大小与位置
  - [x] SubTask 3.3: 确保移除 `.charchat-header` 后右侧聊天区无多余空白

- [x] Task 4: 首次验证
  - [x] SubTask 4.1: 浏览器验证玩家头像在右侧边缘、角色头像在左侧边缘
  - [x] SubTask 4.2: 验证左侧名称栏透明
  - [x] SubTask 4.3: 验证右侧无标题栏，返回按钮在左上角
  - [x] SubTask 4.4: 验证在线提示在名称右侧
  - [x] SubTask 4.5: 验证返回按钮可正常返回详情页
  - [x] SubTask 4.6: 验证移动端布局正常

- [x] Task 5: 修复头像靠边与返回按钮细节
  - [x] SubTask 5.1: 将玩家消息 DOM 顺序改为 `[avatar, bubble]`，使 `row-reverse` 后头像位于最右侧
  - [x] SubTask 5.2: 调整 `.charchat-message-character` 头像 `margin-left: 12px`，使其靠近消息区左边缘
  - [x] SubTask 5.3: 调整 `.charchat-message-player` 头像 `margin-right: 12px`，使其靠近消息区右边缘
  - [x] SubTask 5.4: 将 `.charchat-messages` 水平 padding 改为 0，改为给气泡/头像设置间距
  - [x] SubTask 5.5: 将返回按钮改为方形透明（border-radius 2px、背景 transparent、半透明边框）

- [x] Task 6: 回归验证
  - [x] SubTask 6.1: 浏览器验证玩家头像在消息区最右侧边缘
  - [x] SubTask 6.2: 浏览器验证角色头像在消息区最左侧边缘
  - [x] SubTask 6.3: 验证返回按钮为方形透明
  - [x] SubTask 6.4: 验证聊天功能、返回功能正常

- [x] Task 7: 修复玩家头像右侧间距（隐藏聊天区滚动条）
  - [x] SubTask 7.1: 为 `.charchat-messages` 添加 `scrollbar-width: none` 与 `::-webkit-scrollbar { display: none; }`
  - [x] SubTask 7.2: 确保隐藏滚动条后仍可滚动
  - [x] SubTask 7.3: 验证玩家头像右边缘到 `.charchat-messages` 右边缘 ≤ 12px

- [x] Task 8: 最终验证
  - [x] SubTask 8.1: 浏览器验证玩家头像紧贴右侧边缘
  - [x] SubTask 8.2: 浏览器验证角色头像紧贴左侧边缘
  - [x] SubTask 8.3: 验证聊天滚动与 AI 回复正常

# Task Dependencies

- [Task 2] 可与 [Task 1] 并行开始
- [Task 3] 依赖 [Task 2]
- [Task 4] 依赖 [Task 1] 与 [Task 3]
- [Task 5] 依赖 [Task 4]
- [Task 6] 依赖 [Task 5]
- [Task 7] 由 [Task 6] 的验证结果触发
- [Task 8] 依赖 [Task 7]
