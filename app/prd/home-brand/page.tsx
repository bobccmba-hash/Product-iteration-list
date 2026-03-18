import Link from 'next/link'

export default function PrdHomeBrandPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <div className="mb-6 flex items-center justify-between gap-4">
          <Link href="/v1.9.0" className="inline-flex items-center gap-1.5 text-base font-bold text-slate-500 hover:text-slate-900">
            ← 返回首页
          </Link>
          <div className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-3 py-1 text-sm font-semibold text-slate-50">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
            AI 互动成长平台 · PRD
          </div>
        </div>

        <header className="mb-8 space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full bg-amber-100 px-2.5 py-1 text-sm font-bold text-amber-700 ring-1 ring-amber-200">
            <span className="text-sm">🏢</span>
            <span>首页品牌 · 配置后台</span>
          </div>
          <h1 className="text-4xl font-black tracking-tight">首页品牌管理 PRD</h1>
          <p className="max-w-3xl text-lg leading-relaxed text-slate-600">
            本文档定义首页品牌展示区域的配置规范，包括品牌标题、布局方式、品牌卡片内容、跳转链接等功能。
          </p>
        </header>

        <div className="space-y-6">
          <section className="rounded-2xl bg-white p-6 ring-1 ring-slate-200">
            <h2 className="mb-4 text-2xl font-black text-slate-900">一、业务目标 &amp; 使用场景</h2>
            <div className="grid gap-6 text-base text-slate-700 sm:grid-cols-2">
              <div className="space-y-2">
                <h3 className="text-lg font-bold">业务目标</h3>
                <ul className="list-inside list-disc space-y-1.5 text-sm">
                  <li>展示学校品牌形象</li>
                  <li>灵活配置品牌卡片</li>
                  <li>支持多种布局方式</li>
                  <li>实现品牌卡片跳转</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-bold">使用场景</h3>
                <ul className="list-inside list-disc space-y-1.5 text-sm">
                  <li>管理员配置品牌区域</li>
                  <li>设置品牌标题和描述</li>
                  <li>添加品牌卡片和图片</li>
                  <li>配置卡片跳转链接</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="rounded-2xl bg-white p-6 ring-1 ring-slate-200">
            <h2 className="mb-4 text-2xl font-black text-slate-900">二、核心功能</h2>
            <div className="space-y-3 text-sm text-slate-700">
              <div className="rounded-lg bg-amber-50 p-4">
                <p className="text-lg font-bold">2.1 品牌区域配置</p>
                <p className="mt-2 text-sm">配置品牌展示区域的标题、副标题、描述文案、背景色等基本信息</p>
              </div>
              <div className="rounded-lg bg-amber-50 p-4">
                <p className="text-lg font-bold">2.2 布局方式管理</p>
                <p className="mt-2 text-sm">支持多种布局方式（网格、轮播、列表等），灵活调整品牌卡片展示</p>
              </div>
              <div className="rounded-lg bg-amber-50 p-4">
                <p className="text-lg font-bold">2.3 品牌卡片管理</p>
                <p className="mt-2 text-sm">新增、编辑、删除品牌卡片，配置卡片标题、描述、图片、链接等</p>
              </div>
              <div className="rounded-lg bg-amber-50 p-4">
                <p className="text-lg font-bold">2.4 链接跳转配置</p>
                <p className="mt-2 text-sm">支持内部链接和外部链接，配置跳转目标和打开方式</p>
              </div>
            </div>
          </section>

          <section className="rounded-2xl bg-white p-6 ring-1 ring-slate-200">
            <h2 className="mb-4 text-2xl font-black text-slate-900">三、后台界面规范</h2>
            <div className="space-y-4 text-sm text-slate-700">
              <div className="rounded-lg bg-slate-50 p-4">
                <p className="text-lg font-bold">3.1 品牌区域配置页</p>
                <ul className="mt-2 list-inside list-disc space-y-1 text-sm">
                  <li>品牌区域标题、副标题、描述文案输入框</li>
                  <li>背景色选择器</li>
                  <li>布局方式选择（网格/轮播/列表）</li>
                  <li>预览功能</li>
                </ul>
              </div>
              <div className="rounded-lg bg-slate-50 p-4">
                <p className="text-lg font-bold">3.2 品牌卡片列表页</p>
                <ul className="mt-2 list-inside list-disc space-y-1 text-sm">
                  <li>显示所有品牌卡片，支持搜索、过滤、排序</li>
                  <li>每条卡片显示：标题、描述、图片、链接、排序、操作</li>
                  <li>支持新增、编辑、删除、排序卡片</li>
                  <li>支持批量操作（删除、排序）</li>
                </ul>
              </div>
              <div className="rounded-lg bg-slate-50 p-4">
                <p className="text-lg font-bold">3.3 品牌卡片编辑页</p>
                <ul className="mt-2 list-inside list-disc space-y-1 text-sm">
                  <li>卡片标题、描述、排序等基本信息</li>
                  <li>图片上传和预览</li>
                  <li>链接配置（内部/外部、打开方式）</li>
                  <li>卡片预览</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="rounded-2xl bg-white p-6 ring-1 ring-slate-200">
            <h2 className="mb-4 text-2xl font-black text-slate-900">四、数据模型</h2>
            <div className="space-y-3 text-sm text-slate-700">
              <div className="rounded-lg bg-slate-50 p-4">
                <p className="font-bold text-base">品牌区域表</p>
                <p className="mt-2 font-mono text-xs">id, title, subtitle, description, bg_color, layout_type, status, created_at, updated_at</p>
              </div>
              <div className="rounded-lg bg-slate-50 p-4">
                <p className="font-bold text-base">品牌卡片表</p>
                <p className="mt-2 font-mono text-xs">id, brand_id, title, description, image_url, link_url, link_type, open_type, sort, status, created_at, updated_at</p>
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
                        <td className="px-3 py-2 align-top font-mono">TC-BRD-001</td>
                        <td className="px-3 py-2 align-top">功能 · 配置品牌区域</td>
                        <td className="px-3 py-2 align-top">具备品牌管理权限</td>
                        <td className="px-3 py-2 align-top">1)进入品牌管理 2)填写标题、副标题、描述 3)选择背景色 4)保存</td>
                        <td className="px-3 py-2 align-top">配置保存成功，前台显示新配置</td>
                      </tr>
                      <tr className="border-t border-slate-100 bg-white/60">
                        <td className="px-3 py-2 align-top font-mono">TC-BRD-002</td>
                        <td className="px-3 py-2 align-top">功能 · 新增品牌卡片</td>
                        <td className="px-3 py-2 align-top">已配置品牌区域</td>
                        <td className="px-3 py-2 align-top">1)进入卡片管理 2)点击新增 3)填写标题、描述 4)上传图片 5)配置链接 6)保存</td>
                        <td className="px-3 py-2 align-top">卡片保存成功，列表显示新卡片，前台可见</td>
                      </tr>
                      <tr className="border-t border-slate-100">
                        <td className="px-3 py-2 align-top font-mono">TC-BRD-003</td>
                        <td className="px-3 py-2 align-top">功能 · 编辑品牌卡片</td>
                        <td className="px-3 py-2 align-top">已存在品牌卡片</td>
                        <td className="px-3 py-2 align-top">1)点击编辑 2)修改内容 3)保存</td>
                        <td className="px-3 py-2 align-top">卡片更新成功，前台显示最新内容</td>
                      </tr>
                      <tr className="border-t border-slate-100 bg-white/60">
                        <td className="px-3 py-2 align-top font-mono">TC-BRD-004</td>
                        <td className="px-3 py-2 align-top">功能 · 删除品牌卡片</td>
                        <td className="px-3 py-2 align-top">已存在品牌卡片</td>
                        <td className="px-3 py-2 align-top">1)点击删除 2)确认</td>
                        <td className="px-3 py-2 align-top">卡片删除成功，列表不显示，前台不可见</td>
                      </tr>
                      <tr className="border-t border-slate-100">
                        <td className="px-3 py-2 align-top font-mono">TC-BRD-005</td>
                        <td className="px-3 py-2 align-top">功能 · 调整卡片排序</td>
                        <td className="px-3 py-2 align-top">已存在多张卡片</td>
                        <td className="px-3 py-2 align-top">1)拖拽卡片调整顺序 2)保存</td>
                        <td className="px-3 py-2 align-top">排序保存成功，前台显示新顺序</td>
                      </tr>
                      <tr className="border-t border-slate-100 bg-white/60">
                        <td className="px-3 py-2 align-top font-mono">TC-BRD-006</td>
                        <td className="px-3 py-2 align-top">功能 · 配置卡片链接</td>
                        <td className="px-3 py-2 align-top">已存在品牌卡片</td>
                        <td className="px-3 py-2 align-top">1)编辑卡片 2)配置内部/外部链接 3)选择打开方式 4)保存</td>
                        <td className="px-3 py-2 align-top">链接配置成功，点击卡片能正确跳转</td>
                      </tr>
                      <tr className="border-t border-slate-100">
                        <td className="px-3 py-2 align-top font-mono">TC-BRD-007</td>
                        <td className="px-3 py-2 align-top">功能 · 切换布局方式</td>
                        <td className="px-3 py-2 align-top">已配置品牌区域和卡片</td>
                        <td className="px-3 py-2 align-top">1)进入品牌配置 2)选择不同布局方式 3)保存</td>
                        <td className="px-3 py-2 align-top">布局方式切换成功，前台显示新布局</td>
                      </tr>
                      <tr className="border-t border-slate-100 bg-white/60">
                        <td className="px-3 py-2 align-top font-mono">TC-BRD-008</td>
                        <td className="px-3 py-2 align-top">功能 · 图片上传</td>
                        <td className="px-3 py-2 align-top">—</td>
                        <td className="px-3 py-2 align-top">1)编辑卡片 2)上传图片 3)预览 4)保存</td>
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
                        <td className="px-3 py-2 align-top font-mono">TC-BRD-101</td>
                        <td className="px-3 py-2 align-top">异常 · 文案长度边界</td>
                        <td className="px-3 py-2 align-top">—</td>
                        <td className="px-3 py-2 align-top">1)编辑卡片 2)标题输入0/1/100/500字符 3)保存</td>
                        <td className="px-3 py-2 align-top">系统校验长度，超限显示错误，允许范围内保存成功</td>
                      </tr>
                      <tr className="border-t border-slate-100 bg-white/60">
                        <td className="px-3 py-2 align-top font-mono">TC-BRD-102</td>
                        <td className="px-3 py-2 align-top">异常 · 图片大小限制</td>
                        <td className="px-3 py-2 align-top">—</td>
                        <td className="px-3 py-2 align-top">1)编辑卡片 2)上传超大图片（&gt;10MB）</td>
                        <td className="px-3 py-2 align-top">系统提示文件过大，上传失败</td>
                      </tr>
                      <tr className="border-t border-slate-100">
                        <td className="px-3 py-2 align-top font-mono">TC-BRD-103</td>
                        <td className="px-3 py-2 align-top">异常 · 无效链接</td>
                        <td className="px-3 py-2 align-top">—</td>
                        <td className="px-3 py-2 align-top">1)编辑卡片 2)输入无效链接 3)保存</td>
                        <td className="px-3 py-2 align-top">系统校验链接格式，无效时显示错误提示</td>
                      </tr>
                      <tr className="border-t border-slate-100 bg-white/60">
                        <td className="px-3 py-2 align-top font-mono">TC-BRD-104</td>
                        <td className="px-3 py-2 align-top">异常 · 大量卡片处理</td>
                        <td className="px-3 py-2 align-top">存在100+张卡片</td>
                        <td className="px-3 py-2 align-top">1)加载卡片列表 2)批量删除</td>
                        <td className="px-3 py-2 align-top">系统正确处理，不卡顿，数据一致</td>
                      </tr>
                      <tr className="border-t border-slate-100">
                        <td className="px-3 py-2 align-top font-mono">TC-BRD-105</td>
                        <td className="px-3 py-2 align-top">异常 · 特殊字符</td>
                        <td className="px-3 py-2 align-top">—</td>
                        <td className="px-3 py-2 align-top">1)编辑卡片 2)标题含特殊字符 3)保存</td>
                        <td className="px-3 py-2 align-top">系统正确转义，前台正确显示</td>
                      </tr>
                      <tr className="border-t border-slate-100 bg-white/60">
                        <td className="px-3 py-2 align-top font-mono">TC-BRD-106</td>
                        <td className="px-3 py-2 align-top">异常 · 权限边界</td>
                        <td className="px-3 py-2 align-top">存在不同权限账号</td>
                        <td className="px-3 py-2 align-top">1)低权限账号尝试编辑/删除卡片</td>
                        <td className="px-3 py-2 align-top">系统拒绝操作，显示权限不足提示</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </section>

          <div className="flex justify-center pt-6">
            <Link href="/v1.9.0" className="inline-flex items-center gap-2 rounded-lg bg-amber-600 px-8 py-3 text-base font-bold text-white hover:bg-amber-700">
              ← 返回首页
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
