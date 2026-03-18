'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useMemo, useState } from 'react'
import { Button, Tag } from '@/components/admin/AdminPrimitives'
import { mockStudents } from '@/utils/adminMock'

type TabKey = 'events' | 'tasks'

export default function GrowthDetailPage() {
  const params = useParams<{ studentId: string }>()
  const studentId = decodeURIComponent(params.studentId)
  const student = useMemo(() => mockStudents.find((s) => s.studentId === studentId) ?? null, [studentId])
  const [tab, setTab] = useState<TabKey>('events')

  const syncTone: 'success' | 'warning' | 'danger' =
    student?.syncStatus === 'ok' ? 'success' : student?.syncStatus === 'pending' ? 'warning' : 'danger'
  const syncLabel = student?.syncStatus === 'ok' ? '同步正常' : student?.syncStatus === 'pending' ? '待同步' : '同步失败'

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="text-xs font-bold text-slate-500">数据中心 / 成长记录 / 详情</div>
          <h1 className="mt-2 text-2xl font-black tracking-tight">学生成长档案详情</h1>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/admin/data/growth">
            <Button tone="secondary">返回列表</Button>
          </Link>
          <Button tone="secondary" onClick={() => window.alert('原型占位：重新同步')}>
            重新同步
          </Button>
          <Button tone="secondary" onClick={() => window.alert('原型占位：导出记录')}>
            导出记录
          </Button>
          <Button tone="secondary" onClick={() => window.alert('原型占位：查看原始流水')}>
            查看原始流水
          </Button>
        </div>
      </div>

      <div className="rounded-2xl bg-white p-5 ring-1 ring-slate-200">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="h-16 w-16 overflow-hidden rounded-2xl bg-slate-200">
              {student?.avatarUrl ? (
                // 原型占位头像
                <img src={student.avatarUrl} alt={student.displayName} className="h-full w-full object-cover" />
              ) : null}
            </div>
            <div>
              <div className="text-xs font-bold text-slate-500">学生</div>
              <div className="mt-2 flex flex-wrap items-center gap-2">
                <div className="text-lg font-black text-slate-900">{student?.displayName ?? '—'}</div>
                <div className="font-mono text-xs text-slate-600">{studentId}</div>
                <Tag tone={syncTone}>{syncLabel}</Tag>
                {student?.hasUnsynced && <Tag tone="warning">存在未同步数据</Tag>}
                {typeof student?.age === 'number' && <Tag tone="neutral">年龄 {student.age}</Tag>}
                {student?.gender && <Tag tone="neutral">{student.gender}</Tag>}
                {student?.wechatBound !== undefined && (
                  <Tag tone={student.wechatBound ? 'success' : 'neutral'}>{student.wechatBound ? '已绑定微信' : '未绑定微信'}</Tag>
                )}
              </div>
              <div className="mt-2 text-sm text-slate-700">
                {student?.school ?? '—'}
              </div>
              <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-slate-500">
                <span>学校账户编号：{student?.schoolAccountId ?? '—'}</span>
                <span>设备编号：{student?.deviceId ?? '—'}</span>
              </div>
              <div className="mt-1 text-xs text-slate-500 space-x-2">
                <span>创建时间：{student?.createdAt ?? '—'}</span>
                <span>首次互动：{student?.firstAt ?? '—'}</span>
                <span>最近互动：{student?.lastAt ?? '—'}</span>
              </div>
            </div>
          </div>
          <div className="mt-2 flex flex-col items-end gap-2 text-xs text-slate-500">
            <div className="text-[11px] font-semibold text-slate-600">
              列表字段已在详情中完整呈现，方便排查单个学生。
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-3">
        <Stat title="累计互动次数" value={student?.totalInteractions ?? 0} />
        <Stat title="累计卡牌数" value={student?.totalCards ?? 0} />
        <Stat title="已完成任务数" value={3} />
      </div>

      <div className="rounded-2xl bg-white ring-1 ring-slate-200">
        <div className="border-b border-slate-100 p-3">
          <div className="flex flex-wrap items-center gap-2">
            <TabButton active={tab === 'events'} onClick={() => setTab('events')}>
              成长事件
            </TabButton>
            <TabButton active={tab === 'tasks'} onClick={() => setTab('tasks')}>
              任务记录
            </TabButton>
          </div>
        </div>

        <div className="p-4">
          {tab === 'events' && <EventsTable />}
          {tab === 'tasks' && <SimpleTable title="任务记录" columns={['任务名称', '当前进度', '状态', '完成时间']} rows={[['今天完成 1 次互动', '3/5', '进行中', '—'], ['连续互动 3 天', '已完成', '完成', '2026-03-06 18:20']]} />}
        </div>
      </div>
    </div>
  )
}

function Stat({ title, value }: { title: string; value: number }) {
  return (
    <div className="rounded-2xl bg-white p-4 ring-1 ring-slate-200">
      <div className="text-xs font-bold text-slate-500">{title}</div>
      <div className="mt-2 text-2xl font-black text-slate-900">{value}</div>
    </div>
  )
}

function TabButton({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-xl px-3 py-2 text-sm font-black transition ${active ? 'bg-slate-900 text-white' : 'bg-slate-50 text-slate-700 ring-1 ring-slate-200 hover:bg-slate-100'}`}
    >
      {children}
    </button>
  )
}

function EventsTable() {
  const rows = [
    { at: '2026-03-08 17:52', type: '互动结束', interactionId: 'I_7788', cardId: 'C_12' },
    { at: '2026-03-08 17:40', type: '获得卡牌', interactionId: 'I_7788', cardId: 'C_12' },
    { at: '2026-03-08 08:21', type: '互动结束', interactionId: 'I_6621', cardId: 'C_05' },
  ]

  const [videoModal, setVideoModal] = useState<{ interactionId: string } | null>(null)

  return (
    <div className="space-y-2">
      <div className="text-sm font-black text-slate-900">成长事件</div>
      <div className="overflow-x-auto">
        <table className="min-w-[1000px] w-full text-left text-sm">
          <thead className="bg-slate-50 text-xs font-bold text-slate-600">
            <tr>
              <th className="px-4 py-3">事件时间</th>
              <th className="px-4 py-3">事件类型</th>
              <th className="px-4 py-3">互动ID</th>
              <th className="px-4 py-3">卡牌ID</th>
              <th className="px-4 py-3">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {rows.map((r, i) => (
              <tr key={i} className="hover:bg-slate-50/60">
                <td className="px-4 py-3 text-slate-700">{r.at}</td>
                <td className="px-4 py-3 text-slate-700">{r.type}</td>
                <td className="px-4 py-3 font-mono text-xs">{r.interactionId}</td>
                <td className="px-4 py-3 font-mono text-xs">{r.cardId}</td>
                <td className="px-4 py-3">
                  <button
                    type="button"
                    onClick={() => setVideoModal({ interactionId: r.interactionId })}
                    className="text-xs font-bold text-blue-600 hover:text-blue-800 hover:underline"
                  >
                    查看互动详情
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 互动视频弹窗 */}
      {videoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={() => setVideoModal(null)}>
          <div
            className="relative w-full max-w-2xl rounded-2xl bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* 弹窗头部 */}
            <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
              <div>
                <div className="text-xs font-bold text-slate-500">互动详情</div>
                <div className="mt-1 text-base font-black text-slate-900">互动 ID：{videoModal.interactionId}</div>
              </div>
              <button
                type="button"
                onClick={() => setVideoModal(null)}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200"
              >
                ✕
              </button>
            </div>

            {/* 视频区域 */}
            <div className="px-6 py-5">
              <div className="aspect-video w-full overflow-hidden rounded-xl bg-slate-900 flex items-center justify-center">
                <div className="text-center text-slate-400">
                  <div className="mb-3 text-5xl">▶</div>
                  <div className="text-sm font-semibold">互动录像（占位）</div>
                  <div className="mt-1 text-xs opacity-60">实际接入后将在此播放终端录制的互动视频</div>
                </div>
              </div>

              {/* 基本信息 */}
              <div className="mt-4 grid grid-cols-3 gap-3">
                <div className="rounded-xl bg-slate-50 px-4 py-3">
                  <div className="text-xs font-bold text-slate-500">互动时长</div>
                  <div className="mt-1 text-sm font-black text-slate-900">2分34秒</div>
                </div>
                <div className="rounded-xl bg-slate-50 px-4 py-3">
                  <div className="text-xs font-bold text-slate-500">互动得分</div>
                  <div className="mt-1 text-sm font-black text-slate-900">95 分</div>
                </div>
                <div className="rounded-xl bg-slate-50 px-4 py-3">
                  <div className="text-xs font-bold text-slate-500">获得卡牌</div>
                  <div className="mt-1 text-sm font-black text-slate-900">+1 张</div>
                </div>
              </div>
            </div>

            {/* 底部按钮 */}
            <div className="flex justify-end border-t border-slate-100 px-6 py-4">
              <button
                type="button"
                onClick={() => setVideoModal(null)}
                className="rounded-xl bg-slate-900 px-5 py-2 text-sm font-bold text-white hover:bg-slate-700"
              >
                关闭
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function SimpleTable({
  title,
  columns,
  rows,
}: {
  title: string
  columns: string[]
  rows: string[][]
}) {
  return (
    <div className="space-y-2">
      <div className="text-sm font-black text-slate-900">{title}</div>
      <div className="overflow-x-auto">
        <table className="min-w-[800px] w-full text-left text-sm">
          <thead className="bg-slate-50 text-xs font-bold text-slate-600">
            <tr>
              {columns.map((c) => (
                <th key={c} className="px-4 py-3">
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {rows.map((r, i) => (
              <tr key={i} className="hover:bg-slate-50/60">
                {r.map((cell, j) => (
                  <td key={j} className="px-4 py-3 text-slate-700">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

