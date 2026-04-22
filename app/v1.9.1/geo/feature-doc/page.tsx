import Link from 'next/link'

export default function GeoFeatureDocPage() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-wrap gap-4">
          <Link href="/v1.9.1" className="text-sm font-semibold text-slate-500 hover:text-slate-900">
            ← 返回1.9.1迭代需求
          </Link>
          <Link href="/v1.9.1/geo/requirement-doc" className="text-sm font-semibold text-slate-500 hover:text-slate-900">
            查看官网改造功能说明页
          </Link>
        </div>

        <h1 className="text-3xl font-black tracking-tight">官网改造 - 需求说明补充页</h1>
        <p className="mt-3 text-slate-600">
          这是官网改造功能的补充说明入口页。你后续给我具体 PRD 内容后，我会直接把本页替换成正式说明文档。
        </p>

        <section className="mt-8 rounded-xl border border-slate-200 bg-white p-6">
          <h2 className="text-xl font-bold text-slate-900">当前页面用途</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-6 text-slate-700">
            <li>作为“查看需求说明”按钮的独立跳转页。</li>
            <li>与“点击查看”所进入的官网改造功能说明页分离。</li>
            <li>后续可承载更完整的 PRD、流程图、字段清单、验收标准等内容。</li>
          </ul>
        </section>

        <div className="mt-8 flex justify-center">
          <Link
            href="/v1.9.1/geo"
            className="inline-flex h-11 items-center justify-center rounded-lg bg-slate-900 px-6 text-sm font-semibold text-white hover:bg-slate-800"
          >
            查看示例效果
          </Link>
        </div>
      </div>
    </main>
  )
}
