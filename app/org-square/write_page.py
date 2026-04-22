import os

page = """
'use client'

import { useState } from 'react'
import { PhoneFrame } from '@/components/PhoneFrame'
import Link from 'next/link'

const FEATURED = [
  { id:1, name:'晋江市文化和旅游局', tag:'官方合作', tc:'#183B7A', tb:'#EAF2FF', border:'#C3D9FF', logo:'🏛️', desc:'政府文旅主管部门，联合发布官方研学活动' },
  { id:2, name:'晋江市图书馆', tag:'公共场馆', tc:'#0a5c3e', tb:'#E8F7F1', border:'#A8E6CE', logo:'📚', desc:'公共阅读文化机构，定期开展亲子研学' },
  { id:3, name:'清新旅游研学基地', tag:'合作机构', tc:'#7a3e0a', tb:'#F8F1DE', border:'#EDD59A', logo:'🌿', desc:'自然生态研学基地，覆盖多样户外体验' },
]

const ALL = [
  { id:1, name:'晋江市文化和旅游局', tag:'官方合作', tc:'#183B7A', tb:'#EAF2FF', border:'#C3D9FF', logo:'🏛️', desc:'政府文旅主管部门，联合发布官方研学活动' },
  { id:2, name:'晋江青少年活动中心', tag:'官方合作', tc:'#183B7A', tb:'#EAF2FF', border:'#C3D9FF', logo:'⭐', desc:'官方青少年综合活动与成长服务平台' },
  { id:3, name:'晋江市图书馆', tag:'公共场馆', tc:'#0a5c3e', tb:'#E8F7F1', border:'#A8E6CE', logo:'📚', desc:'公共阅读文化机构，定期开展亲子研学活动' },
  { id:4, name:'晋江博物馆', tag:'公共场馆', tc:'#0a5c3e', tb:'#E8F7F1', border:'#A8E6CE', logo:'🏺', desc:'闽南历史文明展示，互动体验丰富精彩' },
  { id:5, name:'晋江科技馆', tag:'公共场馆', tc:'#0a5c3e', tb:'#E8F7F1', border:'#A8E6CE', logo:'🔬', desc:'科普教育与创新实践，适合中小学生参观' },
  { id:6, name:'清新旅游研学基地', tag:'合作机构', tc:'#7a3e0a', tb:'#F8F1DE', border:'#EDD59A', logo:'🌿', desc:'自然生态研学基地，覆盖多样户外体验' },
  { id:7, name:'小黄鹿学园', tag:'合作机构', tc:'#7a3e0a', tb:'#F8F1DE', border:'#EDD59A', logo:'🦌', desc:'专注小学生趣味课程与活动策划' },
  { id:8, name:'阳光亲子营地', tag:'合作机构', tc:'#7a3e0a', tb:'#F8F1DE', border:'#EDD59A', logo:'☀️', desc:'亲子户外营地，春夏活动丰富多样' },
  { id:9, name:'蓝海研学中心', tag:'合作机构', tc:'#7a3e0a', tb:'#F8F1DE', border:'#EDD59A', logo:'🌊', desc:'海洋科普与海岸研学，优质合作方' },
  { id:10, name:'智慧树少儿成长馆', tag:'合作机构', tc:'#7a3e0a', tb:'#F8F1DE', border:'#EDD59A', logo:'🌳', desc:'本地素质教育机构，课程体系完善' },
]

export default function OrgSquarePage() {
  const [q, setQ] = useState('')
  const filtered = ALL.filter(o => !q || o.name.includes(q))
  const main = FEATURED[0]
  const subs = FEATURED.slice(1)

  return (
    <>
      <Link href="/v1.9.0" className="fixed left-4 top-4 z-50 rounded-xl bg-white/80 px-3 py-1.5 text-xs font-semibold text-slate-600 shadow-sm backdrop-blur">← 返回</Link>
      <PhoneFrame>
        <div className="flex flex-col bg-[#F7F6F3] pb-16">

          <div className="sticky top-0 z-20 flex items-center justify-between bg-[#FAFAF8]/96 px-4 py-3 backdrop-blur-md" style={{boxShadow:'0 1px 0 rgba(0,0,0,0.05)'}}>
            <button className="flex h-8 w-8 items-center justify-center rounded-full" style={{background:'rgba(0,0,0,0.05)'}}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M10 12L6 8l4-4" stroke="#1e293b" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
            <span className="text-[15px] font-bold tracking-tight text-slate-900">合作机构</span>
            <button className="flex h-8 w-8 items-center justify-center rounded-full" style={{background:'rgba(0,0,0,0.05)'}}>
              <svg width="4" height="14" viewBox="0 0 4 14" fill="none"><circle cx="2" cy="2" r="1.4" fill="#64748b"/><circle cx="2" cy="7" r="1.4" fill="#64748b"/><circle cx="2" cy="12" r="1.4" fill="#64748b"/></svg>
            </button>
          </div>

          <div className="relative mx-3 mt-2.5 overflow-hidden rounded-[28px] bg-white px-5 pb-6 pt-5" style={{boxShadow:'0 2px 20px rgba(24,59,122,0.08)'}}>
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute right-0 top-0 h-40 w-40 rounded-full" style={{background:'radial-gradient(circle, rgba(234,242,255,0.9) 0%, transparent 70%)',transform:'translate(20%,-20%)'}}></div>
              <div className="absolute bottom-0 right-8 h-28 w-28 rounded-full" style={{background:'radial-gradient(circle, rgba(248,241,222,0.6) 0%, transparent 70%)'}}></div>
              <div className="absolute right-4 top-8 text-[38px] opacity-[0.07]">🏛️</div>
              <div className="absolute right-10 top-16 text-[26px] opacity-[0.05]">📚</div>
              <div className="absolute right-3 bottom-4 text-[20px] opacity-[0.05]">🌿</div>
            </div>
            <div className="relative z-10" style={{paddingRight:'76px'}}>
              <div className="mb-3 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1" style={{background:'#EAF2FF',border:'1px solid #C3D9FF'}}>
                <span className="h-1.5 w-1.5 rounded-full" style={{background:'#183B7A'}}></span>
                <span className="text-[10px] font-semibold" style={{color:'#183B7A'}}>官方参与 · 多方合作</span>
              </div>
              <h1 className="text-[24px] font-black leading-tight tracking-tight text-slate-900">合作机构</h1>
              <p className="mt-1.5 text-[12px] font-semibold text-slate-600">政务单位、公共场馆及优质机构共同参与</p>
              <p className="mt-2 text-[11px] leading-relaxed" style={{color:'#94a3b8'}}>平台联合多类合作机构，共同发布适合亲子家庭与小学生参与的研学活动。</p>
            </div>
          </div>

          <div className="mt-6 px-3">
            <div className="mb-3 flex items-end justify-between">
              <div>
                <div className="text-[15px] font-black tracking-tight text-slate-900">重点合作机构</div>
                <div className="mt-0.5 text-[11px]" style={{color:'#94a3b8'}}>优先展示平台重点合作的机构与单位</div>
              </div>
              <button className="text-[11px] font-semibold" style={{color:'#183B7A'}}>查看全部 →</button>
            </div>

            <div className="mb-3 overflow-hidden rounded-[24px]" style={{boxShadow:'0 4px 24px rgba(24,59,122,0.10)',background:'linear-gradient(135deg,#EAF2FF 0%,#F0F7FF 60%,#FAFAF8 100%)'}}>
              <div className="p-4">
                <div className="flex items-start gap-3">
                  <div className="relative flex-shrink-0">
                    <div className="flex h-14 w-14 items-center justify-center rounded-[18px] bg-white text-3xl" style={{boxShadow:'0 2px 8px rgba(24,59,122,0.12)'}}>{main.logo}</div>
                    <div className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-white" style={{boxShadow:'0 1px 4px rgba(0,0,0,0.12)'}}>
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5l2 2 4-4" stroke="#183B7A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="inline-block rounded-full px-2 py-0.5 text-[10px] font-bold" style={{color:main.tc,background:'rgba(255,255,255,0.8)',border:'1px solid '+main.border}}>{main.tag}</span>
                    <div className="mt-1.5 text-[16px] font-black leading-tight text-slate-900">{main.name}</div>
                    <div className="mt-1 text-[11px] leading-relaxed" style={{color:'#94a3b8'}}>{main.desc}</div>
                  </div>
                </div>
                <button className="mt-4 w-full rounded-[16px] py-2.5 text-[12px] font-bold text-white" style={{background:'linear-gradient(135deg,#183B7A 0%,#2258A8 100%)',boxShadow:'0 2px 12px rgba(24,59,122,0.25)'}}>查看活动</button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {subs.map(o => (
                <div key={o.id} className="overflow-hidden rounded-[22px]" style={{boxShadow:'0 2px 12px rgba(0,0,0,0.06)',background:o.id===2?'linear-gradient(135deg,#E8F7F1 0%,#F2FAF7 100%)':'linear-gradient(135deg,#F8F1DE 0%,#FAF6EC 100%)'}}>
                  <div className="p-3.5">
                    <div className="flex h-11 w-11 items-center justify-center rounded-[14px] bg-white text-2xl" style={{boxShadow:'0 1px 6px rgba(0,0,0,0.08)'}}>{o.logo}</div>
                    <span className="mt-2 inline-block rounded-full px-2 py-0.5 text-[9px] font-bold" style={{color:o.tc,background:'rgba(255,255,255,0.8)',border:'1px solid '+o.border}}>{o.tag}</span>
                    <div className="mt-1.5 text-[12px] font-black leading-tight text-slate-900 line-clamp-2">{o.name}</div>
                    <div className="mt-1 text-[10px] leading-relaxed line-clamp-2" style={{color:'#94a3b8'}}>{o.desc}</div>
                    <button className="mt-3 w-full rounded-[14px] py-2 text-[11px] font-bold" style={{background:'rgba(255,255,255,0.7)',color:o.tc,border:'1px solid '+o.border}}>查看活动</button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mx-3 mt-6 overflow-hidden rounded-[28px]" style={{background:'linear-gradient(135deg,#183B7A 0%,#1E4E9D 50%,#2258A8 100%)',boxShadow:'0 6px 28px rgba(24,59,122,0.22)'}}>
            <div className="p-5">
              <div className="flex items-start gap-3">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-[16px] text-2xl" style={{background:'rgba(255,255,255,0.12)'}}>🤝</div>
                <div className="flex-1">
                  <div className="text-[14px] font-black text-white">平台合作</div>
                  <p className="mt-1 text-[11px] leading-relaxed" style={{color:'rgba(255,255,255,0.75)'}}>欢迎政府单位、公共场馆、学校及优质机构合作入驻平台，发布研学活动。</p>
                  <p className="mt-1 text-[10px]" style={{color:'rgba(255,255,255,0.5)'}}>面向亲子家庭与小学生用户，助力机构活动展示与报名触达。</p>
                </div>
              </div>
              <div className="mt-3 flex gap-2">
                <span className="rounded-full px-2.5 py-1 text-[10px] font-semibold" style={{background:'rgba(255,255,255,0.12)',color:'rgba(255,255,255,0.8)'}}>官方机构</span>
                <span className="rounded-full px-2.5 py-1 text-[10px] font-semibold" style={{background:'rgba(255,255,255,0.12)',color:'rgba(255,255,255,0.8)'}}>学校合作</span>
                <span className="rounded-full px-2.5 py-1 text-[10px] font-semibold" style={{background:'rgba(255,255,255,0.12)',color:'rgba(255,255,255,0.8)'}}>优质机构</span>
              </div>
              <button className="mt-4 w-full rounded-[18px] bg-white py-3 text-[12px] font-black" style={{color:'#183B7A',boxShadow:'0 2px 10px rgba(255,255,255,0.15)'}}>进入合作入口</button>
            </div>
          </div>

          <div className="mt-6 px-3">
            <div className="mb-3">
              <div className="text-[15px] font-black tracking-tight text-slate-900">全部合作机构</div>
              <div className="mt-0.5 text-[11px]" style={{color:'#94a3b8'}}>浏览平台全部合作机构</div>
            </div>
            <div className="relative mb-4">
              <div className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2">
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none"><circle cx="6.5" cy="6.5" r="5" 