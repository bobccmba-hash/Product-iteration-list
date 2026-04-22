import type { Metadata } from 'next'
import { GEO_BASE_PATH } from './mock-data'
import HomeShowcase from './_components/HomeShowcase'

export const metadata: Metadata = {
  title: '小黄鹿学园｜青少年安全成长科普研学平台',
  description:
    '小黄鹿学园是一个面向全国各城市、本地化运营的青少年安全成长科普研学平台，聚焦3–12岁儿童家庭，陪孩子在实践中学习安全与成长。',
  alternates: {
    canonical: `${GEO_BASE_PATH}`,
  },
}

function HomeJsonLd() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: '小黄鹿学园｜青少年安全成长科普研学平台',
    url: '/v1.9.1/geo',
    slogan: '陪孩子在实践中学习安全与成长',
    sameAs: [],
  }
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

export default function GeoHomePage() {
  return (
    <>
      <HomeJsonLd />
      <div className="mx-auto max-w-7xl px-4 pt-4 sm:px-6">
        <a
          href="/v1.9.1/geo/requirement-doc"
          className="inline-flex h-10 items-center justify-center rounded-lg border border-[#d8defa] bg-white px-4 text-sm font-semibold text-[#3d54d8] hover:bg-[#eef1ff]"
        >
          ← 返回上一层
        </a>
      </div>
      <HomeShowcase />
    </>
  )
}
