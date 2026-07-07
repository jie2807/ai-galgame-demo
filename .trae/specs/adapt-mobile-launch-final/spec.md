# 移动端上线终态适配 Spec

## Why

项目已在 `pre-launch-mobile-optimization` 中完成横屏等比缩放、首页/章节/游戏/书架/阅读器/抽卡/角色页的基础响应式适配，以及 AI 工作台入口隐藏、书架删除、稳定性修复等。但面向"移动端正式上线、保证所有功能都能正常使用"的终态目标，仍存在三类阻塞性缺口：

1. **功能性阻塞**：Creator Wars 自定义框架/素材删除、对话消息编辑/删除入口在触屏环境下完全不可用（仅 mouse/hover 触发）。
2. **交互基础设施缺失**：子页面缺少 tap-highlight 抑制、模态缺少 overscroll-behavior、输入框 font-size<16px 触发 iOS 自动放大、无 inputmode/autocapitalize、固定底栏未适配 visualViewport 键盘高度、clipboard 无回退。
3. **整页适配薄弱**：Creator Wars 五大模拟应用（B站/微信/抖音/邮箱/股市）与自定义剧本编辑器（CCE）仅有 768px 单断点、强依赖 hover，移动端实操体验差。
4. **上线元信息缺失**：无 PWA manifest、无 Apple touch icon、无 theme-color，影响"添加到主屏"与状态栏配色。

本 Spec 聚焦"让所有功能在移动端真正可用"，不重做已完成的基础响应式。

## What Changes

### 功能性修复（P0，阻塞上线）
- **修复 CW 自定义框架/素材删除**：将 `index.html:37556-37583` 与 `37627-37654` 的 `mousedown/mouseup/mouseleave + contextmenu` 长按删除改用项目已有的 `addLongPressListener`（touch + mouse 双轨），触屏可长按删除。
- **修复对话消息编辑/删除入口**：`styles.css:6090-6095` 的 `.msg-actions` 仅 `:hover` 显现，移动端不可见。改为 `@media (hover: hover)` 保留桌面 hover，并对 `.msg` 增加触屏长按或点击切换 `.msg-actions-show` class 的 JS 路径，使触屏可编辑/删除消息。
- **clipboard 回退**：`index.html:30752` 的 `navigator.clipboard.writeText` 增加 catch + `document.execCommand('copy')` textarea 回退，兼容非 HTTPS WebView 与旧 iOS。

### 交互基础设施补齐（P1）
- **全局 tap-highlight 抑制**：在 `styles/reset.css` 增加 `* { -webkit-tap-highlight-color: transparent; }`，消除子页面点击蓝色闪动。
- **模态/抽屉 overscroll-behavior**：为所有 `position: fixed` 全屏覆盖层（`#chapterMissionModal`、`#confirmModal`、`#cwMainView`、`#customChapterEditor`、各 game 侧滑面板等）补 `overscroll-behavior: contain`，并在 `body.modal-open` 上加 `overflow: hidden`，防止背景连锁滚动。
- **输入框 font-size ≥16px**：将 `.wechat-search-box input`(14px)、`.wechat-input-bar input`(14px)、`.game-input`(下限 14px) 等输入框最小字号提升至 16px，避免 iOS 聚焦自动放大。
- **inputmode / autocapitalize / autocorrect**：为对话输入、评论输入、人设/剧本 textarea、数字配置项 input 添加 `inputmode`（text/numeric/none）、`autocapitalize="off"`、`autocorrect="off"`、`autocomplete="off"`，优化软键盘体验。
- **固定底栏 visualViewport 适配**：将 `index.html:41434` 已有的 `visualViewport` 键盘避让逻辑抽象为通用工具，应用到 WeChat 输入栏、抖音评论输入栏、B站评论输入栏等 `position: fixed` 底栏，防止 iOS 键盘遮挡。
- **Canvas/横向滑动区 touch-action**：为 Live2D Canvas、阅读器翻页区、抖音视频流容器补 `touch-action`（`pan-x`/`pan-y`/`none`），避免手势冲突。

### 整页移动适配补齐（P1）
- **Creator Wars 页面移动适配**：在 `pages/creator-wars/creator-wars.css` 增加 480px/360px 断点，修复主视图、订单卡、工作室侧栏、素材/框架选择面板、发布栏、AI 生成弹层在小屏下的布局溢出；将关键 hover 反馈改为 `@media (hover: hover)` + `:active` 触感反馈；确保所有可点击元素 ≥44px。
- **自定义剧本编辑器（CCE）移动适配**：在 `pages/custom-chapter/custom-chapter.css` 增加 480px/360px 断点，修复编辑器顶栏、分区折叠卡、NPC/物品/事件卡、立绘选择弹层、AI 生成面板在小屏下的布局；表单输入适配 inputmode；确保工具栏按钮 ≥44px。

### 上线元信息（P2）
- **PWA manifest**：新增 `manifest.webmanifest`，定义 name、short_name、icons、start_url、display、orientation、theme_color、background_color；在 `index.html` 添加 `<link rel="manifest">`。
- **Apple touch icon / theme-color**：在 `index.html` 添加 `<link rel="apple-touch-icon">` 与 `<meta name="theme-color">`、`<meta name="apple-mobile-web-app-capable">` 等。
- **应用图标资源**：提供 192×192 与 512×512 PNG 图标（可由现有首页 SVG 转出或生成）。

### 不在本 Spec 范围
- 不重做首页/章节/游戏/书架/阅读器/抽卡/角色页的基础响应式（已完成）。
- 不迁移到 Pointer Events API（现有 touch + click 双绑可用，迁移收益低、风险高）。
- 不引入 Service Worker 离线缓存（上线形态暂定为在线 Web，离线可作为后续 Spec）。
- 不调整横屏锁定策略（已在 `refactor-custom-script-dual-modes` 中处理）。

## Impact

- Affected specs: `pre-launch-mobile-optimization`（已完成，本 Spec 为其续作，聚焦剩余缺口）、`refactor-custom-script-dual-modes`（横屏锁定不动）、`fix-custom-script-api-and-hide-official-keys`（API 设置面板移动适配可能触及）
- Affected code:
  - `index.html`（CW 框架/素材删除重写、消息编辑/删除触屏路径、clipboard 回退、visualViewport 通用化、manifest/icon meta、inputmode 属性补齐）
  - `styles.css`（`.msg-actions` hover 媒体查询、输入框 font-size、touch-action、overscroll-behavior、固定底栏键盘适配）
  - `styles/reset.css`（全局 tap-highlight）
  - `pages/creator-wars/creator-wars.css`（480/360 断点、hover 媒体查询、触控尺寸）
  - `pages/custom-chapter/custom-chapter.css`（480/360 断点、表单适配、触控尺寸）
  - 新增 `manifest.webmanifest` 与图标资源

## ADDED Requirements

### Requirement: CW 自定义框架与素材可在触屏删除

系统 SHALL 允许移动端用户通过长按删除 Creator Wars 中的自定义框架与素材卡片，与桌面端右键/长按行为一致。

#### Scenario: 移动端长按删除自定义框架
- **WHEN** 用户在移动端长按 `.cw-framework-item` 超过 600ms
- **THEN** 弹出删除确认提示
- **AND** 确认后该框架从自定义列表移除并持久化

#### Scenario: 移动端长按删除素材卡
- **WHEN** 用户在移动端长按 `.cw-material-modal-card` 超过 600ms
- **THEN** 弹出删除确认提示
- **AND** 确认后该素材从自定义列表移除并持久化

#### Scenario: 桌面端行为保持
- **WHEN** 桌面端用户右键或长按框架/素材卡
- **THEN** 删除流程与原有行为一致，不回归

---

### Requirement: 对话消息编辑/删除入口在触屏可见

系统 SHALL 在触屏环境下提供可见的对话消息编辑/删除入口，不依赖 `:hover`。

#### Scenario: 触屏长按消息显示操作
- **WHEN** 用户在移动端长按一条 `.msg` 超过 500ms
- **THEN** 该消息显示编辑 ✏️ 与删除 🗑️ 按钮
- **AND** 点击其他区域或操作完成后按钮隐藏

#### Scenario: 桌面端 hover 保持
- **WHEN** 桌面端用户悬停消息
- **THEN** 编辑/删除按钮照旧显示（通过 `@media (hover: hover)`）

#### Scenario: 触屏编辑消息
- **WHEN** 用户在触屏点击编辑按钮
- **THEN** 进入消息编辑态，可修改后保存

---

### Requirement: 剪贴板复制具备回退

系统 SHALL 在 `navigator.clipboard` 不可用时回退到 `document.execCommand('copy')`，并在所有失败路径提示用户。

#### Scenario: HTTPS 环境正常复制
- **WHEN** 用户在 HTTPS 环境点击复制按钮
- **THEN** 使用 `navigator.clipboard.writeText` 复制成功并提示

#### Scenario: WebView 或旧 iOS 回退
- **WHEN** `navigator.clipboard` 抛错或为 undefined
- **THEN** 创建临时 textarea，调用 `document.execCommand('copy')` 完成复制
- **AND** 成功后提示用户；失败时提示"复制失败，请手动选择文本"

---

### Requirement: 全局点击无蓝色高亮

系统 SHALL 在所有页面抑制 WebKit 默认的点击蓝色高亮。

#### Scenario: 任意子页面点击
- **WHEN** 用户在移动端点击任意按钮/卡片
- **THEN** 不出现蓝色矩形高亮

---

### Requirement: 模态与全屏覆盖层阻止背景滚动

系统 SHALL 在模态/全屏覆盖层打开时阻止背景滚动与滚动连锁。

#### Scenario: 模态打开时背景锁定
- **WHEN** 任意全屏覆盖层（章节任务、确认弹窗、CW 主视图、CCE 编辑器、game 侧滑面板）打开
- **THEN** 背景不滚动、不出现滚动连锁
- **AND** 模态内部仍可正常滚动

#### Scenario: 模态关闭后背景恢复
- **WHEN** 覆盖层关闭
- **THEN** 背景滚动恢复

---

### Requirement: 输入框聚焦不触发 iOS 自动放大

系统 SHALL 确保所有文本输入框 font-size ≥16px，避免 iOS Safari 聚焦时自动放大页面。

#### Scenario: iOS 聚焦输入框
- **WHEN** 用户在 iOS Safari 点击任意 input/textarea
- **THEN** 页面不自动放大
- **AND** 输入框正常聚焦弹出键盘

---

### Requirement: 软键盘不遮挡固定底栏

系统 SHALL 在 iOS/Android 软键盘弹出时，固定底栏（微信输入栏、抖音评论栏、B站评论栏、游戏输入栏）保持可见并可输入。

#### Scenario: iOS 键盘弹出
- **WHEN** 用户在 iOS 点击底部输入栏
- **THEN** 键盘弹出后输入栏仍可见
- **AND** 不被键盘遮挡

#### Scenario: Android 键盘弹出
- **WHEN** 用户在 Android 点击底部输入栏
- **THEN** 视口自适应，输入栏可见

---

### Requirement: 软键盘类型与输入内容匹配

系统 SHALL 根据输入内容类型设置 `inputmode`，触发对应软键盘；并关闭无关的自动大写/纠正。

#### Scenario: 数字配置项
- **WHEN** 用户聚焦数字配置 input（如上下文窗口、字数、骰子面数）
- **THEN** 弹出数字键盘

#### Scenario: 对话/剧本输入
- **WHEN** 用户聚焦对话/人设/剧本 textarea
- **THEN** 不自动首字母大写、不自动纠正

---

### Requirement: Canvas 与手势区无手势冲突

系统 SHALL 为 Live2D Canvas、阅读器翻页区、抖音视频流等手势密集区域设置 `touch-action`，避免与页面滚动冲突。

#### Scenario: Live2D Canvas 拖动
- **WHEN** 用户在 Live2D Canvas 上触摸
- **THEN** 不触发页面滚动，仅响应眼球追踪/点击

#### Scenario: 阅读器翻页
- **WHEN** 用户在阅读器左右 1/3 区域滑动
- **THEN** 仅触发翻页，不连锁滚动

---

### Requirement: Creator Wars 页面移动端可用

系统 SHALL 确保 Creator Wars 主视图、订单系统、工作室、素材/框架选择、发布栏、AI 生成弹层在 480px/360px 宽度下布局完整、可操作。

#### Scenario: 480px 下 CW 主视图
- **WHEN** 用户在 480px 宽度设备打开 CW
- **THEN** 主视图标题、返回、订单卡、导航完整显示
- **AND** 无水平滚动、无元素重叠

#### Scenario: 360px 下 CW 工作室
- **WHEN** 用户在 360px 宽度设备进入工作室
- **THEN** 侧栏、AI 生成区、素材/框架选择区可滚动浏览
- **AND** 关键按钮 ≥44px

#### Scenario: CW 发布与 AI 生成弹层
- **WHEN** 用户在小屏打开发布栏或 AI 生成弹层
- **THEN** 弹层居中且不超出视口，可操作

---

### Requirement: 自定义剧本编辑器移动端可用

系统 SHALL 确保自定义剧本编辑器（CCE）顶栏、分区折叠卡、NPC/物品/事件卡、立绘选择、AI 生成面板在 480px/360px 宽度下可编辑、可操作。

#### Scenario: 480px 下 CCE 顶栏与分区
- **WHEN** 用户在 480px 宽度设备打开 CCE
- **THEN** 顶栏保存/预览/导出/重置/开始按钮可点击
- **AND** 分区折叠卡可展开收起

#### Scenario: 360px 下 NPC 卡片编辑
- **WHEN** 用户在 360px 宽度设备编辑 NPC 卡
- **THEN** 名称/描述/开场白/性别/立绘/语音字段可输入
- **AND** 删除/添加按钮 ≥44px

#### Scenario: CCE 立绘选择弹层
- **WHEN** 用户在小屏打开立绘选择
- **THEN** 立绘网格可滚动，选中按钮可点击

---

### Requirement: PWA 可安装性与主屏图标

系统 SHALL 提供 PWA manifest 与 Apple touch icon，使应用可"添加到主屏"并在 iOS/Android 主屏显示图标与状态栏配色。

#### Scenario: Android 添加到主屏
- **WHEN** 用户在 Android Chrome 选择"添加到主屏幕"
- **THEN** 应用以独立图标安装，启动时为全屏无浏览器栏

#### Scenario: iOS 添加到主屏
- **WHEN** 用户在 iOS Safari 选择"添加到主屏幕"
- **THEN** 主屏显示自定义图标
- **AND** 启动时状态栏使用 theme-color

## MODIFIED Requirements

### Requirement: 模态显示机制
**Current state**: 全屏覆盖层使用 `.active` 类显示，但未处理背景滚动锁定与 overscroll 连锁
**New state**: 覆盖层 `.active` 时同步在 `body` 加 `.modal-open`（`overflow:hidden`），覆盖层容器加 `overscroll-behavior:contain`

### Requirement: 输入框样式
**Current state**: 部分输入框 font-size 14px，无 inputmode/autocapitalize
**New state**: 所有 input/textarea font-size ≥16px，按内容类型设置 inputmode，关闭 autocapitalize/autocorrect

### Requirement: hover 反馈
**Current state**: 大量 `:hover` 用于功能显现（如 `.msg-actions`）与视觉反馈
**New state**: 功能性 hover 改为 `@media (hover: hover)` + 触屏替代路径；纯视觉 hover 保留（浏览器在触屏 tap 时会瞬时触发）

## REMOVED Requirements

无移除项。本 Spec 仅新增与修改，不删除既有功能。
