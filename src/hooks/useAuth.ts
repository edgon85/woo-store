import { AuthContext } from '@/context';
import { signIn } from 'next-auth/react';
import { useContext } from 'react';

export const useAuth = () => {
  const { logout, isLoggedIn, user, registerUser } = useContext(AuthContext);

  const login = async (email: string, password: string) =>
    await signIn('credentials', { email, password });

  return {
    isLoggedIn,
    user,
    /* methods */
    logout,
    registerUser,
    login,
  };
};
