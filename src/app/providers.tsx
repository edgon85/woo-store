'use client';

import { AuthProvider, ModalProvider, CategoryProvider } from '@/context';
import { SessionProvider } from 'next-auth/react';
import { SWRConfig } from 'swr';

type Props = {
  children: JSX.Element | JSX.Element[];
};

export function Providers({ children }: Props) {
  return (
    <SWRConfig
      value={{
        fetcher: (resource, init) =>
          fetch(resource, init).then((res) => res.json()),
      }}
    >
      <SessionProvider>
        <AuthProvider>
          <CategoryProvider>
            <ModalProvider>{children}</ModalProvider>
          </CategoryProvider>
        </AuthProvider>
      </SessionProvider>
    </SWRConfig>
  );
}
