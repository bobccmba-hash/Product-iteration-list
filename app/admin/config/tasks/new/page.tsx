'use client'

import Link from 'next/link'
import { useId, useMemo, useState } from 'react'
import { Button, Input, ToastHost, useToasts } from '@/components/admin/AdminPrimitives'

const METRICS = [
  { value: '互动次数', label: '互动次数', hint: '选定周期内的互动结束事件数量' },
  { value: '卡牌总数', label: '卡牌总数', hint: '选定周期内获得的卡牌张数（含重复）' },
  { value: '不同卡牌数', label: '不同卡牌数', hint: '选定周期内去重后的卡牌种类数量' },
  { value: '连续互动天数', label: '连续互动天数', hint: '从最近一次起，连续有互动记录的自然日天数' },
  { value: '连续得卡天数', label: '连续得卡天数', hint: '从最近一次起，连续有获得卡牌事件的自然日天数' },
  { value: '任务完成数', label: '任务完成数', hint: '成长记录中的任务完成事件次数' },
]

const CYCLES = [
  { value: 'daily', label: '日', desc: '每天重置，可反复完成' },
  { value: 'weekly', label: '周', desc: '每周重置，可反复完成' },
  { value: 'one_time', label: '一次性', desc: '累计达标后终身完成，不重置' },
] as const

type Cycle = typeof CYCLES[number]['value']

type FormState = {
  name: string
  desc: string
  cycle: Cycle
  metric: string
  targetValue: number
  rewardType: 'card' | 'blind_box'
  rewardValue: number
  distribution: 'all' | 'new_default' | 'existing_default'
}

export default function TaskCreatePage() {
  const { toasts, push, remove } = useToasts()
  const uid = useId()
  const tmpTaskId = useMemo(() => `tmp_${uid.replace(/:/g, '')}`, [uid])

  const [form, setForm] = useState<FormState>({
    name: '',
    desc: '',
    cycle: 'daily',
    metric: '互动次数',
    targetValue: 3,
    rewardType: 'card',
    rewardValue: 1,
    distribution: 'all',
  })

  function update<K extends keyof FormState>(k: K, v: FormState[K]) {
    setForm((s) => ({ ...s, [k]: v }))
  }

  function validate() {
    if (!form.name.trim()) return '请填写任务名称'
    if (form.targetValue < 1) return '目标数值需大于 0'
    return null
  }

  function onSaveDraft() {
    const msg = validate()
    if (msg) return push(msg, 'danger')
    push('已保存草稿', 'success')
  }

  const selectedMetric = METRICS.find((m) => m.value === form.metric)
  const selectedCycle = CYCLES.find((c) => c.value === form.cycle)

  return (
    <div className="space-y-5">
      <ToastHost toasts={toasts} onRemove={remove} />

      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="text-xs font-bold text-slate-500">配置中心 / 任务设定 / 新建</div>
          <h1 className="mt-2 text-2xl font-black tracking-tight">新建任务</h1>
        </div>
        <Link href="/admin/config/tasks">
          <Button tone="secondary">返回列表</Button>
        </Link>
      </div>

      <div className="rounded-2xl bg-white p-6 ring-1 ring-slate-200">
        <div className="space-y-6">

          {/* 基本信息 */}
          <div className="space-y-3">
            <SectionLabel title="基本信息" />
            <Field label="任务名称 *">
              <Input value={form.name} onChange={(v) => update('name', v)} placeholder="例如：今天完成 3 次互动" />
            </Field>
            <Field label="任务说明">
              <textarea
                value={form.desc}
                onChange={(e) => update('desc', e.target.value)}
                placeholder="可选，补充说明任务背景或提示（选填）"
                className="min-h-20 w-full rounded-lg bg-white px-3 py-2 text-sm ring-1 ring-slate-200 focus:ring-2 focus:ring-slate-400"
              />
            </Field>
          </div>

          <div className="border-t border-slate-100" />

          {/* 任务周期 */}
          <div className="space-y-3">
            <SectionLabel title="任务周期" desc="决定统计窗口的重置频率" />
            <div className="grid gap-3 sm:grid-cols-3">
              {CYCLES.map((c) => (
                <label key={c.value} className={`flex cursor-pointer flex-col gap-1 rounded-xl p-4 ring-1 transition ${
                  form.cycle === c.value ? 'bg-slate-900 ring-slate-900' : 'bg-slate-50 ring-slate-200 hover:ring-slate-300'
                }`}>
                  <div className="flex items-center gap-2">
                    <input type="radio" checked={form.cycle === c.value} onChange={() => update('cycle', c.value)} className="h-4 w-4" />
                    <span className={`text-sm font-black ${ form.cycle === c.value ? 'text-white' : 'text-slate-800'}`}>{c.label}</span>
                  </div>
                  <div className={`text-xs ${ form.cycle === c.value ? 'text-white/70' : 'text-slate-500'}`}>{c.desc}</div>
                </label>
              ))}
            </div>
          </div>

          <div className="border-t border-slate-100" />

          {/* 完成条件 */}
          <div className="space-y-3">
            <SectionLabel title="完成条件" desc="当统计值达到目标数值时，任务判定为完成" />
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="统计指标">
                <select
                  value={form.metric}
                  onChange={(e) => update('metric', e.target.value)}
                  className="h-10 w-full rounded-lg bg-white px-3 text-sm ring-1 ring-slate-200 focus:ring-2 focus:ring-slate-400"
                >
                  {METRICS.map((m) => (
                    <option key={m.value} value={m.value}>{m.label}</option>
                  ))}
                </select>
                {selectedMetric && (
                  <p className="mt-1 text-xs text-slate-500">{selectedMetric.hint}</p>
                )}
              </Field>
              <Field label="目标数值">
                <input
                  type="number"
                  value={form.targetValue}
                  min={1}
                  onChange={(e) => update('targetValue', Math.max(1, Number(e.target.value || 1)))}
                  className="h-10 w-full rounded-lg bg-white px-3 text-sm ring-1 ring-slate-200 focus:ring-2 focus:ring-slate-400"
                />
                <p className="mt-1 text-xs text-slate-500">
                  达成公式：{form.metric} {'>='} {form.targetValue}（{selectedCycle?.label}）
                </p>
              </Field>
            </div>
          </div>

          <div className="border-t border-slate-100" />

          {/* 奖励 */}
          <div className="space-y-3">
            <SectionLabel title="奖励" desc="任务完成后发放的奖励" />
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="奖励类型">
                <div className="grid grid-cols-2 gap-2">
                  {([
                    { v: 'card', l: '卡牌' },
                    { v: 'blind_box', l: '盲盒' },
                  ] as const).map((r) => (
                    <label key={r.v} className={`flex cursor-pointer items-center gap-2 rounded-xl p-3 ring-1 transition ${
                      form.rewardType === r.v ? 'bg-slate-900 ring-slate-900' : 'bg-slate-50 ring-slate-200 hover:ring-slate-300'
                    }`}>
                      <input type="radio" checked={form.rewardType === r.v} onChange={() => update('rewardType', r.v)} className="h-4 w-4" />
                      <span className={`text-sm font-bold ${ form.rewardType === r.v ? 'text-white' : 'text-slate-800'}`}>{r.l}</span>
                    </label>
                  ))}
                </div>
              </Field>
              <Field label="奖励数量">
                <input
                  type="number"
                  value={form.rewardValue}
                  min={1}
                  onChange={(e) => update('rewardValue', Math.max(1, Number(e.target.value || 1)))}
                  className="h-10 w-full rounded-lg bg-white px-3 text-sm ring-1 ring-slate-200 focus:ring-2 focus:ring-slate-400"
                />
              </Field>
            </div>
          </div>

          <div className="border-t border-slate-100" />

          {/* 分发策略 */}
          <div className="space-y-3">
            <SectionLabel title="分发策略" desc="配置学生什么时候拿到这个任务" />
            <div className="grid gap-3 sm:grid-cols-3">
              {([
                { v: 'all', l: '所有学生', d: '对所有学生默认分配，包括新学生和老学生' },
                { v: 'new_default', l: '新学生默认分配', d: '首次建立档案后默认拿到该任务' },
                { v: 'existing_default', l: '老学生默认分配', d: '已有档案但无任务时默认分配' },
              ] as const).map((r) => (
                <label key={r.v} className={`flex cursor-pointer flex-col gap-1 rounded-xl p-4 ring-1 transition ${
                  form.distribution === r.v ? 'bg-slate-900 ring-slate-900' : 'bg-slate-50 ring-slate-200 hover:ring-slate-300'
                }`}>
                  <div className="flex items-center gap-2">
                    <input type="radio" checked={form.distribution === r.v} onChange={() => update('distribution', r.v)} className="h-4 w-4" />
                    <span className={`text-sm font-black ${form.distribution === r.v ? 'text-white' : 'text-slate-800'}`}>{r.l}</span>
                  </div>
                  <div className={`text-xs ${form.distribution === r.v ? 'text-white/70' : 'text-slate-500'}`}>{r.d}</div>
                </label>
              ))}
            </div>
          </div>

        </div>
      </div>

      <div className="sticky bottom-4 rounded-2xl bg-white p-4 ring-1 ring-slate-200">
        <div className="flex flex-wrap items-center gap-2">
          <Button onClick={() => {
            const msg = validate()
            if (msg) return push(msg, 'danger')
            push('已保存配置', 'success')
            window.location.href = '/admin/config/tasks'
          }}>保存配置</Button>
          <button
            type="button"
            onClick={() => window.location.href = '/admin/config/tasks'}
            className="ml-auto text-sm font-semibold text-slate-600 hover:text-slate-900"
          >
            返回
          </button>
        </div>
      </div>
    </div>
  )
}

function SectionLabel({ title, desc }: { title: string; desc?: string }) {
  return (
    <div>
      <div className="text-sm font-black text-slate-900">{title}</div>
      {desc && <div className="mt-0.5 text-xs text-slate-500">{desc}</div>}
    </div>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="mb-1 text-xs font-semibold text-slate-700">{label}</div>
      {children}
    </div>
  )
}
