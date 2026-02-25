import './globals.css'
import { Inter } from 'next/font/google'
import type { Metadata } from 'next'
import QueryProvider from '@/components/layout/QueryProvider'
import Footer from '@/components/layout/Footer'
import Navbar from '@/components/layout/Navbar'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import SessionProviderWrapper from '@/components/layout/SessionProviderWrapper'
import { Toaster } from '@/components/ui/sonner'
import DialogAuthCard from '@/components/layout/DialogAuthCard'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: 'Movie Web',
  description: 'Best movies in one place',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const session = await getServerSession(authOptions)

  return (
    <html lang="en" className={`${inter.variable} `} >
      <body className='bg-background text-white relative overflow-x-hidden dark'>
        <QueryProvider>
          <SessionProviderWrapper session={session}>
              <Navbar />
              <Toaster position='top-center'/>
              <DialogAuthCard />
              <main className='min-h-svh overflow-x-hidden'>  
                {children}
              </main>
              <Footer />
          </SessionProviderWrapper>
        </QueryProvider>
      </body>
    </html>
  )
}
