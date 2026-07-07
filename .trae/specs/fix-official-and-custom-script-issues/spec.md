# 修复官方剧本/开发中提示/智能生成三大回归问题 Spec

## Why
近期改动引入了三处回归：①官方剧本页面看不到新增的修仙剧本；②养成学院与纪念收藏两个板块未按需求显示"正在开发中"（纪念收藏点击会报错，养成学院点击会跳转到角色列表页）；③自定义剧本的智能生成功能因 `showGenProgress`/`hideGenProgress` 函数缺失而崩溃，进度条消失无法使用。这三处直接影响玩家核心流程，需立即修复。

## What Changes
- **官方剧本页面动态化**：将硬编码的三个末日方舟选项（`routePeople`/`routeNoble`/`routeCrown`）改为从 `gameChapters` 动态渲染，按剧本系列分组（末世方舟 / 逆天仙途），确保新增的修仙三章（id 4/5/6）可见可选
- **养成学院与纪念收藏显示"开发中"**：点击两个板块时统一弹出"正在开发中"提示，不再跳转到角色列表页，不再调用未定义的 `showDevToast`
- **恢复智能生成进度条**：补全 `showGenProgress`/`hideGenProgress` 函数定义，使 `CustomScriptGenerator.run` 流程能正常显示/隐藏进度条，不再因 ReferenceError 中断

## Impact
- Affected specs: `rewrite-cultivation-as-transmigrator`（修仙剧本需在官方页面可见）、`add-cultivation-script`（同上）、历史首页相关 spec
- Affected code: `index.html`（官方剧本面板 HTML 与 JS、养成学院点击处理、纪念收藏点击处理、`showGenProgress`/`hideGenProgress` 函数定义、`showDevToast` 函数定义或其替代方案）

## ADDED Requirements

### Requirement: 官方剧本页面动态渲染
系统 SHALL 在官方剧本面板（`officialRoutePanel`）中动态渲染所有 `gameChapters` 条目，按剧本系列分组显示，而非硬编码固定三个选项。

#### Scenario: 修仙剧本可见
- **WHEN** 玩家点击首页"官方剧本"入口
- **THEN** 官方剧本面板显示所有内置剧本，包括末世方舟三章（废墟之弈/钢铁之弈/黎明之弈）和逆天仙途三章（觉醒篇/霸业篇/巅峰篇）
- **AND** 每个剧本卡片显示 title、简短描述，点击可进入对应章节

#### Scenario: 按系列分组
- **WHEN** 官方剧本面板渲染
- **THEN** 剧本按系列分组（如"末世方舟"组、"逆天仙途"组），每组有清晰的分组标题或视觉分隔

### Requirement: 养成学院与纪念收藏显示开发中提示
系统 SHALL 在玩家点击"养成学院"或"纪念收藏"板块时，统一显示"正在开发中"的 Toast 提示，不跳转到任何功能页面。

#### Scenario: 点击养成学院
- **WHEN** 玩家点击首页"养成学院"板块
- **THEN** 显示 Toast 提示"养成学院正在开发中，敬请期待"
- **AND** 不发生页面跳转

#### Scenario: 点击纪念收藏
- **WHEN** 玩家点击首页"纪念收藏"板块
- **THEN** 显示 Toast 提示"纪念收藏正在开发中，敬请期待"
- **AND** 不调用未定义函数，不报错

### Requirement: 智能生成进度条恢复
系统 SHALL 提供 `showGenProgress(stage)` 和 `hideGenProgress()` 两个函数，供 `CustomScriptGenerator.run` 调用以显示/隐藏智能生成进度条。

#### Scenario: 智能生成显示进度
- **WHEN** 玩家在自定义剧本编辑器点击"智能生成"按钮
- **THEN** 进度条容器（`genProgressWrap`）显示，进度填充条（`genProgressFill`）随生成阶段更新
- **AND** 生成完成或失败后进度条隐藏

#### Scenario: 不再崩溃
- **WHEN** `CustomScriptGenerator.run` 执行
- **THEN** 不抛出 `ReferenceError: showGenProgress is not defined` 或 `hideGenProgress is not defined`

## MODIFIED Requirements

### Requirement: 官方剧本入口
原实现：官方剧本面板硬编码三个末日方舟选项（routePeople/routeNoble/routeCrown）。
修改后：官方剧本面板从 `gameChapters` 动态渲染所有内置剧本，按系列分组，每个剧本卡片点击后调用 `startBuiltinGame(chapterId)` 进入对应章节。

### Requirement: 养成学院入口
原实现：点击养成学院跳转到 `characterListPage` 角色列表页。
修改后：点击养成学院显示"正在开发中"Toast，不跳转。

### Requirement: 纪念收藏入口
原实现：点击纪念收藏调用 `showDevToast('纪念收藏')`（函数未定义，会报错）。
修改后：点击纪念收藏显示"正在开发中"Toast，不报错。

## REMOVED Requirements

### Requirement: 硬编码的三个官方剧本选项
**Reason**: 新增修仙剧本后，硬编码无法展示新剧本，需改为动态渲染。
**Migration**: 保留末日方舟三章的入口，但通过动态渲染生成，不再使用固定的 `routePeople`/`routeNoble`/`routeCrown` 三个 HTML 元素。原有的点击事件绑定逻辑同步迁移到动态生成的卡片上。
