'use client'

import { Draggable, Droppable } from '@hello-pangea/dnd'

import clsx from '~/lib/clsx'
import type { CardType } from '~/lib/types'

import CardItem from '../Card/CardItem'
import { useColCards } from '../useCardsAtom'

type Props = { col: CardType }

export default function Column({ col }: Props) {
  const cards = useColCards(col.col).slice(1)
  return (
    <div className=" w-[16rem] min-h-full relative">
      <div className="z-20 sticky top-1 top-sticky">
        <CardItem item={col} />
      </div>

      <Droppable droppableId={col.col + ''} key={col.col}>
        {(provided, snap) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className={clsx(
              'mt-4 flex h-full w-full flex-col space-y-4 px-2 ',
              snap.isDraggingOver && 'bg-gray-400 bg-opacity-50',
            )}
          >
            {cards.map((card, index) => (
              <Draggable key={card.id} draggableId={card.id} index={index}>
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
                    <CardItem key={card.id} item={card} />
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
