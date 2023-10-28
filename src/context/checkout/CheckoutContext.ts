import { IAddress, IProduct } from '@/interfaces';
import { createContext } from 'react';

type ContextProps = {
  loadingAddress: boolean;
  address?: IAddress | null;
  product: IProduct | null;

  onSetShippingAddress: (shippingAddress: IAddress) => void;
  onAddCheckoutProduct: (product: IProduct) => void;
};

export const CheckoutContext = createContext<ContextProps>({} as ContextProps);
