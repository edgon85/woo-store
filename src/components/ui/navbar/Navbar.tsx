import Image from 'next/image';
import Link from 'next/link';

import { BtnActions } from './btn-actions';
import logo from '../../../../public/logo.svg';
import { SearchInput } from './search/SearchInput';
import { GenderSelected } from '../dropdowns';
import { ListClothesType } from './clothes-type/ListClothesType';

export const Navbar = () => {
  return (
    <>
      <div className="h-[144px]"></div>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white h-[144px]">
        <div className="main-wrapper h-full flex flex-col">
          <nav className="flex items-center justify-between py-2 md:py-2.5 flex-grow px-4 md:px-0">
            <div className="flex-shrink-0">
              <Link href="/">
                <Image src={logo} alt="Logo de woo" priority />
              </Link>
            </div>
            <div className="flex-grow mx-4 hidden md:block max-w-2xl">
              <SearchInput />
            </div>
            <div className="flex-shrink-0">
              <BtnActions />
            </div>
          </nav>
          <nav className="flex items-center justify-center py-2 md:py-2.5 px-4 md:px-0">
            <div className="w-full flex justify-center items-center md:hidden">
              <SearchInput />
            </div>
            <div className="w-full max-w-lg mx-auto hidden md:flex justify-center">
              <ListClothesType />
            </div>
          </nav>
        </div>
      </header>
    </>
  );
};
{
  /* <div className="flex-1">
  <GenderSelected />
</div> */
}
