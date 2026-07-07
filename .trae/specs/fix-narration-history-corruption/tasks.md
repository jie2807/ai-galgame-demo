# Tasks

- [x] Task 1: 重构 `_buildApiMessages` 中 assistant 消息格式化逻辑
  - 修改 `index.html` L11999-12005 的 `else` 分支（`type !== 'narration'` 的 assistant 消息）
  - 不再对整段 `m.content` 加 `【角色名】` 或 `角色名：` 前缀
  - 改为调用 `parseNPCMessageContent(m.content, m.character || this._npcId)` 拆分为 parts
  - 遍历 parts 重建内容：
    - narration part → 纯文本 `part.content`
    - dialogue part → 单 NPC 模式：`「part.content」`；多 NPC 模式：`【角色名】「part.content」`
  - parts 间以 `\n\n` 连接
  - parts 为空时回退为原始 `m.content`（不加前缀）
  - 保持单条 `{ role: 'assistant', content: <重建内容> }` 结构
  - 参考实现：`buildBookApiMessages`（L28970-28980）中已有的 `parseNPCMessageContent` + 分别格式化逻辑
  - 注意：`parseNPCMessageContent` 内部读取全局 `chatEngine._allNpcIds` 和 `chatEngine._manualNpcLock`；在 `_buildApiMessages` 内 `this === chatEngine`（全局实例），所以可直接调用

- [x] Task 2: 语法验证与回归测试
  - 用浏览器加载 index.html，确认无 SyntaxError
  - 用 Playwright 进入官方剧本第一章，chatEngine 正确初始化（4 NPC, isMultiNpc=true）
  - 验证真实 assistant 消息（纯旁白无「」）被正确重建为纯文本（无 `林深：` 或 `【林深】` 前缀）
  - 验证多 NPC 模式：混合内容（旁白+【林深】对话+旁白+【苏晴】对话）正确重建，旁白纯文本、对话保留【NPC名】「」格式
  - 验证单 NPC 模式（_manualNpcLock=true）：混合内容正确重建，旁白纯文本、对话为「」格式（无 NPC 标签）
  - 验证边界用例：空内容、纯空白、纯旁白、纯对话均正确处理（无前缀添加）
  - 验证移动端 360px 下渲染正常，无水平溢出

# Task Dependencies
- Task 2 依赖 Task 1 完成
