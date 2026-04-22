'use client'

import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { GEO_BASE_PATH } from '../mock-data'
import { QrCodeButton } from './Interactive'
import { useGeoLocale } from './GeoLocaleContext'

const FLOATING_COPY = {
  zh: {
    title: '活动咨询入口',
    desc: '先咨询再报名，获取适龄推荐与参与方式。',
    consult: '咨询活动报名',
    mini: '关注小程序',
    all: '查看全部咨询入口',
  },
  en: {
    title: 'Consultation Entry',
    desc: 'Ask first, then register with age-appropriate recommendations.',
    consult: 'Consult Activities',
    mini: 'Follow Mini App',
    all: 'View all contact channels',
  },
}

export function Reveal({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}

export function HoverLift({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <motion.div
      className={className}
      whileHover={{
        y: -4,
        scale: 1.01,
        boxShadow: '0 30px 45px -30px rgba(50,50,93,0.25), 0 18px 36px -18px rgba(0,0,0,0.1)',
      }}
      transition={{ type: 'spring', stiffness: 280, damping: 24 }}
    >
      {children}
    </motion.div>
  )
}

export function FloatingConsultCard() {
  const { locale } = useGeoLocale()
  const t = FLOATING_COPY[locale]

  return (
    <motion.aside
      initial={{ y: 18, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.35, delay: 0.2 }}
      whileHover={{ y: -4 }}
      className="fixed bottom-5 right-4 z-40 hidden w-64 rounded-lg border border-[#e5edf5] bg-white p-4 shadow-[0_30px_45px_-30px_rgba(50,50,93,.25),0_18px_36px_-18px_rgba(0,0,0,.1)] md:block"
    >
      <div className="text-sm font-semibold text-[#061b31]">{t.title}</div>
      <div className="mt-1 text-xs leading-6 text-[#4f6378]">{t.desc}</div>
      <div className="mt-3 space-y-2">
        <QrCodeButton qrType="customer_service" buttonText={t.consult} />
        <QrCodeButton qrType="miniapp" buttonText={t.mini} />
        <Link
          href={`${GEO_BASE_PATH}/contact`}
          className="geo-btn-secondary inline-flex h-9 w-full items-center justify-center px-3 text-xs font-semibold transition hover:-translate-y-0.5"
        >
          {t.all}
        </Link>
      </div>
    </motion.aside>
  )
}
