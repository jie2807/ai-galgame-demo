# Tasks

- [x] Task 1: 调换首页入口事件绑定
  - [x] SubTask 1.1: 将「育成学院」按钮点击事件改为进入角色列表页 `PageManager.activate('characterListPage')`
  - [x] SubTask 1.2: 将「纪念收藏」按钮点击事件改为显示灵动岛开发中提示
  - [x] SubTask 1.3: 移除或注释「育成学院」原有的开发中提示代码
  - [x] SubTask 1.4: 保留纪念收藏弹窗 DOM 与关闭逻辑，但移除首页按钮触发

- [x] Task 2: 复用/提取灵动岛提示函数
  - [x] SubTask 2.1: 确认 `showAiWorkbenchToast` 可接受自定义消息，或新增通用 `showDynamicIslandToast(message)` 函数
  - [x] SubTask 2.2: 确保纪念收藏提示文案为「纪念收藏正在开发中，敬请期待」

- [x] Task 3: 修复按钮悬停抖动
  - [x] SubTask 3.1: 检查 `.feature-btn` 的 hover transform/transition 规则
  - [x] SubTask 3.2: 将可能导致抖动的 hover 效果替换为稳定的视觉反馈
  - [x] SubTask 3.3: 确保两个按钮在 hover 时不相互挤压或触发父容器重排
  - [x] SubTask 3.4: 验证按钮在桌面端和移动端均可稳定悬停/点击

- [x] Task 4: 验证与回归测试
  - [x] SubTask 4.1: 浏览器验证点击「育成学院」进入角色图鉴页面
  - [x] SubTask 4.2: 验证点击「纪念收藏」显示灵动岛提示且不打开弹窗
  - [x] SubTask 4.3: 验证鼠标在两个按钮上悬停时不抖动
  - [x] SubTask 4.4: 验证图鉴页返回首页后再次点击入口正常
  - [x] SubTask 4.5: 验证其他页面入口（抽卡页图鉴按钮）不受影响
  - [x] SubTask 4.6: 验证移动端可正常点击两个按钮

# Task Dependencies

- [Task 2] 依赖 [Task 1]
- [Task 3] 可与 [Task 1] 并行开始
- [Task 4] 依赖 [Task 2] 与 [Task 3]
