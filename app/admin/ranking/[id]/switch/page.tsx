'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Button } from '@/components/admin/AdminPrimitives'

export default function RankingSwitchPage() {
  const [displayEnabled, setDisplayEnabled] = useState(true)
  const [showAfterInteraction, setShowAfterInteraction] = useState(true)
  const [showOnHomepage, setShowOnHomepage] = useState(false)
  const [showOnGrowthDetail, setShowOnGrowthDetail] = useState(false)
  const [minStudents, setMinStudents] = useState(3)
  const [showWhenInsufficient, setShowWhenInsufficient] = useState(false)

  return (
    <div className="space-y-5">
      {/* 顶部区域 */}
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="text-xs font-bold text-slate-500">
            系统入口 / 学习之星配置 / 显示开关
          </div>
          <h1 className="mt-2 text-2xl font-black tracking-tight">学习之星显示开关</h1>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/admin/ranking">
            <Button tone="secondary">返回列表</Button>
          </Link>
        </div>
      </div>

      {/* 主配置区域 */}
      <div className="max-w-4xl space-y-5">
        {/* 模块1：总开关 */}
        <div className="rounded-2xl bg-white p-6 ring-1 ring-slate-200">
          <h2 className="mb-4 text-lg font-black text-slate-900">总开关</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="displayEnabled"
                  checked={displayEnabled}
                  onChange={(e) => setDisplayEnabled(e.target.checked)}
                  className="h-5 w-5 rounded border-slate-300"
                />
                <label htmlFor="displayEnabled" className="text-base font-bold text-slate-900">
                  终端显示学习之星
                </label>
              </div>
            </div>
            <div className="rounded-xl bg-slate-50 p-4 text-sm leading-relaxed text-slate-700">
              <div className="mb-2 font-bold text-slate-900">说明：</div>
              <ul className="space-y-1 pl-4">
                <li>• 开启后，终端可在互动结束流程中展示本校学习之星内容</li>
                <li>• 关闭后，终端不展示学习之星相关页面和入口</li>
              </ul>
            </div>
            {displayEnabled && (
              <div className="rounded-xl bg-green-50 p-4 text-sm font-bold text-green-700">
                ✅ 学习之星功能已开启，终端可展示学习之星
              </div>
            )}
            {!displayEnabled && (
              <div className="rounded-xl bg-red-50 p-4 text-sm font-bold text-red-700">
                ❌ 学习之星功能已关闭，终端不会展示学习之星
              </div>
            )}
          </div>
        </div>

        {/* 模块2：显示时机配置 */}
        <div className="rounded-2xl bg-white p-6 ring-1 ring-slate-200">
          <h2 className="mb-4 text-lg font-black text-slate-900">显示时机配置</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <input
                type="checkbox"
                id="showAfterInteraction"
                checked={showAfterInteraction}
                onChange={(e) => setShowAfterInteraction(e.target.checked)}
                disabled={!displayEnabled}
                className="mt-1 h-4 w-4 rounded border-slate-300 disabled:opacity-50"
              />
              <div className="flex-1">
                <label
                  htmlFor="showAfterInteraction"
                  className={`text-sm font-bold ${displayEnabled ? 'text-slate-900' : 'text-slate-400'}`}
                >
                  是否在互动完成后显示（推荐开启）
                </label>
                <div className="mt-1 text-xs text-slate-500">
                  互动结束 → 成长反馈 → 排行榜展示
                </div>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <input
                type="checkbox"
                id="showOnHomepage"
                checked={showOnHomepage}
                onChange={(e) => setShowOnHomepage(e.target.checked)}
                disabled={!displayEnabled}
                className="mt-1 h-4 w-4 rounded border-slate-300 disabled:opacity-50"
              />
              <div className="flex-1">
                <label
                  htmlFor="showOnHomepage"
                  className={`text-sm font-bold ${displayEnabled ? 'text-slate-900' : 'text-slate-400'}`}
                >
                  是否在首页显示学习之星入口（首期不建议开放）
                </label>
                <div className="mt-1 text-xs text-slate-500">
                  在终端首页增加学习之星查看入口
                </div>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <input
                type="checkbox"
                id="showOnGrowthDetail"
                checked={showOnGrowthDetail}
                onChange={(e) => setShowOnGrowthDetail(e.target.checked)}
                disabled={!displayEnabled}
                className="mt-1 h-4 w-4 rounded border-slate-300 disabled:opacity-50"
              />
              <div className="flex-1">
                <label
                  htmlFor="showOnGrowthDetail"
                  className={`text-sm font-bold ${displayEnabled ? 'text-slate-900' : 'text-slate-400'}`}
                >
                  是否在成长详情页显示学习之星入口（首期不建议开放）
                </label>
                <div className="mt-1 text-xs text-slate-500">
                  在成长详情页增加学习之星查看入口
                </div>
              </div>
            </div>

            <div className="rounded-xl bg-blue-50 p-4 text-sm text-blue-700">
              💡 首期建议：只开放"互动完成后显示"，其他入口暂不开放
            </div>
          </div>
        </div>

        {/* 模块3：显示条件限制 */}
        <div className="rounded-2xl bg-white p-6 ring-1 ring-slate-200">
          <h2 className="mb-4 text-lg font-black text-slate-900">显示条件限制</h2>
          <div className="space-y-4">
            <div className="rounded-xl bg-slate-50 p-4">
              <div className="text-sm font-bold text-slate-900">仅本校学生可见（固定）</div>
              <div className="mt-1 text-xs text-slate-500">
                学习之星只展示本校学生数据，不跨校展示
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-bold text-slate-900">
                最低上榜人数阈值
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  value={minStudents}
                  onChange={(e) => setMinStudents(Number(e.target.value))}
                  min={1}
                  max={100}
                  disabled={!displayEnabled}
                  className="w-32 rounded-xl border border-slate-200 px-3 py-2 text-sm focus:border-slate-400 focus:outline-none disabled:bg-slate-50 disabled:text-slate-400"
                />
                <span className="text-sm text-slate-600">人</span>
              </div>
              <div className="mt-2 text-xs text-slate-500">
                例如：至少3人参与互动才显示学习之星
              </div>
            </div>

            <div className="flex items-start gap-4">
              <input
                type="checkbox"
                id="showWhenInsufficient"
                checked={showWhenInsufficient}
                onChange={(e) => setShowWhenInsufficient(e.target.checked)}
                disabled={!displayEnabled}
                className="mt-1 h-4 w-4 rounded border-slate-300 disabled:opacity-50"
              />
              <div className="flex-1">
                <label
                  htmlFor="showWhenInsufficient"
                  className={`text-sm font-bold ${displayEnabled ? 'text-slate-900' : 'text-slate-400'}`}
                >
                  若人数不足是否显示榜单
                </label>
                <div className="mt-1 text-xs text-slate-500">
                  开启：显示"学习之星即将开启"提示<br />
                  关闭：完全不显示学习之星页面
                </div>
              </div>
            </div>

            <div className="rounded-xl bg-amber-50 p-4 text-sm text-amber-700">
              ⚠️ 建议逻辑：若学校有效成绩人数不足设定阈值，可不显示完整展示，仅显示"学习之星即将开启"
            </div>
          </div>
        </div>

        {/* 终端判断逻辑说明 */}
        <div className="rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 p-6 ring-1 ring-purple-200">
          <h3 className="mb-4 text-base font-black text-slate-900">终端判断逻辑</h3>
          <div className="space-y-3 text-sm text-slate-700">
            <div className="flex items-start gap-3">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-purple-500 text-xs font-black text-white">
                1
              </div>
              <div className="flex-1">
                <div className="font-bold">读取学习之星显示总开关</div>
                <div className="text-xs text-slate-500">判断是否开启学习之星功能</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-purple-500 text-xs font-black text-white">
                2
              </div>
              <div className="flex-1">
                <div className="font-bold">判断当前学校是否有学习之星配置</div>
                <div className="text-xs text-slate-500">检查学校是否配置了学习之星规则</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-purple-500 text-xs font-black text-white">
                3
              </div>
              <div className="flex-1">
                <div className="font-bold">判断有效上榜人数是否达到最小阈值</div>
                <div className="text-xs text-slate-500">检查参与学生数量是否满足要求</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-500 text-xs font-black text-white">
                ✓
              </div>
              <div className="flex-1">
                <div className="font-bold text-green-700">若全部满足，则进入学习之星展示页</div>
                <div className="text-xs text-slate-500">否则跳过学习之星流程，直接进入后续流程</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 底部固定按钮 */}
      <div className="sticky bottom-0 flex items-center justify-end gap-3 rounded-2xl bg-white p-4 ring-1 ring-slate-200">
        <Button tone="secondary" onClick={() => window.alert('原型占位：保存草稿')}>
          保存草稿
        </Button>
        <Button tone="primary" onClick={() => window.alert('原型占位：立即生效')}>
          立即生效
        </Button>
        <Link href="/admin/ranking">
          <Button tone="secondary">返回</Button>
        </Link>
      </div>
    </div>
  )
}
