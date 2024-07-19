'use client';

import { memo } from 'react';
import { DropDownNotification, InboxNotification } from './notifications';
import { DropdownAccount } from '../dropdowns';
import { useAuthStore } from '@/stores';
import { LoginRegisterButton } from './login-register-button';
import { HamburgerButton } from './hamburger-button';

const AuthenticatedActions = memo(() => (
  <div className="hidden md:flex gap-1">
    <InboxNotification />
    <DropDownNotification />
    <DropdownAccount />
  </div>
));

AuthenticatedActions.displayName = 'AuthenticatedActions';

export const NavbarActions = memo(() => {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  return (
    <div className="flex gap-1">
      <div className="md:hidden"></div>

      {isLoggedIn && <AuthenticatedActions />}

      <LoginRegisterButton />
      <HamburgerButton />
    </div>
  );
});

NavbarActions.displayName = 'NavbarActions';
