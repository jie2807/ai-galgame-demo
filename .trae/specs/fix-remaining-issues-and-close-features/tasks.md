# Tasks

- [x] Task 1: 修复自定义剧本智能生成致命 bug
  - [x] SubTask 1.1: 在 `index.html` 第 23474-23482 行空白处补全 5 个缺失函数：`showGenProgress(stage)`、`updateGenProgress(percent, text)`、`completeGenProgress()`、`hideGenProgress()`、`showSuccessToast(msg)`
  - [x] SubTask 1.2: 将 `CustomScriptGenerator.run` 中第 23809 行的 `showGenProgress('send')` 调用移入 `try` 块内（第 23814 行之后），避免未定义时绕过 `finally` 导致按钮永久禁用
  - [x] SubTask 1.3: 在 `catch` 块内为 `hideGenProgress()` 加 `typeof hideGenProgress === 'function'` 守卫，防止函数缺失时再次抛错吞掉原始错误
  - [x] SubTask 1.4: 给 `generateCustomScript` 按钮的事件监听器追加 `.catch(err => showError(err))`，将 unhandled rejection 转为用户可见提示
  - [x] SubTask 1.5: 验证 `showInfoToast`、`showError`、`showErrorToast` 等被 `CustomScriptGenerator` 依赖的函数均已存在；若缺失则补全

- [x] Task 2: 补全书架页布局 CSS
  - [x] SubTask 2.1: 在 `styles.css` 中补充以下缺失类：`.shelf-page-bg`（背景）、`.shelf-header`（顶部栏，含返回/标题/公告按钮）、`.shelf-body`（主体容器）、`.shelf-grid`（书籍网格，repeat(auto-fill, minmax)）、`.shelf-empty`、`.shelf-empty-icon`、`.shelf-empty-text`（空书架提示）
  - [x] SubTask 2.2: 补充书籍卡片相关类：`.shelf-book-card`、`.shelf-book-cover`、`.shelf-book-title`、`.shelf-book-subtitle`、`.shelf-book-meta`、`.shelf-book-actions`、`.shelf-book-btn`
  - [x] SubTask 2.3: 补充按钮类：`.shelf-back-btn`、`.shelf-announce-btn`
  - [x] SubTask 2.4: 在移动端断点（max-width: 768px）补充响应式样式，确保网格在小屏下变成 2 列
  - [x] SubTask 2.5: 打开浏览器进入书架页验证布局正确，无纯黑无样式现象

- [x] Task 3: 创建 `showDevToast(featureName)` 通用函数
  - [x] SubTask 3.1: 在 `index.html` 中（建议紧邻 `showAiWorkbenchToast` 定义之后，约第 35555 行）新增 `showDevToast(featureName)` 函数
  - [x] SubTask 3.2: 函数体复用 `dynamicIslandToast` 元素和灵动岛样式，文案根据 `featureName` 动态生成：`{featureName}功能正在开发中，敬请期待`
  - [x] SubTask 3.3: 添加 `window.showDevToast = showDevToast` 导出，确保内联 onclick 可调用
  - [x] SubTask 3.4: 浏览器控制台执行 `showDevToast('测试')` 验证弹窗显示正确

- [x] Task 4: 修改纪念收藏入口为开发中提示
  - [x] SubTask 4.1: 将第 10772 行 `memorialBtn.addEventListener('click', showMemorialModal)` 改为 `memorialBtn.addEventListener('click', function() { showDevToast('纪念收藏'); })`
  - [x] SubTask 4.2: 检查是否还有其他位置绑定 `showMemorialModal`（如内联 onclick），统一替换
  - [x] SubTask 4.3: 保留 `#memorialCollectionModal` HTML、`showMemorialModal`/`hideMemorialModal` 函数定义，便于未来重新开放
  - [x] SubTask 4.4: 浏览器点击"纪念收藏"按钮验证弹窗显示"纪念收藏功能正在开发中，敬请期待"

- [x] Task 5: 修改养成学院入口为开发中提示
  - [x] SubTask 5.1: 将第 26750-26768 行 `.feature-btn.doll-school` 的 click 回调从导航到 `characterListPage` 改为 `showDevToast('养成学院')`
  - [x] SubTask 5.2: 检查是否还有其他位置触发养成学院导航（如左侧菜单、内联 onclick），统一替换
  - [x] SubTask 5.3: 保留 `#characterListPage` HTML、`renderCharacterList()` 函数定义，便于未来重新开放
  - [x] SubTask 5.4: 浏览器点击"养成学院"按钮验证弹窗显示"养成学院功能正在开发中，敬请期待"

- [x] Task 6: 排查其他潜在问题
  - [x] SubTask 6.1: 用 Grep 搜索 `index.html` 中所有 `onclick="` 内联事件，确认引用的函数均已定义
  - [x] SubTask 6.2: 用 Grep 搜索 `addEventListener\('click'` 等事件绑定，确认回调函数均已定义
  - [x] SubTask 6.3: 浏览器打开项目，F12 控制台观察是否有红色 ReferenceError 或 TypeError
  - [x] SubTask 6.4: 依次点击首页所有按钮（抽卡、书架、纪念收藏、养成学院、AI工作台、设置等），确认无报错且行为符合预期
  - [x] SubTask 6.5: 进入自定义剧本编辑器，验证 Task 1 修复后智能生成可用

- [ ] Task 7: 浏览器端到端验证
  - [ ] SubTask 7.1: 启动本地静态服务器打开 `index.html`
  - [ ] SubTask 7.2: 桌面端：依次验证 4 个问题的修复效果（智能生成、书架页、纪念收藏、养成学院）
  - [ ] SubTask 7.3: 移动端（窗口宽度 ≤ 768px）：验证书架页响应式布局、灵动岛弹窗位置正确
  - [ ] SubTask 7.4: 回归测试：验证抽卡系统、Creator Wars、写信等其他功能未受影响
  - [ ] SubTask 7.5: F12 控制台全程无红色错误（预存的 index.html:1:16 SyntaxError 除外，已在上一轮 spec 中标注）

# Task Dependencies

- [Task 3] 独立（创建通用函数，不依赖其他任务）
- [Task 4] depends on [Task 3]（纪念收藏入口需要 showDevToast 就位）
- [Task 5] depends on [Task 3]（养成学院入口需要 showDevToast 就位）
- [Task 1] 独立（修复智能生成 bug，不依赖其他任务）
- [Task 2] 独立（补全 CSS，不依赖其他任务）
- [Task 6] depends on [Task 1, Task 2, Task 3, Task 4, Task 5]（排查需在所有修复完成后进行）
- [Task 7] depends on [Task 6]（端到端验证需在排查完成后进行）

# Parallelizable Work

- Task 1、Task 2、Task 3 三者无依赖，可并行委托给 3 个子代理同时执行
- Task 4、Task 5 必须在 Task 3 完成后执行，但二者之间无依赖，可并行
