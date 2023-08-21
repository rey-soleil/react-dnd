import { nanoid } from 'nanoid'

import { CardType } from '~/lib/types'

export async function fetchCards() {
  const cards = Array<CardType>()
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 1; j++) {
      cards.push({
        id: nanoid(8),
        content: i === 0 ? `Col ${j}` : `Item ${j}-${i}`,
        col: j,
        row: i,
        color: i === 0 ? '#FFF4BA' : '#FFFFFF',
      })
    }
  }
  return cards
}
