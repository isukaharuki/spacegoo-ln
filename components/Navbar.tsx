'use client'
import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Navbar() {
  const [q, setQ] = useState('')
  const router = useRouter()

  return (
    <nav className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur border-b border-slate-800">
      <div className="container mx-auto px-4 py-3 flex items-center gap-4">
        <Link href="/" className="font-bold text-lg tracking-wide">
          SpaceGOO LN
        </Link>
        <div className="flex-1" />
        <input
          value={q}
          onChange={e => setQ(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && router.push(`/?q=${encodeURIComponent(q)}`)}
          className="w-56 md:w-72 rounded-md bg-slate-800 text-slate-100 px-3 py-2 outline-none focus:ring-2 ring-indigo-500 transition"
          placeholder="Search titles or keywords"
        />
        <Link href="/admin/login" className="btn">Admin</Link>
      </div>
    </nav>
  )
}