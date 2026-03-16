import Link from 'next/link'

export default function PrdAdminConfigPage() {
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
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-2.5 py-1 text-sm font-bold text-emerald-700 ring-1 ring-emerald-200">
            <span className="text-sm">⚙️</span>
            <span>后台配置 · 任务管理</span>
          </div>
          <h1 className="text-3xl font-black tracking-tight sm:text-3xl">
            任务配置后台 PRD
          </h1>
          <p className="max-w-3xl text-lg leading-relaxed text-slate-600 sm:text-base">
            本文档定义运营 / 教研人员使用的任务配置后台，用于创建和管理任务规则及其与终端、数据中心的联动机制。
            重点说明字段结构、推送机制、版本控制和数据一致性要求。
          </p>
          <div className="flex flex-wrap gap-2 text-sm text-slate-500">
            <span className="rounded-full bg-white px-2 py-0.5 ring-1 ring-slate-200">版本：v1.0</span>
            <span className="rounded-full bg-white px-2 py-0.5 ring-1 ring-slate-200">角色：运营 / 教研 / 系统</span>
          </div>
        </header>

        <div className="space-y-6">
          {/* 一、任务模块说明 */}
          <section className="rounded-2xl bg-white p-5 ring-1 ring-slate-200">
            <div className="mb-3 flex items-center justify-between gap-2">
              <h2 className="text-xl font-black text-slate-900">一、任务模块说明</h2>
              <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-sm font-semibold text-emerald-700">
                Domain Model
              </span>
            </div>
            <div className="space-y-3 text-base text-slate-700">
              <div className="rounded-xl bg-emerald-50 p-3 ring-1 ring-emerald-100">
                <div className="text-sm font-bold text-emerald-800">任务（Task）</div>
                <p className="text-base leading-relaxed">
                  具体可执行的互动行为单元，如「完成 1 次跳绳测试」「参与 1 次阅读打卡互动」。任务完成后产生成长记录，并触发学习之星积分更新。
                </p>
              </div>
              <div className="rounded-xl bg-slate-50 p-3 text-base leading-relaxed text-slate-600 ring-1 ring-slate-100">
                <div className="mb-1 font-bold text-slate-700">核心约束</div>
                <p>每个任务通过 triggerEventKey 与终端 / 游戏上报事件绑定；任务完成次数由 maxTimesPerDay 控制每日上限；任务发布后方可被终端拉取并展示给学生。</p>
              </div>
            </div>
          </section>

          {/* 二、核心页面 & 操作流程 */}
          <section className="rounded-2xl bg-white p-5 ring-1 ring-slate-200">
            <div className="mb-3 flex items-center justify-between gap-2">
              <h2 className="text-xl font-black text-slate-900">二、核心页面 &amp; 操作流程</h2>
              <span className="rounded-full bg-slate-900 px-2 py-0.5 text-sm font-semibold text-slate-50">
                UX Flows
              </span>
            </div>

            <div className="space-y-4 text-base text-slate-700">
              <div className="rounded-xl bg-slate-50 p-3 ring-1 ring-slate-100">
                <div className="mb-1 flex items-center justify-between gap-2">
                  <div className="text-lg font-bold text-slate-700">2.1 任务总览页</div>
                  <span className="rounded-full bg-slate-900 px-2 py-0.5 text-sm font-semibold text-slate-50">
                    入口页
                  </span>
                </div>
                <ul className="space-y-2 leading-relaxed text-base">
                  <li>● 展示任务列表，支持按学校 / 年级 / 时间范围过滤，列表项右侧展示发布状态和最近更新时间。</li>
                  <li>● 右上角「新建任务」按钮，进入任务配置表单。</li>
                  <li>● 列表支持批量下线 / 归档操作。</li>
                </ul>
              </div>

              <div className="rounded-xl bg-slate-50 p-3 ring-1 ring-slate-100">
                <div className="mb-1 flex items-center justify-between gap-2">
                  <div className="text-lg font-bold text-slate-700">2.2 任务配置流程</div>
                  <span className="rounded-full bg-indigo-50 px-2 py-0.5 text-sm font-semibold text-indigo-700">
                    与终端 / 游戏联动
                  </span>
                </div>
                <ol className="space-y-2 leading-relaxed text-base">
                  <li>1）选择任务类型：如「姿态游戏」「答题闯关」「打卡签到」等。</li>
                  <li>2）配置触发条件：关联终端事件（如「完成一局 AR 姿态游戏」）。</li>
                  <li>3）设置学习之星加分权重。</li>
                  <li>4）适用范围：学校、年级、班级、可用终端列表。</li>
                  <li>5）推送设置：是否立即推送、推送时间范围、重复执行规则。</li>
                </ol>
              </div>
            </div>
          </section>

          {/* 三、字段定义（配置后台） */}
          <section className="rounded-2xl bg-white p-5 ring-1 ring-slate-200">
            <div className="mb-3 flex items-center justify-between gap-2">
              <h2 className="text-xl font-black text-slate-900">三、字段定义（配置后台）</h2>
              <span className="rounded-full bg-rose-50 px-2 py-0.5 text-sm font-semibold text-rose-700">
                Data Model
              </span>
            </div>

            <div className="space-y-4 text-base text-slate-700">
              <div>
                <div className="mb-1 font-bold text-slate-700">3.1 任务（Task）</div>
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
                        <td className="px-3 py-2 font-mono text-base">taskId</td>
                        <td className="px-3 py-2">string</td>
                        <td className="px-3 py-2">是（后端生成）</td>
                        <td className="px-3 py-2">系统主键，建议使用 32 字符以内的无前导/后缀空格的字符串。</td>
                      </tr>
                      <tr className="border-t border-slate-100 bg-white/60">
                        <td className="px-3 py-2 font-mono text-base">title</td>
                        <td className="px-3 py-2">string</td>
                        <td className="px-3 py-2">是</td>
                        <td className="px-3 py-2">任务标题，小于等于 30 个汉字；终端卡片标题直接使用该字段。</td>
                      </tr>
                      <tr className="border-t border-slate-100">
                        <td className="px-3 py-2 font-mono text-base">description</td>
                        <td className="px-3 py-2">string</td>
                        <td className="px-3 py-2">否</td>
                        <td className="px-3 py-2">任务说明文案，最长 100 个汉字；前端需要展示省略号时使用尾部截断。</td>
                      </tr>
                      <tr className="border-t border-slate-100 bg-white/60">
                        <td className="px-3 py-2 font-mono text-base">type</td>
                        <td className="px-3 py-2">enum</td>
                        <td className="px-3 py-2">是</td>
                        <td className="px-3 py-2">取值示例：pose_game / quiz / checkin / custom；前后端需严格对齐枚举值字符串。</td>
                      </tr>
                      <tr className="border-t border-slate-100">
                        <td className="px-3 py-2 font-mono text-base">triggerEventKey</td>
                        <td className="px-3 py-2">string</td>
                        <td className="px-3 py-2">是</td>
                        <td className="px-3 py-2">与终端 / 游戏上报事件的 key 完全一致的字符串，最长 64 字符；相同 key 只能绑定一个「主要任务」。</td>
                      </tr>
                      <tr className="border-t border-slate-100 bg-white/60">
                        <td className="px-3 py-2 font-mono text-base">maxTimesPerDay</td>
                        <td className="px-3 py-2">number</td>
                        <td className="px-3 py-2">是</td>
                        <td className="px-3 py-2">每个学生每天最多计入次数，取值区间 1–20；前端需校验数值范围，默认 1。</td>
                      </tr>
                      <tr className="border-t border-slate-100">
                        <td className="px-3 py-2 font-mono text-base">scope</td>
                        <td className="px-3 py-2">object</td>
                        <td className="px-3 py-2">是</td>
                        <td className="px-3 py-2">适用范围，包含 schoolId（必填）、gradeIds（可选）、classIds（可选）。前端需校验至少指定到「学校」级。</td>
                      </tr>
                      <tr className="border-t border-slate-100 bg-white/60">
                        <td className="px-3 py-2 font-mono text-base">status</td>
                        <td className="px-3 py-2">enum</td>
                        <td className="px-3 py-2">是</td>
                        <td className="px-3 py-2">取值：draft（草稿）/ published（已发布）/ archived（已归档）；新建默认 draft，仅在 published 状态会被终端拉取。</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </section>

          {/* 四、推送机制 & 版本控制 */}
          <section className="rounded-2xl bg-white p-5 ring-1 ring-slate-200">
            <div className="mb-3 flex items-center justify-between gap-2">
              <h2 className="text-xl font-black text-slate-900">四、推送机制 &amp; 版本控制</h2>
              <span className="rounded-full bg-indigo-50 px-2 py-0.5 text-sm font-semibold text-indigo-700">
                Sync &amp; Versioning
              </span>
            </div>

            <div className="grid gap-4 text-base text-slate-700 sm:grid-cols-2">
              <div className="space-y-1.5 rounded-xl bg-slate-50 p-3 ring-1 ring-slate-100">
                <div className="text-lg font-bold text-slate-700">4.1 推送策略</div>
                <ul className="space-y-2 leading-relaxed text-base">
                  <li>● 支持「立即推送」和「定时推送」两种模式。</li>
                  <li>● 任务修改后，仅在「发布」后才会生成新版本并下发。</li>
                  <li>● 推送范围粒度：学校 / 校区 / 具体终端设备。</li>
                </ul>
              </div>
              <div className="space-y-1.5 rounded-xl bg-slate-50 p-3 ring-1 ring-slate-100">
                <div className="text-lg font-bold text-slate-700">4.2 版本控制</div>
                <ul className="space-y-2 leading-relaxed text-base">
                  <li>● 每条配置记录维护 version（自增整数）。</li>
                  <li>● 终端在拉取时携带当前 version，后台仅返回增量变更。</li>
                  <li>● 支持在后台查看历史版本、对比差异并一键回滚。</li>
                </ul>
              </div>
            </div>
          </section>

          {/* 五、数据一致性 & 审计 */}
          <section className="rounded-2xl bg-white p-5 ring-1 ring-slate-200">
            <div className="mb-3 flex items-center justify-between gap-2">
              <h2 className="text-xl font-black text-slate-900">五、数据一致性 &amp; 审计</h2>
              <span className="rounded-full bg-slate-900 px-2 py-0.5 text-sm font-semibold text-slate-50">
                Consistency
              </span>
            </div>
            <div className="grid gap-4 text-base text-slate-700 sm:grid-cols-2">
              <div className="space-y-1.5 rounded-xl bg-slate-50 p-3 ring-1 ring-slate-100">
                <div className="text-lg font-bold text-slate-700">5.1 与终端 / 游戏侧对齐</div>
                <ul className="space-y-2 leading-relaxed text-base">
                  <li>● triggerEventKey 为约束字段，游戏侧必须严格按配置上报。</li>
                  <li>● 删除任务时，如已被终端引用，则禁止直接删除，仅允许「下线」。</li>
                  <li>
                    <span className="font-semibold text-red-600">
                      ● 注意：每次发布后，需在「终端信息 / 终端列表」中按学校、终端 ID 抽样比对本次任务配置与终端实际展示内容（标题、可用任务数量等），用于确认推送是否成功生效。
                    </span>
                  </li>
                </ul>
              </div>
              <div className="space-y-1.5 rounded-xl bg-slate-50 p-3 ring-1 ring-slate-100">
                <div className="text-lg font-bold text-slate-700">5.2 操作日志 &amp; 权限</div>
                <ul className="space-y-2 leading-relaxed text-base">
                  <li>● 每次发布记录操作者、时间、变更摘要。</li>
                  <li>● 区分「查看」「编辑」「发布」权限角色，避免误操作影响线上终端。</li>
                </ul>
              </div>
            </div>
          </section>

          {/* 六、业务流程图 */}
          <section className="rounded-2xl bg-white p-5 ring-1 ring-slate-200">
            <div className="mb-3 flex items-center justify-between gap-2">
              <h2 className="text-xl font-black text-slate-900">六、业务流程图（配置后台）</h2>
              <span className="rounded-full bg-slate-50 px-2 py-0.5 text-sm font-semibold text-slate-700">
                Flow Diagram
              </span>
            </div>
            <div className="overflow-x-auto">
              <div className="flex min-w-[720px] items-stretch gap-3 text-base text-slate-700">
                {[
                  '登录配置后台\n选择学校 / 学段',
                  '进入任务总览页\n选择或新建任务',
                  '配置任务表单\n绑定触发事件',
                  '侧边实时预览\n终端展示效果',
                  '保存草稿\n检查配置关系',
                  '发布配置\n生成版本号',
                  '推送到终端\n生效并写入日志',
                ].map((label, idx, arr) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="flex h-24 w-40 flex-col justify-between rounded-xl bg-slate-50 p-3 text-sm ring-1 ring-slate-200">
                      <div className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-emerald-600 text-sm font-bold text-white">
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

          {/* 七、业务功能角色时序图 */}
          <section className="rounded-2xl bg-white p-5 ring-1 ring-slate-200">
            <div className="mb-3 flex items-center justify-between gap-2">
              <h2 className="text-xl font-black text-slate-900">七、业务功能角色时序图（配置后台）</h2>
              <span className="rounded-full bg-slate-900 px-2 py-0.5 text-sm font-semibold text-slate-50">
                Sequence Diagram
              </span>
            </div>
            <div className="overflow-x-auto">
              <div className="min-w-[720px] rounded-xl bg-slate-50 p-3 ring-1 ring-slate-100">
                <div className="mb-2 grid grid-cols-3 gap-2 text-lg font-bold text-slate-700">
                  <div className="text-center">运营 / 教研 Operator</div>
                  <div className="text-center">配置后台 ConfigAdmin</div>
                  <div className="text-center">学校终端 Terminal</div>
                </div>
                <div className="space-y-1.5 text-base text-slate-700">
                  <div className="grid grid-cols-3 gap-2">
                    <div className="text-center">登录系统</div>
                    <div className="text-center">校验权限并加载任务列表</div>
                    <div />
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="text-center">新建 / 编辑任务</div>
                    <div className="text-center">展示配置表单并校验字段</div>
                    <div />
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="text-center">提交草稿</div>
                    <div className="text-center">写入配置表（draft 状态）</div>
                    <div />
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="text-center">点击发布</div>
                    <div className="text-center">生成版本号，写入操作日志</div>
                    <div />
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <div />
                    <div className="text-center">配置拉取接口生效新版本</div>
                    <div className="text-center">下次拉取时获取最新任务配置并应用</div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 八、测试用例设计 */}
          <section className="rounded-2xl bg-white p-5 ring-1 ring-slate-200">
            <div className="mb-3 flex items-center justify-between gap-2">
              <h2 className="text-xl font-black text-slate-900">八、测试用例设计（配置后台）</h2>
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
                        <td className="px-3 py-2 align-top font-mono text-sm">TC-ADM-001</td>
                        <td className="px-3 py-2 align-top">功能 · 新建任务并发布</td>
                        <td className="px-3 py-2 align-top">账号具备「编辑 + 发布」权限。</td>
                        <td className="px-3 py-2 align-top">
                          1）进入任务模块；<br />
                          2）填写合法的标题、类型和适用范围；<br />
                          3）保存草稿；<br />
                          4）点击发布。
                        </td>
                        <td className="px-3 py-2 align-top">
                          任务保存成功并生成 version=1；列表显示状态为「已发布」；终端在下一次拉取配置时可看到该任务。
                        </td>
                      </tr>
                      <tr className="border-t border-slate-100 bg-white/60">
                        <td className="px-3 py-2 align-top font-mono text-sm">TC-ADM-002</td>
                        <td className="px-3 py-2 align-top">功能 · 配置任务并关联终端事件</td>
                        <td className="px-3 py-2 align-top">已有至少一个终端事件 key。</td>
                        <td className="px-3 py-2 align-top">
                          1）新建任务；<br />
                          2）选择 type=pose_game；<br />
                          3）在 triggerEventKey 下拉中选择对应事件；<br />
                          4）设置 maxTimesPerDay=3；<br />
                          5）发布。
                        </td>
                        <td className="px-3 py-2 align-top">
                          表单校验通过；后端存储的 triggerEventKey 与选择值一致；终端完成对应事件后数据中心能正确识别任务完成。
                        </td>
                      </tr>
                      <tr className="border-t border-slate-100">
                        <td className="px-3 py-2 align-top font-mono text-sm">TC-ADM-003</td>
                        <td className="px-3 py-2 align-top">功能 · 历史版本对比与回滚</td>
                        <td className="px-3 py-2 align-top">某任务已发布多于 2 个版本。</td>
                        <td className="px-3 py-2 align-top">
                          1）进入任务详情页；<br />
                          2）打开历史版本；<br />
                          3）选择任意两版执行差异对比；<br />
                          4）选择一个旧版本执行回滚。
                        </td>
                        <td className="px-3 py-2 align-top">
                          差异对比中字段变更展示正确；回滚后产生新版本号，终端后续拉取到回滚后的配置。
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
                        <td className="px-3 py-2 align-top font-mono text-sm">TC-ADM-101</td>
                        <td className="px-3 py-2 align-top">异常 · 文案长度边界</td>
                        <td className="px-3 py-2 align-top">—</td>
                        <td className="px-3 py-2 align-top">
                          在任务标题字段输入恰好 30 个汉字；再尝试继续输入。
                        </td>
                        <td className="px-3 py-2 align-top">
                          达到上限时仍保存成功；超出上限时前端禁止继续输入；后端二次校验防止绕过。
                        </td>
                      </tr>
                      <tr className="border-t border-slate-100 bg-white/60">
                        <td className="px-3 py-2 align-top font-mono text-sm">TC-ADM-102</td>
                        <td className="px-3 py-2 align-top">异常 · 非法枚举与超范围数值</td>
                        <td className="px-3 py-2 align-top">—</td>
                        <td className="px-3 py-2 align-top">
                          构造非法枚举值（如 type=&quot;unknown&quot;）或 maxTimesPerDay=0/100 等请求提交。
                        </td>
                        <td className="px-3 py-2 align-top">
                          后端返回参数错误并提示字段名和原因；数据库中不会产生非法记录。
                        </td>
                      </tr>
                      <tr className="border-t border-slate-100">
                        <td className="px-3 py-2 align-top font-mono text-sm">TC-ADM-103</td>
                        <td className="px-3 py-2 align-top">异常 · 高并发发布同一配置</td>
                        <td className="px-3 py-2 align-top">—</td>
                        <td className="px-3 py-2 align-top">
                          两个账号同时对同一任务发布，或在极短时间内重复点击「发布」。
                        </td>
                        <td className="px-3 py-2 align-top">
                          仅有一个版本被视为最新有效版本；不存在版本号跳跃或重复；操作日志能区分两个操作者。
                        </td>
                      </tr>
                      <tr className="border-t border-slate-100 bg-white/60">
                        <td className="px-3 py-2 align-top font-mono text-sm">TC-ADM-104</td>
                        <td className="px-3 py-2 align-top">异常 · 删除被引用任务</td>
                        <td className="px-3 py-2 align-top">—</td>
                        <td className="px-3 py-2 align-top">
                          尝试删除一个已被终端引用的已发布任务。
                        </td>
                        <td className="px-3 py-2 align-top">
                          系统阻止硬删除，提示「有下游引用，请先解除引用或下线」；仅允许将状态改为「下线」。
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
