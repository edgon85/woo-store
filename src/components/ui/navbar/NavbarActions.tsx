'use client';

import { DropdownAccount } from '../dropdowns';
import { HamburgerButton } from './hamburger-button';
import { LoginRegisterButton } from './login-register-button';
import { DropDownNotification } from './notifications/DropDownNotification';
import { InboxNotification } from './notifications/InboxNotification';
import { useAuth } from '@/hooks';

export const NavbarActions = () => {
  const { isLoggedIn } = useAuth();

  return (
    <div className="flex gap-1">
      <div className=" md:hidden"></div>

      {isLoggedIn && (
        <div className="hidden md:flex gap-1">
          <InboxNotification />
          <DropdownAccount />
          <DropDownNotification />
        </div>
      )}
      <>
        <LoginRegisterButton />
        <HamburgerButton />
      </>
    </div>
  );
};
