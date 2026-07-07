# Checklist

## 阶段一：NPC 透明立绘
- [x] `scripts/generate-cultivation-assets/` 目录已创建，含 gen_portraits.py / matting.py / .env
- [x] `scripts/generate-cultivation-assets/prompts.json` 含 15 个 NPC 的英文 prompt + 统一 _style_suffix（绿幕指令 + 半写实国风仙侠风格）
- [x] 每个 NPC prompt 包含：发色/眼眸/服饰/佩饰/身材/气质等外貌特征（基于 characters.js 描述）
- [x] `scripts/generate-cultivation-assets/raw_green/` 含 15 张绿幕原图（2048×3072 PNG）
- [x] `images/portraits/cultivation/` 含 15 张透明立绘（512×768 PNG，单张 20-80KB）
- [x] 抽查立绘：透明背景干净、无绿边、人物完整、风格统一（透明占比 58-74%）
- [x] `data/npc-live2d-models.js` 新增 15 个修仙 NPC 映射，`node --check` 语法通过

## 阶段二：场景背景图
- [x] `scripts/generate-cultivation-assets/scene_prompts.json` 含 12 个场景的英文 prompt + 统一 _style_suffix（无人物 + 仙侠风格）
- [x] `scripts/generate-cultivation-assets/gen_scenes.py` OUT_DIR 指向 `images/scenes/cultivation`
- [x] `images/scenes/cultivation/` 含 12 张场景背景图（1536×640 PNG，单张 200-500KB）
- [x] 抽查场景图：无人物、氛围符合描述、风格统一

## 阶段三：游戏页接入
- [x] `index.html` L16556 处场景背景注入条件已扩展为 `chapterId === 1 || 2 || 3 || 4`
- [x] `index.html` L16679 处场景背景注入条件已扩展为 `chapterId === 1 || 2 || 3 || 4`
- [x] 注入逻辑根据 chapterId 选择 `doomsday/` 或 `cultivation/` 子目录
- [x] 末日方舟剧本（chapter 1/2/3）的场景图映射未被破坏

## 阶段四：端到端验证
- [x] Playwright 进入修仙剧本（chapter 4），背景图（tianxuan-gate.png）正确加载
- [x] Playwright 与苏婉清/林月瑶等 NPC 对话，透明立绘正确叠加在背景之上
- [x] Playwright 验证立绘无白边/绿边，人物清晰（截图确认）
- [x] Playwright 切换地点时背景图平滑切换（tianxuan-gate → sword-peak 验证通过）
- [x] Playwright 移动端 360px 立绘和背景图显示正常不溢出
- [x] Playwright 验证立绘加载失败时回退到 fallback SVG
- [x] Playwright 验证场景图加载失败时回退到渐变背景
- [x] Playwright 验证末日方舟剧本（chapter 1）立绘和场景图仍正常显示（无回归）
- [x] `data/characters.js` 中 15 个 NPC 的 portrait 字段路径与实际文件路径一致（无需修改 characters.js，仅验证）
