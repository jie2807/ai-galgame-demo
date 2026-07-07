# Checklist

## 角色数据验证
- [x] `data/characters.js` 中新增 15 个角色（10 女 + 5 男）：
  - 10 女性：suwanqing/linyueyao/yelingxi/jiwushuang/bailingyin/jiuwei/guqinghan/murongwaner/fengqiwu/suwen
  - 5 男性：xiaoyichen/situhao/mowuji/wangteng/luqingyang
- [x] 每个角色字段完整：name/title/gender/description/personality/firstMessage/portrait/live2dModel
- [x] 10 个女性角色覆盖经典修仙设定：师尊/师姐/师妹/魔女/圣女/妖族公主/冰山剑修/世家傲娇/凤凰公主/丹峰长老
- [x] 女性角色描述突出外貌魅力与性格深度，符合 19-25 岁受众偏好
- [x] 4 个男性打脸对象：萧逸尘（天才师兄傲慢）/司徒浩（世家纨绔阴险）/魔无极（魔道太子狂妄）/王腾（天命中二搞笑）
- [x] 1 个兄弟型角色：陆青阳（憨厚热血忠诚）
- [x] `gachaPool` 数组新增 15 个对应卡池条目，rarity/rarityName/tapVoices 等字段齐全
- [x] `node --check data/characters.js` 语法检查通过

## 装逼打脸环节验证
- [x] 每章 events 中包含至少 3-4 个打脸场景事件
- [x] 第一章打脸场景：测灵根打脸（师尊背景撑场）/大比打脸萧逸尘（越级+扮猪吃虎）/丹房打脸慕容婉儿（丹道）/秘境打脸王腾（搞笑）
- [x] 第二章打脸场景：三重背景打脸司徒浩（师尊+魔女+圣女）/战场打脸司徒浩（阴谋）/丹道大会打脸慕容婉儿（九转金丹）/王腾再打脸
- [x] 第三章打脸场景：五宗大比打脸全场/终极打脸魔无极（越级）/天劫打脸（渡劫飞升）/王腾三打脸收尾
- [x] 打脸对象覆盖：萧逸尘/司徒浩/魔无极/王腾/慕容婉儿/顾清寒
- [x] 打脸类型覆盖：废柴逆袭/扮猪吃虎/越级战斗/丹道打脸/背景打脸/世家打脸/天命之子打脸/终极打脸

## 剧本数据验证
- [x] `data/game-chapters.js` 新增 3 章（id=4 破境篇 / id=5 渡劫篇 / id=6 飞升篇）
- [x] 每章字段结构与现有末日章节一致（id/number/title/subtitle/desc/npcs/npcList/locations/openingScene/worldContext/metadata/playerName/playerTitle/playerDesc/stateVars/events）
- [x] **单一主角视角**：三章 playerName 一致（"天玄宗外门弟子"），playerTitle 随境界变化（外门弟子→筑基弟子→金丹核心弟子），身份背景（废柴灵根/师尊苏婉清弟子）三章一致
- [x] **状态变量跨章延续**：第二章初始值参考第一章终局，第三章初始值参考第二章终局（修为境界/道心/魔气侵蚀/宗门声望/NPC好感度）
- [x] 第一章 NPC 10 个（苏婉清/林月瑶/叶灵溪/姬无双/顾清寒/慕容婉儿/素问/萧逸尘/王腾/陆青阳）
- [x] 第二章 NPC 11 个（+白灵音/司徒浩，无萧逸尘）
- [x] 第三章 NPC 15 个（全员集结，+九尾/凤栖梧/魔无极/萧逸尘回归）
- [x] 每章 openingScene 采用"感官沉浸→身份揭示→行动召唤"三段式结构，开场不突兀
- [x] 第二章/第三章 openingScene 承接前一章终局（筑基成功→金丹大成）
- [x] 每章 stateVars 包含：修为境界/灵力/道心/魔气侵蚀/宗门声望/NPC好感度（第三章额外含天劫倒计时）
- [x] 每章 events 包含：timelineEvents（12个）/thresholdEvents（8个）/随机事件/终局事件
- [x] metadata.tags 包含"修仙""爽文""奇幻"，isBuiltIn=true
- [x] metadata.coverImage 路径为 `images/scenes/cultivation/<scene>.png`（占位）
- [x] `node --check data/game-chapters.js` 语法检查通过

## 场景数据验证
- [x] `data/chapter-locations.js` 新增 key 4/5/6，每个 key 含 6 个场景
- [x] 每个场景字段完整：id/name/description/atmosphere
- [x] 场景描述符合修仙世界观（宗门山门/剑峰/丹房/秘境/魔域/天劫场等）
- [x] `node --check data/chapter-locations.js` 语法检查通过

## 世界观验证
- [x] `data/game-world-info.js` 新增 8-10 条修仙世界观词条
- [x] 每条结构为 { keys: [...], content: "..." }
- [x] 词条覆盖：天玄大陆/五大宗门/修炼体系/魔族/天劫/前世因果/灵根/丹符剑道/秘境/飞升
- [x] 世界观内容与剧本章节描述一致，无矛盾
- [x] `node --check data/game-world-info.js` 语法检查通过

## UI 适配验证
- [x] 剧本列表（scriptListPanel）自动显示 3 个新修仙剧本卡片（builtin_4/builtin_5/builtin_6）
- [x] 剧本卡片的 tag 筛选能正确区分末世方舟与仙途劫恋
- [x] 点击新剧本卡片能正确进入对应章节，NPC 列表和 openingScene 正确加载
- [x] 章节内的 NPC 资料面板能正确显示 6 个新角色信息
- [x] 章节内的场景地点选择能正确显示 6 个修仙场景

## 移动端验证
- [x] 360px 宽度下剧本列表无水平溢出
- [x] 360px 宽度下剧本卡片正常显示（封面/标题/标签/操作按钮）
- [x] 360px 宽度下进入修仙剧本后游戏页正常显示
- [x] 触屏操作正常（点击剧本卡片、进入章节、NPC 面板开关）

## 回归验证
- [x] 原有末日方舟剧本（id 1/2/3）不受影响，仍可正常进入和游玩
- [x] 原有末日角色（linshen/suqing 等）数据未被污染
- [x] 自定义剧本功能不受影响
