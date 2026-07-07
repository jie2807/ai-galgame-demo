# Fix Character List & Detail Pages Responsive Scaling Spec

## Why
角色列表页面和角色详情页面的响应式缩放几乎和没改一样。角色列表页面缩小后元素不缩放导致溢出重叠，角色详情页放大时文字增长太慢、间距不跟随缩放。

## What Changes
- 角色列表页面: 对所有clamp最小值进行彻底降低，确保页面缩小到320px时所有元素持续缩小；在所有媒体查询中添加完整的覆盖规则
- 角色详情页面: 增大所有字体的vw权重使放大时更明显；增大所有间距的vw/vh权重使内容间隔跟随页面缩放

## Impact
- Affected specs: continuous-responsive-scaling
- Affected code: d:\BC\ai_resume\qmzz\styles.css (角色列表页面 ~line 6780-6990, 角色详情页面 ~line 6992-7324)

## ADDED Requirements

### Requirement: 角色列表页面完整响应式缩放
系统 SHALL 确保角色列表页面在页面宽度从1920px缩小到320px时，所有元素（标题、按钮、卡片、文字、图标）持续缩小，不出现溢出、重叠、水平滚动。页面 SHALL 禁止上下滚动 (overflow: hidden)。

#### Scenario: 页面缩小到320px
- **WHEN** 用户将浏览器窗口缩小到320px宽度
- **THEN** 角色列表页面所有文字、卡片、按钮持续缩小，无溢出

#### Scenario: 页面放大到1920px
- **WHEN** 用户将浏览器窗口放大到1920px宽度
- **THEN** 角色列表页面所有元素适当放大，布局合理

### Requirement: 角色详情页面字体和间距响应式
系统 SHALL 确保角色详情页面放大时文字以足够快的速率增长，缩小时以足够快的速率减小。类别、性格、年龄、性别等内容之间的间距 SHALL 跟随页面大小自动缩放。

#### Scenario: 页面放大到1920px
- **WHEN** 用户将浏览器窗口放大到1920px宽度
- **THEN** 文字以明显的速率增长（vw权重≥2.0），间距以vh/vw权重增长

#### Scenario: 页面缩小到320px
- **WHEN** 用户将浏览器窗口缩小到320px宽度
- **THEN** clamp最小值足够小（≤5px），文字和间距持续缩小
