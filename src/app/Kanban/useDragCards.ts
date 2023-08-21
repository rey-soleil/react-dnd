import type { DropResult } from '@hello-pangea/dnd'
import { atom, useSetAtom } from 'jotai'

import { cardsAtom } from '../useCardsAtom'

const dragCardsAtom = atom(
  () => [],
  (_, set, { source: src, destination: dst }: DropResult) => {
    set(cardsAtom, (items) => {
      const srcItems = items.filter(
        (v) => v.row !== 0 && v.col === +src.droppableId,
      )

      if (src.droppableId === dst?.droppableId) {
        srcItems.splice(dst.index, 0, srcItems.splice(src.index, 1)[0])
        srcItems.forEach((v, i) => (v.row = i + 1))
      } else if (dst?.droppableId) {
        const dstItems = items.filter(
          (v) => v.row !== 0 && v.col === +dst.droppableId,
        )
        dstItems.splice(dst.index, 0, srcItems.splice(src.index, 1)[0])
        dstItems.forEach((v, i) => {
          v.row = i + 1
          v.col = +dst.droppableId
        })
      }
      return items
    })
  },
)

dragCardsAtom.debugLabel = 'dragCardsAtom'
export default function useDragCards() {
  return useSetAtom(dragCardsAtom)
}
