'use client'

import { useRef } from 'react'
import { DragDropContext } from '@hello-pangea/dnd'
import { MdAdd } from 'react-icons/md'

import ZoomableContainer from '~/components/Zooming/Container'
import clsx from '~/lib/clsx'

import ColItems from './ColItems'
import { useAddItemMutation } from './hooks/useAddItem'
import { useDragItemMutation } from './hooks/useDragItem'
import { useItemsQuery } from './hooks/useItemsQuery'
import SettingsDialog from './Settings'

export default function BoardPage() {
  const boardRef = useRef<HTMLDivElement>(null)
  const { mutate: onDragEnd } = useDragItemMutation()
  const { mutate: addColumn } = useAddItemMutation()
  const { data: cols = [] } = useItemsQuery(-1)

  return (
    <div
      ref={boardRef}
      className="absolute top-[3.5rem] left-0 right-0 bottom-0 overflow-scroll "
    >
      <ZoomableContainer>
        <div className="flex space-x-2 py-2">
          <DragDropContext onDragEnd={(r) => onDragEnd(r)}>
            {cols.map((col, i) => (
              <ColItems cols={cols} idx={i} key={col.id} />
            ))}
          </DragDropContext>
        </div>
      </ZoomableContainer>
      <button
        className={clsx('btn btn-lg btn-circle fixed bottom-2 right-2')}
        onClick={() => addColumn({ type: 'cols', column: cols.length })}
      >
        <MdAdd size={50} />
      </button>
      <SettingsDialog />
    </div>
  )
}
