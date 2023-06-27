import { FC, useEffect, useReducer } from 'react';
import { AuthContext, authReducer } from './';
import { IUser } from '@/interfaces';
import { signOut, useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

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
      dispatch({ type: '[Auth] - Login', payload: data.user as IUser });
    }
  }, [status, data]);

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

  const logout = () => {
    signOut();
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
