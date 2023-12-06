import { NextRequest, NextResponse } from 'next/server'

export function middleware(req: NextRequest) {
  const isUserAuthenticated = req.cookies.get('next-auth.session-token')
  const isUserAGuest = req.cookies.get('@bookwise:guest')
  const isLoginPage = req.nextUrl.pathname === '/login'

  const url = req.nextUrl.clone()
  url.pathname = '/login'

  if (!isUserAuthenticated && !isUserAGuest && !isLoginPage) {
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
