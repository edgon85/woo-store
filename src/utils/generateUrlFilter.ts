import { Filter } from '@/interfaces';

export const generateFilterURL = (data: Filter[], isSearch?: false) => {
  const groups: Record<string, string[]> = {};
  const priceRanges: [number, number][] = [];

  data.forEach((item) => {
    if (item.type !== 'price') {
      if (!groups[item.type]) {
        groups[item.type] = [];
      }
      groups[item.type].push(item.slug);
    }

    if (item.priceRange) {
      priceRanges.push(item.priceRange);
    }
  });

  let url =
    '?' +
    Object.entries(groups)
      .map(([type, slugs]) =>
        slugs.map((slug) => `${type}[]=${slug}`).join('&')
      )
      .join('&');

  if (priceRanges.length > 0) {
    const minPrice = Math.min(...priceRanges.map(([min]) => min));
    const maxPrice = Math.max(...priceRanges.map(([, max]) => max));
    url +=
      url.includes('?') && url.length > 1
        ? `&minPrice=${minPrice}&maxPrice=${maxPrice}`
        : `minPrice=${minPrice}&maxPrice=${maxPrice}`;
  }

  return url;
};

