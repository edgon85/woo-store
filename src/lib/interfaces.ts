import { IAddress, IProduct, IUser } from '@/interfaces';
import { OrderStatus } from './definitions';

export interface IPaymentMethod {
  id: number;
  logo: string;
  name: string;
  label: string;
}

export interface IPackageDelivery {
  id: number;
  slug?: string;
  name: string;
  price: number;
  originalPrice: string;
  deliveryTime: string;
  logo: string;
  available: boolean;
}

export interface IOrder {
  product: string;

  shippingAddress: string;
  paymentMethod: number;
  amount: number;
  orderStatus?: string;
  packageDelivery: number;
}
