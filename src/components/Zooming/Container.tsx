'use client'

import { ReactNode, useEffect, useState } from 'react'
import { usePinch } from '@use-gesture/react'
import { useAtom } from 'jotai'

import { zoomAtom } from './zoomAtom'

type Props = {
  children?: ReactNode
}
export default function ZoomableContainer({ children }: Props) {
  const [zoom, setZoom] = useAtom(zoomAtom)
  const [mostRecentZoom, setMostRecentZoom] = useState(1)

  // `movement` stores the offset since you started pinching.
  // Eg. if you zoom to 5, stop, and start again, movement will reset to 1.
  usePinch(
    (props) => {
      const movement = props.movement[0]

      // Did the user just reset the zoom?
      // If so, set mostRecentZoom to 1.
      // If not, multiply the most recent zoom by the movement.
      if (zoom === 1) {
        setMostRecentZoom(1)
        setZoom(movement)
      } else {
        setZoom(mostRecentZoom * movement)
      }

      // User has stopped pinching, so set most recent zoom.
      if (props.delta[0] === 0) {
        setMostRecentZoom(mostRecentZoom * movement)
      }
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
  }, [zoom])

  return (
    <div
      style={{
        transform: `scale(${zoom})`,
        transformOrigin: 'top left',
      }}
    >
      {children}
    </div>
  )
}
