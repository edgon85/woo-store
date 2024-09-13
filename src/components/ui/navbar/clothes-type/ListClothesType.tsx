'use client';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ItemMegaMenu } from './ItemNavClothes';

type MenuName =
  | 'isClothesMenuOpen'
  | 'isShoesMenuOpen'
  | 'isAccessoriesMenuOpen';
type MenuState = Record<MenuName, boolean>;

const MENU_ITEMS: { name: MenuName; label: string; clothesType: string }[] = [
  { name: 'isClothesMenuOpen', label: 'Ropa', clothesType: 'ropa' },
  { name: 'isShoesMenuOpen', label: 'Zapatos', clothesType: 'zapatos' },
  {
    name: 'isAccessoriesMenuOpen',
    label: 'Accesorios',
    clothesType: 'accesorios',
  },
];

export const ListClothesType = () => {
  const [menuState, setMenuState] = useState<MenuState>({
    isClothesMenuOpen: false,
    isShoesMenuOpen: false,
    isAccessoriesMenuOpen: false,
  });

  const clothesRef = useRef<HTMLLIElement>(null);
  const shoesRef = useRef<HTMLLIElement>(null);
  const accessoriesRef = useRef<HTMLLIElement>(null);

  const menuRefs = useMemo(
    () => ({
      isClothesMenuOpen: clothesRef,
      isShoesMenuOpen: shoesRef,
      isAccessoriesMenuOpen: accessoriesRef,
    }),
    []
  );

  const toggleMenu = useCallback((menuName: MenuName | string) => {
    setMenuState((prevState) => {
      const newState = { ...prevState } as MenuState;
      Object.keys(newState).forEach((key) => {
        newState[key as MenuName] =
          key === menuName ? !prevState[key as MenuName] : false;
      });
      return newState;
    });
  }, []);

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      MENU_ITEMS.forEach(({ name }) => {
        if (
          menuRefs[name].current &&
          !menuRefs[name].current!.contains(event.target as Node) &&
          menuState[name]
        ) {
          toggleMenu(name);
        }
      });
    },
    [menuRefs, menuState, toggleMenu]
  );

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [handleClickOutside]);

  return (
    <ul className="flex-1 flex items-center gap-8">
      {MENU_ITEMS.map(({ name, label, clothesType }) => (
        <li key={name} ref={menuRefs[name]}>
          <button
            onClick={() => toggleMenu(name)}
            data-dropdown-toggle="mega-menu-dropdown"
            className="text-lg font-bold text-black hover:text-darkPrimary capitalize p-2"
          >
            {label}
          </button>
          <ItemMegaMenu
            toggleMenu={toggleMenu}
            isCollapsed={menuState[name]}
            clothesType={clothesType}
            menuName={name}
          />
        </li>
      ))}
    </ul>
  );
};
