# 抖音AI主播Agent自动视频生成系统 Spec

## Why
当前抖音应用中的视频全部为硬编码静态数据，AI创作功能仅生成文本脚本（标题/描述/关键帧），无法产出真正的"视频"内容——没有动画、没有语音、没有背景音乐，用户体验与真实抖音差距巨大。需要内置一个AI主播Agent，在用户进入抖音后自动抓取互联网前沿消息，利用Lottie动画+TTS语音+背景音乐，全自动生成一条完整的短视频，让抖音应用真正"活"起来。

## What Changes
- **新增**：AI主播Agent系统——"主播A"角色，进入抖音后自动运行，抓取当日热点→生成文案→匹配Lottie动画→TTS语音播报→匹配BGM→合成完整视频
- **新增**：lottie-web播放器集成——通过CDN引入lottie-web库，在视频播放区渲染Lottie动画替代静态渐变背景
- **新增**：Lottie动画资源池——内置分类Lottie JSON URL列表（科技/新闻/自然/情感/节日等），AI根据内容主题自动匹配
- **新增**：TTS语音播报——复用现有NPCTTS模块，AI生成的文案自动转为语音旁白
- **新增**：BGM自动匹配技能——内置免版权BGM资源池（Pixabay CDN音频URL），AI根据视频主题和情绪自动匹配背景音乐
- **新增**：视频合成播放器——将Lottie动画+TTS语音+BGM同步播放，形成完整短视频体验
- **修改**：抖音首页视频流——AI主播生成的视频自动插入视频列表顶部，带有"AI创作"标识
- **修改**：AI创作面板——从纯文本生成升级为完整视频生成工作流

## Impact
- Affected specs: `redesign-douyin-app`（抖音UI重构）、`deep-optimize-ai-integration-and-performance`（AIServiceHub已有webSearch能力）
- Affected code:
  - `index.html`：renderDouyinContent函数（L20235+）、dyStartCreate函数（L20656+）、新增lottie-web CDN引入、新增AI主播Agent逻辑、新增视频合成播放器
  - `pages/creator-wars/creator-wars.css`：新增Lottie播放器样式、AI主播标识样式、视频合成播放器样式

---

## 现状问题分析

### 问题1：视频只是静态渐变背景
当前抖音视频的"画面"仅是CSS渐变色+模糊光效（L20297-20299），没有任何实际视觉内容。用户看到的是一块彩色背景，不是视频。

### 问题2：AI创作仅生成文本
dyStartCreate（L20656-20773）通过AIServiceHub生成JSON格式的标题/描述/关键帧/标签，但关键帧只是文字描述（如"开场：引入主题"），没有对应的视觉呈现。

### 问题3：无语音能力
视频完全没有语音旁白。项目虽有NPCTTS模块（L10169-10248），但未接入抖音。

### 问题4：无背景音乐
视频的music字段仅显示文字（如"原声 - 创意达人小王"），没有实际音频播放。

### 问题5：无Lottie动画
项目中未引入lottie-web库，无任何Lottie相关代码。

---

## ADDED Requirements

### Requirement: AI主播Agent系统
抖音应用 SHALL 内置AI主播Agent（"主播A"），在用户进入抖音后自动运行完整的视频生成工作流。

**AI主播Agent工作流**：
1. **抓取热点**：通过AIServiceHub的enableWebSearch功能，调用AI搜索当日互联网前沿消息/热点新闻
2. **选题决策**：AI从热点中选取1个最适合做短视频的话题
3. **生成文案**：AI生成完整的视频脚本（标题+口播文案+关键帧描述+标签）
4. **匹配Lottie**：根据视频主题和情绪，从内置Lottie资源池中自动选择匹配的动画
5. **TTS语音**：将口播文案通过NPCTTS转为语音旁白
6. **匹配BGM**：根据视频主题和情绪，从内置BGM资源池中自动选择匹配的背景音乐
7. **合成视频**：将Lottie动画+TTS语音+BGM同步播放，形成完整短视频
8. **发布视频**：自动将生成的视频插入视频列表顶部，带"AI主播"标识

**AI主播人格**：
```javascript
var _dyAnchorPersona = {
    name: '主播A',
    title: 'AI前沿观察',
    personality: '专业、敏锐、有深度，擅长将复杂科技话题用通俗语言讲解',
    style: '新闻播报风格，开头引人注意，中间深入浅出，结尾留有思考',
    avatar: 'AI'  // 头像显示字母
};
```

**自动触发时机**：
- 用户首次进入抖音应用时自动触发（仅一次）
- 用户点击底部"+"投稿按钮时可手动触发
- 已有AI主播视频时不重复自动生成（避免每次进入都生成）

#### Scenario: 自动生成视频
- **WHEN** 用户首次点击进入抖音应用
- **THEN** AI主播Agent自动启动，依次执行：抓取热点→选题→生成文案→匹配Lottie→TTS语音→匹配BGM→合成视频
- **AND** 生成过程在后台进行，用户可正常浏览已有视频
- **AND** 生成完成后视频自动出现在列表顶部，带"AI主播"标识和通知提示

#### Scenario: 手动触发生成
- **WHEN** 用户点击"+"投稿按钮
- **THEN** 弹出AI创作面板，用户可选择"AI主播自动创作"或"自定义主题创作"
- **AND** 选择"AI主播自动创作"后执行完整自动工作流
- **AND** 选择"自定义主题创作"后用户输入主题，AI基于该主题生成视频

---

### Requirement: lottie-web播放器集成
系统 SHALL 集成lottie-web播放器，用于在视频播放区渲染Lottie动画。

**技术方案**：
- 通过CDN引入lottie-web：`<script src="https://cdn.jsdelivr.net/npm/lottie-web@5.12.2/build/player/lottie.min.js"></script>`
- 在index.html的`<head>`中添加CDN引用
- 创建`DyLottiePlayer`封装类，管理Lottie动画的加载、播放、暂停、销毁

**DyLottiePlayer接口**：
```javascript
var DyLottiePlayer = {
    // 在指定容器中加载并播放Lottie动画
    play: function(container, animationUrl, options) {
        // options: { loop, autoplay, renderer }
    },
    // 暂停动画
    pause: function() {},
    // 恢复动画
    resume: function() {},
    // 销毁动画实例
    destroy: function() {},
    // 获取当前动画实例
    getInstance: function() {}
};
```

**视频播放区改造**：
- 当前视频背景区`#dyVideoBg`为CSS渐变
- 改造为：Lottie动画层覆盖在渐变背景之上
- Lottie动画使用Canvas渲染器（性能优于SVG）
- 动画循环播放，与视频时长同步

#### Scenario: Lottie动画播放
- **WHEN** 用户浏览到带有Lottie动画的视频
- **THEN** 视频背景区渲染Lottie动画，循环播放
- **AND** 切换到其他视频时，当前Lottie动画销毁，新视频的Lottie动画加载

---

### Requirement: Lottie动画资源池
系统 SHALL 内置分类Lottie动画资源池，AI根据视频主题自动匹配动画。

**资源池设计**：
```javascript
var _dyLottiePool = {
    tech: [
        { url: 'https://lottie.host/xxx/tech1.json', tags: ['科技','AI','数字','未来'], mood: 'dynamic' },
        { url: 'https://lottie.host/xxx/tech2.json', tags: ['数据','网络','代码'], mood: 'calm' }
    ],
    news: [
        { url: 'https://lottie.host/xxx/news1.json', tags: ['新闻','热点','资讯'], mood: 'serious' },
        { url: 'https://lottie.host/xxx/news2.json', tags: ['全球','世界','事件'], mood: 'dynamic' }
    ],
    nature: [
        { url: 'https://lottie.host/xxx/nature1.json', tags: ['自然','风景','天气'], mood: 'calm' },
        { url: 'https://lottie.host/xxx/nature2.json', tags: ['动物','植物','生态'], mood: 'warm' }
    ],
    emotion: [
        { url: 'https://lottie.host/xxx/emotion1.json', tags: ['情感','心情','生活'], mood: 'warm' },
        { url: 'https://lottie.host/xxx/emotion2.json', tags: ['励志','成长','奋斗'], mood: 'uplifting' }
    ],
    festival: [
        { url: 'https://lottie.host/xxx/fest1.json', tags: ['节日','庆祝','快乐'], mood: 'cheerful' },
        { url: 'https://lottie.host/xxx/fest2.json', tags: ['新年','生日','纪念'], mood: 'cheerful' }
    ],
    abstract: [
        { url: 'https://lottie.host/xxx/abs1.json', tags: ['抽象','几何','艺术'], mood: 'dynamic' },
        { url: 'https://lottie.host/xxx/abs2.json', tags: ['粒子','波纹','流动'], mood: 'calm' }
    ]
};
```

**AI匹配策略**：
- AI生成文案时同时输出`lottieCategory`和`mood`字段
- 根据category从对应池中筛选，再按mood匹配
- 若无精确匹配，从abstract类别中随机选择
- 每个类别至少2个动画URL，随机选择避免重复

**Lottie资源来源**：
- 从LottieFiles（lottie.host）获取免费动画的JSON URL
- 优先选择轻量级动画（< 100KB）
- 使用Canvas渲染器确保性能

#### Scenario: AI自动匹配Lottie
- **WHEN** AI生成关于"AI技术突破"的视频文案
- **THEN** 系统从tech类别中选择mood为dynamic的Lottie动画
- **AND** 动画在视频播放区渲染

---

### Requirement: TTS语音播报
系统 SHALL 将AI生成的口播文案通过TTS转为语音旁白，与视频同步播放。

**技术方案**：
- 复用现有NPCTTS模块（L10169-10248）
- 在视频数据模型中新增`ttsText`字段（口播文案）
- 视频播放时自动触发TTS朗读
- 切换视频时停止当前TTS

**视频数据模型扩展**：
```javascript
{
    // ...existing fields...
    ttsText: '大家好，今天我们来聊聊...',  // TTS口播文案
    hasVoice: true,                         // 是否有语音
    lottieUrl: 'https://lottie.host/xxx.json', // Lottie动画URL
    lottieCategory: 'tech',                 // Lottie分类
    bgmUrl: 'https://cdn.pixabay.com/xxx.mp3', // BGM音频URL
    bgmName: '科技之声',                    // BGM名称
    isAiGenerated: true,                    // AI生成标识
    aiAnchor: '主播A'                       // AI主播名称
}
```

**TTS播放控制**：
- 视频开始播放时自动朗读ttsText
- TTS完成后BGM继续播放直到用户切换视频
- 用户可点击静音按钮关闭语音
- 切换视频时`speechSynthesis.cancel()`停止当前朗读

#### Scenario: 视频语音播报
- **WHEN** 用户浏览到AI主播生成的视频
- **THEN** TTS自动朗读口播文案，同时Lottie动画播放
- **AND** 朗读完成后BGM继续播放
- **AND** 切换到其他视频时语音停止

---

### Requirement: BGM自动匹配技能
系统 SHALL 内置免版权BGM资源池，AI根据视频主题和情绪自动匹配背景音乐。

**BGM资源池设计**：
```javascript
var _dyBgmPool = [
    { url: 'https://cdn.pixabay.com/audio/xxx.mp3', name: '科技前沿', mood: 'dynamic', category: 'tech', duration: 60 },
    { url: 'https://cdn.pixabay.com/audio/xxx.mp3', name: '新闻播报', mood: 'serious', category: 'news', duration: 45 },
    { url: 'https://cdn.pixabay.com/audio/xxx.mp3', name: '自然之声', mood: 'calm', category: 'nature', duration: 90 },
    { url: 'https://cdn.pixabay.com/audio/xxx.mp3', name: '温暖时光', mood: 'warm', category: 'emotion', duration: 60 },
    { url: 'https://cdn.pixabay.com/audio/xxx.mp3', name: '欢快节奏', mood: 'cheerful', category: 'festival', duration: 45 },
    { url: 'https://cdn.pixabay.com/audio/xxx.mp3', name: '深度思考', mood: 'uplifting', category: 'tech', duration: 75 },
    { url: 'https://cdn.pixabay.com/audio/xxx.mp3', name: '轻松日常', mood: 'calm', category: 'emotion', duration: 60 },
    { url: 'https://cdn.pixabay.com/audio/xxx.mp3', name: '动感电子', mood: 'dynamic', category: 'abstract', duration: 50 }
];
```

**BGM匹配策略**：
- AI生成文案时同时输出`bgmMood`和`bgmCategory`字段
- 根据category+mood从BGM池中筛选
- 若无精确匹配，按mood筛选
- BGM音量默认30%，不盖过TTS语音
- TTS播放期间BGM自动降低音量（ducking效果）

**BGM播放控制**：
- 使用HTML5 `<audio>` 元素播放
- BGM在视频开始时播放，循环直到用户切换
- 切换视频时当前BGM淡出停止
- 全局音量控制与项目现有bgm-volume联动

**音频来源**：
- Pixabay Music（CC0协议，免版权可商用）
- 预选8-10首不同风格的短音乐（30-90秒）
- 音频URL使用Pixabay CDN直链

#### Scenario: BGM自动匹配
- **WHEN** AI生成关于"科技突破"的视频
- **THEN** 系统从BGM池中选择mood为dynamic、category为tech的背景音乐
- **AND** BGM在视频播放时自动播放，音量30%

#### Scenario: TTS与BGM协调
- **WHEN** TTS开始朗读口播文案
- **THEN** BGM音量自动降至15%（ducking效果）
- **AND** TTS朗读完成后BGM音量恢复至30%

---

### Requirement: 视频合成播放器
系统 SHALL 实现视频合成播放器，将Lottie动画+TTS语音+BGM同步播放，形成完整短视频体验。

**播放器架构**：
```
┌─────────────────────────────┐
│     视频合成播放器            │
│  ┌───────────────────────┐  │
│  │   Lottie动画层         │  │
│  │   (Canvas渲染)         │  │
│  └───────────────────────┘  │
│  ┌───────────────────────┐  │
│  │   文案字幕层           │  │
│  │   (口播文案逐字显示)    │  │
│  └───────────────────────┘  │
│  ┌───────────────────────┐  │
│  │   音频控制层           │  │
│  │   TTS语音 + BGM音乐    │  │
│  └───────────────────────┘  │
└─────────────────────────────┘
```

**同步策略**：
- Lottie动画：循环播放，与视频时长无关
- TTS语音：视频开始时触发朗读，朗读进度与字幕同步
- BGM：视频开始时播放，TTS期间ducking
- 字幕：跟随TTS朗读进度逐字显示（打字机效果）

**播放器控制**：
- 播放/暂停：同时控制Lottie动画+TTS+BGM
- 音量控制：TTS音量和BGM音量独立控制
- 静音按钮：一键静音所有音频

#### Scenario: 完整视频播放
- **WHEN** 用户浏览到AI主播生成的视频
- **THEN** Lottie动画播放 + TTS朗读口播文案 + 字幕逐字显示 + BGM背景音乐
- **AND** 所有元素同步启动，形成完整短视频体验

#### Scenario: 视频切换
- **WHEN** 用户滑动切换到下一个视频
- **THEN** 当前视频的Lottie动画销毁、TTS停止、BGM淡出
- **AND** 新视频的Lottie动画加载、TTS开始、BGM播放

---

### Requirement: AI主播视频标识与通知
AI主播生成的视频 SHALL 有明确的标识和通知机制。

**标识设计**：
- 视频用户名显示"AI主播A"，头像带AI标识
- 视频描述前带"🤖 AI创作"标签
- 视频右侧互动区新增"AI主播"小标签

**通知机制**：
- 视频生成完成后，在抖音顶部显示通知条："主播A刚刚发布了一条新视频"
- 通知条3秒后自动消失
- 点击通知条跳转到该视频

#### Scenario: AI视频标识
- **WHEN** AI主播生成的视频出现在视频列表中
- **THEN** 用户名显示"AI主播A"，描述前有"🤖 AI创作"标签
- **AND** 用户可正常点赞、评论、收藏

---

## MODIFIED Requirements

### Requirement: 视频数据模型
当前视频数据模型仅包含gradient/user/desc/tags/likes/comments/favorites/shares/music/colorIdx/plays。
修改后新增字段：ttsText, hasVoice, lottieUrl, lottieCategory, bgmUrl, bgmName, isAiGenerated, aiAnchor, aiFrames。

### Requirement: dyStartCreate函数
当前仅生成文本JSON（标题/描述/关键帧/标签）。
修改后执行完整视频生成工作流：抓取热点→生成文案→匹配Lottie→TTS→匹配BGM→合成视频。

### Requirement: 视频播放区
当前视频背景为CSS渐变+模糊光效。
修改后支持Lottie动画层覆盖在渐变背景之上，AI生成的视频使用Lottie动画作为视觉内容。

### Requirement: 视频切换逻辑
当前切换视频仅更新CSS渐变和文字信息。
修改后切换视频时需管理Lottie动画实例的创建/销毁、TTS的启停、BGM的切换。

---

## REMOVED Requirements

### Requirement: 纯文本AI创作
**Reason**: 升级为完整视频生成工作流，不再仅生成文本脚本
**Migration**: dyStartCreate从纯文本生成改为完整视频生成流程
