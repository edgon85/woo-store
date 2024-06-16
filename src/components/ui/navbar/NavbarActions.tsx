'use client';
import { useRouter } from 'next/navigation';
import { BtnCircle } from '../buttons';
import { DropdownAccount } from '../dropdowns';
import { BellIcon } from '../icons';
import { HamburgerButton } from './hamburger-button';
import { LoginRegisterButton } from './login-register-button';
import { CiMail } from 'react-icons/ci';

export const NavbarActions = () => {
  const router = useRouter();

  return (
    <div className="flex gap-1">
      <div className=" md:hidden"></div>

      <>
        <BtnCircle
          icon={<CiMail size={24} className="font-bold" />}
          onVoidCallback={() => router.push('/inbox')}
        />
        <DropdownAccount />
        <BtnCircle icon={<BellIcon />} />

        <LoginRegisterButton />
        <HamburgerButton />
      </>
    </div>
  );
};
