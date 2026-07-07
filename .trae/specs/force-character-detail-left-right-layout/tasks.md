# Tasks

- [x] Task 1: 修改角色详情页 768px 媒体查询
  - [x] SubTask 1.1: 将 `.character-detail-page .chardetail-content` 的 `flex-direction: column-reverse` 改为 `flex-direction: row`
  - [x] SubTask 1.2: 将 `.chardetail-info-area` 改为宽度 45%、高度 100%、可滚动
  - [x] SubTask 1.3: 将 `.chardetail-portrait-area` 改为宽度 55%、高度 100%
  - [x] SubTask 1.4: 缩小信息区内边距与字号，避免 375px 下溢出

- [x] Task 2: 修改角色详情页 480px 媒体查询
  - [x] SubTask 2.1: 同样强制 `flex-direction: row`
  - [x] SubTask 2.2: 进一步缩小内边距与字号
  - [x] SubTask 2.3: 确保按钮可点击、文字可读

- [x] Task 3: 验证与回归测试
  - [x] SubTask 3.1: 浏览器验证 1280px 下仍为左右布局
  - [x] SubTask 3.2: 浏览器验证 768px 下不再上下堆叠，仍为左右布局
  - [x] SubTask 3.3: 浏览器验证 375px 下仍为左右布局，信息区可滚动
  - [x] SubTask 3.4: 验证立绘完整显示
  - [x] SubTask 3.5: 验证「写信」按钮可点击
  - [x] SubTask 3.6: 验证返回按钮可点击且功能正常

# Task Dependencies

- [Task 2] 依赖 [Task 1]
- [Task 3] 依赖 [Task 2]
