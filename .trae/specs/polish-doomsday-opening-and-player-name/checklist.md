# 末日文开场打磨 + 玩家名称动态化 Checklist

## 变更 1 — 玩家名称动态化

### 代码逻辑
- [x] `index.html` L11484-11494 的 `else if (chapter.playerName)` 分支已修改
- [x] 优先读取 `localStorage.getItem('violet_user_profile')` 中的 `playerName`，用 try-catch 包裹
- [x] 玩家名称非空且非「VIOLET」时，构造 `玩家扮演{玩家名称}（{chapter.playerName}），{playerTitle}。{playerDesc}\n注意：AI 叙事时请用「{玩家名称}」称呼玩家，而非使用身份头衔。`
- [x] 玩家名称为空或为「VIOLET」时，回退到原逻辑 `玩家扮演{chapter.playerName}，{playerTitle}。{playerDesc}`
- [x] JS 语法验证通过
- [x] 实现调整：因 `loadUserProfile` 函数不在 SimpleChatEngine IIFE 作用域中（ReferenceError 被 try-catch 静默吞掉），改为直接使用 `localStorage.getItem('violet_user_profile')` 读取

### 功能验证
- [x] 玩家输入名称「阿明」后，系统提示 `playerSection` 含「阿明（第七号避难所管理者）」（Playwright 验证通过）
- [x] 系统提示末尾含「AI 叙事时请用「阿明」称呼玩家」（Playwright 验证通过）
- [x] 未输入名称（默认 VIOLET）时，`playerSection` 仍为原格式 `玩家扮演第七号避难所管理者`（Playwright 验证通过）
- [x] `localStorage.getItem` 抛异常时不阻塞游戏启动（try-catch 生效，_userPlayerName 保持空字符串走 else 分支）

## 变更 2 — 第一章「废墟之弈」开场打磨

### 三段式结构
- [x] 首段为感官沉浸（潮湿/发电机嗡鸣/对讲机杂音/铁锈味等感官细节）
- [x] 首段不含势力地图、兵力数字等硬设定
- [x] 中段揭示玩家身份（「你」刚被推举为管理者，老陈未归）
- [x] 末段以小鹿的紧急报告引出行动

### NPC 分批登场
- [x] 开场仅出现 1 名 NPC（小鹿）
- [x] 苏晴、老周、林深不在开场中同时出场汇报
- [x] `playerDesc` 中 AI 叙事指令要求 NPC 用玩家名称或「队长」称呼玩家

### 文本质量
- [x] 开场无未转义双引号（语法检查通过）
- [x] 开场使用第二人称「你」叙述，不出现固定玩家名称
- [x] 信息密度明显降低，前两段不堆砌数字和势力名单

## 变更 3 — 第二章「钢铁之弈」开场打磨

### 三段式结构
- [x] 首段为指挥中心感官细节（硝烟味/地图图钉/远处炮声/装甲车引擎）
- [x] 中段揭示身份（屠夫战书、兵力对比用具象细节替代纯数字）
- [x] 末段以烈的报告引出行动

### NPC 分批登场
- [x] 开场仅出现烈（1 名 NPC）
- [x] 凌霜、阿尔法、米拉不在开场中同时出场
- [x] `playerDesc` 中 AI 叙事指令要求 NPC 用玩家名称或「头儿」称呼玩家

### 文本质量
- [x] 开场无未转义双引号
- [x] 使用第二人称「你」叙述
- [x] 兵力对比用具象细节（如「他们只有一半人会换弹夹」）替代纯数字

## 变更 4 — 第三章「黎明之弈」开场打磨

### 三段式结构
- [x] 首段为方舟基地感官细节（地下矿山回声/恒温空调/红色警报灯/试管碰撞声）
- [x] 中段揭示身份（旧院长日志片段「枯萎病不是天灾，是方舟的失败实验」）
- [x] 末段以凛等待命令引出行动

### NPC 分批登场
- [x] 开场仅出现凛（1 名 NPC）
- [x] 院长副手、神父、艾达不在开场中同时出场
- [x] `playerDesc` 中 AI 叙事指令要求 NPC 用玩家名称或「院长」称呼玩家

### 文本质量
- [x] 开场无未转义双引号
- [x] 使用第二人称「你」叙述

## 端到端验证

- [x] `node --check data/game-chapters.js` 通过
- [x] Playwright 验证第一章开场首段为感官细节（地下停车场避难所潮湿/发电机嗡鸣/对讲机杂音）
- [x] Playwright 验证第一章开场仅 1 名 NPC（小鹿）
- [x] Playwright 验证玩家名称注入逻辑（设置 `profile.playerName='阿明'` 后系统提示含 `玩家扮演阿明（第七号避难所管理者）` + `AI 叙事时请用「阿明」称呼玩家`）
- [x] Playwright 验证未输入名称时回退正常（playerName='VIOLET' 时 playerSection 为原格式，无注入指令）
- [x] Playwright 验证第二章开场渲染正确（硝烟味/地图图钉/烈报告）
- [x] Playwright 验证第三章开场渲染正确（地下矿山回声/旧院长日志/凛等待）
- [x] 控制台无新增关键错误（gameChapters 数组正确加载，3 章节 12 timeline 事件完整）
