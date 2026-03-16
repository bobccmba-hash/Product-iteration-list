'use client'

export default function Screen7TaskSummary() {
  return (
    <div className="screen-inner">
      <h1 className="page-title">我的小目标</h1>
      <p style={{ fontSize: 15, color: 'var(--text-secondary)', margin: '-16px 0 20px 0' }}>任务成长概况</p>
      <div className="task-card" style={{ marginBottom: 16 }}>
        <div className="icon-wrap">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" /><line x1="4" y1="22" x2="4" y2="15" /></svg>
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <p className="task-title">今天完成 2 次互动</p>
          <p className="task-desc">当前进行中</p>
          <div className="progress-bar" style={{ marginBottom: 8 }}>
            <div className="progress-bar-fill" style={{ width: '50%' }} />
          </div>
          <span style={{ fontSize: 13, color: 'var(--text-tertiary)' }}>1/2</span>
        </div>
      </div>
      <div style={{ marginBottom: 16 }}>
        <p style={{ fontSize: 15, fontWeight: 600, color: 'var(--text-primary)', margin: '0 0 12px 0' }}>最近完成</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', background: 'var(--bg-card)', borderRadius: 12, boxShadow: 'var(--shadow-card)' }}>
            <span style={{ fontSize: 15, color: 'var(--text-primary)' }}>再完成 1 次互动</span>
            <span style={{ fontSize: 13, color: 'var(--success)', display: 'flex', alignItems: 'center', gap: 4 }}>✓ 已完成</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', background: 'var(--bg-card)', borderRadius: 12, boxShadow: 'var(--shadow-card)' }}>
            <span style={{ fontSize: 15, color: 'var(--text-primary)' }}>获得 2 张知识卡牌</span>
            <span style={{ fontSize: 13, color: 'var(--success)', display: 'flex', alignItems: 'center', gap: 4 }}>✓ 已完成</span>
          </div>
        </div>
      </div>
      <p style={{ fontSize: 15, color: 'var(--text-secondary)', marginBottom: 24 }}>
        累计完成 <strong style={{ color: 'var(--task-green)' }}>3</strong> 个任务
      </p>
      <div className="spacer" />
      <button type="button" className="btn-primary">去完成当前目标</button>
    </div>
  )
}
