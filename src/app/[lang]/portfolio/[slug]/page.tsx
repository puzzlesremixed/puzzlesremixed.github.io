import Link from 'next/link'
import {getContent, isValidLanguage} from '@/lib/i18n'
import {ChevronLeft} from 'lucide-react'
import {Button} from '@/components/ui/button'
import {notFound} from 'next/navigation'
import {getAllPortfolioPaths, getPortfolioData} from "@/lib/portfolio";

interface PortfolioDetailPageProps {
  params: Promise<{ lang: string; slug: string }>
}

export async function generateStaticParams() {
  const paths = getAllPortfolioPaths()
  return paths
}

export async function generateMetadata({params}: PortfolioDetailPageProps) {
  const {lang, slug} = await params
  try {
    const portfolio = await getPortfolioData(slug, lang)
    return {
      title: portfolio.name,
      description: portfolio.excerpts,
    }
  } catch (error) {
    return {
      title: 'Portfolio Not Found',
    }
  }
}

export default async function PortfolioDetailPage({params}: PortfolioDetailPageProps) {
  const {lang, slug} = await params

  if (!isValidLanguage(lang)) {
    console.log("Language error")
    return notFound()
  }

  const content = getContent(lang)
  let portfolio
  try {
    portfolio = await getPortfolioData(slug, lang)
  } catch (error) {
    console.log(error)
    notFound()
  }

  if (!portfolio) {
    return notFound()
  }

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 space-y-8">
      <Link href={`/${lang}`}>
        <Button variant="ghost" className="gap-2">
          <ChevronLeft className="w-4 h-4"/>
          {content.portfolio.backHome}
        </Button>
      </Link>

      <article className="space-y-6">
        <div>
          <h1 className="text-4xl font-bold mb-2">{portfolio.name}</h1>
          <p className="text-lg text-muted-foreground">{portfolio.excerpts}</p>
        </div>
        <div className="dark:prose-invert max-w-none mt-12">
          {portfolio.contentReact}
        </div>
      </article>
    </div>
  )
}
