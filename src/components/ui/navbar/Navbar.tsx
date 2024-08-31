import { Suspense } from 'react';

import Image from 'next/image';
import logo from '../../../../public/logo.svg';

import Link from 'next/link';
import { GenderSelected } from '../dropdowns';
import { NavbarSearch, NavbarActions } from './';
import { ButtonSkeleton } from '../skeletons';
import {
  BtnNotification,
  BtnApps,
  BtnUserMenu,
  BtnSearch,
  BtnSellNow,
  BtnLoginRegister,
  BtnActions,
} from './btn-actions';

export const Navbar = () => {
  return (
    <header className="antialiased bg-white">
      <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 main-wrapper">
        <div className="flex flex-wrap justify-between items-center">
          <div className="flex justify-start items-center">
            <Link href="/">
              <Image src={logo} alt="Logo de woo" priority />
            </Link>
            <form className="hidden lg:block lg:pl-2">
              <label htmlFor="topbar-search" className="sr-only">
                Search
              </label>
              <div className="relative mt-1 lg:w-96">
                <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-500 "
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    {' '}
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />{' '}
                  </svg>
                </div>
                <input
                  type="text"
                  name="email"
                  id="topbar-search"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-9 p-2.5 "
                  placeholder="Search"
                />
              </div>
            </form>
          </div>
          <div className="flex items-center lg:order-2">
            {/* <!-- search --> */}
            <BtnActions />
          </div>
        </div>
      </nav>
    </header>
  );
};

/* 
    <nav className="px-4 lg:px-0 bg-white shadow-sm md:shadow-none">
      <div className="main-wrapper">
        <div className="flex justify-between items-center h-20">
          <div className="burgerIcon md:hidden">
            <GenderSelected />
          </div>
          <div className="logo cursor-pointer">
            <Link href="/">
              <Image src={logo} alt="Logo de woo" priority />
            </Link>
          </div>

          <div className="flex-1  hidden md:flex justify-center items-center">
            <NavbarSearch />
          </div>

          <Suspense fallback={<ButtonSkeleton />}>
            <NavbarActions />
          </Suspense>
        </div>
      </div>
      <div className="md:hidden flex justify-center pb-2">
        <NavbarSearch />
      </div>
    </nav>


*/
