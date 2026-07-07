# Checklist

- [x] `CustomScriptGenerator.run` 中，当 `baseUrl` 包含 `agnes-ai.com` 时，请求体不包含 `response_format` 字段
- [x] `CustomScriptGenerator.run` 中，当 `baseUrl` 不属于 Agnes 时，请求体仍包含 `response_format: { type: 'json_object' }`，行为与原先一致
- [x] `callAPI` 的 400 错误分支提示文案包含 Agnes 相关说明
- [x] 公告邮件 `announcement_beta_202506_v3` 的 body 包含新增段落，含三点要点：官方模型可能排队、邀请尝试自定义大模型、Agnes 全球免费可自助接入
- [x] 新增段落文案语气与原公告一致，经过润色
- [x] 邮件 body 字符串仍为合法 JS 字符串（无未转义引号/换行破坏语法）
- [x] 未误改其它 API 调用点（sendAction、sendMessage、模型测试、生图、Creator Wars 等）
- [x] `extractJSON` 仍能从 Agnes 自然输出（无 JSON 模式）的文本中提取 JSON
- [x] advanced → medium → basic 自动降级逻辑未被破坏
