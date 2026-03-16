'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useState } from 'react'
import { Button, Input, Select, Tag, ToastHost, useToasts } from '@/components/admin/AdminPrimitives'
import type { CompareOp, StatPeriod } from '@/utils/adminMock'

type ConditionState = {
  conditionType: string
  metric: string
  op: CompareOp
  targetValue: number
  period: StatPeriod
  scope: string
}

type RewardState = {
  rewardType: 'card' | 'blind_box'
  rewardValue: string
  rewardCopy: string
  immediate: boolean
}

const compareOps: Array<{ value: CompareOp; label: string }> = [
  { value: '=', label: '=' },
  { value: '>=', label: '>=' },
  { value: '<=', label: '<=' },
]

const periods: Array<{ value: StatPeriod; label: string }> = [
  { value: 'cumulative', label: '累计' },
  { value: 'day', label: '日' },
  { value: 'week', label: '周' },
  { value: 'month', label: '月' },
  { value: 'streak_days', label: '连续天' },
]

const conditionTypes: Array<{ value: string; label: string; desc: string }> = [
  {
    value: '基础计数条件',
    label: '基础计数条件',
    desc: '按「累计/当天/本周」的次数或张数计算，例如：今天完成 1 次互动、本周完成 3 次互动。',
  },
  {
    value: '连续条件',
    label: '连续条件',
    desc: '要求连续多天达成，打断则重新累计，例如：连续互动 3 天、连续得卡 5 天。',
  },
  {
    value: '去重收集条件',
    label: '去重收集条件',
    desc: '看「不同内容」的收集数量，例如：收集到 5 张不同知识卡。',
  },
  {
    value: '里程碑条件',
    label: '里程碑条件',
    desc: '在某个重要节点触发一次性的奖励，例如：累计互动达到第 10 次、第 30 次时各发一次奖励。',
  },
]

const metrics: Array<{ value: string; label: string }> = [
  { value: '互动次数', label: '互动次数' },
  { value: '卡牌总数', label: '卡牌总数' },
  { value: '不同卡牌数', label: '不同卡牌数' },
  { value: '连续互动天数', label: '连续互动天数' },
  { value: '连续得卡天数', label: '连续得卡天数' },
  { value: '任务完成数', label: '任务完成数' },
  { value: '目标完成数', label: '目标完成数' },
  { value: '勋章获得数', label: '勋章获得数' },
]

export default function TaskRulesRewardsPage() {
  const params = useParams<{ taskId: string }>()
  const taskId = params.taskId
  const { toasts, push, remove } = useToasts()

  const [cond, setCond] = useState<ConditionState>({
    conditionType: '基础计数条件',
    metric: '互动次数',
    op: '>=',
    targetValue: 1,
    period: 'day',
    scope: '全部互动',
  })

  const [reward, setReward] = useState<RewardState>({
    rewardType: 'card',
    rewardValue: '1',
    rewardCopy: '奖励你 1 张卡牌！',
    immediate: true,
  })

  function saveDraft() {
    push('已保存草稿（示例，不落库）', 'success')
  }

  function next() {
    push('已保存：下一步配置分发策略', 'success')
    window.location.href = `/admin/config/tasks/${taskId}/distribution`
  }

  function saveAndPush() {
    push('已保存并触发推送到终端（示例，仅前端原型）', 'success')
    window.location.href = '/admin/config/tasks'
  }

  return (
    <div className="space-y-5">
      <ToastHost toasts={toasts} onRemove={remove} />

      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="text-xs font-bold text-slate-500">配置中心 / 任务设定 / 条件与奖励</div>
          <div className="mt-2 flex items-center gap-2">
            <Link href={`/admin/config/tasks/${taskId}/edit`} className="text-sm font-bold text-slate-700 hover:text-slate-900">
              ← 返回
            </Link>
            <h1 className="text-2xl font-black tracking-tight">任务条件与奖励配置</h1>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Tag tone="warning">草稿</Tag>
          <Tag tone="info">首期建议 1 组主条件</Tag>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-[4fr_3fr_3fr]">
        <div className="rounded-2xl bg-white p-5 ring-1 ring-slate-200">
          <div className="text-sm font-black text-slate-900">条件配置</div>
          <div className="mt-1 text-xs text-slate-500">
            每个任务通常只配置 1 组主条件：先选条件类型，再选统计指标与门槛值。上一步里的「任务类型 / 任务周期」主要用于前台展示标签，这里是具体的统计与达成规则，不是重复配置。
          </div>
          <div className="mt-4 grid gap-3">
            <Field label="条件类型">
              <Select
                value={cond.conditionType}
                onChange={(v) => setCond((s) => ({ ...s, conditionType: v }))}
                options={conditionTypes.map((x) => ({ value: x.value, label: x.label }))}
              />
              <div className="mt-2 space-y-1 text-xs text-slate-500">
                {conditionTypes.map((t) => (
                  <div key={t.value}>
                    <span className="font-semibold">{t.label}：</span>
                    {t.desc}
                  </div>
                ))}
              </div>
            </Field>
            <Field label="统计指标">
              <Select
                value={cond.metric}
                onChange={(v) => setCond((s) => ({ ...s, metric: v }))}
                options={metrics}
              />
            </Field>
            <div className="grid gap-3 md:grid-cols-3">
              <Field label="比较符号">
                <Select value={cond.op} onChange={(v) => setCond((s) => ({ ...s, op: v as CompareOp }))} options={compareOps} />
              </Field>
              <Field label="目标值（门槛）">
                <input
                  type="number"
                  value={cond.targetValue}
                  min={1}
                  onChange={(e) => {
                    const raw = Number(e.target.value || 1)
                    const safe = Number.isFinite(raw) ? Math.max(1, raw) : 1
                    setCond((s) => ({ ...s, targetValue: safe }))
                  }}
                  className="h-10 w-full rounded-lg bg-white px-3 text-sm ring-1 ring-slate-200 focus:ring-2 focus:ring-slate-400"
                />
              </Field>
              <Field label="统计周期">
                <Select value={cond.period} onChange={(v) => setCond((s) => ({ ...s, period: v as StatPeriod }))} options={periods} />
              </Field>
            </div>
            <Field label="指定范围（主题/卡牌分类/设备活动，占位）">
              <Input value={cond.scope} onChange={(v) => setCond((s) => ({ ...s, scope: v }))} placeholder="例如：数学 / 知识卡 / 活动A" />
            </Field>
          </div>
        </div>

        <div className="rounded-2xl bg-white p-5 ring-1 ring-slate-200">
          <div className="text-sm font-black text-slate-900">奖励配置</div>
          <div className="mt-1 text-xs text-slate-500">奖励类型支持：卡牌 / 积分 / 勋章 / 活动机会。</div>
          <div className="mt-4 grid gap-3">
            <Field label="奖励类型">
              <Select
                value={reward.rewardType}
                onChange={(v) => setReward((s) => ({ ...s, rewardType: v as RewardState['rewardType'] }))}
                options={[
                  { value: 'card', label: '卡牌' },
                  { value: 'blind_box', label: '盲盒' },
                ]}
              />
            </Field>
            <Field label="奖励值">
              <Input value={reward.rewardValue} onChange={(v) => setReward((s) => ({ ...s, rewardValue: v }))} placeholder="例如：10 / BADGE_STREAK_STAR" />
            </Field>
            <Field label="奖励展示文案">
              <Input value={reward.rewardCopy} onChange={(v) => setReward((s) => ({ ...s, rewardCopy: v }))} />
            </Field>
            <Field label="是否立即发放">
              <label className="flex items-center gap-3 rounded-xl bg-slate-50 px-3 py-3 ring-1 ring-slate-200">
                <input type="checkbox" checked={reward.immediate} onChange={(e) => setReward((s) => ({ ...s, immediate: e.target.checked }))} className="h-4 w-4" />
                <span className="text-sm font-semibold text-slate-800">{reward.immediate ? '立即发放' : '延迟发放'}</span>
              </label>
            </Field>
          </div>
        </div>

        <div className="rounded-2xl bg-white p-5 ring-1 ring-slate-200">
          <div className="text-xs font-bold text-slate-500">计算口径与触发规则</div>
          <div className="mt-3 space-y-3 text-sm leading-relaxed text-slate-700">
            <div className="rounded-xl bg-slate-50 p-4 ring-1 ring-slate-200">
              <div className="font-black text-slate-900">统计指标如何计算</div>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-xs text-slate-600">
                <li>互动次数：选定范围内的「互动结束事件」数量。</li>
                <li>卡牌总数：选定范围内获得的卡牌张数（含重复）。</li>
                <li>不同卡牌数：选定范围内去重后的卡牌 ID 数量。</li>
                <li>连续互动天数：最近一次起连续有互动记录的自然日天数。</li>
                <li>连续得卡天数：最近一次起连续有「获得卡牌」事件的自然日天数。</li>
                <li>任务完成数：成长记录中的任务完成事件次数。</li>
                <li>目标完成数：成长记录中的目标完成事件次数。</li>
                <li>勋章获得数：成长记录中的勋章解锁事件次数。</li>
              </ul>
            </div>
            <div className="rounded-xl bg-slate-50 p-4 ring-1 ring-slate-200">
              <div className="font-black text-slate-900">当前任务达成公式</div>
              <div className="mt-2 text-xs text-slate-600">
                终端会在本地按上述口径累计统计，当满足：
                <span className="font-semibold">
                  {' '}
                  {cond.metric} {cond.op} {cond.targetValue}（
                  {periods.find((p) => p.value === cond.period)?.label ?? cond.period}
                  ）
                </span>{' '}
                时，触发本任务完成，并发放右侧配置的奖励。
                <div className="mt-2">
                  例如：将条件设为
                  <span className="font-semibold"> 互动次数 &gt;= 3（日）</span>，表示当天互动次数累计达到 3 次时，该任务判定为完成。
                </div>
                <div className="mt-2">
                  「任务类型 / 任务周期」决定任务在前台展示成“次数型 / 日任务”等标签，而真正判断是否完成，只看这里配置的条件公式。
                </div>
              </div>
            </div>
            <div className="rounded-xl bg-slate-50 p-4 ring-1 ring-slate-200">
              <div className="font-black text-slate-900">离线与结束页关系</div>
              <div className="mt-1 text-xs text-slate-600">
                任务推进主要依赖成长事件流水聚合，终端在无网时也会继续计算进度与完成；结束页展示的「本次推进 / 总进度 / 奖励高光」
                都以这些本地计算结果为准，联网后再统一回写到后台。
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="sticky bottom-4 rounded-2xl bg-white p-4 ring-1 ring-slate-200">
        <div className="flex flex-wrap items-center gap-2">
          <Link href={`/admin/config/tasks/${taskId}/edit`}>
            <Button tone="secondary">上一步</Button>
          </Link>
          <Button tone="secondary" onClick={saveDraft}>
            保存草稿
          </Button>
          <Button onClick={next}>下一步：分发策略</Button>
          <Button onClick={saveAndPush}>保存并推送到终端</Button>
        </div>
      </div>
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

