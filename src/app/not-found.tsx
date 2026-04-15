"use client"

import {DEFAULT_LANGUAGE, isValidLanguage, Language} from '@/lib/i18n'
import {redirect, usePathname} from "next/navigation";

function getLangFromPathname(pathname: string): Language {
  console.log('getLangFromPathname', pathname);
  const langSegment = pathname.split('/')[1] as Language
  console.log('langSegment', langSegment);
  return isValidLanguage(langSegment) ? langSegment : DEFAULT_LANGUAGE
}

export default function RootNotFound() {
  const lang = getLangFromPathname(usePathname());
  redirect(`/${lang}/not-found`)
}