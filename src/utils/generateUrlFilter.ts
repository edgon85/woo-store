import { Filter } from '@/interfaces';

export const generateFilterURL = (
  data: Filter[],
  gender: string,
  category: string
) => {
  // Organiza los elementos en grupos
  const groups: Record<string, string[]> = {};
  const priceRanges: [number, number][] = [];

  data.forEach((item) => {
    if (!groups[item.type]) {
      groups[item.type] = [];
    }
    groups[item.type].push(item.slug);

    if (item.priceRange) {
      priceRanges.push(item.priceRange);
    }
  });

  // Genera la URL concatenando los grupos
  let url =
    `/products/filter?gender=${gender}&category=${category}&` +
    Object.entries(groups)
      .map(([type, slugs]) =>
        slugs.map((slug) => `${type}[]=${slug}`).join('&')
      )
      .join('&');

  if (priceRanges.length > 0) {
    const minPrice = Math.min(...priceRanges.map(([min]) => min));
    const maxPrice = Math.max(...priceRanges.map(([, max]) => max));
    url += `&minPrice=${minPrice}&maxPrice=${maxPrice}`;
  }

  return url;
};
