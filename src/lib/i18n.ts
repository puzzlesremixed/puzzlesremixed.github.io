import {enContent} from './content/en'
import {idContent} from "@/lib/content/id";

export type Language = 'en' | 'id'
export const LANGUAGES = ['en', 'id'] as const
export const DEFAULT_LANGUAGE: Language = 'en'

export type Content = typeof enContent

const contents: Record<Language, Content> = {
  en: enContent,
  id: idContent,
}

export function getContent(lang: Language): Content {
  return contents[lang] || contents[DEFAULT_LANGUAGE]
}

export function isValidLanguage(lang: string): lang is Language {
  return LANGUAGES.includes(lang as Language)
}
