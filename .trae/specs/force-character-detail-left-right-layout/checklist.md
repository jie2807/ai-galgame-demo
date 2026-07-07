# Checklist

## 强制左右布局

- [x] 1280px 桌面端仍为左右两栏
- [x] 768px 平板端不再上下堆叠，仍为左右两栏
- [x] 375px 手机端仍为左右两栏
- [x] `.chardetail-content` 在所有断点下 `flex-direction: row`

## 移动端可读性

- [x] 375px 下信息区内容可阅读
- [x] 375px 下信息区可滚动（overflow-y: auto）
- [x] 375px 下立绘完整可见
- [x] 按钮在 375px 下可点击

## 兼容性与非干扰

- [x] 桌面端布局与样式未退化
- [x] 立绘 `object-fit: contain` 保持不变
- [x] 角色聊天页未受影响
- [x] 角色列表页未受影响
