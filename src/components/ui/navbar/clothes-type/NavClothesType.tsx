'use client';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { GenderSelected } from '../../dropdowns';
import { getCategoryByGenderAndType } from '@/helpers';
import { ICategory } from '@/interfaces';
import Link from 'next/link';

type MenuState = {
  [menuName: string]: boolean;
};

export const NavClothesType = () => {
  const [gender, setGender] = useState('mujer');
  const [menuState, setMenuState] = useState<MenuState>({
    isClothesMenuOpen: false,
    isShoesMenuOpen: false,
    isAccessoriesMenuOpen: false,
  });

  const menuRefs: { [menuName: string]: React.RefObject<HTMLLIElement> } = {
    isClothesMenuOpen: useRef(null),
    isShoesMenuOpen: useRef(null),
    isAccessoriesMenuOpen: useRef(null),
    // Agrega aquí otras referencias de menú según sea necesario
  };

  const toggleMenu = useCallback((menuName: string) => {
    setMenuState((prevState) => ({
      ...Object.keys(prevState).reduce((acc, key) => {
        acc[key] = key === menuName ? !prevState[key] : false;
        return acc;
      }, {} as MenuState),
    }));
  }, []);

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      for (const menuName in menuState) {
        if (
          menuRefs[menuName].current &&
          !menuRefs[menuName].current!.contains(event.target as Node) &&
          menuState[menuName]
        ) {
          toggleMenu(menuName);
        }
      }
    },
    [menuRefs, menuState, toggleMenu]
  );

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [handleClickOutside]);

  return (
    <section className="bg-white px-4 lg:px-0">
      <nav className="main-wrapper pt-4 pb-4 flex justify-between items-center">
        <div className="flex-1">
          <GenderSelected selectGender={setGender} />
        </div>
        <ul className="flex-1 flex  items-center gap-8">
          <li ref={menuRefs['isClothesMenuOpen']}>
            <button
              onClick={() => toggleMenu('isClothesMenuOpen')}
              data-dropdown-toggle="mega-menu-dropdown"
              className="text-lg font-bold text-black hover:text-darkPrimary capitalize p-2"
            >
              ropa
            </button>
            <ItemMegaMenu
              isCollapsed={menuState.isClothesMenuOpen}
              itemName="ropa"
              gender={gender}
            />
          </li>
          <li ref={menuRefs['isShoesMenuOpen']}>
            <button
              onClick={() => toggleMenu('isShoesMenuOpen')}
              data-dropdown-toggle="mega-menu-dropdown"
              className="text-lg font-bold text-black hover:text-darkPrimary capitalize p-2"
            >
              zapatos
            </button>
            <ItemMegaMenu
              isCollapsed={menuState.isShoesMenuOpen}
              itemName="zapatos"
              gender={gender}
            />
          </li>
          <li ref={menuRefs['isAccessoriesMenuOpen']}>
            <button
              onClick={() => toggleMenu('isAccessoriesMenuOpen')}
              data-dropdown-toggle="mega-menu-dropdown"
              className="text-lg font-bold text-black hover:text-darkPrimary capitalize p-2"
            >
              Accesorios
            </button>
            <ItemMegaMenu
              isCollapsed={menuState.isAccessoriesMenuOpen}
              itemName="accesorios"
              gender={gender}
            />
          </li>
        </ul>
        <div className="flex-1"></div>
      </nav>
    </section>
  );
};

type Props = {
  isCollapsed: boolean;
  itemName: string;
  gender: string;
};

export const ItemMegaMenu = ({ isCollapsed, itemName, gender }: Props) => {
  const columns = 3; // Cambia esto al número de columnas que desees (en este caso, 3)
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    getCategories(gender, itemName);
  }, [itemName, gender]);

  // Divide los datos de ropa en grupos de 6 elementos por columna
  const groupedClothingData = [];
  for (let i = 0; i < columns; i++) {
    groupedClothingData.push(categories.slice(i * 6, (i + 1) * 6));
  }

  const getCategories = async (gender: string, clothesType: string) => {
    const data = await getCategoryByGenderAndType(gender, clothesType);
    setCategories(data);
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
            {columnData.map((cat) => (
              <li key={cat.id}>
                <Link
                  href={`${gender}/${cat.slug}`}
                  className="text-gray-500 dark:text-gray-400 hover:text-darkPrimary capitalize"
                >
                  {cat.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};
