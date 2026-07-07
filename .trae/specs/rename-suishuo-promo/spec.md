# 改名"随说" + TapTap宣传图 Spec

## Why
项目准备在 TapTap 上架测试版，需要将当前显示名"紫罗兰永恒花园/紫罗兰花园"统一改为新品牌名"随说"，并补齐 TapTap 商店详情页所需的三张宣传图。当前商店页面缺乏视觉物料，影响首次访客的转化与认知。

## What Changes
- 将面向用户可见的项目显示名统一改为"随说"
  - `index.html` 的 `<title>` 标签：`紫罗兰永恒花园 - 首页` → `随说 - 首页`
  - `index.html` 的 `<meta name="apple-mobile-web-app-title">`：`紫罗兰花园` → `随说`
  - `manifest.webmanifest` 的 `name` 与 `short_name`：改为"随说"
  - **不改** `qmzz_*` 系列 localStorage key（保护既有存档/设置/自定义剧本数据）
  - **不改** 内部"紫罗兰"角色名（如首页模型配置中的 `紫罗兰` 模型按钮、`紫罗兰花` 收藏名，那是 NPC/模型命名，不是项目名）
- 使用生图技能（byted-seedream-image-generate）生成 3 张 TapTap 宣传图，落地到 `promotional/` 目录：
  - 图1 主视觉：品牌 + AI 视觉小说聊天核心氛围
  - 图2 玩法亮点：官方/自定义剧本 + Live2D 立绘 + AI 工作台 + 邮件/头像自定义等功能集合
  - 图3 沉浸场景：末日文与修仙文双剧本场景氛围 + NPC 群像

## Impact
- Affected code:
  - `index.html`（title、apple-mobile-web-app-title meta）
  - `manifest.webmanifest`（name、short_name）
- 新增资源：
  - `promotional/suishuo_promo_01_main.jpg`（1920×1080，主视觉）
  - `promotional/suishuo_promo_02_features.jpg`（1920×1080，玩法亮点）
  - `promotional/suishuo_promo_03_scenes.jpg`（1920×1080，沉浸场景）
- 不受影响：
  - `qmzz_*` localStorage 键名（存档兼容性硬约束）
  - 内部 NPC/模型名（紫罗兰作为 NPC 角色名保留）
  - PWA 已安装用户：manifest name 改变可能导致 Android 主屏图标 label 变化，但不影响功能

## ADDED Requirements

### Requirement: 项目显示名统一为"随说"
The system SHALL 在所有面向用户可见的品牌展示位置（浏览器标题栏、PWA 安装标题、主屏图标标签、manifest 应用名）统一显示"随说"作为应用名称。

#### Scenario: 浏览器标签页标题
- **WHEN** 用户在浏览器中打开应用首页
- **THEN** 浏览器标签页显示"随说 - 首页"

#### Scenario: PWA 安装到主屏
- **WHEN** 用户将应用添加到主屏
- **THEN** 主屏图标下方标签显示"随说"，且 manifest 中 name/short_name 均为"随说"

#### Scenario: 存档数据兼容
- **WHEN** 已有用户在改名后再次打开应用
- **THEN** 既有 `qmzz_*` 键下的存档、自定义剧本、设置、好感度、成就等数据完整保留并可正常读取

### Requirement: TapTap 三张宣传图
The system SHALL 提供 3 张 1920×1080 横版 JPG 宣传图，分别覆盖主视觉、玩法亮点、沉浸场景三个主题，存放于 `promotional/` 目录，可直接上传至 TapTap 商店详情页。

#### Scenario: 主视觉宣传图
- **WHEN** TapTap 商店访客查看详情页第一张宣传图
- **THEN** 看到包含"随说"品牌名、AI 视觉小说聊天氛围、鲜明视觉焦点的横版图