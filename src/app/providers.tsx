'use client';

import { AuthProvider, ModalProvider, CategoryProvider } from '@/context';
import { SessionProvider } from 'next-auth/react';
import { SWRConfig } from 'swr';

type Props = {
  children: JSX.Element | JSX.Element[];
};

export function Providers({ children }: Props) {
  return (
    <SessionProvider>
      <AuthProvider>
        <CategoryProvider>
          <SWRConfig
            value={{
              fetcher: (resource, init) =>
                fetch(resource, init).then((res) => res.json()),
            }}
          >
            <ModalProvider>{children}</ModalProvider>
          </SWRConfig>
        </CategoryProvider>
      </AuthProvider>
    </SessionProvider>
  );
}
