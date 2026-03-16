'use client'

export default function Screen3BeforeHint() {
  return (
    <div className="screen-inner" style={{ justifyContent: 'center', paddingTop: 120 }}>
      <div style={{ position: 'relative', width: '100%' }}>
        <div className="task-card" style={{ flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: 28 }}>
          <div className="icon-wrap" style={{ width: 56, height: 56, marginBottom: 16 }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 32, height: 32 }}>
              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
            </svg>
          </div>
          <p style={{ fontSize: 17, fontWeight: 600, color: 'var(--text-primary)', margin: '0 0 8px 0' }}>
            完成这次互动，就能推进小目标哦
          </p>
          <p style={{ fontSize: 15, color: 'var(--text-secondary)', margin: '0 0 24px 0' }}>
            再完成 1 次互动
          </p>
          <button type="button" className="btn-primary" style={{ width: '100%' }}>知道啦</button>
        </div>
      </div>
    </div>
  )
}
