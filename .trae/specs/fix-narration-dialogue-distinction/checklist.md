# Checklist

## 玩家名称注入修复
- [x] `index.html` L11496 的 `playerSection` 不再使用 `「」` 包裹玩家名称
- [x] 玩家已设置名称时，系统提示词明确指令「旁白中不得用「」包裹玩家名称」
- [x] 玩家未设置名称时，回退到原 `chapter.playerName` 格式，不注入额外指令

## 规则示例占位符统一
- [x] `rulesSection` 单 NPC 路径中所有 "玩家角色" 占位符替换为动态 `_playerPlaceholder`
- [x] `rulesSection` 多 NPC 路径中所有 "玩家角色" 占位符替换为动态 `_playerPlaceholder`
- [x] 玩家设名称后，规则示例文本中出现该名称（如 "李明点了点头"）
- [x] 玩家未设名称时，规则示例回退为 "玩家角色"

## 系统提示词「」禁令强化
- [x] 单 NPC 规则段的「旁白与对话区分规则」末尾含禁令：禁止在旁白中用「」包裹任何词语
- [x] 多 NPC 规则段的「旁白与对话区分规则」末尾含禁令：禁止在旁白中用「」包裹任何词语
- [x] 禁令明确「」仅用于 NPC 台词

## 解析器玩家名称识别
- [x] 新增 `_getPlayerName()` 辅助函数，从 localStorage 读取玩家名称
- [x] `isClearlyNarration` 的 `charNamePattern` 包含玩家名称，以玩家名称开头的旁白触发旁白判定分支
- [x] `classifyAsDialogue` 的 `hasThirdPerson` 检查排除玩家名称（不计为第三人称）
- [x] `classifyAsDialogue` 的角色名开头检查包含玩家名称+动作动词模式
- [x] `isClearlyNarration("李明点了点头")` 返回 true
- [x] `classifyAsDialogue("李明点了点头", null)` 返回 false
- [x] `classifyAsDialogue("李明走了过来。", null)` 返回 false（修复"了"中缀动作误判）

## flushSegment 无引号段落对话兜底
- [x] `flushSegment` 无 `「」` 段落不再一律按 `isClearlyNarration` 默认 true 吞为旁白
- [x] 无引号段落改为逐句 `classifyAsDialogue` 分类
- [x] 段落 "李明走了过来。你好，有什么情况？" 中 "你好，有什么情况？" 被分类为 dialogue
- [x] 纯旁白段落（如 "阳光透过窗户洒在桌面上"）仍被正确分类为 narration

## "了"中缀动作模式修复（Task 6 新增）
- [x] 新增 `narrationActionLePattern` 匹配"了"中缀动作动词（如"走了过来""拿了起来""转了身"）
- [x] `classifyAsDialogue` 短文本分支同步检查新模式
- [x] `endsWithExclaim` 检查排除新模式匹配的文本
- [x] "李明走了过去/拿了起来/转了身/笑了笑/想了想/停了下来/退了后" 均返回 false（旁白）
- [x] "林深走了过来"（NPC名+了中缀动作）返回 false（旁白）

## 语法与回归验证
- [x] index.html 无语法错误（浏览器加载成功，无 SyntaxError）
- [x] Playwright 单元测试：7 组 parseNPCMessageContent 测试全部通过
- [x] 真实 AI 回复端到端测试：4 段内容（2 旁白 + 2 对话）正确区分
- [x] 旁白中不含被误判为 NPC 台词的玩家名称片段
- [x] 旁白中不出现「」包裹的玩家名称
- [x] 移动端 360px 下消息渲染正常，无水平溢出
