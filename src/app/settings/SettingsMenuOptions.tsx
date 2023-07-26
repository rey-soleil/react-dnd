import { useState } from 'react'
import { MdClose, MdDelete } from 'react-icons/md'
import { useKeyPressEvent } from 'react-use'

import { ItemType } from '~/lib/types'

import { useItemSelection } from '../hooks/useItemSelect'

type Props = { item: ItemType }

export default function SettingsMenuOptions({ item }: Props) {
  const [delDialog, setDelDialog] = useState(false)
  const [archDialog, setArchDialog] = useState(false)
  const { hideSettings } = useItemSelection()
  function onClose() {}
  function onDelete() {
    onDiscard()
  }
  function onArchive() {
    onDiscard()
  }
  function onDiscard() {
    archDialog && setArchDialog(false)
    delDialog && setDelDialog(false)
    onClose()
  }
  const isCol = item.row == 0
  return (
    <>
      <div className="flex justify-end space-x-2">
        <h3 className="modal-title">Settings</h3>
        <div className="flex-1" />
        <button
          className="btn btn-sm btn-outline capitalize"
          title={isCol ? 'Archive This Column' : 'Archive This Card'}
          type="button"
          onClick={() => {
            setArchDialog(true)
          }}
        >
          {`Archive This ${isCol ? 'Column' : 'Card'}`}
        </button>
        <button
          className="btn btn-sm btn-circle"
          title={isCol ? 'Delete This Column' : 'Delete This Card'}
          type="button"
          onClick={() => setDelDialog(true)}
        >
          <MdDelete size={20} />
        </button>

        <button
          className="btn btn-sm btn-circle"
          onClick={() => hideSettings()}
        >
          <MdClose />
        </button>
      </div>
      {delDialog && (
        <dialog open={true} className="w- modal modal-open">
          <div className="modal-box absolute top-[8rem] w-[20rem] flex flex-col">
            <h3 className="text-center text-lg mb-6 flex-1">
              {item.row == 0
                ? 'Are you sure? Deleting this column also deletes all cards in the column and cannot be undone.'
                : 'Are you sure? Deleting this card cannot be undone.'}
            </h3>
            <div className="flex space-x-2 justify-center">
              <button
                className="btn btn-sm "
                onClick={() => setDelDialog(false)}
                type="button"
              >
                Cancel
              </button>
              <button
                className="btn btn-sm btn-outline"
                aria-label="Delete This Card"
                onClick={onDelete}
                type="button"
              >
                Delete
              </button>
            </div>
          </div>
        </dialog>
      )}
      {archDialog && (
        <div className="modal modal-open ">
          <div className="modal-box absolute top-[8rem] w-[20rem] flex flex-col">
            <h3 className="text-center text-lg mb-6 flex-1">
              <span className="block">Are you sure?</span>
              <span>
                {item.row == 0
                  ? 'Note: the current archived status of each card in this column will be preserved.'
                  : 'Note: This card will move to the bottom.'}
              </span>
            </h3>
            <div className="flex space-x-2 justify-center">
              <button
                className="btn btn-sm "
                onClick={() => setArchDialog(false)}
                type="button"
              >
                Cancel
              </button>
              <button
                className="btn btn-sm btn-outline"
                aria-label="Delete This Card"
                onClick={onArchive}
                type="button"
              >
                {'Archive'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
