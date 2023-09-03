import { VitePWA } from 'vite-plugin-pwa'

function vitePWA(){
    return VitePWA({ registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'mask-icon.svg'],
      manifest: {
        name: 'QR school register',
        short_name: 'QRSchhol',
        description: 'Attendance list by using QR codes',
        theme_color: '#ffffff',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }}
  )
    }
export { vitePWA }