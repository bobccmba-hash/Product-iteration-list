import Link from 'next/link'

export default function PrdGrowthDataPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <div className="mb-6 flex items-center justify-between gap-4">
          <Link href="/v1.9.0" className="inline-flex items-center gap-1.5 text-base font-bold text-slate-500 hover:text-slate-900">
            ← 返回 PRD 目录
          </Link>
          <div className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-3 py-1 text-sm font-semibold text-slate-50">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
            AI 互动成长平台 · PRD
          </div>
        </div>

        <header className="mb-8 space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-2.5 py-1 text-sm font-bold text-blue-700 ring-1 ring-blue-200">
            <span>📊</span><span>数据中心 · 成长记录</span>
          </div>
          <h1 className="text-3xl font-black tracking-tight">成长记录 · 数据视图 PRD</h1>
          <p className="max-w-3xl text-base leading-relaxed text-slate-600">
            本文档定义成长记录数据视图（v1.9.0）。成长记录是系统唯一「事实来源」，任务/目标/勋章的进度均由成长事件派生计算。后台提供三个视图：学生档案列表、成长事件流水、统计分析。
          </p>
          <div className="flex flex-wrap gap-2 text-sm text-slate-500">
            <span className="rounded-full bg-white px-2 py-0.5 ring-1 ring-slate-200">版本：v1.9.0</span>
            <span className="rounded-full bg-white px-2 py-0.5 ring-1 ring-slate-200">角色：运营 / 数据</span>
            <span className="rounded-full bg-white px-2 py-0.5 ring-1 ring-slate-200">路由：/admin/data/growth</span>
          </div>
        </header>

        <div className="space-y-6">

          {/* 一、核心概念 */}
          <section className="rounded-2xl bg-white p-5 ring-1 ring-slate-200">
            <div className="mb-3 flex items-center justify-between gap-2">
              <h2 className="text-xl font-black">一、核心概念</h2>
              <span className="rounded-full bg-blue-50 px-2 py-0.5 text-sm font-semibold text-blue-700">Concepts</span>
            </div>
            <div className="space-y-3">
              <div className="rounded-xl bg-blue-50 p-4 ring-1 ring-blue-100">
                <div className="mb-1 text-sm font-bold text-blue-800">成长记录是系统唯一「事实来源」</div>
                <p className="text-sm leading-relaxed text-blue-900">终端每次互动结束产生成长事件（GrowthEvent），任务/目标/勋章的进度都由事件流水聚合计算派生，不单独存储「进度值」。后台数据视图只做查询展示，不修改事件数据。</p>
              </div>
              <div className="grid gap-3 sm:grid-cols-3">
                {[
                  { label: '学生档案列表', desc: '以学生为中心，查看每个学生的互动、卡牌、任务汇总与同步状态。' },
                  { label: '成长事件流水', desc: '以事件为中心，查看原始事件口径、关联关系与同步状态，用于排查问题。' },
                  { label: '统计分析', desc: '以运营为视角，按学校/年级/时间范围汇总互动、任务、勋章趋势数据。' },
                ].map((c) => (
                  <div key={c.label} className="rounded-xl bg-slate-50 p-3 ring-1 ring-slate-100">
                    <div className="mb-1 font-bold text-slate-800">{c.label}</div>
                    <p className="text-sm text-slate-600">{c.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 二、学生档案列表页 */}
          <section className="rounded-2xl bg-white p-5 ring-1 ring-slate-200">
            <div className="mb-3 flex items-center justify-between gap-2">
              <h2 className="text-xl font-black">二、学生档案列表页</h2>
              <span className="rounded-full bg-slate-900 px-2 py-0.5 text-sm font-semibold text-slate-50">/admin/data/growth</span>
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
                        ['学生ID/昵称','文字搜索','模糊匹配学生ID或昵称'],
                        ['学校','下拉','全部 / 各学校'],
                        ['是否有未同步数据','下拉','全部 / 是 / 否'],
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
                        ['学生编号','学生唯一ID，mono 小字'],
                        ['面板照片','学生头像（圆形，原型占位）'],
                        ['年龄','学生年龄，无则显示「—」'],
                        ['性别','男 / 女 / 其他，无则显示「—」'],
                        ['学校','所属学校名称'],
                        ['设备编号','绑定终端设备ID，含命名规则说明按钮（?）'],
                        ['创建时间','档案创建时间'],
                        ['首次互动时间','首次成长事件时间'],
                        ['最近互动时间','最近一次成长事件时间'],
                        ['累计互动次数','历史互动结束事件总数'],
                        ['累计卡牌数','历史获得卡牌总数'],
                        ['当前任务','当前正在进行的任务名称'],
                        ['状态','档案状态标签'],
                        ['绑定微信','已绑定（绿）/ 未绑定（灰）Tag'],
                        ['操作','查看详情'],
                      ].map(([f,d],i) => (
                        <tr key={f} className={`border-t border-slate-100 ${i%2===1?'bg-slate-50':''}`}>
                          <td className="px-3 py-2 font-medium whitespace-nowrap">{f}</td><td className="px-3 py-2 text-slate-600">{d}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </section>

          {/* 三、学生档案详情页 */}
          <section className="rounded-2xl bg-white p-5 ring-1 ring-slate-200">
            <div className="mb-3 flex items-center justify-between gap-2">
              <h2 className="text-xl font-black">三、学生档案详情页</h2>
              <span className="rounded-full bg-slate-900 px-2 py-0.5 text-sm font-semibold text-slate-50">/admin/data/growth/[studentId]</span>
            </div>
            <div className="space-y-3 text-sm">
              <div className="rounded-xl bg-slate-50 p-4 ring-1 ring-slate-100">
                <div className="mb-2 font-bold text-slate-800">顶部学生信息区</div>
                <ul className="space-y-1 text-slate-600">
                  <li>• 头像 + 昵称 + 学生ID（mono）+ 同步状态 Tag</li>
                  <li>• 年龄 / 性别 / 微信绑定 / 未同步数据 Tag</li>
                  <li>• 所属学校 / 学校账户编号 / 设备编号</li>
                  <li>• 创建时间 / 首次互动时间 / 最近互动时间</li>
                </ul>
              </div>
              <div className="rounded-xl bg-slate-50 p-4 ring-1 ring-slate-100">
                <div className="mb-2 font-bold text-slate-800">统计卡片（3列）</div>
                <div className="grid gap-2 sm:grid-cols-3">
                  {['累计互动次数','累计卡牌数','已完成任务数'].map((s) => (
                    <div key={s} className="rounded-lg bg-white px-3 py-2 text-xs text-slate-600 ring-1 ring-slate-200">{s}</div>
                  ))}
                </div>
              </div>
              <div className="rounded-xl bg-slate-50 p-4 ring-1 ring-slate-100">
                <div className="mb-2 font-bold text-slate-800">Tab 区块</div>
                <div className="space-y-1 text-slate-600">
                  <div><span className="font-semibold text-slate-800">成长事件 Tab：</span>事件时间、事件类型、互动ID、卡牌ID、查看互动详情</div>
                  <div><span className="font-semibold text-slate-800">任务记录 Tab：</span>任务名称、当前进度、状态、完成时间</div>
                </div>
              </div>
              <div className="rounded-xl bg-slate-50 p-4 ring-1 ring-slate-100">
                <div className="mb-2 font-bold text-slate-800">互动详情弹窗</div>
                <ul className="space-y-1 text-slate-600">
                  <li>• 点击「查看互动详情」弹出，显示互动ID</li>
                  <li>• 16:9 视频占位区域（后续接入终端录像）</li>
                  <li>• 基本信息：互动时长 / 互动得分 / 获得卡牌数</li>
                </ul>
              </div>
              <div className="rounded-xl bg-amber-50 px-4 py-3 text-sm text-slate-700 ring-1 ring-amber-100">
                <span className="font-bold">顶部操作：</span>返回列表 / 重新同步 / 导出记录 / 查看原始流水
              </div>
            </div>
          </section>

          {/* 四、成长事件流水页 */}
          <section className="rounded-2xl bg-white p-5 ring-1 ring-slate-200">
            <div className="mb-3 flex items-center justify-between gap-2">
              <h2 className="text-xl font-black">四、成长事件流水页</h2>
              <span className="rounded-full bg-slate-900 px-2 py-0.5 text-sm font-semibold text-slate-50">/admin/data/growth/events</span>
            </div>
            <div className="space-y-3 text-sm">
              <div className="rounded-xl bg-slate-50 px-4 py-3 text-slate-600 ring-1 ring-slate-100">左侧事件表 + 右侧原始 JSON 面板双栏布局，用于排查事件口径、关联关系与同步状态。</div>
              <div>
                <div className="mb-2 font-bold text-slate-800">筛选条件</div>
                <div className="overflow-hidden rounded-xl border border-slate-100">
                  <table className="min-w-full border-collapse text-left">
                    <thead className="bg-slate-100 text-xs uppercase text-slate-500"><tr><th className="px-3 py-2">字段</th><th className="px-3 py-2">类型</th><th className="px-3 py-2">选项</th></tr></thead>
                    <tbody>
                      {[
                        ['学生ID','文字搜索','模糊匹配'],
                        ['学校','下拉','全部 / 各学校'],
                        ['设备ID','文字搜索','模糊匹配'],
                        ['事件类型','下拉','全部 / interaction_end / card_gain / sync_error'],
                        ['同步状态','下拉','全部 / ok / pending / failed'],
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
                <div className="mb-2 font-bold text-slate-800">事件表字段</div>
                <div className="overflow-hidden rounded-xl border border-slate-100">
                  <table className="min-w-full border-collapse text-left">
                    <thead className="bg-slate-100 text-xs uppercase text-slate-500"><tr><th className="px-3 py-2">字段</th><th className="px-3 py-2">说明</th></tr></thead>
                    <tbody>
                      {[
                        ['event_id','幂等键，mono 字体'],
                        ['学生ID','归属学生，mono 字体'],
                        ['设备ID','产生事件的终端，mono 字体'],
                        ['事件类型','interaction_end / card_gain / sync_error 等'],
                        ['事件时间','事件发生时间'],
                        ['关联任务ID','task_id，无则「—」'],
                        ['关联目标ID','goal_id，无则「—」'],
                        ['关联勋章ID','badge_id，无则「—」'],
                        ['delta_value','本次数值变化，如 +1'],
                        ['sync_status','ok（绿）/ pending（黄）/ failed（红）'],
                        ['操作','查看JSON，点击在右侧面板展开 raw_payload'],
                      ].map(([f,d],i) => (
                        <tr key={f} className={`border-t border-slate-100 ${i%2===1?'bg-slate-50':''}`}>
                          <td className="px-3 py-2 font-medium whitespace-nowrap">{f}</td><td className="px-3 py-2 text-slate-600">{d}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </section>

          {/* 五、统计分析页 */}
          <section className="rounded-2xl bg-white p-5 ring-1 ring-slate-200">
            <div className="mb-3 flex items-center justify-between gap-2">
              <h2 className="text-xl font-black">五、统计分析页</h2>
              <span className="rounded-full bg-slate-900 px-2 py-0.5 text-sm font-semibold text-slate-50">/admin/data/growth/analytics</span>
            </div>
            <div className="space-y-3 text-sm">
              <div className="rounded-xl bg-slate-50 px-4 py-3 text-slate-600 ring-1 ring-slate-100">以运营视角汇总数据，支持按学校/年级/时间范围/维度筛选，展示趋势图表与明细表。</div>
              <div>
                <div className="mb-2 font-bold text-slate-800">筛选条件</div>
                <div className="overflow-hidden rounded-xl border border-slate-100">
                  <table className="min-w-full border-collapse text-left">
                    <thead className="bg-slate-100 text-xs uppercase text-slate-500"><tr><th className="px-3 py-2">字段</th><th className="px-3 py-2">类型</th><th className="px-3 py-2">选项</th></tr></thead>
                    <tbody>
                      {[
                        ['学校','下拉','全部 / 各学校'],
                        ['年级','下拉','全部 / 各年级'],
                        ['时间范围','下拉','最近 7 天 / 最近 30 天 / 最近 90 天'],
                        ['指标维度','下拉','按学校 / 按年级'],
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
                <div className="mb-2 font-bold text-slate-800">图表区（2×2 网格）</div>
                <div className="grid gap-2 sm:grid-cols-2">
                  {['互动次数趋势','卡牌获得趋势','任务完成趋势','勋章解锁趋势'].map((t) => (
                    <div key={t} className="rounded-lg bg-slate-50 px-3 py-2 text-xs text-slate-600 ring-1 ring-slate-200">{t}</div>
                  ))}
                </div>
              </div>
              <div>
                <div className="mb-2 font-bold text-slate-800">明细表字段</div>
                <div className="overflow-hidden rounded-xl border border-slate-100">
                  <table className="min-w-full border-collapse text-left">
                    <thead className="bg-slate-100 text-xs uppercase text-slate-500"><tr><th className="px-3 py-2">字段</th><th className="px-3 py-2">说明</th></tr></thead>
                    <tbody>
                      {[
                        ['学校/年级','按选定维度显示'],
                        ['互动人数','选定时间范围内有互动记录的学生数'],
                        ['平均互动次数','互动事件总数 / 互动人数'],
                        ['平均任务完成数','任务完成事件总数 / 互动人数'],
                        ['勋章获得人数','选定时间范围内获得勋章的学生数'],
                      ].map(([f,d],i) => (
                        <tr key={f} className={`border-t border-slate-100 ${i%2===1?'bg-slate-50':''}`}>
                          <td className="px-3 py-2 font-medium whitespace-nowrap">{f}</td><td className="px-3 py-2 text-slate-600">{d}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="rounded-xl bg-amber-50 px-4 py-3 text-sm text-slate-700 ring-1 ring-amber-100">
                <span className="font-bold">顶部操作：</span>返回列表 / 导出报表 / 刷新数据
              </div>
            </div>
          </section>

          {/* 六、页面路由汇总 */}
          <section className="rounded-2xl bg-white p-5 ring-1 ring-slate-200">
            <div className="mb-3 flex items-center justify-between gap-2">
              <h2 className="text-xl font-black">六、页面路由汇总</h2>
              <span className="rounded-full bg-slate-100 px-2 py-0.5 text-sm font-semibold text-slate-600">Routes</span>
            </div>
            <div className="overflow-hidden rounded-xl border border-slate-100">
              <table className="min-w-full border-collapse text-left text-sm">
                <thead className="bg-slate-100 text-xs uppercase text-slate-500"><tr><th className="px-3 py-2">页面</th><th className="px-3 py-2">路由</th></tr></thead>
                <tbody>
                  {[
                    ['学生档案列表','/admin/data/growth'],
                    ['学生档案详情','/admin/data/growth/[studentId]'],
                    ['成长事件流水','/admin/data/growth/events'],
                    ['统计分析','/admin/data/growth/analytics'],
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
