import { IAddress } from '@/interfaces';
import { createContext } from 'react';

type ContextProps = {
  loadingAddress: boolean;
  address?: IAddress | null;

  onSetShippingAddress: (shippingAddress: IAddress) => void;
};

export const CheckoutContext = createContext<ContextProps>({} as ContextProps);
