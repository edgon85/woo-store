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
            {/* <AuthProvider> */}
            <AuthStateManager />
            <SocketProvider>{children}</SocketProvider>
            {/* </AuthProvider> */}
          </NotificationProvider>
        </ChatProvider>
      </SessionProvider>
    </SWRConfig>
  );
}
