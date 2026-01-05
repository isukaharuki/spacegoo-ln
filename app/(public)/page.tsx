import { prisma } from '@/lib/prisma'
import NovelCard from '@/components/NovelCard'

export default async function Home({ searchParams }: { searchParams: { q?: string } }) {
  const q = searchParams.q?.trim()
  const novels = await prisma.novel.findMany({
    where: q ? {
      OR: [
        { title: { contains: q, mode: 'insensitive' } },
        { review: { contains: q, mode: 'insensitive' } },
      ],
    } : undefined,
    orderBy: { updatedAt: 'desc' },
  })

  return (
    <section>
      <h1 className="text-xl md:text-2xl font-bold mb-4">Discover translated light novels</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-4">
        {novels.map(n => <NovelCard key={n.id} novel={n} />)}
      </div>
      {novels.length === 0 && (
        <p className="text-slate-400 mt-6">No novels found. Try a different search.</p>
      )}
    </section>
  )
}