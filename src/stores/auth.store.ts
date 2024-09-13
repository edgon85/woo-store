import { create } from 'zustand';
import { signOut, signIn, SignInResponse, getProviders } from 'next-auth/react';
import { toast } from 'react-toastify';
import { IUser } from '@/interfaces';
import { userState, makeRegisterUser } from '@/actions';

interface AuthState {
  isLoggedIn: boolean;
  user: IUser | null;

  checkUserStateAndAct: () => Promise<void>;
  login: (user: IUser) => void;

  logout: () => void;
  registerUser: (
    fullName: string,
    email: string,
    password: string
  ) => Promise<{ hasError: boolean; message?: string }>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  isLoggedIn: false,
  user: null,

  checkUserStateAndAct: async () => {
    const { user } = get();
    if (!user) {
      console.error('No hay datos de usuario disponibles');
      toast.error('Error al cargar los datos del usuario');
      get().logout();
      return;
    }

    try {
      const { ok } = await userState();

      if (!ok) {
        throw new Error('Su sesión expiró');
      }

      if (!user.isActive) {
        throw new Error('Usuario inactivo, comuníquese con un administrador');
      }

      if (!user.email || !user.fullName) {
        throw new Error('Datos de usuario incompletos');
      }

      set({ isLoggedIn: true, user });
      // toast.success('Sesión iniciada correctamente');
    } catch (error) {
      console.error('Error en la verificación del estado del usuario:', error);
      toast.error(
        error instanceof Error
          ? error.message
          : 'Ocurrió un error al verificar el estado del usuario'
      );
      get().logout();
    }
  },

  login: (user: IUser) => set({ isLoggedIn: true, user }),

  logout: () => {
    set({ isLoggedIn: false, user: null });
    signOut({ callbackUrl: '/' });
  },

  registerUser: async (fullName: string, email: string, password: string) => {
    try {
      const { data, ok, message } = await makeRegisterUser(
        fullName,
        email,
        password
      );

      if (ok) {
        set({ isLoggedIn: true, user: data as IUser });
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
  },
}));
