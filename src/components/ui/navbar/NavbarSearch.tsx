import { SearchIcon } from '../icons';
import styles from './Navbar.module.css';

export const NavbarSearch = () => {
  return (
    <div className={styles.navbarSearch}>
      <div className={styles.navbarContent}>
        <SearchIcon />
        <div className={styles.inputContent}>
          <input type="text" placeholder="buscar..." />
        </div>
        <div className={styles['select-content']}>
          <select>
            <option value="1">Todas las categorías</option>
            <option value="2">Mujeres</option>
            <option value="3">Niños</option>
            <option value="4">Hombres</option>
          </select>
        </div>
      </div>
    </div>
  );
};
