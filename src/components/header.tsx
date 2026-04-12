'use client'

import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { getContent, LANGUAGES, type Language } from '@/lib/i18n'
import { ThemeToggle } from '@/components/theme-toggle'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Globe } from 'lucide-react'

interface HeaderProps {
  lang: string
}

export function Header({ lang }: HeaderProps) {
  const router = useRouter()
  const pathname = usePathname()
  const content = getContent(lang as Language)

  const handleLanguageChange = (newLang: Language) => {
    const newPathname = pathname.replace(`/${lang}`, `/${newLang}`)
    router.push(newPathname || `/${newLang}`)
  }

  return (
    <header className="border-b border-border">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <nav className="hidden md:flex gap-6">
            <Link href={`/${lang}#portfolio`} className="text-sm hover:text-muted-foreground transition-colors">
              {content.nav.portfolio}
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Globe className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {LANGUAGES.map((l) => (
                <DropdownMenuItem
                  key={l}
                  onClick={() => handleLanguageChange(l)}
                  className={l === lang ? 'bg-accent' : ''}
                >
                  {content.languages[l as Language]}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
