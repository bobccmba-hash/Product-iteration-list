'use client'

import { createContext, useContext, useEffect, useMemo, useState } from 'react'

type Locale = 'zh' | 'en'

type GeoLocaleContextValue = {
  locale: Locale
  setLocale: (locale: Locale) => void
  toggleLocale: () => void
}

const GeoLocaleContext = createContext<GeoLocaleContextValue | null>(null)

function normalizeLocale(input: string | null): Locale | null {
  if (!input) return null
  if (input.toLowerCase() === 'en') return 'en'
  if (input.toLowerCase() === 'zh') return 'zh'
  return null
}

export function GeoLocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState<Locale>('zh')

  useEffect(() => {
    if (typeof window === 'undefined') return
    const fromQuery = normalizeLocale(new URL(window.location.href).searchParams.get('lang'))
    const fromStorage = normalizeLocale(window.localStorage.getItem('geo-locale'))
    const next = fromQuery ?? fromStorage ?? 'zh'
    setLocale(next)
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') return
    window.localStorage.setItem('geo-locale', locale)
    const url = new URL(window.location.href)
    url.searchParams.set('lang', locale)
    window.history.replaceState(null, '', url.toString())
  }, [locale])

  const value = useMemo(
    () => ({
      locale,
      setLocale,
      toggleLocale: () => setLocale((prev) => (prev === 'zh' ? 'en' : 'zh')),
    }),
    [locale],
  )

  return <GeoLocaleContext.Provider value={value}>{children}</GeoLocaleContext.Provider>
}

export function useGeoLocale() {
  const ctx = useContext(GeoLocaleContext)
  if (!ctx) {
    throw new Error('useGeoLocale must be used within GeoLocaleProvider')
  }
  return ctx
}
