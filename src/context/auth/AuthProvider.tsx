import { FC, useEffect, useReducer, useMemo, useCallback } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { toast } from 'react-toastify';
import { AuthContext, authReducer } from './';
import { IUser } from '@/interfaces';
import { makeRegisterUser, userState } from '@/actions';

export interface AuthState {
  isLoggedIn: boolean;
  user?: IUser;
}

interface AuthContextType extends AuthState {
  logout: () => void;
  registerUser: (
    fullName: string,
    email: string,
    password: string
  ) => Promise<{ hasError: boolean; message?: string }>;
}

const AUTH_INITIAL_STATE: AuthState = {
  isLoggedIn: false,
};

type Props = {
  children: React.ReactNode;
};

export const AuthProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, AUTH_INITIAL_STATE);
  const { data, status } = useSession();

  const logout = useCallback(() => {
    signOut({ callbackUrl: '/' });
  }, []);

  const checkUserStateAndAct = useCallback(async () => {
    if (!data || !data.user) {
      console.error('No hay datos de usuario disponibles');
      toast.error('Error al cargar los datos del usuario');
      logout();
      return;
    }

    const currentUser = data.user as IUser;

    try {
      const { ok } = await userState();

      if (!ok) {
        throw new Error('Su sesión expiró');
      }

      if (!currentUser.isActive) {
        throw new Error('Usuario inactivo, comuníquese con un administrador');
      }

      if (!currentUser.email || !currentUser.fullName) {
        throw new Error('Datos de usuario incompletos');
      }

      dispatch({ type: '[Auth] - Login', payload: currentUser });
      // toast.success('Sesión iniciada correctamente');
    } catch (error) {
      console.error('Error en la verificación del estado del usuario:', error);
      toast.error(
        error instanceof Error
          ? error.message
          : 'Ocurrió un error al verificar el estado del usuario'
      );
      logout();
    }
  }, [data, logout]);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (status === 'authenticated') {
      timeoutId = setTimeout(checkUserStateAndAct, 1000);
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [status, checkUserStateAndAct]);

  const registerUser = async (
    fullName: string,
    email: string,
    password: string
  ): Promise<{ hasError: boolean; message?: string }> => {
    try {
      const { data, ok, message } = await makeRegisterUser(
        fullName,
        email,
        password
      );

      if (ok) {
        dispatch({ type: '[Auth] - Login', payload: data as IUser });
      }

      return {
        hasError: !ok,
        message: message || '',
      };
    } catch (error) {
      console.error('Error during user registration:', error);
      return {
        hasError: true,
        message: 'Ocurrió un error durante el registro',
      };
    }
  };

  const contextValue = useMemo<AuthContextType>(
    () => ({
      ...state,
      logout,
      registerUser,
    }),
    [logout, state]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
