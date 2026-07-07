# 修复首页渲染根本问题 Spec

## Why
首页当前只显示"开始"按钮，其他所有元素不可见。经过深入审计，发现了多个导致首页渲染异常的根本原因：reset.css 中的 `svg { fill: currentColor; }` 覆盖了所有 SVG 的渐变和填充，`img, video { height: auto }` 导致视频元素高度为0，背景层可能未正确铺满屏幕。这些问题导致首页的背景、SVG图标、装饰元素全部不可见。

## What Changes
- **修复 reset.css**：为首页 SVG 和背景视频添加例外规则，避免被全局重置覆盖
- **修复背景层**：确保视频和图片背景正确铺满整个屏幕
- **修复 SVG 渐变**：移除或限制 `svg { fill: currentColor; }` 对首页 SVG 的影响
- **修复 fallback 逻辑**：优化视频加载失败时的图片 fallback

## Impact
- Affected specs: fix-homepage-issues, fix-homepage-layout-alignment, restore-beautiful-homepage
- Affected code: `styles/reset.css`, `styles.css`, `pages/home/home.css`, `index.html`

## ADDED Requirements

### Requirement: reset.css 不影响首页 SVG 和视频
reset.css 中的全局规则 SHALL 不覆盖首页特定的 SVG 渐变填充和视频尺寸。视频元素 SHALL 有明确的高度（`height: 100%` 或 `object-fit: cover`），而非 `height: auto`。SVG 元素 SHALL 不被 `fill: currentColor` 覆盖其内部定义的渐变。

#### Scenario: 首页背景视频
- **WHEN** 首页加载背景视频
- **THEN** 视频 SHALL 有 `width: 100%; height: 100%; object-fit: cover`
- **AND** 视频 SHALL 不被 reset.css 的 `height: auto` 影响

#### Scenario: 首页背景SVG
- **WHEN** 首页加载背景SVG
- **THEN** SVG SHALL 保留其内部定义的渐变和填充
- **AND** SVG SHALL 不被 reset.css 的 `fill: currentColor` 覆盖

### Requirement: 背景层铺满屏幕
首页的背景层 SHALL 铺满整个 `.game-homepage` 容器，无论视频是否加载成功。

#### Scenario: 背景层渲染
- **WHEN** 首页渲染背景层
- **THEN** 背景容器 SHALL 有 `position: absolute; inset: 0`
- **AND** 背景内容（视频/图片/SVG） SHALL 完全填充容器

### Requirement: 视频加载失败时的 fallback
当视频加载失败时，fallback 图片 SHALL 正确显示，且不应使用 `onerror="this.style.display='none'"` 隐藏图片。

#### Scenario: 视频 fallback
- **WHEN** 背景视频加载失败
- **THEN** fallback 图片 SHALL 正确显示
- **AND** fallback 图片 SHALL 有与视频相同的尺寸和定位

## MODIFIED Requirements
无

## REMOVED Requirements
无
