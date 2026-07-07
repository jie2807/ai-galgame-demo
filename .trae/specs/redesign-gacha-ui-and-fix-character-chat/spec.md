# 抽卡页 UI 重设计与角色写信页修复 Spec

## Why

当前抽卡页视觉风格与用户需求不符，角色写信页存在功能与体验问题：

1. **抽卡页 UI 不够精致**：底部按钮区域臃肿，中间花朵装饰突兀，文字颜色偏暗，按钮为咖啡色，不符合苹果简洁风格。
2. **写信功能报错**：发送消息后控制台报错 `readChunk is not defined`，导致无法连接 AI 回复。
3. **写信页布局不符合聊天习惯**：玩家消息与角色消息未像微信一样左右分区，玩家头像未同步首页设置。

## What Changes

### 抽卡页
- **调整按钮位置**：将「图鉴」「兑换」按钮从底部移至右上角抽卡资源旁。
- **删除中心装饰**：移除 `.gacha-deco-center` 中的花朵 SVG 图标，保留「拆开信件，邂逅命运」文案。
- **下移保底进度条**：将 `.gacha-pity-bar` 从中心装饰内部下移至更靠近底部按钮的位置。
- **改为白色文字**：抽卡页主要文字（标题、资源数、按钮文字等）改为白色，确保在深色视频背景上清晰可读。
- **苹果风格按钮**：单抽/十连按钮改为圆角大按钮、半透明毛玻璃效果、白色边框、蓝色强调色，去除咖啡色与复杂装饰。
- **保留核心逻辑**：抽卡概率、保底、信件/碎片商店、localStorage 等逻辑不变。

### 角色写信页
- **修复 `readChunk` 未定义错误**：补充缺失的 `readChunk` 函数定义或替换为可用的流式读取函数。
- **同步玩家头像**：读取首页 `playerAvatar` 设置（localStorage 或 DOM），在写信页消息中使用。
- **微信式气泡布局**：玩家消息在右侧、头像在右侧；角色消息在左侧、头像在左侧。
- **苹果风格 UI**：输入框、发送按钮、返回按钮改为 iOS 风格（圆角、毛玻璃、简洁图标）。
- **保持角色 Live2D/立绘区**：左侧角色展示区不变。

## Impact

- **受影响的功能**：抽卡页视觉与布局、角色写信页视觉与消息功能。
- **受影响的文件**：`index.html`（DOM 与 JS）、`styles.css`（样式）。
- **不受影响的文件**：`data/characters.js`、抽卡核心逻辑、图鉴/详情页、游戏主流程、AI 工作台、邮箱系统。

## ADDED Requirements

### Requirement: 抽卡页右上角快捷操作

系统 SHALL 在抽卡页右上角资源区旁显示「图鉴」与「兑换」入口。

#### Scenario: 查看右上角资源区
- **WHEN** 玩家位于抽卡页
- **THEN** 右上角依次显示信件数、碎片数、图鉴按钮、兑换按钮
- **AND** 点击图鉴进入角色图鉴页
- **AND** 点击兑换打开回忆碎片商店

### Requirement: 抽卡页苹果风格按钮

系统 SHALL 使用苹果风格设计单抽、十连按钮。

#### Scenario: 查看抽卡按钮
- **WHEN** 玩家位于抽卡页
- **THEN** 单抽/十连按钮为圆角矩形、半透明毛玻璃背景、白色文字
- **AND** 按钮 hover/active 时有轻微放大或高亮反馈
- **AND** 不使用咖啡色背景

### Requirement: 写信功能可正常连接 AI

系统 SHALL 修复 `readChunk is not defined` 错误，使角色能正常回复。

#### Scenario: 发送消息
- **WHEN** 玩家在写信页输入消息并发送
- **THEN** 消息正常显示
- **AND** AI 流式回复正常返回
- **AND** 控制台不再出现 `readChunk is not defined` 错误

### Requirement: 写信页微信式气泡

系统 SHALL 在写信页使用微信式聊天气泡布局。

#### Scenario: 查看聊天消息
- **WHEN** 玩家与角色聊天
- **THEN** 玩家消息显示在右侧，头像在右侧
- **AND** 角色消息显示在左侧，头像在左侧
- **AND** 玩家头像与首页设置的头像一致

## MODIFIED Requirements

### Requirement: 抽卡页 DOM 与样式

**文件**: `index.html`、`styles.css`

**修改内容**：
- 将 `gachaCollectionBtn` 与 `gachaShopBtn` 从 `.gacha-footer` 移动到 `.gacha-header-right`。
- 删除 `.gacha-deco-center` 中的花朵 SVG，保留文案。
- 将 `.gacha-pity-bar` 下移到 `.gacha-main` 底部或 `.gacha-footer` 上方。
- 将抽卡页文字颜色改为白色（通过 `.gacha-page` 的 color 或各元素覆盖）。
- 重写 `.gacha-btn-single`、`.gacha-btn-ten` 样式为苹果风格。
- 路径确认：背景视频为 `videos/main_background.mp4`，抽卡动画视频同样使用 `videos/main_background.mp4`。

### Requirement: 写信页 DOM、JS 与样式

**文件**: `index.html`、`styles.css`

**修改内容**：
- 修复 `readChunk` 函数缺失：在 AI 流式请求代码处补充 `readChunk` 定义，或替换为 `reader.read().then(...)` 标准用法。
- 在 `openCharacterChat` 中读取首页玩家头像（优先 localStorage `playerAvatar`，其次 DOM `#playerAvatar` 的 src）。
- 修改消息渲染逻辑，区分玩家与角色消息，分别添加左右气泡样式类。
- 修改 `.charchat-input-area`、`.charchat-send-btn`、`.charchat-back-btn` 为苹果风格。

## REMOVED Requirements

### Requirement: 抽卡页底部图鉴/兑换按钮

**Reason**: 已移动到右上角资源区旁。
**Migration**: 底部只保留单抽、十连两个主按钮。

### Requirement: 抽卡页中心花朵装饰

**Reason**: 用户认为突兀。
**Migration**: 删除 SVG 花朵，仅保留文案。

### Requirement: 写信页咖啡色样式

**Reason**: 用户要求苹果风格。
**Migration**: 替换为白色/半透明毛玻璃/蓝色强调色。
