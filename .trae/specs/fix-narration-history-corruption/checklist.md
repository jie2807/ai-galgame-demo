# Checklist

## _buildApiMessages 修复验证
- [x] `index.html` L11999-12024 不再对 assistant 消息整段加 `角色名：` 或 `【角色名】` 前缀
- [x] 改为调用 `parseNPCMessageContent` 拆分 assistant 消息为 narration/dialogue parts
- [x] narration parts 在重建内容中以纯文本出现（无标签、无前缀）
- [x] dialogue parts 在单 NPC 模式下以 `「content」` 格式出现
- [x] dialogue parts 在多 NPC 模式下以 `【NPC名】「content」` 格式出现
- [x] parts 之间以 `\n\n` 连接
- [x] `parseNPCMessageContent` 返回空数组时回退为原始 `m.content`（不加前缀）
- [x] 重建后仍为单条 `{ role: 'assistant', content: ... }` 消息

## 格式一致性验证
- [x] 重建后的 assistant 消息格式与系统提示词单 NPC 规则段期望的格式一致
- [x] 重建后的 assistant 消息格式与系统提示词多 NPC 规则段期望的格式一致
- [x] 不再出现 `林深：` 冒号格式（系统提示词明确禁止）
- [x] 多 NPC 模式下旁白不再被加 `【角色名】` 标签（违反规则 3）

## 语法与回归测试
- [x] index.html 无语法错误（浏览器加载成功，无 SyntaxError）
- [x] Playwright 端到端：进入官方剧本第一章，chatEngine 正确初始化（4 NPC，isMultiNpc=true）
- [x] Playwright 端到端：真实 assistant 消息（无「」的纯旁白）被正确重建为纯文本（无前缀）
- [x] Playwright 单元测试：多 NPC 模式下混合内容（旁白+【林深】对话+旁白+【苏晴】对话）正确重建
  - 旁白段为纯文本，无 `【林深】` 标签
  - 对话段保留 `【林深】「...」` 和 `【苏晴】「...」` 格式
  - 无 `林深：` 冒号前缀
- [x] Playwright 单元测试：单 NPC 模式（_manualNpcLock=true）下混合内容正确重建
  - 旁白段为纯文本
  - 对话段为 `「...」` 格式（无 NPC 标签）
  - 无 `林深：` 冒号前缀
- [x] Playwright 单元测试：边界用例（空内容、纯空白、纯旁白无「」、纯对话）全部正确
- [x] 移动端 360px 下页面渲染正常，无水平溢出（bodyScrollWidth=360=innerWidth）
