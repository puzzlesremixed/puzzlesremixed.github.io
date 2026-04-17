import {getContent, Language} from '@/lib/i18n'
import {getAllPortfolios} from "@/lib/portfolio";
import React from "react";
import PortfolioCard from "@/components/portfolio-card";
import {GridSection} from "@/components/grid-section";
import Link from "next/link";
import {RiArrowRightLine} from "@remixicon/react";
import {SOCIAL_DATA} from "@/lib/social";
import {cn} from "@/lib/utils";

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
      <GridSection className={"bg-[#00153c] text-white flex flex-col md:flex-row p-0"}>
        <div className={"py-4 px-8 w-full"}>
          <h2 className={"font-heading text-xl font-semibold"}>Like what are you seeing here? Let's connect!</h2>
          <p>I should be available on these social platforms.</p>
        </div>
        <div className={"border-t md:border-t-0 md:border-l w-full"}>
          {Object.entries(SOCIAL_DATA).map(([key, value], i) => (
            <a href={value.personalUrl} key={key} className={"group"} target={"_blank"}>
              <div
                className={cn("w-full py-4 px-8 group-hover:bg-white group-hover:text-[#00153c] transition-colors", Object.keys(SOCIAL_DATA).length - 1 > i && "border-b")}>
                {value.logo && <value.logo className={"mr-4 inline-block"}/>}{value.name}
              </div>
            </a>
          ))}

        </div>
      </GridSection>
    </div>
  )
}
