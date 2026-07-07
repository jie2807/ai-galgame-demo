# 串联角色模型、抽卡与自定义 NPC 立绘

## Why

目前项目已具备三套独立系统：抽卡系统（角色池）、Live2D 角色立绘系统、自定义剧本 NPC 系统，但它们之间缺乏关联。需要将这三套系统串联起来，形成完整闭环：抽卡获得的角色可用于游戏立绘，玩家自建 NPC 也可选用抽卡角色作为立绘。

## What Changes

- 为 gachaPool 中的 2 个角色绑定 Live2D 模型 URL
- 抽卡系统使用 Live2D 模型充当动态立绘（静态图片先用占位符）
- 自定义剧本添加 NPC 时新增"添加立绘"功能，可选已有 Live2D 角色模型
- 如果自定义 NPC 未设置性格/姓名等设定，自动套用对应角色的设定；已有设定则仅填充模型

## Impact

- Affected specs: add-gacha-letter-system（抽卡角色池）、npc-live2d-pet-system（Live2D 模型）、enhance-custom-world-lorebook（自定义剧本 NPC）
- Affected code: index.html（gachaPool、角色详情页、自定义 NPC 编辑器、startCustomGameFromConfig）

## ADDED Requirements

### Requirement: 抽卡角色绑定 Live2D 模型
系统 SHALL 为 gachaPool 中的每个角色配置 Live2D 模型 URL：
- 将 `npcLive2DModels` 中的模型 URL 关联到 `gachaPool` 角色
- 角色详情页立绘优先使用 Live2D 模型，其次使用静态 portrait 图片
- 静态 portrait 图片暂用占位符，后续替换为专业美术资源

### Requirement: 自定义 NPC 立绘选择器
系统 SHALL 在自定义剧本添加 NPC 卡片中提供"添加立绘"功能：
- 点击"添加立绘"按钮，弹出角色模型选择弹窗
- 弹窗展示所有已抽到的 gachaPool 角色列表（含稀有度标识）
- 玩家选择一个角色后，将对应 Live2D 模型 URL 保存到 NPC 数据中
- 如果 NPC 未设置 name、personality、firstMessage 等字段，自动从选中角色复制这些设定
- 如果 NPC 已有设定，仅填充 Live2D 模型，不覆盖已有设定

#### Scenario: 空 NPC 选择立绘
- **WHEN** 玩家创建一个新 NPC，未填写任何信息，点击"添加立绘"并选择"薇尔莉特·伊芙加登"
- **THEN** NPC 的 Live2D 模型 URL 被填充，同时自动填充 name、title、personality、firstMessage 等字段

#### Scenario: 已有设定 NPC 选择立绘
- **WHEN** 玩家创建一个 NPC 并填写了姓名和性格，点击"添加立绘"并选择"克劳迪亚·霍金斯"
- **THEN** NPC 的 Live2D 模型 URL 被填充，但姓名、性格等已有设定不被覆盖

## MODIFIED Requirements

### Requirement: gachaPool 数据结构
**文件**: index.html ~第 3117 行

为 gachaPool 中每个角色添加 `live2dModel` 字段，关联 `npcLive2DModels` 中的模型 URL：

```javascript
{
    id: 'violet',
    // ... 现有字段
    live2dModel: 'https://cdn.jsdelivr.net/gh/xiazeyu/live2d-widget-models@latest/packages/live2d-widget-model-tororo/assets/tororo.model.json'
}
```

### Requirement: 自定义 NPC 数据结构
**文件**: index.html getCustomConfig() ~第 4627 行

为 NPC 添加 `live2dModel` 和 `live2dSourceCharId` 字段：

```javascript
npcs.push({
    id: 'custom_npc_' + i,
    name, title, description, personality, firstMessage,
    live2dModel: '',
    live2dSourceCharId: ''
});
```

### Requirement: 自定义 NPC 卡片 HTML 模板
**文件**: index.html addCustomNpcCard() ~第 4697 行

在 NPC 卡片中添加"添加立绘"按钮区域，包含：
- "添加立绘"按钮（初始显示占位提示）
- 已选择角色缩略显示（角色名 + 稀有度）
- 点击按钮弹出角色选择弹窗

### Requirement: 自定义 NPC 持久化
**文件**: index.html saveCustomConfig() / loadCustomConfig()

保存和恢复 NPC 数据时包含 `live2dModel` 和 `live2dSourceCharId` 字段。

### Requirement: 自定义游戏启动
**文件**: index.html startCustomGameFromConfig() ~第 5061 行

为自定义 NPC 设置 Live2D 模型 URL：
- 如果 NPC 配置了 `live2dModel`，将模型 URL 注册到 `npcLive2DModels`
- 确保游戏启动时 Live2D 能正确加载自定义 NPC 的立绘

## REMOVED Requirements

无
