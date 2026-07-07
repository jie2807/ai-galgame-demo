# Fix Portrait Picker Live2D Preview Spec

## Why
立绘选择面板中的 Level 2D 模型预览存在两个明显体验问题：已加载的模型在卡片中偏向右侧，影响观感；同时部分模型因并发预览数量限制或加载失败而只显示 fallback 文字，玩家无法通过视觉区分和选择模型。

## What Changes
- 修复 Level 2D 模型在预览卡片中的居中显示，确保模型在卡片正中央。
- 提高可同时预览的 Level 2D 模型数量上限，或改为按需懒加载，减少模型无法显示的情况。
- 当模型加载失败或无法预览时，提供清晰的占位样式，避免空白或误导性布局。
- 保持桌面端与移动端布局不被破坏，保持 Live2D 排序在前。

## Impact
- Affected specs: enhance-custom-npc-portrait-picker, fix-portrait-picker-mobile-stacking
- Affected code: d:\BC\ai_resume\qmzz\index.html（portrait-picker CSS 与 renderLive2dPreview/renderPortraitPickerGrid）

## ADDED Requirements

### Requirement: Level 2D 模型在预览卡片中居中显示
系统 SHALL 确保所有成功加载的 Level 2D 模型在预览卡片中水平与垂直居中，不被拉伸、裁切到一侧或偏移到右侧。

#### Scenario: 桌面端宽屏
- **WHEN** 用户在桌面端打开立绘选择面板
- **THEN** Level 2D 模型卡片中的模型位于卡片正中央，与静态图片卡片的视觉重心一致

#### Scenario: 移动端小屏
- **WHEN** 用户在 375px/360px/320px 设备上打开立绘选择面板
- **THEN** Level 2D 模型卡片中的模型同样居中，不偏向某一侧

### Requirement: 提升 Level 2D 模型可预览率
系统 SHALL 允许玩家看到更多（理想为全部）可用的 Level 2D 模型预览，而不是仅前 6 个可加载。

#### Scenario: 模型数量超过 6 个
- **WHEN** 角色池中 Level 2D 模型数量超过 6 个
- **THEN** 玩家仍能看到全部或大部分模型的预览，或至少能看到有意义的占位/缩略图

### Requirement: 加载失败时给出明确占位
系统 SHALL 在 Level 2D 模型加载失败时显示统一的占位样式，并确保占位文字/图标居中，不影响相邻卡片布局。

#### Scenario: 模型文件损坏或网络失败
- **WHEN** 某个 Level 2D 模型无法加载
- **THEN** 该卡片显示居中占位，不破坏网格，其他模型正常显示
