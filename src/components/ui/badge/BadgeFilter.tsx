'use client';
import { useFilter } from '@/hooks';
import { Filter } from '@/interfaces';
import { usePathname, useRouter } from 'next/navigation';
import { BadgeCleanFilters } from './BadgeCleanFilters';
import { useEffect } from 'react';
import { generateFilterURL } from '@/utils';

export const BadgeFilterList = () => {
  const { filters } = useFilter();

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
