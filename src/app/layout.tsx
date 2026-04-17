import type {Metadata} from 'next'
import {Geist, Geist_Mono, Manrope} from 'next/font/google'
import {Analytics} from '@vercel/analytics/next'
import {ThemeProvider} from '@/components/theme-provider'
import './globals.css'
import {cn} from "@/lib/utils";

const manropeHeading = Manrope({subsets: ['latin'], variable: '--font-heading'});

const geist = Geist({subsets: ['latin'], variable: '--font-sans'});
const _geistMono = Geist_Mono({subsets: ["latin"], variable: '--font-mono'});

export const metadata: Metadata = {
  title: 'Portfolio Page - Vanya Namira',
  description: 'Developer portfolio and projects showcase',
  icons: {
    icon: [
      {
        url: '/icon1.png',
      },
      {
        url: '/icon0.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}


export default function RootLayout({
                                     children,
                                   }: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning
          className={cn(_geistMono.variable, "font-sans", geist.variable, manropeHeading.variable)}>
    <head>
      <meta name="apple-mobile-web-app-title" content="Portfolio Page - Vanya Namira"/>
    </head>
    <body className={cn("font-sans antialiased dot-pattern")}>
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <main className={"bg-background w-full max-w-6xl border-x min-h-screen mx-auto"}>
        {children}
        <footer className="border-t mx-auto py-4 px-8">
          <p className="text-muted-foreground">All rights reserved.</p>
        </footer>
      </main>
    </ThemeProvider>
    {process.env.NODE_ENV === 'production' && <Analytics/>}
    </body>
    </html>
  )
}
