'use client'

import Link from 'next/link'
import { useState, useMemo, useEffect } from 'react'
import { Button, Tag } from '@/components/admin/AdminPrimitives'
import { type RankingConfig, type RankingStatus } from '@/utils/rankingMock'
import { rankingStore } from '@/utils/rankingStore'

export default function RankingListPage() {
  const [configs, setConfigs] = useState<RankingConfig[]>(() => rankingStore.getConfigs())
  const [statusFilter, setStatusFilter] = useState<RankingStatus | ''>('')
  const [enabledFilter, setEnabledFilter] = useState<'all' | 'enabled' | 'disabled'>('all')

  useEffect(() => {
    return rankingStore.subscribe(() => {
      setConfigs([...rankingStore.getConfigs()])
    })
  }, [])

  const filteredConfigs = useMemo(() => {
    return configs.filter((c) => {
      if (statusFilter && c.status !== statusFilter) return false
      if (enabledFilter === 'enabled' && !c.displayEnabled) return false
      if (enabledFilter === 'disabled' && c.displayEnabled) return false
      return true
    })
  }, [configs, statusFilter, enabledFilter])

  const handleToggleEnabled = (id: string) => {
    rankingStore.toggleEnabled(id)
  }

  const handleReset = () => {
    setStatusFilter('')
    setEnabledFilter('all')
  }

  return (
    <div className="space-y-5">
      {/* 顶部 */}
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="text-xs font-bold text-slate-500">系统入口 / 学习之星配置</div>
          <h1 className="mt-2 text-2xl font-black tracking-tight">学习之星配置</h1>
          <p className="mt-1 text-sm text-slate-500">
            配置针对单个游戏的学习之星规则，开启后再推送到指定终端生效。<br />
            学习之星按<span className="font-bold text-slate-700">单次游戏分数</span>展示，每个游戏独立计算，不跨游戏合并。
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/v1.9.0">
            <Button tone="secondary">返回首页</Button>
          </Link>
          <Link href="/admin/ranking/create">
            <Button tone="primary">新建学习之星配置</Button>
          </Link>
        </div>
      </div>

      {/* 规则说明卡片 */}
      <div className="rounded-2xl bg-blue-50 p-4 ring-1 ring-blue-100">
        <div className="flex items-start gap-3">
          <div className="text-xl">ℹ️</div>
          <div className="text-sm text-blue-800">
            <div className="mb-1 font-black">学习之星配置说明</div>
            <ul className="space-y-1 text-xs leading-relaxed">
              <li>• 每条配置对应一个<span className="font-bold">互动游戏</span>的学习之星规则，不绑定具体学校</li>
              <li>• 学习之星按<span className="font-bold">单次游戏得分</span>展示，同一学生只取历史最高分参与展示</li>
              <li>• 不同游戏之间的分数<span className="font-bold">相互独立</span>，不合并计算</li>
              <li>• 配置完成后需<span className="font-bold">开启 → 推送终端</span>才会在对应学校的终端上展示</li>
              <li>• 关闭开关后，终端立即停止展示该游戏的学习之星内容</li>
            </ul>
          </div>
        </div>
      </div>

      {/* 筛选区 */}
      <div className="rounded-2xl bg-white p-4 ring-1 ring-slate-200">
        <div className="flex flex-wrap items-end gap-3">
          <div className="flex-1 min-w-[180px]">
            <label className="mb-1 block text-xs font-bold text-slate-600">配置状态</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as RankingStatus | '')}
              className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm focus:border-slate-400 focus:outline-none"
            >
              <option value="">全部状态</option>
              <option value="draft">草稿</option>
              <option value="published">已发布</option>
              <option value="disabled">已停用</option>
            </select>
          </div>
          <div className="flex-1 min-w-[180px]">
            <label className="mb-1 block text-xs font-bold text-slate-600">开启状态</label>
            <select
              value={enabledFilter}
              onChange={(e) => setEnabledFilter(e.target.value as 'all' | 'enabled' | 'disabled')}
              className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm focus:border-slate-400 focus:outline-none"
            >
              <option value="all">全部</option>
              <option value="enabled">已开启</option>
              <option value="disabled">已关闭</option>
            </select>
          </div>
          <Button tone="primary" onClick={() => {}}>查询</Button>
          <Button tone="secondary" onClick={handleReset}>重置</Button>
        </div>
      </div>

      {/* 列表 */}
      <div className="rounded-2xl bg-white ring-1 ring-slate-200">
        <div className="overflow-x-auto">
          <table className="min-w-[1100px] w-full text-left text-sm">
            <thead className="bg-slate-50 text-xs font-bold text-slate-600">
              <tr>
                <th className="px-4 py-3">配置名称</th>
                <th className="px-4 py-3">展示依据</th>
                <th className="px-4 py-3">展示人数</th>
                <th className="px-4 py-3">开启状态</th>
                <th className="px-4 py-3">当前使用终端数</th>
                <th className="px-4 py-3">配置状态</th>
                <th className="px-4 py-3">更新时间</th>
                <th className="px-4 py-3">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredConfigs.map((config) => (
                <tr key={config.id} className="hover:bg-slate-50/60">
                  <td className="px-4 py-3">
                    <div className="font-semibold text-slate-900">{config.name}</div>
                    <div className="mt-0.5 text-xs text-slate-500"> ID: {config.id}</div>
                  </td>
                  <td className="px-4 py-3 text-slate-700">单次游戏最高分</td>
                  <td className="px-4 py-3 text-slate-700">前 {config.topN} 位</td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => handleToggleEnabled(config.id)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        config.displayEnabled ? 'bg-emerald-500' : 'bg-slate-200'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${
                          config.displayEnabled ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                    <div className={`mt-1 text-[10px] font-bold ${
                      config.displayEnabled ? 'text-emerald-600' : 'text-slate-400'
                    }`}>
                      {config.displayEnabled ? '已开启' : '已关闭'}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5">
                      <span className={`text-xl font-black ${
                        config.activeTerminalCount > 0 ? 'text-slate-900' : 'text-slate-300'
                      }`}>
                        {config.activeTerminalCount}
                      </span>
                      <span className="text-xs text-slate-500">台</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <Tag
                      tone={
                        config.status === 'published' ? 'success' :
                        config.status === 'draft' ? 'warning' : 'neutral'
                      }
                    >
                      {config.status === 'published' ? '已发布' :
                       config.status === 'draft' ? '草稿' : '已停用'}
                    </Tag>
                  </td>
                  <td className="px-4 py-3 text-xs text-slate-600">{config.updatedAt}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Link href={`/admin/ranking/${config.id}/edit`}>
                        <button className="text-xs font-bold text-slate-600 hover:text-slate-900">编辑</button>
                      </Link>
                      <Link href={`/admin/ranking/${config.id}/devices`}>
                        <button className={`text-xs font-bold ${
                          config.displayEnabled
                            ? 'text-blue-600 hover:text-blue-800'
                            : 'cursor-not-allowed text-slate-300'
                        }`}>
                          推送终端
                        </button>
                      </Link>
                      <Link href={`/admin/ranking/${config.id}/preview`}>
                        <button className="text-xs font-bold text-slate-600 hover:text-slate-900">预览</button>
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {filteredConfigs.length === 0 && (
        <div className="rounded-2xl bg-white p-12 text-center ring-1 ring-slate-200">
          <div className="text-4xl mb-3">📊</div>
          <div className="text-sm font-bold text-slate-600">暂无学习之星配置</div>
          <div className="mt-1 text-xs text-slate-500">请点击右上角"新建学习之星配置"开始创建</div>
        </div>
      )}
    </div>
  )
}
