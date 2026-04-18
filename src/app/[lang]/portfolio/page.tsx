import {getContent, Language} from '@/lib/i18n'
import {getAllPortfolios} from "@/lib/portfolio";
import React from "react";
import PortfolioCard from "@/components/portfolio-card";
import {GridSection} from "@/components/grid-section";
import Link from "next/link";
import {RiArrowLeftLine, RiArrowRightLine} from "@remixicon/react";

interface PortfolioPageProps {
  params: Promise<{ lang: Language }>
}

export default async function PortfolioPage({params}: PortfolioPageProps) {
  const {lang} = await params

  const portfolios = getAllPortfolios(lang);
  const content = getContent(lang as any)

  const columns = 3
  const remainder = portfolios.length % columns
  const placeholders = remainder === 0 ? 0 : columns - remainder

  return (
    <div className="">
      <GridSection className={"text-start p-0 flex justify-start"}>
        <Link href={`/${lang}`} className={"border-e p-4"}>
          <RiArrowLeftLine className={"inline-block"}/>
        </Link>
        <div className={"py-4 ml-4 text-muted-foreground font-mono"}>{content.portfolio.backHome.toUpperCase()}</div>
      </GridSection>
      <GridSection>
        <h1 className="text-2xl font-bold">{content.portfolio.title}</h1>
        <p className={"text-muted-foreground"}>{content.portfolio.subtitle}</p>
      </GridSection>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px border-b bg-border overflow-hidden">
        {portfolios.map((portfolio) => (
          <PortfolioCard
            portfolio={portfolio}
            lang={lang}
            key={portfolio.slug}
          />
        ))}

        {Array.from({length: placeholders}).map((_, i) => (
          <div key={`placeholder-${i}`} className="bg-background line-pattern"/>
        ))}
      </div>
    </div>
  )
}

