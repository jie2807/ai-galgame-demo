# Tasks

- [x] Task 1: 建立运行时依赖清单
  - [x] 读取 `index.html`，提取所有 `<link>`、`<script>`、`<img>`、`<video>`、CSS `url()`、JS 动态加载引用的本地文件路径
  - [x] 读取 `styles.css` 及其 `@import` 链，提取间接依赖的 CSS 文件
  - [x] 汇总形成「运行时必需文件清单」

- [x] Task 2: 扫描并分类疑似废弃文件
  - [x] 遍历项目根目录，列出所有未被运行时必需清单引用的文件与目录
  - [x] 将疑似废弃内容按类别分类：临时脚本/日志、测试截图、重复构建产物、未引用样式/JS、过期文档、测试图片等
  - [x] 对高风险文件（如 `engine/`、`vendor/`、`js/`、`models/`、`dist/`、`public/`）进行人工复核，确认是否可删除

- [x] Task 3: 清理根目录开发残留
  - [x] 删除所有 `*.log` 文件
  - [x] 删除所有 `verify-*.png`、`final-verify-*.png` 测试截图
  - [x] 删除所有 `test-*.js`、`verify-*.js`、`discover_traditional*.js` 等临时脚本
  - [x] 删除 `index.html.bak.t2s`、`_tmp_conv/` 等备份/临时目录
  - [x] 删除 `__discover_traditional_all.js`、`_gameChapters_syntax_check.js`、`*_syntax_check.js`、`analyze_runtime.js`、`inspect-style*.js`、`convert_t2s*.js` 等开发工具脚本
  - [x] 删除 `package-lock.json`、`package.json`（若无实际运行依赖）

- [x] Task 4: 清理未引用资源目录
  - [x] 删除 `styles/inline-extracted.css` 与 `styles/inline-mobile.css`（确认未被引用后）
  - [x] 删除 `assets/bg/` 中所有 `test_*.jpg` 临时图片，以及未被运行时引用的 SCP 测试背景
  - [x] 删除 `test-screenshots/` 目录
  - [x] 评估并删除 `vendor/`、`js/`、`models/vrm/` 中未被运行时引用的文件
  - [x] 清理 `videos/` 中 `index.html` 未引用的视频文件

- [x] Task 5: 清理构建产物与重复目录
  - [x] 确认 `dist/` 是否为纯构建产物且与源码重复，若是则删除整个 `dist/`
  - [x] 确认 `public/` 是否为 Vite 构建遗留且与源码重复，若是则删除整个 `public/`
  - [x] 确认 `engine/ScriptEngineBridge.js` 是否仍被 `index.html` 动态导入，若是则保留，否则删除

- [x] Task 6: 清理过期文档与 spec
  - [x] 审阅 `.trae/documents/`，删除与当前运行逻辑明显无关或已废弃的设计稿与计划文档
  - [x] 审阅 `.trae/specs/`，删除已执行完毕且无后续价值的旧 spec 目录（保留正在执行或近期相关的 spec）

- [x] Task 7: 生成清理报告并优化建议
  - [x] 汇总已删除文件清单与节省空间估算
  - [x] 对未删除但可优化的项目给出明确建议（如视频压缩、图片合并、目录重组）

- [x] Task 8: 验证清理后项目可正常运行
  - [x] 打开 `index.html`，确认首页无 404 错误
  - [x] 检查浏览器控制台，确认无关键资源加载失败
  - [x] 进入章节任务、自定义剧本、Creator Wars 等页面，确认功能正常
  - [x] 验证 Live2D/Sprite 渲染、视频背景、TTS 等核心功能正常

# Task Dependencies

- Task 2 依赖 Task 1
- Task 3、Task 4、Task 5、Task 6 可并行执行，但均依赖 Task 2 的分类结果
- Task 7 依赖 Task 3-6 完成
- Task 8 依赖 Task 3-7 完成
