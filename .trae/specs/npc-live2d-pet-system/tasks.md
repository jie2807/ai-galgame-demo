# Tasks

- [x] Task 1: 创建角色立绘区域 HTML 结构和 CSS 布局
  - [x] SubTask 1.1: 在 gamePage 中添加左侧立绘容器 div（id: gameCharacterArea, characterPortrait）
  - [x] SubTask 1.2: 调整 game-dialogue-area 布局为右侧区域（占 70% 宽度）
  - [x] SubTask 1.3: 编写响应式 CSS 样式，支持桌面和移动端布局
  - [x] SubTask 1.4: 添加立绘区域 loading 状态和错误提示 UI

- [x] Task 2: 引入 pixi.js 和 pixi-live2d-display 库
  - [x] SubTask 2.1: 在 index.html 中通过 CDN 引入 pixi.js v6.x
  - [x] SubTask 2.2: 在 index.html 中通过 CDN 引入 pixi-live2d-display
  - [x] SubTask 2.3: 添加库加载状态检测和错误处理

- [x] Task 3: 实现 Live2D 模型加载器
  - [x] SubTask 3.1: 创建 Live2DRenderer 类，封装 pixi.js 初始化和模型加载
  - [x] SubTask 3.2: 实现模型加载、销毁、切换功能
  - [x] SubTask 3.3: 实现动作播放接口（playMotion, playExpression）
  - [x] SubTask 3.4: 添加 loading 状态和错误处理

- [x] Task 4: 实现 AI 驱动的动作标签解析系统
  - [x] SubTask 4.1: 改造 ChatEngine.buildSystemPrompt，添加动作标签指令
  - [x] SubTask 4.2: 创建 ActionTagParser 类，解析 AI 回复中的动作标签
  - [x] SubTask 4.3: 实现动作标签到 Live2D 动作的映射表
  - [x] SubTask 4.4: 实现容错机制（未识别标签 fallback 到待机动作）

- [x] Task 5: 集成到对话流程
  - [x] SubTask 5.1: 在 addNPCMessage 中集成动作标签解析和动画触发
  - [x] SubTask 5.2: 实现 NPC 切换时自动切换 Live2D 模型
  - [x] SubTask 5.3: 添加立绘开关控制（设置面板中添加 Live2D 开关）
  - [x] SubTask 5.4: 添加游戏启动时自动加载 Live2D

- [x] Task 6: 添加测试模型和验证
  - [x] SubTask 6.1: 为 hodgins NPC 配置测试模型路径（Shizuku 模型）
  - [x] SubTask 6.2: 为 gilbert 和 violet NPC 配置测试模型
  - [x] SubTask 6.3: 创建独立测试页面 live2d-test.html 验证功能
  - [x] SubTask 6.4: 添加完整的事件处理（loading、error、complete）

# Task Dependencies
- [Task 2] depends on [Task 1]
- [Task 3] depends on [Task 2]
- [Task 4] depends on [Task 3]
- [Task 5] depends on [Task 3] and [Task 4]
- [Task 6] depends on [Task 5]
