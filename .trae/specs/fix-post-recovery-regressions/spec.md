# 修复文件恢复后回归问题 Spec

## Why

文件恢复操作（从老版本 qmzz1 追加内容到截断的 index.html）导致当前文件成为混合版本：1-31183 行为新版本（含 P0 修复），31184-40757 行为老版本内容。新版本的 HTML/CSS 引入了对话栏头像、标题、名称包裹等新元素，但控制这些元素的 JavaScript 代码位于老版本区域，不知道这些新元素的存在，导致多个回归问题。

## What Changes

- **修复对话栏 UI 不匹配**：更新 Galgame Dialogue System 的 JavaScript 代码，使其填充新版本 HTML 中新增的 `galgameDialogueAvatar`、`galgameDialogueTitle`、`galgameDialogueNameWrap` 元素
- **修复角色头像不显示**：在 `processDialogueQueue` 和 `updatePortrait` 中添加头像更新逻辑，根据当前说话人设置对话栏小头像
- **修复官方剧本等待条缺失**：调整 `addTypingIndicator` 逻辑，使官方剧本在视觉模式下也能显示可视化等待条
- **排查并优化立绘加载速度**：检查 `updatePortrait` 函数是否存在重复加载、缺少缓存等问题
- **排查 AI 回复速度**：确认在游戏内 AI 回复（非剧本生成）是否受 maxTokens 改动影响

## Impact

- Affected code: `d:\BC\qmzz\index.html`
  - Galgame Dialogue System (L40180-L40700)：需添加头像/标题更新逻辑
  - `addTypingIndicator` / `addVisualLoadingIndicator` (L19566-L19628)：需调整等待条显示条件
  - `startGame` (L16502-L16508)：需检查官方剧本的视觉模式状态
  - `updatePortrait` (L40349-L40447)：需检查加载优化
- Affected specs: `fix-script-editor-generation-field-gap`（P0 修复引入的文件截断导致的回归）

## ADDED Requirements

### Requirement: 对话栏头像显示

系统 SHALL 在视觉模式下的对话栏中显示当前说话人的小头像。

#### Scenario: NPC 说话时显示头像
- **WHEN** NPC 发言时
- **THEN** 对话栏左侧的 `galgameDialogueAvatar` 元素显示该 NPC 的头像（优先使用 portrait 图片，无图片时显示首字符 fallback）

#### Scenario: 旁白时不显示头像
- **WHEN** 旁白（narrator）发言时
- **THEN** `galgameDialogueAvatar` 添加 `hidden` 类，隐藏头像

#### Scenario: 玩家说话时显示头像
- **WHEN** 玩家（player）发言时
- **THEN** `galgameDialogueAvatar` 显示玩家头像或默认 fallback

### Requirement: 对话栏标题显示

系统 SHALL 在对话栏中显示当前说话人的称号/头衔。

#### Scenario: NPC 有称号时显示
- **WHEN** NPC 发言且该 NPC 有 title 字段
- **THEN** `galgameDialogueTitle` 元素显示该 NPC 的称号

#### Scenario: NPC 无称号时隐藏
- **WHEN** NPC 发言但无 title 字段
- **THEN** `galgameDialogueTitle` 元素为空或隐藏

### Requirement: 官方剧本可视化等待条

系统 SHALL 在官方剧本的视觉模式下显示可视化等待条（visual loading indicator），与自定义剧本行为一致。

#### Scenario: 官方剧本视觉模式等待 AI 回复
- **WHEN** 用户在官方剧本中发送消息并等待 AI 回复
- **AND** 游戏页面处于视觉模式（galgame dialogue bar 可见）
- **THEN** 显示 `visualLoadingIndicator` 等待指示器

#### Scenario: 判断视觉模式的条件
- **WHEN** `addTypingIndicator` 被调用
- **THEN** 不仅检查 `game-mode-visual` 类，还应检查 galgame dialogue bar 的可见性，以兼容官方剧本不设置该类的情况

## MODIFIED Requirements

### Requirement: Galgame Dialogue System 对话处理

`processDialogueQueue` 函数在处理对话项时，除了更新现有的 `dialogueName` 和 `dialogueText`，还需：

1. 更新 `galgameDialogueAvatar`：
   - NPC 发言：设置头像图片（使用 charData.portrait）或首字符 fallback
   - 旁白：添加 `hidden` 类
   - 玩家：显示玩家头像或 fallback

2. 更新 `galgameDialogueTitle`：
   - NPC 发言：显示 charData.title
   - 旁白/玩家：清空或隐藏

3. 更新 `galgameDialogueNameWrap`：
   - 根据 speaker 类型添加/移除相应的 CSS 类（如 `is-narrator`、`is-player`）

### Requirement: addTypingIndicator 等待条逻辑

`addTypingIndicator` 函数判断是否使用可视化等待条的条件应扩展：
- 原条件：`gamePage.classList.contains('game-mode-visual')`
- 新条件：`gamePage.classList.contains('game-mode-visual')` OR `galgameDialogueBar` 可见（offsetParent 不为 null）

## REMOVED Requirements

无。本次修复不移除任何现有功能。
