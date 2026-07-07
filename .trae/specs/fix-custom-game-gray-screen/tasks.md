# Tasks

- [x] Task 1: 为 startCustomGameFromConfig() file: 分支添加 try-catch-finally 错误处理
  - [x] 将 file: 分支的核心逻辑包裹在 try 块中
  - [x] 在 catch 块中记录错误并显示 toast 提示
  - [x] 在 finally 块中确保 gamePage.classList.add('active') 始终被调用
  - [x] 将 homePage.style.display = 'none' 移到 try 块内，但在 gamePage 显示之前

- [x] Task 2: 为 startGame() file: 分支添加同样的 try-catch-finally 保护
  - [x] 同 Task 1 的模式，确保预设章节启动也有错误保护

- [x] Task 3: 修复 getCustomConfig() 缺少 availableLocations 字段
  - [x] 在 getCustomConfig() 返回对象中添加 `availableLocations: getLocationEntries()`

- [x] Task 4: 修复 startCustomGameFromConfig() 未注册 loreEntries 到 gameWorldInfo
  - [x] 在 file: 分支中，将 config.loreEntries 的每一条注册到 gameWorldInfo

- [x] Task 5: 验证修复后语法正确
  - [x] 使用 Node.js new Function() 验证整个脚本块语法

# Task Dependencies
- Task 1 和 Task 2 可并行（同样的修复模式）
- Task 3 和 Task 4 可并行（独立的数据修复）
- Task 5 依赖 Task 1-4 全部完成
