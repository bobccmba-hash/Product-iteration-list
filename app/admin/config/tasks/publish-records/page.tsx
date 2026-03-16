'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Suspense, useMemo } from 'react'
import { Button, Tag } from '@/components/admin/AdminPrimitives'
import { mockPublishRecords } from '@/utils/adminMock'

export default function TaskPublishRecordsPage() {
  return (
    <Suspense fallback={<div className="rounded-2xl bg-white p-6 ring-1 ring-slate-200">加载中…</div>}>
      <Inner />
    </Suspense>
  )
}

function Inner() {
  const sp = useSearchParams()
  const taskId = sp.get('taskId')

  const records = useMemo(() => mockPublishRecords.filter((r) => r.module === 'tasks'), [])

  function rollback(version: string) {
    const ok = window.confirm('回滚后将以旧版本作为下一个发布版本，是否确认？\n\n提示：仅生成新版本，不直接改当前终端缓存。')
    if (!ok) return
    window.alert(`原型占位：已基于 ${version} 生成下一发布版本`)
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="text-xs font-bold text-slate-500">配置中心 / 任务设定 / 发布记录</div>
          <h1 className="mt-2 text-2xl font-black tracking-tight">任务发布记录</h1>
          {taskId && (
            <div className="mt-2 text-xs text-slate-600">
              当前筛选任务：<span className="font-mono">{taskId}</span>（原型占位：记录按模块展示）
            </div>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Link href="/admin/config/tasks">
            <Button tone="secondary">返回列表</Button>
          </Link>
        </div>
      </div>

      <div className="rounded-2xl bg-white ring-1 ring-slate-200">
        <div className="border-b border-slate-100 p-4">
          <div className="text-sm font-bold text-slate-900">版本记录</div>
          <div className="mt-1 text-xs text-slate-500">查看每次任务规则发布时间、版本与发布说明。</div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-[900px] w-full text-left text-sm">
            <thead className="bg-slate-50 text-xs font-bold text-slate-600">
              <tr>
                <th className="px-4 py-3">版本号</th>
                <th className="px-4 py-3">发布时间</th>
                <th className="px-4 py-3">发布人</th>
                <th className="px-4 py-3">发布说明</th>
                <th className="px-4 py-3">任务数量</th>
                <th className="px-4 py-3">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {records.map((r) => (
                <tr key={r.id} className="hover:bg-slate-50/60">
                  <td className="px-4 py-3 font-mono text-xs">{r.version}</td>
                  <td className="px-4 py-3 text-slate-700">{r.publishedAt}</td>
                  <td className="px-4 py-3 text-slate-700">{r.publisher}</td>
                  <td className="px-4 py-3 text-slate-700">{r.changeNote}</td>
                  <td className="px-4 py-3">
                    <Tag tone="info">{r.impactCount}</Tag>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => window.alert('原型占位：查看详情')}
                        className="text-xs font-bold text-slate-700 hover:text-slate-900"
                      >
                        查看详情
                      </button>
                      <button
                        type="button"
                        onClick={() => rollback(r.version)}
                        className="text-xs font-bold text-slate-700 hover:text-slate-900"
                      >
                        回滚
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

