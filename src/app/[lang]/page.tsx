import { getContent, Language } from "@/lib/i18n";
import { getAllPortfolios } from "@/lib/portfolio";
import React, { Fragment } from "react";
import PortfolioCard from "@/components/portfolio-card";
import { GridSection } from "@/components/grid-section";
import Link from "next/link";
import { RiArrowRightLine } from "@remixicon/react";
import { SOCIAL_DATA } from "@/lib/social";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import SkillsSection from "@/components/skills-section";
import ExperienceSection from "@/components/experience-section";

interface HomePageProps {
  params: Promise<{ lang: Language }>;
}

export default async function HomePage({ params }: HomePageProps) {
  const { lang } = await params;

  const portfolios = getAllPortfolios(lang).slice(0, 6);
  const content = getContent(lang as any);

  const portfolioCols = 3;
  const portfolioRemainder = portfolios.length % portfolioCols;
  const portfolioPlaceholders =
    portfolioRemainder === 0 ? 0 : portfolioCols - portfolioRemainder;

  return (
    <Fragment>
      {/* Hero of some kind section */}
      <section className="py-24 px-8 border-b min-h-">
        <div className={"mb-6"}>
          <h1 className="text-4xl mb-2 font-bold">{content.home.title}</h1>
          <p className="text-lg text-muted-foreground">
            {content.home.subtitle}
          </p>
        </div>
        <Button size="lg">
          {content.home.cta}
          <RiArrowRightLine className="ml-4" />
        </Button>
      </section>

      {/* About me section */}
      <GridSection className={"bg-yellow-500 min-h-42 text-black"}>
        <div className={"max-w-xl"}>
          <h2 className={"font-heading mb-1 text-xl font-semibold"}>
            {content.about.title}
          </h2>
          <p className={"text-justify"}>{content.about.content}</p>
        </div>
      </GridSection>

      {/* Protfolio/projects section */}
      <GridSection className="p-0 flex flex-row justify-between">
        <div className={"py-4 px-8"}>
          <h2 className="text-2xl font-semibold">{content.portfolio.title}</h2>
        </div>
        <div className={"text-end flex justify-end items-center"}>
          <div className={"py-4 mr-4 text-muted-foreground font-mono"}>
            {content.home.viewPortfolio.toUpperCase()}
          </div>
          <Link href={`/${lang}/portfolio`} className={"border-s p-4"}>
            <RiArrowRightLine className={"inline-block"} />
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

        {Array.from({ length: portfolioPlaceholders }).map((_, i) => (
          <div
            key={`placeholder-${i}`}
            className="bg-background line-pattern"
          />
        ))}
      </section>

      {/* Skills section */}
      <SkillsSection content={content} />

      {/*Expererience section*/}
      <ExperienceSection content={content} />

      {/* Contact me section */}
      <GridSection
        className={"bg-[#00153c] text-white flex flex-col md:flex-row p-0"}
      >
        <div className={"py-4 px-8 w-full"}>
          <h2 className={"font-heading text-xl font-semibold"}>
            {content.cta.title}
          </h2>
          <p>{content.cta.subtitle}</p>
        </div>
        <div className={"border-t md:border-t-0 md:border-l w-full"}>
          {Object.entries(SOCIAL_DATA).map(([key, value], i) => (
            <a
              href={value.personalUrl}
              key={key}
              className={"group"}
              target={"_blank"}
            >
              <div
                className={cn(
                  "w-full py-4 px-8 group-hover:bg-white group-hover:text-[#00153c] transition-colors",
                  Object.keys(SOCIAL_DATA).length - 1 > i && "border-b",
                )}
              >
                {value.logo && <value.logo className={"mr-4 inline-block"} />}
                {value.name}
              </div>
            </a>
          ))}
        </div>
      </GridSection>
    </Fragment>
  );
}
