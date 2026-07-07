# Tasks

- [x] Task 1: 为 gachaPool 角色绑定 Live2D 模型 URL
  - [x] SubTask 1.1: 为 violet（薇尔莉特）配置 live2dModel 字段，使用 tororo 模型
  - [x] SubTask 1.2: 为 hodgins（克劳迪亚）配置 live2dModel 字段，使用 shizuku 模型
  - [ ] SubTask 1.3: 创建角色静态立绘占位符（使用 SVG 或 CSS 渐变作为临时图片）

- [x] Task 2: 角色详情页集成 Live2D 动态立绘
  - [x] SubTask 2.1: 修改 showCharacterDetail()，当角色有 live2dModel 时在立绘区渲染 Live2D 模型
  - [x] SubTask 2.2: 无 live2dModel 时回退到静态 portrait 图片
  - [x] SubTask 2.3: 离开角色详情页时销毁 Live2D 模型释放资源

- [x] Task 3: 自定义 NPC 卡片添加"添加立绘"UI
  - [x] SubTask 3.1: 在 NPC 卡片 HTML 模板中添加立绘选择区域（按钮 + 占位显示）
  - [x] SubTask 3.2: 编写立绘选择区域的 CSS 样式（与编辑器风格一致）

- [x] Task 4: 实现角色模型选择弹窗
  - [x] SubTask 4.1: 创建弹窗 HTML 结构（全屏遮罩 + 角色列表网格）
  - [x] SubTask 4.2: 弹窗展示所有已抽到的 gachaPool 角色（显示名称、稀有度、稀有度颜色边框）
  - [x] SubTask 4.3: 点击角色后关闭弹窗，返回选中角色的完整数据

- [x] Task 5: 实现 NPC 立绘选择逻辑
  - [x] SubTask 5.1: "添加立绘"按钮点击事件：打开角色选择弹窗
  - [x] SubTask 5.2: 选中角色后填充 NPC 的 live2dModel 和 live2dSourceCharId 字段
  - [x] SubTask 5.3: 如果 NPC 字段（name、title、personality、firstMessage）为空，自动从选中角色复制
  - [x] SubTask 5.4: 已有字段不被覆盖，仅更新 live2dModel 和 live2dSourceCharId
  - [x] SubTask 5.5: 更新 NPC 卡片 UI 显示已选角色信息

- [x] Task 6: 自定义 NPC 数据持久化
  - [x] SubTask 6.1: getCustomConfig() 读取 NPC 的 live2dModel 和 live2dSourceCharId 字段
  - [x] SubTask 6.2: addCustomNpcCard() 恢复 NPC 时填充 live2dModel 和 live2dSourceCharId
  - [x] SubTask 6.3: 验证保存/加载流程完整

- [x] Task 7: 自定义游戏启动时加载 NPC 立绘
  - [x] SubTask 7.1: startCustomGameFromConfig() 中，为有 live2dModel 的 NPC 注册到 npcLive2DModels
  - [x] SubTask 7.2: 确保 live2dRenderer 能正确加载自定义 NPC 的模型
  - [x] SubTask 7.3: NPC 切换时（switchNPC）能正确切换自定义 NPC 的立绘

# Task Dependencies
- Task 2 依赖 Task 1（需要 live2dModel 字段）
- Task 4 依赖 Task 1（需要 gachaPool 角色数据）
- Task 5 依赖 Task 3 和 Task 4（需要 UI 和弹窗）
- Task 6 依赖 Task 5（需要完整 NPC 数据结构）
- Task 7 依赖 Task 1 和 Task 6（需要模型数据和持久化）
