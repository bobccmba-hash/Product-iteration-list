'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useMemo, useState } from 'react'
import { Button, Input, Tag, ToastHost, useToasts } from '@/components/admin/AdminPrimitives'

type DistributionMode = 'all' | 'new_default' | 'existing_default'

export default function TaskDistributionPage() {
  const params = useParams<{ taskId: string }>()
  const taskId = params.taskId
  const { toasts, push, remove } = useToasts()

  const [mode, setMode] = useState<DistributionMode>('all')
  const [priority, setPriority] = useState(100)
  const [allowSameType, setAllowSameType] = useState(false)

  const modeLabel = useMemo(() => {
    switch (mode) {
      case 'all':
        return '所有学生'
      case 'new_default':
        return '新学生默认分配'
      case 'existing_default':
        return '老学生默认分配'
    }
  }, [mode])

  function saveDraft() {
    push('已保存草稿（示例，不落库）', 'success')
  }

  function saveAndPreview() {
    push('已保存并进入预览', 'success')
    window.location.href = `/admin/config/tasks/${taskId}/preview`
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
          <div className="mt-2 flex items-center gap-2">
            <Link href={`/admin/config/tasks/${taskId}/rules-rewards`} className="text-sm font-bold text-slate-700 hover:text-slate-900">
              ← 返回
            </Link>
            <h1 className="text-2xl font-black tracking-tight">任务分发策略</h1>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Tag tone="warning">草稿</Tag>
          <Tag tone="info">{modeLabel}</Tag>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-[7fr_3fr]">
        <div className="rounded-2xl bg-white p-5 ring-1 ring-slate-200">
          <div className="text-sm font-black text-slate-900">分发方式</div>
          <div className="mt-1 text-xs text-slate-500">
            配置学生什么时候拿到这个任务。目前仅区分「新学生」和「老学生」，暂不做任务等级/阶段串联。
          </div>

          <div className="mt-4 grid gap-2 md:grid-cols-2">
            <RadioRow checked={mode === 'all'} onChange={() => setMode('all')} title="所有学生" desc="对所有学生默认分配该任务，包括新学生和老学生。" />
            <RadioRow checked={mode === 'new_default'} onChange={() => setMode('new_default')} title="新学生默认分配" desc="首次建立档案后默认拿到该任务。" />
            <RadioRow checked={mode === 'existing_default'} onChange={() => setMode('existing_default')} title="老学生默认分配" desc="已有档案但无任务时默认分配。" />
          </div>

          <div className="mt-6 grid gap-3 md:grid-cols-2">
            <Field label="分发优先级" hint="数字越大优先级越高。当学生同时符合多个任务分发条件时，优先分配数值更高的任务。建议默认填 100，特殊推广任务可设更高值。">
              <input
                type="number"
                value={priority}
                onChange={(e) => setPriority(Number(e.target.value || 0))}
                className="h-10 w-full rounded-lg bg-white px-3 text-sm ring-1 ring-slate-200 focus:ring-2 focus:ring-slate-400"
              />
            </Field>
            <Field label="是否允许同类任务同时存在" hint="关闭则同一类型的任务同一时间只能有一个生效。">
              <label className="flex items-center gap-3 rounded-xl bg-slate-50 px-3 py-3 ring-1 ring-slate-200">
                <input type="checkbox" checked={allowSameType} onChange={(e) => setAllowSameType(e.target.checked)} className="h-4 w-4" />
                <span className="text-sm font-semibold text-slate-800">{allowSameType ? '允许' : '不允许'}</span>
              </label>
            </Field>
          </div>

          <div className="mt-6 rounded-2xl bg-slate-50 p-5 ring-1 ring-slate-200">
            <div className="text-sm font-black text-slate-900">流程说明图（占位）</div>
            <div className="mt-3 grid gap-2 md:grid-cols-5">
              {['学生进入终端', '读取学生当前任务', '无任务则按策略分发', '本地执行', '完成后自动接续'].map((s) => (
                <div key={s} className="rounded-xl bg-white px-3 py-3 text-xs font-semibold text-slate-700 ring-1 ring-slate-200">
                  {s}
                </div>
              ))}
            </div>
            <div className="mt-3 text-xs text-slate-600">终端侧以“成长记录事件流水 + 规则包”计算进度；有网时再同步状态。</div>
          </div>
        </div>

        <div className="rounded-2xl bg-white p-5 ring-1 ring-slate-200">
          <div className="text-xs font-bold text-slate-500">当前策略摘要</div>
          <div className="mt-3 space-y-2 text-sm text-slate-700">
            <Row k="分发方式" v={modeLabel} />
            <Row k="优先级" v={String(priority)} />
            <Row k="同类并存" v={allowSameType ? '允许' : '不允许'} />
          </div>
          <div className="mt-4 rounded-xl bg-slate-50 p-4 text-xs text-slate-600 ring-1 ring-slate-200">
            <div className="font-bold text-slate-900">说明</div>
            <div className="mt-1">真实实现需要与“任务分发引擎”联动，确保幂等分配与离线可用。</div>
          </div>
        </div>
      </div>

      <div className="sticky bottom-4 rounded-2xl bg-white p-4 ring-1 ring-slate-200">
        <div className="flex flex-wrap items-center gap-2">
          <Link href={`/admin/config/tasks/${taskId}/rules-rewards`}>
            <Button tone="secondary">上一步</Button>
          </Link>
          <Button tone="secondary" onClick={saveDraft}>
            保存草稿
          </Button>
          <Button tone="secondary" onClick={saveAndPreview}>
            保存并预览
          </Button>
          <Button onClick={done}>完成配置</Button>
        </div>
      </div>
    </div>
  )
}

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="mb-1 text-xs font-semibold text-slate-700">{label}</div>
      {hint && <div className="mb-2 text-xs text-slate-500 leading-relaxed">{hint}</div>}
      {children}
    </div>
  )
}

function RadioRow({
  checked,
  onChange,
  title,
  desc,
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

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-start justify-between gap-3">
      <div className="text-xs font-bold text-slate-500">{k}</div>
      <div className="text-right text-sm font-semibold text-slate-900">{v}</div>
    </div>
  )
}

