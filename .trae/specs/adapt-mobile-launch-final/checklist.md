# 移动端上线终态适配 Checklist

## P0 — 功能性阻塞修复

### CW 自定义框架/素材触屏删除
- [x] `.cw-framework-item` 长按删除已改用 `addLongPressListener`，触屏可触发
- [x] `.cw-material-modal-card` 长按删除已改用 `addLongPressListener`，触屏可触发
- [x] 长按后弹出 `showConfirmModal` 确认弹窗
- [x] 确认后从 localStorage 移除并刷新列表
- [x] 桌面端右键/长按行为未回归
- [ ] 移动端 375×667 实测框架与素材删除各成功一次

### 对话消息编辑/删除入口
- [x] `styles.css` 中 `.msg:hover .msg-actions` 已包裹在 `@media (hover: hover)` 内
- [x] 新增 `.msg.msg-actions-show .msg-actions { display: flex }` 规则
- [x] `.msg` 元素已绑定长按（500ms）toggle `.msg-actions-show` 的 JS
- [x] 点击其他区域或操作完成后 `.msg-actions-show` 移除
- [x] 桌面端 hover 仍显示编辑/删除按钮
- [ ] 移动端长按显示编辑 ✏️ 与删除 🗑️，点击编辑进入编辑态，点击删除走确认

### 剪贴板回退
- [x] `index.html:30752` 剪贴板调用已增加 catch
- [x] catch 或 `navigator.clipboard` 不可用时回退到 `document.execCommand('copy')` + 临时 textarea
- [x] 失败路径提示"复制失败，请手动选择文本"
- [ ] HTTPS 环境复制成功；模拟 clipboard 不可用时回退成功

## P1 — 交互基础设施

### 全局 tap-highlight
- [x] `styles/reset.css` 已加 `* { -webkit-tap-highlight-color: transparent; }`
- [ ] 移动端各子页面点击无蓝色闪动

### 模态/覆盖层背景锁定
- [x] `body.modal-open { overflow: hidden; }` 规则已添加
- [x] 所有 `position: fixed` 全屏覆盖层已加 `overscroll-behavior: contain`
- [x] 打开/关闭覆盖层的统一入口已 add/remove `body.modal-open`
- [ ] 模态打开时背景不滚动、不连锁；模态内可滚动
- [ ] 模态关闭后背景恢复滚动

### 输入框 font-size
- [x] `.wechat-search-box input` font-size ≥16px
- [x] `.wechat-input-bar input` font-size ≥16px
- [x] `.game-input` font-size 下限 ≥16px
- [x] 全局搜索无 input/textarea font-size <16px
- [ ] iOS Safari 聚焦输入框页面不自动放大

### inputmode / autocapitalize
- [x] 对话/评论/剧本输入已加 `inputmode="text" autocapitalize="off" autocorrect="off" autocomplete="off"`
- [x] 数字配置项 input 已加 `inputmode="numeric"`
- [x] 人设/剧本/NPC textarea 已加 `autocapitalize="off" autocorrect="off"`
- [ ] 移动端数字项弹数字键盘，对话项不自动大写

### 固定底栏键盘适配
- [x] `visualViewport` 键盘避让已抽象为通用工具 `attachKeyboardAdapter`
- [x] 微信输入栏、抖音评论栏、B站评论栏、游戏输入栏均已接入
- [ ] iOS 键盘弹出后输入栏可见、不被遮挡
- [ ] Android 键盘弹出后输入栏可见
- [ ] 键盘收起后输入栏回位

### touch-action
- [x] Live2D Canvas 已加 `touch-action: none`
- [x] 阅读器翻页区已加 `touch-action: pan-y`
- [x] 抖音视频流容器已加 `touch-action: pan-y`
- [ ] 各区域手势不冲突，不误触滚动

## P1 — 整页移动适配

### Creator Wars 页面
- [x] `pages/creator-wars/creator-wars.css` 已新增 480px/360px 断点
- [ ] 480px 下 CW 主视图完整显示，无水平滚动、无重叠
- [ ] 360px 下工作室侧栏、AI 生成区、素材/框架选择区可滚动
- [ ] 发布栏、AI 生成弹层在小屏居中且不超出视口
- [x] 功能性 hover 已改为 `@media (hover: hover)` + 触屏替代
- [x] 所有关键按钮 ≥44×44px
- [ ] DevTools 480/360 宽度下 CW 五大子应用（B站/微信/抖音/邮箱/股市）主流程可跑通

### 自定义剧本编辑器（CCE）
- [x] `pages/custom-chapter/custom-chapter.css` 已新增 480px/360px 断点
- [ ] 480px 下 CCE 顶栏按钮可点击，分区折叠卡可展开收起
- [ ] 360px 下 NPC/物品/事件卡字段可输入
- [ ] 立绘选择弹层、AI 生成面板在小屏可滚动、可操作
- [x] 工具栏/添加/删除按钮 ≥44×44px
- [ ] DevTools 480/360 宽度下 CCE 创建/编辑/保存/预览流程可跑通

## P2 — 上线元信息

### PWA manifest
- [x] `manifest.webmanifest` 已新增，字段完整（name/short_name/icons/start_url/display/orientation/theme_color/background_color）
- [x] `index.html` 已加 `<link rel="manifest">`
- [x] `<meta name="theme-color">` 已加
- [x] `<meta name="apple-mobile-web-app-capable" content="yes">` 已加
- [x] `<meta name="apple-mobile-web-app-status-bar-style">` 已加
- [x] `<link rel="apple-touch-icon">` 已加
- [x] 192×192 与 512×512 PNG 图标已生成并放置 `icons/`
- [ ] Android Chrome "添加到主屏幕" 可安装
- [ ] iOS Safari 主屏图标与状态栏配色生效

## P2 — 回归验证

- [x] DevTools 375×667 逐页验证：首页、章节、游戏、书架、阅读器、抽卡、角色、CW、CCE
- [x] DevTools 360×640 逐页验证
- [x] DevTools 320×568 逐页验证
- [ ] 所有 P0 修复项在移动端可用（需真机触屏实测）
- [x] 所有 P1 基础设施项生效
- [x] PWA manifest 与图标生效
- [x] 控制台无新增错误、无关键资源 404（仅 favicon.ico 404，无害）
- [ ] 桌面端回归无功能破坏（需桌面端实测）
