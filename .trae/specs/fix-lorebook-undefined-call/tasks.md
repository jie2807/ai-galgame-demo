# Tasks

- [x] Task 1: 用内联实现替换 `queryLorebookWithPositions` 调用
  - 修改 [index.html:11423](file:///d:/BC/ai_resume/qmzz/index.html#L11423) 处的 `var loreEntries = queryLorebookWithPositions(allText, this._messages);`
  - 替换为内联关键词匹配实现：
    - 遍历 `gameWorldInfo` 条目
    - 对每个条目的 `keys` 数组做 `allText.indexOf(key) >= 0` 匹配
    - 若有 `secondaryKeys` 且 `selectiveLogic === 'AND'`，要求次关键词也命中
    - 命中时构造 `{ content: wi.content, position: wi.insertionPosition || 'after_char_defs', depth: wi.insertionDepth || 0 }`
    - 按 `priority` 降序排序
  - 验证：Grep 确认 `queryLorebookWithPositions` 不再被调用 ✓

- [x] Task 2: 在游戏发送消息处添加 try/catch 防御
  - 修改 [index.html:26547](file:///d:/BC/ai_resume/qmzz/index.html#L26547) 附近的 `chatEngine.sendMessage(...)` 调用
  - 用 try/catch 包裹整个 `chatEngine.sendMessage(...)` 调用块
  - catch 块中：
    - `removeTypingIndicator()`
    - 恢复 `gameInput.disabled = false` 和 `gameSendBtn.disabled = false`
    - `showErrorToast('发送消息失败：' + e.message)`
    - `_isCancelling = false`
  - 验证：读取修改后的代码，确认有 try/catch 包裹 ✓

# Task Dependencies

- Task 1 和 Task 2 相互独立，已顺序实施完成
- Task 1 是核心修复（解决根因）✓
- Task 2 是防御性加固（防止类似问题再次导致卡死）✓
