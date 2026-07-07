# Tasks

- [x] Task 1: 实现 PageManager 页面管理器
  - [x] SubTask 1.1: 在 index.html 中新增 `PageManager` 对象，提供 `activate(pageId)` 和 `deactivateAll()` 方法
  - [x] SubTask 1.2: `activate` 方法需移除所有子页面的 `.active` 类，再激活目标页面，并控制首页 `home-hidden`
  - [x] SubTask 1.3: `deactivateAll` 方法需关闭所有子页面并显示首页

- [x] Task 2: 替换主要页面入口与返回逻辑
  - [x] SubTask 2.1: 替换首页「文明的枝节」入口的页面切换代码
  - [x] SubTask 2.2: 替换首页「纪念收藏」入口的页面切换代码
  - [x] SubTask 2.3: 替换抽卡页返回首页的逻辑
  - [x] SubTask 2.4: 替换图鉴页返回首页的逻辑
  - [x] SubTask 2.5: 替换详情页返回图鉴/首页的逻辑
  - [x] SubTask 2.6: 替换聊天页返回详情/首页的逻辑
  - [x] SubTask 2.7: 替换游戏、书架、阅读器等主要入口的页面切换代码
  - [x] SubTask 2.8: 保留 `NavigationHistory` 的 push/pop 逻辑不变

- [x] Task 3: 移除各页面咖啡色背景遮罩
  - [x] SubTask 3.1: 修改 `.gacha-bg-gradient` 去除咖啡色
  - [x] SubTask 3.2: 修改 `.charlist-bg-gradient` 去除咖啡色
  - [x] SubTask 3.3: 修改 `.chardetail-bg-gradient` 去除咖啡色
  - [x] SubTask 3.4: 修改 `.charchat-bg-gradient` 去除咖啡色
  - [x] SubTask 3.5: 修改 `.game-bg-gradient` 去除咖啡色
  - [x] SubTask 3.6: 修改 `.book-shelf-page`、`.book-reader-page` 背景去除咖啡色
  - [x] SubTask 3.7: 修改 `.model-test-bg-gradient` 去除咖啡色
  - [x] SubTask 3.8: 检查并清理其他页面残留的咖啡色渐变

- [x] Task 4: 验证与回归测试
  - [x] SubTask 4.1: 浏览器验证从首页进入抽卡页后，其他页面已关闭
  - [x] SubTask 4.2: 验证从抽卡页返回首页后，首页正常显示、抽卡页关闭
  - [x] SubTask 4.3: 验证图鉴、详情、聊天页之间的切换与返回正常
  - [x] SubTask 4.4: 验证各页面背景不再呈现咖啡色
  - [x] SubTask 4.5: 验证背景图/视频仍然可见且文字可读
  - [x] SubTask 4.6: 验证移动端 375px~768px 下页面切换正常
  - [x] SubTask 4.7: 验证游戏主流程、AI 工作台、邮箱系统未受影响

# Task Dependencies

- [Task 2] 依赖 [Task 1]
- [Task 3] 可与 [Task 1] 并行开始
- [Task 4] 依赖 [Task 2] 与 [Task 3]
