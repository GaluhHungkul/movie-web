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
      <body className='bg-foreground text-white px-2 lg:px-8'>
        <QueryProvider>
          <Header />
          <main className=' min-h-screen w-full  py-4 overflow-x-hidden   '>
            {children}
          </main>
          <Footer />
        </QueryProvider>
      </body>
    </html>
  )
}
