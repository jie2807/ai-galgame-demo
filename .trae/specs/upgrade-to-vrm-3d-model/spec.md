# AI 控制全身模型方案升级 Spec

## Why

当前项目使用 Live2D 模型（Mao/Hiyori/Haru），仅支持有限的预定义动作（如 Mao 只有 8 个动作分 2 组），无法实现行走、跳跃、舞蹈等复杂动作。Live2D 本质是 2D 预设动画系统，无法通过程序化方式控制骨骼执行任意动作。用户需要 AI 通过文字指令控制模型执行各种动作，需要一种支持丰富动画和骨骼操控的模型方案。

## What Changes

- 引入 Three.js + @pixiv/three-vrm 技术栈，支持 VRM 3D 全身模型
- 下载 VRM 全身模型和 Mixamo 动画文件到本地
- 创建 VRMRenderer 类，封装 VRM 模型加载、Mixamo 动画播放、骨骼控制、表情控制
- 改造"人物纪念收藏"测试页面，使用 VRM 模型替代 Live2D 模型
- AI 文字控制逻辑升级：文字指令 → 匹配 Mixamo 动画/骨骼姿势 → 播放

## Impact

- Affected specs: 全身模型测试页面、AI 控制模型逻辑
- Affected code: `index.html`（新增 Three.js 依赖 + 改造测试页面）、新增 `vrm-renderer.js`、`models/vrm/` 目录

## 方案对比

### 方案 A：VRM 3D 模型 + Three.js + Mixamo 动画（推荐）

| 维度 | 评估 |
|------|------|
| 动画丰富度 | ⭐⭐⭐⭐⭐ Mixamo 提供数千种免费动画（行走、跑步、跳跃、舞蹈、战斗等） |
| 骨骼操控 | ⭐⭐⭐⭐⭐ VRM 标准化人形骨骼，可程序化控制任意骨骼 |
| AI 控制 | ⭐⭐⭐⭐⭐ AI 可将文字映射到 Mixamo 动画或自定义骨骼姿势 |
| 免费资源 | ⭐⭐⭐⭐ VRoid Hub 大量免费 VRM 模型，Mixamo 免费动画 |
| 社区活跃度 | ⭐⭐⭐⭐⭐ @pixiv/three-vrm 活跃维护（v3.5.3, 2026.05），大量社区资源 |
| 与现有系统兼容 | ⭐⭐⭐⭐ 独立 WebGL 上下文，可与 Live2D 共存 |

### 方案 B：扩展 Live2D 动作库

| 维度 | 评估 |
|------|------|
| 动画丰富度 | ⭐⭐ 只能使用预定义动作，无法实现任意动作 |
| 骨骼操控 | ⭐⭐ 仅支持参数化变形，非真正骨骼系统 |
| AI 控制 | ⭐⭐ 只能选择预设动作，无法生成新动作 |
| 免费资源 | ⭐⭐ 免费全身 Live2D 模型极少 |
| 社区活跃度 | ⭐⭐⭐ Live2D 社区活跃但以 2D 为主 |

### 方案 C：Spine 2D 骨骼动画

| 维度 | 评估 |
|------|------|
| 动画丰富度 | ⭐⭐⭐ 支持骨骼动画混合，但需要 Spine 编辑器制作 |
| 骨骼操控 | ⭐⭐⭐⭐ 支持程序化骨骼控制 |
| AI 控制 | ⭐⭐⭐ 可控制骨骼但需要自己实现动画系统 |
| 免费资源 | ⭐ Spine 编辑器付费，免费模型极少 |
| 社区活跃度 | ⭐⭐⭐ 游戏行业广泛使用但 Web 端资源少 |

### 方案 D：DragonBones 2D 骨骼动画

| 维度 | 评估 |
|------|------|
| 动画丰富度 | ⭐⭐⭐ 支持骨骼动画 |
| 骨骼操控 | ⭐⭐⭐⭐ 支持程序化骨骼控制 |
| AI 控制 | ⭐⭐⭐ 可控制骨骼 |
| 免费资源 | ⭐⭐ DragonBones 已停止维护 |
| 社区活跃度 | ⭐ 已停止维护，不推荐 |

**结论：方案 A（VRM + Three.js + Mixamo）为最优选择。**

## ADDED Requirements

### Requirement: VRM 3D 模型渲染系统

系统应提供基于 Three.js + @pixiv/three-vrm 的 VRM 模型渲染能力。

#### Scenario: 加载 VRM 模型
- **WHEN** 用户打开全身模型测试页面
- **THEN** 系统通过 Three.js 创建 3D 场景，加载 VRM 模型并显示在画布中

#### Scenario: VRM 模型加载失败回退
- **WHEN** 本地 VRM 模型加载失败
- **THEN** 系统尝试从 CDN 回退加载，若仍失败则显示错误提示

### Requirement: Mixamo 动画播放

系统应支持加载 Mixamo FBX 动画文件并播放到 VRM 模型上。

#### Scenario: 播放行走动画
- **WHEN** AI 指令要求角色行走
- **THEN** 系统加载行走 FBX 动画，通过 loadMixamoAnimation 转换后播放到 VRM 模型

#### Scenario: 动画切换过渡
- **WHEN** 当前正在播放一个动画，用户请求播放另一个动画
- **THEN** 系统使用 crossFade 实现平滑过渡（0.5 秒）

### Requirement: AI 文字控制模型动作

系统应支持通过 AI 文字输入控制 VRM 模型执行动作。

#### Scenario: AI 解析文字指令并播放动画
- **WHEN** 用户输入"让角色跳一下"
- **THEN** AI 解析指令，匹配到跳跃 Mixamo 动画，播放到 VRM 模型

#### Scenario: AI 解析文字指令并控制骨骼姿势
- **WHEN** 用户输入"让角色举起右手"
- **THEN** AI 解析指令，通过 VRM humanoid 骨骼接口控制 rightUpperArm 等骨骼旋转

#### Scenario: AI 无法识别的指令
- **WHEN** 用户输入无法匹配任何动作的指令
- **THEN** 系统显示提示信息，建议可用的动作列表

### Requirement: 骨骼姿势预设

系统应提供一组预设骨骼姿势，可通过按钮或 AI 指令触发。

#### Scenario: 播放预设姿势
- **WHEN** 用户点击"挥手"按钮或输入"挥手"
- **THEN** 系统通过骨骼旋转实现挥手动画

### Requirement: VRM 表情控制

系统应支持 VRM 模型的 BlendShape 表情控制。

#### Scenario: 切换表情
- **WHEN** 用户点击表情按钮或 AI 指令要求表情
- **THEN** 系统通过 VRM expressionManager 设置对应 BlendShape 权重

### Requirement: 测试页面改造

"人物纪念收藏"测试页面应从 Live2D 模型切换为 VRM 3D 模型。

#### Scenario: 打开测试页面
- **WHEN** 用户点击首页"人物纪念收藏"卡片
- **THEN** 打开全身模型测试页面，显示 VRM 3D 模型、AI 控制面板、动作列表、表情列表

## MODIFIED Requirements

### Requirement: 全身模型测试页面

原 Live2D 全身模型测试页面改为 VRM 3D 模型测试页面：
- 模型显示区域：从 PIXI.js Canvas 改为 Three.js WebGL Canvas
- 动作列表：从 Live2D 预定义动作改为 Mixamo 动画 + 骨骼姿势预设
- AI 控制：增强为支持 Mixamo 动画匹配 + 骨骼姿势控制
- 位置/缩放：从 2D 坐标改为 3D 相机控制（OrbitControls）

## 技术架构

### 依赖库

| 库 | 版本 | 用途 | 引入方式 |
|----|------|------|----------|
| three | 0.180.0 | WebGL 3D 渲染引擎 | CDN importmap |
| @pixiv/three-vrm | 3.x | VRM 模型加载与渲染 | CDN importmap |
| fflate | 0.7.4 | FBX 解压依赖 | CDN importmap |

### CDN 引入方式

```html
<script type="importmap">
{
  "imports": {
    "fflate": "https://cdn.jsdelivr.net/npm/fflate@0.7.4/esm/browser.js",
    "three": "https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js",
    "three/addons/": "https://cdn.jsdelivr.net/npm/three@0.180.0/examples/jsm/",
    "@pixiv/three-vrm": "https://cdn.jsdelivr.net/npm/@pixiv/three-vrm@3/lib/three-vrm.module.min.js"
  }
}
</script>
```

### VRMRenderer 类设计

```
VRMRenderer
├── constructor(containerId)       — 接收容器元素 ID
├── initialize()                   — 创建 Three.js 场景、相机、灯光、渲染器
├── loadModel(url)                 — 加载 VRM 模型
├── loadAnimation(url)             — 加载 Mixamo FBX 动画并播放
├── playAnimation(clipName)        — 播放已加载的动画
├── stopAnimation()                — 停止当前动画
├── setBoneRotation(boneName, x, y, z) — 设置骨骼旋转
├── resetPose()                    — 重置所有骨骼到默认姿势
├── playExpression(name)           — 播放表情
├── getAvailableExpressions()      — 获取可用表情列表
├── getAvailableAnimations()       — 获取已加载动画列表
├── resize()                       — 响应容器大小变化
├── destroy()                      — 清理所有资源
└── _animate()                     — 渲染循环
```

### Mixamo 动画资源

预下载以下 Mixamo 动画（FBX 格式，不含皮肤）：

| 动画名 | 文件名 | 用途 |
|--------|--------|------|
| Idle | idle.fbx | 待机呼吸 |
| Walking | walking.fbx | 行走 |
| Running | running.fbx | 跑步 |
| Jumping | jumping.fbx | 跳跃 |
| Waving | waving.fbx | 挥手 |
| Dancing | dancing.fbx | 跳舞 |
| Sitting | sitting.fbx | 坐下 |
| Standing Up | standing_up.fbx | 站起 |
| Fighting | fighting.fbx | 战斗姿势 |
| Clapping | clapping.fbx | 鼓掌 |

### VRM 模型资源

使用 three-vrm 官方示例模型或从 VRoid Hub 下载免费模型：
- 主要模型：VRM1_Constraint_Twist_Sample.vrm（three-vrm 仓库自带）
- 备选模型：从 VRoid Hub 下载女性角色 VRM 模型

### AI 控制映射

AI 文字指令到动作的映射逻辑：

```javascript
const actionMap = {
  '走': 'walking',
  '行走': 'walking',
  '走路': 'walking',
  '跑': 'running',
  '跑步': 'running',
  '跳': 'jumping',
  '跳跃': 'jumping',
  '挥手': 'waving',
  '打招呼': 'waving',
  '跳舞': 'dancing',
  '舞蹈': 'dancing',
  '坐': 'sitting',
  '坐下': 'sitting',
  '站': 'standing_up',
  '站起来': 'standing_up',
  '战斗': 'fighting',
  '鼓掌': 'clapping',
  '待机': 'idle',
  '休息': 'idle',
};
```

对于无法直接映射到 Mixamo 动画的指令（如"举起右手"），通过 VRM humanoid 骨骼接口直接控制：

```javascript
// VRM 标准化骨骼名称
const boneNames = [
  'hips', 'spine', 'chest', 'upperChest',
  'neck', 'head',
  'leftUpperArm', 'leftLowerArm', 'leftHand',
  'rightUpperArm', 'rightLowerArm', 'rightHand',
  'leftUpperLeg', 'leftLowerLeg', 'leftFoot',
  'rightUpperLeg', 'rightLowerLeg', 'rightFoot',
];
```

### 与现有 Live2D 共存策略

- VRM 和 Live2D 使用完全独立的渲染管线（Three.js vs PIXI.js）
- 同一时间只激活一个渲染器，切换时销毁另一个
- 抽卡页面和角色详情页继续使用 Live2D
- 全身模型测试页面使用 VRM
