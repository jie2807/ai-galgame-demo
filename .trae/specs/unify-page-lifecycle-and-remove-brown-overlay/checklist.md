# Checklist

## 页面生命周期管理

- [x] `PageManager` 对象存在且提供 `activate(pageId)` 与 `deactivateAll()` 方法
- [x] 进入任意子页面时，其他子页面的 `.active` 类被移除
- [x] 进入任意子页面时，首页添加 `.home-hidden`
- [x] 返回首页时，所有子页面的 `.active` 类被移除
- [x] 返回首页时，首页移除 `.home-hidden`
- [x] 主要入口（文明的枝节、纪念收藏、开始游戏等）使用 `PageManager.activate`
- [x] 主要返回逻辑使用 `PageManager.deactivateAll` 或 `PageManager.activate`
- [x] `NavigationHistory.push/pop` 逻辑未受影响

## 咖啡色遮罩移除

- [x] 抽卡页背景不再呈现咖啡色
- [x] 图鉴页背景不再呈现咖啡色
- [x] 角色详情页背景不再呈现咖啡色
- [x] 角色聊天页背景不再呈现咖啡色
- [x] 游戏页背景不再呈现咖啡色
- [x] 书架/阅读器页背景不再呈现咖啡色
- [x] 模型测试页背景不再呈现咖啡色
- [x] 背景图/视频仍然可见
- [x] 文字和 UI 仍然可读

## 兼容性与非干扰

- [x] 首页功能正常
- [x] 抽卡系统功能正常
- [x] 角色图鉴与详情功能正常
- [x] 角色聊天功能正常
- [x] 游戏主流程可正常进入和退出
- [x] AI 工作台未受影响
- [x] 邮箱系统未受影响
- [x] 移动端 375px~768px 页面切换正常
