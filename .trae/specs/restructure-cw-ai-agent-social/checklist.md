# 验证清单

## 严重Bug修复
- [x] 发布内容后首页正确显示内容（不再空白）
- [x] 高低消耗模式选择正确（低消耗→低消耗逻辑，高消耗→高消耗逻辑）
- [x] 进入个人空间→创作中心后标题栏不重复

## Agent角色系统
- [x] AGENT_DEFS 包含5种Agent类型模板（调查型/情感型/理性型/键盘侠/中立型）
- [x] Agent数据结构包含完整字段（id, name, avatar, portraitId, personality, background, viewpoint等）
- [x] `addAgent` 方法正确添加新Agent
- [x] `removeAgent` 方法正确删除Agent
- [x] `assignPortrait` 方法正确关联gachaPool角色形象
- [x] `generateAgentPersona` 方法AI生成完整Agent人设
- [x] Agent数量限制在1-8个之间

## Agent配置入口
- [x] 入口对话框显示Agent数量和类型配置
- [x] 可以添加Agent并选择类型
- [ ] 可以为Agent配置名称和形象
- [x] 点击"开始"后正确初始化Agent系统

## 首页信息流
- [x] 首页展示所有Agent发布的内容
- [x] 内容卡片显示Agent头像（portrait优先，fallback emoji）
- [x] 内容卡片显示Agent名称、标题、播放量、评论数
- [ ] 标签筛选功能正常（推荐/热门/最新/关注）
- [x] Agent直播中的卡片显示"🔴直播中"标识
- [x] 点击内容进入详情页

## Agent管理界面
- [x] 用户头像下拉菜单中有"Agent管理"入口
- [x] Agent管理面板显示卡片式Agent列表
- [ ] 添加Agent弹窗功能完整（类型选择→名称输入→形象配置→AI生成）
- [x] 形象选择显示已拥有的gachaPool角色
- [x] 删除Agent有确认弹窗
- [x] 删除后Agent内容标记为"已注销"

## Agent直播功能
- [x] 直播间布局正确（Agent形象区 + 弹幕区 + 输入框）
- [x] Agent开启直播后首页显示直播标识
- [x] 玩家发送弹幕后Agent AI实时回复
- [x] Agent直播期间自主发言
- [x] 直播3-5分钟后自动结束
- [ ] 直播结束后生成回放卡片

## Agent聊天功能
- [x] 点击Agent头像/名称打开聊天窗口
- [x] Agent聊天风格符合其性格设定
- [x] 键盘侠类型Agent使用攻击性语言风格
- [x] 聊天记录持久化到localStorage

## 评论区互动
- [x] 视频详情页有玩家评论输入框
- [x] 玩家评论后Agent AI生成回复
- [x] 键盘侠Agent可能产生攻击性回复
- [ ] 评论支持点赞/踩

## 旧流程移除
- [ ] 创作中心面板已移除
- [ ] publishVideo函数已移除
- [ ] 抖加推广面板已移除
- [ ] 工作室区域改为Agent管理界面
- [ ] 个人空间简化为玩家信息展示

## JavaScript正确性
- [ ] 无运行时错误
- [ ] 所有事件绑定正常工作
- [ ] 视图切换流畅
- [ ] localStorage数据正确保存和加载
