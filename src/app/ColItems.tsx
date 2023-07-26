'use client'

import { Draggable, Droppable } from '@hello-pangea/dnd'

import clsx from '~/lib/clsx'
import type { ItemType } from '~/lib/types'

import { useItemsQuery } from './hooks/useItemsQuery'
import ItemCard from './ItemCard'

type Props = { cols: ItemType[]; idx: number }

export default function ColItems({ cols, idx }: Props) {
  const col = cols[idx]
  const { data: items = [] } = useItemsQuery(col.column)
  return (
    <div className="p-2 w-[16rem] min-h-full relative">
      <div className="z-20 sticky top-0 top-sticky">
        <ItemCard item={cols[idx]} />
      </div>

      <Droppable droppableId={col.column + ''} key={col.column}>
        {(provided, snap) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className={clsx(
              'w-full h-full mt-4 space-y-4 flex flex-col ',
              snap.isDraggingOver && 'bg-gray-400 bg-opacity-50',
            )}
          >
            {items.map((item, index) => (
              <Draggable key={item.id} draggableId={item.id} index={index}>
                {(provided) => (
                  <div
                    className={clsx('w-60 shadow-md ')}
                    ref={provided.innerRef}
                    style={{
                      ...provided.draggableProps.style,
                    }}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <ItemCard key={item.id} item={item} />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  )
}
