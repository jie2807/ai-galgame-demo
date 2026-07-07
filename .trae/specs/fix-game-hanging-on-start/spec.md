# 修復遊戲啟動卡住和空白頁面問題

## Why
用戶點擊開始後總是卡在「正在啟動遊戲...」界面，深入調查發現：
1. `_hideLoadingOverlay()` 實際上被調用了（在幾毫秒內），但遊戲頁面看起來是空的
2. ScriptEngine 添加的開場旁白和 NPC 歡迎消息沒有被渲染到 GamePage 的 UI
3. Live2D 模型 URL 沒有正確關聯到 NPCData 對象，導致 NPC 肖像區域永遠不顯示模型
4. localStorage 中的舊消息被恢復但沒有渲染到 UI
5. mount() 中 `_hideLoadingOverlay()` 的位置不正確（在 initBridge() catch 後才調用，但 catch 內也會調用，導致雙重調用）

## What Changes
- 修復 mount() 的 loading overlay 隱藏邏輯（使用 try-finally 確保只隱藏一次）
- 渲染 ScriptEngine 中已有的消息（開場旁白、NPC 歡迎消息）到 GamePage UI
- 修復 NPCData 的 live2dModel URL 關聯
- 確保 NPC 肖像在遊戲啟動時正確顯示
- 添加調試日誌幫助排查問題

## Impact
- Affected specs: 遊戲啟動流程、NPC建模系統、消息渲染系統
- Affected code: pages/game/GamePage.js, engine/ScriptEngineBridge.js

## ADDED Requirements

### Requirement: Render Engine Messages on Startup
遊戲頁面 SHALL 在啟動時渲染 ScriptEngine 中已有的所有消息（旁白、NPC 歡迎消息等）。

#### Scenario: 首次啟動遊戲
- **WHEN** 用戶第一次進入遊戲（無 localStorage 舊消息）
- **THEN** 開場旁白被渲染為系統消息
- **THEN** NPC 的 firstMessage 被渲染為 NPC 消息
- **AND** 用戶能看到完整的開場敘述

#### Scenario: 恢復舊遊戲會話
- **WHEN** 用戶之前玩過遊戲（localStorage 有舊消息）
- **THEN** 所有舊消息被渲染到 UI
- **AND** 按消息順序正確顯示

### Requirement: Fix Loading Overlay Lifecycle
加載覆蓋層的生命周期 SHALL 正確管理，確保只顯示一次且最終被隱藏。

#### Scenario: 正常啟動
- **WHEN** mount() 被調用且 initBridge() 成功
- **THEN** 顯示加載動畫
- **THEN** initBridge() 完成後隱藏加載動畫
- **AND** 只調用一次 _hideLoadingOverlay()

#### Scenario: 啟動失敗
- **WHEN** initBridge() 拋出異常或超時
- **THEN** 顯示錯誤消息
- **THEN** 隱藏加載動畫
- **AND** 用戶能看到錯誤提示並返回首頁

### Requirement: NPC Portrait on Game Start
遊戲啟動時 SHALL 正確顯示當前 NPC 的肖像或 Live2D 模型。

#### Scenario: NPC 有靜態立繪
- **WHEN** 當前 NPC 配置包含 portrait URL
- **THEN** 左側區域顯示該圖片

#### Scenario: NPC 有 Live2D 模型
- **WHEN** 當前 NPC 配置包含 Live2D 模型 URL
- **THEN** 左側區域渲染 Live2D 模型

## MODIFIED Requirements

### Requirement: NPCData and Live2D Model Linkage
ScriptEngineBridge.setupGameData SHALL 將 npcLive2DModels 中的 URL 正確關聯到 NPCData.live2dModel。

**Before**: `npc.live2dModel` 始終為 null，即使 npcLive2DModels 中有對應的 URL
**After**: `npc.live2dModel` 正確設置為 npcLive2DModels[id].url（如果存在）

### Requirement: GamePage.mount() Loading Logic
mount() 方法 SHALL 使用 try-finally 模式確保 loading overlay 正確隱藏。

**Before**: `_hideLoadingOverlay()` 在 await initBridge() 之後調用，但 initBridge() 的 catch 也會調用它，導致雙重調用或競態條件
**After**: 使用 try-finally 模式，無論成功或失敗都只隱藏一次

## REMOVED Requirements

None.
