'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { PhoneFrame } from '@/components/PhoneFrame'
import { mockReturningStudent, mockInteractionResult } from '@/utils/terminalMock'
import { mockRankingConfigs, mockRankingRecords } from '@/utils/rankingMock'

type ModalType = 'score' | 'cards' | 'ranking' | null

export default function GrowthFeedbackPage() {
  const student = mockReturningStudent
  const result = mockInteractionResult
  const rankingConfig = mockRankingConfigs[0]
  const rankingRecords = mockRankingRecords.slice(0, 7)
  const MOCK_MY_RANK = 4
  const MOCK_MY_SCORE = 90
  const MOCK_MY_CODE = 'GH123'

  const [currentModal, setCurrentModal] = useState<ModalType>('score')

  const highlightTitle = result.taskProgress.completed
    ? '🎯 任务完成！'
    : '✨ 你又进步了一点'

  useEffect(() => {
    const sequence: ModalType[] = ['score', 'ranking', 'cards']
    const durations: number[] = [2000, 4000, 2000]

    let currentIndex = 0
    let timer: ReturnType<typeof setTimeout>

    const showNext = () => {
      currentIndex++
      if (currentIndex >= sequence.length) {
        setCurrentModal(null)
      } else {
        setCurrentModal(sequence[currentIndex])
        timer = setTimeout(showNext, durations[currentIndex])
      }
    }

    timer = setTimeout(showNext, durations[0])
    return () => clearTimeout(timer)
  }, [result])

  return (
    <>
      <Link
        href="/"
        className="fixed left-4 top-4 z-50 rounded-xl bg-white/20 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur hover:bg-white/30"
      >
        返回首页
      </Link>

      <PhoneFrame>
        <div className="relative flex min-h-full flex-col bg-gradient-to-br from-rose-400 via-pink-500 to-fuchsia-600 px-6 py-8 text-white">
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
            <h1 className="text-center text-2xl font-black tracking-tight">{highlightTitle}</h1>
          </div>

          {/* 任务变化 */}
          <div className="mb-6">
            <div className="rounded-2xl bg-white/95 p-5 shadow-xl backdrop-blur">
              <div className="mb-3 flex items-center gap-2">
                <div className="text-3xl">🎯</div>
                <div className="flex-1">
                  <div className="text-xs font-semibold text-pink-600">任务变化</div>
                  <div className="mt-1 text-lg font-black text-slate-900">{student.currentTask.name}</div>
                </div>
              </div>
              <div className="mb-3 rounded-xl bg-slate-50 p-3">
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="font-semibold text-slate-600">任务进度</span>
                  <span className="font-black text-slate-900">{result.taskProgress.after} / {student.currentTask.total}</span>
                </div>
                <div className="h-3 overflow-hidden rounded-full bg-slate-200">
                  <div
                    className="h-full bg-gradient-to-r from-pink-500 to-rose-500 transition-all"
                    style={{ width: `${(result.taskProgress.after / student.currentTask.total) * 100}%` }}
                  />
                </div>
              </div>
              {result.taskProgress.completed && (
                <div className="rounded-lg bg-green-50 px-3 py-2 text-center">
                  <div className="text-sm font-black text-green-700">✅ 任务已完成</div>
                </div>
              )}
            </div>
          </div>

          <div className="mb-6 rounded-2xl bg-white/90 p-5 shadow-lg backdrop-blur">
            <h3 className="mb-4 text-lg font-black text-slate-900">成长摘要</h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-xl bg-slate-50 p-3 text-center">
                <div className="text-xs font-semibold text-slate-600">累计互动</div>
                <div className="mt-1 text-2xl font-black text-slate-900">{student.stats.totalInteractions}</div>
                <div className="text-xs text-slate-500">次</div>
              </div>
              <div className="rounded-xl bg-slate-50 p-3 text-center">
                <div className="text-xs font-semibold text-slate-600">累计卡牌</div>
                <div className="mt-1 text-2xl font-black text-slate-900">{student.stats.totalCards}</div>
                <div className="text-xs text-slate-500">张</div>
              </div>
              <div className="rounded-xl bg-slate-50 p-3 text-center">
                <div className="text-xs font-semibold text-slate-600">兑换礼物</div>
                <div className="mt-1 text-2xl font-black text-slate-900">{student.stats.redeemedGifts}</div>
                <div className="text-xs text-slate-500">个</div>
              </div>

            </div>
            <div className="mt-3 rounded-xl bg-slate-50 p-3">
              <div className="text-xs font-semibold text-slate-600">最近互动时间</div>
              <div className="mt-1 text-sm font-bold text-slate-900">{student.stats.lastInteractionAt}</div>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <Link
              href="/terminal/game-select"
              className="rounded-2xl bg-white px-6 py-4 text-center text-lg font-black text-pink-600 shadow-xl transition hover:scale-105"
            >
              继续挑战
            </Link>
            <Link
              href="/terminal/growth-detail"
              className="text-center text-sm font-semibold opacity-75 hover:opacity-100"
            >
              查看完整成长记录 →
            </Link>
          </div>

          {currentModal && (
            <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm rounded-2xl">
              {currentModal === 'score' && (
                <div className="animate-scale-in w-full max-w-xs rounded-3xl bg-white p-8 text-center shadow-2xl mx-4">
                  <div className="mb-4 text-7xl">🎉</div>
                  <h2 className="mb-2 text-2xl font-black text-slate-900">互动完成</h2>
                  <div className="mb-2 text-sm font-semibold text-emerald-700">本次得分</div>
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

              {currentModal === 'ranking' && (
                <div className="animate-scale-in w-full max-w-xs overflow-hidden rounded-3xl bg-white shadow-2xl mx-4 max-h-80 overflow-y-auto">
                  <div className="bg-gradient-to-br from-purple-600 to-indigo-600 px-6 py-4 text-center text-white sticky top-0">
                    <div className="mb-1 text-2xl">🏆</div>
                    <h2 className="text-xl font-black">{rankingConfig.title}</h2>
                    <p className="mt-0.5 text-xs opacity-75">{rankingConfig.subtitle}</p>
                  </div>
                  <div className="p-4">
                    <div className="mb-3 flex items-end justify-center gap-2">
                      <div className="flex flex-col items-center">
                        <div className="text-xl">🥈</div>
                        <div className="w-20 rounded-xl bg-slate-100 p-2 text-center">
                          <div className="text-[10px] font-bold text-slate-500">{rankingRecords[1]?.studentCode}</div>
                          <div className="text-lg font-black text-slate-900">{rankingRecords[1]?.score}</div>
                        </div>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="text-2xl">🥇</div>
                        <div className="w-24 rounded-xl bg-yellow-50 p-2 text-center ring-2 ring-yellow-300">
                          <div className="text-[10px] font-bold text-amber-600">{rankingRecords[0]?.studentCode}</div>
                          <div className="text-2xl font-black text-slate-900">{rankingRecords[0]?.score}</div>
                        </div>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="text-xl">🥉</div>
                        <div className="w-20 rounded-xl bg-orange-50 p-2 text-center">
                          <div className="text-[10px] font-bold text-slate-500">{rankingRecords[2]?.studentCode}</div>
                          <div className="text-lg font-black text-slate-900">{rankingRecords[2]?.score}</div>
                        </div>
                      </div>
                    </div>
                    <div className="mb-3 space-y-1">
                      {rankingRecords.slice(3, 7).map((r) => (
                        <div key={r.rank} className="flex items-center gap-2 rounded-lg bg-slate-50 px-3 py-1.5">
                          <span className="w-4 text-xs font-black text-slate-400">{r.rank}</span>
                          <span className="flex-1 text-xs font-bold text-slate-700">{r.studentCode}</span>
                          <span className="text-sm font-black text-slate-900">{r.score} 分</span>
                        </div>
                      ))}
                    </div>
                    <div className="rounded-xl bg-purple-600 px-3 py-2.5 text-white">
                      <div className="flex items-center gap-2">
                        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white/20 text-xs font-black">{MOCK_MY_RANK}</div>
                        <div className="flex-1">
                          <div className="text-[10px] opacity-75">{rankingConfig.myPerformanceHint}</div>
                          <div className="text-sm font-black">{MOCK_MY_CODE}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-xl font-black">{MOCK_MY_SCORE}</div>
                          <div className="text-[10px] opacity-75">分</div>
                        </div>
                      </div>
                    </div>
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
