'use client'

interface PhoneFrameProps {
  children: React.ReactNode
  className?: string
}

export function PhoneFrame({ children, className = '' }: PhoneFrameProps) {
  return (
    <div className={`flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-4 py-8 ${className}`}>
      {/* iPhone 外壳 */}
      <div className="relative w-full max-w-sm">

        {/* 左侧按钮组 */}
        <div className="absolute -left-[5px] top-[80px] z-10 flex flex-col gap-2">
          {/* 静音键 */}
          <div className="h-7 w-[5px] rounded-l-sm bg-slate-600" />
          {/* 音量+ */}
          <div className="h-10 w-[5px] rounded-l-sm bg-slate-600" />
          {/* 音量- */}
          <div className="h-10 w-[5px] rounded-l-sm bg-slate-600" />
        </div>

        {/* 右侧电源键 */}
        <div className="absolute -right-[5px] top-[100px] z-10 h-14 w-[5px] rounded-r-sm bg-slate-600" />

        {/* 手机壳主体 */}
        <div className="relative rounded-[3rem] bg-gradient-to-b from-slate-700 to-slate-800 p-[3px] shadow-[0_0_0_1px_rgba(255,255,255,0.08),0_30px_80px_rgba(0,0,0,0.8)]">
          {/* 内边框 */}
          <div className="relative overflow-hidden rounded-[2.8rem] bg-black">

            {/* 屏幕内容区域 - 撑满整个手机 */}
            <div className="relative aspect-[9/16] overflow-y-auto overflow-x-hidden">
              {children}
            </div>

            {/* 底部 Home Indicator - 悬浮在内容上方 */}
            <div className="absolute bottom-0 left-0 right-0 flex justify-center pb-2 pt-1 pointer-events-none">
              <div className="h-[5px] w-[130px] rounded-full bg-white/30" />
            </div>
          </div>
        </div>

        {/* 高光反射 */}
        <div className="pointer-events-none absolute inset-0 rounded-[3rem] bg-gradient-to-br from-white/10 via-transparent to-transparent" />
      </div>
    </div>
  )
}
