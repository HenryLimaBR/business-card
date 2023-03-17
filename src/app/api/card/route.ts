import { getDb } from '@/services/db'
import { z } from 'zod'

let db = getDb()

const cardSchema = z.object({
  name: z.string(),
  about: z.string(),
  links: z.array(z.string()),
})

export async function POST(req: Request) {
  const raw = await req.json() as { name: string, about: string, links: { name: string, url: string }[]}

  const body = {
    name: raw.name,
    about: raw.about,
    links: raw.links.map(link => JSON.stringify(link))
  }

  const { name, about, links } = cardSchema.parse(body)

  if (!db) db = getDb()

  const card = await db.card.create({
    data: { name, about, links }
  })

  return new Response(JSON.stringify(card), { status: 201 })
}