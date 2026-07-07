# Checklist

## 修仙剧本整合验证
- [x] `data/game-chapters.js` 仅含 1 个修仙章节（id=4），无 id=5/id=6
- [x] 章节标题为「修仙：乱编的 · 觉醒篇」，无「逆天仙途」「霸业篇」「巅峰篇」字样
- [x] metadata.title/author/description 同步更新为「修仙：乱编的」
- [x] openingScene 为穿越觉醒场景（保留原第一章内容）
- [x] playerDesc 含穿越者设定（程序员猝死/三大金手指），无"身份暴露"描述
- [x] timelineEvents 含 6 个核心打脸场景（觉醒反杀/丹房打脸/三重背景打脸/九转金丹/终极打脸魔无极/天劫飞升）
- [x] 无「废柴？我是穿越者，你呢？」台词
- [x] 无「穿越者身份公开震撼全场」结局
- [x] 无「你不是林凡」等他人点破身份描述
- [x] 保留系统面板「检测到宿主为穿越者」内部提示
- [x] 保留他人察觉异常描述（如「命格不在天道推演中」「他到底是谁」「你的道不似人间之道」）
- [x] stateVars 合并完整：含 cultivationRealm/spiritualPower/daoHeart/sectPrestige/magicCorruption/systemPoints/plotForeknowledge + 所有 NPC 好感度 + xiaoyichenHostility/situhaoHostility/mowujiHostility/tribulationCountdown
- [x] stateVars 初值取第一章低起，max 取第三章上限
- [x] `node --check data/game-chapters.js` 通过

## TTS 删除验证
- [x] 全文 grep `NPCTTS` 无残留（除注释）
- [x] 全文 grep `speechSynthesis` 无残留（除注释）
- [x] 全文 grep `SpeechSynthesisUtterance` 无残留
- [x] 全文 grep `web-speech` 无残留（除注释）
- [x] TTS 服务商下拉无「Web Speech API（浏览器内置）」选项
- [x] `noApiKeyProviders` 数组无 `'web-speech'`
- [x] TTS 设置面板（createTTSSettingsPanel 等）已删除
- [x] `handleTTSButtonClick`/`resolveTTSVoice`/`getTTSVoiceOverride`/`getTTSVoiceId` 无 web-speech 分支
- [x] 默认 `tts_provider` 改为 `'edge-tts'` 或空字符串，不再是 `'web-speech'`
- [x] `speakWithTTS` 保留 Edge/Fish/Supertonic 分支，NPCTTS 降级分支已删除
- [x] `stopCurrentTTSAudio` 函数保留，`speechSynthesis.cancel()` 调用已删除
- [x] `addNPCMessage` 的 tts 按钮绑定改为按 `tts_provider` 是否配置判断
- [x] DyVideoPlayer 和抖音 AI 主播 TTS 调用已清理或改用通用 TTS
- [x] `ttsModelConfigPanel` 多服务商配置面板保留
- [x] 通用 TTS 按钮 `ttsBtnHTML` 保留

## 自定义剧本修复验证
- [x] `window.CUSTOM_SCRIPT_PROMPTS` 已定义，含 basic/medium/advanced 三档 prompt 模板
- [x] `updateGenProgress(percent, text)` 和 `completeGenProgress()` 已定义，或 `CustomScriptGenerator.run()` 改用 `showGenProgress`/`hideGenProgress`
- [x] `CustomScriptGenerator.buildPrompt()` 能正确访问 `this.PROMPTS[mode]` 并替换占位符
- [x] 点击「智能生成」按钮不再抛出 ReferenceError
- [x] 进度条在生成过程中按阶段（send/parse/apply）正常更新
- [x] 生成完成或失败后进度条隐藏
- [x] 生成失败时显示具体错误提示（API 错误/JSON 解析错误），不抛未捕获异常

## 玩家头像自定义验证
- [x] `violet_user_profile` 默认值含 `avatarUrl` 字段
- [x] 用户信息弹窗 `user-info-avatar-wrap` 可点击弹出头像选择器
- [x] 头像选择器含预置头像库（末日方舟/修仙文角色头像 + 通用默认头像）
- [x] 头像选择器含上传图片按钮，支持 jpg/png/webp
- [x] 上传图片转 base64 存储，三处头像同步更新
- [x] 选择预置头像后三处头像同步更新（首页 L5561/纪念收藏 L6343/用户信息 L6574）
- [x] 纪念收藏页「薇」字改为动态显示玩家名称首字
- [x] 纪念收藏页 "VIOLET EVERGARDEN" 改为动态显示玩家名称或留空
- [x] 首次命名流程不受影响
- [x] 刷新页面后头像持久化（localStorage）

## 邮件面板修复验证
- [x] `#mailPanelOverlay` DOM 节点存在于 `<body>` 中
- [x] `#mailPanelContainer`/`#mailPanelListContainer`/`#mailPanelList`/`#mailPanelDetail` 节点存在
- [x] 点击 `mailBtn` 能正常打开邮件面板（添加 `active` 类）
- [x] 邮件列表能正常渲染（`renderMailList`）
- [x] 邮件详情能正常渲染（`openMailDetail`）
- [x] `mailUnreadBadge` 未读徽章正常显示
- [x] 邮件面板关闭按钮正常
- [x] 邮件面板背景滚动锁定正常

## 端到端与回归验证
- [x] `node --check data/game-chapters.js` 通过
- [x] `node --check data/characters.js` 通过
- [x] `node --check data/game-world-info.js` 通过
- [x] index.html 内联 JS 无语法错误（浏览器控制台无报错）
- [x] Playwright 官方剧本面板显示「修仙：乱编的 · 觉醒篇」（1 章）+ 末日方舟 3 章
- [x] Playwright 进入修仙剧本，openingScene 为穿越觉醒场景
- [x] Playwright TTS 设置无 Web Speech API 选项
- [x] Playwright 点击 mailBtn 能打开邮件面板
- [x] Playwright 用户信息弹窗点击头像能弹出头像选择器
- [x] Playwright 自定义剧本智能生成无 ReferenceError
- [x] 360px 移动端无水平溢出（邮件面板/头像选择器/TTS 配置/剧本列表）
- [x] 末日方舟三章回归正常
- [x] 自定义剧本手动编辑/保存/加载不受影响
