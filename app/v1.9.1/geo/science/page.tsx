import type { Metadata } from 'next'
import Link from 'next/link'
import { ChevronLeft, ChevronRight, GalleryHorizontal } from 'lucide-react'
import { GEO_BASE_PATH, type ScienceCategory, SCIENCE_ARTICLES, makeMockCoverDataUri } from '../mock-data'
import { QrCodeButton } from '../_components/Interactive'

export const metadata: Metadata = {
  title: '安全科普｜小黄鹿学园',
  description: '科普栏目导航 + 文章列表 + 家长陪伴建议，内容可被抓取与结构化理解（一期 mock 数据）。',
  alternates: { canonical: `${GEO_BASE_PATH}/science` },
}

function normalizeCategory(input: string | undefined): ScienceCategory | null {
  if (!input) return null
  const v = input.toLowerCase()
  const allowed: ScienceCategory[] = ['earthquake', 'fire', 'weather', 'drowning', 'traffic', 'parenting', 'other']
  return allowed.includes(v as ScienceCategory) ? (v as ScienceCategory) : null
}

function catLabel(cat: ScienceCategory) {
  if (cat === 'earthquake') return '地震安全'
  if (cat === 'fire') return '消防安全'
  if (cat === 'weather') return '气象与出行'
  if (cat === 'drowning') return '防溺水自护'
  if (cat === 'traffic') return '交通出行安全'
  if (cat === 'parenting') return '育儿陪伴'
  return '其他'
}

export default async function ScienceListPage({
  searchParams,
}: {
  searchParams?: Promise<{ category?: string }>
}) {
  const resolvedSearchParams = await searchParams
  const category = normalizeCategory(resolvedSearchParams?.category) ?? null
  const list = category ? SCIENCE_ARTICLES.filter((a) => a.category === category) : SCIENCE_ARTICLES
  const featured = list.slice(0, 6).map((item, index) => ({
    ...item,
    image: makeMockCoverDataUri(item.title, index % 2 === 0 ? '#4d5dff' : '#ff6b5e', '#ffffff'),
  }))

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <section className="geo-gradient-panel p-7 sm:p-10">
        <div className="geo-kicker !border-white/35 !bg-white/15 !text-white">安全科普</div>
        <h1 className="geo-display mt-4 text-[38px] leading-[1.05] text-white sm:text-[58px]">把安全知识做成可浏览的媒体频道</h1>
        <p className="mt-3 max-w-4xl text-sm leading-7 text-white/90">
          参考媒体门户的展示方式，小黄鹿学园把安全内容拆解为栏目、图文卡组与相关推荐，让家庭更容易持续学习而不是一次性阅读。
        </p>
      </section>

      <section className="geo-panel mt-8 p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="geo-display text-[30px] text-[#1a1e3a]">
            <span className="inline-flex items-center gap-2">
              <GalleryHorizontal size={18} />
              科普精选长廊
            </span>
          </h2>
          <div className="text-xs text-[#6d6a86]">图文入口 / 分类浏览 / 活动联动</div>
        </div>

        <div className="geo-carousel-track pb-2">
          {featured.map((item) => (
            <Link key={item.id} href={`${GEO_BASE_PATH}/science/${item.slug}`} className="geo-carousel-item geo-panel overflow-hidden p-2">
              <img src={item.image} alt={item.title} className="h-[210px] w-full rounded-xl object-cover" />
              <div className="p-3">
                <div className="text-xs font-semibold text-[#4a5079]">{catLabel(item.category)}</div>
                <div className="mt-1 text-sm font-black text-[#1a1e3a]">{item.title}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="geo-panel mt-8 p-6">
        <div className="grid gap-5 lg:grid-cols-[1fr_340px] lg:items-start">
          <div>
            <div className="text-sm font-black text-[#1a1e3a]">科普栏目（可筛选分类）</div>
            <div className="mt-3 flex flex-wrap gap-2">
              <Link
                href={`${GEO_BASE_PATH}/science`}
                className={`rounded-full border px-4 py-2 text-sm font-semibold ${
                  !category ? 'border-[#4d5dff] bg-[#4d5dff] text-white' : 'border-[#d8defa] bg-white text-[#4a5079]'
                }`}
              >
                全部
              </Link>
              {(['earthquake', 'fire', 'weather', 'drowning', 'traffic', 'parenting'] as ScienceCategory[]).map((cat) => (
                <Link
                  key={cat}
                  href={`${GEO_BASE_PATH}/science?category=${cat}`}
                  className={`rounded-full border px-4 py-2 text-sm font-semibold ${
                    category === cat ? 'border-[#4d5dff] bg-[#4d5dff] text-white' : 'border-[#d8defa] bg-white text-[#4a5079]'
                  }`}
                >
                  {catLabel(cat)}
                </Link>
              ))}
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {[
                {
                  k: '儿童安全知识',
                  v: '聚焦地震、消防、气象、防溺水、出行等主题，让家长知道“该教什么”。',
                },
                {
                  k: '场景互动学习',
                  v: '结合平台的情景化互动应用，把抽象知识变成孩子能参与的互动内容。',
                },
                {
                  k: '活动后延展阅读',
                  v: '将线下活动中的知识点整理成家庭可继续使用的图文内容，让学习有连续性。',
                },
                {
                  k: '家长陪伴建议',
                  v: '提供简单、可执行的日常安全陪伴建议，把练习做成“短、频、可复用”。',
                },
              ].map((it) => (
                <div key={it.k} className="rounded-2xl border border-[#d8defa] bg-[#f7f9ff] p-5">
                  <div className="text-sm font-black text-[#1a1e3a]">{it.k}</div>
                  <div className="mt-2 text-sm leading-6 text-[#4a5079]">{it.v}</div>
                </div>
              ))}
            </div>
          </div>

          <aside className="geo-top-card p-5">
            <div className="text-sm font-black text-[#1a1e3a]">科普咨询与活动推荐</div>
            <div className="mt-3 space-y-3">
              <QrCodeButton qrType="customer_service" buttonText="添加客服微信，咨询活动报名" />
              <QrCodeButton qrType="miniapp" buttonText="关注小程序" />
            </div>
            <div className="mt-4 text-xs text-[#4a5079]">通过科普文章与活动联动，家长能把知识变成可执行的日常陪伴。</div>
          </aside>
        </div>
      </section>

      <section className="geo-panel mt-8 p-6">
        <div className="flex items-center justify-between gap-3">
          <div className="text-sm font-black text-[#1a1e3a]">文章列表（共 {list.length} 篇）</div>
          <div className="text-xs text-[#6d6a86]">点击“查看详情”进入科普文章详情页。</div>
        </div>

        <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {list.map((a, index) => (
            <article key={a.id} className="geo-panel overflow-hidden p-2">
              <img
                src={makeMockCoverDataUri(a.title, index % 2 === 0 ? '#4d5dff' : '#7a4dff', '#ffffff')}
                alt={a.title}
                className="h-[210px] w-full rounded-xl object-cover"
              />
              <div className="p-3">
                <div className="text-xs font-semibold text-[#4f6378]">
                  {catLabel(a.category)} · {new Date(a.publish_at).toLocaleDateString('zh-CN', { year: 'numeric', month: '2-digit', day: '2-digit' })}
                </div>
                <h3 className="mt-2 text-lg font-black text-[#1a1e3a]">{a.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[#4a5079]">{a.summary}</p>
                <div className="mt-4 flex items-center justify-between">
                  <Link href={`${GEO_BASE_PATH}/science/${a.slug}`} className="geo-btn-primary inline-flex h-10 items-center justify-center px-4 text-sm font-semibold text-white">
                    查看详情
                  </Link>
                  <Link href={`${GEO_BASE_PATH}/contact`} className="text-xs font-semibold text-[#1a1e3a] hover:underline">
                    需要活动推荐？
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}
