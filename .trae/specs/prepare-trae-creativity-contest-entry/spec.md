# Trae AI 创造力大赛参赛方案 Spec

## Why

项目已完成核心功能开发（AI Galgame、自定义剧本编辑器、Creator Wars 社交经营、Live2D/TTS、移动端适配、PWA），处于可演示状态。为在初赛中清晰传递项目价值、提升评审通过率，需要一份系统的参赛方案：明确赛道定位、提炼差异化卖点、准备提交材料与演示方案，并提前处理可能影响参赛的版权/IP 风险。

## What Changes

- 明确参赛赛道为生活娱乐，并给出赛道匹配理由
- 提炼 3-5 个可验证的核心卖点，每个卖点对应项目具体功能
- 准备初赛提交材料：项目名称与 Slogan、短/长介绍、开发者故事、截图、海报、演示视频、可访问链接
- 整理统一材料包 `assets/contest/trae-creativity-2026/`
- 设计 1-3 分钟评审演示脚本，突出 AI 互动叙事体验
- 准备评审可能提问的 Q&A 与技术架构简图
- 评估「紫罗兰永恒花园」名称的 IP 风险，准备原创备选名与替换方案

## Impact

- Affected specs: `adapt-mobile-launch-final`、`prepare-taptap-store-listing-materials`、`overhaul-scripts-tts-mail-avatar`、`rewrite-cultivation-as-transmigrator` 等所有已完成功能规格
- Affected code: 不强制修改核心代码；可能新增/替换首页与 manifest 中的应用名称、图标与营销文案
- Risk: 当前名称与动漫 IP 高度重合，参赛/上架存在版权争议风险，需在方案阶段处理

## ADDED Requirements

### Requirement: 参赛赛道与定位

The system SHALL 明确项目参加 Trae AI 创造力大赛「生活娱乐」赛道，并解释与赛道主题的匹配关系。

#### Scenario: 赛道选择合理
- **WHEN** 评审查看项目报名信息
- **THEN** 项目主赛道为生活娱乐
- **AND** 说明本项目通过 AI 降低互动故事创作与体验门槛，属于「AI + 娱乐/创意内容」方向
- **AND** 提供至少 1 个备选赛道及理由（如学习工作：AI 辅助剧本创作与叙事能力训练）

### Requirement: 核心卖点提炼

The system SHALL 输出 3-5 个核心卖点，每个卖点包含一句话定位、功能支撑和可演示路径。

#### Scenario: 卖点可验证
- **WHEN** 评审阅读项目介绍或观看演示
- **THEN** 能清楚理解项目解决的痛点和创新点
- **AND** 每个卖点都能在项目现有功能中找到对应入口（如 AI 实时生成剧情 → 自定义剧本编辑器智能生成；沉浸式体验 → Live2D + TTS + 场景音乐）

### Requirement: 提交材料准备

The system SHALL 准备 Trae AI 创造力大赛初赛所需的全部文案与视觉材料。

#### Scenario: 文案材料完整
- **WHEN** 用户打开 `assets/contest/trae-creativity-2026/copy/`
- **THEN** 包含 `project-name.md`（项目名称与 Slogan）
- **AND** 包含 `short-intro.md`（≤ 50 字一句话介绍）
- **AND** 包含 `full-intro.md`（300-800 字项目介绍）
- **AND** 包含 `developer-story.md`（200-500 字创作理念）
- **AND** 所有文案风格统一，不出现未实现功能或夸大承诺

#### Scenario: 视觉材料规格合规
- **WHEN** 用户打开 `assets/contest/trae-creativity-2026/visuals/`
- **THEN** 包含 1 张 16:9 主视觉海报（≥ 1920×1080）
- **AND** 包含 3-5 张功能截图（9:16 竖版 ≥ 1080×1920 或 16:9 横版 ≥ 1920×1080）
- **AND** 包含 1 张 1:1 项目 Logo/图标（≥ 512×512）
- **AND** 图片内容对应真实功能，不误导

### Requirement: 演示方案

The system SHALL 设计一段 1-3 分钟的评审演示内容，优先展示 AI 互动叙事的核心体验。

#### Scenario: 演示路径清晰
- **WHEN** 评审观看演示视频或现场演示
- **THEN** 前 30 秒说明「这是什么」
- **AND** 前 1 分钟展示首页与官方剧本进入流程
- **AND** 接下来 1-2 分钟展示 AI 实时对话、选择影响剧情、Live2D/TTS 沉浸体验
- **AND** 最后 30 秒展示自定义剧本编辑器或 Creator Wars，体现创作/社交玩法延展性

### Requirement: 可访问演示链接

The system SHALL 在自有服务器审核期间，通过免费静态托管平台部署可访问的演示地址，并准备备用链接与兜底方案。

#### Scenario: 主方案可用
- **WHEN** 评审点击项目演示链接
- **THEN** 页面能在 5 秒内加载完成
- **AND** 桌面端与移动端均可正常进入核心流程
- **AND** 主链接使用 GitHub Pages 部署（仓库直接启用 Pages 即可，无需等待服务器审核）

#### Scenario: 备用链接兜底
- **WHEN** GitHub Pages 在国内访问受限或出现故障
- **THEN** 提供 Vercel、Netlify 或 Cloudflare Pages 备用链接
- **AND** 备用链接内容与主链接一致

#### Scenario: API Key 安全（可选增强）
- **WHEN** 项目需要公开部署且担心内嵌 API Key 暴露
- **THEN** 使用 Cloudflare Workers 或 Vercel Serverless Function 做简易反向代理，将 Key 放在服务端
- **AND** 前端只调用同域代理接口，不直接暴露 Key

#### Scenario: 临时本地演示
- **WHEN** 尚未完成任何线上部署，又需要快速给评审体验
- **THEN** 可使用 ngrok 或 Cloudflare Tunnel 将本地服务临时暴露为公网链接
- **AND** 明确告知该链接仅用于临时演示，关闭本地服务后失效

### Requirement: 版权/IP 风险处理

The system SHALL 评估当前名称「紫罗兰永恒花园」的 IP 风险，并提供原创化方案。

#### Scenario: 风险可控
- **WHEN** 用户查看参赛方案
- **THEN** 明确提示当前名称与《Violet Evergarden》中文译名及核心设定（C.H 邮政公司、自动手记人偶、VIOLET 角色）存在高度重合
- **AND** 提供至少 3 个原创备选名称（如「紫罗兰书简」「末日书信」「Everpage」等）
- **AND** 给出最小替换范围：应用名称、manifest、首页标题、角色名/设定文案

### Requirement: 评审答辩准备

The system SHALL 预测评审可能关注的问题并准备回答要点。

#### Scenario: Q&A 覆盖核心问题
- **WHEN** 用户打开 `assets/contest/trae-creativity-2026/q-and-a.md`
- **THEN** 包含至少 8 个常见问题及回答要点
- **AND** 覆盖：技术架构、AI 模型与成本、数据安全、商业化路径、移动端适配、与同类产品的差异、未来规划、版权问题

## MODIFIED Requirements

无。

## REMOVED Requirements

无。
