'use client';

import { useAuthStore } from '@/stores';
import { memo } from 'react';
import { BtnNotification } from './BtnNotification';
import { BtnApps } from './BtnApps';
import { BtnUserMenu } from './BtnUserMenu';
import { BtnSellNow } from './BtnSellNow';
import { BtnLoginRegister } from './BtnLoginRegister';
import { HamburgerButton } from '../hamburger-button';
import { BtnSearch } from './BtnSearch';
import { InboxNotification } from '../notifications';

const AuthenticatedActions = memo(() => (
  <div className="flex gap-1">
    <BtnNotification />
    <BtnApps />
    <BtnUserMenu />
    <BtnSellNow />
  </div>
));

AuthenticatedActions.displayName = 'AuthenticatedActions';

export const BtnActions = memo(() => {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  return (
    <div className="flex gap-1">
      <BtnSearch />
      {isLoggedIn ? <AuthenticatedActions /> : <BtnLoginRegister />}
      <HamburgerButton />
    </div>
  );
});

BtnActions.displayName = 'BtnActions';
