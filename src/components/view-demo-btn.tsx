import {cn} from "@/lib/utils";
import {RiGlobalLine} from "@remixicon/react";
import Link from "next/link";
import {Button} from "@/components/ui/button";

export const ViewDemoButton = ({href}: { href?: string }) => {
  if (!href) {
    return null;
  }

  return (
    <Button className="flex flex-row justify-start items-center w-full border-b p-4 cursor-pointer" asChild>
      <Link href={href} className={"w-full"}>
        <p className="text-lg font-mono"><RiGlobalLine
          className={"inline-block  mr-4"}/>LIVE DEMO</p>
      </Link>
    </Button>
  );
};
