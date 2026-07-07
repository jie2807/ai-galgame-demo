# Tasks

- [x] Task 1: 提取角色数据到外部文件
  - [x] 1.1 在 `d:\BC\ai_resume\qmzz\` 下创建 `data/characters.js`
  - [x] 1.2 将 `gameCharacters` 对象完整复制到 `data/characters.js`
  - [x] 1.3 将 `gachaPool` 数组完整复制到 `data/characters.js`
  - [x] 1.4 将 `DEFAULT_CHARACTER_POOL` 数组完整复制到 `data/characters.js`
  - [x] 1.5 确保三个变量在 `data/characters.js` 中使用 `var` 声明，保持全局可访问

- [x] Task 2: 在 index.html 中加载外部角色数据
  - [x] 2.1 找到 `index.html` 中 `<script>` 标签开始定义 `gameCharacters` 的位置
  - [x] 2.2 在该位置之前添加 `<script src="data/characters.js"></script>`
  - [x] 2.3 从 `index.html` 中删除原始的 `gameCharacters`、`gachaPool`、`DEFAULT_CHARACTER_POOL` 定义
  - [x] 2.4 确认删除后没有残留语法错误（如多余的分号、括号不匹配）

- [x] Task 3: 验证与回归测试
  - [x] 3.1 启动本地服务器，打开首页
  - [x] 3.2 验证控制台无 `gameCharacters`、`gachaPool`、`DEFAULT_CHARACTER_POOL` 未定义报错
  - [x] 3.3 进入抽卡界面，确认角色列表与抽取结果正常
  - [x] 3.4 进入自定义剧本编辑器，添加 NPC 并选择立绘，确认立绘面板正常显示角色
  - [x] 3.5 进入聊天/角色选择界面，确认 `gameCharacters` 中的角色可用
  - [x] 3.6 确认删除角色或更改立绘路径后，功能同步生效

- [x] Task 4: 输出使用说明
  - [x] 4.1 在最终回复中给出 `data/characters.js` 的完整路径
  - [x] 4.2 说明如何添加/删除角色
  - [x] 4.3 说明如何替换静态立绘图片和 Live2D 模型路径

# Task Dependencies
- [Task 2] depends on [Task 1] - 先创建外部文件，再引入并删除内嵌代码
- [Task 3] depends on [Task 2] - 验证在迁移完成后进行
- [Task 4] depends on [Task 3] - 使用说明在验证通过后输出
