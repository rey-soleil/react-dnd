import { Metadata } from 'next'

import siteConfig from './config'

export const rootMetadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
  applicationName: siteConfig.name,
  metadataBase: new URL(siteConfig.baseURL),
  appleWebApp: {
    capable: true,
    title: siteConfig.name,
    statusBarStyle: 'default',
  },
  formatDetection: {
    telephone: false,
  },
  themeColor: '#FFFFFF',
  manifest: '/manifest.json',
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    type: 'website',
    url: siteConfig.baseURL,
    images: ['/images/logo.png'],
  },
  twitter: {
    title: siteConfig.twitter,
    card: 'summary_large_image',
    site: siteConfig.twitter,
    creator: siteConfig.twitter,
    description: siteConfig.description,
    images: ['/images/logo.png'],
  },
  icons: [
    { rel: 'apple-touch-icon', url: '/icons/ios/100.png' },
    { rel: 'shortcut icon', url: '/favicon.svg' },
  ],
}
