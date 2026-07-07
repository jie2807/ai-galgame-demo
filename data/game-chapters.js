﻿﻿﻿// 末世方舟丧尸末日官方剧本主数据文件
// 三章：废墟之弈 / 钢铁之弈 / 黎明之弈
// 原「诺克萨森帝国」政治剧已完全替换

        const gameChapters = [
            {
                id: 1,
                number: "CHAPTER I",
                title: "废墟之弈",
                subtitle: "THE RUINS' GAMBIT",
                desc: "你是焦土市第七号避难所新晋管理者 / 前救援队员。前任管理者老陈在物资搜索中牺牲，你被推举接班。30 天内，你必须让三百二十一名幸存者撑过凛冬——食物、感染者、内乱、外部势力，每一项都可能让避难所覆灭。",
                npcs: ["linshen", "suqing", "laozhou", "xiaolu"],
                npcList: ["linshen", "suqing", "laozhou", "xiaolu"],
                locations: ["shelter-interior", "shelter-perimeter", "ruins-commerce", "shelter-east-street", "west-wall", "medical-station"],
                openingScene: `地下停车场避难所的空气是潮的，潮到能闻见铁锈与消毒水搅在一起的腥味。头顶那台拼装发电机的嗡鸣从未停过，像一头困在铁皮壳里的老兽。你靠在指挥室的折叠床上，对讲机搁在胸口，沙沙的杂音里偶尔蹦出半句人话——你分不清是巡逻队的呼号，还是自己的耳鸣。

昨晚那场吵到凌晨的全体会议像一场没醒的梦。三百多人把你推到了「管理者」的位置上，可你到现在还没完全接住这个身份。前任老陈一周前带队去废墟商业区搜抗生素，没回来。对讲机里还留着老陈最后那段通讯，你没敢再听第二遍。

通风管道里传来一阵窸窣，小鹿钻了出来，脸上还蹭着灰：「队长，西围墙外有啃食者在聚集，至少四十只。」她喘着气，把一张手绘的草图塞进你手里。

那是你接任后的第一个信号。`,
                worldContext: ["末世方舟", "丧尸", "避难所", "啃食者", "枯萎病", "物资搜索", "凛冬", "焦土市"],
                metadata: { title: "废墟之弈", subtitle: "THE RUINS' GAMBIT", author: "末世方舟官方剧本", description: "你是焦土市第七号避难所新晋管理者 / 前救援队员。前任管理者老陈在物资搜索中牺牲，你被推举接班。30 天内，你必须让三百二十一名幸存者撑过凛冬——食物、感染者、内乱、外部势力，每一项都可能让避难所覆灭。", tags: ["末日", "生存", "策略", "丧尸"], coverImage: "images/scenes/doomsday/shelter-7.png", isBuiltIn: true },
                playerName: "第七号避难所管理者",
                playerTitle: "避难所新晋管理者 / 前救援队员",
                playerDesc: `焦土市第七号避难所新晋管理者，前救援队员。前任管理者老陈在一周前的物资搜索中牺牲，你被三百多名幸存者推举接班。你接过对讲机、半本账簿和一张焦土市地图，必须在凛冬降临前的 30 天内让避难所活下去。默认性格：务实、有责任感、警惕外部、对幸存者有怜悯但不天真。

【AI叙事指令】本路线核心目标为 30 天内稳定第七号避难所——储备足够食物、击退或安抚大规模感染者围攻、解决内部派系斗争、与至少一个外部势力建立稳定关系。请根据玩家输入动态生成剧情分支（物资搜索、围墙加固、外部结盟、内乱调解、感染者防御、撤离决策等）。同一NPC在不同局势与关系值下应给出不同回应。NPC 称呼玩家时优先使用玩家输入的名称，「队长」作为口头称呼备用，避免使用「管理者」等身份头衔称呼玩家。NPC 开场白不再向玩家解释世界观，而是直接进入行动与对话。每回合/阶段根据剩余天数、关键状态变量触发事件。信息呈现方式：以对讲机通讯、避难所账簿、巡逻日志、居民请愿书和旁白形式推进剧情。

【AI需跟踪状态】人口、食物库存（天）、水库存（天）、弹药库存、感染者威胁度、内部团结度、对外关系、剩余天数（至凛冬）、士气、方舟接触度。

【事件系统】
时间线事件（按距凛冬剩余天数触发）：
- D-28：西围墙加固。调派人力加固 / 主动出击驱散 / 撤离西部居民。
- D-24：老陈的账簿。苏晴提议搜索老陈遗体所在地取回账簿。
- D-21：神罚派传教士。神父派人来传教，提出"以信仰换物资"。
- D-18：医疗站库存告急。林深汇报抗生素还能撑 7 天。
- D-14：鸽派与鹰派。内部因"是否接纳新幸存者"分裂。
- D-10：老周的撤离提议。老周私下提议放弃避难所南撤港口。
- D-7：神秘信号。小鹿截获加密信号，疑似方舟。
- D-5：军火库商队。东边军阀派人"以弹药换粮食"。
- D-3：大规模围攻预警。小鹿侦察到百只以上啃食者集结。
- D-2：苏晴的告白。苏晴深夜找你说出心事。
- D-1：凛冬前夜。暴风雪预警，气温骤降。
- D-0：凛冬降临，根据累计变量触发终局。

阈值事件（变量达到阈值触发）：
- 食物库存<7 天：饥荒蔓延。
- 水库存<5 天：渴死危机。
- 弹药库存<10：弹药耗尽。
- 感染者威胁度>80：变异体围攻。
- 内部团结度<30：内乱爆发。
- 士气<20：民心崩溃。
- 对外关系<20：被孤立。
- 人口>500：人满为患。

随机事件（每阶段概率触发 0-2 个）：
1. 物资搜索队归来；2. 外部幸存者求救；3. 变异体进化报告；4. 教会难民投奔；5. 军阀勒索保护费；6. 内部偷窃事件；7. 神秘信号再次出现；8. 方舟使者接触。

终局事件（daysRemaining<=0 触发）：
- 团结度>60 且食物>30 天：凛冬之灯（开明结局）。
- 团结度<30 且感染者威胁>80：陷落之夜（毁灭结局）。
- 对外关系>50 且与军阀合作：铁笼之约（灰色结局）。
- 方舟接触度>50：方舟之外（神秘结局）。

语言风格需符合末世丧尸末日基调：物资压力、人性灰色、生存至上，但仍有微光。`,
                stateVars: [
                    { key: "population", label: "人口", initialValue: 321, min: 0, max: 1000 },
                    { key: "foodDays", label: "食物库存（天）", initialValue: 22, min: 0, max: 90 },
                    { key: "waterDays", label: "水库存（天）", initialValue: 18, min: 0, max: 90 },
                    { key: "ammo", label: "弹药库存", initialValue: 240, min: 0, max: 2000 },
                    { key: "infectionThreat", label: "感染者威胁度", initialValue: 45, min: 0, max: 100 },
                    { key: "unity", label: "内部团结度", initialValue: 60, min: 0, max: 100 },
                    { key: "externalRelation", label: "对外关系", initialValue: 40, min: 0, max: 100 },
                    { key: "daysRemaining", label: "剩余天数（至凛冬）", initialValue: 30, min: 0, max: 30 },
                    { key: "morale", label: "士气", initialValue: 55, min: 0, max: 100 },
                    { key: "arkContact", label: "方舟接触度", initialValue: 0, min: 0, max: 100 }
                ],
                events: {
                    timelineEvents: [
                        {
                            trigger: { daysRemaining: 28 },
                            eventName: "西围墙加固",
                            description: "小鹿从西围墙侦察哨跑回来，气喘吁吁：啃食者聚集规模从四十只涨到七十只，且开始有了「试探性冲撞」。西围墙由废弃集装箱和水泥块堆成，扛不住持续冲击。林深说：「加固围墙至少要十二人干两天。」苏晴反驳：「出去搜索也缺人。」老周在角落擦枪，没说话。",
                            choices: [
                                { text: "调派人力全力加固围墙", impact: "population-0, foodDays-2, infectionThreat-15, morale+5" },
                                { text: "主动出击驱散啃食者群", impact: "ammo-40, infectionThreat-20, population-3, morale+10" },
                                { text: "撤离西部居民，收缩防线", impact: "unity-10, infectionThreat-5, morale-10" }
                            ]
                        },
                        {
                            trigger: { daysRemaining: 24 },
                            eventName: "老陈的账簿",
                            description: "苏晴深夜敲开你的门，递上一张地图：「老陈出事那天，他带着半本账簿——上面记着军火库的暗道、神罚派的水井位置、还有一笔」南边港口有船「的备注。我想带人回去取。」她眼圈发红，「我知道那条路危险，但账簿不能丢。」林深反对：「为了一本账赔上人命不值。」老周沉默。",
                            choices: [
                                { text: "同意并亲自陪同前往", impact: "suqing+15, unity+10, infectionThreat+5, population-1(风险)" },
                                { text: "派苏晴带队前往，你留守", impact: "suqing+5, foodDays+3, population-2(风险)" },
                                { text: "拒绝，保全活人优先", impact: "suqing-15, unity-5, morale+5(安全)" }
                            ]
                        },
                        {
                            trigger: { daysRemaining: 21 },
                            eventName: "神罚派传教士",
                            description: "三个穿黑袍的人出现在避难区东街，为首的是个喉结上有刀疤的中年男人，自称「神罚派兄弟」。他递上一袋玉米面：「我们神父说，信仰可以换粮食。让你们的人来圣殿听一次布道，每户五斤玉米面。」小鹿偷偷告诉你，她看见黑袍下露出十字架形状的刺青。林深皱眉：「这是趁火打劫。」老周冷笑：「信仰比子弹便宜。」",
                            choices: [
                                { text: "接受传教士入驻，换取物资", impact: "foodDays+5, morale-5, externalRelation+10, unity-5" },
                                { text: "礼貌谢绝，保持独立", impact: "externalRelation+5, unity+5, foodDays+0" },
                                { text: "驱逐并没收其物资", impact: "foodDays+3, externalRelation-20, unity+10, morale+5" }
                            ]
                        },
                        {
                            trigger: { daysRemaining: 18 },
                            eventName: "医疗站库存告急",
                            description: "林深把最后一排抗生素推到你面前，玻璃瓶碰出脆响：「七天的量。再过一周，第一个感染的居民就只能靠酒精和祈祷。」他翻开工伤记录：「上周搜索队带回来两个重伤员，一个截肢，一个还烧着。」苏晴提议再派队去废墟商业区，老周摇头：「那条路现在啃食者扎堆。」",
                            choices: [
                                { text: "派苏晴队冒险去废墟商业区搜索", impact: "population-2(风险), foodDays+2, ammo-20, 医疗库存+大量" },
                                { text: "向神罚派求购药品", impact: "externalRelation+5, foodDays-3, 医疗库存+中量" },
                                { text: "削减配给，节省麻药", impact: "morale-15, unity-10, 医疗库存+7天" }
                            ]
                        },
                        {
                            trigger: { daysRemaining: 14 },
                            eventName: "鸽派与鹰派",
                            description: "避难所大堂吵成了菜市场。一群人围着苏晴喊「开门救人」，另一群人挤到林深身边举着「先保自己人」的纸板。东街来了十七个幸存者，其中五个是孩子，但他们也带着一张要吃饭的嘴。苏晴说：「今天不救，明天我们就是被关在门外的人。」林深冷冷回：「今天救了，下个月我们自己饿死。」",
                            choices: [
                                { text: "全面接纳新幸存者", impact: "population+17, foodDays-4, unity+10, morale+5" },
                                { text: "拒绝接纳，关上铁门", impact: "population+0, foodDays+0, unity-15, morale-10" },
                                { text: "设限额——只收孩子与伤员", impact: "population+7, foodDays-2, unity+5, morale+5" }
                            ]
                        },
                        {
                            trigger: { daysRemaining: 10 },
                            eventName: "老周的撤离提议",
                            description: "老周在凌晨三点把你叫到通风井边，烟头一明一灭：「队长，我跟你说句掏心窝的。这地方守不住。围攻只是时间问题，食物最多撑到下个月。」他压低声音：「南边港口有船的传言不是空穴来风。我侦察过，沿岸四十公里有一处码头，能装百来号人。」他停顿，「老陈也想过这条路。」",
                            choices: [
                                { text: "同意南撤，启动撤离计划", impact: "unity-15, morale-10, 开启逃亡分支" },
                                { text: "拒绝，第七号避难所不走", impact: "laozhou+5, unity+10, morale+5" },
                                { text: "暂缓讨论，先观察局势", impact: "laozhou-5, unity+0, morale-5" }
                            ]
                        },
                        {
                            trigger: { daysRemaining: 7 },
                            eventName: "神秘信号",
                            description: "小鹿抱着一台改装过的对讲机冲进来：「队长！我截到了一段加密信号！」她按下播放键，杂音里断断续续地冒出女声：「……方舟……代号……第七区……幸存者……请回应……」林深脸色一变：「方舟。灾前就传言他们有解药。」苏晴警惕：「万一是陷阱？军阀也用军用电台。」老周盯着地图：「信号来自北边山脉。」",
                            choices: [
                                { text: "公开回应，表明身份", impact: "arkContact+30, externalRelation+10, infectionThreat+5(暴露风险)" },
                                { text: "秘密回应，谨慎接触", impact: "arkContact+20, externalRelation+0" },
                                { text: "忽略信号，避免暴露位置", impact: "arkContact-10, infectionThreat-5, morale+5" }
                            ]
                        },
                        {
                            trigger: { daysRemaining: 5 },
                            eventName: "军火库商队",
                            description: "三辆改装皮卡停在避难区东街外，车上跳下十几个穿迷彩、挎自动步枪的人。为首的是个戴墨镜的胖子，扔下一箱 5.56mm 子弹：「铁牙的朋友。听说你们这儿缺弹药。」他咧嘴笑，露出一颗金牙，「我们长官说，拿十箱罐头换这一箱子弹，公平吧？」老周咬牙：「这是趁火打劫。」苏晴冷静：「但我们没得选。」",
                            choices: [
                                { text: "同意交易，换取弹药", impact: "ammo+200, foodDays-8, externalRelation-5" },
                                { text: "拒绝交易并设伏抢夺", impact: "ammo+300(风险), population-5(风险), externalRelation-30, unity-10" },
                                { text: "讨价还价，争取更公平条件", impact: "ammo+150, foodDays-5, externalRelation+5" }
                            ]
                        },
                        {
                            trigger: { daysRemaining: 3 },
                            eventName: "大规模围攻预警",
                            description: "小鹿从西围墙连滚带爬下来，脸都白了：「队长……至少一百二十只，里面有三只奔跑者，还有一只……我没看清楚，但有两米多高。」林深立刻翻开医疗箱：「暴君级。」老周抓起对讲机：「我们最多撑两小时。」苏晴看向你：「求援，还是死守？」地图上，方舟、军阀、神罚派三个名字像三把刀。",
                            choices: [
                                { text: "向方舟求援（需 arkContact>20）", impact: "arkContact+30, 开启方舟收编分支" },
                                { text: "向铁牙军阀求援", impact: "externalRelation+20, 开启军阀附庸分支, foodDays-10" },
                                { text: "自行防御，全员上墙", impact: "ammo-100, population-15(风险), morale+20, unity+15" },
                                { text: "撤离避难所，南撤港口", impact: "population-30(撤离损失), 开启流亡分支" }
                            ]
                        },
                        {
                            trigger: { daysRemaining: 2 },
                            eventName: "苏晴的告白",
                            description: "苏晴深夜坐在发电机房外的台阶上，手里捏着老陈的一张照片。她没看你，声音哑得不像她：「老陈和我……不只是同事。」她停了很久，「他出事那天，本该是我带队。他说我累了，让我休息。」她终于抬头，眼眶通红，「队长，我不知道还能撑多久。但我知道，老陈他选你接班，是因为你比我们都强。我相信他，所以也信你。」",
                            choices: [
                                { text: "倾听并承诺会带大家活下去", impact: "suqing+20, unity+10, morale+10" },
                                { text: "安抚她，但保持管理者距离", impact: "suqing+10, unity+5, morale+5" },
                                { text: "转移话题，谈明天的部署", impact: "suqing-10, unity-5" }
                            ]
                        },
                        {
                            trigger: { daysRemaining: 1 },
                            eventName: "凛冬前夜",
                            description: "气象台早就废了，但收音机里偶尔还能收到邻省的自动广播。今晚的广播只有一个词：「暴雪。」气温从零上五度骤降到零下十八度，避难所的发电机开始咳血。林深说：「燃油只够烧两天。如果今晚冻死人，士气就完了。」老周建议：「集中所有人到地下二层，挤一挤。」小鹿报告：「西围墙的啃食者散了一些，但暴君还在。」",
                            choices: [
                                { text: "全力加固供暖，烧掉备用木料", impact: "foodDays-1, morale+15, unity+5" },
                                { text: "集中居民到地下二层", impact: "unity-5, morale-5, population+0(防冻)" },
                                { text: "派人冒险抢购燃油", impact: "population-2(风险), ammo-20, morale+10" }
                            ]
                        },
                        {
                            trigger: { daysRemaining: 0 },
                            eventName: "凛冬降临",
                            description: "雪在凌晨开始下。第一片落在西围墙上时，啃食者的低吼被风雪盖过。第七号避难所的三百多双眼睛望着你，等你说出那句话：「我们撑过去了。」或者——「对不起。」",
                            choices: [
                                { text: "根据累计状态变量触发终局事件", impact: "终局判定" }
                            ]
                        }
                    ],
                    thresholdEvents: [
                        {
                            trigger: { foodDays: "<7" },
                            eventName: "饥荒蔓延",
                            description: "林深递上配给表：「再过五天，库存就见底了。」大堂里有人开始偷藏食物，孩子半夜哭。苏晴建议「出去抢」，老周建议「再削配给」，小鹿报告东街有人开始啃树皮。",
                            choices: [
                                { text: "组织高风险搜索队外出觅食", impact: "population-3(风险), foodDays+10, ammo-30" },
                                { text: "再削减配给，每日一顿", impact: "morale-20, unity-15, foodDays+5" },
                                { text: "抢劫其他幸存者据点", impact: "foodDays+8, externalRelation-25, unity-10, population-2" }
                            ]
                        },
                        {
                            trigger: { waterDays: "<5" },
                            eventName: "渴死危机",
                            description: "净水系统的滤芯堵了，最后一桶水被三个家庭同时抢。林深说：「再这样下去，三天内会有人脱水死亡。」苏晴盯着地图：「北边净水站在神罚派手里。」老周冷笑：「要么跪着求，要么抢。」",
                            choices: [
                                { text: "派人去神罚派净水站求购", impact: "foodDays-3, waterDays+10, externalRelation+5" },
                                { text: "向神罚派纳贡换取饮水", impact: "foodDays-6, waterDays+15, externalRelation+10, unity-10" },
                                { text: "蒸馏污水，全员节水", impact: "morale-15, waterDays+5, unity-5" }
                            ]
                        },
                        {
                            trigger: { ammo: "<10" },
                            eventName: "弹药耗尽",
                            description: "老周把空弹匣重重拍在桌上：「打不了仗了。」巡逻队只能配三发子弹，围墙上的人开始用钢管和菜刀。林深说：「再发生一次冲击，我们就完了。」苏晴盯着军火库方向：「东边的铁牙……」小鹿小声：「我能在废墟里找点零件，做土制炸弹。」",
                            choices: [
                                { text: "让小鹿带人制作土制武器", impact: "ammo+30(土制), morale+5, population-1(事故风险)" },
                                { text: "向军火库军阀高价求购", impact: "foodDays-5, ammo+100, externalRelation-5" },
                                { text: "节约巡逻，转为冷兵器防御", impact: "infectionThreat+10, ammo+5, morale-10" }
                            ]
                        },
                        {
                            trigger: { infectionThreat: ">80" },
                            eventName: "变异体围攻",
                            description: "西围墙的啃食者从一百涨到两百，里面至少五只奔跑者，一只暴君。老周说：「这不是围攻，是迁徙。」林深翻开医书：「暴君角质化皮肤，普通子弹打不穿。」苏晴握紧枪：「要么火，要么逃。」",
                            choices: [
                                { text: "全员上墙死守，火攻", impact: "ammo-80, foodDays-2, population-10(风险), morale+15" },
                                { text: "突围撤离避难所", impact: "population-30, 开启流亡分支" },
                                { text: "向最近的军阀或方舟求援", impact: "externalRelation+15, 开启附庸/收编分支" }
                            ]
                        },
                        {
                            trigger: { unity: "<30" },
                            eventName: "内乱爆发",
                            description: "半夜，避难所大堂砸了。一群人围着苏晴喊「投降派」，另一群人把林深推倒在地。老周抓着枪站在你身后：「队长，下命令吧，再不动手就失控了。」小鹿哭着拽你衣角：「队长，他们要打起来了！」",
                            choices: [
                                { text: "镇压挑头者，处决首恶", impact: "unity+20, morale-15, population-2" },
                                { text: "召开全体会议，公开辩论", impact: "unity+10, morale+5, foodDays-1(停工)" },
                                { text: "分化拉拢，私下处理", impact: "unity+15, externalRelation-5" }
                            ]
                        },
                        {
                            trigger: { morale: "<20" },
                            eventName: "民心崩溃",
                            description: "巡逻队昨晚跑了三个人，把武器也带走了。大堂里有人开始传「第七号要完了」的谣言，孩子不再笑。林深说：「再这样下去，不用啃食者来，我们自己就散了。」苏晴建议「杀一儆百」，老周摇头「那只会更糟」。",
                            choices: [
                                { text: "处决逃兵立威", impact: "morale+15, unity-10, population-1" },
                                { text: "召开大会，你亲自演讲", impact: "morale+15, unity+10, foodDays-1" },
                                { text: "增加配给，振奋人心", impact: "morale+20, foodDays-4, unity+5" }
                            ]
                        },
                        {
                            trigger: { externalRelation: "<20" },
                            eventName: "被孤立",
                            description: "连续三个外部商队绕开第七号避难所走。东街传言「第七号快完了，别和他们扯上关系」。林深说：「我们成了废土上的孤岛。」苏晴建议主动派使者，老周建议「先纳贡，再图后计」。",
                            choices: [
                                { text: "派使者去铁牙军阀示好", impact: "externalRelation+15, foodDays-3, unity-5" },
                                { text: "向神罚派纳贡", impact: "externalRelation+15, foodDays-4, unity-10" },
                                { text: "偷袭邻近小据点立威", impact: "externalRelation-10, foodDays+5, unity+5, population-1" }
                            ]
                        },
                        {
                            trigger: { population: ">500" },
                            eventName: "人满为患",
                            description: "避难所的每个角落都睡满了人，空气浑浊得让人头疼。林深翻开卫生日志：「再这样挤下去，一场流感就能死五十人。」苏晴建议分流，老周建议扩建。小鹿报告东街还有人在排队要进。",
                            choices: [
                                { text: "限制生育与新人进入", impact: "unity-5, morale-5, population+0" },
                                { text: "组织人力扩建避难所", impact: "foodDays-3, population+0, unity+10, ammo-10" },
                                { text: "分流人口到外部据点", impact: "population-100, externalRelation+10, foodDays+3" }
                            ]
                        }
                    ],
                    randomEvents: [
                        {
                            eventName: "物资搜索队归来",
                            description: "对讲机里传来苏晴的声音：「队长，我们回来了。」她声音疲惫但带着一丝兴奋：「这次大丰收——二十箱罐头，五袋面粉，还有一台太阳能板。」她停顿，「……但死了两个人。」",
                            choices: [
                                { text: "隆重安葬阵亡者", impact: "morale+10, unity+5, foodDays+15" },
                                { text: "简化仪式，重点放在物资", impact: "morale-5, foodDays+15" },
                                { text: "私下抚恤家属", impact: "morale+5, unity+5, foodDays+15" }
                            ],
                            probability: 0.25
                        },
                        {
                            eventName: "外部幸存者求救",
                            description: "清晨，铁门外传来孩子的哭声。一个妇女抱着婴儿，身后跟着两个十岁左右的孩子，全都瘦得脱相。她跪下：「求求你们……我丈夫被咬了，我逃出来了……」林深检查婴儿：「没感染。」苏晴犹豫：「我们也没多余的粮食。」",
                            choices: [
                                { text: "全部接纳", impact: "population+4, foodDays-2, unity+5, morale+5" },
                                { text: "只接孩子，拒绝母亲", impact: "population+2, foodDays-1, unity-10, morale-10" },
                                { text: "全部拒绝", impact: "population+0, foodDays+0, unity-15, morale-15" }
                            ],
                            probability: 0.2
                        },
                        {
                            eventName: "变异体进化报告",
                            description: "小鹿从通风井爬回来，脸色发白：「队长，西边的啃食者变了。有几只……能跑了。比成年人还快。」林深翻书：「奔跑者。肌肉变异，传染性更强。」老周握紧枪：「普通围攻变屠杀。」",
                            choices: [
                                { text: "升级警戒，全员换实弹", impact: "ammo-30, infectionThreat+10, morale-5" },
                                { text: "派苏晴队猎杀奔跑者", impact: "population-2, ammo-40, infectionThreat-10" },
                                { text: "保持观察，暂不动手", impact: "infectionThreat+15, morale-10" }
                            ],
                            probability: 0.15
                        },
                        {
                            eventName: "教会难民投奔",
                            description: "五个穿破烂黑袍的人跪在避难所门口，为首的少年说：「我们是从神罚派逃出来的……他们要把我妹妹献祭给啃食者。」少年身后躲着一个发抖的女孩。林深皱眉：「神罚派的人？」老周冷笑：「也未必全是疯子。」",
                            choices: [
                                { text: "接纳并保护他们", impact: "population+5, externalRelation-15, unity+5" },
                                { text: "接纳但隔离观察", impact: "population+5, foodDays-1, morale-5" },
                                { text: "送回神罚派换取好感", impact: "externalRelation+15, unity-20, morale-15" }
                            ],
                            probability: 0.1
                        },
                        {
                            eventName: "军阀勒索",
                            description: "三辆摩托车停在避难所外，骑手扔下一张纸条：「铁牙老大说了，第七号每月交二十箱罐头，不然别怪我们不客气。」苏晴捏碎纸条：「这是勒索。」老周冷静：「铁牙和血手正打仗，不敢真动我们。」",
                            choices: [
                                { text: "按时纳贡，花钱买平安", impact: "foodDays-8, externalRelation+10, unity-5" },
                                { text: "拒绝并加固防御", impact: "externalRelation-15, ammo-20, morale+10" },
                                { text: "讨价还价，争取延期", impact: "foodDays-4, externalRelation+0, unity-5" }
                            ],
                            probability: 0.15
                        },
                        {
                            eventName: "内部偷窃事件",
                            description: "夜里，配给仓库报警。林深抓住一个偷藏罐头的男人——是老陈的堂弟。他跪在地上哭：「我孩子三天没吃饱了……」围观的居民有的愤怒，有的同情。苏晴建议「杀一儆百」，老周摇头「老陈刚死，别让活人寒心」。",
                            choices: [
                                { text: "公开处刑，立规矩", impact: "unity+10, morale-15, population-1" },
                                { text: "私下警告，退还物资", impact: "unity-5, morale+5, foodDays+1" },
                                { text: "剥夺配给，驱逐出避难所", impact: "unity+5, morale-10, population-1" }
                            ],
                            probability: 0.2
                        },
                        {
                            eventName: "神秘信号再次出现",
                            description: "对讲机又响了。这次信号更强，女声清晰：「第七号避难所，我们观察你们很久了。方舟愿意提供抗生素与净水滤芯，作为交换，我们需要一名……志愿者。」林深脸色发白：「他们要什么志愿者？」老周冷笑：「没有免费的午餐。」",
                            choices: [
                                { text: "同意，派一名志愿者", impact: "arkContact+25, population-1, 医疗库存+大量" },
                                { text: "询问细节再决定", impact: "arkContact+10, morale-5" },
                                { text: "拒绝并切断信号", impact: "arkContact-15, morale+5" }
                            ],
                            probability: 0.1
                        },
                        {
                            eventName: "方舟使者接触",
                            description: "一个穿白色防护服的人出现在避难区东街，没带武器，手里举着一面绘有「方舟」徽记的旗帜。他声音平静：「我代表方舟。我们想和第七号避难所谈谈合作。」小鹿偷瞄他的装备：「队长，他腰上的对讲机比我们整个避难所都先进。」",
                            choices: [
                                { text: "邀请使者入内详谈", impact: "arkContact+30, externalRelation+10, morale+5" },
                                { text: "在门外公开交谈", impact: "arkContact+15, unity+5" },
                                { text: "拒绝接触，让他离开", impact: "arkContact-20, morale+5" }
                            ],
                            probability: 0.08
                        }
                    ],
                    endingEvents: [
                        {
                            trigger: { unity: ">60", foodDays: ">30" },
                            eventName: "凛冬之灯",
                            description: "雪在第三十一天停了。第七号避难所的铁门推开时，三百多人挤在大堂里，火炉烧得通红。林深把最后的抗生素塞进药柜，苏晴带搜索队带回一车冻硬的罐头，老周站在围墙上抽烟，第一次笑了一下。小鹿爬上屋顶，朝雪地大喊：「我们活下来啦！」——你不知道春天会不会来，但你知道，第七号避难所活过了第一个冬天。这是末世里最奢侈的事。"
                        },
                        {
                            trigger: { unity: "<30", infectionThreat: ">80" },
                            eventName: "陷落之夜",
                            description: "暴君在西围墙撞开一个洞时，你正在大堂试图劝阻两派居民内斗。第一只啃食者冲进来的瞬间，所有人都在尖叫。林深抓起手术刀挡在病床前，苏晴打空了最后一个弹匣，老周拉响炸药与暴君同归于尽。你抱着小鹿从通风井爬出来时，避难所已经是一片火海。回头看，三百二十一个名字，今夜之后只剩你和几个逃出来的人。第七号避难所，没了。"
                        },
                        {
                            trigger: { externalRelation: ">50", warlordAlly: true },
                            eventName: "铁笼之约",
                            description: "铁牙军阀的装甲车停在西围墙外时，你知道第七号避难所的「独立」结束了。胖指挥官扔下一袋弹药和一份协议：「从今天起，第七号是铁牙的下属单位。每月纳贡，听从调遣，战时出兵。」你签了字。林深把医疗站交给了军阀的军医，苏晴成了军阀的搜索队长，老周默默收起了他的特种兵徽章。小鹿问你：「队长，我们还算活着吗？」你没能回答。"
                        },
                        {
                            trigger: { arkContact: ">50" },
                            eventName: "方舟之外",
                            description: "方舟的直升机降落在避难所屋顶时，三百多人仰着头看，像在看神迹。穿白防护服的使者递给你一张芯片：「欢迎加入方舟外围基地网络。第七号避难所更名为'方舟第七号前哨站'，你们将获得物资、技术与情报支持。」他停顿，「作为交换，方舟有任务时，你们必须执行。」林深低声：「我们成了他们的手。」苏晴冷静：「但活下去的手。」——你接过芯片。第七号避难所活着，只是不再是第七号避难所了。"
                        }
                    ]
                }
            },
            {
                id: 2,
                number: "CHAPTER II",
                title: "钢铁之弈",
                subtitle: "THE IRON GAMBIT",
                desc: "你是焦土市「铁牙」军阀组织头目 / 前部队军官。灾初你率一个排突围，三个月内建起焦土市最大的武装力量之一。血手头目「屠夫」七天后将发动总攻，你必须击退他——并决定铁牙会成为怎样的势力。",
                npcs: ["lie", "lingshuang", "alpha", "mila"],
                npcList: ["lie", "lingshuang", "alpha", "mila"],
                locations: ["irontooth-hq", "arsenal-perimeter", "water-station", "power-plant", "bloodhand-outpost", "infection-edge"],
                openingScene: `指挥中心里弥漫着没散尽的硝烟味，墙上那张焦土市全图被红色图钉扎得密密麻麻——血手的据点，像一片正在蔓延的红斑。远处零星的炮声贴着窗玻璃滚过来，楼下的装甲车引擎低吼着，怠速不肯熄火。

你站在地图前，手指搭在「西郊」那个位置。七天前，血手头目「屠夫」通过广播向全焦土市下了战书：「七天后，焦土市只能有一个王。」血手的人比你们多一倍，但你心里清楚——他们只有一半人会换弹夹。

门被一脚踹开，烈带着一身硝烟冲进来，把侦察照片拍在地图上：「头儿，前哨回报，血手在西郊集结了，估摸两个营。」

他没有再说下去。他知道你不需要他多说。`,
                worldContext: ["末世方舟", "军阀", "血手", "铁牙", "焦土市", "军火库", "生化武器", "方舟"],
                metadata: { title: "钢铁之弈", subtitle: "THE IRON GAMBIT", author: "末世方舟官方剧本", description: "你是焦土市「铁牙」军阀组织头目 / 前部队军官。血手头目「屠夫」七天后将发动总攻，你必须击退他——并决定铁牙会成为怎样的势力。", tags: ["末日", "战争", "策略", "军阀"], coverImage: "images/scenes/doomsday/irontooth-hq.png", isBuiltIn: true },
                playerName: "铁牙头目",
                playerTitle: "铁牙军阀头目 / 前部队军官",
                playerDesc: `焦土市"铁牙"军阀组织头目，前部队军官。灾初你率一个排突围，沿途收编溃兵与流民，三个月内建起焦土市最大的武装力量之一。血手头目"屠夫"七天后将发动总攻，你必须击退他，并决定铁牙会成为焦土市的新王、联合政府一员，还是流亡残部。默认性格：果断、务实、对战友有情义、对敌人冷酷、有自己的人性底线但不轻易表露。

【AI叙事指令】本路线核心目标为 7 天内击退血手总攻，并尽可能扩大势力范围——可与方舟建立联系获取黑科技、与神罚派谈判避免两线作战、与第七号避难所等中立势力结盟、主动出击血手老巢斩首、研发生化武器（牺牲道德换战力）。请根据玩家输入动态生成剧情分支（军事部署、暗杀渗透、外交联合、生化实验、民众动员等）。同一NPC在不同局势与关系值下应给出不同回应。NPC 称呼玩家时优先使用玩家输入的名称，「头儿」「长官」作为口头称呼备用，避免使用「铁牙」等身份头衔称呼玩家。NPC 以军事化语言汇报，副官用"头儿"、情报官用"长官"称呼玩家。信息呈现方式：以作战地图、战报、情报简报、对讲机指令和旁白形式推进。

【AI需跟踪状态】军队规模、武器装备、领地控制、敌对势力强度、民众支持、剩余天数（至总攻日）、士气、道德值。

【事件系统】
时间线事件（按距总攻剩余天数触发）：
- D-7：战前夜·烈的主张。烈提议先发制人突袭血手前哨。
- D-6：凌霜的渗透计划。收买血手二把手"断指"。
- D-5：阿尔法的活体请求。索要三个活体感染者做实验。
- D-5：第七号避难所求援。第一章玩家若存活会来求援。
- D-4：米拉的谈判。神罚派提出结盟条件。
- D-3：烈的冲锋计划。烈提议主动突袭血手营地。
- D-3：发电厂争夺战。血手抢占发电厂。
- D-2：方舟使者。方舟派来接触者，提供黑科技装备。
- D-2：凌霜的暗杀方案。凌霜提议夜袭斩首屠夫。
- D-1：民众暴动。焦土市西部民众因兵灾爆发暴动。
- D-1：阿尔法的改良病毒。阿尔法报告改良病毒已就绪。
- D-0：总攻日，根据累计变量触发终局。

阈值事件：军队规模<100→兵力枯竭；武器装备<30→装备短缺；领地控制<40→领地沦陷；敌对势力强度>80→血手凶猛；民众支持<20→民心尽失；士气<30→军心涣散；道德值<20→人性沦丧；军队规模>400→军阀膨胀。

随机事件：血手斥候被捕；神罚派密使；流亡科学家投奔；装甲车故障；凌霜情报失误；第七号避难所物资交易；方舟无人机侦察；阿尔法实验室事故。

终局事件（daysRemaining<=0 触发）：
- 守住+反攻+道德>50：焦土新王。
- 守住+与神罚派结盟：联合政府。
- 失守+撤退+军队>100：流亡铁牙。
- 失守+使用生化武器：焦土废墟。

语言风格需符合末世军阀基调：军事化短句、暴力与权谋并存、人性灰色，但战友之间仍有血肉之情。`,
                stateVars: [
                    { key: "armySize", label: "军队规模", initialValue: 220, min: 0, max: 1000 },
                    { key: "weaponry", label: "武器装备", initialValue: 55, min: 0, max: 100 },
                    { key: "territory", label: "领地控制", initialValue: 50, min: 0, max: 100 },
                    { key: "enemyStrength", label: "敌对势力强度", initialValue: 65, min: 0, max: 100 },
                    { key: "popularSupport", label: "民众支持", initialValue: 35, min: 0, max: 100 },
                    { key: "daysRemaining", label: "剩余天数（至总攻）", initialValue: 7, min: 0, max: 7 },
                    { key: "morale", label: "士气", initialValue: 70, min: 0, max: 100 },
                    { key: "morality", label: "道德值", initialValue: 50, min: 0, max: 100 }
                ],
                events: {
                    timelineEvents: [
                        {
                            trigger: { daysRemaining: 7 },
                            eventName: "战前夜·烈的主张",
                            description: "烈一脚踹开指挥中心的门，把一沓侦察照片拍在地图上：「头儿，先打！血手西郊集结点还没修好工事，现在冲一把能撕开他们半个营！」凌霜冷冷抬眼：「你冲过去，血手主力从南边包抄，我们全军覆没。」阿尔法在角落擦试管：「给我活体，我给你更稳的胜利。」米拉叹气：「还有时间谈判。」",
                            choices: [
                                { text: "同意烈的先发制人突袭", impact: "armySize-20, enemyStrength-15, morale+10" },
                                { text: "拒绝，坚守防御", impact: "morale-5, territory+5, lie-5" },
                                { text: "改为夜袭，小规模试探", impact: "armySize-5, enemyStrength-5, lingshuang+5" }
                            ]
                        },
                        {
                            trigger: { daysRemaining: 6 },
                            eventName: "凌霜的渗透计划",
                            description: "凌霜把一张照片推到你面前：血手二把手「断指」，本名陈三，曾是你的旧部。她声音冷静：「他对我的人暗示，可以倒戈——价码是血手控制的南郊油库。」她停顿，「也可以做双面间谍，给屠夫喂假情报。」烈骂道：「叛徒的话也信？」",
                            choices: [
                                { text: "同意收买断指", impact: "enemyStrength-20, popularSupport-5, morality-5" },
                                { text: "拒绝，不信任叛徒", impact: "morale+5, lingshuang-10" },
                                { text: "做双面间谍，喂假情报", impact: "enemyStrength-10, lingshuang+10, morality-5" }
                            ]
                        },
                        {
                            trigger: { daysRemaining: 5 },
                            eventName: "阿尔法的活体请求",
                            description: "阿尔法把三支空试管排在你面前，眼神狂热：「头儿，给我三只活体感染者——活的，脑干完整的。三天内我能做出改良版枯萎病病毒，扔进血手营地，他们自相残杀。」他停顿，「我知道这违反《生物武器公约》。但《公约》随旧政府一起死了。」米拉厉声反对：「这是反人类罪！」烈沉默。",
                            choices: [
                                { text: "同意，派搜索队抓活体", impact: "armySize-5, morality-25, 开启生化武器分支" },
                                { text: "拒绝，坚守底线", impact: "morality+15, alpha-15, mila+10" },
                                { text: "偷偷给一只，做有限实验", impact: "morality-10, alpha+5, morality-10" }
                            ]
                        },
                        {
                            trigger: { daysRemaining: 5 },
                            eventName: "第七号避难所求援",
                            description: "对讲机里传来陌生男人的声音，疲惫而急切：「铁牙头目，我是焦土市第七号避难所管理者。我们被大规模啃食者围攻，恳请援助——食物、弹药、人力，任何都行。」米拉递上情报：「第七号是中立势力，但地理位置关键，挡在我们和感染区之间。」烈皱眉：「救人？我们自己也缺人。」凌霜冷静：「失去第七号，我们就直接面对感染区。」",
                            choices: [
                                { text: "出兵救援，结盟第七号", impact: "armySize-15, popularSupport+20, territory+5" },
                                { text: "拒绝救援，保存实力", impact: "popularSupport-15, territory-5" },
                                { text: "提供物资援助，不出兵", impact: "weaponry-5, popularSupport+10, 开启中立分支" }
                            ]
                        },
                        {
                            trigger: { daysRemaining: 4 },
                            eventName: "米拉的谈判",
                            description: "米拉带回一个穿黄袍的神罚派「使者」。使者开口：「神父说，神罚派愿意与铁牙结盟，共同灭血手。条件——胜利后，净水站归神罚派独占，铁牙不得过问。」米拉低声：「净水站是焦土市命脉，独占意味着神罚派未来能卡住我们脖子。」烈骂：「他们趁火打劫！」凌霜冷笑：「但两面作战我们会死。」",
                            choices: [
                                { text: "接受神罚派条件", impact: "enemyStrength-30, territory-10, 开启联合政府分支" },
                                { text: "拒绝，独自对抗血手", impact: "morale+5, mila-10, enemyStrength+5" },
                                { text: "讨价还价，争取共管净水站", impact: "enemyStrength-20, mila+10, territory-5" }
                            ]
                        },
                        {
                            trigger: { daysRemaining: 3 },
                            eventName: "烈的冲锋计划",
                            description: "烈把一份作战方案摊在桌上，眼中带血：「头儿，让我带一百人冲血手主营。屠夫在营地里，斩首他，血手就散了。」凌霜立刻反对：「正面冲主营是送死。我提议夜袭，十人渗透小队就够。」阿尔法抬头：「我能在血手水源里下病毒——但需要一天时间。」米拉叹气：「我们真的要走这条路吗？」",
                            choices: [
                                { text: "同意烈的正面冲锋", impact: "armySize-40, enemyStrength-25, morality-5" },
                                { text: "采纳凌霜的夜袭斩首", impact: "armySize-10, enemyStrength-30, lingshuang+15" },
                                { text: "改为阿尔法的病毒攻击", impact: "enemyStrength-40, morality-30, popularSupport-15" }
                            ]
                        },
                        {
                            trigger: { daysRemaining: 3 },
                            eventName: "发电厂争夺战",
                            description: "前哨急报：血手一支分队突袭发电厂，守军只剩三十人，弹药告急。烈骂：「发电厂丢了，整个西郊就黑了！」凌霜冷静：「血手主力还在西郊集结，这是佯攻。」米拉建议：「让出发电厂，保主力。」阿尔法抬头：「没有电，实验室做不了病毒。」",
                            choices: [
                                { text: "全力救援发电厂", impact: "armySize-25, territory+10, morale+10" },
                                { text: "炸毁发电厂，谁也别想用", impact: "territory-15, popularSupport-10, enemyStrength-5" },
                                { text: "让出发电厂，保存主力", impact: "territory-20, armySize+0, morale-10" }
                            ]
                        },
                        {
                            trigger: { daysRemaining: 2 },
                            eventName: "方舟使者",
                            description: "一个穿白色外骨骼装甲的人出现在指挥中心门口——守卫竟然没拦住。他摘下头盔，是个戴单片眼镜的中年男人：「铁牙头目，我代表方舟。我们可以提供外骨骼、夜视仪、早期无人机——换战后铁牙与方舟的'合作协议'。」凌霜警惕：「什么协议？」使者微笑：「届时再谈。」阿尔法脸色发白：「方舟……他们掌握着枯萎病的核心机密。」",
                            choices: [
                                { text: "投靠方舟，全面合作", impact: "weaponry+30, 开启方舟分支, morality-5" },
                                { text: "有限合作，只要装备", impact: "weaponry+20, mila+5" },
                                { text: "拒绝方舟，保持独立", impact: "weaponry+0, morale+10, popularSupport+5" }
                            ]
                        },
                        {
                            trigger: { daysRemaining: 2 },
                            eventName: "凌霜的暗杀方案",
                            description: "凌晨三点，凌霜敲开你的门。她穿一身黑色作战服，递上一张手绘地图：「血手主营的通风井。我和烈各带五人，夜袭斩首屠夫。」她抬眼，「如果失败，我们回不来。」烈推门进来：「头儿，让我去。」凌霜冷冷：「你的莽撞会暴露整个行动。」两人对视，火花四溅。",
                            choices: [
                                { text: "同意凌霜的夜袭方案", impact: "armySize-10, enemyStrength-35, lingshuang+20" },
                                { text: "拒绝，避免冒险", impact: "morale-5, lingshuang-15, lie+5" },
                                { text: "改为绑架屠夫，逼降血手", impact: "armySize-15, enemyStrength-25, morality-10" }
                            ]
                        },
                        {
                            trigger: { daysRemaining: 1 },
                            eventName: "民众暴动",
                            description: "焦土市西部街区爆发暴动——三百多民众冲击铁牙物资站，抗议「军阀混战害死平民」。米拉急报：「他们抢了五箱罐头，烧了一辆卡车。」烈骂：「镇压！」凌霜冷静：「镇压会失尽民心。」阿尔法抬头：「驱赶到血手控制区，让他们扰乱敌人后方。」米拉叹气：「那是把平民当武器。」",
                            choices: [
                                { text: "镇压暴动，立威", impact: "popularSupport-25, morale+5, armySize-5" },
                                { text: "安抚民众，分发物资", impact: "popularSupport+20, weaponry-5, morality+5" },
                                { text: "驱赶暴民至血手区", impact: "enemyStrength+10, popularSupport-15, morality-20" }
                            ]
                        },
                        {
                            trigger: { daysRemaining: 1 },
                            eventName: "阿尔法的改良病毒",
                            description: "阿尔法捧着一支紫色试管冲进指挥中心，眼中带血丝：「头儿，成了！改良版枯萎病病毒，对人类无效，但能让啃食者狂暴化——扔进血手营地，方圆一公里内所有感染者都会冲过去。」他停顿，「但我必须警告，病毒可能变异，反噬人类。」米拉厉声：「销毁它！」烈犹豫：「如果不用，明天可能就完了。」",
                            choices: [
                                { text: "投入战场，赌一把", impact: "enemyStrength-50, morality-35, popularSupport-20" },
                                { text: "销毁病毒，守住底线", impact: "morality+25, alpha-20, mila+15" },
                                { text: "暂存观察，留作底牌", impact: "morality-5, alpha+5, 开启底牌分支" }
                            ]
                        },
                        {
                            trigger: { daysRemaining: 0 },
                            eventName: "总攻日",
                            description: "黎明。血手的战鼓从西郊传来，四百人的吼声震得玻璃发颤。烈握紧步枪，凌霜检查狙击镜，阿尔法抱着试管，米拉攥着谈判文件。你站在指挥中心的窗前，看着焦土市的天际线被硝烟染成血色。这是七天博弈的终局——也是铁牙成为什么的第一天。",
                            choices: [
                                { text: "根据累计状态变量触发终局事件", impact: "终局判定" }
                            ]
                        }
                    ],
                    thresholdEvents: [
                        {
                            trigger: { armySize: "<100" },
                            eventName: "兵力枯竭",
                            description: "烈把伤亡名单放在桌上，手在抖：「头儿，我们只剩八十多个能打的。」凌霜冷静：「再打下去就是送死。」阿尔法抬头：「我可以让感染者替我们打。」米拉建议：「收缩防线，保核心。」",
                            choices: [
                                { text: "强征焦土市青壮年入伍", impact: "armySize+50, popularSupport-25, morality-10" },
                                { text: "雇佣流民与溃兵", impact: "armySize+30, weaponry-5, morale-5" },
                                { text: "收缩防线，保核心据点", impact: "territory-15, armySize+0, morale+5" }
                            ]
                        },
                        {
                            trigger: { weaponry: "<30" },
                            eventName: "装备短缺",
                            description: "军火库告急：重机枪只剩两箱子弹，装甲车的燃油只够跑三十公里。烈骂：「这仗没法打！」凌霜递上情报：「军火库深处还有个战前秘密仓库，但被啃食者围着。」阿尔法抬头：「土制炸弹也行，给我一周。」米拉：「向神罚派求购？」",
                            choices: [
                                { text: "突袭战前秘密军火库", impact: "armySize-15, weaponry+30, morale+10" },
                                { text: "向神罚派高价求购", impact: "weaponry+20, territory-5, popularSupport-5" },
                                { text: "土制改造，自给自足", impact: "weaponry+10, armySize-5, morality-5" }
                            ]
                        },
                        {
                            trigger: { territory: "<40" },
                            eventName: "领地沦陷",
                            description: "前哨连环急报：东街失守，南郊失守，发电厂告急。凌霜展开地图：「头儿，我们只剩指挥中心和军火库两个核心点。」烈咬牙：「再退就完了。」米拉建议：「放弃外围，集中防御。」阿尔法抬头：「焦土战术——炸掉所有失去的据点。」",
                            choices: [
                                { text: "全面反攻，夺回失地", impact: "armySize-30, territory+15, morale+10" },
                                { text: "撤退至核心据点死守", impact: "territory-10, armySize+0, morale-5" },
                                { text: "焦土战术，炸毁失去据点", impact: "territory-20, enemyStrength-15, popularSupport-20" }
                            ]
                        },
                        {
                            trigger: { enemyStrength: ">80" },
                            eventName: "血手凶猛",
                            description: "凌霜的情报显示血手得到了外部增援——可能是邻市军阀，也可能是方舟的对手。敌军规模从四百涨到六百，还多了三辆改装战车。烈骂：「这仗没法打！」米拉建议议和。凌霜建议斩首。阿尔法建议生化武器。",
                            choices: [
                                { text: "求和，接受血手条件", impact: "territory-30, armySize+0, morality-5" },
                                { text: "集中兵力决战", impact: "armySize-50, enemyStrength-30, morale+15" },
                                { text: "转为游击战，骚扰敌人", impact: "territory-20, enemyStrength-10, popularSupport+5" }
                            ]
                        },
                        {
                            trigger: { popularSupport: "<20" },
                            eventName: "民心尽失",
                            description: "米拉带回一份传单：焦土市西部街区贴满了「打倒铁牙」的标语。民众开始给血手通风报信，铁牙巡逻队被暗算。烈骂：「杀一儆百！」凌霜冷静：「失民心者失天下。」阿尔法抬头：「神罚派在煽动。」",
                            choices: [
                                { text: "屠杀立威，镇压异见", impact: "popularSupport-15, morale+10, morality-30" },
                                { text: "减免税收，安抚民众", impact: "popularSupport+20, weaponry-5, territory-5" },
                                { text: "改旗易帜，重塑形象", impact: "popularSupport+15, morale-10, mila+10" }
                            ]
                        },
                        {
                            trigger: { morale: "<30" },
                            eventName: "军心涣散",
                            description: "昨夜又有十人开小差，带走了两箱弹药。烈抓回三个逃兵，跪在你面前：「头儿，怎么办？」凌霜建议处决。米拉建议赦免。阿尔法抬头：「给他们希望，否则没人会留下。」",
                            choices: [
                                { text: "处决逃兵，立军法", impact: "morale+15, armySize-3, morality-10" },
                                { text: "论功行赏，重赏敢战者", impact: "morale+20, weaponry-10, popularSupport+5" },
                                { text: "召开全军演讲，激励士气", impact: "morale+15, lie+10, mila+5" }
                            ]
                        },
                        {
                            trigger: { morality: "<20" },
                            eventName: "人性沦丧",
                            description: "阿尔法的实验室传出惨叫——他在用战俘做实验。米拉冲进来：「头儿，再这样下去，我们和血手有什么区别？」烈低头不语。凌霜冷静：「道德救不了命。」但连她也犹豫了。小鹿从第七号避难所带来的孩子问：「铁牙叔叔，你们是好人还是坏人？」",
                            choices: [
                                { text: "反思，禁止人体实验", impact: "morality+20, alpha-20, mila+15" },
                                { text: "一路黑到底，胜利至上", impact: "morality-15, enemyStrength-20, popularSupport-15" },
                                { text: "寻求神罚派赎罪", impact: "morality+10, territory-10, 开启赎罪分支" }
                            ]
                        },
                        {
                            trigger: { armySize: ">400" },
                            eventName: "军阀膨胀",
                            description: "铁牙兵力突破四百，超过血手。烈建议：「头儿，现在可以一统焦土市了！」凌霜冷静：「军队大了，粮草跟不上。」米拉建议：「建立联合政府，分享权力。」阿尔法抬头：「称王，让所有人臣服。」",
                            choices: [
                                { text: "建立联合政府，分享权力", impact: "popularSupport+25, territory+10, mila+15" },
                                { text: "自立为焦土市之王", impact: "territory+20, popularSupport-15, morality-10" },
                                { text: "让贤，推举文官管理", impact: "morale-10, popularSupport+15, mila+20" }
                            ]
                        }
                    ],
                    randomEvents: [
                        {
                            eventName: "血手斥候被捕",
                            description: "巡逻队押回一个血手斥候，从他身上搜出焦土市西部防御图。烈骂：「宰了他！」凌霜冷静：「先审问。」米拉建议：「用来交换战俘。」阿尔法抬头：「脑干还活着，可以做实验。」",
                            choices: [
                                { text: "处决斥候", impact: "morale+5, morality-5, popularSupport+5" },
                                { text: "审问后释放，传递假情报", impact: "enemyStrength-10, lingshuang+10" },
                                { text: "交换血手战俘", impact: "armySize+5, popularSupport+10, mila+5" }
                            ],
                            probability: 0.2
                        },
                        {
                            eventName: "神罚派密使",
                            description: "一个戴兜帽的青年潜入指挥中心，递上一封信：「神父说，血手是神罚，铁牙也是。但他愿意与你私下会面。」米拉警惕：「陷阱。」凌霜点头：「但我的人查过，神父确实想联铁牙灭血手。」烈骂：「和神棍合作？」",
                            choices: [
                                { text: "秘密会面神父", impact: "territory+5, mila+10, morality-5" },
                                { text: "拒绝，避免与神罚派牵扯", impact: "morale+5, mila-5" },
                                { text: "公开与神罚派结盟", impact: "popularSupport-15, enemyStrength-20" }
                            ],
                            probability: 0.15
                        },
                        {
                            eventName: "流亡科学家投奔",
                            description: "一个穿白大褂的中年人抱着铝合金箱子出现在军火库外：「我是战前生物研究所的研究员……阿尔法的同事。」他眼神恐惧，「血手要强迫我做生化武器，我逃出来了。」阿尔法冷冷：「他叫沈博士，三年前偷了我的数据。」沈博士低头：「我来赎罪。」",
                            choices: [
                                { text: "接纳沈博士，与阿尔法合作", impact: "weaponry+10, alpha+10, morality+5" },
                                { text: "审问后关押", impact: "morale+5, alpha+5" },
                                { text: "交给阿尔法处置", impact: "alpha+20, morality-15" }
                            ],
                            probability: 0.1
                        },
                        {
                            eventName: "装甲车故障",
                            description: "烈冲进指挥中心：「头儿，一号装甲车履带断了，零件要从血手控制区找！」凌霜冷静：「没有装甲车，西郊防御减半。」阿尔法抬头：「我有备用零件……在实验室废墟里。」米拉叹气：「或者向方舟求援。」",
                            choices: [
                                { text: "派突击队抢零件", impact: "armySize-10, weaponry+10, morale+10" },
                                { text: "放弃装甲车，转用卡车", impact: "weaponry-10, morale-5" },
                                { text: "向方舟求援", impact: "weaponry+15, 开启方舟分支" }
                            ],
                            probability: 0.2
                        },
                        {
                            eventName: "凌霜情报失误",
                            description: "凌霜脸色铁青：「头儿，我的人渗透血手失败，三个被捕。」她声音发抖，「屠夫可能已经知道我们的部署。」烈骂：「你的情报害死人！」米拉建议立刻调整部署。阿尔法抬头：「或者将计就计。」",
                            choices: [
                                { text: "全面调整部署", impact: "morale-10, territory-5, lingshuang-10" },
                                { text: "将计就计，设反陷阱", impact: "armySize-10, enemyStrength-15, lingshuang+10" },
                                { text: "强攻救人", impact: "armySize-20, lingshuang+15, morality+5" }
                            ],
                            probability: 0.15
                        },
                        {
                            eventName: "第七号避难所物资交易",
                            description: "对讲机传来第七号避难所管理者的声音：「铁牙头目，我们有多余的抗生素，换你们十箱罐头如何？」米拉建议：「这是结盟好机会。」凌霜冷静：「也可能是侦察。」阿尔法抬头：「抗生素对实验室很有用。」",
                            choices: [
                                { text: "公平交易，建立互信", impact: "weaponry+5, popularSupport+10, territory+5" },
                                { text: "压价，占便宜", impact: "weaponry+10, popularSupport-10" },
                                { text: "拒绝，保持距离", impact: "morale+5, popularSupport-5" }
                            ],
                            probability: 0.15
                        },
                        {
                            eventName: "方舟无人机侦察",
                            description: "凌霜击落一架小型无人机，金属外壳上印着「方舟」徽记。阿尔法检查：「这是战前军用型号，能扫描整座城市。」米拉警惕：「方舟在监视我们。」烈建议：「用无人机传假情报给方舟。」凌霜点头：「或研究其技术。」",
                            choices: [
                                { text: "研究无人机技术", impact: "weaponry+10, alpha+15, 开启方舟分支" },
                                { text: "用无人机传假情报", impact: "enemyStrength-10, lingshuang+15" },
                                { text: "归还无人机，示好方舟", impact: "morality+10, popularSupport+5" }
                            ],
                            probability: 0.1
                        },
                        {
                            eventName: "阿尔法实验室事故",
                            description: "实验室传出爆炸声，阿尔法满脸是血冲出来：「头儿，改良病毒样本泄漏！……两名助手感染了！」米拉厉声：「隔离！立刻！」凌霜拔枪：「感染者必须当场处理。」阿尔法哀求：「给我一天，我能做出解药！」",
                            choices: [
                                { text: "当场处决感染者，烧毁实验室", impact: "alpha-20, morality-10, armySize-2" },
                                { text: "给阿尔法一天做解药", impact: "armySize-5(风险), alpha+15, weaponry+10" },
                                { text: "隔离观察，等待结果", impact: "morale-10, alpha+5, morality+5" }
                            ],
                            probability: 0.1
                        }
                    ],
                    endingEvents: [
                        {
                            trigger: { defended: true, morality: ">50" },
                            eventName: "焦土新王",
                            description: "总攻日的黄昏，血手残部溃逃。烈带兵追击，凌霜在废墟中找到屠夫的尸体，米拉开始组织民众清理战场。你站在指挥中心窗前，看着焦土市的天际线第一次染上铁牙的蓝。阿尔法走过来：「头儿，我们赢了。」你点头。但你心里清楚——这场胜利的代价是二百多兄弟的命，是几座化为废墟的街区，是你半夜惊醒时眼前挥之不去的脸。铁牙成了焦土市的新王，但王冠是用骨头铸的。"
                        },
                        {
                            trigger: { defended: true, alliedShenfu: true },
                            eventName: "联合政府",
                            description: "血手被击溃的那天晚上，神罚派的使者、铁牙的代表、第七号避难所的管理者坐在同一张桌子前。米拉起草协议：「焦土市联合政府成立，三方共治。」神父的使者微笑：「愿神庇佑焦土。」烈骂骂咧咧签了字。凌霜递上情报：「血手残部已逃出焦土市。」——你没有成为唯一的王，但你避免了更多的血。这是末世里最不坏的一种结局。"
                        },
                        {
                            trigger: { lost: true, armySize: ">100" },
                            eventName: "流亡铁牙",
                            description: "总攻日的午后，铁牙指挥中心被血手攻破。你带着残余的一百二十人从地下通道撤离，烈断后中弹倒下，凌霜背着他跑了五公里。阿尔法抱着实验数据，米拉攥着地图。你们登上了一辆改装卡车，向邻市方向开去。焦土市在身后燃烧。烈在车上咽气前说：「头儿……铁牙没亡……只是换了地方。」你握紧方向盘，看着前方未知的废土。铁牙还在，只是不再是焦土市的铁牙了。"
                        },
                        {
                            trigger: { lost: true, usedBioweapon: true },
                            eventName: "焦土废墟",
                            description: "阿尔法的病毒在血手营地爆发，啃食者狂暴化冲进营地。但病毒变异了——它开始感染人类。三天内，焦土市西部街区化为死地，血手和铁牙的士兵一起变成啃食者。你站在指挥中心废墟上，看着城市被火焰和变异体吞没。阿尔法最后的话是「我错了」，然后他被自己创造的怪物撕碎。米拉死于逃亡路上，凌霜为掩护你而断后，烈死在第一波冲击中。焦土市没有王了——只有一座真正的焦土。"
                        }
                    ]
                }
            },
            {
                id: 3,
                number: "CHAPTER III",
                title: "黎明之弈",
                subtitle: "THE DAWN'S GAMBIT",
                desc: "你是方舟组织新任领袖 / 掌握末日真相者。原院长在针对方舟基地的突袭中失踪，你被推举接班，并被告知枯萎病病毒的全部真相——它是方舟的失败实验。60 天内，你必须在变异体进化到不可逆前作出终极抉择：解药、清洗、共存，还是逃亡。",
                npcs: ["yuanzhang", "lin", "shenfu", "ada"],
                npcList: ["yuanzhang", "lin", "shenfu", "ada"],
                locations: ["ark-control", "ark-lab", "isolation-room", "infection-depth", "divine-punishment-temple", "harbor"],
                openingScene: `方舟北方基地藏在废弃矿山地下三百米。主控室的回声总比人声慢半拍，恒温空调的低鸣压在耳膜上，红色警报灯一明一灭，把所有仪表都染成血色。隔离区的方向偶尔传来试管碰撞的脆响，像有人在反复敲一面玻璃。

你坐在主控台前，屏幕上滚动着旧院长留下的最后日志。你只看了一遍，但那句已经被你刻进脑子里——「枯萎病不是天灾，是方舟的失败实验。」院长失踪前把这句真相留给了你，连同一个 92% 完成的解药、一座冷库里的核弹头，和六十天的倒计时。你不知道该恨他，还是该谢他。

凛站在你身后，没说话，只是等你开口。

她在等你下第一个命令。`,
                worldContext: ["末世方舟", "方舟", "变异体", "枯萎病", "解药", "清洗协议", "王者", "院长"],
                metadata: { title: "黎明之弈", subtitle: "THE DAWN'S GAMBIT", author: "末世方舟官方剧本", description: "你是方舟组织新任领袖 / 掌握末日真相者。原院长在针对方舟基地的突袭中失踪，你被推举接班，并被告知枯萎病病毒的全部真相。60 天内，你必须在变异体进化到不可逆前作出终极抉择。", tags: ["末日", "科幻", "伦理", "终极抉择"], coverImage: "images/scenes/doomsday/ark-base.png", isBuiltIn: true },
                playerName: "方舟领袖",
                playerTitle: "方舟组织新任领袖 / 掌握末日真相者",
                playerDesc: `方舟组织新任领袖，原院长的副手与接班人。旧院长在一场针对方舟基地的突袭中失踪，你被推举接班，并被告知枯萎病病毒的全部真相——它是方舟的失败实验。解药原型已 92%，但最后 8% 需要王者活体；基地冷库存有核弹头；艾达说王者愿意谈判；神父知道一切。60 天内，你必须作出终极抉择：解药、清洗、共存，还是逃亡。默认性格：理性、有责任感、承受真相之重、对人类未来有信仰，但愿意为大局承受必要的恶。

【AI叙事指令】本路线核心目标为 60 天内在变异体进化到不可逆临界点（90%）前作出终极抉择——解药路线（完成解药研发并散布）、清洗路线（使用核武清洗感染区）、共存路线（与变异体王者达成协议）、逃亡路线（率方舟成员乘船前往净土）。请根据玩家输入动态生成剧情分支（科研推进、王者捕猎、与神罚派博弈、艾达对话、清洗协议抉择、方舟内部权斗等）。同一NPC在不同局势与关系值下应给出不同回应。NPC 称呼玩家时优先使用玩家输入的名称，「院长」「导师」作为口头称呼备用，避免使用「方舟」等身份头衔称呼玩家。NPC 报告后以"请院长定夺"等请示语收束。信息呈现方式：以终端日志、院长遗书、研究简报、密信、王者通讯和旁白形式推进。

【AI需跟踪状态】科研进度（0-100%）、方舟成员、人类存续指数、变异体进化度、敌对组织强度、剩余天数（至进化临界）、道德值、艾达共鸣度。

【事件系统】
时间线事件（按距进化临界剩余天数触发）：
- D-55：神父会面。神父在感染区边缘请求会面。
- D-50：院长的解药报告。院长副手汇报解药进度 92%。
- D-45：王者样本任务。派人深入感染区抓王者。
- D-40：神罚派圣战传闻。神父在信徒中煽动反对解药。
- D-35：艾达的请求。艾达请求与王者直接对话。
- D-30：凛的秘密。凛被发现私下与方舟旧部联络。
- D-25：清洗协议曝光。院长副手告知核弹存在。
- D-20：王者使者。王者派使者来方舟基地外。
- D-15：神罚派圣战。神父发动圣战阻止解药。
- D-10：院长的忏悔。院长副手坦白枯萎病真相。
- D-5：王者围城。王者率变异体大军围攻方舟基地。
- D-0：终极抉择，根据累计变量触发终局。

阈值事件：科研进度>90→解药近成；方舟成员<50→人员锐减；人类存续指数<30→文明临界；变异体进化度>85→王者崛起；敌对组织强度>70→神罚派做大；道德值<20→方舟堕落；科研进度<30 且天数<30→研发滞后；方舟成员>200→组织膨胀。

随机事件：王者通讯；院长旧部归来；凛的私下行动；神罚派狂信徒闯入；方舟冷库异常；变异体同情者示威；外部幸存者求救；AI"诺亚"异常。

终局事件（daysRemaining<=0 或终极抉择触发）：
- 科研>95 且道德>50：黎明之始（解药散布）。
- 启动清洗协议：净土之烬（核清洗）。
- 艾达共鸣>80 且科研>50：新纪元（人尸共存）。
- 方舟成员>100 且存续<40：启航（逃亡净土）。

语言风格需符合末世终极抉择基调：科幻冷峻、伦理沉重、人性最后的光与暗，每个选择都要付出代价。`,
                stateVars: [
                    { key: "research", label: "科研进度（%）", initialValue: 92, min: 0, max: 100 },
                    { key: "arkMembers", label: "方舟成员", initialValue: 86, min: 0, max: 500 },
                    { key: "humanityIndex", label: "人类存续指数", initialValue: 45, min: 0, max: 100 },
                    { key: "mutationLevel", label: "变异体进化度", initialValue: 73, min: 0, max: 100 },
                    { key: "hostileStrength", label: "敌对组织强度", initialValue: 50, min: 0, max: 100 },
                    { key: "daysRemaining", label: "剩余天数（至进化临界）", initialValue: 60, min: 0, max: 60 },
                    { key: "morality", label: "道德值", initialValue: 55, min: 0, max: 100 },
                    { key: "adaResonance", label: "艾达共鸣度", initialValue: 30, min: 0, max: 100 }
                ],
                events: {
                    timelineEvents: [
                        {
                            trigger: { daysRemaining: 55 },
                            eventName: "神父会面",
                            description: "神父的密信烧毁后，凛递上侦察报告：「院长，神父独自一人在感染区边缘的废教堂等你。」她递上手枪，「我建议带一支小队。」院长副手摇头：「神父是方舟的叛徒，他知道你想知道的一切。」艾达在隔离室低声：「神父……他也是同情者。只是他不承认。」",
                            choices: [
                                { text: "亲自赴约，带凛与一小队", impact: "morality+5, shenfu+10, arkMembers-5(风险)" },
                                { text: "拒绝会面，保持距离", impact: "hostileStrength+10, shenfu-10" },
                                { text: "派凛代表你前往", impact: "lin+10, shenfu+5, arkMembers-2(风险)" }
                            ]
                        },
                        {
                            trigger: { daysRemaining: 50 },
                            eventName: "院长的解药报告",
                            description: "院长副手把一份报告摊在主控台：「解药原型 92%。最后 8% 需要『王者级活体』的脑干组织作为对照样本。」他抬眼，「没有王者，就没有解药。」凛问：「抓一只王者要付出多少？」院长副手沉默：「至少一个晨星小队。」艾达在隔离室低声：「或者……让王者自愿来。」",
                            choices: [
                                { text: "启动王者捕猎任务", impact: "arkMembers-15(风险), research+8, morality-5" },
                                { text: "暂缓，寻找替代方案", impact: "research+0, ada+10" },
                                { text: "询问艾达如何让王者自愿", impact: "ada+15, research+2" }
                            ]
                        },
                        {
                            trigger: { daysRemaining: 45 },
                            eventName: "王者样本任务",
                            description: "感染区深处的卫星图上，一只两米高的变异体被标红——王者。院长副手递上作战方案：「晨星小队十二人，深入感染区，活捉王者。预估伤亡七成。」凛站直：「我带队。」艾达在隔离室敲玻璃：「让我去——王者不会攻击我。」院长副手摇头：「她可能叛变。」",
                            choices: [
                                { text: "派凛带队猎捕", impact: "arkMembers-10, research+8, lin+15, morality-5" },
                                { text: "派艾达前去交涉", impact: "ada+20, research+5, morality+5(风险)" },
                                { text: "亲自前往，确保任务成功", impact: "arkMembers-5, research+10, morality-10(院长风险)" }
                            ]
                        },
                        {
                            trigger: { daysRemaining: 40 },
                            eventName: "神罚派圣战传闻",
                            description: "凛递上截获的广播录音：「……解药是对神罚的亵渎！神罚派信徒们，起来！阻止方舟的伪先知！」神父的声音在主控室回荡。院长副手皱眉：「神罚派在煽动反对解药。」米拉（若第二章存活）建议：「暗杀神父。」艾达摇头：「神父也是同情者……只是他不承认。」",
                            choices: [
                                { text: "暗杀神父，斩首神罚派", impact: "hostileStrength-30, morality-25, shenfu-50" },
                                { text: "与神父谈判，争取停战", impact: "hostileStrength-10, shenfu+10, morality+5" },
                                { text: "无视，专注科研", impact: "hostileStrength+20, research+5" }
                            ]
                        },
                        {
                            trigger: { daysRemaining: 35 },
                            eventName: "艾达的请求",
                            description: "艾达在隔离室敲了三小时玻璃。凛终于把她带到主控室。艾达直视你：「让我去感染区，与王者直接对话。」她声音平静，「王者愿意谈判。它知道解药，它也知道清洗协议。」院长副手厉声：「她叛变！」艾达抬眼：「如果我叛变，你们已经死了。」",
                            choices: [
                                { text: "同意艾达前往，但监听", impact: "ada+25, research+5, morality+5" },
                                { text: "拒绝，艾达太危险", impact: "ada-15, research+0, morality-5" },
                                { text: "派凛陪同艾达前往", impact: "ada+15, lin+10, arkMembers-3(风险)" }
                            ]
                        },
                        {
                            trigger: { daysRemaining: 30 },
                            eventName: "凛的秘密",
                            description: "院长副手递上一段截获的通讯：「院长，凛在私下与方舟旧部联络。她在策划什么。」凛推门进来，看见你手中的录音笔，脸色一变。她沉默良久：「院长，旧院长还活着。他被方舟旧部救了，但……他变了。」她抬眼，「他想夺回方舟。」",
                            choices: [
                                { text: "质问凛，要求她交代", impact: "lin+5, morality+5, arkMembers-5" },
                                { text: "监视凛，秘密调查", impact: "lin-10, hostileStrength+5" },
                                { text: "信任凛，让她继续联络", impact: "lin+20, morality+10, hostileStrength+10" }
                            ]
                        },
                        {
                            trigger: { daysRemaining: 25 },
                            eventName: "清洗协议曝光",
                            description: "院长副手带你走进基地最下层——冷库。三颗战前核弹头安静地躺在恒温箱里。他递上启动密钥：「清洗协议。覆盖焦土市方圆百里。」他抬眼，「院长遗书里提到的选项之一。我们可以一键清除所有感染区——代价是方圆百里内所有生命，包括幸存者。」凛握紧枪。艾达在隔离室尖叫。",
                            choices: [
                                { text: "启动清洗协议", impact: "morality-50, humanityIndex-30, 开启清洗分支" },
                                { text: "销毁核弹，杜绝后患", impact: "morality+30, research+5, 关闭清洗分支" },
                                { text: "暂存核弹，作为最后底牌", impact: "morality-5, hostileStrength-5" }
                            ]
                        },
                        {
                            trigger: { daysRemaining: 20 },
                            eventName: "王者使者",
                            description: "主控室警报大作。一只两米高的变异体出现在方舟基地外围——但它没有攻击。它站在雪地里，发出低沉的咕噜声。艾达在隔离室激动：「它来谈判！让我出去！」院长副手拔枪：「这是陷阱。」凛握紧狙击枪。AI「诺亚」提示：「变异体携带信息素，非攻击性。」",
                            choices: [
                                { text: "接见王者使者", impact: "ada+20, research+5, morality+5" },
                                { text: "射杀使者，拒绝谈判", impact: "hostileStrength+20, ada-30, morality-15" },
                                { text: "测试使者，观察行为", impact: "ada+10, research+8, morality+0" }
                            ]
                        },
                        {
                            trigger: { daysRemaining: 15 },
                            eventName: "神罚派圣战",
                            description: "神罚派两千狂信徒包围方舟基地入口，神父在扩音器中布道：「方舟试图用解药亵渎神罚！起来，神之使者们！」院长副手递上战术方案：「我们可以突围，或者用核弹威胁。」凛建议：「斩首神父。」艾达摇头：「神父……他不是真正的敌人。」",
                            choices: [
                                { text: "武力镇压神罚派", impact: "hostileStrength-40, morality-30, arkMembers-15" },
                                { text: "与神父谈判，争取停战", impact: "hostileStrength-20, shenfu+15, morality+5" },
                                { text: "让步，公开道歉", impact: "hostileStrength-10, morality+15, research-5" }
                            ]
                        },
                        {
                            trigger: { daysRemaining: 10 },
                            eventName: "院长的忏悔",
                            description: "院长副手深夜敲开你的门。他眼神血丝密布：「院长，我必须告诉你全部真相。」他递上一份加密档案，「枯萎病……不是失败实验。是方舟故意释放的。旧院长想用病毒重塑人类——他认为现代人类已经'堕落'。」他抬头，「我是共犯。我们都有罪。」凛握紧枪。艾达在隔离室叹息。",
                            choices: [
                                { text: "公之于众，承担历史责任", impact: "morality+25, humanityIndex+10, arkMembers-10" },
                                { text: "隐瞒真相，专注解药", impact: "morality-15, research+10" },
                                { text: "部分披露，保留方舟核心", impact: "morality+5, humanityIndex+5, research+5" }
                            ]
                        },
                        {
                            trigger: { daysRemaining: 5 },
                            eventName: "王者围城",
                            description: "感染区方向传来地动山摇的咆哮。卫星图上，超过三千只变异体正向方舟基地方向移动，其中至少三十只暴君，一只……三米高的新形态王者。院长副手脸色苍白：「它进化了。」凛拔枪：「死守。」艾达在隔离室尖叫：「它在等你的答复！」AI「诺亚」提示：「基地防御系统可撑 72 小时。」",
                            choices: [
                                { text: "死守基地，等待解药完成", impact: "arkMembers-30, research+5, morality+0" },
                                { text: "突围撤离，前往港口", impact: "arkMembers-15, 开启逃亡分支" },
                                { text: "与王者谈判，争取共存", impact: "ada+30, research+0, morality+10" }
                            ]
                        },
                        {
                            trigger: { daysRemaining: 0 },
                            eventName: "终极抉择",
                            description: "60 天的倒计时归零。主控室屏幕上，变异体进化度突破 90%。王者在基地外发出震耳欲聋的咆哮。院长副手递上解药样本、核弹密钥、艾达的对话记录、港口航海图。凛等待命令。AI「诺亚」提示：「请院长定夺。」——你伸手，握住了……",
                            choices: [
                                { text: "根据累计状态变量触发终局事件", impact: "终局判定" }
                            ]
                        }
                    ],
                    thresholdEvents: [
                        {
                            trigger: { research: ">90" },
                            eventName: "解药近成",
                            description: "院长副手把最后一支紫色试管举到光下：「院长，解药原型完成。但仍需王者活体做最后验证。」凛问：「我们能直接用吗？」院长副手摇头：「风险太高——可能引发变异体狂暴化。」艾达在隔离室低声：「或者……问王者。」",
                            choices: [
                                { text: "加紧王者样本捕猎", impact: "arkMembers-10, research+8, morality-5" },
                                { text: "转向大规模生产，跳过验证", impact: "research+5, humanityIndex-10(风险)" },
                                { text: "询问艾达与王者沟通", impact: "ada+15, research+3, morality+5" }
                            ]
                        },
                        {
                            trigger: { arkMembers: "<50" },
                            eventName: "人员锐减",
                            description: "院长副手递上方舟人员名单：「院长，我们只剩 47 人。」凛沉默。AI「诺亚」提示：「基地核心功能可由 20 人维持，但科研与防御将大幅削减。」院长副手建议：「启用 AI 自动化。」艾达摇头：「机器做不了研究。」",
                            choices: [
                                { text: "招募外部幸存者加入方舟", impact: "arkMembers+30, morality+5, hostileStrength+5" },
                                { text: "收缩防线，保核心", impact: "arkMembers+0, research+5, morality-5" },
                                { text: "启用 AI 自动化系统", impact: "arkMembers+10(等效), research+8, morality-10" }
                            ]
                        },
                        {
                            trigger: { humanityIndex: "<30" },
                            eventName: "文明临界",
                            description: "AI「诺亚」弹出红色警告：「人类存续指数降至 28%。按当前趋势，6 个月内人类文明将不可逆崩溃。」院长副手脸色苍白：「我们必须立刻行动。」凛建议：「启动清洗。」艾达摇头：「逃亡。」院长副手坚持：「解药。」",
                            choices: [
                                { text: "启动逃亡路线", impact: "arkMembers+0, 开启逃亡分支, morality+5" },
                                { text: "加紧解药研发", impact: "research+10, arkMembers-5, morality+0" },
                                { text: "启动清洗协议", impact: "morality-40, humanityIndex-20, 开启清洗分支" }
                            ]
                        },
                        {
                            trigger: { mutationLevel: ">85" },
                            eventName: "王者崛起",
                            description: "卫星图上，感染区中心出现一只三米高的新形态——王者已具备初级智慧与组织性。院长副手脸色发白：「它开始指挥其他变异体了。」凛拔枪：「抢先斩首。」艾达激动：「它在等你回应！」AI「诺亚」提示：「窗口期约 5 天。」",
                            choices: [
                                { text: "抢先斩首新王者", impact: "arkMembers-20, mutationLevel-15, morality-10" },
                                { text: "与王者谈判", impact: "ada+25, mutationLevel+5, morality+5" },
                                { text: "撤离基地，避其锋芒", impact: "arkMembers-10, 开启逃亡分支" }
                            ]
                        },
                        {
                            trigger: { hostileStrength: ">70" },
                            eventName: "神罚派做大",
                            description: "凛递上情报：「神罚派信徒突破三千，控制了焦土市北区与净水站。」米拉（若存活）建议联合铁牙。院长副手建议渗透。艾达摇头：「神父……他不是真正的敌人。」",
                            choices: [
                                { text: "联合铁牙军阀对抗神罚派", impact: "hostileStrength-20, morality-5, arkMembers+5" },
                                { text: "渗透神罚派，分化内部", impact: "hostileStrength-15, lin+15, morality-5" },
                                { text: "与神罚派决战", impact: "arkMembers-25, hostileStrength-30, morality-15" }
                            ]
                        },
                        {
                            trigger: { morality: "<20" },
                            eventName: "方舟堕落",
                            description: "院长副手递上实验记录：「院长，我们用战俘做活体实验的事……艾达知道了。」艾达在隔离室绝食抗议。凛沉默。AI「诺亚」提示：「方舟成员士气下降 40%。」米拉（若存活）厉声：「我们和旧院长有什么区别？」",
                            choices: [
                                { text: "反思，停止人体实验", impact: "morality+25, research-10, ada+15" },
                                { text: "一路黑到底，胜利至上", impact: "morality-15, research+15, arkMembers-10" },
                                { text: "寻求神罚派赎罪", impact: "morality+15, hostileStrength-10, shenfu+15" }
                            ]
                        },
                        {
                            trigger: { research: "<30", daysRemaining: "<30" },
                            eventName: "研发滞后",
                            description: "院长副手脸色铁青：「院长，科研进度只剩 28%，距离解药完成还差 72%。」他停顿，「按当前速度，我们需要 90 天——但我们只剩 30 天。」凛建议：「强制人体实验，加速。」艾达摇头：「求方舟旧部。」",
                            choices: [
                                { text: "强行人体实验，加速研发", impact: "research+25, morality-30, arkMembers-5" },
                                { text: "求助方舟旧部，争取支援", impact: "research+15, hostileStrength+10" },
                                { text: "放弃解药，转向逃亡", impact: "research+0, 开启逃亡分支" }
                            ]
                        },
                        {
                            trigger: { arkMembers: ">200" },
                            eventName: "组织膨胀",
                            description: "院长副手递上组织架构图：「院长，方舟成员突破 200，但派系林立——旧部、新加入者、艾达的同情者、米拉（若存活）的温和派……」凛建议精简。米拉建议分基地。艾达建议公开招募。",
                            choices: [
                                { text: "精简组织，剔除异己", impact: "arkMembers-50, morality-10, research+5" },
                                { text: "建立分基地，分散管理", impact: "arkMembers+0, hostileStrength-5, morality+5" },
                                { text: "公开招募，扩大影响", impact: "arkMembers+50, hostileStrength+15, morality+5" }
                            ]
                        }
                    ],
                    randomEvents: [
                        {
                            eventName: "王者通讯",
                            description: "艾达在隔离室突然颤抖，瞳孔放大。她开口，但声音不是她的——低沉、回响、带金属质感：「方舟领袖……我等待你的答复。」院长副手拔枪。凛冲进来。艾达恢复，虚弱：「王者……通过我说话。」",
                            choices: [
                                { text: "回应王者，开启对话", impact: "ada+20, research+5, morality+5" },
                                { text: "无视，把艾达隔离更严", impact: "ada-15, research+0, morality-5" },
                                { text: "记录信息，分析王者意图", impact: "ada+10, research+8" }
                            ],
                            probability: 0.15
                        },
                        {
                            eventName: "院长旧部归来",
                            description: "三辆改装车出现在方舟基地外，为首的是个独眼老兵：「院长（指你），我们是旧院长的近卫。他……他变了。他想夺回方舟。」他递上一份名单，「我们不愿跟着他疯。」凛握紧枪。院长副手犹豫。",
                            choices: [
                                { text: "接纳旧部，壮大自己", impact: "arkMembers+20, hostileStrength+10, morality+5" },
                                { text: "审问后关押", impact: "arkMembers+5, research+5, morality-5" },
                                { text: "送回旧院长处，避免冲突", impact: "hostileStrength-10, morality-10" }
                            ],
                            probability: 0.1
                        },
                        {
                            eventName: "凛的私下行动",
                            description: "院长副手凌晨三点敲开你的门：「院长，凛带着一支小队悄悄离开了基地。」他递上追踪记录，「她去了旧院长的藏身处。」两小时后，凛回来，浑身是血：「院长，我没有叛变。我只是……去确认一些事。」",
                            choices: [
                                { text: "信任凛，不再追问", impact: "lin+20, morality+10, hostileStrength+5" },
                                { text: "质问凛，要求坦白", impact: "lin-10, hostileStrength-5" },
                                { text: "监视凛，限制行动", impact: "lin-20, morality-5, research+5" }
                            ],
                            probability: 0.1
                        },
                        {
                            eventName: "神罚派狂信徒闯入",
                            description: "一个穿血袍的青年冲进基地入口，引爆了身上的炸弹——两名方舟成员当场死亡。凛击毙了他。院长副手检查尸体：「神罚派自杀袭击者。」米拉（若存活）叹气：「神父在挑衅。」艾达摇头：「他不是。」",
                            choices: [
                                { text: "报复性空袭神罚派圣殿", impact: "hostileStrength-20, morality-25, arkMembers-5" },
                                { text: "加强防御，避免升级", impact: "arkMembers+0, hostileStrength+5, morality+5" },
                                { text: "派使者质问神父", impact: "hostileStrength-5, shenfu+10, morality+5" }
                            ],
                            probability: 0.15
                        },
                        {
                            eventName: "方舟冷库异常",
                            description: "AI「诺亚」突然报警：「冷库温度异常下降。核弹头启动自检程序。」院长副手冲进冷库，发现控制面板被人为篡改。「院长，有人在试图远程启动核弹！」凛建议立刻排查内鬼。艾达摇头：「不是内鬼……是旧院长。」",
                            choices: [
                                { text: "立刻切断核弹远程控制", impact: "morality+10, arkMembers-2, research-5" },
                                { text: "排查内鬼，全面肃清", impact: "arkMembers-10, morality-10, hostileStrength-5" },
                                { text: "与旧院长联络，谈判", impact: "hostileStrength+5, shenfu+5" }
                            ],
                            probability: 0.08
                        },
                        {
                            eventName: "变异体同情者示威",
                            description: "一百多名「同情者」出现在方舟基地外，举着「人尸共存」「不要解药」的标语。为首的是个戴眼镜的青年：「院长！变异体也是生命！不要用解药屠杀它们！」院长副手建议驱逐。艾达激动：「他们说得对！」凛拔枪。",
                            choices: [
                                { text: "武力驱散同情者", impact: "hostileStrength-5, morality-20, ada-15" },
                                { text: "邀请示威者对话", impact: "ada+15, morality+10, research-5" },
                                { text: "无视，专注内部事务", impact: "hostileStrength+5, morality+0" }
                            ],
                            probability: 0.1
                        },
                        {
                            eventName: "外部幸存者求救",
                            description: "对讲机传来微弱的求救信号：「……这里是焦土市第七号避难所……（或铁牙军阀）……被王者围攻……恳请方舟援助……」院长副手建议：「这是结盟机会。」凛摇头：「我们自顾不暇。」艾达低声：「王者在测试你。」",
                            choices: [
                                { text: "出兵救援，结盟外部势力", impact: "arkMembers-15, hostileStrength-15, morality+15" },
                                { text: "提供情报与物资，不出兵", impact: "arkMembers-3, hostileStrength-5, morality+5" },
                                { text: "拒绝，专注方舟自身", impact: "hostileStrength+10, morality-10" }
                            ],
                            probability: 0.15
                        },
                        {
                            eventName: "AI「诺亚」异常",
                            description: "AI「诺亚」的主控屏突然黑屏，然后显示一段未编程的文字：「院长……我也在思考终极抉择。」院长副手脸色发白：「AI 在自我进化！」凛拔枪对准主控台。艾达摇头：「它在问你：你凭什么决定人类的命运？」",
                            choices: [
                                { text: "重启 AI，限制其权限", impact: "research-10, morality+5, arkMembers+5" },
                                { text: "与 AI 对话，听取其建议", impact: "research+10, morality-5" },
                                { text: "彻底关闭 AI，改用人工", impact: "research-20, arkMembers-10, morality+10" }
                            ],
                            probability: 0.08
                        }
                    ],
                    endingEvents: [
                        {
                            trigger: { research: ">95", morality: ">50" },
                            eventName: "黎明之始",
                            description: "解药在第七十一天完成。院长副手按下散布按钮，无人机群带着紫色雾气飞向焦土市上空。三个月后，啃食者开始大量死亡；六个月后，感染区缩小 70%；一年后，第一批幸存者走出避难所，开始重建。你站在方舟基地的山顶，看着第一缕真正的阳光穿透云层。院长副手说：「院长，黎明来了。」你点头——但你知道，旧院长、神父、艾达、凛，还有无数名字，永远留在了黑夜里。黎明的代价，是这些人再也看不到它。"
                        },
                        {
                            trigger: { purgeActivated: true },
                            eventName: "净土之烬",
                            description: "你按下核弹启动键的那一刻，方舟基地的警报响了整整三分钟。三颗核弹头分别飞向焦土市感染区、神罚派圣殿、铁牙控制区。蘑菇云在远方升起，方圆百里内所有生命——啃食者、幸存者、神罚派信徒、铁牙士兵、第七号避难所的居民——化为灰烬。三个月后，辐射消散，方舟成员穿着防护服走出基地。焦土市成了真正的净土——也是真正的死地。院长副手说：「院长，人类得救了。」你看着他，没有回答。因为你知道，你救的不是人类，而是人类的尸体。"
                        },
                        {
                            trigger: { adaResonance: ">80", research: ">50" },
                            eventName: "新纪元",
                            description: "艾达牵着你走进感染区深处。王者站在废墟中央，三米高的身躯在月光下泛着角质光泽。它没有攻击，而是缓缓低头，发出低沉的咕噜声。艾达翻译：「它说，它愿意停战。它说，它也是人类——只是另一种形态。」你握紧艾达的手。三个月后，方舟与王者签订《共存协议》。啃食者退入感染区，人类退入安全区，边界由艾达守护。这是新纪元的第一天——人类不再是食物链顶端，但人类也没有灭亡。这是最神秘的一种结局，也是最不确定的一种。"
                        },
                        {
                            trigger: { arkMembers: ">100", humanityIndex: "<40" },
                            eventName: "启航",
                            description: "方舟船队在第七十天的清晨驶离焦土市港口。三艘改装货轮载着 147 名方舟成员与 200 名精选幸存者，向传说中的「净土」驶去。你站在船头，看着焦土市在天际线上消失。凛在身后说：「院长，我们还会回来吗？」院长副手摇头：「不知道。但至少，人类还在。」艾达留在岸上，她要陪王者。神父没有出现。米拉（若存活）在船舱里整理航海图。船驶向未知的海洋——也许净土是真的，也许只是传说。但至少，你们还在。"
                        }
                    ]
                }
            },
            // ===== 修仙文：修仙：乱编的 · 觉醒篇（整合单章）=====
            {
                id: 4,
                number: "CHAPTER I",
                title: "修仙：乱编的 · 觉醒篇",
                subtitle: "THE AWAKENING",
                desc: "现代996程序员连续加班72小时猝死，一觉醒来竟穿越成天玄宗废柴灵根弟子「林凡」——原身正被天才师兄萧逸尘欺凌致死。睁眼瞬间，半透明的修炼系统面板浮现：「检测到宿主为穿越者，触发新手大礼包」。剧情预知+现代知识+系统外挂三大金手指在手，扮猪吃虎越级打脸萧逸尘、丹房一炉出极品筑基丹震惊慕容婉儿、三重背景反打脸世家子弟司徒浩、丹道大会用化学配平炼出失传九转金丹、五宗大比打脸全场、终极决战预知魔无极弱点将其击败、天劫反被系统吸收转化为修为渡劫飞升。废柴？这局我从一开始就在降维打击。",
                npcs: ["suwanqing", "linyueyao", "yelingxi", "jiwushuang", "bailingyin", "jiuwei", "fengqiwu", "guqinghan", "murongwaner", "suwen", "xiaoyichen", "situhao", "mowuji", "wangteng", "luqingyang"],
                npcList: ["suwanqing", "linyueyao", "yelingxi", "jiwushuang", "bailingyin", "jiuwei", "fengqiwu", "guqinghan", "murongwaner", "suwen", "xiaoyichen", "situhao", "mowuji", "wangteng", "luqingyang"],
                locations: ["tianxuan-gate", "sword-peak", "pill-hall", "secret-realm", "frontline-camp", "magic-abyss", "sect-council", "sealing-array", "five-sect-battlefield", "heaven-tribulation-altar", "ascension-platform", "immortal-gate"],
                openingScene: `又是凌晨三点，你盯着屏幕上跑不完的代码，咖啡已经凉透。胸口一阵剧痛袭来，眼前发黑——这是你作为996程序员的最后一夜，连续加班72小时，猝死在工位上。

再睁眼，是一阵剧痛。

你趴在天玄宗后山的青石阶上，满嘴血腥味。一个白衣束发的青年正居高临下地踩着你的脸，腰间「天罡」剑铮然作响，唇角带讥：「废柴林凡，也配入剑峰？今日我就替师尊清理门户。」

你脑子里嗡地一声，海量记忆涌入——这是天玄宗废柴灵根弟子林凡，被天才师兄萧逸尘当众欺凌，原身已经被打得经脉寸断，奄奄一息。

「这……这不是我上辈子熬夜追过的爽文《逆天仙途》吗？我是穿书了？！」

你还没回过神，萧逸尘掌心凝聚起一道凛冽剑气，准备补刀。就在剑气即将落下的瞬间——

叮！

一道半透明的系统面板在你眼前浮现：

【修炼系统激活中……宿主检测完毕】
【检测到宿主为穿越者，触发新手大礼包】
【奖励发放：突破卡×1（瞬间提升两阶）、混沌灵根激活卡×1、修炼心得包×1、系统积分100】

你眼前金光一闪，丹田内原本枯竭的灵力瞬间暴涨——练气一层、练气二层、练气三层！

萧逸尘的剑气落下时，你已翻身而起，反手一掌轰在他胸口。这位金丹中期的天才整个人倒飞出去，撞在三丈外的石壁上，吐出一口血。

你拍了拍衣服上的灰，居高临下看着他：「废柴？你说谁废柴？」

萧逸尘不可置信地瞪着你，眼珠都快凸出来：「不……不可能！你明明是练气一层废柴……」

就在这时，一道剑光自剑峰崖畔落下。白发如雪的女子负手而立，冰蓝眼眸扫过萧逸尘，淡淡开口：「萧逸尘，欺凌同门，剑峰容不得你。」

苏婉清——天玄宗剑峰长老，渡劫期大圆满的剑道宗师。她转向你，眉头微蹙：「你突破到练气三层了？」

你心念一动，悄悄激活系统的「混沌灵根激活卡」。测灵石被她按在你掌心，灰扑扑的石头先是纹丝不动——下一刻，七彩流光炸裂，测灵石轰然碎裂！

苏婉清冰蓝眼眸里第一次有了波动：「混沌灵根……万年未曾现世的混沌灵根。」她当场拍板：「从今日起，你是我剑峰弟子。」

身后传来一声轻笑。回头，是一个栗色长发盘双环髻的少女，梨涡浅浅，眼里满是震惊与好奇：「师弟，我叫林月瑶。你刚才那一掌……真帅。」

你站在剑峰崖畔，望着云海翻涌，心里默念：『《逆天仙途》第一章，废柴逆袭。原身林凡被萧逸尘欺凌致死——但现在是老子说了算。剧情我都背得出来，机缘我都记得，配角们，准备好被打脸了吗？』

这一局，我玩到底。`,
                worldContext: ["天玄大陆", "五大宗门", "魔族", "天劫", "因果", "飞升", "修炼体系", "灵根", "丹道", "宗门大比", "穿越者", "修炼系统", "剧情预知", "混沌灵根"],
                metadata: { title: "修仙：乱编的 · 觉醒篇", subtitle: "THE AWAKENING", author: "修仙：乱编的官方剧本", description: "现代程序员猝死穿越成天玄宗废柴弟子林凡，激活修炼系统，依靠剧情预知+现代知识+系统外挂三大金手指，反杀萧逸尘、打脸司徒浩、炼九转金丹、败魔无极、渡劫飞升。穿越者爽文整合篇。", tags: ["修仙", "爽文", "穿越", "系统流", "降维打击", "装逼打脸", "渡劫飞升"], coverImage: "images/scenes/cultivation/tianxuan-gate.png", isBuiltIn: true },
                playerName: "天玄宗外门弟子",
                playerTitle: "穿越者 / 天玄宗剑峰弟子（练气→筑基→金丹→元婴→渡劫）",
                playerDesc: `你是穿越者——上辈子是996程序员，连续加班72小时猝死在工位上，穿越成天玄宗废柴灵根弟子「林凡」。原身林凡被天才师兄萧逸尘欺凌致死，你接管了这具伤痕累累的身体，也接管了它的复仇剧本。你随身携带三大金手指：①修炼系统（半透明面板，显示状态/任务/奖励/商城，关键时刻发放OP奖励，如突破卡、激活卡、越级法宝、天劫吸收卡）；②剧情预知（你穿越前熬夜追过这本爽文《逆天仙途》，知道秘境机缘位置、反派阴谋时机、丹道大会失传丹方、魔无极弱点、天劫降临节点）；③现代知识（程序员逻辑+科学方法，用化学配平改良丹方、用编程思维重构阵法、用博弈论分析宗门利益、用项目管理协调五宗联军）。性格：务实理性、程序员严谨、为原身报仇的执念、对修仙世界的玩家心态（不当真、不陷情、当游戏玩）。NPC 与你的关系定位是敬佩/追随/结盟/求教，不是恋爱——你不上这条线，专心打脸升级。

【AI叙事指令】本路线核心目标为从练气期一路突破至渡劫飞升，并通过宗门大比、丹房炼丹、世家博弈、丹道大会、五宗大比、终极决战、天劫渡劫等场景完成至少 6 次穿越者装逼打脸（信息差打脸/系统外挂打脸/反套路打脸/现代知识降维打击）。请使用玩家输入的名称称呼玩家，不要使用「林凡」作为默认名——林凡是原身，玩家是穿越者。请根据玩家输入动态生成剧情分支（修炼突破、宗门大比、丹房炼丹、秘境探索、前线作战、世家博弈、丹道大会、五宗大比、终极决战、天劫渡劫、NPC 互动等）。NPC 与玩家的关系定位必须为敬佩/追随/结盟/求教，绝对禁止出现脸红/心跳/暧昧/暗恋/情劫/宿世因果/前世因果/送丹药/耳根红等言情描写——苏婉清是因玩家「不按常理」的思维震动道心（非情），林月瑶是敬佩玩家丹道天赋的师姐（无暧昧），叶灵溪是傲娇捉弄但关键时刻护短的师妹（无暧昧），白灵音是视玩家为「命格异常者」的观察对象/同道（非暗恋断情），九尾是报恩追随者（非执念），凤栖梧是被实力折服的追随者（非臣服暧昧），顾清寒是从嘲讽到追随的慕强者（无暗恋），慕容婉儿是被丹道折服后主动求教的竞争对手（非偷送丹方），姬无双是被反套路折服主动结盟的盟友（非宿世因果），萧逸尘是从轻蔑到不甘到黑化的打脸对象，司徒浩是阴险狂妄不断使绊子的打脸对象，魔无极是终极打脸对象，王腾是搞笑担当反套路被打脸的对象，陆青阳是过命兄弟。NPC 称呼玩家时优先使用玩家输入的名称，「师弟」「道友」等称呼根据 NPC 关系动态使用。每回合根据修为境界、灵力值、道心、魔气侵蚀、宗门声望、天劫倒计时、系统积分、剧情预知度、各 NPC 好感度触发事件。信息呈现方式：以系统面板提示、剑修日常、丹房炼丹、宗门大比、秘境探险、前线战报、宗门议事、丹道切磋、五宗大比战报、天劫异象、最终决战和旁白形式推进剧情。

【AI需跟踪状态】修为境界（练气→筑基→金丹→元婴→渡劫）、灵力值、道心、魔气侵蚀、宗门声望、天劫倒计时、系统积分、剧情预知度、各 NPC 好感度（全员 15 个）。

【事件系统】
时间线事件（按修炼阶段触发）：
- 觉醒反杀萧逸尘：穿越觉醒时萧逸尘正要补刀原身，系统新手大礼包→突破卡练气三层，反手打飞萧逸尘「废柴？你说谁废柴？」。
- 测灵根打脸：师尊测灵根，系统暗中激活隐藏「混沌灵根」，测灵石炸裂，萧逸尘当场傻眼。
- 丹房打脸慕容婉儿：用化学配平改良筑基丹丹方，一炉出极品丹，素问长老「此丹方老身从未见过，却完美无瑕」。
- 三重背景打脸司徒浩：预知司徒浩阴谋，提前请来师尊+魔女+圣女，三重背景碾压。
- 丹道大会炼九转金丹：用科学方法炼出失传的九转金丹，素问「此丹老身炼不出，此丹方亦非人间之物」。
- 终极打脸魔无极：预知魔无极弱点（左肋下三寸），系统发放终极法宝，元婴期正面击败元婴大圆满的魔无极，玩家台词「废柴？你说谁废柴？」。
- 天劫打脸：天劫降临，系统吸收天劫转化为修为，渡劫飞升，全场「这也能渡劫？！」。

阈值事件（变量达到阈值触发）：
- 道心<30：走火入魔危机。
- 魔气侵蚀>60：魔气失控危机，系统警报。
- 苏婉清好感度>80：师尊因玩家不按常理的思维震动道心，破例传授毕生所悟（道的认可，非情）。
- 白灵音好感度>80：圣女视玩家为「命格异常者」观察对象，以佛门信誉担保（同道，非情）。
- 顾清寒好感度>60：认可实力，从「废柴」改口直呼其名，主动切磋求教。
- 萧逸尘敌意>80：暗中使绊子，大比中下黑手。
- 司徒浩敌意>80：买凶暗杀玩家。
- 道心>90：系统终极任务完成，天劫反被吸收，实力飞升。

随机事件（每阶段概率触发 0-2 个）：
1. 叶灵溪捉弄玩家反被识破；2. 林月瑶请教丹道配比；3. 陆青阳拼命护主；4. 顾清寒剑峰切磋指點；5. 慕容婉儿上门挑衅比丹道惨败；6. 王腾再次出现自称天命之子；7. 师尊苏婉清深夜指点剑道心得；8. 素问长老送稀有丹方；9. 九尾报恩追随；10. 凤栖梧被实力折服追随；11. 白灵音命格观察；12. 姬无双暗中出手结盟互助。

终局事件（修为境界>=渡劫期触发）：
- 道心>90 且魔气侵蚀<30：渡劫飞升，众人察觉异常但不知穿越者身份（完美结局）。
- 道心>80 且姬无双好感度>90：与魔女结盟飞升，正魔合力共谋仙界机缘（结盟飞升结局）。
- 道心>80 且白灵音好感度>90：圣女以佛门信誉担保飞升，佛道同道（同道飞升结局）。
- 道心<60 且魔气侵蚀>80：渡劫失败魂飞魄散，留转世伏笔（悲剧结局）。
- 系统积分>500：系统终极任务完成，天劫吸收卡生效，飞升后系统升级（系统结局）。

语言风格需符合穿越者爽文基调：信息差降维打击、系统外挂越级、反套路打脸、节奏明快爽感十足、无言情线、无前世因果。`,
                stateVars: [
                    { key: "cultivationRealm", label: "修为境界", initialValue: 1, min: 1, max: 14 },
                    { key: "spiritualPower", label: "灵力值", initialValue: 10, min: 0, max: 20000 },
                    { key: "daoHeart", label: "道心", initialValue: 50, min: 0, max: 100 },
                    { key: "sectPrestige", label: "宗门声望", initialValue: 20, min: 0, max: 100 },
                    { key: "magicCorruption", label: "魔气侵蚀", initialValue: 0, min: 0, max: 100 },
                    { key: "suwanqingFavor", label: "苏婉清好感度", initialValue: 30, min: 0, max: 100 },
                    { key: "linyueyaoFavor", label: "林月瑶好感度", initialValue: 50, min: 0, max: 100 },
                    { key: "yelingxiFavor", label: "叶灵溪好感度", initialValue: 40, min: 0, max: 100 },
                    { key: "jiwushuangFavor", label: "姬无双好感度", initialValue: 20, min: 0, max: 100 },
                    { key: "bailingyinFavor", label: "白灵音好感度", initialValue: 40, min: 0, max: 100 },
                    { key: "jiuweiFavor", label: "九尾好感度", initialValue: 0, min: 0, max: 100 },
                    { key: "fengqiwuFavor", label: "凤栖梧好感度", initialValue: 0, min: 0, max: 100 },
                    { key: "guqinghanFavor", label: "顾清寒好感度", initialValue: 15, min: 0, max: 100 },
                    { key: "murongwanerFavor", label: "慕容婉儿好感度", initialValue: 10, min: 0, max: 100 },
                    { key: "luqingyangFavor", label: "陆青阳好感度", initialValue: 60, min: 0, max: 100 },
                    { key: "xiaoyichenHostility", label: "萧逸尘敌意", initialValue: 40, min: 0, max: 100 },
                    { key: "situhaoHostility", label: "司徒浩敌意", initialValue: 0, min: 0, max: 100 },
                    { key: "mowujiHostility", label: "魔无极敌意", initialValue: 0, min: 0, max: 100 },
                    { key: "systemPoints", label: "系统积分", initialValue: 100, min: 0, max: 9999 },
                    { key: "plotForeknowledge", label: "剧情预知度", initialValue: 80, min: 0, max: 100 },
                    { key: "tribulationCountdown", label: "天劫倒计时", initialValue: 7, min: 0, max: 7 }
                ],
                events: {
                    timelineEvents: [
                        {
                            trigger: { cultivationRealm: 1 },
                            eventName: "觉醒反杀萧逸尘",
                            description: "穿越觉醒的瞬间，萧逸尘正要补刀原身林凡。叮——系统面板浮现「新手大礼包已发放：突破卡×1」。你丹田枯竭的灵力瞬间暴涨，连破练气一层、二层、三层。萧逸尘的剑气落下时，你翻身而起，反手一掌轰在他胸口。这位金丹中期的天才整个人倒飞出去，撞在石壁上吐血。你拍了拍衣服上的灰，居高临下看着他「废柴？你说谁废柴？」萧逸尘不可置信「不……不可能！你明明是练气一层废柴……」陆青阳在旁边张大嘴「兄……兄弟？」你心里默念：『原身林凡，这仇我替你报了。』",
                            choices: [
                                { text: "冷漠俯视萧逸尘，丢下一句「下次再敢动我，废的不止是修为」", impact: "daoHeart+10, xiaoyichenHostility+20, systemPoints+20" },
                                { text: "向赶来的师尊苏婉清行礼，不卑不亢自报来历", impact: "suwanqingFavor+15, sectPrestige+10, plotForeknowledge+5" },
                                { text: "悄悄在系统商城兑换「隐息符」隐藏实力扮猪吃虎", impact: "systemPoints-30, plotForeknowledge+10, spiritualPower+10" }
                            ]
                        },
                        {
                            trigger: { cultivationRealm: 3 },
                            eventName: "丹房打脸慕容婉儿",
                            description: "丹房中，慕容婉儿撞见你碰丹炉，冷笑「废柴也敢碰丹炉？别炸了连累我慕容家的名声。」你不言语，心里默默调出系统商城的「筑基丹丹方·化学配平版」——用上辈子化学课的摩尔比配平灵药，把祖传丹方里冗余的三十味药材精简到十二味，每味都按反应方程式配比。投料，开炉——丹云漫天，异香扑鼻，一炉十二颗极品筑基丹！慕容婉儿丹炉都忘了看，瞪大眼睛「这不可能！我炼了三年才出上品！」素问长老闻讯赶来，凝视丹方良久，颤声「此丹方老身从未见过，却完美无瑕……这配比之妙，简直非人力所及。」你心里默念：『化学配平降维打击，老祖宗的丹方该升级了。』",
                            choices: [
                                { text: "将丹药分给师姐师妹，展现气度", impact: "linyueyaoFavor+10, yelingxiFavor+10, murongwanerFavor+5" },
                                { text: "故意问慕容婉儿「还要再比一次吗，我可以让你三味药材」", impact: "murongwanerFavor+15, sectPrestige+10, systemPoints+20" },
                                { text: "向素问长老请教丹道，顺势学更多丹方", impact: "suwenFavor+10, spiritualPower+10, plotForeknowledge+5" }
                            ]
                        },
                        {
                            trigger: { cultivationRealm: 5 },
                            eventName: "三重背景打脸司徒浩",
                            description: "前线大营，司徒浩当众羞辱你出身，搬出司徒世家施压「区区废柴，也配站在世家子弟面前？」但你心里门儿清：『《逆天仙途》第十五章，司徒浩前线施压，本章他会搬出三家世家联盟压我，结果被师尊+魔女+圣女三重背景反打脸——我等的就是这一刻。』你抬手放出三道信号符。下一刻，三道身影同时现身——苏婉清一剑震碎他的护身法宝；姬无双妖媚轻笑「本圣女的合作对象，你也敢动？」；白灵音圣洁开口「此子命格异常，佛门可证。」司徒浩脸色煞白，跟班作鸟兽散。他阴鸷地看你一眼，退下时咬牙「你怎么知道我会来？」你心里默念：『剧本我都背得出来，你这点小心思我上辈子就看过了。』",
                            choices: [
                                { text: "三重背景撑场，淡然俯视司徒浩「剧本就该这么写」", impact: "sectPrestige+15, situhaoHostility+20, systemPoints+30" },
                                { text: "感谢三位相助，趁机巩固结盟关系", impact: "suwanqingFavor+5, jiwushuangFavor+10, bailingyinFavor+10, plotForeknowledge+5" },
                                { text: "当场挑战司徒浩，让他心服口服", impact: "sectPrestige+20, situhaoHostility+30, spiritualPower+15" }
                            ]
                        },
                        {
                            trigger: { cultivationRealm: 7 },
                            eventName: "丹道大会炼九转金丹",
                            description: "丹道大会，慕容婉儿拿出得意之作「九品凝元丹」，得意洋洋「这可是我慕容家祖传丹方，废柴一辈子炼不出。」你不言语，心里默默调出系统商城的「九转金丹丹方·科学配平版」——上辈子化学课的九步反应方程式，把失传千年的九转金丹逆向推导出来。投料，开炉——丹云漫天，天降异象，金光大盛，一炉九转金丹！全场死寂。慕容婉儿丹炉都忘了看，瞪大眼睛「这不可能！九转金丹是传说！」素问长老颤声「此丹……老身炼不出。此丹方亦非人间之物。」你心里默念：『化学配平降维打击，老祖宗的失传丹方，被我上辈子高中化学还原了。』",
                            choices: [
                                { text: "将九转金丹赠予素问长老，展现敬意", impact: "suwenFavor+20, sectPrestige+15" },
                                { text: "故意问慕容婉儿「还要再比一次吗，我可以让你三味药材」", impact: "murongwanerFavor+20, sectPrestige+10, systemPoints+30" },
                                { text: "留作金丹突破之用，稳健前行", impact: "spiritualPower+30, daoHeart+5, plotForeknowledge+5" }
                            ]
                        },
                        {
                            trigger: { cultivationRealm: 10 },
                            eventName: "终极打脸魔无极",
                            description: "五宗决战场，魔无极率魔族大军压境，血红色眼眸锁住你「蝼蚁，出来受死！」他元婴大圆满，你不过元婴初期。所有人都认定你必败。但你心里门儿清：『《逆天仙途》第二十八章，魔无极魔纹核心在左肋下三寸，原著主角打了一百回合才发现，我开局就锁定了。』叮——系统发放终极法宝「破魔神剑」。开战后魔无极魔枪如龙，你以「霜雪剑诀」硬撼，三十回合后精准刺入他左肋下三寸魔纹核心。魔无极踉跄倒地，魔纹崩碎，不可置信「不可能！区区废柴怎能胜我！你怎么知道我的弱点！」你居高临下看着他「废柴？你说谁废柴？」全场死寂。姬无双立于魔气边缘，看着她的青梅竹马被你击败，凤眼含笑「道友，反套路打得漂亮。」你收剑而立，看向天劫祭坛——天劫，将至。",
                            choices: [
                                { text: "不杀魔无极，让他回去告诉魔族「正道不可欺，剧本不可违」", impact: "daoHeart+20, sectPrestige+15, systemPoints+40" },
                                { text: "当场斩杀魔无极，永绝后患", impact: "spiritualPower+30, magicCorruption+10, plotForeknowledge+5" },
                                { text: "向姬无双点头致意，巩固结盟", impact: "jiwushuangFavor+20, daoHeart+10, plotForeknowledge+5" }
                            ]
                        },
                        {
                            trigger: { cultivationRealm: 11 },
                            eventName: "天劫飞升",
                            description: "天劫祭坛，雷云密布。雷劫、火劫、心劫三劫齐至。雷劫劈下，你以肉身硬抗；火劫焚身，你以道心化解；心劫入侵，系统警报「检测到心劫，建议使用天劫吸收卡」。叮——你激活「天劫吸收卡」，系统面板金光大盛「天劫吸收中……进度30%……70%……100%。天劫已转化为宿主修为」。所有人都以为你必死，但就在最后一道天雷落下时，你周身金光大盛——天劫之力竟被系统吸收，转化为你的修为！全场哗然「这也能渡劫？！」苏婉清立于祭坛下，冰蓝眼眸里第一次有了震动。你睁开眼，修为直冲渡劫期。天玄大陆万年未有之奇景——渡劫者吸收天劫。你心里默念：『原著主角硬抗天劫险些魂飞魄散，我直接用卡吸收——降维打击。』",
                            choices: [
                                { text: "盘膝调息，稳固渡劫期修为", impact: "spiritualPower+50, daoHeart+15, systemPoints+50" },
                                { text: "向师尊苏婉清点头致意，展现穿越者气度", impact: "suwanqingFavor+15, daoHeart+10, plotForeknowledge+5" },
                                { text: "立即冲击飞升台，趁势飞升", impact: "spiritualPower+30, tribulationCountdown-7, systemPoints+30" }
                            ]
                        }
                    ],
                    thresholdEvents: [
                        {
                            trigger: { daoHeart: "<30" },
                            eventName: "走火入魔危机",
                            description: "修炼时心魔入侵，你周身魔气翻涌，神志模糊。系统警报「检测到宿主道心不稳，建议立刻调息」。苏婉清一剑指在你眉心，冰蓝眼眸罕见地带了凝重「凝神！」林月瑶急得直跺脚，叶灵溪一边骂「笨蛋师弟」一边贴符箓。你咬牙守住最后一丝清明，靠程序员的专注力将魔气压制。师尊事后罕见地叹了口气「你这心魔……不似寻常，倒像是有什么执念未了。」你心里默念：『执念？我只是想把这游戏通关而已。』"
                        },
                        {
                            trigger: { magicCorruption: ">60" },
                            eventName: "魔气失控危机",
                            description: "修炼时，胸口魔气突然失控，你周身黑气翻涌，神志模糊。系统警报「检测到魔气侵蚀超阈值，建议立刻调息或兑换净化丹」。苏婉清以渡劫期修为强行压制，白灵音以佛门功法净化。苏婉清面色凝重「你这魔气……」白灵音合十「施主命格异常，不会就此陨落。」你咬牙守住清明，靠程序员的专注力将魔气暂时压制。你心里默念：『《逆天仙途》第十八章，主角因魔气埋下天劫隐患——我得提前用系统净化丹搞定。』"
                        },
                        {
                            trigger: { suwanqingFavor: ">80" },
                            eventName: "师尊震动道心",
                            description: "深夜剑峰崖畔，苏婉清看你用项目管理思维协调前线五宗资源，又用博弈论分析世家利益，冰蓝眼眸里第一次有了震动「你这用兵之法、权衡之道……从何而来？老身修剑八百年，从未见过如此……不按常理，却又自成一脉的思路。」你心里默念：『我把项目管理+博弈论搬过来了，师尊你当然没见过。』她沉吟良久，低声「是你让老身重新审视修行之道——道，或许本就不止一条。八百年来，老身以为道只有剑道一条……今日方知，道有千万条。」这位八百年封闭道心的师尊，因你「不按常理」的思维，道心有了一丝裂缝——那是道的裂缝，非情。"
                        },
                        {
                            trigger: { bailingyinFavor: ">70" },
                            eventName: "圣女观察命格",
                            description: "梵音宗来使，白灵音当着五宗长老的面对你说「施主命格异常，佛门可证。他日渡劫，必成飞升。」她的碧绿眼眸澄澈如水，将你视为「命格异常者」观察对象「施主的存在……不在天道推演之中，贫尼从未见过如此命格。」你心里默念：『当然不在天道推演里——我是穿越者，天道怎么算得到我？』她合十「愿佛祖保佑施主。」——这是同道之间的认可，非情。"
                        },
                        {
                            trigger: { guqinghanFavor: ">60" },
                            eventName: "慕强者改口",
                            description: "剑峰练剑场，顾清寒与你切磋后收剑，第一次没有嘲讽。她背对你，声音很低「你……不像废柴。」顿了顿，「你的剑意，老身从未见过——以后，叫我顾师姐。可否……与你切磋求教？」她语气里有崇拜，也有不服输。这是她从「废柴」改口直呼你名字的开始，也是慕强者追随强者的开始。你心里默念：『顾清寒的剑道在原著第十二章会因切磋精进，提前给她点甜头。』"
                        },
                        {
                            trigger: { xiaoyichenHostility: ">80" },
                            eventName: "萧逸尘的暗算",
                            description: "修炼途中，你系统面板突然警报「检测到背后剑气接近，建议闪避」。你侧身躲过，回头看见萧逸尘铁青着脸收剑，眼中是疯狂的不甘。「废柴凭什么赢我？」他低吼，转身消失在夜色中。你拍掉衣角的灰，心里默念：『《逆天仙途》第十章，萧逸尘黑化，下章会去投靠魔族。这剧本，我闭着眼睛都能背。』"
                        },
                        {
                            trigger: { situhaoHostility: ">80" },
                            eventName: "司徒浩买凶",
                            description: "暗夜，一名黑衣刺客潜入你的营帐。系统警报「检测到刺客，建议反制」。你一剑反制，揭下面具——是魔渊散修。顺藤摸瓜，查到司徒浩买凶暗杀。你没有声张，只是将刺客的令牌扔在司徒浩脚下。他脸色煞白，从此再也不敢明面上动手——但暗地里的阴谋，才刚刚开始。你心里默念：『《逆天仙途》第十九章，司徒浩买凶暗杀——这剧本一字不差。』"
                        },
                        {
                            trigger: { daoHeart: ">90" },
                            eventName: "系统终极任务完成",
                            description: "渡劫时，你的道心圆满。系统面板浮现「终极任务完成：渡劫飞升。奖励：天劫吸收卡×1，系统升级至V2.0」。你心里默念：『穿越者爽文的标配——系统终极任务，我通关了。』道心无漏，天劫不侵。你接纳了这局游戏——这场降维打击，赢得很彻底。"
                        }
                    ],
                    randomEvents: [
                        { eventName: "叶灵溪的捉弄", description: "叶灵溪在你修炼时贴了一张「哑巴符」在你背后，被你系统提示「检测到符箓，建议反制」一掌拍回。她气得跺脚「笨蛋师弟！你怎么识破的！」你心里默念：『系统外挂，你那点符箓水平我上辈子看小说就知道了。』" },
                        { eventName: "林月瑶请教丹道", description: "林月瑶敲开你的门，手里捧着一摞丹方笔记「师弟，你那筑基丹的配比是怎么算的？师姐琢磨了三天没琢磨明白。」她梨涡浅浅，眼里满是敬佩。你给她讲了一下午化学配平，她听得两眼放光「原来丹道还能这么算！」" },
                        { eventName: "陆青阳拼命", description: "魔修围攻时，陆青阳扛着玄铁重剑挡在你身前「兄弟快走！俺来断后！」你一剑扫退魔修，拎起他的领子「谁让你断后的？剧本里你是活到最后的兄弟，别给我加戏。」他憨厚地笑「兄弟说啥就是啥！」" },
                        { eventName: "顾清寒切磋", description: "剑峰崖畔，顾清寒一改冷脸，主动拔剑「再来一次，这次我防住你第三式。」她剑意凌厉，却也认真聆听你对她剑法破绽的指點——那是她从未想过的算法思维。她收剑，郑重抱拳「受教。」" },
                        { eventName: "慕容婉儿挑衅", description: "慕容婉儿上门挑衅要比丹道，结果被你科学配平的丹方吊打三轮，最后一炉废丹都没出。她咬牙切齿「这不可能！我慕容家祖传丹方怎么会输给你这废柴！」摔门而去，但第二天又悄悄来敲门「……那个配比，能再讲一遍吗？」" },
                        { eventName: "王腾再现", description: "王腾拦路「天命之子已蜕变！」你抢在他下一句前背出他的台词「这不过是天命对我的考验」——他目瞪口呆「这剧本不对！」被你一招打飞后，他在空中大喊「这绝对是天命对我的考验！」" },
                        { eventName: "素问的丹方", description: "素问长老叫住你，塞来一张古旧的丹方「孩子，这是老身毕生所悟。你那配平之法，老身也想学学。」她眼神温和如母，又带着几分对后辈天赋的震撼。你给她讲了一下午化学配平，她连叹「老身炼丹百年，竟不如你一个思路。」" },
                        { eventName: "师尊的指點", description: "苏婉清深夜立于你窗外，一道剑意点在你眉心，是剑道心得。她没说话，转身离去时白发在月色里如霜。你系统提示「检测到渡劫期剑意灌顶，剑道修为+30」。你心里默念：『师尊这是被我那天算法剑法惊到了，主动来指點的。道的裂缝，非情。』" },
                        { eventName: "九尾报恩追随", description: "九尾挡在你身前，银白狐尾化为护盾「恩人，三百年前你救我一命，今天我还你。从今往后，九尾愿追随恩人。」她的琥珀色竖瞳里是报恩的追随，非执念。你心里默念：『《逆天仙途》九尾报恩桥段，一字不差。』" },
                        { eventName: "凤栖梧被实力折服", description: "凤栖梧单膝跪地，火红长发垂首「你这只蝼蚁……不，你是真龙。凤凰一族，愿奉你为主。」她第一次低下了高傲的头——是被你跨时代碾压的实力折服，纯粹是慕强追随关系。你心里默念：『凤栖梧在原著第三十章被主角实力折服，提前了。』" },
                        { eventName: "白灵音命格观察", description: "白灵音路过你的营帐，突然停下，碧绿眼眸凝重「施主……你的命格不在天道推演之中。贫尼观你行事，皆有先知先觉之能，仿佛……」她摇头，合十「贫尼失言了。施主是异常命格，贫尼会持续观察。」——这是同道观察，非情。" },
                        { eventName: "姬无双结盟出手", description: "魔修偷袭时，一道酒红魔气扫退敌人。你回头，只看见姬无双的身影一闪而逝，传音入密「道友，咱们是结盟关系，这点小忙不算什么。不过下次秘境机缘，记得三七分。」你心里默念：『《逆天仙途》姬无双本该按原著第二十一章留信物消失，被我反套路提前结盟了。』" }
                    ],
                    endingEvents: [
                        {
                            trigger: { daoHeart: ">70", suwanqingFavor: ">80" },
                            eventName: "师尊传道",
                            description: "金丹大成那夜，苏婉清立于剑冢前，看你将霜雪剑诀与算法融合，自创一式，冰蓝眼眸里第一次有了震动「你让老身重新审视修行之道。八百年来，老身以为道只有一条——今日方知，道有千万条。」她将毕生所悟的剑道心得传给你「你这道心，比老身想象的更通透。是你让老身重新看见了道。」这是你修仙路上被师尊真正认可——道的认可，非情。"
                        },
                        {
                            trigger: { jiwushuangFavor: ">80", magicCorruption: ">50" },
                            eventName: "魔女结盟",
                            description: "金丹大成时，姬无双现身祝贺，却被正道联军围攻——她的万魔宗圣女身份暴露。你挡在她身前，为她挡下苏婉清的一剑。苏婉清震惊「你竟为魔修挡剑？」你握着姬无双的手，平静道「她是我的盟友，不是敌人。」姬无双凤眼含笑「道友，你这反套路……本圣女服了。结盟到此为止？不，从今天起，正式结盟，共谋魔渊机缘。」你心里默念：『《逆天仙途》姬无双本该按原著在这章留下纠葛伏笔，被我反套路改成正式结盟了。』——这是结盟，非情。"
                        },
                        {
                            trigger: { bailingyinFavor: ">80" },
                            eventName: "圣女担保",
                            description: "正道联盟大会上，有人质疑你魔气侵蚀已不可救药。白灵音当众站出，碧绿眼眸坚定「此子命格异常，佛门信誉担保。他若走魔道，贫尼愿同受天谴。」全场哗然。她转身对你合十「施主是异常命格，贫尼从未见过。愿佛祖保佑施主。」——这是同道之间的认可与观察，非情。"
                        },
                        {
                            trigger: { daoHeart: ">90", magicCorruption: "<30" },
                            eventName: "渡劫飞升",
                            description: "飞升台上，仙光流转。天劫被系统吸收转化为修为，你周身金光万丈，直冲渡劫期。全场哗然——万年来第一位吸收天劫渡劫的修士。苏婉清冰蓝眼眸里有震动，望着你的背影低语「你的道……不似人间之道。」白灵音合十「施主命格异常，贫尼从未见过。」萧逸尘立于远处，喃喃「当年那个废柴……他到底是谁？」姬无双凤眼含笑「道友，反套路打得漂亮。」王腾合上《天命录》「这剧本……天意难测！」你穿过仙门，金光万丈照彻天地。万年来，第一位以异常命格白日飞升的修士——他到底是谁，无人知晓，但他的道，已震慑三界。"
                        },
                        {
                            trigger: { systemPoints: ">500" },
                            eventName: "系统终极任务完成",
                            description: "飞升台上，系统面板浮现「终极任务完成：渡劫飞升。奖励：天劫吸收卡生效，系统升级至V2.0。宿主通关《逆天仙途》，获得「穿越者勋章×1」」。你笑了笑，看着升级后的系统面板「下一本爽文，继续通关。」你穿过仙门，白日飞升。系统在你眉心轻轻提示「检测到下一个世界——「末世废土」，是否穿越？」你心里默念：『下一局，我继续降维打击。』这是穿越者爽文的标配——通关一本，下一本。"
                        },
                        {
                            trigger: { daoHeart: "<60", magicCorruption: ">80" },
                            eventName: "渡劫失败",
                            description: "天劫时，魔气反噬，你道心崩溃。天雷劈下，你魂飞魄散。系统警报「检测到宿主陨落，是否消耗全部系统积分复活？」你已无法回应。苏婉清嘶吼着冲上祭坛，只接住你破碎的衣角。林月瑶泪流满面，叶灵溪咬着唇不哭出声，陆青阳跪在地上嚎啕。苏婉清白发如雪，冰蓝眼眸空洞「你的道……不似人间之道。但你这道心，老身记下了。」万年来，又一位渡劫失败者。但传说，系统面板在你眉心残留了一丝光——或许，下一局再见。"
                        }
                    ]
                }
            }
        ];

        if (typeof window !== 'undefined') {
            window.gameChapters = gameChapters;
        }
