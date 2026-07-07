# 重建抽卡系统 Spec

## Why
当前抽卡系统存在严重的双重实现冲突：`index.html` 中有一套完整的内联抽卡页面（HTML + JS + CSS），`pages/gacha/` 目录下又有一套模块化抽卡页面（GachaPage.js + gacha.css）。两套系统共用 `gacha_state` localStorage 键但数据结构不同，CSS 样式在 `styles.css` 和 `gacha.css` 中重复定义且类名不一致，`main.js` 的 `INLINE_PAGE_MAP` 将 `/gacha` 映射到内联页面导致模块化版本实际从未被使用。此外，`index.html` 内联脚本中 `gachaPool` 被游戏页面、自定义剧本编辑器等多处引用，耦合极深。修复难度远大于重建，因此决定删除旧系统并重新制作。

## What Changes
- **删除内联抽卡页面**：删除 `index.html` 中 `#gachaPage` 的全部 HTML（约 1516-1600 行）
- **删除内联抽卡 JS**：删除 `index.html` 中所有 `gachaPool`、`gachaState`、`showEnvelopeResult`、`_gachaPullQueue` 等抽卡相关变量和函数（约 3091-7476 行中散布的抽卡代码）
- **删除内联抽卡 CSS**：删除 `styles.css` 中所有 `.gacha-*` 相关样式（约 1091-1500 行和 5074-5400 行和 7407 行）
- **删除旧模块化抽卡页面**：删除 `pages/gacha/GachaPage.js` 和 `pages/gacha/gacha.css`
- **重建模块化抽卡系统**：新建 `pages/gacha/GachaPage.js`，使用与项目一致的模块化架构
- **更新路由**：从 `main.js` 的 `INLINE_PAGE_MAP` 中移除 `/gacha` 映射，改用 Router 懒加载
- **整合角色数据**：新建 `data/gachaPool.js` 统一管理抽卡池数据，与 `data/characters.js` 和 `data/gameData.js` 的 `gameCharacters` / `npcLive2DModels` 对齐
- **修复游戏页面引用**：将 `index.html` 内联脚本中对 `gachaPool` 的引用改为从 `window.__APP__` 或全局变量获取

## Impact
- 受影响模块：抽卡系统、游戏页面角色选择、自定义剧本编辑器立绘选择器
- 受影响文件：`index.html`、`styles.css`、`main.js`、`pages/gacha/*`、`data/gachaPool.js`（新建）

## ADDED Requirements

### Requirement: 模块化抽卡页面
系统 SHALL 提供一个基于 Router 懒加载的模块化抽卡页面，不再使用内联 HTML 实现。

#### Scenario: 从首页进入抽卡页面
- **WHEN** 用户点击首页"永恆の花園"模块
- **THEN** 通过 Router 导航到 `/gacha` 路由
- **AND** 懒加载 `GachaPage` 模块并挂载到 `#app` 容器
- **AND** 不再显示内联 `#gachaPage` 元素

#### Scenario: 从抽卡页面返回首页
- **WHEN** 用户点击抽卡页面的返回按钮
- **THEN** 导航回 `/home` 路由
- **AND** 抽卡页面正确卸载（视频停止、事件解绑）

### Requirement: 统一抽卡池数据
系统 SHALL 在 `data/gachaPool.js` 中定义抽卡池，角色数据与 `data/characters.js` 和 `data/gameData.js` 保持一致。

#### Scenario: 抽卡池包含所有可用角色
- **WHEN** 抽卡系统初始化
- **THEN** 抽卡池包含薇尔莉特、霍金斯、露库莉娅、艾丽卡等角色
- **AND** 每个角色包含 id、name、nameEn、rarity、portrait、gender、age、personality、background 字段
- **AND** 角色数据与 `data/characters.js` 中的对应角色 id 一致

### Requirement: 抽卡核心逻辑
系统 SHALL 提供单抽和十连抽功能，使用信件作为货币。

#### Scenario: 单抽
- **WHEN** 用户点击"拆信"按钮且信件数 ≥ 1
- **THEN** 消耗 1 封信件，按概率抽取一个角色
- **AND** 显示抽卡动画后展示结果卡片
- **AND** 新角色加入收藏，重复角色标记"重复"

#### Scenario: 十连抽
- **WHEN** 用户点击"十连拆信"按钮且信件数 ≥ 10
- **THEN** 消耗 10 封信件，按概率抽取 10 个角色
- **AND** 依次展示每个结果卡片

#### Scenario: 信件不足
- **WHEN** 用户点击抽卡按钮但信件数不足
- **THEN** 不执行抽卡，按钮显示禁用状态

### Requirement: 抽卡概率
系统 SHALL 按以下概率分配稀有度：4星 5%、3星 25%、2星 70%。

#### Scenario: 概率分布
- **WHEN** 执行抽卡
- **THEN** 4星角色概率为 5%
- **AND** 3星角色概率为 25%
- **AND** 2星角色概率为 70%

### Requirement: 收藏列表
系统 SHALL 提供收藏弹窗展示已拥有的角色。

#### Scenario: 查看收藏
- **WHEN** 用户点击"收藏"按钮
- **THEN** 弹出收藏列表弹窗
- **AND** 展示所有已拥有角色的头像、名称和稀有度
- **AND** 按稀有度从高到低排序

### Requirement: 状态持久化
系统 SHALL 将抽卡状态（信件数、已拥有角色、抽卡历史）持久化到 localStorage。

#### Scenario: 刷新页面后恢复状态
- **WHEN** 用户刷新页面后再次进入抽卡页面
- **THEN** 信件数、已拥有角色列表与刷新前一致

### Requirement: 抽卡动画
系统 SHALL 在抽卡时播放背景视频和抽卡动画视频。

#### Scenario: 视频播放
- **WHEN** 执行抽卡
- **THEN** 播放 `videos/gacha_pull.mp4` 抽卡动画视频
- **AND** 视频结束后展示结果卡片
- **AND** 如视频加载失败，5秒超时后直接展示结果

### Requirement: 游戏页面集成
游戏页面 SHALL 能从抽卡系统获取角色数据用于 NPC 选择和 Live2D 模型显示。

#### Scenario: 游戏页面使用抽卡角色
- **WHEN** 游戏页面需要加载 NPC 角色数据
- **THEN** 可从全局 `window.__APP__.gachaPool` 获取抽卡池数据
- **AND** 可从 localStorage `gacha_state` 获取已拥有角色列表

## REMOVED Requirements

### Requirement: 内联抽卡页面
**Reason**: 与模块化抽卡页面冲突，导致双重实现和状态不一致
**Migration**: 删除内联 HTML/JS/CSS，统一使用模块化实现

### Requirement: 内联 gachaPool 变量
**Reason**: 散布在 index.html 内联脚本中，与模块化数据源冲突
**Migration**: 迁移到 `data/gachaPool.js` 并通过全局变量暴露
