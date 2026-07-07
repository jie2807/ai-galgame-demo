# NPC 角色立绘系统可行性研究

## Why
用户希望借鉴 OpenCode 终端宠物系统的概念，在游戏游玩界面中为 NPC 添加动态角色立绘系统。当玩家与 NPC 对话时，角色立绘会出现在左侧专门区域，并根据对话内容自动做出相应动作，提升沉浸式角色扮演体验。

## What Changes
- 在游戏界面左侧新增角色立绘显示区域
- 集成 Live2D 动态立绘渲染引擎（pixi-live2d-display + pixi.js）
- 实现 AI 驱动的动作系统：通过 System Prompt 让 AI 输出动作标签
- 前端解析动作标签并触发对应的 Live2D 动画
- 为每个 NPC 配置对应的 Live2D 模型和动作映射表

## 技术可行性分析

### 1. Live2D Web 集成 - ✅ 可行
**技术方案**：
- 使用 `pixi.js@6.x` + `pixi-live2d-display` 库
- 支持 CDN 引入，无需构建工具（适配当前原生 JS 项目）
- 官方 SDK 支持 `.moc3` 格式模型

**参考资源**：
- pixi-live2d-display GitHub: https://github.com/guansss/pixi-live2d-display
- 支持 CDN 引入，适合原生 HTML/JS 项目
- Live2D 官方 Web SDK 文档：https://docs.live2d.com/cubism-sdk-tutorials/

### 2. AI 驱动动作系统 - ✅ 可行
**技术方案**：
- 在 System Prompt 中添加动作标签指令
- AI 回复格式示例：`[smile]「你好啊，今天天气真不错。」`
- 前端正则解析动作标签：`/\[(\w+)\]/`
- 映射到 Live2D 动作：`smile` → `MotionGroup.Idle`, `wave` → `MotionGroup.FlickHead`

### 3. UI 布局改造 - ✅ 可行
**现有布局**：
```
[返回] [章节信息] [设置]
[NPC头像] [NPC名称] [关系度]
[对话消息区域]
[输入框] [语音] [发送]
[底部导航：NPC|剧情|收藏|记录]
```

**新布局方案**：
```
[返回] [章节信息] [设置]
┌─────────────┬──────────────────────┐
│  NPC 立绘区  │  [NPC头像] [NPC名称] │
│  (左侧30%)   │  [关系度]           │
│             ├──────────────────────┤
│             │  [对话消息区域]       │
│             │                      │
└─────────────┴──────────────────────┘
[输入框] [语音] [发送]
[底部导航：NPC|剧情|收藏|记录]
```

### 4. 技术挑战与风险

#### 挑战 1：Live2D 模型资源获取 ⚠️ 中等风险
- Live2D 模型需要专门的 `.moc3` 文件和纹理图片
- 免费开源模型有限，高质量模型需要购买或定制
- **解决方案**：初期使用测试模型，后续提供模型导入功能

#### 挑战 2：原生 JS 项目集成第三方库 ⚠️ 低风险
- 当前项目无构建工具，需通过 CDN 引入 pixi.js
- pixi.js v6 约 300KB，pixi-live2d-display 约 50KB
- **解决方案**：使用 CDN，添加 loading 状态

#### 挑战 3：动作标签解析与映射 ⚠️ 低风险
- AI 可能不严格按照格式输出
- 需要容错处理和默认动作
- **解决方案**：正则解析 + 默认 fallback + System Prompt 强化

#### 挑战 4：性能优化 ⚠️ 中等风险
- Live2D 渲染消耗较多 GPU 资源
- 移动端性能可能受限
- **解决方案**：提供开关选项，低配设备降级为静态立绘

## 实现建议

### 阶段 1：最小可行性原型（MVP）
1. 左侧立绘区域 HTML/CSS 布局
2. CDN 引入 pixi.js + pixi-live2d-display
3. 加载一个测试 Live2D 模型
4. 基础动作标签解析（3-5 个基础动作）

### 阶段 2：完整功能
1. AI System Prompt 改造，加入动作标签指令
2. 动作标签解析引擎
3. 多 NPC 模型切换
4. 动作平滑过渡和混合

### 阶段 3：优化与扩展
1. 模型导入功能（用户上传模型）
2. 性能优化和降级方案
3. 动作库扩展
4. 表情与口型同步

## Impact
- 受影响代码：`index.html`（新增立绘区域）、`temp_script.js`（对话引擎、UI 逻辑）、`styles.css`（新布局样式）
- 新增依赖：pixi.js v6.x、pixi-live2d-display（CDN 引入）
- 不影响现有功能，为纯新增特性

## ADDED Requirements

### Requirement: 角色立绘显示区域
系统 SHALL 在游戏界面左侧提供专门的 NPC 角色立绘显示区域。

#### Scenario: 对话时显示立绘
- **WHEN** 玩家进入对话界面
- **THEN** 左侧区域显示当前对话 NPC 的 Live2D 立绘

#### Scenario: 切换 NPC 时更换立绘
- **WHEN** 玩家切换到不同的 NPC
- **THEN** 立绘区域平滑过渡到新 NPC 的模型

### Requirement: AI 驱动的动作系统
系统 SHALL 通过 AI 输出动作标签，前端解析后触发对应的 Live2D 动画。

#### Scenario: AI 输出带动作标签的对话
- **WHEN** AI 回复包含 `[smile]` 等动作标签
- **THEN** NPC 立绘执行对应的微笑动画

#### Scenario: 动作标签容错处理
- **WHEN** AI 输出未识别的动作标签
- **THEN** 系统执行默认待机动画，不中断对话流程

### Requirement: 模型配置系统
系统 SHALL 为每个 NPC 提供 Live2D 模型配置，包括模型路径和动作映射。

#### Scenario: NPC 模型配置
- **WHEN** 定义 NPC 角色数据
- **THEN** 可配置对应的 Live2D 模型路径和动作映射表