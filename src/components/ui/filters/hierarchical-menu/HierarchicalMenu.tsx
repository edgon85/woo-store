import { useFetcher } from '@/hooks';
import { useRouter } from 'next/navigation';
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

  const [currentMenu, setCurrentMenu] = useState<MenuItem[]>([]);
  const [menuStack, setMenuStack] = useState<MenuItem[][]>([]);

  const router = useRouter();

  useEffect(() => {
    if (menuItems && menuItems.length > 0 && menuItems[0].children) {
      const initialMenu = menuItems[0].children;
      setCurrentMenu(initialMenu);

      if (initialPath) {
        const pathParts = initialPath.split('/').filter(Boolean);
        let currentLevel = initialMenu;
        const newStack = [];

        for (const part of pathParts) {
          const matchingItem = currentLevel.find(
            (item) => item.label.toLowerCase() === part.toLowerCase()
          );
          if (matchingItem && matchingItem.children) {
            newStack.push(currentLevel);
            currentLevel = matchingItem.children;
          } else {
            break;
          }
        }

        if (newStack.length > 0) {
          setMenuStack(newStack);
          setCurrentMenu(currentLevel);
        }
      }
    }
  }, [menuItems, initialPath]);

  const navigateToSubmenu = (item: MenuItem) => {
    if (item.children) {
      setMenuStack([...menuStack, currentMenu]);
      setCurrentMenu(item.children);
    }
  };

  const navigateBack = () => {
    if (menuStack.length > 0) {
      const previousMenu = menuStack[menuStack.length - 1];
      setCurrentMenu(previousMenu);
      setMenuStack(menuStack.slice(0, -1));
    }
  };

  const buildUrl = (item: MenuItem) => {
    const path = [
      ...menuStack.map(
        (level) => level.find((i) => i.children === currentMenu)?.slug || ''
      ),
      item.slug,
    ].filter(Boolean);

    return `/catalog/${gender}/${clothingType}/${path.join('/')}`;
  };

  const handleItemClick = (item: MenuItem) => {
    const url = buildUrl(item);
    router.push(url);
    if (item.children) {
      navigateToSubmenu(item);
    }
  };

  if (isLoading) return <div>Cargando...</div>;
  if (isError) return <div>Error al cargar el menú</div>;
  if (!menuItems || menuItems.length === 0)
    return <div>No hay datos disponibles</div>;

  return (
    <div className="">
      {menuStack.length > 0 && (
        <button
          onClick={navigateBack}
          className="w-full p-4 text-left flex items-center text-gray-700 hover:bg-gray-100"
        >
          <BsChevronLeft className="mr-2" />
          Atrás
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
