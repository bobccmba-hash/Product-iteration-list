import Link from 'next/link'

export default function PrdCommentRulesPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <div className="mb-6 flex items-center justify-between gap-4">
          <Link href="/v1.9.0" className="inline-flex items-center gap-1.5 text-base font-bold text-slate-500 hover:text-slate-900">
            ← 返回 1.9.0 需求首页
          </Link>
          <div className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-3 py-1 text-sm font-semibold text-slate-50">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
            AI 互动成长平台 · PRD
          </div>
        </div>

        <header className="mb-8 space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-2.5 py-1 text-sm font-bold text-blue-700 ring-1 ring-blue-200">
            <span>💬</span><span>内容管理 · 评价规则</span>
          </div>
          <h1 className="text-3xl font-black tracking-tight">评价规则管理 PRD</h1>
          <p className="max-w-3xl text-base leading-relaxed text-slate-600">
            本文档定义评论规则管理后台（v1.9.0）。运营人员通过本页配置评论的基础校验规则与灌水识别规则，配置完成后「保存为草稿」，确认无误后「发布生效」，前端即时提示、服务端最终校验双层保护。
          </p>
          <div className="flex flex-wrap gap-2 text-sm text-slate-500">
            <span className="rounded-full bg-white px-2 py-0.5 ring-1 ring-slate-200">版本：v1.9.0</span>
            <span className="rounded-full bg-white px-2 py-0.5 ring-1 ring-slate-200">角色：运营 / 管理员</span>
            <span className="rounded-full bg-white px-2 py-0.5 ring-1 ring-slate-200">路由：/admin/comment-rules</span>
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
                <div className="mb-1 text-sm font-bold text-blue-800">所有规则均基于纯文本字符串判断，不依赖 OCR 或大模型</div>
                <p className="text-sm leading-relaxed text-blue-900">前端按相同规则做即时提示（不作为安全边界），服务端统一校验并返回 errorCode 与提示文案 key。规则分为两层：<strong>基础校验</strong>（字数、字符类型）和<strong>灌水识别</strong>（重复字符、相似内容、词库匹配）。</p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  { label: '基础校验规则', desc: '最小字符数、最小汉字数、禁止纯符号/数字/字母/空内容，前端实时拦截。' },
                  { label: '灌水识别规则', desc: '连续重复字符、字符占比、无意义短词、模板评论、乱码、相似评论，服务端最终判定。' },
                  { label: '提示文案配置', desc: '每条规则对应独立的提示文案，运营可自定义文案内容，实时反映至前端弹窗。' },
                  { label: '词库管理', desc: '维护「无意义短词」与「模板评论」两张词库，支持词条的增删管理，后端落库为评论词库表。' },
                ].map((c) => (
                  <div key={c.label} className="rounded-xl bg-slate-50 p-3 ring-1 ring-slate-100">
                    <div className="mb-1 font-bold text-slate-800">{c.label}</div>
                    <p className="text-sm text-slate-600">{c.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 二、页面结构 */}
          <section className="rounded-2xl bg-white p-5 ring-1 ring-slate-200">
            <div className="mb-3 flex items-center justify-between gap-2">
              <h2 className="text-xl font-black">二、页面结构</h2>
              <span className="rounded-full bg-slate-900 px-2 py-0.5 text-sm font-semibold text-slate-50">/admin/comment-rules</span>
            </div>
            <div className="mb-3 rounded-xl bg-slate-50 px-4 py-3 text-sm text-slate-600 ring-1 ring-slate-100">
              单页配置，左侧为主配置区（四个规则区块 + 底部操作栏），右侧为实现规则说明侧边栏（桌面端显示）。顶部操作栏固定：<strong>保存配置</strong>（存草稿）、<strong>发布生效</strong>（确认弹窗后正式生效）、<strong>恢复默认</strong>（还原出厂配置）。
            </div>
            <div className="space-y-3">
              {[
                {
                  num: '① 基础校验规则',
                  fields: [
                    { name: '最小字符数', desc: '评论总长度不得低于该值，默认 8' },
                    { name: '最小汉字数', desc: '评论中至少包含的汉字数量，默认 2' },
                    { name: '禁止纯符号', desc: '评论仅包含符号（如！！！、。。。）则拦截' },
                    { name: '禁止纯数字', desc: '评论仅包含数字（如 111、2222）则拦截' },
                    { name: '禁止纯字母', desc: '评论仅包含字母（如 aaa、ABC）则拦截' },
                    { name: '禁止空内容', desc: '评论为空或仅含空格则拦截' },
                  ],
                },
                {
                  num: '② 灌水识别规则',
                  fields: [
                    { name: '连续重复字符限制', desc: '同一字符连续出现 ≥ 阈值次则拦截，默认阈值 3，可配置 2–10' },
                    { name: '重复字符占比限制', desc: '单字符在整条评论占比 ≥ 阈值% 则拦截，默认 50%，可配置 0–100' },
                    { name: '无意义短词拦截', desc: '评论仅含词库中无意义词汇则拦截，支持管理词库' },
                    { name: '模板评论拦截', desc: '评论完全匹配词库中模板则拦截，支持管理模板' },
                    { name: '乱码/随机拼接拦截', desc: '结合最小汉字数、纯字母/数字限制综合判断' },
                    { name: '相似评论拦截', desc: '同账号近 7 天内评论相似度 ≥ 阈值% 则拦截（服务端），默认 80%' },
                  ],
                },
                {
                  num: '③ 提示文案配置',
                  fields: [
                    { name: '内容过短提示', desc: '触发最小字符/汉字规则时显示，默认「评价内容过短，请补充真实体验」' },
                    { name: '符号/重复字符提示', desc: '触发纯符号或重复字符规则时显示，默认「请不要只输入符号或重复字符」' },
                    { name: '内容不够具体提示', desc: '触发无意义短词/乱码规则时显示，默认「为了帮助其他用户，请填写更具体的评价内容」' },
                    { name: '模板/相似评论提示', desc: '触发模板或相似评论规则时显示，默认「评论内容重复度较高，请重新填写」' },
                  ],
                },
                {
                  num: '④ 生效方式',
                  fields: [
                    { name: '前端实时校验', desc: '可开关，开启后前端按相同规则即时提示，不作为安全边界' },
                    { name: '服务端最终校验', desc: '必须开启，不可关闭，服务端统一校验并返回 errorCode' },
                  ],
                },
              ].map((block) => (
                <div key={block.num} className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                  <div className="mb-2 font-bold text-slate-800">{block.num}</div>
                  <div className="space-y-1">
                    {block.fields.map((f) => (
                      <div key={f.name} className="flex items-start gap-2 text-sm">
                        <span className="mt-0.5 font-medium text-slate-800 whitespace-nowrap">{f.name}</span>
                        <span className="text-slate-500">— {f.desc}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 三、字段默认值 */}
          <section className="rounded-2xl bg-white p-5 ring-1 ring-slate-200">
            <div className="mb-3 flex items-center justify-between gap-2">
              <h2 className="text-xl font-black">三、字段默认值</h2>
              <span className="rounded-full bg-slate-100 px-2 py-0.5 text-sm font-semibold text-slate-600">Defaults</span>
            </div>
            <div className="overflow-hidden rounded-xl border border-slate-100">
              <table className="min-w-full border-collapse text-left text-sm">
                <thead className="bg-slate-100 text-xs uppercase text-slate-500">
                  <tr><th className="px-3 py-2">字段</th><th className="px-3 py-2">默认值</th><th className="px-3 py-2">说明</th></tr>
                </thead>
                <tbody>
                  {[
                    ['最小字符数', '8', '评论总长度下限'],
                    ['最小汉字数', '2', '至少 2 个汉字'],
                    ['禁止纯符号', '开启', ''],
                    ['禁止纯数字', '开启', ''],
                    ['禁止纯字母', '开启', ''],
                    ['禁止空内容', '开启', ''],
                    ['连续重复字符阈值', '3 次', ''],
                    ['重复字符占比阈值', '50%', ''],
                    ['无意义短词拦截', '开启', '词库：好、可以、不错'],
                    ['模板评论拦截', '开启', '词库：很好下次再来、挺好的'],
                    ['乱码/随机拼接拦截', '开启', ''],
                    ['相似评论阈值', '80%', '近 7 天维度'],
                    ['前端实时校验', '开启', ''],
                    ['服务端校验', '开启（不可关闭）', ''],
                  ].map(([f, d, note], i) => (
                    <tr key={f} className={`border-t border-slate-100 ${i % 2 === 1 ? 'bg-slate-50' : ''}`}>
                      <td className="px-3 py-2 font-medium whitespace-nowrap">{f}</td>
                      <td className="px-3 py-2 text-slate-600">{d}</td>
                      <td className="px-3 py-2 text-slate-400 text-xs">{note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* 四、词库管理 */}
          <section className="rounded-2xl bg-white p-5 ring-1 ring-slate-200">
            <div className="mb-3 flex items-center justify-between gap-2">
              <h2 className="text-xl font-black">四、词库管理</h2>
              <span className="rounded-full bg-slate-100 px-2 py-0.5 text-sm font-semibold text-slate-600">Word Library</span>
            </div>
            <div className="mb-3 rounded-xl bg-slate-50 px-4 py-3 text-sm text-slate-600 ring-1 ring-slate-100">
              点击「管理词库」或「管理模板」按钮弹出词库弹窗，支持查看当前词条、新增词条、删除词条。后端落库为一张<strong>评论词库表</strong>，字段包含 <code className="rounded bg-slate-200 px-1 text-xs">text</code>、<code className="rounded bg-slate-200 px-1 text-xs">type</code>（无意义短词 / 模板评论）、<code className="rounded bg-slate-200 px-1 text-xs">enabled</code> 及可选 <code className="rounded bg-slate-200 px-1 text-xs">remark</code>。
            </div>
            <div className="grid gap-3 text-sm sm:grid-cols-2">
              {[
                {
                  label: '无意义短词词库',
                  type: 'meaningless',
                  desc: '评论仅含词库中词汇时拦截。匹配逻辑：整体去空格后与词库完全匹配，或长度 ≤N 且编辑距离 ≤1。',
                  examples: ['好', '可以', '不错', '还行'],
                },
                {
                  label: '模板评论词库',
                  type: 'template',
                  desc: '评论完全匹配词库中模板时拦截。建议收录常见套话，定期维护更新。',
                  examples: ['很好，下次再来', '挺好的', '非常满意'],
                },
              ].map((lib) => (
                <div key={lib.label} className="rounded-xl bg-slate-50 p-3 ring-1 ring-slate-100">
                  <div className="mb-1 font-bold text-slate-800">{lib.label}</div>
                  <p className="mb-2 text-slate-600">{lib.desc}</p>
                  <div className="flex flex-wrap gap-1">
                    {lib.examples.map((w) => (
                      <span key={w} className="rounded-full bg-white px-2 py-0.5 text-xs font-semibold text-slate-600 ring-1 ring-slate-200">{w}</span>
                    ))}
                    <span className="rounded-full bg-white px-2 py-0.5 text-xs text-slate-400 ring-1 ring-slate-200">…更多</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 五、规则判断逻辑 */}
          <section className="rounded-2xl bg-white p-5 ring-1 ring-slate-200">
            <div className="mb-3 flex items-center justify-between gap-2">
              <h2 className="text-xl font-black">五、规则判断逻辑</h2>
              <span className="rounded-full bg-slate-100 px-2 py-0.5 text-sm font-semibold text-slate-600">Logic</span>
            </div>
            <div className="space-y-3 text-sm">
              {[
                {
                  title: '连续重复字符限制',
                  logic: '遍历评论，统计同一字符连续出现的最大次数 maxRepeatLen。若 maxRepeatLen ≥ 阈值，命中规则。',
                  example: '阈值=3：「哈哈哈」命中，「好呀好呀」不命中。',
                },
                {
                  title: '重复字符占比限制',
                  logic: '去掉空格后统计每个字符出现次数，取最大值 maxCount，总长度为 len。若 maxCount / len × 100 ≥ 阈值%，判定为灌水。',
                  example: '阈值=50：「哈哈哈哈好」中"哈"占 80%，命中。',
                },
                {
                  title: '无意义短词 / 模板评论',
                  logic: '评论整体去空格后与词库完全匹配，或长度 ≤N 且编辑距离 ≤1 则命中。词库通过「管理词库 / 管理模板」维护。',
                  example: '词库含「好」：评论「好」命中；「好啊」编辑距离=1 且长度=2，视配置命中。',
                },
                {
                  title: '乱码 / 随机拼接',
                  logic: '统计非中英文数字符号占比、连续无意义片段长度，结合「最小汉字数」「禁止纯字母/数字」综合判断。占比超过内部阈值（约 40%）则视为乱码。',
                  example: '「fjk29xzp」：无汉字且为纯随机字母数字，命中。',
                },
                {
                  title: '相似评论拦截',
                  logic: '服务端以「学生ID + 业务ID」为维度，取近 7 天历史评论，用分词+余弦/编辑距离与本次评论计算。若与任一历史评论相似度 ≥ 配置阈值，返回错误码。',
                  example: '阈值=80：本次评论与 3 天前评论相似度 85%，拦截并提示「评论内容重复度较高」。',
                },
              ].map((r) => (
                <div key={r.title} className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                  <div className="mb-1 font-bold text-slate-800">{r.title}</div>
                  <p className="text-slate-600">{r.logic}</p>
                  <p className="mt-1 text-xs text-slate-400">示例：{r.example}</p>
                </div>
              ))}
            </div>
          </section>

          {/* 六、操作流程 */}
          <section className="rounded-2xl bg-white p-5 ring-1 ring-slate-200">
            <div className="mb-3 flex items-center justify-between gap-2">
              <h2 className="text-xl font-black">六、操作说明</h2>
              <span className="rounded-full bg-slate-100 px-2 py-0.5 text-sm font-semibold text-slate-600">Actions</span>
            </div>
            <div className="grid gap-2 text-sm sm:grid-cols-3">
              {[
                ['保存配置', '将当前配置存为草稿，不影响线上生效规则，可随时继续编辑。'],
                ['发布生效', '弹出确认弹窗，确认后配置正式生效，前后端同步加载新规则。'],
                ['恢复默认', '弹出确认弹窗，确认后将所有字段还原为出厂默认值，已保存草稿丢失。'],
              ].map(([op, desc]) => (
                <div key={op} className="rounded-xl bg-slate-50 p-3 ring-1 ring-slate-100">
                  <div className="mb-1 font-bold text-slate-800">{op}</div>
                  <p className="text-slate-600">{desc}</p>
                </div>
              ))}
            </div>
            <div className="mt-3 rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-800 ring-1 ring-amber-100">
              <span className="font-bold">注意：</span>发布后将立即影响所有评论提交流程。建议在低峰期操作，并提前与开发确认服务端规则版本一致。
            </div>
          </section>

          {/* 七、典型配置示例 */}
          <section className="rounded-2xl bg-white p-5 ring-1 ring-slate-200">
            <div className="mb-3 flex items-center justify-between gap-2">
              <h2 className="text-xl font-black">七、典型配置示例</h2>
              <span className="rounded-full bg-slate-100 px-2 py-0.5 text-sm font-semibold text-slate-600">Examples</span>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                {
                  title: '标准配置（默认）',
                  tag: '推荐',
                  tagColor: 'bg-green-50 text-green-700',
                  rows: [['最小字符数','8'],['最小汉字数','2'],['连续重复阈值','3 次'],['占比阈值','50%'],['相似度阈值','80%'],['前端校验','开启']],
                  note: '适合大多数场景，平衡体验与防灌水力度。',
                },
                {
                  title: '严格模式',
                  tag: '高防护',
                  tagColor: 'bg-red-50 text-red-700',
                  rows: [['最小字符数','15'],['最小汉字数','5'],['连续重复阈值','2 次'],['占比阈值','40%'],['相似度阈值','60%'],['前端校验','开启']],
                  note: '适合活动期间防刷量，可能增加正常用户的填写负担。',
                },
                {
                  title: '宽松模式',
                  tag: '低门槛',
                  tagColor: 'bg-blue-50 text-blue-700',
                  rows: [['最小字符数','4'],['最小汉字数','1'],['连续重复阈值','5 次'],['占比阈值','70%'],['相似度阈值','90%'],['前端校验','开启']],
                  note: '适合初期冷启动，降低用户提交门槛，鼓励更多评价。',
                },
                {
                  title: '仅服务端校验',
                  tag: '静默模式',
                  tagColor: 'bg-slate-100 text-slate-600',
                  rows: [['最小字符数','8'],['最小汉字数','2'],['连续重复阈值','3 次'],['占比阈值','50%'],['相似度阈值','80%'],['前端校验','关闭']],
                  note: '前端不提示，服务端静默拦截后返回错误码，由前端统一处理。',
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
                        <span className="w-24 shrink-0 text-slate-500">{k}</span>
                        <span className="font-medium text-slate-800">{v}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-2 text-xs text-slate-500">{ex.note}</div>
                </div>
              ))}
            </div>
          </section>

          {/* 八、校验顺序 */}
          <section className="rounded-2xl bg-white p-5 ring-1 ring-slate-200">
            <div className="mb-3 flex items-center justify-between gap-2">
              <h2 className="text-xl font-black">八、校验顺序与拦截优先级</h2>
              <span className="rounded-full bg-slate-100 px-2 py-0.5 text-sm font-semibold text-slate-600">Priority</span>
            </div>
            <div className="space-y-2 text-sm">
              {[
                ['1', '禁止空内容', '最优先，空提交立即拦截'],
                ['2', '最小字符数 / 最小汉字数', '基础长度校验'],
                ['3', '禁止纯符号 / 纯数字 / 纯字母', '字符类型校验'],
                ['4', '连续重复字符 / 重复占比', '字符层面灌水识别'],
                ['5', '无意义短词 / 模板评论', '词库匹配'],
                ['6', '乱码 / 随机拼接', '综合判断'],
                ['7', '相似评论（服务端）', '最后一道，需异步查询历史数据'],
              ].map(([no, rule, note], i) => (
                <div key={no} className={`flex items-start gap-3 rounded-lg px-3 py-2 ${i % 2 === 1 ? 'bg-slate-50' : 'bg-white ring-1 ring-slate-100'}`}>
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-slate-900 text-xs font-bold text-white">{no}</span>
                  <span className="font-medium text-slate-800 whitespace-nowrap">{rule}</span>
                  <span className="text-slate-500">{note}</span>
                </div>
              ))}
            </div>
          </section>

        </div>
      </div>
    </main>
  )
}
 