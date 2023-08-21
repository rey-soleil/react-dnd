import { forwardRef } from 'react'

import useArchiveCard from './useArchiveCard'

type Props = {
  isHeader: boolean
}
const ArchiveCardConfirmDialog = forwardRef<HTMLDialogElement, Props>(
  ({ isHeader }, ref) => {
    const { archiveCard } = useArchiveCard()
    return (
      <dialog ref={ref} className="modal modal-open ">
        <form
          className="modal-box absolute top-[8rem] w-[20rem] flex flex-col"
          onSubmit={() => archiveCard()}
        >
          <h3 className="text-center text-lg mb-6 flex-1">
            <span className="block">Are you sure?</span>
            <span>
              {isHeader
                ? 'Note: the current archived status of each card in this column will be preserved.'
                : 'Note: This card will move to the bottom.'}
            </span>
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
              Archive
            </button>
          </div>
        </form>
      </dialog>
    )
  },
)

ArchiveCardConfirmDialog.displayName = 'ArchiveCardConfirmDialog'

export default ArchiveCardConfirmDialog
