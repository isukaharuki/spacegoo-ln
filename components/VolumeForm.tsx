'use client'
import { useState } from 'react'

export default function VolumeForm({ novelId, onSaved }: { novelId: string, onSaved: () => void }) {
  const [name, setName] = useState('')
  const [platform, setPlatform] = useState<'TELEGRAM'|'FACEBOOK'>('TELEGRAM')
  const [url, setUrl] = useState('')

  async function addVolume(e: React.FormEvent) {
    e.preventDefault()
    const res = await fetch(`/api/novels/${novelId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'addVolume', volume: { name, platform, url } }),
    })
    if (res.ok) {
      setName(''); setUrl(''); setPlatform('TELEGRAM')
      onSaved()
      location.reload()
    }
  }

  return (
    <form onSubmit={addVolume} className="space-y-3">
      <input className="input" value={name} onChange={e=>setName(e.target.value)} placeholder="Volume name/number" required />
      <div className="flex gap-3">
        <select className="input" value={platform} onChange={e=>setPlatform(e.target.value as any)}>
          <option value="TELEGRAM">Telegram</option>
          <option value="FACEBOOK">Facebook</option>
        </select>
        <input className="input flex-1" value={url} onChange={e=>setUrl(e.target.value)} placeholder="External link URL" required />
      </div>
      <button className="btn" type="submit">Add volume</button>
    </form>
  )
}