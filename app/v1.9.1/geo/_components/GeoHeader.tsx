'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { GEO_NAV } from '../mock-data'
import { useGeoLocale } from './GeoLocaleContext'

const LABELS = {
  zh: {
    brand: '小黄鹿学园',
    sub: 'GEO EXPERIENCE',
    contact: '联系咨询',
    locale: 'EN',
    menu: '菜单',
  },
  en: {
    brand: 'Fawn Academy',
    sub: 'GEO EXPERIENCE',
    contact: 'Contact',
    locale: '中文',
    menu: 'Menu',
  },
}

export default function GeoHeader() {
  const pathname = usePathname()
  const { locale, toggleLocale } = useGeoLocale()
  const [open, setOpen] = useState(false)
  const t = LABELS[locale]

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-[#d8defa] bg-white/85 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6">
          <div className="flex items-center justify-between gap-3">
            <Link href="/v1.9.1/geo" className="inline-flex items-center gap-3">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[linear-gradient(135deg,#4d5dff_0%,#7a4dff_100%)] text-sm font-black text-white">鹿</span>
              <div>
                <div className="geo-display text-2xl leading-none text-[#1a1e3a]">{t.brand}</div>
                <div className="text-xs font-semibold uppercase tracking-[0.14em] text-[#3d54d8]">{t.sub}</div>
              </div>
            </Link>

            <nav className="hidden flex-wrap items-center gap-2 lg:flex" aria-label="主导航">
              {GEO_NAV.map((it) => {
                const active = pathname === it.href
                return (
                  <Link
                    key={it.href}
                    href={it.href}
                    className={`geo-nav-chip px-3 py-1.5 text-xs font-semibold hover:border-[#b8c4ff] hover:text-[#3d54d8] ${active ? '!border-[#4d5dff] !text-[#3d54d8]' : ''}`}
                  >
                    {it.label}
                  </Link>
                )
              })}
            </nav>

            <div className="hidden items-center gap-2 lg:flex">
              <button
                type="button"
                onClick={toggleLocale}
                className="geo-btn-secondary inline-flex h-10 items-center justify-center px-3 text-xs font-bold"
              >
                {t.locale}
              </button>
              <Link href="/v1.9.1/geo/contact" className="geo-btn-primary inline-flex h-10 items-center justify-center px-4 text-sm font-semibold">
                {t.contact}
              </Link>
            </div>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="geo-btn-secondary inline-flex h-10 items-center gap-2 px-3 text-xs font-bold lg:hidden"
            >
              {open ? <X size={16} /> : <Menu size={16} />} {t.menu}
            </button>
          </div>
        </div>
      </header>

      {open ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-[#13182f]/45"
            aria-label="Close menu"
          />
          <aside className="absolute right-0 top-0 h-full w-[84%] max-w-[360px] border-l border-[#d8defa] bg-white p-5 shadow-2xl">
            <div className="mb-4 flex items-center justify-between">
              <div className="geo-display text-xl text-[#1a1e3a]">{t.brand}</div>
              <button onClick={() => setOpen(false)} className="rounded-lg border border-[#d8defa] p-1.5 text-[#3d54d8]"><X size={16} /></button>
            </div>

            <div className="space-y-2">
              {GEO_NAV.map((it) => {
                const active = pathname === it.href
                return (
                  <Link
                    key={it.href}
                    href={it.href}
                    onClick={() => setOpen(false)}
                    className={`block rounded-xl border px-4 py-3 text-sm font-semibold ${active ? 'border-[#4d5dff] bg-[#eef1ff] text-[#3d54d8]' : 'border-[#d8defa] text-[#4a5079]'}`}
                  >
                    {it.label}
                  </Link>
                )
              })}
            </div>

            <div className="mt-5 grid grid-cols-2 gap-2">
              <button onClick={toggleLocale} className="geo-btn-secondary h-10 text-xs font-bold">{t.locale}</button>
              <Link href="/v1.9.1/geo/contact" onClick={() => setOpen(false)} className="geo-btn-primary inline-flex h-10 items-center justify-center text-xs font-bold">
                {t.contact}
              </Link>
            </div>
          </aside>
        </div>
      ) : null}
    </>
  )
}
