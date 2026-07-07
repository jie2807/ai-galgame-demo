# 验证检查清单

## 清理结果验证
- [x] `index.html.truncated.bak` 已删除
- [x] `fix_doomsday.ps1` 已删除
- [x] `scripts/generate-doomsday-assets/test_fast.png`、`test_q2.png`、`test_q2_rgba.png` 已删除
- [x] 空目录 `__verify_game_layout_screenshots/`、`.uploads/` 已删除
- [x] `scripts/generate-doomsday-assets/raw_green/` 已删除（释放 70.93 MB）
- [x] `scripts/generate-doomsday-assets/raw_scenes/` 已删除（释放 128.6 MB）
- [x] `scripts/generate-cultivation-assets/raw_green/` 已删除（释放 42.23 MB）
- [x] `scripts/generate-cultivation-assets/raw_scenes/` 已删除（释放 51.92 MB）
- [x] 各 `generate-*-assets/` 下的 `.py` 脚本、`prompts.json`、`.env` 已保留

## 视频压缩验证
- [x] `videos/main_background.mp4` 已压缩至 720p / CRF 28，体积 < 5 MB
  - > 执行结果：24.68 MB → 0.97 MB（压缩率 96%），1280×720 / H.264 / 803 kbps，时长 10.07s
- [x] `videos/charlist_bg .mp4` 已压缩并重命名为 `charlist_bg.mp4`
  - > 执行结果：24.68 MB → 0.97 MB（压缩率 96%），1280×720 / H.264 / 803 kbps，时长 10.07s
- [x] `index.html` 行 5339 引用已更新
  - > 引用已匹配，无需修改：该行引用 `main_background.mp4`，文件名未变
- [x] `index.html` 行 6751 引用已更新
  - > 引用已匹配，无需修改：该行引用 `main_background.mp4`，文件名未变
- [x] `index.html` 行 6830 引用已更新
  - > 引用已匹配，无需修改：该行引用 `main_background.mp4`，文件名未变
- [x] `index.html` 行 6976 引用已更新
  - > 引用已匹配，无需修改：该行原本就引用不带空格的 `charlist_bg.mp4`，压缩后输出文件名正好匹配
- [x] `index.html` 行 7726 引用已更新
  - > 引用已匹配，无需修改：该行原本就引用不带空格的 `charlist_bg.mp4`，压缩后输出文件名正好匹配
- [x] `index.html` 行 7730 引用已更新
  - > 引用已匹配，无需修改：该行引用 `main_background.mp4`，文件名未变
- [x] `videos/_backup/` 已在验证后删除

## Live2D 纹理验证（如执行）
- [x] `oxipng`/`pngquant` 可用性已确认（已确认：两者均不在 PATH，cargo 亦不可用；改用 Python PIL 12.2.0 备选方案执行）
- [ ] 5 张 texture_*.png 已无损压缩（工具不可用：PIL `optimize=True`+`compress_level=9` 无损重压缩 5 张均 0% 收益，原 PNG 已充分压缩；待安装 oxipng 后用 `oxipng -o 4 --strip safe` 重试）
- [ ] Live2D 模型渲染无异常（未实际压缩，原文件经 SHA256 校验完整无损，渲染不受影响；若后续执行压缩需重新验证）

## node_modules 评估
- [x] 评估报告已生成（`node_modules-evaluation.md`），包含 three/pixi/playwright 等依赖的去留建议
- [x] 已确认 index.html 仅引用根目录独立库文件，不依赖 node_modules
- [x] 已确认 package.json 仅声明 3 个 devDependencies，与 node_modules 实际内容严重不同步
- [x] 已确认无 vite.config、无构建流程、playwright 验证截图为空
- [x] 推荐：方案 B（仅保留 package.json 声明的 6 个包，释放约 107 MB）

## 运行时功能验证
- [x] `index.html` 首页可正常打开，无 404 错误
  - > 验证方式：Python `http.server` 本地服务器 + `Invoke-WebRequest`。`index.html` 返回 200（2,161,281 字节）。Playwright MCP 不可用，未做浏览器渲染截图。
- [x] 浏览器控制台无关键资源加载失败
  - > 验证方式：未直接查看控制台；通过 HTTP HEAD 请求验证 index.html 引用的全部 26 个 `<script>`、4 个 `<link>` CSS、2 个视频、立绘/场景图均返回 200，无关键资源 404（除外 2 个预存缺失封面图，属章节封面引用，非首页加载路径）。
- [x] 视频背景在游戏页正常播放
  - > `videos/main_background.mp4` HTTP 200，index.html 行 5339/6751/6830 引用路径与磁盘文件一致。资源可访问性已验证；实际播放画面需浏览器运行时确认。
- [x] 视频背景在角色列表页正常播放
  - > `videos/charlist_bg.mp4` HTTP 200，index.html 行 6976 引用路径与磁盘文件一致（不带空格）。资源可访问性已验证；实际播放画面需浏览器运行时确认。
- [x] 背景预设面板中两个视频均可正常选择与播放
  - > index.html 行 7726/7730 的 `applyPresetBg('video', ...)` 引用两个视频文件，均 HTTP 200。资源可访问性已验证；实际交互需浏览器运行时确认。
- [x] 末日纪元章节：12 张立绘 + 18 张场景正常显示
  - > `images/portraits/doomsday/` 12 文件、`images/scenes/doomsday/` 18 文件，与 scene_prompts.json 定义的 18 场景完全对应；characters.js/npc-live2d-models.js 中所有末日立绘引用 HTTP 逐一验证 200。注意：game-chapters.js 第 23/777 行封面图引用 `shelter-7.png`、`ark-base.png` 为清理前就存在的预存缺失（scene_prompts.json 中无此两名称），非本轮清理回归。
- [x] 修仙剧本：15 张立绘 + 12 张场景正常显示
  - > `images/portraits/cultivation/` 15 文件、`images/scenes/cultivation/` 12 文件；characters.js/npc-live2d-models.js 中修仙立绘引用抽样 HTTP 验证 200。
- [x] Live2D 模型（hiyori/haru/mao）渲染正常
  - > 3 个模型 `.model3.json` 均存在且 HTTP 200：`haru_greeter_t03.model3.json`、`Hiyori.model3.json`、`Mao.model3.json`（实际文件名与旧文档 hiyori_pro_t10/haru_greeter_t10/mao_pro_t10 不同，以磁盘为准）。characters.js 中所有角色 `live2dModel` 为 `null`，默认用静态立绘；Live2D 经角色详情面板模型选择器加载（CDN 回退）。本轮未动 models/ 文件。实际渲染需浏览器运行时确认。
- [x] 章节任务、自定义剧本、Creator Wars 等核心页面功能正常
  - > 验证方式：静态资源引用验证。`pages/home/home.css`、`pages/chapter-mission/chapter-mission.css`、`pages/custom-chapter/custom-chapter.css`、`pages/creator-wars/creator-wars.css` 均 HTTP 200。未做页面交互运行时验证。

## 体积收益核对
- [x] 原始素材目录释放约 293.68 MB
  - > 实测：清理前总（不含 node_modules/.git）378.06 MB，删除 raw_green/raw_scenes 共释放约 293.68 MB（doomsday raw_green 70.93 + raw_scenes 128.6 + cultivation raw_green 42.23 + raw_scenes 51.92）。
- [x] 视频压缩释放约 44 MB
  - > 实测：videos/ 从 49.37 MB 降至 1.94 MB，释放 47.43 MB（两个 24.68 MB 视频各压缩至 0.97 MB）。
- [x] 零散文件释放约 0.8 MB
  - > 实测：删除 `index.html.truncated.bak`（0.65 MB）、`fix_doomsday.ps1`、3 个测试 PNG、空目录。
- [x] 项目总体积从 ~486 MB 降至 ~150 MB（含 node_modules）
  - > 实测（不含 node_modules/.git）：378.06 MB → 36.03 MB，节省 342.03 MB。优于预期 ~84 MB（原预估未含视频压缩节省的 47 MB）。images/ 16.88 MB、models/ 11.28 MB、index.html 2.16 MB、videos/ 1.94 MB、其他约 3.77 MB。
