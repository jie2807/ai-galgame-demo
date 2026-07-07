# 修复游戏等待指示器可见性 + AI 响应慢/报错 + 游玩界面视觉优化 Spec

## Why
1. **等待指示器在视觉模式下不可见**：`addTypingIndicator()` 将 typing indicator（含 `.msg-elapsed-chip` 计时器）添加到 `#dialogueMessages`，但视觉模式（`game-mode-visual`）下 `#dialogueMessages` 被 `display: none !important` 隐藏（styles.css L10342-10347）。玩家在视觉模式等待 AI 回复时看不到任何计时或加载指示，体验上"干等无底"。
2. **AI 响应变慢且第二轮报错**：上一轮 `_buildApiMessages` 重构后（L11999-12024），玩家反馈第一轮回复明显变慢、第二轮直接报错。需排查根因——可能是 `parseNPCMessageContent` 在特定输入下抛异常导致 `_buildApiMessages` 崩溃（该调用无 try-catch 包裹），也可能是 API 请求格式/上下文长度/速率限制问题。
3. **游玩界面美术样式不佳**：
   - 消息区背景模糊透明度太低（`.msg-narration .msg-content` 的 `rgba(42,24,16,0.35)` 和 `.msg-npc .msg-content` 的 `backdrop-filter: blur(6px)`），文字辨识度差，参考「重返未来1999」的深色高对比设计
   - 旁白字体使用了 `font-style: italic`（styles.css L5992），导致文字倾斜且不够清晰
   - 上下两栏（`.game-header` / `.game-input-area`）透出 `--theme-bg: #1a1a2e` 的深蓝色调，用户要求改为纯黑

## What Changes

### 变更 1：视觉模式等待指示器
- 在视觉模式（`game-mode-visual`）下，于 galgame 对话栏（`.galgame-dialogue-bar`）或游戏页面可见区域显示等待指示器
- 指示器包含：加载动画 + 实时计时（"等待首字... X.Xs" / "首字 X.Xs · 总 X.Xs"）
- 修改 `addTypingIndicator()` 使其在视觉模式下将指示器添加到可见位置（而非被隐藏的 `#dialogueMessages`）
- 或新增 `addVisualModeLoadingIndicator()` 函数，在视觉模式下独立显示加载状态
- 保持纯文本模式（`game-mode-text`）现有行为不变（typing indicator 在 `#dialogueMessages` 中正常显示）

### 变更 2：排查并修复 AI 响应慢/第二轮报错
- 在 `_buildApiMessages` 中 `parseNPCMessageContent` 调用外层包裹 try-catch，解析失败时回退为原始 `m.content`（不加前缀），避免函数崩溃
- 在 `sendMessage`（L12102-12184）的 `_buildApiMessages()` 调用处增加 try-catch，捕获构建消息时的异常，通过 `onError` 回调传递给 UI
- 排查 `parseNPCMessageContent` 在特定 AI 回复内容下是否存在死循环、正则灾难性回溯或异常抛出
- 排查 API 请求是否因上下文过长、速率限制或格式问题导致第二轮报错（检查 HTTP 状态码和错误消息）
- 如发现 `_buildApiMessages` 重构引入的性能问题（如对每条历史消息重复调用 `parseNPCMessageContent`），考虑缓存或简化

### 变更 3：游玩界面视觉优化
- **消息区背景透明度提升**：
  - `.msg-narration .msg-content`：背景从 `rgba(42,24,16,0.35)` 提升至 `rgba(0,0,0,0.65)` 左右，增加 `backdrop-filter: blur(8px)`，参考重返未来1999的深色半透明面板
  - `.msg-npc .msg-content`：背景从 `var(--theme-card-bg)`(#16213e) 调整为更深的黑色调（如 `rgba(0,0,0,0.6)`），`backdrop-filter` 从 `blur(6px)` 提升至 `blur(10px)`
- **旁白字体修复**：
  - 移除 `.msg-narration .msg-content` 的 `font-style: italic`（styles.css L5992）
  - 提升文字颜色对比度：从 `rgba(200,184,154,0.85)` 调整为 `rgba(245,230,211,0.95)` 或纯白偏暖色
  - 增强 `text-shadow` 以提升清晰度
- **上下栏背景改为纯黑**：
  - `.game-header`：从 `background: transparent` 改为 `background: rgba(0,0,0,0.85)` 或 `#000`
  - `.game-input-area`：从 `background: transparent` 改为 `background: rgba(0,0,0,0.85)` 或 `#000`
  - 或修改 `.game-bg-gradient` 的 `--theme-bg` 值（但需注意此变量可能影响其他区域，优先使用栏自身背景色覆盖）

## Impact
- Affected specs: `add-timer-fallback-portrait-doomsday`（变更 1 补全了视觉模式下耗时指示器的缺失）, `fix-narration-history-corruption`（变更 2 修复了该 spec 引入的潜在崩溃风险）
- Affected code:
  - `index.html`：`addTypingIndicator()`(L19664)、`sendUserMessage()`(L26480+)、`_buildApiMessages()`(L11926+)、`sendMessage()`(L12102+)
  - `styles.css`：`.msg-narration .msg-content`(L5990)、`.msg-npc .msg-content`(L5896)、`.game-header`(L2096)、`.game-input-area`(L2634)、`.msg-elapsed-chip`(L6097)
  - 可能涉及 `.galgame-dialogue-bar` 相关样式（视觉模式等待指示器）

## ADDED Requirements

### Requirement: 视觉模式等待指示器
系统 SHALL 在视觉模式（`game-mode-visual`）下，用户发送消息后、AI 回复上屏前，于游戏页面可见区域显示加载指示器与实时计时。

#### Scenario: 视觉模式下发送消息后显示加载指示器
- **WHEN** 视觉模式下用户点击发送或按回车发送消息
- **THEN** 在 galgame 对话栏或游戏页面可见区域出现加载指示器
- **THEN** 指示器包含加载动画和实时计时（"等待首字... X.Xs"）
- **THEN** 计时每 200ms 刷新一次

#### Scenario: 视觉模式下首字到达
- **WHEN** `onChunk` 第一次被回调
- **THEN** 指示器切换显示为"首字 X.Xs · 总 X.Xs"
- **THEN** "总耗时"持续累加刷新直到 `onComplete`

#### Scenario: 视觉模式下回复完成
- **WHEN** `onComplete` 被回调
- **THEN** 指示器停止累加，定格显示最终耗时
- **THEN** 800ms 后指示器淡出，AI 回复开始上屏

#### Scenario: 视觉模式下 AI 出错
- **WHEN** `onError` 被回调或超时
- **THEN** 指示器停止累加，显示"错误"或"超时 X.Xs"
- **THEN** 指示器颜色变红，800ms 后淡出

### Requirement: _buildApiMessages 健壮性
`_buildApiMessages` SHALL 在 `parseNPCMessageContent` 调用抛出异常时优雅降级，回退为发送原始 `m.content`，不崩溃整个消息构建流程。

#### Scenario: parseNPCMessageContent 抛出异常
- **WHEN** `parseNPCMessageContent(m.content, defaultNpcId)` 抛出异常
- **THEN** 该条 assistant 消息回退为 `{ role: 'assistant', content: m.content }`（不加前缀）
- **THEN** 其余消息正常构建
- **THEN** `_buildApiMessages` 正常返回 apiMsgs 数组，不抛出异常

#### Scenario: sendMessage 捕获 _buildApiMessages 异常
- **WHEN** `_buildApiMessages()` 抛出异常
- **THEN** `sendMessage` 通过 try-catch 捕获异常
- **THEN** 通过 `onError` 回调传递错误信息给 UI
- **THEN** 显示错误提示而非静默失败

### Requirement: 消息区背景高对比可读性
消息内容区背景 SHALL 具备足够的不透明度和模糊度，确保在任意背景图上文字均可清晰阅读，参考「重返未来1999」的深色高对比面板设计。

#### Scenario: 旁白消息背景
- **WHEN** 渲染 `.msg-narration .msg-content`
- **THEN** 背景为深色半透明（alpha ≥ 0.6）
- **THEN** 具有 `backdrop-filter: blur(≥8px)` 毛玻璃效果
- **THEN** 文字颜色对比度足够（不使用 italic）

#### Scenario: NPC 对话消息背景
- **WHEN** 渲染 `.msg-npc .msg-content`
- **THEN** 背景为深色半透明（alpha ≥ 0.6）
- **THEN** 具有 `backdrop-filter: blur(≥10px)` 毛玻璃效果

### Requirement: 上下栏纯黑背景
游戏页面顶部栏和底部输入栏 SHALL 使用纯黑（或近纯黑）背景，不透出深蓝色调。

#### Scenario: 顶部栏背景
- **WHEN** 渲染 `.game-header`
- **THEN** 背景为 `rgba(0,0,0,0.85)` 或更深
- **THEN** 不透出 `--theme-bg` 的深蓝色

#### Scenario: 底部输入栏背景
- **WHEN** 渲染 `.game-input-area`
- **THEN** 背景为 `rgba(0,0,0,0.85)` 或更深
- **THEN** 不透出 `--theme-bg` 的深蓝色

## MODIFIED Requirements

### Requirement: typing indicator 可见性
原 typing indicator 仅在 `#dialogueMessages` 中显示，视觉模式下该容器被隐藏导致指示器不可见。
**修改后**：视觉模式下在可见区域（galgame 对话栏或全屏覆盖层）显示等待指示器；纯文本模式保持现有行为。

### Requirement: 旁白消息样式
原旁白消息使用 `font-style: italic` 和低透明度背景。
**修改后**：移除 italic，提升背景不透明度和模糊度，提升文字颜色对比度。

### Requirement: 上下栏背景
原上下栏 `background: transparent`，透出 `--theme-bg: #1a1a2e` 深蓝色。
**修改后**：上下栏使用纯黑（或近纯黑）背景，不再透出深蓝色。

## REMOVED Requirements
无
