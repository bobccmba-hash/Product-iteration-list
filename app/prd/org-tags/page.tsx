import Link from 'next/link'

export default function PrdOrgTagsPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <div className="mb-6 flex items-center justify-between gap-4">
          <Link href="/v1.9.0" className="inline-flex items-center gap-1.5 text-base font-bold text-slate-500 hover:text-slate-900">
            ← 返回 1.9.0 需求首页
          </Link>
          <div className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-3 py-1 text-sm font-semibold text-slate-50">
            <span className="h-1.5 w-1.5 rounded-full bg-purple-400" />
            AI 互动成长平台 · PRD
          </div>
        </div>

        <header className="mb-8 space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full bg-purple-100 px-2.5 py-1 text-sm font-bold text-purple-700 ring-1 ring-purple-200">
            <span>🏷️</span><span>系统管理 · 机构标签</span>
          </div>
          <h1 className="text-3xl font-black tracking-tight">机构标签管理 PRD</h1>
          <p className="max-w-3xl text-base leading-relaxed text-slate-600">
            本文档定义机构标签管理后台（v1.9.0）。运营人员通过本模块维护机构特征标签字典，标签支持多选，用于机构的前台筛选与展示。标签拥有稳定唯一的编码（code）与可调整的展示名称，已被机构引用的标签不允许删除。
          </p>
          <div className="flex flex-wrap gap-2 text-sm text-slate-500">
            <span className="rounded-full bg-white px-2 py-0.5 ring-1 ring-slate-200">版本：v1.9.0</span>
            <span className="rounded-full bg-white px-2 py-0.5 ring-1 ring-slate-200">角色：运营 / 管理员</span>
            <span className="rounded-full bg-white px-2 py-0.5 ring-1 ring-slate-200">路由：/admin/system/org-tags</span>
          </div>
        </header>

        <div className="space-y-6">

          {/* 一、核心概念 */}
          <section className="rounded-2xl bg-white p-5 ring-1 ring-slate-200">
            <div className="mb-3 flex items-center justify-between gap-2">
              <h2 className="text-xl font-black">一、核心概念</h2>
              <span className="rounded-full bg-purple-50 px-2 py-0.5 text-sm font-semibold text-purple-700">Concepts</span>
            </div>
            <div className="space-y-3">
              <div className="rounded-xl bg-purple-50 p-4 ring-1 ring-purple-100">
                <div className="mb-1 text-sm font-bold text-purple-800">标签 = 唯一编码（code）+ 展示名称（name）+ 排序值（sort）</div>
                <p className="text-sm leading-relaxed text-purple-900">
                  机构标签是机构的特征描述字典，与机构类型的核心区别在于：<strong>标签支持多选</strong>，一个机构可同时打多个标签（如「人气机构」+「科普基地」）。<strong>编码（code）</strong>由系统自动生成（格式 <code className="rounded bg-purple-100 px-1 text-xs">tag_&lt;timestamp&gt;</code>），稳定不变；<strong>名称（name）</strong>可随时修改而不影响已有引用关系。
                </p>
              </div>
              <div className="grid gap-3 sm:grid-cols-3">
                {[
                  { label: '多选支持', desc: '与机构类型（单选）不同，标签支持多选，一个机构可同时关联多个标签，灵活描述机构特征。' },
                  { label: '编码稳定', desc: '新增时系统自动生成编码，不可手动修改。机构表通过 code 引用，改名不影响关联关系。' },
                  { label: '使用保护', desc: '已被至少一个机构使用的标签，删除按钮置灰禁用，防止意外破坏关联关系。' },
                ].map((c) => (
                  <div key={c.label} className="rounded-xl bg-slate-50 p-3 ring-1 ring-slate-100">
                    <div className="mb-1 font-bold text-slate-800">{c.label}</div>
                    <p className="text-sm text-slate-600">{c.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 二、标签列表页 */}
          <section className="rounded-2xl bg-white p-5 ring-1 ring-slate-200">
            <div className="mb-3 flex items-center justify-between gap-2">
              <h2 className="text-xl font-black">二、标签列表页</h2>
              <span className="rounded-full bg-slate-900 px-2 py-0.5 text-sm font-semibold text-slate-50">/admin/system/org-tags</span>
            </div>
            <div className="space-y-4 text-sm">
              <div className="rounded-xl bg-slate-50 px-4 py-3 text-slate-600 ring-1 ring-slate-100">
                页面顶部面包屑「系统管理 / 系统机构管理」，右上角提供「返回后台首页」与「+ 新增标签」入口。筛选区支持按标签名称或编码关键词搜索，点击「查询」触发过滤，「重置」清空关键词恢复全量列表。
              </div>
              <div>
                <div className="mb-2 font-bold text-slate-800">列表字段</div>
                <div className="overflow-hidden rounded-xl border border-slate-100">
                  <table className="min-w-full border-collapse text-left">
                    <thead className="bg-slate-100 text-xs uppercase text-slate-500">
                      <tr>
                        <th className="px-3 py-2">字段</th>
                        <th className="px-3 py-2">展示说明</th>
                        <th className="px-3 py-2">响应式可见性</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ['排序', '数字输入框，当前排序值，宽度固定 64px，列表按此值升序排列', '始终显示'],
                        ['标签名称', '粗体展示，即 name 字段', '始终显示'],
                        ['使用次数', '有机构时显示「N 个机构」蓝色可点击链接，无机构时显示灰色 0', 'md 及以上'],
                        ['创建时间', '格式 YYYY-MM-DD HH:mm', 'lg 及以上'],
                        ['更新时间', '最近修改时间，格式 YYYY-MM-DD HH:mm', 'lg 及以上'],
                        ['操作', '编辑 / 删除（已使用时删除置灰禁用）', '始终显示'],
                      ].map(([f, d, r], i) => (
                        <tr key={f} className={`border-t border-slate-100 ${i % 2 === 1 ? 'bg-slate-50' : ''}`}>
                          <td className="px-3 py-2 font-medium whitespace-nowrap">{f}</td>
                          <td className="px-3 py-2 text-slate-600">{d}</td>
                          <td className="px-3 py-2 text-xs text-slate-400 whitespace-nowrap">{r}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div>
                <div className="mb-2 font-bold text-slate-800">操作说明</div>
                <div className="grid gap-2 sm:grid-cols-2">
                  {[
                    ['编辑', '弹出「编辑标签」弹窗，可修改名称与排序值，保存后列表即时更新'],
                    ['删除（可用）', 'useCount === 0 时可点击，弹出 confirm 确认对话框，确认后从列表移除'],
                    ['删除（禁用）', 'useCount > 0 时按钮置灰，hover 显示 title 提示「该标签已被使用，无法删除」'],
                    ['使用次数链接', '点击后弹出「使用机构清单」弹窗，展示所有使用该标签的机构列表'],
                  ].map(([op, desc]) => (
                    <div key={op} className="flex gap-2 rounded-lg bg-slate-50 px-3 py-2 ring-1 ring-slate-100">
                      <span className="font-bold text-slate-800 whitespace-nowrap">{op}</span>
                      <span className="text-slate-600">{desc}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* 三、新增 / 编辑弹窗 */}
          <section className="rounded-2xl bg-white p-5 ring-1 ring-slate-200">
            <div className="mb-3 flex items-center justify-between gap-2">
              <h2 className="text-xl font-black">三、新增 / 编辑弹窗</h2>
              <span className="rounded-full bg-purple-50 px-2 py-0.5 text-sm font-semibold text-purple-700">Modal · 两字段</span>
            </div>
            <div className="mb-3 rounded-xl bg-slate-50 px-4 py-3 text-sm text-slate-600 ring-1 ring-slate-100">
              新增（点击「+ 新增标签」）与编辑（点击行内「编辑」）共用同一个弹窗，通过 <code className="rounded bg-slate-200 px-1 text-xs">editingId</code> 区分模式，标题分别显示「新增标签」和「编辑标签」，确认按钮文案分别为「确认」和「保存」。
            </div>
            <div className="space-y-3">
              {[
                {
                  name: '标签名称',
                  required: true,
                  desc: '必填，文字输入框，placeholder「例如：人气机构」。为空时点击确认弹出 alert 提示「请填写标签名称」',
                },
                {
                  name: '排序',
                  required: false,
                  desc: '数字输入框，默认值 10。值越小展示越靠前，建议步长 10 以便后续插入',
                },
              ].map((f) => (
                <div key={f.name} className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                  <div className="flex items-start gap-2 text-sm">
                    <span className="mt-0.5 font-medium text-slate-800 whitespace-nowrap">{f.name}{f.required ? ' *' : ''}</span>
                    <span className="text-slate-500">— {f.desc}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-3 space-y-2 text-sm">
              <div className="rounded-xl bg-purple-50 px-4 py-3 text-purple-800 ring-1 ring-purple-100">
                <span className="font-bold">新增逻辑：</span>系统自动生成编码（<code className="rounded bg-purple-100 px-1 text-xs">tag_&lt;timestamp&gt;</code>），useCount 初始为 0，createdAt / updatedAt 取当前时间，保存后追加至列表末尾。
              </div>
              <div className="rounded-xl bg-amber-50 px-4 py-3 text-amber-800 ring-1 ring-amber-100">
                <span className="font-bold">编辑逻辑：</span>仅允许修改 name 与 sort，code 与 useCount 不变，updatedAt 更新为当前时间。编辑不影响已引用该标签的机构关联关系。
              </div>
            </div>
          </section>

          {/* 四、使用机构清单弹窗 */}
          <section className="rounded-2xl bg-white p-5 ring-1 ring-slate-200">
            <div className="mb-3 flex items-center justify-between gap-2">
              <h2 className="text-xl font-black">四、使用机构清单弹窗</h2>
              <span className="rounded-full bg-slate-100 px-2 py-0.5 text-sm font-semibold text-slate-600">Org Modal</span>
            </div>
            <div className="mb-3 rounded-xl bg-slate-50 px-4 py-3 text-sm text-slate-600 ring-1 ring-slate-100">
              点击列表中「N 个机构」蓝色链接触发，弹窗标题「使用机构清单 - {'{标签名称}'}」，最大高度 384px 可滚动，底部「关闭」按钮退出。无使用机构时显示「暂无使用机构」占位提示。
            </div>
            <div className="overflow-hidden rounded-xl border border-slate-100">
              <table className="min-w-full border-collapse text-left text-sm">
                <thead className="bg-slate-100 text-xs uppercase text-slate-500">
                  <tr>
                    <th className="px-3 py-2">机构名称</th>
                    <th className="px-3 py-2">标签</th>
                    <th className="px-3 py-2">操作</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="px-3 py-2 font-semibold">晋江市教育局</td>
                    <td className="px-3 py-2 text-slate-500">人气机构</td>
                    <td className="px-3 py-2 text-purple-600">查看</td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="px-3 py-2 font-semibold">晋江市第一中学</td>
                    <td className="px-3 py-2 text-slate-500">人气机构</td>
                    <td className="px-3 py-2 text-purple-600">查看</td>
                  </tr>
                  <tr>
                    <td colSpan={3} className="px-3 py-2 text-xs text-slate-400">…更多机构（滚动加载）</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* 五、字段默认值 */}
          <section className="rounded-2xl bg-white p-5 ring-1 ring-slate-200">
            <div className="mb-3 flex items-center justify-between gap-2">
              <h2 className="text-xl font-black">五、字段默认值（新增时）</h2>
              <span className="rounded-full bg-slate-100 px-2 py-0.5 text-sm font-semibold text-slate-600">Defaults</span>
            </div>
            <div className="overflow-hidden rounded-xl border border-slate-100">
              <table className="min-w-full border-collapse text-left text-sm">
                <thead className="bg-slate-100 text-xs uppercase text-slate-500">
                  <tr>
                    <th className="px-3 py-2">字段</th>
                    <th className="px-3 py-2">默认值</th>
                    <th className="px-3 py-2">说明</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['标签名称', '空（必填）', '新增时必须填写，为空不可提交'],
                    ['编码（code）', '系统自动生成', '格式 tag_<timestamp>，不可手动输入'],
                    ['排序', '10', '建议步长 10，方便后续在中间插入新标签'],
                    ['使用次数', '0', '新增时无关联，删除按钮可用'],
                    ['创建时间', '当前时间', '提交时由前端取本地时间记录'],
                    ['更新时间', '当前时间', '每次编辑保存时同步更新'],
                  ].map(([f, d, note], i) => (
                    <tr key={f} className={`border-t border-slate-100 ${i % 2 === 1 ? 'bg-slate-50' : ''}`}>
                      <td className="px-3 py-2 font-medium whitespace-nowrap">{f}</td>
                      <td className="px-3 py-2 text-slate-600">{d}</td>
                      <td className="px-3 py-2 text-xs text-slate-400">{note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* 六、删除保护规则 */}
          <section className="rounded-2xl bg-white p-5 ring-1 ring-slate-200">
            <div className="mb-3 flex items-center justify-between gap-2">
              <h2 className="text-xl font-black">六、删除保护规则</h2>
              <span className="rounded-full bg-rose-50 px-2 py-0.5 text-sm font-semibold text-rose-600">Delete Guard</span>
            </div>
            <div className="space-y-2 text-sm">
              {[
                {
                  cond: 'useCount === 0',
                  state: '可删除',
                  color: 'bg-green-50 ring-green-100',
                  textColor: 'text-green-800',
                  desc: '删除按钮正常可点击（text-rose-600），点击后弹出 confirm 确认对话框，确认则从列表移除，操作不可恢复。',
                },
                {
                  cond: 'useCount > 0',
                  state: '禁止删除',
                  color: 'bg-rose-50 ring-rose-100',
                  textColor: 'text-rose-800',
                  desc: '删除按钮置灰（text-slate-300 cursor-not-allowed），hover 显示 title 提示「该标签已被使用，无法删除」。需先将相关机构解除该标签关联后方可删除。',
                },
              ].map((r) => (
                <div key={r.cond} className={`rounded-xl p-4 ring-1 ${r.color}`}>
                  <div className={`mb-1 flex items-center gap-2 font-bold ${r.textColor}`}>
                    <code className="rounded bg-white/60 px-1 text-xs">{r.cond}</code>
                    <span>→ {r.state}</span>
                  </div>
                  <p className={`text-sm ${r.textColor}`}>{r.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* 七、与机构类型的区别 */}
          <section className="rounded-2xl bg-white p-5 ring-1 ring-slate-200">
            <div className="mb-3 flex items-center justify-between gap-2">
              <h2 className="text-xl font-black">七、标签 vs 类型</h2>
              <span className="rounded-full bg-slate-100 px-2 py-0.5 text-sm font-semibold text-slate-600">Comparison</span>
            </div>
            <div className="overflow-hidden rounded-xl border border-slate-100">
              <table className="min-w-full border-collapse text-left text-sm">
                <thead className="bg-slate-100 text-xs uppercase text-slate-500">
                  <tr>
                    <th className="px-3 py-2">维度</th>
                    <th className="px-3 py-2">机构标签</th>
                    <th className="px-3 py-2">机构类型</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['选择方式', '多选，一个机构可同时关联多个', '单选，一个机构只能选一个'],
                    ['用途', '描述机构特征，用于筛选与展示', '定义机构主分类，决定归属'],
                    ['编码格式', 'tag_\u003ctimestamp\u003e（自动生成）', 'type_\u003ctimestamp\u003e（自动生成）'],
                    ['删除保护', 'useCount > 0 时禁止删除', 'orgCount > 0 时禁止删除'],
                    ['路由', '/admin/system/org-tags', '/admin/system/org-types'],
                  ].map(([dim, tag, type], i) => (
                    <tr key={dim} className={`border-t border-slate-100 ${i % 2 === 1 ? 'bg-slate-50' : ''}`}>
                      <td className="px-3 py-2 font-medium whitespace-nowrap">{dim}</td>
                      <td className="px-3 py-2 text-slate-600">{tag}</td>
                      <td className="px-3 py-2 text-slate-600">{type}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

        </div>
      </div>
    </main>
  )
}