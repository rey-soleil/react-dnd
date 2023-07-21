import { useAtom } from 'jotai'
import { MdSearchOff } from 'react-icons/md'

import { zoomAtom } from './zoomAtom'

export function ResetZoomBtn() {
  const [zoom, setZoom] = useAtom(zoomAtom)
  if (zoom === 1) return null
  return (
    <button
      title="Reset Zoom"
      className="btn btn-sm"
      onClick={() => setZoom(1)}
    >
      <MdSearchOff />
    </button>
  )
}
