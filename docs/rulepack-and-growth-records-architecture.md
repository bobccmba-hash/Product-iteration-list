# 后台 4 功能与前台 3 功能串联（研发说明）

## 1. 总体关系（你评审时要讲的那段）

前台学生侧 3 个功能：

- 学校终端学生档案建立
- 学校终端互动结束反馈
- 学校终端互动任务目标

后台配置与数据 4 个功能（不是孤立菜单，是底座）：

- **目标设定**：决定学生中长期成长方向；前台结束页展示“阶段目标推进”
- **任务设定**：决定学生短期挑战内容；前台展示“当前任务/任务进度”
- **勋章设定**：决定学生成就奖励；前台结束页展示“勋章解锁”
- **成长记录**：决定所有计算依据；档案/任务/目标/勋章都依赖它

一句话：**成长记录是事实（events），目标/任务/勋章是规则（rules），前台展示是渲染（render）。**

---

## 2. 统一实现方式：规则包（Rule Pack）+ 终端本地计算 + 同步幂等

### 2.1 配置侧（后台）

后台配置以下内容并发布为规则包版本：

- goals：目标规则（含基础信息、适用范围、条件）
- tasks：任务规则（含基础信息、条件与奖励、分发策略）
- badges：勋章规则（含基础信息、解锁条件、展示配置）
- growth-metrics：成长记录口径（事件类型、指标聚合口径、字段校验）

发布行为：

- 发布后生成新的 `rule_pack_version`
- 回滚并不是“回到旧版本并覆盖”，而是**用旧版本内容生成一个新的版本号**（保证终端缓存与审计一致）

### 2.2 终端侧（学校终端）

终端本地缓存并维护：

- 当前生效规则包（rule pack）
- 学生本地档案（profile）
- 本地成长事件流水（events）
- 本地任务进度（task_state）
- 本地目标进度（goal_state）
- 本地勋章记录（badge_state）

终端渲染前台时只做两件事：

1. 从规则包取“展示字段/策略”（标题、说明、动效、优先级等）
2. 从成长记录派生出“进度/完成/解锁”（本地计算结果）

### 2.3 无网络时

- 继续使用本地规则包版本
- 继续记录成长事件
- 本地算任务/目标/勋章并在结束页反馈
- 将未同步事件标记为 `pending`

### 2.4 有网络时

同步内容（推荐顺序）：

1. 同步成长事件流水（事实数据）
2. 同步任务状态（派生结果，可选；也可由后台重算）
3. 同步目标状态（派生结果，可选；也可由后台重算）
4. 同步勋章记录（派生结果，建议同步获得时间与来源）

关键点：

- **幂等去重**：事件上报必须携带可重试的幂等键（`event_id` 或 `device_id + local_event_id`），后台按幂等键去重
- **版本一致性**：事件记录中建议带 `rule_pack_version`，方便定位“规则变更导致的差异”

---

## 3. 数据模型建议（最小可落地版）

### 3.1 学生档案（StudentProfile）

字段建议：

- `student_id`（全局唯一，可由终端生成或后台分配）
- `school_id` / `grade`
- `created_at` / `last_interaction_at`
- `current_rule_pack_version`

### 3.2 成长事件（GrowthEvent）——系统唯一“事实来源”

字段建议：

- `event_id`（幂等键）
- `student_id`、`device_id`
- `event_type`（interaction_end / card_gain / ...）
- `event_at`
- `delta_value`（数值变化）
- `refs`（可选：task_id/goal_id/badge_id/interaction_id/card_id）
- `rule_pack_version`（当时生效版本）
- `sync_status`（pending/ok/failed）
- `raw_payload`（排查用）

### 3.3 任务状态（TaskState）——可由 events 聚合得到

- `student_id`、`task_id`
- `progress_current` / `progress_target`
- `status`（active/completed/expired）
- `assigned_at` / `completed_at`
- `reward_state`（已发放/待发放）

### 3.4 目标状态（GoalState）——可由 events 聚合得到

- `student_id`、`goal_id`
- `stage`
- `progress_current` / `progress_target`
- `status`（in_progress/completed）

### 3.5 勋章状态（BadgeState）——可由 events 聚合得到

- `student_id`、`badge_id`
- `earned_at`
- `source`（task/goal/event）
- `repeatable` 场景下需记录多次获得历史（建议独立 `BadgeAward` 表）

---

## 4. 页面与数据的对齐方式（开发落地要点）

### 4.1 “配置页为主”的三模块（目标/任务/勋章）

共同点：

- 都需要：列表页（筛选/状态/操作）+ 编辑页（基础信息+适用范围+前台文案）+ 条件页 + 预览页 + 发布记录页
- 发布记录与回滚机制一致：**只生成新版本，不直接修改终端缓存**

### 4.2 “查询/排查为主”的成长记录模块

建议把页面组织成：

- 学生成长档案列表 → 详情（以学生为中心）  
- 成长事件流水（事件视角）  
- 统计分析（运营视角）  

---

## 5. 与前台 3 功能的串联点（字段级）

- 学生档案建立：生成 `student_id` 与本地 profile，后续所有状态都挂在其下
- 互动任务目标：展示字段来自 tasks/goal 的“前台展示设置”，进度来自 task_state/goal_state（由 events 计算）
- 互动结束反馈：展示 “任务推进/目标推进/勋章解锁” 的承接与高光，触发时机来自本地计算结果

