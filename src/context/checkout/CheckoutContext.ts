import { IAddress, IProduct } from '@/interfaces';
import { IPackageDelivery, IPaymentMethod } from '@/lib';
import { createContext } from 'react';

type ContextProps = {
  serviceFee: number;
  address?: IAddress | null;
  product: IProduct | null;
  paymentMethod: IPaymentMethod | null;
  packageDelivery: IPackageDelivery | null;

  onSetShippingAddress: (shippingAddress: IAddress) => void;
  onAddCheckoutProduct: (product: IProduct) => void;
  onSetPaymentMethod: (paymentMethod: IPaymentMethod) => void;
  onSetPackageDelivery: (packageDelivery: IPackageDelivery) => void;
};

export const CheckoutContext = createContext<ContextProps>({} as ContextProps);
