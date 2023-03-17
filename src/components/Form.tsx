import React, { FormEvent } from 'react'
import { QrCode } from 'lucide-react'
import { OptionsWrapper } from '@/components/FormOptionsWrapper'

export type LinkURL = { name: string, url: string }

export interface CardFormData {
  name: string
  about: string
  links: LinkURL[]
}

interface FormProps {
  onSubmit: (value: CardFormData) => void
}

export const Form: React.FC<FormProps> = ({ onSubmit }) => {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const data = Array.from(formData.entries())
    const { name, about } = Object.fromEntries(data.splice(0, 2)) as { name: string, about: string }
    const links = data.map(([name, url]) => ({ name, url })) as LinkURL[]
    onSubmit({ name, about, links })
  }

  return (
    <form
      className='flex flex-col justify-center items-center gap-2 bg-zinc-700 p-8 rounded'
      onSubmit={handleSubmit}
    >
      <h1 className='text-zinc-100 text-2xl select-none font-extralight'>
        Business Card QR-CODE/Link Generator
      </h1>

      <div className='flex justify-center items-center bg-zinc-400 h-8 rounded overflow-hidden'>
        <label htmlFor='Name' className='px-2 text-zinc-100 select-none'>
          Name
        </label>

        <input
          className='h-full outline-none p-2 bg-zinc-500 text-zinc-100 placeholder:text-zinc-300'
          type="text"
          id='name'
          name='name'
          placeholder='Your name'
          required
        />
      </div>

      <div className='p-2 bg-zinc-400 rounded'>
        <h3 className='text-zinc-100'>
          About You:
        </h3>
        <textarea
          name="about"
          id="about"
          cols={30}
          rows={5}
          placeholder='Type something about you.'
          className='p-2 rounded bg-zinc-500 text-zinc-100 placeholder:text-zinc-300 resize-none outline-none'
          required
        />
      </div>

      <div>
        <h3 className='text-md text-zinc-100'>
          Your Links
        </h3>
        <OptionsWrapper />
      </div>

      <button
        type='submit'
        title='Create QR-CODE/URL'
        className='bg-zinc-100 p-2 mt-4 rounded flex justify-center items-center gap-2 hover:bg-zinc-400 transition-colors'
      >
        <QrCode
          size={20}
        />

        <span className='font-bold'>
          Create Link / Qr-Code
        </span>
      </button>
    </form>
  )
}