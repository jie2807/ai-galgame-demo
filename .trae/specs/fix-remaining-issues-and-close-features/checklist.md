# Checklist

## 自定义剧本智能生成

- [ ] `index.html` 第 23474-23482 行空白处已补全 5 个函数：`showGenProgress`、`updateGenProgress`、`completeGenProgress`、`hideGenProgress`、`showSuccessToast`
- [ ] `showGenProgress(stage)` 能根据 stage（'send'/'generate'/'parse'/'fill'）显示进度条并更新文案
- [ ] `hideGenProgress()` 能正确隐藏进度条并清理定时器
- [ ] `completeGenProgress()` 能将进度条推到 100% 并在短延迟后隐藏
- [ ] `showSuccessToast(msg)` 能以灵动岛样式显示成功提示
- [ ] `CustomScriptGenerator.run` 中 `showGenProgress('send')` 调用已移入 `try` 块内
- [ ] `catch` 块内 `hideGenProgress()` 已加 `typeof hideGenProgress === 'function'` 守卫
- [ ] `generateCustomScript` 按钮事件监听器已追加 `.catch(err => showError(err))`
- [ ] `CustomScriptGenerator` 依赖的 `showInfoToast`、`showError`、`showErrorToast` 等函数均已存在
- [ ] 浏览器中点击"智能生成"按钮不再抛出 `ReferenceError: showGenProgress is not defined`
- [ ] 生成过程中任何异常都不会导致按钮和输入框永久禁用（finally 块生效）
- [ ] API 未配置时显示"请先在模型调配中配置 API 地址"提示
- [ ] API 调用失败时显示对应错误提示，按钮恢复可用

## 书架页布局

- [ ] `styles.css` 中已补充 `.shelf-page-bg` 类（背景样式）
- [ ] `styles.css` 中已补充 `.shelf-header` 类（顶部栏布局）
- [ ] `styles.css` 中已补充 `.shelf-body` 类（主体容器）
- [ ] `styles.css` 中已补充 `.shelf-grid` 类（书籍网格，使用 repeat(auto-fill, minmax)）
- [ ] `styles.css` 中已补充 `.shelf-empty`、`.shelf-empty-icon`、`.shelf-empty-text` 类（空书架提示）
- [ ] `styles.css` 中已补充 `.shelf-book-card`、`.shelf-book-cover`、`.shelf-book-title`、`.shelf-book-subtitle`、`.shelf-book-meta`、`.shelf-book-actions`、`.shelf-book-btn` 类（书籍卡片）
- [ ] `styles.css` 中已补充 `.shelf-back-btn`、`.shelf-announce-btn` 类（按钮）
- [ ] 移动端断点（max-width: 768px）下书架网格变为 2 列
- [ ] 浏览器进入书架页不再显示纯黑无样式，能看到完整布局
- [ ] 空书架状态下显示空书架提示（图标+文字）
- [ ] 有藏书时以网格形式展示书籍卡片

## 通用 showDevToast 函数

- [ ] `index.html` 中已新增 `showDevToast(featureName)` 函数定义
- [ ] 函数复用 `dynamicIslandToast` 元素和灵动岛样式
- [ ] 文案根据 `featureName` 动态生成：`{featureName}功能正在开发中，敬请期待`
- [ ] 已添加 `window.showDevToast = showDevToast` 导出
- [ ] 浏览器控制台执行 `showDevToast('测试')` 能正确显示弹窗
- [ ] 弹窗在 1.6 秒后自动消失
- [ ] 弹窗位置在顶部居中，使用半透明背景和圆角

## 纪念收藏入口

- [ ] 第 10772 行 `memorialBtn.addEventListener('click', showMemorialModal)` 已改为调用 `showDevToast('纪念收藏')`
- [ ] 全文件搜索 `showMemorialModal` 调用，确认所有触发入口已替换为 `showDevToast`（保留函数定义）
- [ ] `#memorialCollectionModal` HTML 结构保留未删除
- [ ] `showMemorialModal`、`hideMemorialModal` 函数定义保留未删除
- [ ] 浏览器点击首页"纪念收藏"按钮显示灵动岛弹窗"纪念收藏功能正在开发中，敬请期待"
- [ ] 不再打开 `#memorialCollectionModal` 弹窗

## 养成学院入口

- [ ] 第 26750-26768 行 `.feature-btn.doll-school` 的 click 回调已改为 `showDevToast('养成学院')`
- [ ] 全文件搜索养成学院相关导航调用，确认所有触发入口已替换（保留函数定义）
- [ ] `#characterListPage` HTML 结构保留未删除
- [ ] `renderCharacterList()` 函数定义保留未删除
- [ ] 浏览器点击首页"养成学院"按钮显示灵动岛弹窗"养成学院功能正在开发中，敬请期待"
- [ ] 不再导航到 `#characterListPage`

## 其他潜在问题排查

- [ ] Grep 搜索 `index.html` 所有 `onclick="..."` 内联事件，确认引用的函数均已定义
- [ ] Grep 搜索 `addEventListener\('click'` 等事件绑定，确认回调函数均已定义
- [ ] 浏览器 F12 控制台无新增红色 ReferenceError 或 TypeError（预存 index.html:1:16 SyntaxError 除外）
- [ ] 依次点击首页所有按钮（抽卡、书架、纪念收藏、养成学院、AI工作台、设置等）无报错
- [ ] 自定义剧本编辑器其他功能（保存、加载、预览、退出等）正常工作

## 端到端回归

- [ ] 桌面端：4 个问题全部修复，行为符合 spec 描述
- [ ] 移动端（窗口宽度 ≤ 768px）：书架页布局响应式正确，灵动岛弹窗位置正确
- [ ] 抽卡系统、Creator Wars、写信等其他功能未受影响
- [ ] 浏览器控制台全程无红色错误（预存问题除外）
