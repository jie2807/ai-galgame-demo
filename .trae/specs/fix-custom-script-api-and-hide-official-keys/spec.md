# 修复自定义剧本 API 连接与隐藏官方密钥 Spec

## Why

当前自定义剧本的「智能生成」总是卡在「正在发送请求」阶段，且进入自定义剧本后 AI 不回复，玩家无法判断是 API 未配置、网络问题还是服务端故障。同时，游戏页与 Creator Wars 页的设置面板会直接显示官方免费 API 的地址与密钥，存在泄露风险。本次需要排查并修复 API 调用问题，并在两个游玩场景的设置中隐藏官方密钥，改为与首页模型调配一致的「官方免费 API」模式。

## What Changes

- 增强自定义剧本生成与游玩时的 API 连接诊断与错误提示
- 缩短 API 请求超时时间，避免长时间卡在「正在发送请求」
- 修复可能导致请求无响应或错误未被正确捕获的问题
- 改造游戏页设置面板：新增「使用官方免费 API」按钮，选择官方模式时隐藏密钥输入框
- 改造 Creator Wars 设置面板：与游戏页保持一致，隐藏官方密钥
- 玩家仍可填写并保存自己的 API 地址、密钥和模型

## Impact

- Affected specs: fix-custom-script-ai-generation
- Affected code: `d:\BC\ai_resume\qmzz\index.html`

## ADDED Requirements

### Requirement: API 连接问题可诊断

系统 SHALL 在自定义剧本智能生成失败时给出明确、可操作的错误提示，而不是长时间无反馈。

#### Scenario: 请求超时或网络异常

- **WHEN** 智能生成请求在合理时间内未得到响应
- **THEN** 系统在约 45 秒后停止请求并提示「请求超时，请检查网络或 API 是否可达」

#### Scenario: HTTP 错误

- **WHEN** API 返回 401 / 403 / 429 / 500 等状态码
- **THEN** 提示包含具体状态码与建议，例如「API 请求失败（401）：请检查 API 地址、Key 或模型名」

#### Scenario: 跨域或浏览器拦截

- **WHEN** 请求被浏览器 CORS 策略拦截
- **THEN** 控制台输出详细错误，并向玩家提示「请求被浏览器拦截，请确认通过 http/https 访问而非 file 协议」

### Requirement: 自定义剧本游玩时 AI 正常回复

系统 SHALL 确保自定义剧本开始游玩后，AI 能根据配置正常发送请求并回复。

#### Scenario: 使用官方 API 游玩

- **WHEN** 玩家未配置自定义 API 时开始游玩自定义剧本
- **THEN** 系统使用 `OFFICIAL_AGNES_TEXT_CONFIG` 中的官方地址与密钥调用 API
- **AND** AI 正常返回内容并显示在对话框中

#### Scenario: 使用自定义 API 游玩

- **WHEN** 玩家在设置中填写了自己的 API 地址、密钥和模型
- **THEN** 系统优先使用玩家配置的 API
- **AND** AI 正常返回内容

### Requirement: 游戏页设置隐藏官方密钥

系统 SHALL 改造 `gameSettingsPanel`，使其不再直接显示官方 API 密钥。

#### Scenario: 打开游戏页设置

- **WHEN** 玩家点击游戏页设置按钮
- **THEN** 设置面板顶部显示「使用官方免费 API」按钮/状态
- **AND** 当前为官方模式时，API 密钥输入框隐藏或禁用，仅显示「当前使用官方免费 API」
- **AND** 玩家点击切换到自定义模式后，才显示 API 地址、密钥、模型输入框

#### Scenario: 保存自定义 API

- **WHEN** 玩家填写自定义 API 并保存
- **THEN** 配置写入 sessionStorage / localStorage
- **AND** 下次打开设置时显示自定义模式及已填写的地址、模型（密钥可留空或显示占位符）

### Requirement: Creator Wars 设置隐藏官方密钥

系统 SHALL 改造 Creator Wars 页设置面板（`renderSettingsContent`），逻辑与游戏页保持一致。

#### Scenario: 打开 Creator Wars 设置

- **WHEN** 玩家打开 Creator Wars 设置
- **THEN** 显示「使用官方免费 API」按钮/状态
- **AND** 官方模式下不显示官方密钥

## MODIFIED Requirements

无。

## REMOVED Requirements

无。
