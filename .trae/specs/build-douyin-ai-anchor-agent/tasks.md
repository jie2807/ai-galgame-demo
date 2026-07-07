# Tasks

- [x] Task 1: 集成lottie-web播放器
  - [x] SubTask 1.1: 在index.html的`<head>`中添加lottie-web CDN引用（`https://cdn.jsdelivr.net/npm/lottie-web@5.12.2/build/player/lottie.min.js`）
  - [x] SubTask 1.2: 创建DyLottiePlayer封装对象，实现play(container, url, options)/pause()/resume()/destroy()/getInstance()方法
  - [x] SubTask 1.3: 修改视频播放区HTML结构——在`#dyVideoBg`之上新增`#dyLottieLayer`容器层用于渲染Lottie动画
  - [x] SubTask 1.4: 修改dyUpdateSlideContent函数——切换视频时，若有lottieUrl则调用DyLottiePlayer.play()加载动画，否则隐藏Lottie层

- [x] Task 2: 构建Lottie动画资源池
  - [x] SubTask 2.1: 从LottieFiles免费动画库中筛选并收集16-20个Lottie JSON URL，按6个分类（tech/news/nature/emotion/festival/abstract）组织，每个分类2-3个动画
  - [x] SubTask 2.2: 创建`_dyLottiePool`对象，每个动画条目包含url/tags/mood字段
  - [x] SubTask 2.3: 实现`dyMatchLottie(category, mood)`函数——根据分类和情绪从资源池中匹配最佳Lottie动画URL

- [x] Task 3: 构建BGM资源池与音频播放
  - [x] SubTask 3.1: 从Pixabay Music等免版权来源预选8-10首不同风格BGM，获取CDN直链URL
  - [x] SubTask 3.2: 创建`_dyBgmPool`数组，每个条目包含url/name/mood/category/duration字段
  - [x] SubTask 3.3: 实现`dyMatchBgm(category, mood)`函数——根据分类和情绪匹配BGM
  - [x] SubTask 3.4: 在视频播放区新增`<audio>`元素用于BGM播放，实现播放/暂停/音量控制
  - [x] SubTask 3.5: 实现BGM ducking效果——TTS朗读期间BGM音量降至15%，朗读完成后恢复至30%

- [x] Task 4: TTS语音播报接入
  - [x] SubTask 4.1: 修改视频播放逻辑——浏览到含ttsText的视频时自动调用NPCTTS.speak()朗读口播文案
  - [x] SubTask 4.2: 实现字幕同步——TTS朗读时在视频区底部显示逐字打字机效果的字幕
  - [x] SubTask 4.3: 修改视频切换逻辑——切换视频时调用speechSynthesis.cancel()停止当前TTS
  - [x] SubTask 4.4: 实现静音控制——新增静音按钮，可一键关闭TTS和BGM

- [x] Task 5: AI主播Agent核心工作流
  - [x] SubTask 5.1: 定义AI主播人格数据`_dyAnchorPersona`（name/title/personality/style/avatar）
  - [x] SubTask 5.2: 实现`dyAnchorFetchNews()`——通过AIServiceHub.request()的enableWebSearch功能，让AI搜索当日互联网前沿热点
  - [x] SubTask 5.3: 实现`dyAnchorGenerateScript()`——AI基于热点生成完整视频脚本（标题+口播文案+关键帧+标签+lottieCategory+mood+bgmCategory+bgmMood）
  - [x] SubTask 5.4: 实现`dyAnchorComposeVideo()`——将AI脚本+匹配的Lottie+匹配的BGM组合为完整视频对象，插入视频列表顶部
  - [x] SubTask 5.5: 实现`dyAnchorAutoRun()`——编排完整工作流（抓取热点→生成文案→匹配Lottie→匹配BGM→合成视频→发布），管理各步骤的异步执行和错误处理

- [ ] Task 6: 自动触发与通知机制
  - [ ] SubTask 6.1: 修改renderDouyinContent——首次进入抖音时检查是否已有AI主播视频，若无则自动调用dyAnchorAutoRun()
  - [ ] SubTask 6.2: 使用`window._dyState.hasAnchorVideo`标记是否已生成过AI主播视频，避免重复自动生成
  - [ ] SubTask 6.3: 实现通知条——视频生成完成后在抖音顶部显示"主播A刚刚发布了一条新视频"通知，3秒后自动消失
  - [ ] SubTask 6.4: 修改AI创作面板——新增"AI主播自动创作"选项，用户可手动触发完整工作流

- [x] Task 7: 视频合成播放器与UI完善
  - [x] SubTask 7.1: 实现视频合成播放器——统一管理Lottie动画+TTS语音+BGM+字幕的同步播放/暂停
  - [x] SubTask 7.2: AI主播视频的UI标识——用户名显示"AI主播A"，描述前带"🤖 AI创作"标签，头像带AI标识
  - [x] SubTask 7.3: 新增播放控制按钮——静音按钮、音量控制
  - [x] SubTask 7.4: 新增CSS样式——Lottie层样式、字幕样式、AI标识样式、通知条样式、播放控制样式

# Task Dependencies
- [Task 2] depends on [Task 1]（Lottie资源池需要lottie-web已集成才能验证）
- [Task 4] depends on [Task 3]（TTS ducking需要BGM播放已实现）
- [Task 5] depends on [Task 2, Task 3]（AI主播工作流需要Lottie资源池和BGM资源池）
- [Task 6] depends on [Task 5]（自动触发依赖AI主播工作流完成）
- [Task 7] depends on [Task 5, Task 6]（播放器需要所有组件就绪）
- [Task 1, Task 3] 可并行（lottie-web集成和BGM资源池互不依赖）
