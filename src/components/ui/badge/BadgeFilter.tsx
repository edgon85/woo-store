import { useFilter } from '@/hooks';
import { Filter } from '@/interfaces';
import { useRouter } from 'next/navigation';

type Props = {
  filterItem: Filter;
};

export const BadgeFilter = ({ filterItem }: Props) => {
  const router = useRouter();
  const { gender, category, filters, setFilters, subcategory } = useFilter();
  let title: string = '';

  const onHandlerClick = () => {
    const subCatPath = subcategory.id !== '' ? `/${subcategory.slug}` : '';

    const draft = filters.filter((resp) => filterItem !== resp);
    const slugs = draft.map((item) => item.slug);
    setFilters(draft);

    draft.length !== 0
      ? router.push(
          `/catalog/${gender}/${category.slug}${subCatPath}?filter=${[
            ...slugs,
          ].join(',')}`
        )
      : router.push(`/${gender}/${category.slug}${subCatPath}`);
  };

  const titleOption = (tupe: string) => {
    switch (tupe) {
      case 'brand':
        return (title = 'Marca: ');

      case 'measurement':
        return (title = 'Talla: ');

      case 'clothesState':
        return (title = 'Estado: ');

      case 'color':
        return (title = 'color: ');
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
