import {TECH_STACK_DATA, UNKNOWN_TECH,} from '@/lib/tech-stack';

export const TechStack = ({stack}: { stack?: string[] }) => {
  if (!stack || stack.length === 0) {
    return null;
  }

  return (
    <div className="my-6">
      <h3 className="text-lg font-semibold mb-3">Tech Stack</h3>
      <div className="flex w-full border">
        {stack.map((techName) => {
          const techDetails = TECH_STACK_DATA[techName] || {...UNKNOWN_TECH, name: techName};
          return (
            <TechStackItem
              key={techDetails.name}
              name={techDetails.name}
              image={techDetails.logo}
            />
          );
        })}
      </div>
    </div>
  );
};

const TechStackItem = ({name, image}: { name: string, image?: string  }) => {
  return (
    <div
      className="border">
      <span>{name}</span>
    </div>
  );
};
