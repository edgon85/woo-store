'use client';

import Link from 'next/link';
import { useEffect, useMemo, useRef, useState, useCallback } from 'react';

import { ICategory } from '@/interfaces';
import { useOnClickOutside } from '@/hooks';
import { getCategories } from '@/actions/categories';
import { usePersonalPreferencesStore } from '@/stores';

interface CategoryMenuProps {
  categoryType: string;
  displayName: string;
}

export const DynamicCategoryMenu: React.FC<CategoryMenuProps> = ({
  categoryType,
  displayName,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const [categories, setCategories] = useState<ICategory[]>([]);

  const gender = usePersonalPreferencesStore((state) => state.gender);
  const setClothesType = usePersonalPreferencesStore(
    (state) => state.setClothesType
  );

  useOnClickOutside(menuRef, () => setIsOpen(false));

  const columns = useMemo(
    () => Math.ceil(categories.length / 4),
    [categories.length]
  );

  const groupedCategoryData = useMemo(() => {
    return Array.from({ length: columns }, (_, i) =>
      categories.slice(i * 4, (i + 1) * 4)
    );
  }, [categories, columns]);

  const toggleMenu = useCallback(() => {
    setClothesType(categoryType);
    setIsOpen((prev) => !prev);
  }, [setClothesType, categoryType]);

  useEffect(() => {
    const fetchData = async () => {
      const { ok, categories } = await getCategories(gender, categoryType);
      if (ok) {
        setCategories(categories);
      }
    };

    fetchData();
  }, [gender, categoryType]);

  return (
    <li>
      <div ref={menuRef}>
        <button
          onClick={toggleMenu}
          id={`mega-menu-${categoryType}`}
          data-dropdown-toggle={`mega-menu-${categoryType}-dropdown`}
          className="text-lg font-bold text-black hover:text-darkPrimary capitalize p-2"
        >
          {displayName}
        </button>
        {isOpen && (
          <div
            id={`mega-menu-${categoryType}-dropdown`}
            className="absolute z-10 grid w-auto text-sm bg-white border border-gray-100 rounded-lg shadow-md"
            style={{
              gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
            }}
          >
            {groupedCategoryData.map((columnData, columnIndex) => (
              <div
                key={columnIndex}
                className="p-4 pb-0 text-gray-900 md:pb-4 dark:text-white"
              >
                <ul
                  className="space-y-4"
                  aria-labelledby={`mega-menu-${categoryType}`}
                >
                  {columnData
                    .sort((a, b) => a.title.localeCompare(b.title))
                    .map((category: ICategory) => (
                      <li key={category.id}>
                        <Link
                          href={`/catalog/${gender}/${categoryType}/${category.slug}`}
                          onClick={toggleMenu}
                          className="text-gray-500 hover:text-darkPrimary capitalize"
                        >
                          {category.title}
                        </Link>
                      </li>
                    ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    </li>
  );
};
