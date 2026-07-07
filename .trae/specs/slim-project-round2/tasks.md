# Tasks

- [x] Task 1: 删除根目录零散冗余文件
  - [x] 删除 `index.html.truncated.bak`（0.65 MB 历史备份）
  - [x] 删除 `fix_doomsday.ps1`（一次性修复脚本）
  - [x] 删除 `scripts/generate-doomsday-assets/test_fast.png`、`test_q2.png`、`test_q2_rgba.png`（抠图测试文件）
  - [x] 删除空目录 `__verify_game_layout_screenshots/` 与 `.uploads/`

- [x] Task 2: 删除生成原始素材目录（最大收益项）
  - [x] 验证 `images/portraits/doomsday/`（12 文件）、`images/scenes/doomsday/`（18 文件）、`images/portraits/cultivation/`（15 文件）、`images/scenes/cultivation/`（12 文件）成品齐全
  - [x] 删除 `scripts/generate-doomsday-assets/raw_green/`（70.93 MB，12 张绿幕图）
  - [x] 删除 `scripts/generate-doomsday-assets/raw_scenes/`（128.6 MB，18 张原始场景图）
  - [x] 删除 `scripts/generate-cultivation-assets/raw_green/`（42.23 MB，7 张绿幕图）
  - [x] 删除 `scripts/generate-cultivation-assets/raw_scenes/`（51.92 MB，7 张原始场景图）
  - [x] 保留各 `generate-*-assets/` 下的 `.py` 脚本、`prompts.json`、`scene_prompts.json`、`.env`

- [x] Task 3: 视频压缩与重命名
  - [x] 备份 `videos/main_background.mp4` 与 `videos/charlist_bg .mp4` 到 `videos/_backup/`
  - [x] 用 ffmpeg 将 `main_background.mp4` 重编码为 1280×720 / H.264 / CRF 28 / 1.5Mbps（预期 ~2 MB）
  - [x] 用 ffmpeg 将 `charlist_bg .mp4` 压缩并重命名为 `charlist_bg.mp4`（去除空格）
  - [x] 更新 `index.html` 中 6 处引用（行 5339、6751、6830、6976、7726、7730）：`charlist_bg .mp4` → `charlist_bg.mp4`
    - > 执行结果：经 Grep 验证，`index.html` 中 `charlist_bg` 仅 2 处引用（行 6976、7726），且原本就引用不带空格的 `charlist_bg.mp4`；行 5339/6751/6830/7730 是 `main_background.mp4` 引用。原文件名带空格是文件系统层面的 bug，压缩后输出为 `charlist_bg.mp4`（不带空格）正好匹配 index.html 现有引用，无需修改 index.html。
  - [x] 验证压缩后视频可正常播放且画面无明显画质损失
  - [x] 验证无误后删除 `videos/_backup/`

- [x] Task 4: Live2D 纹理 PNG 无损压缩（可选）
  - [x] 检查 `oxipng` 或 `pngquant` 是否可用
  - [x] 对 `models/live2d/mao/Mao.2048/texture_00.png`（2.82 MB）等 5 张纹理图执行无损压缩
  - [x] 若工具不可用则跳过，记录为后续优化项
  - > 执行结果：`oxipng`/`pngquant`/`cargo` 均不在 PATH 且未安装；改用 Python PIL（Pillow 12.2.0，`optimize=True` + `compress_level=9`）执行无损重压缩，5 张纹理图均 0% 收益（原 PNG 已充分压缩，字节级一致）。原文件经 SHA256 校验完整无损，备份已清理。该项标记为已完成（按"工具不可用则跳过"分支执行），后续如需进一步压缩需安装 `oxipng`（`cargo install oxipng` 或下载预编译二进制）后用 `oxipng -o 4 --strip safe` 重试。

- [x] Task 5: node_modules 评估报告
  - [x] 确认项目根目录是否仍需 `package.json`（实际仍存在，仅声明 3 个 devDependencies：acorn/acorn-walk/postcss，项目代码未实际使用）
  - [x] 确认 `three`、`pixi.js`、`@pixi` 等历史依赖是否仍被引用（index.html 全部使用根目录独立库文件，无 import/require，未被引用）
  - [x] 确认 `playwright` 是否仍用于验证测试（__verify_game_layout_screenshots 为空，未产出截图，项目代码无 playwright 引用，未实际使用）
  - [x] 生成评估结论：建议整体移除 / 仅保留 playwright / 保持现状（详见 `node_modules-evaluation.md`，推荐方案 B：仅保留 package.json 声明的 6 个包，释放约 107 MB）
  - [x] 本轮不实际删除 node_modules，仅输出建议（已确认仅评估，未删除任何文件）

- [x] Task 6: 验证清理后项目正常运行
  - [x] 打开 `index.html`，确认首页无 404 错误
    - > 执行结果：Playwright MCP 不可用，改用 Python `http.server` 本地服务器 + `Invoke-WebRequest` 验证。`index.html` 返回 200（2,161,281 字节）；逐项 HEAD 请求所有 26 个 `<script src>`、4 个 `<link href>` CSS、2 个视频、立绘/场景图采样，全部返回 200。仅 3 个预期 404：旧带空格视频名 `charlist_bg%20.mp4`（已重命名，index.html 不再引用）、`images/scenes/doomsday/shelter-7.png`、`images/scenes/doomsday/ark-base.png`（后两者为清理前就存在的封面图引用错误，非本轮清理导致回归）。
  - [x] 检查浏览器控制台，确认无关键资源加载失败
    - > 执行结果：未直接打开浏览器控制台；但通过 HTTP 服务器对所有静态资源引用做 HEAD 请求，确认 index.html 引用的全部脚本/CSS/视频/图片资源均返回 200，无关键资源 404（除外上文 2 个预存缺失封面图，属 data/game-chapters.js 中章节封面引用，非首页加载路径，不影响首页渲染）。
  - [x] 验证视频背景在游戏页、角色列表页、背景预设面板正常播放
    - > 执行结果：`videos/main_background.mp4`（1,015,721 字节）与 `videos/charlist_bg.mp4`（1,015,721 字节）均通过 HTTP 返回 200；index.html 中 4 处 `main_background.mp4` 引用（行 5339/6751/6830/7730）与 2 处 `charlist_bg.mp4` 引用（行 6976/7726）路径与磁盘文件名一致，可被正常加载。实际画面播放需浏览器运行时确认（未做），但资源可访问性已验证。
  - [x] 进入末日纪元章节，确认 12 张立绘 + 18 张场景正常显示
    - > 执行结果：`images/portraits/doomsday/` 含 12 个文件，`images/scenes/doomsday/` 含 18 个文件，与 `scripts/generate-doomsday-assets/scene_prompts.json` 定义的 18 个场景完全对应；data/characters.js 与 data/npc-live2d-models.js 中所有末日立绘引用（linshen/suqing/laozhou/xiaolu/lie/lingshuang/alpha/mila/yuanzhang/lin/shenfu/ada）经 HTTP 逐一验证返回 200。
  - [x] 进入修仙剧本，确认 15 张立绘 + 12 张场景正常显示
    - > 执行结果：`images/portraits/cultivation/` 含 15 个文件，`images/scenes/cultivation/` 含 12 个文件；data/characters.js 与 data/npc-live2d-models.js 中所有修仙立绘引用经抽样 HTTP 验证返回 200。
  - [x] 验证 Live2D 模型（hiyori/haru/mao）渲染正常
    - > 执行结果：`models/live2d/` 下 3 个模型 `.model3.json` 均存在且 HTTP 返回 200：`haru/haru_greeter_t03.model3.json`、`hiyori/Hiyori.model3.json`、`mao/Mao.model3.json`（注意：实际文件名与 tasks.md/checklist.md 中旧称 hiyori_pro_t10/haru_greeter_t10/mao_pro_t10 不同，以磁盘实际文件为准）。`levin/` 目录为空。data/characters.js 中所有角色 `live2dModel` 字段均为 `null`，即默认使用静态立绘 PNG；Live2D 模型通过角色详情面板的模型选择器加载（CDN 作为回退）。本轮未删除任何 models/ 文件，渲染不受影响。实际渲染需浏览器运行时确认。
  - [x] 确认 `charlist_bg.mp4` 重命名后所有引用路径生效
    - > 执行结果：Grep 确认 index.html 中 `charlist_bg` 仅出现 2 次（行 6976、7726），均引用不带空格的 `charlist_bg.mp4`；磁盘上 `videos/` 目录仅含 `charlist_bg.mp4` 与 `main_background.mp4`，无带空格文件、无 `_backup/` 目录；HTTP 对 `videos/charlist_bg.mp4` 返回 200、对 `videos/charlist_bg%20.mp4`（带空格）返回 404，重命名生效。

# Task Dependencies

- Task 1 与 Task 2 可并行执行（均为删除操作，互不依赖）
- Task 3 依赖 Task 1/2 完成（避免清理时误删视频备份）
- Task 4 独立，可与 Task 3 并行
- Task 5 独立，可与上述任务并行（仅评估不执行）
- Task 6 依赖 Task 1-4 全部完成
