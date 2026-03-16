import Link from 'next/link'

export default function PrdRankingPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        {/* 顶部导航 */}
        <div className="mb-6 flex items-center justify-between gap-4">
          <Link
            href="/prd"
            className="inline-flex items-center gap-1.5 text-base font-bold text-slate-500 hover:text-slate-900"
          >
            ← 返回 PRD 目录
          </Link>
          <div className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-3 py-1 text-sm font-semibold text-slate-50">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            AI 互动成长平台 · PRD
          </div>
        </div>

        {/* 标题区 */}
        <header className="mb-8 space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full bg-purple-100 px-2.5 py-1 text-sm font-bold text-purple-700 ring-1 ring-purple-200">
            <span className="text-sm">🏆</span>
            <span>学习之星 · 配置后台</span>
          </div>
          <h1 className="text-3xl font-black tracking-tight sm:text-3xl">
            学习之星配置后台 PRD
          </h1>
          <p className="max-w-3xl text-lg leading-relaxed text-slate-600 sm:text-base">
            本文档定义“学习之星”榜单的规则配置、分数计算逻辑、前台文案自定义以及与终端排行榜展示的联动规范，
            用于支撑学校开展周期性的评优激励活动。
          </p>
          <div className="flex flex-wrap gap-2 text-sm text-slate-500">
            <span className="rounded-full bg-white px-2 py-0.5 ring-1 ring-slate-200">榜单类型：日 / 周 / 月</span>
            <span className="rounded-full bg-white px-2 py-0.5 ring-1 ring-slate-200">维度：个人 / 班级</span>
          </div>
        </header>

        <div className="space-y-6">
          {/* 一、业务目标 & 使用场景 */}
          <section className="rounded-2xl bg-white p-5 ring-1 ring-slate-200">
            <div className="mb-3 flex items-center justify-between gap-2">
              <h2 className="text-xl font-black text-slate-900">一、业务目标 &amp; 使用场景</h2>
              <span className="rounded-full bg-purple-50 px-2 py-0.5 text-sm font-semibold text-purple-700">
                Goals
              </span>
            </div>
            <div className="grid gap-4 text-base text-slate-700 sm:grid-cols-2">
              <div className="space-y-1.5">
                <h3 className="text-sm font-bold uppercase tracking-wide text-slate-500">
                  1.1 业务目标
                </h3>
                <ul className="space-y-2 leading-relaxed text-base">
                  <li>● 为学校提供透明、公平、可配置的“学习之星”评选工具。</li>
                  <li>● 支持不同学校按自身教育理念调整加分规则和展示文案。</li>
                  <li>● 与终端互动行为打通，将“参与 +努力”可视化成积分与榜单名次。</li>
                </ul>
              </div>
              <div className="space-y-1.5">
                <h3 className="text-sm font-bold uppercase tracking-wide text-slate-500">
                  1.2 使用场景
                </h3>
                <ul className="space-y-2 leading-relaxed text-base">
                  <li>● 每周班会课上老师通过终端查看本班同学的学习之星排名。</li>
                  <li>● 校级德育处根据月度榜单做学期评优和奖励发放。</li>
                  <li>● 学生在课间通过终端查看自己的当前积分和名次变化。</li>
                </ul>
              </div>
            </div>
          </section>

          {/* 二、榜单配置模型 */}
          <section className="rounded-2xl bg-white p-5 ring-1 ring-slate-200">
            <div className="mb-3 flex items-center justify-between gap-2">
              <h2 className="text-xl font-black text-slate-900">二、榜单配置模型</h2>
              <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-sm font-semibold text-emerald-700">
                Ranking Model
              </span>
            </div>

            <div className="space-y-4 text-base text-slate-700">
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="space-y-1.5 rounded-xl bg-slate-50 p-3 ring-1 ring-slate-100">
                  <div className="text-lg font-bold text-slate-700">2.1 榜单基本属性</div>
                  <ul className="space-y-2 leading-relaxed text-base">
                    <li>● name：榜单名称，如“本周学习之星”“本月体育之星”。</li>
                    <li>● scope：维度，personal / class 两种。</li>
                    <li>● cycle：统计周期，daily / weekly / monthly。</li>
                    <li>● visibleRange：可见范围（全校 / 年级 / 班级）。</li>
                  </ul>
                </div>
                <div className="space-y-1.5 rounded-xl bg-slate-50 p-3 ring-1 ring-slate-100">
                  <div className="text-lg font-bold text-slate-700">2.2 数据来源</div>
                  <ul className="space-y-2 leading-relaxed text-base">
                    <li>● 成长记录事件（如任务完成、勋章解锁）。</li>
                    <li>● 额外加分事件（如老师手动加分）。</li>
                    <li>● 配置后台中的“学习之星加分规则”。</li>
                  </ul>
                </div>
              </div>

              <div className="rounded-xl bg-slate-50 p-3 ring-1 ring-slate-100">
                <div className="mb-1 text-lg font-bold text-slate-700">2.3 加分规则示例</div>
                <ul className="space-y-2 leading-relaxed text-base">
                  <li>● 完成一次体育姿态任务 +10 分。</li>
                  <li>● 解锁 1 枚稀有勋章 +20 分，传说勋章 +50 分。</li>
                  <li>● 老师在后台记录一次“表扬事件” +5 分。</li>
                  <li>● 每日登录终端参与任意一次互动 +2 分（防止刷分，有每日上限）。</li>
                </ul>
              </div>
            </div>
          </section>

          {/* 三、分数计算逻辑 */}
          <section className="rounded-2xl bg-white p-5 ring-1 ring-slate-200">
            <div className="mb-3 flex items-center justify-between gap-2">
              <h2 className="text-xl font-black text-slate-900">三、分数计算逻辑</h2>
              <span className="rounded-full bg-amber-50 px-2 py-0.5 text-sm font-semibold text-amber-700">
                Scoring
              </span>
            </div>

            <div className="space-y-4 text-base text-slate-700">
              <div>
                <div className="mb-1 font-bold text-slate-700">3.1 基础公式（示意）</div>
                <p className="text-base leading-relaxed">
                  记分公式（文字表达）：总分 =「行为事件分数」之和 +「勋章稀有度加权分」之和 +「老师手动加/减分」之和。
                </p>
                <p className="mt-1 text-slate-600">
                  实际实现中由数据中心进行聚合计算，配置后台仅负责配置各类事件的权重与封顶规则。
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="space-y-1.5 rounded-xl bg-slate-50 p-3 ring-1 ring-slate-100">
                  <div className="text-lg font-bold text-slate-700">3.2 防刷分策略</div>
                  <ul className="space-y-2 leading-relaxed text-base">
                    <li>● 对同一任务设置“每日记分上限次数”（如最多 3 次）。</li>
                    <li>● 对“每日登录”类事件设置固定加分上限。</li>
                    <li>● 对极端行为（短时间大量完成任务）进行异常标记，后台可查。</li>
                  </ul>
                </div>
                <div className="space-y-1.5 rounded-xl bg-slate-50 p-3 ring-1 ring-slate-100">
                  <div className="text-lg font-bold text-slate-700">3.3 班级榜单计算</div>
                  <ul className="space-y-2 leading-relaxed text-base">
                    <li>● 支持“总分”和“人均分”两种策略，由学校选择。</li>
                    <li>● 班级分数 = 班级内所有学生在周期内得分聚合。</li>
                    <li>● 如有转班 / 休学情形，按数据中心的学生归属信息为准。</li>
                  </ul>
                </div>
              </div>

              <div>
                <div className="mb-1 font-bold text-slate-700">3.4 规则配置字段（后台表单）</div>
                <div className="overflow-hidden rounded-xl border border-slate-100 bg-slate-50">
                  <table className="min-w-full border-collapse text-left">
                    <thead className="bg-slate-100 text-base uppercase tracking-wide text-slate-500">
                      <tr>
                        <th className="px-3 py-2 font-semibold">字段</th>
                        <th className="px-3 py-2 font-semibold">类型</th>
                        <th className="px-3 py-2 font-semibold">必填</th>
                        <th className="px-3 py-2 font-semibold">约束 &amp; 说明</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-t border-slate-100">
                        <td className="px-3 py-2 font-mono text-base">ruleId</td>
                        <td className="px-3 py-2">string</td>
                        <td className="px-3 py-2">是（后端生成）</td>
                        <td className="px-3 py-2">规则主键，不超过 32 字符，只允许字母、数字、短横线。</td>
                      </tr>
                      <tr className="border-t border-slate-100 bg-white/60">
                        <td className="px-3 py-2 font-mono text-base">name</td>
                        <td className="px-3 py-2">string</td>
                        <td className="px-3 py-2">是</td>
                        <td className="px-3 py-2">
                          规则名称，小于等于 30 个汉字，例如“本周综合学习之星”；在后台列表中展示。
                        </td>
                      </tr>
                      <tr className="border-t border-slate-100">
                        <td className="px-3 py-2 font-mono text-base">cycle</td>
                        <td className="px-3 py-2">enum</td>
                        <td className="px-3 py-2">是</td>
                        <td className="px-3 py-2">
                          统计周期，取值：daily / weekly / monthly；同一学校+维度+周期允许存在多条规则，计算服务需按 ruleId 区分。
                        </td>
                      </tr>
                      <tr className="border-t border-slate-100 bg-white/60">
                        <td className="px-3 py-2 font-mono text-base">scope</td>
                        <td className="px-3 py-2">object</td>
                        <td className="px-3 py-2">是</td>
                        <td className="px-3 py-2">
                          可见范围，包含 schoolId（必填）、gradeIds（可选）、classIds（可选）；前端提供多选组件，最多选择 50 个班级。
                        </td>
                      </tr>
                      <tr className="border-t border-slate-100">
                        <td className="px-3 py-2 font-mono text-base">scoreWeights</td>
                        <td className="px-3 py-2">object</td>
                        <td className="px-3 py-2">是</td>
                        <td className="px-3 py-2">
                          行为加分权重配置，例如 completeTask、unlockBadge、teacherPraise 等键，对应值为整数 0–100。
                        </td>
                      </tr>
                      <tr className="border-t border-slate-100 bg-white/60">
                        <td className="px-3 py-2 font-mono text-base">maxDailyLoginBonus</td>
                        <td className="px-3 py-2">number</td>
                        <td className="px-3 py-2">否</td>
                        <td className="px-3 py-2">
                          每日登录类事件的总加分上限，区间 0–50；为空时默认 0，表示不单独为登录加分。
                        </td>
                      </tr>
                      <tr className="border-t border-slate-100">
                        <td className="px-3 py-2 font-mono text-base">maxScorePerPeriod</td>
                        <td className="px-3 py-2">number</td>
                        <td className="px-3 py-2">否</td>
                        <td className="px-3 py-2">
                          单个学生在一个周期内的积分封顶值，区间 0–9999；0 表示不封顶。
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </section>

          {/* 四、前台文案 & 展示配置 */}
          <section className="rounded-2xl bg-white p-5 ring-1 ring-slate-200">
            <div className="mb-3 flex items-center justify-between gap-2">
              <h2 className="text-xl font-black text-slate-900">四、前台文案 &amp; 展示配置</h2>
              <span className="rounded-full bg-indigo-50 px-2 py-0.5 text-sm font-semibold text-indigo-700">
                UI Config
              </span>
            </div>

            <div className="space-y-3 text-base text-slate-700">
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="space-y-1.5 rounded-xl bg-slate-50 p-3 ring-1 ring-slate-100">
                  <div className="text-lg font-bold text-slate-700">4.1 榜单名称 &amp; 说明文案</div>
                  <ul className="space-y-2 leading-relaxed text-base">
                    <li>● terminalTitle：终端展示名称（如“本周学习之星”）。</li>
                    <li>● subtitle：副标题，用 1 句话解释评选逻辑。</li>
                    <li>● emptyStateText：暂无数据时的文案。</li>
                  </ul>
                </div>
                <div className="space-y-1.5 rounded-xl bg-slate-50 p-3 ring-1 ring-slate-100">
                  <div className="text-lg font-bold text-slate-700">4.2 名次展示规则</div>
                  <ul className="space-y-2 leading-relaxed text-base">
                    <li>● 是否只展示 Top N（如 Top 10）。</li>
                    <li>● 是否在榜单底部单独展示“我的名次”。</li>
                    <li>● 是否隐藏具体分数，仅展示相对名次。</li>
                  </ul>
                </div>
              </div>

              <div className="rounded-xl bg-slate-50 p-3 ring-1 ring-slate-100">
                <div className="mb-1 text-lg font-bold text-slate-700">4.3 样式配置（简要）</div>
                <ul className="space-y-2 leading-relaxed text-base">
                  <li>● 支持为不同榜单选择主题色（如语文之星用蓝色，体育之星用绿色）。</li>
                  <li>● Top 1~3 名可以配置勋章样式 / 特殊边框。</li>
                  <li>● 可配置是否展示头像，如学校有隐私限制可关闭头像展示，仅展示姓名+班级。</li>
                </ul>
              </div>
            </div>
          </section>

          {/* 五、生效流程 & 历史记录 */}
          <section className="rounded-2xl bg-white p-5 ring-1 ring-slate-200">
            <div className="mb-3 flex items-center justify-between gap-2">
              <h2 className="text-xl font-black text-slate-900">五、生效流程 &amp; 历史记录</h2>
              <span className="rounded-full bg-slate-900 px-2 py-0.5 text-sm font-semibold text-slate-50">
                Lifecycle
              </span>
            </div>

            <div className="grid gap-4 text-base text-slate-700 sm:grid-cols-2">
              <div className="space-y-1.5 rounded-xl bg-slate-50 p-3 ring-1 ring-slate-100">
                <div className="text-lg font-bold text-slate-700">5.1 生效流程</div>
                <ol className="space-y-2 leading-relaxed text-base">
                  <li>1）运营在后台新建或编辑榜单配置。</li>
                  <li>2）保存草稿并预览终端展示效果。</li>
                  <li>3）拥有发布权限的账号点击“发布”，生成新版本。</li>
                  <li>4）数据中心按配置规则在指定周期内开始计算分数。</li>
                  <li>5）终端定时拉取榜单数据并展示。</li>
                </ol>
              </div>
              <div className="space-y-1.5 rounded-xl bg-slate-50 p-3 ring-1 ring-slate-100">
                <div className="text-lg font-bold text-slate-700">5.2 历史记录 &amp; 审计</div>
                <ul className="space-y-2 leading-relaxed text-base">
                  <li>● 能够查看任意周期的榜单历史快照（Top N、总人数、最高分等）。</li>
                  <li>● 能够导出指定周期的详细榜单数据（用于校内档案 / 奖状打印等）。</li>
                  <li>● 对于手动加减分操作，需记录操作者、理由与时间，便于追溯。</li>
                </ul>
              </div>
            </div>
            <div className="mt-4 rounded-xl bg-slate-50 p-3 text-base leading-relaxed text-slate-700 ring-1 ring-slate-100">
              <div className="mb-1 font-bold text-slate-700">
                <span className="text-red-600">5.3 注意事项（与终端信息比对）</span>
              </div>
              <p className="text-red-600">
                每次规则发布或调整后，需要在「终端信息 / 终端列表」中抽样查看对应学校与终端的学习之星榜单数据，与后台榜单结果进行字段级比对
                （如榜单名称、周期、Top N 名单、积分等），用于确认推送是否成功生效并及时发现异常终端。
              </p>
            </div>
          </section>

          {/* 六、异常与边界情况 */}
          <section className="rounded-2xl bg-white p-5 ring-1 ring-slate-200">
            <div className="mb-3 flex items-center justify-between gap-2">
              <h2 className="text-xl font-black text-slate-900">六、异常与边界情况</h2>
              <span className="rounded-full bg-slate-900 px-2 py-0.5 text-sm font-semibold text-slate-50">
                Edge Cases
              </span>
            </div>

            <div className="grid gap-4 text-base text-slate-700 sm:grid-cols-2">
              <div className="space-y-1.5 rounded-xl bg-slate-50 p-3 ring-1 ring-slate-100">
                <div className="text-lg font-bold text-slate-700">6.1 无数据 / 数据不足</div>
                <ul className="space-y-2 leading-relaxed text-base">
                  <li>● 如某周期内无人获得积分，终端展示配置的 emptyState 文案，隐藏榜单列表。</li>
                  <li>● 如仅有极少数学生有数据，可正常展示，不做特殊限制。</li>
                </ul>
              </div>
              <div className="space-y-1.5 rounded-xl bg-slate-50 p-3 ring-1 ring-slate-100">
                <div className="text-lg font-bold text-slate-700">6.2 学生信息变更</div>
                <ul className="space-y-2 leading-relaxed text-base">
                  <li>● 学生转班：当周期内的积分仍计入“原班级”还是“现班级”由学校配置策略决定。</li>
                  <li>● 学生账号合并：未来可由数据中心提供合并工具，榜单视图仅依赖最终 studentId 映射结果。</li>
                </ul>
              </div>
            </div>
          </section>

          {/* 七、业务流程图（学习之星） */}
          <section className="rounded-2xl bg-white p-5 ring-1 ring-slate-200">
            <div className="mb-3 flex items-center justify-between gap-2">
              <h2 className="text-xl font-black text-slate-900">七、业务流程图（学习之星）</h2>
              <span className="rounded-full bg-slate-50 px-2 py-0.5 text-sm font-semibold text-slate-700">
                Flow Diagram
              </span>
            </div>
            <div className="overflow-x-auto">
              <div className="flex min-w-[720px] items-stretch gap-3 text-base text-slate-700">
                {[
                  '配置规则\n（加分项 / 周期 / 维度）',
                  '成长记录产生\n任务完成 / 勋章解锁',
                  '数据中心聚合\n按周期统计行为',
                  '学习之星服务\n计算积分和排序',
                  '生成榜单快照\n写入结果表',
                  '终端拉取榜单\n展示名次与积分',
                ].map((label, idx, arr) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="flex h-24 w-40 flex-col justify-between rounded-xl bg-slate-50 p-3 text-sm ring-1 ring-slate-200">
                      <div className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-purple-600 text-sm font-bold text-white">
                        {idx + 1}
                      </div>
                      <div className="whitespace-pre-line leading-snug">{label}</div>
                    </div>
                    {idx < arr.length - 1 && (
                      <div className="flex h-24 items-center">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-900/5 text-sm text-slate-500">
                          →
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            <p className="mt-3 text-base leading-relaxed text-slate-500">
              该流程图描述了“配置 → 产生行为 → 聚合 → 计算榜单 → 终端展示”的完整链路，可直接转为可视化图形。
            </p>
          </section>

          {/* 八、业务功能角色时序图（学习之星） */}
          <section className="rounded-2xl bg-white p-5 ring-1 ring-slate-200">
            <div className="mb-3 flex items-center justify-between gap-2">
              <h2 className="text-xl font-black text-slate-900">八、业务功能角色时序图（学习之星）</h2>
              <span className="rounded-full bg-slate-900 px-2 py-0.5 text-sm font-semibold text-slate-50">
                Sequence Diagram
              </span>
            </div>
            <div className="overflow-x-auto">
              <div className="min-w-[720px] rounded-xl bg-slate-50 p-3 ring-1 ring-slate-100">
                <div className="mb-2 grid grid-cols-5 gap-2 text-lg font-bold text-slate-700">
                  <div className="text-center">运营 Operator</div>
                  <div className="text-center">配置后台 RankingAdmin</div>
                  <div className="text-center">成长记录 Growth</div>
                  <div className="text-center">学习之星 RankingService</div>
                  <div className="text-center">终端 Terminal / 学生</div>
                </div>
                <div className="space-y-1.5 text-base text-slate-700">
                  <div className="grid grid-cols-5 gap-2">
                    <div className="text-center">配置规则并发布</div>
                    <div className="text-center">保存规则并同步到 Growth</div>
                    <div className="text-center">存储规则配置</div>
                    <div />
                    <div />
                  </div>
                  <div className="grid grid-cols-5 gap-2">
                    <div />
                    <div />
                    <div className="text-center">持续接收终端上报的成长记录</div>
                    <div />
                    <div className="text-center">参与互动，产生行为事件</div>
                  </div>
                  <div className="grid grid-cols-5 gap-2">
                    <div />
                    <div />
                    <div className="text-center">在周期边界触发聚合任务</div>
                    <div className="text-center">接收聚合结果并计算积分 / 排名</div>
                    <div />
                  </div>
                  <div className="grid grid-cols-5 gap-2">
                    <div />
                    <div />
                    <div />
                    <div className="text-center">生成榜单快照并写入结果表</div>
                    <div />
                  </div>
                  <div className="grid grid-cols-5 gap-2">
                    <div />
                    <div />
                    <div className="text-center">对外提供榜单查询接口</div>
                    <div />
                    <div className="text-center">终端定时拉取榜单并展示给学生</div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 九、测试用例设计（学习之星） */}
          <section className="rounded-2xl bg-white p-5 ring-1 ring-slate-200">
            <div className="mb-3 flex items-center justify-between gap-2">
              <h2 className="text-xl font-black text-slate-900">九、测试用例设计（学习之星）</h2>
              <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-sm font-semibold text-emerald-700">
                Test Cases
              </span>
            </div>
            <div className="space-y-4 text-sm text-slate-700">
              <div>
                <div className="mb-1 font-bold text-slate-700">9.1 常规功能测试用例</div>
                <div className="overflow-hidden rounded-xl border border-slate-100 bg-slate-50">
                  <table className="min-w-full border-collapse text-left">
                    <thead className="bg-slate-100 text-sm uppercase tracking-wide text-slate-500">
                      <tr>
                        <th className="px-3 py-2 font-semibold">用例编号</th>
                        <th className="px-3 py-2 font-semibold">类型</th>
                        <th className="px-3 py-2 font-semibold">前置条件</th>
                        <th className="px-3 py-2 font-semibold">步骤</th>
                        <th className="px-3 py-2 font-semibold">期望结果</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-t border-slate-100">
                        <td className="px-3 py-2 align-top font-mono text-sm">TC-RNK-001</td>
                        <td className="px-3 py-2 align-top">功能 · 创建日榜并正确出榜</td>
                        <td className="px-3 py-2 align-top">系统中已有成长记录事件（含任务完成和勋章解锁）。</td>
                        <td className="px-3 py-2 align-top">
                          1）新建学习之星规则，cycle=daily，scope=全校；<br />
                          2）配置合理的 scoreWeights；<br />
                          3）发布后等待一个结算周期；<br />
                          4）在终端查看榜单。
                        </td>
                        <td className="px-3 py-2 align-top">
                          日榜按得分从高到低排序；同分按业务约定稳定排序；Top N 与数据中心查询结果完全一致。
                        </td>
                      </tr>
                      <tr className="border-t border-slate-100 bg-white/60">
                        <td className="px-3 py-2 align-top font-mono text-sm">TC-RNK-002</td>
                        <td className="px-3 py-2 align-top">功能 · 班级榜单（人均分）</td>
                        <td className="px-3 py-2 align-top">至少两个班级有学生积分。</td>
                        <td className="px-3 py-2 align-top">
                          1）新建班级维度榜单，scope 选择两个班级，统计方式=人均分；<br />
                          2）发布并触发计算；<br />
                          3）查看班级榜单。
                        </td>
                        <td className="px-3 py-2 align-top">
                          每个班级显示总分与人均分；最终排序按人均分；前端文案清晰标明为「人均分榜」。
                        </td>
                      </tr>
                      <tr className="border-t border-slate-100">
                        <td className="px-3 py-2 align-top font-mono text-sm">TC-RNK-003</td>
                        <td className="px-3 py-2 align-top">功能 · 手动加减分生效</td>
                        <td className="px-3 py-2 align-top">老师账号具备加减分权限。</td>
                        <td className="px-3 py-2 align-top">
                          1）老师为某学生手动加 10 分并填写理由；<br />
                          2）等待下一次积分刷新；<br />
                          3）在后台和终端分别查看该学生积分与名次变化。
                        </td>
                        <td className="px-3 py-2 align-top">
                          该学生积分在当前周期增加 10 分；历史操作日志可查到加分记录；终端随后展示更新后的名次。
                        </td>
                      </tr>
                      <tr className="border-t border-slate-100 bg-white/60">
                        <td className="px-3 py-2 align-top font-mono text-sm">TC-RNK-004</td>
                        <td className="px-3 py-2 align-top">功能 · 空数据场景</td>
                        <td className="px-3 py-2 align-top">选定周期内无任意学生积分。</td>
                        <td className="px-3 py-2 align-top">
                          在终端和后台打开该周期的学习之星榜单。
                        </td>
                        <td className="px-3 py-2 align-top">
                          列表区域隐藏；展示配置好的 emptyState 文案，如「本周期暂无上榜同学」；系统不报错。
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div>
                <div className="mb-1 font-bold text-slate-700">9.2 非常规 / 暴力测试用例</div>
                <div className="overflow-hidden rounded-xl border border-slate-100 bg-slate-50">
                  <table className="min-w-full border-collapse text-left">
                    <thead className="bg-slate-100 text-sm uppercase tracking-wide text-slate-500">
                      <tr>
                        <th className="px-3 py-2 font-semibold">用例编号</th>
                        <th className="px-3 py-2 font-semibold">类型</th>
                        <th className="px-3 py-2 font-semibold">前置条件</th>
                        <th className="px-3 py-2 font-semibold">步骤</th>
                        <th className="px-3 py-2 font-semibold">期望结果</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-t border-slate-100">
                        <td className="px-3 py-2 align-top font-mono text-sm">TC-RNK-101</td>
                        <td className="px-3 py-2 align-top">异常 · 极端高频事件刷分</td>
                        <td className="px-3 py-2 align-top">—</td>
                        <td className="px-3 py-2 align-top">
                          模拟某学生在一个周期内产生上万条有效行为事件（任务完成、勋章解锁等）。
                        </td>
                        <td className="px-3 py-2 align-top">
                          积分不超过 maxScorePerPeriod 封顶值；计算服务性能可接受；终端加载榜单时无超时。
                        </td>
                      </tr>
                      <tr className="border-t border-slate-100 bg-white/60">
                        <td className="px-3 py-2 align-top font-mono text-sm">TC-RNK-102</td>
                        <td className="px-3 py-2 align-top">异常 · 多条规则交叉影响</td>
                        <td className="px-3 py-2 align-top">同一学校已配置多条规则，scope 部分重叠。</td>
                        <td className="px-3 py-2 align-top">
                          为同一学校配置多条规则（如「本周综合之星」「本周体育之星」）；触发成长记录产生。
                        </td>
                        <td className="px-3 py-2 align-top">
                          每条规则独立生成榜单和积分；任意榜单排序不受其他规则影响；学生在不同榜单可有不同分数和名次。
                        </td>
                      </tr>
                      <tr className="border-t border-slate-100">
                        <td className="px-3 py-2 align-top font-mono text-sm">TC-RNK-103</td>
                        <td className="px-3 py-2 align-top">异常 · 规则修改中的中间状态</td>
                        <td className="px-3 py-2 align-top">规则已上线发布。</td>
                        <td className="px-3 py-2 align-top">
                          1）编辑已上线规则但仅保存草稿、不发布；<br />
                          2）观察同周期后续计算结果。
                        </td>
                        <td className="px-3 py-2 align-top">
                          未发布的草稿不影响线上计算；只有发布后的版本变更才会在下一统计周期生效。
                        </td>
                      </tr>
                      <tr className="border-t border-slate-100 bg-white/60">
                        <td className="px-3 py-2 align-top font-mono text-sm">TC-RNK-104</td>
                        <td className="px-3 py-2 align-top">异常 · 学生转班 / 合并账号</td>
                        <td className="px-3 py-2 align-top">周期进行中有学生转班或账号合并。</td>
                        <td className="px-3 py-2 align-top">
                          1）在周期中途对学生进行转班或账号合并操作；<br />
                          2）重新运行该周期的榜单计算；<br />
                          3）在班级榜和个人榜中查看结果。
                        </td>
                        <td className="px-3 py-2 align-top">
                          转班策略按配置执行；账号合并后仅保留一个最终 studentId 的积分记录，不出现重复排名。
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}

