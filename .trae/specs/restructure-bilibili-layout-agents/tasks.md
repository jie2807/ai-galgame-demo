# Tasks

- [ ] Task 1: 头像下拉菜单完整对标B站重构
  - [ ] SubTask 1.1: 修改3个视图的 `.cw-user-panel` HTML，移除2x2快捷入口网格（投稿管理/数据中心/评论管理/推广投放），替换为B站同款功能列表：✉️我的私信(带未读数)、💬我的评论、🔔消息通知(带红点)、⭐我的收藏、📜历史记录、👤个人空间、📊创作中心、⚙️设置、🚪退出游戏
  - [ ] SubTask 1.2: 修复头像下拉位置CSS——确认 `.cw-bili-user-menu-wrapper` 有 `position: relative`，`.cw-user-panel` 使用 `top: calc(100% + 4px); right: 0;` 确保紧贴头像下方
  - [ ] SubTask 1.3: 更新 `initNavbarIcons` 中头像菜单点击事件：私信→`openMsgPopup()`，评论→评论管理面板，通知→通知下拉，收藏→收藏列表弹窗，历史→历史记录弹窗，个人空间→个人空间页面，创作中心→创作中心，设置→设置面板，退出→退出游戏
  - [ ] SubTask 1.4: 实现收藏列表弹窗（显示玩家收藏的视频）和历史记录弹窗（显示浏览过的视频）
  - [ ] SubTask 1.5: 验证头像下拉在3个视图中位置正确、内容完整、所有入口可点击

- [ ] Task 2: 个人空间整合创作中心功能
  - [ ] SubTask 2.1: 在个人空间Tab栏新增"📊 创作中心"Tab（在收益Tab之后、成就Tab之前）
  - [ ] SubTask 2.2: 创建创作中心Tab内容HTML：4个快捷入口卡片（投稿管理/数据中心/评论管理/推广投放）+ 投稿新内容按钮
  - [ ] SubTask 2.3: 实现快捷入口点击跳转逻辑（跳转对应侧边栏面板）
  - [ ] SubTask 2.4: 添加创作中心Tab CSS样式
  - [ ] SubTask 2.5: 验证个人空间创作中心功能

- [ ] Task 3: 首页视频排布全面对标B站
  - [ ] SubTask 3.1: 修改首页视频网格为5列布局（CSS `grid-template-columns: repeat(5, 1fr)`）
  - [ ] SubTask 3.2: 调整卡片间距为12px均匀间距
  - [ ] SubTask 3.3: 视频卡片结构对标B站：缩略图(16:9) + 底部右下角时长标签 + 标题(两行截断) + UP主名·播放量
  - [ ] SubTask 3.4: 播放量格式统一：超过1万显示"x.x万"，超过1亿显示"x.x亿"
  - [ ] SubTask 3.5: 卡片hover效果：轻微上浮+阴影加深；缩略图hover显示"稍后再看"按钮
  - [ ] SubTask 3.6: 整体背景浅灰色(#f4f5f7)，卡片白色圆角8px
  - [ ] SubTask 3.7: 验证首页5列布局对标B站效果

- [ ] Task 4: 首页分类标签切换功能
  - [ ] SubTask 4.1: 为 `.cw-bili-tab` 按钮添加点击事件监听
  - [ ] SubTask 4.2: 实现分类切换逻辑：推荐(默认排序)、热门(按播放量)、最新(按时间)、动画/知识/科技(按分类过滤)
  - [ ] SubTask 4.3: 切换时更新active样式并重新渲染 `#cwHomeGrid`
  - [ ] SubTask 4.4: 验证分类标签切换功能

- [ ] Task 5: 搜索功能修复
  - [ ] SubTask 5.1: 检查 `initSearch` IIFE是否正确绑定到3个视图的搜索输入框
  - [ ] SubTask 5.2: 确保搜索结果下拉面板位置正确（搜索框正下方）
  - [ ] SubTask 5.3: 修复搜索逻辑和结果点击跳转
  - [ ] SubTask 5.4: 验证搜索功能在3个视图中正常工作

- [ ] Task 6: 高/低消耗模式与Agent UP主系统
  - [ ] SubTask 6.1: 在设置面板中新增"性能模式"选项（低消耗/高消耗切换），默认低消耗
  - [ ] SubTask 6.2: 在 `CreatorWarsEngine` 中定义Agent数据结构（name, avatar, level, fans, viewpoint, videos, active）
  - [ ] SubTask 6.3: 创建2个Agent UP主：真相调查员(🔍, investigative观点)和热点追踪者(📡, emotional观点)
  - [ ] SubTask 6.4: 实现模式切换逻辑：低消耗模式→Agent不启动、不生成事件、首页仅显示玩家视频；高消耗模式→Agent启动、自动生成事件和视频
  - [ ] SubTask 6.5: 实现Agent视频生成逻辑：根据事件和自身观点倾向生成标题、简介、关键帧
  - [ ] SubTask 6.6: Agent视频自动发布到首页信息流，带观点标签和随机播放量/评论/点赞
  - [ ] SubTask 6.7: 验证高/低模式切换和Agent行为

- [ ] Task 7: 事件系统实现
  - [ ] SubTask 7.1: 定义事件数据结构（id, title, description, category, heat, duration, effects, timestamp）
  - [ ] SubTask 7.2: 创建至少10个预设事件模板（企业丑闻/政策变动/科技突破/社会事件/娱乐热点各2个）
  - [ ] SubTask 7.3: 实现事件生成逻辑：仅高消耗模式下，玩家进入首页时有概率生成新事件
  - [ ] SubTask 7.4: 事件影响舆论指标（好感度/信任度/负面声量等）
  - [ ] SubTask 7.5: 事件触发Agent UP主自动生成视频
  - [ ] SubTask 7.6: 验证事件系统触发和影响逻辑

- [ ] Task 8: 生成类功能进度条系统
  - [ ] SubTask 8.1: 创建进度条组件HTML/CSS：B站品牌蓝色渐变、圆角6px、百分比文字、阶段文字
  - [ ] SubTask 8.2: 实现进度条动画逻辑：使用setTimeout/requestAnimationFrame模拟渐进进度，每阶段1-2秒，总过程5-8秒
  - [ ] SubTask 8.3: 事件生成进度条：显示"正在生成新事件..."进度
  - [ ] SubTask 8.4: 标题生成进度条：显示"正在生成视频标题..."进度
  - [ ] SubTask 8.5: 故事/简介生成进度条：显示"正在生成视频内容..."进度
  - [ ] SubTask 8.6: 关键帧生成进度条：显示"正在生成视频帧..."进度
  - [ ] SubTask 8.7: 视频发布进度条：显示"正在发布视频..."进度
  - [ ] SubTask 8.8: 玩家发布视频时也显示进度条
  - [ ] SubTask 8.9: 验证所有进度条显示效果和平滑过渡

- [ ] Task 9: 视频文字动画实现
  - [ ] SubTask 9.1: 定义4种动画风格的CSS `@keyframes`：调查类(深色+逐字显示)、热点类(红色+弹跳)、知识类(蓝色+淡入)、科技类(黑色+代码风格)
  - [ ] SubTask 9.2: 实现视频缩略图区域渲染文字动画（替代空白/静态图片）
  - [ ] SubTask 9.3: 动画内容基于视频的frames数组生成（3-5帧文字+过渡效果）
  - [ ] SubTask 9.4: 首页视频卡片和详情页播放器区域均显示文字动画
  - [ ] SubTask 9.5: 验证视频文字动画效果

- [ ] Task 10: 简化版AI视频内容生成
  - [ ] SubTask 10.1: 实现视频内容生成流程：事件→Agent选择→生成标题/简介→选择动画风格→生成关键帧（每步显示进度条）
  - [ ] SubTask 10.2: 创建视频模板库（不同分类的视频模板，包含标题模板和简介模板）
  - [ ] SubTask 10.3: 视频详情页"播放"时展示HTML动画序列（多帧文字+过渡效果）
  - [ ] SubTask 10.4: 验证视频内容生成和播放效果

# Task Dependencies
- [Task 2] depends on [Task 1]（创作中心功能从头像菜单移至个人空间）
- [Task 6] depends on [Task 7]（Agent需要事件系统才能生成视频）
- [Task 8] depends on [Task 6]（进度条需要Agent生成流程）
- [Task 9] depends on [Task 6]（文字动画需要Agent生成的视频数据）
- [Task 10] depends on [Task 6, 8, 9]（视频内容生成需要Agent、进度条和动画系统）
- [Task 3, 4, 5] 独立，可并行执行
