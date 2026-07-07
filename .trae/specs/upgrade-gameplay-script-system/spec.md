# 剧本游玩功能改造升级 Spec

## Why
当前剧本游玩功能存在多个问题：NPC好感度显示不够直观、顶部状态栏信息冗余且位置不合理、缺少剧本分享机制、对话流程存在bug影响玩家体验。需要对UI布局和信息架构进行重构，并建立剧本导入导出系统。

## What Changes
- **MODIFIED** NPC状态栏布局：好感度条从顶部移至NPC头像下方
- **MODIFIED** 顶部世界状态栏：移除NPC名称/好感度，增加地址/天气/时间/玩家健康四项信息
- **ADDED** 剧本导入导出系统：JSON格式剧本文件下载与导入功能
- **MODIFIED** 对话流程优化：修复消息解析、状态同步、NPC切换等bug

## Impact
- 受影响能力：NPC状态显示、世界状态系统、剧本管理、对话引擎
- 受影响代码：`index.html` (game-page UI + JS逻辑)、`styles.css` (NPC bar + status bar样式)

## MODIFIED Requirements

### Requirement: NPC状态栏重新设计
**当前问题**：NPC名称和好感度条在顶部bar中，不直观，玩家难以快速识别当前NPC的好感状态

**修改后设计**：
- NPC头像下方添加好感度条（宽度与头像相近，约40px）
- 顶部bar移除NPC名称和好感度信息
- 顶部bar仅保留：NPC头像 + NPC名称 + 地址信息

#### Scenario: 好感度显示在头像下方
- **WHEN** 玩家查看游戏页面
- **THEN** NPC头像下方显示小型好感度条（宽度~40px，高度~4px）
- **THEN** 好感度条颜色根据好感度等级变化（绿色→黄色→红色）

#### Scenario: 顶部bar精简
- **WHEN** 玩家查看游戏页面顶部
- **THEN** 顶部bar显示：NPC头像 + NPC名称 + 📍地址信息
- **THEN** 不显示好感度条和NPC称号

### Requirement: 世界状态栏信息重组
**当前问题**：天气/时间/玩家状态已存在但位置在NPC bar下方，需要整合到顶部状态栏

**修改后设计**：
- 顶部状态栏合并为一行，显示四项信息：
  1. 📍 地址（当前所在位置）
  2. ☀️ 天气（天气图标+描述）
  3. 🕐 时间（时间+时间段）
  4. 💪 玩家健康（健康状态标签）

#### Scenario: 世界状态信息显示
- **WHEN** 游戏进行时
- **THEN** 顶部状态栏显示：📍 C·H邮政公司 | ☀️ 晴朗 | 🕐 08:30 上午 | 💪 健康
- **THEN** 四项信息用分隔符分隔，水平排列

### Requirement: 剧本导入导出系统设计
**当前问题**：玩家无法分享自定义剧本，缺少标准化的剧本文件格式

**剧本JSON格式规范**：
```json
{
  "version": "1.0",
  "metadata": {
    "title": "剧本标题",
    "author": "作者名称",
    "description": "剧本简介",
    "createdAt": "2026-05-20T00:00:00Z",
    "worldBackground": "世界观背景描述"
  },
  "worldSettings": {
    "loreEntries": [
      {"keys": ["关键词1", "关键词2"], "content": "设定描述"}
    ],
    "locations": [
      {
        "name": "地点名称",
        "description": "地点描述",
        "weatherWeights": {"sunny": 0.4, "cloudy": 0.3, "rainy": 0.2, "foggy": 0.1}
      }
    ]
  },
  "characters": {
    "player": {
      "name": "玩家角色名",
      "title": "玩家身份",
      "description": "角色描述"
    },
    "npcs": [
      {
        "id": "unique_npc_id",
        "name": "NPC名称",
        "title": "NPC身份",
        "description": "详细描述",
        "personality": "性格特征",
        "firstMessage": "开场白"
      }
    ]
  },
  "scriptConfig": {
    "openingScene": "开场场景描写",
    "objective": "剧情目标",
    "initialLocation": "初始地点名称"
  }
}
```

**导入导出功能**：
- 导出：点击"导出剧本"按钮 → 下载JSON文件
- 导入：点击"导入剧本"按钮 → 选择JSON文件 → 验证格式 → 加载到游戏
- 格式验证：检查必需字段、版本兼容性、数据完整性

#### Scenario: 导出自定义剧本
- **WHEN** 玩家在自定义剧本编辑页面点击"导出剧本"
- **THEN** 生成符合规范的JSON文件并触发浏览器下载
- **THEN** 文件名格式：`{剧本标题}_{日期}.json`

#### Scenario: 导入剧本文件
- **WHEN** 玩家在首页点击"导入剧本"并选择JSON文件
- **THEN** 系统验证JSON格式和必需字段
- **THEN** 验证通过后，剧本加载到自定义章节（chapter 2）
- **THEN** 显示成功提示："剧本《{标题}》已导入，点击开始游玩"
- **THEN** 验证失败时显示具体错误信息

#### Scenario: 导入格式验证失败
- **WHEN** 导入的JSON缺少必需字段或格式错误
- **THEN** 显示错误提示："剧本格式错误：缺少{字段名}字段"或"剧本版本不兼容"
- **THEN** 不加载无效的剧本数据

### Requirement: 对话流程Bug修复
**当前问题**：
1. 消息恢复时好感度更新未触发
2. NPC切换后对话上下文不一致
3. 流式响应中断后状态未正确重置
4. 动作标签解析与Live2D联动不稳定
5. 地点变更检测有时失效

**修复方案**：
- 增强消息恢复逻辑：恢复消息时同步恢复NPC状态和好感度
- 统一NPC切换流程：确保上下文、UI、Live2D模型同步更新
- 改进流式响应错误处理：超时/中断时正确重置isStreaming标志
- 稳定动作标签解析：增加容错处理，解析失败不影响文本显示
- 优化地点变更检测：增加模糊匹配和同义词识别

#### Scenario: 消息恢复后状态同步
- **WHEN** 玩家重新进入之前保存的游戏会话
- **THEN** 对话消息正确恢复显示
- **THEN** NPC状态栏显示当前对话NPC
- **THEN** 好感度条显示正确的好感度值
- **THEN** 世界状态（位置/天气/时间/健康）恢复正确

#### Scenario: NPC切换后对话一致性
- **WHEN** 玩家点击NPC列表切换到不同NPC
- **THEN** 系统消息显示"切换对话对象：{NPC名称}"
- **THEN** NPC状态栏更新为新NPC信息
- **THEN** Live2D模型切换为新NPC模型
- **THEN** 后续AI回复使用新NPC的身份和性格

#### Scenario: 流式响应中断恢复
- **WHEN** AI流式响应因网络超时或用户操作中断
- **THEN** isStreaming标志正确重置为false
- **THEN** 输入框恢复可编辑状态
- **THEN** 发送按钮恢复可点击状态
- **THEN** 用户可以重新发送消息

## REMOVED Requirements

### Requirement: 顶部NPC好感度显示
**原因**：好感度信息移至NPC头像下方，顶部空间释放给世界状态信息
**迁移**：好感度显示逻辑保持不变，仅改变UI位置和视觉样式

## ADDED Requirements

### Requirement: 剧本分享功能
系统 SHALL 提供剧本分享能力，使玩家可以导出剧本为标准化JSON文件，其他玩家可以导入该文件体验他人创作的剧本。

#### Scenario: 剧本文件验证
- **WHEN** 导入剧本文件时
- **THEN** 系统检查必需字段：version、metadata.title、characters.npcs、scriptConfig.openingScene
- **THEN** 系统检查version字段是否为兼容版本（当前支持1.0）
- **THEN** 系统检查npcs数组不为空且每个NPC包含name和firstMessage字段
- **THEN** 所有检查通过后标记为有效剧本

### Requirement: 好感度视觉反馈
系统 SHALL 提供好感度视觉反馈，使玩家可以直观看到NPC好感度等级变化。

#### Scenario: 好感度条颜色变化
- **WHEN** NPC好感度等级变化时
- **THEN** 好感度条颜色根据等级变化：
  - 初识（0-20%）：浅灰色
  - 熟悉（20-40%）：绿色
  - 信赖（40-60%）：蓝色
  - 挚友（60-80%）：金色
  - 羁绊（80-100%）：紫色带发光效果
