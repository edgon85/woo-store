import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

const VALID_ADMIN_ROLES = ['admin', 'super-user', 'seo'] as const;

const isAdminRouteApi = (pathname: string) => {
  return pathname.startsWith('/api/admin');
};
const isAdminRoute = (pathname: string) => {
  return pathname.startsWith('/admin');
};

const isUserRoute = (pathname: string) => {
  return pathname.startsWith('/checkout');
};

export async function middleware(req: NextRequest) {
  const session: any = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const requestedPage = req.nextUrl.pathname;
  const url = req.nextUrl.clone();
  const searchParams = new URLSearchParams(req.nextUrl.searchParams);

  if (!session) {
    req.cookies.delete('token');
    req.cookies.delete('userId');
    searchParams.set('p', requestedPage + req.nextUrl.search);
    url.pathname = `/auth/login`;
    url.search = searchParams.toString();

    return NextResponse.redirect(url);
  }

  if (
    isAdminRoute(requestedPage) &&
    !VALID_ADMIN_ROLES.includes(session.user.role)
  ) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  if (
    isAdminRouteApi(requestedPage) &&
    !VALID_ADMIN_ROLES.includes(session.user.role)
  ) {
    return new NextResponse(JSON.stringify({ error: 'Unauthorized' }), {
      status: 403,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const response = NextResponse.next();

  return response;
}

export const config = {
  matcher: [
    '/product/create/:path*',
    '/product/edit/:path*',
    '/member/transactions/:path*',
    '/inbox/:path*',
    '/checkout/:path*',
    '/admin/:path*',
    '/settings/:path*',
    '/claim/:path*',
    '/api/admin/:path*',
  ],
};
