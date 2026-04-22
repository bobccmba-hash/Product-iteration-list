import type { Metadata } from 'next'
import { GalleryHorizontal } from 'lucide-react'
import { GEO_BASE_PATH, makeMockCoverDataUri } from '../mock-data'
import { QrCodeButton, ContactCooperationForm } from '../_components/Interactive'
import { FloatingConsultCard } from '../_components/BrandVisual'

export const metadata: Metadata = {
  title: '联系小黄鹿学园｜小黄鹿学园',
  description: '联系咨询页：小黄鹿咨询客服二维码、小黄鹿学园小程序二维码、合作表单入口（一期 mock 数据）。',
  alternates: { canonical: `${GEO_BASE_PATH}/contact` },
}

export default function GeoContactPage() {
  const covers = [
    makeMockCoverDataUri('家长咨询区', '#4d5dff', '#ffffff'),
    makeMockCoverDataUri('小程序关注区', '#7a4dff', '#ffffff'),
    makeMockCoverDataUri('机构合作入口', '#ff6b5e', '#ffffff'),
  ]

  return (
    <>
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <section className="geo-gradient-panel p-7 sm:p-10">
          <div className="geo-kicker !border-white/35 !bg-white/15 !text-white">联系咨询</div>
          <h1 className="geo-display mt-4 text-[38px] leading-[1.05] text-white sm:text-[58px]">联系小黄鹿学园</h1>
          <p className="max-w-3xl text-sm leading-7 text-white/90">
            把咨询、二维码、小程序与合作入口整合为统一的联系中心，延续媒体门户式的信息入口体验。
          </p>
        </section>

        <section className="geo-panel mt-8 p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="geo-display text-[30px] text-[#1a1e3a]">
              <span className="inline-flex items-center gap-2">
                <GalleryHorizontal size={18} />
                联系入口画廊
              </span>
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {covers.map((cover, index) => (
              <div key={cover} className="geo-panel overflow-hidden p-2">
                <img src={cover} alt={`contact-cover-${index}`} className="h-[200px] w-full rounded-xl object-cover" />
              </div>
            ))}
          </div>
        </section>

        <section className="geo-panel mt-8 p-7 sm:p-8">
          <div className="grid gap-6 lg:grid-cols-[1fr_380px] lg:items-start">
            <div className="space-y-6">
              <div className="geo-panel p-6">
                <div className="text-sm font-black text-[#1a1e3a]">家长咨询区：咨询活动报名</div>
                <div className="mt-2 text-sm leading-7 text-[#4f6378]">
                  如果您想了解当前试点城市的近期活动安排、适龄推荐、活动形式或参与方式，欢迎扫码添加“小黄鹿咨询客服”，我们将为您提供一对一咨询支持。
                </div>
                <div className="mt-4">
                  <QrCodeButton qrType="customer_service" buttonText="显示/打开小黄鹿咨询客服二维码" />
                </div>
              </div>

              <div className="geo-panel p-6">
                <div className="text-sm font-black text-[#1a1e3a]">小程序关注区：关注小程序，获取平台动态</div>
                <div className="mt-2 text-sm leading-7 text-[#4f6378]">
                  扫码关注“小黄鹿学园”小程序，了解平台信息、活动动态与后续更新内容。
                </div>
                <div className="mt-4">
                  <QrCodeButton qrType="miniapp" buttonText="显示/打开小黄鹿学园小程序二维码" />
                </div>
              </div>
            </div>

            <aside className="geo-gradient-panel p-6 text-white">
              <div className="text-sm font-black">合作表单入口</div>
              <div className="mt-2 text-sm leading-7 text-white/90">
                如果您来自学校、社区、公益组织、文化场馆或成长相关机构，希望与小黄鹿学园开展合作，欢迎填写合作申请表单，我们将尽快与您联系。
              </div>
              <div className="mt-5">
                <ContactCooperationForm sourcePage={`${GEO_BASE_PATH}/contact`} compact />
              </div>
            </aside>
          </div>

          <div className="mt-8 rounded-2xl border border-[#d8defa] bg-[#f7f9ff] p-6">
            <div className="text-sm font-black text-[#1a1e3a]">二维码组件状态说明</div>
            <div className="mt-2 text-sm leading-7 text-[#4f6378]">
              客服二维码支持弹层展示、长按识别/保存提示、失效提示与备用说明；小程序二维码失效时提示“二维码更新中，请稍后再试”（mock 数据开发版模拟）。
            </div>
          </div>
        </section>
      </main>
      <FloatingConsultCard />
    </>
  )
}
