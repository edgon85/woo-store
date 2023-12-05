'use client';
import { useFilter } from '@/hooks';
import { Filter } from '@/interfaces';
import { usePathname, useRouter } from 'next/navigation';
import { BadgeCleanFilters } from './BadgeCleanFilters';
import { useEffect, useState } from 'react';
import { generateFilterURL } from '@/utils';

export const BadgeFilterList = () => {
  const { filters, setFilters } = useFilter();
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (!isInitialized) {
      const currentUrl = window.location.href;
      const searchParams = new URL(currentUrl).search;

      if (searchParams) {
        const newFilters = parseSearchParams(searchParams);

        if (JSON.stringify(filters) !== JSON.stringify(newFilters)) {
          setFilters(newFilters);
        }
      }

      setIsInitialized(true);
    }
  }, [filters, setFilters, isInitialized]);

  return (
    <div className="border py-2 overflow-scroll">
      {filters.map((filter) => (
        <BadgeFilter key={filter.slug} filterItem={filter} />
      ))}
      {filters.length > 0 ? <BadgeCleanFilters /> : null}
    </div>
  );
};

type Props = {
  filterItem: Filter;
};

export const BadgeFilter = ({ filterItem }: Props) => {
  const pathName = usePathname();
  const { replace } = useRouter();
  const { filters, setFilters } = useFilter();
  let title: string = '';

  const onHandlerClick = () => {
    const draft = filters.filter((resp) => filterItem !== resp);
    setFilters(draft);
  };

  useEffect(() => {
    const url = generateFilterURL(filters);
    replace(`${pathName}${url}`);
  }, [filters, pathName, replace]);

  const titleOption = (tupe: string) => {
    switch (tupe) {
      case 'brands':
        return (title = 'Marca: ');

      case 'measurements':
        return (title = 'Talla: ');

      case 'clothesState':
        return (title = 'Estado: ');

      case 'colors':
        return (title = 'color: ');
      case 'price':
        return (title = 'Entre: ');
    }
  };

  return (
    <>
      <span
        id="badge-dismiss-green"
        className="inline-flex mb-1 items-center px-2 py-1 mr-2 text-sm font-medium text-white bg-primary rounded uppercase"
      >
        {` ${titleOption(filterItem.type)} ${filterItem.title}`}
        <button
          type="button"
          className="inline-flex items-center p-1 ml-2 text-sm text-white bg-transparent rounded-sm hover:bg-lightPrimary hover:text-darkPrimary"
          data-dismiss-target="#badge-dismiss-green"
          aria-label="Remove"
          onClick={onHandlerClick}
        >
          <svg
            className="w-2 h-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
            />
          </svg>
          <span className="sr-only">Remove badge</span>
        </button>
      </span>
    </>
  );
};

interface SearchParamItem {
  slug: string;
  title: string;
  type: string;
  priceRange?: [number, number];
}

const parseSearchParams = (searchParams: string): SearchParamItem[] => {
  const params = new URLSearchParams(searchParams);
  const result: SearchParamItem[] = [];

  let minPrice: number | null = null;
  let maxPrice: number | null = null;

  params.forEach((value, key) => {
    if (key === 'minPrice') {
      minPrice = parseInt(value, 10);
    } else if (key === 'maxPrice') {
      maxPrice = parseInt(value, 10);
    } else {
      const type = key.endsWith('[]') ? key.slice(0, -2) : key;
      const title = value.replace(/-/g, ' ').replace('m', '&'); // Ajusta el título para 'h&m'
      result.push({ slug: value, title, type });
    }
  });

  // Agregar el rango de precios si existe
  if (minPrice !== null && maxPrice !== null) {
    result.push({
      slug: `${minPrice}-${maxPrice}`,
      title: `Q${minPrice}-Q${maxPrice}`,
      type: 'price',
      priceRange: [minPrice, maxPrice],
    });
  }

  return result;
};
