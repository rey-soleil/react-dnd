export type ItemsType = Array<Record<string, Array<ItemType>>>
export interface ItemType {
  id: string
  content: string
  column: number
  row: number
  color: string
}
