import Link from 'next/link'

export default function PrdOrgTypesPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <div className="mb-6 flex items-center justify-between gap-4">
          <Link href="/v1.9.0" className="inline-flex items-center gap-1.5 text-base font-bold text-slate-500 hover:text-slate-900">
            ← 返回首页
          </Link>
          <div className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-3 py-1 text-sm font-semibold text-slate-50">
            <span className="h-1.5 w-1.5 rounded-full bg-indigo-400" />
            AI 互动成长平台 · PRD
          </div>
        </div>

        <header className="mb-8 space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full bg-indigo-100 px-2.5 py-1 text-sm font-bold text-indigo-700 ring-1 ring-indigo-200">
            <span className="text-sm">🏛️</span>
            <span>机构类型 · 配置后台</span>
          </div>
          <h1 className="text-4xl font-black tracking-tight">机构类型管理 PRD</h1>
          <p className="max-w-3xl text-lg leading-relaxed text-slate-600">
            本文档定义机构类型的分类管理规范，包括类型的新增、编辑、删除、排序等功能，用于支撑机构的分类展示与筛选。
          </p>
        </header>

        <div className="space-y-6">
          <section className="rounded-2xl bg-white p-6 ring-1 ring-slate-200">
            <h2 className="mb-4 text-2xl font-black text-slate-900">一、业务目标 &amp; 使用场景</h2>
            <div className="grid gap-6 text-base text-slate-700 sm:grid-cols-2">
              <div className="space-y-2">
                <h3 className="text-lg font-bold">业务目标</h3>
                <ul className="list-inside list-disc space-y-1.5 text-sm">
                  <li>建立机构分类体系</li>
                  <li>支持灵活的类型配置</li>
                  <li>实现机构的分类展示</li>
                  <li>支持类型的排序管理</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-bold">使用场景</h3>
                <ul className="list-inside list-disc space-y-1.5 text-sm">
                  <li>管理员创建机构类型</li>
                  <li>编辑和删除类型</li>
                  <li>调整类型排序</li>
                  <li>前台按类型筛选机构</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="rounded-2xl bg-white p-6 ring-1 ring-slate-200">
            <h2 className="mb-4 text-2xl font-black text-slate-900">二、核心功能</h2>
            <div className="space-y-3 text-sm text-slate-700">
              <div className="rounded-lg bg-indigo-50 p-4">
                <p className="text-lg font-bold">2.1 类型管理</p>
                <p className="mt-2 text-sm">新增、编辑、删除机构类型，配置类型名称、描述、排序等信息</p>
              </div>
              <div className="rounded-lg bg-indigo-50 p-4">
                <p className="text-lg font-bold">2.2 排序管理</p>
                <p className="mt-2 text-sm">支持拖拽排序或输入排序值，灵活调整类型展示顺序</p>
              </div>
              <div className="rounded-lg bg-indigo-50 p-4">
                <p className="text-lg font-bold">2.3 使用统计</p>
                <p className="mt-2 text-sm">显示每个类型下的机构数量，支持查看使用该类型的机构清单</p>
              </div>
              <div className="rounded-lg bg-indigo-50 p-4">
                <p className="text-lg font-bold">2.4 批量操作</p>
                <p className="mt-2 text-sm">支持批量删除、批量排序等操作，提高管理效率</p>
              </div>
            </div>
          </section>

          <section className="rounded-2xl bg-white p-6 ring-1 ring-slate-200">
            <h2 className="mb-4 text-2xl font-black text-slate-900">三、后台界面规范</h2>
            <div className="space-y-4 text-sm text-slate-700">
              <div className="rounded-lg bg-slate-50 p-4">
                <p className="text-lg font-bold">3.1 类型列表页</p>
                <ul className="mt-2 list-inside list-disc space-y-1 text-sm">
                  <li>显示所有机构类型，支持搜索、过滤、排序</li>
                  <li>每条类型显示：名称、描述、排序、使用数量、操作</li>
                  <li>支持新增、编辑、删除、排序类型</li>
                  <li>支持批量操作（删除、排序）</li>
                </ul>
              </div>
              <div className="rounded-lg bg-slate-50 p-4">
                <p className="text-lg font-bold">3.2 类型编辑页</p>
                <ul className="mt-2 list-inside list-disc space-y-1 text-sm">
                  <li>类型名称、描述、排序等基本信息</li>
                  <li>类型预览</li>
                  <li>保存和取消按钮</li>
                </ul>
              </div>
              <div className="rounded-lg bg-slate-50 p-4">
                <p className="text-lg font-bold">3.3 使用机构清单</p>
                <ul className="mt-2 list-inside list-disc space-y-1 text-sm">
                  <li>点击使用数量显示该类型下的所有机构</li>
                  <li>支持搜索、过滤机构</li>
                  <li>显示机构名称、创建时间等信息</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="rounded-2xl bg-white p-6 ring-1 ring-slate-200">
            <h2 className="mb-4 text-2xl font-black text-slate-900">四、数据模型</h2>
            <div className="space-y-3 text-sm text-slate-700">
              <div className="rounded-lg bg-slate-50 p-4">
                <p className="font-bold text-base">机构类型表</p>
                <p className="mt-2 font-mono text-xs">id, name, description, sort, use_count, status, created_at, updated_at</p>
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
                        <td className="px-3 py-2 align-top font-mono">TC-OT-001</td>
                        <td className="px-3 py-2 align-top">功能 · 新增类型</td>
                        <td className="px-3 py-2 align-top">具备类型管理权限</td>
                        <td className="px-3 py-2 align-top">1)进入类型管理 2)点击新增 3)填写名称、描述 4)设置排序 5)保存</td>
                        <td className="px-3 py-2 align-top">类型保存成功，列表显示新类型，前台可见</td>
                      </tr>
                      <tr className="border-t border-slate-100 bg-white/60">
                        <td className="px-3 py-2 align-top font-mono">TC-OT-002</td>
                        <td className="px-3 py-2 align-top">功能 · 编辑类型</td>
                        <td className="px-3 py-2 align-top">已存在类型</td>
                        <td className="px-3 py-2 align-top">1)点击编辑 2)修改内容 3)保存</td>
                        <td className="px-3 py-2 align-top">类型更新成功，前台显示最新内容</td>
                      </tr>
                      <tr className="border-t border-slate-100">
                        <td className="px-3 py-2 align-top font-mono">TC-OT-003</td>
                        <td className="px-3 py-2 align-top">功能 · 删除类型</td>
                        <td className="px-3 py-2 align-top">已存在未使用的类型</td>
                        <td className="px-3 py-2 align-top">1)点击删除 2)确认</td>
                        <td className="px-3 py-2 align-top">类型删除成功，列表不显示</td>
                      </tr>
                      <tr className="border-t border-slate-100 bg-white/60">
                        <td className="px-3 py-2 align-top font-mono">TC-OT-004</td>
                        <td className="px-3 py-2 align-top">功能 · 调整排序</td>
                        <td className="px-3 py-2 align-top">已存在多个类型</td>
                        <td className="px-3 py-2 align-top">1)拖拽调整顺序 2)保存</td>
                        <td className="px-3 py-2 align-top">排序保存成功，前台显示新顺序</td>
                      </tr>
                      <tr className="border-t border-slate-100">
                        <td className="px-3 py-2 align-top font-mono">TC-OT-005</td>
                        <td className="px-3 py-2 align-top">功能 · 查看使用机构</td>
                        <td className="px-3 py-2 align-top">已存在使用该类型的机构</td>
                        <td className="px-3 py-2 align-top">1)点击使用数量 2)查看机构清单</td>
                        <td className="px-3 py-2 align-top">显示该类型下的所有机构</td>
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
                        <td className="px-3 py-2 align-top font-mono">TC-OT-101</td>
                        <td className="px-3 py-2 align-top">异常 · 名称长度边界</td>
                        <td className="px-3 py-2 align-top">—</td>
                        <td className="px-3 py-2 align-top">1)新增类型 2)名称输入0/1/50/200字符 3)保存</td>
                        <td className="px-3 py-2 align-top">系统校验长度，超限显示错误，允许范围内保存成功</td>
                      </tr>
                      <tr className="border-t border-slate-100 bg-white/60">
                        <td className="px-3 py-2 align-top font-mono">TC-OT-102</td>
                        <td className="px-3 py-2 align-top">异常 · 删除已使用类型</td>
                        <td className="px-3 py-2 align-top">已存在使用该类型的机构</td>
                        <td className="px-3 py-2 align-top">1)尝试删除已使用的类型</td>
                        <td className="px-3 py-2 align-top">系统提示无法删除，删除按钮禁用</td>
                      </tr>
                      <tr className="border-t border-slate-100">
                        <td className="px-3 py-2 align-top font-mono">TC-OT-103</td>
                        <td className="px-3 py-2 align-top">异常 · 大量类型处理</td>
                        <td className="px-3 py-2 align-top">存在100+个类型</td>
                        <td className="px-3 py-2 align-top">1)加载类型列表 2)批量删除</td>
                        <td className="px-3 py-2 align-top">系统正确处理，不卡顿，数据一致</td>
                      </tr>
                      <tr className="border-t border-slate-100 bg-white/60">
                        <td className="px-3 py-2 align-top font-mono">TC-OT-104</td>
                        <td className="px-3 py-2 align-top">异常 · 权限边界</td>
                        <td className="px-3 py-2 align-top">存在不同权限账号</td>
                        <td className="px-3 py-2 align-top">1)低权限账号尝试编辑/删除类型</td>
                        <td className="px-3 py-2 align-top">系统拒绝操作，显示权限不足提示</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </section>

          <div className="flex justify-center pt-6">
            <Link href="/v1.9.0" className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-8 py-3 text-base font-bold text-white hover:bg-indigo-700">
              ← 返回首页
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
