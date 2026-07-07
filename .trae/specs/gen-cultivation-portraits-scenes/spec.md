# 修仙：乱编的官方剧本美术资产生成 Spec

## Why
官方剧本「修仙：乱编的 · 觉醒篇」（id=4，单章整合）当前缺少视觉资源：15 个 NPC 的立绘路径 `images/portraits/cultivation/<id>.png` 在 `data/characters.js` 中已配置但文件不存在（运行时回退到 fallback SVG），12 个场景背景图路径 `images/scenes/cultivation/<id>.png` 在 `metadata.coverImage` 中已声明但同样缺失。导致玩家进入修仙剧本时立绘是占位图、背景是默认渐变色，视觉沉浸感严重不足。利用已验证的 `byted-seedream-image-generate` skill + 绿幕抠图方案（与末日方舟同一套流程），快速补齐 15 张立绘 + 12 张场景图。

## What Changes
- 为 15 个 NPC 生成**透明背景立绘 PNG**（绿幕生成 + Pillow 抠图，与末日方舟同一方案）
  - 存放路径：`images/portraits/cultivation/<npcid>.png`
  - 尺寸：512×768（与末日方舟立绘一致）
  - 风格：半写实国风仙侠（semi-realistic xianxia style, traditional Chinese immortal cultivation theme）
- 为 12 个场景地点生成**场景背景图 PNG**（无人物宽幅）
  - 存放路径：`images/scenes/cultivation/<locationid>.png`
  - 尺寸：1536×640（与末日方舟场景图一致）
- 更新 `data/npc-live2d-models.js`：新增 15 个修仙 NPC 的立绘映射（当前仅含末日方舟 12 个）
- 修改 `index.html`：将官方剧本场景背景注入逻辑从 `chapterId === 1 || 2 || 3` 扩展到 `chapterId === 4`（修仙剧本），注入 `images/scenes/cultivation/<locationid>.png` 映射
- **不需要**修改 `data/characters.js`：15 个 NPC 的 `portrait` 字段已正确配置为 `images/portraits/cultivation/<id>.png`，文件生成后即可直接生效
- **分阶段实施**：
  - 阶段一：15 张 NPC 立绘（绿幕生成 + 抠图 + 配置 npc-live2d-models.js）
  - 阶段二：12 张场景图（生成 + 压缩 + 注入 index.html 背景映射）
  - 两阶段可并行推进（立绘和场景图互不依赖）

## Impact
- 新增资源目录：`images/portraits/cultivation/`、`images/scenes/cultivation/`
- 新增脚本目录：`scripts/generate-cultivation-assets/`（含 prompts.json / scene_prompts.json / gen_portraits.py / matting.py / gen_scenes.py / .env 软链或复用）
- 受影响数据文件：`data/npc-live2d-models.js`（新增 15 条目）
- 受影响代码文件：`index.html`（两处场景背景注入条件：L16556、L16679，扩展为 1-4 章）
- 资源治理：新增 27 张 PNG，遵循末日方舟同样的压缩策略（立绘 FASTOCTREE 量化 ~30-60KB，场景图 FASTOCTREE 量化 ~300-500KB）
- 不影响末日方舟剧本（id=1/2/3）和自定义剧本运行时
- 不影响修仙剧本的剧情/对话逻辑（仅补视觉资产）

## ADDED Requirements

### Requirement: 修仙 NPC 透明背景立绘
系统 SHALL 为修仙剧本的 15 个 NPC 各提供一张透明背景的 PNG 立绘，人物主体清晰、边缘干净无绿幕残留色，可在游戏页作为前景叠加在场景背景之上。

#### Scenario: 立绘透明显示
- **WHEN** 玩家在修仙剧本中与某 NPC 对话（如苏婉清、林月瑶、萧逸尘等）
- **THEN** 该 NPC 的立绘以透明 PNG 形式叠加显示在当前场景背景图之上
- **AND** 立绘四周无白色/绿色/黑色实色矩形边框
- **AND** 人物发丝与衣物边缘无可见的绿幕溢色

#### Scenario: 立绘回退
- **WHEN** 某 NPC 立绘加载失败
- **THEN** 回退到 `fallback-male.svg`/`fallback-female.svg`（按 gender）

### Requirement: 修仙场景背景图
系统 SHALL 为修仙剧本 12 个地点各提供一张场景背景图 PNG，作为玩家进入该地点时的对话/游戏背景。

#### Scenario: 场景图加载
- **WHEN** 玩家进入修仙剧本的某地点（如天玄宗山门、剑峰、丹房、魔渊等）
- **THEN** 该地点对应的 `images/scenes/cultivation/<locationid>.png` 作为背景加载显示
- **WHEN** 玩家切换到另一地点
- **THEN** 背景平滑切换为对应地点的场景图

#### Scenario: 场景图回退
- **WHEN** 某场景图加载失败
- **THEN** 回退到默认渐变背景（与末日方舟相同）

### Requirement: 立绘映射表扩展
`data/npc-live2d-models.js` SHALL 在末日方舟 12 个 NPC 基础上，新增 15 个修仙 NPC 的立绘映射，key 为 NPC id，value 为 `{ url, name }` 对象。

### Requirement: 场景背景注入扩展
`index.html` 中官方剧本场景背景注入逻辑 SHALL 覆盖修仙剧本（chapterId === 4），将 12 个修仙地点的 `location.name` 映射到 `images/scenes/cultivation/<locationid>.png`。

## MODIFIED Requirements

### Requirement: npc-live2d-models.js 映射表
原映射表仅含 12 个末日方舟 NPC。修改后新增 15 个修仙 NPC（suwanqing/linyueyao/yelingxi/jiwushuang/bailingyin/jiuwei/guqinghan/murongwaner/fengqiwu/suwen/xiaoyichen/situhao/mowuji/wangteng/luqingyang），url 指向 `images/portraits/cultivation/<id>.png`。

### Requirement: index.html 场景背景注入条件
原条件 `if (chapterId === 1 || chapterId === 2 || chapterId === 3)` 修改为 `if (chapterId === 1 || chapterId === 2 || chapterId === 3 || chapterId === 4)`，并在该分支内根据 chapterId 选择 `doomsday/` 或 `cultivation/` 子目录。

## Implementation Notes

### 15 个修仙 NPC 及外貌摘要（来自 characters.js）
1. **suwanqing 苏婉清**（女）：白发如雪及腰，冰蓝色眼眸，素白剑袍腰悬「霜雪」仙剑，气质高洁，身材高挑修长
2. **linyueyao 林月瑶**（女）：栗色长发盘双环髻，杏眼桃腮梨涡，淡紫色丹袍，身材丰腴温柔
3. **yelingxi 叶灵溪**（女）：黑色长发双马尾，大眼睛灵动狡黠，鹅黄色符袍，娇小玲珑
4. **jiwushuang 姬无双**（女）：酒红色大波浪长发，凤眼上挑唇色殷红，黑红交织魔袍锁骨魔纹，身材火爆
5. **bailingyin 白灵音**（女）：金色长发及腰，碧绿色眼眸异域血统，白色佛袍额间莲花印记，气质圣洁
6. **jiuwei 九尾**（女）：银白色长发及腰，狐耳可隐藏，琥珀色竖瞳，粉色妖袍，娇小玲珑
7. **guqinghan 顾清寒**（女）：墨黑长发束高马尾，丹凤眼冷冽如霜，青黑色剑修服腰悬「寒霜」剑，五官冷艳
8. **murongwaner 慕容婉儿**（女）：浅金色长发微卷，琥珀色眼眸，鹅黄织金裙装珠摇步摇，容貌精致
9. **fengqiwu 凤栖梧**（女）：火红色长发如瀑，金红色竖瞳，额间凤凰印记，赤红金纹妖袍，容貌艳丽霸气
10. **suwen 素问**（女）：浅绿色长发及腰，温柔杏眼，淡青色丹师长袍，容貌温婉，身材丰腴
11. **xiaoyichen 萧逸尘**（男）：白衣束发，剑眉星目容貌俊朗，气质冷傲，腰悬「天罡」剑，身材挺拔
12. **situhao 司徒浩**（男）：锦衣玉带，面容阴柔俊美，眼神阴鸷，玉骨折扇扇骨藏毒针
13. **mowuji 魔无极**（男）：黑发披肩，魔纹蔓延半张脸，血红色眼眸，黑金魔袍手持「灭世」魔枪，身材高大
14. **wangteng 王腾**（男）：布衣芒鞋，长相普通眼神狂热，随身携带《天命录》
15. **luqingyang 陆青阳**（男）：粗布道袍，国字脸浓眉大眼，笑起来憨厚，身材魁梧扛玄铁重剑

### 12 个修仙场景及氛围（来自 chapter-locations.js）
1. **tianxuan-gate 天玄宗山门**：巍峨山门高耸入云，门楣「天玄」二字，云雾缭绕仙鹤翱翔，千级石阶蜿蜒
2. **sword-peak 剑峰**：剑气纵横百丈，断崖峭壁如削，崖畔剑冢林立千百柄废剑插于岩间
3. **pill-hall 丹房**：药香弥漫不散，丹炉林立百座，火光摇曳映红四壁
4. **secret-realm 秘境**：上古大能遗留洞天秘境，灵气浓郁凝如实质，遗迹遍布机缘与凶险
5. **frontline-camp 前线大营**：军帐连绵数里，战旗猎猎，五大宗门弟子驻守，伤兵营与军议帐灯火通明
6. **magic-abyss 魔渊**：深不见底裂谷，魔气翻涌如潮，封印裂隙遍布崖壁
7. **sect-council 宗门议事殿**：庄严肃穆，长老齐聚议政，殿中悬五宗旗帜，中央宗主之位
8. **sealing-array 封印阵**：镇压魔气的巨型封印阵，符文闪烁流转不熄，阵眼灵光冲天
9. **five-sect-battlefield 五宗决战场**：广阔战场，五色旗帜分立五方，战意冲霄，中央飞升台遗迹
10. **heaven-tribulation-altar 天劫祭坛**：雷云密布常年不散，天威压顶，祭坛古朴阵法引动天劫，石阶雷劫焦痕
11. **ascension-platform 飞升台**：古老祭坛，仙光流转不熄，上古纹路记载飞升之法
12. **immortal-gate 仙门**：金光万丈照彻天地，仙界入口飞升终点

### 复用末日方舟方案的细节
- **绿幕生成**：`size=2048x3072`、`response_format=b64_json`、`watermark=False`、`version=5.0`
- **抠图**：RGB+HSV 双判定绿色 mask，形态学开闭运算，1.3px 高斯羽化，spill removal
- **场景图**：`size=3072x1536`，生成后缩放到 1536×640 + FASTOCTREE 量化
- **失败重试**：单张最多 3 次，间隔 3 秒
- **风格统一**：所有立绘共用 `_style_suffix`（绿幕指令 + 半写实国风仙侠），所有场景图共用对应 style_suffix
