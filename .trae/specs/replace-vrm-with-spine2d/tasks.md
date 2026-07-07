# Tasks

- [x] Task 1: 创建 SpineRenderer 类
  - [x] SubTask 1.1: 创建 `spine-renderer.js`，实现 SpineRenderer 类骨架（constructor、initialize、destroy）
  - [x] SubTask 1.2: 实现 loadModel 方法（加载 .skel/.json + .atlas + 纹理）
  - [x] SubTask 1.3: 实现动画播放方法（playAnimation、addAnimation、stopAnimation）
  - [x] SubTask 1.4: 实现骨骼控制方法（setBoneRotation、resetPose）
  - [x] SubTask 1.5: 实现皮肤切换方法（setSkin、getAvailableSkins）
  - [x] SubTask 1.6: 实现辅助方法（getAvailableAnimations、getAvailableBones、resize）
  - [x] SubTask 1.7: 实现 AI 控制映射（actionMap、文字指令→动画匹配）

- [x] Task 2: 准备 Spine 模型资源
  - [x] SubTask 2.1: 创建 `models/spine/` 目录
  - [x] SubTask 2.2: 下载或创建 Spine 示例模型文件（.skel/.json + .atlas + 纹理 .png）
  - [x] SubTask 2.3: 验证模型文件可正常加载

- [x] Task 3: 改造 index.html 测试页面
  - [x] SubTask 3.1: 移除 Three.js / VRM 相关 CDN 依赖（importmap 中的 three、@pixiv/three-vrm、fflate）
  - [x] SubTask 3.2: 添加 Spine 运行时 CDN 依赖
  - [x] SubTask 3.3: 修改"人物纪念收藏"测试页面，使用 SpineRenderer 替代 VRMRenderer
  - [x] SubTask 3.4: 更新 AI 控制面板，适配 Spine 动画列表和骨骼控制
  - [x] SubTask 3.5: 更新模型切换按钮，从 VRM 模型列表改为 Spine 模型列表

- [x] Task 4: 清理 VRM 相关代码和资源
  - [x] SubTask 4.1: 移除 `vrm-renderer.js` 的引用
  - [x] SubTask 4.2: 移除 `js/vrm-bundle.js` 和 `js/vrm-entry.js` 的引用
  - [x] SubTask 4.3: 移除 `vendor/` 目录下 Three.js 相关文件（three.core.js、three.module.js、vendor/addons/）
  - [x] SubTask 4.4: 移除 `js/fflate.js` 的引用
  - [x] SubTask 4.5: 清理 index.html 中所有 VRM/Three.js 相关的 JS 代码

- [ ] Task 5: 测试验证
  - [ ] SubTask 5.1: 验证 Spine 模型加载和显示正常
  - [ ] SubTask 5.2: 验证所有动画播放正常
  - [ ] SubTask 5.3: 验证 AI 文字控制动作正常
  - [ ] SubTask 5.4: 验证骨骼姿势控制正常
  - [ ] SubTask 5.5: 验证 Live2D 页面（抽卡、角色详情）未受影响
  - [ ] SubTask 5.6: 验证移动端显示和性能

# Task Dependencies
- [Task 2] depends on [Task 1] (需要 SpineRenderer 类来验证模型加载)
- [Task 3] depends on [Task 1] 和 [Task 2] (需要 SpineRenderer 和模型资源)
- [Task 4] depends on [Task 3] (改造完成后再清理旧代码)
- [Task 5] depends on [Task 3] 和 [Task 4] (改造和清理完成后测试)
