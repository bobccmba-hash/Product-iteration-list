import Link from 'next/link'

export default function PrdGrowthDataPage() {
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
          <div className="inline-flex items-center gap-2 rounded-full bg-rose-100 px-2.5 py-1 text-sm font-bold text-rose-700 ring-1 ring-rose-200">
            <span className="text-sm">📊</span>
            <span>成长记录 · 数据视图</span>
          </div>
          <h1 className="text-3xl font-black tracking-tight sm:text-3xl">
            成长记录 · 数据视图 PRD
          </h1>
          <p className="max-w-3xl text-lg leading-relaxed text-slate-600 sm:text-base">
            本文档定义“成长记录”数据中心中，面向运营 / 老师 / 系统同学的三个主要视角：
            学生档案列表、事件流水、统计分析。重点说明字段结构、筛选逻辑与操作规范。
          </p>
          <div className="flex flex-wrap gap-2 text-sm text-slate-500">
            <span className="rounded-full bg-white px-2 py-0.5 ring-1 ring-slate-200">视角：档案 / 事件 / 统计</span>
            <span className="rounded-full bg-white px-2 py-0.5 ring-1 ring-slate-200">对象：学生 / 班级 / 学校</span>
          </div>
        </header>

        <div className="space-y-6">
          {/* 一、信息架构 & 角色 */}
          <section className="rounded-2xl bg-white p-5 ring-1 ring-slate-200">
            <div className="mb-3 flex items-center justify-between gap-2">
              <h2 className="text-xl font-black text-slate-900">一、信息架构 &amp; 角色</h2>
              <span className="rounded-full bg-rose-50 px-2 py-0.5 text-sm font-semibold text-rose-700">
                IA
              </span>
            </div>

            <div className="grid gap-4 text-base text-slate-700 sm:grid-cols-3">
              <div className="space-y-1.5 rounded-xl bg-slate-50 p-3 ring-1 ring-slate-100">
                <div className="text-lg font-bold text-slate-700">学生档案列表</div>
                <p className="text-base leading-relaxed">
                  以“学生”为主对象的列表视图，展示其基本信息、整体成长概览，支持按年级 / 班级 / 标签筛选。
                </p>
              </div>
              <div className="space-y-1.5 rounded-xl bg-slate-50 p-3 ring-1 ring-slate-100">
                <div className="text-lg font-bold text-slate-700">事件流水</div>
                <p className="text-base leading-relaxed">
                  展示每条成长事件（如任务完成、勋章解锁、加分/减分等），可按时间、事件类型、来源终端筛选。
                </p>
              </div>
              <div className="space-y-1.5 rounded-xl bg-slate-50 p-3 ring-1 ring-slate-100">
                <div className="text-lg font-bold text-slate-700">统计分析</div>
                <p className="text-base leading-relaxed">
                  以图表形式展示整体参与率、任务完成情况、勋章解锁分布，为运营优化规则提供决策支持。
                </p>
              </div>
            </div>
          </section>

          {/* 二、学生档案视图 */}
          <section className="rounded-2xl bg-white p-5 ring-1 ring-slate-200">
            <div className="mb-3 flex items-center justify-between gap-2">
              <h2 className="text-xl font-black text-slate-900">二、学生档案视图</h2>
              <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-sm font-semibold text-emerald-700">
                Profile List
              </span>
            </div>

            <div className="space-y-4 text-base text-slate-700">
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="space-y-1.5 rounded-xl bg-slate-50 p-3 ring-1 ring-slate-100">
                  <div className="text-lg font-bold text-slate-700">2.1 列表字段</div>
                  <ul className="space-y-2 leading-relaxed text-base">
                    <li>● 姓名 / 昵称（支持模糊搜索）。</li>
                    <li>● 学号（如接学校已有系统，可展示）。</li>
                    <li>● 班级、年级信息。</li>
                    <li>● 最近一次参与时间（最近一次终端互动时间）。</li>
                    <li>● 当前周期成长分数（如本周学习之星积分）。</li>
                    <li>● 勋章数量（已解锁 / 总数）。</li>
                  </ul>
                </div>
                <div className="space-y-1.5 rounded-xl bg-slate-50 p-3 ring-1 ring-slate-100">
                  <div className="text-lg font-bold text-slate-700">2.2 筛选 &amp; 搜索</div>
                  <ul className="space-y-2 leading-relaxed text-base">
                    <li>● 按年级、班级、多选筛选。</li>
                    <li>● 按“是否活跃”（最近 N 天是否有互动）筛选。</li>
                    <li>● 按标签筛选（如“体育特长生”“阅读兴趣组”等标签）。</li>
                  </ul>
                </div>
              </div>

              <div className="rounded-xl bg-slate-50 p-3 ring-1 ring-slate-100">
                <div className="mb-1 text-lg font-bold text-slate-700">2.3 行为入口</div>
                <ul className="space-y-2 leading-relaxed text-base">
                  <li>● 点击行 → 进入学生档案详情页。</li>
                  <li>● 列表支持“导出当前筛选结果”为表格文件。</li>
                  <li>● 老师角色可在详情页录入“线下表扬 / 批评”等人工事件。</li>
                </ul>
              </div>

              <div>
                <div className="mb-1 text-lg font-bold text-slate-700">2.4 列表字段数据约束</div>
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
                        <td className="px-3 py-2 font-mono text-base">studentId</td>
                        <td className="px-3 py-2">string</td>
                        <td className="px-3 py-2">是</td>
                        <td className="px-3 py-2">
                          学生主键，来源于基础学生表；长度不超过 64 字符。
                        </td>
                      </tr>
                      <tr className="border-t border-slate-100 bg-white/60">
                        <td className="px-3 py-2 font-mono text-base">name</td>
                        <td className="px-3 py-2">string</td>
                        <td className="px-3 py-2">是</td>
                        <td className="px-3 py-2">
                          姓名 / 昵称，最长 20 个汉字；前端按列宽截断。
                        </td>
                      </tr>
                      <tr className="border-t border-slate-100">
                        <td className="px-3 py-2 font-mono text-base">className</td>
                        <td className="px-3 py-2">string</td>
                        <td className="px-3 py-2">是</td>
                        <td className="px-3 py-2">班级名称，最长 30 个汉字。</td>
                      </tr>
                      <tr className="border-t border-slate-100 bg-white/60">
                        <td className="px-3 py-2 font-mono text-base">lastActiveAt</td>
                        <td className="px-3 py-2">string</td>
                        <td className="px-3 py-2">否</td>
                        <td className="px-3 py-2">
                          最近一次参与时间，ISO8601 字符串；为空表示暂无互动记录。
                        </td>
                      </tr>
                      <tr className="border-t border-slate-100">
                        <td className="px-3 py-2 font-mono text-base">currentPeriodScore</td>
                        <td className="px-3 py-2">number</td>
                        <td className="px-3 py-2">否</td>
                        <td className="px-3 py-2">
                          当前周期学习之星积分（若有配置），非负整数；默认 0。
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </section>

          {/* 三、事件流水视图 */}
          <section className="rounded-2xl bg-white p-5 ring-1 ring-slate-200">
            <div className="mb-3 flex items-center justify-between gap-2">
              <h2 className="text-xl font-black text-slate-900">三、事件流水视图</h2>
              <span className="rounded-full bg-indigo-50 px-2 py-0.5 text-sm font-semibold text-indigo-700">
                Event Stream
              </span>
            </div>

            <div className="space-y-4 text-base text-slate-700">
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="space-y-1.5 rounded-xl bg-slate-50 p-3 ring-1 ring-slate-100">
                  <div className="text-lg font-bold text-slate-700">3.1 事件字段（核心）</div>
                  <ul className="space-y-2 leading-relaxed text-base">
                    <li>● eventId：string，事件主键。</li>
                    <li>● studentId / classId / schoolId。</li>
                    <li>● eventType：如 task_completed / badge_unlocked / score_adjusted / login 等。</li>
                    <li>● source：来源终端或后台，如 terminal / admin / api。</li>
                    <li>● occurredAt：事件发生时间。</li>
                    <li>● payload：携带与事件相关的扩展字段（JSON）。</li>
                  </ul>
                </div>
                <div className="space-y-1.5 rounded-xl bg-slate-50 p-3 ring-1 ring-slate-100">
                  <div className="text-lg font-bold text-slate-700">3.2 筛选需求</div>
                  <ul className="space-y-2 leading-relaxed text-base">
                    <li>● 时间范围：支持快捷选择“今天 / 最近 7 天 / 本月”等。</li>
                    <li>● 事件类型：多选，支持按任务 / 勋章 / 加减分等细分。</li>
                    <li>● 来源终端：按终端设备、IP 或学校位置筛选。</li>
                  </ul>
                </div>
              </div>

              <div className="rounded-xl bg-slate-50 p-3 ring-1 ring-slate-100">
                <div className="mb-1 text-lg font-bold text-slate-700">3.3 用途场景</div>
                <ul className="space-y-2 leading-relaxed text-base">
                  <li>● 运维排查：当终端反馈“学生完成任务但未加分”时，快速查看事件是否上报成功。</li>
                  <li>● 教师回溯：老师希望查看某个学生近期参与活动记录。</li>
                  <li>● 运营分析：评估某个任务 / 勋章配置的参与效果。</li>
                </ul>
              </div>

              <div>
                <div className="mb-1 text-lg font-bold text-slate-700">3.4 事件字段约束</div>
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
                        <td className="px-3 py-2 font-mono text-base">eventId</td>
                        <td className="px-3 py-2">string</td>
                        <td className="px-3 py-2">是</td>
                        <td className="px-3 py-2">事件主键，全局唯一，长度不超过 64 字符。</td>
                      </tr>
                      <tr className="border-t border-slate-100 bg-white/60">
                        <td className="px-3 py-2 font-mono text-base">eventType</td>
                        <td className="px-3 py-2">enum</td>
                        <td className="px-3 py-2">是</td>
                        <td className="px-3 py-2">
                          取值集合固定：task_completed / badge_unlocked / score_adjusted / login / custom；前后端严格对齐英文枚举。
                        </td>
                      </tr>
                      <tr className="border-t border-slate-100">
                        <td className="px-3 py-2 font-mono text-base">source</td>
                        <td className="px-3 py-2">enum</td>
                        <td className="px-3 py-2">是</td>
                        <td className="px-3 py-2">
                          来源系统：terminal / admin / api；终端上报必须为 terminal。
                        </td>
                      </tr>
                      <tr className="border-t border-slate-100 bg-white/60">
                        <td className="px-3 py-2 font-mono text-base">occurredAt</td>
                        <td className="px-3 py-2">string</td>
                        <td className="px-3 py-2">是</td>
                        <td className="px-3 py-2">事件发生时间，ISO8601；不能晚于服务器接收时间超过 24 小时。</td>
                      </tr>
                      <tr className="border-t border-slate-100">
                        <td className="px-3 py-2 font-mono text-base">payload</td>
                        <td className="px-3 py-2">object</td>
                        <td className="px-3 py-2">否</td>
                        <td className="px-3 py-2">
                          扩展字段 JSON，单条序列化后大小不超过 4KB；用于存储任务 id、得分等上下文信息。
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </section>

          {/* 四、统计分析视图 */}
          <section className="rounded-2xl bg-white p-5 ring-1 ring-slate-200">
            <div className="mb-3 flex items-center justify-between gap-2">
              <h2 className="text-xl font-black text-slate-900">四、统计分析视图</h2>
              <span className="rounded-full bg-amber-50 px-2 py-0.5 text-sm font-semibold text-amber-700">
                Analytics
              </span>
            </div>

            <div className="space-y-3 text-base text-slate-700">
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="space-y-1.5 rounded-xl bg-slate-50 p-3 ring-1 ring-slate-100">
                  <div className="text-lg font-bold text-slate-700">4.1 关键指标</div>
                  <ul className="space-y-2 leading-relaxed text-base">
                    <li>● 覆盖率：在选定时间段内至少参与过一次互动的学生比例。</li>
                    <li>● 活跃度：平均每名学生的互动次数。</li>
                    <li>● 任务完成率：已完成任务数量 / 被激活任务数量。</li>
                    <li>● 勋章解锁分布：不同稀有度勋章的解锁数量和占比。</li>
                  </ul>
                </div>
                <div className="space-y-1.5 rounded-xl bg-slate-50 p-3 ring-1 ring-slate-100">
                  <div className="text-lg font-bold text-slate-700">4.2 视图类型</div>
                  <ul className="space-y-2 leading-relaxed text-base">
                    <li>● 折线图：展示每日参与人数、任务完成数量等趋势。</li>
                    <li>● 柱状图：展示不同班级 / 年级的参与对比。</li>
                    <li>● 饼图：展示勋章稀有度的解锁占比。</li>
                  </ul>
                </div>
              </div>

              <div className="rounded-xl bg-slate-50 p-3 ring-1 ring-slate-100">
                <div className="mb-1 text-lg font-bold text-slate-700">4.3 下钻能力</div>
                <ul className="space-y-2 leading-relaxed text-base">
                  <li>● 从学校视角 → 年级 → 班级 → 学生逐级下钻。</li>
                  <li>● 从某个任务 / 勋章 → 查看参与该任务或解锁该勋章的学生列表。</li>
                </ul>
              </div>
            </div>
          </section>

          {/* 五、学生档案详情页 */}
          <section className="rounded-2xl bg-white p-5 ring-1 ring-slate-200">
            <div className="mb-3 flex items-center justify-between gap-2">
              <h2 className="text-xl font-black text-slate-900">五、学生档案详情页</h2>
              <span className="rounded-full bg-slate-900 px-2 py-0.5 text-sm font-semibold text-slate-50">
                Profile Detail
              </span>
            </div>

            <div className="space-y-3 text-base text-slate-700">
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="space-y-1.5 rounded-xl bg-slate-50 p-3 ring-1 ring-slate-100">
                  <div className="text-lg font-bold text-slate-700">5.1 基础信息区</div>
                  <ul className="space-y-2 leading-relaxed text-base">
                    <li>● 头像 / 占位图、姓名、班级、年级。</li>
                    <li>● 学生标签列表（可从后台添加）。</li>
                    <li>● 最近活跃时间 / 连续活跃天数等摘要指标。</li>
                  </ul>
                </div>
                <div className="space-y-1.5 rounded-xl bg-slate-50 p-3 ring-1 ring-slate-100">
                  <div className="text-lg font-bold text-slate-700">5.2 成长概览区</div>
                  <ul className="space-y-2 leading-relaxed text-base">
                    <li>● 累计参与次数、累计完成任务数。</li>
                    <li>● 勋章墙：按稀有度分栏展示已解锁勋章。</li>
                    <li>● 学习之星历史记录：展示该生上榜次数和最佳名次。</li>
                  </ul>
                </div>
              </div>

              <div className="rounded-xl bg-slate-50 p-3 ring-1 ring-slate-100">
                <div className="mb-1 text-lg font-bold text-slate-700">5.3 事件时间线</div>
                <ul className="space-y-2 leading-relaxed text-base">
                  <li>● 将该学生相关事件按时间顺序列表展示，支持按事件类型筛选。</li>
                  <li>● 老师可在此时间线中补录“线下事件”，如课堂表现。</li>
                </ul>
              </div>
            </div>
          </section>

          {/* 六、业务流程图（成长记录） */}
          <section className="rounded-2xl bg-white p-5 ring-1 ring-slate-200">
            <div className="mb-3 flex items-center justify-between gap-2">
              <h2 className="text-xl font-black text-slate-900">六、业务流程图（成长记录）</h2>
              <span className="rounded-full bg-slate-50 px-2 py-0.5 text-sm font-semibold text-slate-700">
                Flow Diagram
              </span>
            </div>
            <div className="overflow-x-auto">
              <div className="flex min-w-[720px] items-stretch gap-3 text-base text-slate-700">
                {[
                  '学生在终端\n完成一次互动',
                  '终端上报\n成长记录事件',
                  '事件写入\n事件流水表',
                  '定时任务\n聚合学生维度数据',
                  '更新学生档案\n汇总字段',
                  '列表 / 详情\n从档案表读取展示',
                ].map((label, idx, arr) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="flex h-24 w-40 flex-col justify-between rounded-xl bg-slate-50 p-3 text-sm ring-1 ring-slate-200">
                      <div className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-rose-600 text-sm font-bold text-white">
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
          </section>

          {/* 七、业务功能角色时序图（成长记录） */}
          <section className="rounded-2xl bg-white p-5 ring-1 ring-slate-200">
            <div className="mb-3 flex items-center justify-between gap-2">
              <h2 className="text-xl font-black text-slate-900">七、业务功能角色时序图（成长记录）</h2>
              <span className="rounded-full bg-slate-900 px-2 py-0.5 text-sm font-semibold text-slate-50">
                Sequence Diagram
              </span>
            </div>
            <div className="overflow-x-auto">
              <div className="min-w-[720px] rounded-xl bg-slate-50 p-3 ring-1 ring-slate-100">
                <div className="mb-2 grid grid-cols-5 gap-2 text-lg font-bold text-slate-700">
                  <div className="text-center">学生 Student</div>
                  <div className="text-center">终端 Terminal</div>
                  <div className="text-center">成长记录服务 Growth</div>
                  <div className="text-center">数据分析界面 AnalyticsUI</div>
                  <div className="text-center">老师 / 运营</div>
                </div>
                <div className="space-y-1.5 text-base text-slate-700">
                  <div className="grid grid-cols-5 gap-2">
                    <div className="text-center">参与互动任务</div>
                    <div className="text-center">结束时组装事件</div>
                    <div className="text-center">接收并写入事件流水</div>
                    <div />
                    <div />
                  </div>
                  <div className="grid grid-cols-5 gap-2">
                    <div />
                    <div />
                    <div className="text-center">周期性聚合生成学生档案汇总</div>
                    <div />
                    <div />
                  </div>
                  <div className="grid grid-cols-5 gap-2">
                    <div />
                    <div />
                    <div />
                    <div className="text-center">发起“学生档案 / 统计视图”查询</div>
                    <div className="text-center">打开某视图页面</div>
                  </div>
                  <div className="grid grid-cols-5 gap-2">
                    <div />
                    <div />
                    <div className="text-center">返回档案摘要 + 事件列表 / 统计指标</div>
                    <div className="text-center">渲染列表、详情或图表</div>
                    <div />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 八、测试用例设计（成长记录数据视图） */}
          <section className="rounded-2xl bg-white p-5 ring-1 ring-slate-200">
            <div className="mb-3 flex items-center justify-between gap-2">
              <h2 className="text-xl font-black text-slate-900">八、测试用例设计（成长记录数据视图）</h2>
              <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-sm font-semibold text-emerald-700">
                Test Cases
              </span>
            </div>
            <div className="space-y-4 text-sm text-slate-700">
              <div>
                <div className="mb-1 font-bold text-slate-700">8.1 常规功能测试用例</div>
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
                        <td className="px-3 py-2 align-top font-mono text-sm">TC-GD-001</td>
                        <td className="px-3 py-2 align-top">功能 · 按班级查看学生档案列表</td>
                        <td className="px-3 py-2 align-top">至少两个班级有学生成长记录。</td>
                        <td className="px-3 py-2 align-top">
                          1）在档案列表选择某年级、某班级作为筛选条件；<br />
                          2）点击搜索；<br />
                          3）导出当前列表为表格文件。
                        </td>
                        <td className="px-3 py-2 align-top">
                          列表仅展示符合筛选条件的学生；记录数与数据库查询一致；导出文件列头与页面显示字段一致、数据条数相同。
                        </td>
                      </tr>
                      <tr className="border-t border-slate-100 bg-white/60">
                        <td className="px-3 py-2 align-top font-mono text-sm">TC-GD-002</td>
                        <td className="px-3 py-2 align-top">功能 · 学生档案详情 + 事件时间线</td>
                        <td className="px-3 py-2 align-top">目标学生有多条成长记录。</td>
                        <td className="px-3 py-2 align-top">
                          1）在档案列表点击某个学生行；<br />
                          2）进入详情页；<br />
                          3）切换事件类型筛选（仅看任务完成 / 仅看加减分）。
                        </td>
                        <td className="px-3 py-2 align-top">
                          基础信息与学生表一致；累计统计与事件流水聚合结果一致；时间线中事件按时间倒序排列，筛选条件生效。
                        </td>
                      </tr>
                      <tr className="border-t border-slate-100">
                        <td className="px-3 py-2 align-top font-mono text-sm">TC-GD-003</td>
                        <td className="px-3 py-2 align-top">功能 · 统计分析视图下钻</td>
                        <td className="px-3 py-2 align-top">多层级数据均有记录。</td>
                        <td className="px-3 py-2 align-top">
                          1）在统计分析视图按学校查看整体参与率；<br />
                          2）点击某年级柱状图条目；<br />
                          3）再点击某班级进入班级明细；<br />
                          4）从班级明细跳转到单个学生档案。
                        </td>
                        <td className="px-3 py-2 align-top">
                          每一层统计数字与下一级明细一致；最终学生档案数据与班级视图统计一致。
                        </td>
                      </tr>
                      <tr className="border-t border-slate-100 bg-white/60">
                        <td className="px-3 py-2 align-top font-mono text-sm">TC-GD-004</td>
                        <td className="px-3 py-2 align-top">功能 · 老师录入线下表扬事件</td>
                        <td className="px-3 py-2 align-top">老师账号具备录入权限。</td>
                        <td className="px-3 py-2 align-top">
                          1）在某学生档案详情的时间线区域选择新增线下事件；<br />
                          2）选择类型=表扬，填写简短说明；<br />
                          3）保存。
                        </td>
                        <td className="px-3 py-2 align-top">
                          新增事件在时间线顶部展示，来源标记为 admin；事件被写入事件流水并可被统计分析视图识别。
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div>
                <div className="mb-1 font-bold text-slate-700">8.2 非常规 / 暴力测试用例</div>
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
                        <td className="px-3 py-2 align-top font-mono text-sm">TC-GD-101</td>
                        <td className="px-3 py-2 align-top">异常 · 大量事件历史加载</td>
                        <td className="px-3 py-2 align-top">—</td>
                        <td className="px-3 py-2 align-top">
                          为某学生导入数万条历史事件记录（跨多个学期）；在事件流水视图中拉取该学生最近一年的事件。
                        </td>
                        <td className="px-3 py-2 align-top">
                          接口响应时间在可接受范围内；前端采用分页或按时间范围加载，不出现浏览器卡死；滚动体验流畅。
                        </td>
                      </tr>
                      <tr className="border-t border-slate-100 bg-white/60">
                        <td className="px-3 py-2 align-top font-mono text-sm">TC-GD-102</td>
                        <td className="px-3 py-2 align-top">异常 · 极端筛选组合</td>
                        <td className="px-3 py-2 align-top">—</td>
                        <td className="px-3 py-2 align-top">
                          在事件流水 / 档案视图中同时选择多个年级、多个班级、多个标签以及极长时间范围（例如 3 年）；执行搜索。
                        </td>
                        <td className="px-3 py-2 align-top">
                          系统能正确返回结果或给出明显的时间范围限制提示；不会返回错误数据或导致服务超时崩溃。
                        </td>
                      </tr>
                      <tr className="border-t border-slate-100">
                        <td className="px-3 py-2 align-top font-mono text-sm">TC-GD-103</td>
                        <td className="px-3 py-2 align-top">异常 · 边界时间与时区问题</td>
                        <td className="px-3 py-2 align-top">—</td>
                        <td className="px-3 py-2 align-top">
                          构造发生时间在 0 点前后或跨时区（服务器 UTC、学校本地 UTC+8）的事件；在不同日期范围筛选。
                        </td>
                        <td className="px-3 py-2 align-top">
                          按自然日（学校所在时区）统计时，事件被归入正确日期；不会因时区换算导致少计或多计。
                        </td>
                      </tr>
                      <tr className="border-t border-slate-100 bg-white/60">
                        <td className="px-3 py-2 align-top font-mono text-sm">TC-GD-104</td>
                        <td className="px-3 py-2 align-top">异常 · 脏数据与缺失字段</td>
                        <td className="px-3 py-2 align-top">—</td>
                        <td className="px-3 py-2 align-top">
                          人工插入部分缺失必要字段（如缺少 classId）的事件记录；刷新档案列表和统计视图。
                        </td>
                        <td className="px-3 py-2 align-top">
                          系统能容错处理（跳过计入但在运维视图中有告警）；不会出现页面渲染报错，显示未知班级等合理占位。
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

