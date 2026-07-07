# 自定义 NPC 立绘选择器升级 Spec

## Why

当前自定义剧本里 NPC 的立绘选择入口单一、预览缺失：选择列表只显示角色名字，看不到立绘实际样式，也无法区分「单纯图片」和「Level 2D 模型」两种格式，更不能让玩家自行上传资源。这导致玩家难以判断最终效果，也不利于个性化创作。因此需要把立绘选择升级为可视化的角色池面板，直接展示官方角色立绘/模型，并支持本地上传。

## What Changes

- 自定义 NPC 卡片只保留一个「选择立绘」入口按钮，点击后弹出角色池面板。
- 角色池暂时包含官方剧本中的所有角色（图片立绘与 Level 2D 模型均纳入）。
- 面板中每个资源直接渲染/展示其实际视觉样式，不显示角色名。
- 每个资源标注格式标签：图片资源为「单纯图片」，Level 2D 资源为「Level 2D 模型」。
- 支持玩家自行上传本地图片或本地 Level 2D 模型作为 NPC 立绘。
- 选中后按钮与面板均显示已选资源的预览与格式标签。
- 自定义游戏启动时将玩家上传或从角色池选取的 Level 2D 模型注册到 `npcLive2DModels`。

## Impact

- Affected specs: integrate-gacha-live2d-custom-npc（已有立绘字段）、refactor-custom-script-dual-modes（自定义 NPC 数据流）。
- Affected code: `index.html`（自定义 NPC 编辑器、角色池数据源、立绘选择弹窗、游戏启动注册）。

## ADDED Requirements

### Requirement: 单一立绘入口按钮

系统 SHALL 在自定义剧本编辑器的每个 NPC 卡片中保留一个「选择立绘」按钮：
- 按钮位于 NPC 卡片内的固定区域，与姓名/性格等字段分开。
- 未选择时显示占位提示，例如「点击选择立绘」。
- 已选择时显示所选资源的缩略预览，并在预览角标标注格式（单纯图片 / Level 2D 模型）。
- 点击按钮打开角色池选择面板。

#### Scenario: 未选择立绘

- **WHEN** 玩家新建一个 NPC 且尚未选择立绘
- **THEN** 按钮显示占位提示
- **AND** 不显示任何预览图

#### Scenario: 已选择立绘

- **WHEN** 玩家已为 NPC 选择了一张图片立绘
- **THEN** 按钮显示该图片的缩略预览
- **AND** 预览角标显示「单纯图片」
- **WHEN** 玩家选择的是 Level 2D 模型
- **THEN** 按钮显示该模型的实时渲染预览
- **AND** 预览角标显示「Level 2D 模型」

### Requirement: 角色池数据源

系统 SHALL 构建一个 `portraitPool` 数据源，暂时包含官方剧本中的所有角色：
- 遍历官方 `characters` / `gameCharacters` / 章节 NPC 数据，将每个角色的立绘资源汇总到池中。
- 每个池条目包含：唯一 id、资源类型（`image` 或 `live2d`）、资源 URL、渲染所需元数据（如 Level 2D 的 model.json）。
- 同一角色若同时有图片和 Level 2D，作为两条独立条目展示。
- 不显示角色名，只以视觉样式作为识别依据。

#### Scenario: 官方角色池构建

- **WHEN** 系统初始化自定义剧本编辑器时
- **THEN** `portraitPool` 自动收集官方剧本角色资源
- **AND** 图片资源类型为 `image`
- **AND** Level 2D 资源类型为 `live2d`

### Requirement: 可视化立绘选择面板

系统 SHALL 提供一个全屏/模态面板，用于展示角色池中的所有资源：
- 面板以网格布局展示资源卡片。
- 图片资源直接显示图片本身。
- Level 2D 资源直接渲染模型，让玩家能看到动态效果（或至少渲染首帧/缩略）。
- 每个卡片角标显示格式标签：「单纯图片」或「Level 2D 模型」。
- 点击卡片即选中该资源，关闭面板并更新 NPC 数据。
- 面板支持返回/关闭，不强制必须选择。

#### Scenario: 图片资源直接展示

- **WHEN** 角色池中存在一张图片立绘
- **THEN** 面板中该卡片直接渲染该图片
- **AND** 角标显示「单纯图片」

#### Scenario: Level 2D 资源直接展示

- **WHEN** 角色池中存在一个 Level 2D 模型
- **THEN** 面板中该卡片直接渲染该模型
- **AND** 角标显示「Level 2D 模型」
- **AND** 玩家可看到模型样式，而非仅看到名字

### Requirement: 本地上传立绘

系统 SHALL 允许玩家自行上传立绘资源：
- 面板底部或顶部提供「上传图片」按钮，接受常见图片格式（png/jpg/webp）。
- 提供「上传 Level 2D 模型」按钮，接受包含 `.model.json` 的 zip 包或单个 `.model.json` 文件（视现有模型加载方式而定）。
- 上传后的资源作为临时条目加入角色池，并立即可用于选择。
- 上传资源使用 `URL.createObjectURL` 或 base64 在本地持久化，不依赖外部服务器。
- 上传失败时给出明确提示（格式不支持、文件过大等）。

#### Scenario: 上传图片

- **WHEN** 玩家点击「上传图片」并选择一张本地图片
- **THEN** 图片显示在角色池末尾作为可选条目
- **AND** 角标显示「单纯图片」
- **AND** 该资源可被 NPC 选用

#### Scenario: 上传 Level 2D 模型

- **WHEN** 玩家点击「上传 Level 2D 模型」并选择合法模型文件
- **THEN** 模型渲染在角色池末尾作为可选条目
- **AND** 角标显示「Level 2D 模型」
- **AND** 该资源可被 NPC 选用

### Requirement: 游戏启动注册自定义 Level 2D 模型

系统 SHALL 在自定义游戏启动时，将玩家为 NPC 选用的 Level 2D 模型注册到运行时：
- 若 NPC 立绘类型为 `live2d`，将其模型 URL/数据注册到 `npcLive2DModels`。
- 若是本地上传的模型，使用对应的 blob URL 或 base64 数据。
- 切换 NPC 时 `switchNPC` 能正确加载该模型。

## MODIFIED Requirements

### Requirement: NPC 数据结构

**文件**: `index.html` `getCustomConfig()` 附近

为 NPC 增加立绘相关字段：

```javascript
npcs.push({
  id: 'custom_npc_' + i,
  name, title, description, personality, firstMessage,
  portraitType: '',      // 'image' | 'live2d'
  portraitUrl: '',       // 资源 URL / blob URL / base64
  portraitModelJson: ''  // Level 2D 模型入口文件（如需要）
});
```

### Requirement: 自定义 NPC 卡片 UI

**文件**: `index.html` `addCustomNpcCard()` 附近

将 NPC 卡片中的立绘选择区域改造为单一按钮：
- 按钮尺寸适合展示缩略预览。
- 未选择时显示占位提示。
- 已选择时显示预览和格式标签。
- 点击按钮调用 `openPortraitPicker(npcId)`。

### Requirement: 自定义 NPC 持久化

**文件**: `index.html` `saveCustomConfig()` / `loadCustomConfig()` 附近

保存和恢复 NPC 时包含 `portraitType`、`portraitUrl`、`portraitModelJson` 字段。

## REMOVED Requirements

### Requirement: 仅展示角色名的立绘选择列表

**Reason**: 新的可视化面板直接展示立绘样式和格式标签，不再依赖文字名称。
**Migration**: 若存在旧版选择弹窗，改用新的 `openPortraitPicker` 面板。旧的角色名字段可保留作为内部 id 映射，但 UI 上不再显示。
