'use client'

import Link from 'next/link'
import { useMemo, useRef, useState } from 'react'
import { Button, Input, Select, Tag, ToastHost, useToasts } from '@/components/admin/AdminPrimitives'
import { mockTasks, type RuleStatus, type Task, type TaskCycle } from '@/utils/adminMock'

function statusLabel(s: RuleStatus) {
  if (s === 'draft') return '草稿'
  if (s === 'published') return '已发布'
  return '已停用'
}

function statusTone(s: RuleStatus): Parameters<typeof Tag>[0]['tone'] {
  if (s === 'published') return 'success'
  if (s === 'draft') return 'warning'
  return 'danger'
}

function cycleLabel(c: TaskCycle) {
  if (c === 'daily') return '日'
  if (c === 'weekly') return '周'
  if (c === 'stage') return '阶段内'
  return '一次性'
}

export default function TasksListPage() {
  const { toasts, push, remove } = useToasts()
  const copySeqRef = useRef(1)

  const [name, setName] = useState('')
  const [status, setStatus] = useState<'all' | RuleStatus>('all')
  const [cycle, setCycle] = useState<'all' | TaskCycle>('all')

  const [rows, setRows] = useState<Task[]>(mockTasks)

  const filtered = useMemo(() => {
    return rows.filter((t) => {
      if (name.trim() && !t.name.includes(name.trim()) && !t.code.includes(name.trim())) return false
      if (status !== 'all' && t.status !== status) return false
      if (cycle !== 'all' && t.cycle !== cycle) return false
      return true
    })
  }, [rows, name, status, cycle])

  function onReset() {
    setName('')
    setStatus('all')
    setCycle('all')
  }

  function onCopy(task: Task) {
    const ok = window.confirm(`是否复制当前任务配置？\n\n任务：${task.name}`)
    if (!ok) return
    const copy: Task = {
      ...task,
      id: `t_copy_${task.id}_${copySeqRef.current++}`,
      name: `${task.name}_副本`,
      code: `${task.code}_COPY`,
      status: 'draft',
      updatedAt: '刚刚',
    }
    setRows((s) => [copy, ...s])
    push('已复制为新草稿记录', 'success')
  }

  function onToggle(task: Task) {
    const next = task.status === 'disabled' ? 'published' : 'disabled'
    const ok = window.confirm(
      next === 'disabled'
        ? '确认停用该任务？\n\n停用后不再参与新终端分发。'
        : '确认启用该任务？',
    )
    if (!ok) return
    setRows((s) => s.map((x) => (x.id === task.id ? { ...x, status: next, updatedAt: '刚刚' } : x)))
    push(next === 'disabled' ? '已停用' : '已启用', 'success')
  }

  function onDelete(task: Task) {
    if (task.status !== 'draft') { push('仅草稿任务可删除', 'danger'); return }
    const ok = window.confirm(`确认删除该草稿任务？\n\n任务：${task.name}`)
    if (!ok) return
    setRows((s) => s.filter((x) => x.id !== task.id))
    push('已删除草稿任务', 'success')
  }

  return (
    <div className="space-y-5">
      <ToastHost toasts={toasts} onRemove={remove} />

      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="text-xs font-bold text-slate-500">配置中心 / 任务设定</div>
          <h1 className="mt-2 text-2xl font-black tracking-tight">任务设定</h1>
        </div>
        <Link href="/admin/config/tasks/new">
          <Button>新建任务</Button>
        </Link>
      </div>

      <div className="rounded-2xl bg-white p-4 ring-1 ring-slate-200">
        <div className="grid gap-3 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="mb-1 text-xs font-semibold text-slate-700">任务名称/编码</div>
            <Input value={name} onChange={setName} placeholder="搜索任务名称或编码" />
          </div>
          <div>
            <div className="mb-1 text-xs font-semibold text-slate-700">状态</div>
            <Select value={status} onChange={(v) => setStatus(v as 'all' | RuleStatus)}
              options={[
                { value: 'all', label: '全部' },
                { value: 'draft', label: '草稿' },
                { value: 'published', label: '已发布' },
                { value: 'disabled', label: '已停用' },
              ]}
            />
          </div>
          <div>
            <div className="mb-1 text-xs font-semibold text-slate-700">周期</div>
            <Select value={cycle} onChange={(v) => setCycle(v as 'all' | TaskCycle)}
              options={[
                { value: 'all', label: '全部' },
                { value: 'daily', label: '日' },
                { value: 'weekly', label: '周' },
                { value: 'one_time', label: '一次性' },
              ]}
            />
          </div>
        </div>
        <div className="mt-3 flex items-center justify-end gap-2">
          <Button tone="secondary" onClick={() => push(`已查询：${filtered.length} 条`, 'neutral')}>查询</Button>
          <Button tone="ghost" onClick={onReset}>重置</Button>
        </div>
      </div>

      <div className="rounded-2xl bg-white ring-1 ring-slate-200">
        <div className="border-b border-slate-100 p-4">
          <div className="text-sm font-bold text-slate-900">任务列表</div>
          <div className="mt-1 text-xs text-slate-500">共 {filtered.length} 条</div>
        </div>

        {filtered.length === 0 ? (
          <div className="p-10 text-center">
            <div className="text-sm font-bold text-slate-900">暂无任务配置</div>
            <div className="mt-1 text-sm text-slate-600">可以点击右上角「新建任务」开始配置。</div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-[860px] w-full text-left text-sm">
              <thead className="bg-slate-50 text-xs font-bold text-slate-600">
                <tr>
                  <th className="px-4 py-3">任务名称</th>
                  <th className="px-4 py-3">周期</th>
                  <th className="px-4 py-3">完成条件</th>
                  <th className="px-4 py-3">奖励</th>
                  <th className="px-4 py-3">分发策略</th>
                  <th className="px-4 py-3">状态</th>
                  <th className="px-4 py-3">更新时间</th>
                  <th className="px-4 py-3">操作</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((t) => (
                  <tr key={t.id} className="hover:bg-slate-50/60">
                    <td className="px-4 py-3">
                      <div className="font-semibold text-slate-900">{t.name}</div>
                      <div className="mt-0.5 font-mono text-[11px] text-slate-400">{t.code}</div>
                    </td>
                    <td className="px-4 py-3">
                      <Tag tone="info">{cycleLabel(t.cycle)}</Tag>
                    </td>
                    <td className="px-4 py-3 text-xs text-slate-700">{t.scopeSummary || '—'}</td>
                    <td className="px-4 py-3 text-xs text-slate-700">{t.rewardSummary || '—'}</td>
                    <td className="px-4 py-3 text-xs text-slate-700">{t.distribution || '—'}</td>
                    <td className="px-4 py-3">
                      <Tag tone={statusTone(t.status)}>{statusLabel(t.status)}</Tag>
                    </td>
                    <td className="px-4 py-3 text-xs text-slate-500">{t.updatedAt}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <Link href={`/admin/config/tasks/${t.id}/edit`} className="text-xs font-bold text-blue-600 hover:text-blue-800">编辑</Link>
                        <button type="button" onClick={() => onCopy(t)} className="text-xs font-bold text-slate-600 hover:text-slate-900">复制</button>
                        <button type="button" onClick={() => window.location.href = `/admin/config/tasks/${encodeURIComponent(t.id)}/devices`} className="text-xs font-bold text-slate-600 hover:text-slate-900">推送终端</button>
                        <button type="button" onClick={() => onToggle(t)} className="text-xs font-bold text-slate-600 hover:text-slate-900">
                          {t.status === 'disabled' ? '启用' : '停用'}
                        </button>
                        <button type="button" onClick={() => onDelete(t)} className="text-xs font-bold text-rose-600 hover:text-rose-800">删除</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
