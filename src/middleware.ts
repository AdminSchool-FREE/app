import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  if (
    !request.cookies.has('session-user') ||
    !request.cookies.has('session-company')
  ) {
    return NextResponse.redirect(new URL('/', request.url))
  }
}

export const config = {
  matcher: ['/admin/:path*'],
}
