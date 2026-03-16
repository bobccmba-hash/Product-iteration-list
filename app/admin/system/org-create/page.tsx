'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button, Input } from '@/components/admin/AdminPrimitives'

type OrgFormData = {
  name: string
  type: string
  department: string
  tags: string[]
  badges: string[]
  description: string
  contact: string
  phone: string
  address: string
}

export default function OrgCreatePage() {
  const [formData, setFormData] = useState<OrgFormData>({
    name: '',
    type: '',
    department: '',
    tags: [],
    badges: [],
    description: '',
    contact: '',
    phone: '',
    address: '',
  })

  const [showMapModal, setShowMapModal] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // 模拟数据
  const types = [
    { id: '1', name: '官方机构' },
    { id: '2', name: '国企单位' },
    { id: '3', name: '社会机构' },
  ]

  const departments = [
    { id: '1', name: '教育部门' },
    { id: '2', name: '卫生部门' },
    { id: '3', name: '文化部门' },
    { id: '4', name: '体育部门' },
  ]

  const tags = [
    { id: '1', name: '人气机构' },
    { id: '2', name: '科普基地' },
    { id: '3', name: '示范单位' },
  ]

  const badges = [
    { id: '1', name: '蓝V认证' },
    { id: '2', name: '红V认证' },
    { id: '3', name: '新春活动' },
  ]

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({ ...formData, type: e.target.value })
  }

  const handleTagToggle = (tagId: string) => {
    setFormData({
      ...formData,
      tags: formData.tags.includes(tagId)
        ? formData.tags.filter(t => t !== tagId)
        : [...formData.tags, tagId]
    })
  }

  const handleBadgeToggle = (badgeId: string) => {
    setFormData({
      ...formData,
      badges: formData.badges.includes(badgeId)
        ? formData.badges.filter(b => b !== badgeId)
        : [...formData.badges, badgeId]
    })
  }

  const handleSubmit = async () => {
    if (!formData.name.trim()) {
      alert('请填写机构名称')
      return
    }
    if (!formData.type) {
      alert('请选择机构类型')
      return
    }
    setIsSubmitting(true)
    try {
      // 模拟提交延迟
      await new Promise(resolve => setTimeout(resolve, 1000))
      console.log('提交表单数据:', formData)
      alert('机构创建成功！')
      // 重置表单
      setFormData({
        name: '',
        type: '',
        department: '',
        tags: [],
        badges: [],
        description: '',
        contact: '',
        phone: '',
        address: '',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const getTypeName = (typeId: string) => types.find(t => t.id === typeId)?.name || ''
  const getDepartmentName = (deptId: string) => departments.find(d => d.id === deptId)?.name || ''
  const getTagNames = (tagIds: string[]) => tagIds.map(id => tags.find(t => t.id === id)?.name).filter(Boolean).join('、')
  const getBadgeNames = (badgeIds: string[]) => badgeIds.map(id => badges.find(b => b.id === id)?.name).filter(Boolean).join('、')

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="text-xs font-bold text-slate-500">系统管理 / 系统机构管理</div>
          <h1 className="mt-2 text-2xl font-black tracking-tight">新建机构</h1>
          <p className="mt-1 text-sm text-slate-600">
            创建新的机构，配置机构类型、标签、认证标识等信息。
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/admin">
            <Button tone="secondary">返回后台首页</Button>
          </Link>
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        {/* 主表单区域 */}
        <div className="lg:col-span-2 rounded-2xl bg-white p-6 ring-1 ring-slate-200 space-y-6">
          {/* 基础信息 */}
          <div>
            <h2 className="text-lg font-bold mb-4">基础信息</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold mb-1">机构名称 *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="请输入机构名称"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                />
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="block text-sm font-bold mb-1">机构类型 *</label>
                  <select
                    value={formData.type}
                    onChange={handleTypeChange}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                  >
                    <option value="">请选择机构类型</option>
                    {types.map(t => (
                      <option key={t.id} value={t.id}>{t.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold mb-1">所属部门</label>
                  <select
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                  >
                    <option value="">请选择部门</option>
                    {departments.map(d => (
                      <option key={d.id} value={d.id}>{d.name}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold mb-1">机构描述</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="请输入机构描述"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm h-24"
                />
              </div>
            </div>
          </div>

          {/* 联系信息 */}
          <div>
            <h2 className="text-lg font-bold mb-4">联系信息</h2>
            <div className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="block text-sm font-bold mb-1">联系人</label>
                  <input
                    type="text"
                    value={formData.contact}
                    onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                    placeholder="请输入联系人"
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-1">联系电话</label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="请输入联系电话"
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold mb-1">机构地址</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={formData.address}
                    placeholder="请选择机构地址"
                    className="flex-1 rounded-lg border border-slate-300 px-3 py-2 text-sm"
                    readOnly
                  />
                  <Button onClick={() => setShowMapModal(true)}>+ 选择地址</Button>
                </div>
              </div>
            </div>
          </div>

          {/* 操作按钮 */}
          <div className="flex gap-3 justify-end pt-4 border-t border-slate-200">
            <Link href="/admin/system/org-types">
              <Button tone="secondary">取消</Button>
            </Link>
            <Button onClick={handleSubmit} disabled={isSubmitting}>
              {isSubmitting ? '创建中...' : '确认创建'}
            </Button>
          </div>
        </div>

        {/* 侧边栏 - 标签和认证标识 */}
        <div className="space-y-5">
          {/* 标签选择 */}
          <div className="rounded-2xl bg-white p-6 ring-1 ring-slate-200">
            <h2 className="text-lg font-bold mb-4">选择标签</h2>
            <div className="space-y-2">
              {tags.map(tag => (
                <button
                  key={tag.id}
                  onClick={() => handleTagToggle(tag.id)}
                  className={`w-full px-4 py-2 rounded-lg text-sm font-bold transition text-left ${
                    formData.tags.includes(tag.id)
                      ? 'bg-indigo-600 text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {formData.tags.includes(tag.id) ? '✓ ' : ''}{tag.name}
                </button>
              ))}
            </div>
            {formData.tags.length > 0 && (
              <div className="mt-4 pt-4 border-t border-slate-200">
                <p className="text-xs text-slate-600 mb-2">已选择：</p>
                <p className="text-sm font-bold text-slate-900">{getTagNames(formData.tags)}</p>
              </div>
            )}
          </div>

          {/* 认证标识选择 */}
          <div className="rounded-2xl bg-white p-6 ring-1 ring-slate-200">
            <h2 className="text-lg font-bold mb-4">选择认证标识</h2>
            <div className="space-y-2">
              {badges.map(badge => (
                <button
                  key={badge.id}
                  onClick={() => handleBadgeToggle(badge.id)}
                  className={`w-full px-4 py-2 rounded-lg text-sm font-bold transition text-left ${
                    formData.badges.includes(badge.id)
                      ? 'bg-green-600 text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {formData.badges.includes(badge.id) ? '✓ ' : ''}{badge.name}
                </button>
              ))}
            </div>
            {formData.badges.length > 0 && (
              <div className="mt-4 pt-4 border-t border-slate-200">
                <p className="text-xs text-slate-600 mb-2">已选择：</p>
                <p className="text-sm font-bold text-slate-900">{getBadgeNames(formData.badges)}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 地图选择弹窗 */}
      {showMapModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-2xl rounded-2xl bg-white p-6 shadow-lg">
            <h3 className="text-lg font-bold mb-4">选择地址</h3>
            <div className="space-y-4">
              <div className="bg-slate-100 rounded-lg h-96 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-slate-600 mb-4">地图选择区域</p>
                  <p className="text-sm text-slate-500">（集成地图API后显示真实地图）</p>
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold mb-1">选中地址</label>
                <input
                  type="text"
                  placeholder="点击地图选择地址"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                  readOnly
                />
              </div>
            </div>
            <div className="mt-6 flex gap-3 justify-end">
              <button
                onClick={() => setShowMapModal(false)}
                className="rounded-lg bg-slate-200 px-4 py-2 text-sm font-bold text-slate-700 hover:bg-slate-300"
              >
                取消
              </button>
              <button
                onClick={() => {
                  setFormData({ ...formData, address: '晋江市青阳街道' })
                  setShowMapModal(false)
                }}
                className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-bold text-white hover:bg-indigo-700"
              >
                确认选择
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
