import Link from 'next/link'

export default function PrdAdminConfigPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <div className="mb-6 flex items-center justify-between gap-4">
          <Link href="/v1.9.0" className="inline-flex items-center gap-1.5 text-base font-bold text-slate-500 hover:text-slate-900">
            ← 返回 PRD 目录
          </Link>
          <div className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-3 py-1 text-sm font-semibold text-slate-50">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            AI 互动成长平台 · PRD
          </div>
        </div>

        <header className="mb-8 space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-2.5 py-1 text-sm font-bold text-emerald-700 ring-1 ring-emerald-200">
            <span>⚙️</span>
            <span>后台配置 · 任务设定</span>
          </div>
          <h1 className="text-3xl font-black tracking-tight">任务配置后台 PRD</h1>
          <p className="max-w-3xl text-base leading-relaxed text-slate-600">
            本文档定义运营 / 教研人员使用的任务配置后台（v1.9.0）。任务规则由「周期 × 统计指标 × 目标数值」三要素组成，配置完成后通过分发策略自动推送至学生终端，终端本地计算进度，达成后发放奖励。
          </p>
          <div className="flex flex-wrap gap-2 text-sm text-slate-500">
            <span className="rounded-full bg-white px-2 py-0.5 ring-1 ring-slate-200">版本：v1.9.0</span>
            <span className="rounded-full bg-white px-2 py-0.5 ring-1 ring-slate-200">角色：运营 / 教研</span>
            <span className="rounded-full bg-white px-2 py-0.5 ring-1 ring-slate-200">路由：/admin/config/tasks</span>
          </div>
        </header>

        <div className="space-y-6">

          {/* 一、核心概念 */}
          <section className="rounded-2xl bg-white p-5 ring-1 ring-slate-200">
            <div className="mb-3 flex items-center justify-between gap-2">
              <h2 className="text-xl font-black">一、核心概念</h2>
              <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-sm font-semibold text-emerald-700">Concepts</span>
            </div>
            <div className="space-y-3">
              <div className="rounded-xl bg-emerald-50 p-4 ring-1 ring-emerald-100">
                <div className="mb-1 text-sm font-bold text-emerald-800">任务 = 周期 × 统计指标 × 目标数值</div>
                <p className="text-sm leading-relaxed text-emerald-900">管理员选择「在什么周期内」统计「哪个指标」达到「多少数值」，即构成一条完整任务规则。终端本地实时计算进度，达成后自动发放奖励。</p>
              </div>
              <div className="grid gap-3 sm:grid-cols-3">
                {[
                  { label: '日任务', val: 'daily', desc: '统计窗口为自然日，每天重置，可反复完成。适合每日打卡类。' },
                  { label: '周任务', val: 'weekly', desc: '统计窗口为自然周，每周重置，可反复完成。适合中等积累类。' },
                  { label: '一次性任务', val: 'one_time', desc: '统计窗口不重置，累计达标后终身完成。适合里程碑成就类。' },
                ].map((c) => (
                  <div key={c.val} className="rounded-xl bg-slate-50 p-3 ring-1 ring-slate-100">
                    <div className="mb-1 font-bold text-slate-800">{c.label}</div>
                    <p className="text-sm text-slate-600">{c.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 二、任务列表页 */}
          <section className="rounded-2xl bg-white p-5 ring-1 ring-slate-200">
            <div className="mb-3 flex items-center justify-between gap-2">
              <h2 className="text-xl font-black">二、任务列表页</h2>
              <span className="rounded-full bg-slate-900 px-2 py-0.5 text-sm font-semibold text-slate-50">/admin/config/tasks</span>
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
                        ['任务名称/编码', '文字搜索', '模糊匹配任务名称或编码'],
                        ['状态', '下拉', '全部 / 草稿 / 已发布 / 已停用'],
                        ['周期', '下拉', '全部 / 日 / 周 / 一次性'],
                      ].map(([f, t, o], i) => (
                        <tr key={f} className={`border-t border-slate-100 ${i % 2 === 1 ? 'bg-slate-50' : ''}`}>
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
                        ['任务名称', '任务名称（粗体）+ 下方编码（mono 小字）'],
                        ['周期', '日 / 周 / 一次性，Tag 样式'],
                        ['完成条件', '统计指标 + 目标数值摘要'],
                        ['奖励', '奖励类型 + 数量摘要'],
                        ['分发策略', '所有学生 / 新学生默认 / 老学生默认'],
                        ['状态', '草稿（黄）/ 已发布（绿）/ 已停用（红）'],
                        ['更新时间', '最近修改时间'],
                        ['操作', '编辑 / 复制 / 推送终端 / 停用·启用 / 删除'],
                      ].map(([f, d], i) => (
                        <tr key={f} className={`border-t border-slate-100 ${i % 2 === 1 ? 'bg-slate-50' : ''}`}>
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
                    ['编辑', '进入任务编辑页'],
                    ['复制', '复制为新草稿，名称自动加「_副本」'],
                    ['推送终端', '跳转推送终端页，配置下发范围'],
                    ['停用', '停用后不再参与新终端分发，需确认弹窗'],
                    ['启用', '将已停用任务重新设为已发布'],
                    ['删除', '仅草稿可删，已发布/停用提示错误'],
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

          {/* 三、新建/编辑任务页 */}
          <section className="rounded-2xl bg-white p-5 ring-1 ring-slate-200">
            <div className="mb-3 flex items-center justify-between gap-2">
              <h2 className="text-xl font-black">三、新建 / 编辑任务页</h2>
              <span className="rounded-full bg-indigo-50 px-2 py-0.5 text-sm font-semibold text-indigo-700">单页完成，不分步骤</span>
            </div>
            <div className="mb-3 rounded-xl bg-slate-50 px-4 py-3 text-sm text-slate-600 ring-1 ring-slate-100">
              新建（/admin/config/tasks/new）与编辑（/admin/config/tasks/[taskId]/edit）结构完全一致，单页包含五个区块，底部「保存配置」后返回列表。
            </div>
            <div className="space-y-3">
              {[
                {
                  num: '① 基本信息',
                  fields: [
                    { name: '任务名称', required: true, desc: '必填。建议描述任务目标，如「今天完成 3 次互动」' },
                    { name: '任务说明', required: false, desc: '选填。补充说明任务背景或提示，多行文本' },
                  ],
                },
                {
                  num: '② 任务周期',
                  fields: [
                    { name: '日（daily）', required: true, desc: '每天重置，可反复完成' },
                    { name: '周（weekly）', required: true, desc: '每周重置，可反复完成' },
                    { name: '一次性（one_time）', required: true, desc: '累计达标后终身完成，不重置' },
                  ],
                },
                {
                  num: '③ 完成条件',
                  fields: [
                    { name: '互动次数', required: false, desc: '选定周期内的互动结束事件数量' },
                    { name: '卡牌总数', required: false, desc: '选定周期内获得的卡牌张数（含重复）' },
                    { name: '不同卡牌数', required: false, desc: '选定周期内去重后的卡牌种类数量' },
                    { name: '连续互动天数', required: false, desc: '连续有互动记录的自然日天数' },
                    { name: '连续得卡天数', required: false, desc: '连续有获得卡牌事件的自然日天数' },
                    { name: '任务完成数', required: false, desc: '成长记录中的任务完成事件次数' },
                  ],
                },
                {
                  num: '④ 奖励',
                  fields: [
                    { name: '奖励类型', required: true, desc: '卡牌 / 盲盒，单选' },
                    { name: '奖励数量', required: true, desc: '数字输入，最小值 1' },
                  ],
                },
                {
                  num: '⑤ 分发策略',
                  fields: [
                    { name: '所有学生', required: true, desc: '对所有学生默认分配，包括新学生和老学生' },
                    { name: '新学生默认分配', required: true, desc: '首次建立档案后默认拿到该任务' },
                    { name: '老学生默认分配', required: true, desc: '已有档案但无任务时默认分配' },
                  ],
                },
              ].map((block) => (
                <div key={block.num} className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                  <div className="mb-2 font-bold text-slate-800">{block.num}</div>
                  <div className="space-y-1">
                    {block.fields.map((f) => (
                      <div key={f.name} className="flex items-start gap-2 text-sm">
                        <span className="mt-0.5 font-medium text-slate-800 whitespace-nowrap">{f.name}{f.required && block.num === '① 基本信息' ? ' *' : ''}</span>
                        <span className="text-slate-500">— {f.desc}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-3 rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-800 ring-1 ring-amber-100">
              <span className="font-bold">校验规则：</span>任务名称为空 → 提示「请填写任务名称」；目标数值 {'<'} 1 → 提示「目标数值需大于 0」。校验通过后保存并返回列表。
            </div>
          </section>

          {/* 四、字段默认值 */}
          <section className="rounded-2xl bg-white p-5 ring-1 ring-slate-200">
            <div className="mb-3 flex items-center justify-between gap-2">
              <h2 className="text-xl font-black">四、字段默认值（新建时）</h2>
              <span className="rounded-full bg-slate-100 px-2 py-0.5 text-sm font-semibold text-slate-600">Defaults</span>
            </div>
            <div className="overflow-hidden rounded-xl border border-slate-100">
              <table className="min-w-full border-collapse text-left text-sm">
                <thead className="bg-slate-100 text-xs uppercase text-slate-500">
                  <tr><th className="px-3 py-2">字段</th><th className="px-3 py-2">默认值</th></tr>
                </thead>
                <tbody>
                  {[
                    ['任务名称', '空（必填）'],
                    ['任务说明', '空（选填）'],
                    ['任务周期', '日（daily）'],
                    ['统计指标', '互动次数'],
                    ['目标数值', '3'],
                    ['奖励类型', '卡牌'],
                    ['奖励数量', '1'],
                    ['分发策略', '所有学生'],
                  ].map(([f, d], i) => (
                    <tr key={f} className={`border-t border-slate-100 ${i % 2 === 1 ? 'bg-slate-50' : ''}`}>
                      <td className="px-3 py-2 font-medium">{f}</td><td className="px-3 py-2 text-slate-600">{d}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* 五、任务状态流转 */}
          <section className="rounded-2xl bg-white p-5 ring-1 ring-slate-200">
            <div className="mb-3 flex items-center justify-between gap-2">
              <h2 className="text-xl font-black">五、任务状态流转</h2>
              <span className="rounded-full bg-slate-100 px-2 py-0.5 text-sm font-semibold text-slate-600">Status Flow</span>
            </div>
            <div className="flex flex-wrap items-center gap-2 text-sm">
              {[
                { label: '新建', color: 'bg-slate-200 text-slate-700' },
                { label: '→' },
                { label: '草稿', color: 'bg-yellow-100 text-yellow-800' },
                { label: '→ 发布 →' },
                { label: '已发布', color: 'bg-green-100 text-green-800' },
                { label: '→ 停用 →' },
                { label: '已停用', color: 'bg-red-100 text-red-800' },
                { label: '→ 启用 →' },
                { label: '已发布', color: 'bg-green-100 text-green-800' },
              ].map((s, i) => s.color
                ? <span key={i} className={`rounded-full px-2.5 py-1 font-semibold ${s.color}`}>{s.label}</span>
                : <span key={i} className="text-slate-400">{s.label}</span>
              )}
            </div>
            <div className="mt-3 rounded-xl bg-slate-50 px-4 py-3 text-sm text-slate-600 ring-1 ring-slate-100">
              仅草稿状态的任务可被删除。已发布 / 已停用任务不可直接删除，需先停用再由系统管理员处理。
            </div>
          </section>

          {/* 六、典型配置示例 */}
          <section className="rounded-2xl bg-white p-5 ring-1 ring-slate-200">
            <div className="mb-3 flex items-center justify-between gap-2">
              <h2 className="text-xl font-black">六、典型配置示例</h2>
              <span className="rounded-full bg-slate-100 px-2 py-0.5 text-sm font-semibold text-slate-600">Examples</span>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                {
                  title: '每日打卡任务',
                  tag: '日',
                  tagColor: 'bg-blue-50 text-blue-700',
                  rows: [['周期','日'],['统计指标','互动次数'],['目标数值','3'],['奖励','卡牌 × 1'],['分发策略','所有学生']],
                  note: '当天互动次数 ≥ 3 完成，次日重置。',
                },
                {
                  title: '每周收集任务',
                  tag: '周',
                  tagColor: 'bg-purple-50 text-purple-700',
                  rows: [['周期','周'],['统计指标','不同卡牌数'],['目标数值','5'],['奖励','盲盒 × 1'],['分发策略','所有学生']],
                  note: '本周收集 5 种不同卡牌完成，下周重置。',
                },
                {
                  title: '里程碑任务（一次性）',
                  tag: '一次性',
                  tagColor: 'bg-amber-50 text-amber-700',
                  rows: [['周期','一次性'],['统计指标','连续互动天数'],['目标数值','7'],['奖励','卡牌 × 3'],['分发策略','所有学生']],
                  note: '连续互动 7 天达成，终身只完成一次。',
                },
                {
                  title: '新学生引导任务',
                  tag: '一次性',
                  tagColor: 'bg-amber-50 text-amber-700',
                  rows: [['周期','一次性'],['统计指标','互动次数'],['目标数值','1'],['奖励','卡牌 × 2'],['分发策略','新学生默认分配']],
                  note: '首次建档学生完成 1 次互动即达成。',
                },
              ].map((ex) => (
                <div key={ex.title} className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                  <div className="mb-2 flex items-center gap-2">
                    <span className="font-bold text-slate-900">{ex.title}</span>
                    <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${ex.tagColor}`}>{ex.tag}</span>
                  </div>
                  <div className="space-y-1">
                    {ex.rows.map(([k, v]) => (
                      <div key={k} className="flex gap-2 text-sm">
                        <span className="w-20 shrink-0 text-slate-500">{k}</span>
                        <span className="font-medium text-slate-800">{v}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-2 text-xs text-slate-500">{ex.note}</div>
                </div>
              ))}
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
                    ['任务列表', '/admin/config/tasks'],
                    ['新建任务', '/admin/config/tasks/new'],
                    ['编辑任务', '/admin/config/tasks/[taskId]/edit'],
                    ['推送终端', '/admin/config/tasks/[taskId]/devices'],
                  ].map(([p, r], i) => (
                    <tr key={p} className={`border-t border-slate-100 ${i % 2 === 1 ? 'bg-slate-50' : ''}`}>
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
