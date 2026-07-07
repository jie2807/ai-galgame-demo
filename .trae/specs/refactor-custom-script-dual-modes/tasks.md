# 自定义剧本双模式改造 - 任务列表

## 任务依赖关系

- Task 1 与 Task 2 可并行开始。
- Task 3 依赖 Task 1（需要先确定模式选择后再启动对应 UI）。
- Task 4 依赖 Task 1（需要先确定模式选择后再渲染对应 UI）。
- Task 5 依赖 Task 3 与 Task 4。
- Task 6 依赖 Task 5。

## 任务列表

- [x] Task 1: 新增自定义剧本模式选择弹窗
  - **目标**: 点击首页「自定义剧本」后，先弹出两个模式选项，再进入后续流程。
  - **步骤**:
    - [ ] 1.1 在 `index.html` 中新增 `customModeSelector` 弹窗 HTML，包含「游玩模式」与「纯文本模式」两个选项卡片。
    - [ ] 1.2 为两个选项添加图标、描述文案与横/竖屏提示。
    - [ ] 1.3 在 `styles.css` 或 `custom-chapter.css` 中添加弹窗样式，保持与现有模式选择器视觉一致。
    - [ ] 1.4 修改 `modeCustom` 点击事件：关闭主模式选择器后打开自定义模式选择弹窗。
    - [ ] 1.5 实现选择后的回调：记录 `selectedCustomMode`（`'visual'` / `'text'`），再进入剧本列表或编辑器。
    - [ ] 1.6 验证：点击「自定义剧本」后弹窗正常显示，两个选项可点击，返回/遮罩关闭行为正确。
  - **验证**: 浏览器中点击「自定义剧本」，出现模式选择弹窗；选择后能正确记录模式。

- [x] Task 2: 重构自定义剧本数据初始化与状态隔离
  - **目标**: 让自定义剧本不再覆盖官方章节，数据彼此隔离，并移除 sessionStorage 临时配置。
  - **步骤**:
    - [ ] 2.1 新增 `prepareCustomScript(config)` 函数：统一解析 `metadata`、`characters.npcs`、`worldSettings`、`items`、`events` 等字段。
    - [ ] 2.2 自定义章节 id 改为 `custom_<scriptId>`，不再使用固定 `id=2`；通过 `isCustom: true` 标识自定义章节。
    - [ ] 2.3 自定义 NPC 注册时使用前缀（如 `custom_<scriptId>_<npcIndex>`）或独立 map，避免覆盖 `gameCharacters` 中的官方角色。
    - [ ] 2.4 在启动自定义剧本前保存原始官方状态快照，退出自定义剧本后恢复官方状态。
    - [ ] 2.5 移除 `sessionStorage.custom_game_config` 的写入/读取；`startCustomGameFromConfig` 直接使用传入的 `config` 对象。
    - [ ] 2.6 调整存档恢复逻辑：读取 `customConfigSnapshot` 后同样通过 `prepareCustomScript` 初始化。
    - [ ] 2.7 验证：连续游玩两个不同自定义剧本，再回到官方剧本，官方剧本数据不被污染。
  - **验证**: 创建两个自定义剧本并分别游玩，官方剧本仍能正常开始；存档加载后自定义状态正确恢复。

- [x] Task 3: 实现游玩模式横屏锁定与旋转提示
  - **目标**: 视觉游玩模式强制横屏，竖屏时给出明确引导。
  - **步骤**:
    - [ ] 3.1 在进入游玩模式时调用 `screen.orientation.lock('landscape')`，使用 try/catch 处理不支持的环境。
    - [ ] 3.2 新增 `rotatePrompt` 遮罩层，当视口处于 portrait 且处于游玩模式时显示。
    - [ ] 3.3 监听 `resize` / `orientationchange` 事件，当设备旋转到 landscape 后自动隐藏提示。
    - [ ] 3.4 退出游戏或切换到纯文本模式时调用 `screen.orientation.unlock()`（如果支持）。
    - [ ] 3.5 在桌面端跳过锁定，仅保留横屏优先的 CSS 布局。
    - [ ] 3.6 验证：手机浏览器进入游玩模式时提示旋转，旋转后提示消失；桌面端无异常。
  - **验证**: 真机或 DevTools 模拟手机，检查 orientation lock 与旋转提示行为。

- [x] Task 4: 实现纯文本模式 UI
  - **目标**: 提供适合竖屏的全文本聊天记录界面。
  - **步骤**:
    - [ ] 4.1 在 `gamePage` 上新增模式类名 `game-mode-text`，通过 CSS 隐藏 `.galgame-char-layer`、`.galgame-bg-layer`、`.galgame-dialogue-bar`。
    - [ ] 4.2 将原本隐藏的 `#dialogueMessages` 在文本模式下显示为全屏滚动消息列表，覆盖 `game-content-area`。
    - [ ] 4.3 调整文本模式下消息气泡的间距、字体大小与头像尺寸，使其适合竖屏阅读。
    - [ ] 4.4 保留顶部状态栏与输入区，但缩小顶部按钮，避免占用过多竖屏空间。
    - [ ] 4.5 文本模式下禁用 Live2D 模型加载与背景切换，减少性能开销。
    - [ ] 4.6 验证：进入纯文本模式后，消息可正常追加、滚动到底部，快速回复按钮可见且可点击。
  - **验证**: 在竖屏与横屏下分别进入纯文本模式，检查布局、滚动、输入、消息渲染是否正常。

- [x] Task 5: 统一自定义剧本入口与启动流程
  - **目标**: 所有自定义剧本的「开始游玩」都走同一套初始化，并根据模式标志渲染对应 UI。
  - **步骤**:
    - [ ] 5.1 在 `startCustomGameFromConfig(config)` 中调用 `prepareCustomScript(config)`，然后将 `customMode` 写入全局游戏状态。
    - [ ] 5.2 根据 `customMode` 为 `gamePage` 添加 `game-mode-visual` 或 `game-mode-text` 类名。
    - [ ] 5.3 修改剧本列表卡片「开始游玩」按钮：使用当前选择的模式启动剧本（若未选择则默认 `visual`）。
    - [ ] 5.4 修改编辑器「开始游玩」按钮：同样使用当前选择的模式启动剧本。
    - [ ] 5.5 新增/编辑剧本保存后返回列表时，保留用户已选的模式。
    - [ ] 5.6 验证：从模式选择器、剧本列表、编辑器三个入口进入游戏，模式均正确。
  - **验证**: 分别在三种入口启动自定义剧本，确认 UI 模式与预期一致。

- [x] Task 6: 回归测试与问题修复
  - **目标**: 确保改造后自定义剧本与官方剧本都不出现 regression。
  - **步骤**:
    - [ ] 6.1 测试官方剧本（人民之弈 / 贵族之弈 / 王冠之弈）仍能正常开始与返回。
    - [ ] 6.2 测试自定义剧本在游玩模式下横屏锁定、Live2D、背景、对话框正常。
    - [ ] 6.3 测试自定义剧本在纯文本模式下竖屏阅读、消息滚动、快速回复正常。
    - [ ] 6.4 测试自定义剧本保存、加载、编辑、复制、删除功能正常。
    - [ ] 6.5 测试存档：在自定义剧本中存档，刷新页面后加载存档，模式与进度一致。
    - [ ] 6.6 修复测试中发现的问题。
  - **验证**: 所有测试场景通过，无严重 bug。

# Task Dependencies

- Task 3 依赖 Task 1
- Task 4 依赖 Task 1
- Task 5 依赖 Task 2、Task 3、Task 4
- Task 6 依赖 Task 5

# Parallelizable Work

- Task 1 与 Task 2 可并行开发。
- Task 3 与 Task 4 在 Task 1 完成后可并行开发。
