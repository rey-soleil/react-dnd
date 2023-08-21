'use client'

import { DragDropContext } from '@hello-pangea/dnd'

import Column from '../Columns/Column'
import useColsAtom from '../Columns/useColsAtom'
import useCardsAtom from '../useCardsAtom'
import useDragCards from './useDragCards'

export default function KanbanBoard() {
  const dragCards = useDragCards()
  const cols = useColsAtom()

  return (
    <div className="flex space-x-2 p-2">
      <DragDropContext onDragEnd={(r) => dragCards(r)}>
        {cols.map((col) => (
          <Column col={col} key={col.col} />
        ))}
      </DragDropContext>
    </div>
  )
}
