'use client'

import { useRef } from 'react'

type Props = {
  isHeader: boolean
}
export default function ArchiveCardBtn({ isHeader }: Props) {
  const ref = useRef<HTMLDialogElement>(null)
  return (
    <>
      <button
        className="btn btn-sm btn-outline capitalize"
        title={isHeader ? 'Archive This Column' : 'Archive This Card'}
        type="button"
        onClick={() => ref.current?.showModal()}
      >
        {`Archive This ${isHeader ? 'Column' : 'Card'}`}
      </button>
    </>
  )
}
