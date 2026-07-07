# 开放养成学院并优化写信立绘清晰度 Spec

## Why

首页「养成学院」入口目前点击后仅提示「AI 工作台 正在开发中」，未向玩家开放实际功能。同时养成学院内的「写信」页面（角色聊天页）左侧立绘/模型显示区域存在模糊问题，影响角色展示效果。本次测试需要先开放该入口，并修复写信页面的立绘清晰度。

## What Changes

- 将首页「养成学院」按钮从展示开发中 Toast 改为可进入角色图鉴（作为养成学院入口）
- 修复角色聊天页左侧立绘/模型显示区域模糊问题
- 保持桌面端与移动端布局不被破坏
- 保持其他页面入口（如抽卡图鉴、角色详情返回）行为不变

## Impact

- Affected specs: user-perspective-feature-optimization
- Affected code: `d:\BC\ai_resume\qmzz\index.html`, `d:\BC\ai_resume\qmzz\styles.css`

## ADDED Requirements

### Requirement: 养成学院入口开放

系统 SHALL 允许玩家从首页「养成学院」按钮进入角色图鉴/养成学院，而不是显示开发中提示。

#### Scenario: 玩家点击养成学院

- **WHEN** 玩家在首页点击「养成学院」按钮
- **THEN** 系统平滑过渡到角色列表页（`characterListPage`）
- **AND** 角色列表正常渲染

### Requirement: 写信页面立绘区域清晰显示

系统 SHALL 确保角色聊天页左侧立绘/模型区域显示清晰，不模糊、不拉伸、不偏移。

#### Scenario: 静态立绘显示

- **WHEN** 角色使用静态立绘进入写信页
- **THEN** 立绘按合适比例居中显示，不出现因过度放大或压缩导致的模糊

#### Scenario: Level 2D 模型显示

- **WHEN** 角色使用 Level 2D 模型进入写信页
- **THEN** 模型在可见容器内以正确分辨率初始化并居中显示
- **AND** 页面从隐藏变为显示后模型不会变模糊

## MODIFIED Requirements

无。

## REMOVED Requirements

无。
