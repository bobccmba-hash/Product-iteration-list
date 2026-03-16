'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useParams } from 'next/navigation'
import { Button } from '@/components/admin/AdminPrimitives'
import { mockRankingConfigs } from '@/utils/rankingMock'

export default function RankingEditPage() {
  const params = useParams<{ id: string }>()
  const config = mockRankingConfigs.find((c) => c.id === params.id)

  const [configName, setConfigName] = useState(config?.name ?? '')
  const [topN, setTopN] = useState(config?.topN ?? 10)
  const [showAvatar, setShowAvatar] = useState(config?.showAvatar ?? true)
  const [showStudentCode, setShowStudentCode] = useState(config?.showStudentCode ?? true)
  const [showScore, setShowScore] = useState(config?.showScore ?? true)
  const [showMyPerformance, setShowMyPerformance] = useState(config?.showMyPerformance ?? true)
  const [showCurrentScore, setShowCurrentScore] = useState(config?.showCurrentScore ?? true)
  const [scoreCriteria, setScoreCriteria] = useState<'highest_score' | 'latest_score'>(config?.scoreCriteria ?? 'highest_score')
  const [title, setTitle] = useState(config?.title ?? '本校学习之星')
  const [subtitle, setSubtitle] = useState(config?.subtitle ?? '展示本校优秀学习表现')
  const [myPerformanceHint, setMyPerformanceHint] = useState(config?.myPerformanceHint ?? '我的学习表现')
  const [notShownHint, setNotShownHint] = useState(config?.notShownHint ?? '继续努力，争取成为学习之星')
  const [encourageText, setEncourageText] = useState(config?.encourageText ?? '再接再厉，挑战更高分数！')
  const [minStudents, setMinStudents] = useState(config?.minStudents ?? 3)
  const [showWhenInsufficient, setShowWhenInsufficient] = useState(config?.showWhenInsufficient ?? false)

  if (!config) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <div className="text-4xl">🔍</div>
        <div className="mt-4 text-lg font-black text-slate-900">找不到该配置</div>
        <div className="mt-2 text-sm text-slate-500">ID: {params.id}</div>
        <Link href="/admin/ranking" className="mt-6"><Button tone="secondary">返回列表</Button></Link>
      </div>
    )
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="text-xs font-bold text-slate-500">系统入口 / 学习之星配置 / 编辑</div>
          <h1 className="mt-2 text-2xl font-black tracking-tight">编辑学习之星配置</h1>
          <p className="mt-1 text-sm text-slate-500">ID: <span className="font-mono">{params.id}</span> · 修改后需重新推送终端才能生效</p>
        </div>
        <Link href="/admin/ranking"><Button tone="secondary">返回列表</Button></Link>
      </div>

      <div className="grid gap-5 lg:grid-cols-[1fr_360px]">
        <div className="space-y-5">
          <div className="rounded-2xl bg-white p-5 ring-1 ring-slate-200">
            <h2 className="mb-4 text-base font-black text-slate-900">基础信息</h2>
            <div className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-bold text-slate-700">配置名称</label>
                <input type="text" value={configName} onChange={(e) => setConfigName(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm focus:border-slate-400 focus:outline-none" />
              </div>
              <div>
                <label className="mb-1 block text-sm font-bold text-slate-700">展示类型</label>
                <input type="text" value="本校学习之星" disabled
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-500" />
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-white p-5 ring-1 ring-slate-200">
            <h2 className="mb-4 text-base font-black text-slate-900">展示规则</h2>
            <div className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-bold text-slate-700">展示人数</label>
                <div className="flex items-center gap-2">
                  <input type="number" value={topN} onChange={(e) => setTopN(Number(e.target.value))} min={1} max={50}
                    className="w-28 rounded-xl border border-slate-200 px-3 py-2 text-sm focus:border-slate-400 focus:outline-none" />
                  <div className="flex gap-2">
                    {[3, 5, 10].map((n) => (
                      <button key={n} onClick={() => setTopN(n)}
                        className={`rounded-lg px-3 py-1 text-xs font-bold transition ${topN === n ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}>{n}</button>
                    ))}
                  </div>
                </div>
              </div>
              <div>
                <label className="mb-2 block text-sm font-bold text-slate-700">分数计算规则</label>
                <div className="flex flex-col gap-2">
                  <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-slate-200 p-3 hover:bg-slate-50">
                    <input type="radio" checked={scoreCriteria === 'highest_score'} onChange={() => setScoreCriteria('highest_score')} className="mt-0.5" />
                    <div>
                      <div className="text-sm font-bold text-slate-800">历史最高分 ⭐ 推荐</div>
                      <div className="text-xs text-slate-500">取历史最高得分展示，数据稳定</div>
                    </div>
                  </label>
                  <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-slate-200 p-3 hover:bg-slate-50">
                    <input type="radio" checked={scoreCriteria === 'latest_score'} onChange={() => setScoreCriteria('latest_score')} className="mt-0.5" />
                    <div>
                      <div className="text-sm font-bold text-slate-800">最近一次得分</div>
                      <div className="text-xs text-slate-500">实时反映最新表现</div>
                    </div>
                  </label>
                </div>
              </div>
              <div>
                <label className="mb-2 block text-sm font-bold text-slate-700">展示内容</label>
                <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
                  {[
                    { id: 'a', label: '学生头像', val: showAvatar, set: setShowAvatar },
                    { id: 'b', label: '学生编号', val: showStudentCode, set: setShowStudentCode },
                    { id: 'c', label: '互动分数', val: showScore, set: setShowScore },
                    { id: 'd', label: '我的学习表现', val: showMyPerformance, set: setShowMyPerformance },
                    { id: 'e', label: '本次得分', val: showCurrentScore, set: setShowCurrentScore },
                  ].map((item) => (
                    <label key={item.id} className="flex cursor-pointer items-center gap-2">
                      <input type="checkbox" checked={item.val} onChange={(ev) => item.set(ev.target.checked)} className="h-4 w-4 rounded border-slate-300" />
                      <span className="text-sm text-slate-700">{item.label}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm font-bold text-slate-700">最低参与人数阈值</label>
                  <input type="number" value={minStudents} onChange={(e) => setMinStudents(Number(e.target.value))} min={1}
                    className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm focus:border-slate-400 focus:outline-none" />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-bold text-slate-700">人数不足时</label>
                  <div className="flex items-center gap-3 rounded-xl border border-slate-200 p-3">
                    <input type="checkbox" id="swi" checked={showWhenInsufficient} onChange={(e) => setShowWhenInsufficient(e.target.checked)} className="h-4 w-4" />
                    <label htmlFor="swi" className="text-sm text-slate-700">仍展示（显示学习之星即将开启）</label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-white p-5 ring-1 ring-slate-200">
            <h2 className="mb-4 text-base font-black text-slate-900">前台展示文案</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm font-bold text-slate-700">展示页标题</label>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm focus:border-slate-400 focus:outline-none" />
              </div>
              <div>
                <label className="mb-1 block text-sm font-bold text-slate-700">副标题</label>
                <input type="text" value={subtitle} onChange={(e) => setSubtitle(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm focus:border-slate-400 focus:outline-none" />
              </div>
              <div>
                <label className="mb-1 block text-sm font-bold text-slate-700">我的学习表现文案</label>
                <input type="text" value={myPerformanceHint} onChange={(e) => setMyPerformanceHint(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm focus:border-slate-400 focus:outline-none" />
              </div>
              <div>
                <label className="mb-1 block text-sm font-bold text-slate-700">鼓励文案</label>
                <input type="text" value={encourageText} onChange={(e) => setEncourageText(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm focus:border-slate-400 focus:outline-none" />
              </div>
              <div className="md:col-span-2">
                <label className="mb-1 block text-sm font-bold text-slate-700">未进入展示提示文案</label>
                <input type="text" value={notShownHint} onChange={(e) => setNotShownHint(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm focus:border-slate-400 focus:outline-none" />
              </div>
            </div>
          </div>
        </div>

        <div className="sticky top-4 space-y-4">
          <div className="rounded-2xl bg-white p-5 ring-1 ring-slate-200">
            <h3 className="mb-3 text-sm font-black text-slate-900">配置预览</h3>
            <div className="rounded-xl bg-gradient-to-br from-purple-600 to-indigo-600 p-4 text-white">
              <div className="mb-3 text-center">
                <div className="text-xl font-black">{title}</div>
                <div className="mt-1 text-xs opacity-80">{subtitle}</div>
              </div>
              <div className="space-y-2">
                {[98, 95, 92].map((score, i) => (
                  <div key={i} className="flex items-center gap-2 rounded-lg bg-white/10 p-2">
                    <span>{i === 0 ? '🥇' : i === 1 ? '🥈' : '🥉'}</span>
                    {showAvatar && <div className="h-6 w-6 rounded-full bg-white/30" />}
                    {showStudentCode && <span className="flex-1 text-xs font-bold">AB00{i + 1}</span>}
                    {showScore && <span className="text-sm font-black">{score} 分</span>}
                  </div>
                ))}
                <div className="mt-1 text-center text-xs opacity-60">共展示前 {topN} 位</div>
              </div>
              {showMyPerformance && (
                <div className="mt-3 rounded-lg bg-white/20 p-2 text-center text-xs">
                  <div className="font-bold">{myPerformanceHint}</div>
                  <div className="mt-1 opacity-80">本次得分：85 分 ⭐</div>
                </div>
              )}
            </div>
            <div className="mt-3 rounded-xl bg-amber-50 p-3 text-center ring-1 ring-amber-200">
              <div className="text-xs font-bold text-amber-700">{notShownHint}</div>
              <div className="mt-1 text-xs text-slate-600">{encourageText}</div>
            </div>
          </div>
          <div className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200">
            <h3 className="mb-3 text-xs font-black text-slate-600">配置摘要</h3>
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between"><span className="text-slate-500">展示人数</span><span className="font-bold">前 {topN} 位</span></div>
              <div className="flex justify-between"><span className="text-slate-500">计分方式</span><span className="font-bold">{scoreCriteria === 'highest_score' ? '历史最高分' : '最近一次'}</span></div>
              <div className="flex justify-between"><span className="text-slate-500">最低人数</span><span className="font-bold">{minStudents} 人</span></div>
              <div className="flex justify-between"><span className="text-slate-500">适用学校</span><span className="font-bold">推送时选择</span></div>
              <div className="flex justify-between"><span className="text-slate-500">生效时间</span><span className="font-bold">开启后推送即生效</span></div>
            </div>
          </div>
        </div>
      </div>

      <div className="sticky bottom-4 rounded-2xl bg-white p-4 ring-1 ring-slate-200">
        <div className="flex flex-wrap items-center gap-3">
          <Button tone="primary" onClick={() => window.alert('原型占位：保存修改')}>保存修改</Button>
          <Link href="/admin/ranking"><Button tone="secondary">取消</Button></Link>
          <div className="ml-auto text-xs text-slate-500">保存后需重新推送终端才能生效</div>
        </div>
      </div>
    </div>
  )
}
