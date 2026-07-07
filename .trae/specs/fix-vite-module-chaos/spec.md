# 修复项目混乱问题 Spec

## Why
项目当前存在 Vite 模块解析失败导致 VRMRenderer 加载报错、importmap 与 Vite alias 冲突、head 中 await 阻塞页面渲染等核心问题，导致页面加载缓慢且控制台大量报错，用户体验极差。

## What Changes
- 修复 Vite 配置中 `three/addons/` 别名无法正确解析的问题，改用正则别名
- 移除 index.html 中的 `<script type="importmap">`，统一由 Vite 管理模块解析
- 将 VRMRenderer 初始化从 `<head>` 中的阻塞式 `await` 改为非阻塞异步加载
- 修复 GLTFLoader.js 内部 `from 'three'` 导入在 Vite 下的解析问题

## Impact
- Affected specs: deep-inspection-fix-2026
- Affected code: `vite.config.js`, `index.html`, `utils/VRMRenderer.js`

## ADDED Requirements

### Requirement: Vite 正确解析 three.js 相关模块
Vite 配置 SHALL 正确解析 `three`、`three/addons/loaders/GLTFLoader.js` 和 `@pixiv/three-vrm` 三个模块路径，使 VRMRenderer.js 在 Vite 开发服务器中无加载错误。

#### Scenario: Vite 开发服务器启动
- **WHEN** 通过 `npm run dev` 启动 Vite 开发服务器
- **THEN** 控制台无 `Failed to resolve import` 错误
- **AND** VRMRenderer.js 中的 `import('three')`、`import('three/addons/loaders/GLTFLoader.js')`、`import('@pixiv/three-vrm')` 均正确解析

### Requirement: 移除 importmap 避免与 Vite 冲突
index.html 中的 `<script type="importmap">` SHALL 被移除，因为 Vite 有自己的模块解析系统，importmap 会与 Vite 的 alias 产生冲突。

#### Scenario: 页面加载
- **WHEN** 页面通过 Vite 开发服务器加载
- **THEN** 不存在 importmap 定义
- **AND** 所有模块路径由 Vite 的 resolve.alias 统一管理

### Requirement: VRMRenderer 初始化不阻塞页面渲染
VRMRenderer 的初始化 SHALL 在 `<body>` 之后异步执行，不得在 `<head>` 中使用 `await` 阻塞页面渲染。

#### Scenario: 页面首次加载
- **WHEN** 用户打开应用
- **THEN** 首页内容立即开始渲染，不等 VRMRenderer 加载完成
- **AND** VRMRenderer 在后台异步加载，加载完成后设置 `window._vrmReady = true`

#### Scenario: VRM 加载失败
- **WHEN** VRMRenderer 加载失败（如 three.js 文件缺失）
- **THEN** 页面其余功能不受影响
- **AND** 控制台输出警告但不阻塞渲染

## MODIFIED Requirements

无

## REMOVED Requirements

无
