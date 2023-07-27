'use client'

import { useRef } from 'react'
import { useAtom } from 'jotai'
import { MdMoreVert } from 'react-icons/md'

import { zoomAtom } from '~/components/Zooming/zoomAtom'
import clsx from '~/lib/clsx'
import { Icons } from '~/lib/icons'
import type { ItemType } from '~/lib/types'

import { useAddItemMutation } from './hooks/useAddItem'
import { useItemSelection } from './hooks/useItemSelect'

type Props = {
  item: ItemType
  isBeingDragged?: boolean
}

export default function ItemCard({ item, isBeingDragged }: Props) {
  const [zoom, setZoom] = useAtom(zoomAtom)
  const divRef = useRef<HTMLDivElement>(null)
  const { mutate: addItem } = useAddItemMutation()
  const { showSettings } = useItemSelection()
  const isHeader = item.row === 0
  return (
    <div
      className={clsx('p-2 flex flex-col relative text-center ')}
      style={{
        boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
        backgroundColor: item.color,
        // NOTE: if the ItemCard is being dragged, its parent is NOT ZoomableContainer,
        // which means we have to manually apply zoom by scaling its width and height.
        width: `${16 * (isBeingDragged ? zoom : 1)}rem`,
        height: `${(isHeader ? 5 : 10) * (isBeingDragged ? zoom : 1)}rem`,
      }}
    >
      <div
        ref={divRef}
        className={clsx(
          'item-card flex-1 flex cursor-move overflow-y-auto',
          'whitespace-pre-line break-words items-center justify-center ',
        )}
        style={{
          transform: `scale(${isBeingDragged ? zoom : 1})`,
        }}
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
