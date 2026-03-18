'use client'

import Link from 'next/link'
import { mockReturningStudent } from '@/utils/terminalMock'

export default function TerminalHomePage() {
  const student = mockReturningStudent

  return (
    <div className="relative flex min-h-screen flex-col bg-gradient-to-br from-sky-400 via-blue-500 to-indigo-600 px-6 py-8 text-white">
      {/* 返回首页按钮 */}
      <Link
        href="/v1.9.0"
        className="fixed left-4 top-4 z-50 rounded-xl bg-white/20 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur hover:bg-white/30"
      >
        返回首页
      </Link>

      {/* 区域1：顶部身份欢迎区 */}
      <div className="mb-6 flex items-center gap-4 rounded-2xl bg-white/10 p-4 backdrop-blur">
        <div className="h-16 w-16 overflow-hidden rounded-full bg-white/90 p-1">
          {student.avatarUrl ? (
            <img src={student.avatarUrl} alt="学生头像" className="h-full w-full rounded-full object-cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center rounded-full text-2xl">👤</div>
          )}
        </div>
        <div className="flex-1">
          <div className="text-lg font-black">欢迎回来，小挑战家</div>
          <div className="mt-0.5 text-sm opacity-75">编号：{student.code}</div>
        </div>
      </div>

      {/* 区域2：主互动入口区 */}
      <div className="mb-6 flex flex-col items-center justify-center rounded-3xl bg-white/95 p-8 shadow-2xl backdrop-blur">
        <div className="mb-4 text-7xl">🎮</div>
        <h2 className="mb-2 text-2xl font-black text-slate-900">准备好挑战了吗？</h2>
        <p className="mb-6 text-sm text-slate-600">完成互动，推进你的成长任务</p>
        <Link
          href="/terminal/pre-interaction"
          className="rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-4 text-lg font-black text-white shadow-xl transition hover:scale-105"
        >
          开始互动
        </Link>
      </div>

      {/* 区域3：我的成长挑战板块 */}
      <div className="mb-6 rounded-2xl bg-white/10 p-5 backdrop-blur">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-black">我的成长挑战</h3>
          <Link href="/terminal/growth-detail" className="text-sm font-bold opacity-75 hover:opacity-100">
            查看详情 →
          </Link>
        </div>

        <div className="space-y-3">
          {/* 主卡：当前任务 */}
          <div className="rounded-xl bg-white/95 p-4 shadow-lg">
            <div className="mb-2 flex items-center gap-2">
              <div className="text-2xl">{student.currentTask.icon}</div>
              <div className="flex-1">
                <div className="text-xs font-semibold text-blue-600">当前任务</div>
                <div className="mt-0.5 text-sm font-black text-slate-900">{student.currentTask.name}</div>
              </div>
            </div>
            <div className="mb-2 h-2 overflow-hidden rounded-full bg-slate-200">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 transition-all"
                style={{ width: `${(student.currentTask.progress / student.currentTask.total) * 100}%` }}
              />
            </div>
            <div className="text-xs font-bold text-slate-600">
              {student.currentTask.progress} / {student.currentTask.total}
            </div>
          </div>

          {/* 副卡1：当前目标 */}
          <div className="rounded-xl bg-white/90 p-3 shadow">
            <div className="flex items-center gap-2">
              <div className="text-xl">{student.currentGoal.icon}</div>
              <div className="flex-1">
                <div className="text-[10px] font-semibold text-blue-600">当前目标</div>
                <div className="mt-0.5 text-xs font-bold text-slate-900">{student.currentGoal.name}</div>
              </div>
              <div className="rounded-full bg-blue-100 px-2 py-0.5 text-[10px] font-bold text-blue-700">
                阶段 {student.currentGoal.stage}
              </div>
            </div>
            <div className="mt-2 text-[11px] text-slate-600">
              进度：{student.currentGoal.progress} / {student.currentGoal.total}
            </div>
          </div>

          {/* 副卡2：勋章状态 */}
          <div className="rounded-xl bg-white/90 p-3 shadow">
            <div className="flex items-center gap-2">
              <div className="text-xl">{student.badges.nextBadge?.icon}</div>
              <div className="flex-1">
                <div className="text-[10px] font-semibold text-blue-600">勋章状态</div>
                <div className="mt-0.5 text-xs font-bold text-slate-900">
                  已获得 {student.badges.earned} 枚勋章
                </div>
              </div>
            </div>
            <div className="mt-2 text-[11px] text-slate-600">
              下一枚：{student.badges.nextBadge?.name}
            </div>
          </div>
        </div>
      </div>

      {/* 区域4：最近成长摘要区 */}
      <div className="rounded-2xl bg-white/10 p-4 backdrop-blur">
        <h4 className="mb-3 text-sm font-black">最近成长摘要</h4>
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2">
            <span className="opacity-75">📚 累计互动：</span>
            <span className="font-bold">{student.stats.totalInteractions} 次</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="opacity-75">🎴 累计卡牌：</span>
            <span className="font-bold">{student.stats.totalCards} 张</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="opacity-75">⏰ 最近互动：</span>
            <span className="font-bold">{student.stats.lastInteractionAt}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
