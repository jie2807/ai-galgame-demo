# 抖音布局重设计 Spec

## Why
当前抖音应用的布局混乱严重：视频区与评论区/发布面板/个人主页的层级关系不清晰，各页面（视频页/朋友页/消息页/个人页）缺少统一的子页面头部和内容区样式，评论面板和发布面板的定位与底部导航栏冲突，用户信息区与右侧操作按钮重叠，整体视觉层次混乱。需要对标真实抖音桌面端，重新设计布局结构。

## What Changes
- **重设计**：视频页布局——全屏视频区+顶部标签栏+右侧操作按钮+底部用户信息+底部导航栏，对标真实抖音
- **重设计**：评论面板——从底部滑出，不与底部导航栏冲突，正确的z-index层级
- **重设计**：发布/AI创作面板——居中弹窗，正确的遮罩层级
- **重设计**：个人主页——独立全屏页面，带返回按钮，正确的滚动区域
- **新增**：朋友页和消息页的子页面头部和内容区样式（当前仅有空状态）
- **修复**：用户信息区与右侧操作按钮的位置冲突
- **修复**：字幕与用户信息区重叠
- **修复**：通知条位置不正确

## Impact
- Affected specs: `redesign-douyin-app`（原抖音UI重构）、`build-douyin-ai-anchor-agent`（AI主播相关UI）
- Affected code:
  - `index.html`：renderDouyinContent函数（L20748+）的HTML结构重写
  - `pages/creator-wars/creator-wars.css`：.douyin-* 和 .dy-* 样式全面重写

---

## 现状问题分析

### 问题1：视频页布局混乱
当前视频页的HTML结构层次不清：
- `douyin-video-slide` 内部同时包含视频背景、Lottie层、字幕、模糊光效、视频内容、评论面板
- `douyin-video-content` 使用 `flex-direction: column` 但内部元素（top-bar、video-center、video-actions、user-info）的定位方式不一致——有的用flex布局，有的用absolute定位
- `douyin-video-actions` 使用 `position: absolute; right: 12px; bottom: 80px`，与 `douyin-user-info` 的 `position: absolute; left: 14px; bottom: 72px` 在底部区域重叠
- `douyin-video-center` 占据flex:1空间但只显示一个旋转音符，浪费了视频播放区域

### 问题2：评论面板定位冲突
- 评论面板 `douyin-comment-panel` 使用 `position: absolute; bottom: 52px`，与底部导航栏（高度52px）紧贴
- 但评论面板的z-index为20，底部导航栏z-index为10，面板会覆盖导航栏
- 真实抖音的评论面板是从底部导航栏上方滑出的，不覆盖导航栏

### 问题3：子页面缺少头部样式
- 朋友页和消息页使用了 `douyin-sub-page-header` 和 `douyin-sub-page-content` 类，但CSS中没有定义这些类的样式
- 导致这些页面头部和内容区没有正确的排版

### 问题4：字幕与用户信息重叠
- 字幕 `.douyin-subtitle` 定位在 `bottom: 80px`
- 用户信息 `.douyin-user-info` 定位在 `bottom: 72px`
- 两者在垂直方向上重叠

### 问题5：通知条位置不正确
- `.dy-anchor-notification` 使用 `top: -50px` 初始位置，显示时 `top: 50px`
- 但在macOS窗口内，50px可能被顶部标签栏遮挡

### 问题6：发布面板尺寸过大
- `.douyin-publish-card` 固定宽度360px，在较小的macOS窗口内可能溢出
- 面板内容过多，滚动体验差

---

## ADDED Requirements

### Requirement: 视频页布局重设计
视频页 SHALL 采用清晰的三层结构：全屏视频背景层 → 内容覆盖层 → 交互层。

**新布局结构**：
```
┌─────────────────────────────────┐
│  顶部标签栏 (推荐 | 关注)        │ ← z-index:5, 半透明背景
├─────────────────────────────────┤
│                                 │
│     全屏视频区 (渐变+Lottie)     │ ← z-index:0-1
│                                 │
│  ┌──────────┐    ┌──────────┐  │
│  │ 用户信息  │    │ 操作按钮  │  │ ← z-index:3
│  │ @xxx     │    │ ❤ 点赞   │  │
│  │ 描述...  │    │ 💬 评论   │  │
│  │ 🎵 音乐  │    │ 🔖 收藏   │  │
│  └──────────┘    │ 🔗 分享   │  │
│                  │ 🔇 静音   │  │
│                  └──────────┘  │
│  ┌─────────────────────────────┐│
│  │ 字幕区域                     ││ ← z-index:5, 底部安全区上方
│  └─────────────────────────────┘│
├─────────────────────────────────┤
│  底部导航栏 (首页|朋友|+|消息|我) │ ← z-index:10
└─────────────────────────────────┘
```

**关键改动**：
- 用户信息区：`left: 14px; bottom: 64px; right: 72px`（给右侧按钮留空间）
- 操作按钮区：`right: 10px; bottom: 64px`（与用户信息区底部对齐）
- 字幕区：`bottom: 140px; left: 14px; right: 72px`（在用户信息上方，不重叠）
- 移除 `douyin-video-center`（旋转音符），视频区纯粹展示背景+Lottie
- 顶部标签栏添加半透明渐变背景，确保文字可读

#### Scenario: 视频页布局清晰
- **WHEN** 用户打开抖音应用
- **THEN** 视频区占满整个内容区域，顶部标签栏半透明
- **AND** 用户信息在左下角，操作按钮在右下角，互不重叠
- **AND** 字幕在用户信息上方，不遮挡任何元素

---

### Requirement: 评论面板定位修复
评论面板 SHALL 从底部导航栏上方滑出，不覆盖导航栏。

**关键改动**：
- 评论面板 `bottom: 52px`（紧贴导航栏上方）
- 评论面板最大高度 `calc(100% - 52px - 48px)`（不超出顶部标签栏）
- z-index: 15（在视频内容之上，但在发布面板之下）

#### Scenario: 评论面板不覆盖导航栏
- **WHEN** 用户点击评论按钮打开评论面板
- **THEN** 评论面板从底部导航栏上方滑出
- **AND** 底部导航栏仍然可见和可操作
- **AND** 评论面板不超出顶部标签栏区域

---

### Requirement: 子页面头部和内容区样式
朋友页和消息页 SHALL 有正确的子页面头部和内容区样式。

**样式定义**：
```css
.douyin-sub-page-header {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 14px 16px;
    border-bottom: 1px solid rgba(255,255,255,0.08);
    flex-shrink: 0;
}
.douyin-sub-page-title {
    font-size: 16px;
    font-weight: 600;
    color: #fff;
}
.douyin-sub-page-content {
    flex: 1;
    overflow-y: auto;
    display: flex;
    align-items: center;
    justify-content: center;
}
.douyin-empty-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
    color: rgba(255,255,255,0.3);
}
.douyin-empty-state svg {
    width: 48px;
    height: 48px;
    opacity: 0.4;
}
.douyin-empty-state span {
    font-size: 14px;
}
```

#### Scenario: 朋友页和消息页正确显示
- **WHEN** 用户切换到朋友页或消息页
- **THEN** 页面有清晰的标题头部和居中的空状态提示
- **AND** 页面布局与视频页的视觉风格一致

---

### Requirement: 发布面板响应式
发布面板 SHALL 在不同窗口大小下正确显示。

**关键改动**：
- `.douyin-publish-card` 改为 `width: min(360px, 90%)`
- 面板内容区添加 `max-height: 70vh; overflow-y: auto`

#### Scenario: 小窗口下面板不溢出
- **WHEN** macOS窗口较小时打开发布面板
- **THEN** 面板宽度自适应，不超出窗口
- **AND** 面板内容可滚动查看

---

### Requirement: 通知条位置修复
通知条 SHALL 在顶部标签栏下方显示，不被遮挡。

**关键改动**：
- `.dy-anchor-notification` 初始 `top: -50px`，显示时 `top: 48px`（在标签栏下方）

---

## MODIFIED Requirements

### Requirement: 视频页HTML结构
当前：视频内容区(douyin-video-content)内同时包含top-bar、video-center(旋转音符)、video-actions、user-info，定位方式混乱。
修改后：移除video-center，top-bar使用半透明背景，video-actions和user-info底部对齐不重叠，字幕在user-info上方。

### Requirement: CSS样式组织
当前：.douyin-*样式分散且部分缺失（sub-page-header等未定义）。
修改后：统一重写所有.douyin-*样式，确保层级清晰、定位一致、无重叠。

---

## REMOVED Requirements

### Requirement: douyin-video-center旋转音符
**Reason**: 旋转音符占据视频中心区域但无实际意义，且浪费flex:1空间
**Migration**: 移除该元素，视频区纯粹展示背景渐变+Lottie动画
