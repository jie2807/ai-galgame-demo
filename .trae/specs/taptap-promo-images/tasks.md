# Tasks

- [x] Task 1: 创建 `images/promo/` 目录
  - [x] SubTask 1.1: 在项目根目录下新建 `images/promo/` 文件夹，用于存放 3 张宣传图

- [x] Task 2: 制作第 1 张——主视觉图（KV）
  - [x] SubTask 2.1: 调用 `byted-seedream-image-generate` 技能，构造 prompt：横版 2560×1440（5.0 最小像素要求，16:9，可缩放至 1920×1080），融合末日废土与仙侠修真双世界观，Live2D 立绘角色点缀，体现"AI 互动文字冒险"沉浸感
  - [x] SubTask 2.2: 在 prompt 中**明确排除**：紫罗兰相关意象（no flowers）、AI 工作台元素
  - [x] SubTask 2.3: 将生成的图片保存为 `images/promo/promo-01-kv.png`

- [x] Task 3: 制作第 2 张——核心玩法图
  - [x] SubTask 3.1: 调用 `byted-seedream-image-generate` 技能，构造 prompt：横版 2560×1440，展示功能矩阵——官方剧本（末日文/修仙文）、自定义剧本、章节任务、好感度、抽卡、邮件、成就等，图标+简短文案排版
  - [x] SubTask 3.2: 在 prompt 中**明确排除**：AI 工作台相关功能、紫罗兰字样（no flowers）
  - [x] SubTask 3.3: 将生成的图片保存为 `images/promo/promo-02-features.png`

- [x] Task 4: 制作第 3 张——沉浸体验图
  - [x] SubTask 4.1: 调用 `byted-seedream-image-generate` 技能，构造 prompt：横版 2560×1440，还原视觉小说游玩场景——横屏对话界面 + 角色立绘 + 多分支多结局氛围
  - [x] SubTask 4.2: 在 prompt 中体现"多结局""高自由度""角色互动"卖点
  - [x] SubTask 4.3: 在 prompt 中**明确排除**：紫罗兰字样（no flowers）、AI 工作台元素
  - [x] SubTask 4.4: 将生成的图片保存为 `images/promo/promo-03-experience.png`

- [x] Task 5: 风格统一性校验
  - [x] SubTask 5.1: 三张图 prompt 统一使用 dark navy/teal 背景 + warm gold 强调色 + anime 风格 + cinematic 质感 + 均排除 flowers/watermark，色调画风一致；如用户查看后认为差异过大可重新生成

# Task Dependencies
- Task 2、3、4 已并行执行完成
- Task 5 依赖 Task 2、3、4 全部完成，已校验
- Task 1 是所有生图任务的前置条件，已完成
