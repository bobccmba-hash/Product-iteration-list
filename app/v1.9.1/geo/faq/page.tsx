import type { Metadata } from 'next'
import { GEO_BASE_PATH, FAQS, type FaqGroup } from '../mock-data'
import FaqInteractive from '../_components/FaqInteractive'
import { FloatingConsultCard } from '../_components/BrandVisual'

export const metadata: Metadata = {
  title: '常见问题｜小黄鹿学园',
  description: 'FAQ 页面采用问答形式输出，支持 AI / 搜索问答型检索理解（mock 数据开发版）。',
  alternates: { canonical: `${GEO_BASE_PATH}/faq` },
}

const GROUPS: { key: FaqGroup; label: string }[] = [
  { key: 'platform', label: '平台' },
  { key: 'activity', label: '活动' },
  { key: 'signup', label: '报名' },
  { key: 'cooperation', label: '合作' },
  { key: 'localization', label: '本地化' },
]

export default async function GeoFaqPage({
  searchParams,
}: {
  searchParams?: Promise<{ group?: string }>
}) {
  const resolvedSearchParams = await searchParams
  const activeGroup = (resolvedSearchParams?.group as FaqGroup | undefined) ?? 'platform'
  const allowed = new Set(GROUPS.map((g) => g.key))
  const group: FaqGroup = allowed.has(activeGroup) ? activeGroup : 'platform'
  const list = FAQS.filter((f) => f.faq_group === group).sort((a, b) => a.sort_order - b.sort_order)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: list.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.answer,
      },
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <FaqInteractive group={group} />
      <FloatingConsultCard />
    </>
  )
}
