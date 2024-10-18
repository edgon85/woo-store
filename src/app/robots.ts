import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/private/',
        '/admin/',
        '/secret/',
        '/product/create/',
        '/product/edit/',
        '/inbox/',
        '/checkout/',
        '/admin/',
        '/settings/',
        '/claim/',
        '/api/admin/',
      ],
    },
    sitemap: 'https://acme.com/sitemap.xml',
  };
}
