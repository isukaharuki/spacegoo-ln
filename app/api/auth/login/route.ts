import { NextResponse } from 'next/server'
import { validateAdmin, signAdminToken } from '@/lib/auth'

export async function POST(req: Request) {
  const { username, password } = await req.json()
  const admin = await validateAdmin(username, password)
  if (!admin) return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
  const token = signAdminToken(admin.id)
  const res = NextResponse.json({ ok: true })
  res.cookies.set('admin_token', token, { httpOnly: true, secure: true, sameSite: 'strict', path: '/' })
  return res
}