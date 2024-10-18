import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://www.woo.com.gt',
      lastModified: new Date(),

      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: 'https://www.woo.com.gt/catalog/mujer',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: 'https://www.woo.com.gt/catalog/hombre',

      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: 'https://www.woo.com.gt/catalog/mujer/ropa',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: 'https://www.woo.com.gt/catalog/mujer/zapatos',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: 'https://www.woo.com.gt/catalog/mujer/accesorios',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: .8,
    },
    {
      url: 'https://www.woo.com.gt/catalog/hombre/ropa',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: 'https://www.woo.com.gt/catalog/hombre/zapatos',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: 'https://www.woo.com.gt/catalog/hombre/accesorios',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: .8,
    },
  ];
}
