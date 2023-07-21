'use client'

import { useState } from 'react'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Toaster } from 'sonner'

import { newQueryClient } from '~/lib/react-query'

type Props = {
  children: React.ReactNode
}

export default function Providers({ children }: Props) {
  const [queryClient] = useState(newQueryClient())

  return (
    <>
      <QueryClientProvider client={queryClient}>
        {children}
        <ReactQueryDevtools />
      </QueryClientProvider>
      <Toaster richColors />
    </>
  )
}
