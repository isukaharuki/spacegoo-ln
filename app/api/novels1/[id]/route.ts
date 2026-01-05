import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifyToken } from '@/lib/auth'

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const novel = await prisma.novel.findUnique({ where: { id: params.id }, include: { volumes: true } })
  if (!novel) return NextResponse.json({ error: 'not found' }, { status: 404 })
  return NextResponse.json(novel)
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  // @ts-ignore
  const token = req.cookies?.get?.('admin_token')?.value
  const payload = token ? verifyToken(token) : null
  if (!payload) return NextResponse.json({ error: 'unauthorized' }, { status: 401 })

  const body = await req.json()
  if (body.action === 'updateMeta') {
    const { title, coverUrl, review } = body.data
    const novel = await prisma.novel.update({ where: { id: params.id }, data: { title, coverUrl, review } })
    return NextResponse.json(novel)
  }
  if (body.action === 'addVolume') {
    const { name, platform, url } = body.volume
    const volume = await prisma.volume.create({ data: { novelId: params.id, name, platform, url } })
    return NextResponse.json(volume)
  }
  return NextResponse.json({ error: 'bad request' }, { status: 400 })
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  // @ts-ignore
  const token = req.cookies?.get?.('admin_token')?.value
  const payload = token ? verifyToken(token) : null
  if (!payload) return NextResponse.json({ error: 'unauthorized' }, { status: 401 })

  await prisma.novel.delete({ where: { id: params.id } })
  return NextResponse.json({ ok: true })
}