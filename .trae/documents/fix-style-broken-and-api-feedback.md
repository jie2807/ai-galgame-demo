# 修复样式破坏 + 官方 API 反馈问题

## Summary

用户反馈两个问题：
1. **样式被破坏了** — 全站样式崩溃
2. **官方 API 连接不上** — 智能生成无反馈

经 Phase 1 探索确认根因：
- **致命问题**：`styles.css` 开头有 **6 个 UTF-8 BOM 字符**（`EF BB BF` × 6 = 18 字节），导致前 3 条 `@import` 语句全部解析失败，`variables.css` / `reset.css` / `animations.css` 不加载，所有 `var(--*)` CSS 自定义属性未定义，全站颜色/字体/间距/玻璃效果失效。
- **回归问题**：阶段四实施的 5 个 Change（修复智能生成无反馈）**全部被回滚**，进度条 4 处 DOM ID 引用错误，导致用户看不到任何生成进度，误判为"API 连接不上"。
- **API 服务器实际正常**：HTTP 200、CORS 正确、Key 有效、响应 ~9 秒。"连接不上"是表象，真正原因是样式崩溃 + 进度条 ID 错误导致无反馈。

## Current State Analysis

### 问题 1：styles.css BOM 字符（致命）

文件 `d:\BC\ai_resume\qmzz\styles.css` 字节验证：
```
First 30 bytes: EF BB BF EF BB BF EF BB BF EF BB BF EF BB BF EF BB BF 40 69 6D 70 6F 72 74 20 27 2E 2F 73
BOM count: 6
```

前 3 行内容：
```css
@import './styles/variables.css';   ← 行首有 6 个 BOM，浏览器无法解析
@import './styles/reset.css';
@import './styles/animations.css';
```

CSS 规范要求 `@import` 必须出现在样式表开头，任何多余字符（包括 BOM）会导致解析失败。

### 问题 2：阶段四修复全部被回滚

`index.html` 中 5 个进度反馈函数（第 23483-23556 行）的状态：

| 函数 | 行号 | 当前状态 | 应为 |
|------|------|----------|------|
| `showGenProgress` | 23484 | `getElementById('genProgressBar')` | `getElementById('genProgressWrap')` |
| `showGenProgress` | 23486 | `display = 'block'` | `display = ''` |
| `showGenProgress` | 23495 | `.gen-progress-fill` | `.cce-gen-progress-fill` |
| `updateGenProgress` | 23513 | `getElementById('genProgressBar')` | `getElementById('genProgressWrap')` |
| `updateGenProgress` | 23515 | `.gen-progress-fill` | `.cce-gen-progress-fill` |
| `completeGenProgress` | 23526 | `getElementById('genProgressBar')` | `getElementById('genProgressWrap')` |
| `completeGenProgress` | 23528 | `.gen-progress-fill` | `.cce-gen-progress-fill` |
| `hideGenProgress` | 23538 | `getElementById('genProgressBar')` | `getElementById('genProgressWrap')` |

HTML 中进度条实际结构（第 8398-8404 行）：
```html
<div class="cce-gen-progress-wrap" id="genProgressWrap" style="display:none">
    <div class="cce-gen-progress-bar">
        <div class="cce-gen-progress-fill" id="genProgressFill"></div>
        <div class="cce-gen-progress-shimmer"></div>
    </div>
    <div class="cce-gen-progress-text" id="genProgressText">正在连接 API...</div>
</div>
```

进度条样式定义在 `d:\BC\ai_resume\qmzz\pages\custom-chapter\custom-chapter.css` 第 341-411 行，类名前缀为 `cce-gen-progress-*`。

### 问题 3：buildPrompt 缺少 PROMPTS 防御

`index.html` 第 23690-23691 行：
```javascript
var modeCfg = this.MODES[mode] || this.MODES.basic;
var promptCfg = this.PROMPTS[mode] || this.PROMPTS.basic;  ← 若 this.PROMPTS 为 undefined 会抛 TypeError
```

第 23686 行 `PROMPTS: window.CUSTOM_SCRIPT_PROMPTS`，若 `CUSTOM_SCRIPT_PROMPTS` 未定义会导致整个生成流程崩溃。

### 问题 4：按钮缺少 loading 文字反馈

`run` 方法第 23882-23884 行只设置了 `disabled`，没有改变按钮文字：
```javascript
btn.disabled = true;
input.disabled = true;
showInfoToast('AI 开始生成剧本，请稍候…');
```

第 23947 行恢复时按钮 HTML 是 `</svg> 智能生成`，缺少"生成中…"状态反馈。

## Proposed Changes

### Change 1：删除 styles.css 开头所有 BOM 字符（致命修复）

- **文件**：`d:\BC\ai_resume\qmzz\styles.css`
- **操作**：用 Python 二进制模式读取整个文件，剥离开头所有 `EF BB BF` 序列（保留 0 个 BOM），写回原文件
- **验证命令**：
  ```python
  data = open('styles.css','rb').read()
  while data.startswith(b'\xef\xbb\xbf'):
      data = data[3:]
  open('styles.css','wb').write(data)
  ```
- **原因**：BOM 字符导致 `@import` 失败，全站样式崩溃

### Change 2：重新修复 genProgressBar → genProgressWrap（4 处）

- **文件**：`d:\BC\ai_resume\qmzz\index.html`
- **行号**：23484, 23513, 23526, 23538
- **操作**：使用 `replace_all` 将 `getElementById('genProgressBar')` 替换为 `getElementById('genProgressWrap')`
- **原因**：HTML 实际 ID 是 `genProgressWrap`，引用错误 ID 导致 `getElementById` 返回 null，进度条不显示

### Change 3：修复进度条 fill 选择器（3 处）

- **文件**：`d:\BC\ai_resume\qmzz\index.html`
- **行号**：23495, 23515, 23528
- **当前**：`progressEl.querySelector('.gen-progress-fill') || progressEl.querySelector('[class*="fill"]')`
- **改为**：`progressEl.querySelector('.cce-gen-progress-fill') || progressEl.querySelector('[class*="fill"]')`
- **原因**：CSS 实际类名是 `cce-gen-progress-fill`，虽然 fallback 能工作但主选择器应正确
- **操作**：使用 `replace_all` 将 `.querySelector('.gen-progress-fill')` 替换为 `.querySelector('.cce-gen-progress-fill')`

### Change 4：修复 display 设置

- **文件**：`d:\BC\ai_resume\qmzz\index.html`
- **行号**：23486
- **当前**：`if (progressEl) progressEl.style.display = 'block';`
- **改为**：`if (progressEl) progressEl.style.display = '';`
- **原因**：让 CSS 控制显示（`.cce-gen-progress-wrap` 无 display 样式，div 默认 block），更优雅，避免覆盖未来可能的 flex/grid 布局

### Change 5：buildPrompt 加 PROMPTS 防御

- **文件**：`d:\BC\ai_resume\qmzz\index.html`
- **行号**：23690-23691
- **当前**：
  ```javascript
  var modeCfg = this.MODES[mode] || this.MODES.basic;
  var promptCfg = this.PROMPTS[mode] || this.PROMPTS.basic;
  ```
- **改为**：
  ```javascript
  var modeCfg = this.MODES[mode] || this.MODES.basic;
  if (!this.PROMPTS) {
      throw new Error('剧本提示词模板未加载');
  }
  var promptCfg = this.PROMPTS[mode] || this.PROMPTS.basic;
  ```
- **原因**：若 `window.CUSTOM_SCRIPT_PROMPTS` 未定义，原代码会抛出难以定位的 TypeError；显式检查给出清晰错误信息

### Change 6：按钮添加 loading 文字反馈

- **文件**：`d:\BC\ai_resume\qmzz\index.html`
- **位置 A（设置 loading）**：第 23882-23884 行
  - **当前**：
    ```javascript
    btn.disabled = true;
    input.disabled = true;
    showInfoToast('AI 开始生成剧本，请稍候…');
    ```
  - **改为**：
    ```javascript
    btn.disabled = true;
    input.disabled = true;
    btn.dataset.originalHtml = btn.innerHTML;
    btn.innerHTML = '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" style="animation:spin 1s linear infinite;"><path d="M12 2A10 10 0 1 0 22 12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg> 生成中…';
    showInfoToast('AI 开始生成剧本，请稍候…');
    ```
- **位置 B（恢复按钮）**：第 23945-23947 行
  - **当前**：
    ```javascript
    btn.disabled = false;
    input.disabled = false;
    btn.innerHTML = '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em"><path d="M12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2Z" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg> 智能生成';
    ```
  - **改为**：
    ```javascript
    btn.disabled = false;
    input.disabled = false;
    btn.innerHTML = btn.dataset.originalHtml || '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em"><path d="M12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2Z" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg> 智能生成';
    ```
- **原因**：增强用户反馈，让用户明确看到"生成中"状态，避免误判为"卡死"或"连接不上"

## Assumptions & Decisions

1. **假设**：`pages/custom-chapter/custom-chapter.css` 通过 HTML `<link>` 标签加载（不受 styles.css BOM 影响），所以进度条样式本身存在。需在实施时确认。
2. **决策**：删除所有 BOM（保留 0 个），而非保留 1 个。UTF-8 规范不推荐使用 BOM，且 CSS/JS 文件 BOM 会导致各种解析问题。
3. **决策**：Change 3 保留 fallback `[class*="fill"]`，作为防御性编程。
4. **决策**：Change 6 使用 `btn.dataset.originalHtml` 保存原始 HTML，避免硬编码恢复内容。但需在 `@keyframes spin` 已存在的前提下工作（搜索确认）。

## Verification Steps

1. **BOM 验证**：
   ```python
   data = open('styles.css','rb').read()[:10]
   assert not data.startswith(b'\xef\xbb\xbf'), 'BOM 仍存在'
   ```

2. **ID 修正验证**：
   - Grep `genProgressBar` 应返回 0 结果
   - Grep `genProgressWrap` 应返回 4+ 结果

3. **Playwright 浏览器验证**：
   - 导航到 `http://localhost:3000`（或实际服务地址）
   - 截图首页，确认样式恢复正常（颜色、字体、玻璃效果）
   - 进入自定义剧本编辑器
   - 点击"智能生成"按钮
   - 确认按钮显示"生成中…"+ 旋转图标
   - 确认进度条显示并动态增长
   - 确认进度文字更新（"连接 API 中…" → "AI 生成剧本中…"）
   - 等待生成完成，确认进度条达到 100% 并隐藏
   - 确认剧本内容填入编辑器

4. **控制台日志验证**：
   - 无 CSS 404 错误
   - 无 `genProgressBar` 相关 null 引用错误
   - 无 `this.PROMPTS` 相关 TypeError
