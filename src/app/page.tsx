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
import SettingsDialog from './settings/SettingsDialog'

export default function BoardPage() {
  const boardRef = useRef<HTMLDivElement>(null)
  const { mutate: onDragEnd } = useDragItemMutation()
  const { mutate: addColumn } = useAddItemMutation()
  const { data: cols = [] } = useItemsQuery(-1)

  return (
    <div ref={boardRef} className="flex-1 overflow-scroll board">
      {/* NOTE: swapping order of DragDropContext and ZoomableContainer doesn't fix anything */}
      <DragDropContext onDragEnd={(r) => onDragEnd(r)}>
        <ZoomableContainer>
          <div className="flex space-x-2 p-2">
            {cols.map((col, i) => (
              <ColItems cols={cols} idx={i} key={col.id} />
            ))}
          </div>
        </ZoomableContainer>
      </DragDropContext>
      <button
        className={clsx('btn btn-lg btn-circle fixed bottom-2 right-2')}
        onClick={() => addColumn({ type: 'cols', column: cols.length, row: 0 })}
      >
        <MdAdd size={50} />
      </button>
      <SettingsDialog />
    </div>
  )
}
