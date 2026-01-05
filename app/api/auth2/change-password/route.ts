import { NextResponse } from 'next/server'
import bcrypt from 'bcrypt'
import { prisma } from '@/lib/prisma'
import { verifyToken } from '@/lib/auth'

export async function POST(req: Request) {
  // @ts-ignore
  const token = req.cookies?.get?.('admin_token')?.value
  const payload = token ? verifyToken(token) : null
  if (!payload) return NextResponse.json({ error: 'unauthorized' }, { status: 401 })

  const { currentPassword, newPassword } = await req.json()
  const admin = await prisma.admin.findUnique({ where: { id: payload.sub } })
  if (!admin) return NextResponse.json({ error: 'unauthorized' }, { status: 401 })

  const valid = await bcrypt.compare(currentPassword, admin.passwordHash)
  if (!valid) return NextResponse.json({ error: 'invalid current password' }, { status: 400 })

  const passwordHash = await bcrypt.hash(newPassword, 12)
  await prisma.admin.update({ where: { id: admin.id }, data: { passwordHash } })

  return NextResponse.json({ ok: true })
}