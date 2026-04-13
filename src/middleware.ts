import {NextRequest, NextResponse} from 'next/server'
import {isValidLanguage, DEFAULT_LANGUAGE, LANGUAGES} from '@/lib/i18n'

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  if (
    pathname.includes('.')
  ) {
    return NextResponse.next()
  }

  const pathnameHasLanguage = LANGUAGES.some(
    lang => pathname.startsWith(`/${lang}/`) || pathname === `/${lang}`
  )

  if (pathnameHasLanguage) {
    return NextResponse.next()
  }

  if (pathname === '/') {
    const acceptLanguage = request.headers.get('accept-language') || ''
    const lang = acceptLanguage.split(',')[0].split('-')[0].toLowerCase()
    const selectedLang = isValidLanguage(lang) ? lang : DEFAULT_LANGUAGE
    return NextResponse.redirect(new URL(`/${selectedLang}`, request.url))
  }

  return NextResponse.redirect(new URL(`/${DEFAULT_LANGUAGE}${pathname}`, request.url))
}

export const config = {
  // Update the matcher to ignore the /images directory
  matcher: [
    '/((?!api|_next/static|_next/image|images|favicon.ico).*)',
  ],
}
