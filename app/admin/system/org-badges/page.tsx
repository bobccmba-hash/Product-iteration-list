'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button, Input, Select, Tag } from '@/components/admin/AdminPrimitives'

type BadgeRow = {
  id: string
  code: string
  name: string
  displayText?: string
  color?: string
  status: 'enabled' | 'disabled'
  sort: number
  useCount: number
  createdAt: string
}

const statusOptions = [
  { value: 'all', label: '全部' },
  { value: 'enabled', label: '启用' },
  { value: 'disabled', label: '禁用' },
]

export default function OrgBadgeListPage() {
  const [rows, setRows] = useState<BadgeRow[]>([
    {
      id: '1',
      code: 'blue_v',
      name: '蓝V认证',
      displayText: '官方认证',
      color: '#2563eb',
      status: 'enabled',
      sort: 10,
      useCount: 6,
      createdAt: '2026-03-01 10:00',
    },
    {
      id: '2',
      code: 'red_v',
      name: '红V认证',
      displayText: '重点推荐',
      color: '#dc2626',
      status: 'enabled',
      sort: 20,
      useCount: 2,
      createdAt: '2026-03-02 09:20',
    },
    {
      id: '3',
      code: 'campaign_newyear',
      name: '新春活动',
      displayText: '限时活动',
      color: '#f97316',
      status: 'disabled',
      sort: 30,
      useCount: 0,
      createdAt: '2026-02-01 08:00',
    },
  ])

  const [keyword, setKeyword] = useState('')
  const [status, setStatus] = useState('all')
  const [showAddModal, setShowAddModal] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [newBadge, setNewBadge] = useState({ name: '', displayText: '', color: '#2563eb', sort: 10 })

  const filtered = rows.filter((r) => {
    const kw = keyword.trim()
    if (kw && !r.name.includes(kw) && !r.code.includes(kw)) return false
    if (status === 'enabled' && r.status !== 'enabled') return false
    if (status === 'disabled' && r.status !== 'disabled') return false
    return true
  })

  const handleAddBadge = () => {
    if (!newBadge.name.trim()) {
      alert('请填写标识名称')
      return
    }
    if (editingId) {
      setRows(rows.map(r => r.id === editingId ? { ...r, name: newBadge.name, displayText: newBadge.displayText, color: newBadge.color, sort: newBadge.sort } : r))
      setEditingId(null)
    } else {
      const code = `badge_${Date.now()}`
      const badge: BadgeRow = {
        id: `${Date.now()}`,
        code: code,
        name: newBadge.name,
        displayText: newBadge.displayText,
        color: newBadge.color,
        status: 'enabled',
        sort: newBadge.sort,
        useCount: 0,
        createdAt: new Date().toLocaleString('zh-CN'),
      }
      setRows([...rows, badge])
    }
    setNewBadge({ name: '', displayText: '', color: '#2563eb', sort: 10 })
    setShowAddModal(false)
  }

  const handleEditBadge = (id: string) => {
    const badge = rows.find(r => r.id === id)
    if (badge) {
      setNewBadge({ name: badge.name, displayText: badge.displayText || '', color: badge.color || '#2563eb', sort: badge.sort })
      setEditingId(id)
      setShowAddModal(true)
    }
  }

  const handleDeleteBadge = (id: string) => {
    if (confirm('确认删除该标识吗？')) {
      setRows(rows.filter(r => r.id !== id))
    }
  }

  const handleToggleStatus = (id: string) => {
    setRows(rows.map(r => r.id === id ? { ...r, status: r.status === 'enabled' ? 'disabled' : 'enabled' } : r))
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="text-xs font-bold text-slate-500">系统管理 / 系统机构管理</div>
          <h1 className="mt-2 text-2xl font-black tracking-tight">认证标识管理</h1>
          <p className="mt-1 text-sm text-slate-600">
            管理机构的认证/推荐/活动标识，用图标 + 色值 + 展示文字组合呈现，支撑前台的“蓝V/红V”等视觉与筛选逻辑。
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/admin">
            <Button tone="secondary">返回后台首页</Button>
          </Link>
          <Button onClick={() => setShowAddModal(true)}>+ 新增标识</Button>
        </div>
      </div>

      <div className="rounded-2xl bg-white p-4 ring-1 ring-slate-200">
        <div className="grid gap-3 md:grid-cols-6">
          <div className="md:col-span-3">
            <div className="mb-1 text-xs font-semibold text-slate-700">搜索</div>
            <Input value={keyword} onChange={setKeyword} placeholder="请输入标识名称 / 编码" />
          </div>
          <div>
            <div className="mb-1 text-xs font-semibold text-slate-700">状态</div>
            <Select value={status} onChange={setStatus} options={statusOptions} />
          </div>
          <div className="md:col-span-2 flex items-end justify-end gap-2">
            <Button tone="secondary" onClick={() => null}>
              查询
            </Button>
            <Button
              tone="ghost"
              onClick={() => {
                setKeyword('')
                setStatus('all')
              }}
            >
              重置
            </Button>
          </div>
        </div>
      </div>

      <div className="rounded-2xl bg-white ring-1 ring-slate-200">
        <div className="border-b border-slate-100 p-4">
          <div className="text-sm font-bold text-slate-900">认证标识列表</div>
          <div className="mt-1 text-xs text-slate-500">共 {filtered.length} 条记录（原型数据，仅用于字段与交互规划）。</div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full w-full text-left text-sm">
            <thead className="bg-slate-50 text-xs font-bold text-slate-600">
              <tr>
                <th className="px-3 py-3 sm:px-4 w-20">排序</th>
                <th className="px-3 py-3 sm:px-4">标识预览</th>
                <th className="px-3 py-3 sm:px-4">标识名称</th>
                <th className="px-3 py-3 sm:px-4">状态</th>
                <th className="hidden md:table-cell px-3 py-3 sm:px-4">使用次数</th>
                <th className="hidden lg:table-cell px-3 py-3 sm:px-4">创建时间</th>
                <th className="px-3 py-3 sm:px-4">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((r) => (
                <tr key={r.id} className="hover:bg-slate-50/60">
                  <td className="px-3 py-3 sm:px-4 align-top">
                    <input
                      type="number"
                      value={r.sort}
                      className="h-8 w-16 rounded border border-slate-300 px-2 text-xs"
                      readOnly
                    />
                  </td>
                  <td className="px-3 py-3 sm:px-4 align-top">
                    <div className="inline-flex items-center gap-2 rounded-full bg-slate-50 px-3 py-1.5">
                      <span
                        className="inline-flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold text-white"
                        style={{ backgroundColor: r.color ?? '#64748b' }}
                      >
                        V
                      </span>
                      <span className="text-xs text-slate-800">{r.displayText ?? '—'}</span>
                    </div>
                  </td>
                  <td className="px-3 py-3 sm:px-4 align-top">
                    <div className="font-semibold text-slate-900">{r.name}</div>
                  </td>
                  <td className="px-3 py-3 sm:px-4 align-top">
                    <button onClick={() => handleToggleStatus(r.id)} className="rounded-lg px-3 py-1.5 text-xs font-bold transition" style={{
                      backgroundColor: r.status === 'enabled' ? '#10b981' : '#e5e7eb',
                      color: r.status === 'enabled' ? 'white' : '#6b7280'
                    }}>
                      {r.status === 'enabled' ? '开启' : '关闭'}
                    </button>
                  </td>
                  <td className="hidden md:table-cell px-3 py-3 sm:px-4 align-top">
                    {r.useCount > 0 ? (
                      <button className="text-xs font-semibold text-indigo-600 hover:underline">
                        {r.useCount} 个机构
                      </button>
                    ) : (
                      <span className="text-xs text-slate-400">0</span>
                    )}
                  </td>
                  <td className="hidden lg:table-cell px-3 py-3 sm:px-4 align-top text-xs text-slate-700">
                    {r.createdAt}
                  </td>
                  <td className="px-3 py-3 sm:px-4 align-top">
                    <div className="flex flex-wrap gap-2 text-xs">
                      <button onClick={() => handleEditBadge(r.id)} className="text-slate-700 hover:text-slate-900">编辑</button>
                      {r.useCount === 0 ? (
                        <button onClick={() => handleDeleteBadge(r.id)} className="text-rose-600 hover:text-rose-700">删除</button>
                      ) : (
                        <button className="cursor-not-allowed text-slate-300" title="该标识已被机构使用，无法删除">
                          删除
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-3 py-10 text-center text-sm text-slate-500 sm:px-4">
                    暂无数据
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-lg">
            <h3 className="text-lg font-bold">{editingId ? '编辑标识' : '新增标识'}</h3>
            <div className="mt-4 space-y-4">
              <div>
                <label className="block text-sm font-bold mb-1">标识名称</label>
                <input
                  type="text"
                  value={newBadge.name}
                  onChange={(e) => setNewBadge({ ...newBadge, name: e.target.value })}
                  placeholder="例如：蓝V认证"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-bold mb-1">展示文字</label>
                <input
                  type="text"
                  value={newBadge.displayText}
                  onChange={(e) => setNewBadge({ ...newBadge, displayText: e.target.value })}
                  placeholder="例如：官方认证"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-bold mb-1">标识图片</label>
                <input
                  type="file"
                  accept="image/*"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-bold mb-1">排序</label>
                <input
                  type="number"
                  value={newBadge.sort}
                  onChange={(e) => setNewBadge({ ...newBadge, sort: parseInt(e.target.value) })}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                />
              </div>
            </div>
            <div className="mt-6 flex gap-3">
              <button
                onClick={() => {
                  setShowAddModal(false)
                  setEditingId(null)
                  setNewBadge({ name: '', displayText: '', color: '#2563eb', sort: 10 })
                }}
                className="flex-1 rounded-lg bg-slate-200 px-4 py-2 text-sm font-bold text-slate-700 hover:bg-slate-300"
              >
                取消
              </button>
              <button
                onClick={handleAddBadge}
                className="flex-1 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-bold text-white hover:bg-indigo-700"
              >
                {editingId ? '保存' : '确认'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

