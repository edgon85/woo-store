import { useFetcher } from '@/hooks';
import { useSidebar } from '@/stores';
import clsx from 'clsx';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '../../icons';

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
  isMobile?: boolean;
};

export const HierarchicalMenu = ({
  gender,
  clothingType,
  initialPath,
  isMobile = false,
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
  const [currentCategory, setCurrentCategory] = useState<string>('');
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const menuFilter = useSidebar((state) => state.onSidebarFilterOpen);

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
            setCurrentCategory(matchingItem.label);
            setSelectedItem(matchingItem.slug!);
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
      setCurrentCategory(item.label);
      setSelectedItem(item.slug!);
      setUrlStack([
        ...urlStack,
        `${urlStack[urlStack.length - 1]}/${item.slug}`,
      ]);
      // if (isMobile) menuFilter();
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

      // Actualizar la categoría actual
      if (menuStack.length > 1) {
        const previousCategory = menuStack[menuStack.length - 2].find(
          (item) => item.children === previousMenu
        );
        setCurrentCategory(previousCategory?.label || '');
        setSelectedItem(previousCategory?.slug || null);
      } else {
        setCurrentCategory('');
        setSelectedItem(null);
      }

      router.push(previousUrl);
      if (isMobile) menuFilter();
    } else {
      router.push(`/catalog/${gender}/${clothingType}`);
      if (isMobile) menuFilter();
      setCurrentCategory('');
      setSelectedItem(null);
    }
  };

  const handleItemClick = (item: MenuItem) => {
    if (item.children) {
      navigateToSubmenu(item);
      if (isMobile) menuFilter();
    } else {
      const gender = params.gender.toString();
      const clothing = params.clothing_type.toString();
      const category = params.category.toString();

      const newUrl = `/catalog/${gender}/${clothing}/${category}/${item.slug}`;
      setCurrentCategory(item.label);
      setSelectedItem(item.slug!);
      setUrlStack([...urlStack.slice(0, -1), newUrl]);
      router.push(newUrl);
      if (isMobile) menuFilter();
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
          <ChevronLeftIcon className="w-6 h-6" />
          <div className="w-full flex justify-between">
            <span>Atrás</span>
            <span className="text-cerise-red-600">{currentCategory}</span>
          </div>
        </button>
      )}
      {currentMenu.map((item) => (
        <button
          key={item.id}
          onClick={() => handleItemClick(item)}
          className={clsx(
            'w-full p-4 text-left flex items-center justify-between hover:bg-gray-100',
            {
              'text-cerise-red-600': selectedItem === item.slug,
              'text-gray-700': selectedItem !== item.slug,
            }
          )}
        >
          <span className="capitalize">{item.label}</span>
          {item.children && <ChevronRightIcon />}
        </button>
      ))}
    </div>
  );
};
