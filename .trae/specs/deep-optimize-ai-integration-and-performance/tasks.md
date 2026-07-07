# Tasks

- [x] Task 1: 实现统一AI服务层（AIServiceHub）
  - [x] SubTask 1.1: 创建AIServiceHub核心类，实现API配置管理（统一读取localStorage中的api_base/api_key/model）
  - [x] SubTask 1.2: 实现请求队列（最大并发3，优先级调度high/normal/low）
  - [x] SubTask 1.3: 实现LRU响应缓存（50条容量，5分钟时效，基于prompt哈希的缓存键）
  - [x] SubTask 1.4: 实现错误重试机制（指数退避，最多3次重试）
  - [x] SubTask 1.5: 实现流式响应统一处理（SSE解析、AbortController管理）
  - [x] SubTask 1.6: 实现请求节流（同一应用最多1个pending请求，请求间隔最小500ms）
  - [x] SubTask 1.7: 将CWE._callAI迁移到AIServiceHub（CWE改为调用AIServiceHub.request()）

- [x] Task 2: 微信AI聊天接入
  - [x] SubTask 2.1: 定义微信AI人格数据（张三-项目经理、李四-设计师、产品讨论组-群聊等6个角色的人设和风格）
  - [x] SubTask 2.2: 实现微信AI聊天回复（用户发送消息后，通过AIServiceHub调用AI生成回复，显示"正在输入..."状态，延迟0.5-2秒）
  - [x] SubTask 2.3: 实现微信AI流式输出（打字机效果，使用requestAnimationFrame批量DOM更新）
  - [x] SubTask 2.4: 实现微信群聊AI（多个AI角色依次回复，间隔1-3秒）
  - [x] SubTask 2.5: 优化微信聊天DOM更新（发送消息后仅追加新消息气泡，不全量重渲染）

- [ ] Task 3: B站AI互动接入
  - [ ] SubTask 3.1: 定义B站AI人格数据（游戏老司机、美食探险家、科技前沿等8个UP主的人设和风格）
  - [ ] SubTask 3.2: 实现B站评论区AI回复（用户发表评论后，UP主通过AI生成回复，延迟1-3秒）
  - [ ] SubTask 3.3: 实现B站AI生成视频内容（用户输入主题，AI生成标题/简介/关键帧，显示进度条）
  - [ ] SubTask 3.4: 实现B站UP主AI私信（用户向UP主发送私信，UP主通过AI回复）
  - [ ] SubTask 3.5: 实现B站评论区用户发表评论功能（当前评论区仅展示硬编码评论，需新增评论输入框和发表逻辑）

- [x] Task 4: 抖音AI创作接入
  - [x] SubTask 4.1: 重构"AI创作视频"面板——"开始创作"按钮从空操作改为触发AI创作流程
  - [x] SubTask 4.2: 实现抖音AI视频脚本生成（根据主题+风格+时长，AI生成标题/描述/关键帧/标签）
  - [x] SubTask 4.3: 实现AI创作进度条（依次显示：生成标题→生成描述→生成关键帧→完成）
  - [x] SubTask 4.4: 生成完成后将新视频添加到视频列表（window._dyState.videos数组）
  - [x] SubTask 4.5: 实现抖音评论AI回复（用户发表评论后，视频作者通过AI回复）

- [x] Task 5: 邮箱AI助手接入
  - [x] SubTask 5.1: 实现AI智能回复邮件（查看邮件时显示"AI回复"按钮，AI生成3种回复建议：正式/简洁/友好）
  - [x] SubTask 5.2: 实现AI撰写邮件（写邮件窗口新增"AI撰写"按钮，用户输入要点后AI生成完整邮件）
  - [x] SubTask 5.3: 实现AI邮件摘要（长邮件自动生成3-5句摘要，显示在邮件列表项中）

- [x] Task 6: 同花顺AI分析接入
  - [x] SubTask 6.1: 实现AI个股分析（股票详情页新增"AI分析"按钮，AI生成基本面+技术面+操作建议报告）
  - [x] SubTask 6.2: 实现AI资讯解读（财经新闻AI解读，分析对相关股票/板块的影响）
  - [x] SubTask 6.3: 实现AI问股（搜索框支持自然语言提问，AI回答股票相关问题，附带免责声明）
  - [x] SubTask 6.4: 实现AI投资建议（基于持仓数据+盈亏情况，AI给出建议）

- [x] Task 7: macOS桌面性能优化
  - [x] SubTask 7.1: 优化微信聊天DOM更新——发送消息后仅追加新消息气泡，不调用renderChatDetail全量重渲染
  - [x] SubTask 7.2: 优化B站Tab切换——仅更新变化区域，不全量重建innerHTML
  - [x] SubTask 7.3: 优化抖音视频切换——仅更新变化元素（背景、用户信息、操作按钮），不全量重建
  - [x] SubTask 7.4: 优化已打开应用窗口——切换时仅显示/隐藏，不重新渲染内容
  - [x] SubTask 7.5: 优化流式AI输出DOM更新——使用requestAnimationFrame批量处理，每100ms合并一次
  - [x] SubTask 7.6: 打字机效果改用textContent替代innerHTML，减少解析开销

# Task Dependencies
- [Task 2~6] depends on [Task 1]（所有AI接入依赖AIServiceHub）
- [Task 7] 无依赖，可与Task 1并行
- [Task 2~6] 之间可并行（各应用AI接入相互独立）
