# Tasks

- [ ] Task 1: 修复 Vite 配置中 three/addons/ 别名解析问题（Critical）
  - [ ] SubTask 1.1: 将 `vite.config.js` 中 `'three/addons/': resolve(__dirname, 'libs/')` 改为正则别名 `{ find: /^three\/addons\//, replacement: resolve(__dirname, 'libs/') + '/' }`，使 `three/addons/loaders/GLTFLoader.js` 正确解析为 `libs/loaders/GLTFLoader.js`

- [ ] Task 2: 移除 index.html 中的 importmap（High）
  - [ ] SubTask 2.1: 删除 index.html 中 `<script type="importmap">` 整个块（约 L11-L19），因为 Vite 有自己的模块解析系统，importmap 与 Vite alias 冲突

- [ ] Task 3: 修复 VRMRenderer 初始化阻塞页面渲染（High）
  - [ ] SubTask 3.1: 将 index.html `<head>` 中的 `<script type="module">` 块（约 L37-L40，含 `await initVRMModule()`）移到 `</body>` 前，改为非阻塞方式：不使用 `await`，改为 `initVRMModule().catch(...)` 让其在后台异步加载
  - [ ] SubTask 3.2: 确保 VRMRenderer 的 `loadDependencies()` 失败时不会抛出未捕获异常，已有 try/catch 但需确认 `.catch()` 调用

# Task Dependencies
- [Task 1] 独立，优先执行
- [Task 2] 依赖 [Task 1]（移除 importmap 前需要确保 Vite alias 能覆盖所有模块路径）
- [Task 3] 独立，可与 Task 1 并行
