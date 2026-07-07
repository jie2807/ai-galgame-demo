# Tasks

> 复用末日方舟已验证的方案（`scripts/generate-doomsday-assets/` 同款脚本结构），快速为修仙剧本生成 15 张立绘 + 12 张场景图。立绘与场景图互不依赖，可并行推进。

## 阶段一：NPC 透明立绘（15 张）

- [x] Task 1: 创建脚本目录 `scripts/generate-cultivation-assets/` 并复用末日方舟的 gen_portraits.py / matting.py 逻辑
- [x] Task 2: 撰写 15 个 NPC 的英文生图 prompt，汇总到 `scripts/generate-cultivation-assets/prompts.json`
- [x] Task 3: 执行批量生图脚本，生成 15 张绿幕原图到 `scripts/generate-cultivation-assets/raw_green/`
  - 15 张全部生成成功，每张 5.8-7.3MB（2048×3072 PNG）
- [x] Task 4: 批量抠图，输出 15 张透明立绘到 `images/portraits/cultivation/`
  - 15 张全部输出，透明占比 58-74%，单张 29-52KB，512×768
  - 抽查 5+ 张：边缘无绿边、人物完整、风格统一
- [x] Task 5: 更新 `data/npc-live2d-models.js`，新增 15 个修仙 NPC 立绘映射
  - `node --check data/npc-live2d-models.js` 通过

## 阶段二：场景背景图（12 张）

- [x] Task 6: 撰写 12 个场景地点的英文生图 prompt，汇总到 `scripts/generate-cultivation-assets/scene_prompts.json`
- [x] Task 7: 复制并修改 `gen_scenes.py`，执行批量生成 12 张场景图到 `images/scenes/cultivation/`
  - 12 张全部生成成功，单张 320-519KB，1536×640

## 阶段三：接入游戏页背景显示

- [x] Task 8: 修改 `index.html` 两处场景背景注入条件，扩展支持修仙剧本（chapterId === 4）
  - L16556 和 L16679 两处均修改
  - 注入逻辑根据 chapterId 选择 `doomsday/` 或 `cultivation/` 子目录

## 阶段四：端到端验证

- [x] Task 9: Playwright 端到端验证立绘和场景图显示
  - 启动本地 HTTP 服务，用 Playwright 进入修仙剧本（chapter 4）
  - 验证：与苏婉清/林月瑶等 NPC 对话时，对应透明立绘正确叠加在背景之上
  - 验证：背景图正确加载（tianxuan-gate.png），切换地点时背景平滑切换（sword-peak）
  - 验证：移动端 360px 立绘和背景图显示正常不溢出
  - 验证：`node --check data/npc-live2d-models.js` 语法通过
  - 验证：末日方舟剧本（chapter 1）立绘和场景图仍正常（无回归）

# Task Dependencies
- Task 3 依赖 Task 1 + Task 2
- Task 4 依赖 Task 3
- Task 5 依赖 Task 4
- Task 7 依赖 Task 1 + Task 6
- Task 8 依赖 Task 7
- Task 9 依赖 Task 5 + Task 7 + Task 8
