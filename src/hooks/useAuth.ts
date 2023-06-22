import { AuthContext } from '@/context';
import { useContext } from 'react';

export const useAuth = () => {
  const { logout, isLoggedIn, user } = useContext(AuthContext);

  return {
    isLoggedIn,
    user,
    /* methods */
    logout,
  };
};
