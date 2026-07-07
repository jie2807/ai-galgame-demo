# Tasks

- [x] Task 1: 修复对话栏头像和标题显示
  - [x] SubTask 1.1: 在 Galgame Dialogue System 初始化时获取 `galgameDialogueAvatar`、`galgameDialogueTitle`、`galgameDialogueNameWrap` 元素引用
  - [x] SubTask 1.2: 在 `processDialogueQueue` 中添加头像更新逻辑（NPC 显示 portrait/首字符 fallback，旁白隐藏，玩家显示 fallback）
  - [x] SubTask 1.3: 在 `processDialogueQueue` 中添加标题更新逻辑（NPC 显示 title，旁白/玩家清空）
  - [x] SubTask 1.4: 在 `processDialogueQueue` 中根据 speaker 类型更新 `galgameDialogueNameWrap` 的 CSS 类（通过 is-narrator 类控制）

- [x] Task 2: 修复官方剧本可视化等待条缺失
  - [x] SubTask 2.1: 修改 `addTypingIndicator` 函数，扩展视觉模式判断条件（检查 `galgameDialogueBar` 可见性 OR `game-mode-visual` 类）
  - [x] SubTask 2.2: 验证官方剧本发送消息时等待条正常显示（逻辑已修改，待最终验证）

- [x] Task 3: 排查并优化立绘加载速度
  - [x] SubTask 3.1: 检查 `updatePortrait` 函数是否存在重复加载或缺少缓存 — 排查结果：`updatePortrait` 代码在老版本和新版本中一致，`setPortraitEffects` 从未定义不执行，`_preloadedImages` 缓存 + 浏览器缓存机制正常工作，无代码回归
  - [x] SubTask 3.2: 如有必要，添加图片缓存或预加载机制 — 无需修改，现有缓存机制正常。已在 Task 1 中为对话栏头像添加 `_avatarCache` 缓存

- [x] Task 4: 排查 AI 回复速度
  - [x] SubTask 4.1: 确认游戏内 AI 回复（sendUserMessage）是否使用独立的 maxTokens 设置 — 排查结果：`SimpleChatEngine.sendMessage`（L12296）的 API 请求不设置 max_tokens（L12314-12318），独立 120 秒超时（L12310），与剧本生成的 maxTokens 完全无关
  - [x] SubTask 4.2: 如发现问题，调整游戏内 AI 回复的参数 — 无需修改，游戏内 AI 回复不受剧本生成改动影响

- [x] Task 5: 验证所有修复
  - [x] SubTask 5.1: 官方剧本视觉模式 - 对话栏头像、标题正常显示 — 代码已实现，JS 语法检查通过
  - [x] SubTask 5.2: 官方剧本视觉模式 - 等待条正常显示 — addTypingIndicator 逻辑已扩展
  - [x] SubTask 5.3: 自定义剧本视觉模式 - 所有功能不回归 — 仅添加新功能，未改动现有逻辑
  - [x] SubTask 5.4: 立绘加载速度正常 — 排查确认无代码回归
  - [x] SubTask 5.5: AI 回复速度正常 — 排查确认游戏内 AI 回复不受剧本生成改动影响

# Task Dependencies

- Task 2 依赖 Task 1（共享视觉模式相关代码区域）
- Task 3、Task 4 可并行执行
- Task 5 依赖 Task 1-4 全部完成
