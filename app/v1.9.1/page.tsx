import Link from 'next/link'

export default function V191Page() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-6">
          <Link
            href="/"
            className="text-sm font-semibold text-slate-500 hover:text-slate-900"
          >
            ← 返回迭代列表
          </Link>
        </div>
        <div className="space-y-3">
          <h1 className="text-5xl font-black tracking-tight text-slate-900">1.9.1迭代需求</h1>
          <p className="max-w-2xl text-lg text-slate-600">1.9.1迭代列表功能详情。</p>
        </div>

        <div className="mt-8 grid gap-6">
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="space-y-2">
                <div className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                  新增模块入口
                </div>
                <h2 className="text-2xl font-bold text-slate-900">官网改造</h2>
                <p className="max-w-3xl text-sm leading-6 text-slate-600">
                  增加官网 GEO 化升级项目入口，包含项目背景、目标、信息架构、页面原型、字段规范与接口清单，支持研发与设计协同落地。
                </p>
              </div>
            <div className="flex flex-col gap-2">
              <Link
                href="/v1.9.1/geo/requirement-doc"
                className="inline-flex h-10 items-center justify-center rounded-lg bg-slate-900 px-5 text-sm font-semibold text-white hover:bg-slate-800"
              >
                点击查看
              </Link>
              <Link
                href="/v1.9.1/geo/feature-doc"
                className="inline-flex h-10 items-center justify-center rounded-lg border border-slate-300 bg-white px-5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                查看需求说明
              </Link>
            </div>
            </div>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="space-y-2">
                <div className="inline-flex items-center rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                  新增板块卡片入口
                </div>
                <h2 className="text-2xl font-bold text-slate-900">商品功能复制</h2>
                <p className="max-w-3xl text-sm leading-6 text-slate-600">
                  在官网 GEO 改造板块下新增商品功能复制入口，支持点击进入对应页面详情，并可从详情页返回当前 1.9.1 迭代列表功能详情页面。
                </p>
              </div>
            <div className="flex flex-col gap-2">
              <Link
                href="/v1.9.1/product-copy"
                className="inline-flex h-10 items-center justify-center rounded-lg bg-slate-900 px-5 text-sm font-semibold text-white hover:bg-slate-800"
              >
                点击查看
              </Link>
              <Link
                href="/v1.9.1/product-copy/requirement-doc"
                className="inline-flex h-10 items-center justify-center rounded-lg border border-slate-300 bg-white px-5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                查看需求说明
              </Link>
            </div>
            </div>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="space-y-2">
                <div className="inline-flex items-center rounded-full bg-cyan-50 px-3 py-1 text-xs font-semibold text-cyan-700">
                  套餐级价格规则增强
                </div>
                <h2 className="text-2xl font-bold text-slate-900">平台结算价</h2>
                <p className="max-w-3xl text-sm leading-6 text-slate-600">
                  在商品编辑的套餐管理中新增“结算价（元）”能力，按套餐决定是否由平台承担手续费，并在填写套餐弹窗中提供校验、提醒与保存反馈。
                </p>
              </div>
            <div className="flex flex-col gap-2">
              <Link
                href="/v1.9.1/product-copy?mode=edit&productId=10971&tab=pkg"
                className="inline-flex h-10 items-center justify-center rounded-lg bg-slate-900 px-5 text-sm font-semibold text-white hover:bg-slate-800"
              >
                点击查看
              </Link>
              <Link
                href="/v1.9.1/product-copy/settlement-requirement-doc"
                className="inline-flex h-10 items-center justify-center rounded-lg border border-slate-300 bg-white px-5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                查看需求说明
              </Link>
            </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}
