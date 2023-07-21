import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'

import Providers from '~/app/Providers'
import Navbar from '~/components/Navbar'
import clsx from '~/lib/clsx'

import '~/lib/global.css'

export const runtime = 'edge'

const font = Inter({
  subsets: ['latin'],
  style: ['normal'],
})

type Props = {
  children: React.ReactNode
}
export default function RootLayout({ children }: Props) {
  return (
    <html lang="en" className={clsx(font.className)}>
      <body className={font.className}>
        <Providers>
          <Navbar />
          {children}
        </Providers>
        <Analytics />
      </body>
    </html>
  )
}
