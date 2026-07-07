# Taptap 商店上架资料准备 Spec

## Why

项目已完成移动端上线适配（`adapt-mobile-launch-final`），计划上架 Taptap 进行一轮测试分发。Taptap 开发者后台要求填写完整的商店资料，包括游戏简介、开发者对玩家的话、游戏图标、截图、宣传图、宣传语等。目前这些资料尚未系统整理，部分素材缺失。本 Spec 聚焦一次性产出可直接用于 Taptap 后台填写的文案与视觉资料包（实机录屏由用户自行提供，不在本 Spec 范围内）。

## What Changes

- 编写 Taptap 游戏简介（含短简介与完整简介）
- 编写开发者对玩家的话
- 设计 3-5 条候选宣传语 / Slogan
- 生成/优化游戏图标（512×512 PNG，兼容 Taptap 上传要求）
- 生成 3-5 张游戏截图/宣传图（16:9 或 9:16，适配移动端展示）
- 生成宣传视频封面图（若用户后续提供录屏，可直接作为视频封面）
- 整理 `assets/marketing/taptap/` 资料包并输出清单

## Impact

- Affected specs: `adapt-mobile-launch-final`、`pre-launch-mobile-optimization`（依赖其已完成的移动端功能与 PWA 元信息）
- Affected code: 无代码修改，仅新增/替换 `assets/marketing/taptap/` 下的营销素材
- Risk: 项目当前名称为「紫罗兰永恒花园」，与已有动漫 IP 中文译名重合，上架时可能触发版权/审核风险，需在资料准备阶段提示用户并准备备选名称

## ADDED Requirements

### Requirement: Taptap 商店文案

The system SHALL 提供符合 Taptap 后台字段要求的全部文案。

#### Scenario: 游戏简介满足字数限制
- **WHEN** 用户将「短简介」粘贴到 Taptap 后台
- **THEN** 字数 ≤ 50 字，突出核心玩法
- **AND** 将「完整简介」粘贴到 Taptap 后台时字数 ≤ 1000 字，结构清晰、包含亮点与玩法说明

#### Scenario: 开发者的话真诚且不过度承诺
- **WHEN** 用户将「开发者的话」粘贴到 Taptap 后台
- **THEN** 字数在 200-500 字之间
- **AND** 内容包含创作初衷、当前测试阶段说明、对玩家的感谢与反馈邀请
- **AND** 不承诺具体上线时间或付费内容

#### Scenario: 提供多组候选 Slogan
- **WHEN** 用户查看资料包
- **THEN** 至少提供 5 条候选宣传语（一句话简介）
- **AND** 每条 ≤ 20 字
- **AND** 分别侧重剧情、AI、自定义、沉浸感等不同卖点

### Requirement: 游戏图标

The system SHALL 生成可用于 Taptap 商店的游戏图标。

#### Scenario: 图标规格符合上传要求
- **WHEN** 用户下载 `assets/marketing/taptap/icon-512.png`
- **THEN** 图片尺寸为 512×512 像素
- **AND** 格式为 PNG
- **AND** 主视觉清晰，在 144×144 缩略图下仍可辨识
- **AND** 风格与项目现有紫罗兰/花园/书信/AI 主题一致

### Requirement: 游戏截图与宣传图

The system SHALL 生成 3-5 张可用于 Taptap 详情页的截图或宣传图。

#### Scenario: 截图尺寸适配移动端
- **WHEN** 用户下载 `assets/marketing/taptap/screenshots/` 下图片
- **THEN** 每张图片为 9:16 竖版或 16:9 横版
- **AND** 分辨率不低于 1080×1920（9:16）或 1920×1080（16:9）
- **AND** 画面内容对应项目真实功能场景（首页、章节、对话、Creator Wars、自定义剧本编辑器）
- **AND** 图片风格统一，不出现未实现功能或误导性内容

#### Scenario: 宣传视频封面
- **WHEN** 用户下载 `assets/marketing/taptap/video-cover.jpg`
- **THEN** 图片为 16:9 横版
- **AND** 分辨率不低于 1920×1080
- **AND** 适合作为实机录屏视频的封面

### Requirement: 资料包整理

The system SHALL 将所有资料整理到统一目录并附带使用说明。

#### Scenario: 资料包结构清晰
- **WHEN** 用户打开 `assets/marketing/taptap/`
- **THEN** 目录下包含 `copy/`（文案）、`icons/`（图标）、`screenshots/`（截图）、`promo/`（宣传图）、`README.md`（使用说明）
- **AND** README.md 中列出每个文件的用途、Taptap 后台对应字段、版权风险提示

## MODIFIED Requirements

无。

## REMOVED Requirements

无。
