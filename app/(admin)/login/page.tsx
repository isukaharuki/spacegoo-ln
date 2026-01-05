'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [username, setUsername] = useState('admin')
  const [password, setPassword] = useState('')
  const [err, setErr] = useState('')
  const router = useRouter()

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setErr('')
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    })
    if (res.ok) router.replace('/admin/dashboard')
    else setErr('Invalid credentials')
  }

  return (
    <div className="max-w-sm mx-auto mt-12 bg-slate-900 border border-slate-800 rounded-lg p-6">
      <h1 className="text-xl font-bold mb-4">Admin login</h1>
      <form onSubmit={submit} className="space-y-3">
        <input className="input" value={username} onChange={e=>setUsername(e.target.value)} placeholder="Username" />
        <input className="input" type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" />
        {err && <p className="text-red-400 text-sm">{err}</p>}
        <button className="btn-primary w-full" type="submit">Login</button>
      </form>
    </div>
  )
}