import Link from 'next/link'

const sections = [
  {
    title: '一、背景 / Context',
    items: ['1.9.1 版本需要在既有后台风格下新增商品复制能力，用于提升相似商品创建效率。'],
  },
  {
    title: '二、目标 / Goal',
    items: ['允许运营在商品列表页直接复制既有商品，并按既定编辑流程完成新商品配置。'],
  },
  {
    title: '三、范围 / Scope',
    items: ['In Scope：列表复制入口、复制弹窗、复制编辑页四个页签、按钮流转。', 'Out of Scope：真实保存接口、真实商品数据库写入、审批工作流后端实现。'],
  },
  {
    title: '四、核心用户流程 / Core User Flow',
    items: ['用户在列表页点击“复制”。', '弹出复制弹窗，填写/确认新商品标题。', '确认后进入复制商品编辑页。', '按“基本信息 → 图文描述 → 套餐管理 → 运营审核”顺序处理并提交。'],
  },
  {
    title: '五、交互设计 / Interaction Design',
    items: ['列表页操作列新增“复制”入口。', '复制弹窗居中显示，并提示来源商品信息。', '前3个页签底部按钮为“保存 / 下一步”。', '运营审核页底部按钮为“完成提交商品 / 完成，提交并审核通过”。', '不提供保存草稿。'],
  },
  {
    title: '六、业务规则 / Business Rules',
    items: ['复制后继承原商品的大部分配置。', '运营状态、统计数据等不按原商品历史值延续。', '复制商品链路与平台结算价独立链路分离。', '复制页需提示检查时间、图片、套餐等继承内容。'],
  },
  {
    title: '七、已实现方式 / Current Implementation',
    items: ['通过 URL 参数 mode、productId、tab 驱动复制编辑态。', '使用单页面内条件渲染完成列表/编辑/弹窗切换。', '保持现有后台管理视觉语言，不新建后台体系。'],
  },
  {
    title: '八、验收标准 / Acceptance Criteria',
    items: ['列表页存在复制入口。', '点击复制后出现弹窗并可进入编辑页。', '四个页签顺序正确。', '每个页签按钮文案符合定义。', '运营审核页不出现保存草稿。'],
  },
  {
    title: '九、测试用例 / Test Cases',
    items: ['用例1：点击复制弹出复制弹窗。', '用例2：确认后进入复制编辑页 basic tab。', '用例3：基本信息/图文描述/套餐管理点击下一步顺序正确。', '用例4：运营审核页显示双完成按钮。', '用例5：页面可从 1.9.1 返回并支持 URL 直达。'],
  },
]

export default function ProductCopyRequirementDocPage() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-6">
          <Link href="/v1.9.1" className="text-sm font-semibold text-slate-500 hover:text-slate-900">
            ← 返回1.9.1迭代需求
          </Link>
        </div>

        <h1 className="text-3xl font-black tracking-tight">商品功能复制 - PRD需求说明</h1>
        <p className="mt-3 text-slate-600">基于当前代码实现整理的产品需求文档，采用统一 PRD 结构描述当前已实现能力。</p>

        <div className="mt-8 space-y-6">
          {sections.map((s) => (
            <section key={s.title} className="rounded-xl border border-slate-200 bg-white p-5">
              <h2 className="text-xl font-bold text-slate-900">{s.title}</h2>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6 text-slate-700">
                {s.items.map((it) => (
                  <li key={it}>{it}</li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </main>
  )
}
