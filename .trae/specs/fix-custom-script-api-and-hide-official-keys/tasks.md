# Tasks

- [x] Task 1: 增强自定义剧本智能生成的 API 诊断与超时处理
  - [x] SubTask 1.1: 将 `CustomScriptGenerator.run` 中的请求超时从 120 秒缩短至 45 秒
  - [x] SubTask 1.2: 在 `callAPI` 中捕获 `TypeError`/`NetworkError` 等网络异常，并给出更具体的错误信息（区分 CORS、DNS、连接失败）
  - [x] SubTask 1.3: 在 `showError` 中增加「请确认通过 http/https 访问而非 file 协议」的引导提示
  - [x] SubTask 1.4: 验证生成失败时进度条正确变红并显示具体错误

- [x] Task 2: 确保自定义剧本游玩时 AI 能正常调用 API
  - [x] SubTask 2.1: 检查自定义剧本游玩启动逻辑，确认传入 `chatEngine` / `SimpleChatEngine` 的 API 配置来自 `getEffectiveTextModelConfig`
  - [x] SubTask 2.2: 修复可能导致 AI 不回复的配置传递问题（如 baseUrl 末尾斜杠、空 key、模型名未传递）
  - [x] SubTask 2.3: 在聊天请求失败时向玩家显示错误提示，而不是静默无响应
  - [x] SubTask 2.4: 验证官方 API 与自定义 API 均可正常触发请求

- [x] Task 3: 改造游戏页设置面板隐藏官方密钥
  - [x] SubTask 3.1: 在 `gameSettingsPanel` 的 AI 设置区域顶部添加「使用官方免费 API」按钮/状态显示
  - [x] SubTask 3.2: 实现 `isUsingOfficialModel()` 判断，官方模式下隐藏 `apiKey` 输入框并禁用 `apiBaseUrl`/`modelName` 编辑
  - [x] SubTask 3.3: 点击切换到自定义模式后显示 API 地址、密钥、模型输入框，并允许编辑保存
  - [x] SubTask 3.4: 保存时正确写入 sessionStorage / localStorage；选择官方模式时清除玩家保存的自定义配置

- [x] Task 4: 改造 Creator Wars 设置面板隐藏官方密钥
  - [x] SubTask 4.1: 在 `renderSettingsContent` 中复用官方/自定义判断逻辑，添加「使用官方免费 API」按钮/状态
  - [x] SubTask 4.2: 官方模式下不显示官方密钥，自定义模式下显示输入框
  - [x] SubTask 4.3: 保存逻辑与游戏页一致

- [x] Task 5: 回归验证
  - [x] SubTask 5.1: 验证首页模型调配面板不受影响
  - [x] SubTask 5.2: 验证游戏页设置打开/保存/切换官方与自定义模式正常
  - [x] SubTask 5.3: 验证 Creator Wars 设置打开/保存/切换官方与自定义模式正常
  - [x] SubTask 5.4: 验证自定义剧本智能生成错误提示与超时行为符合预期
  - [x] SubTask 5.5: 验证自定义剧本游玩启动后 AI 请求配置正确

# Task Dependencies

- Task 2 依赖 Task 1（共用 API 配置与错误处理改进）
- Task 4 依赖 Task 3（复用游戏页设置改造逻辑）
- Task 5 依赖 Task 1、Task 2、Task 3、Task 4
