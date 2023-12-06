import Image from 'next/image';
import logo from '../../../../public/logo2.svg';
import { NavbarSearch, NavbarActions } from './';
import { MenuIcon } from '../icons';
import Link from 'next/link';

export const Navbar = () => {
  return (
    <nav className="px-4 lg:px-0 bg-white">
      <div className="main-wrapper">
        <div className="flex justify-between items-center h-20">
          <div className="burgerIcon md:hidden">
            <MenuIcon />
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
    </nav>
  );
};
