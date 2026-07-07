# Fix Portrait Picker Mobile Stacking Spec

## Why
自定义剧本 NPC 编辑器的立绘选择面板在桌面端已能网格排列，但在真实移动端小屏（≤480px，尤其是 375px/360px/320px）下，预览卡片仍会堆叠、挤压或换行异常，导致玩家难以浏览和选择角色立绘。

## What Changes
- 重写立绘选择面板的移动端网格布局，确保卡片在 320px–480px 宽度下自动缩小、等比排列、不堆叠。
- 调整弹窗模态框在小屏下的尺寸与内边距，最大化可用空间。
- 优化卡片内部图片/Canvas 的缩放与 object-fit，防止变形或溢出。
- 保证弹窗内容区可上下滚动，滚动条样式与主题一致。
- 保持现有排序：Live2D/Level 2D 模型在前，静态图片在后。
- **BREAKING**: 无破坏性变更；仅调整 CSS 与 minor DOM 结构。

## Impact
- Affected specs: enhance-custom-npc-portrait-picker, pre-launch-mobile-optimization
- Affected code: d:\BC\ai_resume\qmzz\index.html（portrait-picker CSS 与 renderPortraitPickerGrid）

## ADDED Requirements

### Requirement: 小屏下立绘选择面板不堆叠
系统 SHALL 确保立绘选择弹窗在视口宽度 320px–480px 时，预览卡片按行排列，每行至少 3 列（理想 4 列），不出现卡片上下堆叠、文字重叠、内容截断或水平滚动。

#### Scenario: 375px 宽度
- **WHEN** 用户在 375px 宽设备上打开立绘选择面板
- **THEN** 面板宽度占满屏幕两侧少量边距，卡片自动缩小，每行 3–4 列，可上下滚动浏览全部资源

#### Scenario: 320px 宽度
- **WHEN** 用户在 320px 宽设备上打开立绘选择面板
- **THEN** 卡片进一步缩小，每行至少 3 列，不堆叠，标签文字仍清晰可读

### Requirement: 弹窗最大化利用小屏空间
系统 SHALL 在 ≤480px 视口下将弹窗宽度提升至 96%–100%，高度提升至 90vh，减少不必要的内边距，让预览网格获得最大展示区域。

#### Scenario: iPhone SE 375×667
- **WHEN** 用户打开立绘选择面板
- **THEN** 弹窗几乎占满屏幕，顶部工具栏紧凑，网格区域可滚动

### Requirement: 卡片内容等比缩放不变形
系统 SHALL 确保图片与 Live2D canvas 在缩小过程中保持 3:4 比例，使用 object-fit: cover，不出现拉伸、模糊到不可辨认或被截断。

#### Scenario: 最小卡片尺寸
- **WHEN** 卡片宽度被压缩到约 72px
- **THEN** 图片/模型预览仍居中、等比、可见，fallback 文字清晰
