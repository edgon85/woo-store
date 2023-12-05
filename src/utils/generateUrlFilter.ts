import { Filter } from '@/interfaces';

export const generateFilterURL = (data: Filter[]) => {
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

export const buildQueryString = (params: {
  [key: string]: string | string[] | undefined;
}) => {
  const parts = [];
  for (const key in params) {
    const value = params[key];
    if (Array.isArray(value)) {
      // Para arrays, añadir cada valor como una entrada separada
      value.forEach((val) =>
        parts.push(`${encodeURIComponent(key)}=${encodeURIComponent(val)}`)
      );
    } else if (value !== undefined) {
      // Para valores únicos
      parts.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`);
    }
  }
  return parts.join('&');
};
