'use client'

interface PhoneFrameProps {
  children: React.ReactNode
  className?: string
}

export function PhoneFrame({ children, className = '' }: PhoneFrameProps) {
  return (
    <div className={`flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-4 py-8 ${className}`}>
      {/* 外层手机壳 */}
      <div className="relative w-full max-w-sm">
        {/* 手机壳阴影 */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-slate-700 to-slate-900 shadow-2xl" />
        
        {/* 手机壳边框 */}
        <div className="relative rounded-3xl border-8 border-slate-700 bg-slate-800 shadow-2xl">
          {/* 顶部刘海 */}
          <div className="absolute left-1/2 top-0 z-20 h-6 w-40 -translate-x-1/2 rounded-b-3xl bg-slate-900" />
          
          {/* 屏幕内容区域 - 可滚动 */}
          <div className="relative aspect-[9/16] overflow-y-auto overflow-x-hidden rounded-2xl bg-white">
            {children}
          </div>
          
          {/* 底部指示条 */}
          <div className="flex justify-center bg-slate-800 px-4 py-3">
            <div className="h-1 w-32 rounded-full bg-slate-600" />
          </div>
        </div>

        {/* 手机壳高光 */}
        <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-br from-white/10 via-transparent to-transparent" />
      </div>
    </div>
  )
}
