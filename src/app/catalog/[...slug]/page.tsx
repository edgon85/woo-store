'use client';

import { IProduct } from '@/interfaces';
import { generateFilterURL } from '@/utils';
import { useFetcher, useFilter } from '@/hooks';
import { BadgeCleanFilters, BadgeFilter, ProductCard } from '@/components';
import Cookies from 'js-cookie';

export default function ExampleClientComponent() {
  const { filters, gender, category } = useFilter();
  const currentUserId = Cookies.get('userId');

  // Genera la URL concatenando los grupos
  const url = generateFilterURL(filters);
  const { data: products, isError } = useFetcher<IProduct[]>(url);

  return (
    <div>
      <div className="border py-2 overflow-scroll">
        {filters.map((filter) => (
          <BadgeFilter key={filter.slug} filterItem={filter} />
        ))}
        {filters.length > 0 ? <BadgeCleanFilters /> : null}
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            currentUserId={currentUserId || ''}
          />
        ))}
      </div>
    </div>
  );
}
