import { prisma } from '../lib/prisma'
import bcrypt from 'bcrypt'

async function main() {
  const passwordHash = await bcrypt.hash('CarDogcatfish1324', 12)
  await prisma.admin.upsert({
    where: { username: 'admin' },
    update: { passwordHash },
    create: { username: 'admin', passwordHash },
  })

  // Sample novels
  const witch = await prisma.novel.upsert({
    where: { id: 'seed_witch' }, // ensures id uniqueness workaround; not used later
    update: {},
    create: {
      title: 'The Witch',
      coverUrl: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=600',
      review: 'A mysterious witch crosses worlds to rewrite fate. Dark, lyrical, and full of wonder.',
    }
  })

  const spacegoo = await prisma.novel.create({
    title: 'SpaceGOO Chronicles',
    coverUrl: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=600',
    review: 'Cosmic slime saves the galaxy one chapter at a time. Whimsical sci‑fi with heart.',
  } as any) // quick seed without conflict on where

  // Volumes
  await prisma.volume.create({
    data: { novelId: witch.id, name: 'Volume 1: Moonlit Pact', platform: 'TELEGRAM', url: 'https://t.me/yourchannel/123' }
  })
  await prisma.volume.create({
    data: { novelId: witch.id, name: 'Volume 2: Ashen Roads', platform: 'FACEBOOK', url: 'https://facebook.com/yourpage/posts/456' }
  })
  await prisma.volume.create({
    data: { novelId: spacegoo.id, name: 'Prologue: The First Goo', platform: 'TELEGRAM', url: 'https://t.me/yourchannel/789' }
  })

  console.log('Seeded admin and sample content.')
}

main().catch(e => {
  console.error(e)
  process.exit(1)
}).finally(async () => {
  await prisma.$disconnect()
})