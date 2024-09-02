import { Filter } from '@/interfaces';

export const generateFilterURL = (
  data: Filter[],
  isSearch?: boolean,
  searchTerm: string = '',
  gender: string = 'mujer'
) => {
  const groups: Record<string, string[]> = {};
  const priceRanges: [number, number][] = [];
  let clothesType: string | undefined;

  data.forEach((item) => {
    if (item.type === 'clothesType') {
      clothesType = item.slug;
    } else if (item.type !== 'price') {
      if (!groups[item.type]) {
        groups[item.type] = [];
      }
      groups[item.type].push(item.slug);
    } else if (item.priceRange) {
      priceRanges.push(item.priceRange);
    }
  });

  let url =
    isSearch && searchTerm
      ? `?s=${encodeURIComponent(searchTerm)}&gender=${gender}`
      : '?';

  if (isSearch && clothesType) {
    url +=
      (url.length > 1 ? '&' : '') +
      `clothesType=${encodeURIComponent(clothesType)}`;
  }

  const filterParams = Object.entries(groups)
    .map(([type, slugs]) =>
      slugs.map((slug) => `${type}[]=${encodeURIComponent(slug)}`).join('&')
    )
    .join('&');

  if (filterParams) {
    url += (url.length > 1 ? '&' : '') + filterParams;
  }

  if (priceRanges.length > 0) {
    const minPrice = Math.min(...priceRanges.map(([min]) => min));
    const maxPrice = Math.max(...priceRanges.map(([, max]) => max));
    url +=
      (url.length > 1 ? '&' : '') + `minPrice=${minPrice}&maxPrice=${maxPrice}`;
  }

  return url;
};
/* export const generateFilterURL = (data: Filter[], isSearch?: false) => {
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
 */
