'use client'

export default function Screen6NewTask() {
  return (
    <div className="screen-inner">
      <h1 className="page-title">新任务来啦</h1>
      <p style={{ fontSize: 15, color: 'var(--text-secondary)', margin: '-16px 0 20px 0' }}>你已完成 1 个任务，继续加油</p>
      <div className="task-card">
        <div className="icon-wrap" style={{ background: 'rgba(74, 144, 226, 0.15)' }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="var(--task-blue)" strokeWidth="2"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" /><line x1="4" y1="22" x2="4" y2="15" /></svg>
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <p className="task-title">今天完成 2 次互动</p>
          <p className="task-desc">再玩一次就达成</p>
          <div className="progress-bar" style={{ marginBottom: 8 }}>
            <div className="progress-bar-fill" style={{ width: '0%' }} />
          </div>
          <span style={{ fontSize: 13, color: 'var(--text-tertiary)' }}>0/2</span>
          <p style={{ fontSize: 13, color: 'var(--task-blue)', marginTop: 8, marginBottom: 0 }}>完成可得 2 张知识卡牌</p>
        </div>
      </div>
      <div className="spacer" />
      <button type="button" className="btn-primary">去完成新目标</button>
    </div>
  )
}
