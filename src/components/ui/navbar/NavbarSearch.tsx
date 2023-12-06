import { SearchIcon } from '../icons';
import { IoIosArrowDown } from 'react-icons/io';

export const NavbarSearch = () => {
  return (
    <form className="w-96 lg:w-[500px] border rounded-full overflow-hidden pr-1 bg-white">
      <div className=" flex">
        <div className="flex-1 relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <SearchIcon />
          </div>
          <input
            type="search"
            id="default-search"
            className="block w-full p-4 ps-10 text-sm text-gray-900 outline-none bg-white"
            placeholder="Search Mockups, Logos..."
            required
          />
        </div>
        <div className="flex">
          <select
            id="countries"
            className="appearance-none border-l pl-2 text-gray-900 text-sm  outline-none"
          >
            <option value="ropa">Ropa</option>
            <option value="zapatos">zapatos</option>
            <option value="accesorios">Accesorios</option>
          </select>
          <p className="self-center">
            <IoIosArrowDown />
          </p>
        </div>
      </div>
    </form>
  );
};
