'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Button, Input, Tag } from '@/components/admin/AdminPrimitives'

export default function HomeBrandListPage() {
  const [brands, setBrands] = useState([
    {
      id: '1',
      mainTitle: '晋江文旅品牌馆',
      layout: '两列一排',
      cardCount: 2,
      status: 'published',
      city: '晋江',
      sort: 1,
      updatedAt: '2024-03-12',
    },
    {
      id: '2',
      mainTitle: '小黄鹿学园',
      layout: '单列多排',
      cardCount: 3,
      status: 'draft',
      city: '厦门',
      sort: 2,
      updatedAt: '2024-03-11',
    },
  ])

  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null)
  const [q, setQ] = useState('')
  const [cityFilter, setCityFilter] = useState('')

  const toggleStatus = (id: string) => {
    setBrands(prev => prev.map(b => b.id === id ? { ...b, status: b.status === 'published' ? 'draft' : 'published' } : b))
  }

  const deleteBrand = (id: string) => {
    setBrands(prev => prev.filter(b => b.id !== id))
    setShowDeleteConfirm(null)
  }

  const updateSort = (id: string, newSort: number) => {
    const maxSort = brands.length
    if (isNaN(newSort) || newSort < 1 || newSort > maxSort) return
    const brand = brands.find(b => b.id === id)
    if (!brand || brand.sort === newSort) return
    const oldSort = brand.sort
    setBrands(prev => prev.map(b => {
      if (b.id === id) return { ...b, sort: newSort }
      if (newSort < oldSort && b.sort >= newSort && b.sort < oldSort) return { ...b, sort: b.sort + 1 }
      if (newSort > oldSort && b.sort > oldSort && b.sort <= newSort) return { ...b, sort: b.sort - 1 }
      return b
    }))
  }

  const cities = Array.from(new Set(brands.map(b => b.city))).sort()

  const rows = brands
    .filter(b => {
      const kw = q.trim()
      return (!kw || b.mainTitle.includes(kw)) && (!cityFilter || b.city === cityFilter)
    })
    .sort((a, b) => a.sort - b.sort)

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="text-xs font-bold text-slate-500">前台管理 / 首页热门菜单</div>
          <h1 className="mt-2 text-2xl font-black tracking-tight">首页热门菜单</h1>
          <p className="mt-1 text-sm text-slate-600">管理小程序首页的热门菜单展示：菜单标题、卡片布局、排序位置与发布状态。</p>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/admin"><Button tone="secondary">返回后台首页</Button></Link>
          <Link href="/admin/home-brand/create"><Button>新增菜单</Button></Link>
        </div>
      </div>

      {/* 筛选栏 */}
      <div className="rounded-2xl bg-white p-4 ring-1 ring-slate-200">
        <div className="grid gap-3 md:grid-cols-12">
          <div className="md:col-span-4">
            <div className="mb-1 text-xs font-semibold text-slate-700">菜单名称搜索</div>
            <Input value={q} onChange={setQ} placeholder="搜索菜单名称" />
          </div>
          <div className="md:col-span-4">
            <div className="mb-1 text-xs font-semibold text-slate-700">城市筛选</div>
            <select
              value={cityFilter}
              onChange={(e) => setCityFilter(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
            >
              <option value="">全部城市</option>
              {cities.map(city => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </div>
          <div className="md:col-span-4 flex items-end justify-end gap-2">
            <Button tone="secondary" onClick={() => null}>查询</Button>
            <Button tone="ghost" onClick={() => { setQ(''); setCityFilter('') }}>重置</Button>
          </div>
        </div>
      </div>

      {/* 列表 */}
      <div className="rounded-2xl bg-white ring-1 ring-slate-200">
        <div className="border-b border-slate-100 p-4">
          <div className="text-sm font-bold text-slate-900">热门菜单列表</div>
          <div className="mt-1 text-xs text-slate-500">共 {rows.length} 条，排序数字越小越靠前</div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full w-full text-left text-sm">
            <thead className="bg-slate-50 text-xs font-bold text-slate-600">
              <tr>
                <th className="px-3 py-3 sm:px-4">标题</th>
                <th className="px-3 py-3 sm:px-4">城市</th>
                <th className="hidden md:table-cell px-3 py-3 sm:px-4">布局</th>
                <th className="hidden md:table-cell px-3 py-3 sm:px-4">卡片数</th>
                <th className="px-3 py-3 sm:px-4 text-center">首页排序</th>
                <th className="px-3 py-3 sm:px-4 text-center">展示开关</th>
                <th className="hidden lg:table-cell px-3 py-3 sm:px-4">更新时间</th>
                <th className="px-3 py-3 sm:px-4">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {rows.map((brand) => (
                <tr key={brand.id} className="hover:bg-slate-50/60">
                  <td className="px-3 py-3 sm:px-4">
                    <div className="font-bold text-slate-900">{brand.mainTitle}</div>
                  </td>
                  <td className="px-3 py-3 sm:px-4">
                    <Tag tone="info">{brand.city}</Tag>
                  </td>
                  <td className="hidden md:table-cell px-3 py-3 sm:px-4">
                    <Tag tone="neutral">{brand.layout}</Tag>
                  </td>
                  <td className="hidden md:table-cell px-3 py-3 sm:px-4">
                    <span className="font-semibold text-slate-900">{brand.cardCount}</span>
                    <span className="ml-1 text-xs text-slate-500">张</span>
                  </td>
                  {/* 排序输入 */}
                  <td className="px-3 py-3 sm:px-4 text-center">
                    <input
                      type="number"
                      min={1}
                      max={brands.length}
                      value={brand.sort}
                      onChange={(e) => updateSort(brand.id, parseInt(e.target.value))}
                      className="w-16 rounded-lg border border-slate-300 px-2 py-1.5 text-center text-sm font-semibold focus:border-blue-500 focus:outline-none"
                    />
                  </td>
                  {/* 展示开关 */}
                  <td className="px-3 py-3 sm:px-4">
                    <div className="flex flex-col items-center gap-1">
                      <button
                        onClick={() => toggleStatus(brand.id)}
                        className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors duration-200 focus:outline-none ${
                          brand.status === 'published' ? 'bg-green-500' : 'bg-slate-300'
                        }`}
                      >
                        <span
                          className={`inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition-transform duration-200 ${
                            brand.status === 'published' ? 'translate-x-5' : 'translate-x-0'
                          }`}
                        />
                      </button>
                      <span className={`text-[10px] font-semibold ${
                        brand.status === 'published' ? 'text-green-600' : 'text-slate-400'
                      }`}>
                        {brand.status === 'published' ? '已发布' : '已关闭'}
                      </span>
                    </div>
                  </td>
                  <td className="hidden lg:table-cell px-3 py-3 sm:px-4 text-slate-700">{brand.updatedAt}</td>
                  <td className="px-3 py-3 sm:px-4">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <Link href={`/admin/home-brand/${brand.id}`}>
                        <Button tone="secondary">编辑</Button>
                      </Link>
                      <Button tone="danger" onClick={() => setShowDeleteConfirm(brand.id)}>删除</Button>
                    </div>
                  </td>
                </tr>
              ))}
              {rows.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-3 py-10 text-center text-sm text-slate-500 sm:px-4">暂无数据</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-[420px] rounded-2xl bg-white p-6 shadow-lg ring-1 ring-slate-200">
            <h3 className="text-lg font-black">确认删除</h3>
            <p className="mt-2 text-sm text-slate-600">删除后无法恢复，确认删除吗？</p>
            <div className="mt-5 flex gap-2 justify-end">
              <Button tone="secondary" onClick={() => setShowDeleteConfirm(null)}>取消</Button>
              <Button tone="danger" onClick={() => deleteBrand(showDeleteConfirm)}>确认删除</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
