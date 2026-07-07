# Tasks

- [x] Task 1: 修复游玩模式移动端布局重叠
  - [x] SubTask 1.1: 审查并整理游戏页核心容器（galgame-container、dialogue-area、input-area、portrait-area）的 z-index 与定位
  - [x] SubTask 1.2: 在 480px/360px/320px 断点下重新计算立绘区、对话区、输入框的高度与间距
  - [x] SubTask 1.3: 确保输入框与发送按钮 ≥44×44px，软键盘弹出时输入框可见
  - [x] SubTask 1.4: 修复快捷菜单/设置面板在小屏下可能遮挡输入框或关闭按钮不可触达的问题
  - [x] SubTask 1.5: 使用浏览器 DevTools 模拟 iPhone SE / 375×667 验证无重叠

- [x] Task 2: 确保角色说话时立绘正确显示
  - [x] SubTask 2.1: 检查 `addNPCMessage()` 与对话系统，确保 NPC 发送消息时正确触发 `updatePortrait(npcId)`
  - [x] SubTask 2.2: 在 `loadNPCModel()` 成功后设置 `galgamePortraitCanvas` 可见；图片加载完成后设置 `galgamePortraitImage` 可见
  - [x] SubTask 2.3: 处理模型/图片加载失败时显示 placeholder，不阻塞对话流程
  - [x] SubTask 2.4: 验证 `switchNPC` 时旧立绘隐藏、新立绘显示
  - [x] SubTask 2.5: 在浏览器中验证 NPC firstMessage 触发时立绘立即显示

- [x] Task 3: 提升立绘选择面板 Level 2D 预览稳定性
  - [x] SubTask 3.1: 将 Level 2D 预览逻辑抽取为独立函数，每个卡片使用独立的 PIXI.Application
  - [x] SubTask 3.2: 为单个卡片加载添加 try/catch，失败时显示占位并 console.warn
  - [x] SubTask 3.3: 限制同时渲染的 Level 2D 预览数量（建议 ≤6），超出部分显示占位
  - [x] SubTask 3.4: 验证 z16 等 CDN 模型预览失败时面板不崩溃、其他卡片正常

- [x] Task 4: 区分游玩界面旁白与说话
  - [x] SubTask 4.1: 为 `addNarrationMessage()` 生成消息 DOM 添加 `msg-narration-style` 类名与 CSS
  - [x] SubTask 4.2: 为 `addNPCMessage()` 生成消息 DOM 添加 `msg-npc-style` 类名与 CSS
  - [x] SubTask 4.3: 为玩家消息添加 `msg-player-style` 类名与 CSS（如当前无独立函数，定位对应渲染点）
  - [x] SubTask 4.4: 修改 `showGalgameDialogue()` / `processDialogueQueue()`，旁白进入顶部对话条时隐藏名称并添加叙述样式
  - [x] SubTask 4.5: 补充 CSS：旁白居中/弱化、NPC 左侧气泡、玩家右侧气泡，颜色与对齐区分明显
  - [x] SubTask 4.6: 在浏览器中验证开场旁白、NPC firstMessage、玩家输入三种状态视觉差异清晰

# Task Dependencies

- Task 2 与 Task 1 可并行（角色说话时显示立绘不依赖开场布局）
- Task 3 与 Task 1/2/4 可并行
- Task 4 依赖 Task 1（对话区布局正确后再调整样式）
