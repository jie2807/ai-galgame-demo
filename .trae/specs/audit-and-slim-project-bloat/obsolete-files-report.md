# 疑似废弃文件扫描报告

> 扫描范围：`d:\BC\ai_resume\qmzz` 项目根目录
> 对比清单：`.trae/specs/audit-and-slim-project-bloat/runtime-dependencies.md`
> 排除项：`.git`、`.trae/specs/audit-and-slim-project-bloat/` 下的本次 spec 文件、`.vite/` 缓存、`.uploads/`、顶层 `node_modules/`（依赖目录不纳入废弃统计）

---

## 统计概览

| 类别 | 文件数 | 目录数 | 需人工复核 |
|------|--------|--------|------------|
| 临时脚本/开发工具 | 27 | 0 | 否 |
| 日志文件 | 11 | 0 | 否 |
| 测试截图 | 23 | 0 | 否 |
| 备份/临时文件 | 2 | 2 | 否 |
| 未引用样式/图片/视频 | 75 | 31 | 部分 |
| 重复构建产物 | 0 | 2 | 否 |
| 过期文档 | 136 | 0 | 否 |
| 高风险待确认目录 | 0 | 5 | 是 |
| **合计** | **274** | **40** | **5 个目录** |

---

## 临时脚本/开发工具

> 根目录下用于一次性开发、测试、数据转换、图片生成的脚本，未被 `index.html` 或运行时清单引用。

- `__discover_traditional_all.js` — 繁体字扫描脚本，一次性使用
- `__generate_portraits.py` — 批量生成立绘的开发脚本
- `__test_custom_editor.js` — 自定义编辑器测试脚本
- `__update_portraits.py` — 批量更新立绘的开发脚本
- `__verify_noxasen_routes.js` — 诺克萨森剧本路由验证脚本
- `_gameChapters_syntax_check.js` — `gameChapters` 语法检查脚本
- `analyze_runtime.js` — 运行时引用分析脚本（即本次审计工具的同类脚本）
- `convert_t2s.js` — 简繁转换脚本
- `convert_t2s_js.js` — JS 文件简繁转换脚本
- `discover_traditional.js` — 繁体字发现脚本
- `discover_traditional_in_js.js` — JS 内繁体字发现脚本
- `download_images.py` — 图片下载脚本
- `generate_bg_images.py` — 背景图生成脚本
- `generate_bg_pollinations.py` — 背景图生成脚本（Pollinations）
- `inspect-style.js` / `inspect-style2.js` / `inspect-style3.js` — 样式检查脚本（多版本遗留）
- `scripts/seedream_image_generate.py` — Seedream 图片生成脚本
- `start.bat` — 本地启动批处理，非运行时必需
- `test-anim.js` — 动画测试脚本
- `test-bones.js` — 骨骼测试脚本
- `test-reader-mobile.js` — 阅读器移动端测试脚本
- `verify_homepage_traditional.js` — 首页繁体字验证脚本
- `verify_t2s.js` / `verify_t2s_js.js` — 简繁转换验证脚本
- `verify-game-mobile.js` — 游戏移动端验证脚本
- `vrm-renderer.js` — 未引用的 VRM 渲染器脚本（疑似历史 3D 功能残留）

**统计**：27 个文件，0 个目录

---

## 日志文件

> 各类一次性扫描、转换、验证脚本产生的日志输出，不影响运行。

- `__discover_traditional_all.log`
- `convert_t2s_js_summary.log`
- `convert_t2s_summary.log`
- `discover_traditional.log`
- `discover_traditional2.log`
- `discover_traditional4.log`
- `discover_traditional5.log`
- `discover_traditional_in_js.log`
- `discover_traditional_out.log`
- `verify_homepage_traditional.log`
- `verify_t2s.log`
- `verify_t2s_js.log`

**统计**：11 个文件，0 个目录

---

## 测试截图

> `verify-*.png` / `final-verify-*.png` 为页面验证截图，非运行时资源。

- `final-verify-375x667.png`
- `verify-ai-workbench-320x568.png`
- `verify-ai-workbench-360x640.png`
- `verify-ai-workbench-375x667.png`
- `verify-announcement-bookshelf-375x667.png`
- `verify-announcement-reader-375x667.png`
- `verify-bookshelf-375x667.png`
- `verify-bookshelf-after-delete-375x667.png`
- `verify-bookshelf-before-delete-375x667.png`
- `verify-chapter-mission-320x568.png`
- `verify-chapter-mission-360x640.png`
- `verify-chapter-mission-375x667.png`
- `verify-game-320x568.png`
- `verify-game-360x640.png`
- `verify-game-375x667.png`
- `verify-game-panel-320x568.png`
- `verify-game-panel-360x640.png`
- `verify-game-panel-375x667.png`
- `verify-reader-375x667.png`
- `verify-reader-announcement-375x667.png`
- `verify-reader-body-375x667.png`
- `verify-reader-horizontal-375x667.png`
- `verify-reader-settings-375x667.png`
- `verify-reader-toolbar-375x667.png`

**统计**：23 个文件，0 个目录

---

## 备份/临时文件

> 转换备份、临时目录、测试占位文件。

- `index.html.bak.t2s` — `index.html` 简繁转换备份
- `test_unsplash.jpg` — Unsplash 测试占位图
- `_tmp_conv/` — 临时转换目录（含 `package.json`、嵌套 `node_modules/`）

**统计**：2 个文件，2 个目录

---

## 未引用样式/图片/视频

> 未被 `index.html`、`styles.css` 或运行时清单引用的样式、图片、视频及空资源目录。

### 未引用样式

- `styles/inline-extracted.css` — 未被 `styles.css` 导入
- `styles/inline-mobile.css` — 未被 `styles.css` 导入

### 未引用/测试图片（`assets/bg/`）

- `assets/bg/bg_breakroom.jpg`
- `assets/bg/bg_cafeteria.jpg`
- `assets/bg/bg_containment_a.jpg`
- `assets/bg/bg_containment_b.jpg`
- `assets/bg/bg_control_room.jpg`
- `assets/bg/bg_dclass.jpg`
- `assets/bg/bg_entrance.jpg`
- `assets/bg/bg_exterior.jpg`
- `assets/bg/bg_medical.jpg`
- `assets/bg/bg_personnel.jpg`
- `assets/bg/bg_research.jpg`
- `assets/bg/bg_security.jpg`
- `assets/bg/site19_breakroom.png`
- `assets/bg/site19_cafeteria.png`
- `assets/bg/site19_containment_a.png`
- `assets/bg/site19_containment_b.png`
- `assets/bg/site19_control.png`
- `assets/bg/site19_dclass.png`
- `assets/bg/site19_entrance.png`
- `assets/bg/site19_exterior.png`
- `assets/bg/site19_medical.png`
- `assets/bg/site19_personnel.png`
- `assets/bg/site19_research.png`
- `assets/bg/site19_security.png`
- `assets/bg/test_api_direct.jpg`
- `assets/bg/test_apple.jpg`
- `assets/bg/test_apple2.jpg`
- `assets/bg/test_auth.jpg`
- `assets/bg/test_beach.jpg`
- `assets/bg/test_beach2.jpg`
- `assets/bg/test_beach3.jpg`
- `assets/bg/test_curl.jpg`
- `assets/bg/test_curl_new.jpg`
- `assets/bg/test_curl1.jpg`
- `assets/bg/test_default.jpg`
- `assets/bg/test_delayed.jpg`
- `assets/bg/test_direct.jpg`
- `assets/bg/test_direct1.jpg`
- `assets/bg/test_direct2.jpg`
- `assets/bg/test_forest.jpg`
- `assets/bg/test_latest.jpg`
- `assets/bg/test_neon.jpg`
- `assets/bg/test_new.jpg`
- `assets/bg/test_nocache.jpg`
- `assets/bg/test_py.jpg`
- `assets/bg/test_raw.jpg`
- `assets/bg/test_ua.jpg`

### 未引用场景图（`images/scenes/`）

- `images/scenes/citygate.png`
- `images/scenes/courtyard.png`
- `images/scenes/hodgins_scene.png`
- `images/scenes/inn.png`
- `images/scenes/street.png`
- `images/scenes/study.png`
- `images/scenes/tavern.png`
- `images/scenes/violet_scene.png`
- `images/scenes/noxasen/crown-throne.png`
- `images/scenes/noxasen/noble-salon.png`
- `images/scenes/noxasen/people-headquarters.png`
- `images/scenes/noxasen/crown-study.png.placeholder.txt`
- `images/scenes/noxasen/crown-throne.png.placeholder.txt`
- `images/scenes/noxasen/noble-manor.png.placeholder.txt`
- `images/scenes/noxasen/noble-salon.png.placeholder.txt`
- `images/scenes/noxasen/people-headquarters.png.placeholder.txt`
- `images/scenes/noxasen/people-rally.png.placeholder.txt`
- `images/scenes/noxasen/generation-report.txt`

### 未引用瓦片/精灵图

- `images/tilesets/stone_road.png`
- `images/tilesets/wood_floor.png`

### 未引用/预览模型资源

- `models/live2d/levin/README.md` — 未引用的模型说明
- `models/live2d/xiaoski_preview/Epsilon.png`
- `models/live2d/xiaoski_preview/jin.png`
- `models/live2d/xiaoski_preview/Kobayaxi.png`
- `models/live2d/xiaoski_preview/mikoto.png`

### 未引用视频/文本

- `videos/noxasen/video-generation-notes.txt` — 视频生成笔记，非运行时资源

### 空资源目录（未使用）

- `assets/icons/`
- `assets/images/`
- `assets/videos/`
- `audio/`
- `images/avatars/`
- `images/banners/`
- `images/characters/`
- `images/characters/parts/`
- `images/icons/`
- `images/icons/decorations/`
- `images/sprites/`
- `images/scenes/detective/`
- `models/animations/`
- `models/explore/`
- `models/scene/`
- `models/scene/decoration/`
- `models/scene/floor/`
- `models/scene/furniture/`
- `models/scene/props/`
- `models/spine/`
- `pages/activity-clock/`
- `pages/book-shelf/`
- `pages/character/`
- `pages/character-detail/`
- `pages/explore/`
- `pages/gacha/`
- `pages/game/`
- `pages/memorial-collection/`
- `pages/radio-station/`
- `pages/ruse/`
- `pages/ruse/assets/`

**统计**：75 个文件，31 个目录

---

## 重复构建产物

> `dist/` 为 Vite 构建输出目录，`public/` 为静态资源副本目录，二者均包含与源码重复的 JS、图片、模型、视频等资源，且 `index.html` 直接引用的是根目录源码而非 `public/` 中的副本。

- `dist/` — Vite 构建产物目录，包含带哈希名的资源及未哈希的源码副本
- `public/` — 静态资源副本目录，复制了根目录 JS、引擎、模型等文件

**统计**：0 个文件，2 个目录

---

## 过期文档

> `.trae/documents/` 下存放的大量历史设计稿与修复方案，已不再作为当前运行时依赖。

共 136 个 `.md` 文件，包括：

- `add-generation-progress-bar.md`
- `add-mode-selector.md`
- `adjust-homepage-layout-v2.md`
- `ai-roleplay-game-design.md`
- `announcement-mail-for-test-users.md`
- `change-battle-pass-to-model-config.md`
- `change-left-menu-buttons.md`
- `chapter-button-open-book.md`
- `chapter-card-height-final.md`
- `chapter-card-height-fix.md`
- `chapter-card-height-reduce.md`
- `character-chat-upgrade-plan.md`
- `character-list-page.md`
- `chardetail-font-scaling-fix.md`
- `chardetail-layout-correct-fix.md`
- `chardetail-layout-final-fix.md`
- `chardetail-layout-restructure-v3.md`
- `chardetail-layout-ultimate-fix.md`
- `charlist-scroll-fix.md`
- `checkin-clock-fix.md`
- `checkin-clock-fix-v2.md`
- `checkin-clock-fix-v3.md`
- `checkin-clock-fix-v4.md`
- `custom-chapter-editor-fix.md`
- `custom-chapter-feature.md`
- `deep-optimize-all-features.md`
- `fix-action-mode-dialogue-separation-and-ai-hallucination.md`
- `fix-ai-configuration-usage.md`
- `fix-ai-world-loyalty-and-typewriter-v2.md`
- `fix-buttons-and-gameplay.md`
- `fix-chapter-selector-and-upgrade-memorial.md`
- `fix-chapter-start-width-jump-v2.md`
- `fix-charbychar-display-and-portrait.md`
- `fix-chat-layout-issues.md`
- `fix-checkin-button-click-and-text.md`
- `fix-clock-issues-part2.md`
- `fix-creator-wars-gray-screen.md`
- `fix-creator-wars-homepage-layout.md`
- `fix-currentInputMode-undefined.md`
- `fix-custom-chapter-bug.md`
- `fix-custom-game-display.md`
- `fix-dialogue-bar-ratio-adjust.md`
- `fix-dialogue-bar-unify-ratio.md`
- `fix-dialogue-bar-unify-ratio-value.md`
- `fix-dialogue-charbychar-v2.md`
- `fix-dialogue-narration-and-multi-npc.md`
- `fix-dialogue-separation-and-message-bubble.md`
- `fix-douyin-layout-match-wechat.md`
- `fix-galgame-blank-and-generate-bg.md`
- `fix-game-loading-and-layout.md`
- `fix-game-quickmenu-charlist-scaling.md`
- `fix-game-ui-four-issues.md`
- `fix-homepage-layout-v2.md`
- `fix-model-btn-not-working.md`
- `fix-narration-dialogue-separation-and-multi-npc.md`
- `fix-narration-dialogue-separation-systematic.md`
- `fix-narration-font-and-pronoun-confusion.md`
- `fix-narration-misclassification-and-action-mode.md`
- `fix-narration-not-loading-and-cleanup.md`
- `fix-narration-style-and-player-input.md`
- `fix-opening-auto-play-and-chapterid-error.md`
- `fix-opening-story-repeat.md`
- `fix-portrait-and-narration-confusion.md`
- `fix-portrait-disappear-and-auto-skip.md`
- `fix-portrait-loading-and-dialogue-charchar.md`
- `fix-speaker-detection-text-ratio-mobile-touch.md`
- `fix-status-bar-merge-and-travel-logic.md`
- `fix-timeline-ui-and-remove-objective.md`
- `gacha-visual-refinement.md`
- `game-page-compact.md`
- `game-page-compact-v2.md`
- `homepage-art-upgrade-plan.md`
- `homepage-font-scaling-fix.md`
- `homepage-four-fixes.md`
- `homepage-layout-adjustments-and-icon-improvement.md`
- `homepage-simple-tweaks.md`
- `improve-dialogue-immersion.md`
- `increase-home-card-sizes-and-fix-button-spacing.md`
- `Live2D CDN 自动化测试与诊断方案.md`
- `Live2D测试页面遮罩和模型消失问题修复.md`
- `Live2D角色模型消失问题深度诊断.md`
- `Live2D全身模型动作测试页面.md`
- `load-bg-video-and-shrink-avatar.md`
- `narration-fix-and-system-presence-enhancement.md`
- `narrative-perspective-player-choice.md`
- `narrow-transparent-game-bars-plan.md`
- `NPC_TTS_Edge_TTS_实施计划.md`
- `optimize-homepage-layout.md`
- `performance-optimization.md`
- `reduce-chapter-start-height-only.md`
- `remove-3d-explore-world.md`
- `remove-events-and-add-novel-reference.md`
- `remove-quest-fix-narration-upgrade-inventory-custom-bg.md`
- `simplify-mailbox-to-announcements.md`
- `task-system-mobile-fix.md`
- `three-detail-fixes.md`
- `three-page-fixes.md`
- `transparent-buttons-and-load-bg-video.md`
- `TTS_按钮_UI_优化方案.md`
- `upgrade-model-config-panel.md`
- `vrm-3d-model-integration.md`
- `创业计划书制作计划.md`
- `改造人物纪念收藏为模型测试页面.md`
- `根本性修复VRM手臂骨骼动画问题.md`
- `更换VRM模型计划.md`
- `集成AI控制模型测试页面.md`
- `检查游玩界面与升级计划.md`
- `角色建模消失问题诊断与修复.md`
- `剧本游玩UI布局修正计划.md`
- `全面检查样式布局问题修复计划.md`
- `删除多余头像并修正好感度位置.md`
- `深入修复VRM动画骨骼适配问题.md`
- `升级任务列表.md`
- `实现剧本一键成书功能.md`
- `书架阅读器全面改造方案.md`
- `项目设计改进方案.md`
- `修复Live2D测试页面CDN加载问题.md`
- `修复Live2D模型点击交互反馈.md`
- `修复VRM-file协议兼容性.md`
- `修复VRM-file协议兼容性-v2.md`
- `修复VRM动画轴错误和加载逻辑.md`
- `修复VRM内置动画骨骼适配问题.md`
- `修复抽卡页面点击无响应.md`
- `修复角色模型点击交互反馈.md`
- `修复角色模型加载问题.md`
- `修复角色系统三个问题.md`
- `修复书架阅读器正文缺失问题.md`
- `修复一键成书章节导航.md`
- `修复一键成书正文生成功能.md`
- `修复自定义剧本 NPC 卡片 UI 与立绘选择器.md`
- `修正好感度条位置到消息头像下方.md`
- `用Mixamo动画替代手写关键帧.md`
- `优化VRM模型切换和扩充动画库.md`
- `优化角色系统显示和布局.md`
- `自定义剧本功能检查与修复计划.md`
- `自定义剧本页面及子页面优化计划.md`

**统计**：136 个文件，0 个目录

---

## 高风险待确认目录

> 以下目录可能曾用于 VRM/3D、Live2D 测试、动作测试等功能，**需人工复核**后方可决定是否删除。

- `vendor/` — Three.js 核心库及插件（`three.core.js`、`three.module.js`、`GLTFLoader.js`、`BufferGeometryUtils.js`），可能与历史 VRM/3D 功能相关，需人工复核
- `js/` — 含 `fflate.js`、`vrm-bundle.js`、`vrm-entry.js` 及空 `radio-station/` 目录，VRM 相关代码，需人工复核
- `models/vrm/` — 5 个 VRM 模型文件（`aili.vrm`、`AliciaSolid_vrm-0.51.vrm`、`huoli_shaonv.vrm`、`VRM1_Constraint_Twist_Sample.vrm`、`VRM1_Constraint_Twist_Sample_dev.vrm`），未在当前运行时清单中引用，需人工复核
- `engine/` — 当前仅含必需的 `ScriptEngineBridge.js`，无其他可废弃文件；目录本身为高风险边界，已确认安全
- `test-screenshots/` — 含 `bow.png`、`cheer.png`、`clap.png`、`raise_right_hand.png`、`rest_pose.png`、`wave.png`，疑似动作测试截图，需人工复核

**统计**：0 个文件，5 个目录

---

## 未纳入统计的目录

> 以下目录为依赖、缓存或本次审计输出，不属于项目源码废弃文件统计范围：

- `.git/` — Git 仓库
- `.trae/specs/audit-and-slim-project-bloat/` — 本次审计 spec 与输出报告
- `.vite/` — Vite 缓存
- `.uploads/` — 上传缓存
- `node_modules/` — npm 依赖
- `_tmp_conv/node_modules/` — 临时目录内的嵌套依赖
