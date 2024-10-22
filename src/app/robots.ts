import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
      },
      {
        userAgent: 'facebookexternalhit',
        allow: '/',
      },
      {
        userAgent: 'googlebot',
        allow: '/',
      },
    ],
    sitemap: 'https://www.woo.com.gt/sitemap.xml',
  };
}
