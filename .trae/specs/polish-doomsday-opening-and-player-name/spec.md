# 末日文剧本开场打磨 + 玩家名称动态化 Spec

## Why
当前末日文三章剧本的开场信息密度过高——世界观、势力、NPC、物资数字、倒计时一次性抛给玩家，NPC 像在念简历般同时登场，玩家尚未代入就被塞满设定。同时，AI 系统提示中玩家身份使用固定的 `chapter.playerName`（如「第七号避难所管理者」），而非玩家在首页输入的名称，导致 AI 叙事时无法用玩家真正的名字称呼，削弱代入感。

## What Changes
- **打磨三章开场场景**：降低前 2-3 段的信息密度，用感官细节和氛围铺垫替代设定堆砌；NPC 分批登场而非一次性全部出现；将势力地图、物资数字等"硬设定"后移到玩家与 NPC 对话或事件中渐进披露
- **玩家名称动态化**：官方剧本启动时，`_buildSystemPrompt` 中的 `playerSection` 优先使用玩家在首页输入的 `profile.playerName`，`chapter.playerName` 降级为身份标签（如「第七号避难所管理者」变为玩家名称的定语），让 AI 能用玩家真名称呼主角
- **开场场景融入玩家名称**：开场叙述中涉及玩家身份的措辞改用第二人称「你」，避免出现固定名称；AI 叙事指令中明确要求用玩家输入的名称称呼主角

## Impact
- Affected specs: `add-timer-fallback-portrait-doomsday`（前序末日文重写 spec，本次在其基础上打磨）
- Affected code:
  - `data/game-chapters.js` — 三章 `openingScene`、`playerDesc` 重写
  - `index.html` L11481-11488 — `_buildSystemPrompt` 中 `playerSection` 构造逻辑
  - `index.html` L11828 — 系统提示中 `openingScene` 注入点（无需改代码，开场文本改即可）

## ADDED Requirements

### Requirement: 玩家名称动态注入系统提示
系统 SHALL 在官方剧本启动时，将玩家在首页输入的 `profile.playerName` 注入到 AI 系统提示的 `playerSection` 中，使 AI 能用玩家输入的名称称呼主角。

#### Scenario: 玩家已输入名称
- **WHEN** 玩家在首页通过 `playerNameSetupModal` 输入名称（如「阿明」）并进入官方剧本第一章
- **THEN** AI 系统提示中 `playerSection` 应为「【玩家角色】\n玩家扮演阿明（第七号避难所管理者），避难所新晋管理者 / 前救援队员。...」
- **AND** AI 叙事时应用「阿明」称呼玩家，而非「第七号避难所管理者」或「管理者」

#### Scenario: 玩家未输入名称
- **WHEN** 玩家未输入名称（`profile.playerName` 为空或默认值「VIOLET」）
- **THEN** 系统回退使用 `chapter.playerName`，不阻塞游戏启动

### Requirement: 开场场景氛围式铺垫
三章开场 SHALL 采用「感官沉浸 → 身份揭示 → 行动召唤」三段式结构，前 1-2 段聚焦单一感官细节与玩家内心独白，中段揭示身份与处境，末段给出行动方向，避免首段即堆砌势力地图与数字。

#### Scenario: 第一章开场
- **WHEN** 玩家进入第一章「废墟之弈」
- **THEN** 开场首段以感官细节（如地下停车场的潮湿、发电机嗡鸣、对讲机杂音）开场
- **AND** 第二段过渡到玩家身份（「你」刚被推举为管理者，前任老陈未归）
- **AND** 末段以小鹿的紧急报告引出行动，而非一次性列出四个 NPC 的汇报

### Requirement: NPC 分批登场
开场场景 SHALL 只让 1-2 名 NPC 率先登场推动剧情，其余 NPC 在后续对话或事件中自然引入，避免四名 NPC 同时出场自我介绍。

#### Scenario: 第一章 NPC 登场
- **WHEN** 第一章开场渲染
- **THEN** 仅林深（或小鹿）在开场中出场
- **AND** 苏晴、老周在玩家首次对话或首个事件后由 AI 叙事自然引入

## MODIFIED Requirements

### Requirement: `playerSection` 构造逻辑
原逻辑（L11484-11485）：
```javascript
} else if (chapter.playerName) {
    playerSection = '【玩家角色】\n玩家扮演' + chapter.playerName + '，' + (chapter.playerTitle || '冒险者') + '。' + (chapter.playerDesc || '');
}
```
修改为：
```javascript
} else if (chapter.playerName) {
    var _userPlayerName = '';
    try { _userPlayerName = (loadUserProfile() || {}).playerName || ''; } catch(e) {}
    if (_userPlayerName && _userPlayerName !== 'VIOLET') {
        playerSection = '【玩家角色】\n玩家扮演' + _userPlayerName + '（' + chapter.playerName + '），' + (chapter.playerTitle || '冒险者') + '。' + (chapter.playerDesc || '') + '\n注意：AI 叙事时请用「' + _userPlayerName + '」称呼玩家，而非使用身份头衔。';
    } else {
        playerSection = '【玩家角色】\n玩家扮演' + chapter.playerName + '，' + (chapter.playerTitle || '冒险者') + '。' + (chapter.playerDesc || '');
    }
}
```
注：`loadUserProfile()` 已在 L39794 定义，返回包含 `playerName` 字段的 profile 对象。

## REMOVED Requirements
无移除项。
