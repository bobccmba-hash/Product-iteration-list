'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { Button, Input, Select, Tag } from '@/components/admin/AdminPrimitives'
import { mockSchools } from '@/utils/adminMock'

type EventRow = {
  eventId: string
  studentId: string
  deviceId: string
  type: string
  at: string
  taskId?: string
  goalId?: string
  badgeId?: string
  deltaValue: string
  syncStatus: 'ok' | 'pending' | 'failed'
  raw: Record<string, unknown>
}

const mockEvents: EventRow[] = [
  {
    eventId: 'EV_10001',
    studentId: 'S_90001',
    deviceId: 'DEV_A_001',
    type: 'interaction_end',
    at: '2026-03-08 17:52',
    taskId: 't_2001',
    goalId: 'g_1001',
    deltaValue: '+1',
    syncStatus: 'ok',
    raw: { event_id: 'EV_10001', kind: 'interaction_end', interaction_id: 'I_7788', delta: 1 },
  },
  {
    eventId: 'EV_10002',
    studentId: 'S_90002',
    deviceId: 'DEV_B_011',
    type: 'card_gain',
    at: '2026-03-08 08:21',
    goalId: 'g_1002',
    deltaValue: '+1',
    syncStatus: 'pending',
    raw: { event_id: 'EV_10002', kind: 'card_gain', card_id: 'C_05', delta: 1 },
  },
  {
    eventId: 'EV_10003',
    studentId: 'S_90002',
    deviceId: 'DEV_B_011',
    type: 'sync_error',
    at: '2026-03-08 08:25',
    deltaValue: '0',
    syncStatus: 'failed',
    raw: { event_id: 'EV_10003', kind: 'sync_error', reason: 'network_unreachable' },
  },
]

export default function GrowthEventsPage() {
  const [studentId, setStudentId] = useState('')
  const [school, setSchool] = useState<'all' | string>('all')
  const [deviceId, setDeviceId] = useState('')
  const [type, setType] = useState<'all' | string>('all')
  const [sync, setSync] = useState<'all' | 'ok' | 'pending' | 'failed'>('all')
  const [selected, setSelected] = useState<EventRow | null>(null)

  const rows = useMemo(() => {
    return mockEvents.filter((e) => {
      if (studentId.trim() && !e.studentId.includes(studentId.trim())) return false
      if (deviceId.trim() && !e.deviceId.includes(deviceId.trim())) return false
      if (type !== 'all' && e.type !== type) return false
      if (sync !== 'all' && e.syncStatus !== sync) return false
      if (school !== 'all') {
        // 原型占位：学校需要 deviceId -> school 映射，此处略
      }
      return true
    })
  }, [studentId, deviceId, type, sync, school])

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="text-xs font-bold text-slate-500">数据中心 / 成长记录 / 成长事件流水</div>
          <h1 className="mt-2 text-2xl font-black tracking-tight">成长事件流水</h1>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/admin/data/growth">
            <Button tone="secondary">返回列表</Button>
          </Link>
        </div>
      </div>

      <div className="rounded-2xl bg-white p-4 ring-1 ring-slate-200">
        <div className="grid gap-3 md:grid-cols-6">
          <div>
            <div className="mb-1 text-xs font-semibold text-slate-700">学生ID</div>
            <Input value={studentId} onChange={setStudentId} placeholder="S_90001" />
          </div>
          <div>
            <div className="mb-1 text-xs font-semibold text-slate-700">学校（占位）</div>
            <Select value={school} onChange={setSchool} options={[{ value: 'all', label: '全部' }, ...mockSchools.map((s) => ({ value: s, label: s }))]} />
          </div>
          <div>
            <div className="mb-1 text-xs font-semibold text-slate-700">设备ID</div>
            <Input value={deviceId} onChange={setDeviceId} placeholder="DEV_A_001" />
          </div>
          <div>
            <div className="mb-1 text-xs font-semibold text-slate-700">事件类型</div>
            <Select
              value={type}
              onChange={setType}
              options={[
                { value: 'all', label: '全部' },
                { value: 'interaction_end', label: 'interaction_end' },
                { value: 'card_gain', label: 'card_gain' },
                { value: 'sync_error', label: 'sync_error' },
              ]}
            />
          </div>
          <div>
            <div className="mb-1 text-xs font-semibold text-slate-700">同步状态</div>
            <Select
              value={sync}
              onChange={(v) => setSync(v as 'all' | 'ok' | 'pending' | 'failed')}
              options={[
                { value: 'all', label: '全部' },
                { value: 'ok', label: 'ok' },
                { value: 'pending', label: 'pending' },
                { value: 'failed', label: 'failed' },
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
                setStudentId('')
                setSchool('all')
                setDeviceId('')
                setType('all')
                setSync('all')
              }}
            >
              重置
            </Button>
          </div>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1fr_420px]">
        <div className="rounded-2xl bg-white ring-1 ring-slate-200">
          <div className="border-b border-slate-100 p-4">
            <div className="text-sm font-bold text-slate-900">事件表</div>
            <div className="mt-1 text-xs text-slate-500">用于排查实际成长事件、口径与同步状态。</div>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-[1100px] w-full text-left text-sm">
              <thead className="bg-slate-50 text-xs font-bold text-slate-600">
                <tr>
                  <th className="px-4 py-3">event_id</th>
                  <th className="px-4 py-3">学生ID</th>
                  <th className="px-4 py-3">设备ID</th>
                  <th className="px-4 py-3">事件类型</th>
                  <th className="px-4 py-3">事件时间</th>
                  <th className="px-4 py-3">关联任务ID</th>
                  <th className="px-4 py-3">关联目标ID</th>
                  <th className="px-4 py-3">关联勋章ID</th>
                  <th className="px-4 py-3">delta_value</th>
                  <th className="px-4 py-3">sync_status</th>
                  <th className="px-4 py-3">操作</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {rows.map((e) => (
                  <tr key={e.eventId} className="hover:bg-slate-50/60">
                    <td className="px-4 py-3 font-mono text-xs">{e.eventId}</td>
                    <td className="px-4 py-3 font-mono text-xs">{e.studentId}</td>
                    <td className="px-4 py-3 font-mono text-xs">{e.deviceId}</td>
                    <td className="px-4 py-3 text-slate-700">{e.type}</td>
                    <td className="px-4 py-3 text-slate-700">{e.at}</td>
                    <td className="px-4 py-3 font-mono text-xs">{e.taskId ?? '—'}</td>
                    <td className="px-4 py-3 font-mono text-xs">{e.goalId ?? '—'}</td>
                    <td className="px-4 py-3 font-mono text-xs">{e.badgeId ?? '—'}</td>
                    <td className="px-4 py-3 font-bold text-slate-900">{e.deltaValue}</td>
                    <td className="px-4 py-3">
                      <Tag tone={e.syncStatus === 'ok' ? 'success' : e.syncStatus === 'pending' ? 'warning' : 'danger'}>
                        {e.syncStatus}
                      </Tag>
                    </td>
                    <td className="px-4 py-3">
                      <button
                        type="button"
                        onClick={() => setSelected(e)}
                        className="text-xs font-bold text-slate-700 hover:text-slate-900"
                      >
                        查看JSON
                      </button>
                    </td>
                  </tr>
                ))}
                {rows.length === 0 && (
                  <tr>
                    <td colSpan={11} className="px-4 py-10 text-center text-sm text-slate-600">
                      暂无事件
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="rounded-2xl bg-white ring-1 ring-slate-200">
          <div className="border-b border-slate-100 p-4">
            <div className="text-sm font-bold text-slate-900">原始事件数据体</div>
            <div className="mt-1 text-xs text-slate-500">点击“查看JSON”后在此处展开。</div>
          </div>
          <div className="p-4">
            {!selected ? (
              <div className="rounded-xl bg-slate-50 p-4 text-sm text-slate-600 ring-1 ring-slate-200">
                请选择一条事件查看原始 JSON。
              </div>
            ) : (
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-xs font-bold text-slate-500">event_id</div>
                    <div className="mt-1 font-mono text-xs text-slate-900">{selected.eventId}</div>
                  </div>
                  <Button tone="secondary" onClick={() => setSelected(null)}>
                    关闭
                  </Button>
                </div>
                <pre className="max-h-[520px] overflow-auto rounded-xl bg-slate-900 p-4 text-xs text-white ring-1 ring-slate-900">
                  {JSON.stringify(selected.raw, null, 2)}
                </pre>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

