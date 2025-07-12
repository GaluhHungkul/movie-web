import './globals.css'
import { Inter } from 'next/font/google'
import type { Metadata } from 'next'
import QueryProvider from '@/components/layout/QueryProvider'
import Sidebar from '@/components/layout/Sidebar'
import Footer from '@/components/layout/Footer'
import Header from '@/components/layout/Header'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: 'Movie Web',
  description: 'Best movies in one place',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <QueryProvider>
          <Header />
          <div className='flex overflow-x-hidden text-white'>
            <Sidebar />          
            <main className='bg-foreground min-h-screen w-full px-2'>
              {children}
            </main>
          </div>
          <Footer />
        </QueryProvider>
      </body>
    </html>
  )
}
