export type RuleStatus = 'draft' | 'published' | 'disabled'

export type OfflineSupport = 'supported' | 'not_supported'

export type GoalType = 'cumulative' | 'streak' | 'collection' | 'achievement'

export type TaskCycle = 'daily' | 'weekly' | 'stage' | 'one_time'

export type TaskType = 'count' | 'collection' | 'streak' | 'theme'

export type BadgeLevel = 'bronze' | 'silver' | 'gold' | 'diamond'

export type CompareOp = '=' | '>=' | '<='

export type StatPeriod = 'cumulative' | 'day' | 'week' | 'month' | 'streak_days'

export type ScopeKind = 'all' | 'theme' | 'card_type'

export type PublishRecord = {
  id: string
  module: 'goals' | 'tasks' | 'badges'
  version: string
  publishedAt: string
  publisher: string
  changeNote: string
  impactCount: number
}

export type Goal = {
  id: string
  name: string
  code: string
  type: GoalType
  stage: number
  schools: string[]
  grades: string[]
  deviceGroups: string[]
  offline: OfflineSupport
  status: RuleStatus
  latestVersion: string
  updatedAt: string
  priority: number
  inUseTerminalCount?: number
}

export type GoalCondition = {
  id: string
  conditionType: string
  metric: string
  op: CompareOp
  targetValue: number
  period: StatPeriod
  scope: { kind: ScopeKind; value?: string }
  must: boolean
}

export type Task = {
  id: string
  name: string
  code: string
  type: TaskType
  cycle: TaskCycle
  rewardSummary: string
  distribution: string
  scopeSummary: string
  schools: string[]
  grades: string[]
  deviceGroups: string[]
  offline: OfflineSupport
  status: RuleStatus
  updatedAt: string
  inUseTerminalCount?: number
}

export type Badge = {
  id: string
  name: string
  code: string
  level: BadgeLevel
  unlockSummary: string
  repeatable: boolean
  scopeSummary: string
  schools: string[]
  grades: string[]
  deviceGroups: string[]
  offline: OfflineSupport
  status: RuleStatus
  updatedAt: string
  inUseTerminalCount?: number
}

export type Terminal = {
  id: string
  name: string
  school: string
  gradeBand: string
  deviceGroup: string
}

export type StudentGrowthSummary = {
  studentId: string
  displayName: string
  school: string
  grade: string
  firstAt: string
  lastAt: string
  totalInteractions: number
  totalCards: number
  currentTask: string
  currentGoal: string
  badgeCount: number
  syncStatus: 'ok' | 'pending' | 'failed'
  hasUnsynced: boolean
  // 新增：成长记录列表扩展字段（原型占位）
  avatarUrl?: string
  age?: number
  gender?: '男' | '女' | '其他'
  createdAt?: string
  schoolAccountId?: string
  deviceId?: string
  statusLabel?: string
  wechatBound?: boolean
}

export const mockSchools = ['示例小学A', '示例小学B', '示例小学C', '示例小学D（新区）', '示例小学E（实验）']
export const mockGrades = ['一年级', '二年级', '三年级', '四年级', '五年级', '六年级']
export const mockDeviceGroups = ['默认设备组', '低年级设备组', '中年级设备组', '高年级设备组', '高频互动设备组', '离线优先设备组']

export const mockTerminals: Terminal[] = [
  {
    id: 'term_a_1_01',
    name: '示例小学A · 一年级 · 默认组 01 号终端',
    school: '示例小学A',
    gradeBand: '一年级',
    deviceGroup: '默认设备组',
  },
  {
    id: 'term_a_2_02',
    name: '示例小学A · 二年级 · 默认组 02 号终端',
    school: '示例小学A',
    gradeBand: '二年级',
    deviceGroup: '默认设备组',
  },
  {
    id: 'term_b_2_low_01',
    name: '示例小学B · 低年级 · 设备组 01 号终端',
    school: '示例小学B',
    gradeBand: '一-二年级',
    deviceGroup: '低年级设备组',
  },
  {
    id: 'term_c_3_mid_01',
    name: '示例小学C · 三年级 · 中年级组 01 号终端',
    school: '示例小学C',
    gradeBand: '三年级',
    deviceGroup: '中年级设备组',
  },
  {
    id: 'term_d_high_01',
    name: '示例小学D（新区）· 高年级 · 设备组 01 号终端',
    school: '示例小学D（新区）',
    gradeBand: '四-六年级',
    deviceGroup: '高年级设备组',
  },
  {
    id: 'term_e_offline_01',
    name: '示例小学E（实验）· 离线优先设备 · 01 号终端',
    school: '示例小学E（实验）',
    gradeBand: '一-六年级',
    deviceGroup: '离线优先设备组',
  },
]

export const mockGoals: Goal[] = [
  {
    id: 'g_1001',
    name: '每天坚持互动（阶段 1）',
    code: 'GOAL_DAILY_1',
    type: 'streak',
    stage: 1,
    schools: ['示例小学A', '示例小学B'],
    grades: ['一年级', '二年级'],
    deviceGroups: ['默认设备组'],
    offline: 'supported',
    status: 'published',
    latestVersion: 'v1.3.0',
    updatedAt: '2026-03-07 14:20',
    priority: 100,
    inUseTerminalCount: 42,
  },
  {
    id: 'g_1002',
    name: '收集知识卡（阶段 1）',
    code: 'GOAL_CARDS_1',
    type: 'collection',
    stage: 1,
    schools: ['示例小学C'],
    grades: ['一年级', '三年级'],
    deviceGroups: ['低年级设备组'],
    offline: 'supported',
    status: 'draft',
    latestVersion: '—',
    updatedAt: '2026-03-08 09:10',
    priority: 90,
    inUseTerminalCount: 18,
  },
  {
    id: 'g_1003',
    name: '互动次数累计（阶段 2）',
    code: 'GOAL_INTERACTIONS_2',
    type: 'cumulative',
    stage: 2,
    schools: ['示例小学A', '示例小学C'],
    grades: ['二年级', '三年级'],
    deviceGroups: ['高频互动设备组'],
    offline: 'not_supported',
    status: 'disabled',
    latestVersion: 'v1.1.0',
    updatedAt: '2026-03-01 18:02',
    priority: 80,
    inUseTerminalCount: 6,
  },
  {
    id: 'g_1004',
    name: '每周稳定参与（阶段 1）',
    code: 'GOAL_WEEKLY_1',
    type: 'cumulative',
    stage: 1,
    schools: ['示例小学D（新区）', '示例小学E（实验）'],
    grades: ['二年级', '三年级', '四年级'],
    deviceGroups: ['中年级设备组', '离线优先设备组'],
    offline: 'supported',
    status: 'published',
    latestVersion: 'v1.0.0',
    updatedAt: '2026-03-04 10:05',
    priority: 85,
    inUseTerminalCount: 24,
  },
  {
    id: 'g_1005',
    name: '主题探索（数学）（阶段 2）',
    code: 'GOAL_THEME_MATH_2',
    type: 'achievement',
    stage: 2,
    schools: ['示例小学A', '示例小学B'],
    grades: ['三年级', '四年级', '五年级'],
    deviceGroups: ['高频互动设备组'],
    offline: 'not_supported',
    status: 'draft',
    latestVersion: '—',
    updatedAt: '2026-03-08 19:12',
    priority: 70,
    inUseTerminalCount: 12,
  },
  {
    id: 'g_1006',
    name: '连续挑战（阶段 3）',
    code: 'GOAL_STREAK_3',
    type: 'streak',
    stage: 3,
    schools: ['示例小学C', '示例小学D（新区）'],
    grades: ['四年级', '五年级', '六年级'],
    deviceGroups: ['高年级设备组'],
    offline: 'supported',
    status: 'published',
    latestVersion: 'v2.0.0',
    updatedAt: '2026-03-02 12:40',
    priority: 60,
    inUseTerminalCount: 9,
  },
]

export const mockGoalConditionsByGoalId: Record<string, GoalCondition[]> = {
  g_1001: [
    {
      id: 'gc_1',
      conditionType: '互动达成',
      metric: '连续互动天数',
      op: '>=',
      targetValue: 7,
      period: 'streak_days',
      scope: { kind: 'all' },
      must: true,
    },
  ],
  g_1002: [
    {
      id: 'gc_2',
      conditionType: '收集达成',
      metric: '累计卡牌数',
      op: '>=',
      targetValue: 30,
      period: 'cumulative',
      scope: { kind: 'all' },
      must: true,
    },
  ],
  g_1003: [
    {
      id: 'gc_3',
      conditionType: '互动达成',
      metric: '累计互动次数',
      op: '>=',
      targetValue: 50,
      period: 'cumulative',
      scope: { kind: 'theme', value: '数学' },
      must: false,
    },
  ],
  g_1004: [
    {
      id: 'gc_4',
      conditionType: '互动达成',
      metric: '累计互动次数',
      op: '>=',
      targetValue: 8,
      period: 'week',
      scope: { kind: 'all' },
      must: true,
    },
  ],
  g_1005: [
    {
      id: 'gc_5',
      conditionType: '主题达成',
      metric: '数学主题互动次数',
      op: '>=',
      targetValue: 20,
      period: 'cumulative',
      scope: { kind: 'theme', value: '数学' },
      must: true,
    },
    {
      id: 'gc_6',
      conditionType: '收集达成',
      metric: '数学知识卡数量',
      op: '>=',
      targetValue: 15,
      period: 'cumulative',
      scope: { kind: 'card_type', value: '知识卡' },
      must: false,
    },
  ],
  g_1006: [
    {
      id: 'gc_7',
      conditionType: '互动达成',
      metric: '连续互动天数',
      op: '>=',
      targetValue: 14,
      period: 'streak_days',
      scope: { kind: 'all' },
      must: true,
    },
  ],
}

export const mockTasks: Task[] = [
  {
    id: 't_2001',
    name: '今天完成 1 次互动',
    code: 'TASK_DAILY_1',
    type: 'count',
    cycle: 'daily',
    rewardSummary: '积分 +10',
    distribution: '新学生默认分配',
    scopeSummary: '全部互动',
    schools: ['示例小学A', '示例小学B'],
    grades: ['一年级', '二年级'],
    deviceGroups: ['默认设备组'],
    offline: 'supported',
    status: 'published',
    updatedAt: '2026-03-07 11:08',
    inUseTerminalCount: 35,
  },
  {
    id: 't_2002',
    name: '连续互动 3 天',
    code: 'TASK_STREAK_3',
    type: 'streak',
    cycle: 'stage',
    rewardSummary: '勋章：坚持之星',
    distribution: '完成前一个任务后分配',
    scopeSummary: '全部互动',
    schools: ['示例小学B'],
    grades: ['二年级', '三年级'],
    deviceGroups: ['高频互动设备组'],
    offline: 'supported',
    status: 'draft',
    updatedAt: '2026-03-08 16:40',
    inUseTerminalCount: 12,
  },
  {
    id: 't_2003',
    name: '本周收集 3 张卡牌',
    code: 'TASK_WEEKLY_CARDS_3',
    type: 'collection',
    cycle: 'weekly',
    rewardSummary: '积分 +30',
    distribution: '老学生默认分配',
    scopeSummary: '全部互动',
    schools: ['示例小学A', '示例小学C'],
    grades: ['一年级', '二年级', '三年级'],
    deviceGroups: ['低年级设备组', '中年级设备组'],
    offline: 'supported',
    status: 'published',
    updatedAt: '2026-03-03 09:22',
    inUseTerminalCount: 27,
  },
  {
    id: 't_2004',
    name: '主题挑战：数学连击',
    code: 'TASK_THEME_MATH',
    type: 'theme',
    cycle: 'stage',
    rewardSummary: '勋章：数学小达人',
    distribution: '达到某目标阶段后分配',
    scopeSummary: '指定主题：数学',
    schools: ['示例小学D（新区）', '示例小学E（实验）'],
    grades: ['三年级', '四年级', '五年级'],
    deviceGroups: ['高频互动设备组'],
    offline: 'not_supported',
    status: 'draft',
    updatedAt: '2026-03-08 18:10',
    inUseTerminalCount: 8,
  },
  {
    id: 't_2005',
    name: '一次性挑战：完成 1 次互动并分享',
    code: 'TASK_ONE_TIME_SHARE',
    type: 'count',
    cycle: 'one_time',
    rewardSummary: '活动机会标识：分享券',
    distribution: '新学生默认分配',
    scopeSummary: '全部互动',
    schools: ['示例小学B', '示例小学E（实验）'],
    grades: ['四年级', '五年级', '六年级'],
    deviceGroups: ['高年级设备组'],
    offline: 'not_supported',
    status: 'disabled',
    updatedAt: '2026-02-28 17:06',
    inUseTerminalCount: 4,
  },
]

export const mockBadges: Badge[] = [
  {
    id: 'b_3001',
    name: '坚持之星',
    code: 'BADGE_STREAK_STAR',
    level: 'bronze',
    unlockSummary: '连续互动 ≥ 3 天',
    repeatable: false,
    scopeSummary: '示例小学A / 一年级',
    schools: ['示例小学A'],
    grades: ['一年级'],
    deviceGroups: ['默认设备组'],
    offline: 'supported',
    status: 'published',
    updatedAt: '2026-03-05 10:12',
    inUseTerminalCount: 20,
  },
  {
    id: 'b_3002',
    name: '卡牌收藏家',
    code: 'BADGE_CARD_COLLECTOR',
    level: 'silver',
    unlockSummary: '累计卡牌 ≥ 50',
    repeatable: true,
    scopeSummary: '示例小学B / 二年级',
    schools: ['示例小学B'],
    grades: ['二年级'],
    deviceGroups: ['低年级设备组'],
    offline: 'supported',
    status: 'draft',
    updatedAt: '2026-03-08 13:01',
    inUseTerminalCount: 5,
  },
  {
    id: 'b_3003',
    name: '数学小达人',
    code: 'BADGE_MATH_MASTER',
    level: 'gold',
    unlockSummary: '数学主题互动 ≥ 20 次',
    repeatable: false,
    scopeSummary: '示例小学D（新区） / 三-五年级',
    schools: ['示例小学D（新区）'],
    grades: ['三年级', '四年级', '五年级'],
    deviceGroups: ['高频互动设备组'],
    offline: 'not_supported',
    status: 'draft',
    updatedAt: '2026-03-08 18:22',
    inUseTerminalCount: 3,
  },
  {
    id: 'b_3004',
    name: '离线也能学',
    code: 'BADGE_OFFLINE_HERO',
    level: 'silver',
    unlockSummary: '离线状态完成互动 ≥ 5 次',
    repeatable: true,
    scopeSummary: '示例小学A/C / 离线优先设备组',
    schools: ['示例小学A', '示例小学C'],
    grades: ['一年级', '二年级', '三年级', '四年级'],
    deviceGroups: ['离线优先设备组'],
    offline: 'supported',
    status: 'published',
    updatedAt: '2026-03-02 16:18',
    inUseTerminalCount: 16,
  },
  {
    id: 'b_3005',
    name: '连续挑战王者',
    code: 'BADGE_STREAK_KING',
    level: 'diamond',
    unlockSummary: '连续互动 ≥ 14 天',
    repeatable: false,
    scopeSummary: '示例小学C/D / 四-六年级',
    schools: ['示例小学C', '示例小学D（新区）'],
    grades: ['四年级', '五年级', '六年级'],
    deviceGroups: ['高年级设备组'],
    offline: 'supported',
    status: 'published',
    updatedAt: '2026-03-02 12:40',
    inUseTerminalCount: 9,
  },
]

export const mockPublishRecords: PublishRecord[] = [
  {
    id: 'pr_1',
    module: 'goals',
    version: 'v1.3.0',
    publishedAt: '2026-03-07 15:30',
    publisher: '运营-小王',
    changeNote: '更新阶段 1 连续目标文案与适用范围',
    impactCount: 3,
  },
  {
    id: 'pr_2',
    module: 'tasks',
    version: 'v0.9.0',
    publishedAt: '2026-03-06 10:05',
    publisher: '产品-小李',
    changeNote: '新增日任务与分发策略字段',
    impactCount: 2,
  },
  {
    id: 'pr_3',
    module: 'badges',
    version: 'v1.0.0',
    publishedAt: '2026-03-05 09:22',
    publisher: '运营-小赵',
    changeNote: '首批勋章上线（2 枚）',
    impactCount: 2,
  },
  {
    id: 'pr_4',
    module: 'goals',
    version: 'v2.0.0',
    publishedAt: '2026-03-02 12:45',
    publisher: '产品-小李',
    changeNote: '新增阶段 3 连续挑战目标；优化离线口径',
    impactCount: 1,
  },
  {
    id: 'pr_5',
    module: 'tasks',
    version: 'v1.0.0',
    publishedAt: '2026-03-03 09:30',
    publisher: '运营-小王',
    changeNote: '上线周任务（卡牌收集）与奖励文案规范',
    impactCount: 3,
  },
  {
    id: 'pr_6',
    module: 'badges',
    version: 'v1.1.0',
    publishedAt: '2026-03-02 16:20',
    publisher: '运营-小赵',
    changeNote: '新增离线英雄勋章；调整结束页优先级',
    impactCount: 1,
  },
]

export const mockStudents: StudentGrowthSummary[] = [
  {
    studentId: 'S_90001',
    displayName: '小宇',
    school: '示例小学A',
    grade: '一年级',
    firstAt: '2026-02-20 09:10',
    lastAt: '2026-03-08 17:52',
    totalInteractions: 18,
    totalCards: 42,
    currentTask: '今天完成 1 次互动',
    currentGoal: '每天坚持互动（阶段 1）',
    badgeCount: 1,
    syncStatus: 'ok',
    hasUnsynced: false,
    avatarUrl: '/avatars/student-1.png',
    age: 7,
    gender: '男',
    createdAt: '2026-02-19 16:00',
    schoolAccountId: '00123-ab456',
    deviceId: 'DEV-00123',
    statusLabel: '正常',
    wechatBound: true,
  },
  {
    studentId: 'S_90002',
    displayName: '小涵',
    school: '示例小学B',
    grade: '二年级',
    firstAt: '2026-02-26 13:20',
    lastAt: '2026-03-08 08:21',
    totalInteractions: 7,
    totalCards: 15,
    currentTask: '连续互动 3 天',
    currentGoal: '收集知识卡（阶段 1）',
    badgeCount: 0,
    syncStatus: 'pending',
    hasUnsynced: true,
    avatarUrl: '/avatars/student-2.png',
    age: 8,
    gender: '女',
    createdAt: '2026-02-25 10:30',
    schoolAccountId: '00456-cd789',
    deviceId: 'DEV-00456',
    statusLabel: '待同步',
    wechatBound: false,
  },
  {
    studentId: 'S_90003',
    displayName: '小乐',
    school: '示例小学C',
    grade: '三年级',
    firstAt: '2026-02-10 10:02',
    lastAt: '2026-03-07 19:05',
    totalInteractions: 33,
    totalCards: 78,
    currentTask: '本周收集 3 张卡牌',
    currentGoal: '连续挑战（阶段 3）',
    badgeCount: 3,
    syncStatus: 'ok',
    hasUnsynced: false,
    avatarUrl: '/avatars/student-3.png',
    age: 9,
    gender: '男',
    createdAt: '2026-02-09 11:20',
    schoolAccountId: '00789-ef123',
    deviceId: 'DEV-00789',
    statusLabel: '正常',
    wechatBound: true,
  },
  {
    studentId: 'S_90004',
    displayName: '小安',
    school: '示例小学D（新区）',
    grade: '四年级',
    firstAt: '2026-03-01 08:15',
    lastAt: '2026-03-08 20:11',
    totalInteractions: 9,
    totalCards: 22,
    currentTask: '主题挑战：数学连击',
    currentGoal: '主题探索（数学）（阶段 2）',
    badgeCount: 0,
    syncStatus: 'failed',
    hasUnsynced: true,
    avatarUrl: '/avatars/student-4.png',
    age: 10,
    gender: '女',
    createdAt: '2026-02-28 15:05',
    schoolAccountId: '01234-gh567',
    deviceId: 'DEV-01234',
    statusLabel: '同步失败',
    wechatBound: false,
  },
  {
    studentId: 'S_90005',
    displayName: '小米',
    school: '示例小学E（实验）',
    grade: '五年级',
    firstAt: '2026-02-18 14:44',
    lastAt: '2026-03-08 09:36',
    totalInteractions: 21,
    totalCards: 40,
    currentTask: '一次性挑战：完成 1 次互动并分享',
    currentGoal: '每周稳定参与（阶段 1）',
    badgeCount: 1,
    syncStatus: 'pending',
    hasUnsynced: true,
    avatarUrl: '/avatars/student-5.png',
    age: 11,
    gender: '女',
    createdAt: '2026-02-17 09:50',
    schoolAccountId: '01567-jk890',
    deviceId: 'DEV-01567',
    statusLabel: '待同步',
    wechatBound: true,
  },
]

