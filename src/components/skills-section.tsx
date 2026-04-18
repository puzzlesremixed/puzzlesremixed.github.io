import { SKILLS } from "@/lib/const";
import { GridSection } from "./grid-section";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import CustomSvg from "./custom-svg";
import { Content } from "@/lib/i18n";
import { cn } from "@/lib/utils";

interface SkillsSectionProps {
  content: Content;
}

const SkillsSection = ({ content }: SkillsSectionProps) => {
  const skillCols = 5;
  const skillsRemainder = SKILLS.length % skillCols;
  const skillsPlaceholders =
    skillsRemainder === 0 ? 0 : skillCols - skillsRemainder;

  return (
    <GridSection className={"bg-purple-800 p-0"}>
      <div className={"px-8 py-4 border-b"}>
        <h2 className={"font-heading mb-1 text-xl font-semibold text-white"}>
          {content.skills.title}
        </h2>
      </div>
      <div
        className={
          "grid grid-cols-3 md:grid-cols-3 lg:grid-cols-5 border-b gap-px bg-border overflow-hidden"
        }
      >
        {Object.entries(SKILLS).map(([key, value], i) => (
          <Tooltip>
            <TooltipTrigger key={key}>
              <a
                href={value.url}
                target="_blank"
                className={
                  "flex items-center bg-purple-800 justify-center py-3 cursor-pointer"
                }
              >
                <CustomSvg
                  src={value.logoWhite}
                  className={cn(
                    "w-7 h-7 text-white fill-current",
                    value.className,
                  )}
                  style={"filter:"}
                />
              </a>
            </TooltipTrigger>
            <TooltipContent>
              <p>{value.name}</p>
            </TooltipContent>
          </Tooltip>
        ))}

        {Array.from({ length: skillsPlaceholders }).map((_, i) => (
          <div
            key={`placeholder-${i}`}
            className="bg-purple-800 line-pattern"
          />
        ))}
      </div>
    </GridSection>
  );
};

export default SkillsSection;
