# 自定义剧本双模式改造 Spec

## Why

目前点击「自定义剧本」后直接进入单一的视觉游玩模式，存在几个关键问题：自定义剧本会覆盖全局的 `gameChapters[2]`，导致自定义章节与官方章节数据混淆；自定义配置依赖 `sessionStorage.custom_game_config`，状态隔离差、恢复逻辑脆弱；视觉模式在手机上没有横竖屏引导，竖屏下体验糟糕；整体缺少适合移动设备竖屏阅读的纯文本模式。因此需要把自定义剧本改造成数据独立、可在两种形态间切换的功能。

## What Changes

- 新增「自定义剧本模式选择」弹窗：点击首页「自定义剧本」后，先弹出两个选项——「游玩模式」与「纯文本模式」。
- **游玩模式**（即现有 Galgame 视觉模式）强制横屏：进入时尝试调用 `screen.orientation.lock('landscape')`，若设备仍处于竖屏则显示「请旋转设备」提示。
- **纯文本模式**支持竖屏：隐藏 Live2D 立绘、背景层、底部对话框，改为全屏滚动式聊天记录，优化手机竖屏阅读体验。
- 重构自定义剧本启动流程：自定义章节不再使用固定 `id=2`，而是使用基于剧本 id 的独立章节 id（如 `custom_<scriptId>`）；自定义 NPC 以命名空间前缀注册，避免覆盖官方角色。
- 移除对 `sessionStorage.custom_game_config` 的依赖，改为内存状态 `currentCustomScript` 与已持久化的 `custom_scripts_list`。
- 剧本列表的「开始游玩」按钮与编辑器的「开始游玩」按钮，统一根据所选模式进入对应 UI。

## Impact

- Affected specs: 自定义剧本编辑器、剧本列表、游戏页 UI、状态管理。
- Affected code: `index.html`（模式选择器、自定义剧本启动、游戏页结构）、`styles.css` / `pages/custom-chapter/custom-chapter.css`（新增 text-mode 样式）、自定义剧本初始化相关函数。

## ADDED Requirements

### Requirement: 模式选择弹窗

The system SHALL provide a mode selector overlay after the user taps 「自定义剧本」 in the main mode selector.

#### Scenario: Success case

- **WHEN** user taps 「自定义剧本」
- **THEN** an overlay appears with two options: 「游玩模式」 and 「纯文本模式」
- **AND** each option shows a short description and an orientation hint

### Requirement: 游玩模式横屏约束

The system SHALL enforce landscape orientation for the visual play mode.

#### Scenario: Success case

- **WHEN** user chooses 「游玩模式」 and starts a custom script
- **THEN** the system attempts `screen.orientation.lock('landscape')`
- **AND** if the device remains in portrait, a rotate-device prompt overlay is shown
- **AND** the prompt hides when the device is rotated to landscape

### Requirement: 纯文本模式竖屏友好

The system SHALL provide a text-only mode suitable for portrait screens.

#### Scenario: Success case

- **WHEN** user chooses 「纯文本模式」 and starts a custom script
- **THEN** the game UI switches to a full-screen scrollable message log
- **AND** Live2D portrait, background layer, and bottom dialogue bar are hidden
- **AND** message bubbles show sender name/avatar, narration text, and quick replies
- **AND** no orientation lock is applied

### Requirement: 自定义剧本状态隔离

The system SHALL keep custom script data isolated from official chapters.

#### Scenario: Success case

- **WHEN** a custom script is played
- **THEN** it uses a chapter id derived from the script id, not fixed id `2`
- **AND** custom NPCs are registered with a prefix or separate namespace so they do not overwrite official characters
- **AND** switching back to official scripts does not retain custom world info/NPCs

## MODIFIED Requirements

### Requirement: 自定义剧本启动流程

The system SHALL initialize a custom script in the same way for both modes and only branch at the UI layer.

#### Scenario: Success case

- **WHEN** user starts a custom script from either mode
- **THEN** the same preparation routine loads NPCs, world settings, locations, items, events, relationships
- **AND** the selected mode flag (`customMode: 'visual' | 'text'`) is stored in game state
- **AND** the game page renders the corresponding UI variant

### Requirement: 自定义剧本入口一致性

The system SHALL route all custom-script play actions through the mode flag.

#### Scenario: Success case

- **WHEN** user clicks the play button on a script card in the script list
- **OR** clicks 「开始游玩」 in the editor
- **THEN** the system uses the mode chosen in the mode selector (default to visual if not set)
- **AND** starts the game in that mode

## REMOVED Requirements

### Requirement: 固定 chapter id = 2 的自定义剧本

**Reason**: It overwrites the official chapter slot and prevents multiple custom scripts from coexisting cleanly.
**Migration**: Custom scripts will be assigned a unique chapter id based on their script id; start-game logic will detect custom chapters by metadata flag rather than id.

### Requirement: sessionStorage 中的 custom_game_config 临时配置

**Reason**: It creates a separate fragile state source and complicates save/restore.
**Migration**: Use the in-memory `currentCustomScript` reference and the persisted `custom_scripts_list`; when restoring a save, use the `customConfigSnapshot` already stored in the save.
