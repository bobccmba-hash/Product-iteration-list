import Link from 'next/link'

export default function PrdRankingPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <div className="mb-6 flex items-center justify-between gap-4">
          <Link href="/v1.9.0" className="inline-flex items-center gap-1.5 text-base font-bold text-slate-500 hover:text-slate-900">
            ← 返回 PRD 目录
          </Link>
          <div className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-3 py-1 text-sm font-semibold text-slate-50">
            <span className="h-1.5 w-1.5 rounded-full bg-purple-400" />
            AI 互动成长平台 · PRD
          </div>
        </div>

        <header className="mb-8 space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full bg-purple-100 px-2.5 py-1 text-sm font-bold text-purple-700 ring-1 ring-purple-200">
            <span>🌟</span><span>后台配置 · 学习之星</span>
          </div>
          <h1 className="text-3xl font-black tracking-tight">学习之星配置后台 PRD</h1>
          <p className="max-w-3xl text-base leading-relaxed text-slate-600">
            本文档定义学习之星配置后台（v1.9.0）。每条配置对应一个互动游戏的排行规则，按单次游戏历史最高分展示，不绑定学校，开启并推送终端后即生效。
          </p>
          <div className="flex flex-wrap gap-2 text-sm text-slate-500">
            <span className="rounded-full bg-white px-2 py-0.5 ring-1 ring-slate-200">版本：v1.9.0</span>
            <span className="rounded-full bg-white px-2 py-0.5 ring-1 ring-slate-200">角色：运营 / 教研</span>
            <span className="rounded-full bg-white px-2 py-0.5 ring-1 ring-slate-200">路由：/admin/ranking</span>
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
                <div className="mb-1 text-sm font-bold text-purple-800">学习之星 = 单个游戏 × 历史最高分 × 按校展示</div>
                <p className="text-sm leading-relaxed text-purple-900">每条配置对应一个互动游戏，展示该游戏本校学生的历史最高分排行。不跨游戏合并，不跨学校合并。配置不绑定学校，推送时选择目标终端。</p>
              </div>
              <div className="grid gap-3 sm:grid-cols-3">
                {[
                  { label: '不绑定学校', desc: '创建后可推送给任意学校的终端，推送时选择范围。' },
                  { label: '单游戏独立', desc: '每条配置对应一个游戏，不同游戏分数独立计算，不合并。' },
                  { label: '开启即生效', desc: '无需设置时间，开启后推送终端即在对应终端展示。' },
                ].map((c) => (
                  <div key={c.label} className="rounded-xl bg-slate-50 p-3 ring-1 ring-slate-100">
                    <div className="mb-1 font-bold text-slate-800">{c.label}</div>
                    <p className="text-sm text-slate-600">{c.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 二、配置列表页 */}
          <section className="rounded-2xl bg-white p-5 ring-1 ring-slate-200">
            <div className="mb-3 flex items-center justify-between gap-2">
              <h2 className="text-xl font-black">二、配置列表页</h2>
              <span className="rounded-full bg-slate-900 px-2 py-0.5 text-sm font-semibold text-slate-50">/admin/ranking</span>
            </div>
            <div className="space-y-4 text-sm">
              <div>
                <div className="mb-2 font-bold text-slate-800">筛选条件</div>
                <div className="overflow-hidden rounded-xl border border-slate-100">
                  <table className="min-w-full border-collapse text-left">
                    <thead className="bg-slate-100 text-xs uppercase text-slate-500">
                      <tr><th className="px-3 py-2">字段</th><th className="px-3 py-2">类型</th><th className="px-3 py-2">选项</th></tr>
                    </thead>
                    <tbody>
                      {[
                        ['配置状态','下拉','全部 / 草稿 / 已发布 / 已停用'],
                        ['开启状态','下拉','全部 / 已开启 / 已关闭'],
                      ].map(([f,t,o],i) => (
                        <tr key={f} className={`border-t border-slate-100 ${i%2===1?'bg-slate-50':''}`}>
                          <td className="px-3 py-2 font-medium">{f}</td><td className="px-3 py-2">{t}</td><td className="px-3 py-2 text-slate-500">{o}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div>
                <div className="mb-2 font-bold text-slate-800">列表字段</div>
                <div className="overflow-hidden rounded-xl border border-slate-100">
                  <table className="min-w-full border-collapse text-left">
                    <thead className="bg-slate-100 text-xs uppercase text-slate-500">
                      <tr><th className="px-3 py-2">字段</th><th className="px-3 py-2">说明</th></tr>
                    </thead>
                    <tbody>
                      {[
                        ['配置名称','配置标识名称 + 下方 ID（小字）'],
                        ['展示依据','固定为「单次游戏最高分」'],
                        ['展示人数','前 10 位（固定）'],
                        ['开启状态','Toggle 开关，可直接点击切换；绿色=已开启，灰色=已关闭'],
                        ['当前使用终端数','已推送并生效的终端数量'],
                        ['配置状态','草稿（黄）/ 已发布（绿）/ 已停用（灰）'],
                        ['更新时间','最近修改时间'],
                        ['操作','编辑 / 推送终端 / 预览'],
                      ].map(([f,d],i) => (
                        <tr key={f} className={`border-t border-slate-100 ${i%2===1?'bg-slate-50':''}`}>
                          <td className="px-3 py-2 font-medium whitespace-nowrap">{f}</td><td className="px-3 py-2 text-slate-600">{d}</td>
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
                    ['编辑','进入编辑页，修改规则与文案'],
                    ['推送终端','仅开启状态可点击，跳转推送终端页'],
                    ['预览','预览前台展示效果，不影响实际配置'],
                    ['开关 Toggle','直接在列表切换开启/关闭，关闭后终端立即停止展示'],
                  ].map(([op,desc]) => (
                    <div key={op} className="flex gap-2 rounded-lg bg-slate-50 px-3 py-2 ring-1 ring-slate-100">
                      <span className="font-bold text-slate-800 whitespace-nowrap">{op}</span>
                      <span className="text-slate-600">{desc}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* 三、新建/编辑配置页 */}
          <section className="rounded-2xl bg-white p-5 ring-1 ring-slate-200">
            <div className="mb-3 flex items-center justify-between gap-2">
              <h2 className="text-xl font-black">三、新建 / 编辑配置页</h2>
              <span className="rounded-full bg-indigo-50 px-2 py-0.5 text-sm font-semibold text-indigo-700">左表单 + 右实时预览</span>
            </div>
            <div className="mb-3 rounded-xl bg-slate-50 px-4 py-3 text-sm text-slate-600 ring-1 ring-slate-100">
              新建（/admin/ranking/create）与编辑（/admin/ranking/[id]/edit）结构一致。左侧三个配置区块，右侧固定显示实时预览卡片与配置摘要。
            </div>
            <div className="space-y-3">
              {[
                {
                  num: '① 基础信息',
                  fields: [
                    { name: '配置名称', required: true, desc: '必填，配置标识名称，如「学习之星规则A」' },
                    { name: '展示类型', required: false, desc: '固定为「本校学习之星」，不可修改' },
                  ],
                },
                {
                  num: '② 展示规则',
                  fields: [
                    { name: '展示人数', required: false, desc: '固定展示前 10 位，不可修改' },
                    { name: '分数计算规则', required: false, desc: '固定为「历史最高分」，取学生该游戏历史最高得分展示' },
                    { name: '展示内容', required: false, desc: '固定展示：学生头像、学生编号、互动分数、我的学习表现、本次得分' },
                  ],
                },
                {
                  num: '③ 前台展示文案',
                  fields: [
                    { name: '展示页标题', required: false, desc: '默认「本校学习之星」，可自定义' },
                    { name: '副标题', required: false, desc: '默认「展示本校优秀学习表现」，可自定义' },
                    { name: '我的学习表现文案', required: false, desc: '默认「我的学习表现」，可自定义' },
                    { name: '鼓励文案', required: false, desc: '默认「再接再厉，挑战更高分数！」，可自定义' },
                    { name: '未进入展示提示文案', required: false, desc: '默认「继续努力，争取成为学习之星」，可自定义' },
                  ],
                },
              ].map((block) => (
                <div key={block.num} className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                  <div className="mb-2 font-bold text-slate-800">{block.num}</div>
                  <div className="space-y-1">
                    {block.fields.map((f) => (
                      <div key={f.name} className="flex items-start gap-2 text-sm">
                        <span className="mt-0.5 font-medium text-slate-800 whitespace-nowrap">{f.name}{f.required ? ' *' : ''}</span>
                        <span className="text-slate-500">— {f.desc}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-3 rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-800 ring-1 ring-amber-100">
              <span className="font-bold">校验规则：</span>配置名称为空时提示「请填写配置名称」。新建保存为草稿后跳转列表页；编辑保存后需重新推送终端才能生效。
            </div>
          </section>

          {/* 四、右侧实时预览 */}
          <section className="rounded-2xl bg-white p-5 ring-1 ring-slate-200">
            <div className="mb-3 flex items-center justify-between gap-2">
              <h2 className="text-xl font-black">四、右侧实时预览</h2>
              <span className="rounded-full bg-slate-100 px-2 py-0.5 text-sm font-semibold text-slate-600">Live Preview</span>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 text-sm">
              <div className="rounded-xl bg-slate-50 p-4 ring-1 ring-slate-100">
                <div className="mb-2 font-bold text-slate-800">配置预览卡片</div>
                <ul className="space-y-1 text-slate-600">
                  <li>• 渐变紫色背景，模拟终端前台展示效果</li>
                  <li>• 实时反映标题、副标题、文案的修改</li>
                  <li>• 展示前 3 名示例数据（🥇🥈🥉）</li>
                  <li>• 底部展示「我的学习表现」区块</li>
                  <li>• 未上榜提示文案与鼓励文案</li>
                </ul>
              </div>
              <div className="rounded-xl bg-slate-50 p-4 ring-1 ring-slate-100">
                <div className="mb-2 font-bold text-slate-800">配置摘要卡片</div>
                <ul className="space-y-1 text-slate-600">
                  <li>• 展示人数：前 10 位</li>
                  <li>• 计分方式：历史最高分</li>
                  <li>• 最低人数阈值：3 人</li>
                  <li>• 适用学校：推送时选择</li>
                  <li>• 生效时间：开启后推送即生效</li>
                </ul>
              </div>
            </div>
          </section>

          {/* 五、字段默认值 */}
          <section className="rounded-2xl bg-white p-5 ring-1 ring-slate-200">
            <div className="mb-3 flex items-center justify-between gap-2">
              <h2 className="text-xl font-black">五、字段默认值（新建时）</h2>
              <span className="rounded-full bg-slate-100 px-2 py-0.5 text-sm font-semibold text-slate-600">Defaults</span>
            </div>
            <div className="overflow-hidden rounded-xl border border-slate-100">
              <table className="min-w-full border-collapse text-left text-sm">
                <thead className="bg-slate-100 text-xs uppercase text-slate-500">
                  <tr><th className="px-3 py-2">字段</th><th className="px-3 py-2">默认值</th></tr>
                </thead>
                <tbody>
                  {[
                    ['配置名称','空（必填）'],
                    ['展示类型','本校学习之星（固定）'],
                    ['展示人数','10 位（固定）'],
                    ['分数计算规则','历史最高分（固定）'],
                    ['展示页标题','本校学习之星'],
                    ['副标题','展示本校优秀学习表现'],
                    ['我的学习表现文案','我的学习表现'],
                    ['鼓励文案','再接再厉，挑战更高分数！'],
                    ['未进入展示提示','继续努力，争取成为学习之星'],
                    ['最低人数阈值','3 人'],
                    ['开启状态','关闭'],
                  ].map(([f,d],i) => (
                    <tr key={f} className={`border-t border-slate-100 ${i%2===1?'bg-slate-50':''}`}>
                      <td className="px-3 py-2 font-medium">{f}</td><td className="px-3 py-2 text-slate-600">{d}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* 六、配置生效流程 */}
          <section className="rounded-2xl bg-white p-5 ring-1 ring-slate-200">
            <div className="mb-3 flex items-center justify-between gap-2">
              <h2 className="text-xl font-black">六、配置生效流程</h2>
              <span className="rounded-full bg-slate-100 px-2 py-0.5 text-sm font-semibold text-slate-600">Flow</span>
            </div>
            <div className="flex flex-wrap items-center gap-2 text-sm">
              {[
                {label:'新建配置',color:'bg-slate-200 text-slate-700'},
                {label:'→'},
                {label:'保存草稿',color:'bg-yellow-100 text-yellow-800'},
                {label:'→ 开启开关 →'},
                {label:'已开启',color:'bg-green-100 text-green-800'},
                {label:'→ 推送终端 →'},
                {label:'终端生效',color:'bg-purple-100 text-purple-800'},
              ].map((s,i) => s.color
                ? <span key={i} className={`rounded-full px-2.5 py-1 font-semibold ${s.color}`}>{s.label}</span>
                : <span key={i} className="text-slate-400">{s.label}</span>
              )}
            </div>
            <div className="mt-3 space-y-2 text-sm text-slate-600">
              <div className="rounded-xl bg-slate-50 px-4 py-3 ring-1 ring-slate-100">
                <span className="font-bold text-slate-800">关闭开关：</span>关闭后终端立即停止展示该游戏的学习之星内容，无需重新推送。
              </div>
              <div className="rounded-xl bg-slate-50 px-4 py-3 ring-1 ring-slate-100">
                <span className="font-bold text-slate-800">修改配置后：</span>需重新推送终端才能让修改内容在终端生效。
              </div>
            </div>
          </section>

          {/* 七、页面路由汇总 */}
          <section className="rounded-2xl bg-white p-5 ring-1 ring-slate-200">
            <div className="mb-3 flex items-center justify-between gap-2">
              <h2 className="text-xl font-black">七、页面路由汇总</h2>
              <span className="rounded-full bg-slate-100 px-2 py-0.5 text-sm font-semibold text-slate-600">Routes</span>
            </div>
            <div className="overflow-hidden rounded-xl border border-slate-100">
              <table className="min-w-full border-collapse text-left text-sm">
                <thead className="bg-slate-100 text-xs uppercase text-slate-500">
                  <tr><th className="px-3 py-2">页面</th><th className="px-3 py-2">路由</th></tr>
                </thead>
                <tbody>
                  {[
                    ['配置列表','/admin/ranking'],
                    ['新建配置','/admin/ranking/create'],
                    ['编辑配置','/admin/ranking/[id]/edit'],
                    ['推送终端','/admin/ranking/[id]/devices'],
                    ['预览效果','/admin/ranking/[id]/preview'],
                    ['学校排行榜','/admin/ranking/school-board'],
                  ].map(([p,r],i) => (
                    <tr key={p} className={`border-t border-slate-100 ${i%2===1?'bg-slate-50':''}`}>
                      <td className="px-3 py-2 font-medium">{p}</td>
                      <td className="px-3 py-2 font-mono text-slate-600">{r}</td>
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
