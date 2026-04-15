import {getContent, Language} from '@/lib/i18n'
import {Metadata} from "next";

interface NotFoundProps {
  params: Promise<{ lang: string }>
}

export async function generateMetadata({params}: NotFoundProps): Promise<Metadata> {
  const {lang} = await params
  try {
    const content = getContent(lang as Language)
    return {
      title: content.notFound.title,
      description: content.notFound.subtitle,
      // TODO : chnage with proper seo stuff idk
      alternates: {
        canonical: 'https://nextjs.org',
        languages: {
          'en-US': 'https://nextjs.org/en-US',
          'id-ID': 'https://nextjs.org/de-DE',
        },
      }
    }
  } catch (error) {
    return {
      title: 'Not Found',
    }
  }
}

export default async function NotFound({params}: NotFoundProps) {
  const {lang} = await params

  const content = getContent(lang as Language)

  return (
    <div className="">
      <section className="max-w-4xl mx-auto text-center space-y-4">
        <h1>{content.notFound.title}</h1>
        <p>{content.notFound.subtitle}</p>
      </section>
    </div>
  )
}
