# 修复写信页布局细节 Spec

## Why

前一次将写信页改为微信式气泡布局后，仍存在以下体验瑕疵：

1. 玩家头像未像角色头像一样紧贴屏幕边缘。
2. 左侧角色立绘下方的名称栏为实色背景，与整体透明风格不协调。
3. 右侧聊天区域上方的标题栏冗余，可简化。
4. 返回按钮位置不够自然，应放到左侧立绘区域。
5. 「在线」提示位置可更贴合角色信息栏。

## What Changes

- **头像靠边**：玩家消息头像紧贴右侧边缘，角色消息头像紧贴左侧边缘。
- **透明名称栏**：左侧角色立绘下方的名称栏改为透明背景。
- **移除右侧标题栏**：删除右侧聊天区的 `charchat-header`，将返回按钮移到左侧立绘区左上角。
- **方形透明返回按钮**：在左侧立绘区左上角放置一个方形、透明、带模糊效果的返回按钮。
- **在线提示 reposition**：将「在线」提示移动到左侧名称栏中角色名称右侧，靠近分割线位置。
- **保留聊天功能**：消息输入、发送、AI 回复等核心逻辑不变。

## Impact

- **受影响的功能**：角色写信页视觉布局。
- **受影响的文件**：`index.html`、`styles.css`。
- **不受影响的文件**：聊天逻辑、其他页面。

## ADDED Requirements

### Requirement: 玩家头像靠右边缘

系统 SHALL 使玩家消息中的头像紧贴消息区域右侧边缘。

#### Scenario: 查看玩家消息
- **WHEN** 玩家发送消息后
- **THEN** 玩家头像显示在消息区域最右侧
- **AND** 头像与气泡之间保持适当间距

### Requirement: 角色头像靠左边缘

系统 SHALL 使角色消息中的头像紧贴消息区域左侧边缘。

#### Scenario: 查看角色消息
- **WHEN** 角色回复消息后
- **THEN** 角色头像显示在消息区域最左侧
- **AND** 头像与气泡之间保持适当间距

### Requirement: 左侧名称栏透明

系统 SHALL 将左侧角色立绘下方的名称栏背景设为透明。

#### Scenario: 查看左侧信息区
- **WHEN** 玩家进入写信页
- **THEN** 名称栏背景透明
- **AND** 文字仍清晰可读

### Requirement: 移除右侧标题栏并转移返回按钮

系统 SHALL 删除右侧聊天区上方的标题栏，并将返回按钮移到左侧立绘区左上角。

#### Scenario: 查看写信页
- **WHEN** 玩家进入写信页
- **THEN** 右侧聊天区无独立标题栏
- **AND** 左上角方形透明返回按钮可见且可点击
- **AND** 点击返回按钮可返回详情页

### Requirement: 在线提示移动到名称栏

系统 SHALL 将「在线」提示移动到左侧名称栏中角色名称的右侧。

#### Scenario: 查看角色信息
- **WHEN** 玩家进入写信页
- **THEN** 「在线」提示显示在角色名称右侧
- **AND** 位置靠近名称与右侧内容的分割线

## MODIFIED Requirements

### Requirement: 写信页 DOM 结构

**文件**: `index.html`

**修改内容**：
- 删除 `.charchat-right-panel` 中的 `.charchat-header`。
- 在 `.charchat-left-panel` 顶部添加方形透明返回按钮。
- 将 `.charchat-online-status` 移动到 `.charchat-char-info` 中名称右侧。

### Requirement: 写信页样式

**文件**: `styles.css`

**修改内容**：
- 调整 `.charchat-message-player` 与 `.charchat-message-character` 的 flex 布局，使头像分别靠右/靠左边缘。
- `.charchat-char-info` 背景透明，保留文字样式。
- 新增 `.charchat-left-back-btn` 方形透明按钮样式。
- 移除 `.charchat-header` 相关样式影响。
- 调整 `.charchat-online-status` 位置与大小。
