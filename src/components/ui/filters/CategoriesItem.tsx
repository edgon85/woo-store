'use client';
import { ISubcategory } from '@/interfaces';
import { useEffect, useState } from 'react';
import { RadiaSelectIcon } from '../icons';
import { useParams, useRouter } from 'next/navigation';
import { useSidebar } from '@/stores';
import clsx from 'clsx';

type Props = {
  subcategories: ISubcategory[];
  isMovil?: boolean;
};

export const SubcategoriesItems = ({
  subcategories,
  isMovil = false,
}: Props) => {
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>('');
  const menuFilter = useSidebar((state) => state.onSidebarFilterOpen);
  const router = useRouter();

  const params = useParams();
  const { gender, clothesType, category, subcategory } = params;

  useEffect(() => {
    if (subcategory === undefined) {
      setSelectedSubcategory('');
    } else {
      setSelectedSubcategory(`${subcategory}`);
    }
  }, [subcategory]);

  // Función para manejar el clic en una Subcategoría
  const handleSubcategoryClick = (subSlug: string) => {
    if (selectedSubcategory === subSlug) {
      setSelectedSubcategory('');
      router.push(`/${gender}/${clothesType}/${category}`);
    } else {
      setSelectedSubcategory(subSlug);
      router.push(`/${gender}/${clothesType}/${category}/${subSlug}`);
    }
    if (isMovil) {
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
