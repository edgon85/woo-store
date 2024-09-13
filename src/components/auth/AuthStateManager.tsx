import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useAuthStore } from '@/stores/auth.store';
import { IUser } from '@/interfaces';

export const AuthStateManager = () => {
  const { data, status } = useSession();
  const { checkUserStateAndAct, login } = useAuthStore();

  useEffect(() => {
    if (status === 'authenticated' && data?.user) {
      login(data.user as IUser);
      const timeoutId = setTimeout(checkUserStateAndAct, 1000);
      return () => clearTimeout(timeoutId);
    }
  }, [status, data, login, checkUserStateAndAct]);

  return null; // Este componente no renderiza nada
};
