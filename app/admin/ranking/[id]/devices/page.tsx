'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useMemo, useState } from 'react'
import { Button, Input, SearchableMultiSelect, Tag, ToastHost, useToasts } from '@/components/admin/AdminPrimitives'
import { mockSchools, mockTerminals } from '@/utils/adminMock'
import { mockRankingConfigs, GAME_OPTIONS } from '@/utils/rankingMock'

type PushRecord = {
  id: string
  terminalIds: string[]
  school: string
  note: string
  pushedAt: string
  operator: string
}

export default function RankingDevicesPage() {
  const params = useParams<{ id: string }>()
  const configId = params.id
  const config = mockRankingConfigs.find((c) => c.id === configId)
  const { toasts, push, remove } = useToasts()

  const [selectedTerminals, setSelectedTerminals] = useState<string[]>([])
  const [selectedSchool, setSelectedSchool] = useState<string>('all')
  const [note, setNote] = useState('')
  const [rows, setRows] = useState<PushRecord[]>([
    {
      id: 'r1',
      terminalIds: ['term_a_1_01', 'term_a_2_02'],
      school: '示例小学A',
      note: '学习之星首批推送',
      pushedAt: '2026-03-08 15:30',
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
    const row: PushRecord = {
      id,
      terminalIds: selectedTerminals,
      school: schoolName,
      note: note || '批量推送',
      pushedAt: now,
      operator: '当前登录账号（示例）',
    }
    setRows((s) => [row, ...s])
    setSelectedTerminals([])
    setNote('')
    push('已保存并模拟推送到所选终端（原型，不落库）', 'success')
  }

  function onRemoveRow(id: string) {
    setRows((s) => s.filter((r) => r.id !== id))
    push('已删除该次推送记录（仅前端原型）', 'neutral')
  }

  return (
    <div className="space-y-5">
      <ToastHost toasts={toasts} onRemove={remove} />

      {/* 顶部 */}
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="text-xs font-bold text-slate-500">系统入口 / 学习之星配置 / 推送终端</div>
          <h1 className="mt-2 text-2xl font-black tracking-tight">推送到终端</h1>
          <div className="mt-2 flex items-center gap-3 text-xs text-slate-600">
            <span>配置：<span className="font-semibold text-slate-900">{config?.name ?? configId}</span></span>
            <span>·</span>
            <span>适用游戏：<span className="font-semibold text-slate-900">{config ? GAME_OPTIONS.find((g) => g.value === config.targetGame)?.label ?? config.targetGame : '-'}</span></span>
            <Tag tone={config?.status === 'published' ? 'success' : 'warning'}>
              {config?.status === 'published' ? '已发布' : '草稿'}
            </Tag>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/admin/ranking">
            <Button tone="secondary">返回列表</Button>
          </Link>
        </div>
      </div>

      {/* 主内容 */}
      <div className="grid gap-4 lg:grid-cols-[6fr_4fr]">
        {/* 左侧：选择终端 */}
        <section className="rounded-2xl bg-white p-5 ring-1 ring-slate-200">
          <div className="text-sm font-black text-slate-900">按学校筛选终端并选择推送范围</div>
          <div className="mt-1 text-xs text-slate-500">
            这里只负责「把已配置的学习之星推送到哪些学校的哪些终端」，不修改配置本身。
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
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
            <div className="md:col-span-2">
              <div className="mb-1 text-xs font-semibold text-slate-700">本次推送备注（可选）</div>
              <Input value={note} onChange={setNote} placeholder="例如：全量覆盖、灰度测试等" />
            </div>
          </div>

          <div className="mt-4">
            <div className="mb-1 text-xs font-semibold text-slate-700">选择终端设备</div>
            <SearchableMultiSelect
              options={filteredOptions}
              values={selectedTerminals}
              onChange={setSelectedTerminals}
            />
          </div>
        </section>

        {/* 右侧：已选预览 + 历史记录 */}
        <section className="space-y-4">
          {/* 已选终端概览 */}
          <div className="rounded-2xl bg-white p-5 ring-1 ring-slate-200">
            <div className="text-sm font-black text-slate-900">已选终端概览</div>
            <div className="mt-1 text-xs text-slate-500">
              确认无误后点击底部「保存并推送」按钮。
            </div>
            <div className="mt-3 max-h-52 space-y-2 overflow-y-auto">
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

          {/* 历史推送记录 */}
          <div className="rounded-2xl bg-white p-5 ring-1 ring-slate-200">
            <div className="text-sm font-black text-slate-900">历史推送记录</div>
            <div className="mt-1 text-xs text-slate-500">
              查看当前配置已推送到哪些学校与终端。
            </div>
            <div className="mt-3 max-h-72 space-y-2 overflow-y-auto">
              {rows.map((r) => (
                <div
                  key={r.id}
                  className="rounded-xl bg-slate-50 px-3 py-3 text-xs text-slate-700 ring-1 ring-slate-200"
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="font-semibold text-slate-900">{r.school}</div>
                    <div className="flex items-center gap-2">
                      <Tag tone="info">终端数：{r.terminalIds.length}</Tag>
                      <Tag tone="success">已推送</Tag>
                      <button
                        type="button"
                        onClick={() => onRemoveRow(r.id)}
                        className="text-[11px] font-semibold text-rose-600 hover:text-rose-800"
                      >
                        删除
                      </button>
                    </div>
                  </div>
                  <div className="mt-1.5 flex flex-wrap gap-1">
                    {r.terminalIds.map((tid) => {
                      const t = mockTerminals.find((x) => x.id === tid)
                      return t ? (
                        <span key={tid} className="rounded bg-white px-1.5 py-0.5 text-[10px] font-medium text-slate-600 ring-1 ring-slate-200">
                          {t.name}
                        </span>
                      ) : null
                    })}
                  </div>
                  <div className="mt-1.5 text-[11px] text-slate-500">
                    推送时间：{r.pushedAt} · 操作人：{r.operator}
                  </div>
                  {r.note && <div className="mt-0.5 text-[11px] text-slate-500">备注：{r.note}</div>}
                </div>
              ))}
              {rows.length === 0 && (
                <div className="rounded-xl bg-slate-50 px-3 py-3 text-xs text-slate-500">
                  暂无推送记录。
                </div>
              )}
            </div>
          </div>
        </section>
      </div>

      {/* 底部固定按钮 */}
      <div className="sticky bottom-4 rounded-2xl bg-white p-4 ring-1 ring-slate-200">
        <div className="flex flex-wrap items-center gap-3">
          <Button tone="primary" onClick={onSaveMapping}>
            保存并推送到所选终端
          </Button>
          <Button tone="secondary" onClick={() => window.alert('原型占位：仅保存，不推送')}>
            仅保存
          </Button>
          <div className="ml-auto text-xs text-slate-500">
            说明：学习之星配置发布后，可通过此页面选择推送到哪些学校的哪些终端，终端将在互动结束后展示对应的学习之星内容。
          </div>
        </div>
      </div>
    </div>
  )
}
