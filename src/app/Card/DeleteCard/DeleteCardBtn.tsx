'use client'

import { useRef } from 'react'
import { MdDelete } from 'react-icons/md'

type Porps = {
  isHeader: boolean
}
export default function DeleteCardBtn({ isHeader }: Porps) {
  const ref = useRef<HTMLDialogElement>(null)

  return (
    <button
      className="btn btn-sm btn-circle"
      title={isHeader ? 'Delete This Column' : 'Delete This Card'}
      type="button"
      onClick={() => ref.current?.showModal()}
    >
      <MdDelete size={20} />
    </button>
  )
}
