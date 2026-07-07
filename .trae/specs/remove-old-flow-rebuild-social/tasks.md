# Tasks

- [ ] Task 1: 移除商单系统核心代码
  - [ ] 1.1: 移除 `CWE.prototype.generateOrders` 方法
  - [ ] 1.2: 移除 `CWE.prototype.acceptOrderFromMessage` 方法
  - [ ] 1.3: 移除 `CWE.prototype.currentOrder` 属性初始化及相关引用
  - [ ] 1.4: 移除 `generateHomeVideos` 中依赖 `currentOrder` 的AI视频生成分支
  - [ ] 1.5: 移除商单成就（`order1`、`order10`）
  - [ ] 1.6: 移除 `cwOrderSummaryBar` 和 `cwOrdersArea`/`cwOrdersGrid` HTML
  - [ ] 1.7: 移除 `showOrdersArea` 函数
  - [ ] 1.8: 清理所有 `商单`、`currentOrder`、`acceptOrder` 相关引用

- [ ] Task 2: 移除抖加推广系统
  - [ ] 2.1: 移除 `cwDoujiaPanel` HTML面板
  - [ ] 2.2: 移除 `renderDoujiaPanel` 函数
  - [ ] 2.3: 移除 `CWE.prototype.PROMOTION_LEVELS` 常量
  - [ ] 2.4: 移除个人空间"🔥 抖加"Tab
  - [ ] 2.5: 移除创作中心"推广投放"卡片
  - [ ] 2.6: 清理抖加相关事件绑定和CSS

- [ ] Task 3: 移除舆论操控功能
  - [ ] 3.1: 移除数据中心"🎮 舆论操控"区块HTML
  - [ ] 3.2: 移除数据中心"📈 操控历史"区块HTML
  - [ ] 3.3: 移除数据中心"🎯 订单目标"区块HTML
  - [ ] 3.4: 移除 `CWE.prototype.operationHistory` 属性
  - [ ] 3.5: 移除操控相关事件绑定（guide/pin/counter/delete action按钮）

- [ ] Task 4: 移除主视图（cwMainView），平台视图成为唯一主界面
  - [ ] 4.1: 将 `cwMainView` 的HTML内容精简，仅保留导航栏结构
  - [ ] 4.2: 修改 `cwSwitchView` 只保留 `platform`/`detail` 两个视图
  - [ ] 4.3: 修改"开始浏览"按钮直接进入平台视图
  - [ ] 4.4: 将私信弹窗、通知弹窗、收藏弹窗、历史弹窗移到平台视图中
  - [ ] 4.5: 将Agent管理面板移到平台视图中
  - [ ] 4.6: 将设置面板移到平台视图中（作为弹窗）
  - [ ] 4.7: 移除 `showStudioArea`、`switchStudioPanel` 函数
  - [ ] 4.8: 清理主视图中的 `cwStudioArea`、`cwMessagePanel`、`cwDataCenter`、`cwCommentMgmt`、`cwSettingsPanel`、`cwProfilePage` HTML

- [ ] Task 5: 重构导航栏
  - [ ] 5.1: 将平台视图导航栏左侧链接改为"首页/热门/动态"
  - [ ] 5.2: 移除"创作中心"和"频道"链接
  - [ ] 5.3: 在导航栏右侧添加"📹 投稿"按钮（在头像左侧）
  - [ ] 5.4: 统一3个视图的导航栏结构（平台视图、详情视图）
  - [ ] 5.5: 实现"动态"视图的内容渲染

- [ ] Task 6: 重构私信为Agent聊天
  - [ ] 6.1: 修改私信弹窗HTML结构——左侧Agent列表 + 右侧聊天区域
  - [ ] 6.2: 修改私信列表数据来源——从 `cwEngine.messages` 改为 `cwEngine.agents`
  - [ ] 6.3: 移除"🔄 刷新私信"按钮和"🎨 自由创作"按钮
  - [ ] 6.4: 移除商单类型消息的展示和交互代码
  - [ ] 6.5: 实现点击Agent打开charchat聊天窗口
  - [ ] 6.6: 实现Agent主动发私信（新视频通知、直播通知、挑衅）
  - [ ] 6.7: 修改 `renderMessageList` 函数为Agent对话列表渲染
  - [ ] 6.8: 修改 `showMessageDetail` 函数为Agent聊天界面
  - [ ] 6.9: 更新私信空状态提示文字

- [ ] Task 7: 重构个人空间页面
  - [ ] 7.1: 移除"🔥 抖加"Tab及 `cwTabDoujia` 内容
  - [ ] 7.2: 移除"💰 收益"Tab及 `cwTabEarnings` 内容
  - [ ] 7.3: 移除"📊 创作中心"Tab及 `cwTabCreatorCenter` 内容
  - [ ] 7.4: 移除个人空间头部的"📹 投稿"按钮
  - [ ] 7.5: 修改"📩 私信"Tab内容为Agent对话列表
  - [ ] 7.6: 在"📹 视频"Tab中添加"+ 投稿新视频"按钮
  - [ ] 7.7: 移除商单相关成就，更新成就网格

- [ ] Task 8: 实现轻量投稿对话框
  - [ ] 8.1: 创建投稿对话框HTML（标题/内容/分类/AI生成按钮）
  - [ ] 8.2: 实现投稿对话框的弹出逻辑（导航栏按钮触发、个人空间按钮触发）
  - [ ] 8.3: 保留AI生成标题和AI生成文案功能
  - [ ] 8.4: 实现发布后视频添加到首页信息流
  - [ ] 8.5: 实现发布进度条

- [ ] Task 9: 实现动态页面
  - [ ] 9.1: 在 `cwEngine` 中添加 `feedItems` 数组存储动态记录
  - [ ] 9.2: 在Agent发布视频时添加动态记录
  - [ ] 9.3: 在Agent开启直播时添加动态记录
  - [ ] 9.4: 在Agent回复评论时添加动态记录
  - [ ] 9.5: 实现动态页面渲染函数 `renderFeedPage`
  - [ ] 9.6: 实现"动态"导航链接切换逻辑

- [ ] Task 10: 清理设置面板和评论管理
  - [ ] 10.1: 移除设置中"性能模式"选项
  - [ ] 10.2: 移除设置中"难度提示"选项
  - [ ] 10.3: 移除设置中"游戏速度"选项
  - [ ] 10.4: 新增"Agent活跃度"选项（低/中/高）
  - [ ] 10.5: 移除评论管理中"⚠️ 水军"筛选按钮
  - [ ] 10.6: 清理 `performanceMode` 相关引用

- [ ] Task 11: 清理残余引用和测试
  - [ ] 11.1: 全局搜索并清理所有 `商单`、`currentOrder`、`doujia`、`抖加`、`performanceMode`、`cwMainView` 引用
  - [ ] 11.2: 确保所有导航链接和按钮正常工作
  - [ ] 11.3: 确保视图切换流畅无报错
  - [ ] 11.4: 确保私信Agent聊天正常工作
  - [ ] 11.5: 确保投稿发布流程正常工作
  - [ ] 11.6: 确保数据持久化（localStorage）正常

# Task Dependencies
- Task 4 依赖 Task 1、2、3（移除旧内容后再重构视图）
- Task 5 依赖 Task 4（导航栏重构依赖视图架构变更）
- Task 6 依赖 Task 1（私信重构依赖商单移除）
- Task 7 依赖 Task 2、3（个人空间重构依赖抖加/操控移除）
- Task 8 依赖 Task 5（投稿入口依赖导航栏重构）
- Task 9 依赖 Task 5（动态页面依赖导航栏重构）
- Task 10 可与 Task 1-3 并行
- Task 11 依赖所有其他任务
