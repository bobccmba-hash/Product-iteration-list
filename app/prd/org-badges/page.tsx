import Link from 'next/link'

export default function PrdOrgBadgesPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <div className="mb-6 flex items-center justify-between gap-4">
          <Link href="/v1.9.0" className="inline-flex items-center gap-1.5 text-base font-bold text-slate-500 hover:text-slate-900">
            ← 返回首页
          </Link>
          <div className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-3 py-1 text-sm font-semibold text-slate-50">
            <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
            AI 互动成长平台 · PRD
          </div>
        </div>

        <header className="mb-8 space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full bg-green-100 px-2.5 py-1 text-sm font-bold text-green-700 ring-1 ring-green-200">
            <span className="text-sm">✨</span>
            <span>认证标识 · 配置后台</span>
          </div>
          <h1 className="text-4xl font-black tracking-tight">认证标识管理 PRD</h1>
          <p className="max-w-3xl text-lg leading-relaxed text-slate-600">
            本文档定义机构认证标识的管理规范，包括标识的新增、编辑、删除、图片上传、状态控制等功能，用于支撑机构的认证展示。
          </p>
        </header>

        <div className="space-y-6">
          <section className="rounded-2xl bg-white p-6 ring-1 ring-slate-200">
            <h2 className="mb-4 text-2xl font-black text-slate-900">一、业务目标 &amp; 使用场景</h2>
            <div className="grid gap-6 text-base text-slate-700 sm:grid-cols-2">
              <div className="space-y-2">
                <h3 className="text-lg font-bold">业务目标</h3>
                <ul className="list-inside list-disc space-y-1.5 text-sm">
                  <li>建立机构认证标识体系</li>
                  <li>支持图片上传和展示</li>
                  <li>实现标识的状态控制</li>
                  <li>支持标识的排序管理</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-bold">使用场景</h3>
                <ul className="list-inside list-disc space-y-1.5 text-sm">
                  <li>管理员创建认证标识</li>
                  <li>上传标识图片</li>
                  <li>控制标识的启用/禁用</li>
                  <li>调整标识排序</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="rounded-2xl bg-white p-6 ring-1 ring-slate-200">
            <h2 className="mb-4 text-2xl font-black text-slate-900">二、核心功能</h2>
            <div className="space-y-3 text-sm text-slate-700">
              <div className="rounded-lg bg-green-50 p-4">
                <p className="text-lg font-bold">2.1 标识管理</p>
                <p className="mt-2 text-sm">新增、编辑、删除认证标识，配置标识名称、展示文字、排序等信息</p>
              </div>
              <div className="rounded-lg bg-green-50 p-4">
                <p className="text-lg font-bold">2.2 图片上传</p>
                <p className="mt-2 text-sm">支持标识图片上传、预览、替换等操作，支持多种图片格式</p>
              </div>
              <div className="rounded-lg bg-green-50 p-4">
                <p className="text-lg font-bold">2.3 状态控制</p>
                <p className="mt-2 text-sm">支持标识的启用/禁用，控制标识在前台的显示</p>
              </div>
              <div className="rounded-lg bg-green-50 p-4">
                <p className="text-lg font-bold">2.4 使用统计</p>
                <p className="mt-2 text-sm">显示每个标识下的机构数量，支持查看使用该标识的机构清单</p>
              </div>
            </div>
          </section>

          <section className="rounded-2xl bg-white p-6 ring-1 ring-slate-200">
            <h2 className="mb-4 text-2xl font-black text-slate-900">三、后台界面规范</h2>
            <div className="space-y-4 text-sm text-slate-700">
              <div className="rounded-lg bg-slate-50 p-4">
                <p className="text-lg font-bold">3.1 标识列表页</p>
                <ul className="mt-2 list-inside list-disc space-y-1 text-sm">
                  <li>显示所有认证标识，支持搜索、过滤、排序</li>
                  <li>每条标识显示：预览、名称、展示文字、状态、使用数量、操作</li>
                  <li>支持新增、编辑、删除、排序标识</li>
                  <li>支持启用/禁用标识</li>
                </ul>
              </div>
              <div className="rounded-lg bg-slate-50 p-4">
                <p className="text-lg font-bold">3.2 标识编辑页</p>
                <ul className="mt-2 list-inside list-disc space-y-1 text-sm">
                  <li>标识名称、展示文字、排序等基本信息</li>
                  <li>图片上传和预览</li>
                  <li>状态选择（启用/禁用）</li>
                  <li>标识预览</li>
                </ul>
              </div>
              <div className="rounded-lg bg-slate-50 p-4">
                <p className="text-lg font-bold">3.3 使用机构清单</p>
                <ul className="mt-2 list-inside list-disc space-y-1 text-sm">
                  <li>点击使用数量显示该标识下的所有机构</li>
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
                <p className="font-bold text-base">认证标识表</p>
                <p className="mt-2 font-mono text-xs">id, name, display_text, image_url, status, sort, use_count, created_at, updated_at</p>
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
                        <td className="px-3 py-2 align-top font-mono">TC-BADGE-001</td>
                        <td className="px-3 py-2 align-top">功能 · 新增标识</td>
                        <td className="px-3 py-2 align-top">具备标识管理权限</td>
                        <td className="px-3 py-2 align-top">1)进入标识管理 2)点击新增 3)填写名称、展示文字 4)上传图片 5)保存</td>
                        <td className="px-3 py-2 align-top">标识保存成功，列表显示新标识，前台可见</td>
                      </tr>
                      <tr className="border-t border-slate-100 bg-white/60">
                        <td className="px-3 py-2 align-top font-mono">TC-BADGE-002</td>
                        <td className="px-3 py-2 align-top">功能 · 编辑标识</td>
                        <td className="px-3 py-2 align-top">已存在标识</td>
                        <td className="px-3 py-2 align-top">1)点击编辑 2)修改内容 3)保存</td>
                        <td className="px-3 py-2 align-top">标识更新成功，前台显示最新内容</td>
                      </tr>
                      <tr className="border-t border-slate-100">
                        <td className="px-3 py-2 align-top font-mono">TC-BADGE-003</td>
                        <td className="px-3 py-2 align-top">功能 · 删除标识</td>
                        <td className="px-3 py-2 align-top">已存在未使用的标识</td>
                        <td className="px-3 py-2 align-top">1)点击删除 2)确认</td>
                        <td className="px-3 py-2 align-top">标识删除成功，列表不显示</td>
                      </tr>
                      <tr className="border-t border-slate-100 bg-white/60">
                        <td className="px-3 py-2 align-top font-mono">TC-BADGE-004</td>
                        <td className="px-3 py-2 align-top">功能 · 启用/禁用</td>
                        <td className="px-3 py-2 align-top">已存在标识</td>
                        <td className="px-3 py-2 align-top">1)点击状态按钮 2)切换启用/禁用</td>
                        <td className="px-3 py-2 align-top">状态切换成功，立即生效</td>
                      </tr>
                      <tr className="border-t border-slate-100">
                        <td className="px-3 py-2 align-top font-mono">TC-BADGE-005</td>
                        <td className="px-3 py-2 align-top">功能 · 上传图片</td>
                        <td className="px-3 py-2 align-top">—</td>
                        <td className="px-3 py-2 align-top">1)编辑标识 2)上传图片 3)预览 4)保存</td>
                        <td className="px-3 py-2 align-top">图片上传成功，前台正确显示</td>
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
                        <td className="px-3 py-2 align-top font-mono">TC-BADGE-101</td>
                        <td className="px-3 py-2 align-top">异常 · 图片大小限制</td>
                        <td className="px-3 py-2 align-top">—</td>
                        <td className="px-3 py-2 align-top">1)编辑标识 2)上传超大图片（&gt;10MB）</td>
                        <td className="px-3 py-2 align-top">系统提示文件过大，上传失败</td>
                      </tr>
                      <tr className="border-t border-slate-100 bg-white/60">
                        <td className="px-3 py-2 align-top font-mono">TC-BADGE-102</td>
                        <td className="px-3 py-2 align-top">异常 · 删除已使用标识</td>
                        <td className="px-3 py-2 align-top">已存在使用该标识的机构</td>
                        <td className="px-3 py-2 align-top">1)尝试删除已使用的标识</td>
                        <td className="px-3 py-2 align-top">系统提示无法删除，删除按钮禁用</td>
                      </tr>
                      <tr className="border-t border-slate-100">
                        <td className="px-3 py-2 align-top font-mono">TC-BADGE-103</td>
                        <td className="px-3 py-2 align-top">异常 · 大量标识处理</td>
                        <td className="px-3 py-2 align-top">存在100+个标识</td>
                        <td className="px-3 py-2 align-top">1)加载标识列表 2)批量删除</td>
                        <td className="px-3 py-2 align-top">系统正确处理，不卡顿，数据一致</td>
                      </tr>
                      <tr className="border-t border-slate-100 bg-white/60">
                        <td className="px-3 py-2 align-top font-mono">TC-BADGE-104</td>
                        <td className="px-3 py-2 align-top">异常 · 权限边界</td>
                        <td className="px-3 py-2 align-top">存在不同权限账号</td>
                        <td className="px-3 py-2 align-top">1)低权限账号尝试编辑/删除标识</td>
                        <td className="px-3 py-2 align-top">系统拒绝操作，显示权限不足提示</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </section>

          <div className="flex justify-center pt-6">
            <Link href="/v1.9.0" className="inline-flex items-center gap-2 rounded-lg bg-green-600 px-8 py-3 text-base font-bold text-white hover:bg-green-700">
              ← 返回首页
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
