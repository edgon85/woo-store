import { useFetcher } from '@/hooks';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';

interface MenuItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  children?: MenuItem[];
  slug?: string;
}

type Props = {
  gender: string;
  clothingType: string;
  initialPath?: string;
};

export const HierarchicalMenu = ({
  gender,
  clothingType,
  initialPath,
}: Props) => {
  const {
    data: menuItems,
    isLoading,
    isError,
  } = useFetcher<MenuItem[]>(`/subcategories/menu/${gender}/${clothingType}`);
  const params = useParams();
  const [currentMenu, setCurrentMenu] = useState<MenuItem[]>([]);
  const [menuStack, setMenuStack] = useState<MenuItem[][]>([]);
  const [urlStack, setUrlStack] = useState<string[]>([]);

  const { category } = params;

  const router = useRouter();

  useEffect(() => {
    if (menuItems && menuItems.length > 0 && menuItems[0].children) {
      const initialMenu = menuItems[0].children;
      setCurrentMenu(initialMenu);
      setUrlStack([`/catalog/${gender}/${clothingType}`]);

      if (initialPath) {
        const pathParts = initialPath.split('/').filter(Boolean);
        let currentLevel = initialMenu;
        const newStack = [initialMenu];
        const newUrlStack = [`/catalog/${gender}/${clothingType}`];

        for (const part of pathParts) {
          const matchingItem = currentLevel.find(
            (item) => item.slug?.toLowerCase() === part.toLowerCase()
          );
          if (matchingItem) {
            newUrlStack.push(
              `${newUrlStack[newUrlStack.length - 1]}/${matchingItem.slug}`
            );
            if (matchingItem.children) {
              newStack.push(matchingItem.children);
              currentLevel = matchingItem.children;
            } else {
              break;
            }
          } else {
            break;
          }
        }

        setMenuStack(newStack.slice(0, -1));
        setCurrentMenu(currentLevel);
        setUrlStack(newUrlStack);
      }
    }
  }, [menuItems, initialPath, gender, clothingType]);

  const navigateToSubmenu = (item: MenuItem) => {
    if (item.children) {
      setMenuStack([...menuStack, currentMenu]);
      setCurrentMenu(item.children);
      setUrlStack([
        ...urlStack,
        `${urlStack[urlStack.length - 1]}/${item.slug}`,
      ]);
      router.push(`${urlStack[urlStack.length - 1]}/${item.slug}`);
    }
  };

  const navigateBack = () => {
    if (menuStack.length > 0) {
      const previousMenu = menuStack[menuStack.length - 1];
      const previousUrl = urlStack[urlStack.length - 2];
      setCurrentMenu(previousMenu);
      setMenuStack(menuStack.slice(0, -1));
      setUrlStack(urlStack.slice(0, -1));
      router.push(previousUrl);
    } else {
      // Si estamos en el nivel superior, volvemos a la página principal de la categoría
      router.push(`/catalog/${gender}/${clothingType}`);
    }
  };

  const handleItemClick = (item: MenuItem) => {
    const newUrl = `${urlStack[urlStack.length - 1]}/${item.slug}`;
    router.push(newUrl);
    if (item.children) {
      navigateToSubmenu(item);
    }
  };

  if (isLoading) return <div>Cargando...</div>;
  if (isError) return <div>Error al cargar el menú</div>;
  if (!menuItems || menuItems.length === 0)
    return <div>No hay datos disponibles</div>;

  return (
    <div className="divide-y divide-gray-300">
      {menuStack.length > 0 && (
        <button
          onClick={navigateBack}
          className="w-full p-4 text-left flex items-center text-gray-700 hover:bg-gray-100"
        >
          <BsChevronLeft className="mr-2" />
          <div className="w-full flex justify-between">
            <span>Atrás</span>
            <span className='text-cerise-red-600'>{category ? category.toString() : ''}</span>
          </div>
        </button>
      )}
      {currentMenu.map((item) => (
        <button
          key={item.id}
          onClick={() => handleItemClick(item)}
          className="w-full p-4 text-left flex items-center justify-between text-gray-700 hover:bg-gray-100"
        >
          <span>{item.label}</span>
          {item.children && <BsChevronRight />}
        </button>
      ))}
    </div>
  );
};
