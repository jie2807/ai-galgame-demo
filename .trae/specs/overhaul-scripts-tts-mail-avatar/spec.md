# 综合修整：剧本整合 / 移除 TTS / 修复邮件 / 玩家头像 / 修复自定义剧本 Spec

## Why

用户在体验过程中发现 5 个阻塞性或体验性问题需要一次性解决：
1. 修仙剧本三章过于冗长且主角主动暴露穿越者身份不合理（"穿越者怎么可能主动暴露自己"）。
2. 浏览器内置 TTS（Web Speech API）音质低劣，"用这种低质的 tts 还不如不加"，且与已配置的 Edge/Supertonic 等高质量 TTS 并存造成混乱。
3. 自定义剧本"智能生成"功能看似修复实则仍不可用——`updateGenProgress`/`completeGenProgress` 与 `window.CUSTOM_SCRIPT_PROMPTS` 两处未定义，导致 API 调用成功后立刻抛 ReferenceError。
4. 玩家头像在首页/纪念收藏页/用户信息弹窗三处硬编码为薇尔莉特，玩家无法自定义。
5. 邮件按钮点击无反应——`#mailPanelOverlay` 等面板容器 DOM 节点缺失，`openMailPanel()` 静默返回。

## What Changes

### 1. 修仙剧本整合（**BREAKING**：删除 id=5/6 两章）
- 删除 `data/game-chapters.js` 中 id=5（霸业篇）和 id=6（巅峰篇）两章
- 将两章核心剧情（魔族入侵/丹道大会/五宗大比/终极打脸魔无极/天劫飞升）整合进 id=4（觉醒篇）
- 重命名 title 为「修仙：乱编的 · 觉醒篇」，metadata 同步更新
- 删除所有"他人知晓玩家是穿越者"的设定：
  - 删除"废柴？我是穿越者，你呢？"台词
  - 删除"穿越者身份公开震撼全场"结局
  - 删除"你不是林凡"等他人点破身份的描述
  - 保留系统对玩家内部的"检测到宿主为穿越者"提示（系统面板，非他人知晓）
  - 保留他人察觉异常但不知穿越者身份的描述（如"命格不在天道推演中"）
- stateVars 合并：取第一章低初值 + 第三章高上限，合并所有独有变量
- timelineEvents 精选为 6 个核心打脸场景（觉醒反杀/丹房打脸/三重背景打脸/九转金丹/终极打脸魔无极/天劫飞升）

### 2. 删除浏览器内置 TTS（NPCTTS）
- 删除 `NPCTTS` IIFE 类定义（约 line 18051-18191）
- 删除 TTS 设置面板 `ttsSettingsPanel` 相关函数（createTTSSettingsPanel/populateTTSSettings/openTTSSettings/closeTTSSettings，约 line 18480-18583）
- 删除 TTS 服务商下拉中的 `web-speech` 选项（line 9018）和 `noApiKeyProviders` 中的 `'web-speech'`（line 9447）
- 清理所有 `provider === 'web-speech'` 分支和 `NPCTTS.isSupported()` 守卫
- 清理 `speechSynthesis`/`SpeechSynthesisUtterance` 直接调用
- 清理 `DyVideoPlayer` 和抖音 AI 主播中的 NPCTTS 调用（改为调用通用 `speakWithTTS`/`stopCurrentTTSAudio` 或删除）
- 保留其他 TTS provider：Edge TTS、Fish Audio、阿里、火山、讯飞、ChatTTS、Supertonic、custom
- 保留 `ttsModelConfigPanel` 多服务商配置面板
- 保留通用 TTS 按钮 `ttsBtnHTML`（但清理其 web-speech 分支）

### 3. 修复自定义剧本智能生成
- **修复 1**：定义 `updateGenProgress(percent, text)` 和 `completeGenProgress()` 函数，操作 `genProgressWrap`/`genProgressFill`/`genProgressText`；或移除 `CustomScriptGenerator.run()` 内对这两个函数的调用，改用已存在的 `showGenProgress('parse'/'apply')` + `hideGenProgress()`
- **修复 2**：定义 `window.CUSTOM_SCRIPT_PROMPTS` 对象，含 basic/medium/advanced 三档 prompt 模板；或将 PROMPTS 内联到 `CustomScriptGenerator` 对象字面量
- 验证：智能生成全流程（API 请求→进度更新→解析→应用→完成）无 ReferenceError

### 4. 玩家头像自定义
- 扩展 `violet_user_profile` localStorage 结构，新增 `avatarUrl` 字段（base64 或 URL）
- 在 `userInfoModal` 的 `user-info-avatar-wrap`（line 6573）添加点击事件，弹出头像选择器
- 头像选择器复用现有 `portrait-picker-*` CSS 样式，提供：
  - 预置头像库（含末日方舟/修仙文角色头像 + 通用默认头像）
  - 上传自定义图片（FileReader → base64 → localStorage）
- 在 `updateLevelUI`（line 39994）中同步刷新三处头像 `<img>` 的 src（line 5561/6343/6574）
- 修复 L6352 的"薇"字和 L6354 的 "VIOLET EVERGARDEN" 为动态显示玩家名称首字/拼音

### 5. 修复邮件功能
- 在 `<body>` 中补回 `#mailPanelOverlay` 邮件面板容器 DOM 结构，包含：
  - `#mailPanelOverlay`（遮罩层，复用已有 `.mail-panel-overlay` CSS）
  - `#mailPanelContainer`（面板主体）
  - `#mailPanelListContainer` / `#mailPanelList`（邮件列表）
  - `#mailPanelDetail`（邮件详情）
- 验证：点击 `mailBtn` 能正常打开邮件面板，显示邮件列表和详情
- 验证：邮件未读徽章 `mailUnreadBadge` 正常显示

## Impact

- **Affected code**:
  - `data/game-chapters.js`：删除 2 章 + 整合内容到第 1 章
  - `data/characters.js`：无变更（角色数据保留）
  - `data/game-world-info.js`：无变更（穿越者词条保留，仅剧本内删除暴露设定）
  - `index.html`：删除 NPCTTS 类、TTS 设置面板、web-speech 选项；补回邮件面板 DOM；扩展玩家头像系统；修复自定义剧本生成函数
- **Affected specs**:
  - `rewrite-cultivation-as-transmigrator`：本次整合在其基础上进一步精简
  - `upgrade-tts-quality`：spec 明确"Web Speech API 保留为降级方案"，本次需求与之冲突，**以本次需求为准**
  - `fix-official-and-custom-script-issues`：本次修复其遗留的智能生成函数未定义问题
  - `implement-player-avatar-checkin`：spec 目录为空，本次实现其未完成的头像部分

## ADDED Requirements

### Requirement: 玩家头像自定义
The system SHALL provide a player avatar customization feature accessible from the user info modal, supporting preset avatars and custom image upload.

#### Scenario: 玩家选择预置头像
- **WHEN** 玩家在用户信息弹窗点击头像
- **THEN** 弹出头像选择器，显示预置头像库
- **WHEN** 玩家选择一个预置头像并确认
- **THEN** 三处头像（首页/纪念收藏/用户信息）同步更新，持久化到 localStorage

#### Scenario: 玩家上传自定义头像
- **WHEN** 玩家在头像选择器点击"上传图片"
- **THEN** 触发文件选择对话框
- **WHEN** 玩家选择图片文件（jpg/png/webp，<2MB）
- **THEN** 图片转 base64 存储，三处头像同步更新

### Requirement: 自定义剧本智能生成修复
The system SHALL provide a working AI-powered custom script generation flow with visible progress feedback.

#### Scenario: 智能生成成功
- **WHEN** 玩家点击"智能生成"按钮并完成 API 调用
- **THEN** 进度条按阶段（send/parse/apply）更新，最终显示生成成功
- **AND** 无 ReferenceError 抛出

## MODIFIED Requirements

### Requirement: 修仙剧本结构
原三章（觉醒篇/霸业篇/巅峰篇）合并为单章「修仙：乱编的 · 觉醒篇」，内容覆盖原三章主线，删除穿越者身份暴露设定。

### Requirement: TTS 服务商
TTS 服务商选项移除"Web Speech API（浏览器内置）"，保留 Edge/Fish/阿里/火山/讯飞/ChatTTS/Supertonic/custom 等高质量 TTS。

### Requirement: 邮件面板
邮件面板 DOM 容器补回，点击 `mailBtn` 能正常打开邮件面板查看邮件列表和详情。

## REMOVED Requirements

### Requirement: 浏览器内置 TTS（NPCTTS）
**Reason**: 音质低劣，与高质量 TTS 并存造成混乱，用户明确要求删除。
**Migration**: 已配置 Edge/Supertonic 等 TTS 的用户不受影响；未配置 TTS 的用户将不再有降级方案，需配置至少一种 TTS 服务商才能使用语音功能。
