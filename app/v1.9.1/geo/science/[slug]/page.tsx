import Link from 'next/link'
import { notFound } from 'next/navigation'
import { GalleryHorizontal } from 'lucide-react'
import { Breadcrumbs } from '../../_components/Breadcrumbs'
import {
  GEO_BASE_PATH,
  SCIENCE_ARTICLES,
  ACTIVITIES,
  getScienceBySlug,
  type ScienceArticle,
  formatDateZh,
  makeMockCoverDataUri,
} from '../../mock-data'
import { QrCodeButton } from '../../_components/Interactive'
import { Reveal } from '../../_components/BrandVisual'

export function generateStaticParams() {
  return SCIENCE_ARTICLES.map((a) => ({ slug: a.slug }))
}

function jsonLdArticle(article: ScienceArticle) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.summary,
    datePublished: article.publish_at,
    dateModified: article.updated_at,
    about: { '@type': 'Thing', name: '小黄鹿学园安全科普' },
    author: {
      '@type': 'Organization',
      name: '小黄鹿学园',
    },
  }
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
}

export default async function GeoScienceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const article = getScienceBySlug(slug)
  if (!article) notFound()

  const relatedActivities = ACTIVITIES.filter((a) => article.related_activity_ids.includes(a.slug)).slice(0, 3)
  const breadcrumbItems = [
    { label: '首页', href: `${GEO_BASE_PATH}` },
    { label: '安全科普', href: `${GEO_BASE_PATH}/science` },
    { label: article.title },
  ]

  const categoryText =
    article.category === 'earthquake'
      ? '地震安全'
      : article.category === 'fire'
        ? '消防安全'
        : article.category === 'weather'
          ? '气象与出行'
          : article.category === 'drowning'
            ? '防溺水自护'
            : article.category === 'traffic'
              ? '交通出行安全'
              : article.category === 'parenting'
                ? '育儿陪伴'
                : '其他'

  const heroImage = makeMockCoverDataUri(article.title, '#7a4dff', '#ffffff')

  return (
    <>
      {jsonLdArticle(article)}
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="space-y-6">
          <Reveal>
            <Breadcrumbs items={breadcrumbItems} />
          </Reveal>

          <section className="geo-gradient-panel p-7 sm:p-10">
            <div className="grid gap-6 lg:grid-cols-[1.05fr_.95fr] lg:items-start">
              <div>
                <div className="geo-kicker !border-white/35 !bg-white/15 !text-white">{categoryText}</div>
                <h1 className="geo-display mt-4 text-[38px] leading-[1.05] text-white sm:text-[58px]">{article.title}</h1>
                <p className="mt-3 max-w-3xl text-sm leading-7 text-white/90">{article.summary}</p>
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl bg-white/12 p-4 text-white">
                    <div className="text-xs font-semibold text-white/70">发布时间</div>
                    <div className="mt-2 text-sm font-black">{formatDateZh(article.publish_at)}</div>
                  </div>
                  <div className="rounded-2xl bg-white/12 p-4 text-white">
                    <div className="text-xs font-semibold text-white/70">更新时间</div>
                    <div className="mt-2 text-sm font-black">{formatDateZh(article.updated_at)}</div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="overflow-hidden rounded-[24px] border border-white/15">
                  <img src={heroImage} alt={article.title} className="h-[300px] w-full object-cover" />
                </div>
                <div className="rounded-[24px] border border-white/15 bg-white/10 p-5 text-white backdrop-blur">
                  <div className="text-sm font-black">需要活动咨询？</div>
                  <div className="mt-2 text-xs text-white/75">点击按钮展开二维码，获取适龄活动推荐与报名引导。</div>
                  <div className="mt-4 space-y-3">
                    <QrCodeButton qrType="customer_service" buttonText="添加客服微信" />
                    <QrCodeButton qrType="miniapp" buttonText="关注小程序" />
                  </div>
                </div>
              </div>
            </div>
          </section>

          <Reveal>
            <section className="geo-panel p-6">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="geo-display text-[30px] text-[#1a1e3a]">
                  <span className="inline-flex items-center gap-2">
                    <GalleryHorizontal size={18} /> 关联知识点
                  </span>
                </h2>
              </div>
              <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {article.knowledge_points.map((kp, index) => (
                  <li key={kp} className="geo-panel overflow-hidden p-2">
                    <img src={makeMockCoverDataUri(kp, index % 2 === 0 ? '#4d5dff' : '#ff6b5e', '#ffffff')} alt={kp} className="h-[160px] w-full rounded-xl object-cover" />
                    <div className="p-3 text-sm font-semibold text-[#1a1e3a]">{kp}</div>
                  </li>
                ))}
              </ul>
            </section>
          </Reveal>

          <section className="grid gap-6 lg:grid-cols-[1fr_360px]">
            <Reveal className="geo-panel p-6">
              <div>
                <h2 className="text-xl font-black text-[#1a1e3a]">正文</h2>
                <div className="mt-3 prose prose-slate max-w-none text-slate-700" dangerouslySetInnerHTML={{ __html: article.content_html }} />
              </div>
            </Reveal>

            <Reveal className="space-y-4">
              <div className="geo-top-card p-5">
                <div className="text-sm font-black text-[#1a1e3a]">相关推荐活动</div>
                <div className="mt-2 text-xs text-[#4f6378]">将科普内容联动到线下体验，帮助家庭把知识变成可执行的陪伴方式。</div>
                <div className="mt-4 space-y-3">
                  {relatedActivities.length ? (
                    relatedActivities.map((a, index) => (
                      <Link key={a.slug} href={`${GEO_BASE_PATH}/activities/${a.slug}`} className="block rounded-xl border border-[#d8defa] bg-white p-3 hover:bg-[#f7f9ff]">
                        <img src={makeMockCoverDataUri(a.title, index % 2 === 0 ? '#7a4dff' : '#4d5dff', '#ffffff')} alt={a.title} className="h-[140px] w-full rounded-lg object-cover" />
                        <div className="mt-3 text-sm font-black text-[#1a1e3a]">{a.title}</div>
                        <div className="mt-1 text-xs text-[#4f6378]">{formatDateZh(a.start_time)} · {a.venue}</div>
                      </Link>
                    ))
                  ) : (
                    <div className="text-sm text-[#4f6378]">暂无相关推荐活动。</div>
                  )}
                </div>
              </div>

              <div className="geo-gradient-panel p-5 text-white">
                <div className="text-sm font-black">家长陪伴建议：把练习做短、做频</div>
                <div className="mt-2 text-sm leading-7 text-white/90">
                  选择一条最适合孩子的知识点，下一次外出/在家练习时只做一步，然后用一句话复盘：今天我们做对了哪一步？
                </div>
              </div>
            </Reveal>
          </section>
        </div>
      </main>
    </>
  )
}
