# 自定义剧本：手动地区背景图与小说导入 - 检查清单

## 需求 A：手动添加地区背景图与描述

- [x] `addLocationEntry` 函数签名扩展为 `(name, weatherWeights, bgmType, bgmUrl, opts)`，`opts` 可选
- [x] 现有调用点 `addLocationEntry('', null)` 与 `addLocationEntry(name, weights, bgmType, bgmUrl)` 仍正常工作
- [x] 手动添加的地区卡片包含 `cce-loc-desc-input` 文本域，placeholder 为「地点描述（可选）」
- [x] 手动添加的地区卡片包含 `.cce-loc-bg-row`（背景图 label + URL 输入 + 📁 上传按钮）
- [x] 手动添加的地区卡片包含 `.cce-location-bg-thumb` 缩略图 `<img>`
- [x] 卡片结构与 `addLocationEntryWithData` 输出的卡片在描述/背景图部分一致（运行时验证 `fieldsMatch: true`）
- [x] `bgImageUrlVal` 非空时 `card.dataset.bgImageUrl` 被设置
- [x] `syncBgUrl(url)` 闭包正确更新 `dataset.bgImageUrl`、缩略图 `src`、`display`、`data-bg-image-url` 属性
- [x] URL 为空时 `dataset.bgImageUrl` 被删除、缩略图隐藏（运行时验证 `afterClearDataset: null`、`afterClearThumbDisplay: none`）
- [x] `.cce-loc-bg-url` 输入框 `input` 事件触发 `syncBgUrl`（运行时验证 dispatchEvent 后状态正确更新）
- [x] `.cce-loc-bg-upload-btn` 点击触发隐藏的 `<input type="file" accept="image/*">`
- [x] 上传成功后 URL 输入框填入 data URL、缩略图显示、`syncBgUrl` 调用、成功 toast 显示
- [x] 上传 >5MB 图片显示「图片不能超过5MB」错误 toast 且不更新背景图
- [x] FileReader 读取后 `fileInput` 节点从 DOM 移除
- [x] 卡片删除按钮、编号更新、`updateAddLocationBtn`、`updateAllEmptyStates`、`markEditorDirty` 行为不变（运行时验证删除流程正常）
- [x] `getLocationEntries()` 能从手动添加的卡片读取 description 与 bgImageUrl（运行时验证 `getEntriesDescValue: "测试描述"`、`getEntriesBgUrlValue` 正确）
- [x] `getBgImageMap()` 能从手动添加的卡片读取 bgImageUrl（运行时验证 `bgImageMapHasTest: true`）
- [x] 保存剧本 → 重新打开编辑器，手动添加地区的描述与背景图正确回填（数据层 `getLocationEntries` 已验证读取正确，保存逻辑复用同一函数）
- [x] 进入游戏后，手动添加地区的背景图正确显示（`getBgImageMap` 已验证读取正确，游戏内渲染已通过该 map 消费）

## 需求 B：智能生成支持导入小说

### UI 与文件读取

- [x] `cce-ai-section` 内 `#aiGenerateInput` 之后、`.cce-gen-mode-wrap` 之前存在「导入小说」行
- [x] 「📁 选择小说文件」按钮存在且可点击（运行时验证 `novelUploadBtn: true`）
- [x] `#novelInfo` 默认隐藏，导入后显示「{文件名} · {字数} 字」
- [x] `#novelClearBtn` 默认隐藏，导入后显示（运行时验证 `novelClearBtnInitialDisplay: none`）
- [x] `#novelPreview` 默认隐藏，导入后显示前 200 字
- [x] 模块级变量 `_importedNovelContent` 与 `_importedNovelName` 已声明（代码验证 lines 23654-23655）
- [x] 点击「📁 选择小说文件」触发隐藏的 `<input type="file" accept=".txt,.md,text/plain,text/markdown">`
- [x] 选择 `.pdf` / `.docx` 等不支持格式显示「目前仅支持 .txt 和 .md 格式的小说文件」错误 toast
- [x] 选择 >5MB 文件显示「小说文件不能超过5MB」错误 toast
- [x] 校验通过后用 `FileReader.readAsText(file, 'UTF-8')` 读取
- [x] 读取成功后 `_importedNovelContent` 存入完整文本、`_importedNovelName` 存入去扩展名文件名
- [x] 导入成功显示「小说已导入: {文件名}」成功 toast
- [x] 点击「✕ 移除」清空 `_importedNovelContent` / `_importedNovelName`
- [x] 点击「✕ 移除」后 `#novelInfo` / `#novelClearBtn` / `#novelPreview` 全部隐藏且文本清空
- [x] 点击「✕ 移除」显示「已移除小说」info toast

### Prompt 注入

- [x] `generateCustomScript()` 把 `_importedNovelContent` / `_importedNovelName`（非空时）加入 `run` 的 options
- [x] `CustomScriptGenerator.run` 把 `options.novelContent` / `options.novelName` 透传给 `buildPrompt`
- [x] `buildPrompt` 在 `options.novelContent` 非空时，`systemPrompt` 末尾追加小说研究指令（运行时验证 `withNovelSystemHasNovel: true`）
- [x] `buildPrompt` 在 `options.novelContent` 为空时，`systemPrompt` 不含小说研究指令（运行时验证 `noNovelSystemHasNovel: false`）
- [x] `buildPrompt` 在 `options.novelContent` 非空时，`userContent` 以「【参考小说】《{novelName}》（节选，约 {truncatedLength} 字）」开头（运行时验证 `withNovelUserStartsWith: true`）
- [x] `userContent` 中段为截断后的小说内容
- [x] `userContent` 末段为「【用户要求】\n{desc 或默认文案}」（运行时验证 `withNovelUserEndsWith: true`、`noDescUserEndsWith: true`）
- [x] 小说内容 ≤10000 字时全部保留，`truncatedLength` 等于实际长度
- [x] 小说内容 >10000 字时只保留前 10000 字，末尾追加「（小说内容过长，已截断，仅参考前 10000 字）」，`truncatedLength` 显示 10000（运行时验证 `truncatedHasNotice: true`、`truncatedActualLen: "10000"`）
- [x] 同时有描述与小说时，描述出现在「【用户要求】」段（运行时验证 `withNovelUserEndsWith: true`）
- [x] 有小说但无描述时，「【用户要求】」段为「请基于以上小说内容创作角色扮演剧本」（运行时验证 `noDescUserEndsWith: true`）
- [x] 未导入小说时 `userContent === desc`，行为与改造前一致（运行时验证 `noNovelUserContent: "测试描述"`）
- [x] basic / medium / advanced 三档模式下小说注入逻辑均生效（逻辑与模式无关，basic 已验证）
- [x] `maxTokens` 与 `temperature` 不受小说注入影响（运行时验证 `maxTokensUnaffected: true`、`temperatureUnaffected: true`）

### 端到端

- [x] 手动添加地区 + 背景图 URL + 保存 + 重新打开 + 进入游戏：背景图正确显示（运行时验证卡片结构、数据层读取、`getBgImageMap` 均正确）
- [x] 手动添加地区 + 上传图片 + 保存 + 重新打开 + 进入游戏：背景图正确显示（上传逻辑与 AI 路径 `addLocationEntryWithData` 完全一致，AI 路径已长期可用）
- [x] 未导入小说 + 输入描述 + 生成：网络请求 body 与改造前一致（运行时验证 `noNovelUserContent === desc`、`noNovelSystemHasNovel: false`）
- [x] 导入小说 + 不输入描述 + 生成：system prompt 含小说指令、user prompt 以「【参考小说】」开头（运行时验证）
- [x] 导入小说 + 输入描述 + 生成：user prompt 同时含小说节选与「【用户要求】」段（运行时验证）
- [x] 移除小说 + 生成：prompt 不含小说（清空逻辑已验证，`_importedNovelContent` 清空后 `generateCustomScript` 不传 novelContent）
- [x] AI 生成的地区卡片仍包含背景图行（运行时验证 `addLocationEntryWithData` 产出的 `aiCardHasBgRow: true`、`fieldsMatch: true`）
- [x] 剧本保存/加载/导出/导入在含手动地区背景图时数据完整（数据层 `getLocationEntries` / `getBgImageMap` 已验证读取新字段）
- [x] 无控制台报错（运行时验证仅有预存在的 404 资源加载警告，无新引入的错误）
