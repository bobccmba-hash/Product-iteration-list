'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NAV_190 = [
 {
 title: '配置中心',
 items: [{ href: '/admin/config/tasks', label: '任务设定' }],
 },
 {
 title: '数据中心',
 items: [{ href: '/admin/data/growth', label: '成长记录' }],
 },
 {
 title: '学习之星管理',
 items: [
 { href: '/admin/ranking', label: '学习之星配置' },
 { href: '/admin/ranking/school-board', label: '学校榜单管理' },
 ],
 },
 {
 title: '系统机构管理',
 items: [
 { href: '/admin/system/org-types', label: '类型管理' },
 { href: '/admin/system/org-tags', label: '标签管理' },
 { href: '/admin/system/org-badges', label: '认证标识管理' },
 { href: '/admin/system/org-create', label: '新建机构' },
 ],
 },
 {
 title: '前台管理',
 items: [
 { href: '/admin/home-brand', label: '首页热门菜单' },
 { href: '/admin/comment-rules', label: '评论规则管理' },
 ],
 },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
 const pathname = usePathname()
  const nav = NAV_190
  const homeHref = '/admin'
  const homeLabel = '学校终端 · 后台'
  const frontHref = '/v1.9.0'

 return (
    <div className={`min-h-screen text-slate-900 bg-slate-50`}>
 <div className="mx-auto flex min-h-screen max-w-[1400px]">
 <aside
 className={`hidden w-[260px] shrink-0 flex-col gap-6 border-r p-5 md:flex ${
            'border-slate-200 bg-white'
 }`}
 >
 <div className="flex items-center justify-between">
 <Link href={homeHref} className="text-sm font-black tracking-wide text-slate-900">
 {homeLabel}
 </Link>
 <Link href={frontHref} className="text-xs font-semibold text-slate-500 hover:text-slate-900">
 返回前台
 </Link>
 </div>
 <div className="space-y-5">
 {nav.map((g) => (
 <div key={g.title}>
 <div className="mb-2 text-xs font-bold text-slate-500">{g.title}</div>
 <div className="flex flex-col gap-1">
 {g.items.map((it) => {
 const active = pathname === it.href || (it.href !== '/admin/ranking' && pathname?.startsWith(it.href))
 return (
 <Link
 key={it.href}
 href={it.href}
 className={`rounded-lg px-3 py-2 text-sm font-semibold ${
 active
            ? 'bg-slate-900 text-white'
            : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
 }`}
 >
 {it.label}
 </Link>
 )
 })}
 </div>
 </div>
 ))}
 </div>
 </aside>
 <main className="flex-1 p-5 md:p-8">{children}</main>
 </div>
 </div>
 )
}
