import Link from 'next/link'

export default function V191Page() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <div className="border-b border-slate-200 bg-gradient-to-b from-slate-50 to-white">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mb-4">
            <Link href="/" className="text-sm font-semibold text-slate-500 hover:text-slate-900">← 返回迭代列表</Link>
          </div>
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 rounded-lg bg-slate-100 px-3 py-1.5 text-sm font-medium text-slate-500">
              <span className="h-2 w-2 rounded-full bg-slate-400" />
              规划中
            </div>
            <h1 className="text-5xl font-black tracking-tight text-slate-900">
              1.9.1 迭代需求
            </h1>
            <p className="max-w-2xl text-lg text-slate-600">
              下一阶段迭代需求正在规划中，敬请期待。
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 py-20 sm:px-6 lg:px-8 text-center">
        <div className="space-y-4">
          <p className="text-6xl">🚧</p>
          <h2 className="text-2xl font-bold text-slate-700">内容规划中</h2>
          <p className="text-slate-500">1.9.1 迭代需求尚未确定，请关注后续更新。</p>
          <Link href="/" className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-6 py-3 text-sm font-bold text-white hover:bg-slate-700 mt-4">
            ← 返回迭代列表
          </Link>
        </div>
      </div>
    </main>
  )
}
