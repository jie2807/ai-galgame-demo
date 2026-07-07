# Tasks

- [x] Task 1: 抽卡页 DOM 结构调整
  - [x] SubTask 1.1: 将「图鉴」「兑换」按钮从 `.gacha-footer` 移动到 `.gacha-header-right` 资源区旁边
  - [x] SubTask 1.2: 删除 `.gacha-deco-center` 中的花朵 SVG 图标，保留文案
  - [x] SubTask 1.3: 将 `.gacha-pity-bar` 下移至 `.gacha-main` 底部或 `.gacha-footer` 上方
  - [x] SubTask 1.4: 确认背景视频路径 `videos/main_background.mp4` 和抽卡动画视频路径 `videos/main_background.mp4`

- [x] Task 2: 抽卡页样式改为苹果风格
  - [x] SubTask 2.1: 将 `.gacha-page` 文字颜色改为白色（标题、资源数、按钮文字）
  - [x] SubTask 2.2: 重写 `.gacha-btn-single`、`.gacha-btn-ten` 为圆角毛玻璃按钮
  - [x] SubTask 2.3: 调整右上角图鉴/兑换按钮为简洁图标按钮
  - [x] SubTask 2.4: 调整 `.gacha-pity-bar` 位置和样式以匹配新布局
  - [x] SubTask 2.5: 添加移动端响应式规则

- [x] Task 3: 修复写信页 AI 连接错误
  - [x] SubTask 3.1: 定位 `readChunk is not defined` 报错位置
  - [x] SubTask 3.2: 补充 `readChunk` 函数或替换为标准流式读取代码
  - [x] SubTask 3.3: 验证发送消息后不再报错且 AI 能回复

- [x] Task 4: 写信页改为微信式气泡与同步玩家头像
  - [x] SubTask 4.1: 在 `openCharacterChat` 中读取首页玩家头像（localStorage `playerAvatar` 或 `#playerAvatar`）
  - [x] SubTask 4.2: 修改消息渲染函数，玩家消息靠右、角色消息靠左
  - [x] SubTask 4.3: 添加 `.charchat-message-player` 与 `.charchat-message-character` 气泡样式
  - [x] SubTask 4.4: 在玩家头像位置使用同步到的头像，角色头像使用角色 portrait

- [x] Task 5: 写信页改为苹果风格 UI
  - [x] SubTask 5.1: 将输入框 `.charchat-input` 改为圆角白色/半透明毛玻璃样式
  - [x] SubTask 5.2: 将发送按钮 `.charchat-send-btn` 改为蓝色圆形/圆角按钮
  - [x] SubTask 5.3: 将返回按钮 `.charchat-back-btn` 改为简洁图标按钮
  - [x] SubTask 5.4: 去除写信页咖啡色背景与咖啡色边框

- [x] Task 6: 验证与回归测试
  - [x] SubTask 6.1: 浏览器验证抽卡页新布局与按钮位置
  - [x] SubTask 6.2: 验证单抽/十连按钮点击正常且动画/结果正常
  - [x] SubTask 6.3: 验证图鉴/兑换按钮在右上角可正常点击
  - [x] SubTask 6.4: 验证写信页发送消息后 AI 正常回复
  - [x] SubTask 6.5: 验证玩家头像与首页设置一致且显示在右侧
  - [x] SubTask 6.6: 验证角色消息显示在左侧
  - [x] SubTask 6.7: 验证移动端 375px~768px 下两个页面均正常
  - [x] SubTask 6.8: 验证抽卡核心逻辑、图鉴、详情页未受影响

# Task Dependencies

- [Task 2] 依赖 [Task 1]
- [Task 4] 依赖 [Task 3]
- [Task 5] 可与 [Task 4] 并行开始
- [Task 6] 依赖 [Task 2]、[Task 4] 与 [Task 5]
