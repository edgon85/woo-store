import { GrRadialSelected } from 'react-icons/gr';
import { RadiaSelectIcon } from '../icons';

type Props = {
  gender: string;
  clothesType: string;
};

export const CategoriesItem = ({ gender, clothesType }: Props) => {
  return (
    <>
      <input type="checkbox" id="subcategory" className="hidden" />
      <label htmlFor="subcategory">Subcategorías</label>

      <div>
        <ul className="pl-4">
          <li
            className={`flex justify-between items-center text-darkPrimary  py-2 cursor-pointer`}
          >
            <span>Abrigos</span>
            <RadiaSelectIcon color="var(--primary)" />
          </li>
        </ul>
      </div>
    </>
  );
};
/*  <ul className="pl-4">
     <li
       className={`flex justify-between items-center text-darkPrimary  py-2 cursor-pointer`}
     >
       <span>Abrigos</span>
       <IoIosCheckmark size={24} color="var(--primary)" />
     </li>
   </ul> */
/* 

<div
          onClick={() => handleClick(brand)}
          key={brand.id}
          className={`flex justify-between items-center 
          ${branSelectedId === brand.id ? 'text-darkPrimary' : 'text-black'}
              border-b py-4 cursor-pointer`}
        >
          <span>{brand.title}</span>
          {branSelectedId === brand.id ? (
            <IoIosCheckmark size={24} color="var(--primary)" />
          ) : null}
        </div>
*/
