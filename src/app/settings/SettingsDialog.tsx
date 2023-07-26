import clsx from '~/lib/clsx'

import { useItemSelection } from '../hooks/useItemSelect'
import SettingsMenuOptions from './SettingsMenuOptions'

export default function SettingsDialog() {
  const { selection } = useItemSelection()

  const item = selection.item
  if (!item || !selection.showSettings) return null
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
        <SettingsMenuOptions item={item} />
        <div className="flex-1 flex flex-col justify-center items-center font-bold text-center">
          Settings Dialog that shouldnt zoom with the rest of the page
        </div>
      </form>
    </dialog>
  )
}
