'use client'

import { useEffect, useMemo, useState } from 'react'

export function classNames(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(' ')
}

export function Tag({
  children,
  tone = 'neutral',
}: {
  children: React.ReactNode
  tone?: 'neutral' | 'success' | 'warning' | 'danger' | 'info'
}) {
  const cls = useMemo(() => {
    switch (tone) {
      case 'success':
        return 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200'
      case 'warning':
        return 'bg-amber-50 text-amber-800 ring-1 ring-amber-200'
      case 'danger':
        return 'bg-rose-50 text-rose-700 ring-1 ring-rose-200'
      case 'info':
        return 'bg-sky-50 text-sky-700 ring-1 ring-sky-200'
      default:
        return 'bg-slate-50 text-slate-700 ring-1 ring-slate-200'
    }
  }, [tone])

  return (
    <span className={classNames('inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium', cls)}>
      {children}
    </span>
  )
}

export function Button({
  children,
  tone = 'primary',
  type = 'button',
  onClick,
  disabled,
}: {
  children: React.ReactNode
  tone?: 'primary' | 'secondary' | 'danger' | 'ghost'
  type?: 'button' | 'submit' | 'reset'
  onClick?: () => void
  disabled?: boolean
}) {
  const base =
    'inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 disabled:cursor-not-allowed disabled:opacity-60'
  const cls =
    tone === 'primary'
      ? 'bg-slate-900 text-white hover:bg-slate-800'
      : tone === 'secondary'
        ? 'bg-white text-slate-900 ring-1 ring-slate-200 hover:bg-slate-50'
        : tone === 'danger'
          ? 'bg-rose-600 text-white hover:bg-rose-500'
          : 'bg-transparent text-slate-700 hover:bg-slate-100'

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classNames(base, cls)}>
      {children}
    </button>
  )
}

export function FieldLabel({ children }: { children: React.ReactNode }) {
  return <div className="text-xs font-semibold text-slate-700">{children}</div>
}

export function Input({
  value,
  onChange,
  placeholder,
}: {
  value: string
  onChange: (v: string) => void
  placeholder?: string
}) {
  return (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="h-10 w-full rounded-lg bg-white px-3 text-sm ring-1 ring-slate-200 focus:ring-2 focus:ring-slate-400"
    />
  )
}

type SearchableOption = {
  value: string
  label: string
  description?: string
}

export function SearchableMultiSelect({
  options,
  values,
  onChange,
  placeholder = '搜索终端名称 / 学校 / 设备组',
}: {
  options: SearchableOption[]
  values: string[]
  onChange: (v: string[]) => void
  placeholder?: string
}) {
  const [q, setQ] = useState('')

  const filtered = useMemo(() => {
    const kw = q.trim()
    if (!kw) return options
    return options.filter((o) => o.label.includes(kw) || o.description?.includes(kw))
  }, [options, q])

  function toggle(value: string) {
    if (values.includes(value)) {
      onChange(values.filter((v) => v !== value))
    } else {
      onChange([...values, value])
    }
  }

  function selectAllFiltered() {
    const ids = filtered.map((o) => o.value)
    const set = new Set([...values, ...ids])
    onChange(Array.from(set))
  }

  function clearAll() {
    onChange([])
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <Input value={q} onChange={setQ} placeholder={placeholder} />
        <Button tone="ghost" onClick={selectAllFiltered}>
          选中搜索结果
        </Button>
        <Button tone="ghost" onClick={clearAll}>
          清空
        </Button>
      </div>
      <div className="max-h-64 space-y-1 overflow-y-auto rounded-lg bg-slate-50 p-2">
        {filtered.map((o) => {
          const checked = values.includes(o.value)
          return (
            <label
              key={o.value}
              className={classNames(
                'flex cursor-pointer items-center gap-2 rounded-md px-3 py-2 text-sm ring-1',
                checked ? 'bg-white ring-slate-300' : 'bg-slate-50 ring-slate-200',
              )}
            >
              <input
                type="checkbox"
                className="h-4 w-4"
                checked={checked}
                onChange={() => toggle(o.value)}
              />
              <div className="flex min-w-0 flex-col">
                <span className="truncate font-semibold text-slate-900">{o.label}</span>
                {o.description && (
                  <span className="truncate text-xs text-slate-500">{o.description}</span>
                )}
              </div>
            </label>
          )
        })}
        {filtered.length === 0 && (
          <div className="px-2 py-3 text-xs text-slate-500">没有匹配的终端，请换个关键字试试。</div>
        )}
      </div>
      <div className="text-xs text-slate-500">
        已选 {values.length} 个终端
      </div>
    </div>
  )
}

export function Select({
  value,
  onChange,
  options,
}: {
  value: string
  onChange: (v: string) => void
  options: Array<{ value: string; label: string }>
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="h-10 w-full rounded-lg bg-white px-3 text-sm ring-1 ring-slate-200 focus:ring-2 focus:ring-slate-400"
    >
      {options.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  )
}

type Toast = { id: string; title: string; tone: 'neutral' | 'success' | 'danger' }

export function useToasts() {
  const [toasts, setToasts] = useState<Toast[]>([])

  function push(title: string, tone: Toast['tone'] = 'neutral') {
    const id = `${Date.now()}_${Math.random().toString(16).slice(2)}`
    setToasts((s) => [...s, { id, title, tone }])
  }

  function remove(id: string) {
    setToasts((s) => s.filter((t) => t.id !== id))
  }

  return { toasts, push, remove }
}

export function ToastHost({
  toasts,
  onRemove,
}: {
  toasts: Toast[]
  onRemove: (id: string) => void
}) {
  useEffect(() => {
    if (toasts.length === 0) return
    const timers = toasts.map((t) => setTimeout(() => onRemove(t.id), 2400))
    return () => timers.forEach(clearTimeout)
  }, [toasts, onRemove])

  return (
    <div className="fixed right-4 top-4 z-50 flex w-[360px] flex-col gap-2">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={classNames(
            'rounded-xl px-4 py-3 text-sm font-semibold shadow-lg ring-1',
            t.tone === 'success'
              ? 'bg-emerald-50 text-emerald-900 ring-emerald-200'
              : t.tone === 'danger'
                ? 'bg-rose-50 text-rose-900 ring-rose-200'
                : 'bg-white text-slate-900 ring-slate-200',
          )}
        >
          {t.title}
        </div>
      ))}
    </div>
  )
}

