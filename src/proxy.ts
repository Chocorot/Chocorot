import createMiddleware from 'next-intl/middleware';
import {routing} from './i18n/routing';

// Exporting both default and named proxy for compatibility with Next.js 16 convention
const middleware = createMiddleware(routing);

export default middleware;
export const proxy = middleware;

export const config = {
  // Match only internationalized pathnames and exclude internal Next.js paths and static files
  matcher: [
    // Match root and any paths starting with supported locales
    '/', 
    '/(en|zh|ja)/:path*',
    // Match everything else except internal paths and files with extensions
    '/((?!api|_next|_vercel|favicon.ico|sitemap.xml|robots.txt|.*\\..*).*)'
  ]
};

