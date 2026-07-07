# 移动端布局与游玩界面文字/立绘显示优化 Spec

## Why

当前项目在移动端小屏（≤480px）下仍存在多个布局重叠、元素互相挤压的问题，尤其是在游玩模式的游戏界面中，文字、立绘、输入框等区域交叉混合，严重影响可读性和操作性。同时，上一阶段实现的可视化立绘选择器还有体验缺口：立绘面板中部分 CDN 模型预览失败会影响面板稳定性。此外，游玩界面中旁白（narration）与角色说话（NPC dialogue）在视觉上没有明确区分，玩家难以分辨信息来源；NPC 说话时其 Level 2D 模型/图片立绘的显示时机与稳定性也需要保障。本次优化集中解决这四个问题，提升移动端核心游玩体验。

## What Changes

- 修复游玩模式在移动端小屏下的布局重叠：调整 galgame 对话层、立绘层、输入框、快捷菜单的层级、尺寸与定位，确保互不遮挡。
- 提升立绘选择面板的 Level 2D 预览稳定性：单个模型预览失败时不影响整个面板，失败卡片显示占位并记录日志。
- 确保角色说话时立绘正确显示：NPC 发送消息时，其 Level 2D 模型或图片立绘应及时、可靠地加载并展示；不说话时不显示。
- 区分游玩界面中的旁白与说话：旁白文本使用无头像/名称的叙述样式，NPC 说话保留头像、名称与对话气泡样式，两者在颜色、对齐、前缀上有明显差异。

## Impact

- Affected specs: enhance-custom-npc-portrait-picker（立绘选择面板、Level 2D 注册）、pre-launch-mobile-optimization（移动端布局基础）、refactor-custom-script-dual-modes（自定义游戏启动）。
- Affected code: `index.html`（galgame 对话渲染、updatePortrait、loadNPCModel、立绘选择面板、自定义游戏启动）、相关 `<style>`（响应式断点、对话样式、立绘层级）。

## ADDED Requirements

### Requirement: 移动端游戏界面不重叠

系统 SHALL 确保游玩模式在宽度 ≤480px 的屏幕上，各功能区域边界清晰、互不遮挡：
- 角色立绘区（`galgamePortraitCanvas` / `galgamePortraitImage`）不遮挡对话文本。
- 对话文本区（`galgameDialogueText`）不被立绘、输入框、底部按钮遮挡。
- 输入框与发送按钮在小屏下保持可聚焦、可点击，尺寸 ≥44×44px。
- 快捷菜单/设置面板打开时不阻挡核心操作，关闭按钮可触达。
- 软键盘弹出后，输入框与最近对话内容仍可见。

#### Scenario: 480px 横屏进入游戏

- **WHEN** 玩家在宽度 480px 的手机上开始自定义剧本并进入游玩模式
- **THEN** 游戏界面各层按正确 z-index 与 flex/grid 布局排列
- **AND** 立绘、对话、输入框、按钮无重叠
- **AND** 文字清晰可读

#### Scenario: 软键盘弹出

- **WHEN** 玩家点击输入框，系统软键盘弹出
- **THEN** 输入框不被键盘遮挡
- **AND** 至少最近一条对话/NPC 消息仍可见



### Requirement: 角色说话时立绘正确显示

系统 SHALL 确保 NPC 发送消息时，其对应的 Level 2D 模型或图片立绘及时加载并展示；NPC 不说话时，立绘区域保持 placeholder 或隐藏状态：
- NPC 发送 firstMessage 或任何后续消息时，触发 `updatePortrait(npcId)` 并正确显示立绘。
- Level 2D 模型在 `loadNPCModel()` 完成后，`galgamePortraitCanvas` 应设为可见。
- 图片立绘在加载完成后，`galgamePortraitImage` 应设为可见。
- 若模型/图片加载失败，显示 placeholder，不阻塞对话流程。
- 切换当前说话 NPC 时，旧立绘正确隐藏，新立绘正确显示。

#### Scenario: NPC 发送 firstMessage

- **WHEN** 自定义游戏开场后，首个 NPC 发送 firstMessage
- **THEN** 该 NPC 的 Level 2D 模型或图片立绘立即显示
- **AND** 对话文本与立绘互不遮挡

#### Scenario: 切换说话 NPC

- **WHEN** 对话中切换到另一个有立绘的 NPC
- **THEN** 原 NPC 立绘淡出/隐藏，新 NPC 立绘显示
- **AND** `npcLive2DModels` 中注册的模型被正确加载

### Requirement: 立绘面板 Level 2D 预览容错

系统 SHALL 确保立绘选择面板中的 Level 2D 预览失败时，不影响其他卡片和面板的稳定性：
- 每个 Level 2D 卡片独立初始化渲染器/应用。
- 单个模型加载失败时，该卡片显示占位图或占位文字，不崩溃。
- 失败卡片的格式标签仍显示「Level 2D 模型」。
- 失败信息仅在控制台以 `warn` 级别输出，不向玩家弹出错误。
- 限制同时渲染的 Level 2D 预览数量，避免 WebGL 上下文耗尽。

#### Scenario: CDN 模型预览失败

- **WHEN** 面板中存在一个无法加载的 CDN Level 2D 模型
- **THEN** 该卡片显示占位，其他卡片正常展示
- **AND** 面板可继续操作，无弹窗报错

#### Scenario: 多个 Level 2D 同时预览

- **WHEN** 面板中同时存在 8 个以上 Level 2D 模型
- **THEN** 系统限制同时渲染数量，超出部分显示占位
- **AND** 不会因 WebGL 上下文上限导致面板空白或崩溃

### Requirement: 旁白与说话视觉区分

系统 SHALL 在游玩界面的对话历史中，让旁白、NPC 说话、玩家说话三种类型在视觉上有明确区分：
- **旁白（narration）**：居中或横跨对话框，使用斜体/弱化颜色，无头像、无名称前缀，可带有「旁白」或「——」标识。
- **NPC 说话（npc）**：左侧头像 + 名称 + 气泡，使用主题对话色。
- **玩家说话（player）**：右侧头像/标识 + 气泡，使用玩家对话色。
- Galgame 顶部的对话条（`galgameDialogueName` + `galgameDialogueText`）同样遵循此规则：旁白时隐藏名称，文本使用叙述样式；NPC 说话时显示名称与对话样式。

#### Scenario: 开场旁白

- **WHEN** 游戏开场显示旁白文本
- **THEN** 对话历史中该条消息显示为叙述样式，无头像和名称
- **AND** galgame 顶部对话条仅显示文本，隐藏名称

#### Scenario: NPC 发送 firstMessage

- **WHEN** NPC 发送第一条消息
- **THEN** 对话历史中显示该 NPC 头像、名称和对话气泡
- **AND** galgame 顶部对话条显示 NPC 名称和消息文本

## MODIFIED Requirements



### Requirement: 立绘选择面板

**文件**: `index.html` `openPortraitPicker()` / Level 2D 卡片渲染逻辑附近

将 Level 2D 预览封装为独立渲染单元，每个卡片添加 try/catch 与失败回退；超出并发上限的卡片直接显示占位。

### Requirement: 对话历史渲染

**文件**: `index.html` `addNarrationMessage()` / `addNPCMessage()` 附近

为消息 DOM 添加类型类名：`msg-narration-style`（旁白样式）、`msg-npc-style`（NPC 样式）、`msg-player-style`（玩家样式），并补充对应 CSS。

### Requirement: Galgame 顶部对话条

**文件**: `index.html` `showGalgameDialogue()` / `processDialogueQueue()` 附近

旁白消息进入对话条时隐藏 `galgameDialogueName`，并给 `galgameDialogueText` 添加 `.narration-text` 样式；NPC/玩家消息恢复常规样式。

## REMOVED Requirements

无。
