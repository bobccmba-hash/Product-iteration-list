import Link from 'next/link'

export default function PrdTerminalPage() {
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
          <div className="inline-flex items-center gap-2 rounded-full bg-indigo-100 px-2.5 py-1 text-sm font-bold text-indigo-700 ring-1 ring-indigo-200">
            <span className="text-sm">📱</span>
            <span>前台终端 · 学校竖屏设备</span>
          </div>
          <h1 className="text-3xl font-black tracking-tight sm:text-3xl">
            学校终端 · 完整前端流程 PRD
          </h1>
          <p className="max-w-3xl text-lg leading-relaxed text-slate-600 sm:text-[15px]">
            本文档定义部署在学校的竖屏终端（9:16）的人脸识别登录、任务展示、随机游戏选择、互动反馈和学习之星排行榜全链路前端体验。
            主要面向前端 / 后端开发、产品、设计，用于评审交互流程与字段规则。
          </p>
          <div className="flex flex-wrap gap-2 text-sm text-slate-500">
            <span className="rounded-full bg-white px-2 py-0.5 ring-1 ring-slate-200">版本：v1.0</span>
            <span className="rounded-full bg-white px-2 py-0.5 ring-1 ring-slate-200">适配分辨率：1080 × 1920（竖屏）</span>
            <span className="rounded-full bg-white px-2 py-0.5 ring-1 ring-slate-200">更新时间：2026-03-10</span>
          </div>
        </header>

        <div className="space-y-6">
          {/* 一、业务背景 & 目标 */}
          <section className="rounded-2xl bg-white p-5 ring-1 ring-slate-200">
            <div className="mb-3 flex items-center justify-between gap-2">
              <h2 className="text-base font-black text-slate-900">一、业务背景 &amp; 目标</h2>
              <span className="rounded-full bg-slate-900 px-2 py-0.5 text-sm font-semibold text-slate-50">
                Business Context
              </span>
            </div>
            <div className="grid gap-4 text-sm text-slate-700 sm:grid-cols-2">
              <div className="space-y-2">
                <h3 className="text-sm font-bold uppercase tracking-wide text-slate-500">
                  1.1 背景
                </h3>
                <ul className="space-y-1 leading-relaxed">
                  <li>● 学校已有一定的教学评估与活动体系，但学生感知较弱、缺乏持续反馈。</li>
                  <li>● 线下终端（大屏 / 竖屏）更多被当作宣传展示，难以形成高频交互行为。</li>
                  <li>● 平台希望通过趣味互动 + 可视化成长记录，让学生“看到自己的进步”。</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h3 className="text-sm font-bold uppercase tracking-wide text-slate-500">
                  1.2 目标（终端侧）
                </h3>
                <ul className="space-y-1 leading-relaxed">
                  <li>● 降低使用门槛：学生无需登录账号，仅通过人脸识别即可进入体验。</li>
                  <li>● 强化成长激励：任务和学习之星都在终端上可视化呈现。</li>
                  <li>● 提升活跃频次：通过轻量交互游戏与即时反馈，形成高频使用习惯。</li>
                </ul>
              </div>
            </div>
          </section>

          {/* 二、角色 & 使用场景 */}
          <section className="rounded-2xl bg-white p-5 ring-1 ring-slate-200">
            <div className="mb-3 flex items-center justify-between gap-2">
              <h2 className="text-base font-black text-slate-900">二、角色 &amp; 使用场景</h2>
              <span className="rounded-full bg-indigo-50 px-2 py-0.5 text-sm font-semibold text-indigo-700">
                Personas
              </span>
            </div>
            <div className="grid gap-4 text-sm text-slate-700 sm:grid-cols-3">
              <div className="space-y-1.5 rounded-xl bg-slate-50 p-3">
                <div className="text-base font-bold text-slate-600">学生（核心使用者）</div>
                <ul className="space-y-1 leading-relaxed">
                  <li>● 在课间、午休或活动时间，刷脸进入终端。</li>
                  <li>● 查看当前任务进度。</li>
                  <li>● 参与 1 次轻量互动游戏，获得成长反馈。</li>
                </ul>
              </div>
              <div className="space-y-1.5 rounded-xl bg-slate-50 p-3">
                <div className="text-base font-bold text-slate-600">老师 / 班主任</div>
                <ul className="space-y-1 leading-relaxed">
                  <li>● 引导学生在指定时间段前往终端参与活动。</li>
                  <li>● 通过终端学习之星榜单做课堂激励。</li>
                </ul>
              </div>
              <div className="space-y-1.5 rounded-xl bg-slate-50 p-3">
                <div className="text-base font-bold text-slate-600">运营 / 管理员</div>
                <ul className="space-y-1 leading-relaxed">
                  <li>● 确认终端已成功拉取最新任务配置。</li>
                  <li>● 通过数据中心排查学生反馈与终端状态。</li>
                </ul>
              </div>
            </div>
          </section>

          {/* 三、整体流程（新 / 老 / 无成长系统） */}
          <section className="rounded-2xl bg-white p-5 ring-1 ring-slate-200">
            <div className="mb-3 flex items-center justify-between gap-2">
              <h2 className="text-base font-black text-slate-900">
                三、整体流程（新用户 / 老用户 / 无成长系统）
              </h2>
              <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-sm font-semibold text-emerald-700">
                User Flows
              </span>
            </div>

            <div className="mb-4 grid gap-3 text-sm text-slate-700 sm:grid-cols-3">
              <div className="space-y-1.5 rounded-xl bg-emerald-50 p-3 ring-1 ring-emerald-100">
                <div className="text-sm font-bold text-emerald-800">场景 A：新用户（首次识别）</div>
                <ol className="space-y-1 leading-relaxed">
                  <li>1）人脸捕捉成功 → 识别为“新用户”。</li>
                  <li>2）进入身份确认 / 信息补全页（姓名+班级）。</li>
                  <li>3）生成学生档案 &amp; 关联学校 / 终端。</li>
                  <li>4）展示当前任务概览。</li>
                  <li>5）系统随机抽选游戏，进入互动。</li>
                  <li>6）结束后展示成长反馈 &amp; 学习之星榜单。</li>
                </ol>
              </div>
              <div className="space-y-1.5 rounded-xl bg-indigo-50 p-3 ring-1 ring-indigo-100">
                <div className="text-sm font-bold text-indigo-800">场景 B：老用户（再次识别）</div>
                <ol className="space-y-1 leading-relaxed">
                  <li>1）人脸捕捉成功 → 命中已有学生档案。</li>
                  <li>2）展示“欢迎回来 + 昵称/姓名”欢迎页。</li>
                  <li>3）展示当前任务进度。</li>
                  <li>4）系统随机抽选游戏，进入互动。</li>
                  <li>5）更新成长记录，展示结果反馈。</li>
                  <li>6）可滑动查看学习之星榜单。</li>
                </ol>
              </div>
              <div className="space-y-1.5 rounded-xl bg-slate-50 p-3 ring-1 ring-slate-200">
                <div className="text-base font-bold text-slate-700">场景 C：无成长系统（简化模式）</div>
                <ol className="space-y-1 leading-relaxed">
                  <li>1）人脸捕捉成功 → 不创建成长档案。</li>
                  <li>2）展示简单欢迎页（不出现任务信息）。</li>
                  <li>3）系统随机抽选游戏，直接进入互动。</li>
                  <li>4）展示简单互动结果（如“今日参与成功”）。</li>
                </ol>
              </div>
            </div>

            <div className="rounded-xl bg-slate-50 p-3 text-lg leading-relaxed text-slate-600 ring-1 ring-slate-100">
              <div className="mb-1 font-bold text-slate-700">终端状态机（抽象）</div>
              <p>
                Idle（待机广告 / 引导语） → Detecting（人脸捕捉） → Identifying（识别中） →{' '}
                <span className="font-semibold">NewUserOnboarding</span> /{' '}
                <span className="font-semibold">ReturningUserWelcome</span> /{' '}
                <span className="font-semibold">LiteFlow</span> → TaskOverview → GameSelect（随机抽选） → Game → ResultFeedback → StarRanking（可选） → BackToIdle
              </p>
            </div>
          </section>

          {/* 四、关键页面 & 交互说明 */}
          <section className="rounded-2xl bg-white p-5 ring-1 ring-slate-200">
            <div className="mb-3 flex items-center justify-between gap-2">
              <h2 className="text-base font-black text-slate-900">四、关键页面 &amp; 交互说明</h2>
              <span className="rounded-full bg-amber-50 px-2 py-0.5 text-sm font-semibold text-amber-700">
                Screens &amp; UX
              </span>
            </div>

            <div className="space-y-4 text-sm text-slate-700">
              <div className="rounded-xl bg-slate-50 p-3 ring-1 ring-slate-100">
                <div className="mb-1 flex items-center justify-between gap-2">
                  <div className="text-base font-bold text-slate-700">4.1 待机 &amp; 人脸捕捉页</div>
                  <span className="rounded-full bg-slate-900 px-2 py-0.5 text-sm font-semibold text-slate-50">
                    必选
                  </span>
                </div>
                <ul className="space-y-1 leading-relaxed">
                  <li>● 背景：全屏学校/品牌视觉；中间区域预留相机预览窗（16:9 或正方形），下方提示“站到虚线框内，抬头看屏幕”。</li>
                  <li>● 交互：无需点击，进入检测范围即自动开始捕捉；捕捉到稳定人脸后 0.5s 内切换到识别中状态。</li>
                  <li>● 超时：10s 未捕捉到人脸 → 回到待机状态，播放轻量动画。</li>
                </ul>
              </div>

              <div className="rounded-xl bg-slate-50 p-3 ring-1 ring-slate-100">
                <div className="mb-1 flex items-center justify-between gap-2">
                  <div className="text-base font-bold text-slate-700">4.2 欢迎页（新 / 老用户）</div>
                  <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-sm font-semibold text-emerald-700">
                    动效优先
                  </span>
                </div>
                <ul className="space-y-1 leading-relaxed">
                  <li>● 新用户：主文案“欢迎来到成长空间”，副文案“我们会帮你记录每一次努力”。展示学生头像占位+“填写姓名/班级”的轻量表单。</li>
                  <li>● 老用户：主文案“欢迎回来，&#123;昵称&#125;”。</li>
                  <li>● 停留：3s 自动进入任务概览页；如有表单未填写则需学生点“下一步”。</li>
                </ul>
              </div>

              <div className="rounded-xl bg-slate-50 p-3 ring-1 ring-slate-100">
                <div className="mb-1 flex items-center justify-between gap-2">
                  <div className="text-base font-bold text-slate-700">4.3 任务概览页</div>
                  <span className="rounded-full bg-indigo-50 px-2 py-0.5 text-sm font-semibold text-indigo-700">
                    信息架构
                  </span>
                </div>
                <ul className="space-y-1 leading-relaxed">
                  <li>● 展示当前任务卡片，含标题、进度条、简要描述。</li>
                  <li>● 底部有「开始挑战」主行动按钮，5秒后自动进入游戏抽选。</li>
                  <li>● 说明：本页只展示任务摘要，以「无阅读门槛」为设计原则。</li>
                </ul>
              </div>

              <div className="rounded-xl bg-slate-50 p-3 ring-1 ring-slate-100">
                <div className="mb-1 flex items-center justify-between gap-2">
                  <div className="text-base font-bold text-slate-700">4.4 游戏随机抽选页</div>
                  <span className="rounded-full bg-purple-50 px-2 py-0.5 text-sm font-semibold text-purple-700">
                    动效优先
                  </span>
                </div>
                <ul className="space-y-1 leading-relaxed">
                  <li>● 背景展示海量游戏资源流动，营造「游戏库」氛围感。</li>
                  <li>● 从游戏库随机抽取 6 款候选游戏，逐一弹出聚合到前景区域。</li>
                  <li>● 焦点在候选项间快速跳转（先快后慢），最终锁定 1 款。</li>
                  <li>● 选定游戏明显放大发光，其余弱化退场，底部进度条倒计时后自动进入。</li>
                </ul>
              </div>

              <div className="rounded-xl bg-slate-50 p-3 ring-1 ring-slate-100">
                <div className="mb-1 flex items-center justify-between gap-2">
                  <div className="text-base font-bold text-slate-700">4.5 游戏互动页 &amp; 实时反馈</div>
                  <span className="rounded-full bg-purple-50 px-2 py-0.5 text-sm font-semibold text-purple-700">
                    与 AR Demo 协议对齐
                  </span>
                </div>
                <ul className="space-y-1 leading-relaxed">
                  <li>● 左/右侧：展示任务标题和简单规则。</li>
                  <li>● 中心：全屏摄像头画面 + 关键视觉元素（姿态骨骼、提示箭头等）。</li>
                  <li>● 底部：进度条 / 回合数指示，简单文字鼓励。</li>
                  <li>● 数据采集：每次互动至少上报 1 条“任务完成事件”，包含学生 id、任务 id、终端 id、得分等。</li>
                </ul>
              </div>

              <div className="rounded-xl bg-slate-50 p-3 ring-1 ring-slate-100">
                <div className="mb-1 flex items-center justify-between gap-2">
                  <div className="text-base font-bold text-slate-700">4.6 成长反馈 &amp; 学习之星</div>
                  <span className="rounded-full bg-amber-50 px-2 py-0.5 text-sm font-semibold text-amber-700">
                    结束动效
                  </span>
                </div>
                <ul className="space-y-1 leading-relaxed">
                  <li>● 第一屏：本次挑战结果（如完成/未完成、得分、解锁的勋章碎片），必须用大字号+动效突出“完成”。</li>
                  <li>● 第二屏（可滑动或自动轮播）：当天 / 本周学习之星榜单，清楚标出当前学生的名次或参与记录。</li>
                  <li>● 自动回退：停留 10~15s 后自动退回待机状态；如有其他学生接近摄像头，可提前重新进入识别流程。</li>
                </ul>
              </div>
            </div>
          </section>

          {/* 五、字段定义 & 数据约束（终端侧） */}
          <section className="rounded-2xl bg-white p-5 ring-1 ring-slate-200">
            <div className="mb-3 flex items-center justify-between gap-2">
              <h2 className="text-base font-black text-slate-900">五、字段定义 &amp; 数据约束（终端侧）</h2>
              <span className="rounded-full bg-rose-50 px-2 py-0.5 text-sm font-semibold text-rose-700">
                Data Contract
              </span>
            </div>

            <div className="space-y-4 text-sm text-slate-700">
              <div>
                <div className="mb-1 font-bold text-slate-700">5.1 学生基础信息（终端本地缓存）</div>
                <div className="overflow-hidden rounded-xl border border-slate-100 bg-slate-50">
                  <table className="min-w-full border-collapse text-left">
                    <thead className="bg-slate-100 text-sm uppercase tracking-wide text-slate-500">
                      <tr>
                        <th className="px-3 py-2 font-semibold">字段</th>
                        <th className="px-3 py-2 font-semibold">类型</th>
                        <th className="px-3 py-2 font-semibold">必填</th>
                        <th className="px-3 py-2 font-semibold">说明</th>
                      </tr>
                    </thead>
                    <tbody className="text-sm">
                      <tr className="border-t border-slate-100">
                        <td className="px-3 py-2 font-mono text-sm text-slate-700">studentId</td>
                        <td className="px-3 py-2 text-slate-600">string</td>
                        <td className="px-3 py-2 text-slate-600">是</td>
                        <td className="px-3 py-2 text-slate-600">
                          学生唯一 id，由后台生成，终端只负责展示与上报；长度不超过 64 字符，只包含字母、数字和中划线。
                        </td>
                      </tr>
                      <tr className="border-t border-slate-100 bg-white/60">
                        <td className="px-3 py-2 font-mono text-sm text-slate-700">name</td>
                        <td className="px-3 py-2 text-slate-600">string</td>
                        <td className="px-3 py-2 text-slate-600">是</td>
                        <td className="px-3 py-2 text-slate-600">
                          学生姓名或昵称，最长 10 个汉字；终端展示时超出部分用尾部省略号处理。
                        </td>
                      </tr>
                      <tr className="border-t border-slate-100">
                        <td className="px-3 py-2 font-mono text-sm text-slate-700">className</td>
                        <td className="px-3 py-2 text-slate-600">string</td>
                        <td className="px-3 py-2 text-slate-600">是</td>
                        <td className="px-3 py-2 text-slate-600">
                          班级名称（如“3 年级 2 班”），最长 20 个汉字，用于欢迎文案和榜单展示。
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div>
                <div className="mb-1 font-bold text-slate-700">5.2 任务 / 目标 / 勋章摘要数据（终端展示用）</div>
                <p className="mb-1 text-slate-600">
                  终端不负责复杂计算，只消费后台下发的聚合结果字段。以下为展示所需的最小字段集合：
                </p>
                <div className="overflow-hidden rounded-xl border border-slate-100 bg-slate-50">
                  <table className="min-w-full border-collapse text-left">
                    <thead className="bg-slate-100 text-sm uppercase tracking-wide text-slate-500">
                      <tr>
                        <th className="px-3 py-2 font-semibold">字段</th>
                        <th className="px-3 py-2 font-semibold">类型</th>
                        <th className="px-3 py-2 font-semibold">必填</th>
                        <th className="px-3 py-2 font-semibold">说明</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-t border-slate-100">
                        <td className="px-3 py-2 font-mono text-sm">currentTask.title</td>
                        <td className="px-3 py-2">string</td>
                        <td className="px-3 py-2">是</td>
                        <td className="px-3 py-2">
                          当前任务标题，最长 20 个汉字；终端任务卡主标题。
                        </td>
                      </tr>
                      <tr className="border-t border-slate-100 bg-white/60">
                        <td className="px-3 py-2 font-mono text-sm">currentTask.description</td>
                        <td className="px-3 py-2">string</td>
                        <td className="px-3 py-2">否</td>
                        <td className="px-3 py-2">
                          简要描述，最长 60 个汉字；超出时前端需截断并加省略号。
                        </td>
                      </tr>
                      <tr className="border-t border-slate-100">
                        <td className="px-3 py-2 font-mono text-sm">currentTask.canStart</td>
                        <td className="px-3 py-2">boolean</td>
                        <td className="px-3 py-2">是</td>
                        <td className="px-3 py-2">
                          是否可立即开始任务；为 false 时终端按钮文案显示“暂不可用”，并不可点击。
                        </td>
                      </tr>
                      <tr className="border-t border-slate-100 bg-white/60">
                        <td className="px-3 py-2 font-mono text-sm">currentTask.rewardPreview</td>
                        <td className="px-3 py-2">string</td>
                        <td className="px-3 py-2">否</td>
                        <td className="px-3 py-2">
                          预期奖励文案，例如“完成可解锁 ×× 勋章碎片”，最长 40 个汉字。
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </section>

          {/* 六、状态 & 边界情况处理 */}
          <section className="rounded-2xl bg-white p-5 ring-1 ring-slate-200">
            <div className="mb-3 flex items-center justify-between gap-2">
              <h2 className="text-base font-black text-slate-900">六、状态 &amp; 边界情况</h2>
              <span className="rounded-full bg-slate-900 px-2 py-0.5 text-sm font-semibold text-slate-50">
                Edge Cases
              </span>
            </div>

            <div className="grid gap-4 text-sm text-slate-700 sm:grid-cols-2">
              <div className="space-y-1.5 rounded-xl bg-slate-50 p-3 ring-1 ring-slate-100">
                <div className="text-base font-bold text-slate-700">6.1 网络异常</div>
                <ul className="space-y-1 leading-relaxed">
                  <li>● 识别阶段网络中断：仍可完成“简化模式”互动，但不创建/更新成长档案；结束后展示“今日参与记录将稍后补充”。</li>
                  <li>● 互动结果上报失败：本地缓存 1 条“待同步事件”，交由“成长记录 · 同步监控”模块重试。</li>
                </ul>
              </div>
              <div className="space-y-1.5 rounded-xl bg-slate-50 p-3 ring-1 ring-slate-100">
                <div className="text-base font-bold text-slate-700">6.2 多人同时进入画面</div>
                <ul className="space-y-1 leading-relaxed">
                  <li>● 规则：仅识别离摄像头最近且位于中心区域的 1 个人。</li>
                  <li>● 提示：检测到多人时，显示“请一位同学站在中间，其余同学稍后再来”。</li>
                </ul>
              </div>
              <div className="space-y-1.5 rounded-xl bg-slate-50 p-3 ring-1 ring-slate-100">
                <div className="text-base font-bold text-slate-700">6.3 识别失败</div>
                <ul className="space-y-1 leading-relaxed">
                  <li>● 3 次识别失败 → 提供“以游客身份体验一次”的入口，只走简化游戏流程，不生成成长记录。</li>
                  <li>● 同时展示简单的姿势引导：“请正对屏幕，摘下口罩/帽子后再试一次”。</li>
                </ul>
              </div>
              <div className="space-y-1.5 rounded-xl bg-slate-50 p-3 ring-1 ring-slate-100">
                <div className="text-base font-bold text-slate-700">6.4 配置缺失 / 数据为空</div>
                <ul className="space-y-1 leading-relaxed">
                  <li>● 当天无任务配置：展示“今天是自由探索日，可以体验任意小游戏”，并自动选用默认任务模版。</li>
                  <li>● 无学习之星数据：隐藏榜单卡片，仅展示成长反馈。</li>
                </ul>
              </div>
            </div>
          </section>

          {/* 七、业务流程图（终端侧） */}
          <section className="rounded-2xl bg-white p-5 ring-1 ring-slate-200">
            <div className="mb-3 flex items-center justify-between gap-2">
              <h2 className="text-base font-black text-slate-900">七、业务流程图（终端侧）</h2>
              <span className="rounded-full bg-slate-50 px-2 py-0.5 text-sm font-semibold text-slate-700">
                Flow Diagram
              </span>
            </div>
            <div className="overflow-x-auto">
              <div className="flex min-w-[720px] items-stretch gap-3 text-sm text-slate-700">
                {[
                  '学生靠近终端\n进入识别区域',
                  '人脸捕捉\n新/老用户判定',
                  '欢迎页\n信息确认/欢迎回来',
                  '任务 / 目标 / 勋章\n概览展示',
                  '游戏互动\n姿态/任务完成',
                  '成长记录上报\n写入数据中心',
                  '成长反馈 & 学习之星\n结果展示',
                ].map((label, idx, arr) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="flex h-24 w-40 flex-col justify-between rounded-xl bg-slate-50 p-3 text-sm ring-1 ring-slate-200">
                      <div className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-slate-900 text-sm font-bold text-white">
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
            <p className="mt-3 text-sm leading-relaxed text-slate-500">
              上图可直接作为终端前台业务流程图的视觉参考：从“学生靠近终端”到“看到成长反馈与学习之星”的完整一条线。
            </p>
          </section>

          {/* 八、业务功能角色时序图（终端侧） */}
          <section className="rounded-2xl bg-white p-5 ring-1 ring-slate-200">
            <div className="mb-3 flex items-center justify-between gap-2">
              <h2 className="text-base font-black text-slate-900">八、业务功能角色时序图（终端侧）</h2>
              <span className="rounded-full bg-slate-900 px-2 py-0.5 text-sm font-semibold text-slate-50">
                Sequence Diagram
              </span>
            </div>
            <div className="overflow-x-auto">
              <div className="min-w-[720px] rounded-xl bg-slate-50 p-3 ring-1 ring-slate-100">
                <div className="mb-2 grid grid-cols-4 gap-2 text-base font-bold text-slate-700">
                  <div className="text-center">学生 Student</div>
                  <div className="text-center">终端 Terminal</div>
                  <div className="text-center">成长记录服务 Growth</div>
                  <div className="text-center">学习之星服务 Ranking</div>
                </div>
                <div className="space-y-1.5 text-sm text-slate-700">
                  <div className="grid grid-cols-4 gap-2">
                    <div className="text-center">靠近设备</div>
                    <div className="text-center">捕捉人脸并发起识别</div>
                    <div className="text-center">返回身份信息</div>
                    <div />
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    <div />
                    <div className="text-center">拉取任务 / 目标 / 勋章摘要</div>
                    <div className="text-center">返回聚合结果</div>
                    <div />
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    <div className="text-center">查看任务并做动作</div>
                    <div className="text-center">承载游戏互动 &amp; 实时反馈</div>
                    <div />
                    <div />
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    <div />
                    <div className="text-center">上报成长记录事件</div>
                    <div className="text-center">落库并计算积分增量</div>
                    <div className="text-center">更新学习之星积分 / 排名</div>
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    <div />
                    <div className="text-center">拉取最新成长摘要 &amp; 榜单</div>
                    <div className="text-center">返回摘要 + 榜单快照</div>
                    <div />
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    <div className="text-center">看到结果与名次</div>
                    <div className="text-center">展示成长反馈 &amp; 排行榜</div>
                    <div />
                    <div />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 九、测试用例设计（终端侧） */}
          <section className="rounded-2xl bg-white p-5 ring-1 ring-slate-200">
            <div className="mb-3 flex items-center justify-between gap-2">
              <h2 className="text-base font-black text-slate-900">九、测试用例设计（终端侧）</h2>
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
                        <td className="px-3 py-2 align-top font-mono text-sm">TC-TER-001</td>
                        <td className="px-3 py-2 align-top">功能 · 新用户流程</td>
                        <td className="px-3 py-2 align-top">
                          后端存在学校配置和至少 1 条任务配置；终端联网。
                        </td>
                        <td className="px-3 py-2 align-top">
                          1）学生首次靠近终端并完成识别；
                          2）填写姓名和班级；
                          3）查看任务概览页；
                          4）进入游戏并完成一次互动；
                          5）查看成长反馈和学习之星。
                        </td>
                        <td className="px-3 py-2 align-top">
                          创建新学生档案；任务/目标/勋章摘要展示正确；成长记录事件成功上报；反馈页显示本次成绩；学习之星名次与数据中心一致。
                        </td>
                      </tr>
                      <tr className="border-t border-slate-100 bg-white/60">
                        <td className="px-3 py-2 align-top font-mono text-sm">TC-TER-002</td>
                        <td className="px-3 py-2 align-top">功能 · 老用户流程</td>
                        <td className="px-3 py-2 align-top">
                          该学生已有 studentId 和成长记录；终端已拉取最新配置。
                        </td>
                        <td className="px-3 py-2 align-top">
                          1）学生再次靠近终端并识别成功；
                          2）查看欢迎页与任务概览；
                          3）完成一次任务并查看反馈。
                        </td>
                        <td className="px-3 py-2 align-top">
                          欢迎页显示“欢迎回来 + 昵称”；任务进度延续上次状态；新一次互动被追加到成长记录，终端展示的累计勋章/任务次数同步更新。
                        </td>
                      </tr>
                      <tr className="border-t border-slate-100">
                        <td className="px-3 py-2 align-top font-mono text-sm">TC-TER-003</td>
                        <td className="px-3 py-2 align-top">功能 · 简化模式</td>
                        <td className="px-3 py-2 align-top">
                          当前学校被配置为“无成长系统模式”。
                        </td>
                        <td className="px-3 py-2 align-top">
                          1）学生靠近终端触发识别；
                          2）进入简化欢迎页；
                          3）直接进入游戏；
                          4）查看结果页。
                        </td>
                        <td className="px-3 py-2 align-top">
                          不展示任务/目标/勋章信息；不创建学生档案；结果页仅展示简单参与成功文案；数据中心仅出现匿名统计（如有配置）。
                        </td>
                      </tr>
                      <tr className="border-t border-slate-100 bg-white/60">
                        <td className="px-3 py-2 align-top font-mono text-sm">TC-TER-004</td>
                        <td className="px-3 py-2 align-top">功能 · 榜单展示</td>
                        <td className="px-3 py-2 align-top">
                          数据中心已有学习之星榜单快照；终端已成功拉取。
                        </td>
                        <td className="px-3 py-2 align-top">
                          1）学生完成游戏；
                          2）在成长反馈页向后滑动或等待自动轮播；
                          3）查看榜单。
                        </td>
                        <td className="px-3 py-2 align-top">
                          榜单展示 Top N；当前学生如在榜，条目高亮且显示名次；如不在榜，底部展示“我的积分/参与情况”摘要。
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
                        <td className="px-3 py-2 align-top font-mono text-sm">TC-TER-101</td>
                        <td className="px-3 py-2 align-top">异常 · 多人识别</td>
                        <td className="px-3 py-2 align-top">终端相机正常，可容纳多人进入画面。</td>
                        <td className="px-3 py-2 align-top">
                          1）同时有 2 至 3 名学生站在屏幕前；
                          2）在不同距离反复进出识别框。
                        </td>
                        <td className="px-3 py-2 align-top">
                          仅选择中心区域且距离最近的 1 人作为有效识别目标；其余学生看到“请一位同学站在中间”的提示；不出现身份错配情况。
                        </td>
                      </tr>
                      <tr className="border-t border-slate-100 bg-white/60">
                        <td className="px-3 py-2 align-top font-mono text-sm">TC-TER-102</td>
                        <td className="px-3 py-2 align-top">异常 · 遮挡与极差光线</td>
                        <td className="px-3 py-2 align-top">现场可调节光线；学生可佩戴口罩、帽子等。</td>
                        <td className="px-3 py-2 align-top">
                          1）学生佩戴口罩、帽子或侧脸出现；
                          2）在极暗或逆光环境下尝试识别。
                        </td>
                        <td className="px-3 py-2 align-top">
                          连续 3 次识别失败后出现“以游客身份体验一次”入口；不会误识别成他人；游客模式不创建学生档案，也不累积成长记录。
                        </td>
                      </tr>
                      <tr className="border-t border-slate-100">
                        <td className="px-3 py-2 align-top font-mono text-sm">TC-TER-103</td>
                        <td className="px-3 py-2 align-top">异常 · 互动中断网</td>
                        <td className="px-3 py-2 align-top">
                          初始网络正常，可在测试中途关闭网络。
                        </td>
                        <td className="px-3 py-2 align-top">
                          1）学生完成识别并进入游戏；
                          2）在游戏结束前断开网络；
                          3）完成游戏并退出。
                        </td>
                        <td className="px-3 py-2 align-top">
                          体验流程不被打断；终端将成长记录写入本地待同步队列；反馈页展示“记录将稍后补充”文案；同步监控页面可见对应未同步记录。
                        </td>
                      </tr>
                      <tr className="border-t border-slate-100 bg-white/60">
                        <td className="px-3 py-2 align-top font-mono text-sm">TC-TER-104</td>
                        <td className="px-3 py-2 align-top">异常 · 频繁刷任务</td>
                        <td className="px-3 py-2 align-top">某任务配置了合理的 maxTimesPerDay 值。</td>
                        <td className="px-3 py-2 align-top">
                          1）同一学生连续多次（例如 20 次）快速完成同一任务；
                          2）观察成长记录和学习之星积分变化。
                        </td>
                        <td className="px-3 py-2 align-top">
                          仅按 maxTimesPerDay 计入有效次数，其余被丢弃或标记为无效；学习之星积分不会无限上涨；同步监控无异常流量洪峰。
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

