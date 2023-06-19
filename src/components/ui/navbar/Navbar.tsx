import Image from 'next/image';
import styles from './Navbar.module.css';
import logo from '../../../../public/logo2.svg';
import { NavbarSearch, NavbarActions } from './';
import { MenuIcon } from '../icons';

export const Navbar = () => {
  return (
    <nav className="px-4 lg:px-0 bg-white">
      <div className="main-wrapper">
        {/* <div className={styles.content}> */}
        <div className="flex justify-between items-center h-20">
            <div className="burgerIcon lg:hidden">
              <MenuIcon />
            </div>
          <div className="logo">
            <Image src={logo} alt="Logo de woo" priority />
          </div>

          <div className="hidden lg:block">
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

/*  <nav className={styles.navbar}>
      <div className="main-wrapper">
        <div className={styles.content}>
          <div className="logo">
            <Image src={logo} alt="Logo de woo" priority />
          </div>

          <div className="search-section">
            <NavbarSearch />
          </div>

          <div className="">
            <NavbarActions />
          </div>
        </div>
      </div>
    </nav> */
