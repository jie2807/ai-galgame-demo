# 升级 TTS 语音质量 Spec

## Why

当前项目使用 Web Speech API (`speechSynthesis`) 作为 TTS 方案，该方案音质较差、声音机械感强，且不同设备/浏览器的语音质量差异极大（移动端尤其差）。需要调研并引入更高质量的 TTS 方案，提升 NPC 语音的自然度和沉浸感，同时保持零成本或极低成本。

## 调研结果：可用 TTS 方案对比

### 方案 1：Edge TTS via Cloudflare Workers 代理（⭐ 推荐）

| 维度 | 说明 |
|------|------|
| **成本** | 免费（Cloudflare Workers 免费额度：10万请求/天） |
| **音质** | ⭐⭐⭐⭐⭐ 极高（微软 Neural TTS 神经网络语音） |
| **中文支持** | 优秀（晓晓/XiaoxiaoNeural、云希/YunxiNeural、晓伊/XiaoyiNeural 等 20+ 中文音色） |
| **延迟** | 低（1-3 秒首字延迟，流式返回） |
| **依赖** | 需一次性部署 Cloudflare Worker（约 50 行代码） |
| **稳定性** | 中高（依赖微软公共服务，但已稳定运行 3+ 年） |
| **CORS** | ✅ Worker 自行设置 CORS 头，浏览器可直接调用 |

**原理**：在 Cloudflare Workers 上部署一个轻量代理，接收前端 HTTP 请求，通过 WebSocket 连接微软 Edge TTS 服务（`wss://speech.platform.bing.com/consumer/speech/synthesize/readaloud/edge/v1`），将文本发送给微软服务，接收 webm 音频流后返回给前端。

**优势**：
- 微软 Neural TTS 是目前免费方案中音质最高的，接近真人发音
- 支持语速、语调、音量调节（通过 SSML 标记）
- 支持多种情感风格（聊天、客服、新闻播报等）
- Cloudflare Workers 免费额度对个人项目完全够用
- Worker 代码极简，维护成本接近零

**劣势**：
- 需要用户自行部署 Cloudflare Worker（一次性操作，5 分钟完成）
- 依赖微软公共服务可用性
- 需要网络连接（离线不可用）

### 方案 2：Edge TTS 浏览器直连 WebSocket

| 维度 | 说明 |
|------|------|
| **成本** | 免费 |
| **音质** | ⭐⭐⭐⭐⭐ 极高（同方案 1） |
| **中文支持** | 优秀（同方案 1） |
| **延迟** | 极低（直连，无代理） |
| **依赖** | 无，纯前端 |
| **稳定性** | 低（微软可能封堵非 Edge 浏览器的连接） |
| **CORS** | ⚠️ WebSocket 无 CORS 限制，但服务端可能校验 Origin/User-Agent |

**原理**：直接在浏览器中通过 WebSocket 连接微软 Edge TTS 服务端点，发送 SSML 文本，接收 webm 音频。

**优势**：
- 零依赖，无需任何服务端
- 延迟最低

**劣势**：
- 微软服务端可能校验请求来源，非 Edge 浏览器可能被拒绝
- `TrustedClientToken` 可能过期失效
- 不稳定，随时可能被微软封堵
- 移动端浏览器对 WebSocket 的限制可能更严格

### 方案 3：Transformers.js + SpeechT5（浏览器端 AI 模型）

| 维度 | 说明 |
|------|------|
| **成本** | 免费 |
| **音质** | ⭐⭐⭐⭐ 高（但中文支持弱） |
| **中文支持** | ❌ 差（SpeechT5 主要支持英文，中文需额外模型） |
| **延迟** | 高（移动端推理 3-10 秒/句） |
| **模型体积** | ~100-200MB（量化后 ONNX 格式） |
| **依赖** | @huggingface/transformers、ONNX Runtime Web |
| **稳定性** | 中（依赖浏览器 WASM/WebGPU 支持） |

**原理**：使用 HuggingFace 的 Transformers.js 库，在浏览器中通过 ONNX Runtime Web 运行 SpeechT5 + HiFi-GAN 模型，直接生成音频波形。

**优势**：
- 完全离线运行
- 隐私保护（文本不离开设备）
- 英文音质好

**劣势**：
- **模型体积过大**（100-200MB），移动端流量和存储不可接受
- **中文支持极差**，SpeechT5 没有好的中文 TTS ONNX 模型
- **推理速度慢**，移动端 CPU/GPU 算力不足
- **内存占用高**，低端手机可能崩溃
- 首次加载需下载大量模型文件

### 方案 4：HuggingFace Inference API（免费额度）

| 维度 | 说明 |
|------|------|
| **成本** | 免费（有速率限制） |
| **音质** | ⭐⭐⭐⭐ 高（取决于模型） |
| **中文支持** | 中（取决于选择的模型） |
| **延迟** | 高（冷启动 20+ 秒，热启动 2-5 秒） |
| **依赖** | HuggingFace API Token（免费获取） |
| **稳定性** | 低（免费额度限速，高峰期可能排队） |

**原理**：通过 HTTP 请求调用 HuggingFace 的推理 API，使用云端模型生成语音。

**优势**：
- 无需自建服务
- 支持多种模型

**劣势**：
- 免费额度限速严重，不适合实时交互
- 冷启动时间长
- 需要用户注册获取 API Token
- 不适合生产环境

### 方案 5：Web Speech API（当前方案，保留为降级方案）

| 维度 | 说明 |
|------|------|
| **成本** | 免费 |
| **音质** | ⭐⭐ 低-中（设备依赖严重） |
| **中文支持** | 中（取决于系统语音包） |
| **延迟** | 极低 |
| **依赖** | 无，浏览器原生 |
| **稳定性** | 高（广泛支持） |

**保留原因**：作为离线降级方案，在无网络或 Edge TTS 不可用时自动回退。

## 方案对比总览

| 方案 | 音质 | 成本 | 中文 | 离线 | 移动端适配 | 推荐度 |
|------|------|------|------|------|-----------|--------|
| Edge TTS + CF Workers | ⭐⭐⭐⭐⭐ | 免费 | ✅ | ❌ | ✅ | ⭐⭐⭐⭐⭐ |
| Edge TTS 直连 | ⭐⭐⭐⭐⭐ | 免费 | ✅ | ❌ | ⚠️ | ⭐⭐⭐ |
| Transformers.js | ⭐⭐⭐⭐ | 免费 | ❌ | ✅ | ❌ | ⭐⭐ |
| HuggingFace API | ⭐⭐⭐⭐ | 免费 | ⚠️ | ❌ | ✅ | ⭐⭐ |
| Web Speech API | ⭐⭐ | 免费 | ⚠️ | ✅ | ✅ | ⭐⭐⭐（降级） |

## What Changes

- **新增 Edge TTS 引擎**：通过 Cloudflare Workers 代理调用微软 Edge TTS 服务，获取高质量 Neural TTS 语音
- **重构 TTS 架构为分层策略**：优先使用 Edge TTS（高质量），自动降级到 Web Speech API（离线/不可用时）
- **新增 Edge TTS 配置面板**：允许用户配置 Cloudflare Worker 代理地址、选择 Neural 音色
- **新增音频缓存机制**：相同文本的语音结果缓存到内存，避免重复请求
- **保留现有 Web Speech API 作为降级方案**

## Impact

- 受影响代码：`index.html`（TTS 引擎重构、UI 配置面板）、`styles.css`（新 UI 样式）
- 新增依赖：无（纯原生 WebSocket + Audio API）
- 新增外部服务：Cloudflare Workers 代理（用户自行部署，提供部署脚本）
- 不影响现有功能，为纯增强特性

## ADDED Requirements

### Requirement: Edge TTS 引擎
系统 SHALL 支持通过 Cloudflare Workers 代理调用微软 Edge TTS 服务，获取高质量 Neural TTS 语音。

#### Scenario: 成功播放 Edge TTS 语音
- **WHEN** NPC 回复完成且 Edge TTS 可用
- **THEN** 通过 Cloudflare Worker 代理请求微软 Edge TTS 服务，获取 webm 音频并播放

#### Scenario: Edge TTS 不可用时降级
- **WHEN** Edge TTS 服务不可用（网络错误、Worker 地址未配置、请求超时）
- **THEN** 自动降级到 Web Speech API 播放语音，并在 UI 上提示用户

#### Scenario: 配置 Worker 代理地址
- **WHEN** 用户在 TTS 设置中输入 Cloudflare Worker 代理 URL
- **THEN** 保存配置到 localStorage，后续 TTS 请求使用该代理地址

### Requirement: Neural 音色选择
系统 SHALL 支持选择微软 Edge TTS 提供的 Neural 音色。

#### Scenario: 获取可用音色列表
- **WHEN** 用户打开 TTS 设置且已配置 Worker 代理地址
- **THEN** 从 Worker 代理获取可用的 Neural 音色列表并显示

#### Scenario: 选择中文音色
- **WHEN** 用户选择一个中文 Neural 音色（如晓晓、云希）
- **THEN** 后续 TTS 请求使用该音色生成语音

### Requirement: TTS 分层策略
系统 SHALL 实现分层 TTS 策略，优先使用高质量方案，自动降级。

#### Scenario: 优先使用 Edge TTS
- **WHEN** Edge TTS 已配置且可用
- **THEN** 使用 Edge TTS 生成语音（高质量）

#### Scenario: 降级到 Web Speech API
- **WHEN** Edge TTS 不可用或未配置
- **THEN** 自动使用 Web Speech API 生成语音（基础质量）

#### Scenario: 离线模式
- **WHEN** 设备无网络连接
- **THEN** 使用 Web Speech API（如果系统有本地语音包）

### Requirement: 音频缓存
系统 SHALL 缓存已生成的 TTS 音频，避免重复请求。

#### Scenario: 缓存命中
- **WHEN** 请求播放的文本在缓存中已有对应的音频
- **THEN** 直接播放缓存音频，不发起网络请求

#### Scenario: 缓存未命中
- **WHEN** 请求播放的文本在缓存中没有对应音频
- **THEN** 发起 TTS 请求，获取音频后缓存并播放

#### Scenario: 缓存容量限制
- **WHEN** 缓存音频总大小超过 50MB
- **THEN** 清除最早缓存的音频条目

### Requirement: Cloudflare Worker 部署指引
系统 SHALL 提供 Cloudflare Worker 的部署代码和指引，方便用户一键部署。

#### Scenario: 用户部署 Worker
- **WHEN** 用户按照指引在 Cloudflare 上部署 Worker
- **THEN** 获得 Worker URL，配置到 TTS 设置中即可使用 Edge TTS

## MODIFIED Requirements

### Requirement: TTS 设置面板
现有 TTS 设置面板 SHALL 扩展支持 Edge TTS 配置选项。

- 新增「TTS 引擎」选择：Edge TTS（高质量）/ Web Speech API（基础/离线）
- 新增「Worker 代理地址」输入框
- 新增「Neural 音色」选择器（仅在 Edge TTS 模式下显示）
- 保留现有语速、语调、自动播放设置

### Requirement: TTS 播放按钮行为
现有 TTS 播放按钮 SHALL 在 Edge TTS 模式下显示加载状态。

#### Scenario: Edge TTS 加载中
- **WHEN** 点击播放按钮后正在等待 Edge TTS 音频返回
- **THEN** 按钮显示加载动画（旋转图标），表示正在生成语音

#### Scenario: 音频加载完成
- **WHEN** Edge TTS 音频返回并开始播放
- **THEN** 按钮切换为播放中状态（暂停图标 + 脉冲动画）
