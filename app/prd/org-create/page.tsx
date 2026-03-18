import Link from 'next/link'

export default function PrdOrgCreatePage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <div className="mb-6 flex items-center justify-between gap-4">
          <Link href="/v1.9.0" className="inline-flex items-center gap-1.5 text-base font-bold text-slate-500 hover:text-slate-900">
            ← 返回首页
          </Link>
          <div className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-3 py-1 text-sm font-semibold text-slate-50">
            <span className="h-1.5 w-1.5 rounded-full bg-rose-400" />
            AI 互动成长平台 · PRD
          </div>
        </div>

        <header className="mb-8 space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full bg-rose-100 px-2.5 py-1 text-sm font-bold text-rose-700 ring-1 ring-rose-200">
            <span className="text-sm">🏗️</span>
            <span>新建机构 · 配置后台</span>
          </div>
          <h1 className="text-4xl font-black tracking-tight">新建机构 PRD</h1>
          <p className="max-w-3xl text-lg leading-relaxed text-slate-600">
            本文档定义新建机构的功能规范，包括机构基本信息、类型选择、标签配置、认证标识、部门选择、地址选择等功能。
          </p>
        </header>

        <div className="space-y-6">
          <section className="rounded-2xl bg-white p-6 ring-1 ring-slate-200">
            <h2 className="mb-4 text-2xl font-black text-slate-900">一、业务目标 &amp; 使用场景</h2>
            <div className="grid gap-6 text-base text-slate-700 sm:grid-cols-2">
              <div className="space-y-2">
                <h3 className="text-lg font-bold">业务目标</h3>
                <ul className="list-inside list-disc space-y-1.5 text-sm">
                  <li>提供完整的机构创建流程</li>
                  <li>支持机构的多维度配置</li>
                  <li>实现机构信息的完整录入</li>
                  <li>支持地址的地图选择</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-bold">使用场景</h3>
                <ul className="list-inside list-disc space-y-1.5 text-sm">
                  <li>管理员创建新机构</li>
                  <li>配置机构基本信息</li>
                  <li>选择机构类型和标签</li>
                  <li>配置认证标识和地址</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="rounded-2xl bg-white p-6 ring-1 ring-slate-200">
            <h2 className="mb-4 text-2xl font-black text-slate-900">二、核心功能</h2>
            <div className="space-y-3 text-sm text-slate-700">
              <div className="rounded-lg bg-rose-50 p-4">
                <p className="text-lg font-bold">2.1 基础信息配置</p>
                <p className="mt-2 text-sm">配置机构名称、描述、联系人、电话等基本信息</p>
              </div>
              <div className="rounded-lg bg-rose-50 p-4">
                <p className="text-lg font-bold">2.2 类型和部门选择</p>
                <p className="mt-2 text-sm">选择机构类型和所属部门，支持下拉选择</p>
              </div>
              <div className="rounded-lg bg-rose-50 p-4">
                <p className="text-lg font-bold">2.3 标签和认证标识配置</p>
                <p className="mt-2 text-sm">支持多选标签和认证标识，实时显示已选项</p>
              </div>
              <div className="rounded-lg bg-rose-50 p-4">
                <p className="text-lg font-bold">2.4 地址选择</p>
                <p className="mt-2 text-sm">支持地图选择地址，提供地址搜索和确认功能</p>
              </div>
            </div>
          </section>

          <section className="rounded-2xl bg-white p-6 ring-1 ring-slate-200">
            <h2 className="mb-4 text-2xl font-black text-slate-900">三、后台界面规范</h2>
            <div className="space-y-4 text-sm text-slate-700">
              <div className="rounded-lg bg-slate-50 p-4">
                <p className="text-lg font-bold">3.1 基础信息区域</p>
                <ul className="mt-2 list-inside list-disc space-y-1 text-sm">
                  <li>机构名称输入框（必填）</li>
                  <li>机构类型下拉选择（必填）</li>
                  <li>所属部门下拉选择</li>
                  <li>机构描述文本框</li>
                </ul>
              </div>
              <div className="rounded-lg bg-slate-50 p-4">
                <p className="text-lg font-bold">3.2 标签和认证标识区域</p>
                <ul className="mt-2 list-inside list-disc space-y-1 text-sm">
                  <li>标签多选按钮组</li>
                  <li>认证标识多选按钮组</li>
                  <li>已选项显示区域</li>
                </ul>
              </div>
              <div className="rounded-lg bg-slate-50 p-4">
                <p className="text-lg font-bold">3.3 联系信息区域</p>
                <ul className="mt-2 list-inside list-disc space-y-1 text-sm">
                  <li>联系人输入框</li>
                  <li>联系电话输入框</li>
                  <li>机构地址选择（含地图弹窗）</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="rounded-2xl bg-white p-6 ring-1 ring-slate-200">
            <h2 className="mb-4 text-2xl font-black text-slate-900">四、数据模型</h2>
            <div className="space-y-3 text-sm text-slate-700">
              <div className="rounded-lg bg-slate-50 p-4">
                <p className="font-bold text-base">机构表</p>
                <p className="mt-2 font-mono text-xs">id, name, type_id, dept_id, description, contact, phone, address, status, created_at, updated_at</p>
              </div>
              <div className="rounded-lg bg-slate-50 p-4">
                <p className="font-bold text-base">机构标签关联表</p>
                <p className="mt-2 font-mono text-xs">id, org_id, tag_id, created_at</p>
              </div>
              <div className="rounded-lg bg-slate-50 p-4">
                <p className="font-bold text-base">机构标识关联表</p>
                <p className="mt-2 font-mono text-xs">id, org_id, badge_id, created_at</p>
              </div>
            </div>
          </section>

          <section className="rounded-2xl bg-white p-6 ring-1 ring-slate-200">
            <h2 className="mb-4 text-2xl font-black text-slate-900">五、测试用例设计</h2>
            <div className="space-y-4 text-sm text-slate-700">
              <div>
                <div className="mb-3 text-lg font-bold">5.1 常规功能测试用例</div>
                <div className="overflow-x-auto rounded-xl border border-slate-100 bg-slate-50">
                  <table className="min-w-full border-collapse text-left text-xs">
                    <thead className="bg-slate-100 uppercase tracking-wide text-slate-500">
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
                        <td className="px-3 py-2 align-top font-mono">TC-ORG-001</td>
                        <td className="px-3 py-2 align-top">功能 · 创建机构</td>
                        <td className="px-3 py-2 align-top">具备机构创建权限</td>
                        <td className="px-3 py-2 align-top">1)进入新建机构 2)填写基础信息 3)选择类型、部门 4)选择标签、标识 5)填写联系信息 6)选择地址 7)提交</td>
                        <td className="px-3 py-2 align-top">机构创建成功，列表显示新机构</td>
                      </tr>
                      <tr className="border-t border-slate-100 bg-white/60">
                        <td className="px-3 py-2 align-top font-mono">TC-ORG-002</td>
                        <td className="px-3 py-2 align-top">功能 · 选择标签</td>
                        <td className="px-3 py-2 align-top">—</td>
                        <td className="px-3 py-2 align-top">1)进入新建机构 2)点击标签按钮 3)多选标签 4)查看已选项</td>
                        <td className="px-3 py-2 align-top">标签选择成功，已选项正确显示</td>
                      </tr>
                      <tr className="border-t border-slate-100">
                        <td className="px-3 py-2 align-top font-mono">TC-ORG-003</td>
                        <td className="px-3 py-2 align-top">功能 · 选择认证标识</td>
                        <td className="px-3 py-2 align-top">—</td>
                        <td className="px-3 py-2 align-top">1)进入新建机构 2)点击认证标识按钮 3)多选标识 4)查看已选项</td>
                        <td className="px-3 py-2 align-top">标识选择成功，已选项正确显示</td>
                      </tr>
                      <tr className="border-t border-slate-100 bg-white/60">
                        <td className="px-3 py-2 align-top font-mono">TC-ORG-004</td>
                        <td className="px-3 py-2 align-top">功能 · 地址选择</td>
                        <td className="px-3 py-2 align-top">—</td>
                        <td className="px-3 py-2 align-top">1)进入新建机构 2)点击新增地址 3)在地图上选择 4)确认</td>
                        <td className="px-3 py-2 align-top">地址选择成功，地址字段显示选中地址</td>
                      </tr>
                      <tr className="border-t border-slate-100">
                        <td className="px-3 py-2 align-top font-mono">TC-ORG-005</td>
                        <td className="px-3 py-2 align-top">功能 · 表单验证</td>
                        <td className="px-3 py-2 align-top">—</td>
                        <td className="px-3 py-2 align-top">1)进入新建机构 2)不填写必填项 3)点击提交</td>
                        <td className="px-3 py-2 align-top">系统提示必填项错误，提交失败</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div>
                <div className="mb-3 text-lg font-bold">5.2 非常规 / 暴力测试用例</div>
                <div className="overflow-x-auto rounded-xl border border-slate-100 bg-slate-50">
                  <table className="min-w-full border-collapse text-left text-xs">
                    <thead className="bg-slate-100 uppercase tracking-wide text-slate-500">
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
                        <td className="px-3 py-2 align-top font-mono">TC-ORG-101</td>
                        <td className="px-3 py-2 align-top">异常 · 名称长度边界</td>
                        <td className="px-3 py-2 align-top">—</td>
                        <td className="px-3 py-2 align-top">1)进入新建机构 2)名称输入0/1/100/500字符 3)提交</td>
                        <td className="px-3 py-2 align-top">系统校验长度，超限显示错误，允许范围内提交成功</td>
                      </tr>
                      <tr className="border-t border-slate-100 bg-white/60">
                        <td className="px-3 py-2 align-top font-mono">TC-ORG-102</td>
                        <td className="px-3 py-2 align-top">异常 · 电话格式验证</td>
                        <td className="px-3 py-2 align-top">—</td>
                        <td className="px-3 py-2 align-top">1)进入新建机构 2)电话输入无效格式 3)提交</td>
                        <td className="px-3 py-2 align-top">系统校验电话格式，无效时显示错误提示</td>
                      </tr>
                      <tr className="border-t border-slate-100">
                        <td className="px-3 py-2 align-top font-mono">TC-ORG-103</td>
                        <td className="px-3 py-2 align-top">异常 · 表单超时</td>
                        <td className="px-3 py-2 align-top">—</td>
                        <td className="px-3 py-2 align-top">1)进入新建机构 2)长时间不操作 3)点击提交</td>
                        <td className="px-3 py-2 align-top">系统提示会话过期，需要重新登录</td>
                      </tr>
                      <tr className="border-t border-slate-100 bg-white/60">
                        <td className="px-3 py-2 align-top font-mono">TC-ORG-104</td>
                        <td className="px-3 py-2 align-top">异常 · 权限边界</td>
                        <td className="px-3 py-2 align-top">存在不同权限账号</td>
                        <td className="px-3 py-2 align-top">1)低权限账号尝试访问新建机构页面</td>
                        <td className="px-3 py-2 align-top">系统拒绝访问，显示权限不足提示</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </section>

          <div className="flex justify-center pt-6">
            <Link href="/v1.9.0" className="inline-flex items-center gap-2 rounded-lg bg-rose-600 px-8 py-3 text-base font-bold text-white hover:bg-rose-700">
              ← 返回首页
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
