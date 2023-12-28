import { FC, useEffect, useReducer } from 'react';
import { AuthContext, authReducer } from './';
import { IUser } from '@/interfaces';
import { signOut, useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { userState } from '@/helpers';
import Cookies from 'js-cookie';

export interface AuthState {
  isLoggedIn: boolean;
  user?: IUser;
}

const AUTH_INITIAL_STATE: AuthState = {
  isLoggedIn: false,
};

type Props = {
  children: JSX.Element | JSX.Element[];
};

export const AuthProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, AUTH_INITIAL_STATE);

  const { data, status } = useSession();

  useEffect(() => {
    if (status === 'authenticated') {
      const currentUser = data.user as IUser;

      // Función asincrónica dentro de useEffect
      const checkUserStateAndAct = async () => {
        // Llamada a userState
        const isValidUser = await userState(currentUser?.token || '');

        if (!isValidUser) {
          console.log('su sesión expiró');
          signOut();
          return; // Si la sesión expiró, salimos de la función aquí
        }

        if (!currentUser?.isActive) {
          console.log('usuario inactivo, comuníquese con un administrador');
          signOut();
          return; // Si el usuario no está activo, salimos de la función aquí
        }

        if (currentUser === undefined) {
          console.log('usuario no definido');
          signOut();
          return; // Si el usuario no está definido, salimos de la función aquí
        }

        Cookies.set('userId', currentUser.id);
        dispatch({ type: '[Auth] - Login', payload: currentUser });
      };

      // Llamar a la función asincrónica
      checkUserStateAndAct();
    }
  }, [status, data]);
  /*   useEffect(() => {
    if (status === 'authenticated') {
      const currentUser = data.user as IUser;

      if (!currentUser?.isActive || currentUser === undefined) {
        console.log('usuario inactivo, comuníquese con un administrador');
        signOut();
      }

      dispatch({ type: '[Auth] - Login', payload: currentUser });
    }
  }, [status, data]); */

  const registerUser = async (
    fullName: string,
    email: string,
    password: string
  ): Promise<{ hasError: boolean; message?: string }> => {
    try {
      const authResponse = await fetch(
        'http://localhost:5000/api/auth/register',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            fullName,
            email,
            password,
          }),
        }
      );

      if (!authResponse.ok) {
        const resp = await authResponse.json();
        // console.log(resp)
        return {
          hasError: true,
          message: resp.message,
        };
      }
      const user = await authResponse.json();

      dispatch({ type: '[Auth] - Login', payload: user as IUser });

      return {
        hasError: false,
      };
    } catch (error) {
      console.log(error);

      return {
        hasError: true,
        message: 'hay error',
      };
    }
  };

  const checkUser = () => {
    if (!state.user?.isActive) {
      console.log('Usuario esta inactivo, comuníquese con un administrador');
      logout();
    }
  };

  const logout = () => {
    signOut();
    Cookies.remove('token');
    Cookies.remove('userId');
    redirect('/');
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,

        /* methods */
        logout,
        registerUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
