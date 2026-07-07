# Tasks

- [x] Task 1: 整合修仙剧本为单章「修仙：乱编的」
  - [ ] SubTask 1.1: 重写 `data/game-chapters.js` id=4 章节：title 改为「修仙：乱编的 · 觉醒篇」，metadata.title/author/description 同步更新，subtitle 改为 `THE AWAKENING`
  - [ ] SubTask 1.2: 重写 desc 为整合三章的简介（程序员穿越→觉醒系统→反杀萧逸尘→对抗魔族→丹道大会→五宗大比→终极打脸魔无极→渡劫飞升）
  - [ ] SubTask 1.3: 重写 openingScene 为穿越觉醒场景（保留第一章原样）
  - [ ] SubTask 1.4: 重写 playerTitle/playerDesc：保留穿越者设定但删除"身份暴露"相关描述
  - [ ] SubTask 1.5: 合并 stateVars：取第一章低初值 + 第三章高上限，合并所有独有变量（situhaoHostility/mowujiHostility/tribulationCountdown/bailingyinFavor/jiuweiFavor/fengqiwuFavor）
  - [ ] SubTask 1.6: 重写 timelineEvents 为 6 个核心打脸场景：①觉醒反杀萧逸尘 ②丹房打脸慕容婉儿 ③三重背景打脸司徒浩 ④丹道大会九转金丹 ⑤终极打脸魔无极 ⑥天劫飞升；删除「废柴？我是穿越者，你呢？」台词
  - [ ] SubTask 1.7: 重写 thresholdEvents/randomEvents/endingEvents：删除"穿越者身份公开震撼全场""你不是林凡"等暴露设定结局，改为"渡劫飞升"等爽文结局；保留他人察觉异常但不知穿越者身份的描述
  - [ ] SubTask 1.8: 删除 id=5（霸业篇）和 id=6（巅峰篇）两个章节对象
  - [ ] SubTask 1.9: `node --check data/game-chapters.js` 通过

- [x] Task 2: 删除浏览器内置 TTS（NPCTTS）
  - [ ] SubTask 2.1: 删除 `NPCTTS` IIFE 类定义（约 line 18051-18191）及其 `window.NPCTTS` 暴露
  - [ ] SubTask 2.2: 删除 TTS 服务商下拉中的 `web-speech` 选项（line 9018）和 `noApiKeyProviders` 中的 `'web-speech'`（line 9447）
  - [ ] SubTask 2.3: 删除 TTS 设置面板相关函数（createTTSSettingsPanel/populateTTSSettings/openTTSSettings/closeTTSSettings，约 line 18480-18583）及其调用点
  - [ ] SubTask 2.4: 清理 `handleTTSButtonClick`/`resolveTTSVoice`/`getTTSVoiceOverride`/`getTTSVoiceId` 中的 web-speech 分支，默认 provider 改为 `'edge-tts'` 或空字符串
  - [ ] SubTask 2.5: 清理 `speakWithTTS` 中 NPCTTS 降级分支（line 18423-18425、18440-18443、18470-18477）
  - [ ] SubTask 2.6: 清理 `stopCurrentTTSAudio` 中 `speechSynthesis.cancel()` 调用（line 18384），保留函数本身
  - [ ] SubTask 2.7: 清理 `addNPCMessage` 的 tts 按钮绑定中 `NPCTTS.isSupported()` 判断（line 19087-19093），改为按 `tts_provider` 是否配置
  - [ ] SubTask 2.8: 清理 `populateTTSVoices`（line 9514-9524）和测试连接（line 9847-9850）中的 web-speech 分支
  - [ ] SubTask 2.9: 清理 `openNpcVoiceSettings` 中 web-speech 分支与试听（line 21089/21105/21122-21123/21155-21165/21334-21349）
  - [ ] SubTask 2.10: 清理 `DyVideoPlayer` 的 stop/pause/resume（line 32706-32707/32716-32717/32724-32725）和抖音 AI 主播 TTS（line 33291-33296/33317/33333-33365）中的 NPCTTS/speechSynthesis 调用，改为调用通用 `speakWithTTS`/`stopCurrentTTSAudio` 或删除 TTS 调用保留 BGM/视频逻辑
  - [ ] SubTask 2.11: 清理自动播放判断（line 18857-18872、18937-18952）中的 `NPCTTS.isSupported()` 和 web-speech 分支
  - [ ] SubTask 2.12: 清理所有 `localStorage.getItem('tts_provider') || 'web-speech'` 默认值（约 9 处），改为 `'edge-tts'` 或空字符串
  - [ ] SubTask 2.13: 全文 grep 验证 `NPCTTS`、`speechSynthesis`、`SpeechSynthesisUtterance`、`web-speech` 关键词无残留（除注释和已保留的 Supertonic/Edge TTS 代码）

- [x] Task 3: 修复自定义剧本智能生成
  - [ ] SubTask 3.1: 定义 `window.CUSTOM_SCRIPT_PROMPTS` 对象，含 basic/medium/advanced 三档 prompt 模板（每档含 systemPrompt/userPrompt 模板，支持 {topic}/{characterCount}/{sceneCount} 等占位符）
  - [ ] SubTask 3.2: 修复 `CustomScriptGenerator.run()` 内 `updateGenProgress`/`completeGenProgress` 调用：要么定义这两个函数（操作 genProgressWrap/Fill/Text），要么改用已存在的 `showGenProgress('send'/'parse'/'apply')` + `hideGenProgress()`
  - [ ] SubTask 3.3: 验证 `CustomScriptGenerator.buildPrompt()` 能正确访问 `this.PROMPTS[mode]` 并替换占位符
  - [ ] SubTask 3.4: 验证智能生成全流程：API 请求→进度更新→JSON 解析→应用→完成，无 ReferenceError
  - [ ] SubTask 3.5: 验证生成失败时（API 错误/JSON 解析失败）的错误提示正常显示，不抛未捕获异常

- [x] Task 4: 玩家头像自定义
  - [ ] SubTask 4.1: 扩展 `violet_user_profile` localStorage 默认值（line 39973），新增 `avatarUrl` 字段（默认空或 `images/violet-avatar.jpg`）
  - [ ] SubTask 4.2: 创建玩家头像选择器 HTML 结构（复用 `portrait-picker-*` CSS），含预置头像库网格 + 上传图片按钮
  - [ ] SubTask 4.3: 创建 `openPlayerAvatarPicker(callback)` 函数：显示选择器，预置头像库含末日方舟/修仙文角色头像 + 通用默认头像，上传图片走 FileReader → base64 → callback
  - [ ] SubTask 4.4: 在 `userInfoModal` 的 `user-info-avatar-wrap`（line 6573）添加点击事件，调用 `openPlayerAvatarPicker`，回调中保存到 `profile.avatarUrl` 并调用 `updateLevelUI` 刷新
  - [ ] SubTask 4.5: 修改 `updateLevelUI`（line 39994），从 `profile.avatarUrl` 读取并同步刷新三处头像 `<img>` 的 src（line 5561/6343/6574）
  - [ ] SubTask 4.6: 修复纪念收藏页 L6352 的"薇"字为动态显示玩家名称首字，L6354 的 "VIOLET EVERGARDEN" 为动态显示玩家名称拼音或留空
  - [ ] SubTask 4.7: 验证首次命名流程（`playerNameSetupModal`）不受影响，玩家可在命名后通过用户信息弹窗设置头像

- [x] Task 5: 修复邮件面板 DOM
  - [ ] SubTask 5.1: 在 `<body>` 中补回 `#mailPanelOverlay` 邮件面板容器 DOM 结构，包含 `#mailPanelOverlay`/`#mailPanelContainer`/`#mailPanelListContainer`/`#mailPanelList`/`#mailPanelDetail`，复用已有 `.mail-panel-overlay`/`.mail-panel-*` CSS
  - [ ] SubTask 5.2: 验证 `openMailPanel()`（line 27729）能正确获取 `#mailPanelOverlay` 并添加 `active` 类
  - [ ] SubTask 5.3: 验证 `renderMailList()`（line 27744）能正确渲染 `#mailPanelList`
  - [ ] SubTask 5.4: 验证 `openMailDetail()`（line 27789）能正确渲染 `#mailPanelDetail`
  - [ ] SubTask 5.5: 验证 `mailUnreadBadge` 未读徽章正常显示
  - [ ] SubTask 5.6: 验证邮件面板关闭、滚动锁定、移动端适配正常

- [x] Task 6: 端到端验证与回归
  - [x] SubTask 6.1: `node --check data/game-chapters.js` 通过
  - [x] SubTask 6.2: `node --check data/characters.js` 通过
  - [x] SubTask 6.3: `node --check data/game-world-info.js` 通过
  - [x] SubTask 6.4: Playwright 验证官方剧本面板显示「修仙：乱编的 · 觉醒篇」（仅 1 章），末日方舟 3 章不受影响
  - [x] SubTask 6.5: Playwright 进入修仙剧本，验证 openingScene 为穿越觉醒场景，timelineEvents 含 6 个核心打脸，无"我是穿越者"台词
  - [x] SubTask 6.6: Playwright 验证 TTS 设置面板不再有"Web Speech API"选项，NPCTTS 类已删除
  - [x] SubTask 6.7: Playwright 验证点击 mailBtn 能正常打开邮件面板
  - [x] SubTask 6.8: Playwright 验证用户信息弹窗点击头像能弹出头像选择器，选择/上传后三处头像同步更新
  - [x] SubTask 6.9: Playwright 验证自定义剧本智能生成流程（需配置 API），进度条正常更新，无 ReferenceError
  - [x] SubTask 6.10: 360px 移动端验证：邮件面板、头像选择器、TTS 配置面板、剧本列表无水平溢出
  - [x] SubTask 6.11: 回归验证：末日方舟三章可正常进入游玩，自定义剧本手动编辑/保存/加载不受影响

# Task Dependencies
- [Task 1] 独立（剧本整合）
- [Task 2] 独立（TTS 删除）
- [Task 3] 独立（自定义剧本修复）
- [Task 4] 独立（玩家头像）
- [Task 5] 独立（邮件修复）
- [Task 6] depends on [Task 1, 2, 3, 4, 5]（端到端验证依赖所有修改完成）
