'use client'

import { useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'
import { ChevronLeft, ChevronRight, GalleryHorizontal } from 'lucide-react'
import { GEO_BASE_PATH, FAQS, makeMockCoverDataUri, type FaqGroup } from '../mock-data'
import { QrCodeButton } from './Interactive'
import { useGeoLocale } from './GeoLocaleContext'

const GROUPS_ZH: { key: FaqGroup; label: string }[] = [
  { key: 'platform', label: '平台' },
  { key: 'activity', label: '活动' },
  { key: 'signup', label: '报名' },
  { key: 'cooperation', label: '合作' },
  { key: 'localization', label: '本地化' },
]

const GROUPS_EN: { key: FaqGroup; label: string }[] = [
  { key: 'platform', label: 'Platform' },
  { key: 'activity', label: 'Activities' },
  { key: 'signup', label: 'Sign-up' },
  { key: 'cooperation', label: 'Cooperation' },
  { key: 'localization', label: 'Localization' },
]

const COPY = {
  zh: {
    kicker: '常见问题',
    title: 'FAQ 内容舞台',
    desc: '把 FAQ 做成更易浏览的内容频道：分组筛选、可视化卡片、手风琴交互与快速咨询入口并存。',
    gallery: 'FAQ 精选长廊',
    browse: '快速分组浏览',
    browseTitle: '常见问题与快速咨询',
    consult: '快速咨询',
    consultBtn: '添加客服微信',
    apply: '提交合作申请',
    aside: 'FAQ 手风琴交互',
    asideDesc: '平滑高度过渡、图标旋转、当前项高亮、分组切换与快速咨询入口已统一到新的内容舞台风格。',
  },
  en: {
    kicker: 'FAQ',
    title: 'FAQ Content Stage',
    desc: 'Turn FAQs into a browsable content channel with filters, visual cards, accordion interactions, and quick consultation.',
    gallery: 'Featured FAQ Gallery',
    browse: 'Quick Group Browsing',
    browseTitle: 'FAQ & Quick Consultation',
    consult: 'Quick Consultation',
    consultBtn: 'Add WeChat',
    apply: 'Submit Partnership',
    aside: 'Accordion Interaction',
    asideDesc: 'Smooth height transitions, rotating icons, active item highlights, and grouped consultation are now unified.',
  },
}

export default function FaqInteractive({ group }: { group: FaqGroup }) {
  const { locale } = useGeoLocale()
  const t = COPY[locale]
  const groups = locale === 'zh' ? GROUPS_ZH : GROUPS_EN
  const list = useMemo(() => FAQS.filter((f) => f.faq_group === group).sort((a, b) => a.sort_order - b.sort_order), [group])
  const [active, setActive] = useState(0)
  const galleryRef = useRef<HTMLDivElement | null>(null)

  const media = useMemo(() => list.slice(0, 6).map((item, i) => ({ ...item, image: makeMockCoverDataUri(item.question, i % 2 === 0 ? '#4d5dff' : '#ff6b5e', '#ffffff') })), [list])

  const scrollGallery = (direction: 'left' | 'right') => {
    if (!galleryRef.current) return
    galleryRef.current.scrollBy({ left: direction === 'left' ? -360 : 360, behavior: 'smooth' })
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <section className="geo-gradient-panel p-7 sm:p-10">
        <div className="geo-kicker !border-white/35 !bg-white/15 !text-white">{t.kicker}</div>
        <h1 className="geo-display mt-4 text-[38px] leading-[1.05] text-white sm:text-[58px]">{t.title}</h1>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-white/90">{t.desc}</p>
      </section>

      <section className="geo-panel mt-8 p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="geo-display text-[30px] text-[#1a1e3a]"><span className="inline-flex items-center gap-2"><GalleryHorizontal size={18} />{t.gallery}</span></h2>
          <div className="flex items-center gap-2">
            <button onClick={() => scrollGallery('left')} className="rounded-lg border border-[#d8defa] bg-white p-1.5 text-[#3d54d8]"><ChevronLeft size={14} /></button>
            <button onClick={() => scrollGallery('right')} className="rounded-lg border border-[#d8defa] bg-white p-1.5 text-[#3d54d8]"><ChevronRight size={14} /></button>
          </div>
        </div>
        <div ref={galleryRef} className="geo-carousel-track pb-2">
          {media.map((item) => (
            <article key={item.id} className="geo-carousel-item geo-panel overflow-hidden p-2">
              <img src={item.image} alt={item.question} className="h-[210px] w-full rounded-xl object-cover" />
              <div className="p-3"><div className="text-xs font-semibold text-[#4a5079]">{groups.find((g) => g.key === item.faq_group)?.label}</div><div className="mt-1 text-sm font-black text-[#1a1e3a]">{item.question}</div></div>
            </article>
          ))}
        </div>
      </section>

      <section className="geo-panel mt-8 p-7 sm:p-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <div className="inline-flex rounded-full bg-[#eef1ff] px-3 py-1 text-xs font-semibold text-[#3d54d8]">{t.browse}</div>
            <h2 className="mt-4 text-3xl font-black tracking-tight text-[#1a1e3a] sm:text-4xl">{t.browseTitle}</h2>
          </div>
          <div className="geo-top-card w-full max-w-md p-5">
            <div className="text-sm font-black text-[#1a1e3a]">{t.consult}</div>
            <div className="mt-3 space-y-3">
              <QrCodeButton qrType="customer_service" buttonText={t.consultBtn} />
              <Link href={`${GEO_BASE_PATH}/partners`} className="geo-btn-primary inline-flex h-10 items-center justify-center px-5 text-sm font-semibold text-white">{t.apply}</Link>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-2">
          {groups.map((g) => (
            <Link key={g.key} href={`${GEO_BASE_PATH}/faq?group=${g.key}`} className={`rounded-full border px-4 py-2 text-sm font-semibold ${g.key === group ? 'border-[#4d5dff] bg-[#4d5dff] text-white' : 'border-[#d8defa] bg-white text-[#4a5079]'}`}>
              {g.label}
            </Link>
          ))}
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-[1fr_340px]">
          <div className="space-y-3">
            {list.map((f, i) => {
              const expanded = i === active
              return (
                <motion.div key={f.id} layout className={`rounded-2xl border p-4 transition ${expanded ? 'border-[#4d5dff] bg-[#f4f7ff]' : 'border-[#d8defa] bg-white opacity-95'}`}>
                  <button onClick={() => setActive(expanded ? -1 : i)} className="flex w-full items-center justify-between gap-3 text-left">
                    <span className="text-sm font-black text-[#1a1e3a]">{f.question}</span>
                    <motion.span animate={{ rotate: expanded ? 45 : 0 }} className="text-[#6d6a86]">+</motion.span>
                  </button>
                  <AnimatePresence>
                    {expanded ? (
                      <motion.p initial={{ height: 0, opacity: 0, marginTop: 0 }} animate={{ height: 'auto', opacity: 1, marginTop: 12 }} exit={{ height: 0, opacity: 0, marginTop: 0 }} className="overflow-hidden text-sm leading-7 text-[#4f6378]">
                        {f.answer}
                      </motion.p>
                    ) : null}
                  </AnimatePresence>
                </motion.div>
              )
            })}
          </div>

          <aside className="geo-gradient-panel p-5 text-white">
            <div className="text-sm font-black">{t.aside}</div>
            <div className="mt-2 text-sm leading-7 text-white/90">{t.asideDesc}</div>
          </aside>
        </div>
      </section>
    </main>
  )
}
