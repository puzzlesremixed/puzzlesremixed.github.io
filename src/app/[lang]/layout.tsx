import { ReactNode } from 'react'
import { isValidLanguage } from '@/lib/i18n'
import { Header } from '@/components/header'

export async function generateStaticParams() {
  return [
    { lang: 'en' },
    { lang: 'id' },
  ]
}

interface LocaleLayoutProps {
  children: ReactNode
  params: Promise<{ lang: string }>
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { lang } = await params
  
  if (!isValidLanguage(lang)) {
    return null
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header lang={lang} />
      <main className="flex-1">
        {children}
      </main>
    </div>
  )
}
