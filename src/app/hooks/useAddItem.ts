import { useMutation, useQueryClient } from '@tanstack/react-query'
import { nanoid } from 'nanoid'

import type { ItemType } from '~/lib/types'

type AddItemType = {
  type: 'items' | 'cols'
  column: number
  row?: number
  content?: string
  color?: string
}
export function useAddItemMutation() {
  const client = useQueryClient()

  return useMutation(async ({ type, ...input }: AddItemType) => {
    const isHeader = input.row === 0
    const newItem: ItemType = {
      id: nanoid(8),
      content: input.content ?? (isHeader ? 'New Col' : 'New Item'),
      color: isHeader ? '#FFF4BA' : '#FFFFFF',
      column: input.column,
      row: 0,
    }
    client.setQueryData<ItemType[]>(['items'], (els = []) => {
      const items = els
        .filter((v) =>
          type === 'cols'
            ? v.row === 0
            : v.column === input.column && v.row !== 0,
        )
        .sort((a, b) => (type === 'cols' ? a.column - b.column : a.row - b.row))

      newItem.row =
        type === 'cols' ? 0 : input.row ?? Math.max(1, items.length + 1)
      if (input.row) {
        items.splice(input.row - 1, 0, newItem)
        items.forEach((v, i) => (v.row = i + 1))
      }
      els.push(newItem)
      return els
    })
    client.refetchQueries(['items'])
    return newItem
  })
}
