import {TECH_STACK_DATA, TechDetails, UNKNOWN_TECH,} from '@/lib/tech-stack';
import CustomSvg from "@/components/custom-svg";
import {cn} from "@/lib/utils";

export const TechStack = ({stack}: { stack?: string[] }) => {
  if (!stack || stack.length === 0) {
    return null;
  }

  return (
    <div className="">
      <h3 className="text-lg font-mono text-muted-foreground border-b p-4 ">TECH STACK</h3>
      <div className="flex flex-col w-full">
        {stack.map((techName) => {
          const techDetails = TECH_STACK_DATA[techName] || {...UNKNOWN_TECH, name: techName};
          return (
            <TechStackItem
              key={techDetails.name}
              techDetails={techDetails}
            />
          );
        })}
      </div>
    </div>
  );
};

const TechStackItem = ({techDetails}: { techDetails: TechDetails }) => {
  return (
    <div className="border-b flex flex-row">
      <div className="w-14 flex items-center justify-center py-3">
        <CustomSvg src={techDetails.logo} className={cn("w-7 h-7 text-black dark:text-white", techDetails.className)}
                   style={'filter: grayscale(60%) opacity(70%);'}/>
      </div>
      <div className={"p-4 border-l"}>{techDetails.name}</div>
    </div>
  );
};
