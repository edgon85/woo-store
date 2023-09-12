import { useFetcher, useFilter } from '@/hooks';
import { useRouter } from 'next/navigation';
import { Filter, IClothesState, IMeasurement } from '@/interfaces';
import { measurementFormat } from '@/utils';
import Input from '../../inputs/Input';
import { RadiaSelectIcon } from '../../icons';

export const ClothesStateFilter = () => {
  const router = useRouter();
  const { gender, category, subcategory, clothesType, filters, setFilters } =
    useFilter();

  const { data } = useFetcher<IClothesState[]>(`/clothes-state`);

  const handleChange = (clothesState: IClothesState, isChecked: boolean) => {
    const newFilter: Filter = {
      slug: clothesState.title.replace(/\s+/g, '-'),
      title: clothesState.title,
      type: 'clothes-state',
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
      draft = draft.filter((resp) => newFilter.slug !== resp.slug);

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
        {data.map((clothes) => (
          <li key={clothes.id} className="pl-1 pr-2 py-2">
            <label
              htmlFor={clothes.title}
              className="flex justify-between items-center cursor-pointer hover:text-darkPrimary uppercase"
            >
              <span className='capitalize'>{clothes.title}</span>
              <input
                name={clothes.title}
                value={clothes.title}
                className="w-5 h-5 bg-primary text-primary cursor-pointer"
                type="checkbox"
                id={clothes.title}
                onChange={(e) => handleChange(clothes, e.target.checked)}
                checked={filters.some(
                  (filter) => filter.title === clothes.title
                )}
              />
            </label>
          </li>
        ))}
      </div>
    </>
  );
};

/* 

  const handleMeasurementRadioChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = event.target;

    const newFilter: Filter = {
      slug: value.replace(/\s+/g, '-'),
      title: value,
      type: 'clothes-type',
    };

    setFilters([newFilter]);

    const subCatPath = subcategory.id !== '' ? `/${subcategory.slug}` : '';
    router.push(`/catalog/${gender}/${category.slug}${subCatPath}?filter`);
  };

  return (
    <>
      <div className="divide-y divide-gray-300">
        {data.map((clothesState: IClothesState) => {
          return (
            <li key={clothesState.id} className="pl-1 pr-2 py-2">
              <label
                className="flex justify-between items-center"
                key={clothesState.title}
              >
                <input
                  id="clothesState.title"
                  type="radio"
                  name="selectedMeasurement"
                  value={clothesState.title}
                  className="hidden"
                  //   checked={selectedFilters.selectedMeasurement === clothesState.slug}
                  onChange={handleMeasurementRadioChange}
                />
                <span>{clothesState.title}</span>
                {filters.some(
                  (filter) => filter.title === clothesState.title
                ) ? (
                  <RadiaSelectIcon color="var(--primary)" size="16" />
                ) : null}
              </label>
            </li>
          );
        })}
      </div>
    </>
  );


*/
