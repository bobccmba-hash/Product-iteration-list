'use client'

import Link from 'next/link'
import { use } from 'react'
import { Button, Tag } from '@/components/admin/AdminPrimitives'

function mockSectionById(id: string) {
  const now = '2026-03-13 10:20'
  if (id === '2') {
    return {
      id,
      iconImage: '',
      mainTitle: '小黄鹿学园',
      syncCity: '西安区',
      layout: '单列多排',
      status: 'draft' as const,
      createdAt: '2026-03-08 09:10',
      updatedAt: now,
      cards: [
        { id: 'c1', title: '安全第一课', image: '', jumpType: 'page', jumpTarget: '/pages/safe/index' },
        { id: 'c2', title: '小黄鹿练习营', image: '', jumpType: 'miniprogram', jumpTarget: 'wx1234567890abcdef' },
        { id: 'c3', title: '家长课堂', image: '', jumpType: 'external-link', jumpTarget: 'https://example.com' },
      ],
    }
  }
  return {
    id,
    iconImage: '',
    mainTitle: '晋江文旅品牌馆',
    syncCity: '晋江区',
    layout: '两列一排',
    status: 'published' as const,
    createdAt: '2026-03-10 11:20',
    updatedAt: now,
    cards: [
      { id: 'c1', title: '晋江清新旅游', image: '', jumpType: 'page', jumpTarget: '/pages/travel/index' },
      { id: 'c2', title: '晋江美食文化', image: '', jumpType: 'wechat-article', jumpTarget: 'https://mp.weixin.qq.com/...' },
    ],
  }
}

function jumpTypeLabel(t: string) {
  switch (t) {
    case 'page':
      return '跳转页面'
    case 'miniprogram':
      return '跳转小程序'
    case 'wechat-article':
      return '公众号文章'
    case 'external-link':
      return '外部链接'
    default:
      return t
  }
}

export default function HomeBrandDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const section = mockSectionById(id)

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="text-xs font-bold text-slate-500">前台管理 / 首页品牌管理 / 详情</div>
          <h1 className="mt-2 text-2xl font-black tracking-tight">品牌区域详情</h1>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <Tag tone={section.status === 'published' ? 'success' : 'neutral'}>{section.status === 'published' ? '已发布' : '草稿'}</Tag>
            <Tag tone="info">{section.layout}</Tag>
            <Tag tone="neutral">{section.cards.length} 张卡片</Tag>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/admin/home-brand">
            <Button tone="secondary">返回列表</Button>
          </Link>
          <Link href={`/admin/home-brand/${section.id}`}>
            <Button>去编辑</Button>
          </Link>
        </div>
      </div>

      <div className="rounded-2xl bg-white p-5 ring-1 ring-slate-200">
        <div className="flex items-start gap-4">
          <div className="h-14 w-14 rounded-xl bg-slate-100 ring-1 ring-slate-200" />
          <div className="min-w-0 flex-1">
            <div className="text-lg font-black text-slate-900">{section.mainTitle}</div>
            <div className="mt-2 grid gap-2 text-sm text-slate-700 sm:grid-cols-4">
              <div>
                <div className="text-xs font-bold text-slate-500">同步城市</div>
                <div className="font-semibold">{section.syncCity ?? '—'}</div>
              </div>
              <div>
                <div className="text-xs font-bold text-slate-500">创建时间</div>
                <div className="font-semibold">{section.createdAt}</div>
              </div>
              <div>
                <div className="text-xs font-bold text-slate-500">更新时间</div>
                <div className="font-semibold">{section.updatedAt}</div>
              </div>
              <div>
                <div className="text-xs font-bold text-slate-500">区域ID</div>
                <div className="font-mono text-xs">{section.id}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-2xl bg-white ring-1 ring-slate-200">
        <div className="border-b border-slate-100 p-4">
          <div className="text-sm font-bold text-slate-900">卡片配置</div>
          <div className="mt-1 text-xs text-slate-500">按前台展示顺序列出。图片/跳转目标为原型占位。</div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full w-full text-left text-sm">
            <thead className="bg-slate-50 text-xs font-bold text-slate-600">
              <tr>
                <th className="px-3 py-3 sm:px-4">序号</th>
                <th className="px-3 py-3 sm:px-4">标题</th>
                <th className="hidden md:table-cell px-3 py-3 sm:px-4">跳转类型</th>
                <th className="hidden lg:table-cell px-3 py-3 sm:px-4">跳转目标</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {section.cards.map((c, idx) => (
                <tr key={c.id} className="hover:bg-slate-50/60">
                  <td className="px-3 py-3 sm:px-4 text-slate-600">{idx + 1}</td>
                  <td className="px-3 py-3 sm:px-4 font-semibold text-slate-900">{c.title || '—'}</td>
                  <td className="hidden md:table-cell px-3 py-3 sm:px-4">
                    <Tag tone="neutral">{jumpTypeLabel(c.jumpType)}</Tag>
                  </td>
                  <td className="hidden lg:table-cell px-3 py-3 sm:px-4 text-slate-700">{c.jumpTarget || '—'}</td>
                </tr>
              ))}
              {section.cards.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-3 py-10 text-center text-sm text-slate-500 sm:px-4">
                    暂无卡片
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

