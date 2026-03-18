import Link from 'next/link'

const flows = [
  { label: '场景 A：新用户（有成长系统）', cls: 'bg-emerald-50 ring-emerald-100 text-emerald-900', steps: ['welcome?type=new','create-success','pre-interaction','interaction-result','ranking-popup','growth-feedback'] },
  { label: '场景 B：老用户（有成长系统）', cls: 'bg-indigo-50 ring-indigo-100 text-indigo-900', steps: ['welcome?type=returning','challenge-preview','game-select?growth=true','growth-feedback'] },
  { label: '场景 C：无成长系统用户', cls: 'bg-slate-100 ring-slate-200 text-slate-700', steps: ['welcome?type=no-growth','game-select?growth=false','simple-result'] },
]

const routes = [
  ['欢迎页','/terminal/welcome','全部（type 参数）','3 秒自动跳转'],
  ['新用户创建成功页','/terminal/create-success','新用户','5 秒自动跳转'],
  ['挑战预览页','/terminal/challenge-preview','老用户有成长系统','5 秒自动跳转'],
  ['游戏抽选页','/terminal/game-select','全部（growth 参数）','动画结束自动跳转（~5 秒）'],
  ['互动前准备页','/terminal/pre-interaction','有成长系统','8 秒自动跳转'],
  ['互动结果页','/terminal/interaction-result','有成长系统','5 秒自动跳转'],
  ['排行榜弹出页','/terminal/ranking-popup','有成长系统','8 秒自动跳转'],
  ['成长反馈页','/terminal/growth-feedback','有成长系统','弹窗序列结束后自动（共 8 秒）'],
  ['简化结果页','/terminal/simple-result','无成长系统','弹窗序列结束后自动（共 4 秒）'],
  ['终端主页','/terminal/home','老用户有成长系统','10 秒无操作自动回欢迎页'],
  ['成长详情页','/terminal/growth-detail','有成长系统','10 秒无操作自动回欢迎页'],
]

const screens = [
  { id:'4.1', name:'欢迎页', route:'/terminal/welcome', tag:'全部场景', tc:'text-indigo-700', bg:'bg-indigo-50', pts:[
    '?type=new|returning|no-growth 决定文案与跳转目标；默认 type=new。',
    'new：主标题「欢迎来到成长挑战」，副标题「已为你创建成长身份」，3 秒后 → challenge-preview。',
    'returning：主标题「欢迎回来」，副标题「继续你的成长之旅」，3 秒后 → challenge-preview。',
    'no-growth：副标题「继续你的互动之旅」，3 秒后 → game-select?growth=false。',
    '展示：头像（avatarUrl，无则 👤 占位）、编号（code）、成长状态提示、脉冲点 + 「3秒后自动进入...」倒计时。',
    'PhoneFrame 包裹；渐变背景 indigo→purple→pink；跳转通过 window.location.href + setTimeout 实现。',
  ]},
  { id:'4.2', name:'新用户创建成功页', route:'/terminal/create-success', tag:'新用户', tc:'text-emerald-700', bg:'bg-emerald-50', pts:[
    '使用 mockNewStudent，不使用 PhoneFrame；全屏竖向居中布局。',
    '顶部 🎉 animate-bounce 大图标。中部白色卡片（bg-white/95）：头像（ring-4 emerald 描边）、编号（code）、标题「成长身份建立成功」、说明「你的成长记录已经开启啦」。',
    '下方文案：「✅ 已为你开启任务成长」+「每次互动都会记录进步」。',
    '按钮：「直接开始」→ /terminal/pre-interaction；「返回首页」→ /terminal/home。',
    '渐变背景 emerald→teal→cyan。',
  ]},
  { id:'4.3', name:'挑战预览页', route:'/terminal/challenge-preview', tag:'老用户有成长系统', tc:'text-purple-700', bg:'bg-purple-50', pts:[
    '使用 mockReturningStudent，PhoneFrame 包裹。',
    '顶部：头像 + 编号 + 副标题「你的成长挑战」。主标题「今天要完成的挑战」。',
    '任务卡（bg-white/95）：图标、名称、进度条（progress/total 百分比）、描述文字。',
    '5 秒后自动 → game-select?growth=true；底部脉冲点 + 「5秒后自动进入游戏选择...」提示。',
    '渐变背景 violet→purple→fuchsia。',
  ]},
  { id:'4.4', name:'游戏随机抽选页', route:'/terminal/game-select', tag:'全部场景', tc:'text-slate-700', bg:'bg-slate-100', pts:[
    '?growth=true → 锁定后跳 /terminal/growth-feedback；?growth=false → 跳 /terminal/simple-result。',
    'ALL_GAMES 12 款，页面初始化时 useState 随机取 6 款候选，刷新不重新随机。',
    '四阶段：① bg-flow（16 粒子漂浮 + 扫光，1.4s）→ ② gathering（候选卡每 180ms 逐个弹出）→ ③ spinning（前 22 次 70ms/格快转，后 10 次逐渐减速至 ~450ms/格）→ ④ locked（进度条 2.8s 后自动跳转）。',
    '锁定：选中卡 scale(1.09) + 彩色光晕；其余 opacity 0.22 + scale(0.91)。PhoneFrame 包裹；深色背景 #06080f。',
    '顶部标题随阶段切换：「海量游戏」→「抽取候选」→「随机选择…」→「今日游戏已锁定！」。',
  ]},
  { id:'4.5', name:'互动前准备页', route:'/terminal/pre-interaction', tag:'有成长系统', tc:'text-orange-700', bg:'bg-orange-50', pts:[
    '使用 mockReturningStudent，不使用 PhoneFrame；全屏竖向居中布局。',
    '顶部：头像 + 编号 + 「准备好了吗？」。主标题「这次挑战会帮助你成长」。',
    '当前任务卡（bg-white/95）：图标、名称、进度；progress === total-1 时追加「· 再来一次就完成啦！」橙色文字。',
    '当前目标卡（bg-white/90）：图标、名称、「阶段 N · 进度：X / Y」。',
    '勋章方向卡（bg-white/90）：下一枚图标、名称、unlockHint 提示。',
    '按钮：「开始互动」→ /terminal/interaction-result；「跳过」→ /terminal/home。渐变 amber→orange→red。',
  ]},
  { id:'4.6', name:'互动结果页', route:'/terminal/interaction-result', tag:'有成长系统', tc:'text-emerald-700', bg:'bg-emerald-50', pts:[
    '使用 mockReturningStudent + mockInteractionResult，不使用 PhoneFrame；全屏竖向居中布局。',
    '顶部：🎉 animate-bounce + 主标题「互动完成」。',
    '得分卡（bg-white/95）：「本次得分」标签 + 95 大字 + 「太棒了！」。',
    '卡牌卡（bg-white/95）：🎴 + cardsEarned 张数大字 + cardNames 胶囊标签列表。',
    '底部身份区（bg-white/10）：头像 + 编号 + 「本次成长记录已保存」。',
    '按钮：「查看学习之星排行榜 🏆」→ /terminal/ranking-popup。渐变 green→emerald→teal。',
  ]},
  { id:'4.7', name:'排行榜弹出页', route:'/terminal/ranking-popup', tag:'有成长系统', tc:'text-purple-700', bg:'bg-purple-50', pts:[
    '使用 mockRankingConfigs[0] + mockRankingRecords（前 topN 条）；独立全屏页，不使用 PhoneFrame。',
    '背景：深色星空渐变 indigo-900→purple-900→slate-900 + 20 个随机白点星星。',
    '入场：visible state 300ms 后置 true → 卡片 opacity/translateY/scale transition-all 500ms。',
    '离场：点击后 leaving state 置 true（反向过渡），400ms 后 window.location.href → /terminal/growth-feedback。',
    '前三名台阶式大卡（🥇居中最高 bg-yellow-50 ring-yellow-300 / 🥈左 bg-slate-100 / 🥉右 bg-orange-50）；4-7 名行列表，MOCK_MY_CODE 行高亮 bg-purple-50 ring-purple-300。',
    '「我的排名」固定区（bg-purple-600）：名次圆圈 + 编号 + 得分（原型固定：第 4 名，90 分，GH123）。底部 config.encourageText 鼓励文案。',
  ]},
  { id:'4.8', name:'成长反馈页', route:'/terminal/growth-feedback', tag:'有成长系统', tc:'text-rose-700', bg:'bg-rose-50', pts:[
    '使用 mockReturningStudent + mockInteractionResult + mockRankingConfigs[0] + mockRankingRecords；PhoneFrame 包裹。',
    '顶部卡：头像 + 编号 + 动态标题（completed → 「🎯 任务完成！」/ 未完成 → 「✨ 你又进步了一点」）。',
    '任务变化卡（bg-white/95）：图标、任务名、进度条（after/total），completed=true 追加「✅ 任务已完成」绿色标签。',
    '成长摘要卡（bg-white/90）：2×2 网格 — 累计互动、累计卡牌、兑换礼物 + 单独行最近互动时间。',
    '弹窗序列（useEffect + setTimeout 链）：score（2s）→ ranking（4s）→ cards（2s）→ 关闭。弹窗层 absolute inset-0 z-50，入场 scale-in 动画 0.3s。',
    '按钮：「继续挑战」→ /terminal/game-select；「查看完整成长记录 →」→ /terminal/growth-detail。渐变 rose→pink→fuchsia。',
  ]},
  { id:'4.9', name:'简化结果页', route:'/terminal/simple-result', tag:'无成长系统', tc:'text-slate-700', bg:'bg-slate-100', pts:[
    '使用 mockStudentWithoutGrowth + mockInteractionResult，PhoneFrame 包裹。',
    '顶部卡：头像 + 编号 + 标题「🎉 互动完成」。',
    '互动摘要卡（bg-white/95）：2×2 网格 — 累计互动（蓝）、累计卡牌（绿）、兑换礼物（紫）、本次得分 95（橙）+ 单独行最近互动时间。',
    '弹窗序列：score（2s）→ cards（2s）→ 关闭。无排行榜弹窗。弹窗层同 growth-feedback，scale-in 入场动画。',
    '按钮：「继续互动」→ /terminal/game-select。渐变 cyan→blue→indigo。',
  ]},
  { id:'4.10', name:'终端主页', route:'/terminal/home', tag:'老用户有成长系统', tc:'text-blue-700', bg:'bg-blue-50', pts:[
    '使用 mockReturningStudent，不使用 PhoneFrame；全屏竖向滚动布局。',
    '区域 1（身份欢迎，bg-white/10）：头像 + 「欢迎回来，小挑战家」+ 编号。',
    '区域 2（主互动入口，bg-white/95）：🎮 大图标 + 「准备好挑战了吗？」+ 「完成互动，推进你的成长任务」+ 「开始互动」→ /terminal/pre-interaction。',
    '区域 3（我的成长挑战，bg-white/10）：主卡任务（进度条）、副卡目标（阶段标签）、副卡勋章（已获得数 + 下一枚）。「查看详情 →」→ /terminal/growth-detail。',
    '区域 4（成长摘要，bg-white/10）：累计互动、累计卡牌、最近互动时间。渐变 sky→blue→indigo。',
  ]},
  { id:'4.11', name:'成长详情页', route:'/terminal/growth-detail', tag:'有成长系统', tc:'text-cyan-700', bg:'bg-cyan-50', pts:[
    '使用 mockReturningStudent，不使用 PhoneFrame；全屏竖向滚动布局。',
    '顶部身份卡（bg-white/10）：头像（h-20 w-20）+ 编号 + 标题「我的成长」。',
    '四 Tab 切换（横向滚动）：当前任务 / 当前目标 / 我的勋章 / 成长记录。激活 Tab bg-white text-blue-600 shadow；未激活 bg-white/20 text-white。',
    '当前任务 Tab（bg-white/95）：图标、名称、进度条（bg-blue-500→indigo-500）、任务说明（bg-blue-50）；progress===total 显示「🎉 任务已完成！」（bg-green-50）。',
    '当前目标 Tab（bg-white/95）：图标、名称、阶段标签（bg-blue-100）、进度条（bg-purple-500→pink-500）、目标说明（bg-purple-50）。',
    '我的勋章 Tab：总卡（bg-white/95）含 3×N 勋章格（已解锁 ⭐ bg-yellow-50 / 未解锁 🔒 bg-slate-100 opacity-30）+ 下一枚勋章副卡（bg-white/90，图标 opacity-50 + 名称 + unlockHint）。',
    '成长记录 Tab（bg-white/95）：累计互动次数、累计卡牌数、最近一次互动时间（独立行）。',
    '按钮：「去挑战」→ /terminal/pre-interaction；「返回首页」→ /terminal/home。渐变 cyan→blue→indigo。',
  ]},
]

const mockFields = [
  ['studentId','string','学生唯一 ID，后台生成'],
  ['code','string','展示编号，如 AB023（两位大写字母 + 三位数字）'],
  ['avatarUrl','string','头像 URL；未配置时显示 👤 占位符'],
  ['isNew','boolean','true = 首次识别，false = 再次识别'],
  ['hasGrowthSystem','boolean','true = 完整成长路径；false = 简化路径'],
  ['currentTask.name','string','当前任务名称'],
  ['currentTask.progress / total','number','任务当前进度 / 总量'],
  ['currentTask.description','string','任务说明文字'],
  ['currentGoal.name','string','当前目标名称'],
  ['currentGoal.stage','number','目标阶段编号'],
  ['currentGoal.progress / total','number','目标当前进度 / 总量'],
  ['badges.earned / total','number','已解锁勋章数 / 总勋章数'],
  ['badges.nextBadge.name','string','下一枚勋章名称'],
  ['badges.nextBadge.unlockHint','string','下一枚勋章解锁提示'],
  ['stats.totalInteractions','number','累计互动总次数'],
  ['stats.totalCards','number','累计获得卡牌总张数'],
  ['stats.redeemedGifts','number','已兑换礼物个数'],
  ['stats.lastInteractionAt','string','最近互动时间，格式 YYYY-MM-DD HH:mm'],
]

const resultFields = [
  ['cardsEarned','number','本次互动获得卡牌张数'],
  ['cardNames','string[]','本次获得卡牌名称列表'],
  ['taskProgress.before / after','number','互动前后任务进度'],
  ['taskProgress.completed','boolean','本次是否完成任务'],
  ['goalProgress.before / after','number','互动前后目标进度'],
  ['badgeUnlocked.name','string','本次解锁的勋章名称（可选）'],
]

export default function PrdTerminalPage() {
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
          <div className="inline-flex items-center gap-2 rounded-full bg-indigo-100 px-2.5 py-1 text-sm font-bold text-indigo-700 ring-1 ring-indigo-200">
            <span>📱</span><span>前台终端 · 学校竖屏设备</span>
          </div>
          <h1 className="text-3xl font-black tracking-tight">学校终端流程 PRD</h1>
          <p className="max-w-3xl text-base leading-relaxed text-slate-600">
            本文档定义部署在学校竖屏终端（9:16）的完整前端交互流程（v1.9.0）。涵盖身份识别、挑战预览、游戏随机抽选、互动前准备、互动结果展示、学习之星排行榜与成长反馈全链路体验。支持三种用户场景：新用户、老用户（有成长系统）、无成长系统用户。
          </p>
          <div className="flex flex-wrap gap-2 text-sm text-slate-500">
            <span className="rounded-full bg-white px-2 py-0.5 ring-1 ring-slate-200">版本：v1.9.0</span>
            <span className="rounded-full bg-white px-2 py-0.5 ring-1 ring-slate-200">适配：竖屏 9:16（PhoneFrame）</span>
            <span className="rounded-full bg-white px-2 py-0.5 ring-1 ring-slate-200">角色：学生</span>
            <span className="rounded-full bg-white px-2 py-0.5 ring-1 ring-slate-200">路由前缀：/terminal</span>
          </div>
        </header>

        <div className="space-y-6">

          {/* 一、核心概念 */}
          <section className="rounded-2xl bg-white p-5 ring-1 ring-slate-200">
            <div className="mb-3 flex items-center justify-between gap-2">
              <h2 className="text-xl font-black">一、核心概念</h2>
              <span className="rounded-full bg-indigo-50 px-2 py-0.5 text-sm font-semibold text-indigo-700">Concepts</span>
            </div>
            <div className="space-y-3">
              <div className="rounded-xl bg-indigo-50 p-4 ring-1 ring-indigo-100">
                <div className="mb-1 text-sm font-bold text-indigo-800">终端流程 = 身份识别 → 成长展示 → 游戏抽选 → 互动 → 反馈</div>
                <p className="text-sm leading-relaxed text-indigo-900">
                  学生靠近终端后系统确定身份，根据 <code className="rounded bg-indigo-100 px-1 text-xs">hasGrowthSystem</code> 走完整成长路径或简化路径。完整路径含挑战预览、互动前准备、互动结果、排行榜与成长反馈；简化路径仅展示得分与卡牌。所有自动跳转通过 <code className="rounded bg-indigo-100 px-1 text-xs">window.location.href</code> + <code className="rounded bg-indigo-100 px-1 text-xs">setTimeout</code> 实现，<code className="rounded bg-indigo-100 px-1 text-xs">growth</code> query 参数传递路径标志。
                </p>
              </div>
              <div className="grid gap-3 sm:grid-cols-3">
                {[
                  { label: '新用户', desc: 'isNew=true；create-success 建立成长身份后直接进 pre-interaction 开始完整流程。' },
                  { label: '老用户（有成长系统）', desc: 'isNew=false + hasGrowthSystem=true；welcome 3 秒后进 challenge-preview，再进 game-select。' },
                  { label: '无成长系统用户', desc: 'hasGrowthSystem=false；welcome 后直接进 game-select?growth=false，结束显示 simple-result。' },
                ].map((c) => (
                  <div key={c.label} className="rounded-xl bg-slate-50 p-3 ring-1 ring-slate-100">
                    <div className="mb-1 font-bold text-slate-800">{c.label}</div>
                    <p className="text-sm text-slate-600">{c.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 二、整体流程路径 */}
          <section className="rounded-2xl bg-white p-5 ring-1 ring-slate-200">
            <div className="mb-3 flex items-center justify-between gap-2">
              <h2 className="text-xl font-black">二、整体流程路径</h2>
              <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-sm font-semibold text-emerald-700">User Flows</span>
            </div>
            <div className="space-y-3 text-sm">
              {flows.map((f) => (
                <div key={f.label} className={`rounded-xl p-4 ring-1 ${f.cls}`}>
                  <div className="mb-2 font-bold">{f.label}</div>
                  <div className="flex flex-wrap items-center gap-1 font-mono text-xs">
                    {f.steps.map((s, i) => (
                      <span key={s} className="inline-flex items-center gap-1">
                        <code className="rounded bg-white/60 px-1.5 py-0.5">{s}</code>
                        {i < f.steps.length - 1 && <span className="opacity-50">→</span>}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
              <div className="rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-800 ring-1 ring-amber-100">
                <span className="font-bold">跳转说明：</span>自动跳转均通过 <code className="rounded bg-amber-100 px-1 text-xs">window.location.href</code> + <code className="rounded bg-amber-100 px-1 text-xs">setTimeout</code> 实现。<code className="rounded bg-amber-100 px-1 text-xs">hasGrowthSystem</code> 决定 welcome 跳向 challenge-preview 还是 game-select?growth=false；game-select 的 <code className="rounded bg-amber-100 px-1 text-xs">growth</code> 参数决定锁定后跳向 growth-feedback 还是 simple-result。新用户从 create-success 直接进入 pre-interaction，跳过 challenge-preview 和 game-select。
              </div>
            </div>
          </section>

          {/* 三、页面路由总览 */}
          <section className="rounded-2xl bg-white p-5 ring-1 ring-slate-200">
            <div className="mb-3 flex items-center justify-between gap-2">
              <h2 className="text-xl font-black">三、页面路由总览</h2>
              <span className="rounded-full bg-slate-900 px-2 py-0.5 text-sm font-semibold text-slate-50">Routes</span>
            </div>
            <div className="mb-3 rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-800 ring-1 ring-amber-100">
              <span className="font-bold">⏱ 跳转时间原则：</span>所有页面均为全自动跳转，无需学生手动操作。单页停留时间<span className="font-bold">最长不超过 10 秒</span>，确保终端流程流畅连贯、不产生等待感。成长反馈页与简化结果页的跳转时机以弹窗序列播放完毕为准，总时长控制在 10 秒以内。
            </div>
            <div className="overflow-hidden rounded-xl border border-slate-100">
              <table className="min-w-full border-collapse text-left text-sm">
                <thead className="bg-slate-100 text-xs uppercase text-slate-500">
                  <tr>
                    <th className="px-3 py-2">页面</th>
                    <th className="px-3 py-2">路由</th>
                    <th className="px-3 py-2">适用场景</th>
                    <th className="px-3 py-2">自动跳转</th>
                  </tr>
                </thead>
                <tbody>
                  {routes.map(([page, route, scene, jump], i) => (
                    <tr key={route} className={`border-t border-slate-100 ${i % 2 === 1 ? 'bg-slate-50' : ''}`}>
                      <td className="px-3 py-2 font-medium whitespace-nowrap">{page}</td>
                      <td className="px-3 py-2 font-mono text-xs text-slate-600">{route}</td>
                      <td className="px-3 py-2 text-slate-600">{scene}</td>
                      <td className="px-3 py-2 text-xs text-slate-500">{jump}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* 四、各页面详细说明 */}
          <section className="rounded-2xl bg-white p-5 ring-1 ring-slate-200">
            <div className="mb-3 flex items-center justify-between gap-2">
              <h2 className="text-xl font-black">四、各页面详细说明</h2>
              <span className="rounded-full bg-amber-50 px-2 py-0.5 text-sm font-semibold text-amber-700">Screens</span>
            </div>
            <div className="space-y-3">
              {screens.map((sc) => (
                <div key={sc.id} className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                  <div className="mb-2 flex flex-wrap items-center gap-2">
                    <span className="font-bold text-slate-900">{sc.id} {sc.name}</span>
                    <code className="rounded bg-slate-200 px-1.5 py-0.5 text-xs font-mono text-slate-600">{sc.route}</code>
                    <span className={`ml-auto rounded-full px-2 py-0.5 text-xs font-semibold ${sc.bg} ${sc.tc}`}>{sc.tag}</span>
                  </div>
                  <ul className="space-y-1 text-sm text-slate-600">
                    {sc.pts.map((p, i) => <li key={i}>• {p}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* 五、数据字段说明 */}
          <section className="rounded-2xl bg-white p-5 ring-1 ring-slate-200">
            <div className="mb-3 flex items-center justify-between gap-2">
              <h2 className="text-xl font-black">五、数据字段说明</h2>
              <span className="rounded-full bg-slate-100 px-2 py-0.5 text-sm font-semibold text-slate-600">Data Fields</span>
            </div>
            <div className="space-y-4 text-sm">
              <div>
                <div className="mb-2 font-bold text-slate-800">5.1 StudentProfile（terminalMock.ts）</div>
                <div className="overflow-hidden rounded-xl border border-slate-100">
                  <table className="min-w-full border-collapse text-left">
                    <thead className="bg-slate-100 text-xs uppercase text-slate-500">
                      <tr><th className="px-3 py-2">字段</th><th className="px-3 py-2">类型</th><th className="px-3 py-2">说明</th></tr>
                    </thead>
                    <tbody>
                      {mockFields.map(([f, t, d], i) => (
                        <tr key={f} className={`border-t border-slate-100 ${i % 2 === 1 ? 'bg-slate-50' : ''}`}>
                          <td className="px-3 py-2 font-mono text-xs whitespace-nowrap">{f}</td>
                          <td className="px-3 py-2 text-slate-500 whitespace-nowrap">{t}</td>
                          <td className="px-3 py-2 text-slate-600">{d}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div>
                <div className="mb-2 font-bold text-slate-800">5.2 InteractionResult（terminalMock.ts）</div>
                <div className="overflow-hidden rounded-xl border border-slate-100">
                  <table className="min-w-full border-collapse text-left">
                    <thead className="bg-slate-100 text-xs uppercase text-slate-500">
                      <tr><th className="px-3 py-2">字段</th><th className="px-3 py-2">类型</th><th className="px-3 py-2">说明</th></tr>
                    </thead>
                    <tbody>
                      {resultFields.map(([f, t, d], i) => (
                        <tr key={f} className={`border-t border-slate-100 ${i % 2 === 1 ? 'bg-slate-50' : ''}`}>
                          <td className="px-3 py-2 font-mono text-xs whitespace-nowrap">{f}</td>
                          <td className="px-3 py-2 text-slate-500 whitespace-nowrap">{t}</td>
                          <td className="px-3 py-2 text-slate-600">{d}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="rounded-xl bg-slate-50 px-4 py-3 text-slate-600 ring-1 ring-slate-100">
                <span className="font-bold">Mock 预设实例：</span>
                mockNewStudent（isNew=true，hasGrowthSystem=true，progress=0，code 随机生成）、
                mockReturningStudent（code=AB023，18 次互动，42 张卡牌，progress=2/3）、
                mockStudentWithoutGrowth（hasGrowthSystem=false，code=CD789）、
                mockInteractionResult（cardsEarned=2，taskProgress.completed=true，after=3）。
              </div>
            </div>
          </section>

          {/* 六、弹窗序列说明 */}
          <section className="rounded-2xl bg-white p-5 ring-1 ring-slate-200">
            <div className="mb-3 flex items-center justify-between gap-2">
              <h2 className="text-xl font-black">六、弹窗序列说明</h2>
              <span className="rounded-full bg-rose-50 px-2 py-0.5 text-sm font-semibold text-rose-600">Modal Sequence</span>
            </div>
            <div className="space-y-3 text-sm">
              <div className="rounded-xl bg-rose-50 p-4 ring-1 ring-rose-100">
                <div className="mb-2 font-bold text-rose-800">成长反馈页（growth-feedback）弹窗序列</div>
                <div className="flex flex-wrap items-center gap-2">
                  {[
                    { modal: 'score 弹窗', dur: '2s', desc: '🎉 互动完成 + 95 分大字 + 太棒了！' },
                    { modal: 'ranking 弹窗', dur: '4s', desc: '内嵌排行榜（前三台阶 + 4-7 名列表 + 我的排名）' },
                    { modal: 'cards 弹窗', dur: '2s', desc: '🎴 获得卡牌数与名称列表' },
                  ].map((item, i, arr) => (
                    <span key={item.modal} className="inline-flex items-center gap-2">
                      <span className="rounded-lg bg-white px-3 py-2 ring-1 ring-rose-200">
                        <span className="block text-xs font-bold text-rose-700">{item.modal}</span>
                        <span className="block text-xs text-slate-500">{item.dur} · {item.desc}</span>
                      </span>
                      {i < arr.length - 1 && <span className="text-rose-300">→</span>}
                    </span>
                  ))}
                </div>
              </div>
              <div className="rounded-xl bg-slate-50 p-4 ring-1 ring-slate-100">
                <div className="mb-2 font-bold text-slate-800">简化结果页（simple-result）弹窗序列</div>
                <div className="flex flex-wrap items-center gap-2">
                  {[
                    { modal: 'score 弹窗', dur: '2s', desc: '🎉 互动完成 + 95 分大字 + 太棒了！' },
                    { modal: 'cards 弹窗', dur: '2s', desc: '🎴 获得卡牌数与名称列表' },
                  ].map((item, i, arr) => (
                    <span key={item.modal} className="inline-flex items-center gap-2">
                      <span className="rounded-lg bg-white px-3 py-2 ring-1 ring-slate-200">
                        <span className="block text-xs font-bold text-slate-700">{item.modal}</span>
                        <span className="block text-xs text-slate-500">{item.dur} · {item.desc}</span>
                      </span>
                      {i < arr.length - 1 && <span className="text-slate-300">→</span>}
                    </span>
                  ))}
                </div>
              </div>
              <div className="rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-800 ring-1 ring-amber-100">
                <span className="font-bold">弹窗实现：</span>通过 <code className="rounded bg-amber-100 px-1 text-xs">currentModal</code> state + useEffect setTimeout 链式驱动；弹窗层 <code className="rounded bg-amber-100 px-1 text-xs">absolute inset-0 z-50</code> 覆盖 PhoneFrame 内容区（或全屏）；入场动画 scale-in（0.3s ease-out）。simple-result 使用 setInterval 驱动，growth-feedback 使用嵌套 setTimeout 链。
              </div>
            </div>
          </section>

          {/* 七、PhoneFrame 使用说明 */}
          <section className="rounded-2xl bg-white p-5 ring-1 ring-slate-200">
            <div className="mb-3 flex items-center justify-between gap-2">
              <h2 className="text-xl font-black">七、PhoneFrame 使用说明</h2>
              <span className="rounded-full bg-slate-100 px-2 py-0.5 text-sm font-semibold text-slate-600">Layout</span>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 text-sm">
              <div className="rounded-xl bg-slate-50 p-4 ring-1 ring-slate-100">
                <div className="mb-2 font-bold text-slate-800">使用 PhoneFrame 的页面</div>
                <ul className="space-y-1 text-slate-600">
                  <li>• welcome（欢迎页）</li>
                  <li>• challenge-preview（挑战预览页）</li>
                  <li>• game-select（游戏抽选页）</li>
                  <li>• growth-feedback（成长反馈页）</li>
                  <li>• simple-result（简化结果页）</li>
                </ul>
              </div>
              <div className="rounded-xl bg-slate-50 p-4 ring-1 ring-slate-100">
                <div className="mb-2 font-bold text-slate-800">全屏布局（无 PhoneFrame）的页面</div>
                <ul className="space-y-1 text-slate-600">
                  <li>• create-success（新用户创建成功页）</li>
                  <li>• pre-interaction（互动前准备页）</li>
                  <li>• interaction-result（互动结果页）</li>
                  <li>• ranking-popup（排行榜弹出页）</li>
                  <li>• home（终端主页）</li>
                  <li>• growth-detail（成长详情页）</li>
                </ul>
              </div>
            </div>
            <div className="mt-3 rounded-xl bg-slate-50 px-4 py-3 text-sm text-slate-600 ring-1 ring-slate-100">
              <span className="font-bold">PhoneFrame 说明：</span>组件位于 <code className="rounded bg-slate-200 px-1 text-xs">components/PhoneFrame.tsx</code>，模拟 9:16 竖屏手机外框。包裹后内容区为 <code className="rounded bg-slate-200 px-1 text-xs">min-h-full</code> 内滚动；弹窗层需用 <code className="rounded bg-slate-200 px-1 text-xs">absolute inset-0 z-50</code> 覆盖在 PhoneFrame 内部。
            </div>
          </section>

          {/* 八、典型数据示例 */}
          <section className="rounded-2xl bg-white p-5 ring-1 ring-slate-200">
            <div className="mb-3 flex items-center justify-between gap-2">
              <h2 className="text-xl font-black">八、典型数据示例</h2>
              <span className="rounded-full bg-slate-100 px-2 py-0.5 text-sm font-semibold text-slate-600">Examples</span>
            </div>
            <div className="grid gap-3 sm:grid-cols-3 text-sm">
              {[
                { title: '新用户', color: 'bg-emerald-50 ring-emerald-100', rows: [['code','随机生成（如 XK042）'],['isNew','true'],['hasGrowthSystem','true'],['currentTask.progress','0 / 1'],['badges.earned','0 / 5'],['stats.totalInteractions','0']] },
                { title: '老用户（有成长系统）', color: 'bg-indigo-50 ring-indigo-100', rows: [['code','AB023'],['isNew','false'],['hasGrowthSystem','true'],['currentTask.progress','2 / 3'],['badges.earned','2 / 5'],['stats.totalInteractions','18']] },
                { title: '无成长系统用户', color: 'bg-slate-100 ring-slate-200', rows: [['code','CD789'],['isNew','false'],['hasGrowthSystem','false'],['currentTask','（空）'],['stats.totalInteractions','5'],['stats.totalCards','12']] },
              ].map((ex) => (
                <div key={ex.title} className={`rounded-xl p-4 ring-1 ${ex.color}`}>
                  <div className="mb-2 font-bold text-slate-800">{ex.title}</div>
                  {ex.rows.map(([k, v]) => (
                    <div key={k} className="flex gap-2 text-xs">
                      <span className="w-36 shrink-0 font-mono text-slate-500">{k}</span>
                      <span className="font-medium text-slate-800">{v}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </section>

        </div>
      </div>
    </main>
  )
}
  