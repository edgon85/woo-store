import { useFetcher } from '@/hooks';
import { ICategory } from '@/interfaces';
import { usePersonalPreferencesStore } from '@/stores';
import { useRouter } from 'next/navigation';
import { useCallback, useMemo } from 'react';

type Props = {
  toggleMenu: (menuName: string) => void;
  isCollapsed: boolean;
  clothesType: string;
  menuName: string;
};
const COLUMNS = 3;

export const ItemMegaMenu = ({
  isCollapsed,
  clothesType,
  toggleMenu,
  menuName,
}: Props) => {
  const router = useRouter();
  const { gender, setClothesType } = usePersonalPreferencesStore(
    useCallback(
      (state) => ({
        gender: state.gender,
        setClothesType: state.setClothesType,
      }),
      []
    )
  );

  const { data: categories, isLoading } = useFetcher<ICategory[]>(
    `/categories?gender=${gender}&type=${clothesType}`
  );

  const groupedClothingData = useMemo(() => {
    if (isLoading || !categories) return [];

    return Array.from({ length: COLUMNS }, (_, i) =>
      categories.slice(i * 6, (i + 1) * 6)
    );
  }, [categories, isLoading]);

  const handleOnclick = useCallback(
    (category: ICategory) => {
      toggleMenu(menuName);
      setClothesType(clothesType);
      router.push(`/${gender}/${clothesType}/${category.slug}`);
    },
    [toggleMenu, menuName, setClothesType, clothesType, gender, router]
  );

  // if (isLoading) return <div>Cargando...</div>;
  return (
    <div
      id="mega-menu-dropdown"
      className={`absolute z-10 grid ${
        isCollapsed ? 'grid-cols-2 md:grid-cols-3' : 'hidden'
      } w-auto text-sm bg-white border border-gray-100 rounded-lg shadow-md`}
    >
      {groupedClothingData.map((columnData, columnIndex) => (
        <div key={columnIndex} className="p-4 pb-0 text-gray-900 md:pb-4">
          <ul className="space-y-4" aria-labelledby="mega-menu-dropdown-button">
            {columnData.map((category: ICategory) => (
              <li key={category.id}>
                <button
                  onClick={() => handleOnclick(category)}
                  className="text-gray-500 hover:text-darkPrimary capitalize"
                >
                  {category.title}
                </button>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};
