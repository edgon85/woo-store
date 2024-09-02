'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Filter, IMeasurement } from '@/interfaces';
import { generateFilterURL, measurementFormat } from '@/utils';
import { useEffect } from 'react';
import {
  useFilterStore,
  usePersonalPreferencesStore,
  useSidebar,
} from '@/stores';
import { useFetcher } from '@/hooks';

type Props = {
  isMobile?: boolean;
  isSearch?: boolean;
};

export const MeasurementFilterItems = ({
  /*  gender,
  clothing_type, */
  isMobile = false,
  isSearch = false,
}: Props) => {
  const gender = usePersonalPreferencesStore((state) => state.gender);
  const clothing_type = usePersonalPreferencesStore(
    (state) => state.clothesType
  );

  const { data: measurements } = useFetcher<IMeasurement[]>(
    `/measurements?gender=${gender}&type=${clothing_type}`
  );

  const pathName = usePathname();
  const { replace } = useRouter();
  const searchParams = useSearchParams();

  const searchTerm = searchParams.get('s')?.toString();
  const genderSearch = searchParams.get('gender')?.toString();

  const filters = useFilterStore((state) => state.filters);
  const setFilters = useFilterStore((state) => state.setFilters);
  const menuFilter = useSidebar((state) => state.onSidebarFilterOpen);

  const handleChange = (measurementSize: IMeasurement, isChecked: boolean) => {
    const newFilter: Filter = {
      slug: measurementSize.slug,
      title: measurementSize.size,
      type: 'measurements',
    };

    let draft = structuredClone(filters);

    if (isChecked) {
      draft.push(newFilter);
      setFilters([...draft]);
      if (isMobile) {
        menuFilter();
      }
    } else {
      draft = draft.filter((resp) => newFilter.slug !== resp.slug);
      setFilters(draft);
    }
  };

  useEffect(() => {
    if (isSearch) {
      const url = generateFilterURL(filters, true, searchTerm, genderSearch);
      replace(`${pathName}${url}`);
    } else {
      const url = generateFilterURL(filters);
      replace(`${pathName}${url}`);
    }
  }, [filters, gender, genderSearch, isSearch, pathName, replace, searchTerm]);

  return (
    <>
      <div className="divide-y divide-gray-300">
        {measurements.map((measurement) => (
          <li key={measurement.id} className="p-4">
            <label
              htmlFor={measurement.slug}
              className="flex justify-between items-center cursor-pointer hover:text-darkPrimary uppercase"
            >
              {/* TODO: <span>{measurementFormat(category.title, measurement)}</span> */}
              <span>{measurement.size}</span>
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
