import { atom, useSetAtom } from 'jotai'
import { nanoid } from 'nanoid'

import { CardType } from '~/lib/types'

import { cardsAtom } from '../../useCardsAtom'

type AddCardType = {
  col: number
  row?: number
}
const addCardAtom = atom(
  () => '',
  (get, set, { col, row }: AddCardType) => {
    const allCards = get(cardsAtom)
    const cards = allCards
      .filter((v) => v.col === col)
      .sort((a, b) => a.row - b.row)

    const newCard: CardType = {
      id: nanoid(8),
      content: 'New Card',
      color: '#FFFFF',
      col,
      row: cards[cards.length - 1].row + 1,
    }
    if (row) {
      cards.splice(row - 1, 0, newCard)
      cards.forEach((v, i) => (v.row = i + 1))
    }
    set(cardsAtom, [...allCards, newCard])
  },
)

addCardAtom.debugLabel = 'addCardAtom'
export default function useAddCard() {
  return useSetAtom(addCardAtom)
}
