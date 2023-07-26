'use client'

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
      // Setting the zoom here doesn't affect the offset
      onClick={() => setZoom(1)}
    >
      <MdSearchOff />
    </button>
  )
}
