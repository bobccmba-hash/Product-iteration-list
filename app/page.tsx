'use client'

import Link from 'next/link'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

const AUTH_KEY = 'ai314_auth'

const versions = [
  {
    version: '1.9.1',
    title: '1.9.1 迭代需求',
    date: '待定',
    desc: '下一阶段迭代需求，敬请期待。',
    href: '/v1.9.1',
    status: '规划中',
    statusColor: 'bg-slate-100 text-slate-500',
    count: 0,
  },
  {
    version: '1.9.0',
    title: '1.9.0 迭代需求',
    date: '2026.03.11',
    desc: '终端任务设定、成长档案、学习之星、评价限制、首页热门菜单、机构类型标签等功能迭代。',
    href: '/v1.9.0',
    status: '已完成',
    statusColor: 'bg-green-100 text-green-700',
    count: 9,
  },
]

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    if (typeof window === 'undefined') return
    const token = window.localStorage.getItem(AUTH_KEY)
    if (token !== 'ok') {
      router.replace('/login')
    }
  }, [router])

  return (
    <main className="min-h-screen bg-white text-slate-900">
      <div className="border-b border-slate-200 bg-gradient-to-b from-slate-50 to-white">
        <div className="mx-auto flex max-w-4xl items-start justify-between px-4 py-6 sm:px-6 lg:px-8">
          <div className="space-y-4 py-10">
            <div className="inline-flex items-center gap-2 rounded-lg bg-blue-50 px-3 py-1.5 text-sm font-medium text-blue-700">
              <span className="h-2 w-2 rounded-full bg-blue-500" />
              小黄鹿学园
            </div>
            <h1 className="text-5xl font-black tracking-tight text-slate-900">迭代列表</h1>
            <p className="max-w-2xl text-lg text-slate-600">
              研发迭代需求演示平台，记录每个版本的功能迭代内容。
            </p>
          </div>
          <div className="mt-2 flex flex-col items-end gap-2 text-right text-sm">
            <div className="rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold text-white">
              当前用户：admin
            </div>
            <button
              type="button"
              onClick={() => {
                if (typeof window !== 'undefined') {
                  window.localStorage.removeItem(AUTH_KEY)
                }
                router.replace('/login')
              }}
              className="text-xs font-semibold text-slate-500 hover:text-slate-900"
            >
              退出登录
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-4">
          {versions.map((v) => (
            <Link
              key={v.version}
              href={v.href}
              className="group block rounded-2xl border border-slate-200 bg-white p-6 transition hover:border-blue-300 hover:shadow-md"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-3">
                    <h2 className="text-2xl font-black text-slate-900 group-hover:text-blue-700">
                      {v.title}
                    </h2>
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-bold ${v.statusColor}`}
                    >
                      {v.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-slate-500">
                    <span>📅 {v.date}</span>
                    {v.count > 0 && <span>📋 {v.count} 个功能点</span>}
                  </div>
                  <p className="text-slate-600">{v.desc}</p>
                </div>
                <div className="text-2xl text-slate-300 transition group-hover:text-blue-400">→</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}
