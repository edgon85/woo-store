'use client';

import { usePathname, useRouter } from 'next/navigation';
import { Filter, IMeasurement } from '@/interfaces';
import { generateFilterURL, measurementFormat } from '@/utils';
import { useEffect } from 'react';
import { useFilterStore, useSidebar } from '@/stores';

type Props = {
  measurements: IMeasurement[];
  isMovil?: boolean;
};

export const MeasurementFilterItems = ({
  measurements,
  isMovil = false,
}: Props) => {
  const pathName = usePathname();
  const { replace } = useRouter();

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
      if (isMovil) {
        menuFilter();
      }
    } else {
      draft = draft.filter((resp) => newFilter.slug !== resp.slug);
      setFilters(draft);
    }
  };

  useEffect(() => {
    const url = generateFilterURL(filters);
    replace(`${pathName}${url}`);
  }, [filters, pathName, replace]);

  return (
    <>
      <div className="divide-y divide-gray-300">
        {measurements.map((measurement) => (
          <li key={measurement.id} className="pl-1 pr-2 py-2">
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
