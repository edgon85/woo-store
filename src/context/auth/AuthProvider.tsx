import { FC, useEffect, useReducer } from 'react';
import { AuthContext, authReducer } from './';
import { IUser } from '@/interfaces';
import { signOut, useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import myUser from '@/actions/getUser';

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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
