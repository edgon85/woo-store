'use client';

import { CustomModal } from '@/components';
import { AuthStateManager } from '@/components/auth/AuthStateManager';
import { ChatProvider, NotificationProvider, SocketProvider } from '@/context';
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
            <AuthStateManager />
            <SocketProvider>
              {/* <Suspense> */}
              {children}
              {/* </Suspense> */}
            </SocketProvider>
            <CustomModal />
          </NotificationProvider>
        </ChatProvider>
      </SessionProvider>
    </SWRConfig>
  );
}
