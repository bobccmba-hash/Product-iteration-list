'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, LayoutGrid } from 'lucide-react'
import { ACTIVITIES, GEO_BASE_PATH, makeMockCoverDataUri, type ActivityCategory } from '../mock-data'
import { QrCodeButton } from './Interactive'
import { useGeoLocale } from './GeoLocaleContext'

const COPY = {
  zh: {
    title: '活动大厅',
    desc: '整体排版改成更接近 PGSoft 的“大厅页”：左侧目录、中间海报、右侧辅助卡、下方内容网格。',
    all: '全部', safety: '安全科普', career: '职业体验', family: '亲子游园', heritage: '非遗体验',
    featured: '活动海报',
    board: '大厅目录',
    feed: '活动内容网格',
    detail: '查看详情',
    consult: '立即咨询',
    mini: '关注小程序',
  },
  en: {
    title: 'Activities Hall',
    desc: 'The layout is rebuilt as a PGSoft-like lobby page: left directory, center poster, right support cards, and a lower content grid.',
    all: 'All', safety: 'Safety', career: 'Career', family: 'Family', heritage: 'Heritage',
    featured: 'Featured Poster',
    board: 'Lobby Directory',
    feed: 'Activity Grid',
    detail: 'View Details',
    consult: 'Consult Now',
    mini: 'Mini App',
  },
}

export default function ActivitiesExplorer() {
  const { locale } = useGeoLocale()
  const t = COPY[locale]
  const cats: { key: 'all' | ActivityCategory; label: string }[] = [
    { key: 'all', label: t.all },
    { key: 'safety', label: t.safety },
    { key: 'career', label: t.career },
    { key: 'family', label: t.family },
    { key: 'heritage', label: t.heritage },
  ]
  const [active, setActive] = useState<'all' | ActivityCategory>('all')
  const list = useMemo(() => (active === 'all' ? ACTIVITIES : ACTIVITIES.filter((a) => a.category === active)), [active])
  const featured = list[0] ?? ACTIVITIES[0]

  return (
    <main className="mx-auto max-w-[1440px] px-4 py-6 sm:px-6 lg:px-8">
      <section className="geo-gradient-panel p-6 sm:p-8">
        <div className="text-[11px] font-bold uppercase tracking-[0.22em] text-white/55">{t.board}</div>
        <h1 className="geo-display mt-4 text-[44px] leading-[0.96] text-white sm:text-[70px]">{t.title}</h1>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-white/74">{t.desc}</p>
      </section>

      <section className="mt-5 grid gap-4 xl:grid-cols-[220px_1fr_320px]">
        <aside className="geo-panel p-4">
          <div className="space-y-2">
            {cats.map((cat) => (
              <button key={cat.key} onClick={() => setActive(cat.key)} className={`w-full rounded-[18px] px-4 py-3 text-left text-sm font-semibold transition ${cat.key === active ? 'bg-[#ffd15c] text-[#09111f]' : 'border border-[rgba(132,169,255,.18)] bg-[rgba(255,255,255,.03)] text-white hover:bg-[rgba(255,255,255,.06)]'}`}>
                {cat.label}
              </button>
            ))}
          </div>
        </aside>

        <div className="geo-panel overflow-hidden p-3">
          <img src={makeMockCoverDataUri(featured.title, '#173dff', '#ffffff')} alt={featured.title} className="h-[360px] w-full rounded-[24px] object-cover sm:h-[460px]" />
          <div className="grid gap-4 p-4 md:grid-cols-[1fr_auto] md:items-end">
            <div>
              <div className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#8fa8df]">{t.featured}</div>
              <div className="mt-2 text-3xl font-black text-white">{featured.title}</div>
              <div className="mt-2 text-sm leading-7 text-[#9fa9c8]">{featured.subtitle}</div>
            </div>
            <Link href={`${GEO_BASE_PATH}/activities/${featured.slug}`} className="geo-btn-primary inline-flex h-11 items-center justify-center gap-2 px-5 text-sm font-semibold">
              {t.detail} <ArrowRight size={14} />
            </Link>
          </div>
        </div>

        <aside className="grid gap-4">
          <div className="geo-panel p-5">
            <div className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#8fa8df]">Info</div>
            <div className="mt-4 rounded-[22px] border border-[rgba(132,169,255,.16)] bg-[rgba(255,255,255,.03)] p-4 text-sm leading-6 text-[#9fa9c8]">
              {locale === 'zh' ? `当前分类下共有 ${list.length} 条活动，精选海报优先展示。` : `${list.length} activities are available in the current category, with a featured poster first.`}
            </div>
          </div>
          <div className="geo-panel p-5">
            <div className="space-y-3">
              <QrCodeButton qrType="customer_service" buttonText={t.consult} />
              <QrCodeButton qrType="miniapp" buttonText={t.mini} />
            </div>
          </div>
        </aside>
      </section>

      <section className="geo-panel mt-5 p-5">
        <div className="mb-4 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.22em] text-[#8fa8df]"><LayoutGrid size={14} />{t.feed}</div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {list.map((item, index) => (
            <article key={item.id} className="overflow-hidden rounded-[24px] border border-[rgba(132,169,255,.16)] bg-[rgba(255,255,255,.03)] p-2 transition hover:-translate-y-1">
              <img src={makeMockCoverDataUri(item.title, index % 2 === 0 ? '#0f1f44' : '#2b7cff', '#ffffff')} alt={item.title} className="h-[210px] w-full rounded-[18px] object-cover" />
              <div className="p-4">
                <div className="text-xs text-[#8fa8df]">{item.city}</div>
                <div className="mt-1 text-xl font-black text-white">{item.title}</div>
                <div className="mt-2 text-sm leading-6 text-[#9fa9c8]">{item.subtitle}</div>
                <Link href={`${GEO_BASE_PATH}/activities/${item.slug}`} className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-[#ffd15c]">
                  {t.detail} <ArrowRight size={14} />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}
