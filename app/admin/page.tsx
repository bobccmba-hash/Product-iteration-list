import Link from 'next/link'

export default function AdminHomePage() {
  const modules = [
    {
      title: '任务设定',
      desc: '决定短期挑战内容，前台展示当前任务与任务进度。',
      href: '/admin/config/tasks',
    },
    {
      title: '成长记录',
      desc: '所有计算与排查依据，档案/任务/目标/勋章都依赖它。',
      href: '/admin/data/growth',
    },
  ]

  const systemModules = [
    {
      title: '排行榜管理',
      desc: '管理排行榜配置和排序规则。',
      href: '/admin/ranking',
    },
    {
      title: '评论规则管理',
      desc: '配置评论审核规则和内容管理。',
      href: '/admin/comment-rules',
    },
  ]

  const orgModules = [
    {
      title: '类型管理',
      desc: '管理机构类型分类。',
      href: '/admin/system/org-types',
    },
    {
      title: '标签管理',
      desc: '管理机构特征标签。',
      href: '/admin/system/org-tags',
    },
    {
      title: '认证标识管理',
      desc: '管理机构认证和推荐标识。',
      href: '/admin/system/org-badges',
    },
    {
      title: '新建机构',
      desc: '创建新的机构并配置相关信息。',
      href: '/admin/system/org-create',
    },
  ]

  return (
    <div className="space-y-8">
      {/* 主模块 */}
      <div className="rounded-2xl bg-white p-6 ring-1 ring-slate-200">
        <div className="text-xs font-bold text-slate-500">后台</div>
        <h1 className="mt-2 text-2xl font-black tracking-tight">配置与数据中心</h1>
        <p className="mt-2 max-w-[760px] text-sm leading-relaxed text-slate-600">
          当前包括「任务设定」「成长记录」两个模块，用于支撑前台任务与数据管理。
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {modules.map((module) => (
          <Card key={module.href} {...module} />
        ))}
      </div>

      {/* 系统管理 */}
      <div className="rounded-2xl bg-white p-6 ring-1 ring-slate-200">
        <div className="text-xs font-bold text-slate-500">系统管理</div>
        <h2 className="mt-2 text-2xl font-black tracking-tight">系统配置</h2>
        <p className="mt-2 max-w-[760px] text-sm leading-relaxed text-slate-600">
          管理排行榜、评论规则等系统级配置。
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {systemModules.map((module) => (
          <Card key={module.href} {...module} />
        ))}
      </div>

      {/* 机构管理 */}
      <div className="rounded-2xl bg-white p-6 ring-1 ring-slate-200">
        <div className="text-xs font-bold text-slate-500">系统管理</div>
        <h2 className="mt-2 text-2xl font-black tracking-tight">系统机构管理</h2>
        <p className="mt-2 max-w-[760px] text-sm leading-relaxed text-slate-600">
          管理机构类型、标签、认证标识和创建新机构。
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {orgModules.map((module) => (
          <Card key={module.href} {...module} />
        ))}
      </div>
    </div>
  )
}

function Card({ title, desc, href }: { title: string; desc: string; href: string }) {
  return (
    <Link href={href} className="group rounded-2xl bg-white p-6 ring-1 ring-slate-200 transition hover:-translate-y-0.5 hover:ring-slate-300">
      <div className="flex items-center justify-between">
        <div className="text-lg font-black">{title}</div>
        <div className="text-sm font-bold text-slate-500 group-hover:text-slate-900">进入 →</div>
      </div>
      <p className="mt-2 text-sm leading-relaxed text-slate-600">{desc}</p>
    </Link>
  )
}
