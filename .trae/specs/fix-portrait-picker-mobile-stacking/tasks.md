# Tasks

- [x] Task 1: 调整弹窗模态框在小屏下的尺寸与内边距
  - [x] 1.1 在 ≤480px 媒体查询中将 `.portrait-picker-modal` 宽度设为 96%–100%，高度 90vh
  - [x] 1.2 减小弹窗 header、toolbar、grid 的内边距（header 10–12px，toolbar 8px，grid 8–10px）
  - [x] 1.3 确保关闭按钮和上传按钮在小屏下仍可点击（最小 44×44px 触控区域）

- [x] Task 2: 实现小屏下卡片网格不堆叠
  - [x] 2.1 在 ≤480px 媒体查询中将 `.portrait-picker-grid` 改为 `grid-template-columns: repeat(auto-fill, minmax(72px, 1fr))`
  - [x] 2.2 在 320px–360px 区间补充媒体查询，确保每行至少 3 列（可尝试 `minmax(68px, 1fr)` 或固定 4 列）
  - [x] 2.3 设置 `align-content: start` 防止卡片垂直拉伸堆叠
  - [x] 2.4 添加 `box-sizing: border-box` 确保 padding/border 不影响列宽计算

- [x] Task 3: 优化卡片内容缩放与可读性
  - [x] 3.1 确保 `.portrait-picker-card img, canvas` 保持 `aspect-ratio: 3/4` 与 `object-fit: cover`
  - [x] 3.2 卡片圆角在小屏下适度缩小（6px）
  - [x] 3.3 Live2D fallback 文字在小屏下使用 px 单位确保 ≥10px，加粗或提高对比度
  - [x] 3.4 角标 badge 在小屏下缩小但不小于 8px，避免覆盖图片关键区域

- [x] Task 4: 修复移动端小屏下卡片仍堆叠的问题
  - [x] 4.1 将 ≤480px 媒体查询中的网格改为显式列数（`repeat(4, 1fr)`），避免 `auto-fill/minmax` 在真实移动端 unpredictable 地塌陷
  - [x] 4.2 为 `.portrait-picker-grid` 和 `.portrait-picker-card` 添加 `min-width: 0`，防止内容撑开轨道
  - [x] 4.3 为 360px/320px 添加更窄断点，显式 3 列，确保每行 ≥3 列且不重叠
  - [x] 4.4 调整角标 badge 文字，防止卡片缩小时文字溢出遮挡图片

- [x] Task 5: 验证与回归测试（第一轮）
  - [x] 5.1 在 375px/360px/320px 模拟视口下打开立绘选择面板，确认每行 ≥3 列、无堆叠
  - [x] 5.2 确认弹窗可上下滚动，最后一个卡片可见
  - [x] 5.3 确认 Live2D 模型仍排在图片之前
  - [x] 5.4 确认桌面端（≥481px）布局未被破坏

- [x] Task 6: 彻底解决移动端小屏下卡片仍堆叠的问题
  - [x] 6.1 通过注入等效移动端样式复现 375px/360px/320px 渲染，确认堆叠与 `aspect-ratio` 在窄卡片下的高度计算有关
  - [x] 6.2 将 `.portrait-picker-modal`、`.portrait-picker-grid`、`.portrait-picker-card` 统一设为 `box-sizing: border-box`，消除溢出与裁剪歧义
  - [x] 6.3 将移动端卡片宽高比从 `aspect-ratio` 改为 `padding-top: 133.333%` 方案，避免旧浏览器/特殊渲染环境下卡片高度塌陷为 0
  - [x] 6.4 在 ≤480px/≤360px/≤320px 媒体查询中保持显式列数，并确保 gap/padding 不导致轨道溢出
  - [x] 6.5 给 `.portrait-picker-grid` 与 `.portrait-picker-modal` 添加 `min-height: 0`，防止 flex 列式弹窗高度塌陷

- [x] Task 7: 验证与回归测试（第二轮）
  - [x] 7.1 在等效 375px/360px/320px 渲染下打开立绘选择面板，确认每行 ≥3 列、卡片互不重叠
  - [x] 7.2 确认弹窗可上下滚动，最后一个卡片可见
  - [x] 7.3 确认 Live2D 模型仍排在图片之前
  - [x] 7.4 确认桌面端（≥481px）布局未被破坏

- [x] Task 8: 修复桌面/宽屏下卡片纵向重叠
  - [x] 8.1 定位根因：`.portrait-picker-card` 的 min-content 高度在 grid auto 行中塌陷为 0，结合默认 `align-items: stretch` 导致卡片内容溢出重叠/压缩
  - [x] 8.2 将 `padding-top: 133.333%` 方案从移动端扩展到全局，移除所有 `aspect-ratio: 3/4`
  - [x] 8.3 确保 `.portrait-picker-card img, canvas` 在全局使用 `position: absolute; inset: 0;` 填充卡片
  - [x] 8.4 给 `.portrait-picker-grid` 添加 `align-items: start; grid-auto-rows: minmax(min-content, max-content);`，防止行高被压缩
  - [x] 8.5 清理重复的移动端/桌面端样式，保持代码简洁

- [x] Task 9: 验证与回归测试（第三轮）
  - [x] 9.1 确认桌面端（738px/760px）卡片按行排列、互不重叠，宽高比接近 4/3
  - [x] 9.2 确认 375px/360px/320px 下仍无堆叠，宽高比正常
  - [x] 9.3 确认弹窗可滚动、Live2D 排序、图片比例均正常

# Task Dependencies
- [Task 2] depends on [Task 1] - 网格列宽依赖弹窗可用宽度
- [Task 3] depends on [Task 2] - 卡片样式在确定列宽后微调
- [Task 4] depends on [Task 3] - 针对真实移动端仍堆叠做第二轮修复
- [Task 5] depends on [Task 4] - 第一轮验证
- [Task 6] depends on [Task 5] - 基于第一轮结果做第三轮根因修复
- [Task 7] depends on [Task 6] - 第二轮验证
- [Task 8] depends on [Task 7] - 用户截图显示桌面端仍有重叠
- [Task 9] depends on [Task 8] - 第三轮验证
