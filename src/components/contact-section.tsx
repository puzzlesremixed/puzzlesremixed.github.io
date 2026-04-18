import React from 'react'
import {Content} from "@/lib/i18n";
import {GridSection} from "@/components/grid-section";
import {SOCIAL_DATA} from "@/lib/social";
import {cn} from "@/lib/utils";

export const ContactSection = ({content}: { content: Content }) => {
  return (
    <GridSection
      className={"bg-[#002f88] dark:bg-[#00153c] text-white flex flex-col md:flex-row p-0"}
    >
      <div className={"py-4 px-8 w-full"}>
        <h2 className={"text-2xl font-heading font-bold"}>
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
                "w-full py-4 px-8 group-hover:bg-white group-hover:text-[#002f88] dark:group-hover:text-[#00153c] transition-colors",
                Object.keys(SOCIAL_DATA).length - 1 > i && "border-b",
              )}
            >
              {value.logo && <value.logo className={"mr-4 inline-block"}/>}
              {value.name}
            </div>
          </a>
        ))}
      </div>
    </GridSection>
  )
}
export default ContactSection
