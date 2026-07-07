# 自定义剧本：手动地区背景图与小说导入 Spec

## Why

当前自定义剧本编辑器存在两处体验断点：

1. **手动添加地区缺少背景图与描述功能** — 玩家点击「添加地区」按钮（`addLocationEntry`）创建的卡片只有地区名称、天气权重、BGM 三项，而 AI 智能生成路径（`addLocationEntryWithData`）创建的卡片却有「地点描述」「背景图 URL」「📁 上传背景图文件」「背景图缩略图」等完整能力。两条路径产出的卡片能力不对等，手动添加的地区的背景图在游戏中只能显示默认背景。数据层 `getLocationEntries()` 与 `getBgImageMap()` 早已支持读取 `dataset.bgImageUrl` 与 `cce-loc-desc-input`，仅 UI 层缺失。

2. **智能生成无法基于小说内容创作剧本** — 当前 `CustomScriptGenerator.run(desc, mode, options)` 只接收一段简短描述作为 user prompt，玩家无法把一整本小说喂给 AI 去研究世界观、人物、情节后再产出剧本。`CUSTOM_SCRIPT_PROMPTS` 三档模板里已有 `novelReference` 字段，但缺少真正把小说原文塞进 prompt 的入口。

## What Changes

### 需求 A：手动添加地区补齐背景图与描述

- **MODIFIED** `addLocationEntry(name, weatherWeights, bgmType, bgmUrl)` 扩展为 `addLocationEntry(name, weatherWeights, bgmType, bgmUrl, opts)`，`opts.desc` / `opts.bgImageUrl` 可选；点击「添加地区」按钮的调用保持 `addLocationEntry('', null)` 不变。
- **MODIFIED** `addLocationEntry` 卡片 HTML 在天气权重文本域之前插入「地点描述」文本域（`.cce-loc-desc-input`），在 BGM 行之后插入「背景图行」（`.cce-loc-bg-row`：URL 输入 + 📁 上传按钮）与背景图缩略图（`.cce-location-bg-thumb`），结构与 `addLocationEntryWithData` 完全一致。
- **ADDED** `addLocationEntry` 内复刻 `addLocationEntryWithData` 的 `syncBgUrl(url)` 闭包与 `📁` 上传按钮 FileReader 逻辑（5MB 限制、base64 data URL、`showToast` 反馈）。
- 数据层 `getLocationEntries()` / `getBgImageMap()` 不需改动（已支持）。
- 卡片删除、编号更新、`updateAddLocationBtn`、`markEditorDirty` 等周边行为保持不变。

### 需求 B：智能生成支持导入小说

- **ADDED** 在 `cce-ai-section`（`#aiGenerateInput` 下方、模式按钮上方）新增「导入小说」行：`📁 选择小说文件` 按钮 + 文件名/字数显示 + `✕ 移除` 按钮 + 折叠的小说摘要预览。
- **ADDED** 支持文件类型：`.txt`、`.md`；编码默认 `UTF-8`（用 `FileReader.readAsText` 读取）；单文件大小上限 5MB；读取后存入模块级变量 `_importedNovelContent`（字符串）与 `_importedNovelName`（文件名）。
- **MODIFIED** `generateCustomScript()` 读取 `_importedNovelContent`，以 `{ novelContent, novelName }` 传入 `CustomScriptGenerator.run`。
- **MODIFIED** `CustomScriptGenerator.run(desc, mode, options)` 接收 `options.novelContent` / `options.novelName`，透传给 `buildPrompt`。
- **MODIFIED** `buildPrompt(mode, desc, options)` 在 `options.novelContent` 存在时，将 `userContent` 改写为分段格式：
  ```
  【参考小说】《{novelName}》（节选，约 {truncatedLength} 字）
  {truncatedNovelContent}

  【用户要求】
  {desc 或 "请基于以上小说内容创作角色扮演剧本"}
  ```
  截断策略：保留前 10000 字符，超出时追加 `\n（小说内容过长，已截断，仅参考前 10000 字）`。`systemPrompt` 末尾追加 `\n\n额外要求：用户提供了参考小说原文，请深入提炼其世界观、人物关系、核心情节、场景氛围，生成与原作风格一致的剧本；novelReference 字段填入小说名称。`
- **ADDED** 生成开始时清空 `_importedNovelContent`？— 否，保留以便用户多次生成或切换模式重试；只在用户点击「✕ 移除」或关闭编辑器时清空。

## Impact

- **受影响能力**：自定义剧本编辑器的地区卡片（手动添加路径）、AI 智能生成入口与提示词构造。
- **受影响代码**：
  - `index.html` — `addLocationEntry`（约 22179-22222 行）、`cce-ai-section` HTML（约 8371-8405 行）、`generateCustomScript`（约 23985-23992 行）、`CustomScriptGenerator.run`（约 23891-23979 行）、`buildPrompt`（约 23713-23731 行）。
  - `data/custom-script-prompts.js` — 无需改动（`novelReference` 字段已在三档模板中）。
  - CSS — 复用 `addLocationEntryWithData` 内联样式；小说导入行复用 `cce-loc-bg-row` 风格。
- **不受影响**：`addLocationEntryWithData`、`getLocationEntries`、`getBgImageMap`、剧本保存/加载/导出、游戏内背景图渲染（已通过 `bgImageMap` 消费）。

## ADDED Requirements

### Requirement: 手动添加地区卡片支持地点描述

系统 SHALL 在玩家点击「添加地区」按钮创建的卡片上提供与 AI 生成卡片一致的「地点描述」文本域。

#### Scenario: 手动添加地区后卡片包含描述输入

- **WHEN** 玩家点击「添加地区」按钮
- **THEN** 新卡片在地区名称输入框下方出现一个 `placeholder="地点描述（可选）"` 的文本域，class 包含 `cce-loc-desc-input`
- **THEN** 玩家填写描述后保存剧本，`getLocationEntries()` 返回的 entry 包含该描述

### Requirement: 手动添加地区卡片支持背景图

系统 SHALL 在手动添加的地区卡片上提供背景图 URL 输入、文件上传与缩略图预览，行为与 AI 生成卡片完全一致。

#### Scenario: 通过 URL 设置背景图

- **WHEN** 玩家在手动添加的地区卡片的背景图 URL 输入框中输入有效图片 URL
- **THEN** 卡片 `dataset.bgImageUrl` 更新为该 URL
- **THEN** 缩略图显示该图片
- **THEN** 保存剧本后 `getBgImageMap()` 返回的 map 包含该地区名 → URL 映射

#### Scenario: 通过文件上传设置背景图

- **WHEN** 玩家点击手动添加地区卡片的「📁」按钮并选择一张 ≤5MB 的图片
- **THEN** 文件被读取为 base64 data URL
- **THEN** URL 输入框填入该 data URL，缩略图显示该图片，`dataset.bgImageUrl` 更新
- **THEN** 显示「背景图已加载: {文件名}」成功 toast

#### Scenario: 超出 5MB 的图片被拒绝

- **WHEN** 玩家选择大于 5MB 的图片文件
- **THEN** 显示「图片不能超过5MB」错误 toast
- **THEN** 不更新背景图

#### Scenario: 清空背景图 URL

- **WHEN** 玩家清空背景图 URL 输入框
- **THEN** `dataset.bgImageUrl` 被删除，缩略图隐藏
- **THEN** `getBgImageMap()` 不再包含该地区

### Requirement: 智能生成支持导入小说文件

系统 SHALL 在智能生成区域提供小说文件上传入口，让玩家把小说文本作为 AI 创作的参考素材。

#### Scenario: 选择 txt/md 文件

- **WHEN** 玩家点击「📁 选择小说文件」按钮并选择一个 `.txt` 或 `.md` 文件
- **THEN** 文件以 UTF-8 文本形式读取
- **THEN** 文件名与字数显示在按钮右侧，例如「`novel.txt` · 32568 字」
- **THEN** 「✕ 移除」按钮出现
- **THEN** 折叠的预览区显示前 200 字作为摘要

#### Scenario: 超过 5MB 的文件被拒绝

- **WHEN** 玩家选择的文件大于 5MB
- **THEN** 显示「小说文件不能超过5MB」错误 toast
- **THEN** 不更新小说状态

#### Scenario: 不支持的文件类型

- **WHEN** 玩家选择的文件扩展名不是 `.txt` / `.md`（如 `.pdf` / `.docx`）
- **THEN** 显示「目前仅支持 .txt 和 .md 格式的小说文件」错误 toast
- **THEN** 不更新小说状态

#### Scenario: 移除已导入的小说

- **WHEN** 玩家点击「✕ 移除」按钮
- **THEN** 小说文件名、字数、预览全部清空
- **THEN** 「✕ 移除」按钮隐藏
- **THEN** 后续生成不再附带小说内容

### Requirement: 小说内容注入 AI 提示词

系统 SHALL 在玩家点击「智能生成」时，把已导入的小说内容截断后注入 user prompt，并在 system prompt 末尾追加小说研究指令。

#### Scenario: 已导入小说时生成

- **WHEN** 玩家已导入小说并点击「智能生成」
- **THEN** `buildPrompt` 返回的 `userContent` 形如：
  ```
  【参考小说】《{novelName}》（节选，约 {truncatedLength} 字）
  {truncatedNovelContent}

  【用户要求】
  {desc 或 "请基于以上小说内容创作角色扮演剧本"}
  ```
- **THEN** `systemPrompt` 末尾追加：「额外要求：用户提供了参考小说原文，请深入提炼其世界观、人物关系、核心情节、场景氛围，生成与原作风格一致的剧本；novelReference 字段填入小说名称。」
- **THEN** 生成结果中 `novelReference` 字段为小说文件名（去扩展名）

#### Scenario: 小说内容超过 10000 字截断

- **WHEN** 导入的小说原文长度超过 10000 字符
- **THEN** 仅保留前 10000 字符
- **THEN** 截断内容末尾追加 `\n（小说内容过长，已截断，仅参考前 10000 字）`
- **THEN** `userContent` 中的 `{truncatedLength}` 显示为 10000

#### Scenario: 未导入小说时生成

- **WHEN** 玩家未导入小说（或已移除）
- **THEN** `buildPrompt` 行为与改造前完全一致，`userContent` 即为 `desc`
- **THEN** `systemPrompt` 不追加小说相关指令

#### Scenario: 同时有描述与小说

- **WHEN** 玩家既在 `#aiGenerateInput` 输入了一段描述，又导入了小说
- **THEN** 描述作为「【用户要求】」段附加在小说节选之后
- **THEN** AI 同时参考小说原文与用户具体要求

## MODIFIED Requirements

### Requirement: `addLocationEntry` 卡片结构

原 `addLocationEntry(name, weatherWeights, bgmType, bgmUrl)` 只产出名称/天气权重/BGM 三项。改造后产出名称/描述/天气权重/BGM/背景图 URL/背景图上传/缩略图，与 `addLocationEntryWithData` 一致。

#### Scenario: 调用签名兼容

- **WHEN** 现有代码以 `addLocationEntry('', null)` 或 `addLocationEntry(name, weights, bgmType, bgmUrl)` 调用
- **THEN** 仍正常工作，`opts` 缺省时描述与背景图为空
- **THEN** 返回的卡片结构包含新增的描述文本域与背景图行（值为空）

### Requirement: `CustomScriptGenerator.run` 接受小说内容

原 `run(desc, mode, options)` 的 `options` 仅含 `input` / `btn`。改造后 `options` 新增可选字段 `novelContent`（字符串）与 `novelName`（字符串），透传给 `buildPrompt`。

#### Scenario: 未传 novelContent

- **WHEN** `options.novelContent` 为空或未提供
- **THEN** `buildPrompt` 行为与改造前一致

### Requirement: `buildPrompt` 注入小说内容

原 `buildPrompt(mode, desc, options)` 的 `userContent` 直接使用 `desc`。改造后当 `options.novelContent` 存在时，`userContent` 改写为分段格式，`systemPrompt` 追加小说研究指令。

#### Scenario: 三档模式均支持

- **WHEN** basic / medium / advanced 任一模式下传入 `novelContent`
- **THEN** 均按分段格式构造 `userContent`
- **THEN** `maxTokens` 与 `temperature` 不受影响

## REMOVED Requirements

无。
