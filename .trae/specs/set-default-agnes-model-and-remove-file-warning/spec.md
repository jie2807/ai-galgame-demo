# 设置官方免费 Agnes 模型为默认并移除 file:// 警告横幅 Spec

## Why
玩家点击"试玩"进入官方剧本时无法直接游玩，必须手动配置 API 才能开始。根因是官方免费 Agnes 模型（`agnes-2.0-flash` @ `https://apihub.agnes-ai.com`）虽然在代码层有 `OFFICIAL_AGNES_TEXT_CONFIG` 作为 fallback，但 storage 始终为空，导致直接读取 storage 的代码路径（设置面板状态、`isUsingOfficialModel` 的 UI 判断等）认为"未配置"。同时，进入游戏时弹出的 file:// 协议警告横幅完全不必要——本游戏在浏览器中直接打开即可正常使用 AI 对话，该警告只会误导玩家。

## What Changes
- **页面加载时显式写入官方默认配置**：在定义 `OFFICIAL_AGNES_TEXT_CONFIG` 的 IIFE 中（L9289 起），新增初始化逻辑——当 storage 中没有任何 API 配置时，将官方免费 Agnes 配置（baseUrl/apiKey/model）写入 sessionStorage 与 localStorage，使默认配置"显式化"而非仅靠 fallback。写入模式与现有 `useOfficialModelBtn` 点击处理器（L10230-L10235）保持一致：base 和 model 同时写入 sessionStorage + localStorage，apiKey 仅写入 sessionStorage。
- **移除 file:// 警告横幅**：删除 L40603-L40619 整个 `<script>` 块（包含 `fileProtocolWarning` 横幅的创建、插入、关闭按钮逻辑）。

## Impact
- Affected specs: `fix-api-connection-diagnostics`（该 spec 添加了 file:// 横幅，本次将其移除）、`fix-official-script-ai-connection-regression`（方向错误的 spec，本次以正确方向解决根本问题）
- Affected code: `index.html`（L9289 起 IIFE 内新增默认配置初始化；L40603-L40619 删除 file:// 警告 script 块）

## ADDED Requirements

### Requirement: 官方免费 Agnes 模型作为默认配置
系统 SHALL 在页面加载时，当检测到 storage 中没有任何 API 配置（`game_api_base`/`game_api_key`/`game_model` 均未设置）时，自动将官方免费 Agnes 模型配置写入 storage，使玩家无需任何手动配置即可直接开始游玩。

#### Scenario: 首次进入游戏无需配置
- **WHEN** 玩家首次打开游戏（storage 为空）并点击进入官方剧本
- **THEN** 游戏直接开始，无需弹出设置面板或提示"请先配置 AI 地址"
- **AND** 玩家发送消息时，AI 请求自动使用官方免费 Agnes 模型（`agnes-2.0-flash` @ `https://apihub.agnes-ai.com`）

#### Scenario: 不覆盖已有自定义配置
- **WHEN** 玩家已手动配置了自定义 API（storage 中有 `game_api_base` 等值）
- **THEN** 页面加载时不覆盖已有配置，继续使用玩家的自定义 API

#### Scenario: 官方配置写入模式
- **WHEN** 初始化写入官方默认配置
- **THEN** `game_api_base` 和 `game_model` 同时写入 sessionStorage 和 localStorage
- **AND** `game_api_key` 仅写入 sessionStorage（不写入 localStorage，与现有 `useOfficialModelBtn` 模式一致）

### Requirement: 移除 file:// 协议警告横幅
系统 SHALL NOT 在通过 file:// 协议打开游戏时显示任何协议警告横幅。

#### Scenario: file:// 打开无警告
- **WHEN** 玩家通过 file:// 协议直接在浏览器中打开 index.html
- **THEN** 页面顶部不显示任何关于 file:// 协议的警告横幅
- **AND** 游戏功能正常，AI 对话可用

## REMOVED Requirements

### Requirement: file:// 协议检测与警告横幅
**Reason**: 游戏本身在浏览器中直接打开即可正常使用（AI 请求为跨域 https 请求，不受 file:// 限制），警告横幅只会误导玩家，造成不必要的困扰。
**Migration**: 直接删除 L40603-L40619 的 `<script>` 块。无需替代方案，因为警告本身不必要。
