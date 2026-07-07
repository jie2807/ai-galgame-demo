# 上线前移动端全面优化 Spec

## Why

项目即将上线并推送给移动端用户，但目前存在三个核心风险：AI工作台功能尚未完成却直接暴露在首页菜单，容易让玩家进入半成品页面；书架系统的删除交互在部分设备/场景下可能失效；大量页面未针对移动端小屏横屏游玩做充分适配。本次优化聚焦“隐藏未完成入口、修复关键体验、补齐移动端适配”，确保玩家能在手机上流畅、稳定地游玩核心功能。

## What Changes

- **改造 AI 工作台入口**：首页左侧菜单“AI工作台”点击后弹出“正在开发中”提示，不再打开 creator-wars-page 半成品页面
- **确保书架书籍可删除**：修复/验证书架卡片删除按钮在桌面端 hover、移动端长按后的显示与删除确认流程
- **移动端体验深度优化**：修复首页、章节选择、游戏对话、书架、阅读器、抽卡、角色列表/详情、模型配置等页面在 480px/360px/320px 宽度下的布局与触控问题
- **按钮功能可识别**：所有主要操作按钮具有明确的文字标签或图标语义，避免玩家不清楚按钮用途
- **功能串联与稳定性**：修复页面显示/隐藏机制不一致、localStorage 异常、退出游戏未清理状态等可能在上线路径上暴露的问题
- **废弃代码清理**：移除已废弃的电台指挥官系统残留代码，减少构建体积与潜在冲突

## Impact

- Affected specs: user-perspective-feature-optimization, fix-bookshelf-delete-and-reader, mobile-responsive-layout, optimize-all-pages-responsive, landscape-auto-scale-all-pages, deep-audit-all-features-2026
- Affected code:
  - `index.html`（AI工作台按钮事件、书架删除逻辑、页面导航与状态清理、各功能模块显示控制）
  - `styles.css`（响应式断点、面板显示机制、固定像素值转 clamp、电台指挥官清理）
  - `pages/home/home.css`（首页移动端适配）
  - `pages/chapter-mission/chapter-mission.css`（章节任务模态框响应式）
  - `pages/custom-chapter/custom-chapter.css`（自定义章节编辑器响应式与未定义变量）
  - `pages/creator-wars/creator-wars.css`（保留但不再通过菜单直接打开）

## ADDED Requirements

### Requirement: AI工作台入口显示“正在开发中”

系统 SHALL 在玩家点击首页左侧菜单的“AI工作台”时，仅显示“正在开发中”提示，不再打开 creator-wars-page。

#### Scenario: 桌面端点击 AI工作台
- **WHEN** 玩家在桌面端点击左侧菜单“AI工作台”
- **THEN** 弹出轻量提示/弹窗，显示“正在开发中”或“AI工作台 正在开发中，敬请期待”
- **AND** 不打开 creatorWarsPage

#### Scenario: 移动端点击 AI工作台
- **WHEN** 玩家在移动端点击“AI工作台”图标
- **THEN** 显示与桌面端一致的“正在开发中”提示
- **AND** 提示在 1.5~2 秒后自动消失，或点击遮罩/确定按钮关闭

---

### Requirement: 书架书籍删除功能稳定可用

系统 SHALL 在书架页面的每张书籍卡片上提供可见且可点击的删除入口，并在删除前要求确认。

#### Scenario: 桌面端删除书籍
- **WHEN** 玩家将鼠标悬停在书籍卡片上
- **THEN** 卡片右上角显示删除按钮（×）
- **WHEN** 玩家点击删除按钮
- **THEN** 弹出确认弹窗，确认后从 localStorage 移除该书及书签，书架列表立即刷新

#### Scenario: 移动端删除书籍
- **WHEN** 玩家在移动端长按书籍卡片超过 500ms
- **THEN** 卡片右上角显示删除按钮（×），3 秒内未操作自动隐藏
- **WHEN** 玩家点击删除按钮
- **THEN** 弹出确认弹窗，确认后删除成功并刷新书架

#### Scenario: 删除后空书架状态
- **WHEN** 玩家删除最后一本书
- **THEN** 书架显示“书架尚无藏书”空状态

---

### Requirement: 移动端横屏等比例缩放

系统 SHALL 在移动端保持横屏布局，所有页面元素随视口大小等比例缩放，不转为竖屏/垂直堆叠。

#### Scenario: 小屏设备横屏游玩
- **WHEN** 玩家在宽度 ≤480px 的手机上打开项目
- **THEN** 首页、章节选择、游戏、书架、阅读器、抽卡等页面保持横屏布局
- **AND** 字体、图标、按钮、卡片、间距按 clamp() + vw/vh 持续缩放，无溢出、重叠或水平滚动

#### Scenario: 极小屏幕适配
- **WHEN** 玩家在宽度 ≤360px 的设备上游玩
- **THEN** 所有核心操作按钮 ≥44×44px，文字可读，关键 UI 不被裁切

---

### Requirement: 首页移动端清晰可玩

系统 SHALL 确保首页在移动端显示完整，左侧菜单、角色立绘、开始按钮、侧边按钮均清晰可见且可点击。

#### Scenario: 移动端首页
- **WHEN** 玩家在手机上进入首页
- **THEN** 背景视频/Live2D 正常加载，不遮挡菜单
- **AND** “开启篇章”按钮大小适合手指点击
- **AND** 左侧菜单图标+文字清晰，点击后有明确反馈

---

### Requirement: 游戏对话页移动端可用

系统 SHALL 确保游戏对话页在移动端可用，输入框、快捷菜单、对话历史、角色立绘均正常显示。

#### Scenario: 移动端进入游戏
- **WHEN** 玩家在小屏设备上开始章节并进入对话
- **THEN** 立绘不遮挡对话文本
- **AND** 输入框可正常聚焦、发送
- **AND** 快捷菜单/设置面板可打开并关闭，不阻挡核心操作

---

### Requirement: 抽卡与角色页移动端可用

系统 SHALL 确保抽卡页面、角色列表页、角色详情页在移动端可正常显示和操作。

#### Scenario: 移动端抽卡
- **WHEN** 玩家在手机上进入抽卡
- **THEN** 抽卡按钮、动画、结果展示完整可见
- **AND** 返回按钮可点击

#### Scenario: 移动端角色详情
- **WHEN** 玩家在手机上查看角色详情
- **THEN** 左侧立绘区与右侧信息区等比例缩放，不互相挤压
- **AND** “开始聊天”等按钮可点击

---

### Requirement: 按钮语义明确

系统 SHALL 确保所有主要功能按钮让玩家清楚对应功能。

#### Scenario: 首页按钮
- **WHEN** 玩家浏览首页
- **THEN** 每个按钮都有文字标签或 tooltip，图标含义不模糊

#### Scenario: 游戏内按钮
- **WHEN** 玩家进入游戏
- **THEN** 背包、任务、设置、返回等按钮有明确图标或文字说明

---

### Requirement: 功能串联与稳定性

系统 SHALL 修复可能导致上线后玩家遇到的功能断裂与数据异常问题。

#### Scenario: 页面显示/隐藏统一
- **WHEN** 玩家在各页面之间切换
- **THEN** 全屏覆盖页面统一使用 `.active` 类控制显示/隐藏，不使用 `style.display` 直接操作

#### Scenario: 数据读写异常保护
- **WHEN** localStorage 写入/读取失败（如隐私模式、存储已满）
- **THEN** 不崩溃，使用默认值并提示玩家

#### Scenario: 退出游戏状态清理
- **WHEN** 玩家在游戏中点击退出
- **THEN** 清理自定义剧本产生的临时 NPC、世界信息、好感度数据等，恢复到初始状态

---

### Requirement: 清理电台指挥官残留

系统 SHALL 彻底移除已废弃的电台指挥官系统相关代码。

#### Scenario: 代码清理
- **WHEN** 搜索 `.rc-*` 或 `.radio-commander-*`
- **THEN** 不存在任何相关 CSS、HTML、JS 代码
- **AND** 首页无电台指挥官入口

## MODIFIED Requirements

### Requirement: AI工作台入口行为
**Current state**: 点击“AI工作台”打开 creator-wars-page 半成品页面  
**New state**: 点击后仅弹出“正在开发中”提示

### Requirement: 固定像素尺寸策略
**Current state**: 大量子页面使用固定像素值（font-size、width、padding 等）  
**New state**: 核心页面与交互元素改用 `clamp()` + `vw`/`vh`，确保持续缩放

### Requirement: 书架删除按钮可见性
**Current state**: 删除按钮默认隐藏，依赖 hover/长按  
**New state**: 保留 hover/长按触发，但增加更明显的手势反馈与空状态提示，确保删除流程稳定

## REMOVED Requirements

### Requirement: 电台指挥官系统
**Reason**: 该功能已废弃，不再维护  
**Migration**: 直接删除相关 CSS、HTML、JS，首页移除入口按钮

