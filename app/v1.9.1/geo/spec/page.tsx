import type { Metadata } from 'next'
import { GalleryHorizontal } from 'lucide-react'
import { GEO_BASE_PATH, makeMockCoverDataUri } from '../mock-data'

export const metadata: Metadata = {
  title: '开发规范｜小黄鹿学园 GEO 一期',
  description:
    '字段规则、状态机、异常提示、双版本文案规范与 GEO/SEO 技术要求对照页，供产品/研发/测试统一执行。',
  alternates: { canonical: `${GEO_BASE_PATH}/spec` },
}

const FIELD_COMMON = [
  '页面标题：必填，建议不超过 28 个中文字符',
  '页面副标题：选填，建议 40–80 字',
  '页面摘要：必填，60–150 字',
  '封面图：必填',
  '发布时间：内容页必填',
  '更新时间：内容页必填',
  '主 CTA 文案：必填',
  '次 CTA 文案：选填',
  '图片 alt：必填',
  '图片说明：建议填写',
]

const FIELD_ACTIVITY = [
  '活动标题：必填，最长 24 字',
  '活动副标题：选填，最长 40 字',
  '活动类型：必填，枚举',
  '适龄范围：必填，枚举',
  '活动地点：必填',
  '活动时间：必填',
  '合作单位：可公开时必填',
  '活动简介：必填，120–300 字',
  '亮点说明：2–5 条',
  '安全说明：必填',
  '咨询方式：必填',
  '图片：至少 3 张',
  '相关 FAQ：建议 3–5 条',
]

const FIELD_COOP = [
  '机构名称：必填，最长 50 字',
  '联系人：必填，最长 20 字',
  '联系电话：必填，11 位手机号校验',
  '所在城市：必填',
  '合作类型：必填，枚举',
  '合作需求说明：必填，最长 500 字',
]

const CTA_STATES = ['默认：可点击', 'Hover：高亮', 'Loading：显示加载中，不可重复点击', 'Disabled：字段不完整或资源未配置', 'Success：提交成功或二维码已展开', 'Fail：显示失败提示', 'Hidden：当前页面不展示该按钮']
const FORM_STATES = ['未填写', '填写中', '校验失败', '提交中', '提交成功', '提交失败']
const QR_STATES = ['默认未展开', '已展开', '图片加载中', '加载失败', '已失效待更新']
const USER_COPY_RULES = ['先讲“对你有什么用”', '少口号，多具体', '少平台话，多场景话', '让家长一眼知道平台适不适合自己']
const DEV_COPY_RULES = ['所有文案必须有 key', '所有状态文案必须唯一', '所有错误提示必须可复用']
const COPY_KEYS = [
  'cta_consult_default = 添加客服微信，咨询活动报名',
  'cta_follow_miniapp = 扫码关注小程序',
  'cta_partner_apply = 提交合作申请',
  'toast_submit_success = 申请已收到，我们会尽快与您联系',
  'toast_network_error = 网络异常，请检查后重试',
]
const SEO_ITEMS = [
  '首页、平台介绍、活动分类页、活动详情页、科普文章页、案例页、合作页、FAQ 页均需要可独立访问 URL。',
  '建议采用 SSR、SSG 或预渲染，避免核心正文完全依赖客户端异步渲染。',
  '建议 URL：/about、/activities、/activities/safety、/activities/{slug}、/science/{slug}、/cases/{slug}、/partners、/faq、/contact。',
  '必备站点配置：robots.txt、sitemap.xml、canonical、OG meta、页面 title/description、更新时间字段、图片 alt、面包屑。',
  '结构化数据建议：首页 Organization；内容页 BreadcrumbList；活动详情页 Event；科普文章页 Article；FAQ 页 FAQPage。',
  '内容原则：每个页面正文必须可见、可读、可复制；结构化数据必须和用户可见内容一致；活动/案例页必须有清晰标题、摘要、正文、时间、地点、主体、CTA。',
]

const covers = [
  makeMockCoverDataUri('字段规则', '#4d5dff', '#ffffff'),
  makeMockCoverDataUri('状态机', '#7a4dff', '#ffffff'),
  makeMockCoverDataUri('GEO / SEO 技术要求', '#ff6b5e', '#ffffff'),
]

export default function GeoSpecPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <section className="geo-gradient-panel p-7 sm:p-10">
        <div className="geo-kicker !border-white/35 !bg-white/15 !text-white">开发规范对照页</div>
        <h1 className="geo-display mt-4 text-[38px] leading-[1.05] text-white sm:text-[58px]">GEO 官网一期规范</h1>
        <p className="max-w-4xl text-sm leading-7 text-white/90">
          本页用于产品、研发、测试统一对照执行：字段规则、交互与异常处理、状态机、文案规范、GEO/SEO 技术要求。
        </p>
      </section>

      <section className="geo-panel mt-8 p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="geo-display text-[30px] text-[#1a1e3a]">
            <span className="inline-flex items-center gap-2">
              <GalleryHorizontal size={18} />
              规范索引画廊
            </span>
          </h2>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {covers.map((cover, index) => (
            <div key={cover} className="geo-panel overflow-hidden p-2">
              <img src={cover} alt={`spec-cover-${index}`} className="h-[220px] w-full rounded-xl object-cover" />
            </div>
          ))}
        </div>
      </section>

      <section className="geo-panel mt-8 p-7 sm:p-8 space-y-8">
        <section>
          <h2 className="text-2xl font-black text-[#1a1e3a]">8. 页面字段规范</h2>
          <div className="mt-4 grid gap-4 lg:grid-cols-3">
            {[
              { title: '8.1 全站通用字段', items: FIELD_COMMON },
              { title: '8.2 活动详情字段', items: FIELD_ACTIVITY },
              { title: '8.3 合作表单字段', items: FIELD_COOP },
            ].map(({ title, items }) => (
              <article key={title} className="rounded-2xl border border-[#d8defa] bg-[#f7f9ff] p-5">
                <h3 className="text-sm font-black text-[#1a1e3a]">{title}</h3>
                <ul className="mt-3 space-y-2 text-sm text-slate-700">
                  {items.map((it) => <li key={it}>{it}</li>)}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-black text-[#1a1e3a]">9 / 10. 交互与状态机</h2>
          <div className="mt-4 grid gap-4 lg:grid-cols-3">
            {[
              { title: '按钮状态', items: CTA_STATES },
              { title: '合作表单状态', items: FORM_STATES },
              { title: '二维码组件状态', items: QR_STATES },
            ].map(({ title, items }) => (
              <article key={title} className="rounded-2xl border border-[#d8defa] bg-white p-5">
                <h3 className="text-sm font-black text-[#1a1e3a]">{title}</h3>
                <ul className="mt-3 space-y-2 text-sm text-slate-700">
                  {items.map((it) => <li key={it}>{it}</li>)}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-black text-[#1a1e3a]">11. 双版本文案规范</h2>
          <div className="mt-4 grid gap-4 lg:grid-cols-2">
            <article className="rounded-2xl border border-[#d8defa] bg-white p-5">
              <h3 className="text-sm font-black text-[#1a1e3a]">11.1 给用户看的文案原则</h3>
              <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-700">
                {USER_COPY_RULES.map((it) => <li key={it}>{it}</li>)}
              </ul>
            </article>
            <article className="rounded-2xl border border-[#d8defa] bg-white p-5">
              <h3 className="text-sm font-black text-[#1a1e3a]">11.2 给开发看的文案原则</h3>
              <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-700">
                {DEV_COPY_RULES.map((it) => <li key={it}>{it}</li>)}
              </ul>
              <div className="mt-4 rounded-xl bg-[#f7f9ff] p-4">
                <div className="text-xs font-semibold text-[#4f6378]">示例 key</div>
                <ul className="mt-2 space-y-2 text-xs text-slate-800">
                  {COPY_KEYS.map((k) => <li key={k}><code>{k}</code></li>)}
                </ul>
              </div>
            </article>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-black text-[#1a1e3a]">12. GEO / SEO 技术要求</h2>
          <article className="mt-4 rounded-2xl border border-[#d8defa] bg-white p-5">
            <ul className="space-y-2 text-sm leading-7 text-slate-700">
              {SEO_ITEMS.map((it) => <li key={it}>{it}</li>)}
            </ul>
          </article>
        </section>
      </section>
    </main>
  )
}
