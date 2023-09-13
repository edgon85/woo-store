import { Filter } from '@/interfaces';

export const generateFilterURL = (data: Filter[]) => {
  // Organiza los elementos en grupos
  const groups: Record<string, string[]> = {};
  data.forEach((item) => {
    if (!groups[item.type]) {
      groups[item.type] = [];
    }
    groups[item.type].push(item.slug);
  });

  // Genera la URL concatenando los grupos
  const url =
    '/api/products?' +
    Object.entries(groups)
      .map(([type, slugs]) =>
        slugs.map((slug) => `${type}[]=${slug}`).join('&')
      )
      .join('&');

  return url;
};
