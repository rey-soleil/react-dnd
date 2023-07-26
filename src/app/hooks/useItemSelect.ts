import { useQuery } from '@tanstack/react-query'

import type { ItemType } from '~/lib/types'

const itemSelection = {
  item: null as ItemType | null,
  showSettings: false,
}

export const SELECTED_ITEM_QUERY_KEY = 'selectedItem'

export function useItemSelection() {
  const { data, refetch, ...query } = useQuery(
    [SELECTED_ITEM_QUERY_KEY],
    () => itemSelection,
    {
      _defaulted: true,
      initialData: itemSelection,
    },
  )

  function showSettings(item: ItemType) {
    itemSelection.showSettings = true
    itemSelection.item = item

    refetch()
  }
  function hideSettings(item?: ItemType) {
    itemSelection.showSettings = false
    itemSelection.item = item ?? null

    refetch()
  }

  return {
    ...query,
    selection: data,
    showSettings,
    hideSettings,
  }
}
