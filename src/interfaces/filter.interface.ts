export interface Filter {
  slug: string;
  title: string;
  type: string;
  priceRange?: [number, number]; // Rango de precios [mínimo, máximo]
}
