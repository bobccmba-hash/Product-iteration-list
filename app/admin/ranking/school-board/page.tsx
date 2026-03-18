'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'
import { Button } from '@/components/admin/AdminPrimitives'
import { mockSchools } from '@/utils/adminMock'

const MONTHS = ['2026-03', '2026-02', '2026-01', '2025-12', '2025-11', '2025-10']

const GAMES = [
  { value: 'ar_pose', label: 'AR 姿态挑战' },
  { value: 'quiz', label: '知识问答' },
  { value: 'memory', label: '记忆翻牌' },
  { value: 'math', label: '数学闯关' },
]

const TERMINALS: Record<string, string[]> = {
  '示例小学A': ['终端-001', '终端-002', '终端-003'],
  '示例小学B': ['终端-004', '终端-005'],
  '示例中学A': ['终端-006', '终端-007', '终端-008'],
  '示例中学B': ['终端-009'],
}

type SchoolBoardRow = {
  school: string
  terminal: string
  month: string
  updatedAt: string
  gameCount: number
}

function generateRows(month: string): SchoolBoardRow[] {
  const rows: SchoolBoardRow[] = []
  for (const school of mockSchools) {
    const terminals = TERMINALS[school] ?? ['终端-001']
    for (const terminal of terminals) {
      const seed = school.charCodeAt(0) + terminal.charCodeAt(terminal.length - 1) + month.charCodeAt(5)
      const day = String(((seed * 7) % 28) + 1).padStart(2, '0')
      const hour = String((seed * 3) % 24).padStart(2, '0')
      const min = String((seed * 11) % 60).padStart(2, '0')
      rows.push({
        school,
        terminal,
        month,
        updatedAt: `${month}-${day} ${hour}:${min}`,
        gameCount: GAMES.length,
      })
    }
  }
  return rows.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
}

const PAGE_SIZE = 10

export default function SchoolBoardPage() {
  const [schoolFilter, setSchoolFilter] = useState('all')
  const [monthFilter, setMonthFilter] = useState(MONTHS[0])
  const [appliedSchool, setAppliedSchool] = useState('all')
  const [appliedMonth, setAppliedMonth] = useState(MONTHS[0])
  const [page, setPage] = useState(1)

  const schoolOptions = useMemo(() => [
    { value: 'all', label: '全部学校' },
    ...mockSchools.map((s) => ({ value: s, label: s })),
  ], [])

  const allRows = useMemo(() => generateRows(appliedMonth), [appliedMonth])

  const filtered = useMemo(() => allRows.filter((r) => {
    if (appliedSchool !== 'all' && r.school !== appliedSchool) return false
    return true
  }), [allRows, appliedSchool])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  function handleSearch() {
    setAppliedSchool(schoolFilter)
    setAppliedMonth(monthFilter)
    setPage(1)
  }

  function handleReset() {
    setSchoolFilter('all')
    setMonthFilter(MONTHS[0])
    setAppliedSchool('all')
    setAppliedMonth(MONTHS[0])
    setPage(1)
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="text-xs font-bold text-slate-500">学习之星管理 / 学校榜单管理</div>
          <h1 className="mt-2 text-2xl font-black tracking-tight">学校榜单管理</h1>
          <p className="mt-1 text-sm text-slate-500">查看各学校终端每月学习之星榜单，按最新更新时间排列。</p>
        </div>
      </div>

      {/* 筛选区 */}
      <div className="rounded-2xl bg-white p-4 ring-1 ring-slate-200">
        <div className="flex flex-wrap items-end gap-4">
          <div className="min-w-[180px]">
            <label className="mb-1 block text-xs font-bold text-slate-600">学校</label>
            <select value={schoolFilter} onChange={(e) => setSchoolFilter(e.target.value)}
              className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm focus:border-slate-400 focus:outline-none">
              {schoolOptions.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>
          <div className="min-w-[160px]">
            <label className="mb-1 block text-xs font-bold text-slate-600">月份</label>
            <select value={monthFilter} onChange={(e) => setMonthFilter(e.target.value)}
              className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm focus:border-slate-400 focus:outline-none">
              {MONTHS.map((m) => <option key={m} value={m}>{m}</option>)}
            </select>
          </div>
          <div className="flex items-end gap-2">
            <Button tone="primary" onClick={handleSearch}>查询</Button>
            <Button tone="secondary" onClick={handleReset}>重置</Button>
          </div>
        </div>
      </div>

      {/* 列表 */}
      <div className="rounded-2xl bg-white ring-1 ring-slate-200">
        <div className="border-b border-slate-100 p-4">
          <div className="text-sm font-bold text-slate-900">榜单列表</div>
          <div className="mt-1 text-xs text-slate-500">共 {filtered.length} 条记录，按最新更新时间排列</div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-[700px] w-full text-left text-sm">
            <thead className="bg-slate-50 text-xs font-bold text-slate-600">
              <tr>
                <th className="px-4 py-3">学校</th>
                <th className="px-4 py-3">终端</th>
                <th className="px-4 py-3">月份</th>
                <th className="px-4 py-3">榜单个数</th>
                <th className="px-4 py-3">更新时间</th>
                <th className="px-4 py-3">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {paged.map((r, idx) => (
                <tr key={idx} className="hover:bg-slate-50/60">
                  <td className="px-4 py-3">
                    <div className="font-semibold text-slate-900">{r.school}</div>
                  </td>
                  <td className="px-4 py-3 text-slate-600">{r.terminal}</td>
                  <td className="px-4 py-3 text-slate-600">{r.month}</td>
                  <td className="px-4 py-3 text-slate-600">{r.gameCount} 个榜单</td>
                  <td className="px-4 py-3 text-xs text-slate-500">{r.updatedAt}</td>
                  <td className="px-4 py-3">
                    <Link
                      href={`/admin/ranking/school-board/${encodeURIComponent(r.school)}?terminal=${encodeURIComponent(r.terminal)}&month=${r.month}`}
                      className="text-xs font-bold text-blue-600 hover:text-blue-800 hover:underline"
                    >
                      查看榜单
                    </Link>
                  </td>
                </tr>
              ))}
              {paged.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-4 py-12 text-center text-sm text-slate-500">暂无榜单数据</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* 分页 */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between border-t border-slate-100 px-4 py-3">
            <div className="text-xs text-slate-500">第 {page} / {totalPages} 页，共 {filtered.length} 条</div>
            <div className="flex items-center gap-1">
              <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}
                className="rounded-lg px-3 py-1.5 text-xs font-bold text-slate-600 hover:bg-slate-100 disabled:opacity-30">← 上一页</button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button key={p} onClick={() => setPage(p)}
                  className={`rounded-lg px-3 py-1.5 text-xs font-bold transition ${
                    p === page ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'
                  }`}>{p}</button>
              ))}
              <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages}
                className="rounded-lg px-3 py-1.5 text-xs font-bold text-slate-600 hover:bg-slate-100 disabled:opacity-30">下一页 →</button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
