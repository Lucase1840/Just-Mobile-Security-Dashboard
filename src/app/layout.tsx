import { type Metadata } from 'next'
import { Inter } from 'next/font/google'
import { type ReactNode } from 'react'

import { Toaster } from 'sonner'

import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Just-Mobile-Security',
  description: 'App testing platform',
}

interface RootLayoutProps {
  children: ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        {children}
        <Toaster position='top-right' />
      </body>
    </html>
  )
}
