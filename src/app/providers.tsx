'use client';

import { AuthProvider, ModalProvider } from '@/context';
import { SessionProvider } from 'next-auth/react';
import { SWRConfig } from 'swr';

type Props = {
  children: JSX.Element | JSX.Element[];
};

export function Providers({ children }: Props) {
  return (
    <SessionProvider>
      <AuthProvider>
        <SWRConfig
          value={{
            fetcher: (resource, init) =>
              fetch(resource, init).then((res) => res.json()),
          }}
        >
          <ModalProvider>{children}</ModalProvider>
        </SWRConfig>
      </AuthProvider>
    </SessionProvider>
  );
}
