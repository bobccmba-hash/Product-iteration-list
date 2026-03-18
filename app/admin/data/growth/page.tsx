'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'
import { Button, Input, Select, Tag } from '@/components/admin/AdminPrimitives'
import { mockSchools, mockStudents, type StudentGrowthSummary } from '@/utils/adminMock'

export default function GrowthListPage() {
  const [q, setQ] = useState('')
  const [school, setSchool] = useState<'all' | string>('all')
  const [unsynced, setUnsynced] = useState<'all' | 'yes' | 'no'>('all')

  const rows = useMemo(() => {
    return mockStudents.filter((s) => {
      if (q.trim() && !s.studentId.includes(q.trim()) && !s.displayName.includes(q.trim())) return false
      if (school !== 'all' && s.school !== school) return false
      if (unsynced !== 'all' && s.hasUnsynced !== (unsynced === 'yes')) return false
      return true
    })
  }, [q, school, unsynced])

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="text-xs font-bold text-slate-500">数据中心 / 成长记录</div>
          <h1 className="mt-2 text-2xl font-black tracking-tight">成长记录</h1>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/admin/data/growth/events">
            <Button tone="secondary">成长事件流水</Button>
          </Link>
          <Link href="/admin/data/growth/analytics">
            <Button tone="secondary">统计分析</Button>
          </Link>
        </div>
      </div>

      <div className="rounded-2xl bg-white p-4 ring-1 ring-slate-200">
        <div className="grid gap-3 md:grid-cols-6">
          <div className="md:col-span-2">
            <div className="mb-1 text-xs font-semibold text-slate-700">学生ID/昵称</div>
            <Input value={q} onChange={setQ} placeholder="搜索学生ID或昵称" />
          </div>
          <div>
            <div className="mb-1 text-xs font-semibold text-slate-700">学校</div>
            <Select value={school} onChange={setSchool} options={[{ value: 'all', label: '全部' }, ...mockSchools.map((s) => ({ value: s, label: s }))]} />
          </div>
          <div>
            <div className="mb-1 text-xs font-semibold text-slate-700">是否有未同步数据</div>
            <Select
              value={unsynced}
              onChange={(v) => setUnsynced(v as 'all' | 'yes' | 'no')}
              options={[
                { value: 'all', label: '全部' },
                { value: 'yes', label: '是' },
                { value: 'no', label: '否' },
              ]}
            />
          </div>
          <div className="flex items-end justify-end gap-2">
            <Button tone="secondary" onClick={() => null}>
              查询
            </Button>
            <Button
              tone="ghost"
              onClick={() => {
                setQ('')
                setSchool('all')
                setUnsynced('all')
              }}
            >
              重置
            </Button>
          </div>
        </div>
      </div>

      <div className="rounded-2xl bg-white ring-1 ring-slate-200">
        <div className="border-b border-slate-100 p-4">
          <div className="text-sm font-bold text-slate-900">学生成长档案列表</div>
          <div className="mt-1 text-xs text-slate-500">档案是主体：任务/目标/勋章/成长记录都挂在学生档案下。</div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full w-full text-left text-sm">
            <thead className="bg-slate-50 text-xs font-bold text-slate-600">
              <tr>
                <th className="px-3 py-3 sm:px-4">学生编号</th>
                <th className="hidden sm:table-cell px-3 py-3 sm:px-4">面板照片</th>
                <th className="hidden md:table-cell px-3 py-3 sm:px-4">年龄</th>
                <th className="hidden md:table-cell px-3 py-3 sm:px-4">性别</th>
                <th className="px-3 py-3 sm:px-4">学校</th>
                <th className="hidden lg:table-cell px-3 py-3 sm:px-4">
                  <div className="flex items-center gap-1">
                    <span>设备编号</span>
                    <button
                      type="button"
                      onClick={() => {
                        alert(
                          '设备编号命名规则：\n\n' +
                            '格式：[设备ID]-[2个英文字母][3位数字]\n\n' +
                            '• 设备ID：终端设备的唯一标识\n' +
                            '• 2个英文字母：26个英文字母随机组合\n' +
                            '• 3位数字：001-999随机数字\n\n' +
                            '示例：DEV001-ab456\n' +
                            '• DEV001 = 设备ID\n' +
                            '• ab = 随机2个英文字母\n' +
                            '• 456 = 001-999随机三位数字'
                        )
                      }}
                      className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-slate-300 text-[10px] font-bold text-slate-700 hover:bg-slate-400"
                      title="查看命名规则"
                    >
                      ?
                    </button>
                  </div>
                </th>
                <th className="hidden lg:table-cell px-3 py-3 sm:px-4">创建时间</th>
                <th className="hidden md:table-cell px-3 py-3 sm:px-4">首次互动时间</th>
                <th className="hidden md:table-cell px-3 py-3 sm:px-4">最近互动时间</th>
                <th className="hidden md:table-cell px-3 py-3 sm:px-4">累计互动次数</th>
                <th className="hidden lg:table-cell px-3 py-3 sm:px-4">累计卡牌数</th>
                <th className="hidden lg:table-cell px-3 py-3 sm:px-4">当前任务</th>
                <th className="px-3 py-3 sm:px-4">状态</th>
                <th className="px-3 py-3 sm:px-4">绑定微信</th>
                <th className="px-3 py-3 sm:px-4">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {rows.map((s) => (
                <GrowthRow key={s.studentId} s={s} />
              ))}
              {rows.length === 0 && (
                <tr>
                  <td colSpan={13} className="px-4 py-10 text-center text-sm text-slate-600">
                    暂无数据
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

function GrowthRow({ s }: { s: StudentGrowthSummary }) {
  return (
    <tr className="hover:bg-slate-50/60">
      <td className="px-3 py-3 sm:px-4 font-mono text-[11px] sm:text-xs">{s.studentId}</td>
      <td className="hidden sm:table-cell px-3 py-3 sm:px-4">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 overflow-hidden rounded-full bg-slate-200">
            {/* 原型占位：面板/面包照片 */}
            {s.avatarUrl ? <img src={s.avatarUrl} alt={s.displayName} className="h-full w-full object-cover" /> : null}
          </div>
        </div>
      </td>
      <td className="hidden md:table-cell px-3 py-3 sm:px-4 text-slate-700">{s.age ?? '—'}</td>
      <td className="hidden md:table-cell px-3 py-3 sm:px-4 text-slate-700">{s.gender ?? '—'}</td>
      <td className="px-3 py-3 sm:px-4 text-slate-700">{s.school}</td>
      <td className="hidden lg:table-cell px-3 py-3 sm:px-4 text-slate-700">{s.schoolAccountId ?? '—'}</td>
      <td className="hidden lg:table-cell px-3 py-3 sm:px-4 text-slate-700">{s.createdAt ?? '—'}</td>
      <td className="hidden md:table-cell px-3 py-3 sm:px-4 text-slate-700">{s.firstAt}</td>
      <td className="hidden md:table-cell px-3 py-3 sm:px-4 text-slate-700">{s.lastAt}</td>
      <td className="hidden md:table-cell px-3 py-3 sm:px-4">{s.totalInteractions}</td>
      <td className="hidden lg:table-cell px-3 py-3 sm:px-4">{s.totalCards}</td>
      <td className="hidden lg:table-cell px-3 py-3 sm:px-4 text-slate-700">{s.currentTask}</td>
      <td className="px-3 py-3 sm:px-4">
        <div className="mb-1 text-xs text-slate-700">{s.statusLabel ?? '—'}</div>
      </td>
      <td className="px-3 py-3 sm:px-4">
        <Tag tone={s.wechatBound ? 'success' : 'neutral'}>{s.wechatBound ? '已绑定' : '未绑定'}</Tag>
      </td>
      <td className="px-3 py-3 sm:px-4">
        <Link href={`/admin/data/growth/${encodeURIComponent(s.studentId)}`} className="text-xs font-bold text-slate-700 hover:text-slate-900">
          查看详情
        </Link>
      </td>
    </tr>
  )
}

