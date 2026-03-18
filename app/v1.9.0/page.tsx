import Link from 'next/link'

const prdDocs = [
  { title: '学校终端流程', desc: '完整的用户交互流程设计，涵盖新老用户路径与成长反馈机制。', href: '/prd/terminal', pill: '前台' },
  { title: '任务配置后台', desc: '任务规则的配置与分发管理平台。', href: '/prd/admin-config', pill: '后台' },
  { title: '排行榜系统', desc: '学习之星排行榜的规则配置与展示逻辑。', href: '/prd/ranking', pill: '后台' },
  { title: '成长档案', desc: '学生成长档案、事件流水与统计视图。', href: '/prd/growth-data', pill: '数据' },
  { title: '评论规则管理', desc: '配置评论审核规则、灌水识别、提示文案等内容管理策略。', href: '/prd/comment-rules', pill: '后台' },
  { title: '首页品牌管理', desc: '配置首页品牌展示区域、标题、布局与品牌卡片跳转。', href: '/prd/home-brand', pill: '后台' },
  { title: '机构类型管理', desc: '创建和管理机构类型分类，支持新增、编辑、删除操作。', href: '/prd/org-types', pill: '系统' },
  { title: '机构标签管理', desc: '管理机构特征标签，支持多选标签为机构分类和筛选。', href: '/prd/org-tags', pill: '系统' },
  { title: '认证标识管理', desc: '管理机构认证、推荐、活动等标识，支持图片上传和状态控制。', href: '/prd/org-badges', pill: '系统' },
  { title: '新建机构', desc: '创建新机构并配置类型、标签、认证标识、部门、地址等信息。', href: '/prd/org-create', pill: '系统' },
]

const sections = [
  {
    title: '交互原型', icon: '🎨', desc: '前端交互设计与用户体验原型',
    items: [
      { title: '新用户流程', desc: '首次使用的完整体验路径（9:16 竖屏）。', href: '/terminal/welcome?type=new' },
      { title: '老用户流程', desc: '返回用户的欢迎与任务展示流程。', href: '/terminal/welcome?type=returning' },
      { title: '简化流程', desc: '无成长系统的基础互动体验。', href: '/terminal/welcome?type=no-growth' },
    ],
  },
  {
    title: '管理系统', icon: '🛠️', desc: '产品运营与数据管理后台',
    items: [
      { title: '任务设定管理', desc: '任务规则的配置与发布。', href: '/admin/config/tasks' },
      { title: '学习之星管理', desc: '学习之星规则配置与样式自定义。', href: '/admin/ranking' },
      { title: '学生成长档案', desc: '学生成长档案查询与分析。', href: '/admin/data/growth' },
      { title: '评论规则管理', desc: '配置评论校验规则、灌水识别、提示文案。', href: '/admin/comment-rules' },
      { title: '首页品牌管理', desc: '配置首页品牌展示区域：标题、布局与品牌卡片跳转。', href: '/admin/home-brand' },
      { title: '机构标签管理', desc: '为机构建立可扩展的分类、特征与认证体系。', href: '/admin/system/org-types' },
    ],
  },
]

const iterationData = [
  { feature: '终端任务设定功能', href: '/admin/config/tasks', description: '完善终端任务设定功能，作为学生在学校终端进行持续互动的短周期激励机制。' },
  { feature: '终端成长档案功能', href: '/admin/data/growth', description: '完善终端成长档案功能，支持在学生被终端识别后自动建立成长档案。' },
  { feature: '学习之星设定功能', href: '/admin/ranking', description: '完善学习之星设定功能，支持后台按学校维度配置展示规则。' },
  { feature: '评价功能限制功能', href: '/admin/comment-rules', description: '设置规则，不允许用户随意评价，字数 >= 8，至少包含 2 个汉字。' },
  { feature: '首页版面调整', href: '/admin/home-brand', description: '首页中间区域增加品牌展示区域，新增首页品牌管理。' },
  { feature: '清新旅游的主页调整', href: null, description: '根据业主需求，UI设计，设计清新旅游的机构主页。' },
  { feature: '全部机构调整', href: null, description: '首页全部机构名称换成：机构广场，对页面排版重新设计。' },
  { feature: '新增机构类型和标签功能', href: '/admin/system/org-types', description: '后台新增对机构的类型和标签进行管理设置。' },
  { feature: '团市委相关周边设计', href: null, description: '团市委相关盲盒包装、卡牌设计、IP形象设计。' },
]

export default function V190Page() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <div className="border-b border-slate-200 bg-gradient-to-b from-slate-50 to-white">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="mb-4">
            <Link href="/" className="text-sm font-semibold text-slate-500 hover:text-slate-900">← 返回迭代列表</Link>
          </div>
          <div className="space-y-3 mb-6">
            <div className="inline-flex items-center gap-2 rounded-lg bg-blue-50 px-3 py-1.5 text-sm font-medium text-blue-700">
              <span className="h-2 w-2 rounded-full bg-blue-500" />
              1.9.0 迭代需求
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-slate-900">1.9.0 迭代需求内容</h1>
            <p className="max-w-2xl text-lg text-slate-600">研发迭代需求演示平台。</p>
          </div>
          <div className="overflow-x-auto rounded-lg border border-slate-200">
            <table className="min-w-full border-collapse">
              <thead className="bg-slate-900 text-white">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold">迭代版本</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">日期</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">迭代功能点</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">功能需求描述</th>
                </tr>
              </thead>
              <tbody>
                {iterationData.map((item, idx) => (
                  <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                    {idx === 0 && <td rowSpan={iterationData.length} className="px-4 py-3 text-sm font-semibold text-slate-900 whitespace-nowrap border-r border-slate-200 align-middle text-center">1.9.0版本</td>}
                    {idx === 0 && <td rowSpan={iterationData.length} className="px-4 py-3 text-sm text-slate-600 whitespace-nowrap border-r border-slate-200 align-middle text-center">2026.03.11</td>}
                    <td className="px-4 py-3 text-sm font-semibold text-slate-900 whitespace-nowrap">
                      {item.href ? (
                        <Link href={item.href} className="text-blue-600 hover:text-blue-800 hover:underline">{item.feature}</Link>
                      ) : (
                        item.feature
                      )}
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-600 max-w-md">{item.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8">
          {sections.map((section) => (
            <section key={section.title} className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{section.icon}</span>
                  <h2 className="text-2xl font-bold text-slate-900">{section.title}</h2>
                </div>
                <p className="text-slate-600">{section.desc}</p>
              </div>
              <div className={`grid gap-3 ${section.title === '管理系统' ? 'sm:grid-cols-2 lg:grid-cols-3' : 'sm:grid-cols-1 lg:grid-cols-2'}`}>
                {section.items.map((item) => (
                  <Link key={item.href} href={item.href} className="group block rounded-lg border border-slate-200 bg-white p-4 transition hover:border-blue-300 hover:bg-blue-50">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <h3 className="font-semibold text-slate-900 group-hover:text-blue-700">{item.title}</h3>
                        <p className="mt-1 text-sm text-slate-600">{item.desc}</p>
                      </div>
                      <div className="text-slate-400 group-hover:text-blue-600">→</div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>

        <div className="mt-16 space-y-6 border-t border-slate-200 pt-12">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-slate-900">产品文档</h2>
            <p className="text-slate-600">完整的需求说明与设计规范，支持开发与设计评审。</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {prdDocs.map((doc) => (
              <Link key={doc.href} href={doc.href} className="group rounded-lg border border-slate-200 bg-white p-4 transition hover:border-blue-300 hover:shadow-md">
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-semibold text-slate-900 group-hover:text-blue-700">{doc.title}</h3>
                    <span className="inline-flex items-center rounded-full bg-slate-100 px-2 py-1 text-xs font-medium text-slate-700 group-hover:bg-blue-100 group-hover:text-blue-700">{doc.pill}</span>
                  </div>
                  <p className="text-sm text-slate-600">{doc.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
