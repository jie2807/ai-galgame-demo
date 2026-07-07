# 项目瘦身第二轮（零散文件清理 + 视频压缩）Spec

## Why

上一轮 `audit-and-slim-project-bloat` 清理释放了约 135 MB，但项目当前总体积仍达 **486.58 MB**（含 node_modules）/ **378.06 MB**（不含），用户反馈"项目体积太大"依然成立。根因有二：

1. **生成原始素材未清空**：`scripts/generate-doomsday-assets/` 与 `scripts/generate-cultivation-assets/` 下的 `raw_green/`、`raw_scenes/` 合计占用 **293.68 MB**，这些只是生成立绘/场景的中间产物，最终成品已输出到 `images/portraits/{doomsday,cultivation}/`、`images/scenes/{doomsday,cultivation}/`（共 57 张成品图齐全）。`.gitignore` 虽忽略了它们，但项目非 Git 仓库，文件实际仍占空间。
2. **视频码率严重过高**：`videos/main_background.mp4` 与 `videos/charlist_bg .mp4`（文件名含空格）各 24.68 MB，均为 2560×1440 / H.264 / **20.36 Mbps** / 10 秒的背景循环视频，2K 分辨率 + 20Mbps 码率对纯背景视频属严重浪费，压缩到 720p + 1-2 Mbps 后单文件可降至 1.5-3 MB。

## What Changes

### 一、删除零散/冗余文件（低风险）
- 删除 `index.html.truncated.bak`（0.65 MB，历史备份）
- 删除 `fix_doomsday.ps1`（0 KB，一次性修复脚本）
- 删除 `scripts/generate-doomsday-assets/test_fast.png`、`test_q2.png`、`test_q2_rgba.png`（抠图测试文件）
- 删除空目录 `__verify_game_layout_screenshots/`、`.uploads/`

### 二、删除生成原始素材目录（最大收益，低风险）
- **BREAKING**（仅对生成流程而言）：删除 `scripts/generate-doomsday-assets/raw_green/`（70.93 MB，12 张绿幕图）
- **BREAKING**：删除 `scripts/generate-doomsday-assets/raw_scenes/`（128.6 MB，18 张原始场景图）
- **BREAKING**：删除 `scripts/generate-cultivation-assets/raw_green/`（42.23 MB，7 张绿幕图）
- **BREAKING**：删除 `scripts/generate-cultivation-assets/raw_scenes/`（51.92 MB，7 张原始场景图）
- 保留各 `generate-*-assets/` 目录下的 `.py` 生成脚本、`prompts.json`、`.env`，以便未来可重新生成
- 验证依据：`images/portraits/doomsday/`(12)、`images/scenes/doomsday/`(18)、`images/portraits/cultivation/`(15)、`images/scenes/cultivation/`(12) 成品齐全

### 三、视频资源压缩（中风险，需重编码 + 更新引用）
- `videos/main_background.mp4`：用 ffmpeg 重新编码为 1280×720 / H.264 / CRF 28 / 1.5Mbps，预期 24.68 MB → ~2 MB
- `videos/charlist_bg .mp4`：同上压缩，**同时重命名为 `charlist_bg.mp4`**（去除文件名中的空格），并更新 `index.html` 中 6 处引用（行 5339、6751、6830、6976、7726、7730）
- 备份原视频到 `videos/_backup/` 后再压缩，验证无误后删除备份
- 不转 WebM 以避免浏览器兼容性问题（项目硬约束要求移动端适配）

### 四、Live2D 纹理 PNG 压缩（可选，中风险）
- 对 `models/live2d/{mao,hiyori,haru}/*.2048/texture_*.png`（合计 ~9.6 MB）使用 `oxipng` 无损压缩
- 预期减少 50-70%，释放约 5-7 MB
- 若 `oxipng` 不可用则跳过此步

### 五、node_modules 评估（暂不强制处理）
- `node_modules/` 占 108.52 MB，其中 `three`(29.34 MB)、`pixi.js`(19.54 MB)、`@pixi`(11.76 MB) 等为历史 VRM/3D 遗留依赖
- `playwright`(4.68 MB) + `playwright-core`(11.89 MB) 用于验证
- 本轮仅生成评估报告，**不实际删除**（需用户确认是否仍需 Vite 构建/Playwright 验证）

## Impact

- **Affected specs**：`audit-and-slim-project-bloat`（上一轮，已完成；本轮为其优化建议中"视频压缩"与"纹理压缩"的延续执行）
- **Affected code**：
  - `index.html`（仅 `charlist_bg .mp4` → `charlist_bg.mp4` 的 6 处引用更新）
  - `videos/`（视频重编码 + 重命名）
  - `scripts/generate-*-assets/raw_green/`、`raw_scenes/`（删除）
  - 根目录零散文件（删除）
- **不受影响**：运行时必需的 48 个文件、Live2D 模型、成品立绘/场景图、游戏逻辑代码均不动

## 预期收益汇总

| 项目 | 当前 | 压缩后 | 释放 |
|------|------|--------|------|
| 原始素材目录 | 293.68 MB | 0 | 293.68 MB |
| 视频文件 | 49.37 MB | ~4-6 MB | ~44 MB |
| 零散文件 | ~0.8 MB | 0 | 0.8 MB |
| Live2D 纹理（可选） | 9.6 MB | ~4 MB | ~5 MB |
| **合计（必做项）** | **343.85 MB** | **~5 MB** | **~338 MB** |

项目总体积预期从 486.58 MB 降至约 **150 MB**（含 node_modules）。

## ADDED Requirements

### Requirement: 原始生成素材删除
系统 SHALL 在最终成品已输出到 `images/` 目录后，允许安全删除 `scripts/generate-*-assets/raw_green/` 与 `raw_scenes/`，且不影响 `index.html` 运行时。

#### Scenario: 成品齐全时删除原始素材
- **WHEN** `images/portraits/{doomsday,cultivation}/` 与 `images/scenes/{doomsday,cultivation}/` 下的成品文件数量与 `raw_green/`、`raw_scenes/` 对应
- **THEN** 删除原始素材目录后，`index.html` 运行时无 404、立绘与场景正常显示

### Requirement: 视频压缩与引用同步
系统 SHALL 在压缩视频并重命名后，同步更新 `index.html` 中所有对该视频的引用路径。

#### Scenario: 视频重命名后引用更新
- **WHEN** `videos/charlist_bg .mp4` 重命名为 `charlist_bg.mp4`
- **THEN** `index.html` 行 5339、6751、6830、6976、7726、7730 的引用全部更新为新路径
- **AND** 视频背景在游戏页、角色列表页、背景预设面板中正常播放

## MODIFIED Requirements

### Requirement: 项目体积控制
[延续上一轮 spec] 项目应持续控制总体积在合理范围内，定期清理生成中间产物并对媒体资源进行压缩优化。本轮聚焦原始素材清理与视频压缩，预期释放约 338 MB。
