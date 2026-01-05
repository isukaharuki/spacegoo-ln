import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifyToken } from '@/lib/auth'

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  // @ts-ignore
  const token = req.cookies?.get?.('admin_token')?.value
  const payload = token ? verifyToken(token) : null
  if (!payload) return NextResponse.json({ error: 'unauthorized' }, { status: 401 })

  const { name, platform, url } = await req.json()
  const volume = await prisma.volume.update({ where: { id: params.id }, data: { name, platform, url } })
  return NextResponse.json(volume)
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  // @ts-ignore
  const token = req.cookies?.get?.('admin_token')?.value
  const payload = token ? verifyToken(token) : null
  if (!payload) return NextResponse.json({ error: 'unauthorized' }, { status: 401 })

  await prisma.volume.delete({ where: { id: params.id } })
  return NextResponse.json({ ok: true })
}