import { IUser } from '@/interfaces';
import { createContext } from 'react';

type ContextProps = {
    isLoggedIn: boolean;
    user?: IUser
    registerUser: (fullName: string, email: string, password: string) => Promise<{
        hasError: boolean;
        message?: string;
    }>
    logout: () => void;
    
};

export const AuthContext = createContext<ContextProps>({} as ContextProps);
