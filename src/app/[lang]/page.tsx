import { getContent } from '@/lib/i18n'

interface HomePageProps {
  params: Promise<{ lang: string }>
}

export default async function HomePage({ params }: HomePageProps) {
  const { lang } = await params
  const content = getContent(lang as any)

  return (
    <div className="">
      <section className="max-w-4xl mx-auto text-center space-y-4">
        <h1 className="text-4xl font-bold">{content.home.title}</h1>
        <p className="text-lg text-muted-foreground">{content.home.subtitle}</p>
      </section>

      <section className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold mb-8">{content.portfolio.title}</h2>
      </section>
    </div>
  )
}
