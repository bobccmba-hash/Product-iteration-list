'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useMemo, useState } from 'react'
import { Button, Tag, ToastHost, useToasts } from '@/components/admin/AdminPrimitives'

type DistributionMode = 'all' | 'new_default' | 'existing_default'

export default function TaskDistributionPage() {
  const params = useParams<{ taskId: string }>()
  const taskId = params.taskId
  const { toasts, push, remove } = useToasts()

  const [mode, setMode] = useState<DistributionMode>('all')

  const modeLabel = useMemo(() => {
    switch (mode) {
      case 'all': return '所有学生'
      case 'new_default': return '新学生默认分配'
      case 'existing_default': return '老学生默认分配'
    }
  }, [mode])

  function saveDraft() {
    push('已保存草稿（示例，不落库）', 'success')
  }

  function done() {
    push('已完成配置（仍为草稿，等待发布）', 'success')
    window.location.href = '/admin/config/tasks'
  }

  return (
    <div className="space-y-5">
      <ToastHost toasts={toasts} onRemove={remove} />

      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="text-xs font-bold text-slate-500">配置中心 / 任务设定 / 分发策略</div>
          <h1 className="mt-2 text-2xl font-black tracking-tight">任务分发策略</h1>
        </div>
        <div className="flex items-center gap-2">
          <Tag tone="warning">草稿</Tag>
          <Tag tone="info">{modeLabel}</Tag>
        </div>
      </div>

      <div className="rounded-2xl bg-white p-5 ring-1 ring-slate-200">
        <div className="text-sm font-black text-slate-900">分发方式</div>
        <div className="mt-1 text-xs text-slate-500">
          配置学生什么时候拿到这个任务。
        </div>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          <RadioRow checked={mode === 'all'} onChange={() => setMode('all')} title="所有学生" desc="对所有学生默认分配该任务，包括新学生和老学生。" />
          <RadioRow checked={mode === 'new_default'} onChange={() => setMode('new_default')} title="新学生默认分配" desc="首次建立档案后默认拿到该任务。" />
          <RadioRow checked={mode === 'existing_default'} onChange={() => setMode('existing_default')} title="老学生默认分配" desc="已有档案但无任务时默认分配。" />
        </div>
      </div>

      <div className="sticky bottom-4 rounded-2xl bg-white p-4 ring-1 ring-slate-200">
        <div className="flex flex-wrap items-center gap-2">
          <Link href={`/admin/config/tasks/${taskId}/edit`}>
            <Button tone="secondary">上一步</Button>
          </Link>
          <Button tone="secondary" onClick={saveDraft}>保存草稿</Button>
          <Button onClick={done}>完成配置</Button>
        </div>
      </div>
    </div>
  )
}

function RadioRow({
  checked, onChange, title, desc,
}: {
  checked: boolean
  onChange: () => void
  title: string
  desc: string
}) {
  return (
    <label className="flex cursor-pointer items-start gap-3 rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200">
      <input type="radio" checked={checked} onChange={onChange} className="mt-1 h-4 w-4" />
      <div>
        <div className="text-sm font-black text-slate-900">{title}</div>
        <div className="mt-1 text-xs text-slate-600">{desc}</div>
      </div>
    </label>
  )
}
