# Tasks

- [x] Task 1: 补齐抽卡核心逻辑与状态管理
  - [x] SubTask 1.1: 实现 `loadGachaState()`，从 `localStorage.gacha_state` 读取状态，失败时使用默认值
  - [x] SubTask 1.2: 实现 `saveGachaState()`，将 `gachaState` 写入 `localStorage.gacha_state`
  - [x] SubTask 1.3: 实现 `rollRarity()`，按 4 星 5% / 3 星 25% / 2 星 70% 返回稀有度，并处理 30 抽保底
  - [x] SubTask 1.4: 实现 `drawCharacter(rarity)`，从对应稀有度池中随机抽取角色
  - [x] SubTask 1.5: 实现 `executeGachaPull(count)`，消耗信件、执行抽卡、填充结果队列、更新状态
  - [x] SubTask 1.6: 实现 `updateGachaUI()`，刷新信件数、碎片数、宝石数、保底计数显示
  - [x] SubTask 1.7: 在页面初始化时调用 `loadGachaState()` 与 `updateGachaUI()`

- [x] Task 2: 实现抽卡结果展示
  - [x] SubTask 2.1: 实现 `showEnvelopeResult(index)`，显示单抽结果卡片（立绘、信息、重复标记）
  - [x] SubTask 2.2: 实现 `closeEnvelopeResult()`，关闭结果遮罩并处理多结果翻页
  - [x] SubTask 2.3: 实现十连结果总览面板渲染，展示 10 张结果卡片并高亮 4 星
  - [x] SubTask 2.4: 绑定结果遮罩的「确认」按钮点击事件，支持连点切换下一张
  - [x] SubTask 2.5: 实现抽卡动画过渡（信封展开或光效），使用现有动画变量避免引入新依赖

- [x] Task 3: 实现信件来源与碎片兑换
  - [x] SubTask 3.1: 实现信件来源面板打开/关闭逻辑
  - [x] SubTask 3.2: 实现宝石兑换信件：10 宝石 = 1 信件，输入校验与状态更新
  - [x] SubTask 3.3: 实现兑换商店打开/关闭逻辑，显示当前回忆碎片数量
  - [x] SubTask 3.4: 实现碎片兑换信件、随机 3 星角色、指定 3 星角色
  - [x] SubTask 3.5: 实现指定 3 星角色选择面板 `openChooseCharacter()`

- [x] Task 4: 改造抽卡页面样式
  - [x] SubTask 4.1: 设计并覆盖 `.gacha-page`、`.gacha-header`、`.gacha-main`、`.gacha-footer` 样式
  - [x] SubTask 4.2: 设计抽卡按钮样式（单抽/十连/图鉴/兑换），使用火漆/信封元素
  - [x] SubTask 4.3: 设计结果卡片 `.gacha-envelope-result` 与十连总览面板样式
  - [x] SubTask 4.4: 添加移动端响应式规则（≤768px 与 ≤480px）

- [x] Task 5: 改造角色列表页
  - [x] SubTask 5.1: 重构 `#characterListPage` DOM，新增顶部进度条（已获得/总数）
  - [x] SubTask 5.2: 改写 `renderCharacterList()`，支持已拥有与未拥有角色同时展示
  - [x] SubTask 5.3: 为未拥有角色生成灰度占位卡片，禁用点击或点击提示「前往抽卡」
  - [x] SubTask 5.4: 保留并优化排序/筛选栏（默认、好感度、获取时间、稀有度、灵感）
  - [x] SubTask 5.5: 绑定列表页返回按钮事件，返回时恢复首页背景视频

- [x] Task 6: 改造角色详情页
  - [x] SubTask 6.1: 重构 `#characterDetailPage` DOM，采用左右分栏布局
  - [x] SubTask 6.2: 改写 `showCharacterDetail(charId)`，按新布局填充角色信息
  - [x] SubTask 6.3: 左侧实现角色立绘/Live2D 展示，优先使用 `charData.live2dModel`，失败回退静态 portrait
  - [x] SubTask 6.4: 右侧实现基本信息、好感度、角色简介、互动回忆、专属信件区域
  - [x] SubTask 6.5: 绑定「返回」与「写信」按钮，写信进入 `characterChatPage`
  - [x] SubTask 6.6: 调整详情页返回逻辑，支持从列表页或聊天页返回

- [x] Task 7: 改造角色列表与详情页样式
  - [x] SubTask 7.1: 设计 `.charlist-*` 系列样式：背景、头部、筛选栏、卡片网格、空状态
  - [x] SubTask 7.2: 设计 `.chardetail-*` 系列样式：分栏布局、立绘区、信息区、好感度条、按钮
  - [x] SubTask 7.3: 设计角色卡片稀有度光效（4 星金、3 星紫、2 星蓝）
  - [x] SubTask 7.4: 添加角色列表与详情页移动端响应式规则

- [x] Task 8: 打通纪念收藏入口
  - [x] SubTask 8.1: 移除首页「纪念收藏」按钮的「正在开发中」提示
  - [x] SubTask 8.2: 绑定点击事件，通过 `PageTransition.transition` 进入 `#characterListPage`
  - [x] SubTask 8.3: 从首页进入时，角色列表页默认显示全部角色（含未拥有）

- [x] Task 9: 兼容性验证
  - [x] SubTask 9.1: 验证 `data/characters.js` 未被修改，数据结构保持兼容
  - [x] SubTask 9.2: 验证 `localStorage` 键（`gacha_state`、`affection_data` 等）数据可正常读写
  - [x] SubTask 9.3: 验证从抽卡/角色页返回首页不影响首页其他功能
  - [x] SubTask 9.4: 验证游戏主流程、章节选择、AI 工作台、邮箱系统不受改动影响

# Task Dependencies

- [Task 1] 必须先完成，[Task 2] 与 [Task 3] 依赖 [Task 1]
- [Task 4] 依赖 [Task 2] 与 [Task 3]
- [Task 5] 可与 [Task 1] 并行开始，但卡片点击需等 [Task 6]
- [Task 6] 依赖 [Task 5]
- [Task 7] 依赖 [Task 5] 与 [Task 6]
- [Task 8] 依赖 [Task 5]
- [Task 9] 依赖所有前置任务完成
