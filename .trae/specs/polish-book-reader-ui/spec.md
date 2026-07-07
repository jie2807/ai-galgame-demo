# 书架阅读界面打磨 Spec

## Why
当前书架阅读界面 HTML 结构完整（顶部工具栏/正文区/底部工具栏/目录侧边栏/书签面板/设置面板均已存在），但**核心 CSS 几乎完全缺失**——`.reader-body`、`.reader-content`、`.reader-paragraph`、`.reader-dialogue-line`、`.reader-chapter-title`、`.reader-book-title`、`.reader-epilogue`、`.reader-the-end`、`.reader-header`、`.reader-footer`、`.reader-back-btn`、`.reader-title`、`.reader-header-actions`、`.reader-header-btn`、`.reader-footer-nav`、`.reader-nav-btn`、`.reader-progress-*` 等均无专属样式定义，仅有滚动条和按钮 hover 兜底。`.reader-orientation-horizontal` 类在 JS 中被应用但**无任何 CSS 规则**，导致横竖屏切换按钮点击后布局不变。这造成阅读界面"非常乱"，需对标起点读书/微信读书/多看阅读等一流阅读软件进行全面打磨，并确保竖屏阅读体验完整可用。

## What Changes
- **新增阅读器核心 CSS**：为 `.reader-body`、`.reader-content`、`.reader-book-title`、`.reader-paragraph`、`.reader-dialogue-line`、`.reader-chapter-title`、`.reader-chapter`、`.reader-epilogue`、`.reader-the-end` 等添加完整样式，对标一流阅读软件的排版（合适行高、段间距、首行缩进、最大行宽居中、主题色适配）
- **新增工具栏 CSS**：为 `.reader-header`、`.reader-footer`、`.reader-back-btn`、`.reader-title`、`.reader-header-actions`、`.reader-header-btn`、`.reader-footer-nav`、`.reader-nav-btn`、`.reader-progress-bar-wrapper`、`.reader-progress-bar`、`.reader-progress-fill`、`.reader-progress-text` 添加样式（毛玻璃背景、固定定位、触控尺寸≥44px、图标对齐）
- **新增横竖屏 CSS**：为 `.reader-orientation-horizontal` 添加实际布局规则，横屏时正文区双栏/宽栏布局，竖屏时单栏窄行布局（默认）
- **新增章节标题浮窗 CSS**：完善 `.reader-chapter-title-float` 样式（切章时顶部短暂显示章节名）
- **新增目录侧边栏完善 CSS**：完善 `.reader-toc-sidebar`、`.reader-toc-item`、`.reader-toc-sidebar-drawer` 样式
- **新增书签面板 CSS**：完善 `.reader-bookmark-content`、`.reader-bookmark-item` 样式
- **新增设置面板 CSS**：完善 `.reader-settings-panel`、`.reader-settings-tabs`、`.reader-settings-body`、`.reader-font-size-selector`、`.reader-theme-selector`、`.reader-page-mode-selector`、`.reader-toggle-switch` 样式
- **新增四主题完整样式**：parchment（羊皮纸）/day（白天）/eye（护眼）/night（夜间）四套主题的正文区配色与背景
- **移动端适配**：360px/375px 等窄屏下阅读区边距、字号、工具栏触控尺寸优化
- **竖屏阅读权限确认**：默认 orientation='vertical'（竖屏），确保竖屏下排版优雅、可读性强；横屏为可选项

## Impact
- Affected code: `styles.css`（新增阅读器全部核心样式，约 300-500 行）、`index.html`（可能微调个别 DOM 结构或 class 名以适配样式，但不做大规模重构）
- Affected specs: `redesign-book-shelf-system`（书架系统重构 spec 的阅读页面部分，本 spec 聚焦于阅读界面视觉打磨，与其不冲突，互补关系）

## ADDED Requirements

### Requirement: 阅读器正文区排版
系统 SHALL 为阅读器正文区提供一流阅读软件级别的排版样式，包含：
1. `.reader-body`：flex 占满剩余空间、overflow-y:auto、touch-action:pan-y、主题背景色
2. `.reader-content`：max-width 限制（竖屏 100% 带左右内边距 24px，横屏 900px 居中）、padding-top/bottom 适当间距
3. `.reader-book-title`：居中、大字号、加粗、主题色、上下间距充足
4. `.reader-chapter`：margin-bottom 大间距（分隔章节）
5. `.reader-chapter-title`：居中或左对齐、中字号、加粗、主题色、章节间分隔感
6. `.reader-paragraph`：首行缩进 2em（由 JS prefs.textIndent 控制）、line-height 2.0、margin-bottom 1em、color 主题正文色、text-align justify（由 prefs.textAlign 控制）
7. `.reader-dialogue-line`：对话行样式（左侧细线标记或缩进区分）、与旁白段落视觉区分
8. `.reader-epilogue`：居中、顶部分隔线、斜体
9. `.reader-the-end`：居中、大字号、加粗、字间距、主题色

#### Scenario: 用户打开书籍阅读
- **WHEN** 用户从书架点击书籍进入阅读页
- **THEN** 正文区以优雅排版显示，段落首行缩进、行高舒适、最大行宽居中、主题配色统一

### Requirement: 阅读器工具栏样式
系统 SHALL 为顶部和底部工具栏提供完整样式：
1. `.reader-header`：position fixed/sticky 顶部、毛玻璃背景（backdrop-filter blur）、主题适配、z-index 高于正文
2. `.reader-footer`：position fixed/sticky 底部、毛玻璃背景、包含导航按钮和进度条
3. `.reader-back-btn`：触控尺寸≥44×44px、图标+文字、hover/active 反馈
4. `.reader-title`：居中、单行省略、主题色、字号适中
5. `.reader-header-btn`：触控尺寸≥44×44px、图标居中、hover/active 反馈、间距均匀
6. `.reader-footer-nav`：flex 均分三按钮（上一章/目录/下一章）
7. `.reader-nav-btn`：触控尺寸≥44×44px、图标+文字纵向排列、hover/active 反馈
8. `.reader-progress-bar-wrapper`：flex、进度条+百分比文字、进度条可点击
9. `.reader-progress-bar`：高度 2-3px、圆角、主题色轨道
10. `.reader-progress-fill`：主题色填充、transition 平滑

#### Scenario: 工具栏显示与隐藏
- **WHEN** 用户点击屏幕中上部区域
- **THEN** 顶部和底部工具栏同时显示/隐藏，带平滑过渡动画

#### Scenario: 阅读进度更新
- **WHEN** 用户滚动或翻页
- **THEN** 底部进度条和百分比文字实时更新

### Requirement: 横竖屏阅读模式
系统 SHALL 提供横屏和竖屏两种阅读模式，且竖屏为默认模式：
1. `.reader-orientation-horizontal`（横屏）：`.reader-content` max-width 放宽至 900-1200px、可选双栏布局（column-count:2）、行高略微收紧
2. 默认竖屏：`.reader-content` max-width 100%、单栏、左右内边距 24px、行高 2.0
3. 横竖屏切换按钮（`#readerOrientationBtn`）点击后切换 `.reader-orientation-horizontal` 类，布局立即响应

#### Scenario: 竖屏阅读（默认）
- **WHEN** 用户打开书籍阅读（orientation='vertical'）
- **THEN** 正文以窄行单栏显示，适合手机竖屏手持阅读

#### Scenario: 切换到横屏阅读
- **WHEN** 用户点击横竖屏切换按钮
- **THEN** 正文区切换为宽栏/双栏布局，适合平板/桌面横屏阅读，Toast 提示"已切换为横排模式"

#### Scenario: 切换回竖屏阅读
- **WHEN** 用户再次点击横竖屏切换按钮
- **THEN** 正文区恢复窄行单栏布局，Toast 提示"已切换为竖排模式"

### Requirement: 四套阅读主题
系统 SHALL 为阅读器提供四套完整的主题配色，覆盖正文区、工具栏、面板：
1. **parchment（羊皮纸，默认）**：背景 #F5E6D3、正文 #3D2415、工具栏毛玻璃暖色
2. **day（白天）**：背景 #FFFFFF、正文 #333333、工具栏毛玻璃白色
3. **eye（护眼）**：背景 #C7EDCC、正文 #2D5F2D、工具栏毛玻璃浅绿
4. **night（夜间）**：背景 #1A1A1A、正文 #B0B0B0、工具栏毛玻璃深色
5. 主题通过 `.theme-<name>` 类名作用于 `.book-reader-page`、`.reader-body`、`.reader-header`、`.reader-footer`、`.reader-content`

#### Scenario: 切换阅读主题
- **WHEN** 用户在设置面板点击主题按钮
- **THEN** 阅读器背景、正文、工具栏、面板全部切换为对应主题配色

### Requirement: 目录侧边栏样式
系统 SHALL 完善目录侧边栏样式：
1. `.reader-toc-sidebar`：fixed 全屏遮罩 + 右侧抽屉
2. `.reader-toc-sidebar-drawer`：从右侧滑入、宽度 clamp(280px, 80vw, 360px)、主题背景、flex 纵向
3. `.reader-toc-sidebar-header`：顶部标题区 + 关闭按钮
4. `.reader-toc-sidebar-label`："目录"标签文字
5. `.reader-toc-list`：flex 纵向、overflow-y auto
6. `.reader-toc-item`：触控尺寸≥44px 高度、左对齐、章节序号+标题、hover/active 反馈、当前章节高亮

#### Scenario: 打开目录
- **WHEN** 用户点击底部"目录"按钮
- **THEN** 右侧抽屉滑入，显示所有章节列表，当前章节高亮

### Requirement: 书签面板样式
系统 SHALL 完善书签面板样式：
1. `.reader-bookmark-content`：底部弹出或右侧抽屉、主题背景
2. `.reader-bookmark-actions`：添加书签按钮区
3. `.reader-bookmark-item`：卡片式、显示章节名+内容摘要+删除按钮
4. 空书签状态提示样式

### Requirement: 设置面板样式
系统 SHALL 完善设置面板样式：
1. `.reader-settings-panel`：底部弹出面板、圆角顶部、主题背景
2. `.reader-settings-tabs`：顶部 Tab 导航（字体/背景/翻页/更多）
3. `.reader-settings-body`：Tab 内容区、每个 section 间距充足
4. `.reader-font-size-selector`：字号按钮横排、active 高亮
5. `.reader-font-family-selector`：字体按钮横排
6. `.reader-line-height-selector`：行距按钮横排
7. `.reader-theme-selector`：主题按钮网格、预览色块
8. `.reader-page-mode-selector`：翻页模式按钮横排
9. `.reader-toggle-switch`：开关组件样式
10. `.reader-brightness-slider` / `.reader-auto-speed-slider`：滑块样式

### Requirement: 章节标题浮窗
系统 SHALL 完善切章时的章节标题浮窗样式：
1. `.reader-chapter-title-float`：fixed 顶部居中、毛玻璃背景、渐入渐出动画、3 秒后自动消失
2. 显示当前章节标题，方便用户切换章节时确认位置

### Requirement: 移动端适配
系统 SHALL 确保阅读器在移动端（360px/375px/390px/414px）下体验良好：
1. 正文区左右内边距 16-20px（窄屏）
2. 工具栏按钮触控尺寸≥44×44px
3. 设置面板底部弹出时高度不超过 70vh，内容可滚动
4. 目录抽屉宽度不超过 85vw
5. 横屏模式下双栏布局在窄屏降级为单栏（@media max-width:600px）
6. 输入框 font-size≥16px（如有）
7. 抑制 tap-highlight
8. 无水平溢出

## MODIFIED Requirements

### Requirement: 阅读器页面样式
原 `.book-reader-page` 仅有基础 fixed 定位和显隐过渡，现补充完整内部元素的样式定义，使阅读界面达到一流阅读软件水准。不改变现有 HTML 结构和 JS 逻辑，仅在 `styles.css` 中新增缺失的 CSS 规则。
