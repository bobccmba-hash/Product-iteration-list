'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Button, Input, Tag } from '@/components/admin/AdminPrimitives'

export default function HomeBrandListPage() {
  const [brands, setBrands] = useState([
    {
      id: '1',
      iconImage: '',
      mainTitle: '晋江文旅品牌馆',
      subtitle: '爱晋江·拼未来',
      layout: '两列一排',
      cardCount: 2,
      status: 'published',
      createdAt: '2024-03-10',
      updatedAt: '2024-03-12',
    },
    {
      id: '2',
      iconImage: '',
      mainTitle: '小黄鹿学园',
      subtitle: '春风拂过，安全相伴',
      layout: '单列多排',
      cardCount: 3,
      status: 'draft',
      createdAt: '2024-03-08',
      updatedAt: '2024-03-11',
    },
  ])

  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null)
  const [q, setQ] = useState('')

  const toggleStatus = (id: string) => {
    setBrands(brands.map(b => b.id === id ? { ...b, status: b.status === 'published' ? 'draft' : 'published' } : b))
  }

  const deleteBrand = (id: string) => {
    setBrands(brands.filter(b => b.id !== id))
    setShowDeleteConfirm(null)
  }

  const rows = brands.filter((b) => {
    const kw = q.trim()
    if (!kw) return true
    return b.mainTitle.includes(kw) || (b.subtitle ?? '').includes(kw)
  })

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="text-xs font-bold text-slate-500">前台管理 / 首页品牌管理</div>
          <h1 className="mt-2 text-2xl font-black tracking-tight">首页品牌管理</h1>
          <p className="mt-1 text-sm text-slate-600">管理小程序首页的品牌展示区域：区域图、标题/副标题、卡片布局与发布状态。</p>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/admin">
            <Button tone="secondary">返回后台首页</Button>
          </Link>
          <Link href="/admin/home-brand/create">
            <Button>新增品牌区域</Button>
          </Link>
        </div>
      </div>

      <div className="rounded-2xl bg-white p-4 ring-1 ring-slate-200">
        <div className="grid gap-3 md:grid-cols-6">
          <div className="md:col-span-3">
            <div className="mb-1 text-xs font-semibold text-slate-700">标题搜索</div>
            <Input value={q} onChange={setQ} placeholder="搜索主标题或副标题" />
          </div>
          <div className="md:col-span-3 flex items-end justify-end gap-2">
            <Button tone="secondary" onClick={() => null}>
              查询
            </Button>
            <Button
              tone="ghost"
              onClick={() => {
                setQ('')
              }}
            >
              重置
            </Button>
          </div>
        </div>
      </div>

      <div className="rounded-2xl bg-white ring-1 ring-slate-200">
        <div className="border-b border-slate-100 p-4">
          <div className="text-sm font-bold text-slate-900">品牌区域列表</div>
          <div className="mt-1 text-xs text-slate-500">共 {rows.length} 条</div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full w-full text-left text-sm">
            <thead className="bg-slate-50 text-xs font-bold text-slate-600">
              <tr>
                <th className="px-3 py-3 sm:px-4">区域图</th>
                <th className="px-3 py-3 sm:px-4">主标题 / 副标题</th>
                <th className="hidden md:table-cell px-3 py-3 sm:px-4">布局</th>
                <th className="hidden md:table-cell px-3 py-3 sm:px-4">卡片数</th>
                <th className="px-3 py-3 sm:px-4">状态</th>
                <th className="hidden lg:table-cell px-3 py-3 sm:px-4">创建时间</th>
                <th className="hidden lg:table-cell px-3 py-3 sm:px-4">更新时间</th>
                <th className="px-3 py-3 sm:px-4">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {rows.map((brand) => (
                <tr key={brand.id} className="hover:bg-slate-50/60">
                  <td className="px-3 py-3 sm:px-4">
                    {brand.iconImage ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        alt={`${brand.mainTitle} 区域图`}
                        src={brand.iconImage}
                        className="h-10 w-10 rounded-lg object-cover ring-1 ring-slate-200"
                      />
                    ) : (
                      <div className="h-10 w-10 rounded-lg bg-slate-100 ring-1 ring-slate-200" />
                    )}
                  </td>
                  <td className="px-3 py-3 sm:px-4">
                    <div className="font-bold text-slate-900">{brand.mainTitle}</div>
                    {brand.subtitle ? <div className="mt-0.5 text-xs text-slate-500">{brand.subtitle}</div> : null}
                  </td>
                  <td className="hidden md:table-cell px-3 py-3 sm:px-4">
                    <Tag tone="info">{brand.layout}</Tag>
                  </td>
                  <td className="hidden md:table-cell px-3 py-3 sm:px-4">
                    <span className="font-semibold text-slate-900">{brand.cardCount}</span>
                    <span className="ml-1 text-xs text-slate-500">张</span>
                  </td>
                  <td className="px-3 py-3 sm:px-4">
                    <Tag tone={brand.status === 'published' ? 'success' : 'neutral'}>
                      {brand.status === 'published' ? '已发布' : '草稿'}
                    </Tag>
                  </td>
                  <td className="hidden lg:table-cell px-3 py-3 sm:px-4 text-slate-700">{brand.createdAt}</td>
                  <td className="hidden lg:table-cell px-3 py-3 sm:px-4 text-slate-700">{brand.updatedAt}</td>
                  <td className="px-3 py-3 sm:px-4">
                    <div className="flex flex-wrap items-center gap-2">
                      <Link href={`/admin/home-brand/${brand.id}/detail`}>
                        <Button tone="secondary">查看</Button>
                      </Link>
                      <Link href={`/admin/home-brand/${brand.id}`}>
                        <Button tone="secondary">编辑</Button>
                      </Link>
                      <Button
                        tone={brand.status === 'published' ? 'ghost' : 'secondary'}
                        onClick={() => toggleStatus(brand.id)}
                      >
                        {brand.status === 'published' ? '下线' : '发布'}
                      </Button>
                      <Button tone="danger" onClick={() => setShowDeleteConfirm(brand.id)}>
                        删除
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
              {rows.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-3 py-10 text-center text-sm text-slate-500 sm:px-4">
                    暂无数据
                  </td>
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
              <Button tone="secondary" onClick={() => setShowDeleteConfirm(null)}>
                取消
              </Button>
              <Button tone="danger" onClick={() => deleteBrand(showDeleteConfirm)}>
                确认删除
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
