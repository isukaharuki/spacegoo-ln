import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifyToken } from '@/lib/auth'

export async function GET() {
  const novels = await prisma.novel.findMany({ orderBy: { updatedAt: 'desc' } })
  return NextResponse.json(novels)
}

export async function POST(req: Request) {
  // @ts-ignore
  const token = req.cookies?.get?.('admin_token')?.value
  const payload = token ? verifyToken(token) : null
  if (!payload) return NextResponse.json({ error: 'unauthorized' }, { status: 401 })

  const { title, coverUrl, review } = await req.json()
  const novel = await prisma.novel.create({ data: { title, coverUrl, review } })
  return NextResponse.json(novel)
}