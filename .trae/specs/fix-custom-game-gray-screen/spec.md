# 修复自定义剧本灰屏页面 Spec

## Why
用户在自定义剧本设置完成后点击开启游戏，进入一个空的灰屏页面，没有任何内容。经过深入分析，发现多个问题叠加导致此现象：

1. **`startCustomGameFromConfig()` 是 `async` 函数但调用时未 `await`**：任何运行时错误都会作为未处理的 Promise rejection 被静默吞掉，用户看不到任何错误提示
2. **`homePage` 在错误发生前就被隐藏**：`homePage.style.display = 'none'` 在函数开头执行，如果后续代码抛出错误，`gamePage.classList.add('active')` 不会被执行，导致两个页面都不显示
3. **`getCustomConfig()` 缺少 `availableLocations` 字段**：用户在编辑器中设置的地区数据不会被传递到游戏启动函数
4. **`startCustomGameFromConfig()` 未注册 `loreEntries` 到 `gameWorldInfo`**：自定义知识条目在游戏中不会被触发
5. **之前的修复（chatEngine 初始化顺序、updateNPCList 空值保护）已到位**，但仍需确保整体流程的健壮性

## What Changes
- 为 `startCustomGameFromConfig()` 的 `file:` 分支添加 try-catch 错误处理，捕获并显示运行时错误
- 确保 `gamePage.classList.add('active')` 在 finally 块中被调用，即使发生错误也能显示游戏页面
- 在 `getCustomConfig()` 中添加 `availableLocations: getLocationEntries()` 字段
- 在 `startCustomGameFromConfig()` 中注册 `config.loreEntries` 到 `gameWorldInfo`
- 为 `startGame()` 的 `file:` 分支添加同样的 try-catch 保护

## Impact
- Affected code: `index.html` 中 `startGame()`、`startCustomGameFromConfig()`、`getCustomConfig()` 函数

## ADDED Requirements

### Requirement: 错误处理与页面显示保障
`startCustomGameFromConfig()` 和 `startGame()` 的 `file:` 分支必须用 try-catch 包裹，确保即使发生运行时错误，游戏页面也能显示（至少显示错误信息），不会出现灰屏。

#### Scenario: 自定义剧本启动时发生错误
- **WHEN** 用户在 `file://` 协议下点击开启自定义剧本，且启动过程中发生运行时错误
- **THEN** 错误被捕获并显示为 toast 提示，游戏页面仍然显示（可能内容不完整，但不是灰屏）

#### Scenario: 自定义剧本正常启动
- **WHEN** 用户在 `file://` 协议下点击开启自定义剧本，且启动过程无错误
- **THEN** 游戏页面正常显示所有内容（章节信息、NPC、开场旁白、输入框等）

### Requirement: 自定义地区数据传递
`getCustomConfig()` 必须包含 `availableLocations` 字段，将用户在编辑器中设置的地区数据传递到游戏启动函数。

#### Scenario: 用户设置了自定义地区
- **WHEN** 用户在自定义剧本编辑器中添加了地区条目并点击開始冒險
- **THEN** 地区数据被包含在 config 中并注册到 `chapterLocations[2]`

### Requirement: 自定义知识条目注册
`startCustomGameFromConfig()` 必须将 `config.loreEntries` 注册到 `gameWorldInfo`，使 AI 对话引擎能触发自定义知识条目。

#### Scenario: 用户设置了自定义知识条目
- **WHEN** 用户在自定义剧本编辑器中添加了知识条目并開始冒險
- **THEN** 知识条目被注册到 `gameWorldInfo`，AI 对话时能根据关键词触发

### Requirement: chatEngine 初始化顺序（已修复，保留验证）
`chatEngine` 必须在 `updateNPCList()` 调用之前初始化。

### Requirement: initGameState 调用时机（已修复，保留验证）
`initGameState()` 应在章节数据注册完成之后调用。
