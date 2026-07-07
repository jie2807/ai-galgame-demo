# 项目瘦身与废弃文件清理 Spec

## Why

项目在经历多次重构与功能迭代后，遗留了大量临时脚本、构建产物、重复资源、开发日志、测试截图与未引用文件，导致仓库体积膨胀、文件结构混乱，并增加了维护成本。本次瘦身旨在系统性地识别并清理这些无用内容，同时保留 `file://` 协议下运行时真正依赖的文件。

## What Changes

- 对项目根目录及子目录进行全面扫描，识别未在 `index.html` 运行链路中引用的文件
- 删除可安全移除的废弃文件与目录（临时脚本、日志、旧备份、未引用样式、重复构建产物等）
- 清理 `.trae/documents/` 与 `.trae/specs/` 中明显过时的文档（保留仍在执行或近期相关的 spec）
- 删除 `dist/`、`public/` 中与原文件重复的构建输出（除非当前运行确实依赖）
- 清理 `assets/bg/` 中大量 `test_*.jpg` 临时测试图片与 SCP 测试背景中未被引用的副本
- 清理根目录下各类 `verify-*.png`、`test-*.js`、`.log`、`.bak.t2s` 等开发残留
- 评估 `vendor/`、`js/`、`models/vrm/`、`test-screenshots/` 等目录是否仍在运行链路中使用，移除无用部分
- 如 `styles/inline-extracted.css`、`styles/inline-mobile.css` 确认未被引用则删除
- 对不可删除但可优化的内容给出明确的优化建议（如大视频压缩、重复图片合并、目录结构整理）
- **BREAKING**: 删除的文件不可恢复，清理前需备份关键运行时资源；清理后 `file://` 打开首页与核心功能必须正常

## Impact

- Affected code: 项目根目录下除 `index.html` 运行链路以外的所有文件与目录
- Affected specs: 无

## ADDED Requirements

### Requirement: 项目瘦身清理

系统 SHALL 对当前项目进行一次全面的废弃文件识别与清理，并在清理后保证 `file://` 协议下首页、章节任务、自定义剧本、Creator Wars 等核心页面可正常打开与运行。

#### Scenario: 清理后项目可正常运行
- **WHEN** 用户双击 `index.html` 在浏览器中打开项目
- **THEN** 首页正常渲染，无 CSS/JS/图片/视频 404 错误

#### Scenario: 清理后核心功能正常
- **WHEN** 用户进入剧本游玩、章节任务、自定义剧本、Creator Wars 等页面
- **THEN** 页面布局、图片、视频背景、Live2D/Sprite 渲染、TTS 等功能均正常

#### Scenario: 清理后无冗余文件残留
- **WHEN** 用户查看项目目录
- **THEN** 不存在明显的临时文件、未引用资源、重复构建产物与开发日志堆积

#### Scenario: 优化建议可追溯
- **WHEN** 某些文件或目录因风险较高无法直接删除
- **THEN** 在清理报告中明确列出建议的后续优化方案

## MODIFIED Requirements

无

## REMOVED Requirements

无
