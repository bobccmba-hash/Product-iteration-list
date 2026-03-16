'use client'

export default function Screen4ProgressFeedback() {
  return (
    <div className="screen-inner">
      <h1 className="page-title">小目标有进展啦</h1>
      <div style={{ background: 'rgba(76, 175, 80, 0.12)', borderRadius: 16, padding: 20, marginBottom: 24, textAlign: 'center' }}>
        <p style={{ fontSize: 36, fontWeight: 700, color: 'var(--task-green)', margin: '0 0 4px 0' }}>+1</p>
        <p style={{ fontSize: 15, color: 'var(--text-secondary)', margin: 0 }}>本次推进了 1 步</p>
      </div>
      <div className="task-card">
        <div className="icon-wrap">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" /><line x1="4" y1="22" x2="4" y2="15" /></svg>
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <p className="task-title">今天完成 2 次互动</p>
          <p className="task-desc">再完成 1 次就能达成目标哦</p>
          <div className="progress-bar" style={{ marginBottom: 8 }}>
            <div className="progress-bar-fill" style={{ width: '50%' }} />
          </div>
          <span style={{ fontSize: 13, color: 'var(--text-tertiary)' }}>1/2</span>
        </div>
      </div>
      <div className="spacer" />
      <button type="button" className="btn-primary">继续挑战</button>
      <button type="button" style={{ marginTop: 12, background: 'transparent', color: 'var(--task-blue)', border: 'none', fontSize: 15, cursor: 'pointer' }}>查看任务详情</button>
    </div>
  )
}
