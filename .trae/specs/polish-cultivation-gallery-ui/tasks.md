# Tasks

- [x] Task 1: 改造图鉴页面 DOM 结构
  - [x] SubTask 1.1: 在 `#characterListPage` 标题栏右上角新增「筛选」展开按钮
  - [x] SubTask 1.2: 将原 `#charlistSortBar`、 `#charlistRarityFilter`、 `#charlistAfflatusFilter` 包裹进 `#charlistFilterPanel` 可折叠容器
  - [x] SubTask 1.3: 绑定展开按钮点击事件，控制筛选面板的显示/隐藏
  - [x] SubTask 1.4: 保留原有排序/筛选按钮的事件委托与状态变量

- [x] Task 2: 移除角色卡片好感度徽章
  - [x] SubTask 2.1: 在 `renderCharacterList` 中删除 `affectionBadgeHtml` 的生成逻辑
  - [x] SubTask 2.2: 移除卡片 DOM 中 affectionBadgeHtml 的插入

- [x] Task 3: 编写筛选面板与卡片样式
  - [x] SubTask 3.1: 新增 `.charlist-filter-toggle` 按钮样式，确保可点击区域不小于 44px
  - [x] SubTask 3.2: 新增 `.charlist-filter-panel` 面板样式，包含纸张/暗色主题背景与阴影
  - [x] SubTask 3.3: 调整面板内排序与筛选按钮的排列（分组展示，清晰可点）
  - [x] SubTask 3.4: 删除或注释 `.charlist-card-affection-badge` 相关样式
  - [x] SubTask 3.5: 添加移动端响应式规则，确保小屏幕下面板不溢出

- [x] Task 4: 验证与回归测试
  - [x] SubTask 4.1: 浏览器验证进入图鉴页面后筛选按钮位于右上角
  - [x] SubTask 4.2: 验证点击筛选按钮可展开/收起面板
  - [x] SubTask 4.3: 验证面板内排序、稀有度筛选、灵感筛选功能正常
  - [x] SubTask 4.4: 验证角色卡片上不再显示好感度徽章
  - [x] SubTask 4.5: 验证移动端 375px~768px 下筛选按钮与面板可用
  - [x] SubTask 4.6: 验证角色详情页、抽卡系统、游戏主流程未受影响

# Task Dependencies

- [Task 1] 与 [Task 2] 可并行开始
- [Task 3] 依赖 [Task 1] 与 [Task 2]
- [Task 4] 依赖 [Task 3]
