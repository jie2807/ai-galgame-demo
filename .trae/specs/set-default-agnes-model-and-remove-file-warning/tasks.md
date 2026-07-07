# Tasks

- [x] Task 1: 页面加载时显式写入官方免费 Agnes 模型默认配置
  - 在 `index.html` L9289 起的 IIFE 内，`getEffectiveTextModelConfig` 函数定义之后（约 L9304 后），新增初始化逻辑
  - 读取 storage：`var savedBase = sessionStorage.getItem('game_api_base') || localStorage.getItem('game_api_base');` 同理读取 key 和 model
  - 当三者均为空（`!savedBase && !savedKey && !savedModel`）时，将官方配置写入 storage：
    - `sessionStorage.setItem('game_api_base', official.baseUrl)`
    - `sessionStorage.setItem('game_api_key', official.apiKey)`
    - `sessionStorage.setItem('game_model', official.model)`
    - `localStorage.setItem('game_api_base', official.baseUrl)`
    - `localStorage.setItem('game_model', official.model)`（不写 key 到 localStorage）
  - 使用 `safeStorageSet` 如果可用，否则用原生 `setItem`（参考 L10230-L10235 的写法）
  - 验证：Grep 确认初始化逻辑在 IIFE 内，且条件判断正确（仅在 storage 为空时写入）

- [x] Task 2: 移除 file:// 协议警告横幅
  - 删除 `index.html` L40603-L40619 的整个 `<script>` 块（从 `<script>` 标签到 `</script>` 标签，包含 `fileProtocolWarning` 横幅的创建、插入、关闭按钮逻辑）
  - 验证：Grep 搜索 `fileProtocolWarning` 确认无残留引用

- [x] Task 3: 端到端验证
  - SubTask 3.1: 静态检查 Task 1 改动——确认初始化逻辑仅在 storage 为空时写入，不覆盖已有配置
  - SubTask 3.2: 静态检查 Task 2 改动——确认 `fileProtocolWarning` 在 index.html 中已完全移除
  - SubTask 3.3: 确认未误改其它代码（如 `getEffectiveTextModelConfig` fallback 逻辑、`sendMessage`、`sendUserMessage` 等保持不变）

# Task Dependencies

- Task 1 与 Task 2 互不依赖，可并行实现。
- Task 3 依赖 Task 1 与 Task 2 完成。
