# Tasks

- [x] Task 1: 修复 _buildApiMessages 健壮性（防止 parseNPCMessageContent 崩溃）
  - 在 `index.html` L12002 的 `parseNPCMessageContent(m.content, defaultNpcId)` 调用外层包裹 try-catch
  - catch 中回退为 `rebuiltContent = m.content`（不加前缀），并 `console.warn` 记录异常
  - 在 `sendMessage`（L12122）的 `var apiMessages = this._buildApiMessages()` 处增加 try-catch
  - catch 中调用 `onError(errMsg)` 并 `showErrorToast`，避免静默失败
  - 同步处理 `sendAction`（L12070）中的 `_buildApiMessages()` 调用
  - 验证：注入会导致 `parseNPCMessageContent` 抛异常的测试数据，确认 `_buildApiMessages` 不崩溃、回退为原始 content

- [x] Task 2: 排查 AI 第二轮报错的根因
  - 根因：`parseNPCMessageContent(null/undefined)` 抛 `Cannot read properties of null (reading 'substring')`，导致 `_buildApiMessages` 崩溃，`sendMessage` 静默失败
  - 修复 1：`parseNPCMessageContent` 入口添加 `if (fullContent == null) return [];`（L17317）
  - 修复 2：`_buildApiMessages` 回退值改为 `(m.content != null) ? String(m.content) : ''`（L12002）
  - 验证：Playwright 测试 null/undefined/空字符串/正常内容均不崩溃
  - API 配置验证：agnes-2.0-flash 模型，系统提示 6934 字符，总内容 7360 字符，均在正常范围

- [x] Task 3: 实现视觉模式等待指示器
  - 新增 `addVisualLoadingIndicator()` 函数：在 `#gamePage.game-mode-visual` 下创建可见的加载指示器
  - 指示器定位在 galgame 对话栏区域或游戏页面底部居中
  - 包含加载动画（spinner 或 typing dots）+ 实时计时文本
  - 复用现有 `_replyStartTime`、`_firstChunkTime`、`_updateElapsedChip`、`_stopElapsedChip` 逻辑
  - 修改 `addTypingIndicator()`（L19664）：检测 `#gamePage` 是否有 `game-mode-visual` 类，如有则调用 `addVisualLoadingIndicator()` 而非默认行为
  - 修改 `removeTypingIndicator()`（L19695）：同步移除视觉模式指示器
  - 新增 CSS：`.visual-loading-indicator` 样式（深色半透明背景、白色文字、加载动画）
  - 验证：视觉模式下发送消息后能看到加载指示器和计时

- [x] Task 4: 优化游玩界面视觉样式
  - 修改 `styles.css` L5990 `.msg-narration .msg-content`：
    - 移除 `font-style: italic`
    - 背景 `rgba(42,24,16,0.35)` → `rgba(0,0,0,0.65)`
    - 新增 `backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px);`
    - 文字颜色 `rgba(200,184,154,0.85)` → `rgba(245,230,211,0.95)`
    - 增强 `text-shadow: 0 1px 4px rgba(0,0,0,0.6)`
  - 修改 `styles.css` L5896 `.msg-npc .msg-content`：
    - 背景 `var(--theme-card-bg)` → `rgba(0,0,0,0.6)`（或保留 card-bg 但加深）
    - `backdrop-filter: blur(6px)` → `blur(10px)`
  - 修改 `styles.css` L2096 `.game-header`：
    - `background: transparent` → `background: rgba(0,0,0,0.85)`
  - 修改 `styles.css` L2634 `.game-input-area`：
    - `background: transparent` → `background: rgba(0,0,0,0.85)`
  - 验证：视觉模式和纯文本模式下消息区背景清晰可读、上下栏为纯黑、旁白字体不倾斜

- [x] Task 5: 端到端验证
  - 语法检查：index.html 无 SyntaxError，game-chapters.js node --check 通过
  - 旁白样式验证：font-style: normal（非 italic），color: rgba(245,230,211,0.95)，background: rgba(0,0,0,0.65)，backdrop-filter: blur(8px) saturate(140%)
  - NPC 消息样式验证：background: rgba(0,0,0,0.6)，backdrop-filter: blur(10px) saturate(140%)
  - 上下栏背景验证：game-header 和 game-input-area 均为 rgba(0,0,0,0.85) 纯黑半透明
  - 视觉模式等待指示器验证：display:flex, position:fixed, z-index:9999, visibility:visible
  - removeTypingIndicator 正确移除视觉指示器和 chip 元素
  - parseNPCMessageContent null 守卫验证：null/undefined/空字符串均返回 []，不崩溃
  - _buildApiMessages 健壮性验证：正常情况和 null content 情况下均不崩溃，null content 回退为空字符串
  - 游戏成功启动验证：gamePage display:flex, chatEngine 初始化，4 个 NPC 正确加载
  - 移动端 360px 无水平溢出验证通过
  - 实际两轮对话测试通过：第一轮 AI 回复 337 字符（旁白+【林深】对话），第二轮 AI 回复 209 字符（【林深】对话），均无报错

# Task Dependencies
- Task 2 依赖 Task 1（先加 try-catch 防崩溃，再排查根因）
- Task 3 独立，可与 Task 1-2 并行
- Task 4 独立，可与 Task 1-3 并行
- Task 5 依赖 Task 1-4 全部完成
