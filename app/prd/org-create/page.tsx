import Link from 'next/link'

export default function PrdOrgCreatePage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <div className="mb-6 flex items-center justify-between gap-4">
          <Link href="/v1.9.0" className="inline-flex items-center gap-1.5 text-base font-bold text-slate-500 hover:text-slate-900">
            ← 返回 1.9.0 需求首页
          </Link>
          <div className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-3 py-1 text-sm font-semibold text-slate-50">
            <span className="h-1.5 w-1.5 rounded-full bg-rose-400" />
            AI 互动成长平台 · PRD
          </div>
        </div>

        <header className="mb-8 space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full bg-rose-100 px-2.5 py-1 text-sm font-bold text-rose-700 ring-1 ring-rose-200">
            <span>🏗️</span><span>系统管理 · 新建机构</span>
          </div>
          <h1 className="text-3xl font-black tracking-tight">新建机构 PRD</h1>
          <p className="max-w-3xl text-base leading-relaxed text-slate-600">
            本文档定义新建机构的功能规范（v1.9.0）。运营人员通过本页完成机构的完整信息录入，包括基础信息（名称、类型、部门、标签、认证标识、描述）与联系信息（联系人、电话、地址），底部「确认创建」提交后新机构进入系统。
          </p>
          <div className="flex flex-wrap gap-2 text-sm text-slate-500">
            <span className="rounded-full bg-white px-2 py-0.5 ring-1 ring-slate-200">版本：v1.9.0</span>
            <span className="rounded-full bg-white px-2 py-0.5 ring-1 ring-slate-200">角色：运营 / 管理员</span>
            <span className="rounded-full bg-white px-2 py-0.5 ring-1 ring-slate-200">路由：/admin/system/org-create</span>
          </div>
        </header>

        <div className="space-y-6">

          {/* 一、核心概念 */}
          <section className="rounded-2xl bg-white p-5 ring-1 ring-slate-200">
            <div className="mb-3 flex items-center justify-between gap-2">
              <h2 className="text-xl font-black">一、核心概念</h2>
              <span className="rounded-full bg-rose-50 px-2 py-0.5 text-sm font-semibold text-rose-700">Concepts</span>
            </div>
            <div className="space-y-3">
              <div className="rounded-xl bg-rose-50 p-4 ring-1 ring-rose-100">
                <div className="mb-1 text-sm font-bold text-rose-800">机构 = 基础信息（名称 + 类型 + 部门 + 标签 + 认证标识 + 描述）+ 联系信息（联系人 + 电话 + 地址）</div>
                <p className="text-sm leading-relaxed text-rose-900">
                  新建机构为单页表单，分「基础信息」与「联系信息」两个区块。<strong>机构名称</strong>与<strong>机构类型</strong>为必填字段，其余选填。标签支持多选，认证标识当前为单选（代码中切换逻辑为互斥选择）。地址通过地图弹窗选择，确认后回填至地址输入框。
                </p>
              </div>
              <div className="grid gap-3 sm:grid-cols-3">
                {[
                  { label: '标签多选', desc: '通过下拉选择框逐个添加，已选标签以胶囊 Tag 形式展示，点击「✕」可移除单个。' },
                  { label: '认证标识单选', desc: '通过下拉选择框选择，当前逻辑为互斥单选，选新标识会替换旧标识，胶囊 Tag 展示。' },
                  { label: '地图选址', desc: '点击「+ 选择地址」弹出地图弹窗，确认后地址文字回填，输入框只读不可手动编辑。' },
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
              <span className="rounded-full bg-slate-900 px-2 py-0.5 text-sm font-semibold text-slate-50">/admin/system/org-create</span>
            </div>
            <div className="mb-3 rounded-xl bg-slate-50 px-4 py-3 text-sm text-slate-600 ring-1 ring-slate-100">
              顶部面包屑「系统管理 / 系统机构管理」，右上角「返回后台首页」按钮。主体为单张白卡，内含两个区块：「基础信息」与「联系信息」，底部操作栏含「取消」（跳回机构类型列表）与「确认创建」按钮。
            </div>
            <div className="space-y-3">
              {[
                {
                  num: '① 基础信息区块',
                  fields: [
                    { name: '所属部门', required: false, desc: '下拉单选，选项：总部 / 西安 / 其他，选填' },
                    { name: '机构名称', required: true, desc: '必填，文字输入框，placeholder「请输入机构名称」，为空提交时弹 alert「请填写机构名称」' },
                    { name: '机构类型', required: true, desc: '必填，下拉单选，选项来自机构类型字典（官方机构 / 国企单位 / 社会机构等），未选提交时弹 alert「请选择机构类型」' },
                    { name: '选择标签', required: false, desc: '下拉多选，每次从下拉选中一个标签追加；已选标签以蓝色胶囊展示，点击「✕」移除' },
                    { name: '选择认证标识', required: false, desc: '下拉单选（互斥），每次从下拉选中一个标识替换旧值；已选以绿色胶囊展示，点击「✕」移除' },
                    { name: '机构描述', required: false, desc: '多行文本域，高度约 96px，placeholder「请输入机构描述」' },
                  ],
                },
                {
                  num: '② 联系信息区块',
                  fields: [
                    { name: '联系人', required: false, desc: '文字输入框，两列布局左侧，placeholder「请输入联系人」' },
                    { name: '联系电话', required: false, desc: '文字输入框，两列布局右侧，placeholder「请输入联系电话」' },
                    { name: '机构地址', required: false, desc: '只读输入框 + 「+ 选择地址」按钮，点击按钮弹出地图弹窗，确认后回填地址文字' },
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
          </section>

          {/* 三、地图选址弹窗 */}
          <section className="rounded-2xl bg-white p-5 ring-1 ring-slate-200">
            <div className="mb-3 flex items-center justify-between gap-2">
              <h2 className="text-xl font-black">三、地图选址弹窗</h2>
              <span className="rounded-full bg-slate-100 px-2 py-0.5 text-sm font-semibold text-slate-600">Map Modal</span>
            </div>
            <div className="mb-3 rounded-xl bg-slate-50 px-4 py-3 text-sm text-slate-600 ring-1 ring-slate-100">
              点击「+ 选择地址」按钮触发，弹窗宽度最大 672px，包含地图区域（占位 384px 高灰色块，集成地图 API 后替换）、选中地址只读输入框，底部「取消」与「确认选择」按钮。确认后将地址文字回填至表单地址字段。
            </div>
            <div className="grid gap-3 sm:grid-cols-2 text-sm">
              {[
                {
                  label: '地图区域',
                  items: [
                    '当前为灰色占位块，高度 384px，显示「地图选择区域」提示文字',
                    '集成地图 API 后展示真实地图，支持点击选点',
                    '点击地图时将坐标转换为地址文字填入下方输入框',
                  ],
                },
                {
                  label: '弹窗交互',
                  items: [
                    '「取消」：关闭弹窗，不修改表单地址字段',
                    '「确认选择」：将选中地址回填至表单（原型中固定回填「晋江市青阳街道」）',
                    '地址输入框只读，不允许手动输入，必须通过地图点选',
                  ],
                },
              ].map((s) => (
                <div key={s.label} className="rounded-xl bg-slate-50 p-4 ring-1 ring-slate-100">
                  <div className="mb-2 font-bold text-slate-800">{s.label}</div>
                  <ul className="space-y-1 text-slate-600">
                    {s.items.map((item, i) => <li key={i}>• {item}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* 四、字段总览与校验规则 */}
          <section className="rounded-2xl bg-white p-5 ring-1 ring-slate-200">
            <div className="mb-3 flex items-center justify-between gap-2">
              <h2 className="text-xl font-black">四、字段总览与校验规则</h2>
              <span className="rounded-full bg-slate-100 px-2 py-0.5 text-sm font-semibold text-slate-600">Fields</span>
            </div>
            <div className="overflow-hidden rounded-xl border border-slate-100">
              <table className="min-w-full border-collapse text-left text-sm">
                <thead className="bg-slate-100 text-xs uppercase text-slate-500">
                  <tr>
                    <th className="px-3 py-2">字段</th>
                    <th className="px-3 py-2">必填</th>
                    <th className="px-3 py-2">类型</th>
                    <th className="px-3 py-2">校验 / 说明</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['所属部门', '否', '下拉单选', '选项：总部 / 西安 / 其他，不选则 department 为空字符串'],
                    ['机构名称', '是', '文字输入', '为空提交时 alert「请填写机构名称」，阻止提交'],
                    ['机构类型', '是', '下拉单选', '未选提交时 alert「请选择机构类型」，阻止提交'],
                    ['选择标签', '否', '下拉多选', '每次从下拉选中追加，支持多个；已选胶囊可移除'],
                    ['选择认证标识', '否', '下拉单选（互斥）', '选新值替换旧值；已选胶囊可移除，移除后 badges 为空数组'],
                    ['机构描述', '否', '多行文本', '无长度校验，选填'],
                    ['联系人', '否', '文字输入', '选填，无格式校验'],
                    ['联系电话', '否', '文字输入', '选填，当前无格式校验'],
                    ['机构地址', '否', '只读 + 地图选择', '通过地图弹窗回填，不可手动输入'],
                  ].map(([f, req, type, note], i) => (
                    <tr key={f} className={`border-t border-slate-100 ${i % 2 === 1 ? 'bg-slate-50' : ''}`}>
                      <td className="px-3 py-2 font-medium whitespace-nowrap">{f}</td>
                      <td className={`px-3 py-2 font-semibold ${req === '是' ? 'text-rose-600' : 'text-slate-400'}`}>{req}</td>
                      <td className="px-3 py-2 text-slate-600 whitespace-nowrap">{type}</td>
                      <td className="px-3 py-2 text-slate-500 text-xs">{note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-3 rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-800 ring-1 ring-amber-100">
              <span className="font-bold">提交流程：</span>点击「确认创建」→ 前端校验必填项 → 校验通过后 <code className="rounded bg-amber-100 px-1 text-xs">isSubmitting</code> 置 true（按钮显示「创建中...」）→ 模拟 1s 延迟提交 → 成功后 alert 提示「机构创建成功！」→ 重置表单所有字段为初始空值。
            </div>
          </section>

          {/* 五、操作按钮说明 */}
          <section className="rounded-2xl bg-white p-5 ring-1 ring-slate-200">
            <div className="mb-3 flex items-center justify-between gap-2">
              <h2 className="text-xl font-black">五、操作按钮说明</h2>
              <span className="rounded-full bg-slate-100 px-2 py-0.5 text-sm font-semibold text-slate-600">Actions</span>
            </div>
            <div className="grid gap-2 text-sm sm:grid-cols-3">
              {[
                ['返回后台首页', '顶部右侧，跳转至 /admin，不保存任何表单数据'],
                ['取消', '底部左侧，跳转至 /admin/system/org-types（机构类型列表），不保存表单'],
                ['确认创建', '底部右侧，触发表单校验与提交；提交中显示「创建中...」并禁用按钮'],
              ].map(([op, desc]) => (
                <div key={op} className="rounded-xl bg-slate-50 p-3 ring-1 ring-slate-100">
                  <div className="mb-1 font-bold text-slate-800">{op}</div>
                  <p className="text-slate-600">{desc}</p>
                </div>
              ))}
            </div>
            <div className="mt-3 rounded-xl bg-slate-50 px-4 py-3 text-sm text-slate-600 ring-1 ring-slate-100">
              <span className="font-bold">数据引用来源：</span>机构类型选项来自「机构类型管理」字典，标签来自「机构标签管理」字典，认证标识来自「认证标识管理」字典（仅展示启用状态的标识）。
            </div>
          </section>

        </div>
      </div>
    </main>
  )
}
