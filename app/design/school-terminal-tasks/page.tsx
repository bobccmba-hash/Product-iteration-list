'use client'

import Link from 'next/link'
import { useState } from 'react'
import './prototype.css'
import Screen1CurrentTask from './Screen1CurrentTask'
import Screen2TaskDetail from './Screen2TaskDetail'
import Screen3BeforeHint from './Screen3BeforeHint'
import Screen4ProgressFeedback from './Screen4ProgressFeedback'
import Screen5CompleteCelebration from './Screen5CompleteCelebration'
import Screen6NewTask from './Screen6NewTask'
import Screen7TaskSummary from './Screen7TaskSummary'
import Screen8Integrated from './Screen8Integrated'

const SCREENS = [
  { id: 1, title: '当前任务目标主屏', Component: Screen1CurrentTask, desc: '学生进入终端后看到「我的小目标」与当前主任务卡片，一眼知道要完成什么。强调单任务、进度条与「去完成」引导。' },
  { id: 2, title: '任务详情说明屏', Component: Screen2TaskDetail, desc: '展示完成条件、奖励与当前进度，卡片化与图形化表达，低龄友好。' },
  { id: 3, title: '互动前任务提示', Component: Screen3BeforeHint, desc: '轻量浮层/卡片，提示「完成这次互动可推进任务」，不长时间打断主流程。' },
  { id: 4, title: '任务推进反馈屏', Component: Screen4ProgressFeedback, desc: '互动结束后展示本次推进（+1）、当前总进度与鼓励语，强化「每次互动都在积累」。' },
  { id: 5, title: '任务完成高光反馈屏', Component: Screen5CompleteCelebration, desc: '任务完成时的庆祝页：徽章、完成文案与奖励，突出成就感和激励。' },
  { id: 6, title: '新任务开启屏', Component: Screen6NewTask, desc: '自然承接下一目标，展示新任务与奖励预告，避免结束感，引导继续挑战。' },
  { id: 7, title: '我的任务记录摘要屏', Component: Screen7TaskSummary, desc: '学生档案中的任务概况：当前主任务、最近完成与累计完成数，轻量可视化。' },
  { id: 8, title: '综合任务目标整合屏', Component: Screen8Integrated, desc: '单页整合当前任务、进度、历史与下一步，用于评审整合 vs 分步方案。' },
] as const

function DeviceFrame({ children, scale = 1 }: { children: React.ReactNode; scale?: number }) {
  return (
    <div
      className="device-frame"
      style={{
        transform: `scale(${scale})`,
        transformOrigin: 'top center',
      }}
    >
      <div className="screen" style={{ paddingTop: 'var(--safe-top)', paddingLeft: 'var(--padding-x)', paddingRight: 'var(--padding-x)', paddingBottom: 'var(--safe-bottom)' }}>
        <div className="screen-inner" style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0 }}>
          {children}
        </div>
      </div>
    </div>
  )
}

export default function SchoolTerminalTasksPage() {
  const [flowStep, setFlowStep] = useState<number | null>(null)
  const [viewMode, setViewMode] = useState<'grid' | 'flow'>('grid')

  const flowOrder = [1, 3, 4, 5, 6]
  const currentFlowScreen = flowStep !== null ? SCREENS.find((s) => s.id === flowOrder[flowStep]) : null

  return (
    <main style={{ minHeight: '100vh', background: '#f0f0f0', padding: 24 }}>
      <div style={{ maxWidth: 1400, margin: '0 auto' }}>
        <header style={{ marginBottom: 32, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
          <div>
            <h1 style={{ fontSize: 28, fontWeight: 700, color: '#1a1a1a', margin: '0 0 8px 0' }}>
              学校终端互动任务目标功能 · 原型
            </h1>
            <p style={{ fontSize: 15, color: '#6b7280', margin: 0 }}>
              画板 390×844 pt · iOS 安全区 · 1–3 年级小学生场景
            </p>
          </div>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <button
              type="button"
              onClick={() => {
                setViewMode('grid')
                setFlowStep(null)
              }}
              style={{
                padding: '10px 16px',
                borderRadius: 8,
                border: viewMode === 'grid' ? '2px solid #4CAF50' : '1px solid #ddd',
                background: viewMode === 'grid' ? 'rgba(76,175,80,0.1)' : '#fff',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              全部预览
            </button>
            <button
              type="button"
              onClick={() => {
                setViewMode('flow')
                setFlowStep(0)
              }}
              style={{
                padding: '10px 16px',
                borderRadius: 8,
                border: viewMode === 'flow' ? '2px solid #4A90E2' : '1px solid #ddd',
                background: viewMode === 'flow' ? 'rgba(74,144,226,0.1)' : '#fff',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              流程演示
            </button>
            <Link
              href="/"
              style={{
                padding: '10px 16px',
                borderRadius: 999,
                border: '1px solid #e5e7eb',
                background: '#fff',
                fontSize: 13,
                fontWeight: 600,
                color: '#4b5563',
                textDecoration: 'none',
                cursor: 'pointer',
              }}
            >
              返回首页
            </Link>
          </div>
        </header>

        {viewMode === 'flow' && currentFlowScreen && (
          <section style={{ marginBottom: 48, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <p style={{ fontSize: 14, color: '#6b7280', marginBottom: 16 }}>
              流程：进入终端 → 互动前提示 → 互动后推进 → 任务完成 → 新任务开启
            </p>
            <div style={{ transform: 'scale(0.85)', transformOrigin: 'top center' }}>
              <DeviceFrame scale={1}>
                <currentFlowScreen.Component />
              </DeviceFrame>
            </div>
            <div style={{ display: 'flex', gap: 12, marginTop: 24, alignItems: 'center' }}>
              <button
                type="button"
                onClick={() => setFlowStep((s) => (s !== null && s > 0 ? s - 1 : null))}
                disabled={flowStep === 0}
                style={{ padding: '10px 20px', borderRadius: 8, border: '1px solid #ddd', background: '#fff', cursor: 'pointer' }}
              >
                上一步
              </button>
              <span style={{ fontSize: 15, color: '#6b7280' }}>
                {flowStep !== null ? flowStep + 1 : 0} / {flowOrder.length}
              </span>
              <button
                type="button"
                onClick={() => setFlowStep((s) => (s !== null && s < flowOrder.length - 1 ? s + 1 : null))}
                disabled={flowStep === flowOrder.length - 1}
                style={{ padding: '10px 20px', borderRadius: 8, border: '1px solid #ddd', background: '#fff', cursor: 'pointer' }}
              >
                下一步
              </button>
            </div>
            <p style={{ fontSize: 13, color: '#9ca3af', marginTop: 12, maxWidth: 360, textAlign: 'center' }}>
              {currentFlowScreen.desc}
            </p>
          </section>
        )}

        <section
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 32,
            alignItems: 'start',
          }}
        >
          {SCREENS.map(({ id, title, Component, desc }) => (
            <div key={id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ transform: 'scale(0.52)', transformOrigin: 'top center', marginBottom: -120 }}>
                <DeviceFrame>
                  <Component />
                </DeviceFrame>
              </div>
              <div style={{ width: '100%', maxWidth: 220, marginTop: 8 }}>
                <h2 style={{ fontSize: 15, fontWeight: 600, color: '#1a1a1a', margin: '0 0 6px 0' }}>
                  {id}. {title}
                </h2>
                <p style={{ fontSize: 12, color: '#6b7280', margin: 0, lineHeight: 1.5 }}>
                  {desc}
                </p>
              </div>
            </div>
          ))}
        </section>

        <footer style={{ marginTop: 48, paddingTop: 24, borderTop: '1px solid #e5e7eb', fontSize: 13, color: '#9ca3af' }}>
          <p style={{ margin: 0 }}>
            设计规范与分屏说明见 <code style={{ background: '#eee', padding: '2px 6px', borderRadius: 4 }}>docs/school-terminal-task-goal-figma-spec.md</code>
            ，可直接用于 Figma 还原与产品/UI/研发对齐。
          </p>
        </footer>
      </div>
    </main>
  )
}
