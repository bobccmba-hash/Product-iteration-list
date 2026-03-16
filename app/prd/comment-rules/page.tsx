import Link from 'next/link'

export default function PrdCommentRulesPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <div className="mb-6 flex items-center justify-between gap-4">
          <Link href="/" className="inline-flex items-center gap-1.5 text-base font-bold text-slate-500 hover:text-slate-900">
            ← 返回首页
          </Link>
          <div className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-3 py-1 text-sm font-semibold text-slate-50">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
            AI 互动成长平台 · PRD
          </div>
        </div>

        <header className="mb-8 space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-2.5 py-1 text-sm font-bold text-blue-700 ring-1 ring-blue-200">
            <span className="text-sm">💬</span>
            <span>评论规则 · 配置后台</span>
          </div>
          <h1 className="text-3xl font-black tracking-tight">评论规则管理 PRD</h1>
          <p className="max-w-3xl text-lg leading-relaxed text-slate-600">
            本文档定义评论内容的审核规则、灌水识别机制、提示文案配置以及评论管理后台的功能规范。
          </p>
        </header>

        <div className="space-y-6">
          <section className="rounded-2xl bg-white p-5 ring-1 ring-slate-200">
            <h2 className="mb-3 text-xl font-black text-slate-900">一、业务目标 &amp; 使用场景</h2>
            <div className="grid gap-4 text-base text-slate-700 sm:grid-cols-2">
              <div className="space-y-1.5">
                <h3 className="font-bold">业务目标</h3>
                <ul className="list-inside list-disc space-y-1 text-sm">
                  <li>保护平台内容安全</li>
                  <li>防止灌水行为</li>
                  <li>提供灵活的审核规则配置</li>
                  <li>支持自定义提示文案</li>
                </ul>
              </div>
              <div className="space-y-1.5">
                <h3 className="font-bold">使用场景</h3>
                <ul className="list-inside list-disc space-y-1 text-sm">
                  <li>管理员配置审核规则</li>
                  <li>系统自动检测违规评论</li>
                  <li>用户提交评论时显示提示</li>
                  <li>管理员处理违规评论</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="rounded-2xl bg-white p-5 ring-1 ring-slate-200">
            <h2 className="mb-3 text-xl font-black text-slate-900">二、核心功能</h2>
            <div className="space-y-3 text-sm text-slate-700">
              <div className="rounded-lg bg-slate-50 p-3">
                <p className="font-bold">2.1 审核规则配置</p>
                <p className="mt-1 text-xs">关键词过滤、长度限制、频率限制、规则优先级</p>
              </div>
              <div className="rounded-lg bg-slate-50 p-3">
                <p className="font-bold">2.2 灌水识别</p>
                <p className="mt-1 text-xs">重复内容检测、频繁发送检测、自动标记</p>
              </div>
              <div className="rounded-lg bg-slate-50 p-3">
                <p className="font-bold">2.3 提示文案管理</p>
                <p className="mt-1 text-xs">规则提示、鼓励文案、多语言支持</p>
              </div>
              <div className="rounded-lg bg-slate-50 p-3">
                <p className="font-bold">2.4 评论管理</p>
                <p className="mt-1 text-xs">评论列表、违规处理、用户管理</p>
              </div>
            </div>
          </section>

          <section className="rounded-2xl bg-white p-5 ring-1 ring-slate-200">
            <h2 className="mb-3 text-xl font-black text-slate-900">三、测试用例设计</h2>
            <div className="space-y-4 text-sm text-slate-700">
              <div>
                <div className="mb-2 font-bold">3.1 常规功能测试用例</div>
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
                        <td className="px-3 py-2 align-top font-mono">TC-CMT-001</td>
                        <td className="px-3 py-2 align-top">功能 · 新增规则</td>
                        <td className="px-3 py-2 align-top">具备规则管理权限</td>
                        <td className="px-3 py-2 align-top">1)进入规则管理 2)点击新增 3)填写信息 4)保存</td>
                        <td className="px-3 py-2 align-top">规则保存成功，列表显示新规则，立即生效</td>
                      </tr>
                      <tr className="border-t border-slate-100 bg-white/60">
                        <td className="px-3 py-2 align-top font-mono">TC-CMT-002</td>
                        <td className="px-3 py-2 align-top">功能 · 编辑规则</td>
                        <td className="px-3 py-2 align-top">已存在规则</td>
                        <td className="px-3 py-2 align-top">1)点击编辑 2)修改内容 3)保存</td>
                        <td className="px-3 py-2 align-top">规则更新成功，修改立即生效</td>
                      </tr>
                      <tr className="border-t border-slate-100">
                        <td className="px-3 py-2 align-top font-mono">TC-CMT-003</td>
                        <td className="px-3 py-2 align-top">功能 · 删除规则</td>
                        <td className="px-3 py-2 align-top">已存在未使用规则</td>
                        <td className="px-3 py-2 align-top">1)点击删除 2)确认</td>
                        <td className="px-3 py-2 align-top">规则删除成功，列表不显示</td>
                      </tr>
                      <tr className="border-t border-slate-100 bg-white/60">
                        <td className="px-3 py-2 align-top font-mono">TC-CMT-004</td>
                        <td className="px-3 py-2 align-top">功能 · 启用/禁用</td>
                        <td className="px-3 py-2 align-top">已存在规则</td>
                        <td className="px-3 py-2 align-top">1)点击状态按钮 2)切换</td>
                        <td className="px-3 py-2 align-top">状态切换成功，立即生效</td>
                      </tr>
                      <tr className="border-t border-slate-100">
                        <td className="px-3 py-2 align-top font-mono">TC-CMT-005</td>
                        <td className="px-3 py-2 align-top">功能 · 关键词过滤</td>
                        <td className="px-3 py-2 align-top">规则已启用</td>
                        <td className="px-3 py-2 align-top">1)用户发表含禁用词评论 2)提交</td>
                        <td className="px-3 py-2 align-top">显示违规提示，评论发表失败</td>
                      </tr>
                      <tr className="border-t border-slate-100 bg-white/60">
                        <td className="px-3 py-2 align-top font-mono">TC-CMT-006</td>
                        <td className="px-3 py-2 align-top">功能 · 审核通过</td>
                        <td className="px-3 py-2 align-top">存在待审核评论</td>
                        <td className="px-3 py-2 align-top">1)查看评论 2)点击通过</td>
                        <td className="px-3 py-2 align-top">评论状态变为已通过，前台可见</td>
                      </tr>
                      <tr className="border-t border-slate-100">
                        <td className="px-3 py-2 align-top font-mono">TC-CMT-007</td>
                        <td className="px-3 py-2 align-top">功能 · 删除评论</td>
                        <td className="px-3 py-2 align-top">存在任意评论</td>
                        <td className="px-3 py-2 align-top">1)选择评论 2)点击删除 3)确认</td>
                        <td className="px-3 py-2 align-top">评论删除成功，前台不显示</td>
                      </tr>
                      <tr className="border-t border-slate-100 bg-white/60">
                        <td className="px-3 py-2 align-top font-mono">TC-CMT-008</td>
                        <td className="px-3 py-2 align-top">功能 · 灌水识别</td>
                        <td className="px-3 py-2 align-top">规则已启用</td>
                        <td className="px-3 py-2 align-top">1)用户短时间发表多条相同评论</td>
                        <td className="px-3 py-2 align-top">疑似灌水评论标记为待审核</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div>
                <div className="mb-2 font-bold">3.2 非常规 / 暴力测试用例</div>
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
                        <td className="px-3 py-2 align-top font-mono">TC-CMT-101</td>
                        <td className="px-3 py-2 align-top">异常 · 文案长度边界</td>
                        <td className="px-3 py-2 align-top">—</td>
                        <td className="px-3 py-2 align-top">1)新增规则 2)文案输入0/1/500/1000字符 3)保存</td>
                        <td className="px-3 py-2 align-top">系统校验长度，超限显示错误，允许范围内保存成功</td>
                      </tr>
                      <tr className="border-t border-slate-100 bg-white/60">
                        <td className="px-3 py-2 align-top font-mono">TC-CMT-102</td>
                        <td className="px-3 py-2 align-top">异常 · 关键词重复</td>
                        <td className="px-3 py-2 align-top">—</td>
                        <td className="px-3 py-2 align-top">1)新增规则 2)添加重复关键词 3)保存</td>
                        <td className="px-3 py-2 align-top">系统检测重复，提示用户或自动去重</td>
                      </tr>
                      <tr className="border-t border-slate-100">
                        <td className="px-3 py-2 align-top font-mono">TC-CMT-103</td>
                        <td className="px-3 py-2 align-top">异常 · 优先级冲突</td>
                        <td className="px-3 py-2 align-top">已存在多条规则</td>
                        <td className="px-3 py-2 align-top">1)编辑规则A优先级为1 2)编辑规则B优先级也为1 3)保存</td>
                        <td className="px-3 py-2 align-top">系统自动调整避免冲突，应用顺序正确</td>
                      </tr>
                      <tr className="border-t border-slate-100 bg-white/60">
                        <td className="px-3 py-2 align-top font-mono">TC-CMT-104</td>
                        <td className="px-3 py-2 align-top">异常 · 大量数据处理</td>
                        <td className="px-3 py-2 align-top">存在1000+条评论</td>
                        <td className="px-3 py-2 align-top">1)全选所有评论 2)批量删除</td>
                        <td className="px-3 py-2 align-top">系统正确处理，不卡顿，数据一致</td>
                      </tr>
                      <tr className="border-t border-slate-100">
                        <td className="px-3 py-2 align-top font-mono">TC-CMT-105</td>
                        <td className="px-3 py-2 align-top">异常 · 特殊字符</td>
                        <td className="px-3 py-2 align-top">—</td>
                        <td className="px-3 py-2 align-top">1)新增规则 2)关键词含特殊字符 3)保存测试</td>
                        <td className="px-3 py-2 align-top">系统正确转义，无安全漏洞，规则生效</td>
                      </tr>
                      <tr className="border-t border-slate-100 bg-white/60">
                        <td className="px-3 py-2 align-top font-mono">TC-CMT-106</td>
                        <td className="px-3 py-2 align-top">异常 · 并发提交</td>
                        <td className="px-3 py-2 align-top">—</td>
                        <td className="px-3 py-2 align-top">1)多用户同时发表评论 2)系统同时处理</td>
                        <td className="px-3 py-2 align-top">正确处理并发，无数据重复或丢失</td>
                      </tr>
                      <tr className="border-t border-slate-100">
                        <td className="px-3 py-2 align-top font-mono">TC-CMT-107</td>
                        <td className="px-3 py-2 align-top">异常 · 权限边界</td>
                        <td className="px-3 py-2 align-top">存在不同权限账号</td>
                        <td className="px-3 py-2 align-top">1)低权限账号尝试编辑/删除规则</td>
                        <td className="px-3 py-2 align-top">系统拒绝操作，显示权限不足提示</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </section>

          <div className="flex justify-center pt-4">
            <Link href="/" className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 font-bold text-white hover:bg-blue-700">
              ← 返回首页
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
