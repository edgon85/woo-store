import { useFetcher, useFilter } from '@/hooks';
import { useRouter } from 'next/navigation';
import { Filter, IBrand, IMeasurement } from '@/interfaces';
import { measurementFormat } from '@/utils';

export const MeasurementFilterItems = () => {
  const router = useRouter();
  const {
    gender,
    category,
    subcategory,
    clothesType,
    // measurements,
    // setMeasurements,
    filters,
    setFilters,
  } = useFilter();

  const { data } = useFetcher<IMeasurement[]>(
    `/measurements?gender=${gender}&type=${clothesType}`
  );

  const handleChange = (measurementSize: IMeasurement, isChecked: boolean) => {
    const newFilter: Filter = {
      slug: measurementSize.slug,
      title: measurementSize.size,
      type: 'measurements',
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
        {data.map((measurement) => (
          <li key={measurement.id} className="pl-1 pr-2 py-2">
            <label
              htmlFor={measurement.slug}
              className="flex justify-between items-center cursor-pointer hover:text-darkPrimary uppercase"
            >
              <span>{measurementFormat(category.title, measurement)}</span>
              <input
                name={measurement.size}
                value={measurement.slug}
                className="w-5 h-5 bg-primary text-primary cursor-pointer"
                type="checkbox"
                id={measurement.slug}
                onChange={(e) => handleChange(measurement, e.target.checked)}
                checked={filters.some(
                  (filter) => filter.slug === measurement.slug
                )}
              />
            </label>
          </li>
        ))}
      </div>
    </>
  );
};
