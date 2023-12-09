'use client';
import { ISubcategory } from '@/interfaces';
import { useEffect, useState } from 'react';
import { RadiaSelectIcon } from '../icons';
import { useParams, usePathname, useRouter } from 'next/navigation';

type Props = {
  subcategories: ISubcategory[];
};

export const SubcategoriesItems = ({ subcategories }: Props) => {
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>('');
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
    setSelectedSubcategory(subSlug);
    router.push(`/${gender}/${clothesType}/${category}/${subSlug}`);
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
                className="flex justify-between items-center cursor-pointer hover:text-darkPrimary capitalize"
              >
                <span>{sub.title}</span>
                {sub.slug == selectedSubcategory ? (
                  <RadiaSelectIcon color="var(--primary)" size="16" />
                ) : null}
              </label>
            </li>
          );
        })}
      </div>
    </>
  );
};