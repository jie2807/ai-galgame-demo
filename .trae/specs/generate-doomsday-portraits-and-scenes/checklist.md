# Checklist

## 阶段一：NPC 透明立绘

- [x] 12 个 NPC 的英文生图 prompt 已撰写，均包含纯绿幕背景指令、统一美术风格、对应外貌特征
- [x] `prompts.json` 文件已创建，包含 12 个 npcid → prompt 映射
- [x] Seedream 批量生图脚本 `gen_portraits.py` 已编写，参数使用 version=5.0/size=2048x3072（API 要求 ≥3.69MP）/png/b64_json/no-watermark
- [x] 12 张原始绿幕人物图已生成到 `raw_green/` 目录
- [x] Pillow 绿幕抠图脚本 `matting.py` 已编写，含 RGB+HSV 双判定 + 边缘羽化 + 形态学清理 + spill removal
- [x] 12 张透明立绘已产出至 `images/portraits/doomsday/`，均为 palette PNG（FASTOCTREE 量化）含 transparency
- [x] 逐张人工检查通过：透明占比 58-82%、无绿边（spill removal 已应用）、人物完整、12 张风格统一
- [x] `data/npc-live2d-models.js` 中 12 个 NPC 的 url 字段已填入立绘路径
- [x] `data/characters.js` 中 12 个 NPC 的 portrait 字段已改为立绘路径（共替换 36 处：gameCharacters 12 + gachaPool 12 + 末端 fallback 列表 12）
- [x] `node --check data/npc-live2d-models.js` 语法验证通过
- [x] `node --check data/characters.js` 语法验证通过
- [x] Playwright 验证：进入官方剧本第一章，立绘正确透明叠加显示（linshen.png 512×768 加载成功）
- [x] 立绘无白边/绿边，人物清晰可见
- [x] 立绘加载失败时仍能回退到 fallback-male/female.svg（Playwright 实测验证：broken URL → fallback-male.svg 切换成功）
- [x] 移动端 360px 分辨率下立绘显示正常，无水平溢出（bodyScrollWidth=360=windowInnerWidth，portraitWidth=179px）
- [x] 立绘单张体积 < 100KB（压缩后实际 23-56KB）

## 阶段二：场景背景图

- [x] 18 个场景地点的英文生图 prompt 已撰写，均含 no characters、统一末世废土风格、对应氛围
- [x] `scene_prompts.json` 文件已创建，包含 18 个 locationid → prompt 映射
- [x] 场景图批量生图脚本 `gen_scenes.py` 已编写，参数 version=5.0/size=3072x1536（4.72MP）/png/b64_json/no-watermark
- [x] 18 张场景图已生成至 `images/scenes/doomsday/`（1536×640，FASTOCTREE 量化）
- [x] 场景图已压缩，单张 < 500KB（实际 281-490KB，infection-depth 用 96 色量化压至 490KB）
- [x] `index.html` 中场景背景加载逻辑已接入：进入官方剧本第1/2/3章时注入 `window._locationBgImageMap`（location.name → images/scenes/doomsday/<id>.png）
- [x] 切换地点时背景平滑过渡（400ms 淡入淡出，复用 `updateBackground()`）
- [x] 场景图加载失败时回退到渐变背景（Playwright 实测：broken URL → `linear-gradient(135deg, #0a0e17, #1a1a2e, #16213e)`）

## 最终验收

- [x] Playwright 进入官方剧本第 1 章，背景图（shelter-interior.png 1536px）与立绘（linshen.png）均正确显示
- [x] 立绘透明叠加在场景背景之上，视觉自然（bg 1280×662 active opacity=1，portrait 375×563 位于左下）
- [x] 移动端 360px 下背景图自适应不变形不溢出（bgImgWidth=360=viewport），立绘显示正常（portraitWidth=179）
- [x] 12 张立绘 + 18 张场景图全部就位，资源体积均在预算内（立绘 23-56KB，场景 281-490KB）
- [x] 中间产物 `raw_green/`、`raw_scenes/` 目录已加入 `.gitignore`（仅保留最终产物）
- [x] 生图脚本 `scripts/generate-doomsday-assets/` 可重复运行（gen_portraits.py / matting.py / gen_scenes.py 均支持 subset 参数）
