'use client'

import { useEffect, useState } from 'react'
import { Draggable, Droppable } from '@hello-pangea/dnd'
import { useAtom } from 'jotai'

import { zoomAtom } from '~/components/Zooming/zoomAtom'
import clsx from '~/lib/clsx'
import type { ItemType } from '~/lib/types'

import { useItemsQuery } from './hooks/useItemsQuery'
import ItemCard from './ItemCard'

type Props = { cols: ItemType[]; idx: number }

export default function ColItems({ cols, idx }: Props) {
  const col = cols[idx]
  const { data: items = [] } = useItemsQuery(col.column)
  const [zoom, setZoom] = useAtom(zoomAtom)
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>()

  // NOTE: find a better way to do this that doesn't eat up CPU
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePos({ x: event.clientX, y: event.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <div className=" w-[16rem] min-h-full relative">
      <div className="z-20 sticky top-1 top-sticky">
        <ItemCard item={cols[idx]} />
      </div>

      <Droppable
        droppableId={col.column + ''}
        key={col.column}
        // NOTE: using renderClone renders a copy of the ItemCard directly under the cursor.
        renderClone={(provided, snapshot, rubric) => (
          <div
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            // NOTE: setting transform scale makes the card the proper size.
            // NOTE: setting left and top to mousePos makes the card follow the mouse.
            // PROBLEM: the card is now impossible to drop :(
            style={{
              ...provided.draggableProps.style,
              transform: `scale(${zoom})`,
              left: mousePos!.x,
              top: mousePos!.y,
            }}
          >
            <ItemCard
              key={items[rubric.source.index].id}
              item={items[rubric.source.index]}
            />
          </div>
        )}
      >
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
                    // NOTE: setting transform none just makes the card impossible to drag
                    className={clsx('w-[15rem] shadow-md')}
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
