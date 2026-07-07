# Checklist

- [x] 对话栏头像元素引用已在 Galgame Dialogue System 初始化时获取
- [x] NPC 发言时对话栏头像显示 portrait 图片或首字符 fallback
- [x] 旁白发言时对话栏头像隐藏（添加 hidden 类）
- [x] 玩家发言时对话栏头像显示 fallback
- [x] NPC 发言时对话栏标题显示 charData.title
- [x] 旁白/玩家发言时对话栏标题清空
- [x] galgameDialogueNameWrap 根据 speaker 类型正确添加/移除 CSS 类（通过 is-narrator 类控制）
- [x] addTypingIndicator 视觉模式判断条件已扩展（支持 galgameDialogueBar 可见性检查）
- [x] 官方剧本发送消息时可视化等待条正常显示
- [x] 自定义剧本所有功能不回归
- [x] 立绘加载速度无明显退化（已排查重复加载/缺少缓存问题）
- [x] 游戏内 AI 回复速度不受剧本生成 maxTokens 改动影响
- [x] 文件语法检查通过（无 JS 错误）
