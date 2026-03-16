// 终端前端模拟数据

export type StudentProfile = {
  id: string
  avatarUrl: string
  code: string // 学生编号，如 AB023
  isNew: boolean
  hasGrowthSystem: boolean // 是否启用成长系统（目标/任务/勋章）
  currentTask: {
    name: string
    icon: string
    progress: number
    total: number
    description: string
  }
  currentGoal: {
    name: string
    icon: string
    stage: number
    progress: number
    total: number
    description: string
  }
  badges: {
    earned: number
    total: number
    nextBadge?: {
      name: string
      icon: string
      unlockHint: string
    }
  }
  stats: {
    totalInteractions: number
    totalCards: number
    redeemedGifts: number
    lastInteractionAt: string
  }
}

export type InteractionResult = {
  cardsEarned: number
  cardNames: string[]
  taskProgress: {
    before: number
    after: number
    completed: boolean
  }
  goalProgress: {
    before: number
    after: number
    completed: boolean
  }
  badgeUnlocked?: {
    name: string
    icon: string
    level: string
  }
}

// 预设头像库（原型占位）
export const avatarPool = [
  '/avatars/student-1.png',
  '/avatars/student-2.png',
  '/avatars/student-3.png',
  '/avatars/student-4.png',
  '/avatars/student-5.png',
]

// 生成随机学生编号
export function generateStudentCode(): string {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const l1 = letters[Math.floor(Math.random() * 26)]
  const l2 = letters[Math.floor(Math.random() * 26)]
  const num = String(Math.floor(Math.random() * 999) + 1).padStart(3, '0')
  return `${l1}${l2}${num}`
}

// 生成随机头像
export function generateAvatar(): string {
  return avatarPool[Math.floor(Math.random() * avatarPool.length)]
}

// 模拟新用户
export const mockNewStudent: StudentProfile = {
  id: 'S_NEW_001',
  avatarUrl: generateAvatar(),
  code: generateStudentCode(),
  isNew: true,
  hasGrowthSystem: true, // 启用成长系统
  currentTask: {
    name: '今天完成 1 次互动',
    icon: '🎯',
    progress: 0,
    total: 1,
    description: '完成一次互动，开启你的成长之旅',
  },
  currentGoal: {
    name: '每天坚持互动（阶段 1）',
    icon: '🌟',
    stage: 1,
    progress: 0,
    total: 7,
    description: '连续互动 7 天，养成好习惯',
  },
  badges: {
    earned: 0,
    total: 5,
    nextBadge: {
      name: '坚持之星',
      icon: '⭐',
      unlockHint: '完成第一个任务即可解锁',
    },
  },
  stats: {
    totalInteractions: 0,
    totalCards: 0,
    redeemedGifts: 0,
    lastInteractionAt: '—',
  },
}

// 模拟老用户
export const mockReturningStudent: StudentProfile = {
  id: 'S_90001',
  avatarUrl: '/avatars/student-1.png',
  code: 'AB023',
  isNew: false,
  hasGrowthSystem: true, // 启用成长系统
  currentTask: {
    name: '本周收集 3 张卡牌',
    icon: '🎯',
    progress: 2,
    total: 3,
    description: '再收集 1 张卡牌就完成啦',
  },
  currentGoal: {
    name: '收集知识卡（阶段 1）',
    icon: '🌟',
    stage: 1,
    progress: 18,
    total: 30,
    description: '累计收集 30 张卡牌',
  },
  badges: {
    earned: 2,
    total: 5,
    nextBadge: {
      name: '收集大师',
      icon: '🏆',
      unlockHint: '收集 30 张不同卡牌',
    },
  },
  stats: {
    totalInteractions: 18,
    totalCards: 42,
    redeemedGifts: 3,
    lastInteractionAt: '2026-03-08 17:52',
  },
}

// 模拟无成长系统的用户（旧流程）
export const mockStudentWithoutGrowth: StudentProfile = {
  id: 'S_90002',
  avatarUrl: '/avatars/student-2.png',
  code: 'CD789',
  isNew: false,
  hasGrowthSystem: false, // 未启用成长系统
  currentTask: {
    name: '',
    icon: '',
    progress: 0,
    total: 0,
    description: '',
  },
  currentGoal: {
    name: '',
    icon: '',
    stage: 0,
    progress: 0,
    total: 0,
    description: '',
  },
  badges: {
    earned: 0,
    total: 0,
  },
  stats: {
    totalInteractions: 5,
    totalCards: 12,
    redeemedGifts: 0,
    lastInteractionAt: '2026-03-07 14:30',
  },
}

// 模拟互动结果
export const mockInteractionResult: InteractionResult = {
  cardsEarned: 2,
  cardNames: ['数学卡·加法', '语文卡·拼音'],
  taskProgress: {
    before: 2,
    after: 3,
    completed: true,
  },
  goalProgress: {
    before: 18,
    after: 20,
    completed: false,
  },
  badgeUnlocked: {
    name: '坚持之星',
    icon: '⭐',
    level: '青铜',
  },
}
