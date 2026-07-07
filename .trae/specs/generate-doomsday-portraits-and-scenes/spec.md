# 末世方舟官方剧本美术资产生成 Spec

## Why
官方剧本「末世方舟丧尸末日」（3章）目前缺少视觉资源：12 个 NPC 的立绘全部回退到 `fallback-male.svg`/`fallback-female.svg` 占位图，18 个场景地点没有任何背景图。这导致玩家进入官方剧本时视觉沉浸感严重不足。利用已配置好的 `byted-seedream-image-generate` skill（火山引擎 Seedream 文生图）批量生成场景图与 NPC 立绘，让官方剧本具备完整的视觉表现力。

## What Changes
- 为 12 个 NPC 生成**透明背景立绘 PNG**（只显示人物，可叠加在场景图之上）
  - 透明背景采用**方案 A：纯色绿幕 + Pillow 颜色阈值抠图**（Seedream API 不支持原生 alpha 通道，需后处理）
  - 存放路径：`images/portraits/doomsday/<npcid>.png`（如 `linshen.png`）
  - 尺寸：512×768（与 noxasen 范例一致）
- 为 18 个场景地点生成**场景背景图 PNG**
  - 存放路径：`images/scenes/doomsday/<locationid>.png`（如 `shelter-interior.png`）
  - 尺寸：1536×640（横版宽幅，适配对话背景视区）
- 更新 `data/npc-live2d-models.js`：将 12 个 NPC 的 `url` 字段从 `null` 填为对应立绘路径
- 更新 `data/characters.js`：将 12 个 NPC 的 `portrait` 字段从 `fallback-*.svg` 改为对应立绘路径
- 接入场景图到游戏页/对话页背景显示逻辑：当玩家进入某章节地点时，加载对应 `images/scenes/doomsday/<locationid>.png` 作为背景
- **分阶段实施**：
  - 阶段一（先做）：12 张 NPC 立绘——验证透明背景方案 A 的效果，确认无绿边/发丝损失后再继续
  - 阶段二（立绘通过后）：18 张场景图——接入背景显示并端到端验证

## Impact
- 新增资源目录：`images/portraits/doomsday/`、`images/scenes/doomsday/`
- 受影响数据文件：`data/npc-live2d-models.js`、`data/characters.js`、`data/chapter-locations.js`（可能需补字段）
- 受影响代码：`index.html` 中场景背景加载逻辑（`chatCurrentSceneUrl` 相关，约 L28091-L28112）、立绘显示逻辑（`galgamePortraitImage` 相关，约 L39959-L40201）
- 资源治理：新增 30 张 PNG，需用 Pillow/pngquant 压缩后提交（遵循项目资源治理规则）
- 不影响自定义剧本的运行时 AI 生图流程（`ImageGenAPI`/`portraitImagePrompt` 机制保持不变）

## ADDED Requirements

### Requirement: NPC 透明背景立绘
系统 SHALL 为官方剧本的 12 个 NPC 各提供一张透明背景的 PNG 立绘，人物主体清晰、边缘干净无幕布残留色，可在游戏页作为前景叠加在场景背景之上而不遮挡画面。

#### Scenario: 立绘透明显示
- **WHEN** 玩家在官方剧本中与某 NPC 对话
- **THEN** 该 NPC 的立绘以透明 PNG 形式叠加显示在当前场景背景图之上
- **AND** 立绘四周无白色/绿色/黑色实色矩形边框
- **AND** 人物发丝与衣物边缘无可见的幕布溢色

#### Scenario: 立绘回退
- **WHEN** 某 NPC 立绘加载失败
- **THEN** 回退到原有的 `fallback-male.svg`/`fallback-female.svg`（按 gender）

### Requirement: 场景背景图
系统 SHALL 为官方剧本 3 章共 18 个地点各提供一张场景背景图 PNG，作为玩家进入该地点时的对话/游戏背景。

#### Scenario: 场景图加载
- **WHEN** 玩家进入官方剧本某章节的某地点
- **THEN** 该地点对应的 `images/scenes/doomsday/<locationid>.png` 作为背景加载显示
- **WHEN** 玩家切换到另一地点
- **THEN** 背景平滑切换为对应地点的场景图

### Requirement: 透明背景生成方案
系统 SHALL 采用「纯色绿幕生成 + Pillow 颜色阈值抠图」方案生成透明立绘，因 Seedream API 的 `output_format:png` 参数仅控制容器格式、不提供 alpha 通道控制。

#### Scenario: 抠图质量
- **WHEN** 对 Seedream 生成的绿幕人物图执行 Pillow 抠图
- **THEN** 输出 PNG 包含 alpha 通道
- **AND** 原绿幕区域 alpha=0（完全透明）
- **AND** 人物主体区域 alpha=255（完全不透明）
- **AND** 边缘允许 1-2 像素羽化过渡以减少锯齿

## MODIFIED Requirements

### Requirement: NPC 立绘模型映射表
`data/npc-live2d-models.js` 中 12 个 NPC 的 `url` 字段从 `null` 修改为对应立绘路径 `images/portraits/doomsday/<npcid>.png`。

### Requirement: NPC 角色资料
`data/characters.js` 中 12 个 NPC 的 `portrait` 字段从 `assets/portraits/fallback-*.svg` 修改为 `images/portraits/doomsday/<npcid>.png`。
