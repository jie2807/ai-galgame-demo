# 末日文重写 + AI 耗时指示器 + 性别默认立绘 Checklist

## 变更 1 — AI 回复耗时实时指示器

### DOM 与计时逻辑
- [x] `addTypingIndicator()` 中已追加 `.msg-elapsed-chip` DOM 节点（L19600）
- [x] chip 与 typing dots 同行展示，不破坏既有布局
- [x] `sendUserMessage()` 入口处启动 `performance.now()` 计时（L26394+）
- [x] 启动 `setInterval(200ms)` 刷新 chip 文本（L26436）
- [x] chip 初始显示「等待首字...」（Playwright 验证通过）

### 状态切换
- [x] `onChunk` 首次回调时记录首字时间戳，切换显示「首字 X.Xs · 总 X.Xs」（L26472-26473）
- [x] 流式过程中「总耗时」持续累加刷新（`_updateElapsedChip` 函数）
- [x] `onComplete` 停止 interval，chip 定格显示最终耗时（L26478 `_stopElapsedChip(false)`）
- [x] chip 在 `onComplete` 后保留 800ms 再随 typing indicator 淡出（`setTimeout(removeTypingIndicator, 800)`）
- [x] `onError` 停止 interval，chip 文本改为「超时 X.Xs」或「错误」（L26546 `_stopElapsedChip(true, '错误')`）
- [x] 取消分支同步处理 chip（L26373 `_stopElapsedChip(true, '已取消')`）
- [x] chip 出错时颜色变红（`.chip-error` 类，CSS L6123）

### 样式
- [x] `styles.css` 已有 `.msg-elapsed-chip` 样式（L6097，font-size 12px、灰底圆角、与 typing dots 对齐）
- [x] 已有 `.chip-error` 红色变体（L6123）
- [x] `@media (max-width: 360px)` 下 chip 只显示「X.Xs」总耗时（L6130，隐藏 `.chip-first`）
- [x] chip 不挤占 typing dots 的可视空间
- [x] chip 在 375px 宽度下显示正确（Playwright 375×667 验证通过）

## 变更 2 — 无立绘角色按性别默认立绘

### 资源文件
- [x] `assets/portraits/fallback-male.svg` 已创建（2265 bytes，男性剪影/短发/风衣/深灰蓝调/含「无立绘」水印与 ♂ 图标）
- [x] `assets/portraits/fallback-female.svg` 已创建（2620 bytes，女性剪影/长发/风衣/深紫调/含「无立绘」水印与 ♀ 图标）
- [x] 两个 SVG 在浏览器中能正确渲染（Playwright XHR 验证 200 OK）

### 函数逻辑
- [x] `showPlaceholderFallback(gender)` 已接受 gender 参数（L40116）
- [x] `gender === "male"` → 渲染 `fallback-male.svg`（L40122）
- [x] `gender === "female"` → 渲染 `fallback-female.svg`（L40124）
- [x] `gender === "neutral"` / `undefined` / 其他 → 渲染原通用占位（向后兼容，L40130 else 分支）
- [x] `updatePortrait(npcId)` 所有调用点传入 `charData.gender`（5 处：L40162/L40165/L40188/L40195/L40199）

### 自定义剧本 NPC 注册
- [x] 第一处自定义剧本 NPC 注册逻辑已修改（L15362）
- [x] 第二处自定义剧本 NPC 注册逻辑已修改（L24694）
- [x] AI 生成 NPC 无 portrait/live2dModel 时根据 gender 自动绑定对应默认立绘路径
- [x] 绑定后 `gameCharacters[npcId].portrait` 字段被正确写入

### 场景验证
- [x] 原版无立绘 NPC（linshen，male）按性别渲染 `fallback-male.svg`（Playwright 验证通过）
- [x] 原版无立绘 NPC（suqing，female）按性别渲染 `fallback-female.svg`（Playwright 延迟验证通过）
- [ ] 自定义剧本 AI 生成 NPC 按性别渲染对应默认立绘（需真机/AI 生成场景验证）
- [ ] neutral 性别 NPC 仍渲染原通用占位（需真机验证）

## 变更 3 — 官方剧本末日文重写

### data/game-world-info.js
- [x] 16 条末日文词条全部写入
- [x] 每条 `keys` 数组覆盖关键别名
- [x] `gameWorldInfo` 数组结构与原结构一致
- [x] 无旧关键词残留

### data/characters.js
- [x] `gameCharacters` 对象含 12 个新 NPC（Playwright 验证：linshen/suqing/laozhou/xiaolu/lie/lingshuang/alpha/mila/yuanzhang/lin/shenfu/ada）
- [x] 每个 NPC 字段完整
- [x] `gender` 字段使用 `"male"/"female"`（Playwright 验证：linshen=male, suqing=female）
- [x] `portrait` 字段为 `assets/portraits/fallback-male.svg` 或 `fallback-female.svg`（Playwright 验证通过）
- [x] `live2dModel` 字段为 `null`
- [x] `gachaPool` 数组含 12 个 NPC，SSR 4 / SR 6 / R 2
- [x] `firstMessage` 内容符合末日文风格

### data/chapter-locations.js
- [x] 第一章 6 个场景
- [x] 第二章 6 个场景
- [x] 第三章 6 个场景
- [x] 每个场景字段完整
- [x] 无旧场景残留

### data/game-chapters.js
- [x] 第一章「废墟之弈」完整重写（Playwright 验证：Chapter 1 title = "废墟之弈"）
- [x] 第一章事件系统（12+8+8+4）
- [x] 第二章「钢铁之弈」完整重写
- [x] 第二章事件系统
- [x] 第三章「黎明之弈」完整重写
- [x] 第三章事件系统
- [x] 三章 `worldContext` 均含「末世方舟」等触发关键词
- [x] 三章 `events` 中无旧设定残留

### data/npc-live2d-models.js
- [x] 12 个新 NPC ID 占位映射
- [x] URL 暂为 `null`
- [x] 注释说明「待用户技能生成立绘后填入实际 URL」
- [x] 无旧 NPC ID 残留

### index.html 融合指令
- [x] 诺克萨森识别逻辑已改为末日文关键词识别（L11791，isDoomsday）
- [x] `noxasenDeepRules` 已整体替换为 `doomsdayDeepRules`（L11812-11827）
- [x] `doomsdayDeepRules` 内容为 spec.md 7 条规则
- [x] 全局搜索旧关键词，确认无功能残留（Grep 验证零匹配）
- [x] HTML UI 中诺克萨森残留文本已清除

## 端到端验证

- [x] Playwright 375×667 移动端：页面加载成功，末日文内容显示（焦土市第七号避难所）
- [x] 控制台无 JS 错误（仅 1 个非关键 404）
- [x] `.msg-elapsed-chip` DOM 正确创建，初始文本「等待首字...」
- [x] linshen（male）立绘渲染 `fallback-male.svg`
- [x] suqing（female）立绘渲染 `fallback-female.svg`
- [x] 12 个末日 NPC 在 gameCharacters 中正确加载
- [x] 第一章标题「废墟之弈」正确显示
- [x] 第二章/第三章开场场景验证（Playwright：第二章「铁牙指挥中心」，第三章「方舟北方基地」）
- [x] 抽卡页 12 个末日 NPC 卡牌数据完整（gachaPool 12 项，SSR 4/SR 6/R 2）
- [ ] 角色档案页 12 个末日 NPC 资料完整（需手动进入档案页）
- [ ] 自定义剧本功能未受影响（需手动测试）
- [ ] 实际发送消息测试 chip 实时刷新（需配置 API key）
- [x] game-chapters.js 语法错误已修复（L86 等 96 行未转义双引号替换为「」）
- [x] showExitConfirm 函数已恢复（L16596，返回按钮回归修复）
- [x] 第一章事件系统完整（timelineEvents 12 + thresholdEvents 8 + randomEvents 8 + endingEvents 4）
- [x] 第一章 NPC 列表正确（linshen/suqing/laozhou/xiaolu）
- [x] 第二章 NPC 列表正确（lie/lingshuang/alpha/mila）
- [x] 第三章 NPC 列表正确（yuanzhang/lin/shenfu/ada）

## 移动端适配回归

- [x] `.msg-elapsed-chip` 在 375×667 下显示正确
- [ ] 360px 下 chip 只显示「X.Xs」总耗时（需 360px 宽度验证）
- [ ] 章节列表/抽卡/角色档案在 360px 下无水平溢出
- [x] 模态背景锁定机制未受影响
- [x] PWA manifest 加载正常
