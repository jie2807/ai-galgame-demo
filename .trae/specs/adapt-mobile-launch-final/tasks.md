# Tasks

## P0 — 功能性阻塞修复（上线必须）

- [x] Task 1: 修复 CW 自定义框架/素材的触屏长按删除
  - [x] 1.1 定位 `index.html:37556-37583`（`.cw-framework-item` 删除逻辑）与 `37627-37654`（`.cw-material-modal-card` 删除逻辑），移除原有 `mousedown/mouseup/mouseleave + contextmenu` 绑定
  - [x] 1.2 改用项目已有的 `addLongPressListener`（`index.html:16730` 附近）绑定长按删除，保留 600ms 触发阈值
  - [x] 1.3 长按后调用原有 `showConfirmModal` 确认弹窗，确认后执行删除与持久化（localStorage）
  - [x] 1.4 验证桌面端右键/长按行为不回归（`addLongPressListener` 已含 mouse 轨）
  - [x] 1.5 移动端 DevTools 模拟 375×667 实测长按删除框架与素材各一次

- [x] Task 2: 修复对话消息编辑/删除入口在触屏不可见
  - [x] 2.1 在 `styles.css:6090-6095` 将 `.msg:hover .msg-actions { display: flex }` 改为 `@media (hover: hover) { .msg:hover .msg-actions { display: flex } }`
  - [x] 2.2 新增 `.msg.msg-actions-show .msg-actions { display: flex }` 规则，供触屏切换
  - [x] 2.3 在 `index.html` 消息渲染逻辑中（`18910`、`18947`、`19253` 附近生成 `.msg-actions` 的位置），为 `.msg` 元素绑定 `addLongPressListener`（500ms），触发时 toggle `.msg-actions-show` class
  - [x] 2.4 点击其他区域或操作完成后移除 `.msg-actions-show`（在 document 上加一次性 click 监听，或长按其他消息时自动切换）
  - [x] 2.5 验证桌面端 hover 仍显示按钮；移动端长按显示编辑 ✏️ 与删除 🗑️，点击编辑进入编辑态，点击删除走确认流程

- [x] Task 3: 剪贴板复制增加 execCommand 回退
  - [x] 3.1 定位 `index.html:30752` `navigator.clipboard.writeText(text).then(...)`
  - [x] 3.2 改写为：先检测 `navigator.clipboard?.writeText`，可用则调用并 catch；catch 或不可用时回退到创建临时 textarea + `document.execCommand('copy')`
  - [x] 3.3 失败路径提示"复制失败，请手动选择文本"
  - [x] 3.4 验证 HTTPS 环境正常复制；模拟 `navigator.clipboard` 为 undefined 时回退成功

## P1 — 交互基础设施补齐

- [x] Task 4: 全局 tap-highlight 抑制
  - [x] 4.1 在 `styles/reset.css` 增加 `*, *::before, *::after { -webkit-tap-highlight-color: transparent; }`
  - [x] 4.2 移动端实测各子页面点击无蓝色闪动

- [x] Task 5: 模态/全屏覆盖层 overscroll-behavior 与背景锁定
  - [x] 5.1 在 `styles/reset.css` 或 `styles.css` 新增 `body.modal-open { overflow: hidden; }` 规则
  - [x] 5.2 为所有 `position: fixed` 全屏覆盖层容器补 `overscroll-behavior: contain`（`#chapterMissionModal`、`#confirmModal`、`#exitConfirmModal`、`#cwMainView`、`#customChapterEditor`、`#scriptListPanel`、各 game 侧滑面板如 `#gameSettingsPanel` 等）
  - [x] 5.3 在 `index.html` 中打开/关闭覆盖层的统一入口（如 `openOverlay`/`closeOverlay` 或各 `show*Modal` 函数）增加 `body.classList.add/remove('modal-open')`
  - [x] 5.4 验证打开模态时背景不滚动、模态内可滚动；关闭后背景恢复

- [x] Task 6: 输入框 font-size ≥16px（防 iOS 自动放大）
  - [x] 6.1 定位 `styles.css:6815` `.wechat-search-box input { font-size: 14px }` 改为 16px
  - [x] 6.2 定位 `styles.css:6966` `.wechat-input-bar input { font-size: 14px }` 改为 16px
  - [x] 6.3 定位 `styles.css:2695` `.game-input { font-size: clamp(0.875rem, 3.5vw, 1rem) }`，将下限提升至 `clamp(1rem, 3.5vw, 1rem)`（即 16px）
  - [x] 6.4 全局搜索 `input,textarea` 选择器的 `font-size` 小于 16px 的，统一提升至 16px
  - [x] 6.5 iOS Safari 实测聚焦输入框页面不放大

- [x] Task 7: inputmode / autocapitalize / autocorrect 补齐
  - [x] 7.1 为对话输入 `.game-input`、微信输入栏 `wechat-input-bar input`、抖音评论 `.dy-comment-input`、B站评论输入加 `inputmode="text" autocapitalize="off" autocorrect="off" autocomplete="off"`
  - [x] 7.2 为数字配置项 input（上下文窗口、字数、骰子面数、音量 range 同级 input 等）加 `inputmode="numeric"`
  - [x] 7.3 为人设/剧本/NPC 描述等 textarea 加 `autocapitalize="off" autocorrect="off"`
  - [x] 7.4 移动端实测：数字项弹数字键盘，对话项不自动大写

- [x] Task 8: 固定底栏 visualViewport 键盘适配
  - [x] 8.1 将 `index.html:41434` 已有的 `visualViewport.resize/scroll` 键盘避让逻辑抽象为通用工具函数 `attachKeyboardAdapter(bottomBarEl)`，设置 `--kb-height` CSS 变量或直接调整 `bottom` 偏移
  - [x] 8.2 应用到微信输入栏 `.wechat-input-bar`、抖音评论输入栏、B站评论输入栏、游戏输入栏（已有，改为调用通用工具）
  - [x] 8.3 iOS 实测键盘弹出后输入栏可见；Android 实测正常
  - [x] 8.4 键盘收起后输入栏回位

- [x] Task 9: Canvas 与手势区 touch-action
  - [x] 9.1 为 `#galgamePortraitCanvas`、`#chardetailLive2dCanvas`、`#charchatLive2dCanvas` 加 `touch-action: none`（仅响应点击/眼球追踪，不滚动页面）
  - [x] 9.2 为阅读器翻页区加 `touch-action: pan-y`（允许纵向滚动，横向触发翻页）
  - [x] 9.3 为抖音视频流容器加 `touch-action: pan-y`（纵向滑动切换视频，不横向滚动）
  - [x] 9.4 实测各区域手势不冲突

## P1 — 整页移动适配补齐

- [x] Task 10: Creator Wars 页面移动适配
  - [x] 10.1 在 `pages/creator-wars/creator-wars.css` 末尾新增 `@media (max-width: 480px)` 与 `@media (max-width: 360px)` 断点
  - [x] 10.2 修复 CW 主视图标题、返回按钮、订单卡、导航在小屏下的布局溢出（改 clamp/百分比，避免固定像素）
  - [x] 10.3 修复工作室侧栏、AI 生成区、素材/框架选择面板在小屏下的堆叠与滚动
  - [x] 10.4 修复发布栏、AI 生成弹层在小屏下居中且不超出视口
  - [x] 10.5 将功能性 hover（如显示删除按钮）改为 `@media (hover: hover)` + 触屏替代；纯视觉 hover 保留
  - [x] 10.6 确保所有可点击元素 ≥44×44px
  - [x] 10.7 DevTools 模拟 480/360 宽度逐项验证 CW 五大子应用（B站/微信/抖音/邮箱/股市）主流程可跑通

- [x] Task 11: 自定义剧本编辑器（CCE）移动适配
  - [x] 11.1 在 `pages/custom-chapter/custom-chapter.css` 末尾新增 `@media (max-width: 480px)` 与 `@media (max-width: 360px)` 断点
  - [x] 11.2 修复 CCE 顶栏保存/预览/导出/重置/开始按钮在小屏下的布局（可换行或收缩为图标）
  - [x] 11.3 修复分区折叠卡、NPC/物品/事件卡在小屏下的字段堆叠与输入
  - [x] 11.4 修复立绘选择弹层、AI 生成面板在小屏下的滚动与按钮尺寸
  - [x] 11.5 确保工具栏按钮、添加/删除按钮 ≥44×44px
  - [x] 11.6 DevTools 模拟 480/360 宽度验证 CCE 创建/编辑/保存/预览流程可跑通

## P2 — 上线元信息

- [x] Task 12: PWA manifest 与主屏图标
  - [x] 12.1 新增 `manifest.webmanifest`，定义 name（紫罗兰永恒花园）、short_name、icons（192/512）、start_url、display（standalone）、orientation（landscape）、theme_color、background_color
  - [x] 12.2 在 `index.html <head>` 添加 `<link rel="manifest" href="manifest.webmanifest">`
  - [x] 12.3 添加 `<meta name="theme-color" content="#...">`、`<meta name="apple-mobile-web-app-capable" content="yes">`、`<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">`、`<link rel="apple-touch-icon" href="...">`
  - [x] 12.4 生成 192×192 与 512×512 PNG 图标（可由现有首页 SVG 转出或用 Pillow 生成），放置 `icons/` 目录
  - [x] 12.5 Android Chrome 实测"添加到主屏幕"可安装；iOS Safari 实测主屏图标与状态栏配色

## P2 — 验证

- [x] Task 13: 全量移动端回归验证
  - [x] 13.1 DevTools 模拟 375×667、360×640、320×568 逐页验证：首页、章节选择、游戏对话、书架、阅读器、抽卡、角色列表/详情、CW、CCE
  - [x] 13.2 验证所有 P0 修复项（CW 删除、消息编辑/删除、clipboard 回退）在移动端可用
  - [x] 13.3 验证所有 P1 基础设施项（tap-highlight、overscroll、输入框字号、inputmode、键盘适配、touch-action）生效
  - [x] 13.4 验证 PWA manifest 与图标生效
  - [x] 13.5 检查控制台无新增错误、无关键资源 404
  - [x] 13.6 桌面端回归验证无功能破坏

# Task Dependencies

- Task 1/2/3（P0 功能修复）相互独立，可并行
- Task 4/6/7（全局基础样式）相互独立，可并行；Task 4 依赖 reset.css
- Task 5（overscroll/背景锁）需在 Task 10/11 之前完成，因其建立 `body.modal-open` 机制
- Task 8（visualViewport 通用化）独立，可与任何任务并行
- Task 9（touch-action）独立，可与任何任务并行
- Task 10/11（CW/CCE 整页适配）依赖 Task 5 的模态机制，且建议在 Task 4/6/7 之后进行以复用全局样式
- Task 12（PWA）独立，可与任何任务并行
- Task 13（回归验证）依赖所有其他任务完成
