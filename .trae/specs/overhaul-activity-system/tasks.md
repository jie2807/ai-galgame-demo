# Tasks

- [ ] Task 1: 更新入口按钮名称和图标
  - [ ] SubTask 1.1: 将左侧菜单"活动"标签改为"AI工作台"
  - [ ] SubTask 1.2: 将按钮SVG图标改为AI工作台相关图标
  - [ ] SubTask 1.3: 保持id=`creatorWarsBtn`不变以兼容现有代码

- [ ] Task 2: 移除macOS桌面模拟器框架
  - [ ] SubTask 2.1: 移除`#creatorWarsPage`中的macOS菜单栏HTML（`macos-menubar`）
  - [ ] SubTask 2.2: 移除Dock栏HTML（`macos-dock`）及其6个App入口
  - [ ] SubTask 2.3: 移除桌面区域HTML（`macosDesktopArea`）
  - [ ] SubTask 2.4: 移除JS中的窗口管理函数：`macosOpenApp`、`macosCloseApp`、`macosFocusWindow`、`macosInitDrag`、`macosUpdateDockIndicators`、`macosRenderAppContent`
  - [ ] SubTask 2.5: 移除JS中的窗口状态变量：`_macosWindowZIndex`、`_macosOpenApps`、`_macosRenderedApps`
  - [ ] SubTask 2.6: 移除CSS中所有macOS桌面相关样式（`.macos-window-*`、`.macos-dock-*`、`.macos-tl-*`等窗口和Dock样式）
  - [ ] SubTask 2.7: 移除`showCwApiDialog`函数和API配置弹窗逻辑

- [ ] Task 3: 构建标签导航+统一内容区布局
  - [ ] SubTask 3.1: 在`#creatorWarsPage`中新建顶部栏HTML（返回按钮+"AI工作台"+App标签：微信/B站/抖音/邮箱/股市/设置）
  - [ ] SubTask 3.2: 新建统一内容区容器`#cwAppContent`，App内容在此容器中渲染
  - [ ] SubTask 3.3: 实现标签切换逻辑：点击标签→清空内容区→调用对应App渲染函数→标记当前标签高亮
  - [ ] SubTask 3.4: 实现App状态缓存机制：已渲染的App内容用`display:none`隐藏而非销毁，切换回来时恢复显示
  - [ ] SubTask 3.5: 修改`openCreatorWars`函数，直接显示默认App（B站）内容而非API弹窗
  - [ ] SubTask 3.6: 修改`closeCreatorWars`函数，确保正确清理视图状态
  - [ ] SubTask 3.7: 新增标签导航栏CSS样式（标签高亮、hover效果、响应式）

- [ ] Task 4: 迁移各App渲染函数到统一内容区
  - [ ] SubTask 4.1: 修改`renderWeChatContent`，使其在`#cwAppContent`中渲染而非macOS窗口body
  - [ ] SubTask 4.2: 修改`renderBilibiliContent`，使其在`#cwAppContent`中渲染而非macOS窗口body
  - [ ] SubTask 4.3: 修改`renderDouyinContent`，使其在`#cwAppContent`中渲染而非macOS窗口body
  - [ ] SubTask 4.4: 修改`renderMailContent`，使其在`#cwAppContent`中渲染而非macOS窗口body
  - [ ] SubTask 4.5: 修改`renderTonghuashunContent`，使其在`#cwAppContent`中渲染而非macOS窗口body
  - [ ] SubTask 4.6: 修改`renderSettingsContent`，使其在`#cwAppContent`中渲染而非macOS窗口body
  - [ ] SubTask 4.7: 验证每个App的内部交互逻辑和AI功能在迁移后正常工作

- [ ] Task 5: 优化首次进入体验
  - [ ] SubTask 5.1: 移除`openCreatorWars`中的`showCwApiDialog`调用
  - [ ] SubTask 5.2: 未配置API时，AI功能按钮显示"请先配置API"提示（toast或inline提示）
  - [ ] SubTask 5.3: 非AI功能（浏览、UI交互）在未配置API时正常使用
  - [ ] SubTask 5.4: 设置App中的API配置入口明显可见

- [ ] Task 6: 完善Agent系统（收拢restructure-cw-ai-agent-social未完成项）
  - [ ] SubTask 6.1: 完善Agent配置名称和形象的功能
  - [ ] SubTask 6.2: 实现首页标签筛选功能（推荐/热门/最新/关注）
  - [ ] SubTask 6.3: 完善添加Agent弹窗的完整流程（类型→名称→形象→AI生成）
  - [ ] SubTask 6.4: 实现直播结束后生成回放卡片
  - [ ] SubTask 6.5: 实现评论点赞/踩功能
  - [ ] SubTask 6.6: 移除旧创作中心面板（`cwStudioArea`中的旧工作室内容）
  - [ ] SubTask 6.7: 移除`publishVideo`函数和抖加推广面板
  - [ ] SubTask 6.8: 将工作室区域改为Agent管理界面

- [ ] Task 7: 修复已知严重Bug
  - [ ] SubTask 7.1: 修复发布内容后首页空白（`renderHomePage`中`allVideos`构建逻辑）
  - [ ] SubTask 7.2: 验证高低消耗模式互换问题已解决
  - [ ] SubTask 7.3: 修复进入个人空间→创作中心后标题栏重复
  - [ ] SubTask 7.4: 修复所有JavaScript运行时错误
  - [ ] SubTask 7.5: 修复事件绑定和视图切换问题
  - [ ] SubTask 7.6: 修复localStorage数据保存和加载问题

# Task Dependencies
- Task 2 依赖 Task 1（先改入口再删旧代码）
- Task 3 依赖 Task 2（先删旧框架再建新框架）
- Task 4 依赖 Task 3（先建新框架再迁移App）
- Task 5 可与 Task 4 并行
- Task 6 依赖 Task 4（先迁移App再完善Agent）
- Task 7 可与 Task 4-6 并行（bug修复独立于功能重构）
