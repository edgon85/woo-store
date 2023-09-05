import { useFetchCategoryByGenderAndType } from '@/helpers';
import { useCategory } from '@/hooks';
import { useRouter } from 'next/navigation';

type Props = {
  isCollapsed: boolean;
  itemName: string;
  gender: string;
  toggleMenu: (title: string) => void;
  menuName: string;
};

export const ItemMegaMenu = ({
  isCollapsed,
  itemName,
  // gender,
  toggleMenu,
  menuName,
}: Props) => {
  const router = useRouter();
  const { gender, setClothesType, setCategoryId } = useCategory();

  const { categories: cat, loading } = useFetchCategoryByGenderAndType(
    gender,
    itemName
  );

  const columns = 3; // Cambia esto al número de columnas que desees (en este caso, 3)

  const groupedClothingData = [];

  if (!loading) {
    // Divide los datos de ropa en grupos de 6 elementos por columna
    for (let i = 0; i < columns; i++) {
      groupedClothingData.push(cat.slice(i * 6, (i + 1) * 6));
    }
  }

  const handleOnclick = (slug: string, catId: string) => {
    router.push(`/${gender}/${slug}`);
    toggleMenu(menuName);
    setClothesType(itemName);
    setCategoryId(catId);
  };

  return (
    <div
      id="mega-menu-dropdown"
      className={`absolute z-10 grid ${
        isCollapsed ? 'grid-cols-2' : 'hidden'
      } w-auto text-sm bg-white border border-gray-100 rounded-lg shadow-md dark:border-gray-700 ${
        isCollapsed ? 'md:grid-cols-3' : ''
      } dark:bg-gray-700`}
    >
      {groupedClothingData.map((columnData, columnIndex) => (
        <div key={columnIndex} className="p-4 pb-0 text-gray-900 md:pb-4">
          <ul className="space-y-4" aria-labelledby="mega-menu-dropdown-button">
            {columnData.map((cat: any) => (
              <li key={cat.id}>
                <button
                  onClick={() => handleOnclick(cat.slug, cat.id)}
                  // href='#'
                  className="text-gray-500 dark:text-gray-400 hover:text-darkPrimary capitalize"
                >
                  {cat.title}
                </button>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};
