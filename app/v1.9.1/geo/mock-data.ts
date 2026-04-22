export type QrType = 'customer_service' | 'miniapp'

export type PageEntityBase = {
  cms?: Record<string, unknown>
}

export type QrAsset = PageEntityBase & {
  qr_type: QrType
  title: string
  image_data_url: string
  fallback_text: string
  // mock: active | loading | expired | disabled
  status: 'active' | 'loading' | 'expired' | 'disabled'
}

export type ActivityCategory = 'safety' | 'career' | 'family' | 'heritage'
export type AgeRange = 'age_3_5' | 'age_6_8' | 'age_9_12'

export type Activity = PageEntityBase & {
  id: string
  title: string
  subtitle: string
  category: ActivityCategory
  age_range: AgeRange
  city: string
  venue: string
  start_time: string // ISO
  end_time?: string // ISO
  intro: string // 120-300
  highlights: string[]
  safety_notice: string
  partner_orgs: string[]
  cover_image_url: string
  gallery_images: { url: string; alt: string; caption?: string }[]
  is_recommended?: boolean
  status: 'upcoming' | 'ongoing' | 'ended' | 'offline'
  consult_enabled?: boolean
  miniapp_enabled?: boolean
  slug: string
  updated_at: string
}

export type ScienceCategory =
  | 'earthquake'
  | 'fire'
  | 'weather'
  | 'drowning'
  | 'traffic'
  | 'parenting'
  | 'other'

export type ScienceArticle = PageEntityBase & {
  id: string
  title: string
  summary: string // 60-150
  category: ScienceCategory
  content_html: string
  knowledge_points: string[]
  related_activity_ids: string[]
  publish_at: string
  updated_at: string
  cover_image_url?: string
  cover_image_alt?: string
  slug: string
  status: 'draft' | 'published' | 'offline'
}

export type CaseType = 'government' | 'cultural' | 'science' | 'school' | 'community' | 'other'

export type Case = PageEntityBase & {
  id: string
  title: string
  case_type: CaseType
  city: string
  venue: string
  start_date: string // YYYY-MM-DD
  end_date?: string // YYYY-MM-DD
  organizers: string[]
  supporting_orgs: string[]
  content_intro: string
  result_summary: string
  result_metrics: { label: string; value: string }[]
  gallery_images: { url: string; alt: string; caption?: string }[]
  feedback_quotes: string[]
  cover_image_url?: string
  slug: string
  status: 'draft' | 'published' | 'offline'
  updated_at: string
}

export type FaqGroup = 'platform' | 'activity' | 'signup' | 'cooperation' | 'localization'

export type Faq = PageEntityBase & {
  id: string
  question: string
  answer: string
  faq_group: FaqGroup
  sort_order: number
  is_featured?: boolean
  status: 'draft' | 'published' | 'offline'
}

function encodeSvg(svg: string) {
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`
}

export function makeMockCoverDataUri(label: string, bg: string, fg: string) {
  const safe = label.replace(/</g, '&lt;').replace(/>/g, '&gt;')
  const svg = `
  <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="700" viewBox="0 0 1200 700">
    <defs>
      <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="${bg}" stop-opacity="1"/>
        <stop offset="1" stop-color="#111827" stop-opacity="1"/>
      </linearGradient>
    </defs>
    <rect width="1200" height="700" rx="56" fill="url(#g)"/>
    <circle cx="980" cy="120" r="160" fill="${bg}" opacity="0.22"/>
    <circle cx="250" cy="560" r="220" fill="${bg}" opacity="0.18"/>
    <text x="70" y="320" fill="${fg}" font-size="44" font-family="Arial, Helvetica, sans-serif" font-weight="800">${safe}</text>
    <text x="70" y="390" fill="${fg}" opacity="0.92" font-size="22" font-family="Arial, Helvetica, sans-serif">小黄鹿学园 GEO 一期 mock 封面</text>
  </svg>`
  return encodeSvg(svg)
}

export function makeMockQrDataUri(label: string, bg: string, fg: string) {
  const safe = label.replace(/</g, '&lt;').replace(/>/g, '&gt;')
  // 简单的“假二维码”格子，用于前端联调（非真实可扫描二维码）
  const size = 29
  let cells = ''
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const on = (x * 17 + y * 13 + (x ^ y) * 7) % 11 < 5
      cells += `<rect x="${x}" y="${y}" width="1" height="1" fill="${on ? fg : 'none'}" opacity="${
        on ? 0.9 : 0
      }"/>`
    }
  }
  const svg = `
  <svg xmlns="http://www.w3.org/2000/svg" width="420" height="520" viewBox="0 0 420 520">
    <rect x="0" y="0" width="420" height="520" rx="26" fill="${bg}"/>
    <text x="210" y="70" text-anchor="middle" fill="${fg}" font-size="20" font-family="Arial, Helvetica, sans-serif" font-weight="700">长按识别/保存</text>
    <g transform="translate(75,120) scale(9)">
      ${cells}
    </g>
    <text x="210" y="465" text-anchor="middle" fill="${fg}" font-size="18" font-family="Arial, Helvetica, sans-serif" font-weight="700">${safe}</text>
    <text x="210" y="494" text-anchor="middle" fill="${fg}" opacity="0.82" font-size="13" font-family="Arial, Helvetica, sans-serif">二维码组件：mock 数据开发版</text>
  </svg>`
  return encodeSvg(svg)
}

export function makeMockGalleryDataUri(label: string, bg: string, fg: string) {
  const safe = label.replace(/</g, '&lt;').replace(/>/g, '&gt;')
  const svg = `
  <svg xmlns="http://www.w3.org/2000/svg" width="900" height="600" viewBox="0 0 900 600">
    <defs>
      <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="${bg}" stop-opacity="1"/>
        <stop offset="1" stop-color="#0f172a" stop-opacity="1"/>
      </linearGradient>
    </defs>
    <rect width="900" height="600" rx="28" fill="url(#g)"/>
    <path d="M-30,520 C120,430 220,610 360,520 C520,415 610,560 930,420 L930,630 L-30,630 Z" fill="${bg}" opacity="0.25"/>
    <text x="60" y="290" fill="${fg}" font-size="34" font-family="Arial, Helvetica, sans-serif" font-weight="800">${safe}</text>
    <text x="60" y="345" fill="${fg}" opacity="0.92" font-size="16" font-family="Arial, Helvetica, sans-serif">现场图集 mock</text>
  </svg>`
  return encodeSvg(svg)
}

export const GEO_BASE_PATH = '/v1.9.1/geo'

export const GEO_NAV: { href: string; label: string }[] = [
  { href: `${GEO_BASE_PATH}`, label: '首页' },
  { href: `${GEO_BASE_PATH}/about`, label: '平台介绍' },
  { href: `${GEO_BASE_PATH}/activities`, label: '公益活动' },
  { href: `${GEO_BASE_PATH}/science`, label: '安全科普' },
  { href: `${GEO_BASE_PATH}/cases`, label: '合作案例' },
  { href: `${GEO_BASE_PATH}/partners`, label: '机构合作' },
  { href: `${GEO_BASE_PATH}/faq`, label: '常见问题' },
  { href: `${GEO_BASE_PATH}/contact`, label: '联系咨询' },
  { href: `${GEO_BASE_PATH}/spec`, label: '开发规范' },
]

export const PARTNER_ORGS = [
  '晋江清新旅游',
  '晋江新丝路教育',
  '晋江市地震局',
  '晋江市林业和园林绿化局',
  '晋江市图书馆',
  '晋江市消防救援大队',
  '晋江市文化和旅游局',
  '晋江市科技馆',
  '晋江市文化馆',
  '晋江市妇女联合会',
  '晋江市梅岭街道桂山社区',
]

export const HOME_METRICS = [
  { title: '30+ 体系化安全主题', value: '30+', desc: '覆盖防灾减灾、消防安全、气象认知、防溺水、出行等主题体系。' },
  { title: '6800+ 安全知识点', value: '6800+', desc: '将知识拆解为孩子可理解的互动与场景任务。' },
  { title: '200+ 情景化互动应用', value: '200+', desc: '以“玩中学”的方式把安全知识落到真实场景。' },
]

export const AGE_GROUPS = [
  { label: '3–5 岁', text: '安全启蒙、亲子互动、感知体验' },
  { label: '6–8 岁', text: '规则认知、角色体验、动手参与' },
  { label: '9–12 岁', text: '主题研学、独立表达、综合实践' },
]

export const ACTIVITY_SYSTEMS: {
  key: ActivityCategory
  title: string
  desc: string
  reps: string[]
}[] = [
  {
    key: 'safety',
    title: '安全科普',
    desc: '围绕防灾减灾、气象认知、防溺水、消防安全等主题展开，把抽象知识变成孩子能做的任务。',
    reps: ['防灾小先锋', '气象小英雄', '防溺小卫士'],
  },
  {
    key: 'career',
    title: '职业体验',
    desc: '通过角色扮演与职业任务体验，帮助孩子认识职业、理解责任。',
    reps: ['小小消防员', '小小牙医', '小小足球家'],
  },
  {
    key: 'family',
    title: '亲子游园',
    desc: '以节庆、成长节点和亲子互动为核心，打造家庭共同参与的轻量化体验活动。',
    reps: ['新春游园', '迎新祈福', '六一游园会'],
  },
  {
    key: 'heritage',
    title: '非遗体验',
    desc: '借助传统文化和非遗工艺互动，让孩子在动手中理解文化、建立审美与传承意识。',
    reps: ['非遗竹编画', '文物有话说', '博物馆少年市集'],
  },
]

export const QRS: QrAsset[] = [
  {
    qr_type: 'customer_service',
    title: '小黄鹿咨询客服',
    image_data_url: makeMockQrDataUri('小黄鹿咨询客服', '#111827', '#FFFFFF'),
    fallback_text: '二维码加载中…如未显示请刷新，或联系管理员替换二维码。',
    status: 'active',
    cms: { updated_at: '2026-04-01' },
  },
  {
    qr_type: 'miniapp',
    title: '小黄鹿学园小程序',
    image_data_url: makeMockQrDataUri('小黄鹿学园小程序', '#0f766e', '#FFFFFF'),
    fallback_text: '二维码更新中，请稍后再试。',
    status: 'active',
    cms: { updated_at: '2026-04-01' },
  },
]

export const ACTIVITIES: Activity[] = [
  {
    id: 'act-1',
    title: '防灾小先锋',
    subtitle: '地震与避险情景训练（晋江试点）',
    category: 'safety',
    age_range: 'age_3_5',
    city: '晋江',
    venue: '晋江市某研学场馆（试点点位）',
    start_time: '2026-05-10T09:30:00.000Z',
    end_time: '2026-05-10T11:30:00.000Z',
    intro: '带孩子在安全情景里认识“为什么要躲、怎么躲、躲多久”，通过抱头保护、撤离路线识别与家庭避险口令练习，把防震知识从听过变成做过。',
    highlights: ['情景化避险动作教学：蹲下/掩护/稳住', '撤离路线识别挑战：按标识快速集合', '家庭避险口令卡：带回家一起练习'],
    safety_notice:
      '活动现场由工作人员带队，需遵循现场安全指引。家长陪同参与，避免孩子单独脱离队伍；穿着便于行动的服装与鞋子；如遇不适及时告知工作人员。',
    partner_orgs: ['晋江市地震局', '晋江市科技馆'],
    cover_image_url: makeMockCoverDataUri('防灾小先锋', '#1d4ed8', '#ffffff'),
    gallery_images: [
      { url: makeMockGalleryDataUri('避险动作演练', '#1d4ed8', '#ffffff'), alt: '孩子进行避险动作演练' },
      { url: makeMockGalleryDataUri('撤离路线识别', '#1d4ed8', '#ffffff'), alt: '孩子识别撤离路线标识' },
      { url: makeMockGalleryDataUri('家庭口令卡分享', '#1d4ed8', '#ffffff'), alt: '家长与孩子一起学习家庭口令卡' },
    ],
    status: 'upcoming',
    consult_enabled: true,
    miniapp_enabled: true,
    slug: 'anti-disaster-little-hero',
    updated_at: '2026-04-01',
  },
  {
    id: 'act-2',
    title: '气象小英雄',
    subtitle: '风云变化与出行安全（互动研学）',
    category: 'safety',
    age_range: 'age_6_8',
    city: '晋江',
    venue: '晋江市某气象科普空间（试点点位）',
    start_time: '2026-05-16T09:30:00.000Z',
    end_time: '2026-05-16T11:30:00.000Z',
    intro: '用孩子能理解的方式看懂“天要下雨吗、风会有多大吗”，结合互动装置完成观察记录，并学习在不同天气里如何做好穿戴与出行安排。',
    highlights: ['天气观察任务卡：云量/风向/降水预判', '出行穿戴配对：遇到雨天怎么准备', '家庭延展阅读：把记录带回家'],
    safety_notice:
      '活动包含轻量户外观察（以当天天气为准）。请家长根据孩子体力合理安排；如遇强降雨或大风，工作人员将调整为室内互动。',
    partner_orgs: ['晋江市文化和旅游局', '晋江市科技馆'],
    cover_image_url: makeMockCoverDataUri('气象小英雄', '#0369a1', '#ffffff'),
    gallery_images: [
      { url: makeMockGalleryDataUri('天气观察', '#0369a1', '#ffffff'), alt: '孩子进行天气观察记录' },
      { url: makeMockGalleryDataUri('出行穿戴配对', '#0369a1', '#ffffff'), alt: '孩子进行出行穿戴配对' },
      { url: makeMockGalleryDataUri('互动展项体验', '#0369a1', '#ffffff'), alt: '孩子体验气象科普展项' },
    ],
    status: 'upcoming',
    consult_enabled: true,
    miniapp_enabled: true,
    slug: 'weather-little-hero',
    updated_at: '2026-04-01',
  },
  {
    id: 'act-3',
    title: '防溺小卫士',
    subtitle: '亲水安全与呼救自护（场景教学）',
    category: 'safety',
    age_range: 'age_9_12',
    city: '晋江',
    venue: '晋江市某安全科普教育点（试点点位）',
    start_time: '2026-05-23T09:30:00.000Z',
    end_time: '2026-05-23T11:30:00.000Z',
    intro: '围绕“远离危险水域、识别安全标识、学会正确呼救与自护”设计场景任务。孩子在角色扮演中建立安全边界感，家长获得可执行的陪伴建议。',
    highlights: ['安全标识识别：红线/警示牌快速定位', '正确呼救流程：大声说清位置与人数', '家长陪伴清单：带孩子做一次“安全检查”'],
    safety_notice:
      '活动严格遵循不下水原则，仅在安全区域进行体验与训练。未成年人不得离开看护范围；若出现不适，立即告知工作人员。',
    partner_orgs: ['晋江市消防救援大队', '晋江市图书馆'],
    cover_image_url: makeMockCoverDataUri('防溺小卫士', '#0ea5e9', '#ffffff'),
    gallery_images: [
      { url: makeMockGalleryDataUri('安全标识识别', '#0ea5e9', '#ffffff'), alt: '孩子识别水域安全标识' },
      { url: makeMockGalleryDataUri('呼救流程演练', '#0ea5e9', '#ffffff'), alt: '孩子进行呼救流程演练' },
      { url: makeMockGalleryDataUri('家长陪伴清单', '#0ea5e9', '#ffffff'), alt: '家长获取防溺陪伴清单' },
    ],
    status: 'upcoming',
    consult_enabled: true,
    miniapp_enabled: true,
    slug: 'drowning-prevention-guardian',
    updated_at: '2026-04-01',
  },
  {
    id: 'act-4',
    title: '小小消防员',
    subtitle: '火灾应急与灭火器体验（角色任务）',
    category: 'career',
    age_range: 'age_6_8',
    city: '晋江',
    venue: '晋江市消防科普体验区（试点点位）',
    start_time: '2026-06-01T09:30:00.000Z',
    end_time: '2026-06-01T11:30:00.000Z',
    intro: '让孩子从“看见火”到“懂得应急”，通过安全宣教、灭火器体验与撤离演练建立正确的火灾认知。孩子学会在紧急情况下做什么、找谁、怎么说。',
    highlights: ['火灾发现与报警语言模板：一句话说清关键信息', '灭火器安全体验：在工作人员示范下完成操作', '撤离集结点识别：按路线快速集合'],
    safety_notice:
      '灭火器体验仅在模拟与安全条件下进行。全程由工作人员操作与指导，儿童不得自行操作。请按分组行动，禁止追逐奔跑。',
    partner_orgs: ['晋江市消防救援大队', '晋江市文化馆'],
    cover_image_url: makeMockCoverDataUri('小小消防员', '#e11d48', '#ffffff'),
    gallery_images: [
      { url: makeMockGalleryDataUri('报警语言模板', '#e11d48', '#ffffff'), alt: '孩子学习报警语言模板' },
      { url: makeMockGalleryDataUri('灭火器安全体验', '#e11d48', '#ffffff'), alt: '在安全条件下体验灭火器' },
      { url: makeMockGalleryDataUri('撤离演练', '#e11d48', '#ffffff'), alt: '进行撤离演练' },
    ],
    status: 'upcoming',
    consult_enabled: true,
    miniapp_enabled: true,
    slug: 'little-firefighter',
    updated_at: '2026-04-01',
  },
  {
    id: 'act-5',
    title: '小小牙医',
    subtitle: '口腔健康与刷牙节奏（趣味互动）',
    category: 'career',
    age_range: 'age_3_5',
    city: '晋江',
    venue: '晋江市图书馆亲子体验角（试点点位）',
    start_time: '2026-06-08T09:30:00.000Z',
    end_time: '2026-06-08T11:00:00.000Z',
    intro: '孩子通过角色扮演了解牙齿结构与口腔护理要点，用趣味计时与游戏完成刷牙节奏练习。家长带回“每日口腔陪伴建议”，让好习惯更稳固。',
    highlights: ['刷牙节奏计时：学会正确时间与顺序', '口腔小任务：识别“要刷到的地方”', '亲子陪伴建议：家庭可执行的口腔练习'],
    safety_notice:
      '活动不替代医疗诊断。请家长根据孩子状态提供牙刷与清洁用品；如孩子有不适，及时停止并告知工作人员。',
    partner_orgs: ['晋江市图书馆', '晋江新丝路教育'],
    cover_image_url: makeMockCoverDataUri('小小牙医', '#16a34a', '#ffffff'),
    gallery_images: [
      { url: makeMockGalleryDataUri('刷牙节奏', '#16a34a', '#ffffff'), alt: '孩子练习刷牙节奏' },
      { url: makeMockGalleryDataUri('亲子任务卡', '#16a34a', '#ffffff'), alt: '孩子完成亲子任务卡' },
      { url: makeMockGalleryDataUri('口腔知识互动', '#16a34a', '#ffffff'), alt: '口腔科普互动体验' },
    ],
    status: 'upcoming',
    consult_enabled: true,
    miniapp_enabled: true,
    slug: 'little-dentist',
    updated_at: '2026-04-01',
  },
  {
    id: 'act-6',
    title: '小小足球家',
    subtitle: '规则认知与团队协作（轻竞技体验）',
    category: 'career',
    age_range: 'age_9_12',
    city: '晋江',
    venue: '社区运动场（试点点位）',
    start_time: '2026-06-15T09:30:00.000Z',
    end_time: '2026-06-15T11:30:00.000Z',
    intro: '通过足球任务了解“规则为什么存在、如何用沟通解决问题”，把体育体验与安全意识结合：在运动中学会观察场地、遵守边界、尊重他人。',
    highlights: ['规则闯关：看懂标识与规则边界', '安全换位练习：避免碰撞的动作要求', '团队协作复盘：说出你今天学到的规则'],
    safety_notice:
      '运动以安全场地为前提。请穿适合运动的鞋服；活动中禁止推搡与奔跑越界；出现不适立即停止并告知工作人员。',
    partner_orgs: ['晋江清新旅游', '晋江市梅岭街道桂山社区'],
    cover_image_url: makeMockCoverDataUri('小小足球家', '#f97316', '#ffffff'),
    gallery_images: [
      { url: makeMockGalleryDataUri('规则闯关', '#f97316', '#ffffff'), alt: '孩子完成规则闯关' },
      { url: makeMockGalleryDataUri('安全换位', '#f97316', '#ffffff'), alt: '进行安全换位动作练习' },
      { url: makeMockGalleryDataUri('团队协作', '#f97316', '#ffffff'), alt: '进行团队协作任务' },
    ],
    status: 'upcoming',
    consult_enabled: true,
    miniapp_enabled: true,
    slug: 'little-footballer',
    updated_at: '2026-04-01',
  },
  {
    id: 'act-7',
    title: '新春游园',
    subtitle: '节日礼仪与安全小任务',
    category: 'family',
    age_range: 'age_3_5',
    city: '晋江',
    venue: '文化馆亲子游园区（试点点位）',
    start_time: '2026-02-01T10:00:00.000Z',
    end_time: '2026-02-01T12:00:00.000Z',
    intro: '把节日体验做成轻量安全任务：孩子完成“排队与礼貌沟通”“安全过路口”“轻量避险口令”等关卡，让家庭在欢乐里建立更稳定的安全习惯。',
    highlights: ['亲子关卡：按流程完成任务领取印章', '安全过路口：看灯识别与口令练习', '节日延展：带回家做一次“安全礼仪小练习”'],
    safety_notice:
      '游园活动以室内为主。请家长看护好孩子物品与行动范围；遵循分区指引，避免拥挤；如遇不适及时休息。',
    partner_orgs: ['晋江市文化馆', '晋江市妇女联合会'],
    cover_image_url: makeMockCoverDataUri('新春游园', '#7c3aed', '#ffffff'),
    gallery_images: [
      { url: makeMockGalleryDataUri('亲子关卡', '#7c3aed', '#ffffff'), alt: '孩子参与亲子关卡' },
      { url: makeMockGalleryDataUri('安全过路口', '#7c3aed', '#ffffff'), alt: '进行安全过路口练习' },
      { url: makeMockGalleryDataUri('印章任务', '#7c3aed', '#ffffff'), alt: '完成印章任务' },
    ],
    status: 'upcoming',
    consult_enabled: true,
    miniapp_enabled: true,
    slug: 'spring-festival-garden',
    updated_at: '2026-04-01',
  },
  {
    id: 'act-8',
    title: '迎新祈福',
    subtitle: '成长愿望与安全陪伴卡',
    category: 'family',
    age_range: 'age_6_8',
    city: '晋江',
    venue: '图书馆亲子空间（试点点位）',
    start_time: '2026-03-10T09:30:00.000Z',
    end_time: '2026-03-10T11:30:00.000Z',
    intro: '围绕“成长愿望如何变成行动”设计轻手作与安全陪伴卡。孩子在绘制愿望的同时学习基础安全规则，家长获得更具体的陪伴建议与话术。',
    highlights: ['成长愿望手作：把抽象愿望落到可执行规则', '安全陪伴话术卡：家长怎么说孩子才会听', '家庭带回练习：7天安全小任务'],
    safety_notice:
      '手作环节以安全材料为主。请家长在孩子使用工具时保持近距离看护；避免误食或划伤，必要时由工作人员协助。',
    partner_orgs: ['晋江市图书馆', '晋江新丝路教育'],
    cover_image_url: makeMockCoverDataUri('迎新祈福', '#0f766e', '#ffffff'),
    gallery_images: [
      { url: makeMockGalleryDataUri('成长愿望手作', '#0f766e', '#ffffff'), alt: '孩子绘制成长愿望' },
      { url: makeMockGalleryDataUri('安全陪伴话术', '#0f766e', '#ffffff'), alt: '家长学习安全陪伴话术' },
      { url: makeMockGalleryDataUri('家庭7天任务', '#0f766e', '#ffffff'), alt: '家庭带回7天安全任务' },
    ],
    status: 'upcoming',
    consult_enabled: true,
    miniapp_enabled: true,
    slug: 'welcoming-new-year-pray',
    updated_at: '2026-04-01',
  },
  {
    id: 'act-9',
    title: '六一游园会',
    subtitle: '规则游戏与安全边界训练',
    category: 'family',
    age_range: 'age_9_12',
    city: '晋江',
    venue: '社区活动广场（试点点位）',
    start_time: '2026-06-01T13:30:00.000Z',
    end_time: '2026-06-01T15:30:00.000Z',
    intro: '把六一的快乐做成规则游戏：孩子在闯关中学会等待、观察与边界。通过安全任务复盘，让孩子能用自己的话说清“哪些行为会带来风险”。',
    highlights: ['规则闯关：边界线内完成任务', '观察-决策游戏：遇到情况怎么选', '现场复盘：孩子用一句话讲清安全规则'],
    safety_notice:
      '活动以团队为单位开展。请家长陪同并监督孩子遵循规则边界；禁止推搡与大幅度奔跑越界；现场按分区引导行走。',
    partner_orgs: ['晋江市梅岭街道桂山社区', '晋江市科技馆'],
    cover_image_url: makeMockCoverDataUri('六一游园会', '#eab308', '#0f172a'),
    gallery_images: [
      { url: makeMockGalleryDataUri('规则闯关', '#eab308', '#0f172a'), alt: '孩子完成规则闯关' },
      { url: makeMockGalleryDataUri('观察决策游戏', '#eab308', '#0f172a'), alt: '进行观察决策游戏' },
      { url: makeMockGalleryDataUri('现场复盘', '#eab308', '#0f172a'), alt: '孩子进行安全复盘表达' },
    ],
    status: 'upcoming',
    consult_enabled: true,
    miniapp_enabled: true,
    slug: 'children-day-garden',
    updated_at: '2026-04-01',
  },
  {
    id: 'act-10',
    title: '非遗竹编画',
    subtitle: '手作工艺与文化理解（动手研学）',
    category: 'heritage',
    age_range: 'age_6_8',
    city: '晋江',
    venue: '非遗体验工坊（试点点位）',
    start_time: '2026-06-20T09:30:00.000Z',
    end_time: '2026-06-20T11:30:00.000Z',
    intro: '孩子在竹编工艺里学习纹样与材料特性。通过“看—摸—编—完成”的流程建立专注力，同时把文化讲述转化为孩子的表达作品。',
    highlights: ['纹样理解：把图案讲成一句话', '动手编织体验：完成一张可带走的竹编画', '文化延展：用“非遗小导游”方式介绍给家人'],
    safety_notice:
      '手作体验需在工作人员引导下完成，注意剪裁工具与边缘安全；请家长在孩子使用材料时保持看护距离。',
    partner_orgs: ['晋江市文化馆', '晋江市图书馆'],
    cover_image_url: makeMockCoverDataUri('非遗竹编画', '#a855f7', '#ffffff'),
    gallery_images: [
      { url: makeMockGalleryDataUri('竹编工艺', '#a855f7', '#ffffff'), alt: '孩子参与竹编工艺体验' },
      { url: makeMockGalleryDataUri('完成竹编画', '#a855f7', '#ffffff'), alt: '孩子完成竹编画作品' },
      { url: makeMockGalleryDataUri('文化表达', '#a855f7', '#ffffff'), alt: '孩子用作品进行文化表达' },
    ],
    status: 'upcoming',
    consult_enabled: true,
    miniapp_enabled: true,
    slug: 'heritage-bamboo-weaving-painting',
    updated_at: '2026-04-01',
  },
  {
    id: 'act-11',
    title: '文物有话说',
    subtitle: '博物馆少年讲解训练',
    category: 'heritage',
    age_range: 'age_9_12',
    city: '晋江',
    venue: '晋江市图书馆/博物馆少年讲解点（试点点位）',
    start_time: '2026-06-27T09:30:00.000Z',
    end_time: '2026-06-27T11:30:00.000Z',
    intro: '让孩子用自己的语言讲文物。通过“观察细节—提问—讲述—倾听反馈”的流程，把参观变成表达训练，同时融入安全参观礼仪与边界规则。',
    highlights: ['细节观察：学会看“纹样/材质/颜色”', '讲解训练：孩子用 60 秒讲述', '安全参观礼仪：安静/不触碰/按路线行走'],
    safety_notice:
      '活动需遵循场馆参观规则。禁止触摸文物与展示设施；请家长陪同并监督孩子按路线行走，保持文明秩序。',
    partner_orgs: ['晋江市图书馆', '晋江市文化和旅游局'],
    cover_image_url: makeMockCoverDataUri('文物有话说', '#0891b2', '#ffffff'),
    gallery_images: [
      { url: makeMockGalleryDataUri('细节观察', '#0891b2', '#ffffff'), alt: '孩子进行文物细节观察' },
      { url: makeMockGalleryDataUri('60秒讲述', '#0891b2', '#ffffff'), alt: '孩子进行60秒讲述' },
      { url: makeMockGalleryDataUri('安全参观礼仪', '#0891b2', '#ffffff'), alt: '孩子学习安全参观礼仪' },
    ],
    status: 'upcoming',
    consult_enabled: true,
    miniapp_enabled: true,
    slug: 'relics-have-a-story',
    updated_at: '2026-04-01',
  },
  {
    id: 'act-12',
    title: '博物馆少年市集',
    subtitle: '展示成果与安全边界游戏',
    category: 'heritage',
    age_range: 'age_3_5',
    city: '晋江',
    venue: '社区少年市集场地（试点点位）',
    start_time: '2026-07-05T10:00:00.000Z',
    end_time: '2026-07-05T12:00:00.000Z',
    intro: '孩子把自己的研学作品带上“市集摊位”，在展示与互动中学会礼貌沟通、排队规则与安全边界。家长可以在现场获得延展阅读与参与方式建议。',
    highlights: ['小摊位展示：把作品介绍给别人', '排队与沟通礼仪：看提示完成动作', '安全边界游戏：用规则保护自己和同伴'],
    safety_notice:
      '市集活动以安全边界为准。请家长看护孩子行动范围，避免奔跑和拥挤；出现异常情况及时联系工作人员。',
    partner_orgs: ['晋江市文化馆', '晋江市梅岭街道桂山社区'],
    cover_image_url: makeMockCoverDataUri('博物馆少年市集', '#f43f5e', '#ffffff'),
    gallery_images: [
      { url: makeMockGalleryDataUri('小摊位展示', '#f43f5e', '#ffffff'), alt: '孩子展示作品' },
      { url: makeMockGalleryDataUri('排队沟通', '#f43f5e', '#ffffff'), alt: '孩子学习排队沟通礼仪' },
      { url: makeMockGalleryDataUri('安全边界游戏', '#f43f5e', '#ffffff'), alt: '参与安全边界游戏' },
    ],
    status: 'upcoming',
    consult_enabled: true,
    miniapp_enabled: true,
    slug: 'museum-kids-market',
    updated_at: '2026-04-01',
  },
]

function formatCategoryTitle(cat: ActivityCategory) {
  if (cat === 'safety') return '安全科普'
  if (cat === 'career') return '职业体验'
  if (cat === 'family') return '亲子游园'
  return '非遗体验'
}

function ageRangeLabel(age: AgeRange) {
  if (age === 'age_3_5') return '3–5 岁'
  if (age === 'age_6_8') return '6–8 岁'
  return '9–12 岁'
}

function buildSafetyArticleHtml(params: {
  title: string
  sections: { h: string; p: string[] }[]
}) {
  return `
  <div>
    ${params.sections
      .map(
        (s) =>
          `<h2>${s.h}</h2>${s.p.map((pp) => `<p>${pp}</p>`).join('')}`,
      )
      .join('')}
    <h2>一句话带走</h2>
    <p>${params.title}：先观察再行动，按场景做正确的第一步。</p>
  </div>
`
}

export const SCIENCE_ARTICLES: ScienceArticle[] = [
  {
    id: 'sci-1',
    title: '地震时怎么做：家庭避险的第一步',
    summary: '地震发生后，孩子最需要的是清晰的动作与口令。本页用可理解的步骤，帮家长把“躲、稳、撤”转成家庭可复用的练习。',
    category: 'earthquake',
    content_html: buildSafetyArticleHtml({
      title: '地震时怎么做',
      sections: [
        {
          h: '先找“安全的位置”：在家也能练',
          p: [
            '地震发生时，先看孩子身边有没有桌椅、床或坚固的掩护物，然后引导孩子保持低姿势。',
            '把“躲避点”提前写在家庭安全提示卡上：例如桌下、墙角掩护区等，让孩子知道该往哪里去。',
          ],
        },
        {
          h: '动作口令：蹲下、掩护、稳住',
          p: [
            '教孩子用三个词完成动作：蹲下、掩护、稳住。',
            '每次练习都用同一句口令开头，让孩子在紧张时仍能记得下一步。',
          ],
        },
        {
          h: '撤离与集合：不是跑得快，是走得对',
          p: [
            '停下来观察环境再移动，按家庭约定的撤离路线到集合点。',
            '用“集合点小地图”让孩子记住出口方向，减少慌乱带来的风险。',
          ],
        },
        {
          h: '家长陪伴建议：把训练变成日常',
          p: [
            '每周用 3 分钟复盘一次：今天我们做对了哪一步？哪一步下次要更准确？',
            '把孩子的正确动作拍成小视频或贴纸记录，让练习更有成就感。',
          ],
        },
      ],
    }),
    knowledge_points: [
      '提前确定家庭“避险点”和“集合点”',
      '动作口令固定：蹲下、掩护、稳住',
      '撤离强调“走对路线”，而不是奔跑',
      '每周短练习 + 复盘，帮助记忆稳定',
    ],
    related_activity_ids: ['anti-disaster-little-hero'],
    publish_at: '2026-04-01T08:00:00.000Z',
    updated_at: '2026-04-01T08:00:00.000Z',
    cover_image_url: makeMockCoverDataUri('地震避险', '#1d4ed8', '#ffffff'),
    cover_image_alt: '地震避险科普文章封面',
    slug: 'earthquake-first-step-at-home',
    status: 'published',
  },
  {
    id: 'sci-2',
    title: '防溺水自护：孩子能做的三件事',
    summary: '防溺水的关键不是“会不会游泳”，而是边界感与正确呼救。本页为家长提供孩子能执行的三件事与陪伴话术。',
    category: 'drowning',
    content_html: buildSafetyArticleHtml({
      title: '防溺水自护',
      sections: [
        {
          h: '先建立边界：远离危险水域',
          p: [
            '孩子只要记住一句话：没有大人在场，不靠近水边、不单独去玩。',
            '把“危险水域”用图标标记到家长与孩子一起的安全地图里。',
          ],
        },
        {
          h: '安全标识识别：看到就退一步',
          p: [
            '教孩子识别常见警示标识，并约定遇到警示就退后、找大人确认。',
            '现场可以做一个小游戏：看到标识立刻做“退一步”动作。',
          ],
        },
        {
          h: '正确呼救：大声说清位置和人数',
          p: [
            '训练孩子用清楚的语言求助：在哪里、发生了什么、需要帮助谁。',
            '练习时由家长扮演“紧急联系人”，孩子负责把信息说完整。',
          ],
        },
        {
          h: '家长陪伴建议：把规则变成口令',
          p: [
            '把三件事写成口令卡：边界、标识、呼救。',
            '每次外出前 30 秒复习，练习就不会只停留在“讲过一次”。',
          ],
        },
      ],
    }),
    knowledge_points: ['边界感：没有大人不靠近水域', '标识识别：看到警示就退一步', '呼救信息：位置 + 情况 + 需要帮助谁', '口令卡日常复习让规则更稳'],
    related_activity_ids: ['drowning-prevention-guardian'],
    publish_at: '2026-04-01T09:00:00.000Z',
    updated_at: '2026-04-01T09:00:00.000Z',
    cover_image_url: makeMockCoverDataUri('防溺自护', '#0ea5e9', '#ffffff'),
    cover_image_alt: '防溺水自护科普文章封面',
    slug: 'drowning-prevention-three-things',
    status: 'published',
  },
  {
    id: 'sci-3',
    title: '出行遇雨怎么办：天气观察到穿戴配对',
    summary: '孩子学会看懂天气变化，就能在出行时做更稳妥的选择。本页用“观察-判断-准备”的方法陪家长一起练。',
    category: 'weather',
    content_html: buildSafetyArticleHtml({
      title: '出行遇雨怎么办',
      sections: [
        {
          h: '观察天气：先看再决定',
          p: [
            '外出前，带孩子快速观察：云量变化、风感与降水可能性。',
            '让孩子用自己的话复述一次：今天我们要为哪一种情况做准备？',
          ],
        },
        {
          h: '判断与穿戴配对：把“可能”变成“准备”',
          p: [
            '准备雨衣/雨伞、合适的鞋与防滑安排。',
            '把穿戴配对做成任务卡：完成配对就可以出发。',
          ],
        },
        {
          h: '安全行走：按路线、留距离',
          p: [
            '出行时强调：按路线走，不靠近积水边缘，不在路上奔跑追逐。',
            '家长用“慢一点、看清楚、走对路”做日常口令。',
          ],
        },
        {
          h: '家长陪伴建议：把记录带回家',
          p: [
            '让孩子把今天看到的天气变化画一张小图，贴在家里。',
            '下次遇到类似天气时，孩子就能用记录做快速判断。',
          ],
        },
      ],
    }),
    knowledge_points: ['外出前快速观察天气变化', '穿戴配对任务卡把“可能”变“准备”', '安全行走按路线留距离', '用记录小图强化记忆'],
    related_activity_ids: ['weather-little-hero'],
    publish_at: '2026-04-01T10:00:00.000Z',
    updated_at: '2026-04-01T10:00:00.000Z',
    cover_image_url: makeMockCoverDataUri('天气出行', '#0369a1', '#ffffff'),
    cover_image_alt: '天气出行科普文章封面',
    slug: 'rainy-day-ready-matching',
    status: 'published',
  },
  {
    id: 'sci-4',
    title: '消防小常识：孩子能记住的报警语言',
    summary: '在紧急情况下，孩子说不清也没关系，关键是用固定模板把信息说完整。本页给出孩子能学会的报警语言。',
    category: 'fire',
    content_html: buildSafetyArticleHtml({
      title: '消防报警语言',
      sections: [
        {
          h: '先学一句话模板：更容易被听懂',
          p: [
            '训练孩子用“我在…我看见…需要帮助”的结构说清信息。',
            '在平时就练习，不把说清当作“出事才学”。',
          ],
        },
        {
          h: '听懂大人安排：做对第一步',
          p: [
            '当孩子听到“先撤离、不要摸、跟着走”时，只做一步：撤离并跟随分组。',
            '家长也可以用同一个指令短句，减少孩子理解成本。',
          ],
        },
        {
          h: '现场安全：不围观、不追跑',
          p: [
            '强调“危险区域不靠近”，让孩子知道什么时候应该退一步。',
            '用角色扮演把指令练熟：家长说口令，孩子按口令完成动作。',
          ],
        },
        {
          h: '家长陪伴建议：给孩子一个可以复述的句子',
          p: [
            '把模板写在口袋卡或冰箱贴上，让孩子随时能读出来。',
            '每次练习只做一件事：完整复述一次。',
          ],
        },
      ],
    }),
    knowledge_points: ['用固定模板说清：我在…我看见…需要帮助', '紧急指令只做第一步：撤离并跟随', '危险区域不围观、不追跑', '口袋卡/冰箱贴日常复述'],
    related_activity_ids: ['little-firefighter'],
    publish_at: '2026-04-01T11:00:00.000Z',
    updated_at: '2026-04-01T11:00:00.000Z',
    cover_image_url: makeMockCoverDataUri('消防报警语言', '#e11d48', '#ffffff'),
    cover_image_alt: '消防报警语言科普文章封面',
    slug: 'fire-alarm-template-for-kids',
    status: 'published',
  },
  {
    id: 'sci-5',
    title: '出行安全：让规则变成孩子能执行的动作',
    summary: '孩子不是不懂规则，而是需要更清晰的“下一步”。本页把出行规则拆成可执行动作，帮助家长做陪伴训练。',
    category: 'traffic',
    content_html: buildSafetyArticleHtml({
      title: '出行安全',
      sections: [
        {
          h: '过路口四步法：看灯、看车、看人、走对位',
          p: [
            '把过路口拆成四步，让孩子每次都知道“现在该做什么”。',
            '家长带孩子走一遍路线，把四步法写成小口令。',
          ],
        },
        {
          h: '交通场景复盘：不只讲道理',
          p: [
            '每次出行后 1 分钟复盘：今天我们做对了哪一步？下次怎么更稳？',
            '复盘只说两句话，让孩子更容易接受。',
          ],
        },
        {
          h: '安全边界：不跑、不追、不靠近车辆',
          p: [
            '把边界用贴纸标记到路线图上：靠近车辆区域不进入。',
            '用“站稳—等—再走”练习，帮助孩子建立稳定节奏。',
          ],
        },
        {
          h: '家长陪伴建议：把规则变成动作练习',
          p: [
            '用家庭场景做模拟：门口红灯/绿灯口令、按路线走一步完成任务。',
            '让孩子在“练习”中记住规则，而不是在“犯错”中学会。',
          ],
        },
      ],
    }),
    knowledge_points: ['过路口四步法：看灯看车看人走对位', '出行后做 1 分钟复盘：只说两点', '安全边界：不跑不追不靠近车辆', '把规则变动作练习，练习更稳'],
    related_activity_ids: ['children-day-garden'],
    publish_at: '2026-04-01T12:00:00.000Z',
    updated_at: '2026-04-01T12:00:00.000Z',
    cover_image_url: makeMockCoverDataUri('出行安全', '#f97316', '#ffffff'),
    cover_image_alt: '出行安全科普文章封面',
    slug: 'traffic-safety-executable-actions',
    status: 'published',
  },
  {
    id: 'sci-6',
    title: '育儿陪伴：让孩子在安全里学会表达',
    summary: '安全教育不仅要“记住规则”，还要能“说清感受与选择”。本页提供家长的表达陪伴方式与练习模板。',
    category: 'parenting',
    content_html: buildSafetyArticleHtml({
      title: '育儿陪伴表达',
      sections: [
        {
          h: '把“规则”变成“孩子的话”',
          p: [
            '问孩子用自己的话说：刚才我们做对了什么？如果再遇到会怎么做？',
            '当孩子表达时，家长要用肯定句强化正确行为。',
          ],
        },
        {
          h: '用两问一复述：降低表达门槛',
          p: [
            '两问：你看到什么？你觉得最关键的是哪一步？',
            '一复述：家长把孩子说的关键句复述一遍，帮助形成稳定记忆。',
          ],
        },
        {
          h: '把练习变成可见成果',
          p: [
            '把孩子的口令卡、任务卡贴到家里，形成“我们学过并做过”的可见证据。',
            '成果越可见，规则越不容易被遗忘。',
          ],
        },
        {
          h: '家长陪伴建议：把复盘做短、做频',
          p: [
            '把复盘控制在 1-2 分钟以内，避免孩子产生厌倦。',
            '每周一次更完整的复盘，帮助家长和孩子看见成长。',
          ],
        },
      ],
    }),
    knowledge_points: ['把规则变成孩子的话：问“刚才做对了什么”', '两问一复述降低表达门槛', '让练习有可见成果：任务卡口令卡', '复盘做短做频，成长更稳'],
    related_activity_ids: ['welcoming-new-year-pray'],
    publish_at: '2026-04-01T13:00:00.000Z',
    updated_at: '2026-04-01T13:00:00.000Z',
    cover_image_url: makeMockCoverDataUri('育儿表达', '#7c3aed', '#ffffff'),
    cover_image_alt: '育儿陪伴表达科普文章封面',
    slug: 'parenting-expression-in-safety',
    status: 'published',
  },
]

export const CASES: Case[] = [
  {
    id: 'case-1',
    title: '福建省第二届野生动物文化交流活动',
    case_type: 'cultural',
    city: '晋江',
    venue: '晋江梧林传统村落',
    start_date: '2025-11-08',
    end_date: '2025-11-23',
    organizers: ['晋江市人民政府', '泉州市林业局'],
    supporting_orgs: ['厦门帝嘉科技（小黄鹿学园）'],
    content_intro:
      '本活动围绕野生动物保护与自然教育主题，在公共文化场景中打造兼具科普价值、亲子参与与社会传播力的主题活动。通过家庭参与式体验，让孩子在自然观察中理解生态保护的重要性，并把相关知识延展到日常家庭陪伴中。',
    result_summary:
      '以“守护飞羽精灵”为主题，将自然认知、亲子互动与安全边界教育结合，形成可被持续复述的家庭学习路径。',
    result_metrics: [
      { label: '主题覆盖', value: '自然教育 + 生态保护' },
      { label: '家庭参与方式', value: '亲子互动 + 场景任务' },
      { label: '知识延展', value: '活动后可复用阅读内容' },
    ],
    gallery_images: [
      { url: makeMockGalleryDataUri('守护飞羽精灵', '#111827', '#ffffff'), alt: '守护飞羽精灵活动现场' },
      { url: makeMockGalleryDataUri('自然观察任务', '#16a34a', '#ffffff'), alt: '孩子完成自然观察任务' },
      { url: makeMockGalleryDataUri('家庭延展分享', '#0ea5e9', '#ffffff'), alt: '家庭延展分享环节' },
    ],
    feedback_quotes: ['孩子学会了用自己的话讲生态保护的重要性。', '家长喜欢这种“玩中学”的方式，能持续复盘。'],
    cover_image_url: makeMockCoverDataUri('野生动物文化交流', '#16a34a', '#ffffff'),
    slug: 'wildlife-cultural-exchange-fujian',
    status: 'published',
    updated_at: '2026-04-01',
  },
  {
    id: 'case-2',
    title: '防灾减灾日主题宣传 & 科普专场活动',
    case_type: 'government',
    city: '晋江',
    venue: '晋江市公共文化场景（试点联动）',
    start_date: '2025-05-12',
    end_date: '2025-05-18',
    organizers: ['晋江市应急管理局', '晋江市文化和旅游局'],
    supporting_orgs: ['晋江市科技馆', '晋江市文化馆'],
    content_intro:
      '围绕 5·12 全国防灾减灾日与 5·18 国际博物馆日设计主题活动，联合不同单位整合资源，通过创意互动设备把少儿科普与场景体验结合到同一条学习路径中。让孩子在“有趣的装置体验”里理解防灾减灾要点，在家庭复盘中把知识变成可执行的日常习惯。',
    result_summary:
      '把防灾减灾知识与博物馆科普内容打通，让家庭在同一次活动里完成“理解—体验—复盘”的闭环。',
    result_metrics: [
      { label: '主题日联动', value: '5·12 + 5·18' },
      { label: '内容形态', value: '互动装置 + 亲子场景任务' },
      { label: '输出目标', value: '可复用的家庭延展阅读' },
    ],
    gallery_images: [
      { url: makeMockGalleryDataUri('防灾减灾主题', '#1d4ed8', '#ffffff'), alt: '防灾减灾主题宣传现场' },
      { url: makeMockGalleryDataUri('科普互动装置', '#0ea5e9', '#ffffff'), alt: '创意互动设备体验现场' },
      { url: makeMockGalleryDataUri('家庭复盘环节', '#0f766e', '#ffffff'), alt: '家庭复盘分享环节' },
    ],
    feedback_quotes: ['孩子在装置里学到“第一步怎么做”，回家能讲给家长听。'],
    cover_image_url: makeMockCoverDataUri('防灾减灾日', '#1d4ed8', '#ffffff'),
    slug: 'disaster-prevention-science-special',
    status: 'published',
    updated_at: '2026-04-01',
  },
  {
    id: 'case-3',
    title: '主题教育实践 & 安全主题活动',
    case_type: 'community',
    city: '晋江',
    venue: '学校与社区联动场景（试点联动）',
    start_date: '2025-04-01',
    end_date: '2025-06-30',
    organizers: ['晋江消防', '晋江团市委', '新塘道南小学等'],
    supporting_orgs: ['晋江市文化馆', '晋江市梅岭街道桂山社区'],
    content_intro:
      '以消防元素与环保理念相结合，开展“环保小卫士”等安全主题活动。通过多方协同共同推进活动执行与覆盖面提升，将安全主题教育做成孩子愿意参与的体验过程，并在现场引导孩子完成“观察—行动—复述”的表达训练。',
    result_summary:
      '把消防知识、环保理念与互动装置体验结合，提升活动影响力，并形成家长可复制的安全陪伴方式。',
    result_metrics: [
      { label: '联合单位', value: '消防 + 团市委 + 学校等' },
      { label: '活动内容', value: '环保小卫士 + 安全主题体验' },
      { label: '学习方式', value: '体验 + 复盘表达' },
    ],
    gallery_images: [
      { url: makeMockGalleryDataUri('环保小卫士', '#16a34a', '#ffffff'), alt: '环保小卫士活动现场' },
      { url: makeMockGalleryDataUri('安全主题体验', '#e11d48', '#ffffff'), alt: '安全主题体验环节' },
      { url: makeMockGalleryDataUri('多方协同执行', '#0f766e', '#ffffff'), alt: '多方协同执行现场' },
    ],
    feedback_quotes: ['孩子把安全知识和环保理念都讲得很清楚，家长认可这种结合方式。'],
    cover_image_url: makeMockCoverDataUri('主题教育实践', '#16a34a', '#ffffff'),
    slug: 'theme-education-safety',
    status: 'published',
    updated_at: '2026-04-01',
  },
]

export const FAQS: Faq[] = [
  {
    id: 'faq-1',
    question: '小黄鹿学园是什么平台？',
    answer:
      '小黄鹿学园是一个面向全国各城市、本地化运营的青少年安全成长科普研学平台，聚焦 3–12 岁儿童家庭。平台用“智能科技科普工具 + 精选公益活动 + 共同育儿模式”，围绕安全科普、职业体验、亲子游园、非遗体验等主题，陪孩子在真实场景中学习安全与成长。当前以福建省晋江市为试点，探索全国可复制的本地化平台模式。',
    faq_group: 'platform',
    sort_order: 1,
    is_featured: true,
    status: 'published',
  },
  {
    id: 'faq-2',
    question: '当前在哪些城市可以参与？',
    answer:
      '当前平台以福建省晋江市为试点，后续将逐步探索更多城市本地化落地。你可以先关注小程序获取最新活动动态，或添加“小黄鹿咨询客服”获得适龄推荐与报名引导。',
    faq_group: 'localization',
    sort_order: 2,
    is_featured: true,
    status: 'published',
  },
  {
    id: 'faq-3',
    question: '主要适合多大的孩子？',
    answer:
      '平台主要服务 3–12 岁儿童家庭，并根据孩子年龄阶段设计活动任务与互动方式：3–5 岁偏安全启蒙与亲子互动；6–8 岁强调规则认知与角色体验；9–12 岁更注重主题研学、独立表达与综合实践。',
    faq_group: 'platform',
    sort_order: 3,
    status: 'published',
  },
  {
    id: 'faq-4',
    question: '主要有哪些活动？',
    answer:
      '一期活动体系包含四大方向：安全科普（防灾小先锋、气象小英雄、防溺小卫士）、职业体验（小小消防员、小小牙医、小小足球家）、亲子游园（新春游园、迎新祈福、六一游园会）以及非遗体验（非遗竹编画、文物有话说、博物馆少年市集）。',
    faq_group: 'activity',
    sort_order: 4,
    is_featured: true,
    status: 'published',
  },
  {
    id: 'faq-5',
    question: '怎么报名？',
    answer:
      '当前活动报名以“扫码添加小黄鹿咨询客服”作为主链路：客服将结合孩子年龄与家庭需求给出适龄活动建议，并协助完成报名引导。你也可以通过“小黄鹿学园”小程序关注平台动态，获取最新活动安排。',
    faq_group: 'signup',
    sort_order: 5,
    is_featured: true,
    status: 'published',
  },
  {
    id: 'faq-6',
    question: '怎么合作？',
    answer:
      '欢迎学校、社区、公益组织、文化场馆等合作方参与本地化共建。你可以在“机构合作”页面提交合作申请，填写机构名称、联系人、联系电话、所在城市、合作类型与合作需求说明。提交后我们会尽快与您联系，完成平台初步沟通、需求确认与方案设计。',
    faq_group: 'cooperation',
    sort_order: 6,
    is_featured: true,
    status: 'published',
  },
  {
    id: 'faq-7',
    question: '为什么强调本地化？',
    answer:
      '孩子的成长活动离不开本地场馆、机构、社区与家庭参与。不同城市拥有不同的资源条件与家庭需求，所以平台采用“全国可复制、本地化运营”的方式，把试点经验复制到更多城市：让活动内容结构保持一致，同时让场地与合作资源贴近本地。',
    faq_group: 'localization',
    sort_order: 7,
    status: 'published',
  },
]

export function formatDateZh(isoLike: string) {
  // isoLike 可以是 YYYY-MM-DD 或含时间的 ISO
  const d = isoLike.includes('T') ? new Date(isoLike) : new Date(`${isoLike}T00:00:00.000Z`)
  return d.toLocaleDateString('zh-CN', { year: 'numeric', month: '2-digit', day: '2-digit' })
}

export function formatTimeRangeZh(startIso: string, endIso?: string) {
  const s = new Date(startIso)
  const e = endIso ? new Date(endIso) : undefined
  const day = s.toLocaleDateString('zh-CN', { year: 'numeric', month: '2-digit', day: '2-digit' })
  const sTime = s.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
  const eTime = e ? e.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }) : ''
  return e ? `${day} ${sTime}—${eTime}` : `${day} ${sTime}`
}

export function getActivityBySlug(slug: string) {
  return ACTIVITIES.find((a) => a.slug === slug) ?? null
}

export function getScienceBySlug(slug: string) {
  return SCIENCE_ARTICLES.find((a) => a.slug === slug) ?? null
}

export function getCaseBySlug(slug: string) {
  return CASES.find((c) => c.slug === slug) ?? null
}

export function categoryLabel(cat: ActivityCategory) {
  return formatCategoryTitle(cat)
}

export function ageLabel(age: AgeRange) {
  return ageRangeLabel(age)
}

