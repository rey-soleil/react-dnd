'use client'

import { useRef } from 'react'
import { MdMenu, MdMore, MdMoreVert, MdOutlineMoreHoriz } from 'react-icons/md'

import clsx from '~/lib/clsx'
import { Icons } from '~/lib/icons'
import type { ItemType } from '~/lib/types'

import { useAddItemMutation } from './hooks/useAddItem'
import { useItemSelection } from './hooks/useItemSelect'

type Props = {
  item: ItemType
}

export default function ItemCard({ item }: Props) {
  const divRef = useRef<HTMLDivElement>(null)
  const { mutate: addItem } = useAddItemMutation()
  const { showSettings } = useItemSelection()
  const isHeader = item.row === 0
  return (
    <div
      className={clsx(
        'max-w-[16rem] min-w-[16rem] p-2 flex flex-col relative text-center ',
        isHeader ? 'h-[5rem]' : 'h-[10rem]',
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
      {isHeader && (
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
          <Icons.Add className="text-xl" />
        </button>
      )}
      <button
        className="btn btn-xs btn-circle btn-ghost absolute top-1 right-1"
        onClick={() => showSettings(item)}
      >
        <MdMoreVert className="text-xl" />
      </button>
    </div>
  )
}
