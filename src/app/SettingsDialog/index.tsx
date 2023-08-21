'use client'

import { MdClose } from 'react-icons/md'

import clsx from '~/lib/clsx'

import DeleteCardBtn from '../Card/DeleteCard/DeleteCardBtn'
import ArchiveCardBtn from './ArchiveCard/ArchiveCardBtn'
import useToggleSettings from './useToggleSettings'

export default function SettingsDialog() {
  const { showSettings, selectedCard, toggleSettings } = useToggleSettings()

  if (!showSettings || !selectedCard) return null
  const isHeader = selectedCard.row == 0

  return (
    <dialog open={true} id="SettingsDialog" className="modal pt-[3rem] pb-8">
      <form
        className={clsx(
          'p-4 h-[95svh] w-fit overflow-y-auto',
          'flex flex-col',
          'bg-base-100 border-2 border-neutral ',
        )}
        method="dialog"
      >
        <div className="flex justify-end space-x-2">
          <h3 className="modal-title">Settings</h3>
          <div className="flex-1" />
          <ArchiveCardBtn isHeader={isHeader} />
          <DeleteCardBtn isHeader={isHeader} />
          <button
            className="btn btn-sm btn-circle"
            onClick={() => toggleSettings()}
          >
            <MdClose />
          </button>
        </div>
        <div className="flex-1 flex flex-col justify-center items-center font-bold text-center">
          Settings Dialog that shouldnt zoom with the rest of the page
        </div>
      </form>
    </dialog>
  )
}
