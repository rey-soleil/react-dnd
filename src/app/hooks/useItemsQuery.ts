import { useQuery, useQueryClient } from '@tanstack/react-query'

import { ItemType } from '~/lib/types'

export const allItems = Array<ItemType>()

export function useAllItemsQuery() {
  return useQuery(['items'], async () => {
    if (allItems.length) return allItems
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 5; j++) {
        allItems.push({
          id: `${j}-${i}`,
          content: i === 0 ? `Col ${j}` : `Item ${j}-${i}`,
          column: j,
          row: i,
          color: i === 0 ? '#FFF4BA' : '#FFFFFF',
        })
      }
    }
    return allItems
  })
}

export function useItemsQuery(idx: number) {
  const client = useQueryClient()
  const { status } = useAllItemsQuery()

  return useQuery(
    ['items', idx],
    async () => {
      const data = client.getQueryData<ItemType[]>(['items']) ?? []
      if (idx < 0) {
        return data
          .filter((i) => i.row === 0)
          .sort((a, b) => a.column - b.column)
      }
      return data!
        .filter((i) => i.column === idx && i.row !== 0)
        .sort((a, b) => a.row - b.row)
    },
    {
      enabled: status === 'success',
    },
  )
}
