import { MdClose } from 'react-icons/md'

export default function SettingsDialog() {
  return (
    <dialog id="SettingsDialog" className="modal pt-[3rem] pb-8">
      <div className="modal-box h-[80%] flex flex-col">
        <div className="flex justify-between items-center">
          <h3 className="modal-title">Settings</h3>
          <button
            className="btn btn-sm btn-circle"
            onClick={() => {
              //@ts-ignore
              window.SettingsDialog.close()
            }}
          >
            <MdClose />
          </button>
        </div>
        <div className="flex-1 flex flex-col justify-center items-center font-bold text-center">
          Settings Dialog that shouldnt zoom with the rest of the page
        </div>
      </div>
    </dialog>
  )
}
