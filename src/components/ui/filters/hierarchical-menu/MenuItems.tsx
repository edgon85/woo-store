import { CiShirt } from 'react-icons/ci';
import { UserIcon } from '../../icons';
import {
  FaBaby,
  FaHandSparkles,
  FaHome,
  FaShoePrints,
  FaShoppingBag,
  FaWatchmanMonitoring,
} from 'react-icons/fa';
import { BsStar } from 'react-icons/bs';
import { GiPawPrint } from 'react-icons/gi';

const menuItems = [
  {
    id: 'categoria',
    label: 'Categoría',
    children: [
      {
        id: 'vestidos',
        label: 'Vestidos',
        children: [
          { id: 'todos', label: 'Todos' },
          { id: 'mini', label: 'Mini' },
          { id: 'midi', label: 'Midi' },
          { id: 'vestidos-largos', label: 'Vestidos largos' },
          { id: 'ocasiones-especiales', label: 'Ocasiones especiales' },
          { id: 'vestidos-de-verano', label: 'Vestidos de verano' },
        ],
      },
      { id: 'falda', label: 'Falda' },
      { id: 'camisetas-tops', label: 'Camisetas y tops' },
      { id: 'vaqueros', label: 'Vaqueros' },
      { id: 'pantalones-leggings', label: 'Pantalones y leggings' },
      { id: 'shorts', label: 'Shorts' },

      { id: 'calzado', label: 'Calzado', icon: <FaShoePrints /> },
      { id: 'bolsos', label: 'Bolsos', icon: <FaShoppingBag /> },
      {
        id: 'accesorios',
        label: 'Accesorios',
        icon: <FaWatchmanMonitoring />,
      },
      {
        id: 'cuidado-belleza',
        label: 'Cuidado y belleza',
        icon: <FaHandSparkles />,
      },

      { id: 'hombre', label: 'Hombre', icon: <UserIcon /> },
      { id: 'ninos', label: 'Niños', icon: <FaBaby /> },
    ],
  },
  { id: 'talla', label: 'Talla' },
  { id: 'marca', label: 'Marca' },
];

export default menuItems;

/* 
 {
    id: 'categoria',
    label: 'Categoría',
    children: [
      {
        id: 'mujer',
        label: 'Mujer',
        icon: <UserIcon />,
        children: [
          {
            id: 'ropa',
            label: 'Ropa',
            icon: <CiShirt />,
            children: [
              {
                id: 'vestidos',
                label: 'Vestidos',
                children: [
                  { id: 'todos', label: 'Todos' },
                  { id: 'mini', label: 'Mini' },
                  { id: 'midi', label: 'Midi' },
                  { id: 'vestidos-largos', label: 'Vestidos largos' },
                  { id: 'ocasiones-especiales', label: 'Ocasiones especiales' },
                  { id: 'vestidos-de-verano', label: 'Vestidos de verano' },
                ],
              },
              { id: 'falda', label: 'Falda' },
              { id: 'camisetas-tops', label: 'Camisetas y tops' },
              { id: 'vaqueros', label: 'Vaqueros' },
              { id: 'pantalones-leggings', label: 'Pantalones y leggings' },
              { id: 'shorts', label: 'Shorts' },
            ],
          },
          { id: 'calzado', label: 'Calzado', icon: <FaShoePrints /> },
          { id: 'bolsos', label: 'Bolsos', icon: <FaShoppingBag /> },
          {
            id: 'accesorios',
            label: 'Accesorios',
            icon: <FaWatchmanMonitoring />,
          },
          {
            id: 'cuidado-belleza',
            label: 'Cuidado y belleza',
            icon: <FaHandSparkles />,
          },
        ],
      },
      { id: 'hombre', label: 'Hombre', icon: <UserIcon /> },
      { id: 'ninos', label: 'Niños', icon: <FaBaby /> },

    ],
  },
*/
