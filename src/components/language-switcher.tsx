'use client'

import {usePathname, useRouter, useParams} from 'next/navigation'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {Button} from '@/components/ui/button'

import slugMap from '@/lib/generated/slug-map.json'
import {getContent, Language, LANGUAGES} from "@/lib/i18n";
import {RiTranslate2} from "@remixicon/react";

export function LanguageSwitcher() {
  const router = useRouter()
  const pathname = usePathname()
  const {lang, slug} = useParams()


  const content = getContent(lang as Language)

  const currentLang = lang as Language

  const handleLanguageChange = (newLang: Language) => {
    const currentSlug = slug as string | undefined

    if (currentSlug) {
      const {idToSlugs, slugsToId} = slugMap

      // @ts-ignore
      const currentId = slugsToId[currentLang]?.[currentSlug]

      if (currentId) {
        // @ts-ignore
        const newSlug = idToSlugs[currentId]?.[newLang]

        if (newSlug) {
          router.push(`/${newLang}/portfolio/${newSlug}`)
          return
        }
      }
    }

    const newPathname = pathname.replace(`/${currentLang}`, `/${newLang}`)
    router.push(newPathname)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <RiTranslate2/>
          <span className="sr-only">Change language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {LANGUAGES.map((lang) => (
          <DropdownMenuItem
            key={lang}
            onClick={() => handleLanguageChange(lang)}
            className={lang === currentLang ? 'bg-accent' : ''}
          >
            {content.languages[lang as Language]}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}