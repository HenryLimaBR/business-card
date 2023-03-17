import { Trash2 } from 'lucide-react'
import { useState } from 'react'

interface OptionsItemProps {
  id: string
  removeField: (id: string) => void
}

export const OptionsItem: React.FC<OptionsItemProps> = ({ id, removeField }) => {
  const [name, setName] = useState('')

  return (
    <div className='flex h-8 rounded overflow-hidden text-zinc-100 animate-fadein'>
      <input
        type='text'
        title='Button Name'
        className='w-32 h-full outline-none bg-zinc-400 p-2 text-center placeholder:text-zinc-700 font-bold'
        onInput={(e) => setName(e.currentTarget.value)}
        placeholder='Link name'
        required
      />

      <input
        type='url'
        title='Button URL'
        className='w-48 h-full outline-none bg-zinc-500 p-2 placeholder:text-zinc-300'
        name={name}
        placeholder='Link name'
        required
      />

      <button
        type='button'
        className='bg-zinc-500 p-1 hover:bg-red-400 border-zinc-600 border-l-[0.125rem] transition-colors outline-none'
        title='Delete this field'
        onClick={() => removeField(id)}
      >
        <Trash2
          size={14}
        />
      </button>

    </div>
  )
}