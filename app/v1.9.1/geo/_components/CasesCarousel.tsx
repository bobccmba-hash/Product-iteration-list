'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Trophy } from 'lucide-react'
import { CASES, GEO_BASE_PATH, makeMockCoverDataUri } from '../mock-data'
import { QrCodeButton } from './Interactive'
import { useGeoLocale } from './GeoLocaleContext'

const COPY = {
  zh: {
    title: '案例大厅',
    desc: '案例页整体改成更接近 PGSoft 的“游戏大厅式”结构：左导航、中心大海报、右 CTA、下方成果卡轨道。',
    directory: '案例目录',
    spotlight: '案例焦点',
    track: '成果轨道',
    detail: '查看案例详情',
    consult: '立即咨询合作',
  },
  en: {
    title: 'Cases Hall',
    desc: 'The cases page is rebuilt into a PGSoft-like lobby structure: left navigation, central hero poster, right CTA, and a lower result track.',
    directory: 'Case Directory',
    spotlight: 'Case Spotlight',
    track: 'Result Track',
    detail: 'View Case Details',
    consult: 'Consult Partnership',
  },
}

export default function CasesCarousel() {
  const { locale } = useGeoLocale()
  const t = COPY[locale]
  const [idx, setIdx] = useState(0)
  const active = CASES[idx]

  useEffect(() => {
    const timer = window.setInterval(() => setIdx((prev) => (prev + 1) % CASES.length), 4000)
    return () => window.clearInterval(timer)
  }, [])

  const media = useMemo(() => CASES.map((item, i) => ({ ...item, image: makeMockCoverDataUri(item.title, i % 2 === 0 ? '#173dff' : '#09111f', '#ffffff') })), [])

  return (
    <main className="mx-auto max-w-[1440px] px-4 py-6 sm:px-6 lg:px-8">
      <section className="geo-gradient-panel p-6 sm:p-8">
        <div className="text-[11px] font-bold uppercase tracking-[0.22em] text-white/55">Case Lobby</div>
        <h1 className="geo-display mt-4 text-[44px] leading-[0.96] text-white sm:text-[70px]">{t.title}</h1>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-white/74">{t.desc}</p>
      </section>

      <section className="mt-5 grid gap-4 xl:grid-cols-[220px_1fr_320px]">
        <aside className="geo-panel p-4">
          <div className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#8fa8df]">{t.directory}</div>
          <div className="mt-4 space-y-2">
            {CASES.map((item, index) => (
              <button key={item.id} onClick={() => setIdx(index)} className={`w-full rounded-[18px] px-4 py-3 text-left text-sm font-semibold transition ${index === idx ? 'bg-[#ffd15c] text-[#09111f]' : 'border border-[rgba(132,169,255,.18)] bg-[rgba(255,255,255,.03)] text-white hover:bg-[rgba(255,255,255,.06)]'}`}>
                {item.title}
              </button>
            ))}
          </div>
        </aside>

        <div className="geo-panel overflow-hidden p-3">
          <img src={media[idx].image} alt={active.title} className="h-[360px] w-full rounded-[24px] object-cover sm:h-[460px]" />
          <div className="grid gap-4 p-4 md:grid-cols-[1fr_auto] md:items-end">
            <div>
              <div className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#8fa8df]">{t.spotlight}</div>
              <div className="mt-2 text-3xl font-black text-white">{active.title}</div>
              <div className="mt-2 text-sm leading-7 text-[#9fa9c8]">{active.result_summary}</div>
            </div>
            <Link href={`${GEO_BASE_PATH}/cases/${active.slug}`} className="geo-btn-primary inline-flex h-11 items-center justify-center gap-2 px-5 text-sm font-semibold">
              {t.detail} <ArrowRight size={14} />
            </Link>
          </div>
        </div>

        <aside className="grid gap-4">
          <div className="geo-panel p-5">
            <div className="space-y-3">
              <QrCodeButton qrType="customer_service" buttonText={t.consult} />
              <Link href={`${GEO_BASE_PATH}/partners`} className="geo-btn-secondary inline-flex h-11 items-center justify-center px-5 text-sm font-semibold">
                {locale === 'zh' ? '提交合作申请' : 'Submit Partnership'}
              </Link>
            </div>
          </div>
          <div className="geo-panel p-5">
            <div className="rounded-[22px] border border-[rgba(132,169,255,.16)] bg-[rgba(255,255,255,.03)] p-4 text-sm leading-6 text-[#9fa9c8]">
              {locale === 'zh' ? '案例主画布优先显示，结果指标在下方轨道集中展示。' : 'The main case canvas comes first, with outcome metrics concentrated below.'}
            </div>
          </div>
        </aside>
      </section>

      <section className="geo-panel mt-5 p-5">
        <div className="mb-4 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.22em] text-[#8fa8df]"><Trophy size={14} />{t.track}</div>
        <div className="grid gap-4 md:grid-cols-3">
          {active.result_metrics.map((metric) => (
            <div key={metric.label} className="rounded-[24px] border border-[rgba(132,169,255,.16)] bg-[rgba(255,255,255,.03)] p-5">
              <div className="text-xs text-[#8fa8df]">{metric.label}</div>
              <div className="mt-2 text-2xl font-black text-white">{metric.value}</div>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
