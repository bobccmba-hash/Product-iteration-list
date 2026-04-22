import Link from 'next/link'

const sections = [
  {
    title: '一、背景 / Context',
    items: ['1.9.1 版本需要在套餐维度引入结算价能力，用于支持平台承担手续费的业务场景。'],
  },
  {
    title: '二、目标 / Goal',
    items: ['在套餐管理列表和套餐填写弹窗中补充结算价能力，并通过是否填写结算价判断手续费承担方式。'],
  },
  {
    title: '三、范围 / Scope',
    items: ['In Scope：列表展示、指定日期弹窗、范围日期弹窗、校验提示、复制继承提示。', 'Out of Scope：真实财务结算引擎、订单历史回补、真实模板配置后台。'],
  },
  {
    title: '四、核心用户流程 / Core User Flow',
    items: ['用户进入平台结算价独立详情页。', '查看套餐列表中的结算价展示。', '点击指定日期或范围日期套餐“编辑”。', '在对应弹窗中填写/不填写结算价并保存。'],
  },
  {
    title: '五、交互设计 / Interaction Design',
    items: ['列表中有值显示金额，无值显示 --。', '有值时金额下方显示绿色说明“平台承担手续费”。', '指定日期模式与范围日期模式使用不同弹窗。', '结算价输入位于平台价下方、会员价上方。', '填写结算价后显示绿色说明；会员价低于结算价时显示橙色提醒。'],
  },
  {
    title: '六、业务规则 / Business Rules',
    items: ['结算价为套餐级字段。', '结算价填写后，当前套餐手续费由平台承担。', '未填写结算价时，按商家手续费模板执行。', '结算价优先级高于商家手续费模板。', '不同套餐可分别决定是否平台承担手续费。', '复制商品时结算价跟随原套餐继承。'],
  },
  {
    title: '七、字段与校验 / Data & Validation',
    items: ['结算价非必填。', '仅允许输入数字，最多两位小数。', '不能小于 0.01。', '不能大于平台价，报错为“结算价不能大于平台价”。'],
  },
  {
    title: '八、已实现方式 / Current Implementation',
    items: ['平台结算价采用独立详情页链路展示。', '列表行编辑根据时间模式分流到不同弹窗组件。', '指定日期弹窗支持校验、提醒与保存反馈。', '范围日期弹窗与指定日期弹窗视觉结构分离。'],
  },
  {
    title: '九、验收标准 / Acceptance Criteria',
    items: ['列表展示符合有值/无值规则。', '指定日期与范围日期点击编辑弹出不同弹窗。', '结算价字段位置与文案符合定义。', '填写后有平台承担手续费提示。', '复制商品页出现结算价继承提示。'],
  },
  {
    title: '十、测试用例 / Test Cases',
    items: ['用例1：结算价为空时列表显示 --。', '用例2：结算价有值时列表显示金额和绿色说明。', '用例3：指定日期与范围日期分别打开不同弹窗。', '用例4：输入超过两位小数或非数字被限制。', '用例5：结算价大于平台价时报错。', '用例6：会员价低于结算价出现橙色提醒。', '用例7：复制商品页显示结算价继承提示。'],
  },
]

export default function SettlementRequirementDocPage() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-6">
          <Link href="/v1.9.1" className="text-sm font-semibold text-slate-500 hover:text-slate-900">
            ← 返回1.9.1迭代需求
          </Link>
        </div>

        <h1 className="text-3xl font-black tracking-tight">平台结算价 - PRD需求说明</h1>
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
