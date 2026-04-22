import Link from 'next/link'

export function Breadcrumbs({
  items,
}: {
  items: { label: string; href?: string }[]
}) {
  return (
    <nav aria-label="面包屑">
      <ol className="flex flex-wrap items-center gap-2 text-sm text-slate-500">
        {items.map((it, idx) => (
          <li key={`${it.label}-${idx}`} className="flex items-center gap-2">
            {it.href ? (
              <Link href={it.href} className="hover:text-[#061b31]">
                {it.label}
              </Link>
            ) : (
              <span className="text-[#061b31]">{it.label}</span>
            )}
            {idx < items.length - 1 ? (
              <span className="text-slate-400">/</span>
            ) : null}
          </li>
        ))}
      </ol>
    </nav>
  )
}

