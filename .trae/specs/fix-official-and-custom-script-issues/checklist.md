# Checklist

## 官方剧本面板动态渲染验证
- [x] `officialRoutePanel` 内不再有硬编码的 `routePeople`/`routeNoble`/`routeCrown` 三个固定选项
- [x] 新增动态渲染容器（如 `officialRouteList`）用于填充剧本卡片
- [x] `renderOfficialRouteList()` 函数从 `gameChapters` 读取所有章节并分组渲染
- [x] 官方剧本面板显示 6 个剧本卡片（末世方舟 3 + 逆天仙途 3）
- [x] 卡片显示正确的 title 和描述（如"逆天仙途 · 觉醒篇"）
- [x] 点击"逆天仙途 · 觉醒篇"卡片能进入第一章（id=4）
- [x] 点击"废墟之弈"卡片能进入末日方舟第一章（id=1），回归正常
- [x] "返回"按钮从官方剧本面板返回模式选择正常

## 养成学院与纪念收藏验证
- [x] 点击"养成学院"显示"正在开发中"Toast，不跳转到 characterListPage
- [x] 点击"纪念收藏"显示"正在开发中"Toast，不报错
- [x] 不再调用未定义的 `showDevToast` 函数
- [x] Toast 提示文案含"开发中"字样

## 智能生成进度条验证
- [x] `showGenProgress(stage)` 函数已定义，能显示 `genProgressWrap` 并更新进度文本/填充
- [x] `hideGenProgress()` 函数已定义，能隐藏 `genProgressWrap`
- [x] 点击"智能生成"按钮不再抛出 `ReferenceError: showGenProgress is not defined`
- [x] 进度条容器 `genProgressWrap` 在生成过程中可见
- [x] 生成完成或失败后进度条隐藏
- [x] 若 API 未配置，显示正常的 API 配置错误提示（而非 ReferenceError）

## 语法与回归验证
- [x] index.html 内联 JS 无语法错误（浏览器控制台无报错）
- [x] 末日方舟三章回归正常（可进入、可游玩）
- [x] 修仙三章可从官方剧本面板进入
- [x] 自定义剧本编辑器其他功能（手动编辑/保存/加载）不受影响
- [x] 360px 移动端无水平溢出（官方剧本面板、Toast 均正常）
