import type { LinkURL } from '@/components/Form'
import { getDb } from '@/services/db'
import { formatDistance } from 'date-fns'
import { Eye } from 'lucide-react'

interface CardPageProps {
  params: {
    uuid: string
  }
}

async function getCard(uuid: string) {
  let db = getDb()

  let card = await db.card.findUniqueOrThrow({
    where: {
      id: uuid
    }
  })

  await db.card.update({
    where: { id: card.id },
    data: { views: card.views + 1 },
  })

  return card
}

export default async function CardPage({ params }: CardPageProps) {
  const { name, about, links, createdAt, views } = await getCard(params.uuid)

  return (
    <div className='w-full min-h-screen bg-zinc-500'>

      <main className='w-full flex justify-center items-center flex-col md:p-8 gap-8'>

        <div className='flex flex-col md:bg-zinc-700 p-8 md:rounded justify-center items-center gap-4'>

          <h1 className='text-2xl text-zinc-100'>
            {name}
          </h1>

          <p className='text-zinc-100 text-center max-w-lg'>
            {about}
          </p>

          <div className='grid grid-cols-2 md:grid-cols-3 gap-2'>
            {
              links
                .map(link => JSON.parse(link) as LinkURL)
                .map((link, i) => (
                  <a
                    key={i}
                    className='flex justify-center items-center truncate'
                    title={`${name}'s ${link.name}`}
                    href={link.url}
                    target='_blank'
                  >
                    <button className='bg-zinc-300 w-full px-2 py-1 rounded font-semibold'>
                      {link.name}
                    </button>
                  </a>
                ))
            }
          </div>

          <div className='text-zinc-100 flex gap-1 justify-center items-center'>

            <span className='font-light text-zinc-100 text-xs'>
              {`Created ${formatDistance(createdAt, Date.now(), { addSuffix: true, includeSeconds: true })}`}
            </span>

            <span> | </span>

            <Eye
              size={18}
            />

            <span className='font-bold text-xs'>
              {views}
            </span>

          </div>

        </div>

      </main>

    </div>
  )
}