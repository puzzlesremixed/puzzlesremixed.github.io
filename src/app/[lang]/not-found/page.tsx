import {getContent, Language} from '@/lib/i18n'
import {Metadata} from "next";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import {RiArrowRightLine} from "@remixicon/react";
import React from "react";

interface NotFoundProps {
  params: Promise<{ lang: string }>
}

export async function generateMetadata({params}: NotFoundProps): Promise<Metadata> {
  const {lang} = await params
  try {
    const content = getContent(lang as Language)
    return {
      title: content.notFound.title,
      description: content.notFound.subtitle,
      // TODO : chnage with proper seo stuff idk
      alternates: {
        canonical: 'https://nextjs.org',
        languages: {
          'en-US': 'https://nextjs.org/en-US',
          'id-ID': 'https://nextjs.org/de-DE',
        },
      }
    }
  } catch (error) {
    return {
      title: 'Not Found',
    }
  }
}

export default async function NotFound({params}: NotFoundProps) {
  const {lang} = await params

  const content = getContent(lang as Language)

  return (
    <div className="">
      <section className="max-w-4xl pt-32 mx-auto text-center space-y-4">
        <p className={"text-7xl font-mono text-muted-foreground"}>404</p>
        <h1 className={"text-2xl font-heading font-bold"}>{content.notFound.title}</h1>
        <p>{content.notFound.subtitle}</p>
        <Button asChild size="lg"><Link href={"/"}>Go back <RiArrowRightLine className="ml-4"/></Link></Button>
      </section>
    </div>
  )
}
