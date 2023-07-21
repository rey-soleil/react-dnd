import type { DropResult } from '@hello-pangea/dnd'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { ItemType } from '~/lib/types'

export function useDragItemMutation() {
  const client = useQueryClient()

  return useMutation(async ({ source: src, destination: dst }: DropResult) => {
    if (!dst) return
    client.setQueryData<ItemType[]>(['items'], (items = []) => {
      const srcItems = items.filter(
        (v) => v.row !== 0 && v.column === +src.droppableId,
      )

      if (src.droppableId === dst.droppableId) {
        srcItems.splice(dst.index, 0, srcItems.splice(src.index, 1)[0])
        srcItems.forEach((v, i) => (v.row = i + 1))
      } else {
        const dstItems = items.filter(
          (v) => v.row !== 0 && v.column === +dst.droppableId,
        )
        dstItems.splice(dst.index, 0, srcItems.splice(src.index, 1)[0])
        dstItems.forEach((v, i) => {
          v.row = i + 1
          v.column = +dst.droppableId
        })
      }
      return items
    })

    client.invalidateQueries(['items', +src.droppableId])
    if (dst.droppableId !== src.droppableId)
      client.invalidateQueries(['items', +dst.droppableId])
  })
}
