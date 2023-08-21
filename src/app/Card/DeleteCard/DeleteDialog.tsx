import { forwardRef } from 'react'

import useDeleteCard from './useDeleteCard'

type Props = {
  isHeader: boolean
}
const DeleteCardConfirmDialog = forwardRef<HTMLDialogElement, Props>(
  ({ isHeader }, ref) => {
    const deleteCard = useDeleteCard()
    return (
      <dialog ref={ref} className="modal modal-open ">
        <form
          className="modal-box absolute top-[8rem] w-[20rem] flex flex-col"
          onSubmit={() => deleteCard()}
        >
          <h3 className="text-center text-lg mb-6 flex-1">
            {isHeader
              ? 'Are you sure? Deleting this column also deletes all cards in the column and cannot be undone.'
              : 'Are you sure? Deleting this card cannot be undone.'}
          </h3>
          <div className="flex space-x-2 justify-center">
            <button
              className="btn btn-sm "
              // @ts-expect-error
              onClick={() => ref?.current?.close()}
              type="button"
            >
              Cancel
            </button>
            <button
              className="btn btn-sm btn-outline"
              aria-label="Delete This Card"
            >
              Delete
            </button>
          </div>
        </form>
      </dialog>
    )
  },
)

DeleteCardConfirmDialog.displayName = 'DeleteCardConfirmDialog'

export default DeleteCardConfirmDialog
