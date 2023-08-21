'use client'

import { Toaster } from 'sonner'

type Props = {
  children: React.ReactNode
}

export default function Providers({ children }: Props) {
  return (
    <>
      {children}
      <Toaster richColors />
    </>
  )
}
