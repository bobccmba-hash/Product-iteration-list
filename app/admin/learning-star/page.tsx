'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function LearningStarPage() {
  const [stars, setStars] = useState([
    {
      id: '1',
      name: '张三',
      avatar: '',
      score: 1250,
      rank: 1,
      badges: ['学习达人', '连续打卡'],
      createdAt: '2024-03-01',
      updatedAt: '2024-03-12',
    },
    {
      id: '2',
      name: '李四',
      avatar: '',
      score: 1180,
      rank: 2,
      badges: ['学习达人'],
      createdAt: '2024-03-02',
      updatedAt: '2024-03-11',
    },
  ])

  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null)

  const deleteStar = (id: string) => {
    setStars(stars.filter(s => s.id !== id))
    setShowDeleteConfirm(null)
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-6xl px-8 py-8">
        <header className="mb-8 space-y-3">
          <h1 className="text-3xl font-black">学习之星管理</h1>
          <p className="max-w-3xl text-lg leading-relaxed text-slate-600">
            管理平台学习之星，展示用户学习成就和排名。
          </p>
        </header>

        <div className="mb-6">
          <button className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-bold text-white hover:bg-indigo-700">
            新增学习之星
          </button>
        </div>

        <div className="rounded-2xl bg-white ring-1 ring-slate-200">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-slate-200 bg-slate-50">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-bold text-slate-700">排名</th>
                  <th className="px-6 py-3 text-left text-sm font-bold text-slate-700">姓名</th>
                  <th className="px-6 py-3 text-left text-sm font-bold text-slate-700">学习分数</th>
                  <th className="px-6 py-3 text-left text-sm font-bold text-slate-700">获得徽章</th>
                  <th className="px-6 py-3 text-left text-sm font-bold text-slate-700">创建时间</th>
                  <th className="px-6 py-3 text-left text-sm font-bold text-slate-700">更新时间</th>
                  <th className="px-6 py-3 text-left text-sm font-bold text-slate-700">操作</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {stars.map((star) => (
                  <tr key={star.id} className="hover:bg-slate-50">
                    <td className="px-6 py-4 text-sm font-bold text-slate-900">
                      <span className={`inline-flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold ${
                        star.rank === 1 ? 'bg-yellow-100 text-yellow-700' :
                        star.rank === 2 ? 'bg-slate-300 text-slate-700' :
                        star.rank === 3 ? 'bg-orange-100 text-orange-700' :
                        'bg-slate-100 text-slate-700'
                      }`}>
                        {star.rank}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm font-bold text-slate-900">{star.name}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">{star.score}</td>
                    <td className="px-6 py-4 text-sm">
                      <div className="flex gap-1">
                        {star.badges.map((badge, idx) => (
                          <span key={idx} className="rounded-full bg-indigo-100 px-2 py-1 text-xs font-bold text-indigo-700">
                            {badge}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">{star.createdAt}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">{star.updatedAt}</td>
                    <td className="px-6 py-4 text-sm">
                      <div className="flex items-center gap-2">
                        <button className="rounded-lg bg-indigo-100 px-2 py-1 text-xs font-bold text-indigo-700 hover:bg-indigo-200">
                          编辑
                        </button>
                        <button onClick={() => setShowDeleteConfirm(star.id)} className="rounded-lg bg-red-100 px-2 py-1 text-xs font-bold text-red-700 hover:bg-red-200">
                          删除
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {stars.length === 0 && (
          <div className="rounded-2xl bg-white p-12 text-center ring-1 ring-slate-200">
            <p className="text-slate-600">暂无学习之星，点击"新增学习之星"创建</p>
          </div>
        )}

        {showDeleteConfirm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="rounded-2xl bg-white p-6 shadow-lg">
              <h3 className="text-lg font-bold">确认删除</h3>
              <p className="mt-2 text-slate-600">删除后无法恢复，确认删除吗？</p>
              <div className="mt-4 flex gap-3">
                <button onClick={() => setShowDeleteConfirm(null)} className="flex-1 rounded-lg bg-slate-200 px-4 py-2 text-sm font-bold text-slate-700">
                  取消
                </button>
                <button onClick={() => deleteStar(showDeleteConfirm)} className="flex-1 rounded-lg bg-red-600 px-4 py-2 text-sm font-bold text-white">
                  确认删除
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
