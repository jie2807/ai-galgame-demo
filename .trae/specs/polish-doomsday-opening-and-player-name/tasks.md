# Tasks

## Phase A — 玩家名称动态化（变更 2，代码逻辑修改）

- [x] Task 1: 修改 `_buildSystemPrompt` 中 `playerSection` 构造逻辑
  - [x] SubTask 1.1: 在 `index.html` L11484-11494 的 `else if (chapter.playerName)` 分支中，优先读取玩家名称
  - [x] SubTask 1.2: 当玩家已输入名称（非空且非默认值「VIOLET」）时，构造 `玩家扮演{玩家名称}（{chapter.playerName}），{playerTitle}。{playerDesc}\n注意：AI 叙事时请用「{玩家名称}」称呼玩家，而非使用身份头衔。`
  - [x] SubTask 1.3: 当玩家未输入名称时，回退到原逻辑 `玩家扮演{chapter.playerName}，{playerTitle}。{playerDesc}`
  - [x] SubTask 1.4: 用 try-catch 包裹 localStorage 读取调用，防止 profile 读取异常阻塞游戏启动
  - [x] SubTask 1.5: JS 语法验证通过
  - [x] SubTask 1.6: 实现调整——因 `loadUserProfile` 函数不在 SimpleChatEngine IIFE 作用域中（ReferenceError 被 try-catch 静默吞掉），改为直接使用 `localStorage.getItem('violet_user_profile')` 读取 profile

## Phase B — 三章开场场景打磨（变更 1，数据文件重写）

- [x] Task 2: 打磨第一章「废墟之弈」开场场景
  - [x] SubTask 2.1: 重写 `openingScene`，采用「感官沉浸 → 身份揭示 → 行动召唤」三段式结构
    - 首段：地下停车场避难所的感官细节（潮湿、发电机嗡鸣、对讲机杂音、铁锈味），玩家独白
    - 中段：过渡到身份——「你」刚被推举为管理者，前任老陈未归，对讲机里还留着他的最后通讯
    - 末段：小鹿从通风管道钻入带来紧急报告（啃食者聚集），引出行动，不一次性列出四个 NPC 汇报
  - [x] SubTask 2.2: 调整 `playerDesc` 中的 AI 叙事指令，要求 NPC 用玩家名称（「队长」作为 NPC 口头称呼备用）而非固定头衔称呼玩家
  - [x] SubTask 2.3: 确保开场中只出现 1-2 名 NPC（仅小鹿），苏晴、老周、林深后移到玩家首次对话或首个事件中引入

- [x] Task 3: 打磨第二章「钢铁之弈」开场场景
  - [x] SubTask 3.1: 重写 `openingScene`，采用三段式结构
    - 首段：指挥中心的感官细节（硝烟味、地图上的图钉、远处炮声、装甲车引擎低吼），玩家站在地图前的内心独白
    - 中段：揭示身份——屠夫七天前的广播战书，兵力对比用一个具象细节（如「血手的人比我们多一倍，但他们只有一半人会换弹夹」）替代纯数字
    - 末段：烈推门进来报告前哨情报，引出行动，其余 NPC（凌霜、阿尔法、米拉）后移到对话中引入
  - [x] SubTask 3.2: 调整 `playerDesc` 中的 AI 叙事指令，要求 NPC 用玩家名称（「头儿」作为副官口头称呼备用）称呼玩家

- [x] Task 4: 打磨第三章「黎明之弈」开场场景
  - [x] SubTask 4.1: 重写 `openingScene`，采用三段式结构
    - 首段：方舟基地的感官细节（地下矿山的回声、恒温空调的低鸣、红色警报灯闪烁、试管碰撞声），玩家坐在主控台前的内心独白
    - 中段：揭示身份——旧院长日志的关键片段（「枯萎病不是天灾，是方舟的失败实验」），玩家作为接班人的心理负担
    - 末段：凛在身后等待命令，引出行动，其余 NPC（院长副手、神父、艾达）后移到对话或事件中引入
  - [x] SubTask 4.2: 调整 `playerDesc` 中的 AI 叙事指令，要求 NPC 用玩家名称（「院长」作为副手口头称呼备用）称呼玩家

## Phase C — 验证

- [x] Task 5: 端到端验证
  - [x] SubTask 5.1: `node --check data/game-chapters.js` 语法验证通过
  - [x] SubTask 5.2: Playwright 验证第一章开场场景渲染，确认首段为感官细节而非势力地图
  - [x] SubTask 5.3: Playwright 验证第一章开场仅出现 1 名 NPC（小鹿）
  - [x] SubTask 5.4: Playwright 验证玩家名称注入：设置 `profile.playerName='阿明'` 后，`_buildSystemPrompt` 输出含 `玩家扮演阿明（第七号避难所管理者）` 和 `AI 叙事时请用「阿明」称呼玩家`
  - [x] SubTask 5.5: Playwright 验证未输入名称时回退逻辑正常（playerName='VIOLET' 时，playerSection 为原格式 `玩家扮演第七号避难所管理者`，无注入指令）
  - [x] SubTask 5.6: 第二、第三章开场场景渲染正确，结构符合三段式（之前验证通过）
  - [x] SubTask 5.7: 控制台无新增关键错误（gameChapters 数组正确加载，3 章节 12 timeline 事件完整）

# Task Dependencies
- Task 1（玩家名称动态化）与 Task 2-4（开场打磨）相互独立，可并行
- Task 5（验证）依赖 Task 1-4 完成
