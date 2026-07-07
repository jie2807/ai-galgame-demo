# 项目清理报告

> 项目路径：`d:\BC\ai_resume\qmzz`  
> 报告生成时间：2026-06-24  
> 关联文档：
> - [runtime-dependencies.md](./runtime-dependencies.md)
> - [obsolete-files-report.md](./obsolete-files-report.md)
> - [tasks.md](./tasks.md)

---

## 一、清理概览

本次清理覆盖 Task 3 至 Task 6，已删除大量开发残留、未引用资源、重复构建产物及过期文档。清理后项目根目录结构显著精简，核心运行时文件完整保留。

| 指标 | 数值 | 说明 |
|------|------|------|
| 删除文件数（估算） | ≥ 270 个 | Task 3 / 4 / 6 以文件为主，Task 5 以目录为主 |
| 删除目录数（估算） | ≥ 40 个 | 含空资源目录、构建产物目录、文档目录等 |
| 释放空间总额（估算） | **约 135 MB** | Task 5 精确统计 113.28 MB，其余子任务保守估算约 20–25 MB |
| 运行时必需文件 | 48 个 | 全部保留，无缺失 |

> **空间估算口径**：Task 5 的 `dist/`、`public/`、`vendor/`、`js/`、`models/vrm/`、`test-screenshots/`、`bone-diagnostic.html` 已按实际扫描大小精确统计；Task 3、Task 4、Task 6 因未保留删除前精确字节记录，采用保守估算（临时脚本/日志/截图按典型大小估算，`.trae/documents/` 及过期 spec 按 Markdown 小文件估算）。

---

## 二、各子任务删除清单汇总

### Task 3：根目录开发残留

删除根目录下的一次性开发脚本、验证脚本、日志、测试截图、备份文件及临时目录。

| 类别 | 数量 | 主要内容 |
|------|------|----------|
| 临时脚本 / 开发工具 | 27 个文件 | `__discover_traditional_all.js`、`_gameChapters_syntax_check.js`、`analyze_runtime.js`、`convert_t2s*.js`、`discover_traditional*.js`、`inspect-style*.js`、`verify-*.js`、`test-*.js`、`vrm-renderer.js` 等 |
| 日志文件 | 11 个文件 | `__discover_traditional_all.log`、`convert_t2s*.log`、`discover_traditional*.log`、`verify_*.log` 等 |
| 测试截图 | 23 个文件 | `final-verify-*.png`、`verify-*.png` 等移动端页面验证截图 |
| 备份 / 临时文件 | 2 个文件、2 个目录 | `index.html.bak.t2s`、`test_unsplash.jpg`、`_tmp_conv/`（含嵌套 `node_modules/`） |
| package 文件 | 2 个文件 | `package.json`、`package-lock.json`（确认无实际运行依赖） |
| **小计** | **约 65 个文件、2 个目录** | 估算释放空间：约 **8 MB** |

### Task 4：未引用资源目录

删除运行时必需清单中未引用的样式、图片、视频、模型预览资源及空资源目录。

| 类别 | 数量 | 主要内容 |
|------|------|----------|
| 未引用样式 | 2 个文件 | `styles/inline-extracted.css`、`styles/inline-mobile.css` |
| 未引用 / 测试图片 | 约 47 个文件 | `assets/bg/` 下全部 `test_*.jpg`、SCP 测试背景（`site19_*.png`、`bg_*.jpg`） |
| 未引用场景图 | 约 18 个文件 | `images/scenes/` 下 `citygate.png`、`courtyard.png` 等，含占位符 `.placeholder.txt` 与生成报告 |
| 未引用瓦片 / 精灵图 | 2 个文件 | `images/tilesets/stone_road.png`、`images/tilesets/wood_floor.png` |
| 未引用模型预览资源 | 5 个文件 | `models/live2d/levin/README.md`、`models/live2d/xiaoski_preview/*.png` |
| 未引用视频笔记 | 1 个文件 | `videos/noxasen/video-generation-notes.txt` |
| 空资源目录 | 31 个目录 | `assets/icons/`、`assets/images/`、`assets/videos/`、`audio/`、`images/avatars/`、`images/sprites/`、`pages/activity-clock/` 等 |
| **小计** | **约 75 个文件、31 个目录** | 估算释放空间：约 **15 MB** |

### Task 5：构建产物与高风险目录

删除与源码重复的构建产物，以及经人工复核后确认不再引用的 VRM / 3D 相关高风险目录。

| 目标 | 类型 | 释放空间（MB） | 说明 |
|------|------|----------------|------|
| `dist/` | 目录 | 40.741 | Vite 构建产物，含带哈希资源及源码副本 |
| `public/` | 目录 | 0.943 | Vite 静态资源副本，与根目录源码重复 |
| `vendor/` | 目录 | 2.057 | Three.js 核心库及插件，VRM 功能移除后无引用 |
| `js/` | 目录 | 0.999 | VRM 相关入口与打包文件（`vrm-bundle.js`、`vrm-entry.js`、`fflate.js`） |
| `models/vrm/` | 目录 | 65.752 | 5 个 VRM 模型文件（`aili.vrm`、`AliciaSolid_vrm-0.51.vrm` 等） |
| `test-screenshots/` | 目录 | 2.772 | 动作测试截图（`bow.png`、`cheer.png`、`clap.png` 等） |
| `bone-diagnostic.html` | 文件 | 0.016 | VRM 骨骼诊断页面 |
| **小计** | **6 个目录、1 个文件** | **113.280 MB** | 精确统计 |

### Task 6：过期文档与 spec

清理 `.trae/documents/` 历史设计稿与修复方案，以及已执行完毕且无后续价值的旧 spec 目录。

| 目标 | 数量 | 说明 |
|------|------|------|
| `.trae/documents/*.md` | 136 个文件 | 历史设计稿、修复方案、实施计划等 |
| `.trae/specs/` 旧 spec 目录 | 若干 | 已执行完毕且无后续价值的 spec 目录（保留正在执行或近期相关的 spec） |
| **小计** | **约 136+ 个文件、若干目录** | 估算释放空间：约 **2 MB** |

---

## 三、保留的关键运行时文件说明

清理后，`index.html` 所需的全部本地资源均完整保留，共 48 个关键运行时文件。

### CSS（8 个）

- `styles.css`
- `styles/variables.css`、`styles/reset.css`、`styles/animations.css`
- `pages/home/home.css`、`pages/chapter-mission/chapter-mission.css`、`pages/custom-chapter/custom-chapter.css`、`pages/creator-wars/creator-wars.css`

### JS（9 个）

- `pixi.min.js`、`live2d.min.js`、`live2dcubismcore.min.js`、`live2d-display.min.js`
- `live2d-renderer.js`、`sprite-renderer.js`、`action-tag-parser.js`
- `models/sprite/violet-sprite.js`
- `engine/ScriptEngineBridge.js`（`index.html` 动态导入）

### 图片（25 个）

- 背景 / 装饰：`images/backgrounds/main_bg.jpg`、`warm_light.jpg`、`vintage_texture.jpg`、`images/evergarden-flowers.jpg`、`images/starry-sky.jpg`
- 头像：`images/violet-avatar.jpg`、`images/violet-avatar-lg.jpg`
- 卡片：`images/cards/books_letters.jpg`、`images/cards/school_building.jpg`、`images/character-collection.jpg`
- 诺克萨森立绘：`images/portraits/noxasen/*.png`（9 个）
- 诺克萨森封面：`images/scenes/noxasen/people-rally.png`、`noble-manor.png`、`crown-study.png`
- 动态稀有度印：`images/seal_3.png`、`images/seal_4.png`

### 视频（3 个）

- `videos/main_background.mp4`
- `videos/chapter_background.mp4`
- `videos/charlist_bg.mp4`

### Live2D 模型（3 个入口文件 + 完整资源）

- `models/live2d/hiyori/Hiyori.model3.json`
- `models/live2d/haru/haru_greeter_t03.model3.json`
- `models/live2d/mao/Mao.model3.json`

> 以上 model3.json 对应的纹理、动作、表情、物理等文件均保留在 `models/live2d/` 下，确保 Live2D 渲染正常。

---

## 四、优化建议

针对本次未删除但可进一步优化的项目，提出以下建议：

### 1. 大视频文件压缩

| 项目 | 当前大小 | 预期收益 | 操作方式 |
|------|----------|----------|----------|
| `videos/chapter_background.mp4` | 10.904 MB | 可减少 30%–70%（约 3–7 MB） | 使用 H.264 / H.265 重新编码，降低码率至 1–2 Mbps，分辨率按实际展示尺寸裁剪 |
| `videos/main_background.mp4` | 2.669 MB | 可减少 30%–50% | 同上，或转换为 WebM 格式以提升压缩率 |
| `videos/charlist_bg.mp4` | 2.669 MB | 可减少 30%–50% | 同上 |

> 视频目前是项目中最大的单个资源类型，三个视频合计约 16.2 MB，占项目总大小的 45% 以上，压缩收益最高。

### 2. Live2D 纹理图压缩

| 项目 | 当前大小 | 预期收益 | 操作方式 |
|------|----------|----------|----------|
| `models/live2d/mao/Mao.2048/texture_00.png` | 2.986 MB | 可减少 50%–70% | 使用 TinyPNG / oxipng 压缩，或降低纹理尺寸/色彩深度 |
| `models/live2d/hiyori/Hiyori.2048/texture_01.png` | 2.388 MB | 可减少 50%–70% | 同上 |
| `models/live2d/hiyori/Hiyori.2048/texture_00.png` | 1.730 MB | 可减少 50%–70% | 同上 |
| `models/live2d/haru/haru_greeter_t03.2048/*.png` | 2.590 MB 合计 | 可减少 50%–70% | 同上 |

> Live2D 纹理当前合计约 9.6 MB，压缩后预计可释放 4–6 MB。

### 3. `index.html` 内联资源拆分

| 项目 | 当前大小 | 预期收益 | 操作方式 |
|------|----------|----------|----------|
| `index.html` | 2.149 MB | 减小首页主文档 50%–80% | 将内联的 base64 图片 / 大段 JSON 数据 / CSS 提取为独立文件（如 `data/xxx.json`、`images/inline-*.png`、`styles/inline.css`），按需异步加载 |

> 当前 `index.html` 过大，会导致首屏解析和传输耗时增加。拆分后可利用浏览器缓存，并提升首屏加载速度。

### 4. 目录结构整理

| 项目 | 现状 | 预期收益 | 操作方式 |
|------|------|----------|----------|
| `assets/` 目录 | 清理后已为空目录 | 消除歧义 | 删除空目录，或统一将 `images/`、`videos/`、`models/` 等资源迁入 `assets/` 并统一引用路径 |
| `images/` 与 `models/` 并列 | 资源分散在多个顶层目录 | 提升可维护性 | 建立 `assets/images/`、`assets/videos/`、`assets/models/` 统一资源入口 |

> 当前 `assets/` 为空，与 `images/`、`videos/` 并存，目录语义不一致，建议统一规范。

### 5. 合并重复/相似图片

| 项目 | 现状 | 预期收益 | 操作方式 |
|------|------|----------|----------|
| `images/seal_3.png`、`images/seal_4.png` | 疑似仅 rarity 不同 | 减少文件数与缓存开销 | 合并为精灵图（sprite sheet）或使用 SVG/CSS 动态渲染 |
| `images/backgrounds/` 与 `images/scenes/` | 用途相近 | 避免重复资源 | 梳理背景图使用场景，删除未实际展示的图片 |

### 6. `node_modules` 精简

| 项目 | 当前大小 | 预期收益 | 操作方式 |
|------|----------|----------|----------|
| `node_modules/three` | 较大（含示例、wasm） | 可减少数 MB | VRM 已移除，若不再使用 3D 功能，可移除 `three` 及相关依赖 |
| `node_modules/playwright` | 较大 | 可减少数 MB | 若仅用于一次性测试截图，可移至开发依赖或移除 |
| `node_modules/@esbuild/win32-x64/esbuild.exe` | 9.455 MB | 若无需构建可移除 | 项目已无 `package.json`，但 `node_modules` 仍保留，建议确认是否仍需 Vite/esbuild |

> 当前 `node_modules/` 仍占用较大空间，且项目根目录已无 `package.json`，建议评估是否整体移除或重建最小依赖。

### 7. 建立资源构建流水线

| 项目 | 预期收益 | 操作方式 |
|------|----------|----------|
| 自动化压缩图片 / 视频 / 纹理 | 持续控制仓库体积 | 引入 `imagemin`、`ffmpeg` 等工具，在提交前自动压缩新增资源 |
| 生成现代格式（WebP / AVIF / WebM） | 进一步提升加载性能 | 对支持的浏览器返回现代格式资源，降级至 PNG / MP4 |

---

## 五、风险说明

1. **不可逆性**：本次清理已永久删除 `dist/`、`public/`、`vendor/`、`js/`、`models/vrm/`、`.trae/documents/` 等目录及大量文件。删除后无法通过 Git 回退（当前项目非 Git 仓库）。
2. **备份建议**：
   - 清理前未进行全量备份的用户，建议在执行 Task 8 验证前，先对当前项目目录做一次完整压缩备份；
   - 关键运行时文件（`index.html`、`styles.css`、`engine/ScriptEngineBridge.js`、Live2D 模型目录、`videos/`）应优先备份。
3. **运行时验证**：本次报告为 Task 7，Task 8 需验证 `index.html` 首页无 404、控制台无关键资源加载失败、章节任务 / 自定义剧本 / Creator Wars 等页面功能正常、Live2D / 视频背景 / TTS 等核心功能正常。
4. **优化建议风险**：视频压缩、纹理降尺寸、`index.html` 拆分等优化操作需逐项验证，避免破坏资源引用路径或运行时行为。

---

## 六、总结

- **报告文件路径**：`d:\BC\ai_resume\qmzz\.trae\specs\audit-and-slim-project-bloat\cleanup-report.md`
- **估算释放空间总额**：**约 135 MB**（Task 5 精确统计 113.28 MB + 其余子任务保守估算约 20–25 MB）
- **主要优化建议条目数**：**7 条**（视频压缩、Live2D 纹理压缩、`index.html` 拆分、目录结构整理、重复图片合并、`node_modules` 精简、资源构建流水线）
