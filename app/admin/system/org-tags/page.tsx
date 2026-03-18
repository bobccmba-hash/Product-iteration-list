'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button, Input, Select } from '@/components/admin/AdminPrimitives'

type TagRow = {
  id: string
  code: string
  name: string
  sort: number
  useCount: number
  createdAt: string
  updatedAt: string
}

export default function OrgTagListPage() {
  const [rows, setRows] = useState<TagRow[]>([
    {
      id: '1',
      code: 'popular',
      name: '人气机构',
      sort: 10,
      useCount: 8,
      createdAt: '2026-03-01 10:00',
      updatedAt: '2026-03-08 15:30',
    },
    {
      id: '2',
      code: 'science_base',
      name: '科普基地',
      sort: 20,
      useCount: 3,
      createdAt: '2026-03-02 09:20',
      updatedAt: '2026-03-07 18:10',
    },
  ])

  const [keyword, setKeyword] = useState('')
  const [showAddModal, setShowAddModal] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [newTag, setNewTag] = useState({ name: '', sort: 10 })
  const [showOrgModal, setShowOrgModal] = useState(false)
  const [selectedTagId, setSelectedTagId] = useState<string | null>(null)

  // 模拟机构数据
  const orgData: Record<string, Array<{ id: string; name: string; tag: string }>> = {
    '1': [
      { id: 'org1', name: '晋江市教育局', tag: '人气机构' },
      { id: 'org2', name: '晋江市第一中学', tag: '人气机构' },
      { id: 'org3', name: '晋江市第二中学', tag: '人气机构' },
      { id: 'org4', name: '晋江市教师进修学校', tag: '人气机构' },
      { id: 'org5', name: '晋江市教科所', tag: '人气机构' },
      { id: 'org6', name: '晋江市教育信息中心', tag: '人气机构' },
      { id: 'org7', name: '晋江市学生资助中心', tag: '人气机构' },
      { id: 'org8', name: '晋江市教育考试中心', tag: '人气机构' },
    ],
    '2': [
      { id: 'org9', name: '晋江科技馆', tag: '科普基地' },
      { id: 'org10', name: '晋江自然博物馆', tag: '科普基地' },
      { id: 'org11', name: '晋江植物园', tag: '科普基地' },
    ],
  }

  const filtered = rows.filter((r) => {
    const kw = keyword.trim()
    if (kw && !r.name.includes(kw) && !r.code.includes(kw)) return false
    return true
  })

  const handleAddTag = () => {
    if (!newTag.name.trim()) {
      alert('请填写标签名称')
      return
    }
    if (editingId) {
      setRows(rows.map(r => r.id === editingId ? { ...r, name: newTag.name, sort: newTag.sort, updatedAt: new Date().toLocaleString('zh-CN') } : r))
      setEditingId(null)
    } else {
      const code = `tag_${Date.now()}`
      const tag: TagRow = {
        id: `${Date.now()}`,
        code: code,
        name: newTag.name,
        sort: newTag.sort,
        useCount: 0,
        createdAt: new Date().toLocaleString('zh-CN'),
        updatedAt: new Date().toLocaleString('zh-CN'),
      }
      setRows([...rows, tag])
    }
    setNewTag({ name: '', sort: 10 })
    setShowAddModal(false)
  }

  const handleEditTag = (id: string) => {
    const tag = rows.find(r => r.id === id)
    if (tag) {
      setNewTag({ name: tag.name, sort: tag.sort })
      setEditingId(id)
      setShowAddModal(true)
    }
  }

  const handleDeleteTag = (id: string) => {
    if (confirm('确认删除该标签吗？')) {
      setRows(rows.filter(r => r.id !== id))
    }
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="text-xs font-bold text-slate-500">系统管理 / 系统机构管理</div>
          <h1 className="mt-2 text-2xl font-black tracking-tight">标签管理</h1>
          <p className="mt-1 text-sm text-slate-600">
            管理机构特征标签，可按分组组织（如"特色""服务""主题"），支持多选，用于前台筛选与展示。
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/admin">
            <Button tone="secondary">返回后台首页</Button>
          </Link>
          <Button onClick={() => setShowAddModal(true)}>+ 新增标签</Button>
        </div>
      </div>

      <div className="rounded-2xl bg-white p-4 ring-1 ring-slate-200">
        <div className="grid gap-3 md:grid-cols-6">
          <div className="md:col-span-4">
            <div className="mb-1 text-xs font-semibold text-slate-700">搜索</div>
            <Input value={keyword} onChange={setKeyword} placeholder="请输入标签名称 / 编码" />
          </div>
          <div className="md:col-span-2 flex items-end justify-end gap-2">
            <Button tone="secondary">查询</Button>
            <Button tone="ghost" onClick={() => { setKeyword('') }}>重置</Button>
          </div>
        </div>
      </div>

      <div className="rounded-2xl bg-white ring-1 ring-slate-200">
        <div className="border-b border-slate-100 p-4">
          <div className="text-sm font-bold text-slate-900">标签列表</div>
          <div className="mt-1 text-xs text-slate-500">共 {filtered.length} 条记录</div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full w-full text-left text-sm">
            <thead className="bg-slate-50 text-xs font-bold text-slate-600">
              <tr>
                <th className="px-3 py-3 sm:px-4 w-20">排序</th>
                <th className="px-3 py-3 sm:px-4">标签名称</th>
                <th className="hidden md:table-cell px-3 py-3 sm:px-4">使用次数</th>
                <th className="hidden lg:table-cell px-3 py-3 sm:px-4">创建时间</th>
                <th className="hidden lg:table-cell px-3 py-3 sm:px-4">更新时间</th>
                <th className="px-3 py-3 sm:px-4">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((r) => (
                <tr key={r.id} className="hover:bg-slate-50/60">
                  <td className="px-3 py-3 sm:px-4 align-top">
                    <input type="number" value={r.sort} className="h-8 w-16 rounded border border-slate-300 px-2 text-xs" readOnly />
                  </td>
                  <td className="px-3 py-3 sm:px-4 align-top">
                    <div className="font-semibold text-slate-900">{r.name}</div>
                  </td>
                  <td className="hidden md:table-cell px-3 py-3 sm:px-4 align-top">
                    {r.useCount > 0 ? (
                      <button onClick={() => {
                        setSelectedTagId(r.id)
                        setShowOrgModal(true)
                      }} className="text-xs font-semibold text-indigo-600 hover:underline">{r.useCount} 个机构</button>
                    ) : (
                      <span className="text-xs text-slate-400">0</span>
                    )}
                  </td>
                  <td className="hidden lg:table-cell px-3 py-3 sm:px-4 align-top text-xs text-slate-700">{r.createdAt}</td>
                  <td className="hidden lg:table-cell px-3 py-3 sm:px-4 align-top text-xs text-slate-700">{r.updatedAt}</td>
                  <td className="px-3 py-3 sm:px-4 align-top">
                    <div className="flex flex-wrap gap-2 text-xs">
                      <button onClick={() => handleEditTag(r.id)} className="text-slate-700 hover:text-slate-900">编辑</button>
                      {r.useCount === 0 ? (
                        <button onClick={() => handleDeleteTag(r.id)} className="text-rose-600 hover:text-rose-700">删除</button>
                      ) : (
                        <button className="cursor-not-allowed text-slate-300" title="该标签已被使用，无法删除">删除</button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-3 py-10 text-center text-sm text-slate-500 sm:px-4">暂无数据</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showOrgModal && selectedTagId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-2xl rounded-2xl bg-white p-6 shadow-lg max-h-96 overflow-auto">
            <h3 className="text-lg font-bold mb-4">使用机构清单 - {rows.find(r => r.id === selectedTagId)?.name}</h3>
            <div className="space-y-2">
              {(orgData[selectedTagId] || []).length > 0 ? (
                <div className="space-y-2">
                  {(orgData[selectedTagId] || []).map((org) => (
                    <div key={org.id} className="flex items-center justify-between rounded-lg border border-slate-200 p-3 hover:bg-slate-50">
                      <div>
                        <p className="text-sm font-bold text-slate-900">{org.name}</p>
                        <p className="text-xs text-slate-500">{org.tag}</p>
                      </div>
                      <button className="text-xs font-bold text-indigo-600 hover:text-indigo-700">查看</button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-slate-500">暂无使用机构</div>
              )}
            </div>
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => {
                  setShowOrgModal(false)
                  setSelectedTagId(null)
                }}
                className="rounded-lg bg-slate-200 px-4 py-2 text-sm font-bold text-slate-700 hover:bg-slate-300"
              >
                关闭
              </button>
            </div>
          </div>
        </div>
      )}

      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-lg">
            <h3 className="text-lg font-bold">{editingId ? '编辑标签' : '新增标签'}</h3>
            <div className="mt-4 space-y-4">
              <div>
                <label className="block text-sm font-bold mb-1">标签名称</label>
                <input
                  type="text"
                  value={newTag.name}
                  onChange={(e) => setNewTag({ ...newTag, name: e.target.value })}
                  placeholder="例如：人气机构"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-bold mb-1">排序</label>
                <input
                  type="number"
                  value={newTag.sort}
                  onChange={(e) => setNewTag({ ...newTag, sort: parseInt(e.target.value) })}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                />
              </div>
            </div>
            <div className="mt-6 flex gap-3">
              <button
                onClick={() => {
                  setShowAddModal(false)
                  setEditingId(null)
                  setNewTag({ name: '', sort: 10 })
                }}
                className="flex-1 rounded-lg bg-slate-200 px-4 py-2 text-sm font-bold text-slate-700 hover:bg-slate-300"
              >
                取消
              </button>
              <button
                onClick={handleAddTag}
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
