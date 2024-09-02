'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import clsx from 'clsx';

import { ISubcategory } from '@/interfaces';
import { RadiaSelectIcon } from '../icons';
import { useSidebar } from '@/stores';
import { useFetcher } from '@/hooks';

type Props = {
  gender: string;
  category: string;
  clothing_type: string;
  isMobile?: boolean;
};

export const SubcategoriesItems = ({
  gender,
  category,
  clothing_type,
  isMobile = false,
}: Props) => {
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>('');
  const menuFilter = useSidebar((state) => state.onSidebarFilterOpen);
  const router = useRouter();

  const { data: subcategories } = useFetcher<ISubcategory[]>(
    `/subcategories/${gender}/${category}`
  );

  const handleSubcategoryClick = (subSlug: string) => {
    console.log(subSlug);
    if (selectedSubcategory === subSlug) {
      setSelectedSubcategory('');
      router.push(`/catalog/${gender}/${clothing_type}/${category}`);
    } else {
      setSelectedSubcategory(subSlug);
      router.push(`/catalog/${gender}/${clothing_type}/${category}/${subSlug}`);
    }
    if (isMobile) {
      menuFilter();
    }
  };

  return (
    <>
      <div className="divide-y divide-gray-300">
        {subcategories.map((sub: ISubcategory) => {
          return (
            <li
              key={sub.id}
              className="pl-1 pr-2 py-2"
              onClick={() => handleSubcategoryClick(sub.slug!)}
            >
              <label
                htmlFor={sub.slug}
                className={clsx(
                  'flex justify-between items-center cursor-pointer hover:text-cerise-red-500 capitalize',
                  {
                    'text-cerise-red-600': sub.slug == selectedSubcategory,
                  }
                )}
              >
                <span>{sub.title}</span>
                {sub.slug == selectedSubcategory ? (
                  <RadiaSelectIcon size="16" className="text-cerise-red-600" />
                ) : null}
              </label>
            </li>
          );
        })}
      </div>
    </>
  );
};
