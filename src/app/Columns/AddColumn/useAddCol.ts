import { atom, useSetAtom } from 'jotai'
import { nanoid } from 'nanoid'

import { cardsAtom } from '../../useCardsAtom'

const addColAtom = atom(
  () => '',
  (_, set) => {
    set(cardsAtom, (els) => {
      const cols = els.filter((v) => v.row === 0).sort((a, b) => a.col - b.col)
      const col = cols.length ? cols[cols.length - 1].col + 1 : 0
      const newCol = {
        id: nanoid(8),
        content: 'New Col',
        color: '#FFF4BA',
        col,
        row: 0,
      }

      return [...els, newCol]
    })
  },
)

addColAtom.debugLabel = 'addColAtom'
export default function useAddCol() {
  return useSetAtom(addColAtom)
}
