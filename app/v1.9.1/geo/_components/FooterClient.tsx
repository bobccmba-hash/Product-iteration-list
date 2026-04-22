'use client'

import Link from 'next/link'
import { GEO_BASE_PATH } from '../mock-data'
import { useGeoLocale } from './GeoLocaleContext'

const FOOTER_COPY = {
  zh: {
    brand: '小黄鹿学园',
    desc: '全国可复制的本地化平台，晋江试点先行。保留 GEO 框架内容并持续演进体验。',
    channels: '核心入口',
    audience: '服务对象',
    audienceDesc: '第一优先：家长家庭；第二优先：政府 / 社区 / 公益合作方；第三优先：B 端合作机构。',
    cta: '联系咨询',
    links: {
      activities: '公益活动',
      science: '安全科普',
      cases: '合作案例',
      partners: '机构合作',
    },
  },
  en: {
    brand: 'Fawn Academy',
    desc: 'A localized model that can scale nationwide, with Jinjiang as the pilot city.',
    channels: 'Key Channels',
    audience: 'Audience',
    audienceDesc: 'Primary: families; secondary: government / community / public-interest partners; third: business institutions.',
    cta: 'Contact',
    links: {
      activities: 'Activities',
      science: 'Science',
      cases: 'Cases',
      partners: 'Partners',
    },
  },
}

export function FooterClient() {
  const { locale } = useGeoLocale()
  const t = FOOTER_COPY[locale]

  return (
    <footer className="mt-14 border-t border-[#d8defa] bg-white/80">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <div className="mb-6 rounded-[24px] border border-[#d8defa] bg-[linear-gradient(135deg,#4158ff_0%,#7a4dff_55%,#ff6b5e_100%)] p-6 text-white shadow-[0_24px_48px_-30px_rgba(73,59,180,.55)]">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="geo-display text-2xl">{t.brand}</div>
              <p className="mt-2 max-w-2xl text-sm leading-7 text-white/90">{t.desc}</p>
            </div>
            <Link href={`${GEO_BASE_PATH}/contact`} className="geo-btn-secondary inline-flex h-11 items-center justify-center px-5 text-sm font-semibold !border-white/30 !bg-white !text-[#3142bf] transition hover:-translate-y-0.5">
              {t.cta}
            </Link>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div>
            <div className="geo-display text-xl text-[#1a1e3a]">{t.brand}</div>
            <p className="mt-2 text-sm leading-6 text-[#4a5079]">{t.desc}</p>
          </div>
          <div>
            <div className="text-sm font-black text-[#1a1e3a]">{t.channels}</div>
            <div className="mt-2 flex flex-wrap gap-2 text-sm text-[#4a5079]">
              <Link href={`${GEO_BASE_PATH}/activities`} className="transition hover:text-[#3d54d8]">{t.links.activities}</Link>
              <Link href={`${GEO_BASE_PATH}/science`} className="transition hover:text-[#3d54d8]">{t.links.science}</Link>
              <Link href={`${GEO_BASE_PATH}/cases`} className="transition hover:text-[#3d54d8]">{t.links.cases}</Link>
              <Link href={`${GEO_BASE_PATH}/partners`} className="transition hover:text-[#3d54d8]">{t.links.partners}</Link>
            </div>
          </div>
          <div>
            <div className="text-sm font-black text-[#1a1e3a]">{t.audience}</div>
            <p className="mt-2 text-sm leading-6 text-[#4a5079]">{t.audienceDesc}</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
