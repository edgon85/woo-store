'use client';

import { DropdownAccount } from '../dropdowns';
import { DropDownNotification, InboxNotification } from './notifications';
import { HamburgerButton } from './hamburger-button';
import { LoginRegisterButton } from './login-register-button';
import { useAuth } from '@/hooks';

export const NavbarActions = () => {
  const { isLoggedIn } = useAuth();

  return (
    <div className="flex gap-1">
      <div className=" md:hidden"></div>

      {isLoggedIn && (
        <div className="hidden md:flex gap-1">
          <InboxNotification />
          <DropDownNotification />
          <DropdownAccount />
        </div>
      )}
      <>
        <LoginRegisterButton />
        <HamburgerButton />
      </>
    </div>
  );
};
