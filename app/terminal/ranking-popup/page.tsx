'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { mockRankingConfigs, mockRankingRecords } from '@/utils/rankingMock'

const MOCK_MY_RANK = 4
const MOCK_MY_SCORE = 90
const MOCK_MY_CODE = 'GH123'

export default function RankingPopupPage() {
  const config = mockRankingConfigs[0]
  const records = mockRankingRecords.slice(0, config.topN)
  const [visible, setVisible] = useState(false)
  const [leaving, setLeaving] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 300)
    return () => clearTimeout(t)
  }, [])

  const handleContinue = () => {
    setLeaving(true)
    setTimeout(() => {
      window.location.href = '/terminal/growth-feedback'
    }, 400)
  }

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900 px-4">
      {/* 返回首页 */}
      <Link href="/" className="fixed left-4 top-4 z-50 rounded-xl bg-white/10 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur hover:bg-white/20">
        返回首页
      </Link>

      {/* 背景星星 */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div key={i} className="absolute rounded-full bg-white opacity-20"
            style={{
              width: Math.random() * 4 + 1,
              height: Math.random() * 4 + 1,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {/* 排行榜弹出卡片 */}
      <div
        className="relative z-10 w-full max-w-sm transition-all duration-500"
        style={{
          opacity: visible && !leaving ? 1 : 0,
          transform: visible && !leaving ? 'translateY(0) scale(1)' : 'translateY(40px) scale(0.95)',
        }}
      >
        {/* 标题区 */}
        <div className="mb-4 text-center">
          <div className="mb-1 text-3xl">🏆</div>
          <h1 className="text-2xl font-black tracking-tight text-white">{config.title}</h1>
          <p className="mt-1 text-xs text-white/60">{config.subtitle}</p>
        </div>

        {/* 排行榜卡片 */}
        <div className="rounded-3xl bg-white/10 p-1 backdrop-blur-md ring-1 ring-white/20">
          <div className="rounded-2xl bg-white/95 p-4">

            {/* 前三名大卡片 */}
            <div className="mb-4 flex items-end justify-center gap-2">
              {/* 第二名 */}
              <div className="flex flex-col items-center">
                <div className="mb-1 flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-xl">🥈</div>
                <div className="w-20 rounded-xl bg-slate-100 p-2 text-center">
                  <div className="text-[10px] font-bold text-slate-500">{records[1]?.studentCode}</div>
                  <div className="text-lg font-black text-slate-900">{records[1]?.score}</div>
                  <div className="text-[10px] text-slate-500">分</div>
                </div>
              </div>
              {/* 第一名 */}
              <div className="flex flex-col items-center">
                <div className="mb-1 flex h-12 w-12 items-center justify-center rounded-full bg-yellow-100 text-2xl">🥇</div>
                <div className="w-24 rounded-xl bg-gradient-to-b from-yellow-50 to-amber-50 p-3 text-center ring-2 ring-yellow-300">
                  <div className="text-[10px] font-bold text-amber-600">{records[0]?.studentCode}</div>
                  <div className="text-2xl font-black text-slate-900">{records[0]?.score}</div>
                  <div className="text-[10px] text-amber-600">分</div>
                </div>
              </div>
              {/* 第三名 */}
              <div className="flex flex-col items-center">
                <div className="mb-1 flex h-10 w-10 items-center justify-center rounded-full bg-orange-100 text-xl">🥉</div>
                <div className="w-20 rounded-xl bg-orange-50 p-2 text-center">
                  <div className="text-[10px] font-bold text-slate-500">{records[2]?.studentCode}</div>
                  <div className="text-lg font-black text-slate-900">{records[2]?.score}</div>
                  <div className="text-[10px] text-slate-500">分</div>
                </div>
              </div>
            </div>

            {/* 4-10名列表 */}
            <div className="space-y-1.5">
              {records.slice(3, 7).map((r) => (
                <div key={r.rank}
                  className={`flex items-center gap-2 rounded-xl px-3 py-2 ${
                    r.studentCode === MOCK_MY_CODE
                      ? 'bg-purple-50 ring-1 ring-purple-300'
                      : 'bg-slate-50'
                  }`}
                >
                  <span className="w-5 text-center text-xs font-black text-slate-400">{r.rank}</span>
                  <span className="flex-1 text-xs font-bold text-slate-700">{r.studentCode}</span>
                  <span className="text-sm font-black text-slate-900">{r.score} 分</span>
                </div>
              ))}
            </div>

            {/* 我的排名 */}
            <div className="mt-3 rounded-xl bg-purple-600 px-3 py-3 text-white">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-xs font-black">
                  {MOCK_MY_RANK}
                </div>
                <div className="flex-1">
                  <div className="text-xs opacity-75">{config.myPerformanceHint}</div>
                  <div className="font-black">{MOCK_MY_CODE}</div>
                </div>
                <div className="text-right">
                  <div className="text-xl font-black">{MOCK_MY_SCORE}</div>
                  <div className="text-xs opacity-75">分</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 底部按钮 */}
        <div className="mt-4 flex flex-col gap-2">
          <button
            onClick={handleContinue}
            className="w-full rounded-2xl bg-white px-6 py-4 text-center text-lg font-black text-purple-700 shadow-xl transition hover:scale-105 active:scale-95"
          >
            查看成长变化 →
          </button>
          <div className="text-center text-xs text-white/40">
            {config.encourageText}
          </div>
        </div>
      </div>
    </div>
  )
}
