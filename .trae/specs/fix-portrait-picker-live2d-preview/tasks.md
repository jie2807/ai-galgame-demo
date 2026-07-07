# Tasks

- [x] Task 1: 修复 Level 2D 模型在预览卡片中的居中显示
  - [x] 1.1 检查 `renderLive2dPreview` 中模型缩放与居中计算逻辑
  - [x] 1.2 调整 `.portrait-picker-card canvas` 的 CSS，确保 canvas 在卡片中居中且不被拉伸
  - [x] 1.3 在桌面端与移动端（375px/360px/320px）验证模型均位于卡片正中央

- [x] Task 2: 提升 Level 2D 模型可预览数量
  - [x] 2.1 评估当前 `live2dPreviewCount >= 6` 限制的合理性
  - [x] 2.2 将并发预览上限从 6 提升至 12
  - [x] 2.3 验证角色池中所有 Level 2D 模型都能进入加载流程，失败时显示清晰占位

- [x] Task 3: 优化加载失败/不可预览占位样式
  - [x] 3.1 统一 fallback 占位背景与文字样式
  - [x] 3.2 确保 fallback 文字在卡片中水平垂直居中
  - [x] 3.3 为 Level 2D 模型增加静态 portrait 图片兜底：当模型无法渲染时，显示该角色的静态立绘图片
  - [x] 3.4 添加渲染超时保护，防止卡片长期空白
  - [x] 3.5 验证加载失败的卡片不影响相邻卡片布局

- [x] Task 4: 验证与回归测试
  - [x] 4.1 在桌面端打开立绘选择面板，确认所有 Level 2D 模型居中显示
  - [x] 4.2 在移动端 375px/360px/320px 下确认居中显示
  - [x] 4.3 确认静态图片卡片布局未被破坏
  - [x] 4.4 确认 Live2D 模型仍排在图片之前
  - [x] 4.5 确认选择模型后能正确回填 NPC 数据

- [x] Task 5: 修复模型实际偏右问题
  - [x] 5.1 分析 `renderLive2dPreview` 中模型居中计算：部分 Live2D 模型的 anchor 不在中心，导致视觉上偏右
  - [x] 5.2 显式设置 `model.anchor.set(0.5, 0.5)`，并将模型位置设为 canvas 中心
  - [x] 5.3 保持 `contain` 缩放策略，确保模型完整显示、不被裁切
  - [x] 5.4 在桌面端与移动端验证所有模型均水平垂直居中

- [x] Task 6: 验证 Task 5 修复结果
  - [x] 6.1 打开立绘选择面板，确认 Level 2D 模型不再偏右
  - [x] 6.2 确认模型完整显示（contain），无单侧裁切
  - [x] 6.3 确认静态图片卡片、选择回填、移动端布局未受影响

# Task Dependencies
- [Task 2] depends on [Task 1] - 先保证单个模型能正确居中显示，再处理多个模型并发
- [Task 3] depends on [Task 2] - 占位样式在调整加载策略后统一验证
- [Task 4] depends on [Task 3] - 验证在最后进行
- [Task 5] depends on [Task 4] - 用户反馈实际仍偏右，需要第二轮修复
- [Task 6] depends on [Task 5] - 验证 Task 5 修复结果
