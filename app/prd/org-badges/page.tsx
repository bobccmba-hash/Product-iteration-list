import Link from 'next/link'

export default function PrdOrgBadgesPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <div className="mb-6 flex items-center justify-between gap-4">
          <Link href="/v1.9.0" className="inline-flex items-center gap-1.5 text-base font-bold text-slate-500 hover:text-slate-900">
            ← 返回 1.9.0 需求首页
          </Link>
          <div className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-3 py-1 text-sm font-semibold text-slate-50">
            <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
            AI 互动成长平台 · PRD
          </div>
        </div>

        <header className="mb-8 space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full bg-green-100 px-2.5 py-1 text-sm font-bold text-green-700 ring-1 ring-green-200">
            <span>✨</span><span>系统管理 · 认证标识</span>
          </div>
          <h1 className="text-3xl font-black tracking-tight">认证标识管理 PRD</h1>
          <p className="max-w-3xl text-base leading-relaxed text-slate-600">
            本文档定义机构认证标识管理后台（v1.9.0）。运营人员通过本模块维护机构认证 / 推荐 / 活动标识字典，每个标识由名称、展示文字、标识图片与色值组合呈现（如「蓝V认证」「红V认证」），支持启用 / 禁用状态控制，已被机构引用的标识不允许删除。
          </p>
          <div className="flex flex-wrap gap-2 text-sm text-slate-500">
            <span className="rounded-full bg-white px-2 py-0.5 ring-1 ring-slate-200">版本：v1.9.0</span>
            <span className="rounded-full bg-white px-2 py-0.5 ring-1 ring-slate-200">角色：运营 / 管理员</span>
            <span className="rounded-full bg-white px-2 py-0.5 ring-1 ring-slate-200">路由：/admin/system/org-badges</span>
          </div>
        </header>

        <div className="space-y-6">

          {/* 一、核心概念 */}
          <section className="rounded-2xl bg-white p-5 ring-1 ring-slate-200">
            <div className="mb-3 flex items-center justify-between gap-2">
              <h2 className="text-xl font-black">一、核心概念</h2>
              <span className="rounded-full bg-green-50 px-2 py-0.5 text-sm font-semibold text-green-700">Concepts</span>
            </div>
            <div className="space-y-3">
              <div className="rounded-xl bg-green-50 p-4 ring-1 ring-green-100">
                <div className="mb-1 text-sm font-bold text-green-800">标识 = 编码（code）+ 名称（name）+ 展示文字（displayText）+ 标识图片 + 色值（color）+ 启用状态</div>
                <p className="text-sm leading-relaxed text-green-900">
                  认证标识是机构的视觉认证符号，在前台以「色圆 V 图标 + 展示文字」的胶囊形式呈现。<strong>编码（code）</strong>由系统自动生成（格式 <code className="rounded bg-green-100 px-1 text-xs">badge_&lt;timestamp&gt;</code>），稳定不变；<strong>状态</strong>支持随时启用 / 禁用，禁用后前台不展示但数据保留；<strong>使用次数</strong>记录引用该标识的机构数，大于 0 时禁止删除。
                </p>
              </div>
              <div className="grid gap-3 sm:grid-cols-3">
                {[
                  { label: '视觉组合展示', desc: '标识预览以「色圆 V + 展示文字」胶囊形式渲染，色值由 color 字段控制，默认蓝色 #2563eb。' },
                  { label: '状态可切换', desc: '列表「开启/关闭」按钮直接切换状态即时生效。禁用状态下前台不展示，数据完整保留。' },
                  { label: '使用保护', desc: 'useCount > 0 时删除按钮置灰禁用，防止误删机构正在使用的标识。' },
                ].map((c) => (
                  <div key={c.label} className="rounded-xl bg-slate-50 p-3 ring-1 ring-slate-100">
                    <div className="mb-1 font-bold text-slate-800">{c.label}</div>
                    <p className="text-sm text-slate-600">{c.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 二、标识列表页 */}
          <section className="rounded-2xl bg-white p-5 ring-1 ring-slate-200">
            <div className="mb-3 flex items-center justify-between gap-2">
              <h2 className="text-xl font-black">二、标识列表页</h2>
              <span className="rounded-full bg-slate-900 px-2 py-0.5 text-sm font-semibold text-slate-50">/admin/system/org-badges</span>
            </div>
            <div className="space-y-4 text-sm">
              <div className="rounded-xl bg-slate-50 px-4 py-3 text-slate-600 ring-1 ring-slate-100">
                页面顶部面包屑「系统管理 / 系统机构管理」，右上角提供「返回后台首页」与「+ 新增标识」入口。筛选区支持按标识名称 / 编码关键词搜索，以及按启用状态下拉筛选（全部 / 启用 / 禁用），点击「查询」触发，「重置」清空全部筛选条件。
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
                        ['排序', '数字输入框，当前排序值，宽度 64px，值越小越靠前', '始终显示'],
                        ['标识预览', '「色圆 V + 展示文字」胶囊，色圆背景取 color 字段，文字取 displayText', '始终显示'],
                        ['标识名称', '粗体展示 name 字段', '始终显示'],
                        ['状态', '开启（绿色）/ 关闭（灰色）按钮，可直接点击切换', '始终显示'],
                        ['使用次数', '有机构时显示「N 个机构」蓝色链接，无机构时灰色 0', 'md 及以上'],
                        ['创建时间', '格式 YYYY-MM-DD HH:mm', 'lg 及以上'],
                        ['操作', '编辑 / 删除（已使用时置灰禁用）', '始终显示'],
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
                    ['编辑', '弹出「编辑标识」弹窗，可修改名称、展示文字、标识图片、排序，保存后列表即时更新'],
                    ['开启 / 关闭', '点击状态按钮直接切换 enabled ↔ disabled，禁用后前台不展示该标识'],
                    ['删除（可用）', 'useCount === 0 时可点击，弹出 confirm 确认后从列表永久移除'],
                    ['删除（禁用）', 'useCount > 0 时置灰，hover 提示「该标识已被机构使用，无法删除」'],
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
              <span className="rounded-full bg-green-50 px-2 py-0.5 text-sm font-semibold text-green-700">Modal · 四字段</span>
            </div>
            <div className="mb-3 rounded-xl bg-slate-50 px-4 py-3 text-sm text-slate-600 ring-1 ring-slate-100">
              新增（点击「+ 新增标识」）与编辑（点击行内「编辑」）共用同一个弹窗，通过 <code className="rounded bg-slate-200 px-1 text-xs">editingId</code> 区分模式，标题分别显示「新增标识」和「编辑标识」，确认按钮文案分别为「确认」和「保存」。
            </div>
            <div className="space-y-3">
              {[
                { name: '标识名称', required: true, desc: '必填，文字输入框，placeholder「例如：蓝V认证」。为空时点击确认弹出 alert 提示「请填写标识名称」' },
                { name: '展示文字', required: false, desc: '选填，前台胶囊中「色圆 V」右侧的描述文字，如「官方认证」「重点推荐」' },
                { name: '标识图片', required: false, desc: '选填，文件选择器（accept="image/*"），上传后作为标识图标使用' },
                { name: '排序', required: false, desc: '数字输入框，默认值 10，值越小越靠前，建议步长 10' },
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
              <div className="rounded-xl bg-green-50 px-4 py-3 text-green-800 ring-1 ring-green-100">
                <span className="font-bold">新增逻辑：</span>系统自动生成编码（<code className="rounded bg-green-100 px-1 text-xs">badge_&lt;timestamp&gt;</code>），status 默认为 enabled，useCount 初始为 0，createdAt 取当前时间，保存后追加至列表末尾。
              </div>
              <div className="rounded-xl bg-amber-50 px-4 py-3 text-amber-800 ring-1 ring-amber-100">
                <span className="font-bold">编辑逻辑：</span>可修改 name、displayText、标识图片、sort，code / status / useCount / createdAt 不变。编辑不影响已引用该标识的机构关联关系。
              </div>
            </div>
          </section>

          {/* 四、字段默认值 */}
          <section className="rounded-2xl bg-white p-5 ring-1 ring-slate-200">
            <div className="mb-3 flex items-center justify-between gap-2">
              <h2 className="text-xl font-black">四、字段默认值（新增时）</h2>
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
                    ['标识名称', '空（必填）', '新增时必须填写，为空不可提交'],
                    ['展示文字', '空', '选填，不填时胶囊仅显示色圆 V'],
                    ['标识图片', '无', '选填，不上传时使用色圆 V 默认样式'],
                    ['色值（color）', '#2563eb（蓝色）', '当前版本在弹窗中不暴露色值输入，由系统预设'],
                    ['编码（code）', '系统自动生成', '格式 badge_<timestamp>，不可手动输入'],
                    ['状态', 'enabled（启用）', '新增后默认启用，立即可被机构关联'],
                    ['排序', '10', '建议步长 10，方便后续插入'],
                    ['使用次数', '0', '新增时无关联，删除按钮可用'],
                    ['创建时间', '当前时间', '提交时由前端取本地时间记录'],
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

          {/* 五、删除保护规则 */}
          <section className="rounded-2xl bg-white p-5 ring-1 ring-slate-200">
            <div className="mb-3 flex items-center justify-between gap-2">
              <h2 className="text-xl font-black">五、删除保护规则</h2>
              <span className="rounded-full bg-rose-50 px-2 py-0.5 text-sm font-semibold text-rose-600">Delete Guard</span>
            </div>
            <div className="space-y-2 text-sm">
              {[
                {
                  cond: 'useCount === 0',
                  state: '可删除',
                  color: 'bg-green-50 ring-green-100',
                  textColor: 'text-green-800',
                  desc: '删除按钮正常可点击（text-rose-600），点击后弹出 confirm 确认对话框，确认则从列表永久移除。',
                },
                {
                  cond: 'useCount > 0',
                  state: '禁止删除',
                  color: 'bg-rose-50 ring-rose-100',
                  textColor: 'text-rose-800',
                  desc: '删除按钮置灰（text-slate-300 cursor-not-allowed），hover 显示 title 提示「该标识已被机构使用，无法删除」。如需删除，需先将相关机构解除该标识的关联。',
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

          {/* 六、典型数据示例 */}
          <section className="rounded-2xl bg-white p-5 ring-1 ring-slate-200">
            <div className="mb-3 flex items-center justify-between gap-2">
              <h2 className="text-xl font-black">六、典型数据示例</h2>
              <span className="rounded-full bg-slate-100 px-2 py-0.5 text-sm font-semibold text-slate-600">Examples</span>
            </div>
            <div className="overflow-hidden rounded-xl border border-slate-100">
              <table className="min-w-full border-collapse text-left text-sm">
                <thead className="bg-slate-100 text-xs uppercase text-slate-500">
                  <tr>
                    <th className="px-3 py-2">排序</th>
                    <th className="px-3 py-2">标识名称</th>
                    <th className="px-3 py-2">展示文字</th>
                    <th className="px-3 py-2">色值</th>
                    <th className="px-3 py-2">状态</th>
                    <th className="px-3 py-2">使用次数</th>
                    <th className="px-3 py-2">可删除</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['10', '蓝V认证', '官方认证', '#2563eb', '启用', '6 个', '否'],
                    ['20', '红V认证', '重点推荐', '#dc2626', '启用', '2 个', '否'],
                    ['30', '新春活动', '限时活动', '#f97316', '禁用', '0', '是'],
                  ].map(([sort, name, text, color, st, count, del_], i) => (
                    <tr key={name} className={`border-t border-slate-100 ${i % 2 === 1 ? 'bg-slate-50' : ''}`}>
                      <td className="px-3 py-2 text-slate-600">{sort}</td>
                      <td className="px-3 py-2 font-semibold">{name}</td>
                      <td className="px-3 py-2 text-slate-600">{text}</td>
                      <td className="px-3 py-2">
                        <span className="inline-flex items-center gap-1">
                          <span className="inline-block h-3 w-3 rounded-full" style={{ backgroundColor: color }} />
                          <code className="text-xs text-slate-500">{color}</code>
                        </span>
                      </td>
                      <td className={`px-3 py-2 font-semibold ${st === '启用' ? 'text-green-600' : 'text-slate-400'}`}>{st}</td>
                      <td className={`px-3 py-2 ${count === '0' ? 'text-slate-400' : 'text-indigo-600 font-semibold'}`}>{count}</td>
                      <td className={`px-3 py-2 font-semibold ${del_ === '是' ? 'text-green-600' : 'text-rose-500'}`}>{del_}</td>
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
