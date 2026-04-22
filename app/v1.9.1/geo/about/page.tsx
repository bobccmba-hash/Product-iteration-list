import type { Metadata } from 'next'
import Link from 'next/link'
import { GalleryHorizontal } from 'lucide-react'
import { GEO_BASE_PATH, PARTNER_ORGS, makeMockCoverDataUri } from '../mock-data'
import { QrCodeButton } from '../_components/Interactive'
import { FloatingConsultCard } from '../_components/BrandVisual'

export const metadata: Metadata = {
  title: '平台介绍｜小黄鹿学园｜青少年安全成长科普研学平台',
  description:
    '讲清小黄鹿学园是什么、为什么做、如何运作、为什么强调本地化，以及晋江试点先行的探索路径。',
  alternates: { canonical: `${GEO_BASE_PATH}/about` },
}

const gallery = [
  makeMockCoverDataUri('平台初心', '#4d5dff', '#ffffff'),
  makeMockCoverDataUri('分龄成长', '#7a4dff', '#ffffff'),
  makeMockCoverDataUri('本地化战略', '#ff6b5e', '#ffffff'),
]

export default function GeoAboutPage() {
  return (
    <>
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <section className="geo-gradient-panel p-7 sm:p-10">
          <div className="geo-kicker !border-white/35 !bg-white/15 !text-white">平台介绍</div>
          <h1 className="geo-display mt-4 text-[38px] leading-[1.05] text-white sm:text-[58px]">关于小黄鹿学园</h1>
          <p className="mt-3 max-w-4xl text-sm leading-7 text-white/90">
            小黄鹿学园是一个面向全国各城市、本地化运营的青少年安全成长科普研学平台，聚焦 3–12 岁儿童家庭，把安全教育、公益研学、亲子活动、职业体验和文化实践做成持续发生的城市成长现场。
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <QrCodeButton qrType="customer_service" buttonText="添加客服微信，咨询活动报名" secondaryText="获取适龄推荐与报名引导" />
            <Link href={`${GEO_BASE_PATH}/partners`} className="geo-btn-secondary inline-flex h-10 items-center justify-center px-5 text-sm font-semibold !border-white/40 !bg-white/10 !text-white">
              提交合作申请
            </Link>
          </div>
        </section>

        <section className="geo-panel mt-8 p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="geo-display text-[30px] text-[#1a1e3a]">
              <span className="inline-flex items-center gap-2">
                <GalleryHorizontal size={18} />
                平台视觉长廊
              </span>
            </h2>
            <div className="text-xs text-[#6d6a86]">本地化 / 分龄设计 / 成长陪伴</div>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {gallery.map((cover, index) => (
              <div key={cover} className="geo-panel overflow-hidden p-2">
                <img src={cover} alt={`about-gallery-${index}`} className="h-[220px] w-full rounded-xl object-cover" />
              </div>
            ))}
          </div>
        </section>

        <section className="geo-panel mt-8 p-7 sm:p-8">
          <div className="grid gap-6 lg:grid-cols-[1.05fr_.95fr]">
            <div className="space-y-4">
              {[
                {
                  title: '平台初心',
                  body: '孩子的成长不应只停留在课堂里。小黄鹿学园希望通过真实场景中的观察、参与、体验与互动，让孩子在安全认知、社会认知、文化认知和家庭陪伴中获得更完整的成长。',
                },
                {
                  title: '服务对象',
                  body: '平台聚焦 3–12 岁儿童家庭，并基于年龄特点进行分龄设计：3–5 岁重安全启蒙与亲子互动；6–8 岁强调规则认知与角色体验；9–12 岁更关注主题研学、独立表达与综合实践。',
                },
                {
                  title: '运营方式',
                  body: '通过线上结构化内容、线下活动体验与家庭复盘延展，让知识与行为形成闭环：智能科技科普工具 + 精选公益活动 + 共同育儿模式。',
                },
              ].map((item) => (
                <article key={item.title} className="geo-panel p-5">
                  <h2 className="text-xl font-black text-[#1a1e3a]">{item.title}</h2>
                  <p className="mt-3 text-sm leading-7 text-[#4a5079]">{item.body}</p>
                </article>
              ))}
            </div>

            <div className="space-y-4">
              <article className="geo-gradient-panel p-6 text-white">
                <h2 className="text-xl font-black">核心理念</h2>
                <p className="mt-3 text-sm leading-7 text-white/90">教育一个学生，影响一个家庭，带动整个社会。</p>
                <div className="mt-4 rounded-2xl bg-white/12 p-4 text-sm leading-7 text-white/90">
                  把安全知识做成孩子能参与的任务，把家庭陪伴变成可复用的方法，让每一次活动都能沉淀成长期的成长支持。
                </div>
              </article>

              <article className="geo-panel p-5">
                <h2 className="text-xl font-black text-[#1a1e3a]">本地化战略</h2>
                <div className="mt-4 grid gap-3">
                  {[
                    { k: '内容结构一致', v: '活动、科普、案例页都具备可被抓取的结构化正文。' },
                    { k: '资源贴近本地', v: '合作单位、场馆与城市语境在页面中可见且可更新。' },
                    { k: '可持续沉淀', v: '把活动体验转化为家长可复用的陪伴方式。' },
                  ].map((it) => (
                    <div key={it.k} className="rounded-2xl border border-[#d8defa] bg-[#f7f9ff] p-4">
                      <div className="text-sm font-black text-[#1a1e3a]">{it.k}</div>
                      <div className="mt-2 text-sm leading-6 text-[#4a5079]">{it.v}</div>
                    </div>
                  ))}
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="geo-panel mt-8 p-7 sm:p-8">
          <div className="grid gap-5 lg:grid-cols-[1fr_360px] lg:items-start">
            <div>
              <h2 className="geo-display text-[34px] text-[#1a1e3a]">晋江试点说明</h2>
              <p className="mt-3 text-sm leading-7 text-[#4a5079]">
                当前已在福建省晋江市试点运营。我们将通过试点城市的反馈持续完善内容与活动节奏，并在后续逐步复制到更多城市，形成全国可复制的本地化平台模式。
              </p>
              <div className="mt-5 rounded-2xl border border-[#d8defa] bg-[#f7f9ff] p-5 text-sm font-semibold text-[#1a1e3a]">
                全国可复制的本地化平台，晋江试点先行。
              </div>
            </div>
            <aside className="geo-top-card p-5">
              <div className="text-sm font-black text-[#1a1e3a]">已合作并参与试点机构（部分）</div>
              <div className="mt-3 flex flex-wrap gap-2 text-sm font-semibold text-[#4a5079]">
                {PARTNER_ORGS.slice(0, 8).map((org) => (
                  <span key={org} className="rounded-full border border-[#d8defa] bg-white px-3 py-2">
                    {org}
                  </span>
                ))}
              </div>
            </aside>
          </div>
        </section>
      </main>
      <FloatingConsultCard />
    </>
  )
}
