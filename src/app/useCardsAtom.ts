import { atom, useAtomValue } from 'jotai'
import { splitAtom } from 'jotai/utils'

import { CardType } from '~/lib/types'

export const cardsAtom = atom<CardType[]>([])

cardsAtom.debugLabel = 'cardsAtom'
export default function useCardsAtom() {
  const cards = useAtomValue(cardsAtom)
  return cards
}

const colCardsAtom = splitAtom(
  atom((get) => {
    const cards = get(cardsAtom)
    const cols = cards.filter((i) => i.row === 0).sort((a, b) => a.col - b.col)
    return cols.map((col) =>
      cards.filter((i) => i.col === col.col).sort((a, b) => a.row - b.row),
    )
  }),
  (col) => col[0].col,
)

colCardsAtom.debugLabel = 'colCardsAtom'

export function useColCards(col: number) {
  const colsAtom = useAtomValue(colCardsAtom)
  return useAtomValue(colsAtom[col])
}
