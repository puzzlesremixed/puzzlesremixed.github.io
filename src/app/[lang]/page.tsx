import {getContent} from '@/lib/i18n'
import {getAllPortfolios} from "@/lib/portfolio";
import Link from "next/link";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";

interface HomePageProps {
  params: Promise<{ lang: string }>
}

export default async function HomePage({params}: HomePageProps) {
  const {lang} = await params

  const portfolios = getAllPortfolios(lang);
  const content = getContent(lang as any)

  return (
    <div className="">
      <section className="max-w-4xl mx-auto text-center space-y-4">
        <h1 className="text-4xl font-bold">{content.home.title}</h1>
        <p className="text-lg text-muted-foreground">{content.home.subtitle}</p>
      </section>

      <section className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold mb-8">{content.portfolio.title}</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {portfolios.map((portfolio) => (
            <Link key={portfolio.slug} href={`/${lang}/portfolio/${portfolio.slug}`} className="group">
              <Card className="h-full transition-all group-hover:border-primary group-hover:shadow-lg">
                <CardHeader>
                  <CardTitle>{portfolio.name}</CardTitle>
                  <CardDescription>
                    {portfolio.excerpts}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
