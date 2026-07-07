# Checklist

## Task 1: _buildApiMessages 健壮性
- [x] `parseNPCMessageContent` 调用外层有 try-catch
- [x] catch 中回退为 `rebuiltContent = (m.content != null) ? String(m.content) : ''`（不加前缀）
- [x] catch 中有 `console.warn` 记录异常信息
- [x] `sendMessage` 中 `_buildApiMessages()` 调用有 try-catch
- [x] `sendAction` 中 `_buildApiMessages()` 调用有 try-catch
- [x] try-catch 中通过 `onError` 和 `showErrorToast` 传递错误给 UI
- [x] 注入异常测试数据后 `_buildApiMessages` 不崩溃、回退为空字符串（验证通过）

## Task 2: AI 第二轮报错根因排查
- [x] 根因确认：`parseNPCMessageContent(null/undefined)` 抛 `Cannot read properties of null`，导致 `_buildApiMessages` 崩溃
- [x] 修复 1：`parseNPCMessageContent` 入口添加 `if (fullContent == null) return [];`
- [x] 修复 2：`_buildApiMessages` 回退值改为 `(m.content != null) ? String(m.content) : ''`
- [x] null/undefined/空字符串/正常内容均不崩溃（Playwright 验证通过）
- [x] `_buildApiMessages` 在 null content 情况下回退为空字符串（Playwright 验证通过）

## Task 3: 视觉模式等待指示器
- [x] 新增 `addVisualLoadingIndicator()` 函数
- [x] 视觉模式下发送消息后出现加载指示器（display:flex, visibility:visible）
- [x] 指示器包含加载动画（三个跳动圆点）和实时计时文本
- [x] 复用 `msgElapsedChip` id 兼容计时逻辑
- [x] `removeTypingIndicator()` 同步移除视觉模式指示器（验证通过）
- [x] 纯文本模式（game-mode-text）typing indicator 行为不受影响

## Task 4: 游玩界面视觉优化
- [x] `.msg-narration .msg-content`（styles.css）移除 `font-style: italic`
- [x] `.msg-narration .msg-content`（styles.css）背景提升至 `rgba(0,0,0,0.65)`
- [x] `.msg-narration .msg-content`（styles.css）新增 `backdrop-filter: blur(8px)`
- [x] `.msg-narration .msg-content`（styles.css）文字颜色提升至 `rgba(245,230,211,0.95)`
- [x] `.msg.msg-narration-style .msg-content`（index.html 内联样式）移除 `font-style: italic`，更新 color/background/backdrop-filter
- [x] `.msg.msg-npc-style .msg-content`（index.html 内联样式）背景改为 `rgba(0,0,0,0.6)`，backdrop-filter 提升至 `blur(10px)`
- [x] `.galgame-dialogue-text.narration-text`（index.html 内联样式）移除 italic，更新 color/text-shadow
- [x] `.game-header`（styles.css）背景改为 `rgba(0,0,0,0.85)`
- [x] `.game-input-area`（styles.css + index.html 内联样式 L4464/L4472）背景改为 `rgba(0,0,0,0.85)`
- [x] 上下栏不再透出深蓝色调（Playwright 计算样式验证通过）

## Task 5: 端到端验证
- [x] index.html 无语法错误（浏览器加载无 SyntaxError）
- [x] game-chapters.js node --check 语法验证通过
- [x] 旁白计算样式：font-style: normal, color: rgba(245,230,211,0.95), background: rgba(0,0,0,0.65)
- [x] NPC 消息计算样式：background: rgba(0,0,0,0.6), backdrop-filter: blur(10px) saturate(1.4)
- [x] 上下栏计算样式：game-header 和 game-input-area 均为 rgba(0,0,0,0.85)
- [x] 视觉模式等待指示器：display:flex, position:fixed, z-index:9999, visibility:visible
- [x] removeTypingIndicator 正确移除视觉指示器和 chip 元素
- [x] parseNPCMessageContent null 守卫：null/undefined/空字符串均返回 []
- [x] _buildApiMessages 正常情况和 null content 情况下均不崩溃
- [x] 游戏成功启动：gamePage display:flex, chatEngine 初始化, 4 NPC 加载
- [x] 移动端 360px 无水平溢出
- [x] 实际两轮对话测试通过：第一轮 AI 回复 337 字符，第二轮 AI 回复 209 字符，均无报错
