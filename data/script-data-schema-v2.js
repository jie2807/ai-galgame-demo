        var SCRIPT_DATA_SCHEMA_V2 = {
            version: "2.0",
            metadata: {
                id: "",
                title: "",
                author: "",
                description: "",
                coverImage: "",
                tags: [],
                createdAt: "",
                updatedAt: "",
                uncertaintyLevel: "medium",
                narrativePerspective: "third_person",
                enableDice: false
            },
            worldSettings: {
                background: "",
                loreEntries: [],
                locations: [],
                events: [],
                worldContext: []
            },
            characters: {
                // player.description 应承载"剧本主控文档"四段式结构：
                // 1. 玩家角色基础描述（身份/背景/性格）
                // 2. 【AI叙事指令】路线核心目标、动态分支策略、NPC 称呼规则、信息呈现方式
                // 3. 【AI需跟踪状态】列出 stateVars 中各变量的含义
                // 4. 【事件系统】时间线事件清单、阈值事件、随机事件、终局事件概要
                // 5. 【语言风格】基调、氛围、母题
                player: { name: "", title: "", description: "" },
                npcs: []
            },
            items: [],
            scriptConfig: {
                openingScene: "",
                initialLocation: ""
            },
            stateVars: [],
            timelineEvents: [],
            thresholdEvents: [],
            randomEvents: [],
            endingEvents: []
        };
