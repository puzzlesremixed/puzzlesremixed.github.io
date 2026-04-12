import type {Metadata} from 'next'
import {Geist, Geist_Mono, Manrope} from 'next/font/google'
import {Analytics} from '@vercel/analytics/next'
import {ThemeProvider} from '@/components/theme-provider'
import './globals.css'
import {cn} from "@/lib/utils";
import {dotPatternStyle, linePatternStyle} from "@/lib/const";

const manropeHeading = Manrope({subsets: ['latin'], variable: '--font-heading'});

const _geist = Geist({subsets: ["latin"], variable: '--font-sans'});
const _geistMono = Geist_Mono({subsets: ["latin"], variable: '--font-mono'});

export const metadata: Metadata = {
  title: 'Developer Portfolio',
  description: 'Developer portfolio and projects showcase',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
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
          className={cn(manropeHeading.variable, _geist.variable, _geistMono.variable)}>
    <body className={cn("font-sans antialiased", dotPatternStyle)}>
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <main className={"bg-background container border-x min-h-screen mx-auto"}>

        {children}
      </main>
    </ThemeProvider>
    {process.env.NODE_ENV === 'production' && <Analytics/>}
    </body>
    </html>
  )
}
