'use client'

import type { ReactNode } from 'react'
import { usePathname } from 'next/navigation'
import './geo-theme.css'
import GeoHeader from './_components/GeoHeader'
import { GeoLocaleProvider } from './_components/GeoLocaleContext'
import { FooterClient } from './_components/FooterClient'

export default function GeoLayout({
  children,
}: {
  children: ReactNode
}) {
  const pathname = usePathname()
  const hideFooter = pathname === '/v1.9.1/geo/requirement-doc' || pathname === '/v1.9.1/geo/feature-doc'

  return (
    <GeoLocaleProvider>
      <div className="geo-theme min-h-screen">
        <GeoHeader />

        <div>{children}</div>

        {hideFooter ? null : <FooterClient />}
      </div>
    </GeoLocaleProvider>
  )
}
