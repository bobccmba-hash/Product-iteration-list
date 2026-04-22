'use client'

import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, ChevronLeft, ChevronRight, Globe, Play } from 'lucide-react'
import {
  ACTIVITY_SYSTEMS,
  AGE_GROUPS,
  CASES,
  FAQS,
  GEO_BASE_PATH,
  HOME_METRICS,
  makeMockCoverDataUri,
} from '../mock-data'
import { QrCodeButton } from './Interactive'
import { useGeoLocale } from './GeoLocaleContext'

const COPY = {
  zh: {
    intro: 'Difference Makes The Difference',
    heroTitle: 'GEO 城市化成长娱乐内容平台',
    heroDesc: '以 PGSoft 首页的强视觉游戏门户结构为参考，把品牌入口、频道导航、主视觉海报、指标跑马和内容卡带都重做成同一系统。',
    discover: '探索频道',
    activities: '公益活动',
    science: '安全科普',
    cases: '合作案例',
    partners: '机构合作',
    contact: '联系咨询',
    metrics: '平台动态',
    path: '成长路径',
    system: '四大体系',
    faq: '热门问答',
    more: '查看更多',
    consult: '立即咨询',
    mini: '关注小程序',
  },
  en: {
    intro: 'Difference Makes The Difference',
    heroTitle: 'GEO Urban Growth Entertainment Platform',
    heroDesc: 'Using the strong visual game-portal composition of the PGSoft homepage as reference, this page rebuilds brand entry, channels, hero poster, ticker metrics, and content rails into one system.',
    discover: 'Discover',
    activities: 'Activities',
    science: 'Science',
    cases: 'Cases',
    partners: 'Partners',
    contact: 'Contact',
    metrics: 'Platform Pulse',
    path: 'Growth Paths',
    system: 'Four Systems',
    faq: 'Hot FAQ',
    more: 'View More',
    consult: 'Consult Now',
    mini: 'Mini App',
  },
}

export default function HomeShowcase() {
  const { locale } = useGeoLocale()
  const t = COPY[locale]
  const [heroIndex, setHeroIndex] = useState(0)

  const slides = useMemo(
    () => [
      { title: t.activities, href: `${GEO_BASE_PATH}/activities`, image: makeMockCoverDataUri(t.activities, '#173dff', '#ffffff') },
      { title: t.science, href: `${GEO_BASE_PATH}/science`, image: makeMockCoverDataUri(t.science, '#2a73ff', '#ffffff') },
      { title: t.cases, href: `${GEO_BASE_PATH}/cases`, image: makeMockCoverDataUri(t.cases, '#0d1a3d', '#ffffff') },
    ],
    [t.activities, t.science, t.cases],
  )

  useEffect(() => {
    const timer = window.setInterval(() => setHeroIndex((prev) => (prev + 1) % slides.length), 4200)
    return () => window.clearInterval(timer)
  }, [slides.length])

  return (
    <main className="mx-auto max-w-[1440px] px-4 py-6 sm:px-6 lg:px-8">
      <section className="geo-gradient-panel overflow-hidden px-5 py-5 sm:px-7 sm:py-7">
        <div className="grid gap-4 xl:grid-cols-[220px_1fr_320px]">
          <aside className="rounded-[28px] border border-white/10 bg-black/20 p-4 text-white/88 backdrop-blur">
            <div className="text-[11px] font-bold uppercase tracking-[0.22em] text-white/55">{t.discover}</div>
            <div className="mt-4 space-y-2">
              {[
                { label: t.activities, href: `${GEO_BASE_PATH}/activities` },
                { label: t.science, href: `${GEO_BASE_PATH}/science` },
                { label: t.cases, href: `${GEO_BASE_PATH}/cases` },
                { label: t.partners, href: `${GEO_BASE_PATH}/partners` },
                { label: t.contact, href: `${GEO_BASE_PATH}/contact` },
              ].map((item) => (
                <Link key={item.href} href={item.href} className="flex items-center justify-between rounded-[18px] border border-white/8 bg-white/5 px-4 py-3 text-sm font-semibold transition hover:bg-white/10">
                  {item.label}
                  <ArrowRight size={14} />
                </Link>
              ))}
            </div>
          </aside>

          <div className="rounded-[30px] border border-white/10 bg-black/20 p-4 backdrop-blur">
            <div className="flex items-center justify-between gap-3 text-white">
              <div>
                <div className="text-[11px] font-bold uppercase tracking-[0.26em] text-white/55">{t.intro}</div>
                <h1 className="geo-display mt-3 max-w-4xl text-[42px] leading-[0.92] sm:text-[68px]">{t.heroTitle}</h1>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-white/72">{t.heroDesc}</p>
              </div>
              <div className="hidden h-12 w-12 items-center justify-center rounded-full border border-white/14 bg-white/8 text-white xl:flex">
                <Globe size={18} />
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div key={heroIndex} initial={{ opacity: 0.4, scale: 1.02 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0.2, scale: 0.98 }} transition={{ duration: 0.35 }} className="mt-5 overflow-hidden rounded-[28px] border border-white/10">
                <img src={slides[heroIndex].image} alt={slides[heroIndex].title} className="h-[360px] w-full object-cover sm:h-[440px]" />
              </motion.div>
            </AnimatePresence>

            <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
              <div className="flex gap-2">{slides.map((_, i) => <button key={i} onClick={() => setHeroIndex(i)} className={`h-2 rounded-full ${i === heroIndex ? 'w-12 bg-[#ffd15c]' : 'w-4 bg-white/25'}`} />)}</div>
              <div className="flex items-center gap-2">
                <button onClick={() => setHeroIndex((prev) => (prev - 1 + slides.length) % slides.length)} className="rounded-full border border-white/14 bg-white/8 p-2 text-white"><ChevronLeft size={14} /></button>
                <button onClick={() => setHeroIndex((prev) => (prev + 1) % slides.length)} className="rounded-full border border-white/14 bg-white/8 p-2 text-white"><ChevronRight size={14} /></button>
              </div>
            </div>
          </div>

          <aside className="grid gap-4">
            <div className="rounded-[28px] border border-white/10 bg-black/20 p-4 text-white backdrop-blur">
              <div className="text-[11px] font-bold uppercase tracking-[0.22em] text-white/55">{t.metrics}</div>
              <div className="mt-4 space-y-3">
                {HOME_METRICS.map((metric) => (
                  <div key={metric.title} className="rounded-[20px] border border-white/8 bg-white/5 p-4">
                    <div className="text-[11px] text-white/50">{metric.title}</div>
                    <div className="mt-1 text-2xl font-black text-white">{metric.value}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-[28px] border border-white/10 bg-black/20 p-4 text-white backdrop-blur">
              <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.22em] text-white/55"><Play size={12} /> Live CTA</div>
              <div className="mt-4 space-y-3">
                <QrCodeButton qrType="customer_service" buttonText={t.consult} />
                <QrCodeButton qrType="miniapp" buttonText={t.mini} />
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="mt-5 grid gap-4 xl:grid-cols-[1.1fr_.9fr]">
        <div className="geo-panel p-5">
          <div className="mb-4 text-[11px] font-bold uppercase tracking-[0.22em] text-[#8fa8df]">{t.path}</div>
          <div className="grid gap-3 md:grid-cols-3">
            {AGE_GROUPS.map((group, idx) => (
              <div key={group.label} className="rounded-[24px] border border-[rgba(132,169,255,.18)] bg-[rgba(255,255,255,.03)] p-4">
                <div className="text-[40px] font-black leading-none text-[#62d4ff]">0{idx + 1}</div>
                <div className="mt-3 text-base font-black text-white">{group.label}</div>
                <div className="mt-2 text-sm leading-6 text-[#9fa9c8]">{group.text}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="geo-panel p-5">
          <div className="mb-4 text-[11px] font-bold uppercase tracking-[0.22em] text-[#8fa8df]">{t.system}</div>
          <div className="grid gap-3 sm:grid-cols-2">
            {ACTIVITY_SYSTEMS.map((system, index) => (
              <div key={system.key} className={`rounded-[24px] border p-4 ${index % 2 === 0 ? 'border-[rgba(255,209,92,.18)] bg-[rgba(255,209,92,.04)]' : 'border-[rgba(132,169,255,.18)] bg-[rgba(255,255,255,.03)]'}`}>
                <div className="text-lg font-black text-white">{system.title}</div>
                <div className="mt-2 text-sm leading-6 text-[#9fa9c8]">{system.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-5 grid gap-4 xl:grid-cols-[1.05fr_.95fr]">
        <div className="geo-panel p-5">
          <div className="mb-4 text-[11px] font-bold uppercase tracking-[0.22em] text-[#8fa8df]">{t.cases}</div>
          <div className="grid gap-3 md:grid-cols-3">
            {CASES.slice(0, 3).map((item, index) => (
              <Link key={item.id} href={`${GEO_BASE_PATH}/cases/${item.slug}`} className="overflow-hidden rounded-[24px] border border-[rgba(132,169,255,.16)] bg-[rgba(255,255,255,.03)] p-2 transition hover:-translate-y-1">
                <img src={makeMockCoverDataUri(item.title, index % 2 === 0 ? '#173dff' : '#0e1831', '#ffffff')} alt={item.title} className="h-[180px] w-full rounded-[18px] object-cover" />
                <div className="p-3">
                  <div className="text-xs text-[#8fa8df]">{item.city}</div>
                  <div className="mt-1 text-lg font-black text-white">{item.title}</div>
                </div>
              </Link>
            ))}
          </div>
          <Link href={`${GEO_BASE_PATH}/cases`} className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-[#ffd15c]">{t.more} <ArrowRight size={14} /></Link>
        </div>
        <div className="geo-panel p-5">
          <div className="mb-4 text-[11px] font-bold uppercase tracking-[0.22em] text-[#8fa8df]">{t.faq}</div>
          <div className="space-y-3">
            {FAQS.slice(0, 4).map((faq) => (
              <div key={faq.id} className="rounded-[22px] border border-[rgba(132,169,255,.16)] bg-[rgba(255,255,255,.03)] p-4">
                <div className="text-sm font-black text-white">{faq.question}</div>
                <div className="mt-2 text-sm leading-6 text-[#9fa9c8]">{faq.answer}</div>
              </div>
            ))}
          </div>
          <Link href={`${GEO_BASE_PATH}/faq`} className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-[#ffd15c]">{t.more} <ArrowRight size={14} /></Link>
        </div>
      </section>
    </main>
  )
}
