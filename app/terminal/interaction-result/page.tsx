'use client'

import Link from 'next/link'
import { mockReturningStudent, mockInteractionResult } from '@/utils/terminalMock'

export default function InteractionResultPage() {
  const student = mockReturningStudent
  const result = mockInteractionResult

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-green-400 via-emerald-500 to-teal-600 px-6 text-white">
      {/* 返回首页按钮 */}
      <Link
        href="/v1.9.0"
        className="fixed left-4 top-4 z-50 rounded-xl bg-white/20 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur hover:bg-white/30"
      >
        返回首页
      </Link>

      {/* 顶部标题 */}
      <div className="mb-8 text-center">
        <div className="mb-4 text-7xl animate-bounce">🎉</div>
        <h1 className="text-4xl font-black tracking-tight">互动完成</h1>
      </div>

      {/* 中部互动结果 */}
      <div className="mb-6 w-full max-w-md space-y-4">
        {/* 得分卡片 */}
        <div className="rounded-3xl bg-white/95 p-6 text-center shadow-2xl backdrop-blur">
          <div className="mb-2 text-sm font-semibold text-emerald-700">本次得分</div>
          <div className="text-6xl font-black text-slate-900">95</div>
          <div className="mt-2 text-sm text-slate-600">太棒了！</div>
        </div>

        {/* 获得卡牌 */}
        <div className="rounded-2xl bg-white/95 p-5 shadow-xl backdrop-blur">
          <div className="mb-3 flex items-center gap-2">
            <div className="text-3xl">🎴</div>
            <div className="flex-1">
              <div className="text-sm font-semibold text-emerald-700">获得卡牌</div>
              <div className="mt-1 text-2xl font-black text-slate-900">+ {result.cardsEarned} 张</div>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {result.cardNames.map((name, i) => (
              <div key={i} className="rounded-lg bg-emerald-50 px-3 py-2 text-sm font-bold text-slate-700">
                {name}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 下方身份提示 */}
      <div className="mb-8 flex items-center gap-3 rounded-2xl bg-white/10 px-4 py-3 backdrop-blur">
        <div className="h-10 w-10 overflow-hidden rounded-full bg-white/90 p-0.5">
          {student.avatarUrl ? (
            <img src={student.avatarUrl} alt="学生头像" className="h-full w-full rounded-full object-cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center rounded-full text-lg">👤</div>
          )}
        </div>
        <div className="flex-1">
          <div className="text-xs opacity-75">编号：{student.code}</div>
          <div className="text-sm font-bold">本次成长记录已保存</div>
        </div>
      </div>

      {/* 底部按钮 */}
      <div className="flex w-full max-w-md flex-col gap-3">
        <Link
          href="/terminal/ranking-popup"
          className="rounded-2xl bg-white px-6 py-4 text-center text-lg font-black text-emerald-600 shadow-xl transition hover:scale-105"
        >
          查看学习之星排行榜 🏆
        </Link>
      </div>
    </div>
  )
}
