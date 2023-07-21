const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
})

/**
 * @link https://nextjs.org/docs/api-reference/next.config.js/introduction
 * @type {import('next').NextConfig}*/
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['mukunnuuulanqrbqqqgq.supabase.co'],
  },
}
module.exports = withPWA(nextConfig)
