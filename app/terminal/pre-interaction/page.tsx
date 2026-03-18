'use client'

import Link from 'next/link'
import { mockReturningStudent } from '@/utils/terminalMock'

export default function PreInteractionPage() {
  const student = mockReturningStudent

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-amber-400 via-orange-500 to-red-500 px-6 text-white">
      {/* 返回首页按钮 */}
      <Link
        href="/v1.9.0"
        className="fixed left-4 top-4 z-50 rounded-xl bg-white/20 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur hover:bg-white/30"
      >
        返回首页
      </Link>

      {/* 顶部身份区 */}
      <div className="mb-8 flex items-center gap-3">
        <div className="h-14 w-14 overflow-hidden rounded-full bg-white/90 p-1">
          {student.avatarUrl ? (
            <img src={student.avatarUrl} alt="学生头像" className="h-full w-full rounded-full object-cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center rounded-full text-2xl">👤</div>
          )}
        </div>
        <div>
          <div className="text-sm font-semibold opacity-75">编号：{student.code}</div>
          <div className="text-lg font-black">准备好了吗？</div>
        </div>
      </div>

      {/* 中部标题 */}
      <h1 className="mb-8 text-center text-3xl font-black tracking-tight">这次挑战会帮助你成长</h1>

      {/* 中部三行提示 */}
      <div className="mb-8 w-full max-w-md space-y-4">
        {/* 当前任务提示 */}
        <div className="rounded-2xl bg-white/95 p-5 shadow-xl backdrop-blur">
          <div className="mb-2 flex items-center gap-2">
            <div className="text-2xl">{student.currentTask.icon}</div>
            <div className="text-xs font-semibold text-orange-600">当前任务</div>
          </div>
          <div className="mb-2 text-lg font-black text-slate-900">{student.currentTask.name}</div>
          <div className="text-sm text-slate-600">
            进度：{student.currentTask.progress} / {student.currentTask.total}
            {student.currentTask.progress === student.currentTask.total - 1 && (
              <span className="ml-2 font-bold text-orange-600">· 再来一次就完成啦！</span>
            )}
          </div>
        </div>

        {/* 当前目标提示 */}
        <div className="rounded-2xl bg-white/90 p-4 shadow-lg backdrop-blur">
          <div className="mb-2 flex items-center gap-2">
            <div className="text-xl">{student.currentGoal.icon}</div>
            <div className="text-xs font-semibold text-orange-600">当前目标</div>
          </div>
          <div className="mb-1 text-base font-black text-slate-900">{student.currentGoal.name}</div>
          <div className="text-sm text-slate-600">
            阶段 {student.currentGoal.stage} · 进度：{student.currentGoal.progress} / {student.currentGoal.total}
          </div>
        </div>

        {/* 勋章方向提示 */}
        <div className="rounded-2xl bg-white/90 p-4 shadow-lg backdrop-blur">
          <div className="mb-2 flex items-center gap-2">
            <div className="text-xl">{student.badges.nextBadge?.icon}</div>
            <div className="text-xs font-semibold text-orange-600">勋章方向</div>
          </div>
          <div className="mb-1 text-base font-black text-slate-900">{student.badges.nextBadge?.name}</div>
          <div className="text-sm text-slate-600">{student.badges.nextBadge?.unlockHint}</div>
        </div>
      </div>

      {/* 底部按钮 */}
      <div className="flex w-full max-w-md flex-col gap-3">
        <Link
          href="/terminal/interaction-result"
          className="rounded-2xl bg-white px-6 py-4 text-center text-lg font-black text-orange-600 shadow-xl transition hover:scale-105"
        >
          开始互动
        </Link>
        <Link
          href="/terminal/home"
          className="rounded-2xl bg-white/20 px-6 py-3 text-center text-sm font-bold backdrop-blur transition hover:bg-white/30"
        >
          跳过
        </Link>
      </div>
    </div>
  )
}
