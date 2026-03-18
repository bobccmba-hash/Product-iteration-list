import Link from 'next/link'

const docs = [
  {
    id: 'terminal',
    icon: '📱',
    tag: '前台终端',
    color: 'bg-indigo-50 ring-indigo-200',
    tagColor: 'bg-indigo-100 text-indigo-700',
    title: '学校终端 · 完整前端流程',
    desc: '新用户/老用户/无成长系统三条路径的完整交互流程、欢迎页规则、成长反馈弹窗序列、设计原则。',
    href: '/prd/terminal',
    items: ['人脸识别流程', '新/老用户路径', '欢迎页规则', '成长反馈弹窗序列', '竖屏设计规范'],
  },
  {
    id: 'admin-config',
    icon: '⚙️',
    tag: '后台配置',
    color: 'bg-emerald-50 ring-emerald-200',
    tagColor: 'bg-emerald-100 text-emerald-700',
    title: '任务配置后台',
    desc: '任务模块的配置规则、字段定义、分发策略、推送机制、数据一致性规则及各操作功能说明。',
    href: '/prd/admin-config',
    items: ['任务配置字段', '分发策略说明', '推送机制', '版本控制', '数据一致性'],
  },
  {
    id: 'ranking',
    icon: '🏆',
    tag: '后台配置',
    color: 'bg-purple-50 ring-purple-200',
    tagColor: 'bg-purple-100 text-purple-700',
    title: '学习之星配置后台',
    desc: '学习之星规则配置、分数计算逻辑、前台文案自定义、生效流程及前台排行榜展示逻辑。',
    href: '/prd/ranking',
    items: ['配置规则说明', '分数计算规则', '前台文案配置', '生效流程', '前台排行榜展示'],
  },
  {
    id: 'growth-data',
    icon: '📊',
    tag: '数据中心',
    color: 'bg-rose-50 ring-rose-200',
    tagColor: 'bg-rose-100 text-rose-700',
    title: '成长档案 · 数据视图',
    desc: '学生成长档案列表、互动事件流水、同步日志三大视角的字段说明、筛选逻辑和操作规范。',
    href: '/prd/growth-data',
    items: ['学生档案字段', '筛选与查询', '互动事件流水', '同步日志', '档案详情页'],
  },
  {
    id: 'comment-rules',
    icon: '💬',
    tag: '内容管理',
    color: 'bg-amber-50 ring-amber-200',
    tagColor: 'bg-amber-100 text-amber-700',
    title: '评论规则管理',
    desc: '评论内容校验规则配置、灌水识别、提示文案自定义与生效控制。',
    href: '/prd/comment-rules',
    items: ['基础校验规则', '灌水识别规则', '提示文案配置', '词库管理', '生效控制'],
  },
]

export default function PrdIndexPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
        {/* 顶部 */}
        <Link href="/v1.9.0" className="mb-6 inline-flex items-center gap-1.5 text-base font-bold text-slate-500 hover:text-slate-900">
          ← 返回首页
        </Link>
        <div className="mb-8">
          <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-slate-900 px-3 py-1 text-sm font-bold text-white">
            <span className="h-1.5 w-1.5 rounded-full bg-yellow-400" />
            PRD · 产品需求文档
          </div>
          <h1 className="mt-3 text-3xl font-black tracking-tight text-slate-900">AI 互动成长平台 · 产品需求文档</h1>
          <p className="mt-3 max-w-2xl text-lg leading-relaxed text-slate-600">
            面向开发、产品、设计的完整需求说明。每个模块独立成页，涵盖业务背景、交互流程、字段规则、边界条件和设计原则，可直接用于开发排期和设计评审。
          </p>
        </div>

        {/* 总览说明 */}
        <div className="mb-8 rounded-2xl bg-white p-6 ring-1 ring-slate-200">
          <h2 className="mb-4 text-base font-black text-slate-900">系统架构总览</h2>
          <div className="grid gap-3 text-sm text-slate-700 sm:grid-cols-3">
            <div className="rounded-xl bg-indigo-50 p-3 ring-1 ring-indigo-100">
              <div className="mb-1 font-black text-indigo-800">前台终端（学生侧）</div>
              <p className="leading-relaxed">部署在学校的竖屏设备，学生人脸识别后进入个性化互动流程，互动结束后展示成长反馈。全程自动播放，无需手动操作。</p>
            </div>
            <div className="rounded-xl bg-emerald-50 p-3 ring-1 ring-emerald-100">
              <div className="mb-1 font-black text-emerald-800">配置后台（运营侧）</div>
              <p className="leading-relaxed">运营/教研人员配置任务规则和学习之星展示规则，配置完成后推送到指定终端生效。</p>
            </div>
            <div className="rounded-xl bg-rose-50 p-3 ring-1 ring-rose-100">
              <div className="mb-1 font-black text-rose-800">数据中心（系统侧）</div>
              <p className="leading-relaxed">存储学生成长档案、互动事件流水、任务进度，支持数据查询和同步异常监控。</p>
            </div>
          </div>
          <div className="mt-4 rounded-xl bg-slate-50 p-3 ring-1 ring-slate-100">
            <div className="mb-2 text-sm font-black text-slate-700">核心数据流向</div>
            <div className="text-lg leading-relaxed text-slate-600">
              运营配置规则 → 推送到终端 → 学生互动产生成长记录 → 终端实时展示成长反馈 → 数据异步同步到数据中心 → 运营查看统计分析 → 持续优化任务配置
            </div>
          </div>
        </div>

        {/* 文档卡片列表 */}
        <div className="space-y-4">
          {docs.map((doc) => (
            <Link key={doc.id} href={doc.href} className={`group block rounded-2xl bg-white p-6 ring-1 transition hover:-translate-y-0.5 hover:shadow-md ${doc.color}`}>
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="text-3xl">{doc.icon}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className={`rounded-full px-2 py-0.5 text-sm font-bold ${doc.tagColor}`}>{doc.tag}</span>
                    </div>
                    <h3 className="mt-1 text-lg font-black text-slate-900">{doc.title}</h3>
                    <p className="mt-1 text-lg leading-relaxed text-slate-600">{doc.desc}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {doc.items.map((item) => (
                        <span key={item} className="rounded-lg bg-white/80 px-2 py-0.5 text-sm font-semibold text-slate-600 ring-1 ring-slate-200">{item}</span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="mt-1 text-base font-bold text-slate-400 group-hover:text-slate-900">查看 →</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}
