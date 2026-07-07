# Tasks

- [x] Task 1: 编写 Cloudflare Worker 代理脚本
  - [x] SubTask 1.1: 编写 Worker 主脚本，接收 HTTP 请求，代理到 Edge TTS WebSocket
  - [x] SubTask 1.2: 实现 SSML 构建逻辑（支持音色、语速、语调参数）
  - [x] SubTask 1.3: 实现 WebSocket 连接管理（连接、发送、接收、关闭）
  - [x] SubTask 1.4: 实现音频流拼接和返回（webm 格式）
  - [x] SubTask 1.5: 添加 CORS 头和错误处理
  - [x] SubTask 1.6: 实现音色列表 API 端点（/voices）
  - [ ] SubTask 1.7: 本地测试 Worker 脚本可用性

- [x] Task 2: 重构 NPCTTS 引擎为分层架构
  - [x] SubTask 2.1: 定义 TTS 引擎接口（speak, stop, pause, resume, getVoices）
  - [x] SubTask 2.2: 实现 EdgeTTSEngine 类（通过 Worker 代理获取音频并播放）
  - [x] SubTask 2.3: 实现 WebSpeechEngine 类（封装现有 Web Speech API 逻辑）
  - [x] SubTask 2.4: 实现 TTS 策略管理器（优先 Edge TTS，降级 Web Speech API）
  - [x] SubTask 2.5: 实现自动降级逻辑（Edge TTS 失败时自动切换到 Web Speech API）

- [x] Task 3: 实现音频缓存机制
  - [x] SubTask 3.1: 实现基于 Map 的内存音频缓存（key = 文本+音色+参数 hash）
  - [x] SubTask 3.2: 实现缓存容量限制（50MB 上限，LRU 淘汰）
  - [x] SubTask 3.3: 集成缓存到 EdgeTTSEngine（请求前检查缓存，请求后写入缓存）

- [x] Task 4: 扩展 TTS 设置面板
  - [x] SubTask 4.1: 添加 TTS 引擎选择器（Edge TTS / Web Speech API / 自动）
  - [x] SubTask 4.2: 添加 Worker 代理地址输入框
  - [x] SubTask 4.3: 添加 Neural 音色选择器（从 Worker 获取音色列表）
  - [x] SubTask 4.4: 设置持久化到 localStorage
  - [x] SubTask 4.5: 添加部署指引入口（帮助按钮，显示 Worker 部署说明）

- [x] Task 5: 更新 TTS 播放按钮交互
  - [x] SubTask 5.1: 添加加载中状态（旋转图标）用于 Edge TTS 请求等待
  - [x] SubTask 5.2: 更新 handleTTSButtonClick 函数支持异步加载流程
  - [x] SubTask 5.3: 添加加载超时处理（8 秒超时降级到 Web Speech API）

- [x] Task 6: 添加 CSS 样式
  - [x] SubTask 6.1: 加载中旋转动画样式
  - [x] SubTask 6.2: TTS 引擎选择器和配置面板样式
  - [x] SubTask 6.3: 部署指引弹窗样式

- [ ] Task 7: 端到端测试
  - [ ] SubTask 7.1: 测试 Edge TTS 通过 Worker 代理正常播放
  - [ ] SubTask 7.2: 测试降级逻辑（Worker 不可用时自动切换 Web Speech API）
  - [ ] SubTask 7.3: 测试音频缓存命中和淘汰
  - [ ] SubTask 7.4: 测试移动端浏览器兼容性
  - [ ] SubTask 7.5: 测试离线模式（仅 Web Speech API 可用）

# Task Dependencies
- Task 2 depends on Task 1
- Task 3 depends on Task 2
- Task 4 depends on Task 2
- Task 5 depends on Task 2
- Task 6 depends on Task 4 and Task 5
- Task 7 depends on Task 1, Task 2, Task 3, Task 4, Task 5, Task 6
