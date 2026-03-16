'use client'

export default function Screen5CompleteCelebration() {
  return (
    <div className="screen-inner" style={{ background: 'linear-gradient(180deg, rgba(255,200,87,0.2) 0%, var(--bg-page) 40%)' }}>
      <div className="spacer" style={{ minHeight: 40 }} />
      <div style={{ textAlign: 'center', marginBottom: 24 }}>
        <div style={{ width: 96, height: 96, margin: '0 auto 16px', borderRadius: '50%', background: 'var(--task-yellow)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 24px rgba(255,200,87,0.5)' }}>
          <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 48, height: 48, color: '#1A1A1A' }}>
            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
          </svg>
        </div>
        <p style={{ fontSize: 28, fontWeight: 700, color: 'var(--text-primary)', margin: '0 0 8px 0' }}>任务完成！</p>
        <p style={{ fontSize: 15, color: 'var(--text-secondary)', margin: 0 }}>「再完成 1 次互动」已完成</p>
      </div>
      <div className="task-card" style={{ marginBottom: 24 }}>
        <span className="badge" style={{ fontSize: 15, padding: '8px 12px' }}>获得 1 张知识卡牌</span>
      </div>
      <div className="spacer" />
      <button type="button" className="btn-primary yellow">太棒了</button>
    </div>
  )
}
