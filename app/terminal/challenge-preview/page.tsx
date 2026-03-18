'use client'

import Link from 'next/link'
import { useEffect } from 'react'
import { PhoneFrame } from '@/components/PhoneFrame'
import { mockReturningStudent } from '@/utils/terminalMock'

export default function ChallengePreviewPage() {
  const student = mockReturningStudent

  // 自动跳转：5秒后自动进入游戏选择页
  useEffect(() => {
    const timer = setTimeout(() => {
      window.location.href = '/terminal/game-select?growth=true'
    }, 5000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      {/* 返回首页按钮 */}
      <Link
        href="/v1.9.0"
        className="fixed left-4 top-4 z-50 rounded-xl bg-white/20 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur hover:bg-white/30"
      >
        返回首页
      </Link>

      <PhoneFrame>
        <div className="relative flex min-h-full flex-col bg-gradient-to-br from-violet-400 via-purple-500 to-fuchsia-500 px-6 py-8 text-white">
          {/* 顶部身份区 */}
          <div className="mb-6 flex items-center gap-3">
            <div className="h-12 w-12 overflow-hidden rounded-full bg-white/90 p-0.5">
              {student.avatarUrl ? (
                <img src={student.avatarUrl} alt="学生头像" className="h-full w-full rounded-full object-cover" />
              ) : (
                <div className="flex h-full w-full items-center justify-center rounded-full text-xl">👤</div>
              )}
            </div>
            <div className="text-left">
              <div className="text-sm font-semibold opacity-75">编号：{student.code}</div>
              <div className="text-lg font-black">你的成长挑战</div>
            </div>
          </div>

          {/* 中部标题 */}
          <h1 className="mb-6 text-center text-2xl font-black tracking-tight">今天要完成的挑战</h1>

          {/* 任务卡 */}
          <div className="mb-6 w-full">
            <div className="rounded-2xl bg-white/95 p-5 shadow-xl backdrop-blur">
              <div className="mb-3 flex items-center gap-3">
                <div className="text-4xl">{student.currentTask.icon}</div>
                <div className="flex-1">
                  <div className="text-xs font-semibold text-purple-600">当前任务</div>
                  <div className="mt-1 text-lg font-black text-slate-900">{student.currentTask.name}</div>
                </div>
              </div>
              <div className="mb-2 rounded-xl bg-slate-50 p-3">
                <div className="mb-1 flex items-center justify-between text-sm">
                  <span className="font-semibold text-slate-600">进度</span>
                  <span className="font-black text-slate-900">
                    {student.currentTask.progress} / {student.currentTask.total}
                  </span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-slate-200">
                  <div
                    className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all"
                    style={{ width: `${(student.currentTask.progress / student.currentTask.total) * 100}%` }}
                  />
                </div>
              </div>
              <p className="text-sm text-slate-600">{student.currentTask.description}</p>
            </div>
          </div>

          {/* 自动跳转提示 */}
          <div className="flex items-center justify-center gap-2 text-sm opacity-75">
            <div className="h-2 w-2 animate-pulse rounded-full bg-white" />
            <span>5秒后自动进入游戏选择...</span>
          </div>
        </div>
      </PhoneFrame>
    </>
  )
}
