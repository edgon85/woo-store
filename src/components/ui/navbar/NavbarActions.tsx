import { BtnCircle } from '../buttons';
import { DropdownAccount } from '../dropdowns';
import { BellIcon, SearchIcon } from '../icons';

export const NavbarActions = () => {
  return (
    <div className="flex gap-2">
      {/* 
      <button
        type="button"
        className="hidden lg:flex focus:outline-none text-white bg-[var(--primary)] hover:bg-pink-700  font-medium rounded-lg text-sm px-5 py-2.5"
      >
        Inicia sesión | Regístrate
      </button> */}
      <div className=" lg:hidden">
        <BtnCircle icon={<SearchIcon />} />
      </div>

      <DropdownAccount />

      <BtnCircle icon={<BellIcon />} />

      <button
        type="button"
        className="hidden lg:block focus:outline-none text-white bg-[var(--primary)] hover:bg-pink-700 font-medium rounded-lg text-sm px-5 py-2.5 "
      >
        VENDER AHORA
      </button>
    </div>
  );
};
