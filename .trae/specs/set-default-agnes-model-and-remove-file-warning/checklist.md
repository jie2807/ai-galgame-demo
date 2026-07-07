# Checklist

## Task 1: 官方免费 Agnes 模型默认配置初始化
- [x] 在 L9289 起的 IIFE 内、`getEffectiveTextModelConfig` 定义之后，存在默认配置初始化逻辑
- [x] 初始化逻辑读取 `game_api_base`/`game_api_key`/`game_model` from sessionStorage 和 localStorage
- [x] 仅当三者均为空时才写入官方配置（条件：`!savedBase && !savedKey && !savedModel`）
- [x] `game_api_base` 同时写入 sessionStorage 和 localStorage
- [x] `game_model` 同时写入 sessionStorage 和 localStorage
- [x] `game_api_key` 仅写入 sessionStorage（不写入 localStorage）
- [x] 写入的值与 `OFFICIAL_AGNES_TEXT_CONFIG` 一一致（baseUrl/apiKey/model）
- [x] 初始化逻辑不覆盖已有自定义配置

## Task 2: 移除 file:// 警告横幅
- [x] L40603-L40619 的 `<script>` 块已完全删除
- [x] Grep 搜索 `fileProtocolWarning` 在 index.html 中无匹配
- [x] Grep 搜索 `检测到通过 file:// 协议打开` 在 index.html 中无匹配
- [x] 删除后 `</body>` 和 `</html>` 标签保持完整

## 端到端验证
- [x] `getEffectiveTextModelConfig` 的 fallback 逻辑保持不变（仍保留 OFFICIAL_AGNES_TEXT_CONFIG 作为最终 fallback）
- [x] `sendMessage` 函数未被修改
- [x] `sendUserMessage` 函数未被修改
- [x] L16759-L16765 的 pre-check（`if (!savedBaseUrl)`）保持不变——由于默认配置已写入 storage，该检查不会触发
- [x] `OFFICIAL_AGNES_TEXT_CONFIG` 定义（L9292-L9296）保持不变
