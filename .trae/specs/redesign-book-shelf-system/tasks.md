# Tasks

- [ ] Task 1: 修复书籍生成 bug（parseBookContent 解析逻辑）
  - [ ] SubTask 1.1: 修正 parseBookContent 中章节内容解析逻辑，当 `[CH]标题\n正文` 格式时正确分离标题和正文
  - [ ] SubTask 1.2: 修正当章节内容只有一行（无换行）时的 edge case 处理
  - [ ] SubTask 1.3: 添加 AI 输出格式容错处理（AI 未严格遵循 [CH] 标签时的 fallback）

- [ ] Task 2: 优化生成 prompt 和 API 参数
  - [ ] SubTask 2.1: 优化 buildBookSystemPrompt，更明确地要求完整输出，包含世界观引用、对话扩展、心理描写
  - [ ] SubTask 2.2: 调整 max_tokens 从 4000 → 8000
  - [ ] SubTask 2.3: 调整 stream 超时从 60s → 120s
  - [ ] SubTask 2.4: 添加生成进度更精细的加载动画提示

- [ ] Task 3: 首页"卡片"改为"书架"入口
  - [ ] SubTask 3.1: 将首页 side-btn radio-commander-btn 的名称从"卡片"改为"书架"，英文从"RADIO"改为"BOOK SHELF"
  - [ ] SubTask 3.2: 修改点击事件从 openRadioCommander 改为 openBookShelf

- [ ] Task 4: 创建书架页面 HTML 结构
  - [ ] SubTask 4.1: 创建 bookShelfPage 容器（顶部栏 + 书籍网格 + 空书架状态）
  - [ ] SubTask 4.2: 创建书籍卡片模板（封面、书名、副标题、时间、字数、操作按钮）
  - [ ] SubTask 4.3: 创建空书架提示区域

- [ ] Task 5: 创建书籍阅读页面 HTML 结构
  - [ ] SubTask 5.1: 创建 bookReaderPage 容器（顶部工具栏 + 正文阅读区 + 底部工具栏）
  - [ ] SubTask 5.2: 添加横竖屏切换按钮
  - [ ] SubTask 5.3: 添加字体大小调节控件
  - [ ] SubTask 5.4: 添加下载按钮

- [ ] Task 6: 添加书架和阅读页面 CSS 样式
  - [ ] SubTask 6.1: 书架页面样式（网格布局、书籍卡片、空状态）
  - [ ] SubTask 6.2: 阅读页面样式（全屏、工具栏隐藏/显示、正文排版）
  - [ ] SubTask 6.3: 横屏阅读模式样式
  - [ ] SubTask 6.4: 字体大小调节样式

- [ ] Task 7: 实现书籍存储系统（localStorage）
  - [ ] SubTask 7.1: 定义书籍存储格式（id/title/subtitle/chapters/epilogue/createdAt/wordCount）
  - [ ] SubTask 7.2: 实现 saveBookToStorage() 和 loadBooksFromStorage()
  - [ ] SubTask 7.3: 实现 deleteBookFromStorage()
  - [ ] SubTask 7.4: 成书成功后自动存储

- [ ] Task 8: 实现书架功能逻辑
  - [ ] SubTask 8.1: 实现 openBookShelf() 和 renderBookShelf()
  - [ ] SubTask 8.2: 实现空书架状态显示
  - [ ] SubTask 8.3: 实现书籍卡片渲染和点击交互（阅读/下载/删除）

- [ ] Task 9: 实现阅读器功能逻辑
  - [ ] SubTask 9.1: 实现 openBookReader(bookId) 和 renderBookReader(bookData)
  - [ ] SubTask 9.2: 实现横竖屏切换
  - [ ] SubTask 9.3: 实现字体大小调节
  - [ ] SubTask 9.4: 实现阅读进度自动保存和恢复
  - [ ] SubTask 9.5: 实现工具栏点击隐藏/显示

- [ ] Task 10: 实现书籍下载功能
  - [ ] SubTask 10.1: 实现 downloadBookAsTxt(bookData) 函数
  - [ ] SubTask 10.2: 添加书架页和阅读页的下载按钮点击事件

- [ ] Task 11: 事件绑定整合
  - [ ] SubTask 11.1: 绑定书架页面所有交互事件
  - [ ] SubTask 11.2: 绑定阅读页面所有交互事件
  - [ ] SubTask 11.3: 绑定生成书籍到书架的自动保存流程

# Task Dependencies
- [Task 1] 独立（修复 bug，不依赖其他任务）
- [Task 2] 独立（优化 prompt，不依赖其他任务）
- [Task 3] 独立（修改首页入口）
- [Task 4] depends on [Task 3]（书架页面需要首页入口就位）
- [Task 5] depends on [Task 4]（阅读页面需要书架页面就位）
- [Task 6] depends on [Task 4, Task 5]（样式依赖 HTML 结构）
- [Task 7] depends on [Task 1, Task 2]（存储系统依赖生成逻辑修复）
- [Task 8] depends on [Task 4, Task 7]（书架逻辑依赖 HTML 和存储系统）
- [Task 9] depends on [Task 5, Task 7]（阅读器依赖 HTML 和存储系统）
- [Task 10] depends on [Task 7]（下载依赖存储系统）
- [Task 11] depends on [Task 8, Task 9, Task 10]（事件绑定依赖所有功能模块）
