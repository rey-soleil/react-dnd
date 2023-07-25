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

    const board = document.querySelector('.board')
    const stickies = document.querySelectorAll(
      '.top-sticky',
    ) as NodeListOf<HTMLElement>

    // Manually set the top of the sticky notes after a zoom or scroll.
    const setTop = () => {
      if (!board) return
      let offset = board.scrollTop - board.scrollTop / zoom
      stickies.forEach((sticky) => (sticky.style.top = `${-offset}px`))
    }

    board?.addEventListener('scroll', setTop)

    // Cleanup
    return () => {
      document.removeEventListener('gesturestart', handler)
      document.removeEventListener('gesturechange', handler)
      document.removeEventListener('gestureend', handler)
      board?.removeEventListener('scroll', setTop)
    }
  }, [zoom]) // adding zoom as dependency since setTop uses it

  return (
    <div
      style={{
        transform: `scale(${zoom})`,
        transformOrigin: 'top left',
        // zoom: isVisible ? 1 : zoom, // commented out, unsure if you want this?
      }}
    >
      {children}
    </div>
  )
}
