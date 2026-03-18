'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { PhoneFrame } from '@/components/PhoneFrame'
import { mockStudentWithoutGrowth, mockInteractionResult } from '@/utils/terminalMock'

type ModalType = 'score' | 'cards' | null

export default function SimpleInteractionResultPage() {
  const student = mockStudentWithoutGrowth
  const result = mockInteractionResult

  const [currentModal, setCurrentModal] = useState<ModalType>('score')

  useEffect(() => {
    const sequence: ModalType[] = ['score', 'cards']
    let currentIndex = 0
    const timer = setInterval(() => {
      currentIndex++
      if (currentIndex >= sequence.length) {
        setCurrentModal(null)
        clearInterval(timer)
      } else {
        setCurrentModal(sequence[currentIndex])
      }
    }, 2000)

    return () => clearInterval(timer)
  }, [])

  return (
    <>
      <Link
        href="/v1.9.0"
        className="fixed left-4 top-4 z-50 rounded-xl bg-white/20 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur hover:bg-white/30"
      >
        返回首页
      </Link>

      <PhoneFrame>
        <div className="relative flex min-h-full flex-col bg-gradient-to-br from-cyan-400 via-blue-500 to-indigo-600 px-6 py-8 text-white">
          <div className="mb-6 rounded-2xl bg-white/10 p-5 backdrop-blur">
            <div className="mb-3 flex items-center gap-3">
              <div className="h-12 w-12 overflow-hidden rounded-full bg-white/90 p-0.5">
                {student.avatarUrl ? (
                  <img src={student.avatarUrl} alt="学生头像" className="h-full w-full rounded-full object-cover" />
                ) : (
                  <div className="flex h-full w-full items-center justify-center rounded-full text-xl">👤</div>
                )}
              </div>
              <div className="text-sm font-semibold opacity-75">编号：{student.code}</div>
            </div>
            <h1 className="text-center text-2xl font-black tracking-tight">🎉 互动完成</h1>
          </div>

          <div className="mb-6 rounded-2xl bg-white/95 p-6 shadow-xl backdrop-blur">
            <h3 className="mb-4 text-center text-xl font-black text-slate-900">互动摘要</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-xl bg-gradient-to-br from-blue-50 to-cyan-50 p-4 text-center">
                <div className="text-xs font-semibold text-blue-600">累计互动</div>
                <div className="mt-2 text-3xl font-black text-slate-900">{student.stats.totalInteractions}</div>
                <div className="mt-1 text-xs text-slate-500">次</div>
              </div>
              <div className="rounded-xl bg-gradient-to-br from-emerald-50 to-teal-50 p-4 text-center">
                <div className="text-xs font-semibold text-emerald-600">累计卡牌</div>
                <div className="mt-2 text-3xl font-black text-slate-900">{student.stats.totalCards}</div>
                <div className="mt-1 text-xs text-slate-500">张</div>
              </div>
              <div className="rounded-xl bg-gradient-to-br from-purple-50 to-pink-50 p-4 text-center">
                <div className="text-xs font-semibold text-purple-600">兑换礼物</div>
                <div className="mt-2 text-3xl font-black text-slate-900">{student.stats.redeemedGifts}</div>
                <div className="mt-1 text-xs text-slate-500">个</div>
              </div>
              <div className="rounded-xl bg-gradient-to-br from-amber-50 to-orange-50 p-4 text-center">
                <div className="text-xs font-semibold text-amber-600">本次得分</div>
                <div className="mt-2 text-3xl font-black text-slate-900">95</div>
                <div className="mt-1 text-xs text-slate-500">分</div>
              </div>
            </div>
            <div className="mt-4 rounded-xl bg-slate-50 p-4">
              <div className="text-xs font-semibold text-slate-600">最近互动时间</div>
              <div className="mt-2 text-sm font-bold text-slate-900">{student.stats.lastInteractionAt}</div>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <Link
              href="/terminal/game-select"
              className="rounded-2xl bg-white px-6 py-4 text-center text-lg font-black text-blue-600 shadow-xl transition hover:scale-105"
            >
              继续互动
            </Link>
          </div>

          {/* 弹窗层 - 在 PhoneFrame 内部显示 */}
          {currentModal && (
            <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm rounded-2xl">
              {currentModal === 'score' && (
                <div className="animate-scale-in w-full max-w-xs rounded-3xl bg-white p-8 text-center shadow-2xl mx-4">
                  <div className="mb-4 text-7xl">🎉</div>
                  <h2 className="mb-2 text-2xl font-black text-slate-900">互动完成</h2>
                  <div className="mb-2 text-sm font-semibold text-blue-700">本次得分</div>
                  <div className="text-7xl font-black text-slate-900">95</div>
                  <div className="mt-2 text-lg font-bold text-slate-600">太棒了！</div>
                </div>
              )}

              {currentModal === 'cards' && (
                <div className="animate-scale-in w-full max-w-xs rounded-3xl bg-white p-8 text-center shadow-2xl mx-4">
                  <div className="mb-4 text-7xl">🎴</div>
                  <h2 className="mb-4 text-2xl font-black text-slate-900">获得卡牌</h2>
                  <div className="mb-4 text-6xl font-black text-emerald-600">+ {result.cardsEarned}</div>
                  <div className="flex flex-wrap justify-center gap-2">
                    {result.cardNames.map((name, i) => (
                      <div key={i} className="rounded-lg bg-emerald-50 px-3 py-2 text-sm font-bold text-slate-700">
                        {name}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </PhoneFrame>

      <style jsx>{`
        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-scale-in {
          animation: scale-in 0.3s ease-out;
        }
      `}</style>
    </>
  )
}
