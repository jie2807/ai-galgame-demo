# Tasks
- [x] Task 1: 移除 SimpleChatEngine 请求体中的 max_tokens 和 temperature 硬编码字段
  - [x] SubTask 1.1: 修改 `sendMessage` 中的请求体构造，改为条件式添加 max_tokens/temperature（仅当 settings 显式提供时才加入）
  - [x] SubTask 1.2: 验证默认配置下请求体只包含 `{ model, messages, stream: true }`

# Task Dependencies
- 无外部依赖，单文件修改
