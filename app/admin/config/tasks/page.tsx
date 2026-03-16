'use client'

import Link from 'next/link'
import { useMemo, useRef, useState } from 'react'
import { Button, Input, Select, Tag, ToastHost, useToasts } from '@/components/admin/AdminPrimitives'
import { mockGrades, mockSchools, mockTasks, type RuleStatus, type Task, type TaskCycle, type TaskType } from '@/utils/adminMock'

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
  if (c === 'daily') return '日任务'
  if (c === 'weekly') return '周任务'
  if (c === 'stage') return '阶段内'
  return '一次性'
}

function typeLabel(t: TaskType) {
  if (t === 'count') return '次数型'
  if (t === 'collection') return '收集型'
  if (t === 'streak') return '连续型'
  return '主题型'
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
    push('已重置筛选条件', 'neutral')
  }

  function onPublish() {
    const ok = window.confirm('确认发布当前已审核配置？\n\n提示：发布将生成新的规则包版本。')
    if (!ok) return
    push('已生成新规则包版本（示例）', 'success')
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
        ? '确认停用该任务？\n\n停用后不再参与新终端分发，但历史终端本地已缓存版本继续按规则运行，直至更新版本覆盖。'
        : '确认启用该任务？',
    )
    if (!ok) return
    setRows((s) => s.map((x) => (x.id === task.id ? { ...x, status: next, updatedAt: '刚刚' } : x)))
    push(next === 'disabled' ? '已停用' : '已启用', 'success')
  }

  function onDelete(task: Task) {
    if (task.status !== 'draft') {
      push('仅草稿任务可删除', 'danger')
      return
    }
    const ok = window.confirm(`确认删除该草稿任务？\n\n任务：${task.name}`)
    if (!ok) return
    setRows((s) => s.filter((x) => x.id !== task.id))
    push('已删除草稿任务', 'success')
  }

  function onPushToTerminals(task: Task) {
    window.location.href = `/admin/config/tasks/${encodeURIComponent(task.id)}/devices`
  }

  return (
    <div className="space-y-5">
      <ToastHost toasts={toasts} onRemove={remove} />

      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="text-xs font-bold text-slate-500">配置中心 / 任务设定</div>
          <h1 className="mt-2 text-2xl font-black tracking-tight">任务设定</h1>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/admin/config/tasks/new">
            <Button>新建任务</Button>
          </Link>
        </div>
      </div>

      <div className="rounded-2xl bg-white p-4 ring-1 ring-slate-200">
        <div className="grid gap-3 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="mb-1 text-xs font-semibold text-slate-700">任务名称/编码</div>
            <Input value={name} onChange={setName} placeholder="搜索任务名称或编码" />
          </div>
          <div>
            <div className="mb-1 text-xs font-semibold text-slate-700">任务状态</div>
            <Select
              value={status}
              onChange={(v) => setStatus(v as 'all' | RuleStatus)}
              options={[
                { value: 'all', label: '全部' },
                { value: 'draft', label: '草稿' },
                { value: 'published', label: '已发布' },
                { value: 'disabled', label: '已停用' },
              ]}
            />
          </div>
          <div>
            <div className="mb-1 text-xs font-semibold text-slate-700">任务周期</div>
            <Select
              value={cycle}
              onChange={(v) => setCycle(v as 'all' | TaskCycle)}
              options={[
                { value: 'all', label: '全部' },
                { value: 'daily', label: '日任务' },
                { value: 'weekly', label: '周任务' },
                { value: 'stage', label: '阶段内' },
                { value: 'one_time', label: '一次性' },
              ]}
            />
          </div>
        </div>
        <div className="mt-3 flex items-center justify-end gap-2">
          <Button tone="secondary" onClick={() => push(`已查询：${filtered.length} 条`, 'neutral')}>
            查询
          </Button>
          <Button tone="ghost" onClick={onReset}>
            重置
          </Button>
        </div>
      </div>

      <div className="rounded-2xl bg-white ring-1 ring-slate-200">
        <div className="border-b border-slate-100 p-4">
          <div className="text-sm font-bold text-slate-900">任务列表</div>
          <div className="mt-1 text-xs text-slate-500">用于查看任务配置状态，并进行新增、编辑、上下线与发布。</div>
        </div>

        {filtered.length === 0 ? (
          <div className="p-10 text-center">
            <div className="text-sm font-bold text-slate-900">暂无任务配置</div>
            <div className="mt-1 text-sm text-slate-600">可以点击右上角「新建任务」开始配置。</div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-[950px] w-full text-left text-sm">
              <thead className="bg-slate-50 text-xs font-bold text-slate-600">
                <tr>
                  <th className="px-4 py-3">任务名称</th>
                  <th className="px-4 py-3">任务类型</th>
                  <th className="px-4 py-3">周期</th>
                  <th className="px-4 py-3">奖励内容</th>
                  <th className="px-4 py-3">分发方式</th>
                  <th className="px-4 py-3">离线支持</th>
                  <th className="px-4 py-3">使用终端数</th>
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
                      <div className="mt-1 font-mono text-[11px] text-slate-600">{t.code}</div>
                    </td>
                    <td className="px-4 py-3">{typeLabel(t.type)}</td>
                    <td className="px-4 py-3">{cycleLabel(t.cycle)}</td>
                    <td className="px-4 py-3 text-slate-700">{t.rewardSummary}</td>
                    <td className="px-4 py-3 text-slate-700">{t.distribution}</td>
                    <td className="px-4 py-3">
                      <Tag tone={t.offline === 'supported' ? 'info' : 'neutral'}>{t.offline === 'supported' ? '支持' : '不支持'}</Tag>
                    </td>
                    <td className="px-4 py-3 text-slate-700">{t.inUseTerminalCount ?? 0}</td>
                    <td className="px-4 py-3">
                      <Tag tone={statusTone(t.status)}>{statusLabel(t.status)}</Tag>
                    </td>
                    <td className="px-4 py-3 text-slate-700">{t.updatedAt}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Link href={`/admin/config/tasks/${t.id}/edit`} className="text-xs font-bold text-slate-700 hover:text-slate-900">
                          编辑
                        </Link>
                        <button type="button" onClick={() => onCopy(t)} className="text-xs font-bold text-slate-700 hover:text-slate-900">
                          复制
                        </button>
                        <button type="button" onClick={() => onPushToTerminals(t)} className="text-xs font-bold text-slate-700 hover:text-slate-900">
                          推送到终端
                        </button>
                        <button type="button" onClick={() => onToggle(t)} className="text-xs font-bold text-slate-700 hover:text-slate-900">
                          {t.status === 'disabled' ? '启用' : '停用'}
                        </button>
                        <details className="relative">
                          <summary className="cursor-pointer list-none text-xs font-bold text-slate-700 hover:text-slate-900">更多</summary>
                          <div className="absolute right-0 z-10 mt-2 w-44 rounded-xl bg-white p-2 shadow-xl ring-1 ring-slate-200">
                            <Link
                              href={`/admin/config/tasks/publish-records?taskId=${encodeURIComponent(t.id)}`}
                              className="block rounded-lg px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                            >
                              查看发布记录
                            </Link>
                            <button
                              type="button"
                              onClick={() => onDelete(t)}
                              className="block w-full rounded-lg px-3 py-2 text-left text-xs font-semibold text-rose-700 hover:bg-rose-50"
                            >
                              删除（仅草稿）
                            </button>
                          </div>
                        </details>
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

