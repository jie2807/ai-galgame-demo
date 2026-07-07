# Tasks

- [x] Task 1: 修复玩家名称注入指令中的对话分隔符污染
  - 修改 `index.html` L11496 附近 `_buildSystemPrompt` 的 `playerSection` 构造逻辑
  - 将 `请用「{玩家名称}」称呼玩家` 改为 `请用 {玩家名称} 称呼玩家`（移除 `「」`，改用纯文本空格高亮）
  - 追加明确指令：`旁白中不得用「」包裹玩家名称，「」仅用于NPC台词`
  - 验证：玩家已设置名称时系统提示词不再含 `「玩家名称」` 模式

- [x] Task 2: 统一规则示例占位符与玩家段指令
  - 修改 `index.html` L11594-11746 的 `rulesSection` 单/多 NPC 规则段
  - 将所有 "玩家角色" 占位符替换为动态变量 `_playerPlaceholder`（取值：玩家已设名称时用实际名称，否则用 "玩家角色"）
  - 涉及位置：旁白示例（"玩家角色点了点头"）、错误示例、正确示例、多角色对话示例、输入模式说明示例
  - 验证：玩家设名称后，规则示例文本中出现该名称而非 "玩家角色"

- [x] Task 3: 强化系统提示词的「」使用禁令
  - 在 `rulesSection` 单/多 NPC 两条路径的「★★★ 旁白与对话的区分规则 ★★★」段末尾追加：
    - `禁止在旁白中用「」包裹任何词语，「」仅用于NPC台词`
    - `玩家名称在旁白中以纯文本出现，不加任何引号`
  - 验证：规则文本含上述禁令

- [x] Task 4: 解析器注册玩家实际名称
  - 修改 `index.html` `isClearlyNarration`（L17370）与 `classifyAsDialogue`（L17134）
  - 新增辅助函数 `_getPlayerName()`：从 localStorage `violet_user_profile` 读取 `playerName`，非空且非 "VIOLET" 时返回
  - 在 `isClearlyNarration` 的 `charNamePattern` 构造中加入玩家名称，使以玩家名称开头的旁白触发与 NPC 名称相同的判定分支
  - 在 `classifyAsDialogue` 的 `hasThirdPerson` 检查中排除玩家名称（玩家名称出现在文本中不应减分）
  - 验证：`isClearlyNarration("李明点了点头")` 返回 true；`classifyAsDialogue("李明点了点头", null)` 返回 false

- [x] Task 5: 优化 flushSegment 无引号段落的对话兜底
  - 修改 `index.html` `flushSegment`（L17470）中 `hasNpcContext && npcId` 且 `!hasDialogueQuotes` 的分支
  - 当前逻辑：`wholeIsNarration = isClearlyNarration(trimmed)`，若 true 则整段吞为旁白
  - 改为：即使 `isClearlyNarration` 返回 true，仍用 `splitBySentences` 拆分，对每句调用 `classifyAsDialogue`；若任一句被分类为 dialogue 且该句不含强旁白标志（第三人称代词/环境词/动作动词），则对该句按 dialogue 处理
  - 保留原 `wholeIsNarration` 作为整体倾向参考，但不让它一言否决逐句分类
  - 验证：段落 "李明走了过来。你好，有什么情况？" 中 "你好，有什么情况？" 被分类为 dialogue

- [x] Task 6: 语法验证与回归测试
  - 运行 `node --check` 验证 index.html 无语法错误（通过临时提取 script 或浏览器加载）
  - 修复 `classifyAsDialogue` 短文本分支 bug：新增 `narrationActionLePattern` 匹配"了"中缀动作动词（如"走了过来""拿了起来"），并在角色名开头检查中加入玩家名称+动作动词模式
  - 用 Playwright 进入官方剧本第一章，发送一条对话，验证：
    - 旁白消息（msg-narration）与 NPC 消息（msg-npc）正确区分
    - 旁白中不含被误判为 NPC 台词的玩家名称片段
    - 旁白中不出现 `「」` 包裹的玩家名称
  - 验证移动端 360px 下消息渲染正常

# Task Dependencies
- Task 2 依赖 Task 1（共用 `_playerPlaceholder` 变量）
- Task 4 依赖 Task 1（共用 `_getPlayerName()` 辅助函数）
- Task 5 独立，可并行
- Task 6 依赖 Task 1-5 全部完成
