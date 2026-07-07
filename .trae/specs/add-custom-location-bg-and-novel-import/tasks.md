# 自定义剧本：手动地区背景图与小说导入 - 任务列表

## 任务依赖关系

- Task 1 与 Task 2 相互独立，可并行。
- Task 3 依赖 Task 2（需要在 `buildPrompt` 改造完成后才能端到端验证）。
- Task 4 依赖 Task 1 + Task 2 + Task 3。

## 任务列表

- [x] Task 1: 为 `addLocationEntry` 补齐描述文本域与背景图功能
  - **目标**: 让手动添加地区卡片与 AI 生成卡片能力对齐，能填写描述、设置背景图 URL、上传背景图文件、预览缩略图。
  - **步骤**:
    - [ ] 1.1 修改 `index.html` 中 `addLocationEntry(name, weatherWeights, bgmType, bgmUrl)` 签名为 `addLocationEntry(name, weatherWeights, bgmType, bgmUrl, opts)`，`opts = opts || {};` 解析 `opts.desc` / `opts.bgImageUrl`。
    - [ ] 1.2 在卡片 `innerHTML` 中，地区名称输入框之后、天气权重文本域之前，插入 `<textarea class="cce-textarea cce-loc-desc-input" data-field="description" rows="2" placeholder="地点描述（可选）">{escapeHtml(descVal)}</textarea>`。
    - [ ] 1.3 在 BGM 行 `</div>` 之后，插入与 `addLocationEntryWithData` 完全一致的 `.cce-loc-bg-row`（背景图 label + URL 输入 + 📁 上传按钮）与 `.cce-location-bg-thumb` 缩略图 `<img>`，使用 `bgImageUrlVal` 控制初始值与 `display`。
    - [ ] 1.4 当 `bgImageUrlVal` 非空时，`card.dataset.bgImageUrl = bgImageUrlVal;`（在 `innerHTML` 赋值之前设置）。
    - [ ] 1.5 在 BGM select/url 监听之后，复刻 `addLocationEntryWithData` 中的 `syncBgUrl(url)` 闭包：更新 `entry.dataset.bgImageUrl`、`bgThumb.src`、`bgThumb.style.display`、`bgThumb.setAttribute('data-bg-image-url', url)`；URL 为空时 `delete entry.dataset.bgImageUrl`、隐藏缩略图。
    - [ ] 1.6 为 `.cce-loc-bg-url` 输入框绑定 `input` 事件，调用 `syncBgUrl(this.value.trim())`。
    - [ ] 1.7 为 `.cce-loc-bg-upload-btn` 按钮绑定 `click` 事件：动态创建 `<input type="file" accept="image/*">`，FileReader 读取为 data URL，5MB 限制，成功后填充 URL 输入框并调用 `syncBgUrl(dataUrl)` 与 `showToast('背景图已加载: ' + file.name, 'success', '✅')`，失败显示 `showToast('图片不能超过5MB', 'error', '❌')`。
    - [ ] 1.8 验证：点击「添加地区」按钮，新卡片包含描述文本域、背景图 URL 输入、📁 按钮、缩略图占位；填写名称+描述+URL 后保存剧本，重新打开后 `getLocationEntries()` 包含 description 与 bgImageUrl；上传一张测试图片，缩略图显示，`getBgImageMap()` 包含该地区。
  - **验证**: 手动添加的地区卡片在外观与行为上与 AI 生成卡片完全一致；数据能正确保存与回填。

- [x] Task 2: 在智能生成区域添加「导入小说」UI 与文件读取逻辑
  - **目标**: 玩家可以选择 `.txt` / `.md` 小说文件，文件内容存入模块级变量供后续生成使用。
  - **步骤**:
    - [ ] 2.1 在 `index.html` 的 `cce-ai-section` 内、`#aiGenerateInput` 之后、`.cce-gen-mode-wrap` 之前，插入「导入小说」行 HTML：
      ```html
      <div class="cce-novel-import-row" id="novelImportRow" style="margin-top:6px;display:flex;gap:6px;align-items:center;flex-wrap:wrap;">
        <button class="cce-novel-upload-btn" id="novelUploadBtn" type="button" title="导入小说文件作为 AI 创作参考" style="padding:4px 10px;background:rgba(100,140,255,0.2);border:1px solid rgba(100,140,255,0.4);border-radius:4px;color:#fff;cursor:pointer;font-size:0.8rem;">📁 选择小说文件</button>
        <span class="cce-novel-info" id="novelInfo" style="font-size:0.75rem;color:rgba(255,255,255,0.65);display:none;"></span>
        <button class="cce-novel-clear-btn" id="novelClearBtn" type="button" style="display:none;padding:2px 8px;background:rgba(255,80,80,0.2);border:1px solid rgba(255,80,80,0.4);border-radius:4px;color:#fff;cursor:pointer;font-size:0.75rem;">✕ 移除</button>
      </div>
      <div class="cce-novel-preview" id="novelPreview" style="display:none;margin-top:4px;padding:6px 8px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:4px;font-size:0.72rem;color:rgba(255,255,255,0.55);max-height:80px;overflow:auto;white-space:pre-wrap;"></div>
      ```
    - [ ] 2.2 在 `CustomScriptGenerator` IIFE 内或其外部声明模块级变量 `var _importedNovelContent = '';` 与 `var _importedNovelName = '';`（与 `_autoGenBgEnabled` 同区域）。
    - [ ] 2.3 为 `#novelUploadBtn` 绑定 `click` 事件：动态创建 `<input type="file" accept=".txt,.md,text/plain,text/markdown">`，读取选中文件。
    - [ ] 2.4 在文件选择回调中校验：扩展名必须为 `.txt` 或 `.md`，否则 `showToast('目前仅支持 .txt 和 .md 格式的小说文件', 'error', '❌')` 并返回；文件大小 ≤ 5MB，否则 `showToast('小说文件不能超过5MB', 'error', '❌')` 并返回。
    - [ ] 2.5 校验通过后用 `FileReader.readAsText(file, 'UTF-8')` 读取，`onload` 中将 `event.target.result` 存入 `_importedNovelContent`，文件名（去扩展名）存入 `_importedNovelName`。
    - [ ] 2.6 更新 UI：`#novelInfo` 显示 `{原文件名} · {字数} 字`（字数 = `_importedNovelContent.length`）并 `display:inline`；`#novelClearBtn` 显示；`#novelPreview` 显示前 200 字并 `display:block`；`showToast('小说已导入: {文件名}', 'success', '📖')`。
    - [ ] 2.7 为 `#novelClearBtn` 绑定 `click` 事件：清空 `_importedNovelContent` 与 `_importedNovelName`；隐藏 `#novelInfo` / `#novelClearBtn` / `#novelPreview`；清空预览文本；`showToast('已移除小说', 'info', 'ℹ️')`。
    - [ ] 2.8 验证：选择 .txt 文件后按钮旁显示文件名与字数，预览显示前 200 字；选择 .pdf 文件被拒绝并提示；选择 6MB 文件被拒绝；点击 ✕ 移除后 UI 恢复初始状态。
  - **验证**: 文件类型/大小校验生效；导入成功后状态正确显示；移除后状态彻底清空。

- [x] Task 3: 修改 `generateCustomScript` / `CustomScriptGenerator.run` / `buildPrompt` 注入小说内容
  - **目标**: 已导入的小说内容在玩家点击「智能生成」时被正确注入 user prompt 与 system prompt。
  - **步骤**:
    - [ ] 3.1 修改 `generateCustomScript()`：在调用 `window.CustomScriptGenerator.run(desc, mode, { input, btn })` 之前，读取模块级 `_importedNovelContent` 与 `_importedNovelName`；若非空，加入 options：`{ input: input, btn: btn, novelContent: _importedNovelContent, novelName: _importedNovelName }`。
    - [ ] 3.2 修改 `CustomScriptGenerator.run(desc, mode, options)`：在调用 `this.buildPrompt(tryMode, desc, { autoGenBg, autoGenPortrait })` 时，把 `options.novelContent` 与 `options.novelName` 透传，即 `this.buildPrompt(tryMode, desc, { autoGenBg: _autoGenBgEnabled, autoGenPortrait: _autoGenPortraitEnabled, novelContent: options.novelContent, novelName: options.novelName })`。
    - [ ] 3.3 修改 `buildPrompt(mode, desc, options)`：在 `systemPrompt` 完成所有 replace 与 autoGenBg/autoGenPortrait 追加之后，若 `options.novelContent`，追加 `'\n\n额外要求：用户提供了参考小说原文，请深入提炼其世界观、人物关系、核心情节、场景氛围，生成与原作风格一致的剧本；novelReference 字段填入小说名称。'`。
    - [ ] 3.4 在 `buildPrompt` 中构造 `userContent`：若 `options.novelContent` 非空，截断至 10000 字符（超出追加 `'\n（小说内容过长，已截断，仅参考前 10000 字）'`），按分段格式拼接：
      ```js
      var truncated = options.novelContent.length > 10000
        ? options.novelContent.slice(0, 10000) + '\n（小说内容过长，已截断，仅参考前 10000 字）'
        : options.novelContent;
      var actualLen = options.novelContent.length > 10000 ? 10000 : options.novelContent.length;
      var userContent = '【参考小说】《' + (options.novelName || '未命名') + '》（节选，约 ' + actualLen + ' 字）\n' + truncated + '\n\n【用户要求】\n' + (desc && desc.trim() ? desc.trim() : '请基于以上小说内容创作角色扮演剧本');
      ```
      否则 `userContent = desc`（保持原行为）。
    - [ ] 3.5 `buildPrompt` 返回值中 `userContent` 用上述变量替换原来的 `desc`。
    - [ ] 3.6 验证（控制台）：构造一段假小说文本，调用 `CustomScriptGenerator.buildPrompt('basic', '加入赛博朋克元素', { novelContent: '...' , novelName: '测试小说' })`，检查 `systemPrompt` 末尾包含小说研究指令，`userContent` 以「【参考小说】《测试小说》」开头、以「【用户要求】\n加入赛博朋克元素」结尾。
    - [ ] 3.7 验证（截断）：传入 12000 字字符的 `novelContent`，检查 `userContent` 中包含截断提示且 `actualLen` 显示 10000。
    - [ ] 3.8 验证（无小说）：调用 `buildPrompt('basic', '描述', {})`，`userContent === '描述'`，`systemPrompt` 不含小说研究指令。
  - **验证**: 三种场景（有小说+有描述、有小说+无描述、无小说）的 prompt 构造均符合 spec；截断逻辑正确。

- [x] Task 4: 端到端回归测试与修复
  - **目标**: 确保两个新功能与现有自定义剧本编辑器、AI 生成、剧本保存/加载、游戏内背景渲染都正常协作。
  - **步骤**:
    - [ ] 4.1 测试手动添加地区：点击「添加地区」→ 填名称/描述/天气权重/BGM/背景图 URL → 保存剧本 → 重新打开编辑器，所有字段正确回填；进入游戏，该地区背景图正确显示。
    - [ ] 4.2 测试手动添加地区文件上传：上传一张 1MB 图片 → 缩略图显示 → 保存 → 重新打开 → 缩略图与 URL 输入框均正确显示 data URL；进入游戏，背景图显示。
    - [ ] 4.3 测试 AI 生成路径未被破坏：清空小说，输入描述，点击「智能生成」（用 mock 或真实 API），生成结果正常填入编辑器，AI 生成的地区卡片仍包含背景图行。
    - [ ] 4.4 测试小说导入+生成：导入一个 `.txt` 小说 → 不输入描述 → 点击「智能生成」→ 检查网络请求 body 中 `messages[0].content`（system）末尾包含小说研究指令，`messages[1].content`（user）以「【参考小说】」开头。
    - [ ] 4.5 测试小说+描述：导入小说 + 输入描述 → 生成 → user prompt 同时包含小说节选与「【用户要求】」段。
    - [ ] 4.6 测试小说移除后生成：点击 ✕ 移除 → 生成 → user prompt 不含小说，system prompt 不含小说研究指令。
    - [ ] 4.7 测试剧本保存/加载/导出/导入：含背景图的手动地区在保存、加载、导出 JSON、导入 JSON 后数据完整。
    - [ ] 4.8 修复上述测试中发现的 regression。
  - **验证**: 全部场景通过，无严重 regression；手动地区与 AI 地区在游戏内背景渲染一致。

# Task Dependencies

- Task 1 与 Task 2 独立，可并行。
- Task 3 依赖 Task 2（依赖模块级变量 `_importedNovelContent` / `_importedNovelName` 的声明）。
- Task 4 依赖 Task 1 + Task 2 + Task 3。

# Parallelizable Work

- Task 1（地区卡片改造）与 Task 2（小说导入 UI）作用于不同代码区域，可由不同 Sub-Agent 并行实现。
- Task 3 必须在 Task 2 完成后进行。
