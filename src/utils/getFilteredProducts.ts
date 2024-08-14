import { getProductFilters } from '@/actions';

type FilterParams = {
  gender: string;
  clothesType?: string;
  category?: string;
  subcategory?: string;
};

type SearchParams = {
  [key: string]: string | string[] | undefined;
};

export async function getFilteredProducts(
  filterParams: FilterParams,
  searchParams: SearchParams
) {
  const { gender, clothesType, category, subcategory } = filterParams;
  const page = Number(searchParams.page) || 1;

  // Extract filter parameters
  const brands = searchParams['brands[]'];
  const colors = searchParams['colors[]'];
  const measurements = searchParams['measurements[]'];
  const clothesState = searchParams['clothesState[]'];
  const minPrice = searchParams.minPrice
    ? Number(searchParams.minPrice)
    : undefined;
  const maxPrice = searchParams.maxPrice
    ? Number(searchParams.maxPrice)
    : undefined;

  // Ensure brands, colors, and clothesState are always arrays
  const ensureArray = (param: string | string[] | undefined): string[] => {
    if (Array.isArray(param)) return param;
    if (typeof param === 'string') return [param];
    return [];
  };

  const result = await getProductFilters({
    gender,
    clothesType,
    category,
    subcategory,
    page,
    brands: ensureArray(brands),
    colors: ensureArray(colors),
    measurements: ensureArray(measurements),
    clothesState: ensureArray(clothesState),
    minPrice,
    maxPrice,
  });

  if (!result.ok) {
    throw new Error(result.message || 'Error al obtener los productos');
  }

  const { products, totalPages } = result.data;

  // Create a string of active filters for BadgeFilterList
  const activeFilters = Object.entries(searchParams)
    .filter(([key]) =>
      [
        'brands[]',
        'colors[]',
        'measurements[]',
        'clothesState[]',
        'minPrice',
        'maxPrice',
      ].includes(key)
    )
    .flatMap(([key, value]) =>
      Array.isArray(value)
        ? value.map((v) => `${key.replace('[]', '')}:${v}`)
        : [`${key.replace('[]', '')}:${value}`]
    );

  return { products, totalPages, activeFilters };
}
