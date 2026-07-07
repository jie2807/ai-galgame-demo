# Tasks

- [x] Task 1: 修复自定义剧本 Agnes 连接：在 `CustomScriptGenerator.run` 请求体构建处（`index.html` 约 L23769-L23788），将 `response_format: { type: 'json_object' }` 改为条件附加——仅当 `baseUrl` 不包含 `agnes-ai.com` 时才加入该字段；Agnes 路径下完全省略。
  - [x] SubTask 1.1: 在 `run` 方法内构建 `body` 前，根据 `baseUrl` 判断是否为 Agnes，生成 `var isAgnes = /agnes-ai\.com/i.test(baseUrl);`
  - [x] SubTask 1.2: 将 `response_format: { type: 'json_object' }` 从 body 字面量中拆出，改为 `...( !isAgnes ? { response_format: { type: 'json_object' } } : {})`
  - [x] SubTask 1.3: 在 `callAPI` 的 400 错误分支补充提示文案（L23589-L23592 附近），增加：「官方 Agnes 模型可能不支持部分请求参数，请稍后重试或切换自定义模型」
- [x] Task 2: 编辑公告邮件 `announcement_beta_202506_v2`（`index.html` 约 L27700-L27708），在 body 末尾「期待与你一同见证...」段之前插入润色后的新段落，包含三点：官方免费模型可能排队、邀请尝试自定义大模型、Agnes 全球免费可自助接入。邮件 ID 升级为 v3 以确保老玩家也能收到更新后的公告。
  - [x] SubTask 2.1: 撰写润色段落文本，语气与原公告一致
  - [x] SubTask 2.2: 用 Edit 工具将该段落插入 body 字符串对应位置
- [x] Task 3: 端到端验证
  - [x] SubTask 3.1: 静态检查 Task 1 改动后，Agnes 路径下 body 不含 `response_format`，其它路径仍含
  - [x] SubTask 3.2: 静态检查公告邮件 body 含新增段落且 JSON 字符串合法（无未转义引号/换行）
  - [x] SubTask 3.3: 确认未误改其它 API 调用点（sendAction、模型测试、生图等）

# Task Dependencies

- Task 1 与 Task 2 互不依赖，可并行实现。
- Task 3 依赖 Task 1 与 Task 2 完成。
