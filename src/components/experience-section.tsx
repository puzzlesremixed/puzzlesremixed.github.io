import { cn } from "@/lib/utils";
import { GridSection } from "./grid-section";
import { Content } from "@/lib/i18n";

interface ExperienceSectionProps {
  content: Content;
}

const ExperienceSection
 = ({ content }: ExperienceSectionProps) => {
   return (
    <>
    <GridSection className="">
      <h2 className="text-2xl font-semibold">{content.experience.title}</h2>
    </GridSection>
    <GridSection className={"line-pattern py-4 px-8"}>
      <div className={"flex flex-col gap-4"}>
        {Object.entries(content.experience.content).map(([key, value], i) => (
          <div className={"border bg-background "} key={i}>
            <div
              className={cn(
                "w-full px-4 py-1",
                value.isPresent ? "bg-teal-700" : "border-b",
              )}
            >
              <p className={cn("font-mono", value.isPresent && "")}>
                {value.timeframe}
              </p>
            </div>
            <div className={"p-4 pt-3"}>
              <h3 className={"font-semibold font-heading text-lg mb-1"}>
                {value.location}
                <span
                  className={
                    "text-muted-foreground font-regular text-md ml-2"
                  }
                >
                  {value.position}
                </span>
              </h3>
              <p>{value.description}</p>
            </div>
          </div>
        ))}
      </div>
       </GridSection>
    </>
  );
};

export default ExperienceSection
;
