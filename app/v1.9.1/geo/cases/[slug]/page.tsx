import Link from 'next/link'
import { notFound } from 'next/navigation'
import { GalleryHorizontal } from 'lucide-react'
import { Breadcrumbs } from '../../_components/Breadcrumbs'
import { CASES, GEO_BASE_PATH, type Case, makeMockCoverDataUri } from '../../mock-data'
import { QrCodeButton } from '../../_components/Interactive'
import { Reveal } from '../../_components/BrandVisual'

export function generateStaticParams() {
  return CASES.map((c) => ({ slug: c.slug }))
}

function dateRange(start: string, end?: string) {
  const s = new Date(`${start}T00:00:00.000Z`).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })
  if (!end) return s
  const e = new Date(`${end}T00:00:00.000Z`).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })
  return `${s}—${e}`
}

function jsonLdCaseDetail(caseItem: Case) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: caseItem.title,
    description: caseItem.result_summary,
    datePublished: caseItem.start_date,
    dateModified: caseItem.updated_at,
    about: { '@type': 'Thing', name: '合作案例' },
    author: { '@type': 'Organization', name: '小黄鹿学园' },
  }
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
}

export default async function GeoCaseDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const caseItem = CASES.find((c) => c.slug === slug) ?? null
  if (!caseItem) notFound()

  const breadcrumbItems = [
    { label: '首页', href: `${GEO_BASE_PATH}` },
    { label: '合作案例', href: `${GEO_BASE_PATH}/cases` },
    { label: caseItem.title },
  ]

  const activityDetailNarrative = [
    '联合合作方以家庭可理解、可参与的方式组织内容，让孩子在真实场景中学习并形成可复述的成长路径。',
    `活动围绕${caseItem.city}本地资源与场馆条件设计，通过“观察—参与—体验—复盘”的流程，把安全教育、科普理解与亲子表达串成一条学习链路。`,
    '在活动执行中，现场工作人员以安全边界为前提引导孩子完成体验任务，同时让家长获得可带回家练习的陪伴方法。',
  ].join('\n')

  return (
    <>
      {jsonLdCaseDetail(caseItem)}
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="space-y-6">
          <Reveal>
            <Breadcrumbs items={breadcrumbItems} />
          </Reveal>

          <section className="geo-gradient-panel p-7 sm:p-10">
            <div className="grid gap-6 lg:grid-cols-[1.05fr_.95fr] lg:items-start">
              <div>
                <div className="geo-kicker !border-white/35 !bg-white/15 !text-white">合作案例</div>
                <h1 className="geo-display mt-4 text-[38px] leading-[1.05] text-white sm:text-[58px]">{caseItem.title}</h1>
                <p className="mt-3 max-w-3xl text-sm leading-7 text-white/90">{caseItem.result_summary}</p>
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl bg-white/12 p-4 text-white">
                    <div className="text-xs font-semibold text-white/70">活动城市</div>
                    <div className="mt-2 text-sm font-black">{caseItem.city}</div>
                  </div>
                  <div className="rounded-2xl bg-white/12 p-4 text-white">
                    <div className="text-xs font-semibold text-white/70">活动时间</div>
                    <div className="mt-2 text-sm font-black">{dateRange(caseItem.start_date, caseItem.end_date)}</div>
                  </div>
                  <div className="rounded-2xl bg-white/12 p-4 text-white sm:col-span-2">
                    <div className="text-xs font-semibold text-white/70">举办地点</div>
                    <div className="mt-2 text-sm font-black">{caseItem.venue}</div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="overflow-hidden rounded-[24px] border border-white/15">
                  <img src={makeMockCoverDataUri(caseItem.title, '#ff6b5e', '#ffffff')} alt={caseItem.title} className="h-[300px] w-full object-cover" />
                </div>
                <div className="rounded-[24px] border border-white/15 bg-white/10 p-5 text-white backdrop-blur">
                  <div className="text-sm font-black">合作咨询</div>
                  <div className="mt-2 text-xs text-white/75">如果你希望与我们在本地化成长活动、儿童安全教育、公益项目或场馆联动方面开展合作，请点击二维码完成咨询。</div>
                  <div className="mt-4">
                    <QrCodeButton qrType="customer_service" buttonText="添加客服微信，咨询合作" />
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
                    <GalleryHorizontal size={18} /> 现场图集
                  </span>
                </h2>
              </div>
              <div className="grid gap-4 md:grid-cols-3">
                {caseItem.gallery_images.map((img) => (
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
                  <h2 className="text-xl font-black text-[#1a1e3a]">项目背景</h2>
                  <p className="mt-3 whitespace-pre-line text-sm leading-7 text-[#4f6378]">{caseItem.content_intro}</p>
                </div>

                <div>
                  <h2 className="text-xl font-black text-[#1a1e3a]">活动内容 / 执行过程</h2>
                  <p className="mt-3 whitespace-pre-line text-sm leading-7 text-[#4f6378]">{activityDetailNarrative}</p>
                </div>

                <div>
                  <h2 className="text-xl font-black text-[#1a1e3a]">成果亮点</h2>
                  <div className="mt-3 grid gap-3 sm:grid-cols-3">
                    {caseItem.result_metrics.map((m) => (
                      <div key={m.label} className="rounded-xl bg-[#f6f9fc] p-4">
                        <div className="text-xs font-semibold text-[#4f6378]">{m.label}</div>
                        <div className="mt-2 text-sm font-black text-[#061b31]">{m.value}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h2 className="text-xl font-black text-[#1a1e3a]">合作单位说明</h2>
                  <div className="mt-3 grid gap-4 sm:grid-cols-2">
                    <div className="rounded-2xl border border-[#d8defa] bg-[#f7f9ff] p-4">
                      <div className="text-sm font-black text-[#1a1e3a]">承办单位</div>
                      <ul className="mt-2 space-y-2 text-sm text-slate-700">
                        {caseItem.organizers.map((org) => <li key={org} className="font-semibold">{org}</li>)}
                      </ul>
                    </div>
                    <div className="rounded-2xl border border-[#d8defa] bg-[#f7f9ff] p-4">
                      <div className="text-sm font-black text-[#1a1e3a]">支持单位</div>
                      <ul className="mt-2 space-y-2 text-sm text-slate-700">
                        {caseItem.supporting_orgs.map((org) => <li key={org} className="font-semibold">{org}</li>)}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal className="space-y-4">
              <div className="geo-top-card p-5">
                <div className="text-sm font-black text-[#1a1e3a]">下一步</div>
                <div className="mt-2 text-xs text-[#4f6378]">选择合作方式并提交申请。我们会尽快完成平台初步沟通、需求确认与方案设计。</div>
                <div className="mt-4">
                  <Link href={`${GEO_BASE_PATH}/partners`} className="geo-btn-primary inline-flex h-10 w-full items-center justify-center px-4 text-sm font-semibold text-white">
                    提交合作申请
                  </Link>
                </div>
              </div>

              <div className="geo-gradient-panel p-5 text-white">
                <div className="text-sm font-black">反馈语（节选）</div>
                <div className="mt-2 space-y-2 text-sm leading-6 text-white/90">
                  {caseItem.feedback_quotes.slice(0, 2).map((q, idx) => (
                    <div key={idx} className="rounded-xl bg-white/10 px-3 py-2">“{q}”</div>
                  ))}
                </div>
              </div>
            </Reveal>
          </section>
        </div>
      </main>
    </>
  )
}
