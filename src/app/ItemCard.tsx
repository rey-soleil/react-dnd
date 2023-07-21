'use client'

import { useRef } from 'react'
import { toast } from 'sonner'

import clsx from '~/lib/clsx'
import { Icons } from '~/lib/icons'
import type { ItemType } from '~/lib/types'

import { useAddItemMutation } from './hooks/useAddItem'

type Props = {
  item: ItemType
}

export default function ItemCard({ item }: Props) {
  const divRef = useRef<HTMLDivElement>(null)
  const { mutate: addItem } = useAddItemMutation()

  return (
    <div
      className={clsx(
        'w-[16rem] p-2 flex flex-col relative text-center ',
        item.row === 0 ? 'h-[5rem]' : 'h-[10rem]',
      )}
      style={{
        boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
        backgroundColor: item.color,
      }}
    >
      <div
        ref={divRef}
        className={clsx(
          'item-card flex-1 flex cursor-move overflow-y-auto',
          'whitespace-pre-line break-words items-center justify-center ',
        )}
      >
        <p>{item.content}</p>
      </div>
      <button
        className="btn btn-xs btn-circle btn-ghost absolute bottom-1 right-1"
        onClick={() =>
          addItem({
            type: 'items',
            column: item.column,
            content: `Item ${item.column} - ${item.row + 1}`,
          })
        }
      >
        <Icons.Add />
      </button>
    </div>
  )
}
