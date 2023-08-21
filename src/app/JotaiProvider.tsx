'use client'

import { ReactNode, useState } from 'react'
import { createStore } from 'jotai'
import { DevTools } from 'jotai-devtools'
import { Provider } from 'jotai/react'

import { CardType } from '~/lib/types'

import { cardsAtom } from './useCardsAtom'

type Props = {
  children?: ReactNode
  initCards: CardType[]
}
export default function JotaiProvider({ initCards, children }: Props) {
  const [store] = useState(() => createStore())
  store.set(cardsAtom, initCards)
  return (
    <Provider store={store}>
      {children}
      <DevTools store={store} />
    </Provider>
  )
}
