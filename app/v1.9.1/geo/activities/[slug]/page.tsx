import Link from 'next/link'
import { notFound } from 'next/navigation'
import { GalleryHorizontal } from 'lucide-react'
import { Breadcrumbs } from '../../_components/Breadcrumbs'
import {
  ACTIVITIES,
  GEO_BASE_PATH,
  type Activity,
  type ActivityCategory,
  formatTimeRangeZh,
  ageLabel,
  categoryLabel,
  getActivityBySlug,
  makeMockCoverDataUri,
} from '../../mock-data'
import { QrCodeButton } from '../../_components/Interactive'
import { FloatingConsultCard, HoverLift, Reveal } from '../../_components/BrandVisual'

export function generateStaticParams() {
  return ACTIVITIES.map((a) => ({ slug: a.slug }))
}

function jsonLdEvent(activity: Activity) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: activity.title,
    description: activity.intro,
    startDate: activity.start_time,
    endDate: activity.end_time ?? undefined,
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    organizer: {
      '@type': 'Organization',
      name: '小黄鹿学园',
    },
    location: {
      '@type': 'Place',
      name: activity.venue,
    },
  }
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
}

export default async function GeoActivityDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const activity = getActivityBySlug(slug)
  if (!activity) notFound()

  const recommended = ACTIVITIES.filter((a) => a.category === activity.category && a.slug !== activity.slug).slice(0, 3)
  const breadcrumbItems = [
    { label: '首页', href: `${GEO_BASE_PATH}` },
    { label: '公益活动', href: `${GEO_BASE_PATH}/activities` },
    { label: activity.title },
  ]

  const categoryText = categoryLabel(activity.category as ActivityCategory)
  const ageText = ageLabel(activity.age_range)
  const heroImage = makeMockCoverDataUri(activity.title, '#4d5dff', '#ffffff')

  return (
    <>
      {jsonLdEvent(activity)}
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="space-y-6">
          <Reveal>
            <Breadcrumbs items={breadcrumbItems} />
          </Reveal>

          <section className="geo-gradient-panel p-7 sm:p-10">
            <div className="grid gap-6 lg:grid-cols-[1.05fr_.95fr] lg:items-start">
              <div>
                <div className="geo-kicker !border-white/35 !bg-white/15 !text-white">{categoryText}</div>
                <h1 className="geo-display mt-4 text-[38px] leading-[1.05] text-white sm:text-[58px]">{activity.title}</h1>
                <p className="mt-3 max-w-3xl text-sm leading-7 text-white/90">{activity.subtitle}</p>
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl bg-white/12 p-4 text-white">
                    <div className="text-xs font-semibold text-white/70">适龄范围</div>
                    <div className="mt-2 text-sm font-black">{ageText}</div>
                  </div>
                  <div className="rounded-2xl bg-white/12 p-4 text-white">
                    <div className="text-xs font-semibold text-white/70">活动时间</div>
                    <div className="mt-2 text-sm font-black">{formatTimeRangeZh(activity.start_time, activity.end_time)}</div>
                  </div>
                  <div className="rounded-2xl bg-white/12 p-4 text-white sm:col-span-2">
                    <div className="text-xs font-semibold text-white/70">活动地点</div>
                    <div className="mt-2 text-sm font-black">{activity.venue}</div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="overflow-hidden rounded-[24px] border border-white/15">
                  <img src={heroImage} alt={activity.title} className="h-[300px] w-full object-cover" />
                </div>
                <div className="rounded-[24px] border border-white/15 bg-white/10 p-5 text-white backdrop-blur">
                  <div className="text-sm font-black">咨询二维码固定卡片</div>
                  <div className="mt-2 text-xs text-white/75">点击按钮展开二维码，完成一对一咨询与报名引导。</div>
                  <div className="mt-4">
                    <QrCodeButton qrType="customer_service" buttonText="添加客服微信，咨询活动报名" />
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
                    <GalleryHorizontal size={18} /> 图文相册
                  </span>
                </h2>
              </div>
              <div className="grid gap-4 md:grid-cols-3">
                {activity.gallery_images.map((img) => (
                  <figure key={img.url} className="geo-panel overflow-hidden p-2">
                    <img src={img.url} alt={img.alt} className="h-[220px] w-full rounded-xl object-cover" />
                    {img.caption ? <figcaption className="p-3 text-xs text-[#6d6a86]">{img.caption}</figcaption> : null}
                  </figure>
                ))}
              </div>
            </section>
          </Reveal>

          <section className="grid gap-6 lg:grid-cols-[1fr_360px]">
            <Reveal className="geo-panel p-6">
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-black text-[#1a1e3a]">活动简介</h2>
                  <p className="mt-3 text-sm leading-7 text-[#4f6378]">{activity.intro}</p>
                </div>

                <div>
                  <h2 className="text-xl font-black text-[#1a1e3a]">活动亮点</h2>
                  <div className="mt-3 grid gap-2 sm:grid-cols-2">
                    {activity.highlights.map((h, idx) => (
                      <HoverLift key={idx} className="rounded-xl bg-[#f6f9fc] px-4 py-3 text-sm leading-6 text-slate-700">
                        {h}
                      </HoverLift>
                    ))}
                  </div>
                </div>

                <div>
                  <h2 className="text-xl font-black text-[#1a1e3a]">安全说明</h2>
                  <div className="mt-3 rounded-xl bg-rose-50 p-4 text-sm leading-7 text-rose-900">{activity.safety_notice}</div>
                </div>

                <div>
                  <h2 className="text-xl font-black text-[#1a1e3a]">合作单位</h2>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {activity.partner_orgs.map((org) => (
                      <span key={org} className="rounded-full border border-[#d8defa] bg-white px-3 py-1 text-sm font-semibold text-slate-700">
                        {org}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal className="space-y-4">
              <div className="geo-top-card p-5">
                <div className="text-sm font-black text-[#1a1e3a]">相关推荐</div>
                <div className="mt-2 text-xs text-[#4f6378]">从同一活动体系中选择更多可替代选项。</div>
                <div className="mt-4 space-y-3">
                  {recommended.length ? (
                    recommended.map((r, index) => (
                      <Link key={r.slug} href={`${GEO_BASE_PATH}/activities/${r.slug}`} className="block rounded-xl border border-[#d8defa] bg-white p-3 hover:bg-[#f7f9ff]">
                        <img src={makeMockCoverDataUri(r.title, index % 2 === 0 ? '#7a4dff' : '#ff6b5e', '#ffffff')} alt={r.title} className="h-[140px] w-full rounded-lg object-cover" />
                        <div className="mt-3 text-sm font-black text-[#1a1e3a]">{r.title}</div>
                        <div className="mt-1 text-xs text-[#4f6378]">{formatTimeRangeZh(r.start_time, r.end_time)} · {r.venue}</div>
                      </Link>
                    ))
                  ) : (
                    <div className="text-sm text-[#4f6378]">暂无推荐活动。</div>
                  )}
                </div>
              </div>

              <div className="geo-gradient-panel p-5 text-white">
                <div className="text-sm font-black">报名前你只需要做两件事</div>
                <div className="mt-2 text-sm leading-7 text-white/90">
                  1）确认适龄范围；2）把孩子的学习与安全关注点告诉客服，我们会给你更清晰的活动匹配建议。
                </div>
              </div>
            </Reveal>
          </section>
        </div>
      </main>
      <FloatingConsultCard />
    </>
  )
}
