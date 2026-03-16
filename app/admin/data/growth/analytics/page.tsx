'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Button, Select } from '@/components/admin/AdminPrimitives'
import { mockGrades, mockSchools } from '@/utils/adminMock'

export default function GrowthAnalyticsPage() {
  const [school, setSchool] = useState<'all' | string>('all')
  const [grade, setGrade] = useState<'all' | string>('all')
  const [range, setRange] = useState<'7d' | '30d' | '90d'>('30d')
  const [dim, setDim] = useState<'school' | 'grade'>('school')

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="text-xs font-bold text-slate-500">数据中心 / 成长记录 / 统计分析</div>
          <h1 className="mt-2 text-2xl font-black tracking-tight">成长统计分析</h1>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/admin/data/growth">
            <Button tone="secondary">返回列表</Button>
          </Link>
          <Button tone="secondary" onClick={() => window.alert('原型占位：导出报表')}>
            导出报表
          </Button>
          <Button tone="secondary" onClick={() => window.alert('原型占位：刷新数据')}>
            刷新数据
          </Button>
        </div>
      </div>

      <div className="rounded-2xl bg-white p-4 ring-1 ring-slate-200">
        <div className="grid gap-3 md:grid-cols-4">
          <div>
            <div className="mb-1 text-xs font-semibold text-slate-700">学校</div>
            <Select value={school} onChange={setSchool} options={[{ value: 'all', label: '全部' }, ...mockSchools.map((s) => ({ value: s, label: s }))]} />
          </div>
          <div>
            <div className="mb-1 text-xs font-semibold text-slate-700">年级</div>
            <Select value={grade} onChange={setGrade} options={[{ value: 'all', label: '全部' }, ...mockGrades.map((g) => ({ value: g, label: g }))]} />
          </div>
          <div>
            <div className="mb-1 text-xs font-semibold text-slate-700">时间范围</div>
            <Select
              value={range}
              onChange={(v) => setRange(v as '7d' | '30d' | '90d')}
              options={[
                { value: '7d', label: '最近 7 天' },
                { value: '30d', label: '最近 30 天' },
                { value: '90d', label: '最近 90 天' },
              ]}
            />
          </div>
          <div>
            <div className="mb-1 text-xs font-semibold text-slate-700">指标维度</div>
            <Select
              value={dim}
              onChange={(v) => setDim(v as 'school' | 'grade')}
              options={[
                { value: 'school', label: '按学校' },
                { value: 'grade', label: '按年级' },
              ]}
            />
          </div>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <ChartCard title="互动次数趋势（占位）" />
        <ChartCard title="卡牌获得趋势（占位）" />
        <ChartCard title="任务完成趋势（占位）" />
        <ChartCard title="勋章解锁趋势（占位）" />
      </div>

      <div className="rounded-2xl bg-white ring-1 ring-slate-200">
        <div className="border-b border-slate-100 p-4">
          <div className="text-sm font-bold text-slate-900">明细表（占位）</div>
          <div className="mt-1 text-xs text-slate-500">用于运营统计与口径核对。</div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-[900px] w-full text-left text-sm">
            <thead className="bg-slate-50 text-xs font-bold text-slate-600">
              <tr>
                <th className="px-4 py-3">{dim === 'school' ? '学校' : '年级'}</th>
                <th className="px-4 py-3">互动人数</th>
                <th className="px-4 py-3">平均互动次数</th>
                <th className="px-4 py-3">平均任务完成数</th>
                <th className="px-4 py-3">勋章获得人数</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {[
                { k: dim === 'school' ? '示例小学A' : '一年级', a: 120, b: 3.2, c: 0.8, d: 28 },
                { k: dim === 'school' ? '示例小学B' : '二年级', a: 98, b: 2.7, c: 0.6, d: 19 },
                { k: dim === 'school' ? '示例小学C' : '三年级', a: 66, b: 4.1, c: 1.1, d: 22 },
              ].map((r) => (
                <tr key={r.k} className="hover:bg-slate-50/60">
                  <td className="px-4 py-3 font-semibold text-slate-900">{r.k}</td>
                  <td className="px-4 py-3 text-slate-700">{r.a}</td>
                  <td className="px-4 py-3 text-slate-700">{r.b}</td>
                  <td className="px-4 py-3 text-slate-700">{r.c}</td>
                  <td className="px-4 py-3 text-slate-700">{r.d}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

function ChartCard({ title }: { title: string }) {
  return (
    <div className="rounded-2xl bg-white p-5 ring-1 ring-slate-200">
      <div className="text-sm font-black text-slate-900">{title}</div>
      <div className="mt-3 h-44 rounded-2xl bg-slate-50 ring-1 ring-slate-200" />
      <div className="mt-2 text-xs text-slate-500">原型占位：后续可接入真实图表组件与指标口径。</div>
    </div>
  )
}

