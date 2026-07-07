# 运行时必需文件清单

> 来源：`index.html` + `styles.css`（含 `@import` 链）中引用的本地资源
> 生成规则：排除 CDN / 远程 `https://...` 链接，保留相对项目根目录的本地路径

---

## CSS（8 个）

- `styles.css`
- `styles/variables.css`
- `styles/reset.css`
- `styles/animations.css`
- `pages/home/home.css`
- `pages/chapter-mission/chapter-mission.css`
- `pages/custom-chapter/custom-chapter.css`
- `pages/creator-wars/creator-wars.css`

> 说明：`styles.css` 通过 `@import` 引入 `styles/variables.css`、`styles/reset.css`、`styles/animations.css`；其余为 `index.html` 中 `<link>` 直接引用。

---

## JS（9 个）

- `pixi.min.js`
- `live2d.min.js`
- `live2dcubismcore.min.js`
- `live2d-display.min.js`
- `live2d-renderer.js`
- `sprite-renderer.js`
- `action-tag-parser.js`
- `models/sprite/violet-sprite.js`
- `engine/ScriptEngineBridge.js`

> 说明：`engine/ScriptEngineBridge.js` 来自 `index.html` 中的动态拼接导入 `import('/engine/' + 'ScriptEngineBridge.js')`。

---

## 图片（25 个）

### 背景 / 装饰图
- `images/backgrounds/main_bg.jpg`
- `images/backgrounds/warm_light.jpg`
- `images/backgrounds/vintage_texture.jpg`
- `images/evergarden-flowers.jpg`
- `images/starry-sky.jpg`

### 头像 / 角色图
- `images/violet-avatar.jpg`
- `images/violet-avatar-lg.jpg`

### 卡片 / 集合图
- `images/cards/books_letters.jpg`
- `images/cards/school_building.jpg`
- `images/character-collection.jpg`

### 诺克萨森剧本角色立绘
- `images/portraits/noxasen/weber.png`
- `images/portraits/noxasen/margaret.png`
- `images/portraits/noxasen/friedrich.png`
- `images/portraits/noxasen/lena.png`
- `images/portraits/noxasen/albrecht.png`
- `images/portraits/noxasen/klara.png`
- `images/portraits/noxasen/heinrich.png`
- `images/portraits/noxasen/erich.png`

### 诺克萨森剧本封面
- `images/scenes/noxasen/people-rally.png`
- `images/scenes/noxasen/noble-manor.png`
- `images/scenes/noxasen/crown-study.png`

### 动态稀有度印（代码拼接路径）
- `images/seal_{rarity}.png`（运行时根据 `result.rarity` 取值，当前仓库存在 `images/seal_3.png`、`images/seal_4.png`）

---

## 视频（3 个）

- `videos/main_background.mp4`
- `videos/chapter_background.mp4`
- `videos/charlist_bg.mp4`

---

## 其他资源（3 个）

- `models/live2d/hiyori/Hiyori.model3.json`
- `models/live2d/haru/haru_greeter_t03.model3.json`
- `models/live2d/mao/Mao.model3.json`

> 说明：以上 `.model3.json` 为 Live2D 模型描述文件，在 `index.html` 内联 JS 中通过 `live2dModel` / `url` 字段引用。

---

## 统计

| 类别 | 数量 |
|------|------|
| CSS | 8 |
| JS | 9 |
| 图片 | 25（含 1 个动态模式） |
| 视频 | 3 |
| 其他资源 | 3 |
| **合计** | **48** |

---

## 排除项

以下资源为 CDN / 远程链接或 data URI，未列入本清单：
- Google Fonts CSS / preconnect
- `https://cdn.jsdelivr.net/npm/lottie-web@5.12.2/build/player/lottie.min.js`
- `https://cdn.jsdelivr.net/npm/@huggingface/transformers@3.0.0/dist/transformers.min.js`
- 多个 CDN Live2D 模型（`cdn.jsdelivr.net/gh/xiazeyu/...`）
- Picsum 占位图（`https://fastly.picsum.photos/...`）
- 内联 `data:audio/wav;base64,...` 音效
- SVG 内部 `url(#gradientId)` / `url(#filterId)` 等引用
