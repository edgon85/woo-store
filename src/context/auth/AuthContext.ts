import { IUser } from '@/interfaces';
import { createContext } from 'react';

type ContextProps = {
    isLoggedIn: boolean;
    user?: IUser
    logout: () => void;
    
};

export const AuthContext = createContext<ContextProps>({} as ContextProps);
