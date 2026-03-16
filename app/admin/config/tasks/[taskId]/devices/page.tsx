'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useMemo, useState } from 'react'
import { Button, Input, SearchableMultiSelect, Tag, ToastHost, useToasts } from '@/components/admin/AdminPrimitives'
import { mockSchools, mockTerminals } from '@/utils/adminMock'

type MappingRow = {
  id: string
  terminalIds: string[]
  school: string
  note: string
  pushedAt: string
  operator: string
}

export default function TaskDevicesPage() {
  const params = useParams<{ taskId: string }>()
  const taskId = params.taskId
  const { toasts, push, remove } = useToasts()

  const [selectedTerminals, setSelectedTerminals] = useState<string[]>([])
  const [selectedSchool, setSelectedSchool] = useState<string>('all')
  const [note, setNote] = useState('')
  const [rows, setRows] = useState<MappingRow[]>([
    {
      id: 'r1',
      terminalIds: ['term_a_1_01', 'term_a_2_02'],
      school: '示例小学A',
      note: '首批灰度推送',
      pushedAt: '2026-03-08 15:20',
      operator: '产品-小李',
    },
    {
      id: 'r2',
      terminalIds: ['term_b_2_low_01'],
      school: '示例小学B',
      note: '低年级场景联调',
      pushedAt: '2026-03-07 10:05',
      operator: '运营-小王',
    },
  ])

  const filteredOptions = useMemo(() => {
    return mockTerminals
      .filter((t) => (selectedSchool === 'all' ? true : t.school === selectedSchool))
      .map((t) => ({
        value: t.id,
        label: t.name,
        description: `${t.school} · ${t.gradeBand} · ${t.deviceGroup}`,
      }))
  }, [selectedSchool])

  function onSaveMapping() {
    if (selectedTerminals.length === 0) {
      push('请先选择要推送的终端', 'danger')
      return
    }
    const schoolName = selectedSchool === 'all' ? '多学校混合' : selectedSchool
    const id = `r_${Date.now()}`
    const now = new Date().toISOString().replace('T', ' ').slice(0, 16)
    const row: MappingRow = {
      id,
      terminalIds: selectedTerminals,
      school: schoolName,
      note: note || '批量推送',
      pushedAt: now,
      operator: '当前登录账号（示例）',
    }
    setRows((s) => [row, ...s])
    push('已保存并模拟推送到所选终端（原型，不落库）', 'success')
  }

  function onRemoveRow(id: string) {
    setRows((s) => s.filter((r) => r.id !== id))
    push('已删除该次推送记录（仅前端原型）', 'neutral')
  }

  return (
    <div className="space-y-5">
      <ToastHost toasts={toasts} onRemove={remove} />

      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="text-xs font-bold text-slate-500">配置中心 / 任务设定 / 推送到终端</div>
          <h1 className="mt-2 text-2xl font-black tracking-tight">选择终端学校与设备</h1>
          <div className="mt-2 text-xs text-slate-600">
            任务 ID：<span className="font-mono">{taskId}</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/admin/config/tasks">
            <Button tone="secondary">返回任务列表</Button>
          </Link>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-[6fr_4fr]">
        <section className="rounded-2xl bg-white p-5 ring-1 ring-slate-200">
          <div className="text-sm font-black text-slate-900">按学校筛选终端并选择推送范围</div>
          <div className="mt-1 text-xs text-slate-500">
            这里只负责「把已有任务推送到哪些学校的哪些终端」，不修改任务本身配置。
          </div>

          <div className="mt-4 grid gap-3 md:grid-cols-3">
            <div className="md:col-span-1">
              <div className="mb-1 text-xs font-semibold text-slate-700">筛选学校</div>
              <select
                value={selectedSchool}
                onChange={(e) => setSelectedSchool(e.target.value)}
                className="h-10 w-full rounded-lg bg-white px-3 text-sm ring-1 ring-slate-200 focus:ring-2 focus:ring-slate-400"
              >
                <option value="all">全部学校</option>
                {mockSchools.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
            <div className="md:col-span-2">
              <div className="mb-1 text-xs font-semibold text-slate-700">本次推送备注（可选）</div>
              <Input value={note} onChange={setNote} placeholder="例如：首期灰度、全量同步、节前活动专项等" />
            </div>
          </div>

          <div className="mt-4">
            <div className="mb-1 text-xs font-semibold text-slate-700">选择终端设备</div>
            <SearchableMultiSelect options={filteredOptions} values={selectedTerminals} onChange={setSelectedTerminals} />
          </div>
        </section>

        <section className="space-y-4">
          <div className="rounded-2xl bg-white p-5 ring-1 ring-slate-200">
            <div className="text-sm font-black text-slate-900">已选终端概览</div>
            <div className="mt-1 text-xs text-slate-500">
              仅做交互原型展示，真实系统会在服务端落库并推送到对应学校的终端。
            </div>
            <div className="mt-3 space-y-2 max-h-52 overflow-y-auto">
              {selectedTerminals.length === 0 ? (
                <div className="rounded-xl bg-slate-50 px-3 py-3 text-xs text-slate-500">暂未选择终端。</div>
              ) : (
                selectedTerminals.map((id) => {
                  const t = mockTerminals.find((x) => x.id === id)
                  if (!t) return null
                  return (
                    <div
                      key={id}
                      className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2 text-xs text-slate-700 ring-1 ring-slate-200"
                    >
                      <div className="min-w-0">
                        <div className="truncate font-semibold text-slate-900">{t.name}</div>
                        <div className="mt-0.5 truncate text-[11px] text-slate-500">
                          {t.school} · {t.gradeBand} · {t.deviceGroup}
                        </div>
                      </div>
                      <Tag tone="info">待推送</Tag>
                    </div>
                  )
                })
              )}
            </div>
          </div>

          <div className="rounded-2xl bg-white p-5 ring-1 ring-slate-200">
            <div className="text-sm font-black text-slate-900">历史推送记录（示例）</div>
            <div className="mt-1 text-xs text-slate-500">
              支持查看/增删「某次推送关联了哪些学校与终端」，方便后续补充或回滚。
            </div>
            <div className="mt-3 space-y-2 max-h-60 overflow-y-auto">
              {rows.map((r) => (
                <div
                  key={r.id}
                  className="rounded-xl bg-slate-50 px-3 py-2 text-xs text-slate-700 ring-1 ring-slate-200"
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="font-semibold text-slate-900">{r.school}</div>
                    <div className="flex items-center gap-2">
                      <Tag tone="info">终端数：{r.terminalIds.length}</Tag>
                      <button
                        type="button"
                        onClick={() => onRemoveRow(r.id)}
                        className="text-[11px] font-semibold text-rose-700 hover:text-rose-800"
                      >
                        删除
                      </button>
                    </div>
                  </div>
                  <div className="mt-1 text-[11px] text-slate-600">
                    推送时间：{r.pushedAt} · 操作人：{r.operator}
                  </div>
                  <div className="mt-1 text-[11px] text-slate-600">备注：{r.note}</div>
                </div>
              ))}
              {rows.length === 0 && (
                <div className="rounded-xl bg-slate-50 px-3 py-3 text-xs text-slate-500">
                  暂无推送记录，本页所有操作仅作原型展示。
                </div>
              )}
            </div>
          </div>
        </section>
      </div>

      <div className="sticky bottom-4 rounded-2xl bg-white p-4 ring-1 ring-slate-200">
        <div className="flex flex-wrap items-center gap-2">
          <Button tone="secondary" onClick={onSaveMapping}>
            保存本次终端选择（并推送）
          </Button>
          <div className="ml-auto text-xs text-slate-500">
            说明：目标/任务/勋章的「设定页」只负责规则本身，这里单独管理“推送到哪些终端/学校”。
          </div>
        </div>
      </div>
    </div>
  )
}

