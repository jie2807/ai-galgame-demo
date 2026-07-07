# Checklist

## 修仙剧本单章结构验证
- [x] `data/game-chapters.js` 仅含 4 个章节对象（id 1/2/3/4），无 id=5/id=6
- [x] id=4 标题为「修仙：乱编的 · 觉醒篇」
- [x] `node --check data/game-chapters.js` 通过

## 游戏页面滚动验证
- [x] 游戏页面内容区域可上下滚动（桌面端鼠标滚轮）— `.galgame-dialogue-text` overflow-y: auto
- [x] 游戏页面内容区域可上下滚动（移动端触摸滑动）— touch-action: pan-y 已设置
- [x] 无 overflow:hidden 锁死内容区域 — `.galgame-dialogue-text` 独立滚动

## 自定义剧本智能生成验证
- [x] 点击「智能生成」按钮不抛未捕获异常
- [x] 无 API 配置时显示明确的配置错误提示（`showErrorToast('请先在模型调配中配置 API 地址')`）
- [x] 进度条按阶段（send/parse/apply）正常显示和隐藏
- [x] `showSuccessToast` 函数已定义（原为未定义导致 ReferenceError）
- [x] `normalizeGeneratedScript` 字段映射修复（title/locations/openingScene/player 字段）
- [x] 三档 prompt 均包含 openingScene 字段要求
- [x] Playwright 验证：AI 生成内容成功填入编辑器（3 NPC、2 地区、2 物品、2 事件、4 快速回覆、2 关系）

## 端到端回归验证
- [x] Playwright 验证剧本列表显示 4 个卡片（3 末日方舟 + 1 修仙：乱编的 · 觉醒篇）
- [x] Playwright 验证智能生成按钮点击后编辑器内容被填充
- [x] CSS touch-action: pan-y 已确认在 .galgame-dialogue-bar 和 .galgame-dialogue-text 上设置
