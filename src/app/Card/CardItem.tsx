'use client'

import { useMemo, useRef } from 'react'
import { useAtom } from 'jotai'
import { MdMoreVert } from 'react-icons/md'

import { zoomAtom } from '~/components/Zooming/zoomAtom'
import clsx from '~/lib/clsx'
import type { CardType } from '~/lib/types'

import useToggleSettings from '../SettingsDialog/useToggleSettings'
import AddCardBtn from './AddCard/AddCardBtn'

type Props = {
  item: CardType
  isBeingDragged?: boolean
}

export default function CardItem({ item, isBeingDragged }: Props) {
  const [zoom, setZoom] = useAtom(zoomAtom)
  const divRef = useRef<HTMLDivElement>(null)
  const { toggleSettings } = useToggleSettings()
  const isHeader = item.row === 0

  const scalingFactor = useMemo(
    () => (isBeingDragged ? zoom : 1),
    [isBeingDragged, zoom],
  )

  return (
    <div
      className="p-2 flex flex-col relative text-center "
      style={{
        boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
        backgroundColor: item.color,
        width: `${scalingFactor * 16}rem`,
        height: `${scalingFactor * (isHeader ? 5 : 10)}rem`,
      }}
    >
      <div
        ref={divRef}
        className={clsx(
          'item-card flex-1 flex cursor-move overflow-y-auto',
          'whitespace-pre-line break-words items-center justify-center ',
        )}
        style={{
          transform: `scale(${scalingFactor})`,
        }}
      >
        <p>{item.content}</p>
      </div>
      {isHeader && <AddCardBtn col={item.col} />}
      {!isBeingDragged && (
        <button
          className="btn btn-xs btn-circle btn-ghost absolute top-1 right-1"
          onClick={() => toggleSettings(item)}
        >
          <MdMoreVert className="text-xl" />
        </button>
      )}
    </div>
  )
}
