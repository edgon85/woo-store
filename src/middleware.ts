import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';
// import { jwt } from './utils';

const isAdminRouteApi = (pathname: string) => {
  return pathname.startsWith('/api/admin');
};
const isAdminRoute = (pathname: string) => {
  return pathname.startsWith('/admin');
};

const isUserRoute = (pathname: string) => {
  // return pathname.startsWith('/checkout/:path*');
  return pathname.startsWith('/checkout');
};

export async function middleware(req: NextRequest) {
  const session: any = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });
  // const role = req.headers.get("authorization");
  // const { pathname } = req.nextUrl;
  const requestedPage = req.nextUrl.pathname;
  const url = req.nextUrl.clone();

  if (!session) {
    url.pathname = `/auth/login`;
    url.search = `p=${requestedPage}`;

    return NextResponse.redirect(url);
  }

  const validRoles = ['admin', 'super-user', 'seo'];
  if (isAdminRoute(requestedPage) && !validRoles.includes(session.user.role)) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  if (
    isAdminRouteApi(requestedPage) &&
    !validRoles.includes(session.user.role)
  ) {
    return NextResponse.redirect(new URL('/api/auth/unauthorized', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/products/create',
    // '/profile/:path*',
    // '/checkout/address',
    // '/checkout/summary',
    '/checkout/:path*',
    '/admin/:path*',
    '/settings/:path*',
    '/api/admin/:path*',
  ],
};
