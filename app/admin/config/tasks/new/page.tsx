'use client'

import Link from 'next/link'
import { useId, useMemo, useState } from 'react'
import { Button, Input, Tag, ToastHost, useToasts } from '@/components/admin/AdminPrimitives'
import type { TaskCycle, TaskType } from '@/utils/adminMock'

type FormState = {
  name: string
  desc: string
  type: TaskType
  cycle: TaskCycle
  isMain: boolean
  repeatable: boolean
  startAt: string
  endAt: string
  offline: boolean
  frontendTitle: string
  frontendShortDesc: string
  doneHint: string
  nearlyHint: string
}

export default function TaskCreatePage() {
  const { toasts, push, remove } = useToasts()
  const [dirty, setDirty] = useState(false)
  const uid = useId()
  const tmpTaskId = useMemo(() => `tmp_${uid.replace(/:/g, '')}`, [uid])

  const [form, setForm] = useState<FormState>(() => ({
    name: '',
    desc: '',
    type: 'count',
    cycle: 'daily',
    isMain: true,
    repeatable: true,
    startAt: '',
    endAt: '',
    offline: true,
    frontendTitle: '我的小任务',
    frontendShortDesc: '再来一次就能完成啦！',
    doneHint: '完成啦！太厉害了！',
    nearlyHint: '快完成了，再加把劲！',
  }))

  const typeCopy = useMemo(
    () => (form.type === 'count' ? '次数型' : form.type === 'collection' ? '收集型' : '其他'),
    [form.type]
  )
  const cycleCopy = useMemo(
    () => (form.cycle === 'daily' ? '日任务' : form.cycle === 'weekly' ? '周任务' : '一次性'),
    [form.cycle]
  )

  function update<K extends keyof FormState>(k: K, v: FormState[K]) {
    setDirty(true)
    setForm((s) => ({ ...s, [k]: v }))
  }

  function validate() {
    if (!form.name.trim()) return '请填写任务名称'
    return null
  }

  function onSaveDraft() {
    const msg = validate()
    if (msg) return push(msg, 'danger')
    push('已保存草稿（示例，不落库）', 'success')
    setDirty(false)
  }

  function onNext() {
    const msg = validate()
    if (msg) return push(`基础字段未填完整：${msg}`, 'danger')
    push('已通过校验：下一步配置条件与奖励', 'success')
    window.location.href = `/admin/config/tasks/${encodeURIComponent(tmpTaskId)}/rules-rewards`
  }

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

      <div className="grid gap-4 lg:grid-cols-[7fr_3fr]">
        <div className="rounded-2xl bg-white p-5 ring-1 ring-slate-200">
          <SectionTitle title="任务基础信息" desc="定义任务名称、类型、周期与可重复等属性。" />
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            <Field label="任务名称">
              <Input value={form.name} onChange={(v) => update('name', v)} placeholder="例如：今天完成 1 次互动" />
            </Field>
            <Field label="任务说明" className="md:col-span-2">
              <textarea
                value={form.desc}
                onChange={(e) => update('desc', e.target.value)}
                className="min-h-24 w-full rounded-lg bg-white px-3 py-2 text-sm ring-1 ring-slate-200 focus:ring-2 focus:ring-slate-400"
              />
            </Field>

            <Field label="任务类型" className="md:col-span-2">
              <div className="grid gap-2 md:grid-cols-4">
                {([
                  { v: 'count', l: '次数型' },
                  { v: 'collection', l: '收集型' },
                ] as const).map((x) => (
                  <label key={x.v} className="flex cursor-pointer items-center gap-2 rounded-xl bg-slate-50 px-3 py-2 ring-1 ring-slate-200">
                    <input type="radio" checked={form.type === x.v} onChange={() => update('type', x.v)} className="h-4 w-4" />
                    <span className="text-sm font-semibold text-slate-800">{x.l}</span>
                  </label>
                ))}
              </div>
              <div className="mt-2 space-y-1 text-xs text-slate-500">
                <div>
                  <span className="font-semibold">次数型：</span>
                  按“完成 N 次互动/游戏”计数，适合每日、小周期打卡任务。
                </div>
                <div>
                  <span className="font-semibold">收集型：</span>
                  按“收集到 N 张卡牌/内容”计数，适合需要累积解锁的任务。
                </div>
              </div>
            </Field>

            <Field label="任务周期" className="md:col-span-2">
              <div className="grid gap-2 md:grid-cols-4">
                {([
                  { v: 'daily', l: '日' },
                  { v: 'weekly', l: '周' },
                  { v: 'one_time', l: '一次性' },
                ] as const).map((x) => (
                  <label key={x.v} className="flex cursor-pointer items-center gap-2 rounded-xl bg-slate-50 px-3 py-2 ring-1 ring-slate-200">
                    <input type="radio" checked={form.cycle === x.v} onChange={() => update('cycle', x.v)} className="h-4 w-4" />
                    <span className="text-sm font-semibold text-slate-800">{x.l}</span>
                  </label>
                ))}
              </div>
            </Field>

            <Field label="主任务标记">
              <label className="flex items-center gap-3 rounded-xl bg-slate-50 px-3 py-3 ring-1 ring-slate-200">
                <input type="checkbox" checked={form.isMain} onChange={(e) => update('isMain', e.target.checked)} className="h-4 w-4" />
                <span className="text-sm font-semibold text-slate-800">作为当前主任务展示</span>
              </label>
              <p className="mt-1 text-xs text-slate-500">
                勾选后，该任务会作为学生当前的「主任务」出现在终端首页；首期建议仅为少量核心任务打上主任务标记。
              </p>
            </Field>
            <Field label="是否可重复完成">
              <label className="flex items-center gap-3 rounded-xl bg-slate-50 px-3 py-3 ring-1 ring-slate-200">
                <input type="checkbox" checked={form.repeatable} onChange={(e) => update('repeatable', e.target.checked)} className="h-4 w-4" />
                <span className="text-sm font-semibold text-slate-800">完成后可再次分配</span>
              </label>
            </Field>
          </div>

          <div className="mt-8">
            <SectionTitle title="生效与离线" desc="定义任务的生效时间窗口与是否支持离线推进。" />
            <div className="mt-4 grid gap-3 md:grid-cols-3">
              <Field label="生效时间（开始）">
                <input
                  type="datetime-local"
                  value={form.startAt}
                  onChange={(e) => update('startAt', e.target.value)}
                  className="h-10 w-full rounded-lg bg-white px-3 text-sm ring-1 ring-slate-200 focus:ring-2 focus:ring-slate-400"
                />
              </Field>
              <Field label="生效时间（结束）">
                <input
                  type="datetime-local"
                  value={form.endAt}
                  onChange={(e) => update('endAt', e.target.value)}
                  className="h-10 w-full rounded-lg bg-white px-3 text-sm ring-1 ring-slate-200 focus:ring-2 focus:ring-slate-400"
                />
              </Field>
              <Field label="离线支持" className="md:col-span-3">
                <label className="flex items-center gap-3 rounded-xl bg-slate-50 px-3 py-3 ring-1 ring-slate-200">
                  <input type="checkbox" checked={form.offline} onChange={(e) => update('offline', e.target.checked)} className="h-4 w-4" />
                  <span className="text-sm font-semibold text-slate-800">无网时仍可分配/推进/完成</span>
                  <div className="ml-auto">
                    <Tag tone={form.offline ? 'info' : 'neutral'}>{form.offline ? '支持离线' : '不支持离线'}</Tag>
                  </div>
                </label>
              </Field>
            </div>
          </div>

          <div className="mt-8">
            <SectionTitle title="前台展示设置" desc="影响「互动任务目标功能」与「结束反馈」的文案与高光提示。" />
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              <Field label="前台任务标题">
                <Input value={form.frontendTitle} onChange={(v) => update('frontendTitle', v)} />
              </Field>
              <Field label="前台简短说明">
                <Input value={form.frontendShortDesc} onChange={(v) => update('frontendShortDesc', v)} />
              </Field>
              <Field label="完成提示文案">
                <Input value={form.doneHint} onChange={(v) => update('doneHint', v)} />
              </Field>
              <Field label="即将完成提示文案">
                <Input value={form.nearlyHint} onChange={(v) => update('nearlyHint', v)} />
              </Field>
            </div>
          </div>
        </div>

        <div className="rounded-2xl bg-white p-5 ring-1 ring-slate-200">
          <div className="text-xs font-bold text-slate-500">终端预览</div>
          <div className="mt-4 rounded-2xl bg-slate-900 p-5 text-white">
            <div className="text-xs font-bold text-white/70">当前任务展示卡</div>
            <div className="mt-2 text-lg font-black">{form.name || '（任务名称）'}</div>
            <div className="mt-1 text-xs text-white/70">
              {typeCopy} · {cycleCopy}
            </div>
            <div className="mt-3 rounded-xl bg-white/10 p-3 text-xs text-white/80">
              <div className="font-bold text-white/90">{form.frontendTitle}</div>
              <div className="mt-1">{form.frontendShortDesc}</div>
            </div>
          </div>
          <div className="mt-4 rounded-xl bg-slate-50 p-4 text-xs text-slate-600 ring-1 ring-slate-200">
            <div className="font-bold text-slate-900">提示</div>
            <div className="mt-1">下一步会配置“条件与奖励”，再决定任务推进与完成时的反馈形态。</div>
          </div>
        </div>
      </div>

      <div className="sticky bottom-4 rounded-2xl bg-white p-4 ring-1 ring-slate-200">
        <div className="flex flex-wrap items-center gap-2">
          <Button tone="secondary" onClick={onSaveDraft}>
            保存草稿
          </Button>
          <Button onClick={onNext}>下一步：配置条件与奖励</Button>
          <div className="ml-auto">
            <button
              type="button"
              onClick={() => {
                if (dirty) {
                  const ok = window.confirm('当前内容尚未保存，是否离开？')
                  if (!ok) return
                }
                window.location.href = '/admin/config/tasks'
              }}
              className="text-sm font-semibold text-slate-600 hover:text-slate-900"
            >
              返回
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function SectionTitle({ title, desc }: { title: string; desc: string }) {
  return (
    <div>
      <div className="text-sm font-black text-slate-900">{title}</div>
      <div className="mt-1 text-xs text-slate-500">{desc}</div>
    </div>
  )
}

function Field({ label, children, className }: { label: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={className}>
      <div className="mb-1 text-xs font-semibold text-slate-700">{label}</div>
      {children}
    </div>
  )
}

