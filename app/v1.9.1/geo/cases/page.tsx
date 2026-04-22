import type { Metadata } from 'next'
import { GEO_BASE_PATH } from '../mock-data'
import CasesCarousel from '../_components/CasesCarousel'

export const metadata: Metadata = {
  title: '合作案例｜小黄鹿学园',
  description: '合作案例页：首期填充 3 个案例，支持后续扩展图片、成果数据、反馈语字段（mock 开发版）。',
  alternates: { canonical: `${GEO_BASE_PATH}/cases` },
}

export default function CasesListPage() {
  return <CasesCarousel />
}
