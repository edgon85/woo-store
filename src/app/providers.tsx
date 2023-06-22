'use client';

import { SessionProvider } from 'next-auth/react';

type Props = {
  children: JSX.Element | JSX.Element[];
};

export function Providers({ children }: Props) {
  return (<SessionProvider>{children}</SessionProvider>);
}
