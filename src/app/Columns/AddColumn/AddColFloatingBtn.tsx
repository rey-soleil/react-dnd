'use client'

import { MdAdd } from 'react-icons/md'

import clsx from '~/lib/clsx'

import useAddCol from './useAddCol'

export default function AddColFloatingBtn() {
  const addCol = useAddCol()
  return (
    <button
      className={clsx('btn btn-lg btn-circle fixed bottom-2 right-2')}
      onClick={() => addCol()}
    >
      <MdAdd size={50} />
    </button>
  )
}
