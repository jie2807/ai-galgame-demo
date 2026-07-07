# 修复 API 配置后游戏仍无法游玩 Spec

## Why
用户已配置 AI API 但游戏仍然无法正常游玩。经深入排查发现关键 Bug：ScriptEngineBridge 使用 `AIService`（基础对话服务）而非 `GameAIService`（游戏专用服务），导致 `DialogueEngine.sendMessage()` 调用 `_ai.buildApiMessages()` 时抛出 TypeError，AI 请求完全无法发送。

## What Changes
- 修复 ScriptEngineBridge：将 `new AIService()` 改为 `new GameAIService()`
- 删除 index.html 中所有干扰游戏页面的旧版系统代码
- 清理全局事件监听和样式冲突

## Impact
- Affected specs: fix-game-unplayable, fix-project-bugs-and-cleanup
- Affected code: engine/ScriptEngineBridge.js, index.html

## ADDED Requirements

### Requirement: GameAIService 集成
ScriptEngineBridge SHALL 使用 GameAIService 而非 AIService 来初始化游戏 AI 服务。

#### Scenario: 游戏初始化成功
- **WHEN** 调用 `setupGameData()` 初始化游戏
- **THEN** aiService 使用 `GameAIService`，具备 `buildApiMessages()` 方法

### Requirement: 旧版系统不干扰新版
旧版 index.html 代码 SHALL 不干扰 GamePage 模块化系统。

#### Scenario: 进入游戏页面
- **WHEN** 路由导航到 `/game`
- **THEN** 只有 GamePage 模块运行，旧版代码不执行

## MODIFIED Requirements

### Requirement: ScriptEngineBridge.setupGameData()
setupGameData() SHALL 使用 GameAIService 创建 aiService。

**Before**: `this.aiService = new AIService();`
**After**: `this.aiService = new GameAIService();`

## REMOVED Requirements

### Requirement: 旧版游戏页面 DOM 和脚本
**Reason**: 与模块化系统冲突，导致 API 调用失败
**Migration**: 所有游戏功能已迁移到 GamePage 模块
