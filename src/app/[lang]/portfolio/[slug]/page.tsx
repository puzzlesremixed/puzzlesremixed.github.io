import Link from 'next/link'
import {getContent, isValidLanguage, Language} from '@/lib/i18n'
import {Button} from '@/components/ui/button'
import {notFound} from 'next/navigation'
import {getAllPortfolioPaths, getPortfolioData} from "@/lib/portfolio";
import {TechStack} from "@/components/tech-stack"
import Image from "next/image";
import {Metadata} from "next"
import {RiArrowLeftLine, RiArrowLeftSLine} from "@remixicon/react";
import {GridSection} from "@/components/grid-section";
import React from "react";
import {ViewSourceButton} from "@/components/view-source-btn";
import {ViewDemoButton} from "@/components/view-demo-btn";

interface PortfolioDetailPageProps {
  params: Promise<{ lang: Language; slug: string }>
}

export async function generateStaticParams() {
  const paths = getAllPortfolioPaths()
  return paths
}

export async function generateMetadata({params}: PortfolioDetailPageProps): Promise<Metadata> {
  const {lang, slug} = await params
  try {
    const portfolio = await getPortfolioData(slug, lang)
    return {
      title: portfolio.name,
      description: portfolio.excerpts,
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

export default async function PortfolioDetailPage({params}: PortfolioDetailPageProps) {
  const {lang, slug} = await params

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
    <>
      <GridSection className={"text-start p-0 flex justify-start"}>
        <Link href={`/${lang}`} className={"border-e p-4"}>
          <RiArrowLeftLine className={"inline-block"}/>
        </Link>
        <div className={"py-4 ml-4 text-muted-foreground font-mono"}>{content.portfolio.backHome.toUpperCase()}</div>
      </GridSection>
      <GridSection className={"text-start p-0 flex justify-start"}>
        <div className={"border-e p-4 w-14.25 line-pattern"}></div>
        <Link href={`/${lang}/portfolio`} className={"border-e p-4"}>
          <RiArrowLeftLine className={"inline-block"}/>
        </Link>
        <div className={"py-4 ml-4 text-muted-foreground font-mono"}>{content.portfolio.backPort.toUpperCase()}</div>
      </GridSection>
      <GridSection className={"p-8"}>
        <h1 className="text-4xl font-bold mb-2">{portfolio.name}</h1>
        <p className="text-lg text-muted-foreground">{portfolio.excerpts}</p>
      </GridSection>
      <div className="grid grid-cols-1 md:grid-cols-[70%_auto]">
        <article className="border-r">
          {portfolio.image ?
            <Image
              {...portfolio.image}
              alt={portfolio.name}
            />
            : <p>no image</p>}
          <div className="dark:prose-invert max-w-none p-8">
            {portfolio.contentReact}
          </div>
        </article>
        <div className={""}>
          <ViewSourceButton href={portfolio.source}/>
          <ViewDemoButton href={portfolio.url}/>
          <TechStack stack={portfolio.stack}/>
        </div>
      </div>
    </>
  )
}
