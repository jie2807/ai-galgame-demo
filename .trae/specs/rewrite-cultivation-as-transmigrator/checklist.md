# Checklist

## 重命名验证
- [x] 第一章 title 为「逆天仙途 · 觉醒篇」，无「仙途劫恋」「破境篇」字样
- [x] 第二章 title 为「逆天仙途 · 霸业篇」，无「仙途劫恋」「渡劫篇」字样
- [x] 第三章 title 为「逆天仙途 · 巅峰篇」，无「仙途劫恋」「飞升篇」字样
- [x] 三章 metadata.title/author/description 同步更新为「逆天仙途」
- [x] 三章 metadata.tags 含「穿越」「系统流」「降维打击」
- [x] 第一章 subtitle 为 `THE AWAKENING`，第二章为 `THE HEGEMONY`，第三章为 `THE SUPREME`

## 穿越者设定验证
- [x] 三章 playerName 一致（玩家输入的名称）
- [x] 三章 playerTitle 含「穿越者」字样
- [x] 三章 playerDesc 含：现代身份（996 程序员猝死）、穿越目标（废柴弟子林凡）、三大金手指（修炼系统/剧情预知/现代知识）、性格（务实理性+报仇执念+玩家心态）
- [x] 第一章 openingScene 描写穿越觉醒（现代人猝死→废柴弟子身上觉醒→激活系统→反杀萧逸尘）
- [x] 第二章 openingScene 含穿越者内心独白（剧情预知魔族入侵）
- [x] 第三章 openingScene 含穿越者终极独白（大结局逆天）

## 去恋爱化验证
- [x] 苏婉清 personality/事件无「情劫」「暗恋」「道心因情裂缝」表述，改为「道心因穿越者思维震动」
- [x] 林月瑶 personality/事件无「暗恋」「吃醋」「耳根红」表述，改为「敬佩天才师弟」
- [x] 姬无双 personality/事件无「宿世因果」「前世纠缠」表述，改为「被反套路折服主动结盟」
- [x] 白灵音 personality/事件无「暗恋断情挣扎」表述，改为「命格观察/同道」
- [x] 顾清寒 personality/事件无「暗恋死不承认」表述，改为「慕强追随」
- [x] 慕容婉儿 personality/事件无「偷偷收集丹药」表述，改为「主动求教竞争对手」
- [x] 三章 events 中无「脸红」「心跳」「暧昧」「后会无期小东西」等言情关键词

## 穿越者打脸验证
- [x] 第一章 timelineEvents 含至少 2 个穿越者打脸：觉醒反杀萧逸尘（信息差+系统外挂）、丹房打脸慕容婉儿（现代知识降维打击）
- [x] 第二章 timelineEvents 含至少 2 个穿越者打脸：三重背景打脸司徒浩（信息差）、丹道大会打脸慕容婉儿（现代知识降维打击）
- [x] 第三章 timelineEvents 含至少 2 个穿越者打脸：五宗大比打脸全场（跨时代碾压）、终极打脸魔无极（信息差+系统外挂，含「我是穿越者」台词）
- [x] 打脸场景体现金手指作用（系统奖励/剧情预知/现代知识）

## 阈值/随机/结局事件验证
- [x] 三章 thresholdEvents 无恋爱向阈值（如「好感度>70 传剑诀埋情劫」），改为爽文向（如「道心>70 因思维震动传道」）
- [x] 三章 randomEvents 无暧昧描写（如「送丹药耳根红」），改为敬佩/求教向
- [x] 三章 endingEvents 无言情结局（如「魔女信物暧昧」「霜雪剑诀情劫伏笔」），改为爽文结局（如「魔女结盟」「师尊传道认可」）

## 状态变量验证
- [x] 三章 stateVars 含 `systemPoints`（系统积分，min 0 max 9999）
- [x] 三章 stateVars 含 `plotForeknowledge`（剧情预知度，min 0 max 100）
- [x] 原 stateVars 保留（cultivationRealm/spiritualPower/daoHeart/sectPrestige/magicCorruption/NPC 好感度/萧逸尘敌意）
- [x] 第二章 systemPoints/plotForeknowledge 初始值参考第一章终局（ch4:100/80, ch5:300/75, ch6:800/70）
- [x] 第三章 systemPoints/plotForeknowledge 初始值参考第二章终局

## 世界观词条验证
- [x] `data/game-world-info.js` 新增「穿越者」词条（keys 含 穿越者/异界来客/穿书）
- [x] 新增「修炼系统」词条（keys 含 系统/金手指/修炼系统）
- [x] 新增「剧情预知」词条（keys 含 剧情预知/穿书/先知）
- [x] 新增「混沌灵根」词条（keys 含 混沌灵根/隐藏灵根）
- [x] 世界观内容与剧本章节描述一致，无矛盾

## 角色数据验证
- [x] `data/characters.js` 中 6 个女性角色（suwanqing/linyueyao/jiwushuang/bailingyin/guqinghan/murongwaner）personality 无言情关键词
- [x] 6 个女性角色 firstMessage 无暧昧表述（如有则改为敬佩/结盟/求教向）
- [x] 男性角色（xiaoyichen/situhao/mowuji/wangteng/luqingyang）不改，保持原样
- [x] `node --check data/characters.js` 通过

## 语法检查验证
- [x] `node --check data/game-chapters.js` 通过
- [x] `node --check data/characters.js` 通过
- [x] `node --check data/game-world-info.js` 通过

## 端到端验证
- [x] Playwright 进入剧本列表，3 个剧本卡片显示「逆天仙途 · 觉醒篇/霸业篇/巅峰篇」
- [x] Playwright 进入第一章，openingScene 为穿越觉醒场景
- [x] Playwright 进入第三章，终极打脸魔无极含「废柴？我是穿越者，你呢？」台词
- [x] 6 个女性角色 personality 无言情关键词（grep 验证）

## 移动端与回归验证
- [x] 360px 宽度下剧本列表无水平溢出
- [x] 360px 宽度下剧本卡片正常显示新名
- [x] 末日方舟剧本（id 1/2/3）不受影响，仍可正常进入和游玩
- [x] 原有末日角色数据未被污染
