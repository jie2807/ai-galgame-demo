# Checklist

## 正文区排版验证
- [x] `.reader-body` 样式定义：flex:1、overflow-y:auto、touch-action:pan-y、主题背景色
- [x] `.reader-content` 样式定义：max-width 限制（竖屏 100%/横屏 900px）、margin:0 auto、padding:32px 24px
- [x] `.reader-book-title` 样式定义：居中、大字号、加粗、主题色
- [x] `.reader-chapter` 样式定义：margin-bottom 大间距
- [x] `.reader-chapter-title` 样式定义：居中、中字号、加粗、主题色
- [x] `.reader-paragraph` 样式定义：line-height:2、margin-bottom:1em、主题正文色
- [x] `.reader-dialogue-line` 样式定义：左侧细线标记、与旁白段落视觉区分
- [x] `.reader-epilogue` 样式定义：居中、顶部分隔线
- [x] `.reader-the-end` 样式定义：居中、大字号、加粗、字间距

## 工具栏验证
- [x] `.reader-header` 样式定义：sticky 顶部、毛玻璃背景、z-index、border-bottom
- [x] `.reader-back-btn` 样式定义：触控尺寸≥44×44px、flex 布局、hover/active 反馈
- [x] `.reader-title` 样式定义：居中、单行省略、主题色
- [x] `.reader-header-actions` 样式定义：flex、gap 间距
- [x] `.reader-header-btn` 样式定义：触控尺寸≥44×44px、hover/active 反馈
- [x] `.reader-footer` 样式定义：sticky 底部、毛玻璃背景、border-top
- [x] `.reader-footer-nav` 样式定义：flex 均分三按钮
- [x] `.reader-nav-btn` 样式定义：触控尺寸≥44×44px、图标+文字纵向
- [x] `.reader-progress-bar` 样式定义：高度 3px、圆角、主题色轨道
- [x] `.reader-progress-fill` 样式定义：主题色填充、transition
- [x] `.reader-progress-text` 样式定义：字号 0.75rem、右对齐

## 横竖屏验证
- [x] `.reader-orientation-horizontal .reader-content` 样式定义：max-width 放宽、column-count:2、column-gap
- [x] `.reader-orientation-horizontal .reader-chapter` 样式定义：break-inside:avoid-column
- [x] @media (max-width:600px) 横屏降级为单栏
- [x] 竖屏（默认）正文单栏、窄行、padding:32px 24px
- [x] 点击横竖屏切换按钮后布局立即变化
- [x] Toast 提示"已切换为横排/竖排模式"出现

## 主题验证
- [x] `.theme-parchment`：背景 #F5E6D3、正文 #3D2415、工具栏毛玻璃暖色
- [x] `.theme-day`：背景 #FFFFFF、正文 #333333、工具栏毛玻璃白色
- [x] `.theme-eye`：背景 #C7EDCC、正文 #2D5F2D、工具栏毛玻璃浅绿
- [x] `.theme-night`：背景 #1A1A1A、正文 #B0B0B0、工具栏毛玻璃深色
- [x] 四套主题的进度条、目录高亮、对话线 accent 色均适配
- [x] 切换主题后正文区、工具栏、面板全部变色

## 章节标题浮窗验证
- [x] `.reader-chapter-title-float` 样式定义：fixed 顶部居中、毛玻璃背景、圆角、opacity:0
- [x] `.reader-chapter-title-float.show` 样式定义：opacity:1（已存在）
- [x] 切章时浮窗显示 3 秒后自动消失

## 目录侧边栏验证
- [x] `.reader-toc-sidebar` 样式定义：fixed 全屏、z-index:30、visibility:hidden
- [x] `.reader-toc-sidebar-overlay` 样式定义：黑色半透明遮罩
- [x] `.reader-toc-sidebar-drawer` 样式定义：右侧抽屉、宽度 clamp(280px,80vw,360px)、transform:translateX(100%)
- [x] `.reader-toc-sidebar.active .reader-toc-sidebar-drawer` 样式定义：transform:translateX(0)（已存在）
- [x] `.reader-toc-item` 样式定义：触控高度≥44px、左对齐、章节序号+标题
- [x] `.reader-toc-item.active` 样式定义：当前章节高亮（已存在）
- [x] `.reader-toc-item:hover` 样式定义：hover 反馈

## 书签面板验证
- [x] `.reader-panel` 样式定义：fixed 全屏、z-index:30、opacity:0/visibility:hidden
- [x] `.reader-panel.active` 样式定义：opacity:1/visibility:visible（已存在）
- [x] `.reader-bookmark-content` 样式定义：底部弹出、圆角顶部、max-height:70vh
- [x] `.reader-bookmark-item` 样式定义：卡片式、章节名+摘要+删除按钮
- [x] `.reader-add-bookmark-btn` 样式定义：虚线边框、全宽、触控高度≥44px

## 设置面板验证
- [x] `.reader-settings-panel` 样式定义：fixed 全屏、z-index:30、opacity:0/visibility:hidden
- [x] `.reader-settings-content` 样式定义：底部弹出、圆角顶部、max-height:70vh
- [x] `.reader-settings-tabs` 样式定义：flex、border-bottom
- [x] `.reader-settings-tab` 样式定义：触控高度≥44px、border-bottom 2px transparent
- [x] `.reader-settings-tab.active` 样式定义：accent 色、border-bottom accent
- [x] `.reader-settings-body` 样式定义：display:none、overflow-y:auto
- [x] `.reader-settings-body.active` 样式定义：display:block
- [x] `.reader-font-size-btn` 样式定义：触控尺寸≥44px、active 高亮
- [x] `.reader-theme-btn` 样式定义：预览色块、active 边框高亮
- [x] `.reader-toggle-switch` 样式定义：开关组件 44×24px
- [x] `.reader-toggle-slider` 样式定义：滑块圆点 transition

## 移动端验证
- [x] @media (max-width:600px) 正文区 padding 缩减为 24px 16px
- [x] @media (max-width:600px) 横屏模式降级为单栏
- [x] 所有交互按钮触控尺寸≥44×44px
- [x] 360px 宽度下无水平溢出
- [x] 375px 宽度下无水平溢出
- [x] 抑制 tap-highlight-color
- [x] 设置面板底部弹出高度不超过 70vh

## 端到端验证
- [x] 从书架进入阅读页，正文排版优雅（首行缩进、行高、段间距、居中）
- [x] 顶部工具栏显示正常（返回/标题/操作按钮、毛玻璃效果）
- [x] 底部工具栏显示正常（导航按钮、进度条实时更新）
- [x] 点击屏幕切换工具栏显隐，过渡动画平滑
- [x] 横竖屏切换按钮点击后布局变化，Toast 提示出现
- [x] 四套主题切换后全页面配色变化
- [x] 目录侧边栏打开/关闭/章节跳转正常，当前章节高亮
- [x] 书签面板打开/添加/删除正常
- [x] 设置面板 Tab 切换/字号/字体/行距/主题/翻页/亮度/更多设置全部正常
- [x] 竖屏为默认模式，排版可读性强
- [x] 移动端 360px 全功能正常
