import { type NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  const userRol = request.cookies.get('user-rol')

  const isProtectedRoute = path.startsWith('/dashboard')
  const isPublicRoute = path === '/login'
  const isRootRoute = path === '/'

  if (isRootRoute) {
    if (!userRol) {
      return NextResponse.redirect(new URL('/login', request.url))
    }

    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  if (isProtectedRoute && !userRol) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  if (isPublicRoute && userRol) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
