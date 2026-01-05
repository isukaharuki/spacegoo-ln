import AdminGuard from '@/components/AdminGuard'
import { prisma } from '@/lib/prisma'
import NovelForm from '@/components/NovelForm'
import VolumeForm from '@/components/VolumeForm'
import Link from 'next/link'

async function getNovels() {
  return prisma.novel.findMany({ include: { volumes: true }, orderBy: { updatedAt: 'desc' } })
}

export default async function Dashboard() {
  const novels = await getNovels()

  return (
    <AdminGuard>
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Admin dashboard</h1>
          <Link href="/admin/settings" className="btn">Settings</Link>
        </div>

        <div className="rounded-lg border border-slate-800 bg-slate-900 p-4">
          <h2 className="font-semibold mb-3">+ Add new</h2>
          <NovelForm onCreated={() => {}} />
        </div>

        <div className="space-y-4">
          {novels.map(novel => (
            <div key={novel.id} className="rounded-lg border border-slate-800 bg-slate-900 p-4">
              <div className="flex items-start gap-4">
                <img src={novel.coverUrl} alt={novel.title} className="w-24 h-32 object-cover rounded-md border border-slate-800" />
                <div className="flex-1">
                  <h3 className="font-semibold">{novel.title}</h3>
                  <p className="text-sm text-slate-300">{novel.review}</p>
                  <div className="flex gap-2 mt-3">
                    <EditButtons novelId={novel.id} />
                  </div>
                </div>
              </div>

              <h4 className="mt-4 font-semibold">Volumes / Links</h4>
              <ul className="divide-y divide-slate-800">
                {novel.volumes.map(v => (
                  <li key={v.id} className="py-2 flex items-center justify-between">
                    <div>
                      <span className="text-sm font-medium">{v.name}</span>
                      <span className="ml-2 text-xs text-slate-400">({v.platform})</span>
                      <a href={v.url} target="_blank" rel="noreferrer" className="ml-3 text-indigo-400 text-xs underline">Open</a>
                    </div>
                    <div className="flex gap-2">
                      <button className="btn" onClick={() => editVolume(v.id)}>Edit</button>
                      <button className="btn-danger" onClick={() => deleteVolume(v.id)}>Delete</button>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="mt-3">
                <VolumeForm novelId={novel.id} onSaved={() => {}} />
              </div>
            </div>
          ))}
          {novels.length === 0 && <p className="text-slate-400">No novels yet.</p>}
        </div>
      </section>
    </AdminGuard>
  )
}

function EditButtons({ novelId }: { novelId: string }) {
  async function del() {
    await fetch(`/api/novels/${novelId}`, { method: 'DELETE' })
    location.reload()
  }
  async function edit() {
    const title = prompt('New title?')
    const coverUrl = prompt('New cover URL?')
    const review = prompt('New review?')
    if (!title || !coverUrl || !review) return
    await fetch(`/api/novels/${novelId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'updateMeta', data: { title, coverUrl, review } }),
    })
    location.reload()
  }
  return (
    <>
      <button className="btn" onClick={edit}>Edit</button>
      <button className="btn-danger" onClick={del}>Delete</button>
    </>
  )
}

async function editVolume(id: string) {
  const name = prompt('Volume name?')
  const platform = prompt('Platform: TELEGRAM or FACEBOOK?')
  const url = prompt('URL?')
  if (!name || !platform || !url) return
  await fetch(`/api/volumes/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, platform, url }),
  })
  location.reload()
}

async function deleteVolume(id: string) {
  await fetch(`/api/volumes/${id}`, { method: 'DELETE' })
  location.reload()
}