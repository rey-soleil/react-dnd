import { Icons } from '~/lib/icons'

import useAddCard from './useAddCard'

type Props = {
  col: number
}
export default function AddCardBtn({ col }: Props) {
  const addCard = useAddCard()
  return (
    <button
      className="btn btn-xs btn-circle btn-ghost absolute bottom-1 right-1"
      onClick={() => addCard({ col })}
    >
      <Icons.Add className="text-xl" />
    </button>
  )
}
