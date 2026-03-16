'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Suspense, useEffect, useState, useRef } from 'react'
import { PhoneFrame } from '@/components/PhoneFrame'

const ALL_GAMES = [
  { id: 1, name: 'AR 姿态挑战', icon: '🤸', color: '#a855f7' },
  { id: 2, name: '知识问答', icon: '🧠', color: '#3b82f6' },
  { id: 3, name: '记忆翻牌', icon: '🎴', color: '#10b981' },
  { id: 4, name: '数学闯关', icon: '🔢', color: '#f97316' },
  { id: 5, name: '节奏音乐', icon: '🎵', color: '#ec4899' },
  { id: 6, name: '拼图解谜', icon: '🧩', color: '#6366f1' },
  { id: 7, name: '反应训练', icon: '⚡', color: '#eab308' },
  { id: 8, name: '语言挑战', icon: '📚', color: '#14b8a6' },
  { id: 9, name: '空间记忆', icon: '🌀', color: '#f43f5e' },
  { id: 10, name: '颜色感知', icon: '🎨', color: '#8b5cf6' },
  { id: 11, name: '逻辑推理', icon: '🔍', color: '#06b6d4' },
  { id: 12, name: '速算挑战', icon: '🚀', color: '#84cc16' },
]

const BG_COUNT = 16

export default function GameSelectPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">加载中…</div>}>
      <Inner />
    </Suspense>
  )
}

type Phase = 'bg-flow' | 'gathering' | 'spinning' | 'slowing' | 'locked'

function Inner() {
  const searchParams = useSearchParams()
  const hasGrowth = searchParams.get('growth') !== 'false'

  const [phase, setPhase] = useState<Phase>('bg-flow')
  const [isSlowing, setIsSlowing] = useState(false)
  const [cards] = useState(() => {
    const shuffled = [...ALL_GAMES].sort(() => Math.random() - 0.5)
    return shuffled.slice(0, 6)
  })
  const [visibleCards, setVisibleCards] = useState<number[]>([])
  const [highlightIdx, setHighlightIdx] = useState<number | null>(null)
  const [finalIdx, setFinalIdx] = useState<number | null>(null)
  const [progress, setProgress] = useState(0)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const [bgParticles] = useState(() =>
    Array.from({ length: BG_COUNT }, (_, i) => ({
      id: i,
      game: ALL_GAMES[i % ALL_GAMES.length],
      x: Math.random() * 85 + 5,
      y: Math.random() * 85 + 5,
      dur: Math.random() * 6 + 5,
      delay: Math.random() * 4,
      opacity: Math.random() * 0.22 + 0.06,
    }))
  )

  useEffect(() => {
    timerRef.current = setTimeout(() => {
      setPhase('gathering')
      cards.forEach((_, i) => {
        setTimeout(() => setVisibleCards((prev) => [...prev, i]), i * 180)
      })
    }, 1400)
    return () => { if (timerRef.current) clearTimeout(timerRef.current) }
  }, [])

  useEffect(() => {
    if (visibleCards.length === 6) {
      timerRef.current = setTimeout(() => setPhase('spinning'), 700)
    }
  }, [visibleCards])

  useEffect(() => {
    if (phase !== 'spinning') return
    const winner = Math.floor(Math.random() * 6)
    let count = 0
    const totalFast = 22
    const totalSlow = 10
    let speed = 70
    const tick = () => {
      if (count < totalFast) {
        setHighlightIdx((p) => ((p ?? 0) + 1) % 6)
        count++
        timerRef.current = setTimeout(tick, speed)
      } else if (count < totalFast + totalSlow) {
        if (!isSlowing) setIsSlowing(true)
        speed = 70 + ((count - totalFast) / totalSlow) * 380
        setHighlightIdx((p) => ((p ?? 0) + 1) % 6)
        count++
        timerRef.current = setTimeout(tick, speed)
      } else {
        setHighlightIdx(winner)
        setFinalIdx(winner)
        setPhase('locked')
      }
    }
    timerRef.current = setTimeout(tick, speed)
    return () => { if (timerRef.current) clearTimeout(timerRef.current) }
  }, [phase])

  useEffect(() => {
    if (phase !== 'locked') return
    const start = Date.now()
    const dur = 2800
    const frame = () => {
      const p = Math.min((Date.now() - start) / dur, 1)
      setProgress(p)
      if (p < 1) requestAnimationFrame(frame)
      else {
        if (hasGrowth) window.location.href = '/terminal/growth-feedback'
        else window.location.href = '/terminal/simple-result'
      }
    }
    requestAnimationFrame(frame)
  }, [phase, hasGrowth])

  const isBgVisible = phase === 'bg-flow' || phase === 'gathering'
  const isSpinning = phase === 'spinning' || phase === 'slowing'

  return (
    <>
      <Link href="/" className="fixed left-4 top-4 z-50 rounded-xl bg-white/20 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur hover:bg-white/30">
        返回首页
      </Link>

      <PhoneFrame>
        <div className="relative flex min-h-full flex-col items-center justify-between bg-[#06080f] px-5 py-8 text-white overflow-hidden">

          {/* 背景粒子流 */}
          <div className="pointer-events-none absolute inset-0 transition-opacity duration-1000" style={{ opacity: isBgVisible ? 1 : 0 }}>
            {bgParticles.map((p) => (
              <div
                key={p.id}
                className="absolute flex items-center rounded-xl border border-white/10 bg-white/5 px-2 py-1"
                style={{
                  left: p.x + '%',
                  top: p.y + '%',
                  opacity: p.opacity,
                  animation: `bgDrift ${p.dur}s ease-in-out ${p.delay}s infinite`,
                  fontSize: '1.3rem',
                }}
              >
                {p.game.icon}
              </div>
            ))}
            {/* 扫光 */}
            <div className="absolute left-0 right-0" style={{ animation: 'scanDown 4s linear infinite', opacity: 0.04 }}>
              <div className="h-px w-full bg-gradient-to-r from-transparent via-cyan-300 to-transparent" />
            </div>
          </div>

          {/* 顶部标题 */}
          <div className="relative z-10 text-center">
            <div className="mb-1 text-[10px] font-bold tracking-[0.3em] text-cyan-400 uppercase">
              {phase === 'bg-flow' && '— 游戏库 —'}
              {phase === 'gathering' && '正在抽取候选'}
              {(phase === 'spinning' || phase === 'slowing') && '随机匹配中'}
              {phase === 'locked' && '✦ 锁定'}
            </div>
            <h1 className="text-xl font-black tracking-tight">
              {phase === 'bg-flow' && '海量游戏，等你探索'}
              {phase === 'gathering' && '为你抽取 6 款候选'}
              {(phase === 'spinning' || phase === 'slowing') && '系统正在随机选择…'}
              {phase === 'locked' && '今日游戏已锁定！'}
            </h1>
            <p className="mt-0.5 text-[11px] text-slate-500">从 {ALL_GAMES.length}+ 款游戏中智能推荐</p>
          </div>

          {/* 候选卡牌 */}
          <div className="relative z-10 grid w-full grid-cols-2 gap-3 my-3">
            {cards.map((game, idx) => {
              const isVisible = visibleCards.includes(idx)
              const isHighlight = highlightIdx === idx
              const isFinal = finalIdx === idx
              const isDimmed = phase === 'locked' && !isFinal
              return (
                <div
                  key={game.id}
                  className="relative overflow-hidden rounded-2xl"
                  style={{
                    opacity: !isVisible ? 0 : isDimmed ? 0.22 : 1,
                    transform: !isVisible ? 'scale(0.4) translateY(24px)' : isFinal ? 'scale(1.09)' : isHighlight ? 'scale(1.04)' : isDimmed ? 'scale(0.91)' : 'scale(1)',
                    transition: !isVisible ? 'none' : 'transform 0.18s cubic-bezier(0.34,1.56,0.64,1), opacity 0.45s ease, box-shadow 0.18s ease',
                    boxShadow: isFinal
                      ? `0 0 0 2px ${game.color}, 0 0 40px 10px ${game.color}55`
                      : isHighlight
                        ? `0 0 0 1px ${game.color}88, 0 0 18px 4px ${game.color}33`
                        : 'none',
                  }}
                >
                  <div
                    className="flex flex-col items-center gap-2 rounded-2xl p-4"
                    style={{
                      background: isFinal
                        ? `radial-gradient(circle at 50% 35%, ${game.color}33 0%, #0d1224 65%)`
                        : isHighlight
                          ? `radial-gradient(circle at 50% 35%, ${game.color}18 0%, #0d1224 70%)`
                          : '#0d1224',
                      border: `1px solid ${isFinal ? game.color + '88' : isHighlight ? game.color + '44' : '#ffffff0f'}`,
                    }}
                  >
                    <div
                      style={{
                        fontSize: '2rem',
                        filter: isFinal ? `drop-shadow(0 0 10px ${game.color})` : isHighlight ? `drop-shadow(0 0 5px ${game.color})` : 'none',
                        animation: isFinal ? 'floatIcon 2.2s ease-in-out infinite' : 'none',
                      }}
                    >
                      {game.icon}
                    </div>
                    <div className="text-center text-[13px] font-black leading-tight" style={{ color: isFinal ? '#fff' : isHighlight ? '#e2e8f0' : '#475569' }}>
                      {game.name}
                    </div>
                    {isFinal && (
                      <div className="rounded-full px-3 py-0.5 text-[10px] font-black text-white" style={{ background: game.color }}>
                        已选定
                      </div>
                    )}
                  </div>
                  {isVisible && phase === 'gathering' && (
                    <div className="pointer-events-none absolute inset-0 rounded-2xl" style={{ background: `linear-gradient(135deg, ${game.color}28, transparent 55%)`, animation: 'fadeOut 0.9s ease forwards' }} />
                  )}
                </div>
              )
            })}
          </div>

          {/* 底部状态 */}
          <div className="relative z-10 w-full space-y-2">
            {phase === 'bg-flow' && (
              <div className="flex items-center justify-center gap-2 text-xs text-slate-500">
                <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-400" />
                <span>游戏库加载中…</span>
              </div>
            )}
            {phase === 'gathering' && (
              <div className="flex items-center justify-center gap-2 text-xs text-slate-400">
                <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-violet-400" />
                <span>候选游戏抽取中…</span>
              </div>
            )}
            {(phase === 'spinning' || phase === 'slowing') && (
              <div className="flex items-center justify-center gap-2 text-xs text-slate-400">
                <div className="flex gap-1">
                  {[0,1,2].map(i => (
                    <div key={i} className="h-1 w-1 rounded-full bg-cyan-400" style={{ animation: `dot 0.65s ease-in-out ${i * 0.18}s infinite` }} />
                  ))}
                </div>
                <span>{isSlowing ? '即将锁定…' : '随机匹配中…'}</span>
              </div>
            )}
            {phase === 'locked' && finalIdx !== null && (
              <div className="space-y-2">
                <div className="text-center text-sm font-black" style={{ color: cards[finalIdx].color }}>
                  {cards[finalIdx].icon} {cards[finalIdx].name}
                </div>
                <div className="text-center text-xs text-slate-500">即将开始互动</div>
                <div className="relative h-1.5 w-full overflow-hidden rounded-full bg-slate-800">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${progress * 100}%`,
                      background: `linear-gradient(90deg, ${cards[finalIdx].color}66, ${cards[finalIdx].color})`,
                      boxShadow: `0 0 8px ${cards[finalIdx].color}`,
                      transition: 'none',
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </PhoneFrame>

      <style jsx>{`
        @keyframes bgDrift {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          33% { transform: translateY(-8px) translateX(4px); }
          66% { transform: translateY(5px) translateX(-3px); }
        }
        @keyframes scanDown {
          0% { top: -2px; }
          100% { top: 100%; }
        }
        @keyframes floatIcon {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-5px); }
        }
        @keyframes fadeOut {
          0% { opacity: 1; }
          100% { opacity: 0; }
        }
        @keyframes dot {
          0%, 100% { transform: translateY(0); opacity: 0.4; }
          50% { transform: translateY(-3px); opacity: 1; }
        }
      `}</style>
    </>
  )
}
