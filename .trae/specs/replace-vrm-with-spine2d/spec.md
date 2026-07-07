# 替换 VRM 技术路径为 Spine 2D 方案 Spec

## Why

当前项目使用 VRM（Three.js + @pixiv/three-vrm）作为角色模型渲染方案，经实际测试发现以下根本性问题：

1. **骨骼动画系统存在根本缺陷**：手臂骨骼动画经过 3 轮修复均未成功，根本原因是 VRM normalized bone 的旋转约定无法可靠地通过 Euler 角控制，需要复杂的重定向系统
2. **3D 路径对项目过重**：项目本质是 2D 互动小说/AI 角色扮演，不需要 3D 旋转视角，Three.js + VRM 的 WebGL 渲染开销在移动端压力大
3. **模型资源获取困难**：VRM 免费全身模型少，VRoid Hub 需登录下载，现有测试模型（VRM1_Constraint_Twist_Sample.vrm）是技术测试用例而非角色模型
4. **file:// 协议兼容性差**：本地打开时 VRM 模型加载需要复杂的 IndexedDB 缓存策略

项目已有 Live2D 基础设施（Live2DRenderer 类、3 个模型），且 Live2D 在面部表情/口型同步/视线追踪方面表现优异。需要一种能补充 Live2D 全身动画短板的 2D 方案。

## What Changes

- 引入 Spine 2D 骨骼动画系统，替代 VRM 3D 模型方案
- 创建 SpineRenderer 类，封装 Spine 模型加载、动画播放、骨骼控制
- 改造"人物纪念收藏"测试页面，使用 Spine 模型替代 VRM 模型
- 移除 VRM 相关代码和依赖（Three.js、@pixiv/three-vrm、FBXLoader 等）
- AI 控制逻辑升级：文字指令 → 匹配 Spine 动画/骨骼姿势 → 播放
- 保留 Live2D 用于角色详情页/抽卡页的面部表情展示

## Impact

- Affected specs: 全身模型测试页面、AI 控制模型逻辑
- Affected code: `index.html`（移除 Three.js 依赖 + 改造测试页面）、移除 `vrm-renderer.js`、移除 `js/vrm-bundle.js`/`js/vrm-entry.js`、新增 `spine-renderer.js`、`models/spine/` 目录
- **BREAKING**: VRM 模型文件（`models/vrm/`）将不再使用，Three.js 相关 CDN 依赖移除

## 方案对比

### 方案 A：Spine 2D 骨骼动画（推荐）

| 维度 | 评估 |
|------|------|
| 动画丰富度 | ⭐⭐⭐⭐⭐ 支持 IK、物理约束、网格变形、皮肤系统、动画混合、事件系统 |
| AI 可控性 | ⭐⭐⭐⭐ 可通过 API 编程控制骨骼旋转/位移、切换动画状态、混合动画 |
| 表情/面部控制 | ⭐⭐⭐ 无内置表情系统，需通过骨骼+网格变形实现 |
| 口型同步 | ⭐⭐⭐ 可通过事件系统+编程实现，需自行开发 |
| 移动端性能 | ⭐⭐⭐⭐⭐ 2D 骨骼渲染开销极低 |
| 社区生态 | ⭐⭐⭐⭐⭐ 游戏行业广泛使用，社区资源丰富 |
| 免费资源 | ⭐⭐⭐ 官方 Asset Pack + 社区大量免费/付费资源 |
| 集成难度 | ⭐⭐⭐⭐ pixi-spine 插件，与现有 PixiJS 基础设施兼容 |
| 成本 | Essential $69 / Professional $379 一次性买断 |

### 方案 B：深化 Live2D 方案

| 维度 | 评估 |
|------|------|
| 动画丰富度 | ⭐⭐⭐ 全身动作表现力有限，行走/战斗等不够自然 |
| AI 可控性 | ⭐⭐⭐⭐⭐ 参数系统天然适合 AI 编程控制 |
| 表情/面部控制 | ⭐⭐⭐⭐⭐ 这是 Live2D 的核心优势 |
| 口型同步 | ⭐⭐⭐⭐⭐ 内置口型映射参数 |
| 移动端性能 | ⭐⭐⭐⭐ 轻量架构 |
| 零迁移成本 | ⭐⭐⭐⭐⭐ 项目已有完整 Live2D 基础设施 |
| 全身动画短板 | ⭐⭐ 无法实现行走/跳舞/战斗等复杂全身动作 |

### 方案 C：Spine 2D + Live2D 混合方案

| 维度 | 评估 |
|------|------|
| 动画丰富度 | ⭐⭐⭐⭐⭐ Spine 全身 + Live2D 面部 = 最强组合 |
| AI 可控性 | ⭐⭐⭐⭐⭐ 两套 API 均可编程控制 |
| 表情/面部控制 | ⭐⭐⭐⭐⭐ Live2D 面部表现力极强 |
| 集成复杂度 | ⭐⭐ 需要两套渲染管线合成，开发成本高 |
| 维护成本 | ⭐⭐ 两套模型制作流程、两套动画系统 |

### 方案 D：Rive 交互式动画

| 维度 | 评估 |
|------|------|
| 动画丰富度 | ⭐⭐⭐ 角色动画功能不如 Spine 成熟 |
| AI 可控性 | ⭐⭐⭐⭐ 状态机+数据绑定适合程序化控制 |
| 表情/面部控制 | ⭐⭐ 无内置表情参数系统 |
| 移动端性能 | ⭐⭐⭐⭐⭐ WASM 渲染，性能极佳 |
| 角色动画能力 | ⭐⭐ 更侧重 UI/交互动画，角色动画资源少 |

**结论：方案 A（Spine 2D）为最优选择。** 理由：
1. 与现有 PixiJS 基础设施天然兼容（pixi-spine 插件）
2. 2D 骨骼动画完美解决全身动作需求
3. 移动端性能优异
4. 一次性买断，无持续订阅
5. 社区资源丰富，游戏行业广泛使用
6. AI 可通过 API 编程控制骨骼和动画

## ADDED Requirements

### Requirement: Spine 2D 模型渲染系统

系统应提供基于 PixiJS + pixi-spine 的 Spine 2D 模型渲染能力。

#### Scenario: 加载 Spine 模型
- **WHEN** 用户打开全身模型测试页面
- **THEN** 系统通过 PixiJS 创建渲染上下文，加载 Spine 模型（.skel/.json + .atlas + 纹理）并显示在画布中

#### Scenario: Spine 模型加载失败回退
- **WHEN** Spine 模型加载失败
- **THEN** 系统显示错误提示信息

### Requirement: Spine 动画播放与混合

系统应支持 Spine 模型的动画播放、混合和切换。

#### Scenario: 播放行走动画
- **WHEN** AI 指令要求角色行走
- **THEN** 系统通过 `skeleton.setAnimation()` 播放行走动画

#### Scenario: 动画混合过渡
- **WHEN** 当前正在播放一个动画，用户请求播放另一个动画
- **THEN** 系统使用 `skeleton.addAnimation()` 实现平滑过渡（crossfade）

#### Scenario: 动画层叠加
- **WHEN** 需要同时播放身体动画和面部表情
- **THEN** 系统使用 Spine 动画层（track）分别控制身体和面部动画

### Requirement: AI 文字控制模型动作

系统应支持通过 AI 文字输入控制 Spine 模型执行动作。

#### Scenario: AI 解析文字指令并播放动画
- **WHEN** 用户输入"让角色跳一下"
- **THEN** AI 解析指令，匹配到跳跃 Spine 动画，通过 `setAnimation()` 播放

#### Scenario: AI 解析文字指令并控制骨骼姿势
- **WHEN** 用户输入"让角色举起右手"
- **THEN** AI 解析指令，通过 Spine 骨骼 API 直接控制 right-arm 骨骼旋转

#### Scenario: AI 无法识别的指令
- **WHEN** 用户输入无法匹配任何动作的指令
- **THEN** 系统显示提示信息，建议可用的动作列表

### Requirement: Spine 骨骼姿势预设

系统应提供一组预设骨骼姿势，可通过按钮或 AI 指令触发。

#### Scenario: 播放预设姿势
- **WHEN** 用户点击"挥手"按钮或输入"挥手"
- **THEN** 系统通过骨骼旋转实现挥手动画

### Requirement: 测试页面改造

"人物纪念收藏"测试页面应从 VRM 3D 模型切换为 Spine 2D 模型。

#### Scenario: 打开测试页面
- **WHEN** 用户点击首页"人物纪念收藏"卡片
- **THEN** 打开全身模型测试页面，显示 Spine 2D 模型、AI 控制面板、动作列表

## MODIFIED Requirements

### Requirement: 全身模型测试页面

原 VRM 3D 模型测试页面改为 Spine 2D 模型测试页面：
- 模型显示区域：从 Three.js WebGL Canvas 改为 PixiJS Canvas（与 Live2D 共享渲染管线）
- 动作列表：从 VRM 内置动画 + Mixamo FBX 改为 Spine 动画 + 骨骼姿势预设
- AI 控制：改为 Spine API 控制（setAnimation / 骨骼旋转）
- 位置/缩放：2D 坐标系统，无需 OrbitControls

## REMOVED Requirements

### Requirement: VRM 3D 模型渲染系统
**Reason**: VRM 骨骼动画系统存在根本性缺陷，3D 路径对项目过重
**Migration**: 替换为 Spine 2D 骨骼动画系统

### Requirement: Mixamo FBX 动画播放
**Reason**: Mixamo 动画依赖 Three.js FBXLoader 和 VRM 骨骼重定向，随 VRM 一起移除
**Migration**: 使用 Spine 自带动画系统，动画在 Spine 编辑器中制作

### Requirement: VRM 表情控制
**Reason**: VRM BlendShape 表情系统随 VRM 一起移除
**Migration**: Spine 骨骼+网格变形实现表情，或使用 Live2D 面部叠加

## 技术架构

### 依赖库

| 库 | 版本 | 用途 | 引入方式 |
|----|------|------|----------|
| pixi.js | 7.x | 2D WebGL 渲染引擎 | 已有 |
| @esotericsoftware/spine-pixi | 4.2+ | Spine 运行时 PixiJS 插件 | CDN |

### CDN 引入方式

```html
<!-- Spine 运行时 -->
<script src="https://cdn.jsdelivr.net/npm/@esotericsoftware/spine-pixi@4.2/dist/iife/spine-pixi.js"></script>
```

### SpineRenderer 类设计

```
SpineRenderer
├── constructor(containerId)       — 接收容器元素 ID
├── initialize()                   — 创建 PixiJS 应用
├── loadModel(skelUrl, atlasUrl)   — 加载 Spine 模型
├── playAnimation(name, loop)      — 播放动画
├── addAnimation(name, loop, delay)— 添加动画到队列（混合）
├── stopAnimation()                — 停止当前动画
├── setBoneRotation(boneName, x, y, z) — 设置骨骼旋转
├── resetPose()                    — 重置所有骨骼到默认姿势
├── setSkin(name)                  — 切换皮肤
├── getAvailableAnimations()       — 获取可用动画列表
├── getAvailableBones()            — 获取骨骼列表
├── getAvailableSkins()            — 获取皮肤列表
├── resize()                       — 响应容器大小变化
├── destroy()                      — 清理所有资源
└── _update()                      — 渲染循环
```

### Spine 模型资源

使用 Spine 官方免费示例模型或社区免费模型：
- Spine 官方示例：spine-unity-demo、spine-player-demo
- 社区免费模型：从 Spine 官方 Asset Pack 或社区获取

### AI 控制映射

AI 文字指令到动作的映射逻辑：

```javascript
const actionMap = {
  '走': 'walk',
  '行走': 'walk',
  '跑步': 'run',
  '跳': 'jump',
  '挥手': 'wave',
  '跳舞': 'dance',
  '坐': 'sit',
  '站': 'idle',
  '战斗': 'fight',
  '鼓掌': 'clap',
  '待机': 'idle',
  '休息': 'idle',
};
```

### 与现有 Live2D 共存策略

- Spine 和 Live2D 共享 PixiJS 渲染管线
- 同一时间只激活一个渲染器，切换时销毁另一个
- 抽卡页面和角色详情页继续使用 Live2D
- 全身模型测试页面使用 Spine
