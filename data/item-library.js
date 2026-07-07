        var itemLibrary = {
            // 关键物品
            voter_register: { id: 'voter_register', name: '选民登记册 / 第三等级代表名册', description: '记载着王都数个选区第三等级合格选民、代表资格与陈情书签署情况的官方名册，是代表选举与动员的核心依据。', type: 'key', effect: null, icon: '📋' },
            seat_list: { id: 'seat_list', name: '三级会议代表名单 / 陈情书摘要', description: '详细列出即将召开的三级会议代表名单、各等级席位分配与摇摆情况的密件，附有各地陈情书摘要，各方势力都想得到它。', type: 'key', effect: null, icon: '📜' },
            rosenberg_crest: { id: 'rosenberg_crest', name: '贵族徽记', description: '罗森伯格家族的银质徽记，可在贵族沙龙与私人军营中证明身份或打开后门。', type: 'key', effect: null, icon: '🛡️' },
            royal_seal: { id: 'royal_seal', name: '王室令牌', description: '刻有诺克萨森王冠纹章的鎏金令牌，代表君主权威，可命令近卫军与低级官员。', type: 'key', effect: null, icon: '👑' },
            revolutionary_manifesto: { id: 'revolutionary_manifesto', name: '第三等级宣言 / 国民议会宣言', description: '公民论坛秘密印刷的政治宣言，字里行间充满对旧贵族的控诉、按人头投票的诉求与新秩序的构想，可与陈情书形成互补。', type: 'key', effect: null, icon: '📢' },
            secret_police_file: { id: 'secret_police_file', name: '秘密警察档案', description: '黑鸦内部流出的监视档案，记录着贵族、政客与王室的丑闻与把柄。', type: 'key', effect: null, icon: '📁' },
            cahiers_de_doleances: { id: 'cahiers_de_doleances', name: '陈情书', description: '各地第三等级呈递给三级会议的《陈情书》（cahiers de doléances），记录着税收、代表权与废除特权的诉求，是合法改革的核心文件。', type: 'key', effect: null, icon: '📜' },
            tax_exemption_charter: { id: 'tax_exemption_charter', name: '免税特许状', description: '某位贵族世家持有的免税特许状原本，详细列明其土地、产业与间接税豁免条款，既可作为特权的象征，也可成为攻击旧制度的把柄。', type: 'key', effect: null, icon: '📜' },
            royal_edict_copy: { id: 'royal_edict_copy', name: '国王诏令副本', description: '《施利芬堡诏令》的副本，印有国王玺印，是三级会议召集与改革议程的官方依据。', type: 'key', effect: null, icon: '📜' },
            clerical_pastoral: { id: 'clerical_pastoral', name: '教士牧函', description: '国家主教团发布的牧函，阐述教会对等级秩序、社会救济与王权合法性的立场，可影响教会支持度。', type: 'key', effect: null, icon: '📜' },
            noble_letter: { id: 'noble_letter', name: '贵族密信', description: '贵族世家之间秘密往来的信件，字里行间藏着联姻、密谋、私兵调动与宫廷交易的暗语。', type: 'key', effect: null, icon: '✉️' },
            // 消耗品
            fine_cigar: { id: 'fine_cigar', name: '上等雪茄', description: '贵族沙龙与军官俱乐部里的社交必需品，一支好雪茄有时比一袋金币更能打开话题。', type: 'consumable', effect: { mood: 10 }, icon: '🚬' },
            black_coffee: { id: 'black_coffee', name: '黑咖啡', description: '施利芬堡工人区最常见的提神饮品，苦涩而滚烫，适合彻夜策划或印刷报纸。', type: 'consumable', effect: { fatigue: -15, mood: 5 }, icon: '☕' },
            bandage: { id: 'bandage', name: '疗伤绷带', description: '粗糙但有效的棉布绷带，用于处理罢工冲突、街头斗殴或秘密行动中的外伤。', type: 'consumable', effect: { health: 20 }, icon: '🩹' },
            tear_gas: { id: 'tear_gas', name: '催泪瓦斯', description: '秘密警察与贵族私兵常用的镇暴工具，也可被公民论坛用于驱散黑鸦搜捕。', type: 'consumable', effect: { mood: -5 }, icon: '💨' },
            forged_papers: { id: 'forged_papers', name: '伪造证件', description: '一套做工精良的假身份文件，可让玩家或NPC在秘密警察的搜捕中暂时脱身。', type: 'consumable', effect: null, icon: '🪪' },
            // 礼物/社交物品
            vintage_wine: { id: 'vintage_wine', name: '名贵葡萄酒', description: '罗森伯格酒窖珍藏的陈年佳酿，送给贵族或军官能迅速拉近关系。', type: 'gift', effect: { affection: 8, trust: 5 }, icon: '🍷' },
            family_brooch: { id: 'family_brooch', name: '家族纹章胸针', description: '精致的罗森伯格家族纹章胸针，作为政治联盟或联姻的象征赠送给关键人物。', type: 'gift', effect: { affection: 10, trust: 8 }, icon: '📌' },
            progressive_book: { id: 'progressive_book', name: '进步书籍', description: '宣传按人头投票与劳动权益的禁书，在知识分子与激进工人中极受欢迎。', type: 'gift', effect: { trust: 8 }, icon: '📚' },
            royal_medal: { id: 'royal_medal', name: '王室勋章', description: '君主亲自颁发的荣誉勋章，可授予忠诚的军官或政治家以巩固效忠。', type: 'gift', effect: { affection: 10, trust: 10 }, icon: '🏅' },
            worker_badge: { id: 'worker_badge', name: '工人徽章', description: '钢铁工会颁发的会员徽章，佩戴它可以在工人区获得信任与庇护。', type: 'gift', effect: { trust: 6 }, icon: '⚙️' },
            // 材料
            printing_paper: { id: 'printing_paper', name: '印刷用纸', description: '一摞适合油印机的粗糙纸张，是印制传单、报纸、陈情书与革命宣言的必备材料。', type: 'material', effect: null, icon: '📄' },
            telegram_draft: { id: 'telegram_draft', name: '电报稿', description: '已经拟好但尚未发送的电报文稿，可用于散布假消息或传递密令。', type: 'material', effect: null, icon: '📠' },
            bribe_pouch: { id: 'bribe_pouch', name: '贿赂金袋', description: '一袋沉甸甸的金马克，在政治交易中没有比它更直白的语言。', type: 'material', effect: null, icon: '💰' },
            gun_parts: { id: 'gun_parts', name: '军火零件', description: '步枪与手枪的备用零件，来源可疑，可用于武装工人自卫队或贵族私兵。', type: 'material', effect: null, icon: '🔫' },
            propaganda_poster: { id: 'propaganda_poster', name: '宣传海报', description: '色彩鲜明的大幅政治海报，贴满街头后可迅速影响特定区域的舆论风向。', type: 'material', effect: null, icon: '🖼️' }
        };
