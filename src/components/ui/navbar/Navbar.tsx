import Image from 'next/image';
import styles from './Navbar.module.css';
import logo from '../../../../public/logo2.svg';
import { NavbarSearch, NavbarActions } from './';

export const Navbar = () => {
  return (
    <nav className={styles.navbar}>
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
    </nav>
  );
};
