'use client'

export default function Screen2TaskDetail() {
  return (
    <div className="screen-inner">
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 24, gap: 8 }}>
        <span style={{ fontSize: 20 }}>←</span>
        <h1 className="page-title" style={{ margin: 0 }}>任务详情</h1>
      </div>
      <div className="task-card" style={{ flexDirection: 'column', alignItems: 'stretch', gap: 16, marginBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div className="icon-wrap">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" /><line x1="4" y1="22" x2="4" y2="15" /></svg>
          </div>
          <span style={{ fontSize: 20, fontWeight: 700, color: 'var(--text-primary)' }}>再完成 1 次互动</span>
        </div>
        <div style={{ background: 'var(--bg-page)', borderRadius: 12, padding: 16 }}>
          <p style={{ fontSize: 15, fontWeight: 600, margin: '0 0 8px 0', color: 'var(--text-primary)' }}>怎么完成</p>
          <p style={{ fontSize: 15, color: 'var(--text-secondary)', margin: 0 }}>在今天内再完成 1 次终端互动。</p>
        </div>
        <div style={{ background: 'var(--bg-page)', borderRadius: 12, padding: 16 }}>
          <p style={{ fontSize: 15, fontWeight: 600, margin: '0 0 8px 0', color: 'var(--text-primary)' }}>完成可得</p>
          <p style={{ fontSize: 15, color: 'var(--text-secondary)', margin: 0, display: 'flex', alignItems: 'center', gap: 8 }}>
            <span className="badge">1 张知识卡牌</span>
          </p>
        </div>
        <div>
          <p style={{ fontSize: 13, color: 'var(--text-tertiary)', marginBottom: 8 }}>当前进度</p>
          <div className="progress-bar" style={{ marginBottom: 4 }}>
            <div className="progress-bar-fill" style={{ width: '100%' }} />
          </div>
          <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>1/1</span>
        </div>
      </div>
      <div className="spacer" />
      <button type="button" className="btn-primary">去完成</button>
    </div>
  )
}
