# Tasks

- [x] Task 1: 官方剧本面板动态渲染（替换硬编码三选项）
  - [ ] SubTask 1.1: 在 `index.html` 中将 `officialRoutePanel` 内的硬编码三个 `mode-option`（routePeople/routeNoble/routeCrown）替换为一个动态渲染容器（如 `<div id="officialRouteList"></div>`）
  - [ ] SubTask 1.2: 编写 `renderOfficialRouteList()` 函数：从 `gameChapters` 读取所有章节，按剧本系列分组（根据 metadata.tags 或 title 前缀识别"末世方舟"和"逆天仙途"两组），为每个章节生成一个卡片（含 icon/title/desc），点击调用 `startBuiltinGame(chapterId)`
  - [ ] SubTask 1.3: 在官方剧本入口触发时（`modeOfficial` 点击后显示 `officialRoutePanel`）调用 `renderOfficialRouteList()` 填充动态内容
  - [ ] SubTask 1.4: 保留原"返回"按钮逻辑，确保从官方剧本面板返回模式选择正常
  - [ ] SubTask 1.5: 移除原 `routePeople`/`routeNoble`/`routeCrown` 的旧点击事件绑定（避免引用不存在的元素报错）

- [x] Task 2: 养成学院与纪念收藏显示"开发中"提示
  - [ ] SubTask 2.1: 修改 `index.html` 中养成学院（`.feature-btn.doll-school`）的点击处理（约 line 26936-26957）：移除跳转到 `characterListPage` 的逻辑，改为调用 `showToast('养成学院正在开发中，敬请期待')`（或已有的 Toast 函数）
  - [ ] SubTask 2.2: 修改纪念收藏（`.feature-btn.memorial`）的点击处理（约 line 10787）：将 `showDevToast('纪念收藏')` 改为 `showToast('纪念收藏正在开发中，敬请期待')`
  - [ ] SubTask 2.3: 确认 `showToast` 函数已定义（若未定义则使用项目已有的 Toast 机制，如 `showErrorToast` 的非错误变体或 `showInfoToast`）；若需新增则新增一个通用的 `showToast(message)` 函数

- [x] Task 3: 恢复智能生成进度条函数
  - [ ] SubTask 3.1: 在 `index.html` 中新增 `showGenProgress(stage)` 函数定义：根据 stage 参数（如 'send'/'parse'/'apply'）更新进度条文本与填充比例，显示 `genProgressWrap` 容器
  - [ ] SubTask 3.2: 新增 `hideGenProgress()` 函数定义：隐藏 `genProgressWrap` 容器，重置进度填充条
  - [ ] SubTask 3.3: 确认 `CustomScriptGenerator.run`（约 line 23997 的 `showGenProgress('send')` 与 line 24054 的 `hideGenProgress()`）能正常调用这两个函数，不再抛 ReferenceError
  - [ ] SubTask 3.4: 确认进度条容器 HTML（`genProgressWrap`/`genProgressFill`/`genProgressText`，约 line 8413）存在且 id 与函数内引用一致

- [x] Task 4: 端到端验证
  - [ ] SubTask 4.1: `node --check` 无语法错误（虽然 index.html 是 HTML，但内联 JS 需无报错）
  - [ ] SubTask 4.2: Playwright 进入首页 → 点击"官方剧本" → 确认面板显示 6 个剧本卡片（末世方舟 3 + 逆天仙途 3），点击"逆天仙途 · 觉醒篇"能进入第一章
  - [ ] SubTask 4.3: Playwright 点击"养成学院" → 确认显示"开发中"Toast，不跳转
  - [ ] SubTask 4.4: Playwright 点击"纪念收藏" → 确认显示"开发中"Toast，不报错
  - [ ] SubTask 4.5: Playwright 进入自定义剧本编辑器 → 输入描述 → 点击"智能生成" → 确认进度条显示（不崩溃）；若 API 未配置则确认报错提示正常（而非 ReferenceError）
  - [ ] SubTask 4.6: 360px 移动端适配验证（官方剧本面板、Toast 均无水平溢出）

# Task Dependencies
- [Task 1] 独立（官方剧本面板动态化）
- [Task 2] 独立（开发中提示）
- [Task 3] 独立（智能生成进度条函数）
- [Task 4] depends on [Task 1, 2, 3]（端到端验证依赖三个修复完成）
