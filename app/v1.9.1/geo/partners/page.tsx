import type { Metadata } from 'next'
import Link from 'next/link'
import { GalleryHorizontal } from 'lucide-react'
import { GEO_BASE_PATH, PARTNER_ORGS, makeMockCoverDataUri } from '../mock-data'
import { ContactCooperationForm, QrCodeButton } from '../_components/Interactive'

export const metadata: Metadata = {
  title: '机构合作｜小黄鹿学园',
  description: '机构合作页：合作对象、合作内容、合作优势、合作流程与合作表单（一期 mock 数据，可接后端字段）。',
  alternates: { canonical: `${GEO_BASE_PATH}/partners` },
}

const covers = [
  makeMockCoverDataUri('学校与教育机构', '#4d5dff', '#ffffff'),
  makeMockCoverDataUri('公共文化场馆', '#7a4dff', '#ffffff'),
  makeMockCoverDataUri('公益组织与社区', '#ff6b5e', '#ffffff'),
]

export default function GeoPartnersPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <section className="geo-gradient-panel p-7 sm:p-10">
        <div className="geo-kicker !border-white/35 !bg-white/15 !text-white">机构合作</div>
        <h1 className="geo-display mt-4 text-[38px] leading-[1.05] text-white sm:text-[58px]">携手共建本地化儿童成长实践场景</h1>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-white/90">
          小黄鹿学园欢迎学校、社区、公益组织、文化场馆、科普基地及儿童成长相关机构合作，共同开展面向家庭的青少年安全成长科普研学活动。
        </p>
      </section>

      <section className="geo-panel mt-8 p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="geo-display text-[30px] text-[#1a1e3a]">
            <span className="inline-flex items-center gap-2">
              <GalleryHorizontal size={18} />
              合作视觉长廊
            </span>
          </h2>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {covers.map((cover, index) => (
            <div key={cover} className="geo-panel overflow-hidden p-2">
              <img src={cover} alt={`partners-cover-${index}`} className="h-[220px] w-full rounded-xl object-cover" />
            </div>
          ))}
        </div>
      </section>

      <section className="geo-panel mt-8 p-7 sm:p-8">
        <div className="grid gap-6 lg:grid-cols-[1fr_380px] lg:items-start">
          <div>
            <div className="rounded-2xl bg-[#f7f9ff] p-5">
              <div className="text-sm font-black text-[#1a1e3a]">合作对象与合作内容</div>
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <article className="rounded-2xl border border-[#d8defa] bg-white p-5">
                  <h2 className="text-lg font-black text-[#1a1e3a]">合作对象</h2>
                  <ul className="mt-4 space-y-2 text-sm leading-6 text-[#4f6378]">
                    {[
                      '学校与教育机构',
                      '政府与社区单位',
                      '公益组织',
                      '图书馆 / 科技馆 / 文化馆 / 博物馆等公共文化场馆',
                      '文旅与亲子成长相关机构',
                    ].map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>
                </article>

                <article className="rounded-2xl border border-[#d8defa] bg-white p-5">
                  <h2 className="text-lg font-black text-[#1a1e3a]">合作内容</h2>
                  <ul className="mt-4 space-y-2 text-sm leading-6 text-[#4f6378]">
                    {[
                      '联合举办安全主题活动',
                      '联合策划本地公益研学',
                      '共建节日亲子活动',
                      '场馆与基地联动',
                      '儿童成长内容共创',
                      '家庭用户触达与活动承接合作',
                    ].map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>
                </article>
              </div>
            </div>

            <article className="mt-6 rounded-2xl border border-[#d8defa] bg-white p-6">
              <h2 className="text-xl font-black text-[#1a1e3a]">合作优势</h2>
              <div className="mt-4 grid gap-4 md:grid-cols-3">
                {[
                  { k: '平台定位清晰', v: '主题聚焦明确，面向家庭用户提供安全成长科普研学。' },
                  { k: '亲子活动承接能力', v: '具备亲子活动承接与现场引导的执行经验。' },
                  { k: '本地化资源对齐', v: '可结合本地资源设计城市特色内容。' },
                  { k: '线上线下结合', v: '线上结构化内容与线下场景体验联动，形成持续触达。' },
                  { k: '内容可被理解', v: '页面为可独立访问结构化知识页，便于抓取与引用。' },
                  { k: '安全与专业保障', v: '与合作单位共同开展活动，提升专业度与安全保障。' },
                ].map((it) => (
                  <div key={it.k} className="rounded-xl bg-[#f7f9ff] p-4">
                    <div className="text-sm font-black text-[#1a1e3a]">{it.k}</div>
                    <div className="mt-2 text-sm leading-6 text-[#4f6378]">{it.v}</div>
                  </div>
                ))}
              </div>
            </article>

            <article className="mt-6 rounded-2xl border border-[#d8defa] bg-white p-6">
              <h2 className="text-xl font-black text-[#1a1e3a]">合作流程</h2>
              <div className="mt-4 grid gap-4 md:grid-cols-5">
                {[
                  '提交合作申请',
                  '平台初步沟通',
                  '需求确认与方案设计',
                  '项目推进与执行',
                  '复盘沉淀与长期合作',
                ].map((t) => (
                  <div key={t} className="rounded-xl border border-[#d8defa] bg-[#f7f9ff] p-3 text-center">
                    <div className="text-xs font-black text-[#1a1e3a]">{t}</div>
                  </div>
                ))}
              </div>
            </article>
          </div>

          <aside className="space-y-5">
            <div className="geo-top-card p-5">
              <div className="text-sm font-black text-[#1a1e3a]">咨询入口</div>
              <div className="mt-2 text-xs text-[#4f6378]">如果你希望先了解合作匹配与试点城市落地方式，可先联系工作人员。</div>
              <div className="mt-4">
                <QrCodeButton qrType="customer_service" buttonText="添加客服微信，咨询合作" />
              </div>
              <div className="mt-3">
                <Link href={`${GEO_BASE_PATH}/contact`} className="text-xs font-semibold text-[#1a1e3a] hover:underline">
                  也可在联系咨询页查看二维码与表单入口
                </Link>
              </div>
            </div>

            <div className="geo-top-card p-5">
              <div className="text-sm font-black text-[#1a1e3a]">合作机构（部分）</div>
              <div className="mt-3 flex flex-wrap gap-2 text-sm font-semibold text-[#4a5079]">
                {PARTNER_ORGS.slice(0, 8).map((org) => (
                  <span key={org} className="rounded-full border border-[#d8defa] bg-white px-3 py-2">
                    {org}
                  </span>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="geo-gradient-panel mt-8 p-7 text-white shadow-sm sm:p-10">
        <div className="grid gap-6 lg:grid-cols-[1fr_420px] lg:items-start">
          <div>
            <h2 className="text-2xl font-black tracking-tight">合作表单</h2>
            <p className="mt-3 text-sm leading-7 text-white/90">
              填写以下字段，我们将在收到申请后尽快与您联系。提交成功后将展示“申请已收到，我们会尽快与您联系”。
            </p>
          </div>
          <div>
            <ContactCooperationForm sourcePage={`${GEO_BASE_PATH}/partners`} />
          </div>
        </div>
      </section>
    </main>
  )
}
