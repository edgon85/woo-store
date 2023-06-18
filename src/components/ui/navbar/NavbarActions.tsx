import { DropdownAccount } from '../dropdowns';
import { BellIcon } from '../icons';

export const NavbarActions = () => {
  return (
    <div className="flex gap-2 ">
      <button
        type="button"
        className="focus:outline-none text-white bg-[var(--primary)] hover:bg-pink-700  font-medium rounded-lg text-sm px-5 py-2.5"
      >
        Inicia sesión | Regístrate
      </button>
      {/* <DropdownAccount />
      <button
        className="bg-gray-200 hover:bg-gray-300 text-black font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center"
        type="button"
      >
        <BellIcon />
      </button>

      <button
        type="button"
        className="focus:outline-none text-white bg-[var(--primary)] hover:bg-pink-700 font-medium rounded-lg text-sm px-5 py-2.5 "
      >
        VENDER AHORA
      </button> */}
    </div>
  );
};
