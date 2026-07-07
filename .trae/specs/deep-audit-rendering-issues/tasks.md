# Tasks

- [ ] Task 1: 修复 reset.css 对首页 SVG 和视频的影响（Critical）
  - [ ] SubTask 1.1: 修改 reset.css 中 `img, video { height: auto }` 为视频添加例外，改为 `video { height: 100%; object-fit: cover; }` 或在首页样式中覆盖
  - [ ] SubTask 1.2: 修改 reset.css 中 `svg { fill: currentColor }` 对首页 SVG 的影响，添加 `.game-homepage svg { fill: inherit; }` 覆盖规则
  - [ ] SubTask 1.3: 修复视频 fallback 图片的 `onerror="this.style.display='none'"`，改为合理的 fallback 逻辑

- [ ] Task 2: 修复背景层铺满屏幕（Critical）
  - [ ] SubTask 2.1: 检查 `.bg-video`, `.bg-image`, `.bg-placeholder` 的 CSS 定位和尺寸
  - [ ] SubTask 2.2: 确保 `.bg-video-main`, `.bg-img-main` 等有 `position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover`
  - [ ] SubTask 2.3: 确保背景层在视频未加载时仍有正确的尺寸和内容（使用 SVG 或纯色背景作为兜底）

- [ ] Task 3: 验证首页渲染效果（High）
  - [ ] SubTask 3.1: 启动 Vite 服务器，检查是否有 CSS/JS 错误
  - [ ] SubTask 3.2: 验证首页背景（视频/图片/SVG）正确显示
  - [ ] SubTask 3.3: 验证首页所有元素可见且位置正确

# Task Dependencies
- [Task 2] 依赖 [Task 1]
- [Task 3] 依赖 [Task 1], [Task 2]
