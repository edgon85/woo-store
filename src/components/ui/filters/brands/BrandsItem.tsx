import { useFetcher, useFilter } from '@/hooks';
import { useRouter } from 'next/navigation';
import { ChangeEvent, useEffect, useState } from 'react';
import styles from '../Categories.module.css';
import { IBrand } from '@/interfaces';
import { getBrandData } from '@/helpers';
import { useDebounce } from '@/hooks/useDebounce';

export const BrandsItem = () => {
  const router = useRouter();
  const { gender, category, brands, setBrands, subcategory } = useFilter();
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

  const handleChange = (brandSlug: string, isChecked: boolean) => {
    let draft = structuredClone(brands);
    const subCatPath = subcategory.id !== '' ? `/${subcategory.slug}` : '';

    if (isChecked) {
      draft.push(brandSlug);

      setBrands([...draft]);

      draft.length !== 0
        ? router.push(
            `/catalog/${gender}/${category.slug}${subCatPath}?brand=${[
              ...draft,
            ].join(',')}`
          )
        : router.push(`/${gender}/${category.slug}${subCatPath}`);
    } else {
      draft = draft.filter((resp) => brandSlug !== resp);

      setBrands(draft);

      draft.length !== 0
        ? router.push(
            `/catalog/${gender}/${category.slug}${subCatPath}?brand=${[
              ...draft,
            ].join(',')}`
          )
        : router.push(`/${gender}/${category.slug}${subCatPath}`);
    }
  };

  return (
    <>
      <input
        className="block w-full  p-4 text-gray-900 sm:text-md rounded-md focus:ring-lightPrimary focus:border-lightPrimary outline-none"
        type="text"
        name=""
        id=""
        placeholder="buscar marca"
        onChange={handleInputChange}
      />
      {searchResults.map((brandData) => (
        <div key={brandData.id}>
          <label htmlFor={brandData.slug} className={styles.label}>
            <span className="text-black capitalize hover:text-darkPrimary py-2">
              {brandData.title}
            </span>
            <input
              name={brandData.title}
              value={brandData.slug}
              className="!block w-5 h-5 bg-primary text-primary"
              type="checkbox"
              id={brandData.slug}
              onChange={(e) => handleChange(brandData.slug, e.target.checked)}
              checked={brands.includes(brandData.slug)}
            />
          </label>
        </div>
      ))}
    </>
  );
};
