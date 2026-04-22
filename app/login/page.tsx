'use client'

import { useRouter } from 'next/navigation'
import { FormEvent, useState, useEffect } from 'react'

const VALID_USERNAME = 'admin'
const VALID_PASSWORD = 'xhl123456'
const VALID_PASSWORD_ALIAS = '信号了123456'
const STORAGE_KEY = 'ai314_auth'

function normalizeInput(value: string) {
  // 兼容全角/不可见空白等输入法问题
  const halfWidth = value.replace(/[！-～]/g, (ch) =>
    String.fromCharCode(ch.charCodeAt(0) - 0xfee0),
  )
  return halfWidth
    .replace(/\s+/g, '')
    .replace(/[\u200B-\u200D\uFEFF]/g, '')
    .toLowerCase()
}

export default function LoginPage() {
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = window.localStorage.getItem(STORAGE_KEY)
      if (token === 'ok') {
        router.replace('/')
      }
    }
  }, [router])

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    setError('')

    const normalizedUsername = normalizeInput(username)
    const normalizedPassword = normalizeInput(password)

    const passwordMatched =
      normalizedPassword === VALID_PASSWORD || normalizedPassword === VALID_PASSWORD_ALIAS

    if (normalizedUsername !== VALID_USERNAME || !passwordMatched) {
      setError('账号或密码错误')
      return
    }

    setLoading(true)
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(STORAGE_KEY, 'ok')
    }
    router.replace('/')
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 text-slate-900">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg ring-1 ring-slate-200">
        <h1 className="mb-6 text-center text-2xl font-black tracking-tight text-slate-900">登录</h1>
        <form onSubmit={onSubmit} className="space-y-5">
          <div>
            <label className="mb-1 block text-xs font-semibold text-slate-600">账号</label>
            <input
              type="text"
              placeholder="请输入账号"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoCapitalize="none"
              autoCorrect="off"
              spellCheck={false}
              className="h-10 w-full rounded-lg border border-slate-200 px-3 text-sm text-slate-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold text-slate-600">密码</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="请输入密码"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoCapitalize="none"
                autoCorrect="off"
                spellCheck={false}
                className="h-10 w-full rounded-lg border border-slate-200 px-3 pr-10 text-sm text-slate-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                tabIndex={-1}
                aria-label={showPassword ? '隐藏密码' : '显示密码'}
              >
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
                    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
                    <line x1="1" y1="1" x2="23" y2="23"/>
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                    <circle cx="12" cy="12" r="3"/>
                  </svg>
                )}
              </button>
            </div>
          </div>
          {error && <p className="text-sm text-rose-500">{error}</p>}
          <button
            type="submit"
            className="flex h-10 w-full items-center justify-center rounded-lg bg-slate-900 text-sm font-semibold text-white hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-400"
            disabled={loading}
          >
            {loading ? '登录中…' : '登录'}
          </button>
        </form>
      </div>
    </main>
  )
}

