# Tasks

- [x] Task 1: 删除 game-chapters.js 中 id=5/6 两个章节对象
  - [x] SubTask 1.1: 删除 line 1399-1792（id=5 霸业篇 + id=6 巅峰篇两个完整章节对象），保留 line 1398 的 `}` 作为 id=4 的结束（原为 `},`）
  - [x] SubTask 1.2: 修复 id=4 内剩余的「你不是林凡」描述（line 1788 在删除范围内，无需单独修复，确认即可）
  - [x] SubTask 1.3: `node --check data/game-chapters.js` 通过
  - [x] SubTask 1.4: 验证 gameChapters 数组仅含 4 个对象（id 1/2/3/4）

- [x] Task 2: 修复游戏页面滚动问题
  - [x] SubTask 2.1: 定位游戏页面内容容器的 CSS overflow 设置
  - [x] SubTask 2.2: 修复 `.galgame-dialogue-bar` 的 `touch-action: manipulation` → `pan-y`（阻止触摸滚动的根因）
  - [x] SubTask 2.3: 确保移动端 touch-action 设置正确（bar 和 text 均为 pan-y）
  - [x] SubTask 2.4: Playwright 验证桌面端鼠标滚轮可滚动、移动端触摸可滑动

- [x] Task 3: 修复自定义剧本智能生成
  - [x] SubTask 3.1: Playwright 实际点击「智能生成」按钮，捕获控制台错误和实际异常
  - [x] SubTask 3.2: 根因定位：`run()` 在 line 23796 调用 `showSuccessToast(...)`，但该函数从未定义，导致 ReferenceError 被 catch 捕获后显示"生成失败"错误提示
  - [x] SubTask 3.3: 修复根因：在 `showInfoToast` 后添加 `showSuccessToast(message, duration)` 函数，委托给 `showToast(message, 'success', duration)`
  - [x] SubTask 3.4: Playwright 验证点击智能生成后进度条显示、错误提示正常（无 API 配置时显示配置错误而非崩溃）

# Task Dependencies
- [Task 1] 独立（删除章节）
- [Task 2] 独立（滚动修复）
- [Task 3] 独立（智能生成修复）
- 三者可并行
