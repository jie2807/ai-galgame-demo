# Tasks

- [ ] Task 1: 研究大赛规则与评审标准
  - [ ] 收集 Trae AI 创造力大赛官方赛道说明、评分维度、材料要求
  - [ ] 确认初赛截止时间、提交入口、文件格式与大小限制
  - [ ] 输出 `assets/contest/trae-creativity-2026/rules-summary.md`

- [ ] Task 2: 确定参赛定位与赛道
  - [ ] 评估生活娱乐、学习工作、社会服务、硬件交互四大赛道与本项目的匹配度
  - [ ] 选择主赛道并准备 1 个备选赛道理由
  - [ ] 明确目标用户画像与项目解决的痛点
  - [ ] 输出 `assets/contest/trae-creativity-2026/positioning.md`

- [ ] Task 3: 提炼核心卖点
  - [ ] 梳理项目功能清单（AI 对话、自定义剧本、Creator Wars、Live2D/TTS、移动端/PWA 等）
  - [ ] 提炼 3-5 个核心卖点，每个卖点包含：一句话定位、功能支撑、可演示路径
  - [ ] 确认所有卖点均可通过项目现有功能验证
  - [ ] 输出 `assets/contest/trae-creativity-2026/key-selling-points.md`

- [ ] Task 4: 准备项目文案材料
  - [ ] 编写 `project-name.md`：原创项目名称 + 3-5 条候选 Slogan
  - [ ] 编写 `short-intro.md`：≤ 50 字一句话介绍
  - [ ] 编写 `full-intro.md`：300-800 字项目完整介绍
  - [ ] 编写 `developer-story.md`：200-500 字创作理念/开发者故事
  - [ ] 所有文案保存到 `assets/contest/trae-creativity-2026/copy/`

- [ ] Task 5: 处理版权/IP 风险
  - [ ] 评估「紫罗兰永恒花园」名称与《Violet Evergarden》的 IP 重合风险
  - [ ] 准备至少 3 个原创备选名称及理由
  - [ ] 制定最小替换清单（manifest、首页标题、角色名/设定文案）
  - [ ] 输出 `assets/contest/trae-creativity-2026/ip-risk-and-rename-plan.md`

- [ ] Task 6: 准备视觉展示材料
  - [ ] 整理项目现有截图、宣传图、图标资源
  - [ ] 生成/优化 1 张 16:9 主视觉海报（≥ 1920×1080）
  - [ ] 准备 3-5 张功能截图（9:16 竖版 ≥ 1080×1920 或 16:9 横版 ≥ 1920×1080）
  - [ ] 准备/优化 1 张 1:1 项目 Logo/图标（≥ 512×512）
  - [ ] 所有视觉材料保存到 `assets/contest/trae-creativity-2026/visuals/`

- [ ] Task 7: 制作演示视频/GIF
  - [ ] 编写 1-3 分钟演示脚本（按 30s/60s/30s 三段式）
  - [ ] 录制核心流程：首页 → 官方剧本 → AI 对话 → 自定义剧本/Creator Wars
  - [ ] 剪辑并添加字幕、背景音乐、项目名称水印
  - [ ] 输出视频到 `assets/contest/trae-creativity-2026/demo-video/`

- [ ] Task 8: 部署可访问演示链接
  - [ ] 主方案：将项目推送到 GitHub 仓库并启用 GitHub Pages（推荐，无需等待自有服务器审核）
  - [ ] 备用方案：同步部署到 Vercel / Netlify / Cloudflare Pages 至少一个平台
  - [ ] 若担心内嵌 API Key 暴露，评估是否使用 Cloudflare Workers 或 Vercel Serverless Function 做简易反向代理
  - [ ] 验证首页、章节、游戏、自定义剧本等核心流程可访问
  - [ ] 验证桌面端与移动端访问体验
  - [ ] 临时方案：准备 ngrok / Cloudflare Tunnel 命令，以便在必要时快速暴露本地服务
  - [ ] 将所有可用链接写入 `assets/contest/trae-creativity-2026/README.md`

- [ ] Task 9: 整理提交材料包
  - [ ] 创建 `assets/contest/trae-creativity-2026/README.md`，汇总所有材料清单与用途
  - [ ] 核对文案、视觉、视频、链接的一致性与规格合规性
  - [ ] 准备最终提交清单（按大赛后台字段逐项对应）

- [ ] Task 10: 准备评审答辩
  - [ ] 预测 8-10 个评审可能提问
  - [ ] 为每个问题准备 3-5 句话回答要点
  - [ ] 绘制项目技术架构简图（前端、AI 接口、存储、Live2D/TTS）
  - [ ] 输出 `assets/contest/trae-creativity-2026/q-and-a.md`

# Task Dependencies

- Task 2 依赖 Task 1（需先了解赛道规则）
- Task 3 依赖 Task 2（需先明确定位）
- Task 4 依赖 Task 3（需先明确卖点）
- Task 5 可与 Task 3/4 并行
- Task 6 依赖 Task 4/5（需确定名称与卖点后再录制）
- Task 8 可与 Task 6/7 并行
- Task 9 依赖 Task 4/5/6/7/8
- Task 10 依赖 Task 3/4/5
