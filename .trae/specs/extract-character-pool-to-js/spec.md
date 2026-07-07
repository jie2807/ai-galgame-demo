# Extract Character Pool to External JS Spec

## Why
当前角色数据（`gameCharacters`、`gachaPool`、`DEFAULT_CHARACTER_POOL`）全部内嵌在 `index.html` 中，导致添加、删除角色或更换立绘时需要在大段 HTML 里找代码、容易改错。将这些数据提取到独立 JS 文件后，可以直接在一个专门文件里管理角色，降低维护成本。

## What Changes
- 将 `gameCharacters`、`gachaPool`、`DEFAULT_CHARACTER_POOL` 从 `index.html` 提取到 `data/characters.js`。
- 在 `index.html` 中通过 `<script src="data/characters.js"></script>` 引入该文件，保持数据加载顺序不变。
- 保留原有字段和结构，所有功能（聊天、抽卡、自定义 NPC、立绘选择）继续按原逻辑工作。
- 提供角色池文件路径与立绘替换说明。

## Impact
- Affected specs: define-character-pool-and-reward-config, enhance-custom-npc-portrait-picker
- Affected code: `d:\BC\ai_resume\qmzz\index.html` 与新建 `d:\BC\ai_resume\qmzz\data\characters.js`

## ADDED Requirements

### Requirement: 角色数据独立管理
系统 SHALL 将角色相关数据从 `index.html` 迁移到 `data/characters.js`，并通过 `<script>` 标签加载，保证加载顺序与之前一致。

#### Scenario: 正常启动
- **WHEN** 用户打开 `index.html`
- **THEN** `gameCharacters`、`gachaPool`、`DEFAULT_CHARACTER_POOL` 在运行时已定义，且内容与原来一致

### Requirement: 不破坏现有功能
系统 SHALL 确保迁移后，聊天角色、抽卡系统、自定义 NPC 立绘选择、默认角色池等功能继续正常工作。

#### Scenario: 抽卡
- **WHEN** 用户进入抽卡界面
- **THEN** `gachaPool` 中的角色正确显示，可正常抽取

#### Scenario: 自定义 NPC 选择立绘
- **WHEN** 用户在自定义剧本编辑器中选择立绘
- **THEN** 立绘选择面板能正确读取 `gachaPool` 中的角色数据

### Requirement: 提供角色与立绘管理说明
系统 SHALL 在规格文档中说明如何添加/删除角色，以及如何替换立绘图片或 Live2D 模型路径。
