'use client'
import { useState } from 'react'
import { PhoneFrame } from '@/components/PhoneFrame'
import Link from 'next/link'

const FEATURED = [
  { id:1, name:'晋江市文化和旅游局', tag:'官方合作', tc:'#183B7A', tb:'#EAF2FF', bd:'#C3D9FF', logo:'🏛️', desc:'政府文旅主管部门，联合发布官方研学活动' },
  { id:2, name:'晋江市图书馆', tag:'公共场馆', tc:'#0a5c3e', tb:'#E8F7F1', bd:'#A8E6CE', logo:'📚', desc:'公共阅读文化机构，定期开展亲子研学' },
  { id:3, name:'清新旅游研学基地', tag:'合作机构', tc:'#7a3e0a', tb:'#F8F1DE', bd:'#EDD59A', logo:'🌿', desc:'自然生态研学基地，覆盖多样户外体验' },
  { id:4, name:'晋江博物馆', tag:'公共场馆', tc:'#0a5c3e', tb:'#E8F7F1', bd:'#A8E6CE', logo:'🏺', desc:'闽南历史文明展示，互动体验丰富' },
  { id:5, name:'小黄鹿学园', tag:'合作机构', tc:'#7a3e0a', tb:'#F8F1DE', bd:'#EDD59A', logo:'🦌', desc:'专注小学生趣味课程与活动策划' },
]

const GROUPS = [
  { label:'官方合作', tc:'#183B7A', tb:'#EAF2FF', bd:'#C3D9FF',
    items:[
      { logo:'🏛️', name:'晋江市文化和旅游局', desc:'政府文旅主管部门，联合发布官方研学活动', big:true },
      { logo:'⭐', name:'晋江青少年活动中心', desc:'官方青少年综合活动与成长服务平台', big:false },
      { logo:'🎪', name:'晋江市少年宫', desc:'提供多元成长课程与实践体验活动', big:false },
    ]},
  { label:'公共场馆', tc:'#0a5c3e', tb:'#E8F7F1', bd:'#A8E6CE',
    items:[
      { logo:'📚', name:'晋江市图书馆', desc:'公共阅读文化机构，定期开展亲子研学活动', big:true },
      { logo:'🏺', name:'晋江博物馆', desc:'闽南历史文明展示，互动体验丰富精彩', big:false },
      { logo:'🔬', name:'晋江科技馆', desc:'科普教育与创新实践，适合中小学生', big:false },
    ]},
  { label:'合作机构', tc:'#7a3e0a', tb:'#F8F1DE', bd:'#EDD59A',
    items:[
      { logo:'🌿', name:'清新旅游研学基地', desc:'自然生态研学基地，覆盖多样户外体验', big:true },
      { logo:'🦌', name:'小黄鹿学园', desc:'专注小学生趣味课程与活动策划', big:false },
      { logo:'☀️', name:'阳光亲子营地', desc:'亲子户外营地，春夏活动丰富多样', big:false },
    ]},
]

export default function OrgSquarePage() {
  const [q, setQ] = useState('')
  const filtered = GROUPS.map(g=>({...g,items:g.items.filter(i=>!q||i.name.includes(q))})).filter(g=>g.items.length>0)

  return (
    <>
      <Link href="/v1.9.0" className="fixed left-4 top-4 z-50 rounded-xl bg-white/80 px-3 py-1.5 text-xs font-semibold text-slate-600 shadow-sm backdrop-blur">← 返回</Link>
      <PhoneFrame>
        <div style={{background:'#F7F5F1',display:'flex',flexDirection:'column',paddingBottom:48}}>

          {/* NAV */}
          <div style={{position:'sticky',top:0,zIndex:20,display:'flex',alignItems:'center',justifyContent:'space-between',padding:'12px 16px',background:'rgba(247,245,241,0.96)',backdropFilter:'blur(12px)',boxShadow:'0 1px 0 rgba(0,0,0,0.05)'}}>
            <button style={{width:32,height:32,borderRadius:'50%',background:'rgba(0,0,0,0.06)',border:'none',display:'flex',alignItems:'center',justifyContent:'center',cursor:'pointer'}}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M10 12L6 8l4-4" stroke="#0f172a" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
            <span style={{fontSize:15,fontWeight:700,color:'#0f172a',letterSpacing:'-0.3px'}}>合作机构</span>
            <button style={{width:32,height:32,borderRadius:'50%',background:'rgba(0,0,0,0.06)',border:'none',display:'flex',alignItems:'center',justifyContent:'center',cursor:'pointer'}}>
              <svg width="4" height="14" viewBox="0 0 4 14" fill="none"><circle cx="2" cy="2" r="1.4" fill="#64748b"/><circle cx="2" cy="7" r="1.4" fill="#64748b"/><circle cx="2" cy="12" r="1.4" fill="#64748b"/></svg>
            </button>
          </div>

          {/* HERO */}
          <div style={{position:'relative',overflow:'hidden',background:'linear-gradient(145deg,#FAFAF7 0%,#EDF3FF 45%,#F6F1EA 100%)',padding:'30px 24px 36px'}}>
            <div style={{position:'absolute',inset:0,pointerEvents:'none'}}>
              <div style={{position:'absolute',right:-60,top:-60,width:220,height:220,borderRadius:'50%',background:'radial-gradient(circle,rgba(30,78,157,0.07) 0%,transparent 65%)'}}></div>
              <div style={{position:'absolute',right:0,bottom:-40,width:160,height:160,borderRadius:'50%',background:'radial-gradient(circle,rgba(248,241,222,0.8) 0%,transparent 65%)'}}></div>
              <svg style={{position:'absolute',right:16,top:14,opacity:0.10}} width="96" height="96" viewBox="0 0 96 96" fill="none">
                <circle cx="48" cy="48" r="44" stroke="#1E4E9D" strokeWidth="1"/>
                <circle cx="48" cy="48" r="30" stroke="#1E4E9D" strokeWidth="0.7"/>
                <circle cx="48" cy="48" r="14" stroke="#1E4E9D" strokeWidth="0.5"/>
                <line x1="48" y1="4" x2="48" y2="92" stroke="#1E4E9D" strokeWidth="0.4"/>
                <line x1="4" y1="48" x2="92" y2="48" stroke="#1E4E9D" strokeWidth="0.4"/>
              </svg>
              <svg style={{position:'absolute',right:60,bottom:22,opacity:0.07}} width="50" height="50" viewBox="0 0 50 50" fill="none">
                <rect x="4" y="4" width="42" height="42" rx="12" stroke="#183B7A" strokeWidth="1.2"/>
                <rect x="13" y="13" width="24" height="24" rx="7" stroke="#183B7A" strokeWidth="0.8"/>
              </svg>
              <svg style={{position:'absolute',right:22,bottom:42,opacity:0.06}} width="26" height="26" viewBox="0 0 26 26" fill="none">
                <polygon points="13,2 24,22 2,22" stroke="#C9A84C" strokeWidth="1.2"/>
              </svg>
            </div>
            <div style={{position:'relative',zIndex:1,maxWidth:'62%'}}>
              <div style={{display:'inline-flex',alignItems:'center',gap:6,borderRadius:999,padding:'5px 10px',background:'rgba(30,78,157,0.08)',border:'1px solid rgba(30,78,157,0.13)',marginBottom:12}}>
                <span style={{width:6,height:6,borderRadius:'50%',background:'#1E4E9D',display:'inline-block'}}></span>
                <span style={{fontSize:10,fontWeight:600,color:'#1E4E9D'}}>官方参与 · 多方合作</span>
              </div>
              <h1 style={{fontSize:32,fontWeight:900,lineHeight:1.1,letterSpacing:'-0.8px',color:'#0f172a',margin:'0 0 10px'}}>合作机构</h1>
              <p style={{fontSize:13,fontWeight:600,color:'#334155',margin:'0 0 8px',lineHeight:1.5}}>政务单位、公共场馆及优质机构<br/>共同参与</p>
              <p style={{fontSize:11,lineHeight:1.8,color:'#94a3b8',margin:0}}>平台联合多类合作机构，共同发布<br/>适合亲子家庭参与的研学活动。</p>
            </div>
          </div>
          {/* 重点合作机构 横向滑动 */}
          <div style={{marginTop:24}}>
            <div style={{display:'flex',alignItems:'flex-end',justifyContent:'space-between',padding:'0 16px',marginBottom:12}}>
              <div>
                <div style={{fontSize:17,fontWeight:800,color:'#0f172a',letterSpacing:'-0.3px'}}>重点合作机构</div>
                <div style={{fontSize:11,color:'#94a3b8',marginTop:2}}>优先展示平台重点合作的机构与单位</div>
              </div>
              <button style={{fontSize:11,fontWeight:600,color:'#1E4E9D',background:'none',border:'none',cursor:'pointer'}}>查看全部 →</button>
            </div>
            <div style={{overflowX:'auto',scrollbarWidth:'none' as const}}>
              <div style={{display:'flex',gap:12,padding:'0 16px 8px',width:'max-content'}}>
                {FEATURED.map((o,i)=>(
                  <div key={o.id} style={{width:i===0?228:194,flexShrink:0,background:'#FFFDF9',borderRadius:22,boxShadow:'0 4px 20px rgba(16,24,40,0.07)',border:'1px solid rgba(0,0,0,0.04)',overflow:'hidden'}}>
                    <div style={{height:3,background:`linear-gradient(90deg,${o.bd}90,transparent)`}}></div>
                    <div style={{padding:14}}>
                      <div style={{display:'flex',alignItems:'flex-start',justifyContent:'space-between',marginBottom:10}}>
                        <div style={{width:i===0?52:44,height:i===0?52:44,borderRadius:i===0?16:14,background:o.tb,border:`1.5px solid ${o.bd}`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:i===0?24:20,flexShrink:0}}>{o.logo}</div>
                        <span style={{borderRadius:999,padding:'3px 8px',fontSize:9,fontWeight:700,color:o.tc,background:o.tb,border:`1px solid ${o.bd}`}}>{o.tag}</span>
                      </div>
                      <div style={{fontSize:13,fontWeight:800,color:'#0f172a',marginBottom:4,lineHeight:1.3}}>{o.name}</div>
                      <div style={{fontSize:11,color:'#94a3b8',lineHeight:1.6,marginBottom:10}}>{o.desc}</div>
                      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                        <span style={{fontSize:10,color:o.tc,opacity:0.65}}>查看机构活动与介绍</span>
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M5 10l4-3-4-3" stroke={o.tc} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" opacity="0.5"/></svg>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 平台合作 */}
          <div style={{margin:'24px 16px 0',borderRadius:28,overflow:'hidden',boxShadow:'0 8px 28px rgba(24,59,122,0.22)'}}>
            <div style={{position:'relative',background:'linear-gradient(135deg,#183B7A 0%,#1E4E9D 55%,#2258A8 100%)',padding:'22px 20px 24px',overflow:'hidden'}}>
              <div style={{position:'absolute',inset:0,pointerEvents:'none'}}>
                <div style={{position:'absolute',right:-30,top:-30,width:120,height:120,borderRadius:'50%',background:'rgba(255,255,255,0.04)'}}></div>
                <div style={{position:'absolute',left:-20,bottom:-20,width:90,height:90,borderRadius:'50%',background:'rgba(255,255,255,0.03)'}}></div>
                <svg style={{position:'absolute',right:16,top:16,opacity:0.08}} width="60" height="60" viewBox="0 0 60 60" fill="none">
                  <circle cx="30" cy="30" r="26" stroke="white" strokeWidth="1"/>
                  <circle cx="30" cy="30" r="15" stroke="white" strokeWidth="0.7"/>
                  <line x1="30" y1="4" x2="30" y2="56" stroke="white" strokeWidth="0.5"/>
                  <line x1="4" y1="30" x2="56" y2="30" stroke="white" strokeWidth="0.5"/>
                </svg>
              </div>
              <div style={{position:'relative',zIndex:1}}>
                <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:12}}>
                  <div style={{width:40,height:40,borderRadius:13,background:'rgba(255,255,255,0.12)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:20}}>🤝</div>
                  <span style={{fontSize:15,fontWeight:800,color:'#fff',letterSpacing:'-0.2px'}}>平台合作</span>
                </div>
                <p style={{fontSize:12,lineHeight:1.75,color:'rgba(255,255,255,0.75)',margin:'0 0 4px'}}>欢迎政府单位、公共场馆、学校及优质机构合作入驻平台，发布研学活动。</p>
                <p style={{fontSize:11,lineHeight:1.6,color:'rgba(255,255,255,0.42)',margin:'0 0 14px'}}>面向亲子家庭与小学生用户，助力机构活动展示与报名触达。</p>
                <div style={{display:'flex',gap:8,marginBottom:16}}>
                  {['官方机构','学校合作','优质机构'].map(t=>(
                    <span key={t} style={{borderRadius:999,padding:'4px 10px',fontSize:10,fontWeight:600,background:'rgba(255,255,255,0.10)',color:'rgba(255,255,255,0.70)'}}>{t}</span>
                  ))}
                </div>
                <button style={{width:'100%',padding:'12px 0',borderRadius:20,fontSize:13,fontWeight:800,color:'#183B7A',background:'#F5F0E8',border:'none',cursor:'pointer',boxShadow:'0 2px 8px rgba(0,0,0,0.10)'}}>进入合作入口</button>
              </div>
            </div>
          </div>
          {/* 合作机构一览 */}
          <div style={{marginTop:24,padding:'0 16px'}}>
            <div style={{marginBottom:12}}>
              <div style={{fontSize:17,fontWeight:800,color:'#0f172a',letterSpacing:'-0.3px'}}>合作机构一览</div>
              <div style={{fontSize:11,color:'#94a3b8',marginTop:2}}>按机构属性浏览平台合作单位与机构</div>
            </div>
            <div style={{position:'relative',marginBottom:20}}>
              <div style={{position:'absolute',left:14,top:'50%',transform:'translateY(-50%)',pointerEvents:'none'}}><svg width="15" height="15" viewBox="0 0 15 15" fill="none"><circle cx="6.5" cy="6.5" r="5" stroke="#cbd5e1" strokeWidth="1.4"/><path d="M10.5 10.5L13 13" stroke="#cbd5e1" strokeWidth="1.4" strokeLinecap="round"/></svg></div>
              <input type="text" value={q} onChange={e=>setQ(e.target.value)} placeholder="搜索机构名称" style={{width:'100%',padding:'12px 16px 12px 40px',borderRadius:20,border:'1px solid #E8E5E0',background:'#FFFDF9',fontSize:12,color:'#334155',outline:'none',boxSizing:'border-box' as const,boxShadow:'inset 0 1px 3px rgba(0,0,0,0.04)'}}/>
            </div>
            {filtered.map(g=>(
              <div key={g.label} style={{marginBottom:28}}>
                <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:10}}>
                  <span style={{borderRadius:999,padding:'4px 10px',fontSize:11,fontWeight:700,color:g.tc,background:g.tb,border:`1px solid ${g.bd}`}}>{g.label}</span>
                  <button style={{fontSize:11,fontWeight:600,color:g.tc,background:'none',border:'none',cursor:'pointer'}}>查看更多 →</button>
                </div>
                <div style={{display:'flex',flexDirection:'column',gap:8}}>
                  {g.items.map((item,idx)=>(
                    <div key={item.name} style={{background:'#FFFDF9',borderRadius:idx===0?22:18,border:'1px solid rgba(0,0,0,0.04)',overflow:'hidden',boxShadow:'0 4px 16px rgba(16,24,40,0.05)'}}>
                      <div style={{height:3,background:`linear-gradient(90deg,${g.bd}80,transparent)`}}></div>
                      <div style={{display:'flex',alignItems:idx===0?'flex-start':'center',gap:12,padding:idx===0?'14px':'12px 14px'}}>
                        <div style={{flexShrink:0,width:idx===0?54:46,height:idx===0?54:46,borderRadius:idx===0?17:14,background:'#F7F5F1',border:`1.5px solid ${g.bd}`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:idx===0?24:20,boxShadow:'0 1px 4px rgba(0,0,0,0.06)'}}>{item.logo}</div>
                        <div style={{flex:1,minWidth:0}}>
                          <span style={{display:'inline-block',borderRadius:999,padding:'2px 8px',fontSize:9,fontWeight:700,color:g.tc,background:g.tb,border:`1px solid ${g.bd}`}}>{g.label}</span>
                          <div style={{fontSize:idx===0?14:13,fontWeight:700,color:'#0f172a',marginTop:3,lineHeight:1.3}}>{item.name}</div>
                          <div style={{fontSize:11,color:'#94a3b8',marginTop:3,lineHeight:1.55,overflow:'hidden',whiteSpace:'nowrap' as const,textOverflow:'ellipsis'}}>{item.desc}</div>
                          {idx===0&&<div style={{fontSize:10,color:g.tc,marginTop:5,opacity:0.6}}>查看机构活动与介绍</div>}
                        </div>
                        <svg style={{flexShrink:0}} width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M6 12l4-4-4-4" stroke={g.tc} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.4"/></svg>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            {q&&filtered.length===0&&<div style={{padding:'32px 0',textAlign:'center',fontSize:12,color:'#cbd5e1'}}>未找到相关机构</div>}
          </div>

          <div style={{padding:'8px 24px 4px',textAlign:'center',fontSize:10,lineHeight:1.7,color:'#c4bfb6'}}>
            合作机构可在平台发布研学活动，活动内容以实际发布为准。
          </div>
        </div>
      </PhoneFrame>
    </>
  )
}
