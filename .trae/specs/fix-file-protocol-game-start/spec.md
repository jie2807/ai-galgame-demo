# 修复 file:// 协议下游戏无法启动与立绘按钮问题 Spec

## Why
用户通过双击 `index.html` 以 `file://` 协议打开项目，导致 ES 模块路由系统（`main.js`）无法加载（浏览器 CORS 限制）。点击「开启」篇章按钮后，哈希变为 `/game` 但路由不响应，页面直接返回首页。同时自定义剧本编辑器中虽然有立绘按钮的 HTML，但缺少 CSS 导致按钮不可见，且立绘选择器依赖 `gachaPool` 变量，在无抽卡数据时显示空白。

## What Changes
- **修复 `file://` 协议下游戏启动问题**：在 `main.js` 的 `<script type="module">` 标签之前添加一个降级脚本，检测 ES 模块是否成功加载，若失败则提供一个不依赖模块的备用游戏入口
- **修复自定义剧本编辑器立绘按钮不可见**：在 `custom-chapter.css` 中确保 `.cce-npc-portrait-btn` 正确显示
- **修复立绘选择器无数据时的问题**：为 `generateCharOptions()` 添加默认角色池，确保即使没有抽卡数据也能正常使用

## Impact
- 受影响模块：游戏启动流程、自定义剧本编辑器
- 受影响文件：`index.html`、`main.js`、`pages/custom-chapter/custom-chapter.css`

## MODIFIED Requirements

### Requirement: 游戏启动流程
当用户通过 `file://` 协议打开首页时，点击「开启」按钮应能正常进入游戏页面，而不是卡在首页或返回。

#### Scenario: file:// 协议下启动游戏
- **WHEN** 用户双击 `index.html` 以 `file://` 协议打开
- **AND** 用户点击「开启」篇章按钮
- **THEN** 游戏页面正常显示，不会返回首页

#### Scenario: HTTP 协议下启动游戏（不受影响）
- **WHEN** 用户通过 HTTP 服务器访问
- **THEN** 现有 ES 模块路由正常工作，无行为变化

### Requirement: 自定义剧本立绘按钮
在自定义剧本编辑器中，添加 NPC 后应能看见并点击立绘按钮来为角色选择头像。

#### Scenario: 添加 NPC 后显示立绘按钮
- **WHEN** 用户在自定义剧本编辑器中添加一个 NPC
- **THEN** NPC 卡片上显示可见的 🎨 立绘按钮
- **AND** 点击后弹出角色选择器

#### Scenario: 无抽卡数据时仍有默认角色可选
- **WHEN** 用户点击立绘按钮且 `gachaPool` 未定义
- **THEN** 选择器显示一组默认角色供选择，而非显示"暂无可用角色"
