import '../styles/index.css'
import { ReactNode } from 'react'

import { GlossaryInit } from '@/hooks/useGlossary'
import { ThemesProvider } from '@/hooks/useTheme'
import { UserProvider } from '@/hooks/useUser'
import { Inter } from 'next/font/google'

import { ConfirmationModalControl } from './(Global)/ConfirmationModalControl'
import { LoadingControl } from './(Global)/LoadingControl'
import { MainSidebar } from './(Global)/MainSidebar'
import { SnackbarControl } from './(Global)/SnackbarControl'
import { Header } from './header'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: {
    default: 'Home | Cards Quiz',
    template: '%s | Cards Quiz'
  },
  description: 'Generated by test Cards Quiz'
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${inter.className} h-full scroll-smooth antialiased`}>
      <body className="bg-light text-dark dark:bg-dark dark:text-light" suppressHydrationWarning>
        <ThemesProvider>
          <UserProvider>
            <div
              id="app"
              className="fixed inset-0 overflow-auto scrollbar scrollbar-track-white/75 scrollbar-thumb-[#8888884b] dark:scrollbar-track-zinc-700"
            >
              <Header />
              <MainSidebar />
              <div className="h-[calc(100%-56px)] px-5 py-5 sm:px-[10%] lg:px-[15%] xl:px-[20%]">{children}</div>
            </div>
            <GlossaryInit />
            <ConfirmationModalControl />
            <SnackbarControl />
            <LoadingControl />
          </UserProvider>
        </ThemesProvider>
      </body>
    </html>
  )
}
