'use client'

import Link from 'next/link'
import { useParams, useSearchParams } from 'next/navigation'
import { Suspense, useMemo, useState } from 'react'
import { Button } from '@/components/admin/AdminPrimitives'

const MONTHS = ['2026-03', '2026-02', '2026-01', '2025-12', '2025-11', '2025-10']

type GameBoard = {
  game: string
  gameLabel: string
  updatedAt: string
  entries: BoardEntry[]
}

const GAMES = [
  { value: 'ar_pose', label: 'AR 姿态挑战' },
  { value: 'quiz', label: '知识问答' },
  { value: 'memory', label: '记忆翻牌' },
  { value: 'math', label: '数学闯关' },
]

type BoardEntry = {
  rank: number
  studentCode: string
  score: number
  recordAt: string
}

function generateEntries(school: string, terminal: string, game: string, month: string): BoardEntry[] {
  const seed = school.charCodeAt(0) + terminal.charCodeAt(terminal.length - 1) * 3 + game.charCodeAt(0) * 7 + month.charCodeAt(5) * 13
  const letters = 'ABCDEFGHJKLMNPQRSTUVWXYZ'
  return Array.from({ length: 10 }, (_, i) => {
    const l1 = letters[(seed + i * 3) % letters.length]
    const l2 = letters[(seed + i * 7 + 5) % letters.length]
    const num = String(((seed + i * 13) % 999) + 1).padStart(3, '0')
    const day = String(((seed + i * 4) % 28) + 1).padStart(2, '0')
    const hour = String((seed + i * 6) % 24).padStart(2, '0')
    const min = String((seed + i * 9) % 60).padStart(2, '0')
    return {
      rank: i + 1,
      studentCode: `${l1}${l2}${num}`,
      score: Math.max(55, 100 - i * 3 - (seed % 5)),
      recordAt: `${month}-${day} ${hour}:${min}`,
    }
  })
}

function generateBoards(school: string, terminal: string, month: string): GameBoard[] {
  return GAMES.map((g) => {
    const seed = school.charCodeAt(0) + terminal.charCodeAt(terminal.length - 1) + g.value.charCodeAt(0) + month.charCodeAt(5)
    const day = String(((seed * 7) % 28) + 1).padStart(2, '0')
    const hour = String((seed * 3) % 24).padStart(2, '0')
    const min = String((seed * 11) % 60).padStart(2, '0')
    return {
      game: g.value,
      gameLabel: g.label,
      updatedAt: `${month}-${day} ${hour}:${min}`,
      entries: generateEntries(school, terminal, g.value, month),
    }
  }).sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
}

const PAGE_SIZE = 10

function DetailInner() {
  const params = useParams<{ school: string }>()
  const searchParams = useSearchParams()
  const school = decodeURIComponent(params.school)
  const terminal = searchParams.get('terminal') ?? '终端-001'
  const initMonth = searchParams.get('month') ?? MONTHS[0]

  const [gameFilter, setGameFilter] = useState('all')
  const [monthFilter, setMonthFilter] = useState(initMonth)
  const [appliedGame, setAppliedGame] = useState('all')
  const [appliedMonth, setAppliedMonth] = useState(initMonth)
  const [page, setPage] = useState(1)
  const [modal, setModal] = useState<GameBoard | null>(null)

  const allBoards = useMemo(() => generateBoards(school, terminal, appliedMonth), [school, terminal, appliedMonth])
  const filtered = useMemo(() => allBoards.filter((b) => appliedGame === 'all' || b.game === appliedGame), [allBoards, appliedGame])
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  function handleSearch() { setAppliedGame(gameFilter); setAppliedMonth(monthFilter); setPage(1) }
  function handleReset() { setGameFilter('all'); setMonthFilter(initMonth); setAppliedGame('all'); setAppliedMonth(initMonth); setPage(1) }

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="text-xs font-bold text-slate-500">学习之星管理 / 学校榜单管理 / 详情</div>
          <h1 className="mt-2 text-2xl font-black tracking-tight">{school} · {terminal}</h1>
          <p className="mt-1 text-sm text-slate-500">{appliedMonth} 学习之星榜单</p>
        </div>
        <Link href="/admin/ranking/school-board" className="rounded-xl bg-slate-100 px-4 py-2 text-sm font-bold text-slate-700 hover:bg-slate-200">← 返回列表</Link>
      </div>

      <div className="rounded-2xl bg-white p-4 ring-1 ring-slate-200">
        <div className="flex flex-wrap items-end gap-4">
          <div className="min-w-[180px]">
            <label className="mb-1 block text-xs font-bold text-slate-600">游戏</label>
            <select value={gameFilter} onChange={(e) => setGameFilter(e.target.value)} className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm focus:border-slate-400 focus:outline-none">
              <option value="all">全部游戏</option>
              {GAMES.map((g) => <option key={g.value} value={g.value}>{g.label}</option>)}
            </select>
          </div>
          <div className="min-w-[160px]">
            <label className="mb-1 block text-xs font-bold text-slate-600">更新时间（月份）</label>
            <select value={monthFilter} onChange={(e) => setMonthFilter(e.target.value)} className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm focus:border-slate-400 focus:outline-none">
              {MONTHS.map((m) => <option key={m} value={m}>{m}</option>)}
            </select>
          </div>
          <div className="flex items-end gap-2">
            <Button tone="primary" onClick={handleSearch}>查询</Button>
            <Button tone="secondary" onClick={handleReset}>重置</Button>
          </div>
        </div>
      </div>

      <div className="rounded-2xl bg-white ring-1 ring-slate-200">
        <div className="border-b border-slate-100 p-4">
          <div className="text-sm font-bold text-slate-900">游戏榜单列表</div>
          <div className="mt-1 text-xs text-slate-500">共 {filtered.length} 个游戏榜单</div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-[700px] w-full text-left text-sm">
            <thead className="bg-slate-50 text-xs font-bold text-slate-600">
              <tr>
                <th className="px-4 py-3">游戏名称</th>
                <th className="px-4 py-3">榜首用户</th>
                <th className="px-4 py-3">榜首分数</th>
                <th className="px-4 py-3">榜单人数</th>
                <th className="px-4 py-3">记录时间</th>
                <th className="px-4 py-3">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {paged.map((b) => (
                <tr key={b.game} className="hover:bg-slate-50/60">
                  <td className="px-4 py-3 font-semibold text-slate-900">{b.gameLabel}</td>
                  <td className="px-4 py-3 font-mono text-xs text-slate-700">{b.entries[0].studentCode}</td>
                  <td className="px-4 py-3 font-black text-slate-900">{b.entries[0].score} 分</td>
                  <td className="px-4 py-3 text-slate-600">{b.entries.length} 人</td>
                  <td className="px-4 py-3 text-xs text-slate-500">{b.updatedAt}</td>
                  <td className="px-4 py-3">
                    <button type="button" onClick={() => setModal(b)} className="text-xs font-bold text-blue-600 hover:text-blue-800 hover:underline">查看榜单</button>
                  </td>
                </tr>
              ))}
              {paged.length === 0 && (<tr><td colSpan={6} className="px-4 py-12 text-center text-sm text-slate-500">暂无榜单数据</td></tr>)}
            </tbody>
          </table>
        </div>
        {totalPages > 1 && (
          <div className="flex items-center justify-between border-t border-slate-100 px-4 py-3">
            <div className="text-xs text-slate-500">第 {page} / {totalPages} 页，共 {filtered.length} 条</div>
            <div className="flex items-center gap-1">
              <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1} className="rounded-lg px-3 py-1.5 text-xs font-bold text-slate-600 hover:bg-slate-100 disabled:opacity-30">← 上一页</button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button key={p} onClick={() => setPage(p)} className={`rounded-lg px-3 py-1.5 text-xs font-bold transition ${p === page ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'}`}>{p}</button>
              ))}
              <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="rounded-lg px-3 py-1.5 text-xs font-bold text-slate-600 hover:bg-slate-100 disabled:opacity-30">下一页 →</button>
            </div>
          </div>
        )}
      </div>

      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm" onClick={() => setModal(null)}>
          <div className="relative w-full max-w-lg rounded-2xl bg-white shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
              <div>
                <div className="text-xs font-bold text-slate-500">{school} · {terminal} · {appliedMonth}</div>
                <div className="mt-1 text-lg font-black text-slate-900">{modal.gameLabel} 榜单</div>
              </div>
              <button type="button" onClick={() => setModal(null)} className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200">✕</button>
            </div>
            <div className="max-h-[60vh] overflow-y-auto px-6 py-4">
              <table className="w-full text-left text-sm">
                <thead className="sticky top-0 bg-white text-xs font-bold text-slate-600">
                  <tr>
                    <th className="pb-3 pr-4">排名</th>
                    <th className="pb-3 pr-4">学生编号</th>
                    <th className="pb-3 pr-4">分数</th>
                    <th className="pb-3">记录时间</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {modal.entries.map((entry) => (
                    <tr key={entry.rank} className="hover:bg-slate-50/60">
                      <td className="py-2.5 pr-4">
                        {entry.rank === 1 ? '🥇' : entry.rank === 2 ? '🥈' : entry.rank === 3 ? '🥉' : <span className="font-black text-slate-400">{entry.rank}</span>}
                      </td>
                      <td className="py-2.5 pr-4 font-mono text-xs font-bold text-slate-900">{entry.studentCode}</td>
                      <td className="py-2.5 pr-4 font-black text-slate-900">{entry.score} 分</td>
                      <td className="py-2.5 text-xs text-slate-500">{entry.recordAt}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex justify-end border-t border-slate-100 px-6 py-4">
              <button type="button" onClick={() => setModal(null)} className="rounded-xl bg-slate-900 px-5 py-2 text-sm font-bold text-white hover:bg-slate-700">关闭</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default function SchoolBoardDetailPage() {
  return (
    <Suspense fallback={<div className="py-12 text-center text-sm text-slate-500">加载中…</div>}>
      <DetailInner />
    </Suspense>
  )
}
