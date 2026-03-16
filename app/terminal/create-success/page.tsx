'use client'

import Link from 'next/link'
import { mockNewStudent } from '@/utils/terminalMock'

export default function CreateSuccessPage() {
  const student = mockNewStudent

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-emerald-400 via-teal-500 to-cyan-500 px-6 text-white">
      {/* 返回首页按钮 */}
      <Link
        href="/"
        className="fixed left-4 top-4 z-50 rounded-xl bg-white/20 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur hover:bg-white/30"
      >
        返回首页
      </Link>

      {/* 顶部成功插画 */}
      <div className="mb-8 text-8xl animate-bounce">🎉</div>

      {/* 中部主信息卡 */}
      <div className="mb-8 w-full max-w-sm rounded-3xl bg-white/95 p-6 text-center shadow-2xl backdrop-blur">
        <div className="mb-4 flex justify-center">
          <div className="h-24 w-24 overflow-hidden rounded-full bg-gradient-to-br from-slate-100 to-slate-200 p-1 ring-4 ring-emerald-400/50">
            {student.avatarUrl ? (
              <img src={student.avatarUrl} alt="学生头像" className="h-full w-full rounded-full object-cover" />
            ) : (
              <div className="flex h-full w-full items-center justify-center rounded-full text-4xl">👤</div>
            )}
          </div>
        </div>

        <div className="mb-2 text-sm font-semibold text-slate-600">编号：{student.code}</div>

        <h2 className="mb-2 text-2xl font-black text-slate-900">成长身份建立成功</h2>
        <p className="text-sm text-slate-600">你的成长记录已经开启啦</p>
      </div>

      {/* 下方说明 */}
      <div className="mb-8 max-w-sm space-y-2 text-center text-sm">
        <p className="font-semibold">✅ 已为你开启任务成长</p>
        <p className="opacity-90">每次互动都会记录进步</p>
      </div>

      {/* 底部按钮 */}
      <div className="flex w-full max-w-xs flex-col gap-3">
        <Link
          href="/terminal/pre-interaction"
          className="rounded-2xl bg-white px-6 py-4 text-center text-lg font-black text-teal-600 shadow-xl transition hover:scale-105"
        >
          直接开始
        </Link>
        <Link
          href="/terminal/home"
          className="rounded-2xl bg-white/20 px-6 py-3 text-center text-sm font-bold backdrop-blur transition hover:bg-white/30"
        >
          返回首页
        </Link>
      </div>
    </div>
  )
}
