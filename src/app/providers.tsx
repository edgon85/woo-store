'use client';

import { AuthStateManager } from '@/components/auth/AuthStateManager';
import {
  AuthProvider,
  ChatProvider,
  NotificationProvider,
  SocketProvider,
} from '@/context';
import { SessionProvider } from 'next-auth/react';
import { SWRConfig } from 'swr';
import { Suspense } from 'react';

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
        <ChatProvider>
          <NotificationProvider>
            <AuthStateManager />
            <SocketProvider>
              {/* <Suspense> */}
              {children}
              {/* </Suspense> */}
            </SocketProvider>
          </NotificationProvider>
        </ChatProvider>
      </SessionProvider>
    </SWRConfig>
  );
}
