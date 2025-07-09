import './globals.css'
import { Inter } from 'next/font/google'
import type { Metadata } from 'next'
import QueryProvider from '@/components/layout/QueryProvider'
import Sidebar from '@/components/layout/Sidebar'
import Footer from '@/components/layout/Footer'

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
        <div className='flex'>
        <Sidebar />
        <main className='flex-6 bg-foreground'>
            {children}
            <Footer />
        </main>
        </div>
    </QueryProvider>
      </body>
    </html>
  )
}
