# 修复剩余问题与关闭未开放功能 Spec

## Why
上一轮 kimi 回归修复后，仍有 4 类遗留问题影响玩家体验：自定义剧本智能生成因 5 个配套函数缺失而完全无法使用；书架页 JS 逻辑完整但内部布局 CSS 全部缺失导致页面显示为纯黑无样式；纪念收藏与养成学院两个功能尚未向玩家开放，需要以"灵动岛"样式弹窗提示开发中。此外需排查其他潜在问题。

## What Changes
- 在 `index.html` 第 23474-23482 行空白处补全 5 个缺失函数：`showGenProgress`、`updateGenProgress`、`completeGenProgress`、`hideGenProgress`、`showSuccessToast`，修复自定义剧本智能生成
- 将 `showGenProgress('send')` 调用移入 `try` 块内，避免未来回归时按钮永久禁用
- 在 `catch` 块内为 `hideGenProgress()` 加 `typeof` 守卫
- 给 `generateCustomScript` 的事件监听器加 `.catch`，将未处理 rejection 转为用户可见提示
- 在 `styles.css` 中为书架页补充约 12-15 个缺失的布局 CSS 类（`.shelf-page-bg`、`.shelf-header`、`.shelf-body`、`.shelf-grid`、`.shelf-empty*`、`.shelf-book-card*`、`.shelf-back-btn`、`.shelf-announce-btn` 等）
- 将纪念收藏入口（`.feature-btn.memorial`，第 10772 行）的点击处理器从 `showMemorialModal` 改为显示"开发中"提示
- 将养成学院入口（`.feature-btn.doll-school`，第 26750-26768 行）的点击处理器从导航到 `characterListPage` 改为显示"开发中"提示
- 创建通用 `showDevToast(featureName)` 函数（基于已有 `showAiWorkbenchToast` 的灵动岛样式），避免纪念收藏/养成学院入口显示"AI工作台"的错误文案
- 排查其他潜在问题（内联事件处理器、未定义函数引用、控制台错误等）

## Impact
- Affected specs: `fix-custom-script-ai-generation`（智能生成遗漏函数补全）、`open-doll-school-and-fix-letter-portrait-blur`（养成学院入口关闭，撤销该 spec 的开启改动）、`redesign-book-shelf-system`（书架页 CSS 补全，JS 逻辑已就绪无需重写）
- Affected code:
  - `index.html`：补全 5 个函数、修改 2 个入口点击处理器、新增 `showDevToast` 函数、调整 `CustomScriptGenerator.run` 的 try/catch 结构
  - `styles.css`：新增书架页布局样式
- **BREAKING**: 养成学院入口从可进入改为显示"开发中"提示（撤销 `open-doll-school` spec 的改动）；纪念收藏入口从可打开弹窗改为显示"开发中"提示

## ADDED Requirements

### Requirement: 自定义剧本智能生成可用
系统 SHALL 在玩家点击"智能生成"按钮后，正确显示进度条、调用 API、填入编辑器，并给出成功/失败反馈，不抛出未捕获的 ReferenceError。

#### Scenario: 正常生成流程
- **WHEN** 玩家输入描述并点击"智能生成"按钮
- **THEN** 进度条显示并随阶段更新文案（连接 API → 生成中 → 解析中 → 填入编辑器）
- **AND** 生成完成后显示成功提示"AI 剧本生成完成，已自动填入编辑器"
- **AND** 按钮和输入框在完成后恢复可用

#### Scenario: API 未配置
- **WHEN** 玩家点击"智能生成"但未配置 API 地址
- **THEN** 显示错误提示"请先在模型调配中配置 API 地址"
- **AND** 按钮和输入框恢复可用
- **AND** 进度条隐藏

#### Scenario: API 调用失败
- **WHEN** API 返回错误（401/超时/网络断开）
- **THEN** 显示对应的错误提示
- **AND** 按钮和输入框恢复可用
- **AND** 进度条隐藏

#### Scenario: 按钮不会永久禁用
- **WHEN** 生成过程中任何环节抛出异常（包括未预见的新错误）
- **THEN** `finally` 块确保按钮和输入框恢复可用
- **AND** 异常被捕获并显示给用户，不变成静默的 unhandled rejection

### Requirement: 书架页正确显示
系统 SHALL 在玩家进入书架页后，显示有布局样式的页面，包含头部栏（返回/标题/公告）、书籍网格、空书架提示，而非纯黑无样式的页面。

#### Scenario: 进入书架
- **WHEN** 玩家点击首页"书架"按钮
- **THEN** 书架页显示，头部栏在顶部，主体区域居中
- **AND** 无藏书时显示空书架提示（图标+文字）
- **AND** 有藏书时以网格形式展示书籍卡片（封面、书名、时间、字数、操作按钮）

#### Scenario: 书籍卡片样式
- **WHEN** 书架中有书籍
- **THEN** 每张卡片有封面区域、书名、副标题、生成时间、字数、删除按钮
- **AND** 卡片在网格中均匀排列，有合适的间距和圆角

### Requirement: 未开放功能显示开发中提示
系统 SHALL 在玩家点击"纪念收藏"或"养成学院"入口时，以灵动岛样式弹窗提示"该功能正在开发中，敬请期待"，而非进入功能页面或打开功能弹窗。

#### Scenario: 点击纪念收藏
- **WHEN** 玩家点击首页"纪念收藏"按钮
- **THEN** 显示灵动岛弹窗，内容为"纪念收藏功能正在开发中，敬请期待"
- **AND** 不打开 `#memorialCollectionModal`

#### Scenario: 点击养成学院
- **WHEN** 玩家点击首页"养成学院"按钮
- **THEN** 显示灵动岛弹窗，内容为"养成学院功能正在开发中，敬请期待"
- **AND** 不导航到 `#characterListPage`

#### Scenario: 弹窗样式一致性
- **WHEN** 灵动岛弹窗显示
- **THEN** 使用与抽卡系统一致的灵动岛样式（顶部居中、圆角、半透明背景、1.6 秒后自动消失）
- **AND** 弹窗文案根据功能名称动态生成，不显示"AI工作台"的错误文案

## MODIFIED Requirements

### Requirement: 养成学院入口
原入口（`.feature-btn.doll-school`，第 26750-26768 行）导航到 `#characterListPage` 并调用 `renderCharacterList()`。修改为：点击后调用 `showDevToast('养成学院')`，不导航到任何页面。保留 `#characterListPage` 和 `renderCharacterList()` 代码以备未来重新开放。

### Requirement: 纪念收藏入口
原入口（`.feature-btn.memorial`，第 10772 行）调用 `showMemorialModal` 打开 `#memorialCollectionModal`。修改为：点击后调用 `showDevToast('纪念收藏')`，不打开弹窗。保留 `#memorialCollectionModal` 和 `showMemorialModal`/`hideMemorialModal` 代码以备未来重新开放。

### Requirement: CustomScriptGenerator.run 错误处理结构
原 `run` 方法在 `try` 块之前调用 `showGenProgress('send')`，导致未定义时绕过 `finally`。修改为：将 `showGenProgress('send')` 移入 `try` 块内，并在 `catch` 块内为 `hideGenProgress()` 加 `typeof` 守卫，确保任何异常都不会导致按钮永久禁用。

## REMOVED Requirements

无。
