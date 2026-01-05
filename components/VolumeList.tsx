export default function VolumeList({ volumes }: { volumes: { id: string, name: string, platform: 'TELEGRAM'|'FACEBOOK', url: string }[] }) {
  return (
    <div className="space-y-2">
      {volumes.map(v => (
        <a key={v.id} href={v.url} target="_blank" rel="noreferrer"
           className="flex items-center gap-3 rounded-md bg-slate-900 border border-slate-800 hover:border-indigo-500 px-3 py-2 transition">
          <span className="text-sm font-medium">{v.name}</span>
          <span className="text-xs text-slate-400">({v.platform === 'TELEGRAM' ? 'Telegram' : 'Facebook'})</span>
        </a>
      ))}
    </div>
  )
}