# 重构 Visual 模式为电影感剧情界面 Spec

## Why

根据 `research-reverse-1999-story-ui` 调研结论，当前项目 Visual 模式的对话框只是底部全宽渐变条，缺乏容器感、头像与投影；背景层默认使用纯色渐变，无场景图与电影化暗角/颗粒/镜头运动。这些问题导致文本显示区域显得廉价、缺乏沉浸感。本 Spec 聚焦落地调研报告中的两条高优先级建议，先对 Visual 模式进行核心视觉升级。

## What Changes

- 重构 `.galgame-dialogue-bar` 为电影感底栏卡片：增加左侧圆形头像、说话人名称/称号、细高光边框、柔和投影与半透明毛玻璃背景
- 规范文本层级：名称使用金色小字+头像，正文加大并增加 text-shadow，区分叙述者/玩家/NPC 三种身份色
- 升级背景处理：在 `.galgame-bg-layer` 上增加场景图支持、径向暗角(vignette)与轻微颗粒噪点纹理
- 增加背景镜头运动：场景切换时加入缓慢缩放/平移（Ken Burns）过渡动画
- 保持现有 Text 模式不变；Visual 模式的选项分支不在本次范围内（留待后续 Spec）
- 移动端与桌面端同时适配

## Impact

- Affected specs: Visual 模式游玩体验、后续选项面板 Spec、引导页截图更新
- Affected code: `index.html`（Galgame 相关 HTML 结构与 CSS，约 4250-4700 行）、`styles.css`（如存在额外覆盖样式）、可能的默认头像/噪点纹理资源

## ADDED Requirements

### Requirement: 电影感对话框

系统 SHALL 在 Visual 模式下将底部对话框重构为带容器感的半透明卡片。

#### Scenario: 桌面端显示
- **WHEN** 进入 Visual 模式并触发任意对话
- **THEN** 底部出现固定高度的深色半透明对话框面板，左侧显示当前说话人圆形头像，右侧显示说话人名称（金色）与正文（白色），面板顶部有细高光边，底部/背后有柔和投影
- **AND** 面板不遮挡角色立绘脸部，且文字清晰可读

#### Scenario: 移动端适配
- **WHEN** 在移动设备进入 Visual 模式
- **THEN** 对话框高度、内边距、字号自动缩小，头像尺寸与名称/正文比例保持协调
- **AND** 安全区底部（env(safe-area-inset-bottom)）得到正确处理

### Requirement: 文本层级规范化

系统 SHALL 区分并强化 Visual 模式下的文本层级。

#### Scenario: 普通 NPC 对话
- **WHEN** NPC 说话时
- **THEN** 名称显示为金色/浅橙、较小字号、轻微 glow；正文显示为 17-18px、字距 0.02em、带 text-shadow

#### Scenario: 玩家与叙述者
- **WHEN** 玩家说话时
- **THEN** 名称色使用现有品牌暖色（rgba(212, 165, 116, 0.95)），保持与当前一致
- **WHEN** 叙述者（无头像）说话时
- **THEN** 名称使用灰白色斜体，正文略淡，且不显示头像

### Requirement: 电影化背景处理

系统 SHALL 为 Visual 模式背景增加场景图支持与氛围处理。

#### Scenario: 场景图存在
- **WHEN** 当前剧情配置包含背景图
- **THEN** 背景层显示该场景图，覆盖全屏，object-fit: cover，并在其上方叠加轻微径向暗角与颗粒噪点

#### Scenario: 场景图不存在
- **WHEN** 当前剧情未配置背景图
- **THEN** 回退到现有蓝紫渐变背景，但保留径向暗角，确保对话框文字可读

#### Scenario: 场景切换
- **WHEN** 剧情切换背景图时
- **THEN** 新背景图以 1.2s 淡入，并伴随极缓慢的缩放/平移（Ken Burns）动画，避免生硬跳切
- **AND** 切换过程中不出现全白或透明闪烁

## MODIFIED Requirements

### Requirement: Visual 模式现有布局

**原实现**：底部 `.galgame-dialogue-bar` 为全宽渐变条，无头像、无边框投影，背景默认纯色渐变。

**修改后**：底部 `.galgame-dialogue-bar` 为半透明毛玻璃卡片，带头像、名称/称号、高光边框、投影；背景层支持场景图、暗角、颗粒与镜头运动。

## REMOVED Requirements

无
