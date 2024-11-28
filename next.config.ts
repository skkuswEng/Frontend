import type { NextConfig } from 'next'
import withPWA from 'next-pwa'

const nextConfig: NextConfig = {
  // reactStrictMode: true,
  /* config options here */
}

export default withPWA({
  ...nextConfig,
  dest: 'public',
  register: true,
  skipWaiting: true,
  customWorkerDir: 'worker',
  sw: '/firebase-messaging-sw.js',
  disable: false,
})

// import type { NextConfig } from 'next'

// const nextConfig: NextConfig = {
//   /* config options here */
// }

// export default nextConfig
