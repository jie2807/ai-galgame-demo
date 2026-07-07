# 书架系统重构 Spec

## Why
当前一键成书功能存在四个关键问题：1）书籍生成后章节仅有标题无正文内容（parseBookContent 解析逻辑有 bug）；2）生成速度慢且失败率高（prompt 设计和 API 调用参数需优化）；3）成书后书籍无处存储和查看（缺少书架系统）；4）不支持阅读模式和 TXT 下载。需要全面重构为书架系统，参考起点中文网的书籍管理体验。

## What Changes
- **首页"卡片"改为"书架"**：移除"卡片"的无线电指挥官玩法关联，改为书架入口
- **新增书架页面**（`bookShelfPage`）：以网格展示所有已生成书籍的卡片
- **新增书籍阅读页面**（`bookReaderPage`）：支持横屏/竖屏切换、目录导航、阅读进度
- **新增书籍下载功能**：支持 TXT 格式下载
- **新增书籍存储系统**（localStorage）：持久化已生成的书籍数据
- **修复书籍生成 bug**：修正 parseBookContent 解析逻辑，确保章节正文完整
- **优化生成 prompt 和参数**：改进系统 prompt，降低 max_tokens 限制风险，添加重试机制

## Impact
- Affected specs: add-radio-commander-mode（首页入口）、一键成书功能
- Affected code: index.html（首页入口 HTML、书架页面、阅读页面）、styles.css（书架/阅读页面样式）、JavaScript（书架逻辑、阅读器逻辑、生成优化、下载功能）

## ADDED Requirements

### Requirement: 首页"书架"入口
首页"卡片"入口改回"书架"，名称显示"书架"，副标题显示"BOOK SHELF"，点击后进入书架页面而非无线电指挥官页面。

#### Scenario: 用户点击书架入口
- **WHEN** 用户在首页点击"书架"入口
- **THEN** 系统打开书架页面（bookShelfPage）

### Requirement: 书架页面布局
系统 SHALL 提供一个书架页面，参考起点中文网的书架设计，包含：

1. **顶部栏**：返回按钮 + 标题"書架" + 清空按钮
2. **书籍网格**：以卡片网格形式展示所有已存储的书籍
3. **空书架状态**：无书籍时显示"书架空空如也"提示 + "去写一本书"按钮
4. **书籍卡片**：每本书显示封面（自动生成封面图或默认封面）、书名、副标题、生成时间、字数、状态标签（已完成/草稿）、操作按钮（阅读/下载/删除）

#### Scenario: 书架有书籍
- **WHEN** 用户进入书架页面且已有存储的书籍
- **THEN** 系统以 2-3 列网格展示书籍卡片

#### Scenario: 书架为空
- **WHEN** 用户进入书架页面且无任何存储书籍
- **THEN** 系统显示空书架提示和引导文案

### Requirement: 书籍阅读页面
系统 SHALL 提供一个全屏阅读页面，包含：

1. **顶部工具栏**（可隐藏）：返回书架按钮 + 书名 + 横竖屏切换按钮
2. **正文阅读区**：显示完整书籍内容，支持目录锚点跳转
3. **底部工具栏**（可隐藏）：进度跳转按钮 + 下载按钮 + 字体大小调节
4. **阅读模式**：
   - 竖屏模式：默认模式，适合手机竖屏阅读
   - 横屏模式：点击切换按钮后，内容区铺满横屏，适合桌面/平板阅读
5. **阅读体验优化**：自动保存阅读进度（localStorage）、点击屏幕中上部切换工具栏显示/隐藏

#### Scenario: 用户点击书籍卡片上的"阅读"按钮
- **WHEN** 用户在书架页面点击某本书的"阅读"
- **THEN** 系统打开阅读页面，显示该书籍的完整内容

#### Scenario: 横竖屏切换
- **WHEN** 用户在阅读页面点击横竖屏切换按钮
- **THEN** 系统切换阅读模式，横屏模式下内容区更宽，竖屏模式恢复默认布局

### Requirement: 书籍下载功能
系统 SHALL 支持将已生成的书籍以 TXT 格式下载到本地。

#### Scenario: 下载书籍
- **WHEN** 用户在书架页面点击某本书的"下载"按钮或在阅读页面点击下载按钮
- **THEN** 系统生成纯文本格式的书籍内容并触发浏览器下载，文件名为"[书名].txt"

### Requirement: 书籍存储系统
系统 SHALL 使用 localStorage 持久化存储已生成的书籍数据，包括书名、副标题、章节列表、尾声、生成时间、字数。

书籍存储格式：
```json
{
  "id": "book_timestamp",
  "title": "书名",
  "subtitle": "副标题",
  "chapters": [{"title": "章节名", "content": "章节正文"}],
  "epilogue": "尾声内容",
  "createdAt": "2026-05-18T15:00:00Z",
  "wordCount": 5000
}
```

#### Scenario: 成书后自动存储
- **WHEN** AI 成功生成书籍内容
- **THEN** 系统自动将书籍数据存入 localStorage 并在书架页面中显示

### Requirement: 修复书籍生成 bug
系统 SHALL 修正 parseBookContent 函数的章节解析逻辑，确保章节正文完整提取。

当前 bug：`parseBookContent` 在 `[CH]...[/CH]` 匹配中，`bodyLines` 使用了 `substring(chapterContent.indexOf('\n'))`，当章节标题和内容之间没有换行时会导致内容丢失。

修复方案：正确分离章节标题和正文内容，确保正文完整保留。

### Requirement: 优化生成 prompt 和 API 参数
系统 SHALL 优化书籍生成的 AI prompt 和 API 调用参数：

1. **System Prompt 优化**：更明确地要求 AI 输出完整内容，包含丰富的对话细节和旁白扩展
2. **max_tokens 调整**：从 4000 提升到 8000，避免内容被截断
3. **stream 超时**：从 60s 延长到 120s，适应长文本生成
4. **重试机制**：生成失败时提供"重新生成"按钮和自动重试提示

## MODIFIED Requirements

### Requirement: 首页"卡片"入口
原"卡片"（radio-commander-btn）入口改回"书架"名称和"BOOK SHELF"副标题，点击事件改为打开书架页面（bookShelfPage）。移除无线电指挥官玩法关联。

### Requirement: 一键成书功能
成书成功后，除显示书籍内容外，自动将书籍数据存储到 localStorage。退出游戏时可选择是否将书籍存入书架。

## REMOVED Requirements

### Requirement: 无线电指挥官入口
**Reason**: 首页"卡片"入口已改为"书架"，原功能被移除
**Migration**: 无线电指挥官的 HTML/CSS/JS 代码保留在文件中但不通过首页入口访问（可通过设置面板或其他隐藏方式触发）
