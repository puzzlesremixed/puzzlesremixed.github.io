import {cn} from "@/lib/utils";
import {RiCodeLine} from "@remixicon/react";
import Link from "next/link";
import {Button} from "@/components/ui/button";

export const ViewSourceButton = ({href}: { href?: string }) => {
  if (!href) {
    return null;
  }

  return (
    <Button className="flex flex-row justify-start items-center w-full border-b p-4 cursor-pointer" asChild>
      <Link href={href} className={"w-full"}>
        <p className="text-lg font-mono"><RiCodeLine
          className={"inline-block  mr-4"}/>VIEW SOURCE CODE</p>
      </Link>
    </Button>
  );
};
