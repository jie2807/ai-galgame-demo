# 修复 Lorebook 未定义函数调用导致 AI 连接失败 Spec

## Why

在之前的"深度瘦身"操作（`deep-slim-project-resources-and-code` spec）中，`queryLorebookWithPositions`、`queryLorebook`、`queryLorebookRecursive` 三个函数被作为"死代码"删除。但 `queryLorebookWithPositions` 的调用点（[index.html:11423](file:///d:/BC/ai_resume/qmzz/index.html#L11423)）未被同步移除。

这导致 `SCE.prototype.sendMessage`（玩家发送消息的主路径）在调用 `fetch` 之前，于 `_buildApiMessages` → `_buildSystemPrompt` → `queryLorebookWithPositions` 处同步抛出 `ReferenceError`。

### 调查验证（2026-06-30）

通过 Playwright 浏览器实测确认：
1. **官方 API 完全可达**：从浏览器 `fetch` 调用 `https://apihub.agnes-ai.com/v1/chat/completions` 返回 200 OK，流式 SSE 正常
2. **`queryLorebookWithPositions` = undefined**：`typeof queryLorebookWithPositions` 返回 `"undefined"`
3. **`gameWorldInfo` 有 16 条数据**：官方剧本加载后 `gameWorldInfo.length === 16`，必定触发第 11423 行的调用
4. **CORS 不是问题**：从 `file://` 和 `http://` 协议均能成功调用 API

**结论**：用户说的"连接不上对应的 AI"不是网络问题，而是 `queryLorebookWithPositions` 在 `fetch` 之前就抛出 `ReferenceError`，导致请求从未发出。用户体感为"等待很久都没有反馈"。

**错误链**：
1. ReferenceError 在 `fetch` 之前同步抛出 → 网络请求从未发出
2. fetch 的 `.catch` 捕获不到同步错误
3. 调用方（[index.html:26521](file:///d:/BC/ai_resume/qmzz/index.html#L26521)）无 try/catch
4. `addTypingIndicator()` 已执行但 `removeTypingIndicator()` 永远不会执行
5. 输入框 `disabled = true` 永远不会恢复
6. 用户看到打字指示器永远转圈 → "等待很久都没有反馈" / "连接不上 AI"

## What Changes

- **在 [index.html:11423](file:///d:/BC/ai_resume/qmzz/index.html#L11423) 处用内联实现替换 `queryLorebookWithPositions` 调用**
  - 遍历 `gameWorldInfo` 条目，对每个条目的 `keys` 数组做关键词匹配
  - 匹配命中时，返回 `{ content, position, depth }` 对象
  - `position` 取自条目的 `insertionPosition` 字段（默认 `after_char_defs`）
  - `depth` 取自条目的 `insertionDepth` 字段（默认 0）
  - 支持基本的 `selectiveLogic`（AND 逻辑：主关键词 + 次关键词都命中才触发）
  - 按 `priority` 降序排序

- **在 [index.html:26521](file:///d:/BC/ai_resume/qmzz/index.html#L26521) 调用方添加 try/catch 防御**
  - 即使未来出现类似错误，也能清理 typing indicator 和恢复输入框状态
  - 显示错误 toast 提示用户

## Impact

- Affected specs: `deep-slim-project-resources-and-code`（瘦身操作的遗留回归）
- Affected code: [index.html](file:///d:/BC/ai_resume/qmzz/index.html)
  - `_buildSystemPrompt` (L11408-L11437)：替换未定义函数调用
  - 游戏发送消息处理 (L26511-L26600)：添加 try/catch 防御

## ADDED Requirements

### Requirement: Lorebook 关键词匹配内联实现
当 `_buildSystemPrompt` 需要查询世界设定时，系统 SHALL 通过内联关键词匹配从 `gameWorldInfo` 中筛选命中的条目，而非调用已删除的 `queryLorebookWithPositions` 函数。

#### Scenario: 玩家消息包含世界设定关键词
- **WHEN** 玩家发送包含某世界设定条目关键词的消息
- **THEN** 该条目的 `content` 被注入到 system prompt 的对应位置（`insertionPosition`）

#### Scenario: 无关键词命中
- **WHEN** 玩家消息不包含任何世界设定条目的关键词
- **THEN** `_buildSystemPrompt` 正常返回（不注入任何 lore 内容），不抛出异常

#### Scenario: gameWorldInfo 为空
- **WHEN** `gameWorldInfo` 为空数组或 null
- **THEN** 跳过 lorebook 查询，`_buildSystemPrompt` 正常返回

### Requirement: 发送消息防御性错误处理
当 `chatEngine.sendMessage` 同步抛出异常时，系统 SHALL 清理 UI 状态（移除打字指示器、恢复输入框）并显示错误提示。

#### Scenario: sendMessage 同步抛出异常
- **WHEN** `chatEngine.sendMessage` 因任何原因同步抛出异常（如 _buildApiMessages 失败）
- **THEN** 移除 typing indicator，恢复输入框和发送按钮状态，显示错误 toast
- **AND** 不影响后续游戏操作（玩家可以重新输入）

## MODIFIED Requirements

### Requirement: SCE.prototype._buildSystemPrompt
`_buildSystemPrompt` 在查询世界设定时，SHALL 使用内联关键词匹配实现，而非调用外部未定义函数。匹配逻辑：
1. 将 `this._messages` 的所有 `content` 拼接为 `allText`
2. 遍历 `gameWorldInfo`，对每个有条目 `keys` 数组的条目做关键词匹配
3. 若条目有 `secondaryKeys` 和 `selectiveLogic === 'AND'`，则要求主关键词和次关键词都命中
4. 命中的条目按 `insertionPosition`（默认 `after_char_defs`）分类到对应位置数组
5. 按 `priority` 降序排序后返回
