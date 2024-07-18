
import { getProviders, signIn } from 'next-auth/react';
import { useEffect, useState } from 'react';

export const useAuthProviders = () => {
  const [providers, setProviders] = useState<any>({});

  useEffect(() => {
    getProviders().then((provider) => {
      setProviders(provider);
    });
  }, []);

  const loginCredentials = async (email: string, password: string) =>
    await signIn('credentials', { email, password });

  return {
    /* isLoggedIn,
    user,
    
    
    logout,
    registerUser,
    */
   providers,
   loginCredentials, 
   
  };
};
