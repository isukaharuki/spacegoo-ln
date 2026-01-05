import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { prisma } from './prisma'

const JWT_SECRET = process.env.JWT_SECRET!

export async function validateAdmin(username: string, password: string) {
  const admin = await prisma.admin.findUnique({ where: { username } })
  if (!admin) return null
  const valid = await bcrypt.compare(password, admin.passwordHash)
  return valid ? admin : null
}

export function signAdminToken(adminId: string) {
  return jwt.sign({ sub: adminId, role: 'admin' }, JWT_SECRET, { expiresIn: '7d' })
}

export function verifyToken(token: string) {
  try { return jwt.verify(token, JWT_SECRET) as { sub: string, role: string } }
  catch { return null }
}