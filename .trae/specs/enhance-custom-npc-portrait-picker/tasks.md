# Tasks

- [x] Task 1: 构建角色池数据源
  - [x] SubTask 1.1: 扫描官方剧本角色数据，提取所有图片立绘资源
  - [x] SubTask 1.2: 扫描官方剧本角色数据，提取所有 Level 2D 模型资源
  - [x] SubTask 1.3: 将资源统一收敛为 `portraitPool` 数组（含 id、type、url、modelJson）
  - [x] SubTask 1.4: 确保同一角色的图片和 Level 2D 作为两条独立条目展示

- [x] Task 2: 改造自定义 NPC 卡片立绘入口
  - [x] SubTask 2.1: 在 `addCustomNpcCard()` 中移除旧的多余立绘按钮/文字列表
  - [x] SubTask 2.2: 新增单一「选择立绘」按钮，未选择时显示占位提示
  - [x] SubTask 2.3: 已选择时在按钮上渲染缩略预览和格式角标
  - [x] SubTask 2.4: 按钮点击调用新的 `openPortraitPicker(npcId)`

- [x] Task 3: 实现可视化立绘选择面板
  - [x] SubTask 3.1: 创建面板 HTML 结构（遮罩 + 网格 + 关闭按钮）
  - [x] SubTask 3.2: 图片资源直接渲染 `<img>` 展示
  - [x] SubTask 3.3: Level 2D 资源直接渲染模型预览（复用现有渲染器或缩略方案）
  - [x] SubTask 3.4: 为每个卡片添加格式标签（单纯图片 / Level 2D 模型）
  - [x] SubTask 3.5: 点击卡片后回填 NPC 的 `portraitType`、`portraitUrl`、`portraitModelJson`
  - [x] SubTask 3.6: 关闭面板后更新 NPC 卡片按钮状态

- [x] Task 4: 支持本地上传立绘
  - [x] SubTask 4.1: 在面板中添加「上传图片」按钮和隐藏 `<input type="file">`
  - [x] SubTask 4.2: 图片上传后生成 blob URL 并加入 `portraitPool`
  - [x] SubTask 4.3: 在面板中添加「上传 Level 2D 模型」按钮
  - [x] SubTask 4.4: Level 2D 上传后解析入口文件并加入 `portraitPool`
  - [x] SubTask 4.5: 上传失败时显示可操作的错误提示

- [x] Task 5: 更新 NPC 数据结构与持久化
  - [x] SubTask 5.1: 在 `getCustomConfig()` 中为 NPC 添加 `portraitType`、`portraitUrl`、`portraitModelJson` 字段
  - [x] SubTask 5.2: 在 `saveCustomConfig()` 中保存上述字段
  - [x] SubTask 5.3: 在 `loadCustomConfig()` / `addCustomNpcCard()` 恢复时回填立绘信息

- [x] Task 6: 游戏启动时注册自定义 Level 2D 模型
  - [x] SubTask 6.1: 在 `startCustomGameFromConfig()` 中检测 NPC 的 `portraitType === 'live2d'`
  - [x] SubTask 6.2: 将模型注册到 `npcLive2DModels`，确保后续 `switchNPC` 能加载
  - [x] SubTask 6.3: 验证官方角色池模型和本地上传模型均可正常显示

# Task Dependencies

- Task 2 依赖 Task 1（需要 `portraitPool` 数据结构定义）
- Task 3 依赖 Task 1（需要数据源渲染）
- Task 4 依赖 Task 3（面板已存在才能添加入口）
- Task 5 依赖 Task 2（NPC 卡片需要新字段）
- Task 6 依赖 Task 5（需要持久化后的模型 URL）
