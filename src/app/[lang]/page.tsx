import {getContent, Language} from "@/lib/i18n";
import {getAllPortfolios} from "@/lib/portfolio";
import React, {Fragment} from "react";
import {GridSection} from "@/components/grid-section";
import {RiArrowRightLine} from "@remixicon/react";
import {Button} from "@/components/ui/button";
import SkillsSection from "@/components/skills-section";
import ExperienceSection from "@/components/experience-section";
import PortfolioSection from "@/components/portfolio-section";
import ContactSection from "@/components/contact-section";
import {SOCIAL_DATA} from "@/lib/social";

interface HomePageProps {
  params: Promise<{ lang: Language }>;
}

export default async function HomePage({params}: HomePageProps) {
  const {lang} = await params;

  const portfolios = getAllPortfolios(lang).slice(0, 6);
  const content = getContent(lang as any);


  return (
    <Fragment>
      {/* Hero of some kind section */}
      <section className="py-24 px-8 border-b min-h-">
        <div className={"mb-6"}>
          <h1 className="text-4xl mb-2 font-heading font-bold">{content.home.title}</h1>
          <p className="text-lg text-muted-foreground">
            {content.home.subtitle}
          </p>
        </div>
        <Button size="lg" asChild>
          <a href={SOCIAL_DATA['email'].personalUrl}>
            {content.home.cta}
            <RiArrowRightLine className="ml-4"/>
          </a>
        </Button>
      </section>

      {/* About me section */}
      <GridSection className={"bg-yellow-500 min-h-42 text-black"}>
        <div className={"max-w-xl"}>
          <h2 className={"text-2xl font-heading font-bold mb-1"}>
            {content.about.title}
          </h2>
          <p className={"text-justify"}>{content.about.content}</p>
        </div>
      </GridSection>

      {/* Protfolio/projects section */}
      <PortfolioSection content={content} portfolios={portfolios} lang={lang}/>

      {/* Skills section */}
      <SkillsSection content={content}/>

      {/*Expererience section*/}
      <ExperienceSection content={content}/>

      {/* Contact me section */}
      <ContactSection content={content}/>

    </Fragment>
  );
}
