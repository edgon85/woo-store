import { BtnCircle } from '../buttons';
import { DropdownAccount } from '../dropdowns';
import { BellIcon } from '../icons';
import { HamburgerButton } from './hamburger-button';
import { LoginRegisterButton } from './login-register-button';


export const NavbarActions = () => {
  return (
    <div className="flex gap-1">
      <div className=" md:hidden"></div>

      <>
        <DropdownAccount />

        <BtnCircle icon={<BellIcon />} />

        <LoginRegisterButton />
        <HamburgerButton />
      </>
    </div>
  );
};
