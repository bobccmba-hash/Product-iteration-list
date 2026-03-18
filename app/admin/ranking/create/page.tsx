'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Button } from '@/components/admin/AdminPrimitives'
import { rankingStore } from '@/utils/rankingStore'

export default function RankingCreatePage() {
  const [configName, setConfigName] = useState('')
  const [topN, setTopN] = useState(10)
  const [showAvatar, setShowAvatar] = useState(true)
  const [showStudentCode, setShowStudentCode] = useState(true)
  const [showScore, setShowScore] = useState(true)
  const [showMyPerformance, setShowMyPerformance] = useState(true)
  const [showCurrentScore, setShowCurrentScore] = useState(true)
  const [scoreCriteria, setScoreCriteria] = useState<'highest_score' | 'latest_score'>('highest_score')
  const [title, setTitle] = useState('本校学习之星')
  const [subtitle, setSubtitle] = useState('展示本校优秀学习表现')
  const [myPerformanceHint, setMyPerformanceHint] = useState('我的学习表现')
  const [notShownHint, setNotShownHint] = useState('继续努力，争取成为学习之星')
  const [encourageText, setEncourageText] = useState('再接再厉，挑战更高分数！')
  const [minStudents, setMinStudents] = useState(3)
  const [showWhenInsufficient, setShowWhenInsufficient] = useState(false)

  return (
    <div className="space-y-5">
      {/* 顶部 */}
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="text-xs font-bold text-slate-500">系统入口 / 学习之星配置 / 新建</div>
          <h1 className="mt-2 text-2xl font-black tracking-tight">新建学习之星配置</h1>
          <p className="mt-1 text-sm text-slate-500">配置学习之星的展示规则，保存后在列表页开启并推送终端生效，无需绑定学校或指定生效时间</p>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/admin/ranking">
            <Button tone="secondary">返回列表</Button>
          </Link>
        </div>
      </div>

      {/* 规则说明 */}
      <div className="rounded-2xl bg-amber-50 p-4 ring-1 ring-amber-100">
        <div className="flex items-start gap-3">
          <div className="text-xl">ℹ️</div>
          <div className="text-sm text-amber-800">
            <div className="mb-1 font-black">配置说明</div>
            <ul className="space-y-1 text-xs leading-relaxed">
              <li>• 学习之星配置<span className="font-bold">不绑定学校</span>，保存后可推送给任意学校的终端</li>
              <li>• 每条配置针对<span className="font-bold">一个互动游戏</span>，按该游戏单次得分展示，不跨游戏合并</li>
              <li>• 学生同一游戏多次参与，默认取<span className="font-bold">历史最高分</span>参与展示</li>
              <li>• 无需设置生效时间，<span className="font-bold">开启 + 推送终端</span>后立即在对应终端展示</li>
            </ul>
          </div>
        </div>
      </div>

      {/* 主内容 - 双栏 */}
      <div className="grid gap-5 lg:grid-cols-[1fr_360px]">
        {/* 左侧：表单 */}
        <div className="space-y-5">

          {/* 基础信息 */}
          <div className="rounded-2xl bg-white p-5 ring-1 ring-slate-200">
            <h2 className="mb-4 text-base font-black text-slate-900">基础信息</h2>
            <div className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-bold text-slate-700">配置名称 <span className="text-rose-500">*</span></label>
                <input type="text" value={configName} onChange={(e) => setConfigName(e.target.value)}
                  placeholder="例如：学习之星规则A"
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm focus:border-slate-400 focus:outline-none" />
              </div>
              <div>
                <label className="mb-1 block text-sm font-bold text-slate-700">展示类型</label>
                <input type="text" value="本校学习之星" disabled
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-500" />
                <p className="mt-1 text-xs text-slate-500">展示本校学生互动分数的优秀表现，不跨学校合并</p>
              </div>
            </div>
          </div>

          {/* 展示规则 */}
          <div className="rounded-2xl bg-white p-5 ring-1 ring-slate-200">
            <h2 className="mb-4 text-base font-black text-slate-900">展示规则</h2>
            <div className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-bold text-slate-700">展示人数</label>
                <div className="flex items-center gap-2">
                  <input type="number" value={10} disabled
                    className="w-28 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-500" />
                  <span className="text-xs text-slate-500">人（固定）</span>
                </div>
              </div>
              <div>
                <label className="mb-2 block text-sm font-bold text-slate-700">分数计算规则</label>
                <div className="flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3">
                  <input type="radio" checked readOnly className="mt-0.5" />
                  <div>
                    <div className="text-sm font-bold text-slate-800">以成绩最高分推荐</div>
                    <div className="text-xs text-slate-500">取历史最高得分展示，数据稳定</div>
                  </div>
                </div>
              </div>
              <div>
                <label className="mb-2 block text-sm font-bold text-slate-700">展示内容</label>
                <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
                  {['学生头像', '学生编号', '互动分数', '我的学习表现', '本次得分'].map((label) => (
                    <div key={label} className="flex items-center gap-2">
                      <input type="checkbox" checked readOnly className="h-4 w-4 rounded border-slate-300" />
                      <span className="text-sm text-slate-700">{label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* 前台文案 */}
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
                <label className="mb-1 block text-sm font-bold text-slate-700">未进入学习之星展示提示文案</label>
                <input type="text" value={notShownHint} onChange={(e) => setNotShownHint(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm focus:border-slate-400 focus:outline-none" />
              </div>
            </div>
          </div>
        </div>

        {/* 右侧：预览 */}
        <div className="space-y-4">
          <div className="sticky top-4 space-y-4">
            <div className="rounded-2xl bg-white p-5 ring-1 ring-slate-200">
              <h3 className="mb-3 text-sm font-black text-slate-900">配置预览</h3>
              <div className="rounded-xl bg-gradient-to-br from-purple-600 to-indigo-600 p-4 text-white">
                <div className="mb-3 text-center">
                  <div className="text-xl font-black">{title || '本校学习之星'}</div>
                  <div className="mt-1 text-xs opacity-80">{subtitle || '展示本校优秀学习表现'}</div>
                </div>
                <div className="space-y-2">
                  {[98, 95, 92].map((score, i) => (
                    <div key={i} className="flex items-center gap-2 rounded-lg bg-white/10 p-2">
                      <span className="text-base">{i === 0 ? '🥇' : i === 1 ? '🥈' : '🥉'}</span>
                      {showAvatar && <div className="h-6 w-6 rounded-full bg-white/30" />}
                      {showStudentCode && <span className="flex-1 text-xs font-bold">AB{String(i + 1).padStart(3, '0')}</span>}
                      {showScore && <span className="text-sm font-black">{score} 分</span>}
                    </div>
                  ))}
                  <div className="mt-1 text-center text-xs opacity-60">... 共展示前 {topN} 位</div>
                </div>
                {showMyPerformance && (
                  <div className="mt-3 rounded-lg bg-white/20 p-2 text-center text-xs">
                    <div className="font-bold">{myPerformanceHint || '我的学习表现'}</div>
                    <div className="mt-1 opacity-80">本次得分：85 分 ⭐</div>
                  </div>
                )}
              </div>

              <div className="mt-3 rounded-xl bg-amber-50 p-3 text-center ring-1 ring-amber-200">
                <div className="text-xs font-bold text-amber-700">{notShownHint || '继续努力，争取成为学习之星'}</div>
                <div className="mt-1 text-xs text-slate-600">{encourageText}</div>
              </div>
            </div>

            {/* 配置摘要 */}
            <div className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200">
              <h3 className="mb-3 text-xs font-black text-slate-600">配置摘要</h3>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between"><span className="text-slate-500">展示人数</span><span className="font-bold text-slate-900">前 {topN} 位</span></div>
                <div className="flex justify-between"><span className="text-slate-500">计分方式</span><span className="font-bold text-slate-900">{scoreCriteria === 'highest_score' ? '历史最高分' : '最近一次'}</span></div>
                <div className="flex justify-between"><span className="text-slate-500">最低人数阈值</span><span className="font-bold text-slate-900">{minStudents} 人</span></div>
                <div className="flex justify-between"><span className="text-slate-500">适用学校</span><span className="font-bold text-slate-900">推送时选择</span></div>
                <div className="flex justify-between"><span className="text-slate-500">生效时间</span><span className="font-bold text-slate-900">开启后推送即生效</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 底部操作栏 */}
      <div className="sticky bottom-4 rounded-2xl bg-white p-4 ring-1 ring-slate-200">
        <div className="flex flex-wrap items-center gap-3">
          <Button tone="primary" onClick={() => {
            if (!configName.trim()) {
              window.alert('请填写配置名称')
              return
            }
            const newId = `rank_${Date.now()}`
            rankingStore.addConfig({
              id: newId,
              name: configName,
              rankingType: '本校学习之星',
              rankingBasis: '单次游戏分数',
              targetGame: 'ar_pose',
              displayEnabled: false,
              topN: 10,
              status: 'draft',
              updatedAt: new Date().toLocaleString('zh-CN', { hour12: false }).replace(/\//g, '-').slice(0, 16),
              activeTerminalCount: 0,
              showAvatar: true,
              showStudentCode: true,
              showScore: true,
              showMyPerformance: true,
              showCurrentScore: true,
              scoreCriteria: 'highest_score',
              title,
              subtitle,
              myPerformanceHint,
              notShownHint,
              encourageText,
              minStudents: 3,
              showWhenInsufficient: false,
            })
            window.location.href = '/admin/ranking'
          }}>
            保存为草稿
          </Button>
          <Button tone="secondary" onClick={() => window.location.href = '/admin/ranking'}>
            取消
          </Button>
          <div className="ml-auto text-xs text-slate-500">
            保存后在列表页开启，再推送到终端即可生效，无需设置生效时间
          </div>
        </div>
      </div>
    </div>
  )
}
