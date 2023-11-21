export enum OrderStatus {
  Initiated = 'Initiated',
  Pending = 'Pending',
  Confirmed = 'Confirmed',
  Shipped = 'Shipped',
  OutForDelivery = 'OutForDelivery',
  Delivered = 'Delivered',
  Completed = 'Completed',
}

export type TypeCreateOrder = {
  product: string;
  shippingAddress: string;
  paymentMethod: number;
  amount: number;
  orderStatus?: string;
  packageDelivery: number;
};
