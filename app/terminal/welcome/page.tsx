'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Suspense, useEffect, useMemo } from 'react'
import { PhoneFrame } from '@/components/PhoneFrame'
import { mockNewStudent, mockReturningStudent, mockStudentWithoutGrowth, type StudentProfile } from '@/utils/terminalMock'

export default function WelcomePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">加载中…</div>}>
      <Inner />
    </Suspense>
  )
}

function Inner() {
  const searchParams = useSearchParams()
  const userType = searchParams.get('type') || 'new' // 'new' | 'returning' | 'no-growth'

  const student: StudentProfile = useMemo(() => {
    if (userType === 'no-growth') return mockStudentWithoutGrowth
    return userType === 'new' ? mockNewStudent : mockReturningStudent
  }, [userType])

  const isNew = student.isNew
  const hasGrowthSystem = student.hasGrowthSystem

  // 自动跳转：3秒后自动进入下一页
  useEffect(() => {
    const timer = setTimeout(() => {
      // 如果有成长系统，进入任务目标展示页；否则直接进入游戏选择
      if (hasGrowthSystem) {
        window.location.href = '/terminal/challenge-preview'
      } else {
        window.location.href = '/terminal/game-select?growth=false'
      }
    }, 3000)
    return () => clearTimeout(timer)
  }, [hasGrowthSystem])

  return (
    <>
      {/* 返回首页按钮 */}
      <Link
        href="/"
        className="fixed left-4 top-4 z-50 rounded-xl bg-white/20 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur hover:bg-white/30"
      >
        返回首页
      </Link>

      <PhoneFrame>
        <div className="relative flex min-h-full flex-col items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 px-6 text-white">
          {/* 顶部欢迎区 */}
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-black tracking-tight">
              {isNew ? '欢迎来到成长挑战' : '欢迎回来'}
            </h1>
            <p className="mt-2 text-lg font-medium opacity-90">
              {isNew 
                ? (hasGrowthSystem ? '已为你创建成长身份' : '已为你创建互动身份')
                : (hasGrowthSystem ? '继续你的成长之旅' : '继续你的互动之旅')
              }
            </p>
          </div>

          {/* 头像展示区 */}
          <div className="relative mb-6">
            <div className="absolute inset-0 animate-pulse rounded-full bg-white/30 blur-2xl" />
            <div className="relative h-40 w-40 overflow-hidden rounded-full bg-white/90 p-2 ring-4 ring-white/50">
              <div className="h-full w-full overflow-hidden rounded-full bg-gradient-to-br from-slate-100 to-slate-200">
                {student.avatarUrl ? (
                  <img src={student.avatarUrl} alt="学生头像" className="h-full w-full object-cover" />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-6xl">👤</div>
                )}
              </div>
            </div>
          </div>

          {/* 身份编号展示区 */}
          <div className="mb-8 text-center">
            <div className="mb-2 text-sm font-semibold opacity-75">您的昵称</div>
            <div className="text-4xl font-black tracking-wider">{student.code}</div>
          </div>

          {/* 成长提示区 */}
          <div className="mb-8 max-w-sm text-center">
            {isNew ? (
              <div className="space-y-2 text-sm leading-relaxed">
                <p className="font-semibold">
                  ✨ {hasGrowthSystem ? '成长档案已创建' : '互动档案已创建'}
                </p>
                <p className="opacity-90">
                  {hasGrowthSystem ? '即将为你展示成长挑战' : '即将进入互动游戏'}
                </p>
              </div>
            ) : (
              <div className="space-y-2 text-sm leading-relaxed">
                <p className="font-semibold">🎉 识别成功</p>
                <p className="opacity-90">
                  {hasGrowthSystem ? '即将进入你的成长挑战' : '即将进入互动游戏'}
                </p>
              </div>
            )}
          </div>

          {/* 自动跳转提示 */}
          <div className="flex items-center gap-2 text-sm opacity-60">
            <div className="h-2 w-2 animate-pulse rounded-full bg-white" />
            <span>3秒后自动进入...</span>
          </div>
        </div>
      </PhoneFrame>
    </>
  )
}
