import { create } from 'zustand';
import { IUser } from '@/interfaces';
import { userState } from '@/helpers';
import { signOut } from 'next-auth/react';
import Cookies from 'js-cookie';
import { redirect } from 'next/navigation';

interface AuthState {
  isLoggedIn: boolean;
  user?: IUser;
  login: (user: IUser) => void;
  logout: () => void;
  registerUser: (
    fullName: string,
    email: string,
    password: string
  ) => Promise<{ hasError: boolean; message?: string }>;

  checkUserStateAndAct: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  isLoggedIn: false,
  user: undefined,

  login: (user) => {
    set({ isLoggedIn: true, user });
  },

  logout: () => {
    // Lógica para cerrar sesión
    // Por ejemplo, eliminar cookies, redirigir, etc.

    signOut();
    Cookies.remove('token');
    Cookies.remove('userId');

    set({ isLoggedIn: false, user: undefined });
    redirect('/');
  },

  registerUser: async (fullName, email, password) => {
    // Lógica para registrar un nuevo usuario
    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName,
          email,
          password,
        }),
      });
      if (!response.ok) {
        const resp = await response.json();
        return { hasError: true, message: resp.message };
      }
      const user = await response.json();
      get().login(user);
      return { hasError: false };
    } catch (error) {
      console.error(error);
      return { hasError: true, message: 'Error al registrar el usuario' };
    }
  },

  checkUserStateAndAct: async () => {
    const user = get().user;
    const logout = get().logout;

    const isValidUser = await userState(user?.token || '');

    if (!isValidUser) {
      console.log('su sesión expiró');
      logout();
      return;
    }

    if (!user?.isActive) {
      console.log('usuario inactivo, comuníquese con un administrador');
      logout();
      return;
    }

    if (user === undefined) {
      console.log('usuario no definido');
      logout();
      return;
    }

    // Si todo está bien, actualiza el estado del usuario
    set({ isLoggedIn: true, user });
  },
}));
