import type { Metadata } from 'next'
import { GEO_BASE_PATH } from '../mock-data'
import ActivitiesExplorer from '../_components/ActivitiesExplorer'

export const metadata: Metadata = {
  title: '公益活动｜小黄鹿学园',
  description: '四大活动体系聚合展示，支持后续按试点城市与适龄范围筛选扩展（一期 mock 数据）。',
  alternates: { canonical: `${GEO_BASE_PATH}/activities` },
}

export default function ActivitiesListPage() {
  return <ActivitiesExplorer />
}
