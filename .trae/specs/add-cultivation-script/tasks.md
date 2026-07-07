# Tasks

- [x] Task 1: 新增 15 个修仙 NPC 角色数据（10 女 + 5 男）
  - [x] SubTask 1.1: 在 `data/characters.js` 的 `gameCharacters` 对象中新增 15 个角色：
    - 10 个女性：suwanqing（师尊）、linyueyao（师姐）、yelingxi（师妹）、jiwushuang（魔女）、bailingyin（圣女）、jiuwei（妖族公主）、guqinghan（剑峰首席/冰山剑修）、murongwaner（世家傲娇/丹道）、fengqiwu（凤凰公主）、suwen（丹峰长老）
    - 5 个男性：xiaoyichen（天玄宗大弟子/第一章打脸对象）、situhao（世家嫡子/第二章打脸对象）、mowuji（魔道太子/第三章打脸对象）、wangteng（散修天命之子/贯穿搞笑打脸）、luqingyang（同门兄弟）
    - 字段结构与现有角色一致（name/title/gender/description/personality/firstMessage/portrait/live2dModel）
  - [x] SubTask 1.2: portrait 字段暂使用 `images/portraits/cultivation/<id>.png`（文件暂不存在，运行时回退到 fallback）
  - [x] SubTask 1.3: 在 `gachaPool` 数组末尾追加 15 个角色卡池条目，rarity/rarityName/gender/age/personality/background/description/firstMessage/tapVoices/portrait/scene/waxColor/live2dModel 字段齐全
  - [x] SubTask 1.4: 女性角色描述突出外貌魅力与性格深度（符合 19-25 岁受众），男性打脸对象描述突出傲慢/狂妄/中二特质

- [x] Task 2: 新增 3 章修仙剧本数据（单一主角视角，三章同一人物成长线）
  - [x] SubTask 2.1: 在 `data/game-chapters.js` 的 `gameChapters` 数组末尾新增第三章后追加 3 个章节对象（id: 4, 5, 6），结构与现有末日章节一致。**关键区别**：与末日剧本三视角切换不同，修仙剧本三章 playerName 保持一致（玩家输入的名称），playerTitle 随境界提升变化，playerDesc 反映当前境界但身份背景一致，状态变量跨章延续
  - [x] SubTask 2.2: 第一章 id=4「仙途劫恋 · 破境篇」：number="CHAPTER IV"、npcs/npcList=["suwanqing","linyueyao","yelingxi","jiwushuang","guqinghan","murongwaner","suwen","xiaoyichen","wangteng","luqingyang"]（10个NPC）、locations 含 6 个修仙场景、openingScene（感官沉浸→身份揭示→行动召唤三段式，开场含萧逸尘嘲讽+师尊破例收下）、worldContext、metadata（tags 含"修仙"/"爽文"/"奇幻"、coverImage 暂用 scenes 占位、isBuiltIn=true）、playerName="天玄宗外门弟子"、playerTitle="废柴灵根的修仙新人"、playerDesc（练气期身份背景）、stateVars（修为境界=练气/灵力/道心/魔气侵蚀/宗门声望/NPC好感度）、events（timelineEvents 12 个含 4 个打脸场景：测灵根打脸/大比打脸萧逸尘/丹房打脸慕容婉儿/秘境打脸王腾 + thresholdEvents 8 个 + 随机事件 8 个 + 终局事件）
  - [x] SubTask 2.3: 第二章 id=5「仙途劫恋 · 渡劫篇」：number="CHAPTER V"、npcs/npcList=["suwanqing","linyueyao","yelingxi","jiwushuang","bailingyin","guqinghan","murongwaner","situhao","wangteng","luqingyang","suwen"]（11个NPC）、openingScene（承接第一章筑基成功）、playerName="天玄宗外门弟子"（与第一章一致）、playerTitle="筑基期天玄宗弟子"、playerDesc（金丹期身份背景，身份背景一致）、stateVars（初始值参考第一章终局值，修为境界=筑基→金丹，增加魔气侵蚀权重）、events（timelineEvents 12 个含 4 个打脸场景：三重背景打脸司徒浩/战场打脸司徒浩/丹道大会打脸慕容婉儿/王腾再打脸 + thresholdEvents 8 个 + 随机事件 + 终局事件）
  - [x] SubTask 2.4: 第三章 id=6「仙途劫恋 · 飞升篇」：number="CHAPTER VI"、npcs/npcList=["suwanqing","linyueyao","yelingxi","jiwushuang","bailingyin","jiuwei","fengqiwu","guqinghan","murongwaner","suwen","xiaoyichen","situhao","mowuji","wangteng","luqingyang"]（15个NPC全员集结）、openingScene（承接第二章金丹大成，魔无极率军压境）、playerName="天玄宗外门弟子"（与第一章一致）、playerTitle="金丹期天玄宗核心弟子"、playerDesc（元婴期身份背景，身份背景一致）、stateVars（初始值参考第二章终局值，修为境界=金丹→元婴→渡劫，增加天劫倒计时）、events（timelineEvents 12 个含 4 个打脸场景：五宗大比打脸全场/终极打脸魔无极/天劫打脸/王腾三打脸 + thresholdEvents 8 个 + 多结局终局事件）

- [x] Task 3: 新增 6 个修仙场景地点
  - [x] SubTask 3.1: 在 `data/chapter-locations.js` 的 `chapterLocations` 对象中新增 key 4/5/6，每个 key 包含 6 个场景对象（id/name/description/atmosphere）
  - [x] SubTask 3.2: 第一章场景（key 4）：tianxuan-gate（天玄宗山门）、sword-peak（剑峰）、pill-hall（丹房）、secret-realm（秘境）、magic-domain（魔域边缘）、trial-ground（试炼场）
  - [x] SubTask 3.3: 第二章场景（key 5）：frontline-camp（前线大营）、magic-abyss（魔渊）、sect-council（宗门议事殿）、sealing-array（封印阵）、heart-demon-realm（心魔境）、magic-temple（魔神殿）
  - [x] SubTask 3.4: 第三章场景（key 6）：heaven-tribulation-altar（天劫祭坛）、five-sect-battlefield（五宗决战场）、ascension-platform（飞升台）、past-life-realm（前世境）、final-void（终焉虚空）、immortal-gate（仙门）

- [x] Task 4: 新增修仙世界观词条
  - [x] SubTask 4.1: 在 `data/game-world-info.js` 的 `gameWorldInfo` 数组中新增 8-10 条修仙世界观词条，结构为 { keys: [...], content: "..." }
  - [x] SubTask 4.2: 词条覆盖：天玄大陆、五大宗门（天玄宗/梵音宗/万魔宗/青丘妖族/剑庐）、修炼体系（练气→筑基→金丹→元婴→化神→渡劫→飞升）、魔族与魔气、天劫、前世因果/宿命、灵根与灵力、丹道/符道/剑道、宗门大比/秘境、飞升传说

- [x] Task 5: 章节选择 UI 适配（剧本系列区分）
  - [x] SubTask 5.1: 检查 `getBuiltInScripts()` 函数是否自动将新增 chapter id 4/5/6 映射为 builtin_4/builtin_5/builtin_6，确认剧本列表自动显示新剧本（预计无需改代码）
  - [x] SubTask 5.2: 确认剧本列表的 tag 筛选能正确区分"末世方舟"（末日/生存/丧尸）和"仙途劫恋"（修仙/爽文/奇幻），如 metadata.tags 已正确设置则无需额外改动
  - [x] SubTask 5.3: 验证点击新剧本卡片能正确进入对应章节（_chapterId=4/5/6），openingScene 和 NPC 列表正确加载

- [x] Task 6: 语法检查与端到端验证
  - [x] SubTask 6.1: 对修改的 4 个 data 文件运行 `node --check` 语法检查
  - [x] SubSubTask 6.1.1: `node --check data/characters.js`
  - [x] SubTask 6.2: 使用 Playwright 进入剧本列表，确认 3 个新修仙剧本卡片显示
  - [x] SubTask 6.3: 使用 Playwright 进入第一章（破境篇），确认 4 个 NPC 正确加载、openingScene 渲染、场景地点可选
  - [x] SubTask 6.4: 使用 Playwright 进入第三章（飞升篇），确认 6 个 NPC 全部加载、天劫倒计时状态变量显示
  - [x] SubTask 6.5: 移动端 360px 适配验证（剧本列表无水平溢出、剧本卡片正常显示）

# Task Dependencies
- [Task 1] 独立（角色数据不依赖其他任务）
- [Task 3] 独立（场景数据不依赖其他任务）
- [Task 4] 独立（世界观词条不依赖其他任务）
- [Task 2] depends on [Task 1]（章节的 npcs/npcList 引用角色 id）
- [Task 5] depends on [Task 2, Task 3]（UI 适配依赖剧本和场景数据就位）
- [Task 6] depends on [Task 1, Task 2, Task 3, Task 4, Task 5]（验证依赖所有数据就位）
