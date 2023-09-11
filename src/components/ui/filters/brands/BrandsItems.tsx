import { useFetcher, useFilter } from '@/hooks';
import { useRouter } from 'next/navigation';
import { ChangeEvent, useEffect, useState } from 'react';
import { Filter, IBrand } from '@/interfaces';
import { getBrandData } from '@/helpers';
import { useDebounce } from '@/hooks/useDebounce';

export const BrandsItems = () => {
  const router = useRouter();
  const {
    gender,
    category,
    // brands,
    // setBrands,
    filters,
    setFilters,
    subcategory,
  } = useFilter();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchResults, setSearchResults] = useState<IBrand[]>([]);
  const { debounceValue: debounceSearch } = useDebounce(searchQuery, 500);

  const { data } = useFetcher<IBrand[]>('/brands/all?limit=10');

  useEffect(() => {
    if (searchQuery === '') {
      setSearchResults(data);
    } else {
      performSearch(debounceSearch);
    }
  }, [data, debounceSearch, searchQuery]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearchQuery(value.toLowerCase());
  };

  const performSearch = async (query: string) => {
    // setLoading(true);
    await getBrandData(query).then((data) => {
      setSearchResults(data);
      // setLoading(false);
    });
  };

  const handleChange = (brandFilter: IBrand, isChecked: boolean) => {
    const newFilter: Filter = {
      slug: brandFilter.slug,
      title: brandFilter.title,
      type: 'brand',
    };

    let draft = structuredClone(filters);
    const subCatPath = subcategory.id !== '' ? `/${subcategory.slug}` : '';

    if (isChecked) {
      draft.push(newFilter);

      const slugs = draft.map((item) => item.slug);
      setFilters([...draft]);

      draft.length !== 0
        ? router.push(
            `/catalog/${gender}/${category.slug}${subCatPath}?filter=${[
              ...slugs,
            ].join(',')}`
          )
        : router.push(`/${gender}/${category.slug}${subCatPath}`);
    } else {
      draft = draft.filter((resp) => newFilter === resp);

      console.log(draft);
      const slugs = draft.map((item) => item.slug);
      setFilters(draft);

      draft.length !== 0
        ? router.push(
            `/catalog/${gender}/${category.slug}${subCatPath}?filter=${[
              ...slugs,
            ].join(',')}`
          )
        : router.push(`/${gender}/${category.slug}${subCatPath}`);
    }
  };

  return (
    <>
      <div className="divide-y divide-gray-300">
        <input
          className="block w-full mt-2 mb-2 p-2 text-gray-900 sm:text-md rounded-md focus:ring-lightPrimary focus:border-lightPrimary outline-none"
          type="text"
          placeholder="Buscar marca"
          onChange={handleInputChange}
        />
        {searchResults.map((brandData) => (
          <li key={brandData.id} className="pl-1 pr-2 py-2">
            <label
              htmlFor={brandData.slug}
              className="flex justify-between items-center cursor-pointer hover:text-darkPrimary capitalize"
            >
              <span>{brandData.title}</span>
              <input
                name={brandData.title}
                value={brandData.slug}
                className="w-5 h-5 bg-primary text-primary cursor-pointer"
                type="checkbox"
                id={brandData.slug}
                onChange={(e) => handleChange(brandData, e.target.checked)}
                checked={filters.some((brand) => brand.slug === brandData.slug)}
              />
            </label>
          </li>
        ))}
      </div>
    </>
  );
};
