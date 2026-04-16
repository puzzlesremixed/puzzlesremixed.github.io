import {getContent, Language} from '@/lib/i18n'
import {getAllPortfolios} from "@/lib/portfolio";
import React from "react";
import {cn} from "@/lib/utils";
import PortfolioCard from "@/components/portfolio-card";
import {GridSection} from "@/components/grid-section";
import Link from "next/link";
import {RiArrowRightLine} from "@remixicon/react";

interface HomePageProps {
  params: Promise<{ lang: Language }>
}

export default async function HomePage({params}: HomePageProps) {
  const {lang} = await params

  const portfolios = getAllPortfolios(lang).slice(0, 6);
  const content = getContent(lang as any)

  const columns = 3
  const remainder = portfolios.length % columns
  const placeholders = remainder === 0 ? 0 : columns - remainder

  return (
    <div className="">
      <section className="py-24 px-8 border-b">
        <h1 className="text-4xl font-bold">{content.home.title}</h1>
        <p className="text-lg text-muted-foreground">{content.home.subtitle}</p>
      </section>

      <GridSection className="">
        <h2 className="text-2xl font-bold">{content.portfolio.title}</h2>
      </GridSection>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 border-b gap-px bg-border overflow-hidden">
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
      <GridSection className={"text-end p-0 flex justify-end"}>
        <div className={"py-4 mr-4 text-muted-foreground font-mono"}>{content.home.viewPortfolio.toUpperCase()}</div>
        <Link href={`/${lang}/portfolio`} className={"border-s p-4"}>
          <RiArrowRightLine className={"inline-block"}/>
        </Link>
      </GridSection>
      <GridSection className={"bg-[#00153c] text-white"}>
        <h1 className={"font-heading text-xl font-semibold"}>Like what are you seeing here? Let's connect!</h1>
        <p>I should be available on these social platforms.</p>
      </GridSection>
    </div>
  )
}
