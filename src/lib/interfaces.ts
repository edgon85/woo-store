import { IAddress, IProduct, IUser } from '@/interfaces';
import { OrderStatus, Summary } from './definitions';

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
  id: string;
  product: IProduct;
  shippingAddress: IAddress;
  paymentMethod: IPaymentMethod;
  amount: number;
  orderStatus: OrderStatus;
  packageDelivery: IPackageDelivery;
  notes?: string;
  orderDate: string;
  buyer: IUser;
  seller: IUser;
  summary: Summary;
}
