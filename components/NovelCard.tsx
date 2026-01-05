import Link from 'next/link'

export default function NovelCard({ novel }: { novel: { id: string, title: string, coverUrl: string, review: string } }) {
  return (
    <Link href={`/novel/${novel.id}`} className="group rounded-lg overflow-hidden bg-slate-900 border border-slate-800 hover:border-indigo-500 transition">
      <div className="aspect-[3/4] w-full overflow-hidden">
        <img src={novel.coverUrl} alt={novel.title} className="h-full w-full object-cover group-hover:scale-105 transition" />
      </div>
      <div className="p-3">
        <h3 className="text-sm font-semibold line-clamp-1">{novel.title}</h3>
        <p className="text-xs text-slate-300 line-clamp-2 mt-1">{novel.review}</p>
      </div>
    </Link>
  )
}