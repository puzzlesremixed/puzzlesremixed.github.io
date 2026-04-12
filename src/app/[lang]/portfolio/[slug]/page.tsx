import Link from 'next/link'
import { getContent, isValidLanguage } from '@/lib/i18n'
import { getPortfolioBySlug, portfolios } from '@/lib/portfolio'
import { ChevronLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { notFound } from 'next/navigation'

interface PortfolioDetailPageProps {
  params: Promise<{ lang: string; slug: string }>
}

export async function generateStaticParams() {
  return portfolios.flatMap(portfolio =>
    ['en', 'fr'].map(lang => ({
      lang,
      slug: portfolio.slug,
    }))
  )
}

export async function generateMetadata({ params }: PortfolioDetailPageProps) {
  const { slug } = await params
  const portfolio = getPortfolioBySlug(slug)

  if (!portfolio) {
    return {}
  }

  return {
    title: portfolio.name,
    description: portfolio.excerpts,
  }
}

export default async function PortfolioDetailPage({ params }: PortfolioDetailPageProps) {
  const { lang, slug } = await params

  if (!isValidLanguage(lang)) {
    return notFound()
  }

  const content = getContent(lang)
  const portfolio = getPortfolioBySlug(slug)

  if (!portfolio) {
    return notFound()
  }

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 space-y-8">
      <Link href={`/${lang}`}>
        <Button variant="ghost" className="gap-2">
          <ChevronLeft className="w-4 h-4" />
          {content.portfolio.backHome}
        </Button>
      </Link>

      <article className="space-y-6">
        <div>
          <h1 className="text-4xl font-bold mb-2">{portfolio.name}</h1>
          <p className="text-lg text-muted-foreground">{portfolio.excerpts}</p>
        </div>
      </article>
    </div>
  )
}
