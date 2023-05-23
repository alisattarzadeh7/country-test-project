/** @type {import('next').NextConfig} */

const nextSafe = require('next-safe')

const isDev = process.env.NODE_ENV !== 'production'


const nextConfig = {
  async headers () {
    return [
      {
        source: '/:path*',
        headers: nextSafe({ isDev,
          contentSecurityPolicy:{
            "default-src": ["'self'"],
            "img-src": ["'self'","data:","https://flagcdn.com","https://www.google-analytics.com","https://www.googletagmanager.com"],
            "connect-src":["'self'","https://flagcdn.com","https://restcountries.com","https://www.google-analytics.com","https://region1.google-analytics.com"],
            "font-src": ["'self'","data:"],
            "style-src": ["'self'","'unsafe-inline'","'unsafe-eval'" ,"'strict-dynamic'"],
            "base-uri": "'none'",
            "child-src": "'none'",
            "form-action": "'self'",
            "frame-ancestors": "'none'",
            "frame-src": ["https://maps.google.com","https://www.google.com"],
            "manifest-src": "'self'",
            "media-src": "'self'",
            "object-src": "'none'",
            "prefetch-src": "'self'",
            "script-src": ["'self'","'unsafe-inline'",'https://maps.google.com',"unsafe-eval",'https://ssl.google-analytics.com','https://www.googletagmanager.com'],
            "worker-src": "'self'",
            reportOnly: false,
          }
        }),
      },
    ]
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'flagcdn.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  output: 'standalone',
  reactStrictMode: true,
}

module.exports = nextConfig
