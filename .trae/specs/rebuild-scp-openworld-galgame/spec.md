# SCP基金会官方剧本重构 Spec

## Why
当前官方剧本存在三个核心问题：1) 点击"官方劇本"按钮后进入一个硬编码旧数据的章节选择弹窗，无法正常游玩；2) 官方剧本被拆成3个短流程任务型章节，而非用户要求的开放世界体验；3) 游戏界面缺少Galgame风格的对话布局（背景图+左侧立绘+中间文字+右侧角色信息）。需要重构官方剧本为单一开放世界，修复入口流程，并实现Galgame风格对话界面。

## What Changes
- **BREAKING** 删除3个短流程任务型章节，合并为1个SCP基金会开放世界官方剧本
- **BREAKING** 重写官方剧本入口流程：点击"官方劇本"直接开始游戏，不再经过chapterMissionModal
- **ADDED** SCP基金会开放世界剧本：玩家作为新入职研究员在Site-19自由探索，无预设任务线，世界对玩家行为动态响应
- **ADDED** Galgame风格对话界面：背景图全屏显示、左侧角色立绘、中间横向对话文字区域、右侧角色信息面板
- **MODIFIED** chapterMissionModal：官方剧本不再使用此弹窗，仅保留给自定义剧本（或完全移除官方剧本的章节选择功能）
- **MODIFIED** gameChapters：从3个章节缩减为1个开放世界章节
- **MODIFIED** chapterLocations：合并为1个章节的完整Site-19地点体系

## Impact
- 受影响能力：官方剧本入口流程、游戏对话界面布局、章节系统
- 受影响代码：
  - `index.html` modeOfficial点击事件（L19910-19939）：重写为直接启动游戏
  - `index.html` gameChapters数组（L7101-7126）：缩减为1个开放世界章节
  - `index.html` game-content-area区域（L3645-3703）：重构为Galgame布局
  - `index.html` 对话消息渲染逻辑：适配Galgame横向文字显示
  - `index.html` chapterLocations：合并为1个章节的完整地点
  - `index.html` CSS样式：新增Galgame布局样式

## ADDED Requirements

### Requirement: SCP基金会开放世界官方剧本
系统 SHALL 提供1个基于SCP基金会世界观的开放世界官方剧本，玩家作为新入职研究员在Site-19自由探索。

#### Scenario: 开放世界剧本内容
- **WHEN** 玩家启动官方剧本
- **THEN** 剧本标题为"SCP基金会 - Site-19"
- **THEN** 剧本描述为"作为新入职的基金会研究员，你被分配至Site-19。在这个收容着无数异常项目的站点中，你的每一个选择都将影响你和他人的命运。探索站点的每个角落，与形形色色的人员互动，揭开隐藏在收容协议背后的真相。"
- **THEN** NPC列表包含全部6个角色（volkov, chen_mz, reid, harrison, zhao_tz, sophia）
- **THEN** 开场场景描写玩家第一天入职Site-19，到达站点大门，对一切充满好奇与不安
- **THEN** 世界上下文关键词为：SCP基金会、Site-19、收容、探索
- **THEN** 标签为：科幻、开放世界、悬疑
- **THEN** 无预设任务线，玩家自由决定行动方向
- **THEN** 地点体系覆盖Site-19全站（主控室、收容区A/B、研究区、安保区、D级宿舍、医疗区、食堂、站点外围等）

### Requirement: 官方剧本一键启动
系统 SHALL 让玩家点击"官方劇本"后直接进入游戏，无需经过章节选择弹窗。

#### Scenario: 点击官方剧本直接开始
- **WHEN** 玩家在模式选择界面点击"官方劇本"
- **THEN** 关闭模式选择器
- **THEN** 直接调用startGame(1)启动官方剧本
- **THEN** 不再显示chapterMissionModal弹窗

#### Scenario: 官方剧本有存档时提示
- **WHEN** 玩家点击"官方劇本"且存在该剧本的自动存档
- **THEN** 弹出存档提示（继续/重新开始），与现有startGame逻辑一致

### Requirement: Galgame风格对话界面
系统 SHALL 提供Galgame风格的对话界面布局。

#### Scenario: 界面布局
- **WHEN** 游戏进入对话模式
- **THEN** 背景区域全屏显示场景背景图（Site-19各区域场景图）
- **THEN** 左侧显示当前发言角色的立绘（半身像，从底部延伸至约80%屏幕高度）
- **THEN** 中间偏下区域显示角色对话文字（半透明深色底条，角色名+对话内容，横向排列）
- **THEN** 右侧可折叠显示当前场景其他角色信息（小头像+名称+状态）

#### Scenario: 角色立绘切换
- **WHEN** 对话中发言角色切换
- **THEN** 左侧立绘平滑过渡为新角色
- **THEN** 前一个角色立绘淡出或移至右侧小面板

#### Scenario: 背景图随地点变化
- **WHEN** 玩家移动到新地点
- **THEN** 背景图切换为对应地点的场景图
- **THEN** 切换时有渐变过渡效果

#### Scenario: 对话文字显示
- **WHEN** AI返回对话内容
- **THEN** 角色名显示在对话框左上角，带角色特征色标识
- **THEN** 对话内容逐字显示（打字机效果），使用「」包裹
- **THEN** 旁白内容不显示角色名，使用不同样式区分

#### Scenario: 玩家输入区域
- **THEN** 输入区域保持在底部，与现有功能一致
- **THEN** 输入区域不遮挡对话文字和立绘

### Requirement: SCP基金会场景背景图
系统 SHALL 为Site-19各主要区域提供场景背景图。

#### Scenario: 背景图生成
- **WHEN** 官方剧本启动时
- **THEN** 使用byted-seedream-image-generate为以下场景生成背景图：
  - Site-19站点大门/入口
  - 主控室
  - 收容区A走廊
  - 收容区B走廊
  - 研究区实验室
  - 安保检查站
  - D级人员宿舍
  - 医疗区
  - 站点食堂
  - 站点外围/天台
- **THEN** 图片风格统一为暗色调科幻风格，符合SCP基金会氛围

## MODIFIED Requirements

### Requirement: gameChapters缩减为1个开放世界章节
当前gameChapters包含3个短流程任务型章节，需要合并为1个开放世界章节。

**修改后设计**：
- 仅保留1个章节，id=1
- title改为"SCP基金会 - Site-19"
- desc改为开放世界描述
- npcs包含全部6个角色
- openingScene改为入职第一天的开放场景
- metadata.tags改为["科幻", "开放世界", "悬疑"]

### Requirement: chapterLocations合并为1个章节
当前chapterLocations包含3个章节的地点，需要合并为1个章节的完整Site-19地点体系。

**修改后设计**：
- 仅保留key=1的地点数据
- 地点数量扩展至10+个，覆盖Site-19全站
- 环境状态权重使用SCP环境类型

### Requirement: 官方剧本入口流程
当前点击"官方劇本"会打开chapterMissionModal弹窗（硬编码旧数据），需要改为直接启动游戏。

**修改后设计**：
- modeOfficial点击事件改为：关闭modeSelector → 直接调用startGame(1)
- 移除chapterMissionModal相关的官方剧本逻辑
- chapterMissionModal可保留给未来功能使用或移除

### Requirement: 游戏对话区域布局
当前游戏对话区域为左侧立绘+右侧聊天消息列表的布局，需要改为Galgame风格。

**修改后设计**：
- game-content-area重构为三层结构：
  1. 底层：全屏背景图层（dialogueBgLayer，已有，需扩展为全屏）
  2. 中层：左侧角色立绘 + 右侧角色信息面板
  3. 顶层：底部对话文字条（半透明深色底，横向显示角色名+对话内容）
- dialogueMessages改为底部对话条模式，不再使用滚动聊天列表
- 保留聊天历史查看功能（通过按钮展开完整对话记录）

## REMOVED Requirements

### Requirement: 3个短流程任务型章节
**原因**：用户要求开放世界体验，不需要预设任务线的短流程章节
**迁移**：合并为1个开放世界章节，保留全部NPC和地点数据
