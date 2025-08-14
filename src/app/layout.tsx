import './globals.css'
import { Inter } from 'next/font/google'
import type { Metadata } from 'next'
import QueryProvider from '@/components/layout/QueryProvider'
import Footer from '@/components/layout/Footer'
import Header from '@/components/layout/Header'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import SessionProviderWrapper from '@/components/layout/SessionProviderWrapper'

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
      <body className='bg-foreground text-white relative overflow-x-hidden' >
        <QueryProvider>
            <SessionProviderWrapper session={session}>
              <Header />
              <main className='min-h-screen w-full  py-4 overflow-x-hidden px-2 lg:px-8'>   
                  {children}
              </main>
            </SessionProviderWrapper>
          <Footer />
        </QueryProvider>
      </body>
    </html>
  )
}
