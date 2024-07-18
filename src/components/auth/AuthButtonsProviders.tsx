'use client';
import { BtnSocial } from '../ui';
import { LiteralUnion } from 'react-hook-form';
import { BuiltInProviderType } from 'next-auth/providers';
import { ClientSafeProvider, signIn } from 'next-auth/react';
import { useState } from 'react';
import { toast } from 'react-toastify';

type Props = {
  title: string;
  providers: Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null;
};

export const AuthButtonsProviders = ({ title, providers }: Props) => {
  const [loadingProviders, setLoadingProviders] = useState<
    Record<string, boolean>
  >({});


  const handleSignIn = async (provider: string) => {
    setLoadingProviders((prev) => ({ ...prev, [provider]: true }));

    try {
      await signIn(provider);
    } catch (error) {
      console.error('Error signing in:', error);
      toast.error('Ocurrió un error al iniciar sesión');
    } finally {
      setLoadingProviders((prev) => ({ ...prev, [provider]: false }));
    }
  };

  return (
    <>
      {Object.values(providers!).map((provider: ClientSafeProvider) => {
        if (provider.id === 'credentials') {
          return <div key={'credentials'}></div>;
        }

        return (
          <BtnSocial
            key={provider.id}
            title={`${title} ${provider.name}`}
            provider={provider.id}
            isLoading={loadingProviders[provider.id] || false}
            onVoidAction={() => handleSignIn(provider.id)}
          />
        );
      })}
    </>
  );
};
