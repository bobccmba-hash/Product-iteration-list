'use client'

import Link from 'next/link'
import { useState, use } from 'react'
import { Button } from '@/components/admin/AdminPrimitives'

export default function HomeBrandEditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  
  const [section, setSection] = useState({
    id: id,
    name: '晋江文旅品牌馆',
    icon: '🏛️',
    iconType: 'emoji',
    syncCity: '',
    layout: 'two-columns-one-row',
    cards: [
      { id: 'c1', title: '晋江清新旅游', image: '', jumpType: 'page', jumpTarget: '' },
      { id: 'c2', title: '晋江美食文化', image: '', jumpType: 'page', jumpTarget: '' },
    ],
  })

  const [showPublishConfirm, setShowPublishConfirm] = useState(false)

  const jumpTypes = [
    { value: 'page', label: '跳转页面' },
    { value: 'miniprogram', label: '跳转小程序' },
    { value: 'wechat-article', label: '跳转微信公众号文章' },
    { value: 'external-link', label: '外部链接' },
  ]

  // 根据布局获取最大卡片数
  const getMaxCards = () => {
    switch(section.layout) {
      case 'two-columns-one-row': return 2
      case 'single-column-multiple-rows': return 999
      case 'two-columns-multiple-rows': return 999
      default: return 999
    }
  }

  const canAddCard = section.cards.length < getMaxCards()

  const addNewCard = () => {
    if (!canAddCard) return
    const newCard = {
      id: `c${Date.now()}`,
      title: '',
      image: '',
      jumpType: 'page',
      jumpTarget: ''
    }
    setSection({ ...section, cards: [...section.cards, newCard] })
  }

  const deleteCard = (cardId: string) => {
    setSection({
      ...section,
      cards: section.cards.filter((c) => c.id !== cardId),
    })
  }

  const updateCardJumpType = (cardId: string, jumpType: string) => {
    setSection({
      ...section,
      cards: section.cards.map(c => c.id === cardId ? { ...c, jumpType } : c)
    })
  }

  const getJumpTargetLabel = (jumpType: string) => {
    switch(jumpType) {
      case 'page': return '页面路径'
      case 'miniprogram': return '小程序 AppID'
      case 'wechat-article': return '公众号文章链接'
      case 'external-link': return '外部链接'
      default: return '跳转目标'
    }
  }
  
  const getJumpTargetPlaceholder = (jumpType: string) => {
    switch(jumpType) {
      case 'page': return '例如：/pages/detail/index'
      case 'miniprogram': return '例如：wx1234567890abcdef'
      case 'wechat-article': return '例如：https://mp.weixin.qq.com/...'
      case 'external-link': return '例如：https://example.com'
      default: return '输入跳转目标'
    }
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="text-xs font-bold text-slate-500">前台管理 / 首页品牌管理 / 编辑</div>
          <h1 className="mt-2 text-2xl font-black tracking-tight">编辑品牌区域</h1>
          <p className="mt-1 text-sm text-slate-600">编辑小程序首页的品牌展示区域配置（原型占位）。</p>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/admin/home-brand">
            <Button tone="secondary">返回列表</Button>
          </Link>
          <Link href={`/admin/home-brand/${id}/detail`}>
            <Button tone="secondary">查看详情</Button>
          </Link>
          <Button onClick={() => null}>保存</Button>
          <Button tone="secondary" onClick={() => setShowPublishConfirm(true)}>
            发布生效
          </Button>
        </div>
      </div>

      {showPublishConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="rounded-2xl bg-white p-6 shadow-lg ring-1 ring-slate-200">
            <h3 className="text-lg font-black">确认发布</h3>
            <p className="mt-2 text-sm text-slate-600">发布后将立即在小程序首页生效，确认发布吗？</p>
            <div className="mt-5 flex justify-end gap-2">
              <Button tone="secondary" onClick={() => setShowPublishConfirm(false)}>
                取消
              </Button>
              <Button onClick={() => setShowPublishConfirm(false)}>确认发布</Button>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-6">
        <section className="rounded-2xl bg-white p-6 ring-1 ring-slate-200">
          <h2 className="mb-4 text-lg font-black">同步城市</h2>
          <div>
            <label className="block text-sm font-bold">同步城市 <span className="text-red-600">*</span></label>
            <select
              value={section.syncCity}
              onChange={(e) => setSection({ ...section, syncCity: e.target.value })}
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            >
              <option value="">请选择同步城市</option>
              <option value="jinjiang">晋江区</option>
              <option value="xian">西安区</option>
              <option value="other">其他区</option>
            </select>
          </div>
        </section>

        <section className="rounded-2xl bg-white p-6 ring-1 ring-slate-200">
          <h2 className="mb-4 text-lg font-black">区域头部设置</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-bold">区域图标</label>
              <input type="file" accept="image/*" className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
              <p className="mt-1 text-xs text-slate-500">图片比例：1:1</p>
            </div>

            <div>
              <label className="block text-sm font-bold">
                主标题 <span className="text-red-600">*</span>
              </label>
              <div className="mt-2 space-y-2">
                <div className="flex items-center gap-2">
                  <input type="radio" id="title-text" name="titleType" defaultChecked className="h-4 w-4" />
                  <label htmlFor="title-text" className="text-sm">
                    文字
                  </label>
                </div>
                <input type="text" placeholder="输入主标题文字" className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
              </div>
              <div className="mt-2 space-y-2">
                <div className="flex items-center gap-2">
                  <input type="radio" id="title-image" name="titleType" className="h-4 w-4" />
                  <label htmlFor="title-image" className="text-sm">
                    上传图片
                  </label>
                </div>
                <input type="file" accept="image/*" className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
                <p className="text-xs text-slate-500">图片比例：建议 16:9</p>
              </div>
            </div>

          </div>
        </section>

        <section className="rounded-2xl bg-white p-6 ring-1 ring-slate-200">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-black">卡片布局设置</h2>
            <button
              onClick={addNewCard}
              disabled={!canAddCard}
              className={`rounded-lg px-3 py-1 text-xs font-bold transition ${
                canAddCard ? 'bg-slate-900 text-white hover:bg-slate-800 cursor-pointer' : 'bg-slate-200 text-slate-500 cursor-not-allowed'
              }`}
            >
              新增卡片
            </button>
          </div>

          <div className="mb-5">
            <div className="flex flex-wrap justify-center gap-4">
              {[
                { value: 'two-columns-one-row', label: '两列一排', cols: 2 },
                { value: 'single-column-multiple-rows', label: '单列多排', cols: 1 },
                { value: 'two-columns-multiple-rows', label: '两列多排', cols: 'mixed' as const },
              ].map((layout) => (
                <button
                  key={layout.value}
                  onClick={() => setSection({ ...section, layout: layout.value })}
                  className={`group relative rounded-xl p-3 transition-all ${
                    section.layout === layout.value ? 'bg-slate-50 ring-2 ring-slate-900 shadow-sm' : 'bg-white ring-1 ring-slate-200 hover:ring-slate-300'
                  }`}
                >
                  <div className="mb-2.5">
                    {layout.cols === 'mixed' ? (
                      <div className="grid gap-1">
                        <div className="h-6 rounded-md bg-slate-300" />
                        <div className="grid grid-cols-2 gap-1">
                          <div className="h-6 rounded-md bg-slate-300" />
                          <div className="h-6 rounded-md bg-slate-300" />
                        </div>
                      </div>
                    ) : (
                      <div className={`grid gap-1 ${layout.cols === 1 ? 'grid-cols-1' : 'grid-cols-2'}`}>
                        {[1, 2].map((i) => (
                          <div
                            key={i}
                            className={`rounded-md ${section.layout === layout.value ? 'bg-slate-900' : 'bg-slate-300'} transition`}
                            style={{ aspectRatio: '1', height: '24px' }}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                  <p className="text-xs font-bold text-slate-700 text-center">{layout.label}</p>
                </button>
              ))}
            </div>
          </div>

          <div className="border-t border-slate-200 pt-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold">卡片编辑</h3>
              <span className="text-xs text-slate-500">{section.cards.length} 张</span>
            </div>
            <div
              className={`grid gap-3 ${
                section.layout === 'single-column-multiple-rows' ? 'grid-cols-1' : section.layout === 'two-columns-one-row' ? 'grid-cols-2' : 'grid-cols-2'
              }`}
            >
              {section.cards.map((card) => (
                <div key={card.id} className="rounded-xl border border-slate-200 bg-white p-3">
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-bold mb-1">上传图片</label>
                      <input type="file" accept="image/*" className="w-full rounded border border-slate-300 px-2 py-1 text-xs" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold mb-1">卡片标题</label>
                      <input type="text" defaultValue={card.title} placeholder="输入卡片标题" className="w-full rounded border border-slate-300 px-2 py-1 text-xs" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold mb-1">跳转类型</label>
                      <select
                        value={card.jumpType}
                        onChange={(e) => updateCardJumpType(card.id, e.target.value)}
                        className="w-full rounded border border-slate-300 px-2 py-1 text-xs"
                      >
                        {jumpTypes.map((t) => (
                          <option key={t.value} value={t.value}>
                            {t.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold mb-1">{getJumpTargetLabel(card.jumpType)}</label>
                      <input type="text" placeholder={getJumpTargetPlaceholder(card.jumpType)} className="w-full rounded border border-slate-300 px-2 py-1 text-xs" />
                    </div>
                    <div className="flex gap-2 pt-2">
                      <button className="flex-1 rounded bg-slate-100 px-2 py-1 text-xs font-bold text-slate-700 hover:bg-slate-200 transition">
                        保存
                      </button>
                      <button
                        onClick={() => deleteCard(card.id)}
                        className="flex-1 rounded bg-rose-50 px-2 py-1 text-xs font-bold text-rose-700 hover:bg-rose-100 transition"
                      >
                        删除
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
