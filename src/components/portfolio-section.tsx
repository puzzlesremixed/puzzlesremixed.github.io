import React from 'react'
import {Portfolio} from "@/lib/portfolio.d";
import {GridSection} from "@/components/grid-section";
import {Content, Language} from "@/lib/i18n";
import Link from "next/link";
import {RiArrowRightLine} from "@remixicon/react";
import PortfolioCard from "@/components/portfolio-card";

export const PortfolioSection = ({content, portfolios, lang}: {
  content: Content,
  portfolios: Portfolio[],
  lang: Language
}) => {
  const portfolioCols = 3;
  const portfolioRemainder = portfolios.length % portfolioCols;
  const portfolioPlaceholders = portfolioRemainder === 0 ? 0 : portfolioCols - portfolioRemainder;
  return (
    <>
      <GridSection className="p-0 flex flex-row justify-between">
        <div className={"py-4 px-8"}>
          <h2 className="text-2xl font-heading font-bold">{content.portfolio.title}</h2>
        </div>
        <div className={"text-end flex justify-end items-center"}>
          <div className={"py-4 mr-4 text-muted-foreground font-mono"}>
            {content.home.viewPortfolio.toUpperCase()}
          </div>
          <Link href={`/${lang}/portfolio`} className={"border-s p-4"}>
            <RiArrowRightLine className={"inline-block"}/>
          </Link>
        </div>
      </GridSection>
      <section className="grid md:grid-cols-2 lg:grid-cols-3 border-b gap-px bg-border overflow-hidden">
        {portfolios.map((portfolio) => (
          <PortfolioCard
            portfolio={portfolio}
            lang={lang}
            key={portfolio.slug}
          />
        ))}

        {Array.from({length: portfolioPlaceholders}).map((_, i) => (
          <div
            key={`placeholder-${i}`}
            className="bg-background line-pattern"
          />
        ))}
      </section>
      <GridSection>
        <p className={"text-muted-foreground"}>{content.portfolio.subtitle}</p>
      </GridSection>

    </>
  )
}
export default PortfolioSection
