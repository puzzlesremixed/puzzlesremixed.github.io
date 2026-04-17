
import Link from 'next/link'
import { getContent, type Language } from '@/lib/i18n'
import { ThemeToggle } from '@/components/theme-toggle'
import {LanguageSwitcher} from "@/components/language-switcher";
import {RiPuzzle2Fill, RiPuzzleFill} from "@remixicon/react";

interface HeaderProps {
  lang: string
}

export function Header({ lang }: HeaderProps) {
  const content = getContent(lang as Language)

  return (
    <header className="border-b border-border">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <nav className="hidden md:flex gap-6">
            <Link href={`/${lang}`} className="text-sm hover:text-muted-foreground transition-colors">
              <RiPuzzle2Fill/>
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <LanguageSwitcher/>
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
