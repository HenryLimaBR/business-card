import type { Metadata } from 'next'
import { Fira_Sans } from 'next/font/google'

import '../styles/global.scss'

const sansFont = Fira_Sans({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin', 'latin-ext'],
  display: 'swap',
  variable: '--font-sans',
})

export const metadata: Metadata = {
  title: 'Business Card Generator',
  description: 'Generate a custom business card with qr-code.',
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className={`${sansFont.variable}`}>
      <body>
        {children}
      </body>
    </html>
  )
}