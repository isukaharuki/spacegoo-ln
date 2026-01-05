'use client'
import { useState } from 'react'
import AdminGuard from '@/components/AdminGuard'

export default function SettingsPage() {
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [msg, setMsg] = useState('')

  async function change(e: React.FormEvent) {
    e.preventDefault()
    setMsg('')
    const res = await fetch('/api/auth/change-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ currentPassword, newPassword }),
    })
    if (res.ok) {
      setMsg('Password updated.')
      setCurrentPassword(''); setNewPassword('')
    } else {
      setMsg('Failed to update password.')
    }
  }

  return (
    <AdminGuard>
      <div className="max-w-md mx-auto bg-slate-900 border border-slate-800 rounded-lg p-6">
        <h1 className="text-xl font-bold mb-4">Change password</h1>
        <form onSubmit={change} className="space-y-3">
          <input className="input" type="password" value={currentPassword} onChange={e=>setCurrentPassword(e.target.value)} placeholder="Current password" />
          <input className="input" type="password" value={newPassword} onChange={e=>setNewPassword(e.target.value)} placeholder="New password" />
          <button className="btn-primary" type="submit">Update</button>
          {msg && <p className="text-slate-300 text-sm mt-2">{msg}</p>}
        </form>
      </div>
    </AdminGuard>
  )
}