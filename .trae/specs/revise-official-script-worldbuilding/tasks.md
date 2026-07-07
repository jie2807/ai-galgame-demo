# Tasks

- [x] Task 1: 提取并整理当前官方剧本背景与世界观
  - [x] SubTask 1.1: 从 `index.html` 提取 `gameWorldInfo` 全部条目
  - [x] SubTask 1.2: 提取 8 位核心 NPC 的描述、性格、开场白
  - [x] SubTask 1.3: 提取 3 条路线章节的场景、玩家角色、AI 指令
  - [x] SubTask 1.4: 提取物品库与地点体系概要
  - [x] SubTask 1.5: 提取 AI 深度融合规则（noxasenDeepRules）
  - [x] SubTask 1.6: 将提取内容整理为结构化审阅文档并呈现给用户

- [x] Task 2: 根据用户反馈起草新的世界观与事件设计
  - [x] SubTask 2.1: 将政治框架从二元君主立宪制改为绝对君主制 + 三级会议结构
  - [x] SubTask 2.2: 重写三条路线开场与玩家定位（旁白/报告/报纸形式）
  - [x] SubTask 2.3: 调整 NPC 关系与口吻（路线二玩家为公爵，NPC 禁用命令口吻）
  - [x] SubTask 2.4: 设计三条路线的时间线事件、阈值事件、随机事件与终局事件
  - [x] SubTask 2.5: 更新 AI 叙事规则（noxasenDeepRules）
  - [x] SubTask 2.6: 将设计稿写入 spec.md 并呈现给用户

- [ ] Task 3: 等待用户确认设计稿
  - [ ] SubTask 3.1: 向用户展示重写后的世界观、路线开场与事件系统
  - [ ] SubTask 3.2: 记录用户对设计稿的修改意见或确认
  - [ ] SubTask 3.3: 与用户确认最终实施范围

- [ ] Task 4: 按确认后的设计修改官方剧本数据
  - [ ] SubTask 4.1: 修改 `gameWorldInfo` 中全部世界观条目
  - [ ] SubTask 4.2: 同步修改 `gameCharacters` 中受影响 NPC 描述、性格与开场白
  - [ ] SubTask 4.3: 同步修改 `gameChapters` 中受影响章节场景、玩家描述与 AI 指令
  - [ ] SubTask 4.4: 同步修改 `gachaPool` 中受影响角色背景与描述
  - [ ] SubTask 4.5: 同步修改 `itemLibrary` 与 `chapterLocations` 中受影响条目
  - [ ] SubTask 4.6: 更新 `noxasenDeepRules` 中的政治/叙事约束

- [ ] Task 5: 验证修改后的世界观一致性
  - [ ] SubTask 5.1: 检查所有文本中是否残留旧设定关键词（二元君主立宪、大选、民选院等）
  - [ ] SubTask 5.2: 检查 NPC、章节、物品、地点描述是否相互矛盾
  - [ ] SubTask 5.3: 确认 `1920s` / `政治` 标签未意外变更
  - [ ] SubTask 5.4: 确认自定义剧本与其他系统未受影响

# Task Dependencies
- Task 2 depends on Task 1
- Task 3 depends on Task 2
- Task 4 depends on Task 3
- Task 5 depends on Task 4
