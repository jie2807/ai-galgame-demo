# Tasks

- [x] Task 1: 开放养成学院入口
  - [x] SubTask 1.1: 将首页 `.feature-btn.doll-school` 的点击事件从调用 `showAiWorkbenchToast` 改为导航到 `characterListPage`
  - [x] SubTask 1.2: 复用现有 `PageTransition.transition` 与 `NavigationHistory.push` 逻辑，确保过渡一致
  - [x] SubTask 1.3: 进入角色列表页时调用 `renderCharacterList()` 并播放背景视频

- [x] Task 2: 修复写信页静态立绘显示
  - [x] SubTask 2.1: 为 `.charchat-model-area img` 添加 `max-width: 100%`、`max-height: 100%`、`object-fit: contain`、`object-position: center` 等样式
  - [x] SubTask 2.2: 确保静态立绘在容器内居中，不因容器过大而过度拉伸放大

- [x] Task 3: 修复写信页 Level 2D 模型清晰度
  - [x] SubTask 3.1: 调整 `openCharacterChat` 中模型初始化时机，使 Level 2D 画布在页面可见后按实际容器尺寸初始化/重绘
  - [x] SubTask 3.2: 确保模型锚点居中并定位到画布中心，避免偏移
  - [x] SubTask 3.3: 在窗口尺寸变化或页面可见性变化时调用 resize，保持模型清晰

- [x] Task 4: 多端验证与回归检查
  - [x] SubTask 4.1: 桌面端验证「养成学院」按钮可进入角色列表，写信页立绘/模型清晰居中
  - [x] SubTask 4.2: 移动端验证布局正常、无堆叠或裁切
  - [x] SubTask 4.3: 验证抽卡图鉴、角色详情返回等其他入口行为未受影响

# Task Dependencies

- Task 3 依赖 Task 2（先完成静态立绘样式，再处理动态模型）
- Task 4 依赖 Task 1、Task 2、Task 3
