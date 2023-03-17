'use client'
import { CardFormData, Form } from '@/components/Form'
import axios from 'axios'
import { useState } from 'react'
import { Card } from '@prisma/client'
import Image from 'next/image'
import qrcode from 'qrcode'
import { Loader2 } from 'lucide-react'

export default function HomePage() {
  const [url, setUrl] = useState<string | null>(null)
  const [qrImage, setQrImage] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const generateUrl = async (card: CardFormData) => {
    setUrl(null)
    setQrImage(null)
    setIsLoading(true)
    const { data } = await axios.post<Card>('/api/card', card)
    const url = `${window.location.protocol}//${window.location.host}/card/${data.id}`
    setIsLoading(false)
    setUrl(url)
    setQrImage(await qrcode.toDataURL(url, { width: 256 }))
  }

  return (
    <div className='w-full min-h-screen bg-zinc-500'>
      <main className='w-full flex justify-center items-center flex-col py-8 gap-8 lg:flex-row'>
        <Form
          onSubmit={generateUrl}
        />

        {
          !!isLoading && (
            <div className='px-48'>
              <span className='text-zinc-100'>
                <Loader2
                  size={64}
                  className='animate-spin'
                />
              </span>
            </div>
          )
        }

        <div className='bg-zinc-700 flex flex-col justify-center items-center rounded'>
          {
            !!qrImage && (
              < Image
                src={qrImage}
                quality={100}
                alt='QR-Code'
                width={192}
                height={192}
                className='rounded mt-4'
              />
            )
          }

          {
            !!url && (
              <a href={url} className='text-zinc-200 underline text-sm p-4'>
                <span>
                  {url}
                </span>
              </a>
            )
          }
        </div>
      </main>
    </div>
  )
}