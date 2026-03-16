'use client'

import Link from 'next/link'
import { useState } from 'react'
import { mockReturningStudent } from '@/utils/terminalMock'

type TabKey = 'task' | 'goal' | 'badge' | 'record'

export default function GrowthDetailPage() {
  const student = mockReturningStudent
  const [tab, setTab] = useState<TabKey>('task')

  return (
    <div className="relative flex min-h-screen flex-col bg-gradient-to-br from-cyan-400 via-blue-500 to-indigo-600 px-6 py-8 text-white">
      {/* 返回首页按钮 */}
      <Link
        href="/"
        className="fixed left-4 top-4 z-50 rounded-xl bg-white/20 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur hover:bg-white/30"
      >
        返回首页
      </Link>

      {/* 顶部身份卡 */}
      <div className="mb-6 rounded-2xl bg-white/10 p-5 backdrop-blur">
        <div className="mb-4 flex items-center gap-4">
          <div className="h-20 w-20 overflow-hidden rounded-full bg-white/90 p-1">
            {student.avatarUrl ? (
              <img src={student.avatarUrl} alt="学生头像" className="h-full w-full rounded-full object-cover" />
            ) : (
              <div className="flex h-full w-full items-center justify-center rounded-full text-3xl">👤</div>
            )}
          </div>
          <div className="flex-1">
            <div className="text-sm font-semibold opacity-75">编号：{student.code}</div>
            <h1 className="mt-1 text-2xl font-black">我的成长</h1>
          </div>
        </div>
      </div>

      {/* Tab 切换 */}
      <div className="mb-4 flex gap-2 overflow-x-auto">
        <TabButton active={tab === 'task'} onClick={() => setTab('task')}>
          当前任务
        </TabButton>
        <TabButton active={tab === 'goal'} onClick={() => setTab('goal')}>
          当前目标
        </TabButton>
        <TabButton active={tab === 'badge'} onClick={() => setTab('badge')}>
          我的勋章
        </TabButton>
        <TabButton active={tab === 'record'} onClick={() => setTab('record')}>
          成长记录
        </TabButton>
      </div>

      {/* Tab 内容 */}
      <div className="mb-6 flex-1">
        {tab === 'task' && (
          <div className="rounded-2xl bg-white/95 p-5 shadow-xl backdrop-blur">
            <div className="mb-4 flex items-center gap-3">
              <div className="text-4xl">{student.currentTask.icon}</div>
              <div className="flex-1">
                <div className="text-xs font-semibold text-blue-600">当前任务</div>
                <div className="mt-1 text-xl font-black text-slate-900">{student.currentTask.name}</div>
              </div>
            </div>
            <div className="mb-4 rounded-xl bg-slate-50 p-4">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm font-semibold text-slate-600">任务进度</span>
                <span className="text-lg font-black text-slate-900">
                  {student.currentTask.progress} / {student.currentTask.total}
                </span>
              </div>
              <div className="h-3 overflow-hidden rounded-full bg-slate-200">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 transition-all"
                  style={{ width: `${(student.currentTask.progress / student.currentTask.total) * 100}%` }}
                />
              </div>
            </div>
            <div className="rounded-xl bg-blue-50 p-4">
              <div className="text-sm font-semibold text-blue-700">任务说明</div>
              <p className="mt-2 text-sm text-slate-700">{student.currentTask.description}</p>
            </div>
            {student.currentTask.progress === student.currentTask.total && (
              <div className="mt-4 rounded-xl bg-green-50 p-4 text-center">
                <div className="text-lg font-black text-green-700">🎉 任务已完成！</div>
              </div>
            )}
          </div>
        )}

        {tab === 'goal' && (
          <div className="rounded-2xl bg-white/95 p-5 shadow-xl backdrop-blur">
            <div className="mb-4 flex items-center gap-3">
              <div className="text-4xl">{student.currentGoal.icon}</div>
              <div className="flex-1">
                <div className="text-xs font-semibold text-blue-600">当前目标</div>
                <div className="mt-1 text-xl font-black text-slate-900">{student.currentGoal.name}</div>
              </div>
              <div className="rounded-full bg-blue-100 px-3 py-1 text-sm font-bold text-blue-700">
                阶段 {student.currentGoal.stage}
              </div>
            </div>
            <div className="mb-4 rounded-xl bg-slate-50 p-4">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm font-semibold text-slate-600">目标进度</span>
                <span className="text-lg font-black text-slate-900">
                  {student.currentGoal.progress} / {student.currentGoal.total}
                </span>
              </div>
              <div className="h-3 overflow-hidden rounded-full bg-slate-200">
                <div
                  className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all"
                  style={{ width: `${(student.currentGoal.progress / student.currentGoal.total) * 100}%` }}
                />
              </div>
            </div>
            <div className="rounded-xl bg-purple-50 p-4">
              <div className="text-sm font-semibold text-purple-700">目标说明</div>
              <p className="mt-2 text-sm text-slate-700">{student.currentGoal.description}</p>
            </div>
          </div>
        )}

        {tab === 'badge' && (
          <div className="space-y-4">
            <div className="rounded-2xl bg-white/95 p-5 shadow-xl backdrop-blur">
              <div className="mb-4 text-center">
                <div className="text-5xl">🏆</div>
                <div className="mt-3 text-2xl font-black text-slate-900">我的勋章</div>
                <div className="mt-1 text-sm text-slate-600">
                  已获得 {student.badges.earned} / {student.badges.total} 枚
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {Array.from({ length: student.badges.total }).map((_, i) => (
                  <div
                    key={i}
                    className={`rounded-xl p-3 text-center ${i < student.badges.earned ? 'bg-yellow-50' : 'bg-slate-100'}`}
                  >
                    <div className={`text-3xl ${i >= student.badges.earned ? 'opacity-30' : ''}`}>
                      {i < student.badges.earned ? '⭐' : '🔒'}
                    </div>
                    <div className="mt-1 text-xs font-bold text-slate-700">
                      {i < student.badges.earned ? '已解锁' : '未解锁'}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {student.badges.nextBadge && (
              <div className="rounded-2xl bg-white/90 p-4 shadow-lg backdrop-blur">
                <div className="mb-2 text-sm font-semibold text-blue-600">下一枚勋章</div>
                <div className="flex items-center gap-3">
                  <div className="text-3xl opacity-50">{student.badges.nextBadge.icon}</div>
                  <div className="flex-1">
                    <div className="text-base font-black text-slate-900">{student.badges.nextBadge.name}</div>
                    <div className="mt-1 text-xs text-slate-600">{student.badges.nextBadge.unlockHint}</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {tab === 'record' && (
          <div className="rounded-2xl bg-white/95 p-5 shadow-xl backdrop-blur">
            <h3 className="mb-4 text-lg font-black text-slate-900">成长记录摘要</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between rounded-xl bg-slate-50 p-4">
                <span className="text-sm font-semibold text-slate-600">📚 累计互动次数</span>
                <span className="text-xl font-black text-slate-900">{student.stats.totalInteractions}</span>
              </div>
              <div className="flex items-center justify-between rounded-xl bg-slate-50 p-4">
                <span className="text-sm font-semibold text-slate-600">🎴 累计卡牌数</span>
                <span className="text-xl font-black text-slate-900">{student.stats.totalCards}</span>
              </div>
              <div className="rounded-xl bg-slate-50 p-4">
                <div className="text-sm font-semibold text-slate-600">⏰ 最近一次互动时间</div>
                <div className="mt-2 text-sm font-bold text-slate-900">{student.stats.lastInteractionAt}</div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 底部按钮 */}
      <div className="flex flex-col gap-3">
        <Link
          href="/terminal/pre-interaction"
          className="rounded-2xl bg-white px-6 py-4 text-center text-lg font-black text-blue-600 shadow-xl transition hover:scale-105"
        >
          去挑战
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

function TabButton({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex-shrink-0 rounded-xl px-4 py-2 text-sm font-black transition ${
        active ? 'bg-white text-blue-600 shadow-lg' : 'bg-white/20 text-white backdrop-blur hover:bg-white/30'
      }`}
    >
      {children}
    </button>
  )
}
