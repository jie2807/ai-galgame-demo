# Tasks

- [x] Task 1: 建立回归基线与差异对比
  - [x] 1.1 以 `.tmp_syntax_check.js` 和 `backups/index.html.bak` 为参考，列出当前 `index.html` 中所有「有调用但无定义」的全局函数
  - [x] 1.2 列出所有「HTML 元素存在但无事件绑定」的首页可交互元素
  - [x] 1.3 输出回归问题清单，作为修复与验证依据

- [x] Task 2: 恢复书架（Book Shelf）完整功能
  - [x] 2.1 恢复 `initBookEvents` 函数及其内部所有事件绑定
  - [x] 2.2 恢复 `openBookShelf`、`closeBookShelf`、`renderShelf`、`openBookReader`、`closeBookReader` 等函数
  - [x] 2.3 恢复书架数据读写函数 `loadShelf`、`saveShelf`、`addBookToShelf`、`deleteBookFromShelf`
  - [x] 2.4 恢复阅读器相关辅助函数（进度、偏好设置、公告等）
  - [x] 2.5 确保书架按钮点击后正常打开书架页面

- [x] Task 3: 恢复角色信息与邮件功能
  - [x] 3.1 恢复 `showUserInfoModal` 函数
  - [x] 3.2 恢复 `updateMsgBadge` 函数
  - [x] 3.3 为 `mailBtn` 添加点击事件绑定，调用 `openMailPanel`
  - [x] 3.4 验证点击角色信息区域可弹出用户信息模态框

- [x] Task 4: 修复活动横幅与提示 toast
  - [x] 4.1 修复或补齐左下角/右下角活动横幅的点击处理
  - [x] 4.2 修复 `dynamic-island-toast` 添加 `.show` 后仍不可见的 CSS/状态问题
  - [x] 4.3 确保每个横幅点击后都有明确反馈

- [x] Task 5: 浏览器回归验证
  - [x] 5.1 启动本地服务器，打开首页
  - [x] 5.2 检查控制台无 `ReferenceError`
  - [x] 5.3 依次点击首页所有按钮/可交互元素，确认均有响应
  - [x] 5.4 验证书架完整流程：打开、阅读（如可模拟）、删除、关闭
  - [x] 5.5 验证角色信息、邮件、活动横幅等功能

- [x] Task 6: 建立回归扫描脚本（可选但推荐）
  - [x] 6.1 编写一次性扫描脚本，输出当前 `index.html` 中所有「有调用无定义」的函数
  - [x] 6.2 将扫描结果保存到 spec 目录，供后续清理时参考

- [x] Task 7: 修复回归验证中暴露的附加首页交互问题
  - [x] 7.1 修复「纪念收藏」按钮：正确打开/关闭纪念收藏弹窗（统一使用 `.active` 类）
  - [x] 7.2 为「模型配置」面板添加关闭按钮与 ESC/遮罩关闭逻辑
  - [x] 7.3 验证上述面板可正常打开与关闭

# Task Dependencies

- [Task 2] 依赖 [Task 1]
- [Task 3] 依赖 [Task 1]
- [Task 4] 依赖 [Task 1]
- [Task 5] 依赖 [Task 2]、[Task 3]、[Task 4]
- [Task 6] 依赖 [Task 5]
- [Task 7] 依赖 [Task 5]
