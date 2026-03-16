'use client'

import Link from 'next/link'
import { Button } from '@/components/admin/AdminPrimitives'
import { mockRankingRecords } from '@/utils/rankingMock'

export default function RankingPreviewPage() {
  const topRecords = mockRankingRecords.slice(0, 10)
  const myRank = 5
  const myRecord = mockRankingRecords[myRank - 1]

  return (
    <div className="space-y-5">
      {/* 顶部区域 */}
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="text-xs font-bold text-slate-500">
            系统入口 / 学习之星配置 / 预览
          </div>
          <h1 className="mt-2 text-2xl font-black tracking-tight">终端排行榜展示效果预览</h1>
          <div className="mt-2 text-sm text-slate-600">
            当前配置名称：示例小学A互动学习之星 · 适用学校：示例小学A
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/admin/ranking">
            <Button tone="secondary">返回列表</Button>
          </Link>
        </div>
      </div>

      {/* 预览区域 */}
      <div className="grid gap-5 lg:grid-cols-3">
        {/* 模块1：互动结束后榜单弹出样式 */}
        <div className="rounded-2xl bg-white p-5 ring-1 ring-slate-200">
          <h3 className="mb-4 text-sm font-black text-slate-900">互动结束后学习之星弹出样式</h3>
          <div className="rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 p-6 text-white shadow-xl">
            <div className="mb-4 text-center">
              <div className="text-2xl font-black">本校互动学习之星</div>
              <div className="mt-1 text-sm opacity-90">展示本校前10名最高分</div>
            </div>

            {/* 前三位特殊展示 */}
            <div className="mb-4 space-y-2">
              {topRecords.slice(0, 3).map((record) => (
                <div
                  key={record.rank}
                  className={`flex items-center gap-3 rounded-xl p-3 ${
                    record.rank === 1
                      ? 'bg-yellow-400/30 ring-2 ring-yellow-300'
                      : 'bg-white/20'
                  }`}
                >
                  <div className="text-2xl font-black">
                    {record.rank === 1 ? '🥇' : record.rank === 2 ? '🥈' : '🥉'}
                  </div>
                  <div className="h-10 w-10 overflow-hidden rounded-full bg-white/30">
                    {record.avatarUrl && (
                      <img src={record.avatarUrl} alt="" className="h-full w-full object-cover" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="text-xs font-bold opacity-90">{record.studentCode}</div>
                    <div className="text-lg font-black">{record.score} 分</div>
                  </div>
                </div>
              ))}
            </div>

            {/* 展示列表 */}
            <div className="space-y-1">
              {topRecords.slice(3, 6).map((record) => (
                <div key={record.rank} className="flex items-center gap-3 rounded-lg bg-white/10 p-2">
                  <div className="text-sm font-black opacity-75">位置 {record.rank}</div>
                  <div className="h-8 w-8 overflow-hidden rounded-full bg-white/20">
                    {record.avatarUrl && (
                      <img src={record.avatarUrl} alt="" className="h-full w-full object-cover" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="text-xs font-bold opacity-90">{record.studentCode}</div>
                  </div>
                  <div className="text-sm font-black">{record.score}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 模块2：我的学习表现样式 */}
        <div className="rounded-2xl bg-white p-5 ring-1 ring-slate-200">
          <h3 className="mb-4 text-sm font-black text-slate-900">我的学习表现样式</h3>
          <div className="space-y-4">
            {/* 在榜单中的样式 */}
            <div>
              <div className="mb-2 text-xs font-bold text-slate-600">在展示中</div>
              <div className="rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 p-4 text-white shadow-lg">
                <div className="mb-2 text-xs font-bold opacity-90">我的学习表现</div>
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 overflow-hidden rounded-full bg-white/30">
                    {myRecord.avatarUrl && (
                      <img src={myRecord.avatarUrl} alt="" className="h-full w-full object-cover" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="text-xs font-bold opacity-90">{myRecord.studentCode}</div>
                    <div className="text-lg font-black">{myRecord.score} 分</div>
                  </div>
                  <div className="text-3xl">⭐</div>
                </div>
                <div className="mt-3 text-center text-xs opacity-90">
                  本次分数：95 分
                </div>
              </div>
            </div>

            {/* 独立展示样式 */}
            <div>
              <div className="mb-2 text-xs font-bold text-slate-600">独立展示</div>
              <div className="rounded-xl bg-slate-50 p-4 ring-1 ring-slate-200">
                <div className="mb-3 flex items-center justify-between">
                  <div className="text-sm font-bold text-slate-900">我的学习表现</div>
                  <div className="text-2xl">⭐</div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 overflow-hidden rounded-full bg-slate-200">
                    {myRecord.avatarUrl && (
                      <img src={myRecord.avatarUrl} alt="" className="h-full w-full object-cover" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="text-xs font-bold text-slate-600">{myRecord.studentCode}</div>
                    <div className="text-base font-black text-slate-900">{myRecord.score} 分</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 模块3：未进入学习之星展示状态样式 */}
        <div className="rounded-2xl bg-white p-5 ring-1 ring-slate-200">
          <h3 className="mb-4 text-sm font-black text-slate-900">未进入学习之星展示状态样式</h3>
          <div className="space-y-4">
            {/* 样式1：提示卡片 */}
            <div>
              <div className="mb-2 text-xs font-bold text-slate-600">提示卡片样式</div>
              <div className="rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 p-6 text-center text-white shadow-lg">
                <div className="mb-3 text-5xl">🎯</div>
                <div className="mb-2 text-lg font-black">继续努力，争取成为学习之星</div>
                <div className="mb-4 rounded-lg bg-white/20 p-3 backdrop-blur">
                  <div className="text-xs opacity-90">我的当前成绩</div>
                  <div className="mt-1 text-2xl font-black">72 分</div>
                </div>
                <div className="text-sm opacity-90">再接再厉，挑战更高分数！</div>
              </div>
            </div>

            {/* 样式2：简洁提示 */}
            <div>
              <div className="mb-2 text-xs font-bold text-slate-600">简洁提示样式</div>
              <div className="rounded-xl bg-slate-50 p-4 text-center ring-1 ring-slate-200">
                <div className="mb-2 text-3xl">💪</div>
                <div className="mb-2 text-sm font-bold text-slate-900">继续努力，争取成为学习之星</div>
                <div className="mb-3 text-xs text-slate-600">当前成绩：72 分</div>
                <div className="text-xs text-slate-500">继续挑战，争取进入学习之星展示！</div>
              </div>
            </div>

            {/* 样式3：人数不足提示 */}
            <div>
              <div className="mb-2 text-xs font-bold text-slate-600">人数不足提示</div>
              <div className="rounded-xl bg-blue-50 p-4 text-center ring-1 ring-blue-200">
                <div className="mb-2 text-3xl">⏳</div>
                <div className="mb-2 text-sm font-bold text-blue-900">学习之星即将开启</div>
                <div className="text-xs text-blue-700">
                  当前参与人数不足，继续互动即可开启学习之星展示
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 完整展示数据预览 */}
      <div className="rounded-2xl bg-white p-6 ring-1 ring-slate-200">
        <h3 className="mb-4 text-lg font-black text-slate-900">完整展示数据预览</h3>
        <div className="overflow-x-auto">
          <table className="min-w-[800px] w-full text-left text-sm">
            <thead className="bg-slate-50 text-xs font-bold text-slate-600">
              <tr>
                <th className="px-4 py-3">展示位置</th>
                <th className="px-4 py-3">学生头像</th>
                <th className="px-4 py-3">学生编号</th>
                <th className="px-4 py-3">分数</th>
                <th className="px-4 py-3">最近更新时间</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {topRecords.map((record) => (
                <tr
                  key={record.rank}
                  className={`hover:bg-slate-50/60 ${record.rank === myRank ? 'bg-blue-50' : ''}`}
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-black text-slate-900">位置 {record.rank}</span>
                      {record.rank <= 3 && (
                        <span className="text-xl">
                          {record.rank === 1 ? '🥇' : record.rank === 2 ? '🥈' : '🥉'}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="h-10 w-10 overflow-hidden rounded-full bg-slate-200">
                      {record.avatarUrl && (
                        <img src={record.avatarUrl} alt="" className="h-full w-full object-cover" />
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3 font-mono text-sm font-bold text-slate-900">
                    {record.studentCode}
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-lg font-black text-slate-900">{record.score}</span>
                    <span className="ml-1 text-xs text-slate-500">分</span>
                  </td>
                  <td className="px-4 py-3 text-slate-600">{record.lastUpdatedAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 底部按钮 */}
      <div className="sticky bottom-0 flex items-center justify-end gap-3 rounded-2xl bg-white p-4 ring-1 ring-slate-200">
        <Link href="/admin/ranking/create">
          <Button tone="secondary">返回编辑</Button>
        </Link>
        <Button tone="secondary" onClick={() => window.alert('原型占位：保存草稿')}>
          保存草稿
        </Button>
        <Button tone="primary" onClick={() => window.alert('原型占位：发布配置')}>
          发布配置
        </Button>
      </div>
    </div>
  )
}
