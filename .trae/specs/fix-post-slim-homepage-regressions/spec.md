# 修复首页导航与按钮回归问题 Spec

## Why

项目在前一轮深度瘦身（`deep-slim-project-resources-and-code`）中清理死代码时，误删了首页多个仍在使用的事件绑定与函数定义，导致大量按钮点击无响应、控制台报 `ReferenceError`，用户无法正常使用书架、邮件、角色信息等功能。

## What Changes

- 恢复首页被误删的 JavaScript 函数定义与事件绑定
- 修复书架（Book Shelf）的打开、关闭、渲染、阅读、删除等完整流程
- 修复角色信息面板（`showUserInfoModal`）的显示
- 修复邮件按钮（`mailBtn`）的点击响应
- 修复 `updateMsgBadge` 缺失导致的控制台错误
- 修复或补齐左下角/右下角活动横幅的点击处理
- 修复 `dynamic-island-toast` 显示状态异常（添加 `.show` 后仍不可见）
- 通过浏览器回归验证所有首页按钮可正常交互

## Impact

- Affected specs: `deep-slim-project-resources-and-code`、`fix-project-bugs-and-cleanup`
- Affected code: `index.html`、相关 CSS（`styles.css`、`pages/home/home.css`）

## ADDED Requirements

### Requirement: 死代码清理后的回归保护

在恢复功能后，系统 SHALL 提供一种可重复验证的手段，确保首页所有可见按钮/可交互元素都有对应的事件处理函数，避免后续清理再次误删。

#### Scenario: 函数调用与定义一致性检查

- **WHEN** 扫描 `index.html` 中所有被调用的全局函数
- **THEN** 每个被调用的函数都应在同一文件内有定义，否则列入回归报告

## MODIFIED Requirements

### Requirement: 首页按钮均可正常交互

系统 SHALL 保证首页所有可见按钮点击后有明确反馈，不会抛出 `ReferenceError` 或无任何响应。

#### Scenario: 书架按钮

- **WHEN** 用户点击首页右侧「书架 / BOOK SHELF」按钮
- **THEN** 打开书架页面 `bookShelfPage`，展示藏书列表或空书架提示

#### Scenario: 邮件按钮

- **WHEN** 用户点击首页右侧「邮件 / MAIL」按钮
- **THEN** 打开邮件面板 `mailPanelOverlay`

#### Scenario: 角色信息区域

- **WHEN** 用户点击左上角角色信息区域
- **THEN** 弹出用户信息模态框 `userInfoModal`

#### Scenario: 活动横幅

- **WHEN** 用户点击左下角/右下角活动横幅
- **THEN** 进入对应活动页面或弹出明确提示，而不是无响应

#### Scenario: 控制台无回归报错

- **WHEN** 页面加载完成并执行 `initNavbarIcons`
- **THEN** 不再出现 `updateMsgBadge is not defined` 等 `ReferenceError`

### Requirement: 书架功能完整可用

系统 SHALL 提供完整的书架功能，包括展示、阅读、删除书籍以及从相关入口添加书籍。

#### Scenario: 打开书架

- **WHEN** 用户点击书架按钮
- **THEN** 调用 `openBookShelf()` 并压入导航历史

#### Scenario: 阅读书籍

- **WHEN** 用户点击书架中的书籍卡片
- **THEN** 打开阅读器并渲染对应书籍内容

#### Scenario: 删除书籍

- **WHEN** 用户长按或在书籍卡片上点击删除按钮并确认
- **THEN** 从书架移除该书并重新渲染列表

#### Scenario: 关闭书架

- **WHEN** 用户点击书架返回按钮或调用返回
- **THEN** 关闭书架页面并返回首页

## REMOVED Requirements

无
