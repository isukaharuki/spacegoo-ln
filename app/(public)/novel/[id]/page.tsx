import { prisma } from '@/lib/prisma'
import VolumeList from '@/components/VolumeList'

export default async function NovelPage({ params }: { params: { id: string } }) {
  const novel = await prisma.novel.findUnique({
    where: { id: params.id },
    include: { volumes: { orderBy: { createdAt: 'desc' } } },
  })
  if (!novel) return <p className="text-slate-300">Novel not found.</p>

  return (
    <article className="grid md:grid-cols-3 gap-6">
      <div className="md:col-span-1">
        <img src={novel.coverUrl} alt={novel.title} className="rounded-lg border border-slate-800 object-cover w-full" />
      </div>
      <div className="md:col-span-2 space-y-4">
        <h1 className="text-2xl font-bold">{novel.title}</h1>
        <p className="text-slate-300">{novel.review}</p>
        <section>
          <h2 className="text-lg font-semibold mb-2">Links / Volumes</h2>
          <VolumeList volumes={novel.volumes} />
        </section>
      </div>
    </article>
  )
}