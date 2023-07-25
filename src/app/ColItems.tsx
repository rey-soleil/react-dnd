'use client'

import { Draggable, Droppable } from '@hello-pangea/dnd'

import clsx from '~/lib/clsx'
import type { ItemType } from '~/lib/types'

import { useItemsQuery } from './hooks/useItemsQuery'
import ItemCard from './ItemCard'

type Props = { cols: ItemType[]; idx: number }

// REY: AFAIK, this only renders the header row of stickies.
// In dev tools, there are 5 ColItems components.
// cols is the same for each.
// idx is 0, 1, 2, 3, 4.
export default function ColItems({ cols, idx }: Props) {
  const col = cols[idx]
  // items stores the draggable stickies.
  // we use col.column (which I believe is the same as idx) to get items
  const { data: items = [] } = useItemsQuery(col.column)

  return (
    <div className=" w-[16rem] min-h-full relative">
      <div className="z-20 sticky top-1">
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
                    className={clsx('w-[15rem] shadow-md ')}
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
