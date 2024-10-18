import Image from 'next/image';
import Link from 'next/link';

import { BtnActions } from './btn-actions';
import logo from '../../../../public/logo-lila.svg';
import { SearchInput } from './search/SearchInput';

import { MegaMenu } from './';

export const Navbar = () => {
  return (
    <>
      <div className="h-[128px] md:h-[132px]"></div>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow">
        <div className="main-wrapper h-full flex flex-col py-2 md:py-2.5">
          <nav className="flex items-center justify-between px-4 lg:px-0 h-[56px]  mx-auto w-full">
            <div className="flex-shrink-0">
              <Link href="/">
                <Image src={logo} alt="Logo de woo" priority />
              </Link>
            </div>
            <div className="flex-grow mx-4 hidden md:flex justify-center">
              <div className="w-full max-w-xl">
                <SearchInput />
              </div>
            </div>
            <div className="flex-shrink-0">
              <BtnActions />
            </div>
          </nav>
          <nav className="flex items-center justify-center px-4 md:px-0 h-[56px]">
            <div className="w-full flex justify-center items-center md:hidden">
              <SearchInput />
            </div>
            <div className="w-full max-w-lg mx-auto hidden md:flex justify-center">
              <div className="flex-shrink-0"></div>
              <div className="flex-grow mx-4 hidden md:flex justify-center">
                <div className="w-full max-w-xl">
                  <MegaMenu />
                </div>
              </div>
              <div className="flex-shrink-0"></div>
            </div>
          </nav>
        </div>
      </header>
    </>
  );
};
