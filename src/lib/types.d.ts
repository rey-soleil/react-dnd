export type CardsType = Array<Record<string, Array<CardType>>>
export interface CardType {
  id: string
  content: string
  col: number
  row: number
  color: string
}
