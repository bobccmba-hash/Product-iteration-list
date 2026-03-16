'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useMemo } from 'react'
import { Button, Tag } from '@/components/admin/AdminPrimitives'
import { mockTasks } from '@/utils/adminMock'

export default function TaskPreviewPage() {
  const params = useParams<{ taskId: string }>()
  const taskId = params.taskId
  const task = useMemo(() => mockTasks.find((t) => t.id === taskId) ?? null, [taskId])

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="text-xs font-bold text-slate-500">配置中心 / 任务设定 / 预览</div>
          <h1 className="mt-2 text-2xl font-black tracking-tight">任务预览</h1>
          <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-slate-600">
            <span className="font-mono">{taskId}</span>
            <Tag tone={task?.status === 'published' ? 'success' : task?.status === 'disabled' ? 'danger' : 'warning'}>
              {task?.status === 'published' ? '已发布' : task?.status === 'disabled' ? '已停用' : '草稿'}
            </Tag>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Link href={`/admin/config/tasks/${taskId}/edit`}>
            <Button tone="secondary">返回编辑</Button>
          </Link>
          <Link href="/admin/config/tasks">
            <Button tone="secondary">返回列表</Button>
          </Link>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-[7fr_3fr]">
        <div className="rounded-2xl bg-white p-5 ring-1 ring-slate-200">
          <div className="text-sm font-black text-slate-900">终端场景预览（占位）</div>
          <div className="mt-1 text-xs text-slate-500">覆盖：互动前提示 / 互动结束推进 / 完成高光 / 新任务开启。</div>

          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <SceneCard title="互动前任务提示" body={<div className="text-sm font-semibold text-slate-800">完成这次互动可推进任务：{task?.name ?? '—'}</div>} />
            <SceneCard
              title="互动结束任务推进页"
              body={
                <div className="space-y-2">
                  <div className="text-xs font-bold text-slate-500">本次推进</div>
                  <div className="text-sm font-black text-slate-900">+1</div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
                    <div className="h-full w-[60%] rounded-full bg-slate-900" />
                  </div>
                  <div className="text-xs text-slate-600">当前进度 3 / 5</div>
                </div>
              }
            />
            <SceneCard
              title="任务完成高光页"
              tone="highlight"
              body={
                <div className="space-y-2">
                  <div className="text-xs font-bold text-white/70">完成啦！</div>
                  <div className="text-lg font-black text-white">{task?.name ?? '—'}</div>
                  <div className="text-xs text-white/80">奖励已发放（示例）</div>
                </div>
              }
            />
            <SceneCard title="新任务开启页" body={<div className="text-sm font-semibold text-slate-800">新任务：继续挑战下一目标（占位）</div>} />
          </div>
        </div>

        <div className="rounded-2xl bg-white p-5 ring-1 ring-slate-200">
          <div className="text-sm font-black text-slate-900">配置摘要</div>
          <div className="mt-4 space-y-3 text-sm text-slate-700">
            <Row k="任务名称" v={task?.name ?? '—'} />
            <Row k="任务编码" v={task?.code ?? '—'} mono />
            <Row k="任务类型" v={task?.type ?? '—'} />
            <Row k="周期" v={task?.cycle ?? '—'} />
            <Row k="奖励内容" v={task?.rewardSummary ?? '—'} />
            <Row k="分发方式" v={task?.distribution ?? '—'} />
            <Row k="适用范围" v={task?.scopeSummary ?? '—'} />
            <Row k="离线支持" v={task?.offline === 'supported' ? '支持' : '不支持'} />
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            <Link href={`/admin/config/tasks/${taskId}/rules-rewards`}>
              <Button tone="secondary">条件与奖励</Button>
            </Link>
            <Link href={`/admin/config/tasks/${taskId}/distribution`}>
              <Button tone="secondary">分发策略</Button>
            </Link>
            <Button onClick={() => window.alert('原型占位：发布任务（需要权限）')}>发布</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

function SceneCard({
  title,
  body,
  tone = 'normal',
}: {
  title: string
  body: React.ReactNode
  tone?: 'normal' | 'highlight'
}) {
  return (
    <div className={`rounded-2xl p-5 ring-1 ${tone === 'highlight' ? 'bg-slate-900 ring-slate-900' : 'bg-slate-50 ring-slate-200'}`}>
      <div className={`text-xs font-bold ${tone === 'highlight' ? 'text-white/70' : 'text-slate-500'}`}>{title}</div>
      <div className="mt-3">{body}</div>
    </div>
  )
}

function Row({ k, v, mono }: { k: string; v: string; mono?: boolean }) {
  return (
    <div className="flex items-start justify-between gap-3">
      <div className="text-xs font-bold text-slate-500">{k}</div>
      <div className={`text-right text-sm font-semibold text-slate-900 ${mono ? 'font-mono text-xs' : ''}`}>{v}</div>
    </div>
  )
}

