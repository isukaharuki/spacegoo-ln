'use client'
import { useState } from 'react'

export default function NovelForm({ onCreated }: { onCreated: (novel: any) => void }) {
  const [title, setTitle] = useState('')
  const [review, setReview] = useState('')
  const [coverUrl, setCoverUrl] = useState('')
  const [loading, setLoading] = useState(false)

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    const res = await fetch('/api/novels', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, review, coverUrl }),
    })
    const data = await res.json()
    setLoading(false)
    if (res.ok) {
      onCreated(data)
      setTitle(''); setReview(''); setCoverUrl('')
      location.reload()
    }
  }

  return (
    <form onSubmit={submit} className="space-y-3">
      <input className="input" value={title} onChange={e=>setTitle(e.target.value)} placeholder="Novel title" required />
      <input className="input" value={coverUrl} onChange={e=>setCoverUrl(e.target.value)} placeholder="Cover image URL" required />
      <textarea className="textarea" value={review} onChange={e=>setReview(e.target.value)} placeholder="Short review/description" required />
      <button className="btn-primary" type="submit" disabled={loading}>{loading ? 'Saving...' : 'Save'}</button>
    </form>
  )
}