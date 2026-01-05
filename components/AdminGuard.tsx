'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminGuard({ children }: { children: React.ReactNode }) {
  const [ok, setOk] = useState(false)
  const router = useRouter()
  useEffect(() => {
    (async () => {
      const res = await fetch('/api/auth/me', { cache: 'no-store' })
      if (res.ok) setOk(true)
      else router.replace('/admin/login')
    })()
  }, [router])
  if (!ok) return null
  return <>{children}</>
}