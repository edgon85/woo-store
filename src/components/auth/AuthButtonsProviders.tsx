import { BtnSocial } from '../ui';
import { LiteralUnion } from 'react-hook-form';
import { BuiltInProviderType } from 'next-auth/providers';
import { ClientSafeProvider } from 'next-auth/react';

type Props = {
  title: string;
  providers: Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null;
};

export const AuthButtonsProviders = ({ title, providers }: Props) => {
  return (
    <>
      {Object.values(providers!).map((provider: any) => {
        if (provider.id === 'credentials') {
          return <div key={'credentials'}></div>;
        }

        return (
          <BtnSocial
            key={provider.id}
            title={`${title} ${provider.name}`}
            provider={provider.id}
          />
        );
      })}
    </>
  );
};
