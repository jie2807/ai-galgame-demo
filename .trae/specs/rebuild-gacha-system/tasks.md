# Tasks

- [ ] Task 1: 删除内联抽卡 HTML
  - [ ] SubTask 1.1: 删除 `index.html` 中 `#gachaPage` 整个 div（约第 1516-1600 行）
  - [ ] SubTask 1.2: 删除 `index.html` 中 `#gachaCollectionModal` div

- [ ] Task 2: 删除内联抽卡 JavaScript
  - [ ] SubTask 2.1: 删除 `index.html` 内联脚本中 `gachaPool` 数组定义（约第 3091 行起）
  - [ ] SubTask 2.2: 删除 `gachaState` 变量及初始化逻辑（约第 3154-3175 行）
  - [ ] SubTask 2.3: 删除 `updateGachaUI`、`pullGacha`、`showEnvelopeResult`、`_gachaPullQueue` 等抽卡函数
  - [ ] SubTask 2.4: 删除抽卡按钮事件绑定（约第 7317-7400 行）
  - [ ] SubTask 2.5: 删除 `gachaKeydownHandler` 键盘事件
  - [ ] SubTask 2.6: 将游戏页面中对 `gachaPool` 的引用改为从 `window.__APP__.gachaPool` 获取（约第 3823、5503-5506、5572-5575、5609-5621 行）

- [ ] Task 3: 删除内联抽卡 CSS
  - [ ] SubTask 3.1: 删除 `styles.css` 中 `.gacha-bg-video` 到 `.gacha-collection-modal.active` 样式（约第 1091-1500 行）
  - [ ] SubTask 3.2: 删除 `styles.css` 中第二段 `.gacha-page` 到 `.gacha-collection-modal.active` 样式（约第 5074-5400 行）
  - [ ] SubTask 3.3: 删除 `styles.css` 中 `.gacha-pull-single, .gacha-pull-ten` 样式（约第 7407 行）

- [ ] Task 4: 删除旧模块化抽卡文件
  - [ ] SubTask 4.1: 删除 `pages/gacha/GachaPage.js`
  - [ ] SubTask 4.2: 删除 `pages/gacha/gacha.css`

- [ ] Task 5: 创建统一抽卡池数据
  - [ ] SubTask 5.1: 新建 `data/gachaPool.js`，定义 `GACHA_POOL` 常量，包含 4 星/3 星/2 星角色
  - [ ] SubTask 5.2: 确保角色 id 与 `data/characters.js` 和 `data/gameData.js` 的 `gameCharacters` 对齐
  - [ ] SubTask 5.3: 导出 `getGachaPool()` 函数返回完整池
  - [ ] SubTask 5.4: 在 `main.js` 初始化时将 `gachaPool` 挂载到 `window.__APP__`

- [ ] Task 6: 重建模块化抽卡页面
  - [ ] SubTask 6.1: 新建 `pages/gacha/GachaPage.js`，实现 mount/unmount 生命周期
  - [ ] SubTask 6.2: 实现 template() 生成页面 HTML（背景视频、标题栏、信件计数、抽卡按钮、收藏按钮、结果卡片、收藏弹窗）
  - [ ] SubTask 6.3: 实现抽卡核心逻辑：rollRarity()、pullOne()、pull(count)
  - [ ] SubTask 6.4: 实现抽卡动画：playPullAnimation() 播放视频 + 超时降级
  - [ ] SubTask 6.5: 实现结果展示：showResult() 显示角色卡片，confirmResult() 翻页/关闭
  - [ ] SubTask 6.6: 实现收藏列表：showCollection() / hideCollection()
  - [ ] SubTask 6.7: 实现状态持久化：saveState() / loadState() 使用 localStorage `gacha_state`
  - [ ] SubTask 6.8: 实现 bindEvents() 事件绑定，使用 data-action 委托
  - [ ] SubTask 6.9: 新建 `pages/gacha/gacha.css`，编写完整样式（复用项目设计语言：金色 #d4a574、深棕 #2a1810）

- [ ] Task 7: 更新路由配置
  - [ ] SubTask 7.1: 从 `main.js` 的 `INLINE_PAGE_MAP` 中移除 `/gacha` 映射
  - [ ] SubTask 7.2: 从 `OVERLAY_SELECTORS` 中移除 `.gacha-page`
  - [ ] SubTask 7.3: 确认 `main.js` 的 `registerRoutes()` 中 `/gacha` 路由已正确注册懒加载
  - [ ] SubTask 7.4: 删除 `main.js` 中 `gachaBackBtn` 的返回按钮同步代码

- [ ] Task 8: 更新 `pages/gacha/index.js` 导出
  - [ ] SubTask 8.1: 确认 `index.js` 正确导出新的 `GachaPage`

# Task Dependencies
- [Task 1, Task 2, Task 3, Task 4] 可并行执行（删除旧代码）
- [Task 5] 独立，可与删除任务并行
- [Task 6] 依赖 Task 5（需要 gachaPool 数据）
- [Task 7] 依赖 Task 6（需要新页面就绪）
- [Task 8] 依赖 Task 6
