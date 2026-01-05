import { NextResponse } from 'next/server'
import { verifyToken } from '@/lib/auth'

export async function GET(req: Request) {
  // @ts-ignore
  const token = req.cookies?.get?.('admin_token')?.value
  if (!token) return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  const payload = verifyToken(token)
  if (!payload || payload.role !== 'admin') return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  return NextResponse.json({ ok: true })
}