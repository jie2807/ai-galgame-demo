# Tasks

- [x] Task 1: 重构 Visual 模式对话框 HTML 结构
  - [x] SubTask 1.1: 在 `.galgame-dialogue-bar` 内部增加头像插槽（`.galgame-dialogue-avatar`）、名称/称号区（`.galgame-dialogue-name-wrap`）与正文区（`.galgame-dialogue-text`）
  - [x] SubTask 1.2: 更新 JS 对话渲染逻辑，使当前说话人头像、名称、称号正确填充到新的对话框结构中
  - [x] SubTask 1.3: 处理叙述者/系统消息时不显示头像，仅显示名称与正文

- [x] Task 2: 实现电影感对话框 CSS
  - [x] SubTask 2.1: 为 `.galgame-dialogue-bar` 添加半透明毛玻璃背景、细高光边框、柔和投影与容器圆角
  - [x] SubTask 2.2: 调整头像尺寸与位置，确保左侧圆形头像与文字区域协调
  - [x] SubTask 2.3: 区分 NPC/玩家/叙述者三种名称样式，并加大正文字号、增加 text-shadow 与字距
  - [x] SubTask 2.4: 更新移动端媒体查询，保证对话框在窄屏下的可读性与布局不崩

- [x] Task 3: 实现电影化背景处理
  - [x] SubTask 3.1: 在 `.galgame-bg-layer` 内增加场景图 `<img>` 容器与回退渐变
  - [x] SubTask 3.2: 为 `.galgame-bg-overlay` 增加径向暗角(vignette)与颗粒噪点纹理（优先内联 SVG/纯 CSS，避免新增大图片资源）
  - [x] SubTask 3.3: 确保场景图缺失时平滑回退到现有渐变背景，无闪烁

- [x] Task 4: 实现背景 Ken Burns 切换动画
  - [x] SubTask 4.1: 为 `.galgame-bg-image` 增加缓慢缩放/平移 keyframes 动画
  - [x] SubTask 4.2: 场景切换时新背景图以 1.2s 淡入并触发动画，旧背景图淡出
  - [x] SubTask 4.3: 在移动端降低动画幅度或根据 `prefers-reduced-motion` 禁用

- [x] Task 5: 验证与测试
  - [x] SubTask 5.1: 桌面端浏览器验证：对话框外观、头像显示、文本层级、背景暗角/颗粒、切换动画
  - [x] SubTask 5.2: 移动端浏览器验证（或 DevTools 模拟）：布局适配、安全区、动画性能
  - [x] SubTask 5.3: 检查 Text 模式是否不受影响

# Task Dependencies

- [Task 2] depends on [Task 1]
- [Task 5] depends on [Task 2, Task 3, Task 4]
- [Task 3] and [Task 4] can be done in parallel
