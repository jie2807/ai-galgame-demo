# Tasks

## 阶段一：NPC 透明立绘（先行验证）

- [x] Task 1: 撰写 12 个 NPC 的英文生图 prompt
  - 基于 `data/characters.js` 中每个 NPC 的 `description`（中文外貌）改写为英文 prompt
  - 每个 prompt 必须包含：纯绿幕背景指令（`solid pure green screen background, chroma key #00FF00, no gradient, no shadow on background`）、全身立绘（`full body character portrait, standing, facing forward`）、统一美术风格（`semi-realistic anime style, post-apocalyptic theme, muted desaturated palette, detailed`）、对应性别与外貌特征
  - prompt 汇总到一个 `scripts/generate-doomsday-assets/prompts.json` 文件（npcid → prompt 映射）
  - 12 个 NPC：linshen/suqing/laozhou/xiaolu（第1章）、lie/lingshuang/alpha/mila（第2章）、yuanzhang/lin/shenfu/ada（第3章）

- [x] Task 2: 编写 Seedream 批量生图脚本
  - 路径：`scripts/generate-doomsday-assets/gen_portraits.py`
  - 读取 `prompts.json`，循环调用 `byted-seedream-image-generate` skill 的 `seedream_image_generate` 函数（导入自 skill 的 scripts 目录）
  - 参数：`version=5.0`、`size=2048x3072`（5.0 要求 ≥3.69MP）、`output_format=png`、`watermark=False`、`response_format=b64_json`（避免 URL 24 小时失效）
  - 将原始绿幕图保存到 `scripts/generate-doomsday-assets/raw_green/`（中间产物，不提交）
  - 失败重试机制（单张最多重试 3 次）

- [x] Task 3: 编写 Pillow 绿幕抠图脚本
  - 路径：`scripts/generate-doomsday-assets/matting.py`
  - 输入：`raw_green/<npcid>.png`，输出：`images/portraits/doomsday/<npcid>.png`
  - 算法：RGB + HSV 双判定绿色 mask；形态学开闭运算清理；边缘 1.3px 高斯羽化；spill removal 降绿边
  - 缩放到 512×768；FASTOCTREE 量化压缩（205KB → 38KB）

- [x] Task 4: 执行生图并抠图，产出 12 张透明立绘（已完成：12 张全部成功，透明占比 58-82%，单张 23-56KB）
  - 运行 Task 2 + Task 3 脚本，生成全部 12 张立绘到 `images/portraits/doomsday/`
  - 逐张人工检查：透明背景干净、无绿边、人物完整、风格统一
  - 不合格的单独重新生成（调整 prompt 或抠图阈值）

- [x] Task 5: 更新 `data/npc-live2d-models.js`
  - 将 12 个 NPC 的 `url` 字段从 `null` 改为 `images/portraits/doomsday/<npcid>.png`
  - 保留 `name` 字段不变

- [x] Task 6: 更新 `data/characters.js`（已完成：共替换 36 处 portrait 字段）
  - 将 12 个 NPC 的 `portrait` 字段从 `assets/portraits/fallback-*.svg` 改为 `images/portraits/doomsday/<npcid>.png`
  - 其余字段（name/title/gender/description 等）不变

- [x] Task 7: 端到端验证立绘显示（阶段一门槛，已通过）
  - 启动本地 HTTP 服务，用 Playwright 进入官方剧本第一章
  - 验证：与林深/苏晴/老周/小鹿对话时，对应透明立绘正确叠加在背景之上（linshen.png 512×768 加载成功）
  - 验证：立绘无白边/绿边，人物清晰（spill removal 已应用）
  - 验证：立绘加载失败时仍能回退到 fallback SVG（实测：broken URL → fallback-male.svg 切换成功）
  - 验证：移动端（360px）立绘显示正常不溢出（bodyScrollWidth=360=windowInnerWidth，portraitWidth=179px）
  - 通过后才进入阶段二

## 阶段二：场景背景图（立绘通过后）

- [x] Task 8: 撰写 18 个场景地点的英文生图 prompt（已完成：scene_prompts.json 含 18 个 location）
  - 基于 `data/chapter-locations.js` 中每个地点的 `description`+`atmosphere` 改写英文 prompt
  - prompt 要求：宽幅场景、无人物（`no characters, no people`）、对应氛围光照、统一末世废土风格
  - 汇总到 `scripts/generate-doomsday-assets/scene_prompts.json`（locationid → prompt）

- [x] Task 9: 编写场景图批量生图脚本并执行（已完成：18 张全部成功，单张 281-490KB）
  - 路径：`scripts/generate-doomsday-assets/gen_scenes.py`
  - 参数：`version=5.0`、`size=3072x1536`（4.72MP，满足 API ≥3.69MP）、`output_format=png`、`watermark=False`、`b64_json`
  - 生成后 Pillow 缩放到 1536x640 + FASTOCTREE 量化压缩，保存到 `images/scenes/doomsday/<locationid>.png`
  - 18 个地点：第1章 shelter-interior/shelter-perimeter/ruins-commerce/shelter-east-street/west-wall/medical-station；第2章 irontooth-hq/arsenal-perimeter/water-station/power-plant/bloodhand-outpost/infection-edge；第3章 ark-control/ark-lab/isolation-room/infection-depth/divine-punishment-temple/harbor
  - infection-depth.png 因细节复杂，用 96 色量化压至 490KB（< 500KB）

- [x] Task 10: 接入场景图到对话/游戏页背景显示逻辑（已完成）
  - 在 `index.html` 中，当玩家进入官方剧本第1/2/3章时，注入 `window._locationBgImageMap`：location.name → `images/scenes/doomsday/<location.id>.png`
  - 复用现有 `updateBackground(imageUrl)` 渲染逻辑（L40243），含 400ms 淡入淡出过渡
  - 场景图加载失败时回退到渐变背景（`linear-gradient(135deg, #0a0e17, #1a1a2e, #16213e)`）
  - 两条启动路径（file 协议 L16454、非 file 协议 L16577）均已注入映射

- [x] Task 11: 端到端验证场景图+立绘叠加（最终验收，已通过）
  - Playwright 进入官方剧本第 1 章，背景图（shelter-interior.png 1536px）与立绘（linshen.png 512×768）均正确显示
  - 验证：背景图正确加载（bgImgActive=true，naturalWidth=1536），立绘透明叠加在场景之上（portrait 375×563 位于左下）
  - 验证：移动端 360px 背景图自适应不变形不溢出（bgImgWidth=360=viewport，bodyScrollWidth=360）
  - 验证：`node --check data/npc-live2d-models.js data/characters.js` 语法通过
  - 验证：资源体积合理（立绘单张 23-56KB < 100KB，场景图单张 281-490KB < 500KB）
  - 验证：场景图加载失败时回退到渐变背景（实测 broken URL → linear-gradient）
  - 验证：立绘加载失败时回退到 fallback SVG（实测 broken URL → fallback-male.svg）

## Task Dependencies
- Task 3 依赖 Task 2（需先有绿幕原图）
- Task 4 依赖 Task 2 + Task 3
- Task 5、Task 6 可并行，依赖 Task 4
- Task 7 依赖 Task 5 + Task 6（阶段一门槛，必须通过才进阶段二）
- Task 9 依赖 Task 8
- Task 10 依赖 Task 9
- Task 11 依赖 Task 7 + Task 10（最终验收）
