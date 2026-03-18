import Link from 'next/link'

export default function PrdHomeBrandPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <div className="mb-6 flex items-center justify-between gap-4">
          <Link href="/v1.9.0" className="inline-flex items-center gap-1.5 text-base font-bold text-slate-500 hover:text-slate-900">
            ← 返回 1.9.0 需求首页
          </Link>
          <div className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-3 py-1 text-sm font-semibold text-slate-50">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
            AI 互动成长平台 · PRD
          </div>
        </div>

        <header className="mb-8 space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full bg-amber-100 px-2.5 py-1 text-sm font-bold text-amber-700 ring-1 ring-amber-200">
            <span>🏢</span><span>前台管理 · 首页品牌</span>
          </div>
          <h1 className="text-3xl font-black tracking-tight">首页品牌管理 PRD</h1>
          <p className="max-w-3xl text-base leading-relaxed text-slate-600">
            本文档定义小程序首页品牌展示区域的管理后台（v1.9.0）。运营人员通过本模块新增品牌区域、绑定同步城市、配置区域头部（图标 / 主标题）、选择卡片布局，并为每张卡片设置图片、标题与跳转目标，配置完成后发布至小程序首页对应城市展示。
          </p>
          <div className="flex flex-wrap gap-2 text-sm text-slate-500">
            <span className="rounded-full bg-white px-2 py-0.5 ring-1 ring-slate-200">版本：v1.9.0</span>
            <span className="rounded-full bg-white px-2 py-0.5 ring-1 ring-slate-200">角色：运营 / 管理员</span>
            <span className="rounded-full bg-white px-2 py-0.5 ring-1 ring-slate-200">路由：/admin/home-brand</span>
          </div>
        </header>

        <div className="space-y-6">

          {/* 一、核心概念 */}
          <section className="rounded-2xl bg-white p-5 ring-1 ring-slate-200">
            <div className="mb-3 flex items-center justify-between gap-2">
              <h2 className="text-xl font-black">一、核心概念</h2>
              <span className="rounded-full bg-amber-50 px-2 py-0.5 text-sm font-semibold text-amber-700">Concepts</span>
            </div>
            <div className="space-y-3">
              <div className="rounded-xl bg-amber-50 p-4 ring-1 ring-amber-100">
                <div className="mb-1 text-sm font-bold text-amber-800">品牌区域 = 同步城市 × 区域头部（图标 + 主标题）× 卡片布局 × 卡片列表</div>
                <p className="text-sm leading-relaxed text-amber-900">
                  每个品牌区域绑定一个同步城市，决定该区域在哪个城市的小程序首页中间区域展示。区域包含头部配置（图标 + 主标题）和若干品牌卡片，每张卡片可独立配置图片、标题与跳转行为。品牌区域创建后为草稿状态，运营确认后手动发布上线，支持随时下线或删除。
                </p>
              </div>
              <div className="grid gap-3 sm:grid-cols-3">
                {[
                  { label: '两列一排', cap: '最多 2 张', desc: '固定展示左右各一张卡片，适合品牌对比或双入口场景。超过 2 张时「新增卡片」按钮自动禁用。' },
                  { label: '单列多排', cap: '无上限', desc: '每排一张卡片，可添加任意数量，卡片纵向排列，适合纵向列表展示场景。' },
                  { label: '两列多排', cap: '无上限', desc: '每排两张卡片，可添加任意数量，呈网格排列，适合内容较多的入口矩阵展示。' },
                ].map((c) => (
                  <div key={c.label} className="rounded-xl bg-slate-50 p-3 ring-1 ring-slate-100">
                    <div className="mb-0.5 flex items-center gap-2">
                      <span className="font-bold text-slate-800">{c.label}</span>
                      <span className="rounded-full bg-amber-100 px-1.5 py-0.5 text-xs font-semibold text-amber-700">{c.cap}</span>
                    </div>
                    <p className="text-sm text-slate-600">{c.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 二、品牌区域列表页 */}
          <section className="rounded-2xl bg-white p-5 ring-1 ring-slate-200">
            <div className="mb-3 flex items-center justify-between gap-2">
              <h2 className="text-xl font-black">二、品牌区域列表页</h2>
              <span className="rounded-full bg-slate-900 px-2 py-0.5 text-sm font-semibold text-slate-50">/admin/home-brand</span>
            </div>
            <div className="space-y-4 text-sm">
              <div className="rounded-xl bg-slate-50 px-4 py-3 text-slate-600 ring-1 ring-slate-100">
                页面顶部展示面包屑「前台管理 / 首页品牌管理」，右上角提供「返回后台首页」与「新增品牌区域」入口。列表支持按主标题 / 副标题关键词模糊筛选，点击「查询」触发过滤，「重置」清空搜索条件恢复全量列表。
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
                        ['区域图', '品牌区域图标缩略图，40×40 圆角方块；无图时显示灰色占位色块', '始终显示'],
                        ['主标题 / 副标题', '主标题粗体大字，副标题细字灰色小字展示于下方', '始终显示'],
                        ['布局', '两列一排 / 单列多排 / 两列多排，Tag 样式（info 蓝色）', 'md 及以上'],
                        ['卡片数', '当前区域下的卡片张数，数字加粗，带「张」后缀', 'md 及以上'],
                        ['状态', '已发布（success 绿色 Tag）/ 草稿（neutral 灰色 Tag）', '始终显示'],
                        ['创建时间', '区域创建日期，格式 YYYY-MM-DD', 'lg 及以上'],
                        ['更新时间', '最近修改日期，格式 YYYY-MM-DD', 'lg 及以上'],
                        ['操作', '查看 / 编辑 / 发布·下线 / 删除，四个操作按钮横向排列', '始终显示'],
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
                    ['查看', '跳转至 /admin/home-brand/[id]/detail，只读展示区域头部信息、同步城市与卡片配置列表'],
                    ['编辑', '跳转至 /admin/home-brand/[id]，进入三区块编辑页修改区域配置与卡片'],
                    ['发布', '草稿状态下点击，直接将状态切换为「已发布」，品牌区域即时上线至小程序首页'],
                    ['下线', '已发布状态下点击，将状态切换回「草稿」，前台立即停止展示该区域'],
                    ['删除', '弹出确认弹窗，确认后从列表中永久移除，操作不可恢复'],
                    ['新增品牌区域', '顶部右侧按钮，跳转至 /admin/home-brand/create 新建页'],
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

          {/* 三、新建 / 编辑页 */}
          <section className="rounded-2xl bg-white p-5 ring-1 ring-slate-200">
            <div className="mb-3 flex items-center justify-between gap-2">
              <h2 className="text-xl font-black">三、新建 / 编辑页</h2>
              <span className="rounded-full bg-amber-50 px-2 py-0.5 text-sm font-semibold text-amber-700">三区块 · 单页配置</span>
            </div>
            <div className="mb-3 rounded-xl bg-slate-50 px-4 py-3 text-sm text-slate-600 ring-1 ring-slate-100">
              新建（/admin/home-brand/create）与编辑（/admin/home-brand/[id]）页面结构完全一致，包含三个区块：「同步城市」「区域头部设置」「卡片布局设置」。顶部操作栏提供「返回列表」「查看详情」「保存」「发布生效」四个入口，「发布生效」弹出确认弹窗后正式上线。
            </div>
            <div className="space-y-3">
              {[
                {
                  num: '① 同步城市',
                  desc: '绑定该品牌区域展示的城市，决定在哪个城市首页渲染。',
                  fields: [
                    { name: '同步城市', required: true, desc: '必填，下拉单选。选项：晋江区 / 西安区 / 其他区。未选择保存时提示「请选择同步城市」' },
                  ],
                },
                {
                  num: '② 区域头部设置',
                  desc: '配置品牌区域的视觉标识，包含图标与主标题两部分。',
                  fields: [
                    { name: '区域图标', required: false, desc: '选填，上传图片，比例 1:1，展示于品牌区域左上角' },
                    { name: '主标题（文字）', required: true, desc: '与「主标题（图片）」二选一，通过 Radio 切换。输入文字直接渲染为标题文本' },
                    { name: '主标题（图片）', required: true, desc: '与「主标题（文字）」二选一，通过 Radio 切换。上传图片渲染为标题区域，建议比例 16:9' },
                  ],
                },
                {
                  num: '③ 卡片布局设置',
                  desc: '先选布局样式，再逐张配置卡片内容。布局决定卡片最大数量与前台网格结构。',
                  fields: [
                    { name: '布局选择', required: true, desc: '可视化预览卡片选择：两列一排（最多 2 张）/ 单列多排（无上限）/ 两列多排（无上限），选中态高亮 ring' },
                    { name: '新增卡片', required: false, desc: '右上角按钮，两列一排已达 2 张时按钮置灰禁用，其余布局无上限' },
                    { name: '卡片图片', required: false, desc: '每张卡片独立上传配图，展示在卡片上方区域' },
                    { name: '卡片标题', required: false, desc: '每张卡片的文字标题，输入框' },
                    { name: '跳转类型', required: true, desc: '下拉四选一：跳转页面 / 跳转小程序 / 跳转微信公众号文章 / 外部链接' },
                    { name: '跳转目标', required: true, desc: '根据跳转类型动态变更 label 与 placeholder，见「四、跳转类型说明」' },
                    { name: '保存 / 删除', required: false, desc: '每张卡片底部各有独立「保存」与「删除」按钮' },
                  ],
                },
              ].map((block) => (
                <div key={block.num} className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                  <div className="mb-0.5 font-bold text-slate-800">{block.num}</div>
                  <div className="mb-2 text-xs text-slate-500">{block.desc}</div>
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
              <span className="font-bold">校验规则：</span>同步城市未选 → 提示「请选择同步城市」；主标题（文字/图片）均为空 → 提示「请填写主标题」；两列一排布局下卡片达到 2 张 → 「新增卡片」按钮禁用，不可继续添加。
            </div>
          </section>

          {/* 四、跳转类型说明 */}
          <section className="rounded-2xl bg-white p-5 ring-1 ring-slate-200">
            <div className="mb-3 flex items-center justify-between gap-2">
              <h2 className="text-xl font-black">四、跳转类型说明</h2>
              <span className="rounded-full bg-slate-100 px-2 py-0.5 text-sm font-semibold text-slate-600">Jump Types</span>
            </div>
            <div className="overflow-hidden rounded-xl border border-slate-100">
              <table className="min-w-full border-collapse text-left text-sm">
                <thead className="bg-slate-100 text-xs uppercase text-slate-500">
                  <tr>
                    <th className="px-3 py-2">跳转类型</th>
                    <th className="px-3 py-2">字段 label</th>
                    <th className="px-3 py-2">Placeholder 示例</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['跳转页面', '页面路径', '/pages/detail/index'],
                    ['跳转小程序', '小程序 AppID', 'wx1234567890abcdef'],
                    ['跳转微信公众号文章', '公众号文章链接', 'https://mp.weixin.qq.com/...'],
                    ['外部链接', '外部链接', 'https://example.com'],
                  ].map(([type, label, placeholder], i) => (
                    <tr key={type} className={`border-t border-slate-100 ${i % 2 === 1 ? 'bg-slate-50' : ''}`}>
                      <td className="px-3 py-2 font-medium whitespace-nowrap">{type}</td>
                      <td className="px-3 py-2 text-slate-600">{label}</td>
                      <td className="px-3 py-2 font-mono text-xs text-slate-400">{placeholder}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-3 rounded-xl bg-slate-50 px-4 py-3 text-sm text-slate-600 ring-1 ring-slate-100">
              跳转类型切换时，跳转目标输入框的 label 与 placeholder 联动变更，引导运营填入正确格式。跳转类型与跳转目标均为必填，卡片保存时校验。
            </div>
          </section>

          {/* 五、详情页 */}
          <section className="rounded-2xl bg-white p-5 ring-1 ring-slate-200">
            <div className="mb-3 flex items-center justify-between gap-2">
              <h2 className="text-xl font-black">五、详情页</h2>
              <span className="rounded-full bg-slate-900 px-2 py-0.5 text-sm font-semibold text-slate-50">/admin/home-brand/[id]/detail</span>
            </div>
            <div className="mb-3 rounded-xl bg-slate-50 px-4 py-3 text-sm text-slate-600 ring-1 ring-slate-100">
              只读查看页，顶部面包屑「前台管理 / 首页品牌管理 / 详情」，右上角提供「返回列表」与「去编辑」按钮。
            </div>
            <div className="grid gap-3 sm:grid-cols-2 text-sm">
              <div className="rounded-xl bg-slate-50 p-4 ring-1 ring-slate-100">
                <div className="mb-2 font-bold text-slate-800">区域基本信息卡片</div>
                <ul className="space-y-1 text-slate-600">
                  <li>• 左侧 56×56 区域图标占位块（无图时灰色）</li>
                  <li>• 主标题大字粗体展示</li>
                  <li>• 四列元数据：同步城市 / 创建时间 / 更新时间 / 区域 ID</li>
                  <li>• 顶部 Tag 行：发布状态 / 布局类型 / 卡片张数</li>
                </ul>
              </div>
              <div className="rounded-xl bg-slate-50 p-4 ring-1 ring-slate-100">
                <div className="mb-2 font-bold text-slate-800">卡片配置列表</div>
                <ul className="space-y-1 text-slate-600">
                  <li>• 按前台展示顺序逐行列出</li>
                  <li>• 字段：序号 / 标题 / 跳转类型（Tag）/ 跳转目标</li>
                  <li>• 跳转目标和跳转类型列在小屏隐藏（lg/md 响应式）</li>
                  <li>• 无卡片时展示「暂无卡片」占位提示</li>
                </ul>
              </div>
            </div>
          </section>

          {/* 六、字段默认值 */}
          <section className="rounded-2xl bg-white p-5 ring-1 ring-slate-200">
            <div className="mb-3 flex items-center justify-between gap-2">
              <h2 className="text-xl font-black">六、字段默认值（新建时）</h2>
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
                    ['同步城市', '空（必选）', '新建时未选，保存时校验'],
                    ['区域图标', '无', '选填，不上传时显示灰色占位'],
                    ['主标题类型', '文字', 'Radio 默认选中「文字」选项'],
                    ['主标题（文字）', '空（必填）', '与图片二选一，均空时校验不通过'],
                    ['布局', '两列一排', '新建时默认选中两列一排'],
                    ['卡片数量', '2 张', '两列一排默认带 2 张空白卡片'],
                    ['卡片跳转类型', '跳转页面', '每张卡片默认跳转类型为「跳转页面」'],
                    ['发布状态', '草稿', '新建保存后为草稿，需手动发布'],
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

          {/* 七、操作流程 */}
          <section className="rounded-2xl bg-white p-5 ring-1 ring-slate-200">
            <div className="mb-3 flex items-center justify-between gap-2">
              <h2 className="text-xl font-black">七、操作流程</h2>
              <span className="rounded-full bg-slate-100 px-2 py-0.5 text-sm font-semibold text-slate-600">Flow</span>
            </div>
            <div className="mb-4 flex flex-wrap items-center gap-2 text-sm">
              {[
                { label: '新增品牌区域', color: 'bg-slate-200 text-slate-700' },
                { label: '→' },
                { label: '配置三区块', color: 'bg-amber-100 text-amber-800' },
                { label: '→' },
                { label: '保存（草稿）', color: 'bg-yellow-100 text-yellow-800' },
                { label: '→ 确认无误 →' },
                { label: '发布生效', color: 'bg-green-100 text-green-800' },
                { label: '→' },
                { label: '小程序首页展示', color: 'bg-amber-100 text-amber-800' },
              ].map((s, i) =>
                s.color
                  ? <span key={i} className={`rounded-full px-2.5 py-1 font-semibold ${s.color}`}>{s.label}</span>
                  : <span key={i} className="text-slate-400">{s.label}</span>
              )}
            </div>
            <div className="grid gap-2 text-sm sm:grid-cols-3">
              {[
                ['保存', '将当前配置存为草稿，不影响已发布的线上版本，可随时继续编辑。'],
                ['发布生效', '弹出确认弹窗，确认后品牌区域立即在对应城市小程序首页上线。'],
                ['下线', '列表页点击「下线」，将已发布区域切换回草稿，前台立即停止展示。'],
              ].map(([op, desc]) => (
                <div key={op} className="rounded-xl bg-slate-50 p-3 ring-1 ring-slate-100">
                  <div className="mb-1 font-bold text-slate-800">{op}</div>
                  <p className="text-slate-600">{desc}</p>
                </div>
              ))}
            </div>
            <div className="mt-3 rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-800 ring-1 ring-amber-100">
              <span className="font-bold">注意：</span>发布后将立即在对应城市小程序首页中间区域展示，建议在低峰期操作。下线操作同样即时生效，无需额外确认弹窗。
            </div>
          </section>

          {/* 八、页面路由汇总 */}
          <section className="rounded-2xl bg-white p-5 ring-1 ring-slate-200">
            <div className="mb-3 flex items-center justify-between gap-2">
              <h2 className="text-xl font-black">八、页面路由汇总</h2>
              <span className="rounded-full bg-slate-100 px-2 py-0.5 text-sm font-semibold text-slate-600">Routes</span>
            </div>
            <div className="overflow-hidden rounded-xl border border-slate-100">
              <table className="min-w-full border-collapse text-left text-sm">
                <thead className="bg-slate-100 text-xs uppercase text-slate-500">
                  <tr>
                    <th className="px-3 py-2">页面</th>
                    <th className="px-3 py-2">路由</th>
                    <th className="px-3 py-2">说明</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['品牌区域列表', '/admin/home-brand', '列表页，支持搜索筛选与状态管理'],
                    ['新建品牌区域', '/admin/home-brand/create', '三区块配置页，新建流程入口'],
                    ['编辑品牌区域', '/admin/home-brand/[id]', '三区块配置页，编辑已有区域'],
                    ['品牌区域详情', '/admin/home-brand/[id]/detail', '只读详情页，展示区域配置与卡片列表'],
                  ].map(([page, route, desc], i) => (
                    <tr key={page} className={`border-t border-slate-100 ${i % 2 === 1 ? 'bg-slate-50' : ''}`}>
                      <td className="px-3 py-2 font-medium whitespace-nowrap">{page}</td>
                      <td className="px-3 py-2 font-mono text-xs text-slate-600">{route}</td>
                      <td className="px-3 py-2 text-slate-500">{desc}</td>
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