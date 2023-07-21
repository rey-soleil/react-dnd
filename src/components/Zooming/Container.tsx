import { ReactNode, useEffect } from 'react'
import { usePinch } from '@use-gesture/react'
import { useAtom } from 'jotai'

import { zoomAtom } from './zoomAtom'

type Props = {
  children?: ReactNode
}
export default function ZoomableContainer({ children }: Props) {
  const [zoom, setZoom] = useAtom(zoomAtom)
  usePinch(
    ({ offset: [d] }) => {
      setZoom(d)
    },
    {
      target: typeof document !== 'undefined' ? document : undefined,
      pointer: { touch: true },
      pinchOnWheel: true,
      eventOptions: {
        passive: false,
      },
    },
  )

  useEffect(() => {
    const handler = (e: Event) => e.preventDefault()
    document.addEventListener('gesturestart', handler)
    document.addEventListener('gesturechange', handler)
    document.addEventListener('gestureend', handler)
    return () => {
      document.removeEventListener('gesturestart', handler)
      document.removeEventListener('gesturechange', handler)
      document.removeEventListener('gestureend', handler)
    }
  }, [])
  return (
    <div
      style={{
        transform: `scale(${zoom})`,
        transformOrigin: 'top left',
        // zoom: isVisible ? 1 : zoom,
      }}
    >
      {children}
    </div>
  )
}
