import { AuthContext } from '@/context';
import { getProviders, signIn } from 'next-auth/react';
import { useContext, useEffect, useState } from 'react';

export const useAuth = () => {
  const { logout, isLoggedIn, user, registerUser } = useContext(AuthContext);
  const [providers, setProviders] = useState<any>({});

  useEffect(() => {
    getProviders().then((provider) => {
      setProviders(provider);
    });
  }, []);

  const login = async (email: string, password: string) =>
    await signIn('credentials', { email, password });

  return {
    isLoggedIn,
    user,
    providers,

    /* methods */
    logout,
    registerUser,
    login,
  };
};
