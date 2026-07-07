# Tasks

- [x] Task 1: 引入 Three.js 和 three-vrm 依赖
  - [x] SubTask 1.1: 在 index.html 的 `<head>` 中添加 importmap（three、three/addons/、@pixiv/three-vrm、fflate）
  - [x] SubTask 1.2: 添加 `<script type="module">` 初始化 VRM 全局变量（window._vrmReady 标志）

- [x] Task 2: 下载 VRM 模型和 Mixamo 动画文件
  - [x] SubTask 2.1: 下载 VRM 示例模型到 `models/vrm/` 目录（从 three-vrm 仓库或 CDN 获取 VRM1_Constraint_Twist_Sample.vrm）
  - [x] SubTask 2.2: 使用内置程序化动画替代 Mixamo FBX 文件（idle、wave、bow、nod、shake_head、raise_right_hand、raise_left_hand、jump、clap）
  - [x] SubTask 2.3: 验证所有下载文件可正常访问

- [x] Task 3: 创建 VRMRenderer 类
  - [x] SubTask 3.1: 创建 `vrm-renderer.js` 文件，实现 constructor + initialize（Three.js 场景、相机、灯光、渲染器、OrbitControls）
  - [x] SubTask 3.2: 实现 loadModel(url) 方法（GLTFLoader + VRMLoaderPlugin + VRMUtils 优化）
  - [x] SubTask 3.3: 实现 loadMixamoAnimation(url) 方法（FBXLoader + 骨骼重定向 + AnimationMixer）
  - [x] SubTask 3.4: 实现 playAnimation / stopAnimation / crossFade 动画控制方法
  - [x] SubTask 3.5: 实现 setBoneRotation / resetPose 骨骼控制方法
  - [x] SubTask 3.6: 实现 playExpression / getAvailableExpressions 表情控制方法
  - [x] SubTask 3.7: 实现 resize / destroy 资源管理方法
  - [x] SubTask 3.8: 实现 _animate 渲染循环（requestAnimationFrame + vrm.update + mixer.update）

- [x] Task 4: 改造全身模型测试页面
  - [x] SubTask 4.1: 修改测试页面 HTML 结构，将 canvas 容器适配 Three.js（移除 PIXI.js canvas，添加 Three.js 渲染容器）
  - [x] SubTask 4.2: 修改测试页面 JS 逻辑，使用 VRMRenderer 替代 Live2DRenderer
  - [x] SubTask 4.3: 实现动作列表 UI（内置动画按钮 + 骨骼姿势预设按钮）
  - [x] SubTask 4.4: 实现表情列表 UI（VRM BlendShape 表情按钮）
  - [x] SubTask 4.5: 实现视角控制（OrbitControls 替代 2D 位移按钮）
  - [x] SubTask 4.6: 更新 CSS 样式适配 3D 模型显示

- [x] Task 5: 实现 AI 文字控制 VRM 模型
  - [x] SubTask 5.1: 创建动作映射表（中文关键词 → 动画名）
  - [x] SubTask 5.2: 修改 AI 控制逻辑，支持动画匹配和骨骼姿势控制
  - [x] SubTask 5.3: AI 返回动作指令时，优先本地关键词匹配，其次调用 AI API

- [ ] Task 6: 测试与验证
  - [ ] SubTask 6.1: 验证 VRM 模型在测试页面正确加载和显示
  - [ ] SubTask 6.2: 验证内置动画正确播放和切换
  - [ ] SubTask 6.3: 验证 AI 文字控制功能正常工作
  - [ ] SubTask 6.4: 验证表情控制功能正常工作
  - [ ] SubTask 6.5: 验证页面关闭时资源正确销毁

# Task Dependencies

- Task 1 → Task 3（VRMRenderer 依赖 Three.js 和 three-vrm 库）
- Task 2 → Task 4（测试页面依赖 VRM 模型和动画文件）
- Task 3 → Task 4（测试页面依赖 VRMRenderer 类）
- Task 3 → Task 5（AI 控制依赖 VRMRenderer 的动画和骨骼方法）
- Task 4 + Task 5 → Task 6（测试验证依赖所有功能完成）
