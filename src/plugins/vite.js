import { VitePWA } from 'vite-plugin-pwa'

const icon1 = new URL('../../assets/pwa-192x192.png', import.meta.url).href
const icon2 = new URL('../../assets/pwa-512x512.png', import.meta.url).href
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
            src: icon1,
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: icon2,
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }}
  )
    }
export { vitePWA }