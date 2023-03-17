import { Plus } from 'lucide-react'
import React, { useState } from 'react'
import { OptionsItem } from './FormOptionsItem'

interface OptionsWrapperProps { }

export const OptionsWrapper: React.FC<OptionsWrapperProps> = () => {
  const [fields, setFields] = useState<string[]>(['initial-field'])

  const addField = () => {
    setFields(prev => [...prev, window.crypto.randomUUID()])
  }

  const removeField = (id: string) => {
    setFields(prev => [...prev.filter(field => field !== id)])
  }

  return (
    <div className='flex flex-col justify-center items-center gap-2'>
      {
        fields && fields.map((uuid, index) => (
          <OptionsItem
            key={uuid}
            removeField={removeField}
            id={uuid}
          />
        ))
      }

      <button
        type='button'
        className='text-zinc-200 flex justify-center items-center gap-2 group px-1 py-1 bg-zinc-500 hover:bg-zinc-400 rounded transition-colors outline-none'
        title='Add a new Link field'
        onClick={() => addField()}
      >
        <Plus
          size={16}
        />
      </button>
    </div>
  )
}