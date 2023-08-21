import { atom, useAtom } from 'jotai'

import type { CardType } from '~/lib/types'

const selectCardAtom = atom<CardType | null | undefined>(null)
selectCardAtom.debugLabel = 'selectCardAtom'

export function useSelectCard() {
  const [selectedCard, setSelectedCard] = useAtom(selectCardAtom)

  function selectCard(card?: CardType) {
    setSelectedCard(card)
  }
  return {
    selectedCard,
    selectCard,
  }
}
