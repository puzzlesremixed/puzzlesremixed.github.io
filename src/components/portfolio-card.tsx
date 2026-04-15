import Link from "next/link";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import Image from "next/image";
import React from "react";
import {Portfolio} from "@/lib/portfolio";
import {Language} from "@/lib/i18n";

export default function PortfolioCard({portfolio, lang}: { portfolio: Portfolio, lang: Language }) {
  return (
    <Link href={`/${lang}/portfolio/${portfolio.slug}`} className="">
      <Card className="h-full ring-0 p-0">
        {portfolio.image &&
            <Image
                className={"h-32 object-cover"}
                {...portfolio.image}
                alt={portfolio.name}
            />}
        <CardHeader>
          <CardTitle>{portfolio.name}</CardTitle>
          <CardDescription>
            {portfolio.excerpts}
          </CardDescription>
        </CardHeader>
        <CardContent>
        </CardContent>
      </Card>
    </Link>)
}