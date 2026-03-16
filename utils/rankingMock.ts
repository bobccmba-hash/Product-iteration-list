// 学习之星相关类型定义和模拟数据

export type RankingStatus = 'draft' | 'published' | 'disabled'
export type RankingCriteria = 'highest_score' | 'latest_score'

export type RankingConfig = {
  id: string
  name: string
  // 规则配置（不绑定学校）
  rankingType: '本校学习之星'
  rankingBasis: '单次游戏分数'
  targetGame: string          // 针对哪个游戏
  displayEnabled: boolean     // 是否开启（开启后可推送）
  topN: number                // 展示人数
  status: RankingStatus
  updatedAt: string
  activeTerminalCount: number // 当前推送使用中的终端数
  // 展示规则
  showAvatar: boolean
  showStudentCode: boolean
  showScore: boolean
  showMyPerformance: boolean
  showCurrentScore: boolean
  // 分数规则
  scoreCriteria: RankingCriteria
  // 前台文案
  title: string
  subtitle: string
  myPerformanceHint: string
  notShownHint: string
  encourageText: string
  // 显示条件
  minStudents: number
  showWhenInsufficient: boolean
}

export type RankingRecord = {
  rank: number
  studentId: string
  studentCode: string
  avatarUrl: string
  school: string
  score: number
  gameName: string
  lastUpdatedAt: string
}

export const GAME_OPTIONS = [
  { value: 'ar_pose', label: 'AR 姿态挑战' },
  { value: 'quiz', label: '知识问答' },
  { value: 'memory', label: '记忆翻牌' },
  { value: 'math', label: '数学闯关' },
]

export const mockRankingConfigs: RankingConfig[] = [
  {
    id: 'rank_001',
    name: 'AR姿态挑战学习之星',
    rankingType: '本校学习之星',
    rankingBasis: '单次游戏分数',
    targetGame: 'ar_pose',
    displayEnabled: true,
    topN: 10,
    status: 'published',
    updatedAt: '2026-03-08 14:30',
    activeTerminalCount: 6,
    showAvatar: true,
    showStudentCode: true,
    showScore: true,
    showMyPerformance: true,
    showCurrentScore: true,
    scoreCriteria: 'highest_score',
    title: '本校学习之星',
    subtitle: '展示本校优秀学习表现',
    myPerformanceHint: '我的学习表现',
    notShownHint: '继续努力，争取成为学习之星',
    encourageText: '再接再厉，挑战更高分数！',
    minStudents: 3,
    showWhenInsufficient: false,
  },
  {
    id: 'rank_002',
    name: '知识问答学习之星',
    rankingType: '本校学习之星',
    rankingBasis: '单次游戏分数',
    targetGame: 'quiz',
    displayEnabled: false,
    topN: 5,
    status: 'draft',
    updatedAt: '2026-03-07 10:15',
    activeTerminalCount: 0,
    showAvatar: true,
    showStudentCode: true,
    showScore: true,
    showMyPerformance: true,
    showCurrentScore: true,
    scoreCriteria: 'highest_score',
    title: '本校学习之星',
    subtitle: '展示本校优秀学习表现',
    myPerformanceHint: '我的学习表现',
    notShownHint: '继续努力，争取成为学习之星',
    encourageText: '加油，你可以做得更好！',
    minStudents: 3,
    showWhenInsufficient: false,
  },
  {
    id: 'rank_003',
    name: '记忆翻牌学习之星',
    rankingType: '本校学习之星',
    rankingBasis: '单次游戏分数',
    targetGame: 'memory',
    displayEnabled: true,
    topN: 10,
    status: 'published',
    updatedAt: '2026-03-06 16:45',
    activeTerminalCount: 4,
    showAvatar: true,
    showStudentCode: true,
    showScore: true,
    showMyPerformance: true,
    showCurrentScore: true,
    scoreCriteria: 'highest_score',
    title: '本校学习之星',
    subtitle: '展示本校优秀学习表现',
    myPerformanceHint: '我的学习表现',
    notShownHint: '继续努力，争取成为学习之星',
    encourageText: '继续挑战，争取进入学习之星展示！',
    minStudents: 5,
    showWhenInsufficient: true,
  },
]

export const mockRankingRecords: RankingRecord[] = [
  {
    rank: 1,
    studentId: 'S_90001',
    studentCode: 'AB023',
    avatarUrl: '/avatars/student-1.png',
    school: '示例小学A',
    score: 98,
    gameName: 'AR 姿态挑战',
    lastUpdatedAt: '2026-03-08 17:52',
  },
  {
    rank: 2,
    studentId: 'S_90002',
    studentCode: 'CD789',
    avatarUrl: '/avatars/student-2.png',
    school: '示例小学A',
    score: 95,
    gameName: 'AR 姿态挑战',
    lastUpdatedAt: '2026-03-08 16:30',
  },
  {
    rank: 3,
    studentId: 'S_90003',
    studentCode: 'EF456',
    avatarUrl: '/avatars/student-3.png',
    school: '示例小学A',
    score: 92,
    gameName: 'AR 姿态挑战',
    lastUpdatedAt: '2026-03-08 15:20',
  },
  {
    rank: 4,
    studentId: 'S_90004',
    studentCode: 'GH123',
    avatarUrl: '/avatars/student-4.png',
    school: '示例小学A',
    score: 90,
    gameName: 'AR 姿态挑战',
    lastUpdatedAt: '2026-03-08 14:10',
  },
  {
    rank: 5,
    studentId: 'S_90005',
    studentCode: 'IJ890',
    avatarUrl: '/avatars/student-5.png',
    school: '示例小学A',
    score: 88,
    gameName: 'AR 姿态挑战',
    lastUpdatedAt: '2026-03-08 13:45',
  },
  {
    rank: 6,
    studentId: 'S_90006',
    studentCode: 'KL567',
    avatarUrl: '/avatars/student-1.png',
    school: '示例小学A',
    score: 85,
    gameName: 'AR 姿态挑战',
    lastUpdatedAt: '2026-03-08 12:30',
  },
  {
    rank: 7,
    studentId: 'S_90007',
    studentCode: 'MN234',
    avatarUrl: '/avatars/student-2.png',
    school: '示例小学A',
    score: 82,
    gameName: 'AR 姿态挑战',
    lastUpdatedAt: '2026-03-08 11:15',
  },
  {
    rank: 8,
    studentId: 'S_90008',
    studentCode: 'OP901',
    avatarUrl: '/avatars/student-3.png',
    school: '示例小学A',
    score: 80,
    gameName: 'AR 姿态挑战',
    lastUpdatedAt: '2026-03-08 10:00',
  },
  {
    rank: 9,
    studentId: 'S_90009',
    studentCode: 'QR678',
    avatarUrl: '/avatars/student-4.png',
    school: '示例小学A',
    score: 78,
    gameName: 'AR 姿态挑战',
    lastUpdatedAt: '2026-03-07 18:45',
  },
  {
    rank: 10,
    studentId: 'S_90010',
    studentCode: 'ST345',
    avatarUrl: '/avatars/student-5.png',
    school: '示例小学A',
    score: 75,
    gameName: 'AR 姿态挑战',
    lastUpdatedAt: '2026-03-07 17:30',
  },
]
