'use client'

export default function Screen8Integrated() {
  return (
    <div className="screen-inner">
      <h1 className="page-title">我的小目标</h1>
      <div className="task-card" style={{ marginBottom: 20 }}>
        <div className="icon-wrap">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" /><line x1="4" y1="22" x2="4" y2="15" /></svg>
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <p className="task-title">今天完成 2 次互动</p>
          <p className="task-desc">完成可得 2 张知识卡牌</p>
          <div className="progress-bar" style={{ marginBottom: 8 }}>
            <div className="progress-bar-fill" style={{ width: '50%' }} />
          </div>
          <span style={{ fontSize: 13, color: 'var(--text-tertiary)' }}>1/2</span>
        </div>
      </div>
      <div style={{ marginBottom: 20 }}>
        <p style={{ fontSize: 15, fontWeight: 600, color: 'var(--text-primary)', margin: '0 0 8px 0' }}>最近完成</p>
        <p style={{ fontSize: 13, color: 'var(--text-secondary)', margin: 0 }}>再完成 1 次互动 · 获得 2 张卡牌</p>
      </div>
      <div style={{ background: 'rgba(74, 144, 226, 0.1)', borderRadius: 12, padding: 16, marginBottom: 24 }}>
        <p style={{ fontSize: 15, color: 'var(--task-blue)', margin: 0 }}>再参与一次可继续积累，新任务已开启</p>
      </div>
      <div className="spacer" />
      <button type="button" className="btn-primary">继续挑战</button>
    </div>
  )
}
