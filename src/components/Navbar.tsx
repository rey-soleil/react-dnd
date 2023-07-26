'use client'

import { MdSettings } from 'react-icons/md'

import AppLogo from '~/components/AppLogo'

import { ResetZoomBtn } from './Zooming/ResetZoom'

export default function Navbar() {
  return (
    <nav className="w-screen h-[3rem] flex space-x-1 fixed z-20 bg-base-100 items-center border-b-[1px]">
      <div className="flex-1">
        <AppLogo />
      </div>

      <ResetZoomBtn />
      <div className="flex-1"></div>
    </nav>
  )
}
