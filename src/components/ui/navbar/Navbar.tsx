import Image from 'next/image';
import logo from '../../../../public/logo2.svg';
import { NavbarSearch, NavbarActions } from './';
import Link from 'next/link';
import { GenderSelected } from '../dropdowns';

export const Navbar = () => {
  return (
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

          <div className="">
            <NavbarActions />
          </div>
        </div>
      </div>
      <div className="md:hidden flex justify-center pb-2">
        <NavbarSearch />
      </div>
    </nav>
  );
};
