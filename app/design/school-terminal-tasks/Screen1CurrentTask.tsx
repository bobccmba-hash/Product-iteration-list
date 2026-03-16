'use client'

export default function Screen1CurrentTask() {
  return (
    <div className="screen-inner">
      <h1 className="page-title">我的小目标</h1>
      <div className="task-card">
        <div className="icon-wrap">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
            <line x1="4" y1="22" x2="4" y2="15" />
          </svg>
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <p className="task-title">再完成 1 次互动</p>
          <p className="task-desc">玩一次就能完成哦</p>
          <div className="progress-bar" style={{ marginBottom: 8 }}>
            <div className="progress-bar-fill" style={{ width: '100%' }} />
          </div>
          <span style={{ fontSize: 13, color: 'var(--text-tertiary)' }}>1/1</span>
        </div>
      </div>
      <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 12, marginBottom: 24 }}>
        完成可得：<span style={{ color: 'var(--task-blue)', fontWeight: 600 }}>1 张知识卡牌</span>
      </p>
      <div className="spacer" />
      <button type="button" className="btn-primary">去完成</button>
    </div>
  )
}
