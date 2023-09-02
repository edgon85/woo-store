'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import { GenderSelected } from '../../dropdowns';

import { ItemMegaMenu } from './ItemNavClothes';

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
              toggleMenu={toggleMenu}
              isCollapsed={menuState.isClothesMenuOpen}
              itemName="ropa"
              gender={gender}
              menuName="isClothesMenuOpen"
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
              toggleMenu={toggleMenu}
              isCollapsed={menuState.isShoesMenuOpen}
              itemName="zapatos"
              gender={gender}
              menuName="isShoesMenuOpen"
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
              toggleMenu={toggleMenu}
              isCollapsed={menuState.isAccessoriesMenuOpen}
              itemName="accesorios"
              gender={gender}
              menuName="isAccessoriesMenuOpen"
            />
          </li>
        </ul>
        <div className="flex-1"></div>
      </nav>
    </section>
  );
};
